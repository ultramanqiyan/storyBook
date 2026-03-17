-- 删除多余书籍及相关数据
-- 执行时间: 2026-03-17
-- 目标: 英文版31本，中文版8本
-- ⚠️ 注意：此文件只用于本地数据库，不要用于线上

-- 需要删除的书籍:
-- 1. AI系列中文版 (23本): preset-ai-001-zh ~ preset-ai-023-zh
-- 2. 001/002系列中英文 (16本): adventure/fantasy/romance/business 的 001 和 002

-- 保留的书籍:
-- 1. AI系列英文版 (23本): preset-ai-001 ~ preset-ai-023
-- 2. 003/004系列中英文 (16本): adventure/fantasy/romance/business 的 003 和 004

-- 1. 删除谜题（依赖章节）
DELETE FROM puzzles WHERE chapter_id IN (
  SELECT chapter_id FROM chapters 
  WHERE book_id LIKE 'preset-ai-%-zh'
     OR book_id LIKE 'preset-adventure-001'
     OR book_id LIKE 'preset-adventure-002'
     OR book_id LIKE 'preset-fantasy-001'
     OR book_id LIKE 'preset-fantasy-002'
     OR book_id LIKE 'preset-romance-001'
     OR book_id LIKE 'preset-romance-002'
     OR book_id LIKE 'preset-business-001'
     OR book_id LIKE 'preset-business-002'
     OR book_id LIKE 'preset-adventure-001-en'
     OR book_id LIKE 'preset-adventure-002-en'
     OR book_id LIKE 'preset-fantasy-001-en'
     OR book_id LIKE 'preset-fantasy-002-en'
     OR book_id LIKE 'preset-romance-001-en'
     OR book_id LIKE 'preset-romance-002-en'
     OR book_id LIKE 'preset-business-001-en'
     OR book_id LIKE 'preset-business-002-en'
);

-- 2. 删除章节
DELETE FROM chapters 
WHERE book_id LIKE 'preset-ai-%-zh'
   OR book_id LIKE 'preset-adventure-001'
   OR book_id LIKE 'preset-adventure-002'
   OR book_id LIKE 'preset-fantasy-001'
   OR book_id LIKE 'preset-fantasy-002'
   OR book_id LIKE 'preset-romance-001'
   OR book_id LIKE 'preset-romance-002'
   OR book_id LIKE 'preset-business-001'
   OR book_id LIKE 'preset-business-002'
   OR book_id LIKE 'preset-adventure-001-en'
   OR book_id LIKE 'preset-adventure-002-en'
   OR book_id LIKE 'preset-fantasy-001-en'
   OR book_id LIKE 'preset-fantasy-002-en'
   OR book_id LIKE 'preset-romance-001-en'
   OR book_id LIKE 'preset-romance-002-en'
   OR book_id LIKE 'preset-business-001-en'
   OR book_id LIKE 'preset-business-002-en';

-- 3. 删除情节卡牌
DELETE FROM plot_cards 
WHERE book_id LIKE 'preset-ai-%-zh'
   OR book_id LIKE 'preset-adventure-001'
   OR book_id LIKE 'preset-adventure-002'
   OR book_id LIKE 'preset-fantasy-001'
   OR book_id LIKE 'preset-fantasy-002'
   OR book_id LIKE 'preset-romance-001'
   OR book_id LIKE 'preset-romance-002'
   OR book_id LIKE 'preset-business-001'
   OR book_id LIKE 'preset-business-002'
   OR book_id LIKE 'preset-adventure-001-en'
   OR book_id LIKE 'preset-adventure-002-en'
   OR book_id LIKE 'preset-fantasy-001-en'
   OR book_id LIKE 'preset-fantasy-002-en'
   OR book_id LIKE 'preset-romance-001-en'
   OR book_id LIKE 'preset-romance-002-en'
   OR book_id LIKE 'preset-business-001-en'
   OR book_id LIKE 'preset-business-002-en';

-- 4. 删除角色
DELETE FROM characters 
WHERE book_id LIKE 'preset-ai-%-zh'
   OR book_id LIKE 'preset-adventure-001'
   OR book_id LIKE 'preset-adventure-002'
   OR book_id LIKE 'preset-fantasy-001'
   OR book_id LIKE 'preset-fantasy-002'
   OR book_id LIKE 'preset-romance-001'
   OR book_id LIKE 'preset-romance-002'
   OR book_id LIKE 'preset-business-001'
   OR book_id LIKE 'preset-business-002'
   OR book_id LIKE 'preset-adventure-001-en'
   OR book_id LIKE 'preset-adventure-002-en'
   OR book_id LIKE 'preset-fantasy-001-en'
   OR book_id LIKE 'preset-fantasy-002-en'
   OR book_id LIKE 'preset-romance-001-en'
   OR book_id LIKE 'preset-romance-002-en'
   OR book_id LIKE 'preset-business-001-en'
   OR book_id LIKE 'preset-business-002-en';

-- 5. 删除书籍
DELETE FROM books 
WHERE book_id LIKE 'preset-ai-%-zh'
   OR book_id LIKE 'preset-adventure-001'
   OR book_id LIKE 'preset-adventure-002'
   OR book_id LIKE 'preset-fantasy-001'
   OR book_id LIKE 'preset-fantasy-002'
   OR book_id LIKE 'preset-romance-001'
   OR book_id LIKE 'preset-romance-002'
   OR book_id LIKE 'preset-business-001'
   OR book_id LIKE 'preset-business-002'
   OR book_id LIKE 'preset-adventure-001-en'
   OR book_id LIKE 'preset-adventure-002-en'
   OR book_id LIKE 'preset-fantasy-001-en'
   OR book_id LIKE 'preset-fantasy-002-en'
   OR book_id LIKE 'preset-romance-001-en'
   OR book_id LIKE 'preset-romance-002-en'
   OR book_id LIKE 'preset-business-001-en'
   OR book_id LIKE 'preset-business-002-en';

-- 验证删除结果
SELECT '=== 验证结果 ===' as info;

SELECT '英文版书籍数量:' as info;
SELECT COUNT(*) as count FROM books WHERE is_preset = 1 AND language = 'en';

SELECT '中文版书籍数量:' as info;
SELECT COUNT(*) as count FROM books WHERE is_preset = 1 AND language = 'zh';

SELECT '剩余预设书籍列表:' as info;
SELECT book_id, title, language FROM books WHERE is_preset = 1 ORDER BY language, book_id;
