/**
 * 文字檔案處理和 Embedding 腳本
 * 
 * 此腳本會：
 * 1. 讀取 data/ 目錄下的所有文字檔案
 * 2. 將文字分割成適當大小的塊
 * 3. 使用 Gemini Embedding API 生成向量
 * 4. 將向量存儲到 Qdrant 雲端資料庫
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// 載入環境變數
dotenv.config({ path: '.env.local' });

import {
  createCollection,
  insertVectors,
  getCollectionStats,
  VectorPoint,
} from '../services/qdrantService';
import {
  generateBatchEmbeddings,
  smartSplitText,
} from '../services/embeddingService';

// 資料目錄路徑
const DATA_DIR = path.join(process.cwd(), 'Books');

// 支援的文字檔案類型
const SUPPORTED_EXTENSIONS = ['.txt', '.md'];

/**
 * 讀取所有文字檔案
 */
function readTextFiles(): Array<{ bookId: string; title: string; content: string }> {
  const files = fs.readdirSync(DATA_DIR);
  const textFiles: Array<{ bookId: string; title: string; content: string }> = [];
  
  for (const file of files) {
    const ext = path.extname(file);
    
    if (SUPPORTED_EXTENSIONS.includes(ext)) {
      const filePath = path.join(DATA_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const bookId = path.basename(file, ext);
      const title = bookId.replace(/_/g, ' ');
      
      textFiles.push({
        bookId,
        title,
        content,
      });
      
      console.log(`📖 讀取檔案: ${file} (${content.length} 字符)`);
    }
  }
  
  return textFiles;
}

/**
 * 處理單個書籍
 */
async function processBook(
  bookId: string,
  title: string,
  content: string
): Promise<VectorPoint[]> {
  console.log(`\n🔄 處理書籍: ${title}`);
  
  // 1. 分割文本
  console.log('  📝 分割文本...');
  const chunks = smartSplitText(content, 1000);
  console.log(`  ✅ 分割成 ${chunks.length} 個塊`);
  
  // 2. 生成 embeddings
  console.log('  🧠 生成 embeddings...');
  const embeddings = await generateBatchEmbeddings(
    chunks,
    (current, total) => {
      process.stdout.write(`\r  進度: ${current}/${total} (${Math.round(current/total*100)}%)`);
    }
  );
  console.log('\n  ✅ Embeddings 生成完成');
  
  // 3. 準備向量點
  const points: VectorPoint[] = chunks.map((text, index) => ({
    id: uuidv4(),
    vector: embeddings[index],
    payload: {
      bookId,
      bookTitle: title,
      chunkIndex: index,
      text,
      metadata: {
        length: text.length,
        createdAt: new Date().toISOString(),
      },
    },
  }));
  
  return points;
}

/**
 * 主函數
 */
async function main() {
  try {
    console.log('🚀 開始處理文字檔案並上傳到 Qdrant\n');
    console.log('=' .repeat(60));
    
    // 1. 檢查資料目錄
    if (!fs.existsSync(DATA_DIR)) {
      console.error(`❌ 資料目錄不存在: ${DATA_DIR}`);
      console.log('\n請創建 data/ 目錄並放入您的文字檔案');
      process.exit(1);
    }
    
    // 2. 讀取文字檔案
    console.log('\n📚 讀取文字檔案...');
    const books = readTextFiles();
    
    if (books.length === 0) {
      console.error('\n❌ 沒有找到文字檔案');
      console.log('請在 data/ 目錄中放入 .txt 或 .md 檔案');
      process.exit(1);
    }
    
    console.log(`\n✅ 找到 ${books.length} 個檔案`);
    
    // 3. 創建 Qdrant 集合
    console.log('\n🗄️  初始化 Qdrant 集合...');
    await createCollection();
    
    // 4. 處理每個書籍
    const allPoints: VectorPoint[] = [];
    
    for (const book of books) {
      const points = await processBook(book.bookId, book.title, book.content);
      allPoints.push(...points);
    }
    
    // 5. 批量插入向量
    console.log(`\n💾 上傳 ${allPoints.length} 個向量到 Qdrant...`);
    
    // 分批上傳（每批 100 個）
    const batchSize = 100;
    for (let i = 0; i < allPoints.length; i += batchSize) {
      const batch = allPoints.slice(i, Math.min(i + batchSize, allPoints.length));
      await insertVectors(batch);
      console.log(`  ✅ 已上傳 ${Math.min(i + batchSize, allPoints.length)}/${allPoints.length}`);
    }
    
    // 6. 顯示統計信息
    console.log('\n📊 獲取統計信息...');
    const stats = await getCollectionStats();
    
    if (stats) {
      console.log('\n' + '='.repeat(60));
      console.log('✅ 處理完成！');
      console.log('='.repeat(60));
      console.log(`📚 書籍數量: ${books.length}`);
      console.log(`📝 文本塊數: ${allPoints.length}`);
      console.log(`🗄️  向量數量: ${stats.vectorsCount}`);
      console.log(`📊 資料點數: ${stats.pointsCount}`);
      console.log(`✅ 狀態: ${stats.status}`);
      console.log('='.repeat(60));
      
      console.log('\n書籍列表:');
      books.forEach(book => {
        const bookPoints = allPoints.filter(p => p.payload.bookId === book.bookId);
        console.log(`  - ${book.title}: ${bookPoints.length} 個文本塊`);
      });
    }
    
    console.log('\n🎉 所有資料已成功上傳到 Qdrant！');
    
  } catch (error) {
    console.error('\n❌ 處理過程中發生錯誤:', error);
    if (error instanceof Error) {
      console.error('錯誤詳情:', error.message);
    }
    process.exit(1);
  }
}

// 執行主函數
main();
