-- migrations/0040_ai_series_01_02_en_books.sql
-- AI职场危机系列 - 第二本：Algorithm, Inc.（英文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-002', 'system', 'Algorithm, Inc.', 'business', 1, 'en', datetime('now'), datetime('now'));
