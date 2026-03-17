-- migrations/0050_ai_series_01_02_zh_books.sql
-- AI职场危机系列 - 第二本：算法公司（中文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-002-zh', 'system', '算法公司', 'business', 1, 'zh', datetime('now'), datetime('now'));
