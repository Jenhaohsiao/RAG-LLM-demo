# 🚀 RAG-LLM-demo - Production-Grade RAG Storyteller

> **Version 1.0** - A Production-ready RAG (Retrieval-Augmented Generation) application powered by Qdrant Vector Database + Google Gemini LLM

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5--flash-4285F4?logo=google)](https://ai.google.dev/)
[![Qdrant](https://img.shields.io/badge/Qdrant-Cloud-DC244C?logo=qdrant)](https://qdrant.tech/)

[English](#) | [繁體中文](./README_ZH.md)

---

## ✨ Features

### 🎯 Core RAG Architecture
- **Vector Database**: Qdrant Cloud with 3072-dimensional embeddings
- **Embedding Model**: Google Gemini `gemini-embedding-001`
- **LLM**: Google Gemini `gemini-2.5-flash`
- **Real-time Retrieval**: Top-K similarity search with cosine distance

### 📚 Content
- **3 Pre-loaded Books**: Chess Fundamentals, Pride and Prejudice, Soap-Making Manual
- **~4,042 Vector Chunks**: Pre-embedded and indexed in Qdrant Cloud
- **Bilingual Support**: English + Traditional Chinese (繁體中文)

### 🎭 AI Personalization
- **4 AI Personas**: Host, Elementary Teacher, Fan, Medieval Knight
- **4 Tone Styles**: Formal, Casual, Humorous, Mysterious
- **Smart Suggestions**: AI generates follow-up questions after each response
- **Query Translation**: Non-English queries automatically translated for better retrieval

### 🔒 Security & Usage
- **Prompt Injection Protection**: AI ignores attempts to change behavior
- **Usage Limits**: 10 conversations per 8-hour session
- **RAG-Only Responses**: AI strictly answers from book content only

### 🎨 Modern UI/UX
- **Dynamic Split Layout**: Intelligent panel resizing with hover effects
- **Layout Lock**: Pin your preferred panel ratio
- **Vivid Book Colors**: Purple, Rose, Amber gradients
- **About Dialog**: Explains RAG technology with visual diagram

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- [Gemini API Key](https://aistudio.google.com/app/apikey)
- [Qdrant Cloud Account](https://cloud.qdrant.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/Jenhaohsiao/RAG-LLM-demo.git
cd RAG-LLM-demo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys:
# VITE_API_KEY=your_gemini_api_key
# VITE_QDRANT_URL=https://your-cluster.qdrant.io
# VITE_QDRANT_API_KEY=your_qdrant_api_key

# Start development server
npm run dev
```

Visit `http://localhost:5173` 🎉

### Upload New Book Content

```bash
# Upload a single book version
npx tsx upload-single.ts <BOOK_ID> <LANGUAGE>

# Example:
npx tsx upload-single.ts CHESS_FUNDAMENTALS en
npx tsx upload-single.ts PRIDE_AND_PREJUDICE zh-TW
```

---

## 📦 Build & Deploy

```bash
# Build for production
npm run build
```

### Deploy Options
| Platform | Guide |
|----------|-------|
| **Vercel** | [Deploy →](https://vercel.com/new) |
| **Netlify** | [Deploy →](https://app.netlify.com/start) |
| **Azure** | See [DEPLOYMENT.md](./DEPLOYMENT.md) |

> ⚠️ Remember to set environment variables in your deployment platform!

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19 + TypeScript |
| Build | Vite 6.4 |
| Styling | TailwindCSS (CDN) |
| Vector DB | Qdrant Cloud (3072-dim) |
| Embedding | gemini-embedding-001 |
| LLM | gemini-2.5-flash |

---

## 📂 Project Structure

```
RAG-LLM-demo/
├── src/
│   ├── components/
│   │   ├── BookSelector.tsx      # Book selection + AI settings
│   │   ├── ChatInterface.tsx     # Chat UI + RAG explanation
│   │   ├── SplitLayout.tsx       # Responsive split panels
│   │   ├── AboutDialog.tsx       # RAG technology explanation
│   │   ├── UsageLimitDialog.tsx  # Usage limit notification
│   │   └── ...
│   ├── services/
│   │   ├── geminiService.ts      # LLM + query translation
│   │   ├── qdrantService.ts      # Vector DB operations
│   │   ├── embeddingService.ts   # Embedding generation
│   │   └── usageTracker.ts       # Usage tracking
│   ├── constants.ts              # Book definitions
│   ├── translations.ts           # i18n strings
│   └── App.tsx                   # Main application
├── Books/                        # Source text files
│   └── bookCovers/               # Book cover images
├── upload-single.ts              # CLI upload tool
├── DEPLOYMENT.md                 # Deployment guide
├── QDRANT_SETUP_GUIDE.md         # Qdrant setup guide
└── PROJECT_STATUS.md             # Development log
```

---

## 📖 Documentation

- 📘 [Qdrant Setup Guide](./QDRANT_SETUP_GUIDE.md) - Vector DB configuration
- 🚀 [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- 📊 [Project Status](./PROJECT_STATUS.md) - Development history

---

## 🔥 How RAG Works

```
User Question → [Translate to English] → Generate Embedding → Qdrant Search → Retrieve Passages → LLM Response
```

1. **Query Processing**: Non-English queries are translated for better vector search
2. **Vector Search**: Find top-5 most relevant text chunks from Qdrant
3. **Context Assembly**: Retrieved passages become the AI's knowledge base
4. **Response Generation**: Gemini generates answers strictly from retrieved content

---

## 🤝 Contributing

Contributions welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

---

## 📝 License

MIT License

---

**Made with ❤️ for AI-powered storytelling**
