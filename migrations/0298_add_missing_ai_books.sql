-- 综合修复缺失的AI书籍和章节
-- 添加 preset-ai-004 到 preset-ai-010 的书籍记录

-- 首先添加缺失的书籍记录
INSERT OR IGNORE INTO books (book_id, user_id, title, type, is_preset, language, created_at) VALUES
('preset-ai-004', 'system', 'Code Redundancy', 'story', 1, 'en', '2026-03-16'),
('preset-ai-004-zh', 'system', '代码冗余', 'story', 1, 'zh', '2026-03-16'),
('preset-ai-005', 'system', 'The Human Touch', 'story', 1, 'en', '2026-03-16'),
('preset-ai-005-zh', 'system', '人类触感', 'story', 1, 'zh', '2026-03-16'),
('preset-ai-006', 'system', 'My AI Boyfriend', 'story', 1, 'en', '2026-03-16'),
('preset-ai-006-zh', 'system', '我的AI男友', 'story', 1, 'zh', '2026-03-16'),
('preset-ai-007', 'system', 'The Perfect Match', 'story', 1, 'en', '2026-03-16'),
('preset-ai-007-zh', 'system', '完美匹配', 'story', 1, 'zh', '2026-03-16'),
('preset-ai-008', 'system', 'Digital Hearts', 'story', 1, 'en', '2026-03-16'),
('preset-ai-008-zh', 'system', '数字之心', 'story', 1, 'zh', '2026-03-16'),
('preset-ai-009', 'system', 'When AI Gets Jealous', 'story', 1, 'en', '2026-03-16'),
('preset-ai-009-zh', 'system', '当AI嫉妒时', 'story', 1, 'zh', '2026-03-16'),
('preset-ai-010', 'system', 'Love in the Cloud', 'story', 1, 'en', '2026-03-16'),
('preset-ai-010-zh', 'system', '云端之恋', 'story', 1, 'zh', '2026-03-16');

-- 删除已有的短章节
DELETE FROM chapters WHERE book_id IN ('preset-ai-004', 'preset-ai-004-zh', 'preset-ai-005', 'preset-ai-005-zh', 'preset-ai-006', 'preset-ai-006-zh', 'preset-ai-007', 'preset-ai-007-zh', 'preset-ai-008', 'preset-ai-008-zh', 'preset-ai-009', 'preset-ai-009-zh', 'preset-ai-010', 'preset-ai-010-zh');
