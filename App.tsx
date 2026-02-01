import React, { useState, useEffect } from 'react';
import SplitLayout from './components/SplitLayout';
import BookSelector from './components/BookSelector';
import ChatInterface from './components/ChatInterface';
import { Book, Message, AIPersona, AITone } from './types';
import { BOOKS, PERSONAS, TONES } from './constants';
import { generateRAGResponse } from './services/geminiService';

const App: React.FC = () => {
  // --- State ---
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[0]);
  const [selectedPersona, setSelectedPersona] = useState<AIPersona>(AIPersona.LIBRARIAN);
  const [selectedTone, setSelectedTone] = useState<AITone>(AITone.CASUAL);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- Effects ---
  
  // Reset chat when book changes
  useEffect(() => {
    setMessages([]);
    // Optional: Add a welcoming message from the AI when switching contexts
    // setMessages([{ id: 'init', role: 'model', text: `I am ready to discuss "${selectedBook.title}".`, timestamp: new Date() }])
  }, [selectedBook]);


  // --- Handlers ---

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Call Gemini Service (RAG)
    const responseText = await generateRAGResponse(
      text,
      messages, // Pass history (excluding current user msg as it's added locally, but service might need it in history context if not stateless)
      selectedBook,
      selectedPersona,
      selectedTone
    );

    // 3. Add Model Message
    const modelMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <SplitLayout
      leftContent={
        <BookSelector
          selectedBook={selectedBook}
          onSelectBook={setSelectedBook}
          selectedPersona={selectedPersona}
          onSelectPersona={setSelectedPersona}
          selectedTone={selectedTone}
          onSelectTone={setSelectedTone}
        />
      }
      rightContent={
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          selectedBook={selectedBook}
        />
      }
    />
  );
};

export default App;
