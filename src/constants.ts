import { Book, AIPersona, AITone } from './types';

export const BOOKS: Book[] = [
  {
    id: 'CHESS_FUNDAMENTALS',
    title: {
      en: 'Chess Fundamentals',
      'zh-TW': '西洋棋基礎',
      'zh-CN': '国际象棋基础'
    },
    author: {
      en: 'José Raúl Capablanca',
      'zh-TW': '何塞·勞爾·卡帕布蘭卡',
      'zh-CN': '何塞·劳尔·卡帕布兰卡'
    },
    coverColor: 'bg-indigo-600',
    coverImage: '/Books/bookcovers/CHESS FUNDAMENTALS.png',
    summary: {
      en: 'A classic chess instruction book by world champion Capablanca, covering fundamental principles, endgames, and strategic concepts that form the foundation of strong chess play.',
      'zh-TW': '由世界冠軍卡帕布蘭卡撰寫的經典西洋棋教學書籍，涵蓋基本原則、殘局和戰略概念，奠定強大棋力的基礎。',
      'zh-CN': '由世界冠军卡帕布兰卡撰写的经典国际象棋教学书籍，涵盖基本原则、残局和战略概念，奠定强大棋力的基础。'
    },
    context: {
      en: 'Classic chess instruction covering principles, endgames, and strategic concepts.',
      'zh-TW': '經典西洋棋教學，涵蓋原則、殘局和戰略概念。',
      'zh-CN': '经典国际象棋教学，涵盖原则、残局和战略概念。'
    },
    collectionName: 'chess_fundamentals'
  },
  {
    id: 'PRIDE_AND_PREJUDICE',
    title: {
      en: 'Pride and Prejudice',
      'zh-TW': '傲慢與偏見',
      'zh-CN': '傲慢与偏见'
    },
    author: {
      en: 'Jane Austen',
      'zh-TW': '珍·奧斯汀',
      'zh-CN': '简·奥斯汀'
    },
    coverColor: 'bg-emerald-600',
    coverImage: '/Books/bookcovers/Pride and Prejudice.png',
    summary: {
      en: 'A romantic novel of manners that chronicles the relationship between Elizabeth Bennet and Mr. Darcy, exploring themes of love, reputation, and social class in Regency England.',
      'zh-TW': '一部浪漫的社會小說，記述伊莉莎白·班奈特和達西先生之間的關係，探討攝政時期英國的愛情、名譽和社會階級主題。',
      'zh-CN': '一部浪漫的社会小说，记述伊丽莎白·班内特和达西先生之间的关系，探讨摄政时期英国的爱情、名誉和社会阶级主题。'
    },
    context: {
      en: 'Romantic novel exploring love, reputation, and social class in Regency England.',
      'zh-TW': '浪漫小說，探討攝政時期英國的愛情、名譽和社會階級。',
      'zh-CN': '浪漫小说，探讨摄政时期英国的爱情、名誉和社会阶级。'
    },
    collectionName: 'pride_and_prejudice'
  },
  {
    id: 'SOAP_MAKING_MANUAL',
    title: {
      en: 'Soap-Making Manual',
      'zh-TW': '製皂手冊',
      'zh-CN': '制皂手册'
    },
    author: {
      en: 'E. G. Thomssen',
      'zh-TW': 'E. G. 湯姆森',
      'zh-CN': 'E. G. 汤姆森'
    },
    coverColor: 'bg-amber-700',
    coverImage: '/Books/bookcovers/SOAP-MAKING MANUAL.png',
    summary: {
      en: 'A comprehensive guide to the art and science of soap making, covering traditional methods, chemical processes, and practical techniques for crafting quality soaps.',
      'zh-TW': '全面的製皂藝術與科學指南，涵蓋傳統方法、化學過程和製作優質肥皂的實用技術。',
      'zh-CN': '全面的制皂艺术与科学指南，涵盖传统方法、化学过程和制作优质肥皂的实用技术。'
    },
    context: {
      en: 'Comprehensive guide to soap making methods and techniques.',
      'zh-TW': '製皂方法和技術的全面指南。',
      'zh-CN': '制皂方法和技术的全面指南。'
    },
    collectionName: 'soap_making_manual'
  },
  {
    id: 'STANDARD_OIL_HISTORY',
    title: {
      en: 'The History of the Standard Oil Company',
      'zh-TW': '標準石油公司歷史',
      'zh-CN': '标准石油公司历史'
    },
    author: {
      en: 'Ida M. Tarbell',
      'zh-TW': '艾達·塔貝爾',
      'zh-CN': '艾达·塔贝尔'
    },
    coverColor: 'bg-fuchsia-700',
    coverImage: '/Books/bookcovers/THE HISTORY OF THE STANDARD OIL COMPANY.png',
    summary: {
      en: 'An investigative exposé of John D. Rockefeller\'s Standard Oil Company, documenting the rise of America\'s first great business trust and its controversial practices that shaped modern corporate America.',
      'zh-TW': '對約翰·洛克菲勒的標準石油公司進行的調查性揭露，記錄了美國第一個大型商業托拉斯的崛起及其塑造現代美國企業的爭議性做法。',
      'zh-CN': '对约翰·洛克菲勒的标准石油公司进行的调查性揭露，记录了美国第一个大型商业托拉斯的崛起及其塑造现代美国企业的争议性做法。'
    },
    context: {
      en: 'Investigative exposé of Standard Oil and the rise of American business monopolies.',
      'zh-TW': '對標準石油和美國商業壟斷崛起的調查性揭露。',
      'zh-CN': '对标准石油和美国商业垄断崛起的调查性揭露。'
    },
    collectionName: 'standard_oil_history'
  },
  {
    id: 'WIZARD_OF_OZ',
    title: {
      en: 'The Wonderful Wizard of Oz',
      'zh-TW': '綠野仙蹤',
      'zh-CN': '绿野仙踪'
    },
    author: {
      en: 'L. Frank Baum',
      'zh-TW': 'L. 法蘭克·鮑姆',
      'zh-CN': 'L. 弗兰克·鲍姆'
    },
    coverColor: 'bg-slate-800',
    coverImage: '/Books/bookcovers/The Wonderful Wizard of Oz.png',
    summary: {
      en: 'A beloved children\'s fantasy about Dorothy\'s magical journey through the Land of Oz, where she meets unforgettable companions while seeking the great Wizard who can help her return home to Kansas.',
      'zh-TW': '一部深受喜愛的兒童奇幻故事，講述桃樂絲在奧茲國的奇幻旅程，她遇到難忘的夥伴，尋找能幫助她回到堪薩斯家鄉的偉大巫師。',
      'zh-CN': '一部深受喜爱的儿童奇幻故事，讲述桃乐丝在奥兹国的奇幻旅程，她遇到难忘的伙伴，寻找能帮助她回到堪萨斯家乡的伟大巫师。'
    },
    context: {
      en: 'Children\'s fantasy about Dorothy\'s magical journey through the Land of Oz.',
      'zh-TW': '關於桃樂絲在奧茲國奇幻旅程的兒童奇幻故事。',
      'zh-CN': '关于桃乐丝在奥兹国奇幻旅程的儿童奇幻故事。'
    },
    collectionName: 'wizard_of_oz'
  }
];

export const PERSONAS = Object.values(AIPersona);
export const TONES = Object.values(AITone);
