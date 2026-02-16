export interface LocalizedContent {
  en: string;
  'zh-TW': string;
  'zh-CN': string;
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

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AIPersona {
  LIBRARIAN = 'Librarian',
  CRITIC = 'Critic',
  FAN = 'Super Fan',
  AUTHOR = 'The Author',
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
