import React from 'react';
import { Book, AIPersona, AITone } from '../types';
import { BOOKS, PERSONAS, TONES } from '../constants';

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
  onSelectTone
}) => {
  return (
    <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 bg-white border-b border-slate-100 shadow-sm z-10">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Knowledge Base</h2>
        <p className="text-slate-500 text-sm mt-1">Select a vector source to begin RAG session</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        
        {/* Books Grid */}
        <section>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Available Sources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 xl:grid-cols-2">
            {BOOKS.map((book) => (
              <div 
                key={book.id}
                onClick={() => onSelectBook(book)}
                className={`
                  group cursor-pointer relative rounded-xl overflow-hidden transition-all duration-300
                  ${selectedBook.id === book.id 
                    ? 'ring-4 ring-indigo-500/30 ring-offset-2 scale-[1.02] shadow-lg' 
                    : 'hover:shadow-md hover:-translate-y-1 opacity-80 hover:opacity-100'}
                `}
              >
                {/* Book Spine Visual */}
                <div className={`${book.coverColor} h-32 flex items-center justify-center p-4 text-center`}>
                  <h4 className="text-white font-serif font-bold text-lg leading-tight drop-shadow-md">
                    {book.title}
                  </h4>
                </div>
                {/* Mini Info */}
                <div className="bg-white p-3 border-x border-b border-slate-200 rounded-b-xl">
                  <p className="text-xs text-slate-500 font-medium">{book.author}</p>
                </div>
                
                {/* Active Indicator */}
                {selectedBook.id === book.id && (
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Selected Book Detail */}
        <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
             <div className={`w-2 h-8 rounded-full ${selectedBook.coverColor}`}></div>
             <div>
               <h3 className="text-lg font-bold text-slate-800">{selectedBook.title}</h3>
               <p className="text-sm text-slate-500">{selectedBook.author}</p>
             </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {selectedBook.summary}
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">Vector Embedding Ready</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">Index: Active</span>
          </div>
        </section>

        {/* Configurations */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Session Configuration</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Persona Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <div className="relative">
                <select 
                  value={selectedPersona}
                  onChange={(e) => onSelectPersona(e.target.value as AIPersona)}
                  className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  {PERSONAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Tone</label>
              <div className="relative">
                <select 
                  value={selectedTone}
                  onChange={(e) => onSelectTone(e.target.value as AITone)}
                  className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* Footer Status */}
      <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs text-slate-400 flex justify-between">
         <span>v2.1.0 Production Build</span>
         <span>Latency: 24ms</span>
      </div>
    </div>
  );
};

export default BookSelector;
