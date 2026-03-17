-- 删除AI系列中文书籍及相关数据
-- 执行时间: 2026-03-17
-- ⚠️ 注意：此文件只用于本地数据库，不要用于线上

-- 1. 删除谜题（依赖章节）
DELETE FROM puzzles WHERE chapter_id IN (
  SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-ai-%-zh'
);

-- 2. 删除章节
DELETE FROM chapters WHERE book_id LIKE 'preset-ai-%-zh';

-- 3. 删除情节卡牌
DELETE FROM plot_cards WHERE book_id LIKE 'preset-ai-%-zh';

-- 4. 删除角色
DELETE FROM characters WHERE book_id LIKE 'preset-ai-%-zh';

-- 5. 删除书籍
DELETE FROM books WHERE book_id LIKE 'preset-ai-%-zh';

-- 验证删除结果
SELECT 'Remaining AI Chinese books:' as info;
SELECT book_id, title FROM books WHERE book_id LIKE 'preset-ai-%-zh';

SELECT 'Remaining AI Chinese chapters:' as info;
SELECT chapter_id, title FROM chapters WHERE book_id LIKE 'preset-ai-%-zh';

SELECT 'Remaining AI Chinese characters:' as info;
SELECT char_id, name FROM characters WHERE book_id LIKE 'preset-ai-%-zh';

SELECT 'Remaining AI Chinese plot_cards:' as info;
SELECT card_id, name FROM plot_cards WHERE book_id LIKE 'preset-ai-%-zh';
