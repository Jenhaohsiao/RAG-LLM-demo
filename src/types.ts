export interface LocalizedContent {
  en: string;
  'zh-TW': string;
}

export interface Book {
  id: string;
  title: LocalizedContent;
  author: LocalizedContent;
  coverColor: string;
  coverImage: string; // Path to book cover image
  summary: LocalizedContent; // The short description shown in UI
  context: LocalizedContent; // The "vector db" content used for RAG
  collectionName: string; // Qdrant collection name for this book
}

// Suggested question (AI generates answer when clicked)
export interface SuggestedQuestion {
  question: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  suggestedQuestions?: SuggestedQuestion[]; // Only for model messages
}

export enum AIPersona {
  HOST = 'Host',
  TEACHER = 'Teacher',
  FAN = 'Fan',
  KNIGHT = 'Knight',
}

export enum AITone {
  FORMAL = 'Formal',
  CASUAL = 'Casual',
  HUMOROUS = 'Humorous',
  MYSTERIOUS = 'Mysterious',
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}
