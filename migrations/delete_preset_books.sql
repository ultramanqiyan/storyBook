-- 删除预设书籍数据
-- 按外键依赖顺序删除，确保数据完整性

PRAGMA defer_foreign_keys=TRUE;

-- 删除预设书籍的谜题
DELETE FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-%');

-- 删除预设书籍的章节
DELETE FROM chapters WHERE book_id LIKE 'preset-%';

-- 删除预设书籍的情节卡牌
DELETE FROM plot_cards WHERE book_id LIKE 'preset-%';

-- 删除预设书籍的角色
DELETE FROM characters WHERE book_id LIKE 'preset-%';

-- 删除预设书籍
DELETE FROM books WHERE is_preset = 1;
