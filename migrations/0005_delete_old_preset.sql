-- 删除旧的预设数据
DELETE FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-%');
DELETE FROM chapters WHERE book_id LIKE 'preset-%';
DELETE FROM plot_cards WHERE book_id LIKE 'preset-%';
DELETE FROM characters WHERE book_id LIKE 'preset-%';
DELETE FROM books WHERE is_preset = 1;
