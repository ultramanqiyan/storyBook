-- migrations/0060_ai_series_01_03_en_books.sql
-- AI职场危机系列 - 第三本：The Pink Slip Protocol（英文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-003', 'system', 'The Pink Slip Protocol', 'business', 1, 'en', datetime('now'), datetime('now'));
