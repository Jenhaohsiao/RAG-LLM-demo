import { QdrantClient } from '@qdrant/qdrant-js';
import { Language } from '../translations';

// 檢測是否在瀏覽器環境
const isBrowser = typeof window !== 'undefined';

// Qdrant 配置 - 只在 Node.js 環境使用
const getQdrantConfig = () => {
  // Node.js 環境：直接連接
  const url = (typeof process !== 'undefined' && process.env?.VITE_QDRANT_URL) || '';
  const apiKey = (typeof process !== 'undefined' && process.env?.VITE_QDRANT_API_KEY) || '';
  
  if (!url || !apiKey) {
    throw new Error('Qdrant URL 和 API Key 必須在環境變數中設置');
  }
  
  return { url, apiKey };
};

const COLLECTION_NAME = 'books_collection';

// 瀏覽器環境的 API 端點（使用 Vite proxy）
const BROWSER_API_BASE = '/api/qdrant';

// 向量維度（gemini-embedding-001 實際使用 3072 維度）
const VECTOR_DIMENSION = 3072;

// 初始化 Qdrant 客戶端 (僅 Node.js 環境)
let qdrantClient: QdrantClient | null = null;

export const getQdrantClient = (): QdrantClient => {
  if (isBrowser) {
    throw new Error('QdrantClient 不支援瀏覽器環境，請使用 fetch API 函數');
  }
  
  if (!qdrantClient) {
    const config = getQdrantConfig();
    qdrantClient = new QdrantClient(config);
    console.log('✅ Qdrant 客戶端已初始化 (Node.js)');
  }
  
  return qdrantClient;
};

/**
 * 檢查集合是否存在
 */
export const checkCollectionExists = async (): Promise<boolean> => {
  try {
    if (isBrowser) {
      // 瀏覽器環境：使用 fetch API
      const response = await fetch(`${BROWSER_API_BASE}/collections`);
      if (!response.ok) return false;
      const data = await response.json();
      return data.result?.collections?.some((col: any) => col.name === COLLECTION_NAME) || false;
    } else {
      // Node.js 環境：使用 QdrantClient
      const client = getQdrantClient();
      const collections = await client.getCollections();
      return collections.collections.some(col => col.name === COLLECTION_NAME);
    }
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

/**
 * 瀏覽器環境：使用 fetch API 搜索向量
 */
const searchWithFetch = async (
  queryVector: number[],
  bookId: string,
  language: Language,
  limit: number = 5
): Promise<SearchResult[]> => {
  console.log('🌐 使用瀏覽器 fetch API 搜索 Qdrant');
  
  const searchUrl = `${BROWSER_API_BASE}/collections/${COLLECTION_NAME}/points/search`;
  
  const requestBody = {
    vector: queryVector,
    limit,
    filter: {
      must: [
        { key: 'bookId', match: { value: bookId } },
        { key: 'language', match: { value: language } }
      ]
    },
    with_payload: true
  };
  
  console.log('📤 搜索請求:', { url: searchUrl, bookId, language, limit, vectorLength: queryVector.length });
  
  const response = await fetch(searchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Qdrant 搜索失敗:', response.status, errorText);
    throw new Error(`Qdrant 搜索失敗: ${response.status} ${errorText}`);
  }
  
  const data = await response.json();
  console.log('📥 搜索結果:', { count: data.result?.length || 0 });
  
  return (data.result || []).map((result: any) => ({
    id: result.id,
    score: result.score,
    payload: result.payload as SearchResult['payload']
  }));
};

/**
 * Node.js 環境：使用 QdrantClient 搜索向量
 */
const searchWithClient = async (
  queryVector: number[],
  bookId: string,
  language: Language,
  limit: number = 5
): Promise<SearchResult[]> => {
  console.log('🖥️ 使用 QdrantClient 搜索 (Node.js)');
  
  const client = getQdrantClient();
  
  const searchResult = await client.search(COLLECTION_NAME, {
    vector: queryVector,
    limit,
    filter: {
      must: [
        { key: 'bookId', match: { value: bookId } },
        { key: 'language', match: { value: language } }
      ]
    },
    with_payload: true,
  });
  
  return searchResult.map(result => ({
    id: result.id,
    score: result.score,
    payload: result.payload as SearchResult['payload'],
  }));
};

export const searchSimilarVectors = async (
  queryVector: number[],
  bookId: string,
  language: Language,
  limit: number = 5
): Promise<SearchResult[]> => {
  try {
    if (isBrowser) {
      return await searchWithFetch(queryVector, bookId, language, limit);
    } else {
      return await searchWithClient(queryVector, bookId, language, limit);
    }
  } catch (error) {
    console.error('搜索向量時出錯:', error);
    throw new Error('無法從 Qdrant 搜索向量');
  }
};

/**
 * 檢查特定書籍的特定語言版本是否已存在
 */
export const checkBookLanguageExists = async (
  bookId: string,
  language: Language
): Promise<boolean> => {
  try {
    if (isBrowser) {
      // 瀏覽器環境：使用 fetch API scroll 端點
      const response = await fetch(`${BROWSER_API_BASE}/collections/${COLLECTION_NAME}/points/scroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filter: {
            must: [
              { key: 'bookId', match: { value: bookId } },
              { key: 'language', match: { value: language } }
            ]
          },
          limit: 1,
          with_payload: false
        })
      });
      if (!response.ok) return false;
      const data = await response.json();
      return (data.result?.points?.length || 0) > 0;
    } else {
      // Node.js 環境：使用 QdrantClient
      const client = getQdrantClient();
      const result = await client.scroll(COLLECTION_NAME, {
        filter: {
          must: [
            { key: 'bookId', match: { value: bookId } },
            { key: 'language', match: { value: language } }
          ]
        },
        limit: 1,
        with_payload: false,
      });
      return result.points.length > 0;
    }
  } catch (error) {
    console.error('檢查書籍語言版本時出錯:', error);
    return false;
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
    if (isBrowser) {
      // 瀏覽器環境：使用 fetch API
      const response = await fetch(`${BROWSER_API_BASE}/collections/${COLLECTION_NAME}`);
      if (!response.ok) return null;
      const data = await response.json();
      return {
        vectorsCount: data.result?.indexed_vectors_count || data.result?.vectors_count,
        pointsCount: data.result?.points_count,
        status: data.result?.status,
      };
    } else {
      // Node.js 環境：使用 QdrantClient
      const client = getQdrantClient();
      const info = await client.getCollection(COLLECTION_NAME);
      return {
        vectorsCount: info.indexed_vectors_count,
        pointsCount: info.points_count,
        status: info.status,
      };
    }
  } catch (error) {
    console.error('獲取集合統計時出錯:', error);
    return null;
  }
};

export { COLLECTION_NAME, VECTOR_DIMENSION };
