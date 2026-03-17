-- 同步线上003/004系列数据到本地数据库
-- 执行时间: 2026-03-17
-- ⚠️ 注意：此文件只用于本地数据库，不要用于线上

-- 从线上备份提取的数据：
-- - books: 16本 (003, 004系列中英文)
-- - characters: 48个角色
-- - chapters: 约160个章节
-- - plot_cards: 待确认
-- - puzzles: 待确认

-- 注意：由于数据量较大，请使用以下命令从线上备份导入：
-- npx wrangler d1 execute storybook_database --local --file=backups/remote_storybook_database_backup.sql

-- 或者只导入特定数据，使用以下SQL：

-- 首先检查本地是否已有这些数据
SELECT 'Checking existing data...' as info;

-- 检查本地003/004系列书籍
SELECT 'Local 003/004 books:' as info;
SELECT book_id, title FROM books 
WHERE book_id LIKE 'preset-adventure-003%' 
   OR book_id LIKE 'preset-adventure-004%'
   OR book_id LIKE 'preset-fantasy-003%'
   OR book_id LIKE 'preset-fantasy-004%'
   OR book_id LIKE 'preset-romance-003%'
   OR book_id LIKE 'preset-romance-004%'
   OR book_id LIKE 'preset-business-003%'
   OR book_id LIKE 'preset-business-004%'
ORDER BY book_id;

-- 如果本地没有这些数据，需要从线上备份导入
-- 建议直接使用完整备份文件导入
