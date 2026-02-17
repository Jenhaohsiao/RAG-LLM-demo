import React, { useState, useEffect } from "react";
import { Book, AIPersona, AITone } from "../types";
import { BOOKS, BOOK_COLORS } from "../constants";
import { useTranslation } from "../LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AboutDialog from "./AboutDialog";
import appBG from "../images/appBG.png";

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

// Get color config for a book
const getBookColors = (bookId: string) => {
  return (
    BOOK_COLORS[bookId as keyof typeof BOOK_COLORS] ||
    BOOK_COLORS.CHESS_FUNDAMENTALS
  );
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
  const [showAbout, setShowAbout] = useState(true); // Show About dialog on app load

  return (
    <div
      className="h-full min-w-[280px] flex flex-col"
      style={{
        backgroundImage: `url(${appBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* About Dialog */}
      <AboutDialog isOpen={showAbout} onClose={() => setShowAbout(false)} />

      {/* Header */}
      <div className="px-3 py-2 border-b border-slate-200/50 flex items-center justify-between bg-white/80 backdrop-blur-sm relative z-20">
        <h2 className="text-base font-bold text-slate-800">
          {t.knowledgeBase}
        </h2>
        <div className="flex items-center gap-2">
          {/* About Button */}
          <button
            onClick={() => setShowAbout(true)}
            className="text-xs text-slate-500 hover:text-indigo-600 hover:underline transition-colors"
          >
            About
          </button>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm">
        {/* Section 1: Book Selection with Covers - Horizontal Row */}
        <section>
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            {t.selectBook}
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {BOOKS.map((book) => {
              const colors = getBookColors(book.id);
              const isSelected = selectedBook.id === book.id;

              return (
                <button
                  key={book.id}
                  onClick={() => onSelectBook(book)}
                  className={`
                    relative flex flex-col items-center p-1.5 sm:p-2 rounded-lg transition-all duration-200
                    ${
                      isSelected
                        ? `ring-2 ring-offset-1 ${colors.border} shadow-md ${colors.hover}`
                        : "hover:shadow-sm hover:scale-[1.01]"
                    }
                    bg-white border ${isSelected ? colors.border : "border-slate-200"}
                  `}
                >
                  {/* Book Cover Image */}
                  <div
                    className={`
                    w-full aspect-square rounded overflow-hidden mb-1 shadow-sm
                    ${colors.bg}
                  `}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title[language]}
                      className={`w-full h-full object-cover transition-all duration-300 ${isSelected ? "" : "grayscale"}`}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Book Title */}
                  <div className="w-full text-center">
                    <h4
                      className={`
                      font-semibold text-[10px] sm:text-xs leading-tight line-clamp-1
                      ${isSelected ? colors.text : "text-slate-700"}
                    `}
                    >
                      {book.title[language]}
                    </h4>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div
                      className={`
                      absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full 
                      ${colors.bg} flex items-center justify-center shadow-sm
                    `}
                    >
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 2: AI Configuration - Persona & Tone */}
        <section className="bg-white/90 rounded-lg p-2 sm:p-3 border border-slate-200/50 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
            {t.aiConfiguration}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {/* Persona Selector */}
            <div>
              <label className="text-xs sm:text-sm font-medium text-slate-600 mb-1 block">
                {t.role}
              </label>
              <select
                value={selectedPersona}
                onChange={(e) => onSelectPersona(e.target.value as AIPersona)}
                className="w-full bg-white border border-slate-300 text-slate-700 py-1.5 px-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value={AIPersona.HOST}>{t.host}</option>
                <option value={AIPersona.TEACHER}>{t.teacher}</option>
                <option value={AIPersona.FAN}>{t.fan}</option>
                <option value={AIPersona.KNIGHT}>{t.knight}</option>
              </select>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="text-xs sm:text-sm font-medium text-slate-600 mb-1 block">
                {t.tone}
              </label>
              <select
                value={selectedTone}
                onChange={(e) => onSelectTone(e.target.value as AITone)}
                className="w-full bg-white border border-slate-300 text-slate-700 py-1.5 px-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value={AITone.FORMAL}>{t.formal}</option>
                <option value={AITone.CASUAL}>{t.casual}</option>
                <option value={AITone.HUMOROUS}>{t.humorous}</option>
                <option value={AITone.MYSTERIOUS}>{t.mysterious}</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section 3: Book Synopsis */}
        <section className="bg-white/90 rounded-lg p-2 sm:p-3 border border-slate-200/50 shadow-sm">
          {/* Header with Book Title */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`
              w-10 h-12 rounded overflow-hidden shadow-sm flex-shrink-0
              ${getBookColors(selectedBook.id).bg}
            `}
            >
              <img
                src={selectedBook.coverImage}
                alt={selectedBook.title[language]}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-base font-bold ${getBookColors(selectedBook.id).text} leading-tight line-clamp-1`}
              >
                {selectedBook.title[language]}
              </h3>
              <p className="text-xs text-slate-500">
                {selectedBook.author[language]}
              </p>
            </div>
          </div>

          {/* Synopsis Text */}
          <div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedBook.summary[language]}
            </p>
          </div>
        </section>
      </div>

      {/* Footer with Real Status - Compact */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-t border-slate-200/50 bg-white/80 backdrop-blur-sm">
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
