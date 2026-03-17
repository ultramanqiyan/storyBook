-- migrations/0051_ai_series_01_02_zh_characters.sql
-- AI职场危机系列 - 第二本：算法公司（中文版）- 角色数据

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai002-001-zh', 'preset-ai-002-zh', 'Mike', '初级数据分析师', '好奇、理想主义、道德冲突、善于观察', '分析性强但易懂，使用数据比喻，质疑一切', '👨‍💻', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai002-002-zh', 'preset-ai-002-zh', '陈博士', 'AI系统架构师', '才华横溢、冷酷理性、暗自为自己的创造感到困扰', '技术性强且精准，避免情感语言，用系统术语说话', '👨‍🔬', 40, '上司', 0);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai002-003-zh', 'preset-ai-002-zh', 'Lisa', '合规官', '有原则、谨慎、公司的道德指南针', '谨慎且有分寸，使用法律框架，保护他人', '👩‍💼', 65, '盟友', 0);
