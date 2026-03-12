-- 预设书籍（每种类型1本，共4本）
INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES
('preset-adventure-001', 'system', '小明的奇幻冒险', 'adventure', 1),
('preset-fantasy-001', 'system', '魔法学院传说', 'fantasy', 1),
('preset-romance-001', 'system', '都市恋曲', 'romance', 1),
('preset-business-001', 'system', '职场风云录', 'business', 1);

-- 预设角色（儿童冒险书籍）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-preset-001', 'preset-adventure-001', '小明', '小探险家', '勇敢', '简洁直接', '👦', NULL, NULL, 1),
('char-preset-002', 'preset-adventure-001', '小红', '小智者', '聪明', '幽默风趣', '👧', 50, '朋友', 0),
('char-preset-003', 'preset-adventure-001', '老爷爷', '向导', '睿智', '温和', '👴', 30, '导师', 0);

-- 预设角色（魔幻传说书籍）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-preset-004', 'preset-fantasy-001', '艾拉', '魔法学徒', '好奇', '活泼', '🧙‍♀️', NULL, NULL, 1),
('char-preset-005', 'preset-fantasy-001', '马尔克斯', '魔法导师', '严肃', '深沉', '🧙‍♂️', 40, '导师', 0);

-- 预设角色（都市言情书籍）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-preset-006', 'preset-romance-001', '林小雨', '白领', '温柔', '礼貌客气', '👩', NULL, NULL, 1),
('char-preset-007', 'preset-romance-001', '陈明', '设计师', '幽默', '幽默风趣', '👨', 60, '恋人', 0);

-- 预设角色（职场风云书籍）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-preset-008', 'preset-business-001', '张伟', '经理', '冷静', '严肃正式', '👨‍💼', NULL, NULL, 1),
('char-preset-009', 'preset-business-001', '李娜', '助理', '细心', '温柔体贴', '👩‍💼', 70, '同事', 0);

-- 预设情节卡牌（儿童冒险）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-001', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气', 0),
('card-preset-002', 'preset-adventure-001', 'plot', 'weather', '雨天', '🌧️', '淅淅沥沥的小雨', 0),
('card-preset-003', 'preset-adventure-001', 'plot', 'terrain', '森林', '🌲', '神秘的森林', 0),
('card-preset-004', 'preset-adventure-001', 'plot', 'terrain', '山洞', '🏔️', '幽深的山洞', 0),
('card-preset-005', 'preset-adventure-001', 'plot', 'adventure', '寻宝', '🗺️', '寻找隐藏的宝藏', 0),
('card-preset-006', 'preset-adventure-001', 'plot', 'adventure', '解谜', '🔐', '解开神秘的谜题', 0),
('card-preset-007', 'preset-adventure-001', 'plot', 'equipment', '放大镜', '🔍', '观察细节的工具', 0),
('card-preset-008', 'preset-adventure-001', 'plot', 'equipment', '指南针', '🧭', '辨别方向的工具', 0);

-- 预设情节卡牌（魔幻传说）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-009', 'preset-fantasy-001', 'plot', 'weather', '雷暴', '⛈️', '狂风暴雨的天气', 0),
('card-preset-010', 'preset-fantasy-001', 'plot', 'terrain', '魔法塔', '🏰', '神秘的魔法塔', 0),
('card-preset-011', 'preset-fantasy-001', 'plot', 'adventure', '魔法试炼', '⚡', '接受魔法试炼', 0),
('card-preset-012', 'preset-fantasy-001', 'plot', 'equipment', '魔法杖', '🪄', '施展魔法的工具', 0);

-- 预设章节
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-001', 'preset-adventure-001', '神秘的开端', '在一个阳光明媚的早晨，小明收到了一封神秘的信件。信上画着一张古老的地图，指向森林深处的一个秘密地点。小明决定踏上探险之旅，他收拾好背包，带上放大镜和指南针，向着森林出发了。', 1),
('chapter-preset-002', 'preset-adventure-001', '森林探险', '走进森林，阳光透过树叶洒下斑驳的光影。小明听到了鸟儿的歌声，也发现了地上奇怪的脚印。他蹲下来仔细观察，这些脚印似乎通向山洞的方向。小红从树后跳出来："我也要一起去探险！"', 2);

-- 预设谜题
INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES
('puzzle-preset-001', 'chapter-preset-001', '什么东西越洗越脏？', '水', 'text', NULL),
('puzzle-preset-002', 'chapter-preset-002', '森林里最常见的颜色是什么？', '绿色', 'choice', '["红色","绿色","蓝色","黄色"]');
