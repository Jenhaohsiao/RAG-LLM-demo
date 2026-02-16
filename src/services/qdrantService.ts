import { QdrantClient } from '@qdrant/qdrant-js';
import { Language } from '../translations';

// Qdrant 配置
const getQdrantConfig = () => {
  // 在瀏覽器中使用代理路徑，在 Node.js 中使用直接 URL
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    // 瀏覽器環境：使用 Vite 代理
    return {
      url: '/api/qdrant',
      apiKey: undefined // API Key 在代理中處理
    };
  } else {
    // Node.js 環境：直接連接
    const url = (typeof process !== 'undefined' && process.env?.VITE_QDRANT_URL) || '';
    const apiKey = (typeof process !== 'undefined' && process.env?.VITE_QDRANT_API_KEY) || '';
    
    if (!url || !apiKey) {
      throw new Error('Qdrant URL 和 API Key 必須在環境變數中設置');
    }
    
    return { url, apiKey };
  }
};

const COLLECTION_NAME = 'books_collection';

// 向量維度（Gemini embedding-001 使用 768 維度）
const VECTOR_DIMENSION = 768;

// 初始化 Qdrant 客戶端
let qdrantClient: QdrantClient | null = null;

export const getQdrantClient = (): QdrantClient => {
  if (!qdrantClient) {
    const config = getQdrantConfig();
    
    qdrantClient = new QdrantClient(config);
    
    console.log('✅ Qdrant 客戶端已初始化');
  }
  
  return qdrantClient;
};

/**
 * 檢查集合是否存在
 */
export const checkCollectionExists = async (): Promise<boolean> => {
  try {
    const client = getQdrantClient();
    const collections = await client.getCollections();
    return collections.collections.some(col => col.name === COLLECTION_NAME);
  } catch (error) {
    console.error('檢查集合時出錯:', error);
    return false;
  }
};

/**
 * 創建 Qdrant 集合
 */
export const createCollection = async (): Promise<void> => {
  try {
    const client = getQdrantClient();
    const exists = await checkCollectionExists();
    
    if (exists) {
      console.log(`✅ 集合 "${COLLECTION_NAME}" 已存在`);
      return;
    }
    
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_DIMENSION,
        distance: 'Cosine', // 使用餘弦相似度
      },
    });
    
    console.log(`✅ 成功創建集合 "${COLLECTION_NAME}"`);
  } catch (error) {
    console.error('創建集合時出錯:', error);
    throw new Error('無法創建 Qdrant 集合');
  }
};

/**
 * 插入向量到 Qdrant
 */
export interface VectorPoint {
  id: string;
  vector: number[];
  payload: {
    bookId: string;
    bookTitle: string;
    language: Language;
    chunkIndex: number;
    text: string;
    metadata?: Record<string, any>;
  };
}

export const insertVectors = async (points: VectorPoint[]): Promise<void> => {
  try {
    const client = getQdrantClient();
    
    await client.upsert(COLLECTION_NAME, {
      wait: true,
      points: points.map(point => ({
        id: point.id,
        vector: point.vector,
        payload: point.payload,
      })),
    });
    
    console.log(`✅ 成功插入 ${points.length} 個向量點`);
  } catch (error) {
    console.error('插入向量時出錯:', error);
    throw new Error('無法插入向量到 Qdrant');
  }
};

/**
 * 搜索相似向量
 */
export interface SearchResult {
  id: string | number;
  score: number;
  payload: {
    bookId: string;
    bookTitle: string;
    language: Language;
    chunkIndex: number;
    text: string;
    metadata?: Record<string, any>;
  };
}

export const searchSimilarVectors = async (
  queryVector: number[],
  bookId: string,
  language: Language,
  limit: number = 5
): Promise<SearchResult[]> => {
  try {
    const client = getQdrantClient();
    
    const searchResult = await client.search(COLLECTION_NAME, {
      vector: queryVector,
      limit,
      filter: {
        must: [
          {
            key: 'bookId',
            match: { value: bookId }
          },
          {
            key: 'language',
            match: { value: language }
          }
        ]
      },
      with_payload: true,
    });
    
    return searchResult.map(result => ({
      id: result.id,
      score: result.score,
      payload: result.payload as SearchResult['payload'],
    }));
  } catch (error) {
    console.error('搜索向量時出錯:', error);
    throw new Error('無法從 Qdrant 搜索向量');
  }
};

/**
 * 刪除特定書籍的所有向量
 */
export const deleteBookVectors = async (bookId: string): Promise<void> => {
  try {
    const client = getQdrantClient();
    
    await client.delete(COLLECTION_NAME, {
      wait: true,
      filter: {
        must: [
          {
            key: 'bookId',
            match: { value: bookId }
          }
        ]
      },
    });
    
    console.log(`✅ 成功刪除書籍 ${bookId} 的所有向量`);
  } catch (error) {
    console.error('刪除向量時出錯:', error);
    throw new Error('無法刪除向量');
  }
};

/**
 * 獲取集合統計信息
 */
export const getCollectionStats = async () => {
  try {
    const client = getQdrantClient();
    const info = await client.getCollection(COLLECTION_NAME);
    return {
      vectorsCount: info.vectors_count,
      pointsCount: info.points_count,
      status: info.status,
    };
  } catch (error) {
    console.error('獲取集合統計時出錯:', error);
    return null;
  }
};

export { COLLECTION_NAME, VECTOR_DIMENSION };
