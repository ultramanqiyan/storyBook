-- migrations/0240_ai_series_05_all_books.sql
-- AI未来世界系列 - 全部4本书（英文版+中文版）

-- 系列五：第一本 The Singularity Diaries / 奇点日记
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-020', 'system', 'The Singularity Diaries', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-020-zh', 'system', '奇点日记', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列五：第二本 Post-Human / 后人类
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-021', 'system', 'Post-Human', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-021-zh', 'system', '后人类', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列五：第三本 The Memory Market / 记忆市场
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-022', 'system', 'The Memory Market', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-022-zh', 'system', '记忆市场', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列五：第四本 Children of the Algorithm / 算法之子
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-023', 'system', 'Children of the Algorithm', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-023-zh', 'system', '算法之子', 'business', 1, 'zh', datetime('now'), datetime('now'));
