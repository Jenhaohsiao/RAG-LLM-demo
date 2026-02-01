export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  summary: string; // The short description shown in UI
  context: string; // The "vector db" content used for RAG
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
