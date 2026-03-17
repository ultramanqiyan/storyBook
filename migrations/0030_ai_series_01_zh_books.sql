-- migrations/0030_ai_series_01_zh_books.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-001-zh', 'system', '最后的写作者', 'business', 1, 'zh', datetime('now'), datetime('now'));
