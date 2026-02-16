# 📚 書籍文字檔案

將您的文字檔案放在此目錄中，腳本會自動處理它們。

## 支援的格式

- `.txt` - 純文字檔案
- `.md` - Markdown 檔案

## 檔案命名

檔案名稱將作為書籍 ID，例如：
- `the_great_gatsby.txt` → Book ID: `the_great_gatsby`
- `1984.txt` → Book ID: `1984`
- `pride_and_prejudice.md` → Book ID: `pride_and_prejudice`

## 範例檔案

建立以下格式的文字檔案：

### 範例: `sample_book.txt`

```
這是一本範例書籍的內容。

第一章：開始

這是第一章的內容...

第二章：發展

這是第二章的內容...
```

## 使用方式

1. 將您的 5 個文字檔案放入此目錄
2. 執行處理腳本：`npm run process-books`
3. 腳本會自動：
   - 讀取所有文字檔案
   - 分割成適當大小的塊
   - 生成 embeddings
   - 上傳到 Qdrant 雲端資料庫

## 注意事項

- 檔案應使用 UTF-8 編碼
- 建議每個檔案不超過 10MB
- 較長的文字會自動分割成多個塊
