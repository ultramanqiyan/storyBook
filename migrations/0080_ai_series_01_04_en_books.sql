-- migrations/0080_ai_series_01_04_en_books.sql
-- AI职场危机系列 - 第四本：Code Redundancy（英文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-004', 'system', 'Code Redundancy', 'business', 1, 'en', datetime('now'), datetime('now'));
