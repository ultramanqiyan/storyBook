-- migrations/0070_ai_series_01_03_zh_books.sql
-- AI职场危机系列 - 第三本：裁员协议（中文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-003-zh', 'system', '裁员协议', 'business', 1, 'zh', datetime('now'), datetime('now'));
