import { GoogleGenAI } from "@google/genai";

// 初始化 Gemini 客戶端用於 Embedding
const getEmbeddingClient = () => {
  const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) || 
                 (typeof process !== 'undefined' && process.env?.VITE_API_KEY);
  
  if (!apiKey) {
    throw new Error("Gemini API Key 未配置");
  }
  
  return new GoogleGenAI({ apiKey });
};

/**
 * 使用 Gemini Embedding API 生成文本的向量表示
 * 模型: text-embedding-004 (768 維度)
 */
export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    const ai = getEmbeddingClient();
    
    // 使用 Gemini 的 embedding 方法
    const result = await ai.models.embedContent({
      model: "text-embedding-004",
      contents: text
    });
    
    if (!result.embeddings?.[0]?.values) {
      throw new Error("無法生成 embedding");
    }
    
    return result.embeddings[0].values;
  } catch (error) {
    console.error("生成 embedding 時出錯:", error);
    throw new Error("無法生成文本向量");
  }
};

/**
 * 批量生成 embeddings
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
    
    // 避免 API 速率限制，添加小延遲
    if (i < texts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
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
