import { Book, AIPersona, AITone } from './types';

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
    coverColor: 'bg-indigo-600',
    coverImage: '/Books/bookcovers/CHESS FUNDAMENTALS.png',
    summary: {
      en: 'A classic chess instruction book by world champion Capablanca, covering fundamental principles, endgames, and strategic concepts that form the foundation of strong chess play.',
      'zh-TW': '由世界冠軍卡帕布蘭卡撰寫的經典西洋棋教學書籍，涵蓋基本原則、殘局和戰略概念，奠定強大棋力的基礎。'
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
    coverColor: 'bg-emerald-600',
    coverImage: '/Books/bookcovers/Pride and Prejudice.png',
    summary: {
      en: 'A romantic novel of manners that chronicles the relationship between Elizabeth Bennet and Mr. Darcy, exploring themes of love, reputation, and social class in Regency England.',
      'zh-TW': '一部浪漫的社會小說，記述伊莉莎白·班奈特和達西先生之間的關係，探討攝政時期英國的愛情、名譽和社會階級主題。'
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
    coverColor: 'bg-amber-700',
    coverImage: '/Books/bookcovers/SOAP-MAKING MANUAL.png',
    summary: {
      en: 'A comprehensive guide to the art and science of soap making, covering traditional methods, chemical processes, and practical techniques for crafting quality soaps.',
      'zh-TW': '全面的製皂藝術與科學指南，涵蓋傳統方法、化學過程和製作優質肥皂的實用技術。'
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
