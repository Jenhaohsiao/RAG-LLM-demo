# 🚀 RAG-LLM-demo - Production-Grade RAG Storyteller

> **A Production-ready RAG (Retrieval-Augmented Generation) application powered by Vector Database + Google Gemini LLM**

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0-4285F4?logo=google)](https://ai.google.dev/)

[English](#) | [繁體中文](./README_ZH.md)

---

## ✨ Features

- 🎯 **RAG Architecture**: Vector Database + Google Gemini LLM
- 📚 **Pre-embedded Knowledge Base**: 5 books with rich content
- 🎭 **AI Personas**: Choose from 4 different AI characters (Librarian, Critic, Super Fan, Author)
- 🎵 **Tone Control**: Adjust conversation style (Formal, Casual, Humorous, Mysterious)
- 💬 **ChatGPT-style Interface**: Modern, responsive chat UI
- 🖱️ **Dynamic Split Layout**: Intelligent panel resizing with hover effects
- 🔒 **Layout Lock**: Pin your preferred layout ratio
- ⚡ **Real-time Responses**: Streaming AI responses with context awareness

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Gemini API Key ([Get here](https://aistudio.google.com/app/apikey))

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

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app in action! 🎉

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

Detailed deployment instructions: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Custom CSS Animations
- **AI**: Google Gemini API (gemini-2.0-flash-exp)
- **Deployment**: Static Site Hosting (Vercel, Netlify, Azure)

---

## 📚 Documentation

- 📖 **Full Documentation (Chinese)**: [README_ZH.md](./README_ZH.md)
- 🚀 **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- ✅ **Completion Summary**: [COMPLETION_SUMMARY.md](./COMPLETION_SUMMARY.md)
- 🧠 **Project Memory**: [COPILOT_MEMORY.md](./COPILOT_MEMORY.md)

---

## 🎮 Usage

1. **Select a Book**: Click on any book in the left panel
2. **Choose AI Persona**: Select a character role (Librarian, Critic, Fan, Author)
3. **Set Tone**: Pick a conversation style (Formal, Casual, Humorous, Mysterious)
4. **Start Chatting**: Type your questions about the book in the right panel
5. **Adjust Layout**: Hover over panels or use the central controls to resize

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
