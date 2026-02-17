import React, { useState, useEffect } from "react";
import { Book, AIPersona, AITone } from "../types";
import { BOOKS, PERSONAS, TONES } from "../constants";
import { useTranslation } from "../LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface BookSelectorProps {
  selectedBook: Book;
  onSelectBook: (book: Book) => void;
  selectedPersona: AIPersona;
  onSelectPersona: (p: AIPersona) => void;
  selectedTone: AITone;
  onSelectTone: (t: AITone) => void;
}

const useQdrantStatus = () => {
  const [status, setStatus] = useState<"checking" | "connected" | "error">(
    "checking",
  );

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const qdrantUrl = import.meta.env.VITE_QDRANT_URL;
        if (!qdrantUrl) {
          setStatus("error");
          return;
        }
        setStatus("connected");
      } catch (error) {
        setStatus("error");
      }
    };

    checkConnection();
  }, []);

  return status;
};

const BookSelector: React.FC<BookSelectorProps> = ({
  selectedBook,
  onSelectBook,
  selectedPersona,
  onSelectPersona,
  selectedTone,
  onSelectTone,
}) => {
  const { t, language } = useTranslation();
  const qdrantStatus = useQdrantStatus();

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            {t.knowledgeBase}
          </h2>
          <p className="text-slate-500 text-sm mt-0.5 hidden sm:block">
            {t.selectSourceAndConfig}
          </p>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Content - No Scroll */}
      <div className="flex-1 overflow-hidden p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
        {/* Books Grid - Horizontal Layout */}
        <section>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {t.availableSources}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BOOKS.map((book) => (
              <button
                key={book.id}
                onClick={() => onSelectBook(book)}
                className={`
                  flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 transition-all
                  ${
                    selectedBook.id === book.id
                      ? "border-indigo-500 bg-indigo-50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }
                `}
              >
                <div
                  className={`w-full h-1 sm:h-1.5 rounded-full ${book.coverColor} mb-1.5 sm:mb-2`}
                />
                <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[50px] sm:min-h-[60px]">
                  <h4 className="font-semibold text-slate-800 text-xs sm:text-sm leading-tight mb-1 line-clamp-2">
                    {book.title[language]}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">
                    {book.author[language]}
                  </p>
                </div>
                {selectedBook.id === book.id && (
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Two Column Layout: Synopsis + AI Config */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 flex-1 overflow-hidden">
          {/* Selected Book Detail */}
          <section className="bg-slate-50 rounded-lg p-2.5 sm:p-3 border border-slate-200 flex flex-col">
            {/* Book Cover */}
            <div className="mb-2.5 sm:mb-3 flex justify-center">
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[190px] lg:h-[190px]">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title[language]}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    // Fallback to color bar if image fails to load
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Synopsis */}
            <h3 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1.5 sm:mb-2">
              {t.synopsis}
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {selectedBook.summary[language]}
              </p>
            </div>
          </section>

          {/* AI Configuration */}
          <section className="flex flex-col">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1.5 sm:mb-2">
              {t.aiConfiguration}
            </h3>

            <div className="space-y-2 sm:space-y-3">
              {/* Persona Selector */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5 block">
                  {t.role}
                </label>
                <select
                  value={selectedPersona}
                  onChange={(e) => onSelectPersona(e.target.value as AIPersona)}
                  className="w-full bg-white border border-slate-300 text-slate-700 py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm"
                >
                  <option value={AIPersona.LIBRARIAN}>{t.librarian}</option>
                  <option value={AIPersona.CRITIC}>{t.critic}</option>
                  <option value={AIPersona.FAN}>{t.superFan}</option>
                  <option value={AIPersona.AUTHOR}>{t.theAuthor}</option>
                </select>
              </div>

              {/* Tone Selector */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5 block">
                  {t.tone}
                </label>
                <select
                  value={selectedTone}
                  onChange={(e) => onSelectTone(e.target.value as AITone)}
                  className="w-full bg-white border border-slate-300 text-slate-700 py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm"
                >
                  <option value={AITone.FORMAL}>{t.formal}</option>
                  <option value={AITone.CASUAL}>{t.casual}</option>
                  <option value={AITone.HUMOROUS}>{t.humorous}</option>
                  <option value={AITone.MYSTERIOUS}>{t.mysterious}</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer with Real Status - Compact */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              qdrantStatus === "connected"
                ? "bg-green-500"
                : qdrantStatus === "checking"
                  ? "bg-amber-500 animate-pulse"
                  : "bg-red-500"
            }`}
          />
          <span className="text-slate-600 font-medium">
            {qdrantStatus === "connected"
              ? t.vectorDbConnected
              : qdrantStatus === "checking"
                ? t.vectorDbChecking
                : t.connectionError}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookSelector;
