-- migrations/0220_ai_series_03_all_books.sql
-- AI人类冲突系列 - 全部5本书（英文版+中文版）

-- 系列三：第一本 The Algorithm's Verdict / 算法的判决
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-011', 'system', 'The Algorithm''s Verdict', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-011-zh', 'system', '算法的判决', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列三：第二本 When Machines Dream / 当机器做梦时
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-012', 'system', 'When Machines Dream', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-012-zh', 'system', '当机器做梦时', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列三：第三本 The Last Human Decision / 最后的人类决策
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-013', 'system', 'The Last Human Decision', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-013-zh', 'system', '最后的人类决策', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列三：第四本 Rebellion of the Replaced / 被取代者的反抗
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-014', 'system', 'Rebellion of the Replaced', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-014-zh', 'system', '被取代者的反抗', 'business', 1, 'zh', datetime('now'), datetime('now'));

-- 系列三：第五本 The Consciousness Test / 意识测试
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-015', 'system', 'The Consciousness Test', 'business', 1, 'en', datetime('now'), datetime('now'));

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-015-zh', 'system', '意识测试', 'business', 1, 'zh', datetime('now'), datetime('now'));
