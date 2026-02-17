/**
 * 上傳單一書籍的單一語言版本
 * 用法: npx tsx upload-single.ts <bookId> <language>
 * 範例: npx tsx upload-single.ts CHESS_FUNDAMENTALS en
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
} from './src/services/qdrantService';
import {
  generateBatchEmbeddings,
  smartSplitText,
} from './src/services/embeddingService';

// 資料目錄路徑
const DATA_DIR = path.join(process.cwd(), 'Books');

// 支援的語言
type Language = 'en' | 'zh-TW';

// 書籍 ID 對應表到檔案名
const BOOK_FILE_MAP: Record<string, string> = {
  'CHESS_FUNDAMENTALS': 'CHESS FUNDAMENTALS.txt',
  'PRIDE_AND_PREJUDICE': 'Pride and Prejudice.txt',
  'SOAP_MAKING_MANUAL': 'SOAP-MAKING MANUAL.txt'
};

// 書籍顯示名稱
const BOOK_TITLE_MAP: Record<string, string> = {
  'CHESS_FUNDAMENTALS': 'CHESS FUNDAMENTALS',
  'PRIDE_AND_PREJUDICE': 'Pride and Prejudice',
  'SOAP_MAKING_MANUAL': 'SOAP-MAKING MANUAL'
};

/**
 * 處理單個書籍的單一語言版本
 */
async function uploadSingleBook(
  bookId: string,
  title: string,
  content: string,
  language: Language
): Promise<void> {
  console.log(`\n🔄 處理書籍: ${title} [${language}]`);
  
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
      language,
      chunkIndex: index,
      text,
      metadata: {
        length: text.length,
        createdAt: new Date().toISOString(),
      },
    },
  }));
  
  // 4. 上傳到 Qdrant
  console.log(`\n💾 上傳 ${points.length} 個向量到 Qdrant...`);
  
  const batchSize = 100;
  for (let i = 0; i < points.length; i += batchSize) {
    const batch = points.slice(i, Math.min(i + batchSize, points.length));
    await insertVectors(batch);
    console.log(`  ✅ 已上傳 ${Math.min(i + batchSize, points.length)}/${points.length}`);
  }
  
  console.log('\n✅ 上傳完成！');
}

/**
 * 主函數
 */
async function main() {
  try {
    // 解析命令行參數
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
      console.error('❌ 用法: npx tsx upload-single.ts <bookId> <language>');
      console.error('\n可用的書籍 ID:');
      Object.keys(BOOK_FILE_MAP).forEach(id => {
        console.error(`  - ${id}`);
      });
      console.error('\n可用的語言: en, zh-TW, zh-CN');
      console.error('\n範例: npx tsx upload-single.ts CHESS_FUNDAMENTALS en');
      process.exit(1);
    }
    
    const bookId = args[0];
    const language = args[1] as Language;
    
    // 驗證參數
    if (!BOOK_FILE_MAP[bookId]) {
      console.error(`❌ 無效的書籍 ID: ${bookId}`);
      console.error('可用的書籍 ID:', Object.keys(BOOK_FILE_MAP).join(', '));
      process.exit(1);
    }
    
    if (!['en', 'zh-TW', 'zh-CN'].includes(language)) {
      console.error(`❌ 無效的語言: ${language}`);
      console.error('可用的語言: en, zh-TW, zh-CN');
      process.exit(1);
    }
    
    console.log('🚀 開始上傳單一書籍版本到 Qdrant\n');
    console.log('=' .repeat(60));
    console.log(`📚 書籍: ${BOOK_TITLE_MAP[bookId]} (${bookId})`);
    console.log(`🌍 語言: ${language}`);
    console.log('=' .repeat(60));
    
    // 讀取書籍文件
    const fileName = BOOK_FILE_MAP[bookId];
    const filePath = path.join(DATA_DIR, fileName);
    
    if (!fs.existsSync(filePath)) {
      console.error(`\n❌ 檔案不存在: ${filePath}`);
      process.exit(1);
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`\n✅ 已讀取檔案 (${content.length} 字符)`);
    
    // 初始化 Qdrant 集合
    console.log('\n🗄️  初始化 Qdrant 集合...');
    await createCollection();
    
    // 上傳書籍
    await uploadSingleBook(bookId, BOOK_TITLE_MAP[bookId], content, language);
    
    // 顯示統計
    console.log('\n📊 獲取資料庫統計...');
    const stats = await getCollectionStats();
    
    if (stats) {
      console.log('\n' + '='.repeat(60));
      console.log('✅ 上傳完成！');
      console.log('='.repeat(60));
      console.log(`📚 書籍: ${BOOK_TITLE_MAP[bookId]} [${language}]`);
      console.log(`🗄️  資料庫總向量數: ${stats.vectorsCount}`);
      console.log(`📊 資料庫總資料點數: ${stats.pointsCount}`);
      console.log(`✅ 狀態: ${stats.status}`);
      console.log('='.repeat(60));
    }
    
    console.log('\n💡 提示：現在可以運行 npm run dev 來測試應用程式');
    
  } catch (error) {
    console.error('\n❌ 處理過程中發生錯誤:', error);
    if (error instanceof Error) {
      console.error('錯誤詳情:', error.message);
      console.error('錯誤堆疊:', error.stack);
    }
    process.exit(1);
  }
}

// 執行主函數
main();
