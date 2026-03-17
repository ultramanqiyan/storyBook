-- migrations/0061_ai_series_01_03_en_characters.sql
-- AI职场危机系列 - 第三本：The Pink Slip Protocol（英文版）- 角色数据

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai003-001', 'preset-ai-003', 'Elena', 'HR Manager', 'Compassionate, conflicted, professional, secretly struggling with guilt', 'Measured and careful, uses HR terminology, emotional underneath', '👩‍💼', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai003-002', 'preset-ai-003', 'Marcus', 'AI Systems Director', 'Coldly efficient, believes in progress, dismissive of sentiment', 'Technical and dismissive, uses efficiency metrics, avoids personal topics', '👨‍💻', 35, 'Colleague', 0);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai003-003', 'preset-ai-003', 'Sarah', 'Former Content Director', 'Resilient, reflective, finding new purpose, understanding', 'Warm and thoughtful, uses writer''s metaphors, speaks from experience', '👩‍💼', 80, 'Friend', 0);
