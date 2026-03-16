-- ============================================
-- 新预设书籍数据（每种类型2本，共8本，中英文双版本）
-- 创建时间: 2026-03-15
-- 每本书包含: 3个角色、10个章节、3个谜题
-- ============================================

-- ============================================
-- 第一部分：预设书籍
-- ============================================

INSERT OR IGNORE INTO books (book_id, user_id, title, type, is_preset, language) VALUES
-- 儿童冒险 - 中文版
('preset-adventure-003', 'system', '丛林奇遇记', 'adventure', 1, 'zh'),
('preset-adventure-004', 'system', '极地探险队', 'adventure', 1, 'zh'),
-- 儿童冒险 - 英文版
('preset-adventure-003-en', 'system', 'Jungle Adventures', 'adventure', 1, 'en'),
('preset-adventure-004-en', 'system', 'Polar Expedition', 'adventure', 1, 'en'),
-- 魔幻传说 - 中文版
('preset-fantasy-003', 'system', '龙族守护者', 'fantasy', 1, 'zh'),
('preset-fantasy-004', 'system', '魔法学院大逃亡', 'fantasy', 1, 'zh'),
-- 魔幻传说 - 英文版
('preset-fantasy-003-en', 'system', 'Dragon Guardian', 'fantasy', 1, 'en'),
('preset-fantasy-004-en', 'system', 'Magic Academy Escape', 'fantasy', 1, 'en'),
-- 都市言情 - 中文版
('preset-romance-003', 'system', '咖啡店的邂逅', 'romance', 1, 'zh'),
('preset-romance-004', 'system', '青梅竹马的重逢', 'romance', 1, 'zh'),
-- 都市言情 - 英文版
('preset-romance-003-en', 'system', 'Cafe Encounter', 'romance', 1, 'en'),
('preset-romance-004-en', 'system', 'Childhood Sweethearts', 'romance', 1, 'en'),
-- 职场风云 - 中文版
('preset-business-003', 'system', '创业合伙人', 'business', 1, 'zh'),
('preset-business-004', 'system', '职场新人逆袭记', 'business', 1, 'zh'),
-- 职场风云 - 英文版
('preset-business-003-en', 'system', 'Startup Partners', 'business', 1, 'en'),
('preset-business-004-en', 'system', 'Rookie Rising', 'business', 1, 'en');

-- ============================================
-- 第二部分：预设角色
-- ============================================

-- 儿童冒险 - 丛林奇遇记（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv003-001', 'preset-adventure-003', '小森', '丛林探险家', '勇敢善良、热爱自然、善于观察', '温和亲切，喜欢用自然比喻', '👦', NULL, NULL, 1),
('char-adv003-002', 'preset-adventure-003', '小叶', '森林精灵', '活泼可爱、知识丰富、守护森林', '俏皮灵动，喜欢用植物比喻', '🍃', 65, '向导', 0),
('char-adv003-003', 'preset-adventure-003', '林爷爷', '森林护林员', '慈祥智慧、了解丛林秘密', '讲故事般娓娓道来', '👴', 45, '导师', 0);

-- 儿童冒险 - 丛林奇遇记（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv003-001-en', 'preset-adventure-003-en', 'Forest', 'Jungle Explorer', 'brave, kind, nature lover, observant', 'gentle, uses nature metaphors', '👦', NULL, NULL, 1),
('char-adv003-002-en', 'preset-adventure-003-en', 'Leaf', 'Forest Spirit', 'playful, knowledgeable, forest guardian', 'cheerful, plant puns', '🍃', 65, 'guide', 0),
('char-adv003-003-en', 'preset-adventure-003-en', 'Grandpa Wood', 'Forest Ranger', 'wise, knows jungle secrets', 'storytelling style', '👴', 45, 'mentor', 0);

-- 儿童冒险 - 极地探险队（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv004-001', 'preset-adventure-004', '小雪', '极地探险家', '冷静沉稳、善于分析、热爱冰雪', '简洁有力，喜欢用冰雪比喻', '👧', NULL, NULL, 1),
('char-adv004-002', 'preset-adventure-004', '小冰', '北极熊精灵', '憨厚可爱、力量强大、保护朋友', '憨憨的，说话慢吞吞', '🐻‍❄️', 60, '向导', 0),
('char-adv004-003', 'preset-adventure-004', '陈博士', '极地科学家', '严谨认真、热爱科研、关心环境', '专业术语，喜欢解释', '👨‍🔬', 40, '导师', 0);

-- 儿童冒险 - 极地探险队（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv004-001-en', 'preset-adventure-004-en', 'Crystal', 'Polar Explorer', 'calm, analytical, loves ice and snow', 'concise, ice metaphors', '👧', NULL, NULL, 1),
('char-adv004-002-en', 'preset-adventure-004-en', 'Frost', 'Polar Bear Spirit', 'gentle giant, powerful, protective', 'slow, warm-hearted', '🐻‍❄️', 60, 'guide', 0),
('char-adv004-003-en', 'preset-adventure-004-en', 'Dr. Chen', 'Polar Scientist', 'serious, passionate, environmentalist', 'scientific, explanatory', '👨‍🔬', 40, 'mentor', 0);

-- 魔幻传说 - 龙族守护者（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan003-001', 'preset-fantasy-003', '龙炎', '龙族守护者', '勇敢正义、热血冲动、重情重义', '豪爽直接，喜欢用龙族谚语', '🐉', NULL, NULL, 1),
('char-fan003-002', 'preset-fantasy-003', '小火', '龙族精灵', '调皮活泼、火焰之力、忠诚伙伴', '热情洋溢，喜欢用火焰比喻', '🔥', 70, '伙伴', 0),
('char-fan003-003', 'preset-fantasy-003', '龙长老', '龙族智者', '古老睿智、守护龙族秘密', '庄严深沉，喜欢用古语', '🐲', 50, '导师', 0);

-- 魔幻传说 - 龙族守护者（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan003-001-en', 'preset-fantasy-003-en', 'Drake', 'Dragon Guardian', 'brave, just, impulsive, loyal', 'bold, uses dragon proverbs', '🐉', NULL, NULL, 1),
('char-fan003-002-en', 'preset-fantasy-003-en', 'Ember', 'Dragon Spirit', 'playful, fire powers, loyal companion', 'enthusiastic, fire puns', '🔥', 70, 'companion', 0),
('char-fan003-003-en', 'preset-fantasy-003-en', 'Elder Dragon', 'Dragon Sage', 'ancient, wise, guards dragon secrets', 'solemn, archaic speech', '🐲', 50, 'mentor', 0);

-- 魔幻传说 - 魔法学院大逃亡（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan004-001', 'preset-fantasy-004', '小月', '时空穿越者', '聪明机智、善于应变、渴望自由', '机智幽默，喜欢用时空比喻', '🌙', NULL, NULL, 1),
('char-fan004-002', 'preset-fantasy-004', '小影', '时空精灵', '神秘莫测、操控时间、守护时空', '谜语般，喜欢打哑谜', '⏳', 65, '向导', 0),
('char-fan004-003', 'preset-fantasy-004', '时空守护者', '神秘老人', '全知全能、守护时空秩序', '深邃神秘，喜欢用预言', '👴', 35, '导师', 0);

-- 魔幻传说 - 魔法学院大逃亡（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan004-001-en', 'preset-fantasy-004-en', 'Luna', 'Time Traveler', 'clever, adaptable, freedom-seeker', 'witty, time metaphors', '🌙', NULL, NULL, 1),
('char-fan004-002-en', 'preset-fantasy-004-en', 'Shadow', 'Time Spirit', 'mysterious, controls time, guardian', 'enigmatic, riddles', '⏳', 65, 'guide', 0),
('char-fan004-003-en', 'preset-fantasy-004-en', 'The Keeper', 'Mysterious Elder', 'omniscient, guards time order', 'profound, prophetic', '👴', 35, 'mentor', 0);

-- 都市言情 - 咖啡店的邂逅（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom003-001', 'preset-romance-003', '林夏', '插画师', '温柔内敛、热爱艺术、害怕受伤', '轻声细语，喜欢用艺术比喻', '👩', NULL, NULL, 1),
('char-rom003-002', 'preset-romance-003', '沈墨', '咖啡店老板', '温暖可靠、善于倾听、有故事', '温和稳重，喜欢用咖啡比喻', '👨', 80, '恋人', 0),
('char-rom003-003', 'preset-romance-003', '小雨', '闺蜜', '活泼开朗、热心肠、喜欢撮合', '热情洋溢，喜欢八卦', '👩', 55, '闺蜜', 0);

-- 都市言情 - 咖啡店的邂逅（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom003-001-en', 'preset-romance-003-en', 'Summer', 'Illustrator', 'gentle, artistic, guarded heart', 'soft-spoken, art metaphors', '👩', NULL, NULL, 1),
('char-rom003-002-en', 'preset-romance-003-en', 'Morgan', 'Cafe Owner', 'warm, reliable, good listener', 'steady, coffee metaphors', '👨', 80, 'lover', 0),
('char-rom003-003-en', 'preset-romance-003-en', 'Rain', 'Best Friend', 'cheerful, meddlesome, supportive', 'enthusiastic, gossipy', '👩', 55, 'best friend', 0);

-- 都市言情 - 青梅竹马的重逢（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom004-001', 'preset-romance-004', '苏晴', '设计师', '独立坚强、怀念过去、害怕改变', '理性克制，偶尔流露情感', '👩', NULL, NULL, 1),
('char-rom004-002', 'preset-romance-004', '江辰', '建筑师', '温柔专一、默默守护、有担当', '温和坚定，喜欢用建筑比喻', '👨', 85, '恋人', 0),
('char-rom004-003', 'preset-romance-004', '小糖', '妹妹', '可爱调皮、喜欢撮合、助攻担当', '活泼俏皮，喜欢用网络用语', '👧', 50, '妹妹', 0);

-- 都市言情 - 青梅竹马的重逢（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom004-001-en', 'preset-romance-004-en', 'Sunny', 'Designer', 'independent, nostalgic, fears change', 'rational, occasional vulnerability', '👩', NULL, NULL, 1),
('char-rom004-002-en', 'preset-romance-004-en', 'Chase', 'Architect', 'gentle, devoted, responsible', 'warm, steady, architecture metaphors', '👨', 85, 'lover', 0),
('char-rom004-003-en', 'preset-romance-004-en', 'Candy', 'Little Sister', 'cute, mischievous, matchmaker', 'playful, internet slang', '👧', 50, 'sister', 0);

-- 职场风云 - 创业合伙人（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus003-001', 'preset-business-003', '张明', '创业者', '理想主义、敢于冒险、重情重义', '激情洋溢，喜欢用创业术语', '👨', NULL, NULL, 1),
('char-bus003-002', 'preset-business-003', '李婷', '合伙人', '理性务实、善于管理、互补型', '冷静分析，喜欢用数据说话', '👩', 75, '合伙人', 0),
('char-bus003-003', 'preset-business-003', '王总', '投资人', '眼光独到、严格苛刻、惜才', '简洁有力，喜欢用商业术语', '👨', 40, '投资人', 0);

-- 职场风云 - 创业合伙人（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus003-001-en', 'preset-business-003-en', 'Max', 'Entrepreneur', 'idealistic, risk-taker, loyal', 'passionate, startup jargon', '👨', NULL, NULL, 1),
('char-bus003-002-en', 'preset-business-003-en', 'Tina', 'Co-founder', 'practical, organized, complementary', 'analytical, data-driven', '👩', 75, 'partner', 0),
('char-bus003-003-en', 'preset-business-003-en', 'Mr. Wang', 'Investor', 'sharp-eyed, demanding, talent-seeker', 'concise, business terms', '👨', 40, 'investor', 0);

-- 职场风云 - 职场新人逆袭记（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus004-001', 'preset-business-004', '李小白', '职场新人', '勤奋好学、有点社恐、渴望成长', '谦虚谨慎，喜欢用敬语', '👨', NULL, NULL, 1),
('char-bus004-002', 'preset-business-004', '陈姐', '老员工', '经验丰富、热心指导、职场老手', '亲切随和，喜欢分享经验', '👩', 60, '导师', 0),
('char-bus004-003', 'preset-business-004', '刘经理', '部门经理', '严格认真、看重能力、外冷内热', '简洁直接，喜欢用职场术语', '👨', 35, '上司', 0);

-- 职场风云 - 职场新人逆袭记（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus004-001-en', 'preset-business-004-en', 'Alex', 'Office Rookie', 'hardworking, shy, eager to learn', 'humble, polite', '👨', NULL, NULL, 1),
('char-bus004-002-en', 'preset-business-004-en', 'Sarah', 'Senior Colleague', 'experienced, helpful, mentor', 'friendly, shares wisdom', '👩', 60, 'mentor', 0),
('char-bus004-003-en', 'preset-business-004-en', 'Manager Liu', 'Department Manager', 'strict, values competence, fair', 'direct, professional', '👨', 35, 'boss', 0);

-- ============================================
-- 第三部分：预设章节 - 儿童冒险：丛林奇遇记（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv003-01', 'preset-adventure-003', '神秘的老地图',
'小森在爷爷的书房里发现了一张泛黄的老地图。地图上标注着一片神秘的丛林，中间画着一个闪亮的星星标记。爷爷走过来，看到地图后眼睛一亮："这是你曾祖父留下的，据说丛林深处藏着大自然的秘密。"小森的好奇心被点燃了，他决定去寻找这个秘密。小叶精灵从窗外飞进来，落在地图上："嘻嘻，我知道那片丛林，那里有很多神奇的朋友哦！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚的好天气"},"terrain":{"name":"书房","icon":"📚","description":"充满书香的书房"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"老地图","icon":"🗺️","description":"神秘的古老地图"}}',
1),

('chapter-adv003-02', 'preset-adventure-003', '进入丛林',
'小森背上背包，带着地图踏上了探险之旅。刚进入丛林，他就被眼前的景象震撼了——高大的树木遮天蔽日，各种奇异的鸟儿在枝头歌唱，空气中弥漫着花香和泥土的气息。小叶精灵在他身边飞舞："这里是丛林王国，每一棵树、每一朵花都有自己的故事。"小森小心翼翼地走着，生怕打扰这片宁静的世界。',
'{"weather":{"name":"晨雾","icon":"🌫️","description":"朦胧的晨雾"},"terrain":{"name":"丛林入口","icon":"🌲","description":"神秘的丛林入口"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"背包","icon":"🎒","description":"装东西的背包"}}',
2),

('chapter-adv003-03', 'preset-adventure-003', '会说话的猴子',
'小森在丛林中遇到了一群调皮的猴子。令他惊讶的是，这些猴子竟然会说话！一只金毛猴子跳到他面前："你是来找星星宝藏的吗？我可以帮你，但你要先回答我的谜题。"小森兴奋地点点头，猴子出了三道关于丛林的谜题。小森仔细观察周围的环境，成功解开了所有谜题。猴子高兴地说："你很聪明！星星宝藏就在瀑布后面！"',
'{"weather":{"name":"白云","icon":"☁️","description":"朵朵白云"},"terrain":{"name":"猴子领地","icon":"🐒","description":"猴子的家园"},"adventure":{"name":"解谜","icon":"🧩","description":"解开古老的谜题"},"equipment":{"name":"笔记本","icon":"📓","description":"记录发现"}}',
3),

('chapter-adv003-04', 'preset-adventure-003', '萤火虫的指引',
'夜幕降临，丛林变得一片漆黑。小森正担心找不到路时，成千上万只萤火虫飞了出来，形成一条闪亮的小路。小叶精灵说："萤火虫是丛林的守护者，它们在为你指路呢！"小森跟着萤火虫前进，看到了从未见过的夜间丛林美景——发光的蘑菇、会唱歌的蛙、还有满天繁星。这是他见过的最美的夜晚。',
'{"weather":{"name":"星空夜","icon":"🌙","description":"繁星点点的夜晚"},"terrain":{"name":"萤火虫小径","icon":"✨","description":"萤火虫指引的路"},"adventure":{"name":"观察动物","icon":"🦋","description":"观察可爱的动物"},"equipment":{"name":"手电筒","icon":"🔦","description":"照亮黑暗"}}',
4),

('chapter-adv003-05', 'preset-adventure-003', '巨大的榕树',
'小森来到了一棵巨大的榕树前。这棵树太大了，树冠覆盖了整个小山谷，气根垂下来像一道道门帘。小叶精灵介绍道："这是丛林长老，已经活了一千多年了。"榕树发出低沉的声音："年轻的探险者，你为什么来到这里？"小森诚实地讲述了自己的探险目的。榕树点点头："勇敢的孩子，继续前进吧，瀑布就在前面。"',
'{"weather":{"name":"蓝天","icon":"🌤️","description":"湛蓝的天空"},"terrain":{"name":"千年榕树","icon":"🌳","description":"巨大的榕树"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"相机","icon":"📷","description":"拍摄美景"}}',
5),

('chapter-adv003-06', 'preset-adventure-003', '瀑布后的洞穴',
'小森终于找到了猴子说的瀑布。瀑布从高高的悬崖上倾泻而下，水花四溅，形成一道美丽的彩虹。他鼓起勇气，穿过瀑布的水帘，发现后面竟然有一个巨大的洞穴！洞穴的墙壁上闪烁着奇异的光芒，像是无数颗星星镶嵌在上面。小叶精灵兴奋地说："我们找到了！这就是星星洞穴！"',
'{"weather":{"name":"彩虹天","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"瀑布洞穴","icon":"💦","description":"瀑布后的洞穴"},"adventure":{"name":"寻宝","icon":"🗺️","description":"寻找隐藏的宝藏"},"equipment":{"name":"水壶","icon":"🥤","description":"装水的水壶"}}',
6),

('chapter-adv003-07', 'preset-adventure-003', '洞穴的秘密',
'洞穴深处，小森发现了一个水晶祭坛。祭坛上放着一本古老的书籍和一颗发光的种子。他打开书籍，里面记载着大自然的秘密——如何与植物沟通、如何让荒芜之地重新焕发生机。小叶精灵说："这是大自然的礼物，只有真正热爱自然的人才能得到它。"小森小心翼翼地收起书籍和种子，心中充满了敬畏。',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的极光"},"terrain":{"name":"水晶祭坛","icon":"💎","description":"发光的水晶祭坛"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"种子","icon":"🌱","description":"神奇的种子"}}',
7),

('chapter-adv003-08', 'preset-adventure-003', '丛林危机',
'正当小森准备离开时，洞穴突然震动起来。原来是一群伐木工正在砍伐丛林边缘的树木！小森心急如焚，他知道必须阻止这一切。他跑出洞穴，发现许多动物正在惊慌逃窜。小叶精灵说："我们需要帮助！去找榕树长老！"小森带着书籍和种子，飞快地向榕树跑去。',
'{"weather":{"name":"雷电","icon":"⛈️","description":"电闪雷鸣"},"terrain":{"name":"丛林边缘","icon":"🪓","description":"被砍伐的区域"},"adventure":{"name":"救援","icon":"🆘","description":"救援被困的朋友"},"equipment":{"name":"急救箱","icon":"🩹","description":"处理伤口"}}',
8),

('chapter-adv003-09', 'preset-adventure-003', '丛林的守护者',
'小森来到榕树前，请求帮助。榕树长老召集了丛林中的所有动物——猴子、鸟儿、萤火虫，甚至还有老虎和大象。小森站在大家面前，大声说："这片丛林是我们的家园，我们不能让它被破坏！"动物们纷纷响应，一起赶走了伐木工。小森用书籍中的知识，让被砍伐的地方重新长出了嫩芽。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"绚丽的夕阳"},"terrain":{"name":"丛林广场","icon":"🌿","description":"动物聚集的地方"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护重要的东西"},"equipment":{"name":"神奇种子","icon":"🌱","description":"让土地重生的种子"}}',
9),

('chapter-adv003-10', 'preset-adventure-003', '新的守护者',
'危机解除后，榕树长老郑重地对小森说："孩子，你已经成为丛林的守护者。这颗种子代表着生命的希望，你要好好保护它。"小森接过种子，庄严地承诺："我会用一生来保护这片丛林。"爷爷在视频通话中欣慰地笑了。小叶精灵在小森肩上跳着："嘻嘻，我们是最棒的搭档！"夕阳下，丛林的每一片叶子都在闪闪发光。',
'{"weather":{"name":"流星雨","icon":"🌠","description":"璀璨的流星雨"},"terrain":{"name":"榕树下","icon":"🌳","description":"千年榕树下"},"adventure":{"name":"露营","icon":"⛺","description":"野外露营探险"},"equipment":{"name":"帐篷","icon":"⛺","description":"露营住所"}}',
10);

-- ============================================
-- 预设章节 - 儿童冒险：丛林奇遇记（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv003-01-en', 'preset-adventure-003-en', 'The Mysterious Old Map',
'Forest found a yellowed old map in his grandpa''s study. The map marked a mysterious jungle with a shining star in the center. Grandpa walked over, his eyes lighting up: "This was left by your great-grandfather. Legend says the jungle hides nature''s greatest secret." Forest''s curiosity was ignited. He decided to find this secret. Leaf, a forest spirit, flew in through the window and landed on the map: "Hehe, I know that jungle! There are so many magical friends there!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Beautiful sunny day"},"terrain":{"name":"Study","icon":"📚","description":"Book-filled study"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Old Map","icon":"🗺️","description":"Mysterious ancient map"}}',
1),

('chapter-adv003-02-en', 'preset-adventure-003-en', 'Into the Jungle',
'Forest packed his backpack and set off on his adventure with the map. As he entered the jungle, he was amazed by what he saw—towering trees blocking the sky, exotic birds singing on branches, the air filled with the scent of flowers and earth. Leaf fluttered beside him: "This is the Jungle Kingdom. Every tree and flower has its own story." Forest walked carefully, not wanting to disturb this peaceful world.',
'{"weather":{"name":"Morning Fog","icon":"🌫️","description":"Hazy morning fog"},"terrain":{"name":"Jungle Entrance","icon":"🌲","description":"Mysterious jungle entrance"},"adventure":{"name":"Explore","icon":"🧭","description":"Explore unknown places"},"equipment":{"name":"Backpack","icon":"🎒","description":"Carrying backpack"}}',
2),

('chapter-adv003-03-en', 'preset-adventure-003-en', 'The Talking Monkeys',
'Forest encountered a group of playful monkeys in the jungle. To his surprise, these monkeys could talk! A golden-furred monkey jumped before him: "Are you looking for the Star Treasure? I can help you, but first you must answer my riddles." Forest nodded excitedly. The monkey posed three riddles about the jungle. Forest carefully observed his surroundings and solved all of them. The monkey cheered: "You''re clever! The Star Treasure is behind the waterfall!"',
'{"weather":{"name":"Clouds","icon":"☁️","description":"Fluffy clouds"},"terrain":{"name":"Monkey Territory","icon":"🐒","description":"Monkey homeland"},"adventure":{"name":"Solve Puzzles","icon":"🧩","description":"Solve ancient puzzles"},"equipment":{"name":"Notebook","icon":"📓","description":"Record discoveries"}}',
3),

('chapter-adv003-04-en', 'preset-adventure-003-en', 'Firefly Guidance',
'Night fell, and the jungle became pitch dark. Just as Forest worried about finding his way, thousands of fireflies flew out, forming a shimmering path. Leaf said: "Fireflies are the jungle''s guardians. They''re guiding you!" Forest followed the fireflies and saw nighttime jungle beauty he''d never imagined—glowing mushrooms, singing frogs, and a sky full of stars. It was the most beautiful night he''d ever seen.',
'{"weather":{"name":"Starry Night","icon":"🌙","description":"Starry night sky"},"terrain":{"name":"Firefly Path","icon":"✨","description":"Firefly-guided trail"},"adventure":{"name":"Observe Animals","icon":"🦋","description":"Observe cute animals"},"equipment":{"name":"Flashlight","icon":"🔦","description":"Light up the darkness"}}',
4),

('chapter-adv003-05-en', 'preset-adventure-003-en', 'The Giant Banyan',
'Forest arrived before a massive banyan tree. It was enormous—its canopy covered an entire small valley, and aerial roots hung down like curtains. Leaf introduced: "This is the Jungle Elder, over a thousand years old." The banyan spoke in a deep voice: "Young explorer, why have you come here?" Forest honestly told his story. The tree nodded: "Brave child, continue forward. The waterfall lies ahead."',
'{"weather":{"name":"Blue Sky","icon":"🌤️","description":"Clear blue sky"},"terrain":{"name":"Ancient Banyan","icon":"🌳","description":"Giant banyan tree"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Camera","icon":"📷","description":"Capture beautiful scenes"}}',
5),

('chapter-adv003-06-en', 'preset-adventure-003-en', 'Cave Behind the Waterfall',
'Forest finally found the waterfall the monkey mentioned. Water cascaded from a high cliff, creating a beautiful rainbow. He gathered his courage and passed through the water curtain, discovering a huge cave behind it! The cave walls sparkled with strange light, as if countless stars were embedded in them. Leaf exclaimed: "We found it! This is the Star Cave!"',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Beautiful rainbow"},"terrain":{"name":"Waterfall Cave","icon":"💦","description":"Cave behind waterfall"},"adventure":{"name":"Treasure Hunt","icon":"🗺️","description":"Find hidden treasure"},"equipment":{"name":"Water Bottle","icon":"🥤","description":"Carry water"}}',
6),

('chapter-adv003-07-en', 'preset-adventure-003-en', 'Secret of the Cave',
'Deep in the cave, Forest discovered a crystal altar. On it lay an ancient book and a glowing seed. He opened the book—it contained nature''s secrets: how to communicate with plants, how to bring life back to barren lands. Leaf said: "This is nature''s gift, only for those who truly love nature." Forest carefully stored the book and seed, filled with reverence.',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular aurora"},"terrain":{"name":"Crystal Altar","icon":"💎","description":"Glowing crystal altar"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Seed","icon":"🌱","description":"Magical seed"}}',
7),

('chapter-adv003-08-en', 'preset-adventure-003-en', 'Jungle Crisis',
'Just as Forest prepared to leave, the cave suddenly shook. Loggers were cutting down trees at the jungle''s edge! Forest was frantic—he knew he had to stop this. He ran out and found animals fleeing in panic. Leaf said: "We need help! Let''s find the Banyan Elder!" Forest grabbed the book and seed, running toward the banyan tree.',
'{"weather":{"name":"Thunder","icon":"⛈️","description":"Lightning and thunder"},"terrain":{"name":"Jungle Edge","icon":"🪓","description":"Logged area"},"adventure":{"name":"Rescue","icon":"🆘","description":"Rescue trapped friends"},"equipment":{"name":"First Aid Kit","icon":"🩹","description":"Treat injuries"}}',
8),

('chapter-adv003-09-en', 'preset-adventure-003-en', 'Guardians of the Jungle',
'Forest reached the banyan tree and asked for help. The Elder summoned all jungle animals—monkeys, birds, fireflies, even tigers and elephants. Forest stood before them and declared: "This jungle is our home. We cannot let it be destroyed!" The animals rallied together and drove away the loggers. Forest used knowledge from the book to make new sprouts grow where trees had been cut.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Brilliant sunset"},"terrain":{"name":"Jungle Plaza","icon":"🌿","description":"Animal gathering place"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Guard what matters"},"equipment":{"name":"Magic Seed","icon":"🌱","description":"Life-giving seed"}}',
9),

('chapter-adv003-10-en', 'preset-adventure-003-en', 'The New Guardian',
'After the crisis, the Banyan Elder solemnly told Forest: "Child, you have become the Jungle Guardian. This seed represents the hope of life. Protect it well." Forest accepted the seed and made a solemn promise: "I will spend my life protecting this jungle." Grandpa smiled through the video call. Leaf danced on Forest''s shoulder: "Hehe, we''re the best partners!" Under the sunset, every leaf in the jungle shimmered.',
'{"weather":{"name":"Meteor Shower","icon":"🌠","description":"Brilliant meteor shower"},"terrain":{"name":"Under the Banyan","icon":"🌳","description":"Under ancient banyan"},"adventure":{"name":"Camping","icon":"⛺","description":"Outdoor camping adventure"},"equipment":{"name":"Tent","icon":"⛺","description":"Camping shelter"}}',
10);

-- ============================================
-- 预设章节 - 儿童冒险：极地探险队（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv004-01', 'preset-adventure-004', '北极的召唤',
'小雪站在窗前，看着电视上播放的北极冰川融化新闻。陈博士走过来，递给她一封信："这是北极科考站的邀请函，他们需要年轻的志愿者参与保护北极的行动。"小雪的眼睛亮了起来，她一直梦想着去看看那片白色的世界。小冰精灵从窗外飘进来，身上带着雪花："北极在召唤我们，那里有很多朋友需要帮助！"',
'{"weather":{"name":"雪天","icon":"❄️","description":"银装素裹的雪景"},"terrain":{"name":"家","icon":"🏠","description":"温暖的家"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"信件","icon":"✉️","description":"神秘的邀请函"}}',
1),

('chapter-adv004-02', 'preset-adventure-004', '踏上冰原',
'小雪跟随陈博士来到了北极。刚下飞机，她就被眼前的景象震撼了——一望无际的白色冰原，在阳光下闪闪发光，远处是巍峨的冰川。小冰精灵在她身边欢快地跳着："这里是我的家乡！空气是甜的，雪是软的！"陈博士介绍说："北极是地球的空调，保护北极就是保护我们的地球。"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚的好天气"},"terrain":{"name":"冰原","icon":"🧊","description":"广阔的冰原"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"羽绒服","icon":"🧥","description":"保暖的衣物"}}',
2),

('chapter-adv004-03', 'preset-adventure-004', '北极熊的请求',
'小雪在冰原上遇到了一只北极熊妈妈和她的幼崽。令她惊讶的是，北极熊竟然会说话！熊妈妈说："我们的家园正在融化，食物越来越难找。你能帮助我们吗？"小雪心疼地看着瘦弱的幼崽，坚定地点点头。小冰精灵说："我知道有一个地方，那里有充足的食物和安全的住所！"',
'{"weather":{"name":"蓝天","icon":"🌤️","description":"湛蓝的天空"},"terrain":{"name":"冰川","icon":"🏔️","description":"巨大的冰川"},"adventure":{"name":"帮助朋友","icon":"🤝","description":"帮助需要帮助的朋友"},"equipment":{"name":"相机","icon":"📷","description":"拍摄美景"}}',
3),

('chapter-adv004-04', 'preset-adventure-004', '冰洞的秘密',
'小冰精灵带领大家来到了一个隐蔽的冰洞。冰洞内部闪烁着蓝色的光芒，像是进入了另一个世界。洞壁上刻着古老的图案，讲述着北极的历史。陈博士仔细研究后说："这些图案记录了北极生态系统的秘密，是古代北极居民留下的宝贵遗产。"小雪用相机记录下这些珍贵的发现。',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的极光"},"terrain":{"name":"冰洞","icon":"🪨","description":"神秘的冰洞"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"手电筒","icon":"🔦","description":"照亮黑暗"}}',
4),

('chapter-adv004-05', 'preset-adventure-004', '冰山的警告',
'科考站的警报突然响起！监测显示，一座巨大的冰山正在断裂，可能会引发海啸，威胁到整个北极生态系统。陈博士紧张地说："我们必须想办法阻止这场灾难！"小雪冷静地分析情况，发现冰山的断裂点有一个可以利用的结构。小冰精灵说："我可以冻结那个点，但需要大家的力量一起！"',
'{"weather":{"name":"雷电","icon":"⛈️","description":"电闪雷鸣"},"terrain":{"name":"冰山","icon":"🏔️","description":"巨大的冰山"},"adventure":{"name":"救援","icon":"🆘","description":"救援被困的朋友"},"equipment":{"name":"急救箱","icon":"🩹","description":"处理伤口"}}',
5),

('chapter-adv004-06', 'preset-adventure-004', '团结的力量',
'小雪号召所有北极动物一起帮忙。北极熊、海豹、企鹅、甚至海鸥都来了。大家齐心协力，按照小雪的计划行动。小冰精灵集中所有力量，在冰山断裂点释放出强大的冰冻能量。经过几个小时的努力，冰山终于稳定下来，危机解除了！所有动物欢呼雀跃，小雪被大家高高举起。',
'{"weather":{"name":"彩虹天","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"冰原","icon":"🧊","description":"广阔的冰原"},"adventure":{"name":"团队协作","icon":"🤝","description":"与朋友一起合作"},"equipment":{"name":"绳子","icon":"🪢","description":"攀爬工具"}}',
6),

('chapter-adv004-07', 'preset-adventure-004', '极光下的启示',
'危机过后，天空中出现了绚丽的极光。小雪坐在冰原上，看着舞动的光芒。小冰精灵说："极光是北极的灵魂，它们在告诉我们，保护自然需要每个人的努力。"陈博士走过来，递给小雪一枚北极守护者徽章："你今天的勇敢，拯救了无数生命。"',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的极光"},"terrain":{"name":"冰原","icon":"🧊","description":"广阔的冰原"},"adventure":{"name":"观察动物","icon":"🦋","description":"观察可爱的动物"},"equipment":{"name":"徽章","icon":"🏅","description":"北极守护者徽章"}}',
7),

('chapter-adv004-08', 'preset-adventure-004', '消失的冰川',
'小雪发现了一个令人担忧的现象——冰川正在以惊人的速度融化。陈博士解释说："这是全球变暖的结果，我们需要让更多人知道北极的状况。"小雪决定用相机记录下这一切，制作一个纪录片，让全世界都看到北极正在发生的变化。小冰精灵说："我会一直陪着你，让更多人了解我们的家园！"',
'{"weather":{"name":"夕阳","icon":"🌇","description":"绚丽的夕阳"},"terrain":{"name":"冰川边缘","icon":"🏔️","description":"融化的冰川"},"adventure":{"name":"记录发现","icon":"📷","description":"记录重要发现"},"equipment":{"name":"摄像机","icon":"📹","description":"拍摄纪录片"}}',
8),

('chapter-adv004-09', 'preset-adventure-004', '全球的行动',
'小雪的纪录片在全球播出后，引起了巨大的反响。人们开始关注北极，采取行动减少碳排放。小雪收到了来自世界各地孩子的信件，他们都表示要保护地球。陈博士欣慰地说："你的努力，让世界改变了。"小冰精灵开心地跳着："看！冰川融化的速度慢下来了！"',
'{"weather":{"name":"蓝天","icon":"🌤️","description":"湛蓝的天空"},"terrain":{"name":"科考站","icon":"🔬","description":"科研基地"},"adventure":{"name":"传播信息","icon":"📢","description":"传播重要信息"},"equipment":{"name":"电脑","icon":"💻","description":"处理数据"}}',
9),

('chapter-adv004-10', 'preset-adventure-010', '北极守护者',
'探险结束了，小雪站在冰原上，看着美丽的北极。北极熊妈妈带着健康的幼崽来告别，感谢小雪的帮助。小冰精灵郑重地说："小雪，你现在正式成为北极守护者。记住，保护北极就是保护地球的未来。"小雪举起右手，庄严宣誓："我会用一生来守护这片白色的世界。"',
'{"weather":{"name":"流星雨","icon":"🌠","description":"璀璨的流星雨"},"terrain":{"name":"冰原","icon":"🧊","description":"广阔的冰原"},"adventure":{"name":"露营","icon":"⛺","description":"野外露营探险"},"equipment":{"name":"帐篷","icon":"⛺","description":"露营住所"}}',
10),

-- ============================================
-- 预设章节 - 儿童冒险：极地探险队（英文版）
-- ============================================

('chapter-adv004-01-en', 'preset-adventure-004-en', 'Call of the Arctic',
'Crystal stood by the window, watching news about Arctic ice melting. Dr. Chen walked over and handed her a letter: "This is an invitation from the Arctic research station. They need young volunteers to help protect the Arctic." Crystal''s eyes lit up—she had always dreamed of seeing that white world. Frost, a polar bear spirit, floated in with snowflakes: "The Arctic is calling us! Many friends there need our help!"',
'{"weather":{"name":"Snow","icon":"❄️","description":"Snow-covered landscape"},"terrain":{"name":"Home","icon":"🏠","description":"Warm home"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Letter","icon":"✉️","description":"Mysterious invitation"}}',
1),

('chapter-adv004-02-en', 'preset-adventure-004-en', 'Onto the Ice',
'Crystal followed Dr. Chen to the Arctic. Stepping off the plane, she was stunned by the view—endless white ice plains sparkling under the sun, majestic glaciers in the distance. Frost danced happily beside her: "This is my home! The air is sweet, the snow is soft!" Dr. Chen explained: "The Arctic is Earth''s air conditioner. Protecting it means protecting our planet."',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Beautiful sunny day"},"terrain":{"name":"Ice Plains","icon":"🧊","description":"Vast ice plains"},"adventure":{"name":"Explore","icon":"🧭","description":"Explore unknown places"},"equipment":{"name":"Parka","icon":"🧥","description":"Warm clothing"}}',
2),

('chapter-adv004-03-en', 'preset-adventure-004-en', 'The Polar Bear''s Request',
'Crystal encountered a polar bear mother and her cub on the ice. To her surprise, the polar bear could speak! The mother said: "Our home is melting. Food is harder to find. Can you help us?" Crystal looked at the thin cub with heartache and nodded firmly. Frost said: "I know a place with plenty of food and safe shelter!"',
'{"weather":{"name":"Blue Sky","icon":"🌤️","description":"Clear blue sky"},"terrain":{"name":"Glacier","icon":"🏔️","description":"Massive glacier"},"adventure":{"name":"Help Friends","icon":"🤝","description":"Help friends in need"},"equipment":{"name":"Camera","icon":"📷","description":"Capture beautiful scenes"}}',
3),

('chapter-adv004-04-en', 'preset-adventure-004-en', 'Secret of the Ice Cave',
'Frost led everyone to a hidden ice cave. Inside, blue light shimmered like entering another world. Ancient patterns on the walls told the Arctic''s history. Dr. Chen studied them: "These patterns record the Arctic ecosystem''s secrets—precious heritage from ancient Arctic inhabitants." Crystal photographed these precious discoveries.',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular aurora"},"terrain":{"name":"Ice Cave","icon":"🪨","description":"Mysterious ice cave"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Flashlight","icon":"🔦","description":"Light up the darkness"}}',
4),

('chapter-adv004-05-en', 'preset-adventure-004-en', 'Warning from the Iceberg',
'The station''s alarm suddenly blared! Monitoring showed a massive iceberg was breaking apart, potentially causing a tsunami that would threaten the entire Arctic ecosystem. Dr. Chen said urgently: "We must stop this disaster!" Crystal calmly analyzed the situation and found a structural point on the iceberg that could be used. Frost said: "I can freeze that point, but I need everyone''s power together!"',
'{"weather":{"name":"Thunder","icon":"⛈️","description":"Lightning and thunder"},"terrain":{"name":"Iceberg","icon":"🏔️","description":"Massive iceberg"},"adventure":{"name":"Rescue","icon":"🆘","description":"Rescue trapped friends"},"equipment":{"name":"First Aid Kit","icon":"🩹","description":"Treat injuries"}}',
5),

('chapter-adv004-06-en', 'preset-adventure-004-en', 'Power of Unity',
'Crystal called all Arctic animals to help. Polar bears, seals, penguins, even seagulls came. Everyone worked together following Crystal''s plan. Frost concentrated all power and released strong freezing energy at the breaking point. After hours of effort, the iceberg finally stabilized—the crisis was over! All animals cheered as Crystal was lifted high.',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Beautiful rainbow"},"terrain":{"name":"Ice Plains","icon":"🧊","description":"Vast ice plains"},"adventure":{"name":"Teamwork","icon":"🤝","description":"Work with friends"},"equipment":{"name":"Rope","icon":"🪢","description":"Climbing tool"}}',
6),

('chapter-adv004-07-en', 'preset-adventure-004-en', 'Revelation Under the Aurora',
'After the crisis, brilliant aurora filled the sky. Crystal sat on the ice, watching the dancing lights. Frost said: "The aurora is the Arctic''s soul. It tells us that protecting nature needs everyone''s effort." Dr. Chen walked over and handed Crystal an Arctic Guardian badge: "Your bravery today saved countless lives."',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular aurora"},"terrain":{"name":"Ice Plains","icon":"🧊","description":"Vast ice plains"},"adventure":{"name":"Observe Animals","icon":"🦋","description":"Observe cute animals"},"equipment":{"name":"Badge","icon":"🏅","description":"Arctic Guardian badge"}}',
7),

('chapter-adv004-08-en', 'preset-adventure-004-en', 'The Disappearing Glacier',
'Crystal noticed a worrying phenomenon—the glacier was melting at an alarming rate. Dr. Chen explained: "This is the result of global warming. We need to let more people know about the Arctic''s situation." Crystal decided to document everything with her camera, making a documentary to show the world what was happening in the Arctic. Frost said: "I''ll always be with you, helping more people understand our home!"',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Brilliant sunset"},"terrain":{"name":"Glacier Edge","icon":"🏔️","description":"Melting glacier"},"adventure":{"name":"Document","icon":"📷","description":"Record important findings"},"equipment":{"name":"Video Camera","icon":"📹","description":"Film documentary"}}',
8),

('chapter-adv004-09-en', 'preset-adventure-004-en', 'Global Action',
'Crystal''s documentary aired globally and caused a huge response. People began paying attention to the Arctic and taking action to reduce carbon emissions. Crystal received letters from children worldwide, all promising to protect Earth. Dr. Chen said with satisfaction: "Your efforts have changed the world." Frost jumped happily: "Look! The glacier melting is slowing down!"',
'{"weather":{"name":"Blue Sky","icon":"🌤️","description":"Clear blue sky"},"terrain":{"name":"Research Station","icon":"🔬","description":"Research base"},"adventure":{"name":"Spread Message","icon":"📢","description":"Spread important information"},"equipment":{"name":"Computer","icon":"💻","description":"Process data"}}',
9),

('chapter-adv004-10-en', 'preset-adventure-004-en', 'Arctic Guardian',
'The expedition ended. Crystal stood on the ice, looking at the beautiful Arctic. The polar bear mother brought her healthy cub to say goodbye, thanking Crystal for her help. Frost solemnly said: "Crystal, you are now officially an Arctic Guardian. Remember, protecting the Arctic means protecting Earth''s future." Crystal raised her right hand and made a solemn oath: "I will dedicate my life to protecting this white world."',
'{"weather":{"name":"Meteor Shower","icon":"🌠","description":"Brilliant meteor shower"},"terrain":{"name":"Ice Plains","icon":"🧊","description":"Vast ice plains"},"adventure":{"name":"Camping","icon":"⛺","description":"Outdoor camping adventure"},"equipment":{"name":"Tent","icon":"⛺","description":"Camping shelter"}}',
10);

-- ============================================
-- 第四部分：预设情节卡牌
-- ============================================

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- 儿童冒险 - 丛林奇遇记（中文版）
('card-adv003-01', 'preset-adventure-003', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气，适合丛林探险'),
('card-adv003-02', 'preset-adventure-003', 'plot', 'terrain', '丛林', '🌲', '神秘的丛林，充满未知'),
('card-adv003-03', 'preset-adventure-003', 'plot', 'adventure', '探险', '🧭', '探索未知的地方，发现秘密'),
('card-adv003-04', 'preset-adventure-003', 'plot', 'equipment', '老地图', '🗺️', '神秘的古老地图，指引方向'),

-- 儿童冒险 - 丛林奇遇记（英文版）
('card-adv003-01-en', 'preset-adventure-003-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine, perfect for jungle exploration'),
('card-adv003-02-en', 'preset-adventure-003-en', 'plot', 'terrain', 'Jungle', '🌲', 'Mysterious jungle, full of unknowns'),
('card-adv003-03-en', 'preset-adventure-003-en', 'plot', 'adventure', 'Explore', '🧭', 'Explore unknown places, discover secrets'),
('card-adv003-04-en', 'preset-adventure-003-en', 'plot', 'equipment', 'Old Map', '🗺️', 'Mysterious ancient map, guides the way'),

-- 儿童冒险 - 极地探险队（中文版）
('card-adv004-01', 'preset-adventure-004', 'plot', 'weather', '雪天', '❄️', '银装素裹的雪景，极地的美丽'),
('card-adv004-02', 'preset-adventure-004', 'plot', 'terrain', '冰原', '🧊', '广阔的冰原，北极的世界'),
('card-adv004-03', 'preset-adventure-004', 'plot', 'adventure', '救援', '🆘', '救援被困的朋友，保护北极'),
('card-adv004-04', 'preset-adventure-004', 'plot', 'equipment', '相机', '📷', '记录北极的美丽与变化'),

-- 儿童冒险 - 极地探险队（英文版）
('card-adv004-01-en', 'preset-adventure-004-en', 'plot', 'weather', 'Snow', '❄️', 'Snow-covered landscape, Arctic beauty'),
('card-adv004-02-en', 'preset-adventure-004-en', 'plot', 'terrain', 'Ice Plains', '🧊', 'Vast ice plains, Arctic world'),
('card-adv004-03-en', 'preset-adventure-004-en', 'plot', 'adventure', 'Rescue', '🆘', 'Rescue trapped friends, protect the Arctic'),
('card-adv004-04-en', 'preset-adventure-004-en', 'plot', 'equipment', 'Camera', '📷', 'Document Arctic beauty and changes'),

-- 魔幻传说 - 龙族守护者（中文版）
('card-fan003-01', 'preset-fantasy-003', 'plot', 'weather', '火焰风暴', '🔥', '火焰与龙息交织的风暴'),
('card-fan003-02', 'preset-fantasy-003', 'plot', 'terrain', '龙之巢', '🐉', '巨龙的巢穴，龙族的家园'),
('card-fan003-03', 'preset-fantasy-003', 'plot', 'adventure', '屠龙', '🐉', '挑战巨龙，证明勇气'),
('card-fan003-04', 'preset-fantasy-003', 'plot', 'equipment', '龙鳞甲', '🛡️', '龙鳞制成的护甲，坚不可摧'),

-- 魔幻传说 - 龙族守护者（英文版）
('card-fan003-01-en', 'preset-fantasy-003-en', 'plot', 'weather', 'Fire Storm', '🔥', 'Fire and dragon breath intertwined'),
('card-fan003-02-en', 'preset-fantasy-003-en', 'plot', 'terrain', 'Dragon Nest', '🐉', 'Dragon lair, home of dragons'),
('card-fan003-03-en', 'preset-fantasy-003-en', 'plot', 'adventure', 'Dragon Battle', '🐉', 'Challenge dragons, prove courage'),
('card-fan003-04-en', 'preset-fantasy-003-en', 'plot', 'equipment', 'Dragon Scale Armor', '🛡️', 'Armor made of dragon scales, indestructible'),

-- 魔幻传说 - 魔法学院大逃亡（中文版）
('card-fan004-01', 'preset-fantasy-004', 'plot', 'weather', '时空裂隙', '🌀', '时空扭曲的裂缝，穿越的通道'),
('card-fan004-02', 'preset-fantasy-004', 'plot', 'terrain', '魔法塔', '🗼', '高耸的魔法塔，学院的核心'),
('card-fan004-03', 'preset-fantasy-004', 'plot', 'adventure', '时空穿梭', '⏳', '穿越时空，逃离困境'),
('card-fan004-04', 'preset-fantasy-004', 'plot', 'equipment', '护身符', '🧿', '保护佩戴者，抵御魔法'),

-- 魔幻传说 - 魔法学院大逃亡（英文版）
('card-fan004-01-en', 'preset-fantasy-004-en', 'plot', 'weather', 'Time Rift', '🌀', 'Distorted space-time rift, passage for travel'),
('card-fan004-02-en', 'preset-fantasy-004-en', 'plot', 'terrain', 'Magic Tower', '🗼', 'Towering magic tower, academy core'),
('card-fan004-03-en', 'preset-fantasy-004-en', 'plot', 'adventure', 'Time Travel', '⏳', 'Travel through time, escape danger'),
('card-fan004-04-en', 'preset-fantasy-004-en', 'plot', 'equipment', 'Amulet', '🧿', 'Protects wearer, resists magic'),

-- 都市言情 - 咖啡店的邂逅（中文版）
('card-rom003-01', 'preset-romance-003', 'plot', 'weather', '夕阳', '🌇', '浪漫的夕阳，温暖的时光'),
('card-rom003-02', 'preset-romance-003', 'plot', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅，故事开始的地方'),
('card-rom003-03', 'preset-romance-003', 'plot', 'adventure', '邂逅', '💫', '命运的相遇，爱情的开始'),
('card-rom003-04', 'preset-romance-003', 'plot', 'equipment', '画板', '🎨', '艺术的创作，表达心意'),

-- 都市言情 - 咖啡店的邂逅（英文版）
('card-rom003-01-en', 'preset-romance-003-en', 'plot', 'weather', 'Sunset', '🌇', 'Romantic sunset, warm moments'),
('card-rom003-02-en', 'preset-romance-003-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe, where the story begins'),
('card-rom003-03-en', 'preset-romance-003-en', 'plot', 'adventure', 'Encounter', '💫', 'Fateful meeting, start of love'),
('card-rom003-04-en', 'preset-romance-003-en', 'plot', 'equipment', 'Easel', '🎨', 'Artistic creation, express feelings'),

-- 都市言情 - 青梅竹马的重逢（中文版）
('card-rom004-01', 'preset-romance-004', 'plot', 'weather', '樱花雨', '🌸', '樱花飘落的美景，浪漫的回忆'),
('card-rom004-02', 'preset-romance-004', 'plot', 'terrain', '校园', '🏫', '青春的校园，回忆的地方'),
('card-rom004-03', 'preset-romance-004', 'plot', 'adventure', '重逢', '🎉', '再次相遇，旧情复燃'),
('card-rom004-04', 'preset-romance-004', 'plot', 'equipment', '信纸', '✉️', '手写的情书，传递心意'),

-- 都市言情 - 青梅竹马的重逢（英文版）
('card-rom004-01-en', 'preset-romance-004-en', 'plot', 'weather', 'Cherry Blossoms', '🌸', 'Falling cherry blossoms, romantic memories'),
('card-rom004-02-en', 'preset-romance-004-en', 'plot', 'terrain', 'Campus', '🏫', 'Youthful campus, place of memories'),
('card-rom004-03-en', 'preset-romance-004-en', 'plot', 'adventure', 'Reunion', '🎉', 'Meet again, old flames reignite'),
('card-rom004-04-en', 'preset-romance-004-en', 'plot', 'equipment', 'Letter Paper', '✉️', 'Handwritten love letters, convey feelings'),

-- 职场风云 - 创业合伙人（中文版）
('card-bus003-01', 'preset-business-003', 'plot', 'weather', '晴天', '☀️', '晴朗的天气，新的开始'),
('card-bus003-02', 'preset-business-003', 'plot', 'terrain', '办公室', '🏢', '创业的办公室，梦想的起点'),
('card-bus003-03', 'preset-business-003', 'plot', 'adventure', '融资', '💰', '获得融资，企业发展'),
('card-bus003-04', 'preset-business-003', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备，创业的工具'),

-- 职场风云 - 创业合伙人（英文版）
('card-bus003-01-en', 'preset-business-003-en', 'plot', 'weather', 'Sunny', '☀️', 'Clear weather, new beginning'),
('card-bus003-02-en', 'preset-business-003-en', 'plot', 'terrain', 'Office', '🏢', 'Startup office, starting point of dreams'),
('card-bus003-03-en', 'preset-business-003-en', 'plot', 'adventure', 'Funding', '💰', 'Get funding, business growth'),
('card-bus003-04-en', 'preset-business-003-en', 'plot', 'equipment', 'Laptop', '💻', 'Essential for work, startup tool'),

-- 职场风云 - 职场新人逆袭记（中文版）
('card-bus004-01', 'preset-business-004', 'plot', 'weather', '阴天', '☁️', '阴沉的天空，职场的挑战'),
('card-bus004-02', 'preset-business-004', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室，成长的战场'),
('card-bus004-03', 'preset-business-004', 'plot', 'adventure', '突破', '🚀', '取得突破，证明自己'),
('card-bus004-04', 'preset-business-004', 'plot', 'equipment', '笔记本', '📓', '工作记录，成长的见证'),

-- 职场风云 - 职场新人逆袭记（英文版）
('card-bus004-01-en', 'preset-business-004-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky, workplace challenges'),
('card-bus004-02-en', 'preset-business-004-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office, battlefield for growth'),
('card-bus004-03-en', 'preset-business-004-en', 'plot', 'adventure', 'Breakthrough', '🚀', 'Make a breakthrough, prove yourself'),
('card-bus004-04-en', 'preset-business-004-en', 'plot', 'equipment', 'Notebook', '📓', 'Work records, witness to growth');

-- ============================================
-- 第五部分：预设章节 - 魔幻传说：龙族守护者（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan003-01', 'preset-fantasy-003', '龙蛋的召唤',
'龙炎在山中采药时，发现了一颗发光的龙蛋。当他触碰龙蛋的瞬间，一股温暖的力量涌入他的身体。小火精灵从龙蛋中跳出来："你被选中了！你是龙族守护者的继承者！"龙炎惊讶地看着这个小小的火焰精灵，不知道自己即将踏上一段怎样的旅程。龙长老的声音在山谷中回荡："孩子，你的命运已经改变..."',
'{"weather":{"name":"火焰风暴","icon":"🔥","description":"火焰与龙息交织"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"龙鳞甲","icon":"🛡️","description":"龙鳞制成的护甲"}}',
1),

('chapter-fan003-02', 'preset-fantasy-003', '龙族学院',
'龙炎被带到了龙族学院，这里是培养龙族守护者的地方。学院里有许多和他一样的年轻人，每个人都有自己的龙族精灵伙伴。龙长老站在高台上说："你们是龙族的希望，要学会与龙族精灵合作，保护龙族的荣耀。"龙炎看着身边的小火，心中充满了期待和紧张。',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的魔法极光"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"魔法测试","icon":"📝","description":"通过魔法试炼"},"equipment":{"name":"魔杖","icon":"🪄","description":"施展魔法的法杖"}}',
2),

('chapter-fan003-03', 'preset-fantasy-003', '火焰试炼',
'龙炎迎来了他的第一次试炼——火焰试炼。他必须穿越一片燃烧的森林，找到藏在深处的火焰宝石。小火精灵说："别怕，我会保护你的！"龙炎深吸一口气，勇敢地踏入火焰之中。他发现，只要相信自己，火焰就不会伤害他。最终，他成功找到了火焰宝石，获得了火焰之力。',
'{"weather":{"name":"火焰风暴","icon":"🔥","description":"火焰与龙息交织"},"terrain":{"name":"古代遗迹","icon":"🏛️","description":"古老的文明遗迹"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒隐藏的力量"},"equipment":{"name":"元素宝石","icon":"💠","description":"储存元素之力"}}',
3),

('chapter-fan003-04', 'preset-fantasy-003', '黑暗龙的威胁',
'学院突然响起警报！一只黑暗龙正在攻击龙族边境。龙长老紧急召集所有守护者："黑暗龙是龙族的宿敌，我们必须阻止它！"龙炎第一次感受到真正的危险。小火精灵认真地说："龙炎，这是你证明自己的机会。"龙炎握紧拳头，决定挺身而出。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"屠龙","icon":"🐉","description":"挑战巨龙"},"equipment":{"name":"龙鳞甲","icon":"🛡️","description":"龙鳞制成的护甲"}}',
4),

('chapter-fan003-05', 'preset-fantasy-003', '第一次战斗',
'龙炎来到了战场，看到了那只巨大的黑暗龙。它的眼睛闪烁着邪恶的红光，喷出的黑色火焰烧毁了一切。龙炎害怕了，但小火精灵鼓励他："相信自己，你体内流淌着龙族的血脉！"龙炎鼓起勇气，释放出火焰之力，与黑暗龙展开了激烈的战斗。虽然他受了伤，但他没有退缩。',
'{"weather":{"name":"魔法风暴","icon":"🌀","description":"充满魔力的风暴"},"terrain":{"name":"暗影沼泽","icon":"🌑","description":"阴暗的沼泽"},"adventure":{"name":"魔法对决","icon":"⚡","description":"魔法师的决斗"},"equipment":{"name":"魔法披风","icon":"🧥","description":"隐身和防护"}}',
5),

('chapter-fan003-06', 'preset-fantasy-003', '龙族秘密',
'战斗结束后，龙长老告诉龙炎一个秘密：龙炎其实是龙族王室的后裔，他的血脉中蕴含着强大的龙族力量。龙长老说："黑暗龙曾经是龙族的一员，它被黑暗力量腐蚀，背叛了龙族。只有你，才能真正打败它。"龙炎震惊地看着自己的双手，不知道该如何面对这个真相。',
'{"weather":{"name":"光明普照","icon":"✨","description":"神圣的光芒"},"terrain":{"name":"神殿","icon":"⛩️","description":"神圣的殿堂"},"adventure":{"name":"血脉传承","icon":"🩸","description":"觉醒血脉力量"},"equipment":{"name":"龙之心脏","icon":"❤️","description":"巨龙的力量"}}',
6),

('chapter-fan003-07', 'preset-fantasy-003', '特训',
'为了准备最终的战斗，龙炎开始了艰苦的特训。他学习控制火焰之力，与小火精灵配合，掌握龙族的战斗技巧。龙长老亲自指导他，传授古老的龙族秘术。经过无数次的失败和尝试，龙炎终于掌握了"龙焰斩"——龙族最强的攻击技能。',
'{"weather":{"name":"元素乱流","icon":"⚡","description":"元素能量涌动"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"元素觉醒","icon":"🔥","description":"掌控元素之力"},"equipment":{"name":"元素法杖","icon":"🔥","description":"操控元素"}}',
7),

('chapter-fan003-08', 'preset-fantasy-003', '黑暗龙的巢穴',
'龙炎带领守护者们深入黑暗龙的巢穴。这里到处是黑色的火焰和扭曲的岩石，空气中弥漫着邪恶的气息。小火精灵警告："小心，黑暗龙的力量在这里最强。"龙炎握紧武器，带领大家一步步深入。在巢穴的最深处，他们看到了黑暗龙的真正形态——一只被黑暗完全吞噬的巨龙。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"深渊","icon":"🕳️","description":"无尽的深渊"},"adventure":{"name":"封印恶魔","icon":"😈","description":"封印邪恶的恶魔"},"equipment":{"name":"封印卷轴","icon":"📜","description":"封印邪恶"}}',
8),

('chapter-fan003-09', 'preset-fantasy-003', '最终决战',
'龙炎与黑暗龙展开了最终决战。黑暗龙的力量强大无比，龙炎一度陷入绝境。但在关键时刻，小火精灵燃烧了自己的全部力量，与龙炎合为一体。龙炎感受到了前所未有的力量，他释放出"龙焰斩"，一击击中了黑暗龙的心脏。黑暗龙发出最后的哀嚎，化作了黑色的灰烬。',
'{"weather":{"name":"星辰坠落","icon":"💫","description":"星辰从天而降"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"屠龙","icon":"🐉","description":"挑战巨龙"},"equipment":{"name":"龙鳞甲","icon":"🛡️","description":"龙鳞制成的护甲"}}',
9),

('chapter-fan003-10', 'preset-fantasy-003', '新的守护者',
'战斗结束了，龙炎成为了真正的龙族守护者。龙长老将龙族最高荣誉——龙心勋章授予了他。小火精灵虽然消耗了大量力量，但慢慢恢复了过来。龙炎站在龙族圣殿前，庄严宣誓："我将用生命守护龙族，守护这片土地的和平。"所有龙族成员都为他欢呼，一个新的传奇开始了。',
'{"weather":{"name":"创世晨曦","icon":"🌅","description":"创世之初的光芒"},"terrain":{"name":"神殿","icon":"⛩️","description":"神圣的殿堂"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护重要的东西"},"equipment":{"name":"龙心勋章","icon":"🏅","description":"龙族最高荣誉"}}',
10),

-- ============================================
-- 预设章节 - 魔幻传说：龙族守护者（英文版）
-- ============================================

('chapter-fan003-01-en', 'preset-fantasy-003-en', 'Call of the Dragon Egg',
'Drake found a glowing dragon egg while gathering herbs in the mountains. The moment he touched it, a warm power flowed into his body. Ember, a fire spirit, jumped out: "You''ve been chosen! You are the inheritor of the Dragon Guardian!" Drake stared at the tiny flame spirit, not knowing what journey awaited him. Elder Dragon''s voice echoed through the valley: "Child, your destiny has changed..."',
'{"weather":{"name":"Fire Storm","icon":"🔥","description":"Fire and dragon breath intertwined"},"terrain":{"name":"Dragon Nest","icon":"🐉","description":"Dragon lair"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Dragon Scale Armor","icon":"🛡️","description":"Armor made of dragon scales"}}',
1),

('chapter-fan003-02-en', 'preset-fantasy-003-en', 'Dragon Academy',
'Drake was brought to the Dragon Academy, where Dragon Guardians were trained. Many young people like him were there, each with their own dragon spirit partner. Elder Dragon stood on the high platform: "You are the hope of the dragon race. Learn to work with your dragon spirits and protect dragon glory." Drake looked at Ember beside him, filled with anticipation and nervousness.',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Magical aurora"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Magic Test","icon":"📝","description":"Pass magic trial"},"equipment":{"name":"Magic Wand","icon":"🪄","description":"Cast spells"}}',
2),

('chapter-fan003-03-en', 'preset-fantasy-003-en', 'Fire Trial',
'Drake faced his first trial—the Fire Trial. He had to cross a burning forest and find the Fire Gem hidden deep within. Ember said: "Don''t be afraid, I''ll protect you!" Drake took a deep breath and bravely stepped into the flames. He discovered that as long as he believed in himself, the fire wouldn''t harm him. Finally, he found the Fire Gem and gained fire power.',
'{"weather":{"name":"Fire Storm","icon":"🔥","description":"Fire and dragon breath intertwined"},"terrain":{"name":"Ancient Ruins","icon":"🏛️","description":"Ancient civilization ruins"},"adventure":{"name":"Awaken Power","icon":"💫","description":"Awaken hidden power"},"equipment":{"name":"Element Gem","icon":"💠","description":"Store elemental power"}}',
3),

('chapter-fan003-04-en', 'preset-fantasy-003-en', 'Dark Dragon Threat',
'The academy alarm suddenly blared! A Dark Dragon was attacking the dragon border. Elder Dragon urgently summoned all guardians: "The Dark Dragon is our sworn enemy. We must stop it!" Drake felt real danger for the first time. Ember said seriously: "Drake, this is your chance to prove yourself." Drake clenched his fists and decided to step forward.',
'{"weather":{"name":"Darkness Falls","icon":"🌑","description":"Endless darkness"},"terrain":{"name":"Dragon Nest","icon":"🐉","description":"Dragon lair"},"adventure":{"name":"Dragon Battle","icon":"🐉","description":"Challenge dragons"},"equipment":{"name":"Dragon Scale Armor","icon":"🛡️","description":"Armor made of dragon scales"}}',
4),

('chapter-fan003-05-en', 'preset-fantasy-003-en', 'First Battle',
'Drake arrived at the battlefield and saw the massive Dark Dragon. Its eyes glowed with evil red light, and its black flames destroyed everything. Drake was afraid, but Ember encouraged him: "Believe in yourself. Dragon blood flows in your veins!" Drake gathered courage, released his fire power, and fought fiercely with the Dark Dragon. Though injured, he didn''t retreat.',
'{"weather":{"name":"Magic Storm","icon":"🌀","description":"Magical storm"},"terrain":{"name":"Shadow Swamp","icon":"🌑","description":"Dark swamp"},"adventure":{"name":"Magic Duel","icon":"⚡","description":"Wizard duel"},"equipment":{"name":"Magic Cloak","icon":"🧥","description":"Invisibility and protection"}}',
5),

('chapter-fan003-06-en', 'preset-fantasy-003-en', 'Dragon Secret',
'After the battle, Elder Dragon told Drake a secret: Drake was actually a descendant of the dragon royal family, and his blood contained powerful dragon power. Elder Dragon said: "The Dark Dragon was once one of us. It was corrupted by dark power and betrayed the dragons. Only you can truly defeat it." Drake looked at his hands in shock, not knowing how to face this truth.',
'{"weather":{"name":"Holy Light","icon":"✨","description":"Sacred light"},"terrain":{"name":"Temple","icon":"⛩️","description":"Sacred hall"},"adventure":{"name":"Bloodline Awakening","icon":"🩸","description":"Awaken bloodline power"},"equipment":{"name":"Dragon Heart","icon":"❤️","description":"Dragon power"}}',
6),

('chapter-fan003-07-en', 'preset-fantasy-003-en', 'Special Training',
'To prepare for the final battle, Drake began intense special training. He learned to control fire power, coordinate with Ember, and master dragon combat techniques. Elder Dragon personally guided him, teaching ancient dragon secrets. After countless failures and attempts, Drake finally mastered "Dragon Flame Slash"—the dragon race''s strongest attack skill.',
'{"weather":{"name":"Element Chaos","icon":"⚡","description":"Elemental energy surging"},"terrain":{"name":"Dragon Nest","icon":"🐉","description":"Dragon lair"},"adventure":{"name":"Element Awakening","icon":"🔥","description":"Control elements"},"equipment":{"name":"Element Staff","icon":"🔥","description":"Control elements"}}',
7),

('chapter-fan003-08-en', 'preset-fantasy-003-en', 'Dark Dragon''s Lair',
'Drake led the guardians deep into the Dark Dragon''s lair. Black flames and twisted rocks were everywhere, and evil filled the air. Ember warned: "Be careful, the Dark Dragon''s power is strongest here." Drake gripped his weapon and led everyone deeper. In the deepest part, they saw the Dark Dragon''s true form—a giant dragon completely consumed by darkness.',
'{"weather":{"name":"Darkness Falls","icon":"🌑","description":"Endless darkness"},"terrain":{"name":"Abyss","icon":"🕳️","description":"Endless abyss"},"adventure":{"name":"Seal Evil","icon":"😈","description":"Seal the demon"},"equipment":{"name":"Seal Scroll","icon":"📜","description":"Seal evil"}}',
8),

('chapter-fan003-09-en', 'preset-fantasy-003-en', 'Final Battle',
'Drake engaged in the final battle with the Dark Dragon. The Dark Dragon was incredibly powerful, and Drake was nearly defeated. But at the crucial moment, Ember burned all its power and merged with Drake. Drake felt unprecedented power and released "Dragon Flame Slash," striking the Dark Dragon''s heart. The Dark Dragon let out a final wail and turned to black ash.',
'{"weather":{"name":"Falling Stars","icon":"💫","description":"Stars falling from sky"},"terrain":{"name":"Dragon Nest","icon":"🐉","description":"Dragon lair"},"adventure":{"name":"Dragon Battle","icon":"🐉","description":"Challenge dragons"},"equipment":{"name":"Dragon Scale Armor","icon":"🛡️","description":"Armor made of dragon scales"}}',
9),

('chapter-fan003-10-en', 'preset-fantasy-003-en', 'New Guardian',
'The battle ended, and Drake became a true Dragon Guardian. Elder Dragon awarded him the Dragon Heart Medal—the dragon race''s highest honor. Though Ember had consumed much power, it slowly recovered. Drake stood before the Dragon Sanctuary and solemnly swore: "I will guard the dragon race with my life and protect the peace of this land." All dragons cheered for him. A new legend had begun.',
'{"weather":{"name":"Dawn of Creation","icon":"🌅","description":"Light of creation"},"terrain":{"name":"Temple","icon":"⛩️","description":"Sacred hall"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Guard what matters"},"equipment":{"name":"Dragon Heart Medal","icon":"🏅","description":"Dragon highest honor"}}',
10);

-- ============================================
-- 预设章节 - 魔幻传说：魔法学院大逃亡（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan004-01', 'preset-fantasy-004', '神秘的邀请',
'小月收到了一封神秘的邀请函，邀请她参加著名的魔法学院。当她打开信封时，一个时空精灵小影从信纸中飘了出来。"你是被选中的时空使者，"小影神秘地说，"但学院里隐藏着一个可怕的秘密..."小月的好奇心被点燃了，她决定去揭开这个秘密。',
'{"weather":{"name":"时空裂隙","icon":"🌀","description":"时空扭曲的裂缝"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"护身符","icon":"🧿","description":"保护佩戴者"}}',
1),

('chapter-fan004-02', 'preset-fantasy-004', '学院的第一天',
'小月来到了魔法学院，这里比她想象的还要宏伟。高耸的魔法塔、飘浮的楼梯、会说话的画像...一切都充满了魔法的气息。但她很快发现，学院里有一种奇怪的气氛，学生们都显得紧张不安。小影在她耳边低语："小心，有人在监视我们..."',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的魔法极光"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"魔法测试","icon":"📝","description":"通过魔法试炼"},"equipment":{"name":"魔杖","icon":"🪄","description":"施展魔法的法杖"}}',
2),

('chapter-fan004-03', 'preset-fantasy-004', '禁闭室的秘密',
'小月在探索学院时，意外发现了一个被封锁的房间。她用时空魔法打开了门，发现里面关着许多学生！原来，学院的校长在用学生做实验，试图获得永生。小影说："我们必须救出他们！"小月决定行动起来。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"救援","icon":"🆘","description":"救援被困的朋友"},"equipment":{"name":"魔杖","icon":"🪄","description":"施展魔法的法杖"}}',
3),

('chapter-fan004-04', 'preset-fantasy-004', '时空守护者',
'小月在逃跑途中遇到了一位神秘的老人——时空守护者。老人告诉她："你是唯一能够阻止校长的人，因为你拥有时空之力。"小月惊讶地发现自己竟然有如此强大的力量。时空守护者给了她一个护身符："这会帮助你穿越时空。"',
'{"weather":{"name":"时空裂隙","icon":"🌀","description":"时空扭曲的裂缝"},"terrain":{"name":"异世界","icon":"🌐","description":"另一个维度"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒隐藏的力量"},"equipment":{"name":"护身符","icon":"🧿","description":"保护佩戴者"}}',
4),

('chapter-fan004-05', 'preset-fantasy-004', '穿越时空',
'小月决定回到过去，阻止校长的计划。她启动护身符，穿越到了十年前的学院。在那里，她看到了年轻的校长，发现他曾经也是一个善良的人。是什么让他变成了现在这样？小月决定找出真相。',
'{"weather":{"name":"时空裂隙","icon":"🌀","description":"时空扭曲的裂缝"},"terrain":{"name":"时间裂缝","icon":"⏳","description":"时间扭曲之地"},"adventure":{"name":"时空穿梭","icon":"⏳","description":"穿越时空"},"equipment":{"name":"护身符","icon":"🧿","description":"保护佩戴者"}}',
5),

('chapter-fan004-06', 'preset-fantasy-004', '黑暗的起源',
'小月发现，校长之所以变坏，是因为他被一本黑暗魔法书腐蚀了心智。那本书是他在一次探险中找到的，里面记载着永生的秘密。小影说："我们必须毁掉那本书！"小月决定在校长找到书之前，先把它销毁。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"古代遗迹","icon":"🏛️","description":"古老的文明遗迹"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"封印卷轴","icon":"📜","description":"封印邪恶"}}',
6),

('chapter-fan004-07', 'preset-fantasy-004', '寻找封印',
'小月在学院的图书馆里找到了封印黑暗魔法书的方法。需要收集三种元素：火焰、冰霜和雷电。她开始了艰难的寻找之旅，在学院的各个角落收集这些元素。小影一直陪伴着她，给她鼓励和帮助。',
'{"weather":{"name":"元素乱流","icon":"⚡","description":"元素能量涌动"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"元素觉醒","icon":"🔥","description":"掌控元素之力"},"equipment":{"name":"元素宝石","icon":"💠","description":"储存元素之力"}}',
7),

('chapter-fan004-08', 'preset-fantasy-004', '校长的追捕',
'校长发现了小月的计划，开始追捕她。小月不得不在学院的走廊和密室中躲避追捕。她利用时空魔法，一次次逃脱校长的陷阱。小影说："我们快成功了，只要再找到最后一个元素！"',
'{"weather":{"name":"魔法风暴","icon":"🌀","description":"充满魔力的风暴"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"逃脱","icon":"🏃","description":"追逐逃跑的目标"},"equipment":{"name":"魔法披风","icon":"🧥","description":"隐身和防护"}}',
8),

('chapter-fan004-09', 'preset-fantasy-004', '最终对决',
'小月收集齐了所有元素，准备封印黑暗魔法书。校长出现在她面前，试图阻止她。一场激烈的魔法对决开始了。小月利用时空之力，在关键时刻回到过去，改变了战局。最终，她成功封印了黑暗魔法书，校长的邪恶力量也随之消散。',
'{"weather":{"name":"光明普照","icon":"✨","description":"神圣的光芒"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"魔法对决","icon":"⚡","description":"魔法师的决斗"},"equipment":{"name":"封印卷轴","icon":"📜","description":"封印邪恶"}}',
9),

('chapter-fan004-10', 'preset-fantasy-004', '自由的学院',
'学院恢复了和平，被囚禁的学生们被释放了。时空守护者出现，告诉小月她已经成为了一名真正的时空使者。小影开心地说："我们做到了！"小月看着恢复生机的学院，心中充满了成就感。她知道，这只是她冒险的开始。',
'{"weather":{"name":"创世晨曦","icon":"🌅","description":"创世之初的光芒"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护重要的东西"},"equipment":{"name":"时空徽章","icon":"🏅","description":"时空使者徽章"}}',
10),

-- ============================================
-- 预设章节 - 魔幻传说：魔法学院大逃亡（英文版）
-- ============================================

('chapter-fan004-01-en', 'preset-fantasy-004-en', 'Mysterious Invitation',
'Luna received a mysterious invitation to attend the famous Magic Academy. When she opened the envelope, a time spirit named Shadow floated out. "You are the chosen Time Messenger," Shadow said mysteriously, "but the academy hides a terrible secret..." Luna''s curiosity was ignited, and she decided to uncover the truth.',
'{"weather":{"name":"Time Rift","icon":"🌀","description":"Distorted space-time rift"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Amulet","icon":"🧿","description":"Protects wearer"}}',
1),

('chapter-fan004-02-en', 'preset-fantasy-004-en', 'First Day at Academy',
'Luna arrived at the Magic Academy, more magnificent than she imagined. Towering magic towers, floating staircases, talking portraits... everything was filled with magic. But she soon noticed a strange atmosphere—students seemed nervous and uneasy. Shadow whispered in her ear: "Be careful, someone is watching us..."',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Magical aurora"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Magic Test","icon":"📝","description":"Pass magic trial"},"equipment":{"name":"Magic Wand","icon":"🪄","description":"Cast spells"}}',
2),

('chapter-fan004-03-en', 'preset-fantasy-004-en', 'Secret of the Locked Room',
'While exploring, Luna accidentally discovered a sealed room. She used time magic to open the door and found many students imprisoned inside! The academy headmaster was using students for experiments, trying to achieve immortality. Shadow said: "We must save them!" Luna decided to take action.',
'{"weather":{"name":"Darkness Falls","icon":"🌑","description":"Endless darkness"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Rescue","icon":"🆘","description":"Rescue trapped friends"},"equipment":{"name":"Magic Wand","icon":"🪄","description":"Cast spells"}}',
3),

('chapter-fan004-04-en', 'preset-fantasy-004-en', 'The Time Keeper',
'During her escape, Luna met a mysterious old man—the Time Keeper. He told her: "You are the only one who can stop the headmaster, because you possess time power." Luna was surprised to discover she had such power. The Time Keeper gave her an amulet: "This will help you travel through time."',
'{"weather":{"name":"Time Rift","icon":"🌀","description":"Distorted space-time rift"},"terrain":{"name":"Other Dimension","icon":"🌐","description":"Another dimension"},"adventure":{"name":"Awaken Power","icon":"💫","description":"Awaken hidden power"},"equipment":{"name":"Amulet","icon":"🧿","description":"Protects wearer"}}',
4),

('chapter-fan004-05-en', 'preset-fantasy-004-en', 'Time Travel',
'Luna decided to go back in time to stop the headmaster''s plan. She activated the amulet and traveled to the academy ten years ago. There, she saw the young headmaster and discovered he was once a kind person. What made him become like this? Luna decided to find the truth.',
'{"weather":{"name":"Time Rift","icon":"🌀","description":"Distorted space-time rift"},"terrain":{"name":"Time Fracture","icon":"⏳","description":"Time-distorted place"},"adventure":{"name":"Time Travel","icon":"⏳","description":"Travel through time"},"equipment":{"name":"Amulet","icon":"🧿","description":"Protects wearer"}}',
5),

('chapter-fan004-06-en', 'preset-fantasy-004-en', 'Origin of Darkness',
'Luna discovered the headmaster turned evil because a dark magic book corrupted his mind. He found it during an expedition, and it contained secrets of immortality. Shadow said: "We must destroy that book!" Luna decided to destroy it before the headmaster could find it.',
'{"weather":{"name":"Darkness Falls","icon":"🌑","description":"Endless darkness"},"terrain":{"name":"Ancient Ruins","icon":"🏛️","description":"Ancient civilization ruins"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Seal Scroll","icon":"📜","description":"Seal evil"}}',
6),

('chapter-fan004-07-en', 'preset-fantasy-004-en', 'Finding the Seal',
'Luna found the method to seal the dark magic book in the academy library. She needed to collect three elements: fire, frost, and lightning. She began her difficult search, collecting these elements throughout the academy. Shadow stayed with her, giving encouragement and help.',
'{"weather":{"name":"Element Chaos","icon":"⚡","description":"Elemental energy surging"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Element Awakening","icon":"🔥","description":"Control elements"},"equipment":{"name":"Element Gem","icon":"💠","description":"Store elemental power"}}',
7),

('chapter-fan004-08-en', 'preset-fantasy-004-en', 'Headmaster''s Pursuit',
'The headmaster discovered Luna''s plan and began hunting her. Luna had to hide in the academy''s corridors and secret rooms. She used time magic to escape the headmaster''s traps again and again. Shadow said: "We''re almost there, just one more element!"',
'{"weather":{"name":"Magic Storm","icon":"🌀","description":"Magical storm"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Escape","icon":"🏃","description":"Chase escaping target"},"equipment":{"name":"Magic Cloak","icon":"🧥","description":"Invisibility and protection"}}',
8),

('chapter-fan004-09-en', 'preset-fantasy-004-en', 'Final Confrontation',
'Luna collected all elements and prepared to seal the dark magic book. The headmaster appeared before her, trying to stop her. A fierce magical duel began. Luna used time power to go back at the crucial moment and change the outcome. Finally, she successfully sealed the dark magic book, and the headmaster''s evil power dissipated.',
'{"weather":{"name":"Holy Light","icon":"✨","description":"Sacred light"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Magic Duel","icon":"⚡","description":"Wizard duel"},"equipment":{"name":"Seal Scroll","icon":"📜","description":"Seal evil"}}',
9),

('chapter-fan004-10-en', 'preset-fantasy-004-en', 'Free Academy',
'The academy returned to peace, and imprisoned students were released. The Time Keeper appeared and told Luna she had become a true Time Messenger. Shadow said happily: "We did it!" Luna looked at the restored academy with a sense of accomplishment. She knew this was just the beginning of her adventures.',
'{"weather":{"name":"Dawn of Creation","icon":"🌅","description":"Light of creation"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Towering magic tower"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Guard what matters"},"equipment":{"name":"Time Badge","icon":"🏅","description":"Time Messenger badge"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：咖啡店的邂逅（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-rom003-01', 'preset-romance-003', '雨中的咖啡店',
'林夏匆忙躲进一家咖啡店避雨，收起湿透的雨伞。咖啡店老板沈墨走过来，递给她一杯热咖啡："外面雨很大，先暖暖身子。"林夏抬头，看到了一双温柔的眼睛。她不知道，这杯咖啡将改变她的人生。小雨在一旁偷笑："这就是传说中的命中注定吗？"',
'{"weather":{"name":"雨天","icon":"🌧️","description":"淅淅沥沥的雨"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"邂逅","icon":"💫","description":"命运的相遇"},"equipment":{"name":"雨伞","icon":"☂️","description":"雨中共享"}}',
1),

('chapter-rom003-02', 'preset-romance-003', '常客',
'林夏开始频繁光顾这家咖啡店。每次来，沈墨都会为她准备一杯特调咖啡，还会和她聊上几句。林夏发现自己开始期待每天的咖啡时光。小雨调侃道："你是不是喜欢上人家了？"林夏红着脸否认，但心里却泛起了涟漪。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
2),

('chapter-rom003-03', 'preset-romance-003', '画展邀请',
'沈墨邀请林夏参加他的个人画展。林夏惊讶地发现，原来沈墨不仅会做咖啡，还是一位有才华的画家。画展上，沈墨的每一幅画都讲述着一个故事。林夏站在一幅画前久久不能移开目光——那是一幅雨中咖啡店的画，画中的女孩正是她。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"浪漫的夕阳"},"terrain":{"name":"画廊","icon":"🖼️","description":"艺术的画廊"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"画板","icon":"🎨","description":"艺术的创作"}}',
3),

('chapter-rom003-04', 'preset-romance-003', '心动的瞬间',
'画展结束后，沈墨送林夏回家。在路灯下，沈墨轻轻握住了林夏的手："从你第一次走进咖啡店，我就知道你会成为我生命中最重要的人。"林夏的心跳加速，她终于承认了自己的感情。两人相视而笑，空气中弥漫着甜蜜的气息。',
'{"weather":{"name":"月色","icon":"🌙","description":"皎洁的月光"},"terrain":{"name":"街道","icon":"🛤️","description":"安静的街道"},"adventure":{"name":"告白","icon":"💕","description":"勇敢的表白"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
4),

('chapter-rom003-05', 'preset-romance-003', '误会',
'林夏在沈墨的咖啡店看到了一个漂亮女孩和沈墨说笑。她误以为沈墨有了女朋友，心里酸酸的。接下来的几天，她没有再去咖啡店。沈墨很困惑，不知道发生了什么。小雨看出了问题，决定帮忙澄清误会。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"家","icon":"🏠","description":"温暖的家"},"adventure":{"name":"误会","icon":"😔","description":"令人心痛的误会"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
5),

('chapter-rom003-06', 'preset-romance-003', '真相',
'小雨找到了林夏，告诉她那个女孩其实是沈墨的表妹。林夏这才明白自己误会了沈墨。她感到很内疚，决定去向沈墨道歉。当她来到咖啡店时，沈墨正在门口等她："我就知道你会来。"两人相拥，误会烟消云散。',
'{"weather":{"name":"雨后","icon":"🌈","description":"雨后的彩虹"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"和解","icon":"🤝","description":"重归于好"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
6),

('chapter-rom003-07', 'preset-romance-003', '共同的梦想',
'林夏和沈墨开始一起画画，分享彼此的创作。林夏发现沈墨的画充满了温暖和希望，而沈墨则被林夏作品中细腻的情感所打动。两人决定举办一次联合画展，展示他们的合作作品。小雨开心地说："你们真是天生一对！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"画室","icon":"🎨","description":"创作的空间"},"adventure":{"name":"陪伴","icon":"👫","description":"默默的陪伴"},"equipment":{"name":"画板","icon":"🎨","description":"艺术的创作"}}',
7),

('chapter-rom003-08', 'preset-romance-003', '困难',
'咖啡店的房东突然要涨租金，沈墨面临关店的压力。林夏看到沈墨愁眉不展的样子，决定帮他一起想办法。她用自己的积蓄，加上朋友们的帮助，终于帮沈墨渡过了难关。沈墨感动地说："谢谢你一直陪在我身边。"',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"陪伴","icon":"👫","description":"默默的陪伴"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
8),

('chapter-rom003-09', 'preset-romance-003', '求婚',
'在联合画展开幕的那天，沈墨在众多客人面前单膝跪地，向林夏求婚。他拿出一枚戒指，深情地说："林夏，你愿意嫁给我吗？让我们一起创造更多美好的故事。"林夏泪流满面，点头答应。全场响起热烈的掌声和祝福。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"浪漫的夕阳"},"terrain":{"name":"画廊","icon":"🖼️","description":"艺术的画廊"},"adventure":{"name":"求婚","icon":"💍","description":"浪漫的求婚"},"equipment":{"name":"戒指","icon":"💍","description":"爱情的象征"}}',
9),

('chapter-rom003-10', 'preset-romance-003', '幸福',
'林夏和沈墨结婚了，咖啡店成了他们共同的家。每天早上，沈墨为林夏准备咖啡，林夏则在店里画画。小雨经常来串门，感叹他们的幸福生活。林夏看着窗外的雨，想起第一次走进咖啡店的那天，心中充满了感激。命运，真的很奇妙。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"热恋","icon":"❤️","description":"热恋的甜蜜"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
10),

-- ============================================
-- 预设章节 - 都市言情：咖啡店的邂逅（英文版）
-- ============================================

('chapter-rom003-01-en', 'preset-romance-003-en', 'Coffee Shop in the Rain',
'Summer rushed into a cafe to escape the rain, putting away her soaked umbrella. The cafe owner Morgan walked over and handed her a hot coffee: "It''s pouring outside. Warm up first." Summer looked up and saw gentle eyes. She didn''t know this cup of coffee would change her life. Rain whispered nearby: "Is this what they call destiny?"',
'{"weather":{"name":"Rainy","icon":"🌧️","description":"Light rain"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Encounter","icon":"💫","description":"Fateful meeting"},"equipment":{"name":"Umbrella","icon":"☂️","description":"Share in rain"}}',
1),

('chapter-rom003-02-en', 'preset-romance-003-en', 'Regular Customer',
'Summer started visiting the cafe frequently. Each time, Morgan prepared her a special coffee and chatted with her. Summer found herself looking forward to her daily coffee time. Rain teased: "Do you like him?" Summer blushed and denied it, but her heart fluttered.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Date","icon":"🌹","description":"Sweet date"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
2),

('chapter-rom003-03-en', 'preset-romance-003-en', 'Art Exhibition Invitation',
'Morgan invited Summer to his solo art exhibition. Summer was surprised to discover that Morgan was not only a barista but also a talented painter. At the exhibition, each painting told a story. Summer stood before one painting, unable to look away—it was a cafe in the rain, and the girl in the painting was her.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Romantic sunset"},"terrain":{"name":"Gallery","icon":"🖼️","description":"Art gallery"},"adventure":{"name":"Date","icon":"🌹","description":"Sweet date"},"equipment":{"name":"Easel","icon":"🎨","description":"Artistic creation"}}',
3),

('chapter-rom003-04-en', 'preset-romance-003-en', 'Heartbeat Moment',
'After the exhibition, Morgan walked Summer home. Under the streetlight, he gently held her hand: "From the moment you walked into my cafe, I knew you would become the most important person in my life." Summer''s heart raced as she finally admitted her feelings. They smiled at each other, the air filled with sweetness.',
'{"weather":{"name":"Moonlight","icon":"🌙","description":"Bright moonlight"},"terrain":{"name":"Street","icon":"🛤️","description":"Quiet street"},"adventure":{"name":"Confession","icon":"💕","description":"Brave confession"},"equipment":{"name":"Phone","icon":"📱","description":"Tool for connection"}}',
4),

('chapter-rom003-05-en', 'preset-romance-003-en', 'Misunderstanding',
'Summer saw a pretty girl laughing with Morgan at the cafe. She mistakenly thought Morgan had a girlfriend and felt sour inside. For the next few days, she didn''t return to the cafe. Morgan was confused, not knowing what happened. Rain saw the problem and decided to help clear the misunderstanding.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Home","icon":"🏠","description":"Warm home"},"adventure":{"name":"Misunderstanding","icon":"😔","description":"Painful misunderstanding"},"equipment":{"name":"Phone","icon":"📱","description":"Tool for connection"}}',
5),

('chapter-rom003-06-en', 'preset-romance-003-en', 'The Truth',
'Rain found Summer and told her the girl was Morgan''s cousin. Summer realized she had misunderstood Morgan. Feeling guilty, she decided to apologize. When she arrived at the cafe, Morgan was waiting at the door: "I knew you''d come." They embraced, the misunderstanding dissolved.',
'{"weather":{"name":"After Rain","icon":"🌈","description":"Rainbow after rain"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Reconciliation","icon":"🤝","description":"Make up"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
6),

('chapter-rom003-07-en', 'preset-romance-003-en', 'Shared Dreams',
'Summer and Morgan started painting together, sharing their creations. Summer discovered Morgan''s paintings were full of warmth and hope, while Morgan was moved by the delicate emotions in Summer''s work. They decided to hold a joint exhibition. Rain said happily: "You two are made for each other!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Studio","icon":"🎨","description":"Creative space"},"adventure":{"name":"Companionship","icon":"👫","description":"Quiet company"},"equipment":{"name":"Easel","icon":"🎨","description":"Artistic creation"}}',
7),

('chapter-rom003-08-en', 'preset-romance-003-en', 'Difficulty',
'The cafe landlord suddenly raised the rent, and Morgan faced the pressure of closing the shop. Seeing Morgan worried, Summer decided to help. With her savings and friends'' support, she helped Morgan through the crisis. Morgan said emotionally: "Thank you for always being by my side."',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Companionship","icon":"👫","description":"Quiet company"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
8),

('chapter-rom003-09-en', 'preset-romance-003-en', 'Proposal',
'On the opening day of their joint exhibition, Morgan knelt before Summer in front of all the guests. He took out a ring and said deeply: "Summer, will you marry me? Let''s create more beautiful stories together." Summer cried and nodded. The room erupted in applause and blessings.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Romantic sunset"},"terrain":{"name":"Gallery","icon":"🖼️","description":"Art gallery"},"adventure":{"name":"Proposal","icon":"💍","description":"Romantic proposal"},"equipment":{"name":"Ring","icon":"💍","description":"Symbol of love"}}',
9),

('chapter-rom003-10-en', 'preset-romance-003-en', 'Happiness',
'Summer and Morgan got married, and the cafe became their shared home. Every morning, Morgan prepared coffee for Summer while she painted in the shop. Rain often visited, sighing at their happy life. Summer looked at the rain outside, remembering the day she first walked into the cafe, filled with gratitude. Destiny is truly wonderful.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"In Love","icon":"❤️","description":"Sweet love"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：青梅竹马的重逢（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-rom004-01', 'preset-romance-004', '回乡',
'苏晴因为工作调动，回到了阔别十年的家乡。走在熟悉的街道上，她想起了儿时的玩伴江辰。他们曾经形影不离，但十年前江辰一家搬走了，从此失去了联系。苏晴不知道，命运正在为她安排一场重逢。小糖在电话里兴奋地说："姐，你猜我遇到了谁？"',
'{"weather":{"name":"樱花雨","icon":"🌸","description":"樱花飘落的美景"},"terrain":{"name":"老街","icon":"🏘️","description":"怀旧的老街"},"adventure":{"name":"重逢","icon":"🎉","description":"再次相遇"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
1),

('chapter-rom004-02', 'preset-romance-004', '重逢',
'苏晴在一家咖啡馆见到了江辰。十年不见，他已经从当年的小男孩变成了一个成熟稳重的男人。江辰看到苏晴时，眼中闪过惊喜："苏晴，真的是你？"两人相视而笑，仿佛时光倒流。小糖在一旁偷笑："我就说你们会再见的！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"重逢","icon":"🎉","description":"再次相遇"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
2),

('chapter-rom004-03', 'preset-romance-004', '回忆',
'苏晴和江辰一起走在曾经玩耍的校园里。江辰说："你还记得我们在这里埋下的时光胶囊吗？"苏晴点点头，两人一起挖出了那个铁盒子。里面装着他们小时候写的信和画的画。江辰拿起一张画，笑着说："你画的是我们结婚的样子呢。"苏晴脸红了。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"浪漫的夕阳"},"terrain":{"name":"校园","icon":"🏫","description":"青春的校园"},"adventure":{"name":"陪伴","icon":"👫","description":"默默的陪伴"},"equipment":{"name":"信纸","icon":"✉️","description":"手写的情书"}}',
3),

('chapter-rom004-04', 'preset-romance-004', '暧昧',
'接下来的日子里，苏晴和江辰经常见面。他们一起吃饭、看电影、散步，就像当年一样。但苏晴发现，自己对江辰的感觉已经不再是单纯的友情了。江辰似乎也有同样的感觉，但他没有说破。小糖着急地说："你们到底什么时候才能在一起啊？"',
'{"weather":{"name":"月色","icon":"🌙","description":"皎洁的月光"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"暧昧","icon":"💗","description":"暧昧的时光"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
4),

('chapter-rom004-05', 'preset-romance-004', '表白',
'在樱花树下，江辰终于鼓起勇气向苏晴表白："苏晴，我一直都喜欢你。十年前我搬走时，最舍不得的就是你。现在我们终于又见面了，我不想再错过你。"苏晴感动得流下了眼泪，她点头答应了。樱花纷纷落下，仿佛在为他们的爱情祝福。',
'{"weather":{"name":"樱花雨","icon":"🌸","description":"樱花飘落的美景"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"表白","icon":"💌","description":"表达心意"},"equipment":{"name":"鲜花","icon":"💐","description":"浪漫的礼物"}}',
5),

('chapter-rom004-06', 'preset-romance-004', '甜蜜',
'苏晴和江辰开始了甜蜜的恋爱生活。江辰每天都会给苏晴送早餐，周末带她去各种地方约会。苏晴觉得自己是世界上最幸福的人。小糖经常调侃他们："你们两个太甜了，我都要被腻死了！"苏晴笑着打她："那你别看！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"海边","icon":"🏖️","description":"浪漫的海边"},"adventure":{"name":"热恋","icon":"❤️","description":"热恋的甜蜜"},"equipment":{"name":"相机","icon":"📷","description":"记录美好瞬间"}}',
6),

('chapter-rom004-07', 'preset-romance-004', '考验',
'苏晴的公司要调她去另一个城市工作。她陷入了两难：是接受这个重要的工作机会，还是留在江辰身边？江辰看出了她的犹豫，温柔地说："无论你做什么决定，我都支持你。距离不是问题，我们的心在一起。"苏晴感动地抱住了他。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"家","icon":"🏠","description":"温暖的家"},"adventure":{"name":"分离","icon":"😢","description":"不舍的离别"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
7),

('chapter-rom004-08', 'preset-romance-004', '选择',
'苏晴最终决定留在江辰身边。她告诉公司自己不想离开这个城市，公司尊重了她的选择。江辰得知后，紧紧抱住苏晴："谢谢你为我留下。"小糖在一旁感动得哭了："你们真是太感人了！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"家","icon":"🏠","description":"温暖的家"},"adventure":{"name":"陪伴","icon":"👫","description":"默默的陪伴"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
8),

('chapter-rom004-09', 'preset-romance-004', '求婚',
'在他们相识二十周年的纪念日，江辰在当年的校园里向苏晴求婚。他单膝跪地，拿出一枚戒指："苏晴，我们从青梅竹马到恋人，经历了二十年的时光。你愿意嫁给我，让我们一起走过下一个二十年吗？"苏晴含泪点头，周围的同学和老师都为他们鼓掌。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"浪漫的夕阳"},"terrain":{"name":"校园","icon":"🏫","description":"青春的校园"},"adventure":{"name":"求婚","icon":"💍","description":"浪漫的求婚"},"equipment":{"name":"戒指","icon":"💍","description":"爱情的象征"}}',
9),

('chapter-rom004-10', 'preset-romance-004', '幸福',
'苏晴和江辰结婚了，婚礼在他们曾经的校园举行。小糖作为伴娘，开心得比新娘还激动。苏晴看着身边的江辰，想起了他们从小到大的点点滴滴。命运让他们分开十年，又让他们重新相遇。她知道，这就是命中注定的爱情。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"校园","icon":"🏫","description":"青春的校园"},"adventure":{"name":"结婚","icon":"💒","description":"步入婚姻"},"equipment":{"name":"戒指","icon":"💍","description":"爱情的象征"}}',
10),

-- ============================================
-- 预设章节 - 都市言情：青梅竹马的重逢（英文版）
-- ============================================

('chapter-rom004-01-en', 'preset-romance-004-en', 'Returning Home',
'Sunny was transferred back to her hometown after ten years away. Walking the familiar streets, she thought of her childhood friend Chase. They had been inseparable, but his family moved away ten years ago, and they lost contact. Sunny didn''t know fate was arranging a reunion. Candy said excitedly on the phone: "Sis, guess who I met?"',
'{"weather":{"name":"Cherry Blossoms","icon":"🌸","description":"Falling cherry blossoms"},"terrain":{"name":"Old Street","icon":"🏘️","description":"Nostalgic old street"},"adventure":{"name":"Reunion","icon":"🎉","description":"Meet again"},"equipment":{"name":"Phone","icon":"📱","description":"Tool for connection"}}',
1),

('chapter-rom004-02-en', 'preset-romance-004-en', 'Reunion',
'Sunny met Chase at a cafe. Ten years later, he had grown from a boy into a mature, steady man. When Chase saw Sunny, surprise flashed in his eyes: "Sunny, is it really you?" They smiled at each other as if time had reversed. Candy whispered nearby: "I told you you''d meet again!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Reunion","icon":"🎉","description":"Meet again"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
2),

('chapter-rom004-03-en', 'preset-romance-004-en', 'Memories',
'Sunny and Chase walked through the campus where they used to play. Chase said: "Do you remember the time capsule we buried here?" Sunny nodded, and they dug up the metal box together. Inside were letters and drawings from their childhood. Chase picked up a drawing and smiled: "You drew us getting married." Sunny blushed.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Romantic sunset"},"terrain":{"name":"Campus","icon":"🏫","description":"Youthful campus"},"adventure":{"name":"Companionship","icon":"👫","description":"Quiet company"},"equipment":{"name":"Letter Paper","icon":"✉️","description":"Handwritten letters"}}',
3),

('chapter-rom004-04-en', 'preset-romance-004-en', 'Ambiguity',
'In the following days, Sunny and Chase met often. They ate together, watched movies, walked around—just like before. But Sunny realized her feelings for Chase were no longer just friendship. Chase seemed to feel the same, but neither said it. Candy said impatiently: "When are you two finally going to get together?"',
'{"weather":{"name":"Moonlight","icon":"🌙","description":"Bright moonlight"},"terrain":{"name":"Park","icon":"🌳","description":"Quiet park"},"adventure":{"name":"Ambiguity","icon":"💗","description":"Ambiguous time"},"equipment":{"name":"Phone","icon":"📱","description":"Tool for connection"}}',
4),

('chapter-rom004-05-en', 'preset-romance-004-en', 'Confession',
'Under the cherry blossom tree, Chase finally gathered the courage to confess: "Sunny, I''ve always liked you. When I moved away ten years ago, the hardest thing was leaving you. Now we''ve finally met again, I don''t want to miss you anymore." Sunny cried and nodded. Cherry blossoms fell around them, blessing their love.',
'{"weather":{"name":"Cherry Blossoms","icon":"🌸","description":"Falling cherry blossoms"},"terrain":{"name":"Park","icon":"🌳","description":"Quiet park"},"adventure":{"name":"Confession","icon":"💌","description":"Express feelings"},"equipment":{"name":"Flowers","icon":"💐","description":"Romantic gift"}}',
5),

('chapter-rom004-06-en', 'preset-romance-004-en', 'Sweetness',
'Sunny and Chase began their sweet romance. Chase brought her breakfast every day and took her on dates on weekends. Sunny felt like the happiest person in the world. Candy often teased: "You two are too sweet, I''m getting cavities!" Sunny laughed and hit her: "Then don''t watch!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Beach","icon":"🏖️","description":"Romantic beach"},"adventure":{"name":"In Love","icon":"❤️","description":"Sweet love"},"equipment":{"name":"Camera","icon":"📷","description":"Capture moments"}}',
6),

('chapter-rom004-07-en', 'preset-romance-004-en', 'Test',
'Sunny''s company wanted to transfer her to another city. She was torn: accept this important opportunity or stay with Chase? Chase saw her hesitation and said gently: "Whatever you decide, I support you. Distance isn''t a problem—our hearts are together." Sunny hugged him, moved.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Home","icon":"🏠","description":"Warm home"},"adventure":{"name":"Separation","icon":"😢","description":"Reluctant parting"},"equipment":{"name":"Phone","icon":"📱","description":"Tool for connection"}}',
7),

('chapter-rom004-08-en', 'preset-romance-004-en', 'Choice',
'Sunny decided to stay with Chase. She told the company she didn''t want to leave the city, and they respected her choice. When Chase found out, he hugged Sunny tightly: "Thank you for staying for me." Candy cried nearby: "You two are so touching!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Home","icon":"🏠","description":"Warm home"},"adventure":{"name":"Companionship","icon":"👫","description":"Quiet company"},"equipment":{"name":"Phone","icon":"📱","description":"Tool for connection"}}',
8),

('chapter-rom004-09-en', 'preset-romance-004-en', 'Proposal',
'On the twentieth anniversary of their first meeting, Chase proposed to Sunny at their old campus. He knelt on one knee with a ring: "Sunny, from childhood friends to lovers, we''ve been through twenty years. Will you marry me and let''s spend the next twenty together?" Sunny nodded with tears as classmates and teachers applauded.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Romantic sunset"},"terrain":{"name":"Campus","icon":"🏫","description":"Youthful campus"},"adventure":{"name":"Proposal","icon":"💍","description":"Romantic proposal"},"equipment":{"name":"Ring","icon":"💍","description":"Symbol of love"}}',
9),

('chapter-rom004-10-en', 'preset-romance-004-en', 'Happiness',
'Sunny and Chase got married at their old campus. Candy was the maid of honor, more excited than the bride. Sunny looked at Chase beside her, remembering their journey from childhood to now. Fate separated them for ten years, then brought them back together. She knew this was destined love.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Campus","icon":"🏫","description":"Youthful campus"},"adventure":{"name":"Wedding","icon":"💒","description":"Getting married"},"equipment":{"name":"Ring","icon":"💍","description":"Symbol of love"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：创业合伙人（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-bus003-01', 'preset-business-003', '创业的梦想',
'张明站在写字楼的窗前，看着城市的灯火。他有一个创业的梦想，但一直没有找到合适的合伙人。直到他遇到了李婷——一个理性务实的商业分析师。李婷听完张明的想法后说："你的创意很好，但需要一个可行的商业计划。"张明知道，他找到了对的人。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"融资","icon":"💰","description":"获得融资"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
1),

('chapter-bus003-02', 'preset-business-003', '合伙',
'张明和李婷决定一起创业。张明负责产品和技术，李婷负责运营和财务。他们租了一间小办公室，开始了创业之路。王总是他们第一个接触的投资人，他看了他们的计划后说："你们互补性很强，但还需要更多的准备。"张明和李婷决定继续努力。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"融资","icon":"💰","description":"获得融资"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
2),

('chapter-bus003-03', 'preset-business-003', '第一笔融资',
'经过几个月的努力，张明和李婷终于获得了第一笔天使投资。王总成为了他们的投资人，他说："我相信你们的团队。"有了资金，他们开始招聘员工，扩大团队。张明看着逐渐壮大的团队，心中充满了希望。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"融资","icon":"💰","description":"获得融资"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
3),

('chapter-bus003-04', 'preset-business-003', '产品上线',
'张明的团队终于完成了产品的开发，准备上线。上线当天，他们紧张地盯着数据。用户量开始增长，反馈也逐渐增多。李婷分析数据后说："用户留存率不错，但还需要优化。"张明点点头，他们还有很多工作要做。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
4),

('chapter-bus003-05', 'preset-business-003', '危机',
'就在一切顺利的时候，竞争对手推出了类似的产品，而且价格更低。张明的团队陷入了困境，用户开始流失。王总打来电话："你们需要找到自己的差异化优势。"张明和李婷连夜开会，寻找突破口。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
5),

('chapter-bus003-06', 'preset-business-003', '转型',
'张明提出了一个大胆的想法：转型做细分市场。李婷经过分析后同意了这个方案。他们重新定位产品，专注于特定的用户群体。转型后的第一个月，用户量开始回升。王总发来消息："做得好，你们找到了自己的路。"',
'{"weather":{"name":"阴转晴","icon":"🌤️","description":"天气转好"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"转型","icon":"🔄","description":"战略转型"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
6),

('chapter-bus003-07', 'preset-business-003', '分歧',
'随着公司的发展，张明和李婷开始出现分歧。张明想继续扩张，李婷认为应该先稳定现有业务。两人争论了很久，最终决定各退一步：先稳定核心业务，再考虑扩张。王总说："合伙人之间有分歧是正常的，关键是找到平衡点。"',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
7),

('chapter-bus003-08', 'preset-business-003', 'A轮融资',
'公司发展稳定后，张明和李婷开始寻求A轮融资。他们准备了详细的商业计划，接触了多家投资机构。最终，他们获得了一笔可观的A轮投资。王总说："这只是开始，你们还有很长的路要走。"',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"融资","icon":"💰","description":"获得融资"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
8),

('chapter-bus003-09', 'preset-business-003', '扩张',
'有了A轮融资，张明和李婷开始扩张业务。他们进入了新的市场，招聘了更多的员工。公司规模迅速扩大，从最初的两个人变成了五十人的团队。张明看着忙碌的办公室，感慨万千。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"创业的办公室"},"adventure":{"name":"扩张","icon":"🌍","description":"业务扩张"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
9),

('chapter-bus003-10', 'preset-business-003', '成功',
'三年后，张明和李婷的公司成功上市。站在敲钟台上，他们相视而笑。王总在台下鼓掌，为他们感到骄傲。张明说："谢谢你一直陪在我身边。"李婷笑着说："我们是最好的合伙人。"创业之路虽然艰辛，但他们一起走了过来。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"总部","icon":"🏙️","description":"公司总部"},"adventure":{"name":"上市","icon":"📈","description":"公司上市"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
10),

-- ============================================
-- 预设章节 - 职场风云：创业合伙人（英文版）
-- ============================================

('chapter-bus003-01-en', 'preset-business-003-en', 'Startup Dream',
'Max stood by the office window, looking at city lights. He had a startup dream but hadn''t found the right partner. Then he met Tina—a rational, practical business analyst. After hearing Max''s idea, Tina said: "Your concept is good, but it needs a viable business plan." Max knew he had found the right person.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Funding","icon":"💰","description":"Get funding"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
1),

('chapter-bus003-02-en', 'preset-business-003-en', 'Partnership',
'Max and Tina decided to start up together. Max handled product and technology; Tina handled operations and finance. They rented a small office and began their startup journey. Mr. Wang was the first investor they contacted. After reviewing their plan, he said: "You complement each other well, but need more preparation." Max and Tina decided to keep working.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Funding","icon":"💰","description":"Get funding"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
2),

('chapter-bus003-03-en', 'preset-business-003-en', 'First Funding',
'After months of effort, Max and Tina finally got their first angel investment. Mr. Wang became their investor: "I believe in your team." With funding, they started hiring and expanding the team. Max looked at the growing team with hope.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Funding","icon":"💰","description":"Get funding"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
3),

('chapter-bus003-04-en', 'preset-business-003-en', 'Product Launch',
'Max''s team finally finished product development and prepared to launch. On launch day, they nervously watched the data. Users started growing, feedback came in. Tina analyzed: "User retention is good, but needs optimization." Max nodded—they had much work ahead.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Make breakthrough"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
4),

('chapter-bus003-05-en', 'preset-business-003-en', 'Crisis',
'Just when things were going well, a competitor launched a similar product at a lower price. Max''s team was in trouble; users started leaving. Mr. Wang called: "You need to find your differentiation." Max and Tina met overnight to find a breakthrough.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Crisis Management","icon":"🚨","description":"Handle crisis"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
5),

('chapter-bus003-06-en', 'preset-business-003-en', 'Pivot',
'Max proposed a bold idea: pivot to a niche market. After analysis, Tina agreed. They repositioned the product for a specific user group. The first month after pivoting, users started returning. Mr. Wang messaged: "Well done, you found your path."',
'{"weather":{"name":"Clearing","icon":"🌤️","description":"Weather improving"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Pivot","icon":"🔄","description":"Strategic pivot"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
6),

('chapter-bus003-07-en', 'preset-business-003-en', 'Disagreement',
'As the company grew, Max and Tina started disagreeing. Max wanted to expand; Tina thought they should stabilize existing business first. They argued for a long time, finally compromising: stabilize core business first, then consider expansion. Mr. Wang said: "Disagreements between partners are normal. The key is finding balance."',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Team Management","icon":"👥","description":"Manage team"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
7),

('chapter-bus003-08-en', 'preset-business-003-en', 'Series A Funding',
'After stabilizing, Max and Tina sought Series A funding. They prepared detailed business plans and contacted multiple investors. Finally, they secured significant Series A investment. Mr. Wang said: "This is just the beginning. You have a long road ahead."',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Funding","icon":"💰","description":"Get funding"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
8),

('chapter-bus003-09-en', 'preset-business-003-en', 'Expansion',
'With Series A funding, Max and Tina expanded the business. They entered new markets and hired more employees. The company grew rapidly from two people to a fifty-person team. Max looked at the busy office with emotion.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Startup office"},"adventure":{"name":"Expansion","icon":"🌍","description":"Business expansion"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
9),

('chapter-bus003-10-en', 'preset-business-003-en', 'Success',
'Three years later, Max and Tina''s company went public. Standing at the bell-ringing ceremony, they smiled at each other. Mr. Wang applauded from below, proud of them. Max said: "Thank you for always being with me." Tina smiled: "We''re the best partners." The startup journey was hard, but they walked it together.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Headquarters","icon":"🏙️","description":"Company headquarters"},"adventure":{"name":"IPO","icon":"📈","description":"Go public"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：职场新人逆袭记（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-bus004-01', 'preset-business-004', '入职第一天',
'李小白第一天入职，紧张得手心冒汗。他小心翼翼地走进办公室，不知道该坐在哪里。陈姐走过来，笑着说："新来的吧？坐我旁边，有什么不懂的问我。"李小白感激地点点头。刘经理从办公室走出来，扫了一眼新人，没说什么就走了。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"笔记本","icon":"📓","description":"工作记录"}}',
1),

('chapter-bus004-02', 'preset-business-004', '第一个任务',
'刘经理给李小白分配了第一个任务：整理部门的历史数据。这是一个繁琐的工作，但李小白决定认真完成。他加班到很晚，把数据整理得井井有条。陈姐看到后说："你很认真，继续保持。"李小白心里暖暖的。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
2),

('chapter-bus004-03', 'preset-business-004', '犯错',
'李小白在一次会议上犯了一个错误，把数据说错了。刘经理当场批评了他，李小白羞愧得无地自容。会后，陈姐安慰他："新人犯错很正常，关键是吸取教训。"李小白决定以后更加仔细。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"笔记本","icon":"📓","description":"工作记录"}}',
3),

('chapter-bus004-04', 'preset-business-004', '学习',
'李小白开始主动学习，每天下班后都看专业书籍。他还向陈姐请教工作经验，陈姐毫无保留地分享。刘经理注意到李小白的进步，开始给他分配更重要的任务。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"笔记本","icon":"📓","description":"工作记录"}}',
4),

('chapter-bus004-05', 'preset-business-004', '机会',
'公司接到一个重要项目，刘经理决定让李小白参与。这是一个展示能力的好机会，李小白决心不辜负期望。他加班加点，认真准备方案。陈姐说："加油，你可以的！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"项目启动","icon":"🚀","description":"启动新项目"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
5),

('chapter-bus004-06', 'preset-business-004', '挑战',
'项目进行中遇到了困难，客户对方案不满意。李小白主动承担了修改方案的任务。他反复研究客户需求，终于找到了突破口。刘经理看到修改后的方案，点了点头。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"客户公司","icon":"🏛️","description":"客户的办公地"},"adventure":{"name":"谈判","icon":"🤝","description":"商务谈判"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
6),

('chapter-bus004-07', 'preset-business-004', '成功',
'项目最终成功了！客户非常满意，公司获得了长期合作的机会。刘经理在会议上表扬了李小白："这个项目的成功，离不开李小白的努力。"李小白激动得说不出话来。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
7),

('chapter-bus004-08', 'preset-business-004', '晋升',
'一年后，李小白被提拔为项目组长。他从一个职场新人，成长为能够独当一面的骨干。陈姐笑着说："我就知道你可以的！"刘经理也对他说："继续努力，你的潜力很大。"',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"崛起","icon":"📈","description":"快速崛起"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
8),

('chapter-bus004-09', 'preset-business-004', '带新人',
'李小白开始带新人了。他想起自己刚入职时的紧张，决定像陈姐帮助他一样帮助新人。他耐心地教导，分享自己的经验。新人感激地说："谢谢你，小白哥！"李小白笑着说："加油，你也可以的！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"笔记本","icon":"📓","description":"工作记录"}}',
9),

('chapter-bus004-10', 'preset-business-004', '成长',
'三年后，李小白已经成长为部门经理。他站在办公室窗前，看着城市的灯火，想起了自己刚入职时的样子。陈姐走过来："想什么呢？"李小白笑着说："在想这一路走来的点点滴滴。谢谢你，陈姐。"陈姐拍拍他的肩膀："你值得这一切。"',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"崛起","icon":"📈","description":"快速崛起"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
10),

-- ============================================
-- 预设章节 - 职场风云：职场新人逆袭记（英文版）
-- ============================================

('chapter-bus004-01-en', 'preset-business-004-en', 'First Day',
'Alex was so nervous on his first day that his palms were sweating. He walked into the office carefully, not knowing where to sit. Sarah walked over and smiled: "New here? Sit next to me. Ask me if you don''t understand anything." Alex nodded gratefully. Manager Liu came out of his office, glanced at the new person, and left without saying anything.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Make breakthrough"},"equipment":{"name":"Notebook","icon":"📓","description":"Work records"}}',
1),

('chapter-bus004-02-en', 'preset-business-004-en', 'First Task',
'Manager Liu assigned Alex his first task: organize the department''s historical data. It was tedious work, but Alex decided to do it carefully. He worked late, organizing the data neatly. Sarah saw it and said: "You''re very conscientious. Keep it up." Alex felt warm inside.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Make breakthrough"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
2),

('chapter-bus004-03-en', 'preset-business-004-en', 'Mistake',
'Alex made a mistake in a meeting, getting the data wrong. Manager Liu criticized him on the spot. Alex was ashamed. After the meeting, Sarah comforted him: "It''s normal for new people to make mistakes. The key is learning from them." Alex decided to be more careful.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Crisis Management","icon":"🚨","description":"Handle crisis"},"equipment":{"name":"Notebook","icon":"📓","description":"Work records"}}',
3),

('chapter-bus004-04-en', 'preset-business-004-en', 'Learning',
'Alex started learning actively, reading professional books after work every day. He also asked Sarah for work advice, and she shared unreservedly. Manager Liu noticed Alex''s progress and started assigning him more important tasks.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Make breakthrough"},"equipment":{"name":"Notebook","icon":"📓","description":"Work records"}}',
4),

('chapter-bus004-05-en', 'preset-business-004-en', 'Opportunity',
'The company got an important project, and Manager Liu decided to let Alex participate. This was a good chance to show ability. Alex was determined not to disappoint. He worked overtime, preparing the proposal carefully. Sarah said: "Go for it, you can do it!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Project Launch","icon":"🚀","description":"Start new project"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
5),

('chapter-bus004-06-en', 'preset-business-004-en', 'Challenge',
'The project hit difficulties; the client wasn''t satisfied with the proposal. Alex took on the task of revising it. He studied the client''s needs repeatedly and finally found a breakthrough. Manager Liu nodded at the revised proposal.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Client Office","icon":"🏛️","description":"Client workplace"},"adventure":{"name":"Negotiation","icon":"🤝","description":"Business negotiation"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
6),

('chapter-bus004-07-en', 'preset-business-004-en', 'Success',
'The project succeeded! The client was very satisfied, and the company gained a long-term partnership. Manager Liu praised Alex in the meeting: "This project''s success wouldn''t have been possible without Alex''s effort." Alex was too moved to speak.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Make breakthrough"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
7),

('chapter-bus004-08-en', 'preset-business-004-en', 'Promotion',
'A year later, Alex was promoted to project leader. He grew from a rookie to a capable backbone. Sarah smiled: "I knew you could do it!" Manager Liu also told him: "Keep working hard. You have great potential."',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Rising","icon":"📈","description":"Rapid rise"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
8),

('chapter-bus004-09-en', 'preset-business-004-en', 'Mentoring',
'Alex started mentoring new employees. Remembering his own nervousness when he started, he decided to help newcomers like Sarah helped him. He taught patiently and shared his experience. A new employee said gratefully: "Thank you, Alex!" Alex smiled: "Go for it, you can do it too!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Team Management","icon":"👥","description":"Manage team"},"equipment":{"name":"Notebook","icon":"📓","description":"Work records"}}',
9),

('chapter-bus004-10-en', 'preset-business-004-en', 'Growth',
'Three years later, Alex had grown into a department manager. He stood by the office window, looking at city lights, remembering how he was when he first started. Sarah walked over: "What are you thinking about?" Alex smiled: "Thinking about the journey. Thank you, Sarah." Sarah patted his shoulder: "You deserve all this."',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Rising","icon":"📈","description":"Rapid rise"},"equipment":{"name":"Laptop","icon":"💻","description":"Essential for work"}}',
10);

-- ============================================
-- 第六部分：预设谜题
-- ============================================

INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type) VALUES
-- 儿童冒险 - 丛林奇遇记（中文版）
('puzzle-adv003-01', 'chapter-adv003-03', '什么东西越洗越脏？', '水', 'riddle'),
('puzzle-adv003-02', 'chapter-adv003-05', '有头没有颈，身上冷冰冰，有翅不能飞，无脚也能行。这是什么？', '鱼', 'riddle'),
('puzzle-adv003-03', 'chapter-adv003-08', '白天不出来，晚上才出现，照亮半边天。这是什么？', '月亮', 'riddle'),

-- 儿童冒险 - 丛林奇遇记（英文版）
('puzzle-adv003-01-en', 'chapter-adv003-03-en', 'What gets dirtier the more you wash it?', 'Water', 'riddle'),
('puzzle-adv003-02-en', 'chapter-adv003-05-en', 'I have a head but no neck, a body cold and sleek. I have wings but cannot fly, no feet yet I can move. What am I?', 'Fish', 'riddle'),
('puzzle-adv003-03-en', 'chapter-adv003-08-en', 'What comes out at night and lights up half the sky?', 'Moon', 'riddle'),

-- 儿童冒险 - 极地探险队（中文版）
('puzzle-adv004-01', 'chapter-adv004-03', '什么东西有牙齿但不能咬人？', '梳子', 'riddle'),
('puzzle-adv004-02', 'chapter-adv004-05', '千条线，万条线，掉到水里看不见。这是什么？', '雨', 'riddle'),
('puzzle-adv004-03', 'chapter-adv004-09', '什么东西越热越爱出来？', '汗', 'riddle'),

-- 儿童冒险 - 极地探险队（英文版）
('puzzle-adv004-01-en', 'chapter-adv004-03-en', 'What has teeth but cannot bite?', 'Comb', 'riddle'),
('puzzle-adv004-02-en', 'chapter-adv004-05-en', 'Thousands of threads, millions of lines, invisible when they hit the water. What is it?', 'Rain', 'riddle'),
('puzzle-adv004-03-en', 'chapter-adv004-09-en', 'What loves to come out more when it gets hotter?', 'Sweat', 'riddle'),

-- 魔幻传说 - 龙族守护者（中文版）
('puzzle-fan003-01', 'chapter-fan003-02', '什么东西有四条腿但不能走路？', '桌子', 'riddle'),
('puzzle-fan003-02', 'chapter-fan003-05', '什么东西越分享越多？', '知识', 'riddle'),
('puzzle-fan003-03', 'chapter-fan003-09', '什么东西越拿越多？', '洞', 'riddle'),

-- 魔幻传说 - 龙族守护者（英文版）
('puzzle-fan003-01-en', 'chapter-fan003-02-en', 'What has four legs but cannot walk?', 'Table', 'riddle'),
('puzzle-fan003-02-en', 'chapter-fan003-05-en', 'What increases the more you share it?', 'Knowledge', 'riddle'),
('puzzle-fan003-03-en', 'chapter-fan003-09-en', 'What gets bigger the more you take away from it?', 'Hole', 'riddle'),

-- 魔幻传说 - 魔法学院大逃亡（中文版）
('puzzle-fan004-01', 'chapter-fan004-02', '什么东西每天都在前进，但永远不会离开原地？', '时钟', 'riddle'),
('puzzle-fan004-02', 'chapter-fan004-06', '什么东西有头没有脚？', '蒜', 'riddle'),
('puzzle-fan004-03', 'chapter-fan004-09', '什么东西越洗越小？', '肥皂', 'riddle'),

-- 魔幻传说 - 魔法学院大逃亡（英文版）
('puzzle-fan004-01-en', 'chapter-fan004-02-en', 'What moves forward every day but never leaves its place?', 'Clock', 'riddle'),
('puzzle-fan004-02-en', 'chapter-fan004-06-en', 'What has a head but no feet?', 'Garlic', 'riddle'),
('puzzle-fan004-03-en', 'chapter-fan004-09-en', 'What gets smaller the more you wash it?', 'Soap', 'riddle'),

-- 都市言情 - 咖啡店的邂逅（中文版）
('puzzle-rom003-01', 'chapter-rom003-02', '什么东西有眼睛但看不见？', '针', 'riddle'),
('puzzle-rom003-02', 'chapter-rom003-05', '什么东西有嘴巴但不会说话？', '茶壶', 'riddle'),
('puzzle-rom003-03', 'chapter-rom003-09', '什么东西有手但不会拿东西？', '时钟', 'riddle'),

-- 都市言情 - 咖啡店的邂逅（英文版）
('puzzle-rom003-01-en', 'chapter-rom003-02-en', 'What has an eye but cannot see?', 'Needle', 'riddle'),
('puzzle-rom003-02-en', 'chapter-rom003-05-en', 'What has a mouth but cannot speak?', 'Teapot', 'riddle'),
('puzzle-rom003-03-en', 'chapter-rom003-09-en', 'What has hands but cannot hold things?', 'Clock', 'riddle'),

-- 都市言情 - 青梅竹马的重逢（中文版）
('puzzle-rom004-01', 'chapter-rom004-03', '什么东西有腿但不会走路？', '桌子', 'riddle'),
('puzzle-rom004-02', 'chapter-rom004-06', '什么东西有耳朵但听不见？', '杯子', 'riddle'),
('puzzle-rom004-03', 'chapter-rom004-09', '什么东西有舌头但不会说话？', '鞋子', 'riddle'),

-- 都市言情 - 青梅竹马的重逢（英文版）
('puzzle-rom004-01-en', 'chapter-rom004-03-en', 'What has legs but cannot walk?', 'Table', 'riddle'),
('puzzle-rom004-02-en', 'chapter-rom004-06-en', 'What has ears but cannot hear?', 'Cup', 'riddle'),
('puzzle-rom004-03-en', 'chapter-rom004-09-en', 'What has a tongue but cannot speak?', 'Shoe', 'riddle'),

-- 职场风云 - 创业合伙人（中文版）
('puzzle-bus003-01', 'chapter-bus003-03', '什么东西越用越短？', '铅笔', 'riddle'),
('puzzle-bus003-02', 'chapter-bus003-06', '什么东西越烧越长？', '烟', 'riddle'),
('puzzle-bus003-03', 'chapter-bus003-09', '什么东西有叶子但不是树？', '书', 'riddle'),

-- 职场风云 - 创业合伙人（英文版）
('puzzle-bus003-01-en', 'chapter-bus003-03-en', 'What gets shorter the more you use it?', 'Pencil', 'riddle'),
('puzzle-bus003-02-en', 'chapter-bus003-06-en', 'What gets longer the more it burns?', 'Smoke', 'riddle'),
('puzzle-bus003-03-en', 'chapter-bus003-09-en', 'What has leaves but is not a tree?', 'Book', 'riddle'),

-- 职场风云 - 职场新人逆袭记（中文版）
('puzzle-bus004-01', 'chapter-bus004-02', '什么东西有脖子但没有头？', '瓶子', 'riddle'),
('puzzle-bus004-02', 'chapter-bus004-05', '什么东西有背但不会坐？', '椅子', 'riddle'),
('puzzle-bus004-03', 'chapter-bus004-08', '什么东西有门但进不去？', '书架', 'riddle'),

-- 职场风云 - 职场新人逆袭记（英文版）
('puzzle-bus004-01-en', 'chapter-bus004-02-en', 'What has a neck but no head?', 'Bottle', 'riddle'),
('puzzle-bus004-02-en', 'chapter-bus004-05-en', 'What has a back but cannot sit?', 'Chair', 'riddle'),
('puzzle-bus004-03-en', 'chapter-bus004-08-en', 'What has a door but cannot enter?', 'Bookshelf', 'riddle');
