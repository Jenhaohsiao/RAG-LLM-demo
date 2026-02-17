import React, { useState, useRef, useEffect } from "react";
import { Book, Message } from "../types";
import { useTranslation } from "../LanguageContext";
import { STARTER_QUESTIONS } from "../constants";

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
  const { t, language } = useTranslation();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputText]);

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

  // Export chat history
  const handleExport = () => {
    const chatHistory = messages
      .map(
        (msg) =>
          `[${msg.timestamp.toLocaleString()}] ${msg.role === "user" ? "You" : "AI"}: ${msg.text}`,
      )
      .join("\n\n");

    const blob = new Blob([chatHistory], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${selectedBook.id}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get the last AI message index (to show suggested questions only for the latest response)
  const lastAIMessageIndex = messages.reduce((lastIndex, msg, index) => {
    return msg.role === "model" ? index : lastIndex;
  }, -1);

  // Get starter questions for current book
  const starterQuestions = STARTER_QUESTIONS[selectedBook.id] || [];

  return (
    <div className="h-full min-w-[320px] flex flex-col bg-white">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5 sm:gap-2">
                <span className="truncate">{t.aiAssistant}</span>
                <span className="text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-semibold flex-shrink-0">
                  {t.ragBadge}
                </span>
              </h2>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
              {messages.length} {t.messages}
            </span>
            {messages.length > 0 && (
              <button
                onClick={handleExport}
                className="p-1.5 sm:p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title={t.exportChat}
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* RAG Explanation */}
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          {language === "zh-TW" ? (
            <>
              AI懂很多，但RAG技術讓AI只會針對「
              <span className="font-semibold text-indigo-600">
                {selectedBook.title[language]}
              </span>
              」的內容去互動。
            </>
          ) : (
            <>
              AI knows a lot, but RAG technology focuses the AI to only interact
              based on "
              <span className="font-semibold text-indigo-600">
                {selectedBook.title[language]}
              </span>
              " content.
            </>
          )}
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 rounded-xl mb-3 sm:mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-700 mb-1.5 sm:mb-2">
              {t.startConversation}
            </h3>
            <p className="text-sm sm:text-base text-slate-500 max-w-md">
              {t.askQuestions}{" "}
              <span className="font-semibold text-indigo-600 break-words">
                "
                <span className="inline sm:hidden">
                  {selectedBook.title[language].substring(0, 20)}...
                </span>
                <span className="hidden sm:inline">
                  {selectedBook.title[language]}
                </span>
                "
              </span>
            </p>

            {/* Initial Starter Questions */}
            {starterQuestions.length > 0 && (
              <div className="mt-4 w-full max-w-md">
                <p className="text-xs text-slate-500 mb-2 font-medium">
                  {t.suggestedQuestions}
                </p>
                <div className="flex flex-col gap-2">
                  {starterQuestions.map((sq, index) => (
                    <button
                      key={index}
                      onClick={() => onSendMessage(sq[language])}
                      disabled={isLoading}
                      className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 hover:border-indigo-300 rounded-lg text-left transition-all duration-200 hover:shadow-sm disabled:opacity-50"
                    >
                      <svg
                        className="w-4 h-4 text-indigo-500 flex-shrink-0 group-hover:text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-indigo-700 group-hover:text-indigo-800">
                        {sq[language]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={msg.id}>
            <div
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-2 sm:gap-3 max-w-[95%] sm:max-w-[85%] md:max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {msg.role === "user" ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`
                    rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-700 border border-slate-200 shadow-sm"
                    }
                  `}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <div
                    className={`text-xs sm:text-sm mt-1.5 sm:mt-2 ${msg.role === "user" ? "text-indigo-200" : "text-slate-400"}`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Questions - Only show for the latest AI response */}
            {msg.role === "model" &&
              index === lastAIMessageIndex &&
              msg.suggestedQuestions &&
              msg.suggestedQuestions.length > 0 &&
              !isLoading && (
                <div className="mt-3 ml-9 sm:ml-11">
                  <p className="text-xs text-slate-500 mb-2 font-medium">
                    {t.suggestedQuestions}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {msg.suggestedQuestions.map((sq, sqIndex) => (
                      <button
                        key={sqIndex}
                        onClick={() => onSendMessage(sq.question)}
                        disabled={isLoading}
                        className="group flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 hover:border-indigo-300 rounded-lg text-left transition-all duration-200 hover:shadow-sm disabled:opacity-50"
                      >
                        <svg
                          className="w-4 h-4 text-indigo-500 flex-shrink-0 group-hover:text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-indigo-700 group-hover:text-indigo-800 line-clamp-2">
                          {sq.question}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 sm:gap-3 max-w-[95%] sm:max-w-[85%] md:max-w-[80%]">
              <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="text-xs sm:text-sm text-slate-400 ml-0.5 sm:ml-1">
                  {t.thinking}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-1.5 sm:gap-2"
        >
          <textarea
            ref={textareaRef}
            className="flex-1 bg-slate-50 border border-slate-300 text-slate-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base resize-none max-h-32"
            placeholder={t.typeMessage}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2 sm:p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-95"
            title={t.sendMessage}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 sm:mt-2 text-center">
          {t.aiDisclaimer}
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
