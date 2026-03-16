-- 006系列预设书籍数据
-- 包含：星际探险家、龙之守护者、跨越时空的爱、创业逆袭
-- 每本书包含：书籍信息、角色卡牌、情节卡牌、章节内容、谜题

-- ============================================
-- 书籍数据
-- ============================================

INSERT INTO books (book_id, user_id, title, type, is_preset, language) VALUES
-- 儿童冒险 - 中文版
('preset-adventure-006', 'system', '星际探险家', 'adventure', 1, 'zh'),
-- 儿童冒险 - 英文版
('preset-adventure-006-en', 'system', 'Star Explorers', 'adventure', 1, 'en'),
-- 魔幻传说 - 中文版
('preset-fantasy-006', 'system', '龙之守护者', 'fantasy', 1, 'zh'),
-- 魔幻传说 - 英文版
('preset-fantasy-006-en', 'system', 'Dragon Guardian', 'fantasy', 1, 'en'),
-- 都市言情 - 中文版
('preset-romance-006', 'system', '跨越时空的爱', 'romance', 1, 'zh'),
-- 都市言情 - 英文版
('preset-romance-006-en', 'system', 'Love Across Time', 'romance', 1, 'en'),
-- 职场风云 - 中文版
('preset-business-006', 'system', '创业逆袭', 'business', 1, 'zh'),
-- 职场风云 - 英文版
('preset-business-006-en', 'system', 'The Comeback', 'business', 1, 'en');

-- ============================================
-- 角色数据
-- ============================================

-- 儿童冒险 - 星际探险家（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv006-001', 'preset-adventure-006', '星宇', '少年宇航员', '勇敢好奇、热爱探索、有责任心', '充满热情，喜欢用科学术语', '👦', NULL, NULL, 1),
('char-adv006-002', 'preset-adventure-006', '光子', '智能机器人', '理性冷静、忠诚可靠、偶尔幽默', '机械但温暖，喜欢用数据说话', '🤖', 60, '伙伴', 0),
('char-adv006-003', 'preset-adventure-006', '银河长老', '星际守护者', '神秘智慧、守护宇宙和平', '深沉睿智，喜欢用比喻', '👴', 40, '导师', 0);

-- 儿童冒险 - 星际探险家（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv006-001-en', 'preset-adventure-006-en', 'Nova', 'Young Astronaut', 'brave, curious, responsible', 'enthusiastic, uses scientific terms', '👦', NULL, NULL, 1),
('char-adv006-002-en', 'preset-adventure-006-en', 'Photon', 'AI Robot', 'rational, loyal, occasionally humorous', 'mechanical but warm, data-driven', '🤖', 60, 'companion', 0),
('char-adv006-003-en', 'preset-adventure-006-en', 'Elder Galaxy', 'Star Guardian', 'mysterious, wise, protects universe', 'profound, uses metaphors', '👴', 40, 'mentor', 0);

-- 魔幻传说 - 龙之守护者（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan006-001', 'preset-fantasy-006', '龙炎', '龙族后裔', '勇敢正义、内心善良、有责任感', '坚定有力，偶尔幽默', '👦', NULL, NULL, 1),
('char-fan006-002', 'preset-fantasy-006', '精灵艾拉', '精灵族向导', '温柔智慧、与自然和谐', '轻声细语，喜欢用诗意语言', '🧚', 65, '向导', 0),
('char-fan006-003', 'preset-fantasy-006', '龙族长老', '古老守护者', '神秘莫测、守护龙族秘密', '庄严深沉，喜欢讲故事', '👴', 35, '导师', 0);

-- 魔幻传说 - 龙之守护者（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan006-001-en', 'preset-fantasy-006-en', 'Drake', 'Dragon Descendant', 'brave, just, kind-hearted, responsible', 'firm, occasionally humorous', '👦', NULL, NULL, 1),
('char-fan006-002-en', 'preset-fantasy-006-en', 'Ella the Elf', 'Elven Guide', 'gentle, wise, one with nature', 'soft-spoken, poetic', '🧚', 65, 'guide', 0),
('char-fan006-003-en', 'preset-fantasy-006-en', 'Dragon Elder', 'Ancient Guardian', 'mysterious, protects dragon secrets', 'solemn, tells stories', '👴', 35, 'mentor', 0);

-- 都市言情 - 跨越时空的爱（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom006-001', 'preset-romance-006', '林晓雨', '自由撰稿人', '温柔细腻、热爱写作、相信缘分', '文艺诗意，喜欢用比喻', '👩', NULL, NULL, 1),
('char-rom006-002', 'preset-romance-006', '陈远航', '建筑师', '稳重可靠、有梦想、重感情', '温和直接，喜欢用建筑术语', '👨', 80, '恋人', 0),
('char-rom006-003', 'preset-romance-006', '小雨妈妈', '母亲', '传统保守、爱女儿', '关心唠叨，喜欢用老话', '👩', 50, '家人', 0);

-- 都市言情 - 跨越时空的爱（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom006-001-en', 'preset-romance-006-en', 'Luna', 'Freelance Writer', 'gentle, loves writing, believes in fate', 'poetic, uses metaphors', '👩', NULL, NULL, 1),
('char-rom006-002-en', 'preset-romance-006-en', 'Atlas', 'Architect', 'steady, reliable, ambitious, devoted', 'warm, direct, uses architectural terms', '👨', 80, 'lover', 0),
('char-rom006-003-en', 'preset-romance-006-en', 'Luna''s Mom', 'Mother', 'traditional, protective, loving', 'caring, uses old sayings', '👩', 50, 'family', 0);

-- 职场风云 - 创业逆袭（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus006-001', 'preset-business-006', '张明', '创业者', '坚韧不拔、有远见、敢于冒险', '直接有力，喜欢用创业术语', '👨', NULL, NULL, 1),
('char-bus006-002', 'preset-business-006', '李华', '合伙人', '理性务实、善于分析', '冷静客观，喜欢用数据说话', '👩', 70, '合伙人', 0),
('char-bus006-003', 'preset-business-006', '王总', '投资人', '眼光独到、喜欢挑战', '犀利直接，喜欢用商业术语', '👨', 45, '投资人', 0);

-- 职场风云 - 创业逆袭（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus006-001-en', 'preset-business-006-en', 'Max', 'Entrepreneur', 'resilient, visionary, risk-taker', 'direct, uses startup terms', '👨', NULL, NULL, 1),
('char-bus006-002-en', 'preset-business-006-en', 'Lisa', 'Co-founder', 'rational, practical, analytical', 'calm, data-driven', '👩', 70, 'partner', 0),
('char-bus006-003-en', 'preset-business-006-en', 'Mr. Wang', 'Investor', 'sharp-eyed, loves challenges', 'direct, uses business terms', '👨', 45, 'investor', 0);

-- ============================================
-- 情节卡牌数据
-- ============================================

-- 儿童冒险 - 星际探险家（中文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (太空天气)
('card-adv006-w01', 'preset-adventure-006', 'plot', 'weather', '星光璀璨', '✨', '满天繁星闪烁'),
('card-adv006-w02', 'preset-adventure-006', 'plot', 'weather', '太阳风暴', '☀️', '强烈的太阳辐射'),
('card-adv006-w03', 'preset-adventure-006', 'plot', 'weather', '极光闪烁', '🌌', '绚丽的太空极光'),
('card-adv006-w04', 'preset-adventure-006', 'plot', 'weather', '流星雨', '🌠', '壮观的流星雨'),
-- terrain (太空地形)
('card-adv006-t01', 'preset-adventure-006', 'plot', 'terrain', '太空站', '🛸', '人类的前哨基地'),
('card-adv006-t02', 'preset-adventure-006', 'plot', 'terrain', '外星球', '🌍', '神秘的未知星球'),
('card-adv006-t03', 'preset-adventure-006', 'plot', 'terrain', '小行星带', '☄️', '危险的小行星群'),
('card-adv006-t04', 'preset-adventure-006', 'plot', 'terrain', '古老遗迹', '🏛️', '外星文明的遗迹'),
-- adventure (太空冒险)
('card-adv006-a01', 'preset-adventure-006', 'plot', 'adventure', '星际探索', '🚀', '探索未知的宇宙'),
('card-adv006-a02', 'preset-adventure-006', 'plot', 'adventure', '发现信号', '📡', '接收神秘信号'),
('card-adv006-a03', 'preset-adventure-006', 'plot', 'adventure', '危机救援', '🆘', '救援遇险的伙伴'),
('card-adv006-a04', 'preset-adventure-006', 'plot', 'adventure', '守护使命', '🛡️', '守护宇宙和平'),
-- equipment (太空装备)
('card-adv006-e01', 'preset-adventure-006', 'plot', 'equipment', '宇航服', '👨‍🚀', '保护宇航员'),
('card-adv006-e02', 'preset-adventure-006', 'plot', 'equipment', '激光枪', '🔫', '自卫武器'),
('card-adv006-e03', 'preset-adventure-006', 'plot', 'equipment', '通讯器', '📻', '远程通讯设备'),
('card-adv006-e04', 'preset-adventure-006', 'plot', 'equipment', '能量核心', '💎', '飞船动力源');

-- 儿童冒险 - 星际探险家（英文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-adv006-w01-en', 'preset-adventure-006-en', 'plot', 'weather', 'Starry Sky', '✨', 'Twinkling stars'),
('card-adv006-w02-en', 'preset-adventure-006-en', 'plot', 'weather', 'Solar Storm', '☀️', 'Intense solar radiation'),
('card-adv006-w03-en', 'preset-adventure-006-en', 'plot', 'weather', 'Aurora', '🌌', 'Spectacular space aurora'),
('card-adv006-w04-en', 'preset-adventure-006-en', 'plot', 'weather', 'Meteor Shower', '🌠', 'Magnificent meteor shower'),
-- terrain
('card-adv006-t01-en', 'preset-adventure-006-en', 'plot', 'terrain', 'Space Station', '🛸', 'Human outpost'),
('card-adv006-t02-en', 'preset-adventure-006-en', 'plot', 'terrain', 'Alien Planet', '🌍', 'Mysterious unknown planet'),
('card-adv006-t03-en', 'preset-adventure-006-en', 'plot', 'terrain', 'Asteroid Belt', '☄️', 'Dangerous asteroid field'),
('card-adv006-t04-en', 'preset-adventure-006-en', 'plot', 'terrain', 'Ancient Ruins', '🏛️', 'Alien civilization ruins'),
-- adventure
('card-adv006-a01-en', 'preset-adventure-006-en', 'plot', 'adventure', 'Space Exploration', '🚀', 'Explore the unknown'),
('card-adv006-a02-en', 'preset-adventure-006-en', 'plot', 'adventure', 'Signal Detection', '📡', 'Receive mysterious signal'),
('card-adv006-a03-en', 'preset-adventure-006-en', 'plot', 'adventure', 'Rescue Mission', '🆘', 'Rescue endangered friends'),
('card-adv006-a04-en', 'preset-adventure-006-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Protect the universe'),
-- equipment
('card-adv006-e01-en', 'preset-adventure-006-en', 'plot', 'equipment', 'Spacesuit', '👨‍🚀', 'Protect astronauts'),
('card-adv006-e02-en', 'preset-adventure-006-en', 'plot', 'equipment', 'Laser Gun', '🔫', 'Self-defense weapon'),
('card-adv006-e03-en', 'preset-adventure-006-en', 'plot', 'equipment', 'Communicator', '📻', 'Long-range communication'),
('card-adv006-e04-en', 'preset-adventure-006-en', 'plot', 'equipment', 'Energy Core', '💎', 'Spaceship power source');

-- 魔幻传说 - 龙之守护者（中文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-fan006-w01', 'preset-fantasy-006', 'plot', 'weather', '龙息之云', '☁️', '龙族气息凝聚的云'),
('card-fan006-w02', 'preset-fantasy-006', 'plot', 'weather', '火焰风暴', '🔥', '龙焰引发的风暴'),
('card-fan006-w03', 'preset-fantasy-006', 'plot', 'weather', '神圣之光', '✨', '龙族的祝福之光'),
('card-fan006-w04', 'preset-fantasy-006', 'plot', 'weather', '黑暗降临', '🌑', '邪恶势力的黑暗'),
-- terrain
('card-fan006-t01', 'preset-fantasy-006', 'plot', 'terrain', '龙族圣地', '🏔️', '龙族的栖息之地'),
('card-fan006-t02', 'preset-fantasy-006', 'plot', 'terrain', '精灵森林', '🌳', '精灵族的家园'),
('card-fan006-t03', 'preset-fantasy-006', 'plot', 'terrain', '古老遗迹', '🏛️', '龙族历史的见证'),
('card-fan006-t04', 'preset-fantasy-006', 'plot', 'terrain', '黑暗城堡', '🏰', '邪恶势力的巢穴'),
-- adventure
('card-fan006-a01', 'preset-fantasy-006', 'plot', 'adventure', '觉醒力量', '💫', '觉醒龙族血脉'),
('card-fan006-a02', 'preset-fantasy-006', 'plot', 'adventure', '守护龙蛋', '🥚', '保护最后的龙蛋'),
('card-fan006-a03', 'preset-fantasy-006', 'plot', 'adventure', '对抗黑暗', '⚔️', '与邪恶势力战斗'),
('card-fan006-a04', 'preset-fantasy-006', 'plot', 'adventure', '龙的诞生', '🐉', '小龙破壳而出'),
-- equipment
('card-fan006-e01', 'preset-fantasy-006', 'plot', 'equipment', '龙族印记', '🔰', '龙族血脉的证明'),
('card-fan006-e02', 'preset-fantasy-006', 'plot', 'equipment', '魔法护盾', '🛡️', '龙族的守护'),
('card-fan006-e03', 'preset-fantasy-006', 'plot', 'equipment', '龙晶', '💎', '蕴含龙族力量'),
('card-fan006-e04', 'preset-fantasy-006', 'plot', 'equipment', '古老卷轴', '📜', '记载龙族秘密');

-- 魔幻传说 - 龙之守护者（英文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-fan006-w01-en', 'preset-fantasy-006-en', 'plot', 'weather', 'Dragon Breath Cloud', '☁️', 'Cloud of dragon essence'),
('card-fan006-w02-en', 'preset-fantasy-006-en', 'plot', 'weather', 'Fire Storm', '🔥', 'Storm from dragon flame'),
('card-fan006-w03-en', 'preset-fantasy-006-en', 'plot', 'weather', 'Divine Light', '✨', 'Dragon blessing light'),
('card-fan006-w04-en', 'preset-fantasy-006-en', 'plot', 'weather', 'Darkness Falls', '🌑', 'Evil force darkness'),
-- terrain
('card-fan006-t01-en', 'preset-fantasy-006-en', 'plot', 'terrain', 'Dragon Sanctuary', '🏔️', 'Dragon homeland'),
('card-fan006-t02-en', 'preset-fantasy-006-en', 'plot', 'terrain', 'Elf Forest', '🌳', 'Elven homeland'),
('card-fan006-t03-en', 'preset-fantasy-006-en', 'plot', 'terrain', 'Ancient Ruins', '🏛️', 'Witness of dragon history'),
('card-fan006-t04-en', 'preset-fantasy-006-en', 'plot', 'terrain', 'Dark Castle', '🏰', 'Evil force lair'),
-- adventure
('card-fan006-a01-en', 'preset-fantasy-006-en', 'plot', 'adventure', 'Awaken Power', '💫', 'Awaken dragon blood'),
('card-fan006-a02-en', 'preset-fantasy-006-en', 'plot', 'adventure', 'Guard Dragon Egg', '🥚', 'Protect the last egg'),
('card-fan006-a03-en', 'preset-fantasy-006-en', 'plot', 'adventure', 'Battle Darkness', '⚔️', 'Fight evil forces'),
('card-fan006-a04-en', 'preset-fantasy-006-en', 'plot', 'adventure', 'Dragon Birth', '🐉', 'Baby dragon hatches'),
-- equipment
('card-fan006-e01-en', 'preset-fantasy-006-en', 'plot', 'equipment', 'Dragon Mark', '🔰', 'Proof of dragon blood'),
('card-fan006-e02-en', 'preset-fantasy-006-en', 'plot', 'equipment', 'Magic Shield', '🛡️', 'Dragon protection'),
('card-fan006-e03-en', 'preset-fantasy-006-en', 'plot', 'equipment', 'Dragon Crystal', '💎', 'Contains dragon power'),
('card-fan006-e04-en', 'preset-fantasy-006-en', 'plot', 'equipment', 'Ancient Scroll', '📜', 'Records dragon secrets');

-- 都市言情 - 跨越时空的爱（中文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-rom006-w01', 'preset-romance-006', 'plot', 'weather', '阳光明媚', '☀️', '温暖的阳光'),
('card-rom006-w02', 'preset-romance-006', 'plot', 'weather', '细雨绵绵', '🌧️', '浪漫的雨天'),
('card-rom006-w03', 'preset-romance-006', 'plot', 'weather', '夕阳西下', '🌇', '浪漫的黄昏'),
('card-rom006-w04', 'preset-romance-006', 'plot', 'weather', '星空璀璨', '⭐', '美丽的夜空'),
-- terrain
('card-rom006-t01', 'preset-romance-006', 'plot', 'terrain', '咖啡馆', '☕', '温馨的咖啡馆'),
('card-rom006-t02', 'preset-romance-006', 'plot', 'terrain', '城市街头', '🏙️', '繁忙的城市'),
('card-rom006-t03', 'preset-romance-006', 'plot', 'terrain', '海边', '🏖️', '浪漫的海边'),
('card-rom006-t04', 'preset-romance-006', 'plot', 'terrain', '机场', '✈️', '离别与重逢'),
-- adventure
('card-rom006-a01', 'preset-romance-006', 'plot', 'adventure', '邂逅', '💫', '命运的相遇'),
('card-rom006-a02', 'preset-romance-006', 'plot', 'adventure', '告白', '💕', '勇敢的表白'),
('card-rom006-a03', 'preset-romance-006', 'plot', 'adventure', '坚持', '💪', '为爱坚持'),
('card-rom006-a04', 'preset-romance-006', 'plot', 'adventure', '求婚', '💍', '浪漫的求婚'),
-- equipment
('card-rom006-e01', 'preset-romance-006', 'plot', 'equipment', '手机', '📱', '联系的工具'),
('card-rom006-e02', 'preset-romance-006', 'plot', 'equipment', '笔记本', '📓', '记录故事'),
('card-rom006-e03', 'preset-romance-006', 'plot', 'equipment', '相机', '📷', '记录美好'),
('card-rom006-e04', 'preset-romance-006', 'plot', 'equipment', '戒指', '💍', '爱情的象征');

-- 都市言情 - 跨越时空的爱（英文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-rom006-w01-en', 'preset-romance-006-en', 'plot', 'weather', 'Sunny Day', '☀️', 'Warm sunshine'),
('card-rom006-w02-en', 'preset-romance-006-en', 'plot', 'weather', 'Light Rain', '🌧️', 'Romantic rainy day'),
('card-rom006-w03-en', 'preset-romance-006-en', 'plot', 'weather', 'Sunset', '🌇', 'Romantic dusk'),
('card-rom006-w04-en', 'preset-romance-006-en', 'plot', 'weather', 'Starry Night', '⭐', 'Beautiful night sky'),
-- terrain
('card-rom006-t01-en', 'preset-romance-006-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe'),
('card-rom006-t02-en', 'preset-romance-006-en', 'plot', 'terrain', 'City Street', '🏙️', 'Busy city'),
('card-rom006-t03-en', 'preset-romance-006-en', 'plot', 'terrain', 'Beach', '🏖️', 'Romantic beach'),
('card-rom006-t04-en', 'preset-romance-006-en', 'plot', 'terrain', 'Airport', '✈️', 'Farewell and reunion'),
-- adventure
('card-rom006-a01-en', 'preset-romance-006-en', 'plot', 'adventure', 'Encounter', '💫', 'Fateful meeting'),
('card-rom006-a02-en', 'preset-romance-006-en', 'plot', 'adventure', 'Confession', '💕', 'Brave confession'),
('card-rom006-a03-en', 'preset-romance-006-en', 'plot', 'adventure', 'Persistence', '💪', 'Fight for love'),
('card-rom006-a04-en', 'preset-romance-006-en', 'plot', 'adventure', 'Proposal', '💍', 'Romantic proposal'),
-- equipment
('card-rom006-e01-en', 'preset-romance-006-en', 'plot', 'equipment', 'Phone', '📱', 'Communication tool'),
('card-rom006-e02-en', 'preset-romance-006-en', 'plot', 'equipment', 'Notebook', '📓', 'Record stories'),
('card-rom006-e03-en', 'preset-romance-006-en', 'plot', 'equipment', 'Camera', '📷', 'Capture moments'),
('card-rom006-e04-en', 'preset-romance-006-en', 'plot', 'equipment', 'Ring', '💍', 'Symbol of love');

-- 职场风云 - 创业逆袭（中文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-bus006-w01', 'preset-business-006', 'plot', 'weather', '晴天', '☀️', '充满希望'),
('card-bus006-w02', 'preset-business-006', 'plot', 'weather', '阴天', '☁️', '面临困难'),
('card-bus006-w03', 'preset-business-006', 'plot', 'weather', '雨后彩虹', '🌈', '转机出现'),
('card-bus006-w04', 'preset-business-006', 'plot', 'weather', '星空', '⭐', '展望未来'),
-- terrain
('card-bus006-t01', 'preset-business-006', 'plot', 'terrain', '办公室', '🏢', '奋斗的战场'),
('card-bus006-t02', 'preset-business-006', 'plot', 'terrain', '咖啡馆', '☕', '商务洽谈'),
('card-bus006-t03', 'preset-business-006', 'plot', 'terrain', '投资公司', '🏦', '寻找资金'),
('card-bus006-t04', 'preset-business-006', 'plot', 'terrain', '创业大赛', '🏆', '展示机会'),
-- adventure
('card-bus006-a01', 'preset-business-006', 'plot', 'adventure', '创业', '🚀', '开始创业'),
('card-bus006-a02', 'preset-business-006', 'plot', 'adventure', '融资', '💰', '获得投资'),
('card-bus006-a03', 'preset-business-006', 'plot', 'adventure', '突破', '📈', '取得成功'),
('card-bus006-a04', 'preset-business-006', 'plot', 'adventure', '坚持', '💪', '不忘初心'),
-- equipment
('card-bus006-e01', 'preset-business-006', 'plot', 'equipment', '商业计划书', '📋', '创业蓝图'),
('card-bus006-e02', 'preset-business-006', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备'),
('card-bus006-e03', 'preset-business-006', 'plot', 'equipment', '名片', '💳', '人脉工具'),
('card-bus006-e04', 'preset-business-006', 'plot', 'equipment', '合同', '📄', '合作凭证');

-- 职场风云 - 创业逆袭（英文版）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-bus006-w01-en', 'preset-business-006-en', 'plot', 'weather', 'Sunny', '☀️', 'Full of hope'),
('card-bus006-w02-en', 'preset-business-006-en', 'plot', 'weather', 'Cloudy', '☁️', 'Facing challenges'),
('card-bus006-w03-en', 'preset-business-006-en', 'plot', 'weather', 'Rainbow', '🌈', 'Breakthrough comes'),
('card-bus006-w04-en', 'preset-business-006-en', 'plot', 'weather', 'Starry Night', '⭐', 'Looking to future'),
-- terrain
('card-bus006-t01-en', 'preset-business-006-en', 'plot', 'terrain', 'Office', '🏢', 'Battlefield of work'),
('card-bus006-t02-en', 'preset-business-006-en', 'plot', 'terrain', 'Cafe', '☕', 'Business meeting'),
('card-bus006-t03-en', 'preset-business-006-en', 'plot', 'terrain', 'Investment Firm', '🏦', 'Seeking funding'),
('card-bus006-t04-en', 'preset-business-006-en', 'plot', 'terrain', 'Startup Contest', '🏆', 'Showcase opportunity'),
-- adventure
('card-bus006-a01-en', 'preset-business-006-en', 'plot', 'adventure', 'Startup', '🚀', 'Begin entrepreneurship'),
('card-bus006-a02-en', 'preset-business-006-en', 'plot', 'adventure', 'Funding', '💰', 'Get investment'),
('card-bus006-a03-en', 'preset-business-006-en', 'plot', 'adventure', 'Breakthrough', '📈', 'Achieve success'),
('card-bus006-a04-en', 'preset-business-006-en', 'plot', 'adventure', 'Persistence', '💪', 'Stay true to vision'),
-- equipment
('card-bus006-e01-en', 'preset-business-006-en', 'plot', 'equipment', 'Business Plan', '📋', 'Startup blueprint'),
('card-bus006-e02-en', 'preset-business-006-en', 'plot', 'equipment', 'Laptop', '💻', 'Work essential'),
('card-bus006-e03-en', 'preset-business-006-en', 'plot', 'equipment', 'Business Card', '💳', 'Networking tool'),
('card-bus006-e04-en', 'preset-business-006-en', 'plot', 'equipment', 'Contract', '📄', 'Partnership proof');

-- ============================================
-- 章节数据 - 儿童冒险：星际探险家（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv006-01', 'preset-adventure-006', '神秘的信号',
'星宇站在太空站的观景窗前，望着浩瀚的宇宙。作为太空站最年轻的宇航员，他每天都在这里值班，监测来自深空的信号。今天，他的通讯器突然发出一阵奇异的蜂鸣声。屏幕上跳出一个从未见过的信号波形，来自银河系边缘的一个未知区域。光子机器人飘过来，用机械但温暖的声音说："星宇，这个信号的频率非常特殊，我从未在数据库中见过类似的数据。"星宇的心跳加速了，他知道这可能是一个重大发现。',
'{"weather":{"name":"星光璀璨","icon":"✨","description":"满天繁星闪烁"},"terrain":{"name":"太空站","icon":"🛸","description":"人类的前哨基地"},"adventure":{"name":"发现信号","icon":"📡","description":"接收神秘信号"},"equipment":{"name":"通讯器","icon":"📻","description":"远程通讯设备"}}',
1),

('chapter-adv006-02', 'preset-adventure-006', '出发前的准备',
'星宇立刻向太空站指挥官报告了这个发现。指挥官召集了紧急会议，决定派遣一支探险小队前往信号源调查。星宇被选中成为队员之一，他兴奋得几乎睡不着觉。出发前，他仔细检查了自己的宇航服和装备。光子机器人将作为他的伙伴一同前往。在准备室里，星宇遇到了其他队员：经验丰富的领航员和勇敢的工程师。他们一起研究了航线图，发现要穿越一片危险的小行星带才能到达目的地。',
'{"weather":{"name":"太阳风暴","icon":"☀️","description":"强烈的太阳辐射"},"terrain":{"name":"太空站","icon":"🛸","description":"人类的前哨基地"},"adventure":{"name":"星际探索","icon":"🚀","description":"探索未知的宇宙"},"equipment":{"name":"宇航服","icon":"👨‍🚀","description":"保护宇航员"}}',
2),

('chapter-adv006-03', 'preset-adventure-006', '穿越小行星带',
'飞船驶入小行星带，四周漂浮着大小不一的岩石。星宇紧紧握住操纵杆，小心翼翼地驾驶飞船穿梭在危险之间。突然，一块巨大的小行星从侧面冲来，星宇迅速做出反应，飞船擦着小行星的边缘飞过。光子机器人快速计算着最佳航线："前方三百公里处有一个安全通道，但我们需要加速通过。"星宇咬紧牙关，全速前进。在惊险的几分钟后，他们终于穿越了小行星带，前方出现了一个神秘的星球。',
'{"weather":{"name":"极光闪烁","icon":"🌌","description":"绚丽的太空极光"},"terrain":{"name":"小行星带","icon":"☄️","description":"危险的小行星群"},"adventure":{"name":"星际探索","icon":"🚀","description":"探索未知的宇宙"},"equipment":{"name":"能量核心","icon":"💎","description":"飞船动力源"}}',
3),

('chapter-adv006-04', 'preset-adventure-006', '未知星球',
'飞船降落在未知星球的表面。这里的天空呈现出奇异的紫色，地面上覆盖着发光的晶体。星宇穿上宇航服，小心翼翼地走出飞船。他发现这个星球上有着古老的建筑遗迹，看起来像是某种高等文明留下的。光子机器人扫描着周围的环境："这个星球的能量读数异常高，那些晶体似乎是某种能量源。"星宇走向一座巨大的石门，门上刻着复杂的符号，似乎在诉说着一个古老的故事。',
'{"weather":{"name":"流星雨","icon":"🌠","description":"壮观的流星雨"},"terrain":{"name":"外星球","icon":"🌍","description":"神秘的未知星球"},"adventure":{"name":"星际探索","icon":"🚀","description":"探索未知的宇宙"},"equipment":{"name":"激光枪","icon":"🔫","description":"自卫武器"}}',
4),

('chapter-adv006-05', 'preset-adventure-006', '地下城市',
'星宇推开石门，发现里面是一个巨大的地下城市。城市里有着高耸的建筑和复杂的通道，虽然已经荒废了很久，但依然能看出曾经的辉煌。光子机器人的灯光照亮了墙壁上的壁画，描绘着一个强大的文明与某种黑暗力量战斗的场景。星宇仔细观察着壁画，突然发现壁画中央有一个熟悉的符号——和他收到的神秘信号一模一样。他意识到，这个信号可能是这个古老文明留下的求救信息。',
'{"weather":{"name":"星光璀璨","icon":"✨","description":"满天繁星闪烁"},"terrain":{"name":"古老遗迹","icon":"🏛️","description":"外星文明的遗迹"},"adventure":{"name":"发现信号","icon":"📡","description":"接收神秘信号"},"equipment":{"name":"通讯器","icon":"📻","description":"远程通讯设备"}}',
5),

('chapter-adv006-06', 'preset-adventure-006', '星际守护者',
'在城市的中心，星宇遇到了一个神秘的存在——银河长老。他是一位星际守护者，已经在这个星球上等待了数千年。银河长老告诉星宇，这个古老文明曾经是银河系的守护者，他们与黑暗势力进行了漫长的战争。最终，他们牺牲了自己，将黑暗势力封印在这个星球深处。而那个神秘信号，正是封印开始松动的警告。银河长老说："年轻人，你是被选中的人，只有你能完成我们未竟的使命。"',
'{"weather":{"name":"极光闪烁","icon":"🌌","description":"绚丽的太空极光"},"terrain":{"name":"古老遗迹","icon":"🏛️","description":"外星文明的遗迹"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护宇宙和平"},"equipment":{"name":"能量核心","icon":"💎","description":"飞船动力源"}}',
6),

('chapter-adv006-07', 'preset-adventure-006', '危机降临',
'银河长老带领星宇来到封印之地。那里有一个巨大的能量漩涡，黑暗势力正在试图突破封印。星宇感受到了一股强大的邪恶气息，让他不寒而栗。光子机器人警告道："能量读数正在急剧上升，封印可能在几小时内就会崩溃！"银河长老严肃地说："我们必须找到能量核心，重新加固封印。但这个过程充满危险，你准备好了吗？"星宇深吸一口气，坚定地点了点头。',
'{"weather":{"name":"太阳风暴","icon":"☀️","description":"强烈的太阳辐射"},"terrain":{"name":"古老遗迹","icon":"🏛️","description":"外星文明的遗迹"},"adventure":{"name":"危机救援","icon":"🆘","description":"救援遇险的伙伴"},"equipment":{"name":"激光枪","icon":"🔫","description":"自卫武器"}}',
7),

('chapter-adv006-08', 'preset-adventure-006', '最后的任务',
'星宇在银河长老的指引下，深入地下寻找能量核心。他穿越了危险的通道，躲避了各种陷阱，终于来到了核心所在地。那里有一颗巨大的水晶，散发着纯净的光芒。但守护水晶的是一只由黑暗能量构成的怪物。星宇鼓起勇气，与怪物展开了激烈的战斗。在光子机器人的帮助下，他成功击败了怪物，获得了能量核心。银河长老的声音传来："做得好，年轻人，现在快回来！"',
'{"weather":{"name":"流星雨","icon":"🌠","description":"壮观的流星雨"},"terrain":{"name":"外星球","icon":"🌍","description":"神秘的未知星球"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护宇宙和平"},"equipment":{"name":"能量核心","icon":"💎","description":"飞船动力源"}}',
8),

('chapter-adv006-09', 'preset-adventure-006', '逃离星球',
'星宇带着能量核心赶回封印之地，但黑暗势力已经突破了部分封印。银河长老正在努力压制黑暗能量，但显然已经力不从心。星宇迅速将能量核心放入封印装置，一道耀眼的光芒闪过，封印重新加固。但星球开始剧烈震动，整个地下城市正在崩塌。银河长老说："快走！星球即将毁灭，你们必须离开！"星宇不舍地看了银河长老最后一眼，转身向飞船跑去。在最后一刻，飞船冲出了星球表面。',
'{"weather":{"name":"极光闪烁","icon":"🌌","description":"绚丽的太空极光"},"terrain":{"name":"外星球","icon":"🌍","description":"神秘的未知星球"},"adventure":{"name":"危机救援","icon":"🆘","description":"救援遇险的伙伴"},"equipment":{"name":"宇航服","icon":"👨‍🚀","description":"保护宇航员"}}',
9),

('chapter-adv006-10', 'preset-adventure-006', '新的使命',
'星宇回到太空站，将这次冒险的经历报告给了指挥官。虽然星球已经毁灭，但黑暗势力被重新封印，银河系暂时安全了。星宇站在观景窗前，望着那片曾经存在神秘星球的星空。光子机器人飘过来："星宇，银河长老在最后时刻传给了我一条信息。"星宇打开信息，银河长老的声音响起："年轻人，你已经成为了一名真正的星际守护者。宇宙中还有许多需要保护的地方，你的使命才刚刚开始。"星宇微笑着，他知道，这只是他冒险的开始。',
'{"weather":{"name":"星光璀璨","icon":"✨","description":"满天繁星闪烁"},"terrain":{"name":"太空站","icon":"🛸","description":"人类的前哨基地"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护宇宙和平"},"equipment":{"name":"通讯器","icon":"📻","description":"远程通讯设备"}}',
10);

-- ============================================
-- 章节数据 - 儿童冒险：星际探险家（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv006-01-en', 'preset-adventure-006-en', 'The Mysterious Signal',
'Nova stood before the observation window of the space station, gazing at the vast universe. As the youngest astronaut on the station, he monitored signals from deep space every day. Today, his communicator suddenly emitted a strange buzzing sound. A signal waveform he had never seen before appeared on the screen, coming from an unknown region at the edge of the galaxy. Photon, his AI robot, floated over and said in a mechanical but warm voice: "Nova, this signal frequency is very special. I have never seen similar data in my database." Nova''s heart raced. He knew this could be a major discovery.',
'{"weather":{"name":"Starry Sky","icon":"✨","description":"Twinkling stars"},"terrain":{"name":"Space Station","icon":"🛸","description":"Human outpost"},"adventure":{"name":"Signal Detection","icon":"📡","description":"Receive mysterious signal"},"equipment":{"name":"Communicator","icon":"📻","description":"Long-range communication"}}',
1),

('chapter-adv006-02-en', 'preset-adventure-006-en', 'Preparation for Departure',
'Nova immediately reported the discovery to the station commander. The commander called an emergency meeting and decided to send an exploration team to investigate the signal source. Nova was selected as a team member, and he was so excited he could barely sleep. Before departure, he carefully checked his spacesuit and equipment. Photon would accompany him as his partner. In the preparation room, Nova met other team members: an experienced navigator and a brave engineer. Together they studied the route map and discovered they would need to cross a dangerous asteroid belt to reach their destination.',
'{"weather":{"name":"Solar Storm","icon":"☀️","description":"Intense solar radiation"},"terrain":{"name":"Space Station","icon":"🛸","description":"Human outpost"},"adventure":{"name":"Space Exploration","icon":"🚀","description":"Explore the unknown"},"equipment":{"name":"Spacesuit","icon":"👨‍🚀","description":"Protect astronauts"}}',
2),

('chapter-adv006-03-en', 'preset-adventure-006-en', 'Crossing the Asteroid Belt',
'The spaceship entered the asteroid belt, surrounded by rocks of various sizes. Nova gripped the controls tightly, carefully navigating through the dangers. Suddenly, a massive asteroid rushed from the side. Nova reacted quickly, and the ship grazed past the asteroid''s edge. Photon quickly calculated the optimal route: "There''s a safe passage three hundred kilometers ahead, but we need to accelerate." Nova gritted his teeth and pushed forward at full speed. After a thrilling few minutes, they finally crossed the asteroid belt, and a mysterious planet appeared ahead.',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular space aurora"},"terrain":{"name":"Asteroid Belt","icon":"☄️","description":"Dangerous asteroid field"},"adventure":{"name":"Space Exploration","icon":"🚀","description":"Explore the unknown"},"equipment":{"name":"Energy Core","icon":"💎","description":"Spaceship power source"}}',
3),

('chapter-adv006-04-en', 'preset-adventure-006-en', 'The Unknown Planet',
'The spaceship landed on the surface of the unknown planet. The sky here had a strange purple hue, and the ground was covered with glowing crystals. Nova put on his spacesuit and carefully stepped out of the ship. He discovered ancient architectural ruins on this planet, seemingly left by some advanced civilization. Photon scanned the surroundings: "The energy readings on this planet are unusually high. Those crystals appear to be some kind of energy source." Nova walked toward a massive stone gate with complex symbols carved on it, seemingly telling an ancient story.',
'{"weather":{"name":"Meteor Shower","icon":"🌠","description":"Magnificent meteor shower"},"terrain":{"name":"Alien Planet","icon":"🌍","description":"Mysterious unknown planet"},"adventure":{"name":"Space Exploration","icon":"🚀","description":"Explore the unknown"},"equipment":{"name":"Laser Gun","icon":"🔫","description":"Self-defense weapon"}}',
4),

('chapter-adv006-05-en', 'preset-adventure-006-en', 'The Underground City',
'Nova pushed open the stone gate and discovered a massive underground city inside. The city had towering buildings and complex passages. Though abandoned for a long time, its former glory was still evident. Photon''s light illuminated murals on the walls, depicting a powerful civilization fighting against some dark force. Nova carefully observed the murals and suddenly noticed a familiar symbol in the center—exactly the same as the mysterious signal he had received. He realized this signal might be a distress message left by this ancient civilization.',
'{"weather":{"name":"Starry Sky","icon":"✨","description":"Twinkling stars"},"terrain":{"name":"Ancient Ruins","icon":"🏛️","description":"Alien civilization ruins"},"adventure":{"name":"Signal Detection","icon":"📡","description":"Receive mysterious signal"},"equipment":{"name":"Communicator","icon":"📻","description":"Long-range communication"}}',
5),

('chapter-adv006-06-en', 'preset-adventure-006-en', 'The Star Guardian',
'In the center of the city, Nova encountered a mysterious being—Elder Galaxy. He was a Star Guardian who had been waiting on this planet for thousands of years. Elder Galaxy told Nova that this ancient civilization was once the guardian of the galaxy, engaged in a long war with dark forces. Eventually, they sacrificed themselves to seal the dark forces deep within this planet. The mysterious signal was a warning that the seal was beginning to weaken. Elder Galaxy said: "Young one, you have been chosen. Only you can complete our unfinished mission."',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular space aurora"},"terrain":{"name":"Ancient Ruins","icon":"🏛️","description":"Alien civilization ruins"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Protect the universe"},"equipment":{"name":"Energy Core","icon":"💎","description":"Spaceship power source"}}',
6),

('chapter-adv006-07-en', 'preset-adventure-006-en', 'Crisis Descends',
'Elder Galaxy led Nova to the sealing ground. There was a massive energy vortex, and dark forces were trying to break through the seal. Nova felt a powerful evil presence that made him shudder. Photon warned: "Energy readings are rising rapidly. The seal could collapse within hours!" Elder Galaxy said seriously: "We must find the energy core to reinforce the seal. But this process is full of danger. Are you ready?" Nova took a deep breath and nodded firmly.',
'{"weather":{"name":"Solar Storm","icon":"☀️","description":"Intense solar radiation"},"terrain":{"name":"Ancient Ruins","icon":"🏛️","description":"Alien civilization ruins"},"adventure":{"name":"Rescue Mission","icon":"🆘","description":"Rescue endangered friends"},"equipment":{"name":"Laser Gun","icon":"🔫","description":"Self-defense weapon"}}',
7),

('chapter-adv006-08-en', 'preset-adventure-006-en', 'The Final Mission',
'Under Elder Galaxy''s guidance, Nova went deep underground to find the energy core. He navigated dangerous passages, avoided various traps, and finally reached the core''s location. There was a massive crystal emitting pure light. But guarding the crystal was a monster made of dark energy. Nova summoned his courage and engaged in fierce combat with the monster. With Photon''s help, he successfully defeated the monster and obtained the energy core. Elder Galaxy''s voice came through: "Well done, young one. Now hurry back!"',
'{"weather":{"name":"Meteor Shower","icon":"🌠","description":"Magnificent meteor shower"},"terrain":{"name":"Alien Planet","icon":"🌍","description":"Mysterious unknown planet"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Protect the universe"},"equipment":{"name":"Energy Core","icon":"💎","description":"Spaceship power source"}}',
8),

('chapter-adv006-09-en', 'preset-adventure-006-en', 'Escape from the Planet',
'Nova rushed back to the sealing ground with the energy core, but dark forces had already broken through part of the seal. Elder Galaxy was struggling to suppress the dark energy. Nova quickly placed the energy core into the sealing device, and a dazzling light flashed as the seal was reinforced. But the planet began to shake violently, and the entire underground city was collapsing. Elder Galaxy said: "Go! The planet is about to be destroyed. You must leave!" Nova took one last look at Elder Galaxy and ran toward the spaceship. At the last moment, the ship broke through the planet''s surface.',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular space aurora"},"terrain":{"name":"Alien Planet","icon":"🌍","description":"Mysterious unknown planet"},"adventure":{"name":"Rescue Mission","icon":"🆘","description":"Rescue endangered friends"},"equipment":{"name":"Spacesuit","icon":"👨‍🚀","description":"Protect astronauts"}}',
9),

('chapter-adv006-10-en', 'preset-adventure-006-en', 'A New Mission',
'Nova returned to the space station and reported the adventure to the commander. Although the planet was destroyed, the dark forces were resealed, and the galaxy was temporarily safe. Nova stood before the observation window, looking at the starry sky where the mysterious planet once existed. Photon floated over: "Nova, Elder Galaxy transmitted a message to me at the last moment." Nova opened the message, and Elder Galaxy''s voice resonated: "Young one, you have become a true Star Guardian. There are many places in the universe that need protection. Your mission has just begun." Nova smiled, knowing this was only the beginning of his adventures.',
'{"weather":{"name":"Starry Sky","icon":"✨","description":"Twinkling stars"},"terrain":{"name":"Space Station","icon":"🛸","description":"Human outpost"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Protect the universe"},"equipment":{"name":"Communicator","icon":"📻","description":"Long-range communication"}}',
10);

-- ============================================
-- 章节数据 - 魔幻传说：龙之守护者（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan006-01', 'preset-fantasy-006', '神秘的印记',
'龙炎是一个普通的少年，直到有一天，他的手臂上出现了一个奇异的龙形印记。印记散发着淡淡的光芒，仿佛蕴含着某种神秘的力量。他试图掩盖这个印记，但它却越来越明显。村里的老人看到印记后，神色大变："这是龙族的血脉印记！你竟然是龙族的后裔！"龙炎震惊了，他从未想过自己与传说中的龙族有任何关联。老人告诉他，这个印记意味着他肩负着重要的使命。',
'{"weather":{"name":"龙息之云","icon":"☁️","description":"龙族气息凝聚的云"},"terrain":{"name":"小村庄","icon":"🏘️","description":"宁静的村庄"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒龙族血脉"},"equipment":{"name":"龙族印记","icon":"🔰","description":"龙族血脉的证明"}}',
1),

('chapter-fan006-02', 'preset-fantasy-006', '龙族传说',
'龙炎来到村庄的古老图书馆，查阅关于龙族的记载。图书馆的管理员是一位慈祥的老者，他拿出一本泛黄的古籍，上面记载着龙族的历史。龙族曾经是这片大陆的守护者，他们与人类和平共处，保护着世界的平衡。但千年前，一场大战让龙族几乎灭绝，只有少数龙族后裔隐藏在人类之中。老者说："你手臂上的印记，是龙族最后的希望。"',
'{"weather":{"name":"神圣之光","icon":"✨","description":"龙族的祝福之光"},"terrain":{"name":"古老遗迹","icon":"🏛️","description":"龙族历史的见证"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒龙族血脉"},"equipment":{"name":"古老卷轴","icon":"📜","description":"记载龙族秘密"}}',
2),

('chapter-fan006-03', 'preset-fantasy-006', '龙蛋的秘密',
'在古籍的指引下，龙炎来到了一个隐秘的洞穴。洞穴深处，他发现了一颗散发着金色光芒的龙蛋。这是世界上最后一颗龙蛋，蕴含着龙族复兴的希望。当龙炎靠近龙蛋时，印记开始发光，与龙蛋产生了共鸣。精灵艾拉从阴影中走出："你终于来了，龙族的后裔。我守护这颗龙蛋已经很久了，现在它是你的责任。"龙炎郑重地接过龙蛋，感受到了它的温暖。',
'{"weather":{"name":"火焰风暴","icon":"🔥","description":"龙焰引发的风暴"},"terrain":{"name":"隐秘洞穴","icon":"🕳️","description":"龙蛋的藏身之处"},"adventure":{"name":"守护龙蛋","icon":"🥚","description":"保护最后的龙蛋"},"equipment":{"name":"魔法护盾","icon":"🛡️","description":"龙族的守护"}}',
3),

('chapter-fan006-04', 'preset-fantasy-006', '黑暗势力的追踪',
'龙炎带着龙蛋离开洞穴时，发现天空变得阴沉。一股黑暗的气息笼罩着森林，那是追踪龙蛋的邪恶势力。精灵艾拉说："黑暗势力一直在寻找龙蛋，他们想要毁灭龙族最后的希望。"龙炎紧紧抱住龙蛋，开始在森林中逃亡。黑暗生物从四面八方涌来，龙炎的印记发出光芒，击退了靠近的敌人。他知道，他必须保护好这颗龙蛋。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"邪恶势力的黑暗"},"terrain":{"name":"精灵森林","icon":"🌳","description":"精灵族的家园"},"adventure":{"name":"对抗黑暗","icon":"⚔️","description":"与邪恶势力战斗"},"equipment":{"name":"龙族印记","icon":"🔰","description":"龙族血脉的证明"}}',
4),

('chapter-fan006-05', 'preset-fantasy-006', '龙族圣地',
'在精灵艾拉的带领下，龙炎来到了龙族圣地。这里是龙族曾经栖息的地方，虽然已经荒废了很久，但依然能感受到龙族的力量。圣地中央有一座古老的祭坛，上面刻着龙族的预言。艾拉说："根据预言，当龙族后裔觉醒时，龙蛋将会孵化，龙族将重新崛起。"龙炎看着祭坛上的文字，感受到了血脉中的召唤。',
'{"weather":{"name":"神圣之光","icon":"✨","description":"龙族的祝福之光"},"terrain":{"name":"龙族圣地","icon":"🏔️","description":"龙族的栖息之地"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒龙族血脉"},"equipment":{"name":"龙晶","icon":"💎","description":"蕴含龙族力量"}}',
5),

('chapter-fan006-06', 'preset-fantasy-006', '觉醒仪式',
'龙炎在圣地进行了觉醒仪式。他站在祭坛上，将龙蛋放在中央。随着古老的咒语响起，龙炎的印记开始发出耀眼的光芒。一股强大的力量从他的体内涌出，那是龙族血脉的力量。龙炎感觉自己的身体在发生变化，他的眼睛变得像龙一样锐利，他的力量也大大增强。仪式完成后，龙族长老的声音在他耳边响起："你已经觉醒了，年轻的龙族后裔。"',
'{"weather":{"name":"火焰风暴","icon":"🔥","description":"龙焰引发的风暴"},"terrain":{"name":"龙族圣地","icon":"🏔️","description":"龙族的栖息之地"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒龙族血脉"},"equipment":{"name":"龙晶","icon":"💎","description":"蕴含龙族力量"}}',
6),

('chapter-fan006-07', 'preset-fantasy-006', '精灵的帮助',
'觉醒后的龙炎力量大增，但他还需要学习如何控制这股力量。精灵艾拉邀请他来到精灵村落，精灵族愿意帮助他。精灵长老说："龙族和精灵族是古老的盟友，我们会帮助你完成使命。"在精灵村落里，龙炎学习了魔法和战斗技巧。精灵们还为他制作了一件魔法护盾，可以保护他在战斗中不受伤害。',
'{"weather":{"name":"龙息之云","icon":"☁️","description":"龙族气息凝聚的云"},"terrain":{"name":"精灵森林","icon":"🌳","description":"精灵族的家园"},"adventure":{"name":"对抗黑暗","icon":"⚔️","description":"与邪恶势力战斗"},"equipment":{"name":"魔法护盾","icon":"🛡️","description":"龙族的守护"}}',
7),

('chapter-fan006-08', 'preset-fantasy-006', '最终对决',
'黑暗势力终于找到了龙族圣地。黑暗领主带领大军包围了圣地，他想要摧毁龙蛋，彻底消灭龙族。龙炎站在圣地入口，准备迎接最后的战斗。精灵艾拉和精灵战士们站在他身边，一起对抗黑暗大军。战斗异常激烈，龙炎发挥出龙族血脉的全部力量，与黑暗领主展开了正面对决。在关键时刻，龙蛋突然发出强烈的光芒。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"邪恶势力的黑暗"},"terrain":{"name":"黑暗城堡","icon":"🏰","description":"邪恶势力的巢穴"},"adventure":{"name":"对抗黑暗","icon":"⚔️","description":"与邪恶势力战斗"},"equipment":{"name":"龙族印记","icon":"🔰","description":"龙族血脉的证明"}}',
8),

('chapter-fan006-09', 'preset-fantasy-006', '龙的诞生',
'在战斗最激烈的时刻，龙蛋开始裂开。一道金光从裂缝中射出，照亮了整个战场。一只小龙从蛋中破壳而出，它发出一声嘹亮的龙吟，震退了所有黑暗生物。小龙飞到龙炎身边，与他的印记产生了共鸣。龙炎感受到一股前所未有的力量，他与小龙合为一体，化身为一条巨大的金龙。黑暗领主在金龙的威压下节节败退，最终被彻底消灭。',
'{"weather":{"name":"神圣之光","icon":"✨","description":"龙族的祝福之光"},"terrain":{"name":"龙族圣地","icon":"🏔️","description":"龙族的栖息之地"},"adventure":{"name":"龙的诞生","icon":"🐉","description":"小龙破壳而出"},"equipment":{"name":"龙晶","icon":"💎","description":"蕴含龙族力量"}}',
9),

('chapter-fan006-10', 'preset-fantasy-006', '新的守护者',
'黑暗势力被消灭后，龙族圣地恢复了往日的宁静。小龙已经成长为一只威武的龙，它选择龙炎作为自己的伙伴。龙族长老的声音再次响起："龙炎，你已经完成了使命。现在，你是龙族的新守护者。保护这片大陆，保护龙族的传承。"龙炎看着身边的小龙，心中充满了责任感。他知道，这只是他作为龙族守护者的开始。',
'{"weather":{"name":"龙息之云","icon":"☁️","description":"龙族气息凝聚的云"},"terrain":{"name":"龙族圣地","icon":"🏔️","description":"龙族的栖息之地"},"adventure":{"name":"守护龙蛋","icon":"🥚","description":"保护最后的龙蛋"},"equipment":{"name":"古老卷轴","icon":"📜","description":"记载龙族秘密"}}',
10);
