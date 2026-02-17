# 📊 RAG Storyteller - 專案狀態

> **最後更新**: 2026-02-16  
> **專案狀態**: ✅ **Production Ready**  
> **語言支援**: 英文 (en) + 繁體中文 (zh-TW)

---

## 🎯 專案概述

**RAG-LLM-demo** 是一個基於 Vector Database + LLM 的 RAG (Retrieval-Augmented Generation) 應用程式，提供智能書籍助手功能。

### 核心特色
- 🤖 **真實 RAG 架構**: Qdrant Vector DB + Gemini LLM
- 🌍 **雙語言支援**: 英文、繁體中文 UI
- 🔄 **智能查詢翻譯**: 自動將非英文查詢翻譯成英文進行搜索
- 🎨 **現代化 UI**: 響應式設計、50-50 分屏佈局
- 📚 **智能對話**: 基於書籍內容的 AI 助手（約 80 字簡潔回答）

### 技術堆疊
| 類別 | 技術 |
|------|------|
| 前端 | React 19 + TypeScript + Vite 6.4 |
| 樣式 | Tailwind CSS (CDN) |
| 向量資料庫 | Qdrant Cloud |
| Embedding | gemini-embedding-001 (3072維) |
| LLM | gemini-2.5-flash |
| 部署 | Netlify / Vercel / Azure |

---

## 📚 書籍資料庫 (3 本書 × 2 語言 = 6 版本)

| 書籍 | 英文 (en) | 繁體中文 (zh-TW) |
|------|-----------|------------------|
| Chess Fundamentals | ✅ 262 chunks | ✅ 262 chunks |
| Pride and Prejudice | ✅ 823 chunks | ✅ 823 chunks |
| Soap-Making Manual | ✅ 1404 chunks | ✅ 468 chunks |

**Qdrant 配置**:
- Collection: `books_collection`
- Dimension: 3072 (Cosine)
- Total Vectors: ~4042
- Payload Indexes: bookId, language

---

## 📂 專案結構

```
RAG-LLM-demo/
├── src/
│   ├── App.tsx                 # 主應用
│   ├── main.tsx                # 入口點
│   ├── constants.ts            # 書籍定義 (3本)
│   ├── translations.ts         # 翻譯文字 (en, zh-TW)
│   ├── types.ts                # TypeScript 類型
│   ├── LanguageContext.tsx     # 語言 Context
│   ├── components/
│   │   ├── BookSelector.tsx    # 書籍選擇器
│   │   ├── ChatInterface.tsx   # 聊天介面
│   │   ├── SplitLayout.tsx     # 分屏佈局
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── ErrorBoundary.tsx
│   └── services/
│       ├── geminiService.ts    # Gemini LLM + 查詢翻譯
│       ├── qdrantService.ts    # Qdrant 向量 DB
│       └── embeddingService.ts # Embedding 生成
├── Books/                      # 書籍文字檔案
├── upload-single.ts            # 單本上傳腳本
├── PROJECT_STATUS.md           # 本文件
├── README.md                   # 英文說明
├── README_ZH.md                # 中文說明
├── QDRANT_SETUP_GUIDE.md       # Qdrant 設置指南
└── DEPLOYMENT.md               # 部署指南
```

---

## 🚀 快速開始

### 安裝
```bash
npm install
```

### 配置環境變數
```bash
cp .env.example .env.local
# 編輯 .env.local:
# VITE_API_KEY=your-gemini-api-key
# VITE_QDRANT_URL=your-qdrant-url
# VITE_QDRANT_API_KEY=your-qdrant-api-key
```

### 開發
```bash
npm run dev
```

### 上傳新書籍
```bash
npx tsx upload-single.ts <BOOK_ID> <LANGUAGE>
# 例: npx tsx upload-single.ts CHESS_FUNDAMENTALS en
```

---

## 🔧 RAG 流程

```
用戶問題 → [翻譯成英文] → 生成 Embedding → Qdrant 搜索 → 檢索相關段落 → LLM 生成回答
```

### 特色功能
1. **查詢翻譯**: 非英文查詢自動翻譯成英文，提高搜索準確度
2. **簡潔回答**: AI 回答限制約 80 字，直接明確
3. **翻譯提示**: 中文 UI 時，AI 回答末尾標註「基於英文原文翻譯」

---

## 📅 變更歷史

### 2026-02-16
- ✅ 書籍縮減為 3 本 (移除 Standard Oil History, Wizard of Oz)
- ✅ 移除簡體中文 (zh-CN) 支援
- ✅ 新增查詢翻譯功能 (translateQueryToEnglish)
- ✅ AI 回答限制約 80 字
- ✅ 中文回答加上翻譯提示
- ✅ UI 文字尺寸放大一級
- ✅ 修復前端 Qdrant 連接問題 (使用 fetch API)
- ✅ 清理冗餘檔案和測試腳本

---
