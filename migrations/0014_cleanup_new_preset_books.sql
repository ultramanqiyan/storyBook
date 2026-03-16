-- 清理新预设书籍的旧数据
-- 执行时间: 2026-03-16

-- 删除新书籍的情节卡牌
DELETE FROM plot_cards WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%' OR book_id LIKE 'preset-fantasy-003%' OR book_id LIKE 'preset-fantasy-004%' OR book_id LIKE 'preset-romance-003%' OR book_id LIKE 'preset-romance-004%' OR book_id LIKE 'preset-business-003%' OR book_id LIKE 'preset-business-004%';

-- 删除新书籍的谜题
DELETE FROM puzzles WHERE puzzle_id LIKE 'puzzle-adv003%' OR puzzle_id LIKE 'puzzle-adv004%' OR puzzle_id LIKE 'puzzle-fan003%' OR puzzle_id LIKE 'puzzle-fan004%' OR puzzle_id LIKE 'puzzle-rom003%' OR puzzle_id LIKE 'puzzle-rom004%' OR puzzle_id LIKE 'puzzle-bus003%' OR puzzle_id LIKE 'puzzle-bus004%';

-- 删除新书籍的章节（使用chapter_id匹配）
DELETE FROM chapters WHERE chapter_id LIKE 'chapter-adv003%' OR chapter_id LIKE 'chapter-adv004%' OR chapter_id LIKE 'chapter-fan003%' OR chapter_id LIKE 'chapter-fan004%' OR chapter_id LIKE 'chapter-rom003%' OR chapter_id LIKE 'chapter-rom004%' OR chapter_id LIKE 'chapter-bus003%' OR chapter_id LIKE 'chapter-bus004%';

-- 删除新书籍的角色
DELETE FROM characters WHERE char_id LIKE 'char-adv003%' OR char_id LIKE 'char-adv004%' OR char_id LIKE 'char-fan003%' OR char_id LIKE 'char-fan004%' OR char_id LIKE 'char-rom003%' OR char_id LIKE 'char-rom004%' OR char_id LIKE 'char-bus003%' OR char_id LIKE 'char-bus004%';

-- 删除新书籍
DELETE FROM books WHERE book_id LIKE 'preset-adventure-003%' OR book_id LIKE 'preset-adventure-004%' OR book_id LIKE 'preset-fantasy-003%' OR book_id LIKE 'preset-fantasy-004%' OR book_id LIKE 'preset-romance-003%' OR book_id LIKE 'preset-romance-004%' OR book_id LIKE 'preset-business-003%' OR book_id LIKE 'preset-business-004%';
