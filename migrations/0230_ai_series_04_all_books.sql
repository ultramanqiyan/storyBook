-- migrations/0230_ai_series_04_all_books.sql
-- AI创作危机系列 - 全部4本书（英文版+中文版）

-- 系列四：第一本 The Last Original Song / 最后的原创歌曲
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-016', 'system', 'The Last Original Song', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-016-zh', 'system', '最后的原创歌曲', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列四：第二本 Portrait of an AI Artist / AI艺术家的肖像
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-017', 'system', 'Portrait of an AI Artist', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-017-zh', 'system', 'AI艺术家的肖像', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列四：第三本 The Writer's Last Stand / 作家的最后抵抗
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-018', 'system', 'The Writer''s Last Stand', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-018-zh', 'system', '作家的最后抵抗', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列四：第四本 The Human Element / 人性元素
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-019', 'system', 'The Human Element', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-019-zh', 'system', '人性元素', 'business', 1, 'zh', datetime('now'), datetime('now'));
