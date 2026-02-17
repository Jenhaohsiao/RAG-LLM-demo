# 🚀 RAG-LLM-demo - 生產級 RAG 故事講述者

> **Version 1.0** - 基於 Qdrant 向量資料庫 + Google Gemini LLM 的 Production-ready RAG 應用程式

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5--flash-4285F4?logo=google)](https://ai.google.dev/)
[![Qdrant](https://img.shields.io/badge/Qdrant-Cloud-DC244C?logo=qdrant)](https://qdrant.tech/)

[English](./README.md) | [繁體中文](#)

---

## ✨ 功能特色

### 🎯 核心 RAG 架構
- **向量資料庫**: Qdrant Cloud，3072 維度 embeddings
- **Embedding 模型**: Google Gemini `gemini-embedding-001`
- **LLM**: Google Gemini `gemini-2.5-flash`
- **即時檢索**: Top-K 餘弦相似度搜索

### 📚 內容
- **3 本預載書籍**: 西洋棋基礎、傲慢與偏見、製皂手冊
- **約 4,042 個向量區塊**: 預先 embedding 並索引於 Qdrant Cloud
- **雙語支援**: 英文 + 繁體中文

### 🎭 AI 個人化
- **4 種 AI 角色**: 主持人、國小老師、粉絲、中古騎士
- **4 種語氣風格**: 正式、輕鬆、幽默、神秘
- **智能建議**: AI 在每次回答後自動生成後續問題
- **查詢翻譯**: 非英文查詢自動翻譯以提升檢索效果

### 🔒 安全與使用限制
- **Prompt 注入防護**: AI 忽略任何試圖改變行為的指令
- **使用限制**: 每 8 小時 session 限制 10 次對話
- **僅限 RAG 回答**: AI 嚴格基於書籍內容回答

### 🎨 現代化 UI/UX
- **動態分屏佈局**: 智能面板大小調整，支援 hover 效果
- **佈局鎖定**: 固定您偏好的面板比例
- **鮮明書籍色彩**: 紫色、玫紅、琥珀漸層
- **關於對話框**: 以視覺圖解說明 RAG 技術

---

## 🚀 快速開始

### 前置需求
- Node.js 18+
- [Gemini API Key](https://aistudio.google.com/app/apikey)
- [Qdrant Cloud 帳戶](https://cloud.qdrant.io/)

### 安裝步驟

```bash
# 複製專案
git clone https://github.com/Jenhaohsiao/RAG-LLM-demo.git
cd RAG-LLM-demo

# 安裝依賴
npm install

# 設定環境變數
cp .env.example .env.local
# 編輯 .env.local，填入您的金鑰:
# VITE_API_KEY=your_gemini_api_key
# VITE_QDRANT_URL=https://your-cluster.qdrant.io
# VITE_QDRANT_API_KEY=your_qdrant_api_key

# 啟動開發伺服器
npm run dev
```

開啟 `http://localhost:5173` 🎉

### 上傳新書籍內容

```bash
# 上傳單本書籍的特定語言版本
npx tsx upload-single.ts <BOOK_ID> <LANGUAGE>

# 範例:
npx tsx upload-single.ts CHESS_FUNDAMENTALS en
npx tsx upload-single.ts PRIDE_AND_PREJUDICE zh-TW
```

---

## 📦 建置與部署

```bash
# 建置生產版本
npm run build
```

### 部署選項
| 平台 | 指南 |
|------|------|
| **Vercel** | [部署 →](https://vercel.com/new) |
| **Netlify** | [部署 →](https://app.netlify.com/start) |
| **Azure** | 參見 [DEPLOYMENT.md](./DEPLOYMENT.md) |

> ⚠️ 請記得在部署平台設定環境變數！

---

## 🛠️ 技術堆疊

| 類別 | 技術 |
|------|------|
| 前端 | React 19 + TypeScript |
| 建置 | Vite 6.4 |
| 樣式 | TailwindCSS (CDN) |
| 向量資料庫 | Qdrant Cloud (3072維) |
| Embedding | gemini-embedding-001 |
| LLM | gemini-2.5-flash |

---

## 📂 專案結構

```
RAG-LLM-demo/
├── src/
│   ├── components/
│   │   ├── BookSelector.tsx      # 書籍選擇 + AI 設定
│   │   ├── ChatInterface.tsx     # 聊天介面 + RAG 說明
│   │   ├── SplitLayout.tsx       # 響應式分屏面板
│   │   ├── AboutDialog.tsx       # RAG 技術說明對話框
│   │   ├── UsageLimitDialog.tsx  # 使用限制提示
│   │   └── ...
│   ├── services/
│   │   ├── geminiService.ts      # LLM + 查詢翻譯
│   │   ├── qdrantService.ts      # 向量資料庫操作
│   │   ├── embeddingService.ts   # Embedding 生成
│   │   └── usageTracker.ts       # 使用次數追蹤
│   ├── constants.ts              # 書籍定義
│   ├── translations.ts           # i18n 翻譯文字
│   └── App.tsx                   # 主應用程式
├── Books/                        # 書籍文字檔案
│   └── bookCovers/               # 書籍封面圖片
├── upload-single.ts              # CLI 上傳工具
├── DEPLOYMENT.md                 # 部署指南
├── QDRANT_SETUP_GUIDE.md         # Qdrant 設定指南
└── PROJECT_STATUS.md             # 開發紀錄
```

---

## 📖 文件

- 📘 [Qdrant 設定指南](./QDRANT_SETUP_GUIDE.md) - 向量資料庫配置
- 🚀 [部署指南](./DEPLOYMENT.md) - 生產環境部署
- 📊 [專案狀態](./PROJECT_STATUS.md) - 開發歷程

---

## 🔥 RAG 運作流程

```
用戶問題 → [翻譯成英文] → 生成 Embedding → Qdrant 搜索 → 檢索相關段落 → LLM 回答
```

1. **查詢處理**: 非英文查詢自動翻譯以提升向量搜索效果
2. **向量搜索**: 從 Qdrant 找出最相關的 5 個文字區塊
3. **上下文組裝**: 檢索到的段落成為 AI 的知識庫
4. **回答生成**: Gemini 嚴格基於檢索內容生成回答

---

## 🤝 貢獻

歡迎貢獻！您可以：
- 🐛 回報 Bug
- 💡 建議新功能
- 🔧 提交 Pull Request

---

## 📝 授權

MIT License

---

**Made with ❤️ for AI-powered storytelling**
