import { GoogleGenAI } from "@google/genai";
import { Book, Message, AIPersona, AITone } from '../types';

// Initialize the client.
// Note: process.env.API_KEY is handled by the build/runtime environment.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
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
    
    // Construct the RAG System Instruction
    const systemInstruction = `
      You are an advanced AI assistant powered by a Vector Database content retrieval system.
      
      CONTEXT SOURCE:
      You have retrieved the following content from the book "${selectedBook.title}" by ${selectedBook.author}:
      ${selectedBook.context}
      
      YOUR ASSIGNMENT:
      1. Role: Act as ${persona}.
      2. Tone: Maintain a ${tone} tone.
      3. Constraint: Answer strictly based on the provided Context Source. If the user asks something not in the context, politely steer them back to the book's content.
      4. Goal: Engage the user to help them understand this specific story.
    `;

    const model = 'gemini-3-flash-preview';

    // Format history for the API (convert local Message type to API format if needed, 
    // but the chat helper manages history statefuly usually. 
    // Here we will use stateless generateContent for simplicity or chat if we want multi-turn).
    // Given the prompt "llm fixed based on content", a Chat session is best.
    
    // However, to ensure the system instruction is strong every time, we'll map history manually 
    // or use a new chat instance with history.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({
      message: currentMessage
    });

    return result.text || "I apologize, I couldn't generate a response based on that text.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the Knowledge Base. Please check your API key.";
  }
};
