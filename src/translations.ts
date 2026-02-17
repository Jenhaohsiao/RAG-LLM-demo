export type Language = 'en' | 'zh-TW';

export interface Translations {
  // Header & Navigation
  appTitle: string;
  aiAssistant: string;
  ragBadge: string;
  
  // Book Selector
  knowledgeBase: string;
  selectSourceAndConfig: string;
  availableSources: string;
  synopsis: string;
  aiConfiguration: string;
  role: string;
  tone: string;
  vectorDbConnected: string;
  vectorDbChecking: string;
  connectionError: string;
  
  // AI Personas  
  librarian: string;
  critic: string;
  superFan: string;
  theAuthor: string;
  
  // AI Tones
  formal: string;
  casual: string;
  humorous: string;
  mysterious: string;
  
  // Chat Interface
  messages: string;
  exportChat: string;
  startConversation: string;
  askQuestions: string;
  thinking: string;
  typeMessage: string;
  sendMessage: string;
  aiDisclaimer: string;
  
  // Confirm Dialog
  switchKnowledgeBase: string;
  switchWarning: string;
  switch: string;
  cancel: string;
  confirm: string;
  
  // Error Messages
  somethingWrong: string;
  reloadApplication: string;
}

const en: Translations = {
  appTitle: 'RAG Storyteller',
  aiAssistant: 'AI Assistant',
  ragBadge: 'RAG',
  knowledgeBase: 'Knowledge Base',
  selectSourceAndConfig: 'Select a source and configure AI',
  availableSources: 'Available Sources',
  synopsis: 'Synopsis',
  aiConfiguration: 'AI Configuration',
  role: 'Role',
  tone: 'Tone',
  vectorDbConnected: 'Vector DB Connected',
  vectorDbChecking: 'Checking...',
  connectionError: 'Connection Error',
  librarian: 'Librarian',
  critic: 'Critic',
  superFan: 'Super Fan',
  theAuthor: 'The Author',
  formal: 'Formal',
  casual: 'Casual',
  humorous: 'Humorous',
  mysterious: 'Mysterious',
  messages: 'messages',
  exportChat: 'Export chat',
  startConversation: 'Start a Conversation',
  askQuestions: 'Ask questions about',
  thinking: 'Thinking...',
  typeMessage: 'Ask about the story... (Shift+Enter for new line)',
  sendMessage: 'Send message (Enter)',
  aiDisclaimer: 'AI responses powered by Gemini. May contain inaccuracies.',
  switchKnowledgeBase: 'Switch Knowledge Base?',
  switchWarning: 'Switching to "{title}" will clear your current conversation. Do you want to continue?',
  switch: 'Switch',
  cancel: 'Cancel',
  confirm: 'Confirm',
  somethingWrong: 'Something went wrong',
  reloadApplication: 'Reload Application',
};

const zhTW: Translations = {
  appTitle: 'RAG 智能說書',
  aiAssistant: 'AI 助手',
  ragBadge: 'RAG',
  knowledgeBase: '知識庫',
  selectSourceAndConfig: '選擇來源並配置 AI',
  availableSources: '可用來源',
  synopsis: '簡介',
  aiConfiguration: 'AI 配置',
  role: '角色',
  tone: '語調',
  vectorDbConnected: '向量資料庫已連接',
  vectorDbChecking: '檢查中...',
  connectionError: '連接錯誤',
  librarian: '圖書管理員',
  critic: '文學評論家',
  superFan: '超級粉絲',
  theAuthor: '原作者',
  formal: '正式',
  casual: '輕鬆',
  humorous: '幽默',
  mysterious: '神秘',
  messages: '條訊息',
  exportChat: '匯出對話',
  startConversation: '開始對話',
  askQuestions: '詢問關於',
  thinking: '思考中...',
  typeMessage: '詢問故事相關問題... (Shift+Enter 換行)',
  sendMessage: '發送訊息 (Enter)',
  aiDisclaimer: 'AI 回應由 Gemini 提供支援。可能包含不準確資訊。',
  switchKnowledgeBase: '切換知識庫？',
  switchWarning: '切換到「{title}」將清空目前的對話。是否繼續？',
  switch: '切換',
  cancel: '取消',
  confirm: '確認',
  somethingWrong: '發生錯誤',
  reloadApplication: '重新載入應用程式',
};

export const translations: Record<Language, Translations> = {
  'en': en,
  'zh-TW': zhTW,
};

export const languageNames: Record<Language, string> = {
  'en': 'English',
  'zh-TW': '繁體中文',
};
