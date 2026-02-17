import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ConfirmDialog from "./components/ConfirmDialog";
import UsageLimitDialog from "./components/UsageLimitDialog";
import SplitLayout from "./components/SplitLayout";
import BookSelector from "./components/BookSelector";
import ChatInterface from "./components/ChatInterface";
import { Book, Message, AIPersona, AITone } from "./types";
import { BOOKS } from "./constants";
import { generateRAGResponse } from "./services/geminiService";
import { canUseAI, incrementUsage, isLocked } from "./services/usageTracker";
import { useTranslation } from "./LanguageContext";

const App: React.FC = () => {
  const { t, language } = useTranslation();

  // --- State ---
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[0]);
  const [selectedPersona, setSelectedPersona] = useState<AIPersona>(
    AIPersona.HOST,
  );
  const [selectedTone, setSelectedTone] = useState<AITone>(AITone.CASUAL);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Confirmation dialog state
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingBook, setPendingBook] = useState<Book | null>(null);

  // Usage limit dialog state
  const [showUsageLimit, setShowUsageLimit] = useState(false);

  // --- Effects ---

  // Reset chat when book changes
  useEffect(() => {
    setMessages([]);
  }, [selectedBook]);

  // --- Handlers ---

  const handleBookSelect = (book: Book) => {
    if (book.id === selectedBook.id) return;

    // If there are messages, show confirmation
    if (messages.length > 0) {
      setPendingBook(book);
      setShowConfirm(true);
    } else {
      setSelectedBook(book);
    }
  };

  const handleConfirmBookChange = () => {
    if (pendingBook) {
      setSelectedBook(pendingBook);
      setMessages([]);
      setPendingBook(null);
    }
    setShowConfirm(false);
  };

  const handleCancelBookChange = () => {
    setPendingBook(null);
    setShowConfirm(false);
  };

  const handleSendMessage = async (text: string) => {
    // Check usage limit before making AI call
    if (!canUseAI()) {
      setShowUsageLimit(true);
      return;
    }

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Increment usage count
      const usageResult = incrementUsage();
      if (usageResult.isLocked) {
        setShowUsageLimit(true);
        setIsLoading(false);
        return;
      }

      // 2. Call Gemini Service (RAG) with language - now returns response with suggested questions
      const response = await generateRAGResponse(
        text,
        messages,
        selectedBook,
        selectedPersona,
        selectedTone,
        language,
      );

      // 3. Add Model Message with suggested questions
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: response.responseText,
        timestamp: new Date(),
        suggestedQuestions: response.suggestedQuestions,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: "❌ Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <SplitLayout
        leftContent={
          <BookSelector
            selectedBook={selectedBook}
            onSelectBook={handleBookSelect}
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

      <ConfirmDialog
        isOpen={showConfirm}
        title={t.switchKnowledgeBase}
        message={t.switchWarning.replace(
          "{title}",
          pendingBook?.title[language] || "",
        )}
        confirmLabel={t.switch}
        cancelLabel={t.cancel}
        onConfirm={handleConfirmBookChange}
        onCancel={handleCancelBookChange}
        type="warning"
      />

      <UsageLimitDialog
        isOpen={showUsageLimit}
        onClose={() => setShowUsageLimit(false)}
      />
    </ErrorBoundary>
  );
};

export default App;
