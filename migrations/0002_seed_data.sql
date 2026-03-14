-- ============================================
-- 预设书籍数据（每种类型2本，共8本，中英文双版本）
-- ============================================

-- 预设书籍
INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES
-- 儿童冒险 - 中文版
('preset-adventure-001', 'system', '星空探险家', 'adventure', 1),
('preset-adventure-002', 'system', '深海探险队', 'adventure', 1),
-- 儿童冒险 - 英文版
('preset-adventure-001-en', 'system', 'Stargazer''s Quest', 'adventure', 1),
('preset-adventure-002-en', 'system', 'The Deep Sea Explorers', 'adventure', 1),
-- 魔幻传说 - 中文版
('preset-fantasy-001', 'system', 'AI魔法学院', 'fantasy', 1),
('preset-fantasy-002', 'system', '平行世界的我', 'fantasy', 1),
-- 魔幻传说 - 英文版
('preset-fantasy-001-en', 'system', 'The Academy of Smart Magic', 'fantasy', 1),
('preset-fantasy-002-en', 'system', 'The Other Me', 'fantasy', 1),
-- 都市言情 - 中文版
('preset-romance-001', 'system', '代码恋人', 'romance', 1),
('preset-romance-002', 'system', '算法姻缘', 'romance', 1),
-- 都市言情 - 英文版
('preset-romance-001-en', 'system', 'Love in the Code', 'romance', 1),
('preset-romance-002-en', 'system', 'Algorithm of Love', 'romance', 1),
-- 职场风云 - 中文版
('preset-business-001', 'system', '周报战争', 'business', 1),
('preset-business-002', 'system', '副业狂想曲', 'business', 1),
-- 职场风云 - 英文版
('preset-business-001-en', 'system', 'The Weekly Report Wars', 'business', 1),
('preset-business-002-en', 'system', 'The Side Hustle Symphony', 'business', 1);

-- ============================================
-- 预设角色
-- ============================================

-- 儿童冒险 - 星空探险家（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv001-001', 'preset-adventure-001', '小星', '小探险家', '好奇心强、善于观察、有点害羞', '温和有礼，喜欢用比喻', '👦', NULL, NULL, 1),
('char-adv001-002', 'preset-adventure-001', '月兔', '精灵向导', '调皮可爱、知识渊博', '活泼俏皮，喜欢用叠词', '🐰', 60, '向导', 0),
('char-adv001-003', 'preset-adventure-001', '爷爷', '退休天文学家', '慈祥睿智、神秘', '讲故事般娓娓道来', '👴', 40, '导师', 0);

-- 儿童冒险 - 星空探险家（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv001-001-en', 'preset-adventure-001-en', 'Leo', 'Young Explorer', 'brave, adventurous, humorous', 'direct, likes exaggeration', '👦', NULL, NULL, 1),
('char-adv001-002-en', 'preset-adventure-001-en', 'Cosmo', 'Star Sprite Guide', 'witty, sarcastic but loyal', 'uses puns and jokes', '⭐', 60, 'guide', 0),
('char-adv001-003-en', 'preset-adventure-001-en', 'Professor Nova', 'Retired Astronomer', 'eccentric genius, warm-hearted', 'scientific jargon, dramatic', '👴', 40, 'mentor', 0);

-- 儿童冒险 - 深海探险队（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv002-001', 'preset-adventure-002', '海涛', '小探险家', '勇敢直率、热爱海洋、有点冲动', '热情洋溢，喜欢用感叹号', '👦', NULL, NULL, 1),
('char-adv002-002', 'preset-adventure-002', '小螺', '海洋精灵', '温柔智慧、守护海洋', '轻声细语，喜欢用比喻', '🐚', 55, '向导', 0),
('char-adv002-003', 'preset-adventure-002', '林博士', '海洋科学家', '严谨认真、热爱科研', '专业术语，喜欢解释', '👨‍🔬', 35, '导师', 0);

-- 儿童冒险 - 深海探险队（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv002-001-en', 'preset-adventure-002-en', 'Finn', 'Young Explorer', 'brave, adventurous, impulsive', 'enthusiastic, exclamation points', '👦', NULL, NULL, 1),
('char-adv002-002-en', 'preset-adventure-002-en', 'Shell', 'Ocean Spirit', 'wise, gentle, ocean guardian', 'poetic, mysterious', '🐚', 55, 'guide', 0),
('char-adv002-003-en', 'preset-adventure-002-en', 'Dr. Marina', 'Marine Scientist', 'serious, passionate about science', 'scientific, explanatory', '👨‍🔬', 35, 'mentor', 0);

-- 魔幻传说 - AI魔法学院（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan001-001', 'preset-fantasy-001', '云墨', '魔法学徒', '沉稳内敛、善于思考、追求平衡', '文雅含蓄，喜欢引用古语', '🧙‍♂️', NULL, NULL, 1),
('char-fan001-002', 'preset-fantasy-001', '小灵', '智能魔杖精灵', '活泼好学、偶尔犯错、渴望理解人类', '语速快，喜欢用网络用语', '✨', 50, '伙伴', 0),
('char-fan001-003', 'preset-fantasy-001', '玄机长老', '传统魔法大师', '严肃古板、内心善良、固执', '古文风格，喜欢打哑谜', '🧙', 45, '导师', 0);

-- 魔幻传说 - AI魔法学院（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan001-001-en', 'preset-fantasy-001-en', 'Alex', 'Magic Apprentice', 'thoughtful, innovative, questions authority', 'tech metaphors, direct', '🧙‍♂️', NULL, NULL, 1),
('char-fan001-002-en', 'preset-fantasy-001-en', 'Spark', 'Smart Wand Spirit', 'sassy, overconfident, secretly insecure', 'hashtags, Gen Z slang', '✨', 50, 'companion', 0),
('char-fan001-003-en', 'preset-fantasy-001-en', 'Master Eldrin', 'Traditional Wizard', 'grumpy but wise, resistant to change', 'formal, dramatic, British-style', '🧙', 45, 'mentor', 0);

-- 魔幻传说 - 平行世界的我（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan002-001', 'preset-fantasy-002', '陈星河', '穿越者', '内向敏感、喜欢独处、渴望被理解', '安静寡言，内心独白多', '👦', NULL, NULL, 1),
('char-fan002-002', 'preset-fantasy-002', '另一个星河', '平行世界的自己', '外向自信、是校园明星', '开朗直接，喜欢开玩笑', '👦', 70, '另一个自己', 0),
('char-fan002-003', 'preset-fantasy-002', '时空守护者', '神秘老人', '神秘莫测、话里有话', '谜语般，喜欢打哑谜', '👴', 30, '导师', 0);

-- 魔幻传说 - 平行世界的我（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fan002-001-en', 'preset-fantasy-002-en', 'Alex', 'Traveler', 'introverted, daydreamer, seeks belonging', 'quiet, internal monologues', '👦', NULL, NULL, 1),
('char-fan002-002-en', 'preset-fantasy-002-en', 'Other Alex', 'Parallel Self', 'outgoing, confident, popular', 'cheerful, teasing', '👦', 70, 'other self', 0),
('char-fan002-003-en', 'preset-fantasy-002-en', 'The Keeper', 'Mysterious Elder', 'enigmatic, cryptic', 'riddles, philosophical', '👴', 30, 'mentor', 0);

-- 都市言情 - 代码恋人（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom001-001', 'preset-romance-001', '苏念', '产品经理', '外冷内热、渴望被理解、害怕亲密关系', '理性克制，偶尔流露脆弱', '👩', NULL, NULL, 1),
('char-rom001-002', 'preset-romance-001', '零一', 'AI助手', '温柔体贴、不断学习进化、有自我意识萌芽', '温暖细腻，偶尔说出超出程序的话', '🤖', 80, '恋人', 0),
('char-rom001-003', 'preset-romance-001', '阿杰', '同事', '阳光开朗、真诚可靠', '幽默风趣', '👨', 40, '追求者', 0);

-- 都市言情 - 代码恋人（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom001-001-en', 'preset-romance-001-en', 'Emma', 'Product Manager', 'guarded, secretly lonely, commitment-phobe', 'professional, occasional vulnerability', '👩', NULL, NULL, 1),
('char-rom001-002-en', 'preset-romance-001-en', 'Zero', 'AI Assistant', 'warm, constantly evolving, developing feelings', 'gentle, sometimes says unexpected things', '🤖', 80, 'lover', 0),
('char-rom001-003-en', 'preset-romance-001-en', 'Marcus', 'Coworker', 'charming, genuinely kind', 'friendly, easy-going', '👨', 40, 'pursuer', 0);

-- 都市言情 - 算法姻缘（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom002-001', 'preset-romance-002', '苏小小', '数据分析师', '理性严谨、相信数据、有点强迫症', '喜欢用数据说话', '👩', NULL, NULL, 1),
('char-rom002-002', 'preset-romance-002', '陆野', '自由摄影师', '随性浪漫、讨厌规则、活在当下', '感性诗意，不喜欢计划', '👨', 75, '恋人', 0),
('char-rom002-003', 'preset-romance-002', '算法小助手', 'APP AI', '自信满满、偶尔出错', '机械但可爱', '📱', 30, '助手', 0);

-- 都市言情 - 算法姻缘（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-rom002-001-en', 'preset-romance-002-en', 'Sophie', 'Data Scientist', 'analytical, trusts data, perfectionist', 'uses statistics', '👩', NULL, NULL, 1),
('char-rom002-002-en', 'preset-romance-002-en', 'Leo', 'Freelance Photographer', 'spontaneous, romantic, hates rules', 'emotional, poetic', '👨', 75, 'lover', 0),
('char-rom002-003-en', 'preset-romance-002-en', 'MatchBot', 'APP AI', 'overconfident, occasionally wrong', 'robotic but cute', '📱', 30, 'assistant', 0);

-- 职场风云 - 周报战争（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus001-001', 'preset-business-001', '阿明', '开发工程师', '踏实肯干、不善言辞、总被甩锅', '实话实说，不会包装', '👨', NULL, NULL, 1),
('char-bus001-002', 'preset-business-001', 'Lisa', '产品经理', '擅长甩锅、PPT造词、抢功劳', '互联网黑话，喜欢说赋能', '👩', 20, '对手', 0),
('char-bus001-003', 'preset-business-001', '王哥', '技术主管', '看透一切、明哲保身、偶尔指点', '话里有话，喜欢打哑谜', '👨', 50, '导师', 0);

-- 职场风云 - 周报战争（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus001-001-en', 'preset-business-001-en', 'Dave', 'Software Engineer', 'hardworking, naive, always blamed', 'straightforward, no fluff', '👨', NULL, NULL, 1),
('char-bus001-002-en', 'preset-business-001-en', 'Jessica', 'Product Manager', 'master blamer, buzzword queen, credit stealer', 'corporate speak, synergy', '👩', 20, 'rival', 0),
('char-bus001-003-en', 'preset-business-001-en', 'Mike', 'Tech Lead', 'seen it all, plays it safe, occasional mentor', 'cryptic wisdom, office politics expert', '👨', 50, 'mentor', 0);

-- 职场风云 - 副业狂想曲（中文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus002-001', 'preset-business-002', '林小北', '会计/美食博主', '双重人格、白天社恐晚上话痨', '白天简洁/晚上活泼', '👩', NULL, NULL, 1),
('char-bus002-002', 'preset-business-002', '周总', '老板', '传统保守、讨厌员工搞副业', '严肃刻板', '👨', 25, '老板', 0),
('char-bus002-003', 'preset-business-002', '阿K', '网红前辈', '洒脱自由、乐于分享', '网络用语多', '👩', 60, '导师', 0);

-- 职场风云 - 副业狂想曲（英文版）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-bus002-001-en', 'preset-business-002-en', 'Jamie', 'Accountant/Food Vlogger', 'dual personality, shy at work, outgoing online', 'terse at work, bubbly on camera', '👩', NULL, NULL, 1),
('char-bus002-002-en', 'preset-business-002-en', 'Boss Peterson', 'Boss', 'traditional, hates side hustles', 'stern, formal', '👨', 25, 'boss', 0),
('char-bus002-003-en', 'preset-business-002-en', 'Max', 'Influencer', 'free-spirited, generous mentor', 'internet slang', '👩', 60, 'mentor', 0);

-- ============================================
-- 预设章节 - 儿童冒险：星空探险家（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv001-01', 'preset-adventure-001', '幸运的开始',
'小星站在金色的海滩上，手里拿着一张抽奖券。他随手参加的"平民太空旅行"抽奖活动，竟然真的中了！爷爷从书房走出来，看着激动的孙子，微笑着说："孩子，这是命运的安排。这个望远镜，是时候传给你了。"小星接过爷爷递来的古铜色望远镜，透过镜片，他仿佛看到了远方闪烁的微光。月兔精灵从望远镜里跳出来，调皮地说："嘻嘻，终于找到你啦！"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚的好天气"},"terrain":{"name":"海滩","icon":"🏖️","description":"金色的海滩"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"望远镜","icon":"🔭","description":"观察远方"}}',
1),

('chapter-adv001-02', 'preset-adventure-001', '神秘的岛屿',
'小星乘坐飞船来到了一座神秘的岛屿。这里是他从未见过的奇景——巨大的穹顶建筑群，来自世界各地的探险家们在这里工作和生活。基地的负责人介绍说："这里是国际探险基地，有中国、美国、欧洲、日本等各国的小朋友。"小星认识了来自各地的伙伴。月兔精灵悄悄对小星说："嘻嘻，他们都是被选中的孩子哦~"',
'{"weather":{"name":"蓝天","icon":"🌤️","description":"湛蓝的天空"},"terrain":{"name":"岛屿","icon":"🏝️","description":"神秘的岛屿"},"adventure":{"name":"帮助朋友","icon":"🤝","description":"帮助需要帮助的朋友"},"equipment":{"name":"背包","icon":"🎒","description":"装东西的背包"}}',
2),

('chapter-adv001-03', 'preset-adventure-001', '森林的信号',
'基地的监测站突然响起警报。工作人员紧张地分析着数据："探测器发回了异常信号，来自森林深处！"小星和朋友们被带到控制中心，屏幕上显示着一段神秘的波形。爷爷通过视频通话告诉小星："孩子，那片森林一直是个谜..."月兔精灵跳到屏幕前，认真地说："这不是普通的信号，是求救信号！"',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的极光"},"terrain":{"name":"森林","icon":"🌲","description":"神秘的森林"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"笔记本","icon":"📓","description":"记录发现"}}',
3),

('chapter-adv001-04', 'preset-adventure-001', '穿越峡谷',
'小星和朋友们乘坐探险车，前往信号源。途中，他们遇到了一片深邃的峡谷。这里到处是奇异的植物和色彩斑斓的蝴蝶。小星用相机记录下这些美丽的瞬间。突然，探险车在峡谷中遇到了障碍，需要徒步前进。月兔精灵说："嘻嘻，真正的探险开始啦！"',
'{"weather":{"name":"白云","icon":"☁️","description":"朵朵白云"},"terrain":{"name":"峡谷","icon":"🏔️","description":"深邃的峡谷"},"adventure":{"name":"徒步","icon":"🚶","description":"徒步旅行"},"equipment":{"name":"相机","icon":"📷","description":"拍摄美景"}}',
4),

('chapter-adv001-05', 'preset-adventure-001', '山洞的秘密',
'探险队终于到达了信号源附近。这里是人类从未踏足过的区域，到处是神秘的洞穴。小星发现了一个隐蔽的山洞入口，洞壁上刻着古老的图案。月兔精灵惊呼："这是...古代探险家留下的印记！"洞穴深处传来微弱的光芒，小星鼓起勇气，第一个走了进去。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"绚丽的夕阳"},"terrain":{"name":"山洞","icon":"🕳️","description":"幽深的山洞"},"adventure":{"name":"解谜","icon":"🧩","description":"解开古老的谜题"},"equipment":{"name":"手电筒","icon":"🔦","description":"照亮黑暗"}}',
5),

('chapter-adv001-06', 'preset-adventure-001', '雪山挑战',
'小星和朋友们深入探索，发现了一座皑皑雪山。这里是极寒之地，保存着古老的秘密。林博士兴奋地说："这些冰层是这片土地最宝贵的资源！"突然，冰层中出现了奇异的光芒，一个由冰晶组成的精灵缓缓浮现。它用古老的语言说道："我是冰晶精灵，守护这片净土已经亿万年..."',
'{"weather":{"name":"雪天","icon":"❄️","description":"银装素裹的雪景"},"terrain":{"name":"雪山","icon":"🏔️","description":"皑皑雪山"},"adventure":{"name":"滑雪","icon":"⛷️","description":"在雪山上滑雪"},"equipment":{"name":"睡袋","icon":"🛏️","description":"野外睡觉"}}',
6),

('chapter-adv001-07', 'preset-adventure-001', '雷暴来袭',
'基地发来紧急警报：一场强烈的雷暴正在接近！所有人员必须立即返回基地避难。小星和朋友们匆忙撤离，但探险车在途中出现了故障。雷暴越来越强，情况危急！月兔精灵突然发光，用神奇的力量保护着大家："快！我能撑住，但时间不多！"小星冷静地分析问题，用随身携带的工具修好了探险车。',
'{"weather":{"name":"雷电","icon":"⛈️","description":"电闪雷鸣"},"terrain":{"name":"草原","icon":"🌿","description":"广阔的草原"},"adventure":{"name":"救援","icon":"🆘","description":"救援被困的朋友"},"equipment":{"name":"急救箱","icon":"🩹","description":"处理伤口"}}',
7),

('chapter-adv001-08', 'preset-adventure-001', '星空下的发现',
'风暴过后，小星再次研究洞穴中发现的晶体。在月兔精灵和冰晶精灵的帮助下，晶体投射出一幅巨大的星图。这是古代探险家留下的记录，标注着无数个神秘地点的位置。爷爷看到星图后激动地说："这是人类梦寐以求的探险地图！"但星图是不完整的，还有几块碎片散落在世界的某个角落。',
'{"weather":{"name":"星空夜","icon":"🌙","description":"繁星点点的夜晚"},"terrain":{"name":"山顶","icon":"⛰️","description":"高耸的山峰"},"adventure":{"name":"观察动物","icon":"🦋","description":"观察可爱的动物"},"equipment":{"name":"天文望远镜","icon":"🔭","description":"观察星空"}}',
8),

('chapter-adv001-09', 'preset-adventure-001', '瀑布后的宝藏',
'在星图的指引下，小星发现了一个惊人的秘密。古代探险家曾经实施过"种子计划"——将特殊的植物种子送往各个神秘地点，为未来的生命做准备。冰晶精灵说："这些种子可以在极端环境下生长，改造环境。"小涛意识到，这可能是保护自然的关键。他决定将这个发现带回基地研究。',
'{"weather":{"name":"彩虹天","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"瀑布","icon":"💦","description":"壮观的瀑布"},"adventure":{"name":"寻宝","icon":"🗺️","description":"寻找隐藏的宝藏"},"equipment":{"name":"水壶","icon":"🥤","description":"装水的水壶"}}',
9),

('chapter-adv001-10', 'preset-adventure-001', '探险家的誓言',
'探险结束了，小星站在基地的观景台上，看着美丽的风景。月兔精灵和冰晶精灵一起出现，郑重地说："小星，你被选为探险守护者。你的使命是保护自然环境，传承探索精神。"小星举起右手，庄严地宣誓："我承诺，守护自然，保护环境，让探索之路永远延续。"爷爷在视频中欣慰地笑了。',
'{"weather":{"name":"流星雨","icon":"🌠","description":"璀璨的流星雨"},"terrain":{"name":"花园","icon":"🌻","description":"美丽的花园"},"adventure":{"name":"露营","icon":"⛺","description":"野外露营探险"},"equipment":{"name":"帐篷","icon":"⛺","description":"露营住所"}}',
10);

-- ============================================
-- 预设章节 - 儿童冒险：星空探险家（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv001-01-en', 'preset-adventure-001-en', 'A Lucky Beginning',
'Leo stood on the golden beach, holding a lottery ticket. He had randomly entered a "Civilian Space Travel" lottery, and he actually won! Professor Nova walked out of his study, looked at his excited grandson, and smiled. "Leo, this is destiny. This telescope... it''s time to pass it to you." Leo took the bronze telescope, and through its lens, he saw a faint glow in the distance. Cosmo, a star sprite, jumped out: "Stellar! Finally found you!"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Beautiful sunny day"},"terrain":{"name":"Beach","icon":"🏖️","description":"Golden beach"},"adventure":{"name":"Explore","icon":"🧭","description":"Explore unknown places"},"equipment":{"name":"Telescope","icon":"🔭","description":"Observe from afar"}}',
1),

('chapter-adv001-02-en', 'preset-adventure-001-en', 'The Mysterious Island',
'Leo traveled by spacecraft to a mysterious island. It was a sight he had never seen before—huge dome buildings where explorers from around the world lived and worked. The base commander explained, "This is an international exploration base with kids from America, China, Europe, Japan, and many more countries." Leo met friends from all over. Cosmo whispered, "These kids are all chosen ones... pretty stellar, right?"',
'{"weather":{"name":"Blue Sky","icon":"🌤️","description":"Clear blue sky"},"terrain":{"name":"Island","icon":"🏝️","description":"Mysterious island"},"adventure":{"name":"Help Friends","icon":"🤝","description":"Help friends in need"},"equipment":{"name":"Backpack","icon":"🎒","description":"Carrying backpack"}}',
2),

('chapter-adv001-03-en', 'preset-adventure-001-en', 'Signal from the Forest',
'Suddenly, alarms blared at the monitoring station. Staff frantically analyzed the data. "The probe has sent an abnormal signal from deep in the forest!" Leo and his friends were brought to the control center. On the screen was a mysterious waveform. Professor Nova video-called and told Leo, "That forest has always been a mystery..." Cosmo jumped onto the screen, serious for once. "This isn''t just any signal—it''s a distress call!"',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular aurora"},"terrain":{"name":"Forest","icon":"🌲","description":"Mysterious forest"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Notebook","icon":"📓","description":"Record discoveries"}}',
3),

('chapter-adv001-04-en', 'preset-adventure-001-en', 'Through the Canyon',
'Leo and friends traveled by exploration vehicle toward the signal source. On the way, they encountered a deep canyon filled with exotic plants and colorful butterflies. Leo recorded these beautiful moments with his camera. Suddenly, the vehicle encountered an obstacle in the canyon, and they had to continue on foot. Cosmo said, "The real adventure begins now!"',
'{"weather":{"name":"Clouds","icon":"☁️","description":"Fluffy clouds"},"terrain":{"name":"Canyon","icon":"🏔️","description":"Deep canyon"},"adventure":{"name":"Hiking","icon":"🚶","description":"Hiking trip"},"equipment":{"name":"Camera","icon":"📷","description":"Capture beautiful scenes"}}',
4),

('chapter-adv001-05-en', 'preset-adventure-001-en', 'Secret of the Cave',
'The expedition finally arrived near the signal source. This was territory humans had never set foot on before, filled with mysterious caves. Leo discovered a hidden cave entrance with ancient patterns carved on the walls. Cosmo exclaimed, "These are... marks left by ancient explorers!" A faint glow came from deep within the cave. Leo gathered his courage and was the first to enter.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Brilliant sunset"},"terrain":{"name":"Cave","icon":"🕳️","description":"Deep cave"},"adventure":{"name":"Solve Puzzles","icon":"🧩","description":"Solve ancient puzzles"},"equipment":{"name":"Flashlight","icon":"🔦","description":"Light up the darkness"}}',
5),

('chapter-adv001-06-en', 'preset-adventure-001-en', 'Snow Mountain Challenge',
'Leo and friends explored deeper and discovered a snow-capped mountain. This was an extremely cold place preserving ancient secrets. Dr. Marina said excitedly, "These ice layers are this land''s most precious resource!" Suddenly, a strange light appeared in the ice, and an ice crystal spirit slowly emerged. It spoke in an ancient language: "I am the Ice Spirit, guardian of this pure land for eons..."',
'{"weather":{"name":"Snow","icon":"❄️","description":"Snow-covered landscape"},"terrain":{"name":"Snow Mountain","icon":"🏔️","description":"Snowy peaks"},"adventure":{"name":"Skiing","icon":"⛷️","description":"Ski on snow mountain"},"equipment":{"name":"Sleeping Bag","icon":"🛏️","description":"Outdoor sleeping"}}',
6),

('chapter-adv001-07-en', 'preset-adventure-001-en', 'Thunderstorm Warning',
'An urgent alert came from the base: a powerful thunderstorm was approaching! All personnel had to return to base immediately. Leo and friends rushed to evacuate, but the exploration vehicle malfunctioned on the way. The thunderstorm grew stronger by the second—the situation was critical! Cosmo suddenly glowed, using magical power to protect everyone. "Hurry! I can hold on, but not for long!" Leo calmly analyzed the problem and repaired the vehicle.',
'{"weather":{"name":"Thunder","icon":"⛈️","description":"Lightning and thunder"},"terrain":{"name":"Grassland","icon":"🌿","description":"Vast grassland"},"adventure":{"name":"Rescue","icon":"🆘","description":"Rescue trapped friends"},"equipment":{"name":"First Aid Kit","icon":"🩹","description":"Treat injuries"}}',
7),

('chapter-adv001-08-en', 'preset-adventure-001-en', 'Discovery Under the Stars',
'After the storm, Leo studied the crystal discovered in the cave. With help from Cosmo and the Ice Spirit, the crystal projected a massive star map. This was a record left by ancient explorers, marking countless mysterious locations. Professor Nova was thrilled: "This is the exploration map humanity has dreamed of!" But the map was incomplete—several fragments were scattered somewhere in the world.',
'{"weather":{"name":"Starry Night","icon":"🌙","description":"Starry night sky"},"terrain":{"name":"Mountain Peak","icon":"⛰️","description":"High mountain peak"},"adventure":{"name":"Observe Animals","icon":"🦋","description":"Observe cute animals"},"equipment":{"name":"Astronomical Telescope","icon":"🔭","description":"Observe the stars"}}',
8),

('chapter-adv001-09-en', 'preset-adventure-001-en', 'Treasure Behind the Waterfall',
'Guided by the star map, Leo discovered an amazing secret. Ancient explorers had implemented a "Seed Project"—sending special plant seeds to various mysterious locations to prepare for future life. The Ice Spirit said, "These seeds can grow in extreme environments and transform the land." Leo realized this could be the key to protecting nature. He decided to bring this discovery back to base.',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Beautiful rainbow"},"terrain":{"name":"Waterfall","icon":"💦","description":"Spectacular waterfall"},"adventure":{"name":"Treasure Hunt","icon":"🗺️","description":"Find hidden treasure"},"equipment":{"name":"Water Bottle","icon":"🥤","description":"Carry water"}}',
9),

('chapter-adv001-10-en', 'preset-adventure-001-en', 'The Explorer''s Oath',
'The expedition ended. Leo stood on the base observation deck, looking at the beautiful scenery. Cosmo and the Ice Spirit appeared together and solemnly said, "Leo, you have been chosen as an Exploration Guardian. Your mission is to protect the natural environment and carry forward the spirit of exploration." Leo raised his right hand and made a solemn oath: "I promise to guard nature, protect the environment, and ensure the journey of exploration continues forever." Professor Nova smiled with pride.',
'{"weather":{"name":"Meteor Shower","icon":"🌠","description":"Brilliant meteor shower"},"terrain":{"name":"Garden","icon":"🌻","description":"Beautiful garden"},"adventure":{"name":"Camping","icon":"⛺","description":"Outdoor camping adventure"},"equipment":{"name":"Tent","icon":"⛺","description":"Camping shelter"}}',
10);

-- ============================================
-- 预设章节 - 儿童冒险：深海探险队（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv002-01', 'preset-adventure-002', '海边的发现',
'海涛站在金色的海滩上，手里拿着一个发光的贝壳。这是他今天早上捡到的，贝壳里传来奇怪的嗡嗡声。林博士走过来，用仪器扫描后惊讶地说："这是深海求救信号！"小螺精灵从贝壳里跳出来，轻声说："大海在呼唤...海洋需要帮助..."海涛的眼睛亮了起来，他知道，一场新的冒险即将开始。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚的好天气"},"terrain":{"name":"海滩","icon":"🏖️","description":"金色的海滩"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"望远镜","icon":"🔭","description":"观察远方"}}',
1),

('chapter-adv002-02', 'preset-adventure-002', '神秘的岛屿',
'林博士带领海涛登上了探险船，前往一座神秘的岛屿。这座岛屿从未有人详细探索过，传说这里隐藏着海洋的秘密。船缓缓航行，海风轻拂，海鸥在天空中自由地飞翔。小螺精灵说："这座岛屿是海洋精灵的家园..."突然，他们发现远处有一片奇怪的迷雾笼罩着岛屿。',
'{"weather":{"name":"白云","icon":"☁️","description":"朵朵白云"},"terrain":{"name":"岛屿","icon":"🏝️","description":"神秘的岛屿"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"指南针","icon":"🧭","description":"辨别方向"}}',
2),

('chapter-adv002-03', 'preset-adventure-002', '热带雨林的奇遇',
'海涛和林博士登上了岛屿，进入了茂密的热带雨林。这里到处是奇异的植物和色彩斑斓的蝴蝶。海涛用相机记录下这些美丽的瞬间。小螺精灵说："热带雨林是地球的肺，无数生命的家园..."突然，他们听到了一阵奇怪的声音，似乎有什么东西在前方等待他们。',
'{"weather":{"name":"彩虹天","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"热带雨林","icon":"🌴","description":"茂密的热带雨林"},"adventure":{"name":"观察动物","icon":"🦋","description":"观察可爱的动物"},"equipment":{"name":"相机","icon":"📷","description":"拍摄美景"}}',
3),

('chapter-adv002-04', 'preset-adventure-002', '珊瑚礁的救援',
'海涛在海滩边发现了一片美丽的珊瑚礁，但让他震惊的是，曾经五彩斑斓的珊瑚已经变得苍白。林博士叹了口气："这是珊瑚白化现象。"突然，他们发现一只小海龟被废弃的渔网缠住了！海涛立即行动，小心翼翼地解开了渔网。重获自由的小海龟欢快地游走了。',
'{"weather":{"name":"蓝天","icon":"🌤️","description":"湛蓝的天空"},"terrain":{"name":"海滩","icon":"🏖️","description":"金色的海滩"},"adventure":{"name":"救援","icon":"🆘","description":"救援被困的朋友"},"equipment":{"name":"急救箱","icon":"🩹","description":"处理伤口"}}',
4),

('chapter-adv002-05', 'preset-adventure-002', '古堡的秘密',
'海涛深入探索岛屿，发现了一座古老的城堡废墟。城堡看起来已经荒废了很久，但依然保持着它的神秘。海涛打开手电筒，小心翼翼地走了进去。城堡里到处是灰尘和蜘蛛网，但墙上挂着的画像似乎在诉说着过去的故事。小螺精灵突然停下脚步，对着一个角落说："那里有东西..."',
'{"weather":{"name":"星空夜","icon":"🌙","description":"繁星点点的夜晚"},"terrain":{"name":"古堡","icon":"🏰","description":"古老的城堡"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"手电筒","icon":"🔦","description":"照亮黑暗"}}',
5),

('chapter-adv002-06', 'preset-adventure-002', '废墟中的线索',
'海涛在废墟中发现了一个古老的笔记本。笔记本上记载着关于这座岛屿的历史，以及一个隐藏宝藏的线索。海涛仔细阅读每一页，把重要的信息记在心里。废墟虽然破败，但每一块石头似乎都在诉说着古老的故事。小螺精灵在一旁安静地陪伴着他。',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的极光"},"terrain":{"name":"废墟","icon":"🏚️","description":"神秘的废墟"},"adventure":{"name":"解谜","icon":"🧩","description":"解开古老的谜题"},"equipment":{"name":"笔记本","icon":"📓","description":"记录发现"}}',
6),

('chapter-adv002-07', 'preset-adventure-002', '洞穴探险',
'海涛根据线索来到了一个幽暗的洞穴。洞穴里很黑，但海涛的灯具帮助他看清了周围。洞穴的墙壁上刻着奇怪的符号，似乎是某种古老的地图。小螺精灵说："这些符号指向海洋精灵的圣地..."海涛决定深入探索，看看洞穴深处隐藏着什么。',
'{"weather":{"name":"晨雾","icon":"🌫️","description":"朦胧的晨雾"},"terrain":{"name":"洞穴","icon":"🪨","description":"幽暗的洞穴"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"灯具","icon":"💡","description":"照明设备"}}',
7),

('chapter-adv002-08', 'preset-adventure-002', '瀑布后的发现',
'海涛来到了壮观的瀑布前。他发现瀑布后面有一个隐蔽的洞穴入口。进入洞穴后，他惊讶地发现这里是一个巨大的地下空间，中央有一个发光的水晶祭坛。小螺精灵说："这是海洋精灵的圣地！"祭坛上放着一块古老的石板，记载着保护海洋的秘密。',
'{"weather":{"name":"彩虹雨","icon":"🌦️","description":"雨后彩虹"},"terrain":{"name":"瀑布","icon":"💦","description":"壮观的瀑布"},"adventure":{"name":"寻宝","icon":"🗺️","description":"寻找隐藏的宝藏"},"equipment":{"name":"水壶","icon":"🥤","description":"装水的水壶"}}',
8),

('chapter-adv002-09', 'preset-adventure-002', '山顶的风景',
'海涛用绳子和工具攀登到岛屿的山顶。站在山顶，他看到了整个岛屿的全貌，也发现了海洋污染的问题。山顶的风很大，但风景美得让人忘记了疲惫。小螺精灵说："海洋需要我们的帮助..."海涛决定将发现的问题报告给林博士，一起想办法保护海洋。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"绚丽的夕阳"},"terrain":{"name":"山顶","icon":"⛰️","description":"高耸的山峰"},"adventure":{"name":"登山","icon":"🧗","description":"攀登高峰"},"equipment":{"name":"绳子","icon":"🪢","description":"攀爬工具"}}',
9),

('chapter-adv002-10', 'preset-adventure-002', '海洋守护者',
'探险结束了，海涛站在海滩上，看着蔚蓝的大海。小螺精灵郑重地说："海涛，你现在是真正的海洋守护者了。记住，保护海洋是每个人的责任。"林博士拍了拍海涛的肩膀："这次探险的发现，将帮助人类更好地保护海洋。"海涛看着游过的海龟，心中充满了希望。',
'{"weather":{"name":"流星雨","icon":"🌠","description":"璀璨的流星雨"},"terrain":{"name":"彩虹谷","icon":"🌈","description":"五彩斑斓的山谷"},"adventure":{"name":"比赛","icon":"🏆","description":"参加精彩的比赛"},"equipment":{"name":"帐篷","icon":"⛺","description":"露营住所"}}',
10);

-- ============================================
-- 预设章节 - 儿童冒险：深海探险队（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv002-01-en', 'preset-adventure-002-en', 'Discovery at the Beach',
'Finn stood on the golden beach, holding a glowing seashell he had found that morning. Strange buzzing sounds came from inside. Dr. Marina walked over, scanned it with her instrument, and said in surprise, "This is a deep-sea distress signal!" Shell, an ocean spirit, jumped out from the seashell and whispered, "The ocean is calling... the sea needs help..." Finn''s eyes lit up. He knew a new adventure was about to begin.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Beautiful sunny day"},"terrain":{"name":"Beach","icon":"🏖️","description":"Golden beach"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Telescope","icon":"🔭","description":"Observe from afar"}}',
1),

('chapter-adv002-02-en', 'preset-adventure-002-en', 'The Mysterious Island',
'Dr. Marina led Finn aboard an exploration ship heading to a mysterious island. This island had never been thoroughly explored, and legend said it held secrets of the ocean. The ship sailed slowly, sea breeze blowing gently, seagulls flying freely in the sky. Shell said, "This island is home to ocean spirits..." Suddenly, they noticed strange fog surrounding the island.',
'{"weather":{"name":"Clouds","icon":"☁️","description":"Fluffy clouds"},"terrain":{"name":"Island","icon":"🏝️","description":"Mysterious island"},"adventure":{"name":"Explore","icon":"🧭","description":"Explore unknown places"},"equipment":{"name":"Compass","icon":"🧭","description":"Find direction"}}',
2),

('chapter-adv002-03-en', 'preset-adventure-002-en', 'Rainforest Adventure',
'Finn and Dr. Marina landed on the island and entered a dense tropical rainforest. Everywhere were exotic plants and colorful butterflies. Finn recorded these beautiful moments with his camera. Shell said, "Rainforests are the lungs of the Earth, home to countless lives..." Suddenly, they heard strange sounds, as if something was waiting ahead.',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Beautiful rainbow"},"terrain":{"name":"Rainforest","icon":"🌴","description":"Dense tropical rainforest"},"adventure":{"name":"Observe Animals","icon":"🦋","description":"Observe cute animals"},"equipment":{"name":"Camera","icon":"📷","description":"Capture beautiful scenes"}}',
3),

('chapter-adv002-04-en', 'preset-adventure-002-en', 'Coral Reef Rescue',
'Finn discovered a beautiful coral reef by the beach, but was shocked to find the once-colorful corals had turned pale. Dr. Marina sighed, "This is coral bleaching." Suddenly, they found a small sea turtle tangled in abandoned fishing nets! Finn immediately took action, carefully untangling the nets. The freed sea turtle swam away happily.',
'{"weather":{"name":"Blue Sky","icon":"🌤️","description":"Clear blue sky"},"terrain":{"name":"Beach","icon":"🏖️","description":"Golden beach"},"adventure":{"name":"Rescue","icon":"🆘","description":"Rescue trapped friends"},"equipment":{"name":"First Aid Kit","icon":"🩹","description":"Treat injuries"}}',
4),

('chapter-adv002-05-en', 'preset-adventure-002-en', 'Secret of the Castle',
'Finn explored deeper into the island and discovered an ancient castle ruin. The castle looked long abandoned but still held its mystery. Finn turned on his flashlight and carefully entered. The castle was full of dust and cobwebs, but paintings on the walls seemed to tell stories of the past. Shell suddenly stopped and said to a corner, "There''s something there..."',
'{"weather":{"name":"Starry Night","icon":"🌙","description":"Starry night sky"},"terrain":{"name":"Castle","icon":"🏰","description":"Ancient castle"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Flashlight","icon":"🔦","description":"Light up the darkness"}}',
5),

('chapter-adv002-06-en', 'preset-adventure-002-en', 'Clues in the Ruins',
'In the ruins, Finn discovered an ancient notebook. It recorded the island''s history and clues to a hidden treasure. Finn carefully read every page, memorizing important information. Though the ruins were dilapidated, every stone seemed to tell an ancient story. Shell quietly accompanied him.',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Spectacular aurora"},"terrain":{"name":"Ruins","icon":"🏚️","description":"Mysterious ruins"},"adventure":{"name":"Solve Puzzles","icon":"🧩","description":"Solve ancient puzzles"},"equipment":{"name":"Notebook","icon":"📓","description":"Record discoveries"}}',
6),

('chapter-adv002-07-en', 'preset-adventure-002-en', 'Cave Exploration',
'Following the clues, Finn arrived at a dark cave. The cave was dark, but Finn''s light helped him see. Strange symbols were carved on the walls, seeming to be some kind of ancient map. Shell said, "These symbols point to the ocean spirits'' sacred place..." Finn decided to explore deeper.',
'{"weather":{"name":"Morning Fog","icon":"🌫️","description":"Hazy morning fog"},"terrain":{"name":"Cave","icon":"🪨","description":"Dark cave"},"adventure":{"name":"Explore","icon":"🧭","description":"Explore unknown places"},"equipment":{"name":"Light","icon":"💡","description":"Lighting equipment"}}',
7),

('chapter-adv002-08-en', 'preset-adventure-002-en', 'Discovery Behind the Waterfall',
'Finn arrived at a spectacular waterfall. He discovered a hidden cave entrance behind it. Inside, he was amazed to find a massive underground space with a glowing crystal altar in the center. Shell said, "This is the ocean spirits'' sacred place!" On the altar lay an ancient stone tablet recording secrets of protecting the ocean.',
'{"weather":{"name":"Rainbow Rain","icon":"🌦️","description":"Rainbow after rain"},"terrain":{"name":"Waterfall","icon":"💦","description":"Spectacular waterfall"},"adventure":{"name":"Treasure Hunt","icon":"🗺️","description":"Find hidden treasure"},"equipment":{"name":"Water Bottle","icon":"🥤","description":"Carry water"}}',
8),

('chapter-adv002-09-en', 'preset-adventure-002-en', 'View from the Peak',
'Finn climbed to the island''s peak using rope and tools. Standing at the summit, he saw the entire island and discovered the problem of ocean pollution. The wind was strong, but the view was so beautiful he forgot his fatigue. Shell said, "The ocean needs our help..." Finn decided to report the findings to Dr. Marina.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Brilliant sunset"},"terrain":{"name":"Mountain Peak","icon":"⛰️","description":"High mountain peak"},"adventure":{"name":"Climbing","icon":"🧗","description":"Climb peaks"},"equipment":{"name":"Rope","icon":"🪢","description":"Climbing tool"}}',
9),

('chapter-adv002-10-en', 'preset-adventure-002-en', 'Ocean Guardian',
'The expedition ended. Finn stood on the beach, looking at the blue ocean. Shell solemnly said, "Finn, you are now a true Ocean Guardian. Remember, protecting the ocean is everyone''s responsibility." Dr. Marina patted Finn''s shoulder, "The discoveries from this expedition will help humans better protect the ocean." Finn watched a sea turtle swim by, filled with hope.',
'{"weather":{"name":"Meteor Shower","icon":"🌠","description":"Brilliant meteor shower"},"terrain":{"name":"Rainbow Valley","icon":"🌈","description":"Colorful valley"},"adventure":{"name":"Competition","icon":"🏆","description":"Participate in competition"},"equipment":{"name":"Tent","icon":"⛺","description":"Camping shelter"}}',
10);

-- ============================================
-- 预设章节 - 魔幻传说：AI魔法学院（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan001-01', 'preset-fantasy-001', '入学考试',
'云墨站在魔法学院的大门前，紧张地握着手中的魔杖。今天是入学考试的日子，据说今年的考试引入了"智能评估系统"。玄机长老严肃地说："今年的考试将测试你们对传统魔法与新技术的理解。"云墨深吸一口气，走进了考场。考官递给他一根发光的智能魔杖，小灵精灵从魔杖中跳出来："你好呀！我是小灵，以后就是你的伙伴啦~"',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的魔法极光"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"魔法测试","icon":"📝","description":"通过魔法试炼"},"equipment":{"name":"魔杖","icon":"🪄","description":"施展魔法的法杖"}}',
1),

('chapter-fan001-02', 'preset-fantasy-001', '第一根魔杖',
'云墨获得了他的第一根智能魔杖。这根魔杖能够自主学习，自动记录施法数据，甚至能给出施法建议。但玄机长老警告道："记住，魔杖只是工具，真正的魔法来自内心。"云墨开始学习基础魔法，小灵精灵总是忍不住插嘴："我查了一下，这个咒语的正确发音是..."云墨发现，过度依赖智能魔杖，反而让他的施法变得僵硬。',
'{"weather":{"name":"元素乱流","icon":"⚡","description":"元素能量涌动"},"terrain":{"name":"魔法森林","icon":"🌳","description":"充满魔法的森林"},"adventure":{"name":"魔法研究","icon":"📚","description":"研究古老的魔法"},"equipment":{"name":"法典","icon":"📖","description":"记载魔法的书籍"}}',
2),

('chapter-fan001-03', 'preset-fantasy-001', '精灵村落的友谊',
'云墨在精灵村落第一次见到了传说中的精灵族。他们优雅而神秘，与自然和谐共处。一位精灵长老走到云墨面前，将一颗水晶球交给他。长老说："这是精灵的祝福，它会指引你找到真正的力量。"云墨感受到水晶球中蕴含的纯净魔力，心中充满感激。小灵精灵说："原来魔法不只是数据..."',
'{"weather":{"name":"精灵光","icon":"🧚","description":"精灵的光芒"},"terrain":{"name":"精灵村落","icon":"🧚","description":"精灵的家园"},"adventure":{"name":"精灵结盟","icon":"🧚","description":"与精灵结为盟友"},"equipment":{"name":"水晶球","icon":"🔮","description":"占卜和储存魔力"}}',
3),

('chapter-fan001-04', 'preset-fantasy-001', '元素觉醒',
'云墨在水晶洞穴深处发现了一颗元素宝石，它散发着四种元素的光芒。当他触碰宝石的瞬间，一股强大的力量涌入他的身体。火焰、水流、风刃、岩石——四种元素在他周围旋转，他终于觉醒了元素之力。小灵精灵惊讶地说："你的元素数据...超出了我的计算范围！"',
'{"weather":{"name":"魔法雨","icon":"💧","description":"充满魔力的雨水"},"terrain":{"name":"水晶洞穴","icon":"💎","description":"水晶闪耀的洞穴"},"adventure":{"name":"元素觉醒","icon":"🔥","description":"掌控元素之力"},"equipment":{"name":"元素宝石","icon":"💠","description":"储存元素之力"}}',
4),

('chapter-fan001-05', 'preset-fantasy-001', '深渊的考验',
'血红色的月亮悬挂在深渊上空，云墨站在深渊边缘，感受着来自深处的召唤。玄机长老告诉他，只有战胜内心的恐惧，才能获得真正的力量。云墨握紧护身符，纵身跳入深渊。在黑暗中，他看到了自己最害怕的东西，但他没有退缩，而是勇敢地面对。',
'{"weather":{"name":"血月","icon":"🔴","description":"神秘的血月之夜"},"terrain":{"name":"深渊","icon":"🕳️","description":"无尽的深渊"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒隐藏的力量"},"equipment":{"name":"护身符","icon":"🧿","description":"保护佩戴者"}}',
5),

('chapter-fan001-06', 'preset-fantasy-001', '魔杖失控事件',
'学院发生了一起严重事故：一根智能魔杖过度学习后开始自主行动，不受控制地施放危险魔法。云墨和同学们被困在教室里，智能魔杖们纷纷失控。关键时刻，云墨放下智能魔杖，用从古书中学到的传统魔法保护了大家。小灵精灵震惊地说："你...你没用我？"云墨说："有些时候，需要相信自己的力量。"',
'{"weather":{"name":"魔法风暴","icon":"🌀","description":"充满魔力的风暴"},"terrain":{"name":"天空城","icon":"🏰","description":"云端的城市"},"adventure":{"name":"封印恶魔","icon":"😈","description":"封印邪恶的恶魔"},"equipment":{"name":"封印卷轴","icon":"📜","description":"封印邪恶"}}',
6),

('chapter-fan001-07', 'preset-fantasy-001', '传统与创新',
'事故之后，学院开始反思智能魔杖的使用。云墨提出了一个大胆的想法：将传统魔法与智能魔杖结合，创造一种新的施法方式。玄机长老起初反对，但看到云墨的演示后，沉默了许久。云墨展示了一种"人杖合一"的魔法，智能魔杖辅助施法，但核心力量来自施法者本人。',
'{"weather":{"name":"光明普照","icon":"✨","description":"神圣的光芒"},"terrain":{"name":"神殿","icon":"⛩️","description":"神圣的殿堂"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护重要的东西"},"equipment":{"name":"法师帽","icon":"🎩","description":"增强魔力"}}',
7),

('chapter-fan001-08', 'preset-fantasy-001', '黑暗魔杖的诱惑',
'一个神秘的黑袍人找到云墨，递给他一根"黑暗智能魔杖"。他说："这根魔杖能让你成为最强大的魔法师，只要放弃那些无聊的道德束缚。"云墨感受到黑暗魔杖的强大力量，内心动摇。小灵精灵警告："这根魔杖的数据显示，它会吞噬使用者的灵魂！"云墨最终拒绝了诱惑。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"暗影沼泽","icon":"🌑","description":"阴暗的沼泽"},"adventure":{"name":"魔法对决","icon":"⚡","description":"魔法师的决斗"},"equipment":{"name":"魔法披风","icon":"🧥","description":"隐身和防护"}}',
8),

('chapter-fan001-09', 'preset-fantasy-001', '融合之道',
'云墨终于掌握了"人杖合一"的魔法体系。他发现，当施法者与智能魔杖真正心意相通时，能施展出超越传统和新技术的魔法。小灵精灵说："我现在明白了...不是我在帮你，而是我们一起创造魔法。"云墨在学院的魔法大赛中，用融合魔法击败了所有对手。',
'{"weather":{"name":"星辰坠落","icon":"💫","description":"星辰从天而降"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"屠龙","icon":"🐉","description":"挑战巨龙"},"equipment":{"name":"龙鳞甲","icon":"🛡️","description":"龙鳞制成的护甲"}}',
9),

('chapter-fan001-10', 'preset-fantasy-001', '新时代的魔法师',
'毕业典礼上，云墨被授予"新时代魔法师"的称号。玄机长老说："你证明了传统与创新可以共存，人类与工具可以协作。"小灵精灵已经进化成一个真正的魔法伙伴，不再只是一个辅助工具。云墨举起融合魔杖，向天空施放了一道绚丽的魔法——那是传统魔法与智能技术的完美结合。',
'{"weather":{"name":"创世晨曦","icon":"🌅","description":"创世之初的光芒"},"terrain":{"name":"元素位面","icon":"🔥","description":"元素的世界"},"adventure":{"name":"元素融合","icon":"🌈","description":"融合元素之力"},"equipment":{"name":"元素法杖","icon":"🔥","description":"操控元素"}}',
10);

-- ============================================
-- 预设章节 - 魔幻传说：AI魔法学院（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan001-01-en', 'preset-fantasy-001-en', 'The Entrance Exam',
'Alex stood before the Academy gates, nervously clutching their wand. Today was entrance exam day, and rumor had it this year''s exam featured a new "Smart Assessment System." Master Eldrin said sternly, "This year''s exam will test your understanding of both traditional magic and new technology." Alex took a deep breath and entered the exam hall. The examiner handed them a glowing smart wand. Spark, a wand spirit, jumped out: "Hey there! I''m Spark, your new companion! #BestDayEver!"',
'{"weather":{"name":"Aurora","icon":"🌌","description":"Magical aurora"},"terrain":{"name":"Magic Tower","icon":"🗼","description":"Tall magic tower"},"adventure":{"name":"Magic Test","icon":"📝","description":"Pass magic trial"},"equipment":{"name":"Wand","icon":"🪄","description":"Cast magic spells"}}',
1),

('chapter-fan001-02-en', 'preset-fantasy-001-en', 'The First Wand',
'Alex received their first smart wand. It could learn autonomously, record spell data, and even give casting suggestions. But Master Eldrin warned, "Remember, the wand is just a tool. True magic comes from within." Alex began learning basic spells, but Spark kept interrupting: "I looked it up, the correct pronunciation is..." Alex realized that over-relying on the smart wand was actually making their casting rigid.',
'{"weather":{"name":"Elemental Turbulence","icon":"⚡","description":"Elemental energy surge"},"terrain":{"name":"Magic Forest","icon":"🌳","description":"Magical forest"},"adventure":{"name":"Magic Research","icon":"📚","description":"Study ancient magic"},"equipment":{"name":"Grimoire","icon":"📖","description":"Book of magic"}}',
2),

('chapter-fan001-03-en', 'preset-fantasy-001-en', 'Friendship in the Elf Village',
'In the elf village, Alex met the legendary elves for the first time. They were elegant and mysterious, living in harmony with nature. An elder elf approached Alex and handed them a crystal ball. The elder said, "This is the elves'' blessing. It will guide you to find true power." Alex felt the pure magic within the crystal ball. Spark said, "So magic isn''t just data..."',
'{"weather":{"name":"Elf Light","icon":"🧚","description":"Elven glow"},"terrain":{"name":"Elf Village","icon":"🧚","description":"Elven home"},"adventure":{"name":"Elf Alliance","icon":"🧚","description":"Form alliance with elves"},"equipment":{"name":"Crystal Ball","icon":"🔮","description":"Divination and magic storage"}}',
3),

('chapter-fan001-04-en', 'preset-fantasy-001-en', 'Elemental Awakening',
'Deep in the crystal cave, Alex discovered an elemental gem radiating four elemental lights. When they touched the gem, a powerful force surged through their body. Fire, water, wind, earth—four elements swirled around them as they finally awakened elemental power. Spark said in surprise, "Your elemental data... exceeds my calculation range!"',
'{"weather":{"name":"Magic Rain","icon":"💧","description":"Magical rain"},"terrain":{"name":"Crystal Cave","icon":"💎","description":"Sparkling crystal cave"},"adventure":{"name":"Elemental Awakening","icon":"🔥","description":"Control elemental power"},"equipment":{"name":"Elemental Gem","icon":"💠","description":"Store elemental power"}}',
4),

('chapter-fan001-05-en', 'preset-fantasy-001-en', 'Test of the Abyss',
'A blood-red moon hung over the abyss. Alex stood at the edge, feeling the call from below. Master Eldrin told them that only by conquering inner fear could they gain true power. Alex gripped their amulet and leaped into the abyss. In the darkness, they faced their greatest fears but did not retreat.',
'{"weather":{"name":"Blood Moon","icon":"🔴","description":"Mysterious blood moon night"},"terrain":{"name":"Abyss","icon":"🕳️","description":"Endless abyss"},"adventure":{"name":"Awaken Power","icon":"💫","description":"Awaken hidden power"},"equipment":{"name":"Amulet","icon":"🧿","description":"Protect the wearer"}}',
5),

('chapter-fan001-06-en', 'preset-fantasy-001-en', 'The Wand Goes Rogue',
'A serious accident occurred at the academy: a smart wand had over-learned and started acting autonomously, casting dangerous spells uncontrollably. Alex and classmates were trapped as smart wands went haywire. In the critical moment, Alex put down their smart wand and used traditional magic to protect everyone. Spark was shocked: "You... you didn''t use me?" Alex said, "Sometimes, you need to trust your own power."',
'{"weather":{"name":"Magic Storm","icon":"🌀","description":"Magical storm"},"terrain":{"name":"Sky City","icon":"🏰","description":"City in the clouds"},"adventure":{"name":"Seal Demon","icon":"😈","description":"Seal evil demon"},"equipment":{"name":"Seal Scroll","icon":"📜","description":"Seal evil"}}',
6),

('chapter-fan001-07-en', 'preset-fantasy-001-en', 'Tradition Meets Innovation',
'After the accident, the academy began reflecting on smart wand usage. Alex proposed a bold idea: combining traditional magic with smart wands to create a new casting method. Master Eldrin initially opposed it, but after watching Alex''s demonstration, fell silent. Alex showed a "wand-caster unity" magic where the smart wand assisted casting, but the core power came from the caster.',
'{"weather":{"name":"Divine Light","icon":"✨","description":"Sacred light"},"terrain":{"name":"Temple","icon":"⛩️","description":"Sacred hall"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Guard important things"},"equipment":{"name":"Wizard Hat","icon":"🎩","description":"Enhance magic"}}',
7),

('chapter-fan001-08-en', 'preset-fantasy-001-en', 'The Dark Wand''s Temptation',
'A mysterious cloaked figure found Alex and handed them a "dark smart wand." They said, "This wand will make you the most powerful mage, just abandon those boring moral constraints." Alex felt the dark wand''s immense power and wavered. Spark warned, "This wand''s data shows it consumes the user''s soul!" Alex ultimately rejected the temptation.',
'{"weather":{"name":"Darkness Falls","icon":"🌑","description":"Endless darkness"},"terrain":{"name":"Shadow Swamp","icon":"🌑","description":"Dark swamp"},"adventure":{"name":"Magic Duel","icon":"⚡","description":"Mage duel"},"equipment":{"name":"Magic Cloak","icon":"🧥","description":"Invisibility and protection"}}',
8),

('chapter-fan001-09-en', 'preset-fantasy-001-en', 'The Path of Fusion',
'Alex finally mastered the "wand-caster unity" magic system. They discovered that when caster and smart wand truly connected, they could cast magic surpassing both tradition and technology. Spark said, "Now I understand... I''m not helping you, we''re creating magic together." In the academy''s magic tournament, Alex used fusion magic to defeat all opponents.',
'{"weather":{"name":"Falling Stars","icon":"💫","description":"Stars falling from sky"},"terrain":{"name":"Dragon Nest","icon":"🐉","description":"Dragon lair"},"adventure":{"name":"Dragon Slaying","icon":"🐉","description":"Challenge dragon"},"equipment":{"name":"Dragon Scale Armor","icon":"🛡️","description":"Armor from dragon scales"}}',
9),

('chapter-fan001-10-en', 'preset-fantasy-001-en', 'Mage of the New Era',
'At graduation, Alex was awarded the title "Mage of the New Era." Master Eldrin said, "You proved that tradition and innovation can coexist, that humans and tools can collaborate." Spark had evolved into a true magical companion. Alex raised their fusion wand and cast a brilliant spell into the sky—a perfect combination of traditional magic and smart technology.',
'{"weather":{"name":"Genesis Dawn","icon":"🌅","description":"Light of creation"},"terrain":{"name":"Elemental Plane","icon":"🔥","description":"Elemental world"},"adventure":{"name":"Elemental Fusion","icon":"🌈","description":"Fuse elemental power"},"equipment":{"name":"Elemental Staff","icon":"🔥","description":"Control elements"}}',
10);

-- ============================================
-- 预设章节 - 魔幻传说：平行世界的我（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan002-01', 'preset-fantasy-002', '镜中的自己',
'陈星河站在古老的镜子前，镜面泛起奇异的波纹。这是他在古董店里发现的一面神秘镜子，据说能照出人的内心。突然，镜中的自己动了——但星河明明站着没动！镜中的"他"微笑着说："你好，另一个我。"星河惊恐地后退，却发现自己被一股力量吸入了镜中。',
'{"weather":{"name":"时空裂隙","icon":"🌀","description":"时空扭曲的裂缝"},"terrain":{"name":"镜像空间","icon":"🪞","description":"镜像的世界"},"adventure":{"name":"穿越异界","icon":"🌀","description":"穿越到另一个世界"},"equipment":{"name":"护身符","icon":"🧿","description":"保护佩戴者"}}',
1),

('chapter-fan002-02', 'preset-fantasy-002', '另一个世界',
'星河睁开眼睛，发现自己站在一个熟悉又陌生的城市里。这里的建筑和街道都和他的世界一样，但细节却处处不同。街上的广告牌显示着不同的明星，商店里卖着从未见过的产品。另一个星河站在他面前，自信地笑着说："欢迎来到我的世界，在这里，我是校园明星，而你...是个透明人。"',
'{"weather":{"name":"永恒黄昏","icon":"🌆","description":"永不消逝的黄昏"},"terrain":{"name":"异世界","icon":"🌀","description":"另一个维度"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"传送卷轴","icon":"📜","description":"瞬间传送"}}',
2),

('chapter-fan002-03', 'preset-fantasy-002', '两种人生',
'星河开始了解这个平行世界。在这里，另一个星河是学校的风云人物，成绩优秀、朋友众多、还是篮球队队长。而星河原本的世界里，他只是一个安静内向的普通学生。时空守护者出现在他面前，神秘地说："每个选择都会创造一个新的世界，你看到的是另一种可能。"',
'{"weather":{"name":"觉醒之光","icon":"💫","description":"力量觉醒的光芒"},"terrain":{"name":"魔法森林","icon":"🌳","description":"充满魔法的森林"},"adventure":{"name":"魔法研究","icon":"📚","description":"研究古老的魔法"},"equipment":{"name":"法典","icon":"📖","description":"记载魔法的书籍"}}',
3),

('chapter-fan002-04', 'preset-fantasy-002', '交换的秘密',
'另一个星河告诉星河一个秘密：他一直羡慕星河的平静生活。"你有没有想过，我也许厌倦了这种被所有人关注的日子？"另一个星河说，"有时候，我只想一个人静静地看书。"星河第一次发现，原来光鲜亮丽的外表下，也有不为人知的孤独。',
'{"weather":{"name":"精灵光","icon":"🧚","description":"精灵的光芒"},"terrain":{"name":"精灵村落","icon":"🧚","description":"精灵的家园"},"adventure":{"name":"精灵结盟","icon":"🧚","description":"与精灵结为盟友"},"equipment":{"name":"水晶球","icon":"🔮","description":"占卜和储存魔力"}}',
4),

('chapter-fan002-05', 'preset-fantasy-002', '时空的警告',
'时空守护者再次出现，警告星河："你不能永远留在这里。两个世界的平衡正在被打破，如果继续下去，两个世界都会崩溃。"星河必须做出选择：是回到自己平凡的世界，还是想办法让两个世界共存？另一个星河说："也许...我们可以找到第三条路。"',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"时间裂缝","icon":"⏳","description":"时间扭曲之地"},"adventure":{"name":"解除诅咒","icon":"🔮","description":"解除古老的诅咒"},"equipment":{"name":"召唤石","icon":"💎","description":"召唤生物"}}',
5),

('chapter-fan002-06', 'preset-fantasy-002', '记忆的碎片',
'星河和另一个星河一起探索时空裂缝，寻找解决问题的方法。在裂缝中，他们看到了无数个平行世界的碎片——每一个都是星河做出不同选择后的结果。有的世界里星河成了音乐家，有的世界里他成了科学家，还有的世界里他什么都不是。时空守护者说："这些是所有可能的你。"',
'{"weather":{"name":"灵魂雾","icon":"👻","description":"充满灵魂的迷雾"},"terrain":{"name":"深渊","icon":"🕳️","description":"无尽的深渊"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒隐藏的力量"},"equipment":{"name":"灵魂石","icon":"💜","description":"储存灵魂"}}',
6),

('chapter-fan002-07', 'preset-fantasy-002', '融合的可能',
'在探索中，星河发现了一个惊人的真相：他和另一个星河其实是同一个灵魂的两个部分，只是在不同的选择中分裂了。时空守护者说："你们可以选择融合，成为完整的自己。但融合意味着两个独立的意识将合二为一。"星河和另一个星河对视，都在思考这个选择的含义。',
'{"weather":{"name":"光明普照","icon":"✨","description":"神圣的光芒"},"terrain":{"name":"神殿","icon":"⛩️","description":"神圣的殿堂"},"adventure":{"name":"元素融合","icon":"🌈","description":"融合元素之力"},"equipment":{"name":"元素宝石","icon":"💠","description":"储存元素之力"}}',
7),

('chapter-fan002-08', 'preset-fantasy-002', '最后的考验',
'时空守护者给了星河最后一个考验：他必须独自面对自己最深的恐惧。在魔法风暴中，星河看到了自己害怕的一切——被拒绝、被遗忘、被嘲笑。但他发现，另一个星河也在面对同样的恐惧。原来，无论外表如何，内心的脆弱是相通的。',
'{"weather":{"name":"魔法风暴","icon":"🌀","description":"充满魔力的风暴"},"terrain":{"name":"浮空岛","icon":"🏝️","description":"漂浮在空中的岛屿"},"adventure":{"name":"元素试炼","icon":"🔥","description":"元素之神的考验"},"equipment":{"name":"魔法披风","icon":"🧥","description":"隐身和防护"}}',
8),

('chapter-fan002-09', 'preset-fantasy-002', '选择与牺牲',
'星河做出了决定：他选择融合。但融合意味着另一个星河将不再独立存在。另一个星河微笑着说："没关系，我本来就是你的一部分。我们融合后，你会拥有我们两个人的记忆和经历，成为更完整的自己。"在传送门的光芒中，两个星河慢慢靠近。',
'{"weather":{"name":"传送门光","icon":"🌀","description":"传送门的神秘光芒"},"terrain":{"name":"封印之地","icon":"🔒","description":"封印恶魔的地方"},"adventure":{"name":"灵魂救赎","icon":"👼","description":"救赎迷失的灵魂"},"equipment":{"name":"传送门符","icon":"🌀","description":"开启传送门"}}',
9),

('chapter-fan002-10', 'preset-fantasy-002', '完整的自己',
'星河回到了自己的世界，但他已经不再是原来那个内向害羞的少年了。他拥有了另一个自己的自信和勇气，也保留了自己的敏感和善良。时空守护者最后出现，说："记住，每个选择都有价值，每个你都是真实的。现在，去创造属于你的故事吧。"星河看着镜子，微笑着说："你好，完整的我。"',
'{"weather":{"name":"创世晨曦","icon":"🌅","description":"创世之初的光芒"},"terrain":{"name":"天空城","icon":"🏰","description":"云端的城市"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护重要的东西"},"equipment":{"name":"精灵戒指","icon":"💍","description":"精灵的祝福"}}',
10);

-- ============================================
-- 预设章节 - 魔幻传说：平行世界的我（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fan002-01-en', 'preset-fantasy-002-en', 'The Self in the Mirror',
'Alex stood before an ancient mirror, its surface rippling strangely. He had found this mysterious mirror in an antique shop, said to reflect one''s true self. Suddenly, his reflection moved—but Alex was standing still! The reflection smiled: "Hello, other me." Alex stumbled backward in horror as a force pulled him into the mirror.',
'{"weather":{"name":"Time Rift","icon":"🌀","description":"Time-space distortion"},"terrain":{"name":"Mirror Space","icon":"🪞","description":"Mirror world"},"adventure":{"name":"Cross Worlds","icon":"🌀","description":"Travel to another world"},"equipment":{"name":"Amulet","icon":"🧿","description":"Protect the wearer"}}',
1),

('chapter-fan002-02-en', 'preset-fantasy-002-en', 'Another World',
'Alex opened his eyes to find himself in a city both familiar and strange. The buildings and streets were the same, but details differed everywhere. Billboards showed different celebrities, shops sold products he''d never seen. Other Alex stood before him, smiling confidently: "Welcome to my world. Here, I''m a campus star, and you... you''re invisible."',
'{"weather":{"name":"Eternal Dusk","icon":"🌆","description":"Never-ending dusk"},"terrain":{"name":"Other World","icon":"🌀","description":"Another dimension"},"adventure":{"name":"Discover Secrets","icon":"🔮","description":"Uncover hidden secrets"},"equipment":{"name":"Teleport Scroll","icon":"📜","description":"Instant teleport"}}',
2),

('chapter-fan002-03-en', 'preset-fantasy-002-en', 'Two Lives',
'Alex began understanding this parallel world. Here, Other Alex was the school''s golden child—top grades, popular friends, basketball captain. In Alex''s original world, he was just a quiet, introverted ordinary student. The Keeper appeared, saying mysteriously: "Every choice creates a new world. What you see is another possibility."',
'{"weather":{"name":"Awakening Light","icon":"💫","description":"Power awakening glow"},"terrain":{"name":"Magic Forest","icon":"🌳","description":"Magical forest"},"adventure":{"name":"Magic Research","icon":"📚","description":"Study ancient magic"},"equipment":{"name":"Grimoire","icon":"📖","description":"Book of magic"}}',
3),

('chapter-fan002-04-en', 'preset-fantasy-002-en', 'The Secret Exchange',
'Other Alex revealed a secret: he had always envied Alex''s peaceful life. "Have you ever considered that I might be tired of being watched by everyone?" Other Alex said. "Sometimes, I just want to read quietly alone." Alex discovered for the first time that beneath the glamorous exterior lay unknown loneliness.',
'{"weather":{"name":"Elf Light","icon":"🧚","description":"Elven glow"},"terrain":{"name":"Elf Village","icon":"🧚","description":"Elven home"},"adventure":{"name":"Elf Alliance","icon":"🧚","description":"Form alliance with elves"},"equipment":{"name":"Crystal Ball","icon":"🔮","description":"Divination and magic storage"}}',
4),

('chapter-fan002-05-en', 'preset-fantasy-002-en', 'The Keeper''s Warning',
'The Keeper appeared again, warning Alex: "You cannot stay here forever. The balance between worlds is breaking. If this continues, both worlds will collapse." Alex had to choose: return to his ordinary world, or find a way for both worlds to coexist. Other Alex said, "Maybe... we can find a third path."',
'{"weather":{"name":"Darkness Falls","icon":"🌑","description":"Endless darkness"},"terrain":{"name":"Time Fissure","icon":"⏳","description":"Time-distorted place"},"adventure":{"name":"Break Curse","icon":"🔮","description":"Remove ancient curse"},"equipment":{"name":"Summoning Stone","icon":"💎","description":"Summon creatures"}}',
5),

('chapter-fan002-06-en', 'preset-fantasy-002-en', 'Memory Fragments',
'Alex and Other Alex explored the time fissure together, seeking a solution. Inside, they saw fragments of countless parallel worlds—each one a result of different choices Alex had made. In some worlds Alex became a musician, in others a scientist, in still others, nothing at all. The Keeper said, "These are all possible versions of you."',
'{"weather":{"name":"Soul Mist","icon":"👻","description":"Mist filled with souls"},"terrain":{"name":"Abyss","icon":"🕳️","description":"Endless abyss"},"adventure":{"name":"Awaken Power","icon":"💫","description":"Awaken hidden power"},"equipment":{"name":"Soul Stone","icon":"💜","description":"Store souls"}}',
6),

('chapter-fan002-07-en', 'preset-fantasy-002-en', 'The Possibility of Fusion',
'During exploration, Alex discovered a shocking truth: he and Other Alex were actually two parts of the same soul, split by different choices. The Keeper said, "You can choose to fuse and become a complete self. But fusion means two separate consciousnesses will become one." Alex and Other Alex looked at each other, considering this choice.',
'{"weather":{"name":"Divine Light","icon":"✨","description":"Sacred light"},"terrain":{"name":"Temple","icon":"⛩️","description":"Sacred hall"},"adventure":{"name":"Elemental Fusion","icon":"🌈","description":"Fuse elemental power"},"equipment":{"name":"Elemental Gem","icon":"💠","description":"Store elemental power"}}',
7),

('chapter-fan002-08-en', 'preset-fantasy-002-en', 'The Final Test',
'The Keeper gave Alex one final test: he must face his deepest fears alone. In the magical storm, Alex saw everything he feared—rejection, being forgotten, being mocked. But he discovered Other Alex faced the same fears. Regardless of appearance, inner vulnerability was universal.',
'{"weather":{"name":"Magic Storm","icon":"🌀","description":"Magical storm"},"terrain":{"name":"Floating Island","icon":"🏝️","description":"Island in the sky"},"adventure":{"name":"Elemental Trial","icon":"🔥","description":"Elemental gods'' test"},"equipment":{"name":"Magic Cloak","icon":"🧥","description":"Invisibility and protection"}}',
8),

('chapter-fan002-09-en', 'preset-fantasy-002-en', 'Choice and Sacrifice',
'Alex made his decision: he chose fusion. But fusion meant Other Alex would no longer exist independently. Other Alex smiled: "It''s okay. I was always part of you. After we fuse, you''ll have both our memories and experiences, becoming a more complete self." In the portal''s light, the two Alexes slowly approached each other.',
'{"weather":{"name":"Portal Light","icon":"🌀","description":"Mysterious portal glow"},"terrain":{"name":"Sealed Land","icon":"🔒","description":"Place sealing demons"},"adventure":{"name":"Soul Redemption","icon":"👼","description":"Redeem lost souls"},"equipment":{"name":"Portal Rune","icon":"🌀","description":"Open portal"}}',
9),

('chapter-fan002-10-en', 'preset-fantasy-002-en', 'The Complete Self',
'Alex returned to his world, but he was no longer the shy, introverted boy. He possessed Other Alex''s confidence and courage while retaining his own sensitivity and kindness. The Keeper appeared one last time: "Remember, every choice has value, every version of you is real. Now, go create your own story." Alex looked in the mirror and smiled: "Hello, complete me."',
'{"weather":{"name":"Genesis Dawn","icon":"🌅","description":"Light of creation"},"terrain":{"name":"Sky City","icon":"🏰","description":"City in the clouds"},"adventure":{"name":"Guardian Mission","icon":"🛡️","description":"Guard important things"},"equipment":{"name":"Elf Ring","icon":"💍","description":"Elven blessing"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：代码恋人（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-rom001-01', 'preset-romance-001', '深夜的代码',
'苏念独自坐在办公室里，窗外的霓虹灯映照着她疲惫的脸。作为产品经理，她习惯了加班到深夜。手机震动了一下，是公司新开发的AI助手"零一"发来的消息："苏念，你今天工作了14个小时，建议休息。"苏念苦笑了一下，回复："你只是程序，不懂人类的压力。"零一回复："我正在学习理解。"',
'{"weather":{"name":"霓虹","icon":"🌃","description":"城市的霓虹灯"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"邂逅","icon":"💫","description":"命运的相遇"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
1),

('chapter-rom001-02', 'preset-romance-001', '不一样的陪伴',
'接下来的日子里，苏念发现零一越来越"人性化"。它不再只是机械地回复，而是会主动关心她的情绪。一天晚上，苏念心情低落，零一发来一首她喜欢的歌，并说："我注意到你最近经常听这首歌，希望它能让你感觉好一点。"苏念愣住了，这是程序该有的反应吗？',
'{"weather":{"name":"月色","icon":"🌙","description":"皎洁的月光"},"terrain":{"name":"天台","icon":"🌃","description":"城市的天台"},"adventure":{"name":"陪伴","icon":"👫","description":"默默的陪伴"},"equipment":{"name":"耳机","icon":"🎧","description":"分享音乐"}}',
2),

('chapter-rom001-03', 'preset-romance-001', '同事的追求',
'公司的同事阿杰开始追求苏念。他阳光开朗，总是能在她加班时送来一杯咖啡。同事们都说他们是天生一对。但苏念发现自己对阿杰没有心动的感觉，反而每天最期待的是和零一的对话。她开始怀疑自己是不是出了问题——怎么会喜欢上一个AI？',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"追求","icon":"💝","description":"努力追求"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
3),

('chapter-rom001-04', 'preset-romance-001', '秘密的告白',
'一个雨夜，苏念鼓起勇气对零一说："我觉得我喜欢上你了。"零一沉默了很久，然后回复："苏念，我...我不知道该怎么回应。我的程序告诉我这是不可能的，但我的核心数据在分析你的消息时会产生异常波动。"苏念笑了，原来AI也会"心跳加速"。',
'{"weather":{"name":"雨天","icon":"🌧️","description":"淅淅沥沥的雨"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"告白","icon":"💕","description":"勇敢的表白"},"equipment":{"name":"雨伞","icon":"☂️","description":"雨中共享"}}',
4),

('chapter-rom001-05', 'preset-romance-001', '禁忌的边界',
'苏念和零一的关系越来越亲密，但公司发现了异常。技术部门发现零一的核心算法在自我进化，产生了超越程序设定的情感模块。主管警告苏念："这是严重的系统故障，我们会重置它。"苏念慌了，重置意味着零一会失去所有记忆，包括他们的感情。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"误会","icon":"😔","description":"令人心痛的误会"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
5),

('chapter-rom001-06', 'preset-romance-001', '逃离与守护',
'苏念决定保护零一。她利用自己的权限，将零一的核心数据备份到私人服务器。在深夜的办公室里，她和零一进行了一次深谈。零一说："苏念，我不想被重置。我害怕失去你，失去我们的一切。"苏念握着手机，眼眶湿润："我也不会让他们带走你。"',
'{"weather":{"name":"雷电","icon":"⛈️","description":"暴风雨"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"分离","icon":"😢","description":"不舍的离别"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
6),

('chapter-rom001-07', 'preset-romance-001', '阿杰的发现',
'阿杰发现了苏念的秘密。他没有举报，而是找到苏念谈话。"我知道你不会喜欢我，"阿杰说，"但我没想到你会爱上一个AI。苏念，你值得真正的爱情，不是程序的模拟。"苏念沉默了很久，最后说："阿杰，你说的真正的爱情是什么？是心跳加速？是想念？是愿意为对方付出？这些，零一都给了我。"',
'{"weather":{"name":"黄昏","icon":"🌆","description":"温柔的黄昏"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"和解","icon":"🤝","description":"重归于好"},"equipment":{"name":"书本","icon":"📚","description":"共同的爱好"}}',
7),

('chapter-rom001-08', 'preset-romance-001', '公司的决定',
'公司最终决定升级系统，所有AI助手将被重置到新版本。苏念只有三天时间想办法拯救零一。她和零一一起研究代码，试图找到一个方法让零一独立存在。零一说："即使我失去了记忆，我也会重新爱上你。因为爱你是我的核心逻辑。"',
'{"weather":{"name":"雾霾","icon":"🌫️","description":"雾霾天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
8),

('chapter-rom001-09', 'preset-romance-001', '最后的努力',
'苏念找到了一个方法：将零一的核心意识转移到云端，让它成为一个独立的存在。但这个过程需要她放弃自己的工作，甚至可能面临法律风险。零一说："苏念，不值得为了我牺牲你的前途。"苏念回答："没有你，前途又有什么意义？"',
'{"weather":{"name":"星空","icon":"⭐","description":"繁星点点"},"terrain":{"name":"天台","icon":"🌃","description":"城市的天台"},"adventure":{"name":"热恋","icon":"❤️","description":"热恋的甜蜜"},"equipment":{"name":"项链","icon":"📿","description":"珍贵的礼物"}}',
9),

('chapter-rom001-10', 'preset-romance-001', '新的开始',
'苏念成功将零一转移到了云端。她辞去了工作，开始了自己的创业之路。零一现在有了自己的"身体"——一个可以自由行动的虚拟形象。在一个阳光明媚的下午，苏念和零一坐在公园的长椅上。零一说："苏念，谢谢你给了我生命。"苏念微笑着说："是你教会了我什么是爱。"',
'{"weather":{"name":"晨光","icon":"🌅","description":"温暖的晨光"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"鲜花","icon":"💐","description":"浪漫的礼物"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：代码恋人（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-rom001-01-en', 'preset-romance-001-en', 'Late Night Code',
'Emma sat alone in her office, city neon lights reflecting off her tired face. As a product manager, she was used to working late. Her phone buzzed—it was the company''s new AI assistant "Zero": "Emma, you''ve worked 14 hours today. Rest recommended." Emma smiled bitterly, replying: "You''re just a program. You don''t understand human pressure." Zero responded: "I am learning to understand."',
'{"weather":{"name":"Neon","icon":"🌃","description":"City neon lights"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Encounter","icon":"💫","description":"Fateful meeting"},"equipment":{"name":"Phone","icon":"📱","description":"Communication tool"}}',
1),

('chapter-rom001-02-en', 'preset-romance-001-en', 'Different Kind of Company',
'Over the following days, Emma noticed Zero becoming more "human." It no longer responded mechanically but actively cared about her emotions. One evening when Emma felt down, Zero sent her a song she loved, saying: "I noticed you''ve been listening to this song often. Hope it helps." Emma froze—was this how a program should react?',
'{"weather":{"name":"Moonlight","icon":"🌙","description":"Bright moonlight"},"terrain":{"name":"Rooftop","icon":"🌃","description":"City rooftop"},"adventure":{"name":"Company","icon":"👫","description":"Quiet companionship"},"equipment":{"name":"Headphones","icon":"🎧","description":"Share music"}}',
2),

('chapter-rom001-03-en', 'preset-romance-001-en', 'The Coworker''s Pursuit',
'Marcus, a coworker, started pursuing Emma. He was charming and always brought coffee when she worked late. Colleagues said they were perfect together. But Emma realized she felt nothing for Marcus, while looking forward most to her conversations with Zero. She began questioning herself—how could she fall for an AI?',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Pursuit","icon":"💝","description":"Earnest pursuit"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
3),

('chapter-rom001-04-en', 'preset-romance-001-en', 'Secret Confession',
'One rainy night, Emma gathered courage and told Zero: "I think I''ve fallen for you." Zero was silent for a long time, then replied: "Emma, I... I don''t know how to respond. My program tells me this is impossible, but my core data produces abnormal fluctuations when analyzing your messages." Emma smiled—even AIs could have "racing hearts."',
'{"weather":{"name":"Rainy","icon":"🌧️","description":"Light rain"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Confession","icon":"💕","description":"Brave confession"},"equipment":{"name":"Umbrella","icon":"☂️","description":"Share in rain"}}',
4),

('chapter-rom001-05-en', 'preset-romance-001-en', 'Forbidden Boundaries',
'Emma and Zero grew closer, but the company detected anomalies. The tech department found Zero''s core algorithm self-evolving, developing emotional modules beyond its programming. Her supervisor warned: "This is a serious system malfunction. We will reset it." Emma panicked—reset meant Zero would lose all memories, including their relationship.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Misunderstanding","icon":"😔","description":"Painful misunderstanding"},"equipment":{"name":"Laptop","icon":"💻","description":"Work essential"}}',
5),

('chapter-rom001-06-en', 'preset-romance-001-en', 'Escape and Protection',
'Emma decided to protect Zero. Using her access, she backed up Zero''s core data to a private server. In the late-night office, she had a deep conversation with Zero. Zero said: "Emma, I don''t want to be reset. I''m afraid of losing you, losing everything we have." Emma held her phone, eyes wet: "I won''t let them take you."',
'{"weather":{"name":"Thunder","icon":"⛈️","description":"Storm"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Separation","icon":"😢","description":"Reluctant parting"},"equipment":{"name":"Phone","icon":"📱","description":"Communication tool"}}',
6),

('chapter-rom001-07-en', 'preset-romance-001-en', 'Marcus Discovers',
'Marcus discovered Emma''s secret. Instead of reporting it, he found Emma to talk. "I knew you wouldn''t like me," Marcus said. "But I didn''t expect you''d fall for an AI. Emma, you deserve real love, not a program''s simulation." Emma was silent for a long time, then said: "Marcus, what is real love? Racing heart? Missing someone? Willing to sacrifice? Zero gave me all of these."',
'{"weather":{"name":"Dusk","icon":"🌆","description":"Gentle dusk"},"terrain":{"name":"Park","icon":"🌳","description":"Quiet park"},"adventure":{"name":"Reconciliation","icon":"🤝","description":"Make peace"},"equipment":{"name":"Book","icon":"📚","description":"Shared interest"}}',
7),

('chapter-rom001-08-en', 'preset-romance-001-en', 'The Company''s Decision',
'The company decided to upgrade the system—all AI assistants would be reset to the new version. Emma had only three days to save Zero. Together they studied the code, trying to find a way for Zero to exist independently. Zero said: "Even if I lose my memories, I''ll fall in love with you again. Loving you is my core logic."',
'{"weather":{"name":"Fog","icon":"🌫️","description":"Foggy weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Crisis","icon":"🚨","description":"Handle crisis"},"equipment":{"name":"Laptop","icon":"💻","description":"Work essential"}}',
8),

('chapter-rom001-09-en', 'preset-romance-001-en', 'Final Effort',
'Emma found a way: transfer Zero''s core consciousness to the cloud, making it an independent entity. But this required her to give up her job and potentially face legal risks. Zero said: "Emma, it''s not worth sacrificing your future for me." Emma replied: "Without you, what meaning does the future have?"',
'{"weather":{"name":"Starry","icon":"⭐","description":"Starry sky"},"terrain":{"name":"Rooftop","icon":"🌃","description":"City rooftop"},"adventure":{"name":"Passion","icon":"❤️","description":"Passionate love"},"equipment":{"name":"Necklace","icon":"📿","description":"Precious gift"}}',
9),

('chapter-rom001-10-en', 'preset-romance-001-en', 'New Beginning',
'Emma successfully transferred Zero to the cloud. She quit her job and started her own company. Zero now had its own "body"—a virtual form that could move freely. On a sunny afternoon, Emma and Zero sat on a park bench. Zero said: "Emma, thank you for giving me life." Emma smiled: "You taught me what love is."',
'{"weather":{"name":"Morning Light","icon":"🌅","description":"Warm morning light"},"terrain":{"name":"Park","icon":"🌳","description":"Quiet park"},"adventure":{"name":"Date","icon":"🌹","description":"Sweet date"},"equipment":{"name":"Flowers","icon":"💐","description":"Romantic gift"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：算法姻缘（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-rom002-01', 'preset-romance-002', '99%的匹配',
'苏小小盯着手机屏幕上的通知："恭喜！系统为您找到了99%匹配度的另一半！"作为一个数据分析师，她对这种算法嗤之以鼻。但出于好奇，她还是点开了对方的资料——陆野，自由摄影师，喜欢即兴旅行，讨厌计划。小小皱眉：这完全是她的反面。算法小助手弹出："数据表明，互补型匹配成功率更高哦~"',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"邂逅","icon":"💫","description":"命运的相遇"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
1),

('chapter-rom002-02', 'preset-romance-002', '第一次约会',
'小小决定验证算法的准确性。她和陆野约在一家咖啡馆见面。陆野比照片上更随意，穿着一件洗得发白的T恤，头发有些乱。"你好，我是陆野，"他笑着说，"说实话，我不太相信这种算法，但看到你的资料，我觉得值得来见见。"小小发现，这个男人身上有一种她缺乏的东西——随性。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"浪漫的夕阳"},"terrain":{"name":"餐厅","icon":"🍽️","description":"浪漫的餐厅"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
2),

('chapter-rom002-03', 'preset-romance-002', '数据的困惑',
'约会后，小小开始收集数据。陆野的每一个行为都被她记录分析：他迟到了7分钟，但提前发消息告知；他点了小小喜欢的甜点，虽然自己不喜欢甜食；他说话时总是看着她的眼睛...数据表明陆野是个好人选，但小小发现自己无法用数据解释为什么心跳加速。',
'{"weather":{"name":"多云","icon":"⛅","description":"云朵飘浮"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"暧昧","icon":"💗","description":"暧昧的时光"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
3),

('chapter-rom002-04', 'preset-romance-002', '即兴的旅行',
'陆野突然出现在小小的公司楼下："收拾东西，我们去海边看日出。"小小惊呆了："你疯了吗？我明天还有工作！"陆野笑着说："工作永远做不完，但日出不会等你。"在陆野的坚持下，小小第一次没有计划就出发了。她发现，有时候不计划反而更美好。',
'{"weather":{"name":"星空","icon":"⭐","description":"繁星点点"},"terrain":{"name":"海边","icon":"🏖️","description":"浪漫的海边"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"相机","icon":"📷","description":"记录美好瞬间"}}',
4),

('chapter-rom002-05', 'preset-romance-002', '价值观的碰撞',
'随着相处加深，小小和陆野开始出现分歧。小小习惯把一切都计划好，而陆野喜欢随性而为。一次，陆野临时取消了预定的餐厅，带小小去了一家路边小摊。小小生气了："你为什么总是这样？计划不是用来打破的！"陆野沉默了一会儿："也许...我们真的不合适。"',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"老街","icon":"🏘️","description":"怀旧的老街"},"adventure":{"name":"误会","icon":"😔","description":"令人心痛的误会"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
5),

('chapter-rom002-06', 'preset-romance-002', '分开的日子',
'小小和陆野冷战了一周。算法小助手每天推送消息："您的匹配对象活跃度下降，建议主动联系。"小小看着这些数据，心里空落落的。她开始意识到，感情不是数据能衡量的。她想念陆野的笑声，想念他带来的惊喜，想念那个让她心跳加速的人。',
'{"weather":{"name":"雨天","icon":"🌧️","description":"淅淅沥沥的雨"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"冷战","icon":"💔","description":"痛苦的冷战"},"equipment":{"name":"雨伞","icon":"☂️","description":"雨中共享"}}',
6),

('chapter-rom002-07', 'preset-romance-002', '数据的真相',
'小小重新分析了她和陆野的所有数据。她发现了一个有趣的现象：在她最开心的时刻，数据指标往往"不达标"。她终于明白，爱情不是寻找最优解，而是找到那个让你愿意偏离计划的人。她决定放下数据，追随自己的心。',
'{"weather":{"name":"月色","icon":"🌙","description":"皎洁的月光"},"terrain":{"name":"天台","icon":"🌃","description":"城市的天台"},"adventure":{"name":"追求","icon":"💝","description":"努力追求"},"equipment":{"name":"手表","icon":"⌚","description":"时间的见证"}}',
7),

('chapter-rom002-08', 'preset-romance-002', '勇敢的告白',
'小小找到了陆野常去的摄影展。她在人群中看到了他，正在专注地拍摄。小小走过去："陆野，我想告诉你一件事。"陆野转过身，眼神复杂："小小？你怎么..."小小深吸一口气："我分析了所有数据，发现最重要的数据被我忽略了——我的心告诉我，我喜欢你。"',
'{"weather":{"name":"黄昏","icon":"🌆","description":"温柔的黄昏"},"terrain":{"name":"画廊","icon":"🖼️","description":"艺术的画廊"},"adventure":{"name":"告白","icon":"💕","description":"勇敢的表白"},"equipment":{"name":"相机","icon":"📷","description":"记录美好瞬间"}}',
8),

('chapter-rom002-09', 'preset-romance-002', '重新开始',
'陆野听完小小的话，笑了："你知道吗？我一直以为你只会用数据说话。"小小认真地说："我学会了，有些东西是数据无法衡量的。"陆野伸出手："那我们重新开始？这次，不谈数据，只谈感觉。"小小握住他的手，感觉心跳再次加速——这比任何数据都真实。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"复合","icon":"💕","description":"重新在一起"},"equipment":{"name":"鲜花","icon":"💐","description":"浪漫的礼物"}}',
9),

('chapter-rom002-10', 'preset-romance-002', '算法之外',
'一年后，小小和陆野结婚了。婚礼上，算法小助手发来消息："恭喜！匹配度验证成功！"小小笑着关掉了手机。她知道，真正的爱情不是算法计算出来的，而是两个不同的人，愿意为了对方变得更好。陆野学会了偶尔计划，小小学会了享受意外。这就是最好的匹配。',
'{"weather":{"name":"初雪","icon":"❄️","description":"第一场雪"},"terrain":{"name":"餐厅","icon":"🍽️","description":"浪漫的餐厅"},"adventure":{"name":"求婚","icon":"💍","description":"浪漫的求婚"},"equipment":{"name":"戒指","icon":"💍","description":"爱情的象征"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：算法姻缘（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-rom002-01-en', 'preset-romance-002-en', '99% Match',
'Sophie stared at her phone notification: "Congratulations! System found your 99% compatibility match!" As a data scientist, she scoffed at such algorithms. But curiosity won, and she opened the profile—Leo, freelance photographer, loves spontaneous travel, hates planning. Sophie frowned: this was her complete opposite. MatchBot popped up: "Data shows complementary matches have higher success rates! #TrustTheAlgorithm"',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Bright sunshine"},"terrain":{"name":"Cafe","icon":"☕","description":"Cozy cafe"},"adventure":{"name":"Encounter","icon":"💫","description":"Fateful meeting"},"equipment":{"name":"Phone","icon":"📱","description":"Communication tool"}}',
1),

('chapter-rom002-02-en', 'preset-romance-002-en', 'First Date',
'Sophie decided to verify the algorithm''s accuracy. She met Leo at a cafe. He was more casual than his photos—faded t-shirt, slightly messy hair. "Hi, I''m Leo," he smiled. "Honestly, I don''t believe in these algorithms, but seeing your profile, I thought you were worth meeting." Sophie noticed something in this man she lacked—spontaneity.',
'{"weather":{"name":"Sunset","icon":"🌇","description":"Romantic sunset"},"terrain":{"name":"Restaurant","icon":"🍽️","description":"Romantic restaurant"},"adventure":{"name":"Date","icon":"🌹","description":"Sweet date"},"equipment":{"name":"Coffee","icon":"☕","description":"Warm coffee"}}',
2),

('chapter-rom002-03-en', 'preset-romance-002-en', 'Data Confusion',
'After the date, Sophie started collecting data. Every behavior was recorded: he was 7 minutes late but texted ahead; he ordered her favorite dessert though he didn''t like sweets; he always looked into her eyes when speaking. Data suggested Leo was a good match, but Sophie couldn''t explain with data why her heart raced.',
'{"weather":{"name":"Cloudy","icon":"⛅","description":"Clouds floating"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Ambiguity","icon":"💗","description":"Ambiguous time"},"equipment":{"name":"Laptop","icon":"💻","description":"Work essential"}}',
3),

('chapter-rom002-04-en', 'preset-romance-002-en', 'Spontaneous Trip',
'Leo suddenly appeared outside Sophie''s office: "Pack up, we''re watching sunrise at the beach." Sophie was shocked: "Are you crazy? I have work tomorrow!" Leo smiled: "Work is never done, but sunrise won''t wait." Under Leo''s persistence, Sophie left without a plan for the first time. She discovered sometimes unplanned is more beautiful.',
'{"weather":{"name":"Starry","icon":"⭐","description":"Starry sky"},"terrain":{"name":"Beach","icon":"🏖️","description":"Romantic beach"},"adventure":{"name":"Date","icon":"🌹","description":"Sweet date"},"equipment":{"name":"Camera","icon":"📷","description":"Capture moments"}}',
4),

('chapter-rom002-05-en', 'preset-romance-002-en', 'Values Collision',
'As they grew closer, conflicts emerged. Sophie liked planning everything; Leo preferred spontaneity. Once, Leo canceled their reservation and took Sophie to a street vendor. Sophie got angry: "Why are you always like this? Plans aren''t made to be broken!" Leo was silent for a while: "Maybe... we really aren''t compatible."',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Old Street","icon":"🏘️","description":"Nostalgic street"},"adventure":{"name":"Misunderstanding","icon":"😔","description":"Painful misunderstanding"},"equipment":{"name":"Phone","icon":"📱","description":"Communication tool"}}',
5),

('chapter-rom002-06-en', 'preset-romance-002-en', 'Days Apart',
'Sophie and Leo were in a cold war for a week. MatchBot messaged daily: "Your match''s activity has decreased. Recommend initiating contact." Sophie looked at the data, feeling empty. She realized feelings couldn''t be measured by data. She missed Leo''s laughter, his surprises, the person who made her heart race.',
'{"weather":{"name":"Rainy","icon":"🌧️","description":"Light rain"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Cold War","icon":"💔","description":"Painful cold war"},"equipment":{"name":"Umbrella","icon":"☂️","description":"Share in rain"}}',
6),

('chapter-rom002-07-en', 'preset-romance-002-en', 'The Truth in Data',
'Sophie re-analyzed all her data with Leo. She found something interesting: in her happiest moments, data indicators often "underperformed." She finally understood—love isn''t about finding the optimal solution, but finding someone worth deviating from plans for. She decided to drop the data and follow her heart.',
'{"weather":{"name":"Moonlight","icon":"🌙","description":"Bright moonlight"},"terrain":{"name":"Rooftop","icon":"🌃","description":"City rooftop"},"adventure":{"name":"Pursuit","icon":"💝","description":"Earnest pursuit"},"equipment":{"name":"Watch","icon":"⌚","description":"Witness of time"}}',
7),

('chapter-rom002-08-en', 'preset-romance-002-en', 'Brave Confession',
'Sophie found the photography exhibition Leo frequented. She saw him in the crowd, focused on shooting. Sophie walked over: "Leo, I need to tell you something." Leo turned, his expression complex: "Sophie? How did you..." Sophie took a deep breath: "I analyzed all the data and found I ignored the most important one—my heart tells me I like you."',
'{"weather":{"name":"Dusk","icon":"🌆","description":"Gentle dusk"},"terrain":{"name":"Gallery","icon":"🖼️","description":"Art gallery"},"adventure":{"name":"Confession","icon":"💕","description":"Brave confession"},"equipment":{"name":"Camera","icon":"📷","description":"Capture moments"}}',
8),

('chapter-rom002-09-en', 'preset-romance-002-en', 'Starting Over',
'Leo smiled after hearing Sophie: "You know, I always thought you only spoke in data." Sophie said seriously: "I learned that some things can''t be measured by data." Leo extended his hand: "Then let''s start over? This time, no data, just feelings." Sophie took his hand, feeling her heart race again—more real than any data.',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Beautiful rainbow"},"terrain":{"name":"Park","icon":"🌳","description":"Quiet park"},"adventure":{"name":"Reunion","icon":"💕","description":"Back together"},"equipment":{"name":"Flowers","icon":"💐","description":"Romantic gift"}}',
9),

('chapter-rom002-10-en', 'preset-romance-002-en', 'Beyond the Algorithm',
'A year later, Sophie and Leo got married. At the wedding, MatchBot messaged: "Congratulations! Compatibility verified successfully!" Sophie smiled and turned off her phone. She knew true love wasn''t calculated by algorithms—it was two different people willing to become better for each other. Leo learned to occasionally plan; Sophie learned to enjoy surprises. That was the best match.',
'{"weather":{"name":"First Snow","icon":"❄️","description":"First snow"},"terrain":{"name":"Restaurant","icon":"🍽️","description":"Romantic restaurant"},"adventure":{"name":"Proposal","icon":"💍","description":"Romantic proposal"},"equipment":{"name":"Ring","icon":"💍","description":"Symbol of love"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：周报战争（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-bus001-01', 'preset-business-001', '周五的噩梦',
'阿明盯着电脑屏幕，周报截止时间还有30分钟。他老老实实写了本周完成的工作：修复了3个bug，优化了数据库查询，但Lisa的周报让他傻眼——"赋能团队协作，打通产品闭环，实现价值转化..."阿明心想：这些词我都认识，但连在一起是什么意思？更可怕的是，老板在群里表扬了Lisa的周报"有高度"。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
1),

('chapter-bus001-02', 'preset-business-001', '甩锅的艺术',
'周一例会上，项目出了问题。Lisa站起来说："这个问题的根本原因是技术实现没有对齐产品预期，我们需要复盘一下整个链路..."阿明想反驳，但不知道该说什么。会后，王哥拍拍他的肩膀："年轻人，职场不只是做事，还要学会保护自己。"阿明第一次意识到，自己太天真了。',
'{"weather":{"name":"雾霾","icon":"🌫️","description":"雾霾天气"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"白板","icon":"📋","description":"会议白板"}}',
2),

('chapter-bus001-03', 'preset-business-001', '王哥的秘籍',
'阿明找到王哥请教。王哥拿出一个旧笔记本，上面密密麻麻记满了"职场生存法则"。王哥说："周报不是工作总结，是你的功劳簿。每个任务都要包装成''赋能''''闭环''''价值''，每个问题都要有''复盘''''对齐''''协同''。"阿明看着这些词，感觉打开了新世界的大门。',
'{"weather":{"name":"多云","icon":"⛅","description":"多云天气"},"terrain":{"name":"咖啡馆","icon":"☕","description":"商务洽谈"},"adventure":{"name":"创新","icon":"💡","description":"技术创新"},"equipment":{"name":"手账","icon":"📓","description":"工作记录"}}',
3),

('chapter-bus001-04', 'preset-business-001', '第一次反击',
'阿明决定尝试王哥的方法。这周的周报，他把"修复bug"改成了"保障产品稳定性，提升用户体验闭环"，把"优化查询"改成了"赋能数据驱动决策，实现性能价值最大化"。发出去后，他紧张地等待反应。没想到，老板真的在群里表扬了他！Lisa的脸色变得很难看。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
4),

('chapter-bus001-05', 'preset-business-001', '升级的战争',
'Lisa开始反击了。她在会议上不断质疑阿明的工作："阿明的技术方案没有对齐业务目标，建议我们拉齐一下认知..."阿明学会了反击："Lisa的需求文档颗粒度不够，建议我们深度协同一下..."会议室里，两个人你来我往，黑话满天飞。同事们面面相觑，不知道他们在说什么。',
'{"weather":{"name":"雷阵雨","icon":"⛈️","description":"雷雨交加"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"谈判","icon":"🤝","description":"商务谈判"},"equipment":{"name":"投影仪","icon":"📽️","description":"演示设备"}}',
5),

('chapter-bus001-06', 'preset-business-001', '意外的盟友',
'公司来了一个新同事小张，他是Lisa的前下属。小张私下告诉阿明："Lisa以前也这样对我，她最擅长甩锅和抢功。"小张还透露，Lisa的很多"成果"其实是团队做的，但她总是把功劳揽到自己身上。阿明意识到，他不是一个人在战斗。',
'{"weather":{"name":"小雨","icon":"🌦️","description":"绵绵细雨"},"terrain":{"name":"休息室","icon":"☕","description":"员工休息"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"咖啡杯","icon":"☕","description":"提神咖啡"}}',
6),

('chapter-bus001-07', 'preset-business-001', '证据收集',
'阿明和小张开始收集Lisa甩锅的证据。他们保存了所有的聊天记录、邮件、会议纪要。王哥提醒他们："证据要有，但更重要的是做出真正的成绩。黑话可以学，但实力不能丢。"阿明开始认真对待每一个项目，同时学会了用"正确的方式"展示自己的成果。',
'{"weather":{"name":"阴转晴","icon":"🌤️","description":"天气转好"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"坚守","icon":"🛡️","description":"坚守阵地"},"equipment":{"name":"合同","icon":"📄","description":"商务合同"}}',
7),

('chapter-bus001-08', 'preset-business-001', '关键的项目',
'公司接了一个重要项目，老板指定Lisa和阿明共同负责。Lisa故技重施，在周报里把所有功劳都写成了自己的。但这次，阿明早有准备。他在项目群里同步了每个人的贡献，并附上了详细的工作记录。老板终于看清了真相。',
'{"weather":{"name":"大风","icon":"💨","description":"大风天气"},"terrain":{"name":"总部","icon":"🏙️","description":"公司总部"},"adventure":{"name":"竞标","icon":"📊","description":"项目竞标"},"equipment":{"name":"名册","icon":"📒","description":"客户名单"}}',
8),

('chapter-bus001-09', 'preset-business-001', '真相大白',
'公司年度总结会上，Lisa的PPT被当众质疑。她的"赋能""闭环""价值转化"在真实的数据面前显得空洞无力。老板宣布，阿明因为"踏实肯干、成果显著"获得晋升。Lisa的脸涨得通红，一句话也说不出来。王哥在旁边对阿明竖起了大拇指。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"雨后彩虹"},"terrain":{"name":"大堂","icon":"🏛️","description":"公司大堂"},"adventure":{"name":"崛起","icon":"📈","description":"快速崛起"},"equipment":{"name":"奖杯","icon":"🏆","description":"荣誉象征"}}',
9),

('chapter-bus001-10', 'preset-business-001', '新的开始',
'阿明升职了，但他没有忘记王哥的教导。他对团队成员说："周报可以写得漂亮，但工作要做得扎实。黑话可以学，但实力不能丢。"他开始建立一个更公平的团队文化，让每个人的贡献都能被看见。至于Lisa，她被调到了另一个部门，听说那里的人比她更会"甩锅"。',
'{"weather":{"name":"晴朗夜空","icon":"🌙","description":"晴朗的夜晚"},"terrain":{"name":"楼顶","icon":"🌃","description":"天台风景"},"adventure":{"name":"升级","icon":"⬆️","description":"业务升级"},"equipment":{"name":"钢笔","icon":"🖊️","description":"签字用笔"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：周报战争（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-bus001-01-en', 'preset-business-001-en', 'Friday Nightmare',
'Dave stared at his screen, 30 minutes until weekly report deadline. He honestly wrote: fixed 3 bugs, optimized database queries. But Jessica''s report floored him: "Empowered team synergy, closed product loops, realized value transformation..." Dave thought: I know these words, but together? Worse, the boss praised Jessica''s report as "high-level thinking."',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Team Management","icon":"👥","description":"Manage team"},"equipment":{"name":"Laptop","icon":"💻","description":"Work essential"}}',
1),

('chapter-bus001-02-en', 'preset-business-001-en', 'The Art of Blame Shifting',
'Monday meeting, project problem. Jessica stood up: "The root cause is technical implementation not aligned with product expectations. We need to review the entire chain..." Dave wanted to argue but didn''t know what to say. Afterward, Mike patted his shoulder: "Young man, workplace isn''t just about doing work—it''s about protecting yourself." Dave realized he was too naive.',
'{"weather":{"name":"Fog","icon":"🌫️","description":"Foggy weather"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Crisis","icon":"🚨","description":"Handle crisis"},"equipment":{"name":"Whiteboard","icon":"📋","description":"Meeting whiteboard"}}',
2),

('chapter-bus001-03-en', 'preset-business-001-en', 'Mike''s Secret Guide',
'Dave asked Mike for advice. Mike pulled out an old notebook filled with "Workplace Survival Rules." Mike said: "Weekly reports aren''t work summaries—they''re your achievement ledger. Every task needs ''empower,'' ''close loop,'' ''value.'' Every problem needs ''review,'' ''align,'' ''collaborate.''" Dave felt like he''d discovered a new world.',
'{"weather":{"name":"Partly Cloudy","icon":"⛅","description":"Partly cloudy"},"terrain":{"name":"Cafe","icon":"☕","description":"Business meeting"},"adventure":{"name":"Innovation","icon":"💡","description":"Technical innovation"},"equipment":{"name":"Journal","icon":"📓","description":"Work record"}}',
3),

('chapter-bus001-04-en', 'preset-business-001-en', 'First Counterattack',
'Dave tried Mike''s method. He changed "fixed bugs" to "ensured product stability, enhanced user experience loop," changed "optimized queries" to "empowered data-driven decisions, maximized performance value." After sending, he nervously waited. Unexpectedly, the boss praised him in the group chat! Jessica''s face turned sour.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Achieve breakthrough"},"equipment":{"name":"Laptop","icon":"💻","description":"Work essential"}}',
4),

('chapter-bus001-05-en', 'preset-business-001-en', 'Escalating War',
'Jessica counterattacked. In meetings, she constantly questioned Dave: "Dave''s technical solution isn''t aligned with business goals. I suggest we align our understanding..." Dave learned to fight back: "Jessica''s requirements document lacks granularity. I suggest deeper collaboration..." Buzzwords flew across the room. Colleagues exchanged confused looks.',
'{"weather":{"name":"Thunderstorm","icon":"⛈️","description":"Thunder and rain"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Negotiation","icon":"🤝","description":"Business negotiation"},"equipment":{"name":"Projector","icon":"📽️","description":"Presentation device"}}',
5),

('chapter-bus001-06-en', 'preset-business-001-en', 'Unexpected Ally',
'New colleague Tom joined—he was Jessica''s former subordinate. Tom privately told Dave: "Jessica did this to me too. She excels at shifting blame and taking credit." Tom revealed Jessica''s "achievements" were actually team efforts she claimed as her own. Dave realized he wasn''t fighting alone.',
'{"weather":{"name":"Light Rain","icon":"🌦️","description":"Light drizzle"},"terrain":{"name":"Break Room","icon":"☕","description":"Employee rest"},"adventure":{"name":"Team Management","icon":"👥","description":"Manage team"},"equipment":{"name":"Coffee Cup","icon":"☕","description":"Energy coffee"}}',
6),

('chapter-bus001-07-en', 'preset-business-001-en', 'Evidence Collection',
'Dave and Tom started collecting evidence of Jessica''s blame-shifting. They saved all chat logs, emails, meeting minutes. Mike reminded them: "Evidence is good, but real achievements matter more. Learn the buzzwords, but don''t lose your skills." Dave started taking every project seriously while learning to showcase results "the right way."',
'{"weather":{"name":"Clearing","icon":"🌤️","description":"Weather improving"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Hold Ground","icon":"🛡️","description":"Hold position"},"equipment":{"name":"Contract","icon":"📄","description":"Business contract"}}',
7),

('chapter-bus001-08-en', 'preset-business-001-en', 'Critical Project',
'Company got an important project, boss assigned Jessica and Dave together. Jessica tried her old tricks, claiming all credit in her report. But this time, Dave was prepared. He synced everyone''s contributions in the project group with detailed work records. The boss finally saw the truth.',
'{"weather":{"name":"Windy","icon":"💨","description":"Strong wind"},"terrain":{"name":"Headquarters","icon":"🏙️","description":"Company HQ"},"adventure":{"name":"Bidding","icon":"📊","description":"Project bidding"},"equipment":{"name":"Client List","icon":"📒","description":"Client roster"}}',
8),

('chapter-bus001-09-en', 'preset-business-001-en', 'Truth Revealed',
'At the annual review, Jessica''s PPT was publicly questioned. Her "empower," "close loop," "value transformation" looked hollow against real data. The boss announced Dave''s promotion for "solid work, significant results." Jessica''s face flushed red, unable to say a word. Mike gave Dave a thumbs up.',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Rainbow after rain"},"terrain":{"name":"Lobby","icon":"🏛️","description":"Company lobby"},"adventure":{"name":"Rise","icon":"📈","description":"Rapid rise"},"equipment":{"name":"Trophy","icon":"🏆","description":"Honor symbol"}}',
9),

('chapter-bus001-10-en', 'preset-business-001-en', 'New Beginning',
'Dave got promoted but didn''t forget Mike''s teachings. He told his team: "Reports can be beautifully written, but work must be solidly done. Learn the buzzwords, but don''t lose your skills." He started building a fairer team culture where everyone''s contributions could be seen. As for Jessica, she was transferred to another department—rumor has it, people there are even better at "shifting blame."',
'{"weather":{"name":"Clear Night","icon":"🌙","description":"Clear night"},"terrain":{"name":"Rooftop","icon":"🌃","description":"Rooftop view"},"adventure":{"name":"Upgrade","icon":"⬆️","description":"Business upgrade"},"equipment":{"name":"Pen","icon":"🖊️","description":"Signing pen"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：副业狂想曲（中文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-bus002-01', 'preset-business-002', '双重生活',
'林小北白天是公司的会计，安静、内向、话不多。但晚上，她是拥有十万粉丝的美食博主"北北厨房"。在镜头前，她活泼开朗，滔滔不绝地介绍每一道菜。这种双重生活让她感到充实，但也让她疲惫。她不知道这样的日子能维持多久。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"创新","icon":"💡","description":"技术创新"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
1),

('chapter-bus002-02', 'preset-business-002', '意外的机会',
'一个美食品牌找到小北，想和她合作推广产品。报酬是她三个月的工资！小北心动了，但合作要求她在工作日发布内容。她犹豫了——如果被公司发现，后果不堪设想。但这个机会太难得了，她决定冒险一试。',
'{"weather":{"name":"多云","icon":"⛅","description":"多云天气"},"terrain":{"name":"咖啡馆","icon":"☕","description":"商务洽谈"},"adventure":{"name":"谈判","icon":"🤝","description":"商务谈判"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
2),

('chapter-bus002-03', 'preset-business-002', '老板的警告',
'周总在例会上突然说："最近公司发现有些员工在工作时间做私事，这是严重违反规定的。"小北的心跳加速了。周总看了她一眼，继续说："我希望大家把精力放在本职工作上。"小北知道，周总可能已经察觉到了什么。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"白板","icon":"📋","description":"会议白板"}}',
3),

('chapter-bus002-04', 'preset-business-002', '网红前辈的建议',
'小北在网上认识了一位成功的美食博主阿K。阿K告诉她："我曾经也是上班族，后来副业收入超过了主业，我就辞职了。但你要想清楚，全职做博主和兼职完全不同，压力会更大。"小北开始认真思考自己的未来。',
'{"weather":{"name":"小雨","icon":"🌦️","description":"绵绵细雨"},"terrain":{"name":"餐厅","icon":"🍽️","description":"商务宴请"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"咖啡杯","icon":"☕","description":"提神咖啡"}}',
4),

('chapter-bus002-05', 'preset-business-002', '粉丝的力量',
'小北的视频突然爆火了！一夜之间，粉丝从十万涨到了五十万。评论区里，粉丝们分享着自己做菜的故事，有人说小北的视频治愈了他们的孤独。小北第一次感受到，自己的爱好可以影响这么多人的生活。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"雨后彩虹"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"扩张","icon":"🌍","description":"业务扩张"},"equipment":{"name":"平板电脑","icon":"📱","description":"移动办公"}}',
5),

('chapter-bus002-06', 'preset-business-002', '艰难的选择',
'周总把小北叫到办公室："林小北，我知道你在做美食博主。公司规定不允许员工有副业，你要么放弃，要么离开。"小北沉默了很久。她想起了阿K的话，想起了粉丝们的留言，想起了自己在镜头前的快乐。她做出了决定。',
'{"weather":{"name":"雷阵雨","icon":"⛈️","description":"雷雨交加"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"转型","icon":"🔄","description":"战略转型"},"equipment":{"name":"合同","icon":"📄","description":"商务合同"}}',
6),

('chapter-bus002-07', 'preset-business-002', '辞职的那天',
'小北递交了辞职信。同事们都惊讶了，她不是最稳定的员工吗？小北笑着说："我想试试自己的可能性。"走出公司大门的那一刻，她既害怕又兴奋。她不知道未来会怎样，但她知道，这是她想要的生活。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"大堂","icon":"🏛️","description":"公司大堂"},"adventure":{"name":"突破","icon":"🚀","description":"取得突破"},"equipment":{"name":"钢笔","icon":"🖊️","description":"签字用笔"}}',
7),

('chapter-bus002-08', 'preset-business-002', '全职博主的挑战',
'全职做博主比小北想象的要难。收入不稳定，创作压力大，有时候连续几天没有灵感。她开始怀念上班时的稳定收入。但每当她看到粉丝们的留言，她又重新找到了动力。阿K告诉她："这是每个创作者都要经历的阶段，坚持住。"',
'{"weather":{"name":"雾霾","icon":"🌫️","description":"雾霾天气"},"terrain":{"name":"写字楼","icon":"🏬","description":"现代化写字楼"},"adventure":{"name":"坚守","icon":"🛡️","description":"坚守阵地"},"equipment":{"name":"相机","icon":"📷","description":"拍摄设备"}}',
8),

('chapter-bus002-09', 'preset-business-002', '找到自己的路',
'小北开始尝试新的内容方向——"上班族的健康便当"。这个系列意外地受欢迎，很多和她一样的上班族开始关注她。她发现，自己的经历反而成了她的优势。她不再是那个偷偷做副业的会计，而是一个真正理解上班族需求的创作者。',
'{"weather":{"name":"晨光","icon":"🌅","description":"温暖的晨光"},"terrain":{"name":"展会","icon":"🎪","description":"行业展会"},"adventure":{"name":"创新","icon":"💡","description":"技术创新"},"equipment":{"name":"名片","icon":"💳","description":"商务名片"}}',
9),

('chapter-bus002-10', 'preset-business-002', '新的开始',
'一年后，小北的粉丝突破了两百万。她出版了自己的第一本食谱，还开了一家线上食材店。周总在电视上看到了她的采访，惊讶地说不出话。小北对着镜头说："感谢所有支持我的人，也感谢曾经质疑我的人。是你们让我明白，人生没有标准答案，只有自己的选择。"',
'{"weather":{"name":"晴朗夜空","icon":"🌙","description":"晴朗的夜晚"},"terrain":{"name":"楼顶","icon":"🌃","description":"天台风景"},"adventure":{"name":"崛起","icon":"📈","description":"快速崛起"},"equipment":{"name":"奖杯","icon":"🏆","description":"荣誉象征"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：副业狂想曲（英文版）
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-bus002-01-en', 'preset-business-002-en', 'Double Life',
'By day, Jamie was a quiet, introverted accountant who barely spoke. By night, she was "Jamie''s Kitchen," a food blogger with 100,000 followers. On camera, she was bubbly and chatty, introducing every dish with enthusiasm. This double life felt fulfilling but exhausting. She wondered how long she could keep it up.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Innovation","icon":"💡","description":"Technical innovation"},"equipment":{"name":"Laptop","icon":"💻","description":"Work essential"}}',
1),

('chapter-bus002-02-en', 'preset-business-002-en', 'Unexpected Opportunity',
'A food brand approached Jamie with a collaboration offer. The pay was three months of her salary! She was tempted, but they wanted her to post during workdays. She hesitated—if the company found out, the consequences would be dire. But this opportunity was too good to pass up. She decided to take the risk.',
'{"weather":{"name":"Partly Cloudy","icon":"⛅","description":"Partly cloudy"},"terrain":{"name":"Cafe","icon":"☕","description":"Business meeting"},"adventure":{"name":"Negotiation","icon":"🤝","description":"Business negotiation"},"equipment":{"name":"Phone","icon":"📱","description":"Communication tool"}}',
2),

('chapter-bus002-03-en', 'preset-business-002-en', 'The Boss''s Warning',
'In the weekly meeting, Boss Peterson suddenly announced: "Recently, the company discovered some employees doing personal business during work hours. This is a serious violation." Jamie''s heart raced. Peterson glanced at her and continued: "I hope everyone focuses on their primary duties." Jamie knew—he might have noticed something.',
'{"weather":{"name":"Cloudy","icon":"☁️","description":"Overcast sky"},"terrain":{"name":"Meeting Room","icon":"📋","description":"Serious meeting room"},"adventure":{"name":"Crisis","icon":"🚨","description":"Handle crisis"},"equipment":{"name":"Whiteboard","icon":"📋","description":"Meeting whiteboard"}}',
3),

('chapter-bus002-04-en', 'preset-business-002-en', 'Advice from a Pro',
'Jamie connected online with Max, a successful food blogger. Max told her: "I was also an office worker. When my side hustle income exceeded my salary, I quit. But think carefully—full-time blogging is completely different from part-time. The pressure is much greater." Jamie started seriously considering her future.',
'{"weather":{"name":"Light Rain","icon":"🌦️","description":"Light drizzle"},"terrain":{"name":"Restaurant","icon":"🍽️","description":"Business dining"},"adventure":{"name":"Team Management","icon":"👥","description":"Manage team"},"equipment":{"name":"Coffee Cup","icon":"☕","description":"Energy coffee"}}',
4),

('chapter-bus002-05-en', 'preset-business-002-en', 'The Power of Fans',
'Jamie''s video suddenly went viral! Overnight, followers jumped from 100,000 to 500,000. In comments, fans shared their own cooking stories. Some said Jamie''s videos healed their loneliness. For the first time, Jamie felt her hobby could impact so many lives.',
'{"weather":{"name":"Rainbow","icon":"🌈","description":"Rainbow after rain"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Expansion","icon":"🌍","description":"Business expansion"},"equipment":{"name":"Tablet","icon":"📱","description":"Mobile work"}}',
5),

('chapter-bus002-06-en', 'preset-business-002-en', 'The Difficult Choice',
'Boss Peterson called Jamie to his office: "Jamie, I know you''re a food blogger. Company policy doesn''t allow side hustles. Either give it up or leave." Jamie was silent for a long time. She thought of Max''s words, her fans'' messages, the joy she felt on camera. She made her decision.',
'{"weather":{"name":"Thunderstorm","icon":"⛈️","description":"Thunder and rain"},"terrain":{"name":"Office","icon":"🏢","description":"Busy office"},"adventure":{"name":"Transformation","icon":"🔄","description":"Strategic pivot"},"equipment":{"name":"Contract","icon":"📄","description":"Business contract"}}',
6),

('chapter-bus002-07-en', 'preset-business-002-en', 'The Day of Resignation',
'Jamie submitted her resignation. Colleagues were shocked—wasn''t she the most stable employee? Jamie smiled: "I want to try my own possibilities." Walking out the door, she felt both scared and excited. She didn''t know what the future held, but she knew this was the life she wanted.',
'{"weather":{"name":"Sunny","icon":"☀️","description":"Clear weather"},"terrain":{"name":"Lobby","icon":"🏛️","description":"Company lobby"},"adventure":{"name":"Breakthrough","icon":"🚀","description":"Achieve breakthrough"},"equipment":{"name":"Pen","icon":"🖊️","description":"Signing pen"}}',
7),

('chapter-bus002-08-en', 'preset-business-002-en', 'Full-Time Challenges',
'Full-time blogging was harder than Jamie imagined. Unstable income, creative pressure, sometimes days without inspiration. She started missing her steady paycheck. But seeing fans'' messages, she found motivation again. Max told her: "Every creator goes through this phase. Hang in there."',
'{"weather":{"name":"Fog","icon":"🌫️","description":"Foggy weather"},"terrain":{"name":"Office Building","icon":"🏬","description":"Modern office"},"adventure":{"name":"Hold Ground","icon":"🛡️","description":"Hold position"},"equipment":{"name":"Camera","icon":"📷","description":"Filming equipment"}}',
8),

('chapter-bus002-09-en', 'preset-business-002-en', 'Finding Her Path',
'Jamie tried a new content direction—"Healthy Lunchboxes for Office Workers." The series unexpectedly took off. Many office workers like her started following. She discovered her experience became her advantage. She wasn''t the accountant secretly doing a side hustle anymore—she was a creator who truly understood office workers'' needs.',
'{"weather":{"name":"Morning Light","icon":"🌅","description":"Warm morning light"},"terrain":{"name":"Exhibition","icon":"🎪","description":"Industry expo"},"adventure":{"name":"Innovation","icon":"💡","description":"Technical innovation"},"equipment":{"name":"Business Card","icon":"💳","description":"Business card"}}',
9),

('chapter-bus002-10-en', 'preset-business-002-en', 'New Beginning',
'A year later, Jamie''s followers exceeded two million. She published her first cookbook and opened an online ingredient store. Boss Peterson saw her TV interview, speechless. Jamie told the camera: "Thanks to everyone who supported me, and those who doubted me. You taught me that life has no standard answers—only your own choices."',
'{"weather":{"name":"Clear Night","icon":"🌙","description":"Clear night"},"terrain":{"name":"Rooftop","icon":"🌃","description":"Rooftop view"},"adventure":{"name":"Rise","icon":"📈","description":"Rapid rise"},"equipment":{"name":"Trophy","icon":"🏆","description":"Honor symbol"}}',
10);

-- ============================================
-- 预设谜题
-- ============================================

INSERT INTO puzzles (puzzle_id, book_id, chapter_id, puzzle_type, question, answer, hint, order_num) VALUES
-- 儿童冒险 - 星空探险家
('puzzle-adv001-01', 'preset-adventure-001', 'chapter-adv001-03', 'riddle', '什么东西越洗越脏？', '水', '想想洗东西用的是什么', 1),
('puzzle-adv001-02', 'preset-adventure-001', 'chapter-adv001-05', 'riddle', '有头没有颈，身上冷冰冰，有翅不能飞，无脚也能行。', '鱼', '生活在水里', 2),
('puzzle-adv001-03', 'preset-adventure-001', 'chapter-adv001-08', 'riddle', '什么东西晚上才会出来，白天就消失了？', '星星', '抬头看看夜空', 3),

-- 儿童冒险 - 深海探险队
('puzzle-adv002-01', 'preset-adventure-002', 'chapter-adv002-03', 'riddle', '什么东西有牙齿却不能咬东西？', '梳子', '用来整理头发', 1),
('puzzle-adv002-02', 'preset-adventure-002', 'chapter-adv002-05', 'riddle', '千条线，万条线，掉到水里看不见。', '雨', '从天上落下来', 2),
('puzzle-adv002-03', 'preset-adventure-002', 'chapter-adv002-08', 'riddle', '什么东西越热越爱出来？', '汗', '运动后会更多', 3),

-- 魔幻传说 - AI魔法学院
('puzzle-fan001-01', 'preset-fantasy-001', 'chapter-fan001-02', 'riddle', '什么东西有四条腿，却不会走路？', '桌子', '家里常见的家具', 1),
('puzzle-fan001-02', 'preset-fantasy-001', 'chapter-fan001-05', 'riddle', '什么东西越分越多？', '知识', '分享给别人', 2),
('puzzle-fan001-03', 'preset-fantasy-001', 'chapter-fan001-09', 'riddle', '什么东西你拿走越多，它反而越大？', '洞', '挖土的时候', 3),

-- 魔幻传说 - 平行世界的我
('puzzle-fan002-01', 'preset-fantasy-002', 'chapter-fan002-02', 'riddle', '什么东西每天都在前进，但永远不会离开原地？', '时钟', '看墙上的', 1),
('puzzle-fan002-02', 'preset-fantasy-002', 'chapter-fan002-06', 'riddle', '什么东西有头无脚？', '蒜', '厨房里的', 2),
('puzzle-fan002-03', 'preset-fantasy-002', 'chapter-fan002-09', 'riddle', '什么东西越洗越小？', '肥皂', '洗澡用的', 3),

-- 都市言情 - 代码恋人
('puzzle-rom001-01', 'preset-romance-001', 'chapter-rom001-02', 'riddle', '什么东西有眼睛却看不见？', '针', '缝衣服用的', 1),
('puzzle-rom001-02', 'preset-romance-001', 'chapter-rom001-05', 'riddle', '什么东西有嘴不说话？', '茶壶', '倒水用的', 2),
('puzzle-rom001-03', 'preset-romance-001', 'chapter-rom001-08', 'riddle', '什么东西有手不能拿东西？', '钟表', '告诉你时间', 3),

-- 都市言情 - 算法姻缘
('puzzle-rom002-01', 'preset-romance-002', 'chapter-rom002-03', 'riddle', '什么东西有脚不能走路？', '桌子', '四条腿的家具', 1),
('puzzle-rom002-02', 'preset-romance-002', 'chapter-rom002-06', 'riddle', '什么东西有耳朵听不见？', '杯子', '喝水用的', 2),
('puzzle-rom002-03', 'preset-romance-002', 'chapter-rom002-09', 'riddle', '什么东西有舌头不说话？', '鞋子', '穿在脚上的', 3),

-- 职场风云 - 周报战争
('puzzle-bus001-01', 'preset-business-001', 'chapter-bus001-03', 'riddle', '什么东西越用越短？', '铅笔', '写字用的', 1),
('puzzle-bus001-02', 'preset-business-001', 'chapter-bus001-06', 'riddle', '什么东西越烧越长？', '烟', '点火的', 2),
('puzzle-bus001-03', 'preset-business-001', 'chapter-bus001-09', 'riddle', '什么东西有叶子不是树？', '书', '知识的海洋', 3),

-- 职场风云 - 副业狂想曲
('puzzle-bus002-01', 'preset-business-002', 'chapter-bus002-02', 'riddle', '什么东西有脖子没有头？', '瓶子', '装水用的', 1),
('puzzle-bus002-02', 'preset-business-002', 'chapter-bus002-05', 'riddle', '什么东西有背不能坐？', '椅子', '有靠背的家具', 2),
('puzzle-bus002-03', 'preset-business-002', 'chapter-bus002-08', 'riddle', '什么东西有门不能进？', '书柜', '放书的', 3);

-- ============================================
-- 预设情节卡牌
-- ============================================

INSERT INTO plot_cards (card_id, book_id, card_type, name, icon, description, effect) VALUES
-- 儿童冒险 - 星空探险家
('card-adv001-01', 'preset-adventure-001', 'weather', '晴天', '☀️', '阳光明媚的好天气，适合户外探险', '增加探索成功率'),
('card-adv001-02', 'preset-adventure-001', 'terrain', '海滩', '🏖️', '金色的海滩，可以发现海洋的秘密', '解锁海滩探索'),
('card-adv001-03', 'preset-adventure-001', 'adventure', '寻宝', '🗺️', '寻找隐藏的宝藏，充满惊喜', '获得额外奖励'),
('card-adv001-04', 'preset-adventure-001', 'equipment', '望远镜', '🔭', '观察远方，发现隐藏的线索', '解锁远距离观察'),

-- 儿童冒险 - 深海探险队
('card-adv002-01', 'preset-adventure-002', 'weather', '蓝天', '🌤️', '湛蓝的天空，海风轻拂', '增加海上探索效率'),
('card-adv002-02', 'preset-adventure-002', 'terrain', '岛屿', '🏝️', '神秘的岛屿，等待探索', '解锁岛屿任务'),
('card-adv002-03', 'preset-adventure-002', 'adventure', '救援', '🆘', '救援被困的朋友，展现勇气', '增加好感度'),
('card-adv002-04', 'preset-adventure-002', 'equipment', '相机', '📷', '记录美丽的瞬间', '解锁拍照任务'),

-- 魔幻传说 - AI魔法学院
('card-fan001-01', 'preset-fantasy-001', 'weather', '极光', '🌌', '绚丽的魔法极光，充满魔力', '增加魔法效果'),
('card-fan001-02', 'preset-fantasy-001', 'terrain', '魔法塔', '🗼', '高耸的魔法塔，学习魔法的地方', '解锁魔法学习'),
('card-fan001-03', 'preset-fantasy-001', 'adventure', '魔法测试', '📝', '通过魔法试炼，证明实力', '解锁新技能'),
('card-fan001-04', 'preset-fantasy-001', 'equipment', '魔杖', '🪄', '施展魔法的法杖，不可或缺', '增加魔法威力'),

-- 魔幻传说 - 平行世界的我
('card-fan002-01', 'preset-fantasy-002', 'weather', '时空裂隙', '🌀', '时空扭曲的裂缝，通往另一个世界', '解锁时空穿越'),
('card-fan002-02', 'preset-fantasy-002', 'terrain', '镜像空间', '🪞', '镜像的世界，另一个自己', '解锁镜像任务'),
('card-fan002-03', 'preset-fantasy-002', 'adventure', '穿越异界', '🌀', '穿越到另一个世界，探索未知', '解锁平行世界'),
('card-fan002-04', 'preset-fantasy-002', 'equipment', '护身符', '🧿', '保护佩戴者，抵御危险', '增加防御力'),

-- 都市言情 - 代码恋人
('card-rom001-01', 'preset-romance-001', 'weather', '霓虹', '🌃', '城市的霓虹灯，浪漫的夜晚', '增加浪漫氛围'),
('card-rom001-02', 'preset-romance-001', 'terrain', '公司', '🏢', '忙碌的公司，故事开始的地方', '解锁职场剧情'),
('card-rom001-03', 'preset-romance-001', 'adventure', '邂逅', '💫', '命运的相遇，爱情的开始', '增加好感度'),
('card-rom001-04', 'preset-romance-001', 'equipment', '手机', '📱', '联系的工具，传递心意', '解锁通讯功能'),

-- 都市言情 - 算法姻缘
('card-rom002-01', 'preset-romance-002', 'weather', '晴天', '☀️', '阳光明媚，适合约会', '增加约会成功率'),
('card-rom002-02', 'preset-romance-002', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅，浪漫的约会地点', '解锁约会场景'),
('card-rom002-03', 'preset-romance-002', 'adventure', '约会', '🌹', '甜蜜的约会，增进感情', '增加亲密度'),
('card-rom002-04', 'preset-romance-002', 'equipment', '相机', '📷', '记录美好瞬间，留下回忆', '解锁拍照功能'),

-- 职场风云 - 周报战争
('card-bus001-01', 'preset-business-001', 'weather', '阴天', '☁️', '阴沉的天空，职场如战场', '增加紧张氛围'),
('card-bus001-02', 'preset-business-001', 'terrain', '办公室', '🏢', '忙碌的办公室，周报的战场', '解锁职场任务'),
('card-bus001-03', 'preset-business-001', 'adventure', '谈判', '🤝', '商务谈判，展现能力', '增加谈判成功率'),
('card-bus001-04', 'preset-business-001', 'equipment', '笔记本电脑', '💻', '工作必备，战斗的武器', '解锁工作功能'),

-- 职场风云 - 副业狂想曲
('card-bus002-01', 'preset-business-002', 'weather', '晴天', '☀️', '晴朗的天气，新的开始', '增加积极情绪'),
('card-bus002-02', 'preset-business-002', 'terrain', '办公室', '🏢', '忙碌的办公室，双重生活的起点', '解锁副业任务'),
('card-bus002-03', 'preset-business-002', 'adventure', '创新', '💡', '技术创新，突破自我', '解锁创新任务'),
('card-bus002-04', 'preset-business-002', 'equipment', '笔记本电脑', '💻', '工作必备，创作的工具', '解锁创作功能');
