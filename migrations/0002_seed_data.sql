-- ============================================
-- 预设书籍数据（每种类型2本，共8本）
-- ============================================

-- 预设书籍
INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES
-- 儿童冒险
('preset-adventure-001', 'system', '小明的奇幻冒险', 'adventure', 1),
('preset-adventure-002', 'system', '小勇的丛林探险', 'adventure', 1),
-- 魔幻传说
('preset-fantasy-001', 'system', '魔法学院传说', 'fantasy', 1),
('preset-fantasy-002', 'system', '龙之谷秘闻', 'fantasy', 1),
-- 都市言情
('preset-romance-001', 'system', '都市恋曲', 'romance', 1),
('preset-romance-002', 'system', '咖啡馆的邂逅', 'romance', 1),
-- 职场风云
('preset-business-001', 'system', '职场风云录', 'business', 1),
('preset-business-002', 'system', '创业路上的我们', 'business', 1);

-- ============================================
-- 预设角色
-- ============================================

-- 儿童冒险 - 小明的奇幻冒险
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adventure-001', 'preset-adventure-001', '小明', '小探险家', '勇敢', '简洁直接', '👦', NULL, NULL, 1),
('char-adventure-002', 'preset-adventure-001', '小红', '小智者', '聪明', '幽默风趣', '👧', 50, '朋友', 0),
('char-adventure-003', 'preset-adventure-001', '老爷爷', '向导', '睿智', '温和', '👴', 30, '导师', 0);

-- 儿童冒险 - 小勇的丛林探险
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adventure-004', 'preset-adventure-002', '小勇', '小勇士', '勇敢', '简洁直接', '👦', NULL, NULL, 1),
('char-adventure-005', 'preset-adventure-002', '小美', '小动物', '善良', '温柔体贴', '🐱', 60, '朋友', 0),
('char-adventure-006', 'preset-adventure-002', '老船长', '小船长', '沉稳', '严肃正式', '👨‍✈️', 40, '导师', 0);

-- 魔幻传说 - 魔法学院传说
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fantasy-001', 'preset-fantasy-001', '艾拉', '魔法学徒', '好奇', '活泼', '🧙‍♀️', NULL, NULL, 1),
('char-fantasy-002', 'preset-fantasy-001', '马尔克斯', '法师', '严肃', '深沉', '🧙‍♂️', 40, '导师', 0);

-- 魔幻传说 - 龙之谷秘闻
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-fantasy-003', 'preset-fantasy-002', '凯恩', '战士', '勇敢', '简洁直接', '⚔️', NULL, NULL, 1),
('char-fantasy-004', 'preset-fantasy-002', '莉莉', '游侠', '聪明', '幽默风趣', '🏹', 55, '朋友', 0),
('char-fantasy-005', 'preset-fantasy-002', '艾尔文', '牧师', '善良', '温柔体贴', '✝️', 35, '导师', 0);

-- 都市言情 - 都市恋曲
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-romance-001', 'preset-romance-001', '林小雨', '白领', '温柔', '礼貌客气', '👩', NULL, NULL, 1),
('char-romance-002', 'preset-romance-001', '陈明', '设计师', '幽默', '幽默风趣', '👨', 60, '恋人', 0);

-- 都市言情 - 咖啡馆的邂逅
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-romance-003', 'preset-romance-002', '苏晴', '学生', '活泼', '热情奔放', '👩', NULL, NULL, 1),
('char-romance-004', 'preset-romance-002', '陆远', '艺术家', '温柔', '诗意文艺', '🎨', 70, '恋人', 0);

-- 职场风云 - 职场风云录
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-business-001', 'preset-business-001', '张伟', '经理', '冷静', '严肃正式', '👨‍💼', NULL, NULL, 1),
('char-business-002', 'preset-business-001', '李娜', '助理', '细心', '温柔体贴', '👩‍💼', 50, '同事', 0);

-- 职场风云 - 创业路上的我们
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-business-003', 'preset-business-002', '王磊', '创业者', '乐观', '幽默风趣', '👨‍💼', NULL, NULL, 1),
('char-business-004', 'preset-business-002', '陈雨', '顾问', '聪明', '礼貌客气', '👩‍💼', 65, '合作伙伴', 0);

-- ============================================
-- 预设章节 - 儿童冒险：小明的奇幻冒险
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adventure-001-01', 'preset-adventure-001', '神秘的开端', 
'在一个阳光明媚的早晨，小明收到了一封神秘的信件。信上画着一张古老的地图，指向森林深处的一个秘密地点。小明决定踏上探险之旅，他收拾好背包，带上放大镜和指南针，向着森林出发了。森林里阳光透过树叶洒下斑驳的光影，鸟儿在枝头欢快地歌唱。小明一边走一边用放大镜观察地上的脚印，这些脚印似乎通向森林深处。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚的好天气"},"terrain":{"name":"森林","icon":"🌲","description":"神秘的森林"},"adventure":{"name":"寻宝","icon":"🗺️","description":"寻找隐藏的宝藏"},"equipment":{"name":"放大镜","icon":"🔍","description":"观察细节的工具"}}',
1),

('chapter-adventure-001-02', 'preset-adventure-001', '彩虹桥的秘密', 
'雨后的天空出现了一道美丽的彩虹，小明沿着小溪边走边寻找线索。小红从树后跳出来，笑着说："我也要一起去探险！"她手里拿着一个指南针，说这是她爸爸送给她的宝贝。两人决定一起沿着小溪向上游探险，寻找彩虹的尽头。小溪的水清澈见底，偶尔能看到小鱼在水中游来游去。',
'{"weather":{"name":"彩虹天","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"小溪","icon":"💧","description":"清澈的小溪"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"指南针","icon":"🧭","description":"辨别方向"}}',
2),

('chapter-adventure-001-03', 'preset-adventure-001', '草原上的新朋友', 
'微风轻拂着广阔的草原，小明和小红遇到了一只受伤的小兔子。小红蹲下来，从背包里拿出绷带，小心翼翼地为小兔子包扎伤口。小兔子感激地看着他们，蹦蹦跳跳地带领他们向前走去。草原上开满了五颜六色的野花，蝴蝶在花丛中翩翩起舞。小明觉得这次探险比想象中更有意义。',
'{"weather":{"name":"微风天","icon":"🌬️","description":"轻柔的微风"},"terrain":{"name":"草原","icon":"🌿","description":"广阔的草原"},"adventure":{"name":"帮助朋友","icon":"🤝","description":"帮助需要帮助的朋友"},"equipment":{"name":"背包","icon":"🎒","description":"装东西的背包"}}',
3),

('chapter-adventure-001-04', 'preset-adventure-001', '山洞的谜题', 
'小雨淅淅沥沥地下着，小明和小红发现了一个幽深的山洞。他们打开手电筒，小心翼翼地走了进去。山洞的墙壁上刻着奇怪的符号，小红仔细观察后发现这是一个谜题。解开谜题后，一扇暗门缓缓打开，露出了通往宝藏的秘密通道。山洞里回荡着水滴的声音，神秘而又刺激。',
'{"weather":{"name":"小雨天","icon":"🌧️","description":"淅淅沥沥的小雨"},"terrain":{"name":"山洞","icon":"🕳️","description":"幽深的山洞"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"手电筒","icon":"🔦","description":"照亮黑暗"}}',
4),

('chapter-adventure-001-05', 'preset-adventure-001', '星空下的露营', 
'夜幕降临，繁星点点。小明和小红在树屋里搭起了帐篷，准备过夜。老爷爷不知何时出现了，他给他们讲起了关于这片森林的古老传说。原来宝藏是一位善良的精灵留下的，只有心地善良的孩子才能找到。树屋里温暖而舒适，窗外的星空美得让人陶醉。',
'{"weather":{"name":"星空夜","icon":"🌙","description":"繁星点点的夜晚"},"terrain":{"name":"树屋","icon":"🏡","description":"温馨的树屋"},"adventure":{"name":"露营","icon":"⛺","description":"野外露营探险"},"equipment":{"name":"帐篷","icon":"⛺","description":"露营住所"}}',
5),

('chapter-adventure-001-06', 'preset-adventure-001', '花园里的发现', 
'金色的晨光照耀着美丽的花园，小明用望远镜观察远处，发现花园中央有一棵特别的大树。他们走近一看，树上有一个树洞，里面藏着一个古老的盒子。打开盒子，里面是一张新的地图碎片。花园里蝴蝶飞舞，花香四溢，一切都显得那么美好。',
'{"weather":{"name":"金色阳光","icon":"🌅","description":"金色的晨光"},"terrain":{"name":"花园","icon":"🌻","description":"美丽的花园"},"adventure":{"name":"观察动物","icon":"🦋","description":"观察可爱的动物"},"equipment":{"name":"望远镜","icon":"🔭","description":"观察远方"}}',
6),

('chapter-adventure-001-07', 'preset-adventure-001', '湖边的惊喜', 
'湛蓝的天空下，平静的湖泊像一面镜子。小明和小红坐在湖边钓鱼，等待鱼儿上钩。突然，鱼竿猛地一沉，小明用力拉起，钓上来的不是鱼，而是一个防水的小瓶子！瓶子里装着另一张地图碎片。湖水在阳光下闪闪发光，美得像一幅画。',
'{"weather":{"name":"蓝天","icon":"🌤️","description":"湛蓝的天空"},"terrain":{"name":"湖泊","icon":"🏞️","description":"平静的湖泊"},"adventure":{"name":"钓鱼","icon":"🎣","description":"在湖边钓鱼"},"equipment":{"name":"水壶","icon":"🥤","description":"装水的水壶"}}',
7),

('chapter-adventure-001-08', 'preset-adventure-001', '山顶的风景', 
'夕阳西下，绚丽的晚霞染红了天空。小明和小红用绳子互相帮助，一起攀登到山顶。站在山顶，他们看到了整个森林的全貌，也发现了宝藏的最终位置。山顶的风很大，但风景美得让人忘记了疲惫。他们知道，最后的冒险即将到来。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"绚丽的夕阳"},"terrain":{"name":"山顶","icon":"⛰️","description":"高耸的山峰"},"adventure":{"name":"登山","icon":"🧗","description":"攀登高峰"},"equipment":{"name":"绳子","icon":"🪢","description":"攀爬工具"}}',
8),

('chapter-adventure-001-09', 'preset-adventure-001', '峡谷迷宫', 
'晨雾弥漫，深邃的峡谷像一个巨大的迷宫。小明拿出地图，仔细辨认方向。他们在峡谷中穿行，遇到了许多岔路。小红的聪明才智帮助他们找到了正确的道路。峡谷里有时会听到奇怪的回声，但他们并不害怕，因为他们相信彼此。',
'{"weather":{"name":"晨雾","icon":"🌫️","description":"朦胧的晨雾"},"terrain":{"name":"峡谷","icon":"🏔️","description":"深邃的峡谷"},"adventure":{"name":"迷宫","icon":"🌀","description":"探索神秘的迷宫"},"equipment":{"name":"地图","icon":"🗺️","description":"指引方向"}}',
9),

('chapter-adventure-001-10', 'preset-adventure-001', '瀑布后的宝藏', 
'璀璨的流星雨划过夜空，小明和小红终于来到了壮观的瀑布前。他们发现瀑布后面有一个洞穴，里面就是传说中的宝藏！打开宝箱，里面不是金银财宝，而是一本古老的故事书和一面能够实现愿望的镜子。他们明白了，真正的宝藏是这段旅程中收获的友谊和勇气。',
'{"weather":{"name":"流星雨","icon":"🌠","description":"璀璨的流星雨"},"terrain":{"name":"瀑布","icon":"💦","description":"壮观的瀑布"},"adventure":{"name":"救援","icon":"🆘","description":"救援被困的朋友"},"equipment":{"name":"急救箱","icon":"🩹","description":"处理伤口"}}',
10);

-- ============================================
-- 预设章节 - 儿童冒险：小勇的丛林探险
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adventure-002-01', 'preset-adventure-002', '海边的出发', 
'阳光明媚的早晨，小勇站在金色的海滩上，手里拿着老船长送给他的指南针。老船长告诉他，远处的岛屿上藏着一个古老的秘密。小勇决定踏上这次丛林探险之旅。海浪轻轻拍打着沙滩，海鸥在天空中自由地飞翔。小勇深吸一口气，向着未知的冒险迈出了第一步。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚的好天气"},"terrain":{"name":"海滩","icon":"🏖️","description":"金色的海滩"},"adventure":{"name":"探险","icon":"🧭","description":"探索未知的地方"},"equipment":{"name":"指南针","icon":"🧭","description":"辨别方向"}}',
1),

('chapter-adventure-002-02', 'preset-adventure-002', '神秘岛屿', 
'白云朵朵飘浮在空中，小勇乘坐小船来到了神秘的岛屿。他拿出地图，开始探索这座从未有人涉足的岛屿。岛上的植物高大而奇特，空气中弥漫着花香。小美是一只聪明的小猫，它跳到小勇的肩膀上，陪他一起探险。岛上的路很复杂，但地图上的标记指引着方向。',
'{"weather":{"name":"白云","icon":"☁️","description":"朵朵白云"},"terrain":{"name":"岛屿","icon":"🏝️","description":"神秘的岛屿"},"adventure":{"name":"寻宝","icon":"🗺️","description":"寻找隐藏的宝藏"},"equipment":{"name":"地图","icon":"🗺️","description":"指引方向"}}',
2),

('chapter-adventure-002-03', 'preset-adventure-002', '热带雨林的奇遇', 
'美丽的彩虹出现在天空中，小勇和小美进入了茂密的热带雨林。雨林里到处都是奇异的植物和色彩斑斓的蝴蝶。小勇用相机记录下这些美丽的瞬间。小美突然跳下他的肩膀，追着一只蓝色的蝴蝶跑进了深处。小勇赶紧跟上，发现了一个隐藏的小路。',
'{"weather":{"name":"彩虹天","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"热带雨林","icon":"🌴","description":"茂密的热带雨林"},"adventure":{"name":"观察动物","icon":"🦋","description":"观察可爱的动物"},"equipment":{"name":"相机","icon":"📷","description":"拍摄美景"}}',
3),

('chapter-adventure-002-04', 'preset-adventure-002', '湿地骑行', 
'小雨淅淅沥沥地下着，小勇骑着自行车穿过茂密的湿地。湿地里长满了高高的芦苇，偶尔能看到水鸟从芦苇丛中飞起。背包里的食物和水足够他们用几天。小美坐在前面的篮子里，好奇地看着周围的一切。雨中的湿地别有一番风味，空气清新而湿润。',
'{"weather":{"name":"小雨天","icon":"🌧️","description":"淅淅沥沥的小雨"},"terrain":{"name":"湿地","icon":"🌾","description":"茂密的湿地"},"adventure":{"name":"骑行","icon":"🚴","description":"骑自行车探险"},"equipment":{"name":"背包","icon":"🎒","description":"装东西的背包"}}',
4),

('chapter-adventure-002-05', 'preset-adventure-002', '雪山挑战', 
'银装素裹的雪山上，小勇和小美开始了滑雪之旅。虽然天气很冷，但他们的心是热的。小勇从背包里拿出睡袋，准备在雪山上过夜。夜晚的雪山安静而神秘，星星在天空中闪烁。小美蜷缩在小勇身边，给他带来温暖。他们知道，明天还有更长的路要走。',
'{"weather":{"name":"雪天","icon":"❄️","description":"银装素裹的雪景"},"terrain":{"name":"雪山","icon":"🏔️","description":"皑皑雪山"},"adventure":{"name":"滑雪","icon":"⛷️","description":"在雪山上滑雪"},"equipment":{"name":"睡袋","icon":"🛏️","description":"野外睡觉"}}',
5),

('chapter-adventure-002-06', 'preset-adventure-002', '古堡的秘密', 
'星空璀璨的夜晚，小勇和小美来到了一座古老的城堡前。城堡看起来已经荒废了很久，但依然保持着它的威严。小勇打开手电筒，小心翼翼地走了进去。城堡里到处是灰尘和蜘蛛网，但墙上挂着的画像似乎在诉说着过去的故事。小美突然停下脚步，对着一个角落叫了起来。',
'{"weather":{"name":"星空夜","icon":"🌙","description":"繁星点点的夜晚"},"terrain":{"name":"古堡","icon":"🏰","description":"古老的城堡"},"adventure":{"name":"发现秘密","icon":"🔮","description":"揭开隐藏的秘密"},"equipment":{"name":"手电筒","icon":"🔦","description":"照亮黑暗"}}',
6),

('chapter-adventure-002-07', 'preset-adventure-002', '废墟中的线索', 
'绚丽的极光照亮了夜空，小勇在废墟中发现了一个古老的笔记本。笔记本上记载着关于这座岛屿的历史，以及一个隐藏宝藏的线索。小勇仔细阅读每一页，把重要的信息记在心里。废墟虽然破败，但每一块石头似乎都在诉说着古老的故事。小美在一旁安静地陪伴着他。',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的极光"},"terrain":{"name":"废墟","icon":"🏚️","description":"神秘的废墟"},"adventure":{"name":"解谜","icon":"🧩","description":"解开古老的谜题"},"equipment":{"name":"笔记本","icon":"📓","description":"记录发现"}}',
7),

('chapter-adventure-002-08', 'preset-adventure-002', '洞穴生存', 
'电闪雷鸣，暴风雨来临了。小勇和小美躲进了一个幽暗的洞穴里。洞穴里很黑，但小勇的刀具帮助他点燃了一堆篝火。火光温暖了整个洞穴，也照亮了洞壁上的壁画。这些壁画描绘着古代居民的生活场景，让小勇对这个岛屿有了更深的了解。暴风雨持续了一整夜。',
'{"weather":{"name":"雷电","icon":"⛈️","description":"电闪雷鸣"},"terrain":{"name":"洞穴","icon":"🪨","description":"幽暗的洞穴"},"adventure":{"name":"生存","icon":"🏕️","description":"野外生存挑战"},"equipment":{"name":"刀具","icon":"🔪","description":"多用途工具"}}',
8),

('chapter-adventure-002-09', 'preset-adventure-002', '瀑布追逐', 
'晨雾渐渐散去，小勇和小美来到了壮观的瀑布前。他们发现一只受伤的小鹿被困在瀑布上方的岩石上。小勇用望远镜观察情况，然后小心翼翼地爬上去救援。小鹿感激地看着他们，然后消失在丛林中。瀑布的水声震耳欲聋，水雾弥漫在空气中，形成了一道小小的彩虹。',
'{"weather":{"name":"晨雾","icon":"🌫️","description":"朦胧的晨雾"},"terrain":{"name":"瀑布","icon":"💦","description":"壮观的瀑布"},"adventure":{"name":"追逐","icon":"🏃","description":"追逐逃跑的目标"},"equipment":{"name":"望远镜","icon":"🔭","description":"观察远方"}}',
9),

('chapter-adventure-002-10', 'preset-adventure-002', '彩虹谷的胜利', 
'雨后的彩虹谷五彩斑斓，小勇和小美终于找到了他们一直在寻找的地方。这里是一个被群山环绕的山谷，到处都是美丽的花朵和清澈的溪流。他们在山谷中搭起帐篷，庆祝这次探险的成功。老船长的话是对的，真正的宝藏不是金银财宝，而是这段旅程中的成长和友谊。',
'{"weather":{"name":"彩虹雨","icon":"🌦️","description":"雨后彩虹"},"terrain":{"name":"彩虹谷","icon":"🌈","description":"五彩斑斓的山谷"},"adventure":{"name":"比赛","icon":"🏆","description":"参加精彩的比赛"},"equipment":{"name":"帐篷","icon":"⛺","description":"露营住所"}}',
10);

-- ============================================
-- 预设谜题 - 儿童冒险
-- ============================================

INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES
('puzzle-adventure-001', 'chapter-adventure-001-04', '什么东西越洗越脏？', '水', 'text', NULL),
('puzzle-adventure-002', 'chapter-adventure-001-09', '森林里最常见的颜色是什么？', '绿色', 'choice', '["红色","绿色","蓝色","黄色"]'),
('puzzle-adventure-003', 'chapter-adventure-002-06', '什么东西有头没有脚？', '火柴', 'text', NULL),
('puzzle-adventure-004', 'chapter-adventure-002-07', '岛屿周围是什么？', '海', 'choice', '["山","海","森林","沙漠"]');

-- ============================================
-- 预设章节 - 魔幻传说：魔法学院传说
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fantasy-001-01', 'preset-fantasy-001', '入学测试', 
'绚丽的极光照亮了魔法森林的夜空，艾拉紧张地站在魔法学院的大门前。今天是入学测试的日子，她紧紧握着新买的魔杖，心中充满期待。马尔克斯导师出现在她面前，严肃地说："准备好了吗？"艾拉深吸一口气，点了点头。魔法森林里传来阵阵奇异的鸟鸣，仿佛在为她加油。',
'{"weather":{"name":"极光","icon":"🌌","description":"绚丽的魔法极光"},"terrain":{"name":"魔法森林","icon":"🌳","description":"充满魔法的森林"},"adventure":{"name":"魔法测试","icon":"📝","description":"通过魔法试炼"},"equipment":{"name":"魔杖","icon":"🪄","description":"施展魔法的法杖"}}',
1),

('chapter-fantasy-001-02', 'preset-fantasy-001', '魔法塔的秘密', 
'元素能量在空中涌动，艾拉跟随马尔克斯导师来到了高耸的魔法塔。塔内藏书万卷，每一本都记载着古老的魔法。马尔克斯递给她一本厚重的法典，说："这是你的第一课。"艾拉翻开书页，发现里面记载着各种元素魔法的奥秘。她如饥似渴地学习着，忘记了时间的流逝。',
'{"weather":{"name":"元素乱流","icon":"⚡","description":"元素能量涌动"},"terrain":{"name":"魔法塔","icon":"🗼","description":"高耸的魔法塔"},"adventure":{"name":"魔法研究","icon":"📚","description":"研究古老的魔法"},"equipment":{"name":"法典","icon":"📖","description":"记载魔法的书籍"}}',
2),

('chapter-fantasy-001-03', 'preset-fantasy-001', '精灵的友谊', 
'精灵的光芒洒落在精灵村落，艾拉第一次见到了传说中的精灵族。他们优雅而神秘，与自然和谐共处。一位精灵长老走到艾拉面前，将一颗水晶球交给她。长老说："这是精灵的祝福，它会指引你找到真正的力量。"艾拉感受到水晶球中蕴含的纯净魔力，心中充满感激。',
'{"weather":{"name":"精灵光","icon":"🧚","description":"精灵的光芒"},"terrain":{"name":"精灵村落","icon":"🧚","description":"精灵的家园"},"adventure":{"name":"精灵结盟","icon":"🧚","description":"与精灵结为盟友"},"equipment":{"name":"水晶球","icon":"🔮","description":"占卜和储存魔力"}}',
3),

('chapter-fantasy-001-04', 'preset-fantasy-001', '元素觉醒', 
'充满魔力的雨水落在水晶洞穴上，发出悦耳的声音。艾拉在洞穴深处发现了一颗元素宝石，它散发着四种元素的光芒。当她触碰宝石的瞬间，一股强大的力量涌入她的身体。火焰、水流、风刃、岩石——四种元素在她周围旋转，她终于觉醒了元素之力。',
'{"weather":{"name":"魔法雨","icon":"💧","description":"充满魔力的雨水"},"terrain":{"name":"水晶洞穴","icon":"💎","description":"水晶闪耀的洞穴"},"adventure":{"name":"元素觉醒","icon":"🔥","description":"掌控元素之力"},"equipment":{"name":"元素宝石","icon":"💠","description":"储存元素之力"}}',
4),

('chapter-fantasy-001-05', 'preset-fantasy-001', '深渊的考验', 
'血红色的月亮悬挂在深渊上空，艾拉站在深渊边缘，感受着来自深处的召唤。马尔克斯导师告诉她，只有战胜内心的恐惧，才能获得真正的力量。艾拉握紧护身符，纵身跳入深渊。在黑暗中，她看到了自己最害怕的东西，但她没有退缩，而是勇敢地面对。',
'{"weather":{"name":"血月","icon":"🔴","description":"神秘的血月之夜"},"terrain":{"name":"深渊","icon":"🕳️","description":"无尽的深渊"},"adventure":{"name":"觉醒力量","icon":"💫","description":"觉醒隐藏的力量"},"equipment":{"name":"护身符","icon":"🧿","description":"保护佩戴者"}}',
5),

('chapter-fantasy-001-06', 'preset-fantasy-001', '异界之旅', 
'魔法风暴席卷大地，艾拉在浮空岛上发现了一个神秘的传送门。她拿出传送卷轴，念出咒语，传送门缓缓打开。门后是一个完全不同的世界——异界。艾拉踏入传送门，开始了她的异界之旅。这个世界充满了未知的危险和机遇，她必须小心应对。',
'{"weather":{"name":"魔法风暴","icon":"🌀","description":"充满魔力的风暴"},"terrain":{"name":"浮空岛","icon":"🏝️","description":"漂浮在空中的岛屿"},"adventure":{"name":"穿越异界","icon":"🌀","description":"穿越到另一个世界"},"equipment":{"name":"传送卷轴","icon":"📜","description":"瞬间传送"}}',
6),

('chapter-fantasy-001-07', 'preset-fantasy-001', '神圣使命', 
'神圣的光芒照耀着古老的神殿，艾拉在这里遇到了一位神秘的老者。老者告诉她，她被选中成为守护者，肩负着保护魔法世界的使命。艾拉戴上法师帽，感受到一股强大的力量涌入体内。她明白，这是她的命运，也是她的责任。',
'{"weather":{"name":"光明普照","icon":"✨","description":"神圣的光芒"},"terrain":{"name":"神殿","icon":"⛩️","description":"神圣的殿堂"},"adventure":{"name":"守护使命","icon":"🛡️","description":"守护重要的东西"},"equipment":{"name":"法师帽","icon":"🎩","description":"增强魔力"}}',
7),

('chapter-fantasy-001-08', 'preset-fantasy-001', '封印之战', 
'无尽的黑暗笼罩着暗影沼泽，艾拉在这里遇到了被封印的恶魔。恶魔试图挣脱束缚，艾拉必须阻止它。她拿出封印卷轴，开始念诵古老的咒语。黑暗与光明在沼泽上空交织，艾拉咬紧牙关，将所有的魔力注入卷轴。终于，恶魔被重新封印。',
'{"weather":{"name":"黑暗降临","icon":"🌑","description":"无尽的黑暗"},"terrain":{"name":"暗影沼泽","icon":"🌑","description":"阴暗的沼泽"},"adventure":{"name":"封印恶魔","icon":"😈","description":"封印邪恶的恶魔"},"equipment":{"name":"封印卷轴","icon":"📜","description":"封印邪恶"}}',
8),

('chapter-fantasy-001-09', 'preset-fantasy-001', '屠龙之战', 
'星辰从天而降，照亮了巨龙的巢穴。艾拉穿上龙鳞甲，准备面对她最大的挑战——一条远古巨龙。巨龙喷出烈焰，艾拉用魔法护盾抵挡。经过激烈的战斗，艾拉终于找到了巨龙的弱点，用魔法将其击败。巨龙在临死前，将它的力量赐予了艾拉。',
'{"weather":{"name":"星辰坠落","icon":"💫","description":"星辰从天而降"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"屠龙","icon":"🐉","description":"挑战巨龙"},"equipment":{"name":"龙鳞甲","icon":"🛡️","description":"龙鳞制成的护甲"}}',
9),

('chapter-fantasy-001-10', 'preset-fantasy-001', '元素融合', 
'创世之初的光芒照耀着天空城，艾拉站在城市的最高处。她将四种元素的力量融合在一起，创造出了前所未有的新魔法。马尔克斯导师站在她身后，欣慰地看着她。艾拉终于成为了一名真正的魔法师，她的旅程才刚刚开始。',
'{"weather":{"name":"创世晨曦","icon":"🌅","description":"创世之初的光芒"},"terrain":{"name":"天空城","icon":"🏰","description":"云端的城市"},"adventure":{"name":"元素融合","icon":"🌈","description":"融合元素之力"},"equipment":{"name":"元素法杖","icon":"🔥","description":"操控元素"}}',
10);

-- ============================================
-- 预设章节 - 魔幻传说：龙之谷秘闻
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-fantasy-002-01', 'preset-fantasy-002', '遗迹探险', 
'阳光照耀着古老的遗迹，凯恩手持矮人锤，小心翼翼地踏入这片被遗忘的土地。传说这里藏着一件神器，能够改变世界的命运。莉莉和艾尔文跟在他身后，警惕地观察着四周。遗迹中弥漫着古老的气息，每一块石头都在诉说着过去的故事。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"古代遗迹","icon":"🏛️","description":"古老的文明遗迹"},"adventure":{"name":"寻找神器","icon":"⚔️","description":"寻找传说中的神器"},"equipment":{"name":"矮人锤","icon":"🔨","description":"矮人锻造的锤子"}}',
1),

('chapter-fantasy-002-02', 'preset-fantasy-002', '矮人之友', 
'元素风暴席卷着矮人矿山，凯恩在这里遇到了矮人铁匠大师。大师被凯恩的勇气所打动，决定帮助他锻造一件神器。凯恩将矮人锤交给大师，大师用精灵弓的材料与之融合，创造出了一件全新的武器。凯恩握着新武器，感受到其中蕴含的强大力量。',
'{"weather":{"name":"元素风暴","icon":"🌪️","description":"四元素交织的风暴"},"terrain":{"name":"矮人矿山","icon":"⛏️","description":"矮人的矿洞"},"adventure":{"name":"神器锻造","icon":"🔨","description":"锻造神器"},"equipment":{"name":"精灵弓","icon":"🏹","description":"精灵制作的弓"}}',
2),

('chapter-fantasy-002-03', 'preset-fantasy-002', '龙之对决', 
'流星火雨从天而降，凯恩站在巨龙的巢穴前。这是一条远古巨龙，它的力量足以毁灭一切。凯恩没有退缩，他举起武器，与巨龙展开了生死对决。经过艰苦的战斗，凯恩终于击败了巨龙，获得了龙之心脏——这是最强大的魔法材料。',
'{"weather":{"name":"流星火雨","icon":"☄️","description":"火焰流星坠落"},"terrain":{"name":"龙之巢","icon":"🐉","description":"巨龙的巢穴"},"adventure":{"name":"屠龙","icon":"🐉","description":"挑战巨龙"},"equipment":{"name":"龙之心脏","icon":"❤️","description":"巨龙的力量"}}',
3),

('chapter-fantasy-002-04', 'preset-fantasy-002', '灵魂救赎', 
'充满灵魂的迷雾笼罩着亡灵陵园，凯恩在这里遇到了许多迷失的灵魂。艾尔文用他的神圣力量，帮助这些灵魂找到安息。凯恩将灵魂石放在地上，灵魂们纷纷涌入其中，获得了永恒的安宁。陵园中的阴霾渐渐散去，阳光重新照耀大地。',
'{"weather":{"name":"灵魂雾","icon":"👻","description":"充满灵魂的迷雾"},"terrain":{"name":"亡灵陵园","icon":"💀","description":"亡灵的安息地"},"adventure":{"name":"灵魂救赎","icon":"👼","description":"救赎迷失的灵魂"},"equipment":{"name":"灵魂石","icon":"💜","description":"储存灵魂"}}',
4),

('chapter-fantasy-002-05', 'preset-fantasy-002', '时空穿梭', 
'时空扭曲的裂缝出现在眼前，凯恩决定踏入其中。他拿出传送门符，激活了传送门。穿过传送门后，他发现自己来到了一个完全不同的时代。在这个时代，他看到了许多不可思议的事情，也学到了许多珍贵的知识。',
'{"weather":{"name":"时空裂隙","icon":"🌀","description":"时空扭曲的裂缝"},"terrain":{"name":"时间裂缝","icon":"⏳","description":"时间扭曲之地"},"adventure":{"name":"时空穿梭","icon":"⏳","description":"穿越时空"},"equipment":{"name":"传送门符","icon":"🌀","description":"开启传送门"}}',
5),

('chapter-fantasy-002-06', 'preset-fantasy-002', '解除诅咒', 
'觉醒之光从天而降，照亮了封印之地。凯恩发现这里封印着一个古老的诅咒，它正在慢慢侵蚀这片土地。他用召唤石召唤出强大的元素生物，帮助他解除诅咒。经过一番努力，诅咒终于被解除，大地重新恢复了生机。',
'{"weather":{"name":"觉醒之光","icon":"💫","description":"力量觉醒的光芒"},"terrain":{"name":"封印之地","icon":"🔒","description":"封印恶魔的地方"},"adventure":{"name":"解除诅咒","icon":"🔮","description":"解除古老的诅咒"},"equipment":{"name":"召唤石","icon":"💎","description":"召唤生物"}}',
6),

('chapter-fantasy-002-07', 'preset-fantasy-002', '血脉传承', 
'巨龙吐息形成的云朵漂浮在神秘海域上空，凯恩在这里发现了一个惊人的秘密——他的血脉中流淌着龙族的血液。他穿上魔法披风，感受到龙族的力量在体内觉醒。莉莉和艾尔文惊讶地看着他，他们终于明白为什么凯恩能够击败巨龙。',
'{"weather":{"name":"龙息云","icon":"🐉","description":"巨龙吐息形成的云"},"terrain":{"name":"神秘海域","icon":"🌊","description":"神秘的海域"},"adventure":{"name":"血脉传承","icon":"🩸","description":"觉醒血脉力量"},"equipment":{"name":"魔法披风","icon":"🧥","description":"隐身和防护"}}',
7),

('chapter-fantasy-002-08', 'preset-fantasy-002', '召唤仪式', 
'末日的预兆出现在异世界上空，凯恩决定进行一个危险的召唤仪式。他将魔法药水倒入祭坛，开始念诵古老的咒语。一个强大的存在被召唤出来，它告诉凯恩关于世界命运的真相。凯恩明白，他必须做出选择，这将决定整个世界的未来。',
'{"weather":{"name":"末日景象","icon":"🌋","description":"末日的预兆"},"terrain":{"name":"异世界","icon":"🌀","description":"另一个维度"},"adventure":{"name":"召唤仪式","icon":"🌀","description":"召唤强大的存在"},"equipment":{"name":"魔法药水","icon":"🧪","description":"各种效果的药水"}}',
8),

('chapter-fantasy-002-09', 'preset-fantasy-002', '魔法对决', 
'恶魔的气息弥漫在镜像空间中，凯恩在这里遇到了他的镜像——一个由黑暗力量构成的自己。这是一场真正的魔法对决，凯恩必须战胜自己的阴暗面。他戴上精灵戒指，借助精灵的力量，最终击败了镜像。这场胜利让他更加了解自己。',
'{"weather":{"name":"恶魔雾","icon":"😈","description":"恶魔的气息"},"terrain":{"name":"镜像空间","icon":"🪞","description":"镜像的世界"},"adventure":{"name":"魔法对决","icon":"⚡","description":"魔法师的决斗"},"equipment":{"name":"精灵戒指","icon":"💍","description":"精灵的祝福"}}',
9),

('chapter-fantasy-002-10', 'preset-fantasy-002', '元素试炼', 
'创世之初的光芒照耀着元素位面，凯恩站在元素之神的面前。这是最后的试炼，他必须证明自己配得上这份力量。他举起元素法杖，将四种元素的力量完美融合。元素之神满意地点了点头，将守护者的称号赐予了他。凯恩的旅程圆满结束，但新的冒险才刚刚开始。',
'{"weather":{"name":"创世晨曦","icon":"🌅","description":"创世之初的光芒"},"terrain":{"name":"元素位面","icon":"🔥","description":"元素的世界"},"adventure":{"name":"元素试炼","icon":"🔥","description":"元素之神的考验"},"equipment":{"name":"元素法杖","icon":"🔥","description":"操控元素"}}',
10);

-- ============================================
-- 预设谜题 - 魔幻传说
-- ============================================

INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES
('puzzle-fantasy-001', 'chapter-fantasy-001-04', '四大元素是什么？', '地水火风', 'text', NULL),
('puzzle-fantasy-002', 'chapter-fantasy-001-08', '什么能驱散黑暗？', '光', 'choice', '["黑暗","光","水","风"]'),
('puzzle-fantasy-003', 'chapter-fantasy-002-03', '巨龙最怕什么？', '勇者', 'text', NULL),
('puzzle-fantasy-004', 'chapter-fantasy-002-06', '封印之地封印着什么？', '诅咒', 'choice', '["宝藏","诅咒","神器","龙"]');

-- ============================================
-- 预设章节 - 都市言情：都市恋曲
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-romance-001-01', 'preset-romance-001', '地铁邂逅', 
'温暖的晨光照进了拥挤的地铁站，林小雨匆忙地挤进车厢，不小心撞到了一个高大的身影。"对不起！"她连忙道歉，抬头却看到了一双温柔的眼睛。那个男人微笑着说："没关系。"他就是陈明，一个年轻的设计师。两人的目光交汇，仿佛时间静止了一瞬。',
'{"weather":{"name":"晨光","icon":"🌅","description":"温暖的晨光"},"terrain":{"name":"地铁站","icon":"🚇","description":"繁忙的地铁站"},"adventure":{"name":"邂逅","icon":"💫","description":"命运的相遇"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
1),

('chapter-romance-001-02', 'preset-romance-001', '咖啡厅的约会', 
'阳光透过咖啡厅的玻璃窗洒进来，林小雨和陈明坐在靠窗的位置。桌上放着两杯香浓的咖啡，陈明讲起了他的设计工作，林小雨听得入迷。她发现陈明不仅幽默风趣，还有着独特的艺术眼光。这个下午，他们聊了很多，仿佛认识了很久。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"咖啡","icon":"☕","description":"温暖的咖啡"}}',
2),

('chapter-romance-001-03', 'preset-romance-001', '公园表白', 
'夕阳染红了整个公园，陈明带着林小雨来到了一片花海前。他手里拿着一束鲜花，深情地看着林小雨说："小雨，我喜欢你，做我女朋友好吗？"林小雨的心跳加速，她羞涩地点了点头。公园里的花儿似乎都在为他们祝福。',
'{"weather":{"name":"夕阳","icon":"🌇","description":"浪漫的夕阳"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"表白","icon":"💌","description":"表达心意"},"equipment":{"name":"鲜花","icon":"💐","description":"浪漫的礼物"}}',
3),

('chapter-romance-001-04', 'preset-romance-001', '雨中的误会', 
'淅淅沥沥的雨下着，林小雨在公司门口看到了陈明和另一个女人在一起。她误会了，以为陈明背叛了她。她转身跑进雨中，泪水混合着雨水。陈明追了出来，用雨伞为她遮雨，解释说那只是他的表妹。误会解开后，两人相拥而泣。',
'{"weather":{"name":"雨天","icon":"🌧️","description":"淅淅沥沥的雨"},"terrain":{"name":"公司","icon":"🏢","description":"忙碌的公司"},"adventure":{"name":"误会","icon":"😔","description":"令人心痛的误会"},"equipment":{"name":"雨伞","icon":"☂️","description":"雨中共享"}}',
4),

('chapter-romance-001-05', 'preset-romance-001', '天台星空', 
'繁星点点的夜空下，林小雨和陈明坐在城市的天台上。他们分享着耳机里的音乐，聊着未来的梦想。陈明说他想开一家自己的设计工作室，林小雨说她想写一本属于自己的书。在这个安静的夜晚，两颗心更加贴近。',
'{"weather":{"name":"星空","icon":"⭐","description":"繁星点点"},"terrain":{"name":"天台","icon":"🌃","description":"城市的天台"},"adventure":{"name":"陪伴","icon":"👫","description":"默默的陪伴"},"equipment":{"name":"耳机","icon":"🎧","description":"分享音乐"}}',
5),

('chapter-romance-001-06', 'preset-romance-001', '初雪的追求', 
'第一场雪飘落下来，街头变得银装素裹。陈明围着林小雨送给他的围巾，在雪地里追逐嬉戏。他突然停下脚步，认真地说："小雨，我想和你一起走过每一个冬天。"林小雨感动地笑了，她知道这就是她想要的爱情。',
'{"weather":{"name":"初雪","icon":"❄️","description":"第一场雪"},"terrain":{"name":"街头","icon":"🏘️","description":"怀旧的老街"},"adventure":{"name":"追求","icon":"💝","description":"努力追求"},"equipment":{"name":"围巾","icon":"🧣","description":"温暖的礼物"}}',
6),

('chapter-romance-001-07', 'preset-romance-001', '桥上暧昧', 
'皎洁的月光洒在河面上，林小雨和陈明并肩站在桥上。陈明拿出一个音乐盒，轻轻转动，美妙的旋律响起。他看着林小雨说："这首歌送给你。"暧昧的气氛在两人之间流淌，林小雨的心跳得很快。',
'{"weather":{"name":"月色","icon":"🌙","description":"皎洁的月光"},"terrain":{"name":"桥上","icon":"🌉","description":"河上的桥"},"adventure":{"name":"暧昧","icon":"💗","description":"暧昧的时光"},"equipment":{"name":"音乐盒","icon":"🎵","description":"浪漫的音乐"}}',
7),

('chapter-romance-001-08', 'preset-romance-001', '校园热恋', 
'樱花雨飘落在校园里，林小雨和陈明回到了他们相识的地方。陈明用相机记录下这美好的瞬间，他说："我想把我们的每一个回忆都保存下来。"两人相视而笑，热恋的甜蜜在樱花雨中绽放。',
'{"weather":{"name":"樱花雨","icon":"🌸","description":"樱花飘落的美景"},"terrain":{"name":"校园","icon":"🏫","description":"青春的校园"},"adventure":{"name":"热恋","icon":"❤️","description":"热恋的甜蜜"},"equipment":{"name":"相机","icon":"📷","description":"记录美好瞬间"}}',
8),

('chapter-romance-001-09', 'preset-romance-001', '山顶求婚', 
'流星划过山顶的夜空，陈明单膝跪地，拿出一枚戒指。他深情地说："林小雨，嫁给我好吗？"林小雨激动得说不出话来，只是拼命地点头。山顶的风很大，但他们的心很暖。这一刻，成为了他们一生中最美好的回忆。',
'{"weather":{"name":"流星","icon":"🌠","description":"划过天际的流星"},"terrain":{"name":"山顶","icon":"⛰️","description":"俯瞰城市的山顶"},"adventure":{"name":"求婚","icon":"💍","description":"浪漫的求婚"},"equipment":{"name":"戒指","icon":"💍","description":"爱情的象征"}}',
9),

('chapter-romance-001-10', 'preset-romance-001', '海边婚礼', 
'美丽的彩虹出现在海边，林小雨穿着洁白的婚纱，陈明穿着笔挺的西装。他们在海边交换了项链，许下了永恒的誓言。海浪轻轻拍打着沙滩，仿佛在为他们祝福。从此以后，他们将携手走过人生的每一个春夏秋冬。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"海边","icon":"🏖️","description":"浪漫的海边"},"adventure":{"name":"结婚","icon":"💒","description":"步入婚姻"},"equipment":{"name":"项链","icon":"📿","description":"珍贵的礼物"}}',
10);

-- ============================================
-- 预设章节 - 都市言情：咖啡馆的邂逅
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-romance-002-01', 'preset-romance-002', '雨天相遇', 
'雨淅淅沥沥地下着，苏晴躲进了路边的一家咖啡馆。她找了个角落坐下，拿出一本书开始阅读。这时，一个温文尔雅的男人走了过来，问："这里有人吗？"苏晴抬头，看到了陆远——一个年轻的艺术家。他们的故事，从这个雨天开始。',
'{"weather":{"name":"雨天","icon":"🌧️","description":"淅淅沥沥的雨"},"terrain":{"name":"咖啡厅","icon":"☕","description":"温馨的咖啡厅"},"adventure":{"name":"邂逅","icon":"💫","description":"命运的相遇"},"equipment":{"name":"书本","icon":"📚","description":"共同的爱好"}}',
1),

('chapter-romance-002-02', 'preset-romance-002', '画廊暧昧', 
'阴天的午后，苏晴来到了陆远的画展。她站在一幅画前，画中的女孩和她很像。陆远走过来，轻声说："这是我心中的缪斯。"苏晴的心跳加速，她感受到了陆远眼中的温柔。暧昧的气氛在画廊中弥漫。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"画廊","icon":"🖼️","description":"艺术的画廊"},"adventure":{"name":"暧昧","icon":"💗","description":"暧昧的时光"},"equipment":{"name":"画板","icon":"🎨","description":"艺术的创作"}}',
2),

('chapter-romance-002-03', 'preset-romance-002', '公园约会', 
'阳光明媚的周末，陆远带着吉他约苏晴去公园。他们坐在草地上，陆远为她弹唱了一首情歌。苏晴闭上眼睛，感受着阳光和音乐的美好。这是她最幸福的一天，她知道她已经爱上了这个温柔的男人。',
'{"weather":{"name":"晴天","icon":"☀️","description":"阳光明媚"},"terrain":{"name":"公园","icon":"🌳","description":"安静的公园"},"adventure":{"name":"约会","icon":"🌹","description":"甜蜜的约会"},"equipment":{"name":"吉他","icon":"🎸","description":"浪漫的弹唱"}}',
3),

('chapter-romance-002-04', 'preset-romance-002', '老街表白', 
'温柔的黄昏笼罩着老街，陆远牵着苏晴的手，漫步在石板路上。他突然停下脚步，从口袋里拿出一封信，递给苏晴。信上写满了他对她的爱意。苏晴读完信，眼眶湿润，她紧紧拥抱了陆远。',
'{"weather":{"name":"黄昏","icon":"🌆","description":"温柔的黄昏"},"terrain":{"name":"老街","icon":"🏘️","description":"怀旧的老街"},"adventure":{"name":"表白","icon":"💌","description":"表达心意"},"equipment":{"name":"信纸","icon":"✉️","description":"手写的情书"}}',
4),

('chapter-romance-002-05', 'preset-romance-002', '天台热恋', 
'繁星点点的夜空下，苏晴和陆远在天台上分享着一瓶红酒。他们聊着梦想，聊着未来。陆远说："我想和你一起看遍所有的星空。"苏晴靠在他的肩膀上，感受着热恋的甜蜜。这一刻，世界仿佛只剩下他们两个人。',
'{"weather":{"name":"星空","icon":"⭐","description":"繁星点点"},"terrain":{"name":"天台","icon":"🌃","description":"城市的天台"},"adventure":{"name":"热恋","icon":"❤️","description":"热恋的甜蜜"},"equipment":{"name":"红酒","icon":"🍷","description":"浪漫的饮品"}}',
5),

('chapter-romance-002-06', 'preset-romance-002', '书店误会', 
'初雪飘落的日子，苏晴在书店看到陆远和另一个女人在一起。她误会了，以为陆远变心了。她买了一盒巧克力，独自走在雪地里。陆远追了上来，解释说那是他的画廊合作伙伴。误会解开后，苏晴破涕为笑。',
'{"weather":{"name":"初雪","icon":"❄️","description":"第一场雪"},"terrain":{"name":"书店","icon":"📖","description":"安静的书店"},"adventure":{"name":"误会","icon":"😔","description":"令人心痛的误会"},"equipment":{"name":"巧克力","icon":"🍫","description":"甜蜜的味道"}}',
6),

('chapter-romance-002-07', 'preset-romance-002', '餐厅和解', 
'月光洒在浪漫的餐厅里，陆远为苏晴准备了一场烛光晚餐。桌上摆满了鲜花，他诚恳地道歉，并承诺以后会更加坦诚。苏晴感动地接受了道歉，两人的感情更加深厚。餐厅里的音乐轻轻响起，他们跳起了舞。',
'{"weather":{"name":"月色","icon":"🌙","description":"皎洁的月光"},"terrain":{"name":"餐厅","icon":"🍽️","description":"浪漫的餐厅"},"adventure":{"name":"和解","icon":"🤝","description":"重归于好"},"equipment":{"name":"鲜花","icon":"💐","description":"浪漫的礼物"}}',
7),

('chapter-romance-002-08', 'preset-romance-002', '海边同居', 
'樱花雨飘落在海边，陆远把一把钥匙交给了苏晴。他说："搬来和我一起住吧。"苏晴接过钥匙，眼中闪烁着幸福的泪光。从今天开始，他们将开始共同生活。海风轻轻吹过，带来了春天的气息。',
'{"weather":{"name":"樱花雨","icon":"🌸","description":"樱花飘落的美景"},"terrain":{"name":"海边","icon":"🏖️","description":"浪漫的海边"},"adventure":{"name":"同居","icon":"🏠","description":"开始共同生活"},"equipment":{"name":"钥匙","icon":"🔑","description":"家的象征"}}',
8),

('chapter-romance-002-09', 'preset-romance-002', '山顶求婚', 
'流星划过山顶的夜空，陆远单膝跪地，拿出一枚戒指。他说："苏晴，嫁给我好吗？我想和你一起度过余生。"苏晴激动得说不出话来，只是拼命地点头。山顶的风很大，但他们的心很暖。',
'{"weather":{"name":"流星","icon":"🌠","description":"划过天际的流星"},"terrain":{"name":"山顶","icon":"⛰️","description":"俯瞰城市的山顶"},"adventure":{"name":"求婚","icon":"💍","description":"浪漫的求婚"},"equipment":{"name":"戒指","icon":"💍","description":"爱情的象征"}}',
9),

('chapter-romance-002-10', 'preset-romance-002', '教堂婚礼', 
'美丽的彩虹出现在教堂上空，苏晴穿着洁白的婚纱，缓缓走向陆远。他们在神父面前交换了誓言，许下了永恒的承诺。教堂的钟声响起，祝福着这对新人。从此以后，他们将携手走过人生的每一个春夏秋冬。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"美丽的彩虹"},"terrain":{"name":"教堂","icon":"💒","description":"神圣的教堂"},"adventure":{"name":"结婚","icon":"💒","description":"步入婚姻"},"equipment":{"name":"婚纱","icon":"👗","description":"最美的礼服"}}',
10);

-- ============================================
-- 预设谜题 - 都市言情
-- ============================================

INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES
('puzzle-romance-001', 'chapter-romance-001-03', '表白时送什么花最合适？', '玫瑰', 'choice', '["玫瑰","向日葵","菊花","牡丹"]'),
('puzzle-romance-002', 'chapter-romance-001-09', '求婚时送什么？', '戒指', 'text', NULL),
('puzzle-romance-003', 'chapter-romance-002-04', '情书用什么写？', '信纸', 'text', NULL),
('puzzle-romance-004', 'chapter-romance-002-09', '求婚时说什么？', '嫁给我', 'choice', '["你好","嫁给我","再见","谢谢"]');

-- ============================================
-- 预设章节 - 职场风云：职场风云录
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-business-001-01', 'preset-business-001', '新项目启动', 
'阳光明媚的早晨，张伟走进办公室，开始了新的一天。公司刚刚接到了一个大项目，作为经理的他需要组建团队。李娜拿着笔记本电脑走了过来，说："张经理，项目资料已经准备好了。"张伟点点头，开始规划项目的时间表和任务分配。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"办公室","icon":"🏢","description":"忙碌的办公室"},"adventure":{"name":"项目启动","icon":"🚀","description":"启动新项目"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
1),

('chapter-business-001-02', 'preset-business-001', '团队会议', 
'阴沉的天空下，张伟在会议室里召开团队会议。白板上写满了项目的关键节点和任务分配。团队成员们各抒己见，讨论着如何高效完成项目。张伟认真听取每个人的意见，然后做出了最终决策。会议结束后，每个人都清楚了自己的任务。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"白板","icon":"📋","description":"会议白板"}}',
2),

('chapter-business-001-03', 'preset-business-001', '客户谈判', 
'雨淅淅沥沥地下着，张伟带着团队来到客户公司。这是一次重要的商务谈判，关系到项目的成败。张伟拿出合同，详细介绍了公司的方案和优势。经过几个小时的谈判，客户终于点头同意。张伟松了一口气，这次谈判成功了。',
'{"weather":{"name":"雨天","icon":"🌧️","description":"下雨天"},"terrain":{"name":"客户公司","icon":"🏛️","description":"客户的办公地"},"adventure":{"name":"谈判","icon":"🤝","description":"商务谈判"},"equipment":{"name":"合同","icon":"📄","description":"商务合同"}}',
3),

('chapter-business-001-04', 'preset-business-001', '展会竞标', 
'多云的天气，张伟带着团队参加了行业展会。这是展示公司实力的重要机会，也是竞标的关键时刻。张伟拿着名片，与各路业内人士交流。最终，他们的方案脱颖而出，成功中标。团队的欢呼声在展会上响起。',
'{"weather":{"name":"多云","icon":"⛅","description":"多云天气"},"terrain":{"name":"展会","icon":"🎪","description":"行业展会"},"adventure":{"name":"竞标","icon":"📊","description":"项目竞标"},"equipment":{"name":"名片","icon":"💳","description":"商务名片"}}',
4),

('chapter-business-001-05', 'preset-business-001', '危机处理', 
'晴朗的夜晚，张伟在酒店里接到了一个紧急电话。项目出现了重大问题，需要立即处理。他拿出手机，连夜联系各方资源，协调解决方案。经过一夜的努力，危机终于解除。张伟疲惫地躺在床上，但心里很踏实。',
'{"weather":{"name":"晴朗夜空","icon":"🌙","description":"晴朗的夜晚"},"terrain":{"name":"酒店","icon":"🏨","description":"商务酒店"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
5),

('chapter-business-001-06', 'preset-business-001', '融资之路', 
'大风呼啸着，张伟在机场等待飞往投资方的航班。公司需要融资来扩大业务，这次路演至关重要。他拖着行李箱，心里默默准备着演讲稿。飞机起飞后，他望着窗外的云层，思考着未来的发展方向。',
'{"weather":{"name":"大风","icon":"💨","description":"大风天气"},"terrain":{"name":"机场","icon":"✈️","description":"出差的机场"},"adventure":{"name":"融资","icon":"💰","description":"获得融资"},"equipment":{"name":"行李箱","icon":"🧳","description":"出差装备"}}',
6),

('chapter-business-001-07', 'preset-business-001', '业务扩张', 
'雨后的彩虹出现在总部大楼上空，张伟站在办公室里，看着窗外的风景。公司刚刚完成了新一轮融资，是时候扩张业务了。他拿着奖杯，回想起创业初期的艰辛。如今，公司已经走上了正轨，未来可期。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"雨后彩虹"},"terrain":{"name":"总部","icon":"🏙️","description":"公司总部"},"adventure":{"name":"扩张","icon":"🌍","description":"业务扩张"},"equipment":{"name":"奖杯","icon":"🏆","description":"荣誉象征"}}',
7),

('chapter-business-001-08', 'preset-business-001', '战略转型', 
'雷阵雨倾盆而下，张伟在工厂里视察生产线。市场环境变化，公司需要进行战略转型。他拿着平板电脑，查看着新的业务数据。转型是痛苦的，但也是必要的。张伟相信，只要方向正确，公司一定能够度过难关。',
'{"weather":{"name":"雷阵雨","icon":"⛈️","description":"雷雨交加"},"terrain":{"name":"工厂","icon":"🏭","description":"生产工厂"},"adventure":{"name":"转型","icon":"🔄","description":"战略转型"},"equipment":{"name":"平板电脑","icon":"📱","description":"移动办公"}}',
8),

('chapter-business-001-09', 'preset-business-001', '技术创新', 
'小雨淅淅沥沥地下着，张伟在咖啡馆里与一位技术专家会面。他们讨论着公司的技术创新方向，寻找突破口。张伟用钢笔在笔记本上记录着关键点。这次会面让他看到了新的机会，公司即将迎来技术升级。',
'{"weather":{"name":"小雨","icon":"🌦️","description":"绵绵细雨"},"terrain":{"name":"咖啡馆","icon":"☕","description":"商务洽谈"},"adventure":{"name":"创新","icon":"💡","description":"技术创新"},"equipment":{"name":"钢笔","icon":"🖊️","description":"签字用笔"}}',
9),

('chapter-business-001-10', 'preset-business-001', '产品发布', 
'阴转晴的天空下，张伟站在写字楼的会议室里，准备发布公司的新产品。投影仪播放着产品演示，台下坐满了媒体和客户。张伟自信地介绍着产品的特点和创新之处。发布会结束后，掌声雷动，公司又迈上了一个新台阶。',
'{"weather":{"name":"阴转晴","icon":"🌤️","description":"天气转好"},"terrain":{"name":"写字楼","icon":"🏬","description":"现代化写字楼"},"adventure":{"name":"产品发布","icon":"🎉","description":"发布新产品"},"equipment":{"name":"投影仪","icon":"📽️","description":"演示设备"}}',
10);

-- ============================================
-- 预设章节 - 职场风云：创业路上的我们
-- ============================================

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-business-002-01', 'preset-business-002', '创业初心', 
'阳光明媚的早晨，王磊坐在咖啡馆里，打开笔记本电脑。他有一个创业的梦想，想要打造一款改变人们生活的产品。陈雨走了过来，说："你的商业计划书写得很好，我愿意成为你的顾问。"王磊激动地握住她的手，创业之路正式开始。',
'{"weather":{"name":"晴天","icon":"☀️","description":"晴朗的天气"},"terrain":{"name":"咖啡馆","icon":"☕","description":"商务洽谈"},"adventure":{"name":"项目启动","icon":"🚀","description":"启动新项目"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"工作必备"}}',
1),

('chapter-business-002-02', 'preset-business-002', '融资挑战', 
'阴沉的天空下，王磊站在写字楼的大厅里，等待与投资人会面。这是他第一次路演，心里既紧张又期待。他拿着商业计划书，反复练习着演讲内容。投资人终于出现了，王磊深吸一口气，开始了他的展示。',
'{"weather":{"name":"阴天","icon":"☁️","description":"阴沉的天空"},"terrain":{"name":"写字楼","icon":"🏬","description":"现代化写字楼"},"adventure":{"name":"融资","icon":"💰","description":"获得融资"},"equipment":{"name":"商业计划书","icon":"📄","description":"项目规划"}}',
2),

('chapter-business-002-03', 'preset-business-002', '合作谈判', 
'雨淅淅沥沥地下着，王磊在会议室里与合作伙伴进行谈判。双方就合作细节展开了激烈的讨论，王磊坚持自己的底线，同时也做出了一些让步。最终，双方达成了共识，签署了合同。这次合作为公司带来了新的发展机遇。',
'{"weather":{"name":"雨天","icon":"🌧️","description":"下雨天"},"terrain":{"name":"会议室","icon":"📋","description":"严肃的会议室"},"adventure":{"name":"谈判","icon":"🤝","description":"商务谈判"},"equipment":{"name":"合同","icon":"📄","description":"商务合同"}}',
3),

('chapter-business-002-04', 'preset-business-002', '展会亮相', 
'多云的天气，王磊带着团队参加了创业展会。他们的展位设计独特，吸引了很多人的关注。王磊拿着展板，向每一位来访者介绍他们的产品。展会结束后，他们收获了很多潜在客户和合作伙伴的联系方式。',
'{"weather":{"name":"多云","icon":"⛅","description":"多云天气"},"terrain":{"name":"展会","icon":"🎪","description":"行业展会"},"adventure":{"name":"竞标","icon":"📊","description":"项目竞标"},"equipment":{"name":"展板","icon":"🖼️","description":"展示材料"}}',
4),

('chapter-business-002-05', 'preset-business-002', '生产危机', 
'大风呼啸着，王磊在工厂里处理一起生产事故。产品质量出现了问题，需要立即召回。他拿出手机，联系各方资源，协调解决方案。这次危机让他意识到质量控制的重要性，公司开始建立更严格的质量管理体系。',
'{"weather":{"name":"大风","icon":"💨","description":"大风天气"},"terrain":{"name":"工厂","icon":"🏭","description":"生产工厂"},"adventure":{"name":"危机处理","icon":"🚨","description":"处理危机"},"equipment":{"name":"手机","icon":"📱","description":"联系的工具"}}',
5),

('chapter-business-002-06', 'preset-business-002', '团队建设', 
'雷阵雨倾盆而下，王磊在总部召开团队建设会议。公司发展迅速，团队也在不断壮大。他拿着名册，介绍每一位新成员。王磊相信，优秀的团队是公司成功的关键。会议结束后，大家一起去聚餐，增进感情。',
'{"weather":{"name":"雷阵雨","icon":"⛈️","description":"雷雨交加"},"terrain":{"name":"总部","icon":"🏙️","description":"公司总部"},"adventure":{"name":"团队管理","icon":"👥","description":"管理团队"},"equipment":{"name":"名册","icon":"📒","description":"客户名单"}}',
6),

('chapter-business-002-07', 'preset-business-002', '海外扩张', 
'雨后的彩虹出现在机场上空，王磊拖着行李箱，准备飞往海外开拓市场。这是公司第一次进军国际市场，意义重大。陈雨在机场送他，说："一切顺利，我们等你回来。"王磊点点头，踏上了飞往新天地的航班。',
'{"weather":{"name":"彩虹","icon":"🌈","description":"雨后彩虹"},"terrain":{"name":"机场","icon":"✈️","description":"出差的机场"},"adventure":{"name":"扩张","icon":"🌍","description":"业务扩张"},"equipment":{"name":"行李箱","icon":"🧳","description":"出差装备"}}',
7),

('chapter-business-002-08', 'preset-business-002', '跨界合作', 
'小雨淅淅沥沥地下着，王磊在酒店里与一位跨界合作伙伴会面。他们讨论着如何将两个不同行业的优势结合起来，创造新的商业模式。王磊用翻译器与对方交流，克服了语言障碍。这次合作为公司打开了新的大门。',
'{"weather":{"name":"小雨","icon":"🌦️","description":"绵绵细雨"},"terrain":{"name":"酒店","icon":"🏨","description":"商务酒店"},"adventure":{"name":"跨界","icon":"🌐","description":"跨界合作"},"equipment":{"name":"翻译器","icon":"🗣️","description":"跨国沟通"}}',
8),

('chapter-business-002-09', 'preset-business-002', '技术突破', 
'阴转晴的天空下，王磊在实验室里见证了一次技术突破。研发团队经过几个月的努力，终于攻克了一个关键技术难题。王磊看着打印机输出的测试报告，激动得说不出话来。这项技术将为公司带来巨大的竞争优势。',
'{"weather":{"name":"阴转晴","icon":"🌤️","description":"天气转好"},"terrain":{"name":"实验室","icon":"🔬","description":"研发实验室"},"adventure":{"name":"创新","icon":"💡","description":"技术创新"},"equipment":{"name":"打印机","icon":"🖨️","description":"文件打印"}}',
9),

('chapter-business-002-10', 'preset-business-002', '上市之路', 
'晴朗的夜晚，王磊站在楼顶，俯瞰着城市的灯火。公司即将上市，这是他创业以来最重要的时刻。他拿着奖杯，回想起创业初期的艰辛。从一个小小的想法，到如今的上市公司，王磊感慨万千。但他知道，这只是新的开始。',
'{"weather":{"name":"晴朗夜空","icon":"🌙","description":"晴朗的夜晚"},"terrain":{"name":"楼顶","icon":"🌃","description":"天台风景"},"adventure":{"name":"上市","icon":"📈","description":"公司上市"},"equipment":{"name":"奖杯","icon":"🏆","description":"荣誉象征"}}',
10);

-- ============================================
-- 预设谜题 - 职场风云
-- ============================================

INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES
('puzzle-business-001', 'chapter-business-001-03', '商务谈判最重要的是什么？', '诚信', 'choice', '["诚信","速度","价格","数量"]'),
('puzzle-business-002', 'chapter-business-001-06', '融资需要什么？', '商业计划书', 'text', NULL),
('puzzle-business-003', 'chapter-business-002-02', '创业最重要的是什么？', '团队', 'choice', '["资金","团队","办公室","设备"]'),
('puzzle-business-004', 'chapter-business-002-10', '上市意味着什么？', '成功', 'text', NULL);

-- ============================================
-- 预设书籍卡牌数据
-- ============================================

-- 小明的奇幻冒险 (preset-adventure-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-adv001-w01', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-adv001-w02', 'preset-adventure-001', 'plot', 'weather', '彩虹天', '🌈', '天气类型卡牌', 0),
('card-preset-adv001-w03', 'preset-adventure-001', 'plot', 'weather', '微风天', '🌬️', '天气类型卡牌', 0),
('card-preset-adv001-w04', 'preset-adventure-001', 'plot', 'weather', '小雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-adv001-t01', 'preset-adventure-001', 'plot', 'terrain', '森林', '🌲', '地形类型卡牌', 0),
('card-preset-adv001-t02', 'preset-adventure-001', 'plot', 'terrain', '小溪', '💧', '地形类型卡牌', 0),
('card-preset-adv001-t03', 'preset-adventure-001', 'plot', 'terrain', '草原', '🌿', '地形类型卡牌', 0),
('card-preset-adv001-t04', 'preset-adventure-001', 'plot', 'terrain', '山洞', '🕳️', '地形类型卡牌', 0),
('card-preset-adv001-a01', 'preset-adventure-001', 'plot', 'adventure', '寻宝', '🗺️', '冒险类型卡牌', 0),
('card-preset-adv001-a02', 'preset-adventure-001', 'plot', 'adventure', '探险', '🧭', '冒险类型卡牌', 0),
('card-preset-adv001-a03', 'preset-adventure-001', 'plot', 'adventure', '帮助朋友', '🤝', '冒险类型卡牌', 0),
('card-preset-adv001-a04', 'preset-adventure-001', 'plot', 'adventure', '发现秘密', '🔮', '冒险类型卡牌', 0),
('card-preset-adv001-e01', 'preset-adventure-001', 'plot', 'equipment', '放大镜', '🔍', '装备类型卡牌', 0),
('card-preset-adv001-e02', 'preset-adventure-001', 'plot', 'equipment', '指南针', '🧭', '装备类型卡牌', 0),
('card-preset-adv001-e03', 'preset-adventure-001', 'plot', 'equipment', '背包', '🎒', '装备类型卡牌', 0),
('card-preset-adv001-e04', 'preset-adventure-001', 'plot', 'equipment', '手电筒', '🔦', '装备类型卡牌', 0);

-- 小勇的丛林探险 (preset-adventure-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-adv002-w01', 'preset-adventure-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-adv002-w02', 'preset-adventure-002', 'plot', 'weather', '白云', '☁️', '天气类型卡牌', 0),
('card-preset-adv002-w03', 'preset-adventure-002', 'plot', 'weather', '彩虹天', '🌈', '天气类型卡牌', 0),
('card-preset-adv002-w04', 'preset-adventure-002', 'plot', 'weather', '小雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-adv002-t01', 'preset-adventure-002', 'plot', 'terrain', '海滩', '🏖️', '地形类型卡牌', 0),
('card-preset-adv002-t02', 'preset-adventure-002', 'plot', 'terrain', '岛屿', '🏝️', '地形类型卡牌', 0),
('card-preset-adv002-t03', 'preset-adventure-002', 'plot', 'terrain', '热带雨林', '🌴', '地形类型卡牌', 0),
('card-preset-adv002-t04', 'preset-adventure-002', 'plot', 'terrain', '雪山', '🏔️', '地形类型卡牌', 0),
('card-preset-adv002-a01', 'preset-adventure-002', 'plot', 'adventure', '探险', '🧭', '冒险类型卡牌', 0),
('card-preset-adv002-a02', 'preset-adventure-002', 'plot', 'adventure', '寻宝', '🗺️', '冒险类型卡牌', 0),
('card-preset-adv002-a03', 'preset-adventure-002', 'plot', 'adventure', '观察动物', '🦋', '冒险类型卡牌', 0),
('card-preset-adv002-a04', 'preset-adventure-002', 'plot', 'adventure', '骑行', '🚴', '冒险类型卡牌', 0),
('card-preset-adv002-e01', 'preset-adventure-002', 'plot', 'equipment', '指南针', '🧭', '装备类型卡牌', 0),
('card-preset-adv002-e02', 'preset-adventure-002', 'plot', 'equipment', '地图', '🗺️', '装备类型卡牌', 0),
('card-preset-adv002-e03', 'preset-adventure-002', 'plot', 'equipment', '相机', '📷', '装备类型卡牌', 0),
('card-preset-adv002-e04', 'preset-adventure-002', 'plot', 'equipment', '背包', '🎒', '装备类型卡牌', 0);

-- 魔法学院传说 (preset-fantasy-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-fan001-w01', 'preset-fantasy-001', 'plot', 'weather', '极光', '🌌', '天气类型卡牌', 0),
('card-preset-fan001-w02', 'preset-fantasy-001', 'plot', 'weather', '元素乱流', '⚡', '天气类型卡牌', 0),
('card-preset-fan001-w03', 'preset-fantasy-001', 'plot', 'weather', '精灵光', '🧚', '天气类型卡牌', 0),
('card-preset-fan001-w04', 'preset-fantasy-001', 'plot', 'weather', '魔法雨', '💧', '天气类型卡牌', 0),
('card-preset-fan001-t01', 'preset-fantasy-001', 'plot', 'terrain', '魔法森林', '🌳', '地形类型卡牌', 0),
('card-preset-fan001-t02', 'preset-fantasy-001', 'plot', 'terrain', '魔法塔', '🗼', '地形类型卡牌', 0),
('card-preset-fan001-t03', 'preset-fantasy-001', 'plot', 'terrain', '精灵村落', '🧚', '地形类型卡牌', 0),
('card-preset-fan001-t04', 'preset-fantasy-001', 'plot', 'terrain', '水晶洞穴', '💎', '地形类型卡牌', 0),
('card-preset-fan001-a01', 'preset-fantasy-001', 'plot', 'adventure', '魔法测试', '📝', '冒险类型卡牌', 0),
('card-preset-fan001-a02', 'preset-fantasy-001', 'plot', 'adventure', '魔法研究', '📚', '冒险类型卡牌', 0),
('card-preset-fan001-a03', 'preset-fantasy-001', 'plot', 'adventure', '精灵结盟', '🧚', '冒险类型卡牌', 0),
('card-preset-fan001-a04', 'preset-fantasy-001', 'plot', 'adventure', '元素觉醒', '🔥', '冒险类型卡牌', 0),
('card-preset-fan001-e01', 'preset-fantasy-001', 'plot', 'equipment', '魔杖', '🪄', '装备类型卡牌', 0),
('card-preset-fan001-e02', 'preset-fantasy-001', 'plot', 'equipment', '法典', '📖', '装备类型卡牌', 0),
('card-preset-fan001-e03', 'preset-fantasy-001', 'plot', 'equipment', '水晶球', '🔮', '装备类型卡牌', 0),
('card-preset-fan001-e04', 'preset-fantasy-001', 'plot', 'equipment', '元素宝石', '💠', '装备类型卡牌', 0);

-- 龙之谷秘闻 (preset-fantasy-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-fan002-w01', 'preset-fantasy-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-fan002-w02', 'preset-fantasy-002', 'plot', 'weather', '元素风暴', '🌪️', '天气类型卡牌', 0),
('card-preset-fan002-w03', 'preset-fantasy-002', 'plot', 'weather', '流星火雨', '☄️', '天气类型卡牌', 0),
('card-preset-fan002-w04', 'preset-fantasy-002', 'plot', 'weather', '灵魂雾', '👻', '天气类型卡牌', 0),
('card-preset-fan002-t01', 'preset-fantasy-002', 'plot', 'terrain', '古代遗迹', '🏛️', '地形类型卡牌', 0),
('card-preset-fan002-t02', 'preset-fantasy-002', 'plot', 'terrain', '矮人矿山', '⛏️', '地形类型卡牌', 0),
('card-preset-fan002-t03', 'preset-fantasy-002', 'plot', 'terrain', '龙之巢', '🐉', '地形类型卡牌', 0),
('card-preset-fan002-t04', 'preset-fantasy-002', 'plot', 'terrain', '亡灵陵园', '💀', '地形类型卡牌', 0),
('card-preset-fan002-a01', 'preset-fantasy-002', 'plot', 'adventure', '寻找神器', '⚔️', '冒险类型卡牌', 0),
('card-preset-fan002-a02', 'preset-fantasy-002', 'plot', 'adventure', '神器锻造', '🔨', '冒险类型卡牌', 0),
('card-preset-fan002-a03', 'preset-fantasy-002', 'plot', 'adventure', '屠龙', '🐉', '冒险类型卡牌', 0),
('card-preset-fan002-a04', 'preset-fantasy-002', 'plot', 'adventure', '灵魂救赎', '👼', '冒险类型卡牌', 0),
('card-preset-fan002-e01', 'preset-fantasy-002', 'plot', 'equipment', '矮人锤', '🔨', '装备类型卡牌', 0),
('card-preset-fan002-e02', 'preset-fantasy-002', 'plot', 'equipment', '精灵弓', '🏹', '装备类型卡牌', 0),
('card-preset-fan002-e03', 'preset-fantasy-002', 'plot', 'equipment', '龙之心脏', '❤️', '装备类型卡牌', 0),
('card-preset-fan002-e04', 'preset-fantasy-002', 'plot', 'equipment', '灵魂石', '💜', '装备类型卡牌', 0);

-- 都市恋曲 (preset-romance-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-rom001-w01', 'preset-romance-001', 'plot', 'weather', '晨光', '🌅', '天气类型卡牌', 0),
('card-preset-rom001-w02', 'preset-romance-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-rom001-w03', 'preset-romance-001', 'plot', 'weather', '夕阳', '🌇', '天气类型卡牌', 0),
('card-preset-rom001-w04', 'preset-romance-001', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-rom001-t01', 'preset-romance-001', 'plot', 'terrain', '地铁站', '🚇', '地形类型卡牌', 0),
('card-preset-rom001-t02', 'preset-romance-001', 'plot', 'terrain', '咖啡厅', '☕', '地形类型卡牌', 0),
('card-preset-rom001-t03', 'preset-romance-001', 'plot', 'terrain', '公园', '🌳', '地形类型卡牌', 0),
('card-preset-rom001-t04', 'preset-romance-001', 'plot', 'terrain', '公司', '🏢', '地形类型卡牌', 0),
('card-preset-rom001-a01', 'preset-romance-001', 'plot', 'adventure', '邂逅', '💫', '冒险类型卡牌', 0),
('card-preset-rom001-a02', 'preset-romance-001', 'plot', 'adventure', '约会', '🌹', '冒险类型卡牌', 0),
('card-preset-rom001-a03', 'preset-romance-001', 'plot', 'adventure', '表白', '💌', '冒险类型卡牌', 0),
('card-preset-rom001-a04', 'preset-romance-001', 'plot', 'adventure', '误会', '😔', '冒险类型卡牌', 0),
('card-preset-rom001-e01', 'preset-romance-001', 'plot', 'equipment', '手机', '📱', '装备类型卡牌', 0),
('card-preset-rom001-e02', 'preset-romance-001', 'plot', 'equipment', '咖啡', '☕', '装备类型卡牌', 0),
('card-preset-rom001-e03', 'preset-romance-001', 'plot', 'equipment', '鲜花', '💐', '装备类型卡牌', 0),
('card-preset-rom001-e04', 'preset-romance-001', 'plot', 'equipment', '雨伞', '☂️', '装备类型卡牌', 0);

-- 咖啡馆的邂逅 (preset-romance-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-rom002-w01', 'preset-romance-002', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-rom002-w02', 'preset-romance-002', 'plot', 'weather', '阴天', '☁️', '天气类型卡牌', 0),
('card-preset-rom002-w03', 'preset-romance-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-rom002-w04', 'preset-romance-002', 'plot', 'weather', '黄昏', '🌆', '天气类型卡牌', 0),
('card-preset-rom002-t01', 'preset-romance-002', 'plot', 'terrain', '咖啡厅', '☕', '地形类型卡牌', 0),
('card-preset-rom002-t02', 'preset-romance-002', 'plot', 'terrain', '画廊', '🖼️', '地形类型卡牌', 0),
('card-preset-rom002-t03', 'preset-romance-002', 'plot', 'terrain', '公园', '🌳', '地形类型卡牌', 0),
('card-preset-rom002-t04', 'preset-romance-002', 'plot', 'terrain', '老街', '🏘️', '地形类型卡牌', 0),
('card-preset-rom002-a01', 'preset-romance-002', 'plot', 'adventure', '邂逅', '💫', '冒险类型卡牌', 0),
('card-preset-rom002-a02', 'preset-romance-002', 'plot', 'adventure', '暧昧', '💗', '冒险类型卡牌', 0),
('card-preset-rom002-a03', 'preset-romance-002', 'plot', 'adventure', '约会', '🌹', '冒险类型卡牌', 0),
('card-preset-rom002-a04', 'preset-romance-002', 'plot', 'adventure', '表白', '💌', '冒险类型卡牌', 0),
('card-preset-rom002-e01', 'preset-romance-002', 'plot', 'equipment', '书本', '📚', '装备类型卡牌', 0),
('card-preset-rom002-e02', 'preset-romance-002', 'plot', 'equipment', '画板', '🎨', '装备类型卡牌', 0),
('card-preset-rom002-e03', 'preset-romance-002', 'plot', 'equipment', '吉他', '🎸', '装备类型卡牌', 0),
('card-preset-rom002-e04', 'preset-romance-002', 'plot', 'equipment', '信纸', '✉️', '装备类型卡牌', 0);

-- 职场风云录 (preset-business-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-bus001-w01', 'preset-business-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-bus001-w02', 'preset-business-001', 'plot', 'weather', '阴天', '☁️', '天气类型卡牌', 0),
('card-preset-bus001-w03', 'preset-business-001', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-bus001-w04', 'preset-business-001', 'plot', 'weather', '多云', '⛅', '天气类型卡牌', 0),
('card-preset-bus001-t01', 'preset-business-001', 'plot', 'terrain', '办公室', '🏢', '地形类型卡牌', 0),
('card-preset-bus001-t02', 'preset-business-001', 'plot', 'terrain', '会议室', '📋', '地形类型卡牌', 0),
('card-preset-bus001-t03', 'preset-business-001', 'plot', 'terrain', '客户公司', '🏛️', '地形类型卡牌', 0),
('card-preset-bus001-t04', 'preset-business-001', 'plot', 'terrain', '展会', '🎪', '地形类型卡牌', 0),
('card-preset-bus001-a01', 'preset-business-001', 'plot', 'adventure', '项目启动', '🚀', '冒险类型卡牌', 0),
('card-preset-bus001-a02', 'preset-business-001', 'plot', 'adventure', '团队管理', '👥', '冒险类型卡牌', 0),
('card-preset-bus001-a03', 'preset-business-001', 'plot', 'adventure', '谈判', '🤝', '冒险类型卡牌', 0),
('card-preset-bus001-a04', 'preset-business-001', 'plot', 'adventure', '竞标', '📊', '冒险类型卡牌', 0),
('card-preset-bus001-e01', 'preset-business-001', 'plot', 'equipment', '笔记本电脑', '💻', '装备类型卡牌', 0),
('card-preset-bus001-e02', 'preset-business-001', 'plot', 'equipment', '白板', '📋', '装备类型卡牌', 0),
('card-preset-bus001-e03', 'preset-business-001', 'plot', 'equipment', '合同', '📄', '装备类型卡牌', 0),
('card-preset-bus001-e04', 'preset-business-001', 'plot', 'equipment', '名片', '💳', '装备类型卡牌', 0);

-- 创业路上的我们 (preset-business-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-bus002-w01', 'preset-business-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-bus002-w02', 'preset-business-002', 'plot', 'weather', '阴天', '☁️', '天气类型卡牌', 0),
('card-preset-bus002-w03', 'preset-business-002', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-bus002-w04', 'preset-business-002', 'plot', 'weather', '多云', '⛅', '天气类型卡牌', 0),
('card-preset-bus002-t01', 'preset-business-002', 'plot', 'terrain', '咖啡馆', '☕', '地形类型卡牌', 0),
('card-preset-bus002-t02', 'preset-business-002', 'plot', 'terrain', '写字楼', '🏬', '地形类型卡牌', 0),
('card-preset-bus002-t03', 'preset-business-002', 'plot', 'terrain', '会议室', '📋', '地形类型卡牌', 0),
('card-preset-bus002-t04', 'preset-business-002', 'plot', 'terrain', '展会', '🎪', '地形类型卡牌', 0),
('card-preset-bus002-a01', 'preset-business-002', 'plot', 'adventure', '项目启动', '🚀', '冒险类型卡牌', 0),
('card-preset-bus002-a02', 'preset-business-002', 'plot', 'adventure', '融资', '💰', '冒险类型卡牌', 0),
('card-preset-bus002-a03', 'preset-business-002', 'plot', 'adventure', '谈判', '🤝', '冒险类型卡牌', 0),
('card-preset-bus002-a04', 'preset-business-002', 'plot', 'adventure', '竞标', '📊', '冒险类型卡牌', 0),
('card-preset-bus002-e01', 'preset-business-002', 'plot', 'equipment', '笔记本电脑', '💻', '装备类型卡牌', 0),
('card-preset-bus002-e02', 'preset-business-002', 'plot', 'equipment', '商业计划书', '📄', '装备类型卡牌', 0),
('card-preset-bus002-e03', 'preset-business-002', 'plot', 'equipment', '合同', '📄', '装备类型卡牌', 0),
('card-preset-bus002-e04', 'preset-business-002', 'plot', 'equipment', '展板', '🖼️', '装备类型卡牌', 0);
