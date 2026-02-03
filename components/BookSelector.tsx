import React from "react";
import { Book, AIPersona, AITone } from "../types";
import { BOOKS, PERSONAS, TONES } from "../constants";

interface BookSelectorProps {
  selectedBook: Book;
  onSelectBook: (book: Book) => void;
  selectedPersona: AIPersona;
  onSelectPersona: (p: AIPersona) => void;
  selectedTone: AITone;
  onSelectTone: (t: AITone) => void;
}

const BookSelector: React.FC<BookSelectorProps> = ({
  selectedBook,
  onSelectBook,
  selectedPersona,
  onSelectPersona,
  selectedTone,
  onSelectTone,
}) => {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="h-full w-full max-w-2xl flex flex-col overflow-hidden rounded-2xl shadow-2xl bg-white/90 backdrop-blur-sm border border-white/60">
        {/* Header with Glass Effect */}
        <div className="p-6 bg-gradient-to-r from-white/80 to-blue-50/50 backdrop-blur-sm border-b border-white/60 shadow-md z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Knowledge Base
          </h2>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Select a vector source to begin RAG session
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {/* Books Grid */}
          <section>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Available Sources
            </h3>

            {/* Horizontal Book List - Books Below Text */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {BOOKS.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onSelectBook(book)}
                  className={`
                  group cursor-pointer relative transition-all duration-300 flex flex-col items-center gap-2 p-2 rounded-lg flex-shrink-0
                  ${
                    selectedBook.id === book.id
                      ? "bg-indigo-50 ring-2 ring-indigo-400"
                      : "hover:bg-slate-50 hover:shadow-md"
                  }
                `}
                >
                  {/* Book Text Info - Top */}
                  <div className="text-center w-20">
                    <h4 className="font-semibold text-slate-800 text-xs leading-tight mb-0.5 line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {book.author}
                    </p>
                  </div>

                  {/* Fixed Size SVG Book Icon - Bottom */}
                  <div className="relative flex-shrink-0 w-10 h-14">
                    <svg
                      viewBox="0 0 100 130"
                      className="w-full h-full drop-shadow-md"
                    >
                      {/* Book Shadow */}
                      <ellipse
                        cx="50"
                        cy="125"
                        rx="30"
                        ry="2"
                        fill="black"
                        opacity="0.15"
                      />

                      {/* Book Pages (side) */}
                      <rect
                        x="25"
                        y="12"
                        width="50"
                        height="105"
                        fill="#f0f0f0"
                        rx="2"
                      />
                      <rect
                        x="26"
                        y="13"
                        width="48"
                        height="103"
                        fill="#ffffff"
                        rx="2"
                      />

                      {/* Page lines */}
                      <line
                        x1="27"
                        y1="15"
                        x2="27"
                        y2="114"
                        stroke="#e5e5e5"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="29"
                        y1="15"
                        x2="29"
                        y2="114"
                        stroke="#e5e5e5"
                        strokeWidth="0.5"
                      />

                      {/* Book Cover */}
                      <rect
                        x="22"
                        y="8"
                        width="56"
                        height="110"
                        className={book.coverColor.replace("bg-", "fill-")}
                        rx="3"
                      />

                      {/* Cover gradient */}
                      <defs>
                        <linearGradient
                          id={`grad-${book.id}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            style={{ stopColor: "rgba(255,255,255,0.25)" }}
                          />
                          <stop
                            offset="100%"
                            style={{ stopColor: "rgba(0,0,0,0.15)" }}
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        x="22"
                        y="8"
                        width="56"
                        height="110"
                        fill={`url(#grad-${book.id})`}
                        rx="3"
                      />

                      {/* Spine shadow */}
                      <rect
                        x="22"
                        y="8"
                        width="5"
                        height="110"
                        fill="rgba(0,0,0,0.2)"
                        rx="3 0 0 3"
                      />

                      {/* Book icon decoration */}
                      <circle
                        cx="50"
                        cy="45"
                        r="10"
                        fill="rgba(255,255,255,0.25)"
                      />
                      <path
                        d="M46 40 L46 50 L48 50 L48 43 L52 43 L52 50 L54 50 L54 40 Z"
                        fill="white"
                        opacity="0.7"
                      />
                    </svg>

                    {/* Active Check Mark */}
                    {selectedBook.id === book.id && (
                      <div className="absolute -top-1 -right-1 z-10 bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                        <svg
                          className="w-2.5 h-2.5"
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
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Book Detail - Enhanced */}
          <section className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-start gap-4 mb-4">
              {/* Book icon with selected color */}
              <div
                className={`${selectedBook.coverColor} w-12 h-16 rounded-md shadow-md flex items-center justify-center flex-shrink-0`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z\" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {selectedBook.title}
                </h3>
                <p className="text-sm text-slate-500 flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"
                    />
                  </svg>
                  {selectedBook.author}
                </p>
              </div>
            </div>

            {/* Book Summary */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Synopsis
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedBook.summary}
              </p>
            </div>

            {/* Status badges - Production-ready indicators */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 text-xs rounded-full font-medium flex items-center gap-1.5 shadow-sm">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                Vector DB: Ready
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1.5 shadow-sm">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Indexed
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center gap-1.5 shadow-sm">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                RAG Active
              </span>
            </div>
          </section>

          {/* Configurations - Enhanced UI */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
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
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4\"
                />
              </svg>
              AI Configuration
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Persona Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"
                    />
                  </svg>
                  Role
                </label>
                <div className="relative">
                  <select
                    value={selectedPersona}
                    onChange={(e) =>
                      onSelectPersona(e.target.value as AIPersona)
                    }
                    className="w-full appearance-none bg-white border-2 border-slate-200 text-slate-700 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-sm font-medium transition-all hover:border-slate-300 cursor-pointer"
                  >
                    {PERSONAS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tone Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z\"
                    />
                  </svg>
                  Tone
                </label>
                <div className="relative">
                  <select
                    value={selectedTone}
                    onChange={(e) => onSelectTone(e.target.value as AITone)}
                    className="w-full appearance-none bg-white border-2 border-slate-200 text-slate-700 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 text-sm font-medium transition-all hover:border-slate-300 cursor-pointer"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <p className="text-xs text-slate-500 mb-2 font-medium">
                Active Configuration:
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2.5 py-1 bg-white rounded-md text-indigo-600 font-semibold shadow-sm border border-indigo-100">
                  {selectedPersona}
                </span>
                <span className="text-slate-400">•</span>
                <span className="px-2.5 py-1 bg-white rounded-md text-purple-600 font-semibold shadow-sm border border-purple-100">
                  {selectedTone}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Status - Production indicators */}
        <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-t border-slate-200">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Online
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-mono">v2.1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z\"
                  />
                </svg>
                <span className="font-mono font-medium">~24ms</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSelector;
