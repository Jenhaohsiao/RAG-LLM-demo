import React, { useState } from "react";
import whatIsRagImg from "../images/whatIsRag.png";
import { Language, languageNames } from "../translations";

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  const [dialogLang, setDialogLang] = useState<Language>("en");

  if (!isOpen) return null;

  const content = {
    en: {
      whatIsRag: "What is RAG?",
      ragApplications: "RAG Applications",
      whatIsRagContent:
        "RAG (Retrieval-Augmented Generation) is an AI architecture that combines information retrieval with text generation. Instead of relying solely on the model's training data, RAG first searches a knowledge base (like a vector database) to find relevant information, then uses that context to generate more accurate and grounded responses. This approach reduces hallucinations and enables AI to answer questions about specific documents or domains it wasn't trained on.",
      ragApplicationsContent:
        "RAG is widely used in enterprise applications: Customer support chatbots that answer questions from product documentation, legal assistants that search case law databases, medical Q&A systems that reference clinical guidelines, and internal knowledge management tools. Any scenario where AI needs to provide accurate answers based on specific, up-to-date documents benefits from RAG architecture.",
    },
    "zh-TW": {
      whatIsRag: "什麼是 RAG？",
      ragApplications: "RAG 應用場景",
      whatIsRagContent:
        "RAG（檢索增強生成）是一種結合資訊檢索與文本生成的 AI 架構。RAG 不僅依賴模型的訓練資料，而是先從知識庫（如向量資料庫）中搜尋相關資訊，然後利用這些上下文來生成更準確、更有依據的回答。這種方法能減少 AI 的幻覺問題，並讓 AI 能夠回答關於特定文件或其未曾訓練過的領域的問題。",
      ragApplicationsContent:
        "RAG 廣泛應用於企業場景：能從產品文件中回答問題的客服聊天機器人、搜尋判例法資料庫的法律助理、參考臨床指南的醫療問答系統，以及內部知識管理工具。任何需要 AI 根據特定、最新文件提供準確答案的場景，都能從 RAG 架構中受益。",
    },
  };

  const t = content[dialogLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-zoomIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h2 className="text-xl font-bold text-white">About This Project</h2>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <select
              value={dialogLang}
              onChange={(e) => setDialogLang(e.target.value as Language)}
              className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {(["en", "zh-TW"] as Language[]).map((lang) => (
                <option key={lang} value={lang} className="text-slate-800">
                  {languageNames[lang]}
                </option>
              ))}
            </select>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          {/* RAG Diagram - Clean centered design */}
          <div className="mb-6 flex justify-center">
            <img
              src={whatIsRagImg}
              alt="What is RAG"
              className="max-h-40 w-auto object-contain drop-shadow-sm rounded-xl"
            />
          </div>

          {/* Section 1: What is RAG */}
          <section className="mb-6">
            <h3 className="text-lg font-bold text-indigo-600 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold">
                1
              </span>
              {t.whatIsRag}
            </h3>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-700 text-sm leading-relaxed">
                {t.whatIsRagContent}
              </p>
            </div>
          </section>

          {/* Section 2: RAG Applications */}
          <section>
            <h3 className="text-lg font-bold text-purple-600 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold">
                2
              </span>
              {t.ragApplications}
            </h3>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-slate-700 text-sm leading-relaxed">
                {t.ragApplicationsContent}
              </p>
            </div>
          </section>

          {/* Tech Stack Badge */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Built with{" "}
              <span className="font-semibold text-indigo-600">
                Qdrant Vector DB
              </span>{" "}
              +{" "}
              <span className="font-semibold text-purple-600">
                Google Gemini
              </span>{" "}
              + <span className="font-semibold text-rose-500">React</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDialog;
