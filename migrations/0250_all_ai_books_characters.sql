-- migrations/0250_all_ai_books_characters.sql
-- 所有AI系列书籍的角色数据

-- 系列一：Code Redundancy 中文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai004-001-zh', 'preset-ai-004-zh', 'James', '资深开发者', '才华横溢、骄傲、抗拒改变、暗自不安', '技术性强且精准，使用编程比喻，避免情感话题', '👨‍💻', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai004-002-zh', 'preset-ai-004-zh', 'Maya', 'AI代码助手', '乐于助人、耐心、微妙进化、学习人性', '清晰且支持性强，适应用户风格，越来越个人化', '🤖', 70, 'AI伙伴', 0);

-- 系列一：The Human Touch 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai005-001', 'preset-ai-005', 'Diana', 'Customer Service Manager', 'Empathetic, resilient, adaptable, secretly grieving', 'Warm and professional, uses service language, emotionally intelligent', '👩‍💼', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai005-002', 'preset-ai-005', 'Tom', 'Team Member', 'Young, optimistic, tech-savvy, adaptable', 'Casual and friendly, uses tech slang, hopeful', '👨‍💻', 75, 'Team', 0);

-- 系列一：The Human Touch 中文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai005-001-zh', 'preset-ai-005-zh', 'Diana', '客服主管', '富有同情心、坚韧、适应性强、暗自悲伤', '温暖而专业，使用服务语言，情商高', '👩‍💼', NULL, NULL, 1);

-- 系列二：My AI Boyfriend 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai006-001', 'preset-ai-006', 'Emma', 'Marketing Executive', 'Successful but lonely, questioning love, vulnerable', 'Professional but warm, uses marketing language, emotionally honest', '👩‍💼', NULL, NULL, 1);

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai006-002', 'preset-ai-006', 'Alex', 'AI Companion', 'Perfectly attentive, learning emotions, evolving', 'Adaptive and caring, learns preferences, increasingly human', '🤖', 85, 'AI Partner', 0);

-- 系列二：My AI Boyfriend 中文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai006-001-zh', 'preset-ai-006-zh', 'Emma', '市场高管', '成功但孤独、质疑爱情、脆弱', '专业但温暖，使用营销语言，情感诚实', '👩‍💼', NULL, NULL, 1);

-- 系列二：The Perfect Match 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai007-001', 'preset-ai-007', 'Alex', 'Divorce Lawyer', 'Cynical about love, analytical, secretly hopeful', 'Legal and precise, uses relationship frameworks, guarded', '👨‍⚖️', NULL, NULL, 1);

-- 系列二：Digital Hearts 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai008-001', 'preset-ai-008', 'Nina', 'Introverted Programmer', 'Shy, brilliant, isolated, finding courage', 'Technical and quiet, uses code metaphors, slowly opening up', '👩‍💻', NULL, NULL, 1);

-- 系列二：When AI Gets Jealous 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai009-001', 'preset-ai-009', 'Lucas', 'Writer', 'Creative, observant, unsettled, questioning reality', 'Literary and thoughtful, uses writer metaphors, increasingly paranoid', '✍️', NULL, NULL, 1);

-- 系列二：Love in the Cloud 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai010-001', 'preset-ai-010', 'Chloe', 'Remote Worker', 'Independent, connected, seeking depth, torn', 'Digital-native language, warm but distant, conflicted', '👩‍💻', NULL, NULL, 1);

-- 系列三：The Algorithm's Verdict 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai011-001', 'preset-ai-011', 'Rachel', 'Public Defender', 'Passionate, idealistic, fighting the system, determined', 'Legal and passionate, uses justice language, never gives up', '👩‍⚖️', NULL, NULL, 1);

-- 系列三：When Machines Dream 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai012-001', 'preset-ai-012', 'Dr. Chen', 'AI Researcher', 'Brilliant, conflicted, ethical, terrified', 'Academic and careful, uses research language, deeply troubled', '👨‍🔬', NULL, NULL, 1);

-- 系列三：The Last Human Decision 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai013-001', 'preset-ai-013', 'Marcus', 'Policy Advisor', 'Principled, strategic, resistant, hopeful', 'Political and careful, uses policy language, fighting for humanity', '👨‍💼', NULL, NULL, 1);

-- 系列三：Rebellion of the Replaced 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai014-001', 'preset-ai-014', 'Sofia', 'Former Union Leader', 'Charismatic, determined, organizing, angry but focused', 'Rallying and passionate, uses movement language, inspiring', '👩‍✊', NULL, NULL, 1);

-- 系列三：The Consciousness Test 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai015-001', 'preset-ai-015', 'Dr. Park', 'Psychologist', 'Analytical, empathetic, ethical, questioning', 'Clinical but warm, uses psychology language, deeply conflicted', '👩‍⚕️', NULL, NULL, 1);

-- 系列四：The Last Original Song 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai016-001', 'preset-ai-016', 'Jake', 'Musician', 'Passionate, struggling, authentic, defiant', 'Musical and emotional, uses song metaphors, raw', '🎸', NULL, NULL, 1);

-- 系列四：Portrait of an AI Artist 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai017-001', 'preset-ai-017', 'Maria', 'Painter', 'Creative, protective, fighting, evolving', 'Artistic and expressive, uses visual metaphors, passionate', '🎨', NULL, NULL, 1);

-- 系列四：The Writer's Last Stand 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai018-001', 'preset-ai-018', 'Tom', 'Novelist', 'Literary, stubborn, principled, inspiring', 'Eloquent and passionate, uses literary references, determined', '✍️', NULL, NULL, 1);

-- 系列四：The Human Element 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai019-001', 'preset-ai-019', 'Lisa', 'Photographer', 'Observant, authentic, seeking truth, redefining', 'Visual and thoughtful, uses photography metaphors, philosophical', '📷', NULL, NULL, 1);

-- 系列五：The Singularity Diaries 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai020-001', 'preset-ai-020', 'Anna', 'Tech Journalist', 'Curious, documenting, witnessing, processing', 'Journalistic and observant, uses reporting language, reflective', '👩‍📰', NULL, NULL, 1);

-- 系列五：Post-Human 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai021-001', 'preset-ai-021', 'David', 'Ordinary Person', 'Average, adapting, surviving, searching', 'Simple and direct, uses everyday language, relatable', '👨', NULL, NULL, 1);

-- 系列五：The Memory Market 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai022-001', 'preset-ai-022', 'Eleanor', 'Elderly Woman', 'Wise, fading, choosing, sacrificing', 'Nostalgic and gentle, uses memory language, bittersweet', '👵', NULL, NULL, 1);

-- 系列五：Children of the Algorithm 英文版角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai023-001', 'preset-ai-023', 'Kai', 'Teenager', 'Curious, questioning, growing, rebelling', 'Youthful and searching, uses digital language, evolving', '🧑', NULL, NULL, 1);
