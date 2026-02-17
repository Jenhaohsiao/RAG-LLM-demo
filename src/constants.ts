import { Book, AIPersona, AITone } from './types';

// Book card colors - vivid and distinct
export const BOOK_COLORS = {
  CHESS_FUNDAMENTALS: {
    bg: 'bg-gradient-to-br from-violet-500 to-purple-700',
    border: 'border-violet-400',
    hover: 'hover:shadow-violet-300',
    text: 'text-violet-600'
  },
  PRIDE_AND_PREJUDICE: {
    bg: 'bg-gradient-to-br from-rose-400 to-pink-600',
    border: 'border-rose-400',
    hover: 'hover:shadow-rose-300',
    text: 'text-rose-600'
  },
  SOAP_MAKING_MANUAL: {
    bg: 'bg-gradient-to-br from-amber-400 to-orange-600',
    border: 'border-amber-400',
    hover: 'hover:shadow-amber-300',
    text: 'text-amber-600'
  }
};

export const BOOKS: Book[] = [
  {
    id: 'CHESS_FUNDAMENTALS',
    title: {
      en: 'Chess Fundamentals',
      'zh-TW': '西洋棋基礎'
    },
    author: {
      en: 'José Raúl Capablanca',
      'zh-TW': '何塞·勞爾·卡帕布蘭卡'
    },
    coverColor: 'bg-violet-600',
    coverImage: '/Books/bookCovers/CHESS FUNDAMENTALS.png',
    summary: {
      en: 'Written by the legendary Cuban World Chess Champion José Raúl Capablanca, this timeless masterpiece teaches chess through crystal-clear explanations and practical examples. Published in 1921, it covers essential opening principles, powerful middlegame strategies, and precise endgame techniques. Capablanca, known for his intuitive and elegant playing style, breaks down complex positions into understandable concepts. The book emphasizes the importance of pawn structure, piece coordination, and positional understanding over memorization. Perfect for beginners and intermediate players seeking to build a solid foundation.',
      'zh-TW': '由傳奇古巴世界西洋棋冠軍何塞·勞爾·卡帕布蘭卡所著，這部不朽的經典名作透過清晰易懂的解釋和實用範例教授西洋棋。本書於1921年出版，涵蓋基本開局原則、強大的中盤戰術和精準的殘局技巧。卡帕布蘭卡以其直覺敏銳且優雅的棋風聞名，將複雜的棋局分解成易於理解的概念。書中強調兵型結構、棋子協調和位置理解的重要性，而非死記硬背。非常適合希望建立扎實基礎的初學者和中級棋手。'
    },
    context: {
      en: 'Classic chess instruction covering principles, endgames, and strategic concepts.',
      'zh-TW': '經典西洋棋教學，涵蓋原則、殘局和戰略概念。'
    },
    collectionName: 'chess_fundamentals'
  },
  {
    id: 'PRIDE_AND_PREJUDICE',
    title: {
      en: 'Pride and Prejudice',
      'zh-TW': '傲慢與偏見'
    },
    author: {
      en: 'Jane Austen',
      'zh-TW': '珍·奧斯汀'
    },
    coverColor: 'bg-rose-500',
    coverImage: '/Books/bookCovers/Pride and Prejudice.png',
    summary: {
      en: 'Jane Austen\'s most beloved novel follows the spirited Elizabeth Bennet and her complex relationship with the proud Mr. Darcy. Set in Regency-era England, this witty romantic comedy explores themes of love, reputation, class, and personal growth. When the wealthy Mr. Bingley arrives in the neighborhood with his friend Mr. Darcy, the Bennet family sees opportunities for advantageous marriages. But misunderstandings, wounded pride, and initial prejudices must be overcome before true love can prevail. With sharp social commentary and unforgettable characters, this 1813 masterpiece remains a timeless exploration of human nature.',
      'zh-TW': '珍·奧斯汀最受喜愛的小說，講述機智的伊麗莎白·班奈特與傲慢的達西先生之間複雜的愛情故事。故事背景設定在英國攝政時期，這部詼諧的浪漫喜劇探討愛情、名譽、階級和個人成長的主題。當富有的賓利先生和朋友達西先生來到鄰近地區時，班奈特家看到了有利婚姻的機會。然而，誤解、受傷的自尊和最初的偏見必須被克服，真愛才能開花結果。這部1813年的傑作以犀利的社會評論和令人難忘的角色，至今仍是對人性的永恆探索。'
    },
    context: {
      en: 'Romantic novel exploring love, reputation, and social class in Regency England.',
      'zh-TW': '浪漫小說，探討攝政時期英國的愛情、名譽和社會階級。'
    },
    collectionName: 'pride_and_prejudice'
  },
  {
    id: 'SOAP_MAKING_MANUAL',
    title: {
      en: 'Soap-Making Manual',
      'zh-TW': '製皂手冊'
    },
    author: {
      en: 'E. G. Thomssen',
      'zh-TW': 'E. G. 湯姆森'
    },
    coverColor: 'bg-amber-500',
    coverImage: '/Books/bookCovers/SOAP-MAKING MANUAL.png',
    summary: {
      en: 'This comprehensive technical guide by E.G. Thomssen covers the complete science and art of soap manufacturing. From understanding the chemistry of saponification to practical production methods, this manual provides detailed instructions for creating various types of soaps. Learn about different fats and oils, alkali solutions, temperature control, and curing processes. The book includes formulas for toilet soaps, laundry soaps, and specialty products. Whether you\'re a hobbyist or aspiring professional, this classic text offers invaluable knowledge about one of humanity\'s oldest crafts, combining traditional techniques with scientific principles.',
      'zh-TW': 'E.G. 湯姆森撰寫的這本全面技術指南涵蓋了製皂的完整科學與藝術。從理解皂化反應的化學原理到實用的生產方法，本手冊提供了製作各種肥皂的詳細說明。您將學習不同的油脂、鹼液、溫度控制和固化過程。書中包含香皂、洗衣皂和特殊產品的配方。無論您是業餘愛好者還是有志成為專業人士，這部經典著作都提供了關於人類最古老工藝之一的寶貴知識，將傳統技術與科學原理完美結合。'
    },
    context: {
      en: 'Comprehensive guide to soap making methods and techniques.',
      'zh-TW': '製皂方法和技術的全面指南。'
    },
    collectionName: 'soap_making_manual'
  }
];

export const PERSONAS = Object.values(AIPersona);
export const TONES = Object.values(AITone);

// Initial starter questions for each book (displayed when chat is empty)
export const STARTER_QUESTIONS: Record<string, { en: string; 'zh-TW': string }[]> = {
  CHESS_FUNDAMENTALS: [
    { en: 'What are the key principles for beginners to master chess?', 'zh-TW': '初學者掌握西洋棋的關鍵原則是什麼？' },
    { en: 'How important is pawn structure in chess strategy?', 'zh-TW': '兵型結構在西洋棋策略中有多重要？' }
  ],
  PRIDE_AND_PREJUDICE: [
    { en: 'What are the main themes explored in this novel?', 'zh-TW': '這部小說探討了哪些主要主題？' },
    { en: 'How does Elizabeth Bennet\'s character evolve throughout the story?', 'zh-TW': '伊麗莎白·班奈特的性格在故事中如何演變？' }
  ],
  SOAP_MAKING_MANUAL: [
    { en: 'What is the basic chemistry behind soap making?', 'zh-TW': '製皂背後的基本化學原理是什麼？' },
    { en: 'What types of oils are commonly used in soap production?', 'zh-TW': '製皂常用哪些類型的油脂？' }
  ]
};
