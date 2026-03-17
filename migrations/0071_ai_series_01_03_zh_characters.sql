-- migrations/0071_ai_series_01_03_zh_characters.sql
-- AI职场危机系列 - 第三本：裁员协议（中文版）- 角色数据

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai003-001-zh', 'preset-ai-003-zh', 'Elena', 'HR经理', '富有同情心、内心矛盾、专业、暗自被愧疚困扰', '谨慎且有分寸，使用HR术语，内心情感丰富', '👩‍💼', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai003-002-zh', 'preset-ai-003-zh', 'Marcus', 'AI系统总监', '冷酷高效、相信进步、轻视情感', '技术性强且轻蔑，使用效率指标，避免个人话题', '👨‍💻', 35, '同事', 0);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai003-003-zh', 'preset-ai-003-zh', 'Sarah', '前内容总监', '坚韧、反思、寻找新目标、理解', '温暖而深思熟虑，使用作家的比喻，从经验出发说话', '👩‍💼', 80, '朋友', 0);
