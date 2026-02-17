# 🚀 Production-Grade RAG Storyteller

一個基於 **Vector Database + LLM** 的 Production-ready RAG（Retrieval-Augmented Generation）架構應用程式。使用者可以從 5 本預先 embedding 的書籍中選擇一本，讓 AI 助理基於該書內容進行智慧互動。

## ✨ 核心特色

### 🎯 技術架構
- **RAG 架構**: Vector Database + Google Gemini LLM
- **預先 Embedding**: 5 本書籍內容已預處理並固定
- **智慧對話**: AI 根據選定書籍內容進行回答
- **Production-Ready**: 錯誤處理、Loading 狀態、優雅降級

### 🎨 UI/UX 設計
- **動態分屏佈局**: 
  - 🖱️ Hover 右側：右 70% / 左 30% (預設)
  - 🖱️ Hover 左側：左 70% / 右 30%
  - 🔒 鎖定功能：固定當前比例
  - 📱 全螢幕模式：左側或右側獨立 100% 展開
  
- **左側面板 - 知識庫選擇器**:
  - 📚 5 本書籍 3D 視覺效果
  - 📖 詳細書籍簡介（約 100 字）
  - 🎭 AI 角色選擇（Librarian, Critic, Super Fan, Author）
  - 🎵 語氣選擇（Formal, Casual, Humorous, Mysterious）
  
- **右側面板 - AI 助理**:
  - 💬 ChatGPT 風格聊天介面
  - ⚡ 即時消息顯示
  - 🎯 上下文感知回覆

### 🔄 智慧功能
- ✅ 切換書籍時自動重置對話
- ✅ 每本書獨立的對話會話
- ✅ 角色和語氣即時調整
- ✅ Vector DB 狀態即時顯示

## 🛠️ 技術堆疊

- **前端框架**: React 19 + TypeScript
- **構建工具**: Vite
- **樣式**: TailwindCSS + 自定義 CSS 動畫
- **向量資料庫**: Qdrant Cloud (3072 維)
- **Embedding**: gemini-embedding-001
- **LLM**: gemini-2.5-flash
- **部署**: 靜態網站託管（Vercel, Netlify, Azure Static Web Apps）

## 📦 安裝與運行

### 1. 克隆專案
```bash
git clone <your-repo-url>
cd RAG-LLM-demo
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設定環境變數
創建 `.env.local` 文件並添加您的 Gemini API Key：
```env
VITE_API_KEY=your_gemini_api_key_here
```

**取得 API Key**: 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. 啟動開發伺服器
```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動

### 5. 構建生產版本
```bash
npm run build
```

構建產物將輸出到 `dist/` 目錄

## 🚀 雲端部署指南

### 選項 1: Vercel (推薦)
1. 連接 GitHub 倉庫到 Vercel
2. 在 Vercel 設定中添加環境變數 `VITE_API_KEY`
3. 自動部署完成

### 選項 2: Netlify
```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 構建並部署
npm run build
netlify deploy --prod --dir=dist
```

### 選項 3: Azure Static Web Apps
1. 創建 Azure Static Web App 資源
2. 連接 GitHub 倉庫
3. 設定構建配置：
   - App location: `/`
   - Output location: `dist`
4. 在 Configuration 中設定環境變數

## 📖 使用指南

### 選擇書籍
1. 在左側面板瀏覽 5 本可用書籍
2. 點擊書籍封面以選擇
3. 查看詳細的書籍簡介和狀態

### 配置 AI 助理
- **角色 (Role)**: 選擇 AI 的身份（圖書館員、評論家、粉絲、作者）
- **語氣 (Tone)**: 調整對話風格（正式、隨意、幽默、神秘）

### 開始對話
1. 在右側聊天介面輸入問題
2. AI 將基於選定書籍內容回答
3. 切換書籍時對話會自動重置

### 佈局控制
- **Hover**: 將滑鼠移到左側或右側以調整面板寬度
- **鎖定**: 點擊中間的鎖定圖示固定當前佈局
- **全螢幕**: 點擊左/右箭頭將該側展開至 100%
- **恢復**: 全螢幕模式下點擊邊緣的恢復圖示

## 🎨 自定義書籍內容

編輯 `constants.ts` 來添加或修改書籍：

```typescript
export const BOOKS: Book[] = [
  {
    id: 'b1',
    title: '您的書名',
    author: '作者名',
    coverColor: 'bg-indigo-600', // TailwindCSS 顏色
    summary: '約 100 字的書籍簡介...',
    context: `
      [RAG CONTEXT: 您的書名]
      這裡放置用於 Vector DB 的詳細內容...
      包括劇情、角色、主題等資訊
    `
  },
  // ... 更多書籍
];
```

## 🔧 Production 優化建議

### 1. Vector Database 整合
當前版本使用內嵌的 context 字串模擬 Vector DB。在生產環境中，建議整合：
- **Pinecone**: 全託管向量資料庫
- **Weaviate**: 開源向量搜尋引擎
- **Azure Cognitive Search**: 微軟雲端搜尋服務
- **Chroma**: 輕量級 embedding 資料庫

### 2. 增強 Embedding
```bash
# 使用 OpenAI 或其他模型預處理書籍內容
pip install sentence-transformers
```

### 3. 快取策略
- 使用 Redis 快取常見問答
- 實施 CDN 靜態資源加速

### 4. 監控與分析
- 整合 Google Analytics
- 添加錯誤追蹤（Sentry）
- API 使用量監控

### 5. 安全性
- API Key 使用後端 Proxy
- 實施速率限制
- CORS 配置

## 📊 專案結構

```
RAG-LLM-demo/
├── src/
│   ├── components/
│   │   ├── BookSelector.tsx      # 左側書籍選擇器
│   │   ├── ChatInterface.tsx     # 右側聊天介面
│   │   ├── SplitLayout.tsx       # 分屏佈局管理
│   │   └── LanguageSwitcher.tsx  # 語言切換器
│   ├── services/
│   │   ├── geminiService.ts      # Gemini LLM 服務
│   │   ├── qdrantService.ts      # Qdrant 向量 DB
│   │   └── embeddingService.ts   # Embedding 生成
│   ├── constants.ts              # 書籍資料和配置
│   ├── types.ts                  # TypeScript 類型定義
│   ├── translations.ts           # 翻譯文字
│   └── App.tsx                   # 主應用程式組件
├── Books/                        # 書籍文字檔案
├── upload-single.ts              # 單本上傳腳本
└── vite.config.ts                # Vite 配置
```

## 🎯 功能演示

### 分屏佈局
- 默認狀態：左 30% / 右 70%
- Hover 左側：左 70% / 右 30%
- Hover 右側：左 30% / 右 70%
- 鎖定模式：保持當前比例
- 全屏模式：單側 100%

### 書籍選擇
- 3D 書本視覺效果
- 點擊選擇並高亮顯示
- 自動顯示詳細資訊
- Vector DB 連接狀態指示

### AI 互動
- 根據角色和語氣調整回答
- 基於選定書籍內容的 RAG 檢索
- 消息歷史保留
- 切換書籍時對話重置

## 🐛 故障排除

### API 錯誤
- 確認 `.env.local` 中的 API Key 正確
- 檢查 Gemini API 配額是否足夠
- 查看瀏覽器控制台錯誤訊息

### 樣式問題
- 清除瀏覽器快取
- 確認 TailwindCSS CDN 已載入
- 檢查自定義 CSS 是否衝突

### 部署問題
- 確認環境變數已在部署平台設置
- 檢查構建日誌錯誤
- 驗證 `dist/` 目錄正確生成

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests！

## 📄 授權

MIT License

## 🙏 致謝

- Google Gemini API
- React + Vite
- TailwindCSS
- 所有開源貢獻者

---

**Made with ❤️ for AI-powered storytelling**
