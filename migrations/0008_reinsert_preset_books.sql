-- 重新插入预设书籍数据

INSERT OR IGNORE INTO books (book_id, user_id, title, type, is_preset, language) VALUES
-- 儿童冒险 - 中文版
('preset-adventure-001', 'system', '星空探险家', 'adventure', 1, 'zh'),
('preset-adventure-002', 'system', '深海探险队', 'adventure', 1, 'zh'),
-- 儿童冒险 - 英文版
('preset-adventure-001-en', 'system', 'Stargazer''s Quest', 'adventure', 1, 'en'),
('preset-adventure-002-en', 'system', 'The Deep Sea Explorers', 'adventure', 1, 'en'),
-- 魔幻传说 - 中文版
('preset-fantasy-001', 'system', 'AI魔法学院', 'fantasy', 1, 'zh'),
('preset-fantasy-002', 'system', '平行世界的我', 'fantasy', 1, 'zh'),
-- 魔幻传说 - 英文版
('preset-fantasy-001-en', 'system', 'The Academy of Smart Magic', 'fantasy', 1, 'en'),
('preset-fantasy-002-en', 'system', 'The Other Me', 'fantasy', 1, 'en'),
-- 都市言情 - 中文版
('preset-romance-001', 'system', '代码恋人', 'romance', 1, 'zh'),
('preset-romance-002', 'system', '算法姻缘', 'romance', 1, 'zh'),
-- 都市言情 - 英文版
('preset-romance-001-en', 'system', 'Love in the Code', 'romance', 1, 'en'),
('preset-romance-002-en', 'system', 'Algorithm of Love', 'romance', 1, 'en'),
-- 职场风云 - 中文版
('preset-business-001', 'system', '周报战争', 'business', 1, 'zh'),
('preset-business-002', 'system', '副业狂想曲', 'business', 1, 'zh'),
-- 职场风云 - 英文版
('preset-business-001-en', 'system', 'The Weekly Report Wars', 'business', 1, 'en'),
('preset-business-002-en', 'system', 'The Side Hustle Symphony', 'business', 1, 'en');
