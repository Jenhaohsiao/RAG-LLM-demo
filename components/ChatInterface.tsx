import React, { useState, useRef, useEffect } from "react";
import { Book, Message } from "../types";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  selectedBook: Book;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  selectedBook,
}) => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="h-full w-full max-w-2xl flex flex-col relative rounded-2xl shadow-2xl bg-white backdrop-blur-sm border border-white/40 overflow-hidden">
      {/* Header - Enhanced with Strong Visual Identity */}
      <div className="h-18 border-b border-indigo-200/50 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z\"
                />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              AI Assistant
              <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-semibold">
                RAG
              </span>
            </h2>
            <p className="text-xs text-indigo-600 font-medium flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z\" />
              </svg>
              {selectedBook.title}
            </p>
          </div>
        </div>

        {/* Stats indicator */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z\"
              />
            </svg>
            <span className="font-semibold">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-gradient-to-br from-gray-50/50 via-white to-indigo-50/20">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center select-none animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z\"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              Ready to Explore
            </h3>
            <p className="text-gray-500 font-medium max-w-md leading-relaxed">
              Start a conversation about
              <br />
              <span className="text-indigo-600 font-semibold">
                "{selectedBook.title}"
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
              <span className="px-3 py-1.5 bg-white rounded-full text-xs text-slate-600 shadow-sm border border-slate-200">
                Ask about characters
              </span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs text-slate-600 shadow-sm border border-slate-200">
                Explore themes
              </span>
              <span className="px-3 py-1.5 bg-white rounded-full text-xs text-slate-600 shadow-sm border border-slate-200">
                Discuss plot points
              </span>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex w-full animate-in fade-in slide-in-from-bottom-4 duration-500 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
                    : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                } shadow-md`}
              >
                {msg.role === "user" ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z\" />
                  </svg>
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`
                  rounded-2xl px-5 py-3.5 shadow-md text-sm leading-relaxed
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-md"
                      : "bg-white text-gray-700 border border-gray-100 rounded-bl-md"
                  }
                `}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div
                  className={`text-[10px] mt-2 ${msg.role === "user" ? "text-indigo-200" : "text-gray-400"}`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex gap-3 max-w-[85%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                <svg
                  className="w-4 h-4 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z\" />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-5 py-4 shadow-md flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-xs text-gray-400 ml-2">
                  AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Enhanced */}
      <div className="p-5 bg-white border-t border-gray-100 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-2 border-gray-200 rounded-2xl px-5 py-3 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-400 transition-all shadow-sm"
        >
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-400 outline-none"
            placeholder="Ask about the story..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            title="Send message"
          >
            <svg
              className="w-4 h-4 transform rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
        <div className="text-center mt-3 flex items-center justify-center gap-2">
          <svg
            className="w-3 h-3 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-[10px] text-gray-400">
            AI-generated responses may contain inaccuracies. Powered by Gemini.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChatInterface;
