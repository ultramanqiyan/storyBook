-- migrations/0021_ai_series_01_en_characters.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）- 角色数据

-- 主角：Sarah
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-001', 'preset-ai-001', 'Sarah', 'Content Director', 'Determined, creative, vulnerable, introspective', 'Professional with warmth, uses metaphors when emotional', '👩‍💼', NULL, NULL, 1);

-- 配角1：Marcus（前同事，AI开发者）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-002', 'preset-ai-001', 'Marcus', 'AI Developer', 'Logical, conflicted, kind, secretly worried about his own job', 'Technical but accessible, often uses tech analogies', '👨‍💻', 75, 'Former colleague', 0);

-- 配角2：Elena（HR经理，好友）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-003', 'preset-ai-001', 'Elena', 'HR Manager', 'Pragmatic, supportive, carries guilt from layoffs she executed', 'Direct and caring, avoids corporate jargon in private', '👩‍💼', 60, 'Best friend', 0);
