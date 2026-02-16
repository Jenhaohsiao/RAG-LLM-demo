# 🚀 RAG-LLM-demo - Production-Grade RAG Storyteller

> **A Production-ready RAG (Retrieval-Augmented Generation) application powered by Qdrant Vector Database + Google Gemini LLM**

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0-4285F4?logo=google)](https://ai.google.dev/)
[![Qdrant](https://img.shields.io/badge/Qdrant-Cloud-DC244C?logo=qdrant)](https://qdrant.tech/)

[English](#) | [繁體中文](./README_ZH.md)

---

## ✨ Features

- 🎯 **True RAG Architecture**: Qdrant Vector Database + Google Gemini LLM
- 🧠 **Real-time Embedding & Retrieval**: Dynamic content search with 768-dim vectors
- 📚 **Custom Knowledge Base**: Upload your own text files (.txt, .md)
- 🎭 **AI Personas**: Choose from 4 different AI characters (Librarian, Critic, Super Fan, Author)
- 🎵 **Tone Control**: Adjust conversation style (Formal, Casual, Humorous, Mysterious)
- 💬 **ChatGPT-style Interface**: Modern, responsive chat UI
- 🖱️ **Dynamic Split Layout**: Intelligent panel resizing with hover effects
- 🔒 **Layout Lock**: Pin your preferred layout ratio
- ⚡ **Semantic Search**: Top-K similarity search with cosine distance

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Gemini API Key ([Get here](https://aistudio.google.com/app/apikey))
- Qdrant Cloud Account ([Sign up](https://cloud.qdrant.io/)) - **NEW!**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd RAG-LLM-demo

# Install dependencies
npm install

# Set up environment variables
# Create .env.local file and add:
# VITE_API_KEY=your_gemini_api_key_here
# VITE_QDRANT_URL=https://your-cluster.qdrant.io
# VITE_QDRANT_API_KEY=your_qdrant_api_key_here

# Prepare your text files
# Place 5 .txt or .md files in data/ directory

# Process and upload to Qdrant
npm run process-books

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action! 🎉

**📖 Detailed Setup Guide**: See [QUICKSTART_RAG.md](./QUICKSTART_RAG.md) for step-by-step instructions (15 minutes)

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)
- **Azure Static Web Apps**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Note**: Don't forget to set environment variables in your deployment platform!

Detailed deployment instructions: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Custom CSS Animations
- **Vector DB**: Qdrant Cloud (768-dim embeddings)
- **Embedding**: Google Gemini text-embedding-004
- **LLM**: Google Gemini API (gemini-2.0-flash-exp)
- **Deployment**: Static Site Hosting (Vercel, Netlify, Azure)

---

## 📚 Documentation

### Getting Started
- 🚀 **Quick Start (15 min)**: [QUICKSTART_RAG.md](./QUICKSTART_RAG.md) - Start here!
- 📌 **Next Steps**: [NEXT_STEPS.md](./NEXT_STEPS.md) - What to do after setup
- 🗄️ **Qdrant Setup Guide**: [QDRANT_SETUP_GUIDE.md](./QDRANT_SETUP_GUIDE.md) - Detailed guide

### Reference
- 📖 **Full Documentation (Chinese)**: [README_ZH.md](./README_ZH.md)
- 🚀 **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🎉 **Integration Report**: [RAG_INTEGRATION_REPORT.md](./RAG_INTEGRATION_REPORT.md)
- ✅ **Completion Summary**: [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)
- 🧠 **Project Memory**: [COPILOT_MEMORY.md](./COPILOT_MEMORY.md)

---

## 🎮 Usage

1. **Upload Text Files**: Place your .txt or .md files in `data/` directory
2. **Process & Upload**: Run `npm run process-books` to embed and upload to Qdrant
3. **Select a Book**: Click on any book in the left panel
4. **Choose AI Persona**: Select a character role (Librarian, Critic, Fan, Author)
5. **Set Tone**: Pick a conversation style (Formal, Casual, Humorous, Mysterious)
6. **Start Chatting**: Ask questions - AI retrieves relevant content from Qdrant!
7. **Adjust Layout**: Hover over panels or use the central controls to resize

---

## 🔥 What Makes This Special

- ✅ **True RAG**: Not just prompt engineering - real vector search and retrieval
- ✅ **Your Own Data**: Upload any text content you want the AI to learn from
- ✅ **Production Ready**: Complete error handling, loading states, graceful fallbacks
- ✅ **Beautiful UI**: Modern, responsive design with smooth animations
- ✅ **Fully Documented**: Comprehensive guides for every step

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Powered by [Google Gemini API](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

---

**Made with ❤️ by the RAG-LLM-demo Team**
