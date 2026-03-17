-- migrations/0031_ai_series_01_zh_characters.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）- 角色数据

-- 主角：Sarah
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-001-zh', 'preset-ai-001-zh', 'Sarah', '内容总监', '坚定、有创造力、敏感、善于内省', '专业而温暖，情绪激动时会用比喻', '👩‍💼', NULL, NULL, 1);

-- 配角1：Marcus（前同事，AI开发者）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-002-zh', 'preset-ai-001-zh', 'Marcus', 'AI开发者', '理性、内心矛盾、善良、暗自担心自己的工作', '技术性强但易懂，经常用技术类比', '👨‍💻', 75, '前同事', 0);

-- 配角2：Elena（HR经理，好友）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-003-zh', 'preset-ai-001-zh', 'Elena', 'HR经理', '务实、支持性强、因执行裁员而心怀愧疚', '直接而关怀，私下避免使用企业术语', '👩‍💼', 60, '闺蜜', 0);
