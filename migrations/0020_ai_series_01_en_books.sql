-- migrations/0020_ai_series_01_en_books.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-001', 'system', 'The Last Writer', 'business', 1, 'en', datetime('now'), datetime('now'));
