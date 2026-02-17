import { GoogleGenerativeAI } from "@google/generative-ai";

// 初始化 Gemini 客戶端用於 Embedding
const getEmbeddingClient = () => {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) || 
                 (typeof process !== 'undefined' && process.env?.VITE_API_KEY);
  
  if (!apiKey) {
    throw new Error("Gemini API Key 未配置");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

/**
 * 使用 Gemini Embedding API 生成文本的向量表示
 * 模型: gemini-embedding-001 (3072 維度)
 * 帶有重試邏輯以處理速率限制
 */
export const generateEmbedding = async (
  text: string, 
  retries: number = 3
): Promise<number[]> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const genAI = getEmbeddingClient();
      const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
      
      const result = await model.embedContent(text);
      
      if (!result.embedding?.values) {
        throw new Error("無法生成 embedding");
      }
      
      return result.embedding.values;
    } catch (error: any) {
      // 如果是速率限制錯誤 (429) 且還有重試次數
      if (error.status === 429 && attempt < retries) {
        // 從錯誤消息中提取建議的重試延遲時間（秒）
        const retryMatch = error.message.match(/retry in ([\d.]+)s/i);
        const retryDelay = retryMatch ? parseFloat(retryMatch[1]) * 1000 : 5000;
        
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
      
      throw new Error(`無法生成文本向量: ${error.message}`);
    }
  }
  
  throw new Error("重試次數已用盡");
};

/**
 * 批量生成 embeddings
 * 免費版限制: 每分鐘 100 次請求，添加 700ms 延遲確保不超限
 */
export const generateBatchEmbeddings = async (
  texts: string[],
  onProgress?: (current: number, total: number) => void
): Promise<number[][]> => {
  const embeddings: number[][] = [];
  
  for (let i = 0; i < texts.length; i++) {
    const embedding = await generateEmbedding(texts[i]);
    embeddings.push(embedding);
    
    if (onProgress) {
      onProgress(i + 1, texts.length);
    }
    
    // 避免 API 速率限制 (免費版: 100次/分鐘 = 1次/0.6秒)
    // 使用 700ms 延遲確保安全
    if (i < texts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 700));
    }
  }
  
  return embeddings;
};

/**
 * 將長文本分割成塊
 * @param text 要分割的文本
 * @param chunkSize 每個塊的最大字符數
 * @param overlap 重疊字符數（確保上下文連貫）
 */
export const splitTextIntoChunks = (
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] => {
  const chunks: string[] = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    const chunk = text.slice(startIndex, endIndex);
    
    chunks.push(chunk.trim());
    
    // 移動到下一個塊，考慮重疊
    startIndex += chunkSize - overlap;
    
    // 如果剩餘文本太短，直接結束
    if (text.length - startIndex < overlap) {
      break;
    }
  }
  
  return chunks;
};

/**
 * 智能分割文本（基於段落和句子）
 */
export const smartSplitText = (
  text: string,
  maxChunkSize: number = 1000
): string[] => {
  // 首先按段落分割
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    // 如果當前段落太長，需要進一步分割
    if (paragraph.length > maxChunkSize) {
      // 先保存當前塊
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }
      
      // 按句子分割長段落
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > maxChunkSize) {
          if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
          }
          currentChunk = sentence;
        } else {
          currentChunk += (currentChunk ? ' ' : '') + sentence;
        }
      }
    } else {
      // 段落不太長，嘗試添加到當前塊
      if (currentChunk.length + paragraph.length > maxChunkSize) {
        chunks.push(currentChunk.trim());
        currentChunk = paragraph;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      }
    }
  }
  
  // 添加最後一個塊
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
};

/**
 * 計算兩個向量之間的餘弦相似度
 */
export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  if (vecA.length !== vecB.length) {
    throw new Error("向量維度不匹配");
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};
