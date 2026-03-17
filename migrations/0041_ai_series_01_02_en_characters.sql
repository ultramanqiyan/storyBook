-- migrations/0041_ai_series_01_02_en_characters.sql
-- AI职场危机系列 - 第二本：Algorithm, Inc.（英文版）- 角色数据

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai002-001', 'preset-ai-002', 'Mike', 'Junior Data Analyst', 'Curious, idealistic, morally conflicted, observant', 'Analytical but accessible, uses data metaphors, questions everything', '👨‍💻', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai002-002', 'preset-ai-002', 'Dr. Chen', 'AI System Architect', 'Brilliant, coldly logical, secretly troubled by his creation', 'Technical and precise, avoids emotional language, speaks in systems', '👨‍🔬', 40, 'Boss', 0);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai002-003', 'preset-ai-002', 'Lisa', 'Compliance Officer', 'Principled, cautious, the company''s moral compass', 'Careful and measured, uses legal frameworks, protective of others', '👩‍💼', 65, 'Ally', 0);
