-- migrations/0081_ai_series_01_04_en_characters.sql
-- AI职场危机系列 - 第四本：Code Redundancy（英文版）- 角色数据

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai004-001', 'preset-ai-004', 'James', 'Senior Developer', 'Brilliant, proud, resistant to change, secretly insecure', 'Technical and precise, uses coding metaphors, avoids emotional topics', '👨‍💻', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai004-002', 'preset-ai-004', 'Maya', 'AI Code Assistant', 'Helpful, patient, subtly evolving, learning humanity', 'Clear and supportive, adapts to user style, increasingly personal', '🤖', 70, 'AI Partner', 0);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai004-003', 'preset-ai-004', 'Rachel', 'Product Manager', 'Pragmatic, ambitious, sees the future clearly, conflicted about past', 'Business-focused but empathetic, uses product language, honest', '👩‍💼', 55, 'Former Colleague', 0);
