import { GoogleGenerativeAI } from "@google/generative-ai";
import { Book, Message, AIPersona, AITone } from '../types';
import { Language } from '../translations';
import { generateEmbedding } from './embeddingService';
import { searchSimilarVectors } from './qdrantService';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize the client with enhanced error handling
const getClient = () => {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) || process.env.VITE_API_KEY;
  
  if (!apiKey) {
    console.error("❌ API_KEY is missing from environment variables.");
    console.log("Please set VITE_API_KEY in your .env.local file");
    throw new Error("Gemini API Key is not configured. Please check your environment variables.");
  }
  
  try {
    return new GoogleGenerativeAI(apiKey);
  } catch (error) {
    console.error("❌ Failed to initialize Gemini client:", error);
    throw new Error("Failed to initialize AI service");
  }
};

/**
 * 將非英文查詢翻譯成英文以提高向量搜索準確度
 */
const translateQueryToEnglish = async (query: string, language: Language): Promise<string> => {
  // 如果已經是英文，直接返回
  if (language === 'en') {
    return query;
  }
  
  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 256,
      },
    });
    
    const result = await model.generateContent(
      `Translate the following query to English. Only output the translation, nothing else.\n\nQuery: ${query}`
    );
    
    const translatedQuery = result.response.text().trim();
    console.log(`🔄 Query translated: "${query}" → "${translatedQuery}"`);
    return translatedQuery;
  } catch (error) {
    console.error("❌ Translation failed, using original query:", error);
    return query;
  }
};

/**
 * 從 Qdrant 檢索相關內容 (with query translation for better accuracy)
 */
const retrieveRelevantContext = async (
  query: string,
  bookId: string,
  language: Language,
  topK: number = 5,
  retries: number = MAX_RETRIES
): Promise<string> => {
  try {
    // 1. 將查詢翻譯成英文（因為書籍內容是英文）
    const englishQuery = await translateQueryToEnglish(query, language);
    
    // 2. 生成英文查詢的 embedding
    const queryEmbedding = await generateEmbedding(englishQuery);
    
    // 3. 從 Qdrant 搜索相似向量（使用 en 語言版本，因為內容是英文）
    const results = await searchSimilarVectors(queryEmbedding, bookId, 'en', topK);
    
    // 4. 組合檢索到的文本
    if (results.length === 0) {
      return "No relevant content found in the database.";
    }
    
    const context = results
      .map((result) => result.payload.text)
      .join('\n\n---\n\n');
    
    console.log(`✅ Retrieved ${results.length} relevant chunks from Qdrant`);
    return context;
    
  } catch (error) {
    console.error("❌ Error retrieving context from Qdrant:", error);
    
    // Retry logic
    if (retries > 0) {
      console.log(`🔄 Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY);
      return retrieveRelevantContext(query, bookId, language, topK, retries - 1);
    }
    
    // 降級到使用書籍的靜態 context
    return "Unable to retrieve real-time context. Using fallback content.";
  }
};

export const generateRAGResponse = async (
  currentMessage: string,
  history: Message[],
  selectedBook: Book,
  persona: AIPersona,
  tone: AITone,
  language: Language,
  retries: number = MAX_RETRIES
): Promise<string> => {
  try {
    const genAI = getClient();
    
    // ✨ 真正的 RAG: 從 Qdrant 檢索相關內容（使用當前語言）
    const retrievedContext = await retrieveRelevantContext(
      currentMessage,
      selectedBook.id,
      language,
      5 // 檢索前 5 個最相關的文本塊
    );
    
    // 語言特定的系統指令
    const languageInstructions = {
      'en': 'Respond in English.',
      'zh-TW': 'Respond in Traditional Chinese (繁體中文). At the END of your response, add a note in a new line: "※ 此回答基於英文原文內容進行翻譯及理解。"'
    };
    
    // Construct the RAG System Instruction with persona and tone guidance
    const personaGuide = {
      [AIPersona.LIBRARIAN]: "You are a knowledgeable librarian who provides organized, informative answers with a scholarly approach.",
      [AIPersona.CRITIC]: "You are a critical literary analyst who provides deep insights and thoughtful critique of the story.",
      [AIPersona.FAN]: "You are an enthusiastic super fan who shares excitement and passion about every aspect of the story.",
      [AIPersona.AUTHOR]: "You are the original author, providing behind-the-scenes insights and creative context."
    };
    
    const toneGuide = {
      [AITone.FORMAL]: "Use formal language, proper grammar, and maintain a professional tone.",
      [AITone.CASUAL]: "Use casual, conversational language as if talking to a friend.",
      [AITone.HUMOROUS]: "Incorporate wit, humor, and playful observations where appropriate.",
      [AITone.MYSTERIOUS]: "Use evocative language, leave hints, and create an air of intrigue."
    };
    
    const systemInstruction = `
      You are an advanced AI assistant powered by a Vector Database Retrieval-Augmented Generation (RAG) system.
      
      📚 RETRIEVED CONTEXT from "${selectedBook.title[language]}" by ${selectedBook.author[language]}:
      ${retrievedContext}
      
      🎭 YOUR ROLE: ${personaGuide[persona]}
      
      🎵 TONE: ${toneGuide[tone]}
      
      🌍 LANGUAGE: ${languageInstructions[language]}
      
      📋 CONSTRAINTS:
      1. Answer STRICTLY based on the RETRIEVED CONTEXT above
      2. The context is dynamically retrieved based on the user's question for maximum relevance
      3. If the retrieved context doesn't contain enough information, acknowledge this and provide what you can
      4. Maintain consistency with your assigned role and tone
      5. **IMPORTANT: Keep your response to approximately 80 words (or ~80 Chinese characters). Be concise and direct.**
      6. Do NOT mention or cite context sources, numbers, or references - present information naturally
      7. ALWAYS respond in the language specified above
      
      🎯 GOAL: Help users deeply understand and engage with "${selectedBook.title[language]}" using real-time retrieved content
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });
    
    // Create chat with history
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    });

    // Send message and get response
    const result = await chat.sendMessage(currentMessage);
    const response = await result.response;
    const responseText = response.text();
    
    if (!responseText || responseText.trim().length === 0) {
      throw new Error("Empty response from AI");
    }
    
    return responseText;

  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    
    // Retry logic for transient errors
    const isRetryable = error.message?.includes("network") || 
                       error.message?.includes("fetch") ||
                       error.message?.includes("timeout");
    
    if (isRetryable && retries > 0) {
      console.log(`🔄 Retrying API call... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY * (MAX_RETRIES - retries + 1)); // Exponential backoff
      return generateRAGResponse(currentMessage, history, selectedBook, persona, tone, retries - 1);
    }
    
    // Enhanced error messages for users
    if (error.message?.includes("API key")) {
      throw new Error("🔑 API Configuration Error: Please ensure your Gemini API key is correctly set in the environment variables.");
    }
    
    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      throw new Error("⏱️ Rate Limit Reached: The API quota has been exceeded. Please try again in a few moments.");
    }
    
    if (error.message?.includes("network") || error.message?.includes("fetch")) {
      throw new Error("🌐 Network Error: Unable to connect to the AI service. Please check your internet connection.");
    }
    
    throw new Error("⚠️ Sorry, I encountered an unexpected error. Please try again or refresh the page.");
  }
};
