import { GoogleGenAI } from "@google/genai";
import { Book, Message, AIPersona, AITone } from '../types';

// Initialize the client with enhanced error handling
const getClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;
  
  if (!apiKey) {
    console.error("❌ API_KEY is missing from environment variables.");
    console.log("Please set VITE_API_KEY in your .env.local file");
    throw new Error("Gemini API Key is not configured. Please check your environment variables.");
  }
  
  try {
    return new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("❌ Failed to initialize Gemini client:", error);
    throw new Error("Failed to initialize AI service");
  }
};

export const generateRAGResponse = async (
  currentMessage: string,
  history: Message[],
  selectedBook: Book,
  persona: AIPersona,
  tone: AITone
): Promise<string> => {
  try {
    const ai = getClient();
    
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
      
      📚 CONTEXT SOURCE:
      You have retrieved the following content from the book "${selectedBook.title}" by ${selectedBook.author}:
      ${selectedBook.context}
      
      🎭 YOUR ROLE: ${personaGuide[persona]}
      
      🎵 TONE: ${toneGuide[tone]}
      
      📋 CONSTRAINTS:
      1. Answer STRICTLY based on the provided Context Source above
      2. If the user asks something not covered in the context, politely redirect them to topics within the book
      3. Maintain consistency with your assigned role and tone
      4. Keep responses concise yet informative (2-4 paragraphs)
      5. Cite specific plot points, characters, or themes from the context when relevant
      
      🎯 GOAL: Help users deeply understand and engage with "${selectedBook.title}"
    `;

    const model = 'gemini-2.0-flash-exp'; // Using latest model
    
    // Create chat session with history
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balance creativity and accuracy
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    // Send message and get response
    const result = await chat.sendMessage({
      message: currentMessage
    });

    const responseText = result.text;
    
    if (!responseText || responseText.trim().length === 0) {
      return "I apologize, but I couldn't generate a proper response. Could you please rephrase your question?";
    }
    
    return responseText;

  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    
    // Enhanced error messages for users
    if (error.message?.includes("API key")) {
      return "🔑 API Configuration Error: Please ensure your Gemini API key is correctly set in the environment variables.";
    }
    
    if (error.message?.includes("quota") || error.message?.includes("rate limit")) {
      return "⏱️ Rate Limit Reached: The API quota has been exceeded. Please try again in a few moments.";
    }
    
    if (error.message?.includes("network") || error.message?.includes("fetch")) {
      return "🌐 Network Error: Unable to connect to the AI service. Please check your internet connection.";
    }
    
    return "⚠️ Sorry, I encountered an unexpected error. Please try again or refresh the page.";
  }
};
