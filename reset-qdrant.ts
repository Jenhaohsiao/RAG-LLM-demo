/**
 * 重置 Qdrant 集合
 * 刪除現有集合並重新創建，確保使用正確的向量維度
 */
import * as dotenv from 'dotenv';
import { QdrantClient } from '@qdrant/qdrant-js';

// 載入環境變數
dotenv.config({ path: '.env.local' });

const COLLECTION_NAME = 'books_collection';
const VECTOR_DIMENSION = 3072; // gemini-embedding-001 實際維度

async function resetCollection() {
  try {
    const url = process.env.VITE_QDRANT_URL;
    const apiKey = process.env.VITE_QDRANT_API_KEY;
    
    if (!url || !apiKey) {
      throw new Error('Qdrant URL 和 API Key 必須在 .env.local 中設置');
    }
    
    const client = new QdrantClient({ url, apiKey });
    
    console.log('🗑️  檢查集合是否存在...');
    const collections = await client.getCollections();
    const exists = collections.collections.some(col => col.name === COLLECTION_NAME);
    
    if (exists) {
      console.log(`🗑️  刪除現有集合 "${COLLECTION_NAME}"...`);
      await client.deleteCollection(COLLECTION_NAME);
      console.log('✅ 集合已刪除');
    } else {
      console.log('✅ 集合不存在，無需刪除');
    }
    
    console.log(`\n🔨 創建新集合 "${COLLECTION_NAME}"...`);
    console.log(`📊 向量維度: ${VECTOR_DIMENSION} (gemini-embedding-001)`);
    
    await client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_DIMENSION,
        distance: 'Cosine',
      },
    });
    
    console.log('✅ 集合創建成功！');
    
    // 創建 payload 索引（用於過濾查詢）
    console.log('\n🔨 創建 payload 索引...');
    
    await client.createPayloadIndex(COLLECTION_NAME, {
      field_name: 'bookId',
      field_schema: 'keyword'
    });
    console.log('✅ bookId 索引創建成功');
    
    await client.createPayloadIndex(COLLECTION_NAME, {
      field_name: 'language',
      field_schema: 'keyword'
    });
    console.log('✅ language 索引創建成功');
    
    console.log('\n💡 現在可以運行 npm run process-books 來上傳書籍數據');
    
  } catch (error) {
    console.error('\n❌ 重置集合時發生錯誤:', error);
    process.exit(1);
  }
}

resetCollection();
