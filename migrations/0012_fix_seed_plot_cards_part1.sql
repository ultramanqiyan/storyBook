-- 修复预设书籍的情节卡牌数据
-- 问题：章节中使用的selected_cards与plot_cards表中的卡牌不完全匹配
-- 解决：为每本书添加所有在章节中使用的卡牌

-- 首先删除所有预设书籍的情节卡片
DELETE FROM plot_cards WHERE book_id LIKE 'preset-%';

-- ============================================
-- 儿童冒险 - 星空探险家（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-adv001-w01', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气'),
('card-adv001-w02', 'preset-adventure-001', 'plot', 'weather', '蓝天', '🌤️', '湛蓝的天空'),
('card-adv001-w03', 'preset-adventure-001', 'plot', 'weather', '极光', '🌌', '绚丽的极光'),
('card-adv001-w04', 'preset-adventure-001', 'plot', 'weather', '白云', '☁️', '朵朵白云'),
('card-adv001-w05', 'preset-adventure-001', 'plot', 'weather', '夕阳', '🌇', '绚丽的夕阳'),
('card-adv001-w06', 'preset-adventure-001', 'plot', 'weather', '雪天', '❄️', '银装素裹的雪景'),
('card-adv001-w07', 'preset-adventure-001', 'plot', 'weather', '雷电', '⛈️', '电闪雷鸣'),
('card-adv001-w08', 'preset-adventure-001', 'plot', 'weather', '星空夜', '🌙', '繁星点点的夜晚'),
('card-adv001-w09', 'preset-adventure-001', 'plot', 'weather', '彩虹天', '🌈', '美丽的彩虹'),
('card-adv001-w10', 'preset-adventure-001', 'plot', 'weather', '流星雨', '🌠', '璀璨的流星雨'),
-- terrain
('card-adv001-t01', 'preset-adventure-001', 'plot', 'terrain', '海滩', '🏖️', '金色的海滩'),
('card-adv001-t02', 'preset-adventure-001', 'plot', 'terrain', '岛屿', '🏝️', '神秘的岛屿'),
('card-adv001-t03', 'preset-adventure-001', 'plot', 'terrain', '森林', '🌲', '神秘的森林'),
('card-adv001-t04', 'preset-adventure-001', 'plot', 'terrain', '峡谷', '🏔️', '深邃的峡谷'),
('card-adv001-t05', 'preset-adventure-001', 'plot', 'terrain', '山洞', '🕳️', '幽深的山洞'),
('card-adv001-t06', 'preset-adventure-001', 'plot', 'terrain', '雪山', '🏔️', '皑皑雪山'),
('card-adv001-t07', 'preset-adventure-001', 'plot', 'terrain', '草原', '🌿', '广阔的草原'),
('card-adv001-t08', 'preset-adventure-001', 'plot', 'terrain', '山顶', '⛰️', '高耸的山峰'),
('card-adv001-t09', 'preset-adventure-001', 'plot', 'terrain', '瀑布', '💦', '壮观的瀑布'),
('card-adv001-t10', 'preset-adventure-001', 'plot', 'terrain', '花园', '🌻', '美丽的花园'),
-- adventure
('card-adv001-a01', 'preset-adventure-001', 'plot', 'adventure', '探险', '🧭', '探索未知的地方'),
('card-adv001-a02', 'preset-adventure-001', 'plot', 'adventure', '帮助朋友', '🤝', '帮助需要帮助的朋友'),
('card-adv001-a03', 'preset-adventure-001', 'plot', 'adventure', '发现秘密', '🔮', '揭开隐藏的秘密'),
('card-adv001-a04', 'preset-adventure-001', 'plot', 'adventure', '徒步', '🚶', '徒步旅行'),
('card-adv001-a05', 'preset-adventure-001', 'plot', 'adventure', '解谜', '🧩', '解开古老的谜题'),
('card-adv001-a06', 'preset-adventure-001', 'plot', 'adventure', '滑雪', '⛷️', '在雪山上滑雪'),
('card-adv001-a07', 'preset-adventure-001', 'plot', 'adventure', '救援', '🆘', '救援被困的朋友'),
('card-adv001-a08', 'preset-adventure-001', 'plot', 'adventure', '观察动物', '🦋', '观察可爱的动物'),
('card-adv001-a09', 'preset-adventure-001', 'plot', 'adventure', '寻宝', '🗺️', '寻找隐藏的宝藏'),
('card-adv001-a10', 'preset-adventure-001', 'plot', 'adventure', '露营', '⛺', '野外露营探险'),
-- equipment
('card-adv001-e01', 'preset-adventure-001', 'plot', 'equipment', '望远镜', '🔭', '观察远方'),
('card-adv001-e02', 'preset-adventure-001', 'plot', 'equipment', '背包', '🎒', '装东西的背包'),
('card-adv001-e03', 'preset-adventure-001', 'plot', 'equipment', '笔记本', '📓', '记录发现'),
('card-adv001-e04', 'preset-adventure-001', 'plot', 'equipment', '相机', '📷', '拍摄美景'),
('card-adv001-e05', 'preset-adventure-001', 'plot', 'equipment', '手电筒', '🔦', '照亮黑暗'),
('card-adv001-e06', 'preset-adventure-001', 'plot', 'equipment', '睡袋', '🛏️', '野外睡觉'),
('card-adv001-e07', 'preset-adventure-001', 'plot', 'equipment', '急救箱', '🩹', '处理伤口'),
('card-adv001-e08', 'preset-adventure-001', 'plot', 'equipment', '天文望远镜', '🔭', '观察星空'),
('card-adv001-e09', 'preset-adventure-001', 'plot', 'equipment', '水壶', '🥤', '装水的水壶'),
('card-adv001-e10', 'preset-adventure-001', 'plot', 'equipment', '帐篷', '⛺', '露营住所');

-- ============================================
-- 儿童冒险 - 星空探险家（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-adv001-w01-en', 'preset-adventure-001-en', 'plot', 'weather', 'Sunny', '☀️', 'Beautiful sunny day'),
('card-adv001-w02-en', 'preset-adventure-001-en', 'plot', 'weather', 'Blue Sky', '🌤️', 'Clear blue sky'),
('card-adv001-w03-en', 'preset-adventure-001-en', 'plot', 'weather', 'Aurora', '🌌', 'Spectacular aurora'),
('card-adv001-w04-en', 'preset-adventure-001-en', 'plot', 'weather', 'Clouds', '☁️', 'Fluffy clouds'),
('card-adv001-w05-en', 'preset-adventure-001-en', 'plot', 'weather', 'Sunset', '🌇', 'Brilliant sunset'),
('card-adv001-w06-en', 'preset-adventure-001-en', 'plot', 'weather', 'Snow', '❄️', 'Snow-covered landscape'),
('card-adv001-w07-en', 'preset-adventure-001-en', 'plot', 'weather', 'Thunder', '⛈️', 'Lightning and thunder'),
('card-adv001-w08-en', 'preset-adventure-001-en', 'plot', 'weather', 'Starry Night', '🌙', 'Starry night sky'),
('card-adv001-w09-en', 'preset-adventure-001-en', 'plot', 'weather', 'Rainbow', '🌈', 'Beautiful rainbow'),
('card-adv001-w10-en', 'preset-adventure-001-en', 'plot', 'weather', 'Meteor Shower', '🌠', 'Brilliant meteor shower'),
-- terrain
('card-adv001-t01-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Beach', '🏖️', 'Golden beach'),
('card-adv001-t02-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Island', '🏝️', 'Mysterious island'),
('card-adv001-t03-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Forest', '🌲', 'Mysterious forest'),
('card-adv001-t04-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Canyon', '🏔️', 'Deep canyon'),
('card-adv001-t05-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Cave', '🕳️', 'Deep cave'),
('card-adv001-t06-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Snow Mountain', '🏔️', 'Snowy peaks'),
('card-adv001-t07-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Grassland', '🌿', 'Vast grassland'),
('card-adv001-t08-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Mountain Peak', '⛰️', 'High mountain peak'),
('card-adv001-t09-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Waterfall', '💦', 'Spectacular waterfall'),
('card-adv001-t10-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Garden', '🌻', 'Beautiful garden'),
-- adventure
('card-adv001-a01-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Explore', '🧭', 'Explore unknown places'),
('card-adv001-a02-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Help Friends', '🤝', 'Help friends in need'),
('card-adv001-a03-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Discover Secrets', '🔮', 'Uncover hidden secrets'),
('card-adv001-a04-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Hiking', '🚶', 'Hiking trip'),
('card-adv001-a05-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Solve Puzzles', '🧩', 'Solve ancient puzzles'),
('card-adv001-a06-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Skiing', '⛷️', 'Ski on snow mountain'),
('card-adv001-a07-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Rescue', '🆘', 'Rescue trapped friends'),
('card-adv001-a08-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Observe Animals', '🦋', 'Observe cute animals'),
('card-adv001-a09-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Treasure Hunt', '🗺️', 'Find hidden treasure'),
('card-adv001-a10-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Camping', '⛺', 'Outdoor camping adventure'),
-- equipment
('card-adv001-e01-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Telescope', '🔭', 'Observe from afar'),
('card-adv001-e02-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Backpack', '🎒', 'Carrying backpack'),
('card-adv001-e03-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Notebook', '📓', 'Record discoveries'),
('card-adv001-e04-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Camera', '📷', 'Capture beautiful scenes'),
('card-adv001-e05-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Flashlight', '🔦', 'Light up the darkness'),
('card-adv001-e06-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Sleeping Bag', '🛏️', 'Outdoor sleeping'),
('card-adv001-e07-en', 'preset-adventure-001-en', 'plot', 'equipment', 'First Aid Kit', '🩹', 'Treat injuries'),
('card-adv001-e08-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Astronomical Telescope', '🔭', 'Observe the stars'),
('card-adv001-e09-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Water Bottle', '🥤', 'Carry water'),
('card-adv001-e10-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Tent', '⛺', 'Camping shelter');

-- ============================================
-- 儿童冒险 - 深海探险队（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-adv002-w01', 'preset-adventure-002', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气'),
('card-adv002-w02', 'preset-adventure-002', 'plot', 'weather', '白云', '☁️', '朵朵白云'),
('card-adv002-w03', 'preset-adventure-002', 'plot', 'weather', '彩虹天', '🌈', '美丽的彩虹'),
('card-adv002-w04', 'preset-adventure-002', 'plot', 'weather', '蓝天', '🌤️', '湛蓝的天空'),
('card-adv002-w05', 'preset-adventure-002', 'plot', 'weather', '星空夜', '🌙', '繁星点点的夜晚'),
('card-adv002-w06', 'preset-adventure-002', 'plot', 'weather', '极光', '🌌', '绚丽的极光'),
('card-adv002-w07', 'preset-adventure-002', 'plot', 'weather', '晨雾', '🌫️', '朦胧的晨雾'),
('card-adv002-w08', 'preset-adventure-002', 'plot', 'weather', '彩虹雨', '🌦️', '雨后彩虹'),
('card-adv002-w09', 'preset-adventure-002', 'plot', 'weather', '夕阳', '🌇', '绚丽的夕阳'),
('card-adv002-w10', 'preset-adventure-002', 'plot', 'weather', '流星雨', '🌠', '璀璨的流星雨'),
-- terrain
('card-adv002-t01', 'preset-adventure-002', 'plot', 'terrain', '海滩', '🏖️', '金色的海滩'),
('card-adv002-t02', 'preset-adventure-002', 'plot', 'terrain', '岛屿', '🏝️', '神秘的岛屿'),
('card-adv002-t03', 'preset-adventure-002', 'plot', 'terrain', '热带雨林', '🌴', '茂密的热带雨林'),
('card-adv002-t04', 'preset-adventure-002', 'plot', 'terrain', '古堡', '🏰', '古老的城堡'),
('card-adv002-t05', 'preset-adventure-002', 'plot', 'terrain', '废墟', '🏚️', '神秘的废墟'),
('card-adv002-t06', 'preset-adventure-002', 'plot', 'terrain', '洞穴', '🪨', '幽暗的洞穴'),
('card-adv002-t07', 'preset-adventure-002', 'plot', 'terrain', '瀑布', '💦', '壮观的瀑布'),
('card-adv002-t08', 'preset-adventure-002', 'plot', 'terrain', '山顶', '⛰️', '高耸的山峰'),
('card-adv002-t09', 'preset-adventure-002', 'plot', 'terrain', '彩虹谷', '🌈', '五彩斑斓的山谷'),
('card-adv002-t10', 'preset-adventure-002', 'plot', 'terrain', '珊瑚礁', '🪸', '美丽的珊瑚礁'),
-- adventure
('card-adv002-a01', 'preset-adventure-002', 'plot', 'adventure', '发现秘密', '🔮', '揭开隐藏的秘密'),
('card-adv002-a02', 'preset-adventure-002', 'plot', 'adventure', '探险', '🧭', '探索未知的地方'),
('card-adv002-a03', 'preset-adventure-002', 'plot', 'adventure', '观察动物', '🦋', '观察可爱的动物'),
('card-adv002-a04', 'preset-adventure-002', 'plot', 'adventure', '救援', '🆘', '救援被困的朋友'),
('card-adv002-a05', 'preset-adventure-002', 'plot', 'adventure', '解谜', '🧩', '解开古老的谜题'),
('card-adv002-a06', 'preset-adventure-002', 'plot', 'adventure', '寻宝', '🗺️', '寻找隐藏的宝藏'),
('card-adv002-a07', 'preset-adventure-002', 'plot', 'adventure', '登山', '🧗', '攀登高峰'),
('card-adv002-a08', 'preset-adventure-002', 'plot', 'adventure', '比赛', '🏆', '参加精彩的比赛'),
('card-adv002-a09', 'preset-adventure-002', 'plot', 'adventure', '潜水', '🤿', '探索海底世界'),
('card-adv002-a10', 'preset-adventure-002', 'plot', 'adventure', '守护使命', '🛡️', '守护重要的东西'),
-- equipment
('card-adv002-e01', 'preset-adventure-002', 'plot', 'equipment', '望远镜', '🔭', '观察远方'),
('card-adv002-e02', 'preset-adventure-002', 'plot', 'equipment', '指南针', '🧭', '辨别方向'),
('card-adv002-e03', 'preset-adventure-002', 'plot', 'equipment', '相机', '📷', '拍摄美景'),
('card-adv002-e04', 'preset-adventure-002', 'plot', 'equipment', '急救箱', '🩹', '处理伤口'),
('card-adv002-e05', 'preset-adventure-002', 'plot', 'equipment', '手电筒', '🔦', '照亮黑暗'),
('card-adv002-e06', 'preset-adventure-002', 'plot', 'equipment', '笔记本', '📓', '记录发现'),
('card-adv002-e07', 'preset-adventure-002', 'plot', 'equipment', '灯具', '💡', '照明设备'),
('card-adv002-e08', 'preset-adventure-002', 'plot', 'equipment', '水壶', '🥤', '装水的水壶'),
('card-adv002-e09', 'preset-adventure-002', 'plot', 'equipment', '绳子', '🪢', '攀爬工具'),
('card-adv002-e10', 'preset-adventure-002', 'plot', 'equipment', '帐篷', '⛺', '露营住所');

-- ============================================
-- 儿童冒险 - 深海探险队（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-adv002-w01-en', 'preset-adventure-002-en', 'plot', 'weather', 'Sunny', '☀️', 'Beautiful sunny day'),
('card-adv002-w02-en', 'preset-adventure-002-en', 'plot', 'weather', 'Clouds', '☁️', 'Fluffy clouds'),
('card-adv002-w03-en', 'preset-adventure-002-en', 'plot', 'weather', 'Rainbow', '🌈', 'Beautiful rainbow'),
('card-adv002-w04-en', 'preset-adventure-002-en', 'plot', 'weather', 'Blue Sky', '🌤️', 'Clear blue sky'),
('card-adv002-w05-en', 'preset-adventure-002-en', 'plot', 'weather', 'Starry Night', '🌙', 'Starry night sky'),
('card-adv002-w06-en', 'preset-adventure-002-en', 'plot', 'weather', 'Aurora', '🌌', 'Spectacular aurora'),
('card-adv002-w07-en', 'preset-adventure-002-en', 'plot', 'weather', 'Morning Fog', '🌫️', 'Hazy morning fog'),
('card-adv002-w08-en', 'preset-adventure-002-en', 'plot', 'weather', 'Rainbow Rain', '🌦️', 'Rainbow after rain'),
('card-adv002-w09-en', 'preset-adventure-002-en', 'plot', 'weather', 'Sunset', '🌇', 'Brilliant sunset'),
('card-adv002-w10-en', 'preset-adventure-002-en', 'plot', 'weather', 'Meteor Shower', '🌠', 'Brilliant meteor shower'),
-- terrain
('card-adv002-t01-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Beach', '🏖️', 'Golden beach'),
('card-adv002-t02-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Island', '🏝️', 'Mysterious island'),
('card-adv002-t03-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Rainforest', '🌴', 'Dense tropical rainforest'),
('card-adv002-t04-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Castle', '🏰', 'Ancient castle'),
('card-adv002-t05-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Ruins', '🏚️', 'Mysterious ruins'),
('card-adv002-t06-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Cave', '🪨', 'Dark cave'),
('card-adv002-t07-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Waterfall', '💦', 'Spectacular waterfall'),
('card-adv002-t08-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Mountain Peak', '⛰️', 'High mountain peak'),
('card-adv002-t09-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Rainbow Valley', '🌈', 'Colorful valley'),
('card-adv002-t10-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Coral Reef', '🪸', 'Beautiful coral reef'),
-- adventure
('card-adv002-a01-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Discover Secrets', '🔮', 'Uncover hidden secrets'),
('card-adv002-a02-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Explore', '🧭', 'Explore unknown places'),
('card-adv002-a03-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Observe Animals', '🦋', 'Observe cute animals'),
('card-adv002-a04-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Rescue', '🆘', 'Rescue trapped friends'),
('card-adv002-a05-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Solve Puzzles', '🧩', 'Solve ancient puzzles'),
('card-adv002-a06-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Treasure Hunt', '🗺️', 'Find hidden treasure'),
('card-adv002-a07-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Climbing', '🧗', 'Climb peaks'),
('card-adv002-a08-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Competition', '🏆', 'Participate in competition'),
('card-adv002-a09-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Diving', '🤿', 'Explore underwater world'),
('card-adv002-a10-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard what matters'),
-- equipment
('card-adv002-e01-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Telescope', '🔭', 'Observe from afar'),
('card-adv002-e02-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Compass', '🧭', 'Find direction'),
('card-adv002-e03-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Camera', '📷', 'Capture beautiful scenes'),
('card-adv002-e04-en', 'preset-adventure-002-en', 'plot', 'equipment', 'First Aid Kit', '🩹', 'Treat injuries'),
('card-adv002-e05-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Flashlight', '🔦', 'Light up the darkness'),
('card-adv002-e06-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Notebook', '📓', 'Record discoveries'),
('card-adv002-e07-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Light', '💡', 'Lighting equipment'),
('card-adv002-e08-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Water Bottle', '🥤', 'Carry water'),
('card-adv002-e09-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Rope', '🪢', 'Climbing tool'),
('card-adv002-e10-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Tent', '⛺', 'Camping shelter');

-- ============================================
-- 魔幻传说 - AI魔法学院（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-fan001-w01', 'preset-fantasy-001', 'plot', 'weather', '极光', '🌌', '绚丽的魔法极光'),
('card-fan001-w02', 'preset-fantasy-001', 'plot', 'weather', '元素乱流', '⚡', '元素能量涌动'),
('card-fan001-w03', 'preset-fantasy-001', 'plot', 'weather', '精灵光', '🧚', '精灵的光芒'),
('card-fan001-w04', 'preset-fantasy-001', 'plot', 'weather', '魔法雨', '💧', '充满魔力的雨水'),
('card-fan001-w05', 'preset-fantasy-001', 'plot', 'weather', '血月', '🔴', '神秘的血月之夜'),
('card-fan001-w06', 'preset-fantasy-001', 'plot', 'weather', '魔法风暴', '🌀', '充满魔力的风暴'),
('card-fan001-w07', 'preset-fantasy-001', 'plot', 'weather', '光明普照', '✨', '神圣的光芒'),
('card-fan001-w08', 'preset-fantasy-001', 'plot', 'weather', '黑暗降临', '🌑', '无尽的黑暗'),
('card-fan001-w09', 'preset-fantasy-001', 'plot', 'weather', '星辰坠落', '💫', '星辰从天而降'),
('card-fan001-w10', 'preset-fantasy-001', 'plot', 'weather', '创世晨曦', '🌅', '创世之初的光芒'),
-- terrain
('card-fan001-t01', 'preset-fantasy-001', 'plot', 'terrain', '魔法塔', '🗼', '高耸的魔法塔'),
('card-fan001-t02', 'preset-fantasy-001', 'plot', 'terrain', '魔法森林', '🌳', '充满魔法的森林'),
('card-fan001-t03', 'preset-fantasy-001', 'plot', 'terrain', '精灵村落', '🧚', '精灵的家园'),
('card-fan001-t04', 'preset-fantasy-001', 'plot', 'terrain', '水晶洞穴', '💎', '水晶闪耀的洞穴'),
('card-fan001-t05', 'preset-fantasy-001', 'plot', 'terrain', '深渊', '🕳️', '无尽的深渊'),
('card-fan001-t06', 'preset-fantasy-001', 'plot', 'terrain', '天空城', '🏰', '云端的城市'),
('card-fan001-t07', 'preset-fantasy-001', 'plot', 'terrain', '神殿', '⛩️', '神圣的殿堂'),
('card-fan001-t08', 'preset-fantasy-001', 'plot', 'terrain', '暗影沼泽', '🌑', '阴暗的沼泽'),
('card-fan001-t09', 'preset-fantasy-001', 'plot', 'terrain', '龙之巢', '🐉', '巨龙的巢穴'),
('card-fan001-t10', 'preset-fantasy-001', 'plot', 'terrain', '元素位面', '🔥', '元素的世界'),
-- adventure
('card-fan001-a01', 'preset-fantasy-001', 'plot', 'adventure', '魔法测试', '📝', '通过魔法试炼'),
('card-fan001-a02', 'preset-fantasy-001', 'plot', 'adventure', '魔法研究', '📚', '研究古老的魔法'),
('card-fan001-a03', 'preset-fantasy-001', 'plot', 'adventure', '精灵结盟', '🧚', '与精灵结为盟友'),
('card-fan001-a04', 'preset-fantasy-001', 'plot', 'adventure', '元素觉醒', '🔥', '掌控元素之力'),
('card-fan001-a05', 'preset-fantasy-001', 'plot', 'adventure', '觉醒力量', '💫', '觉醒隐藏的力量'),
('card-fan001-a06', 'preset-fantasy-001', 'plot', 'adventure', '封印恶魔', '😈', '封印邪恶的恶魔'),
('card-fan001-a07', 'preset-fantasy-001', 'plot', 'adventure', '守护使命', '🛡️', '守护重要的东西'),
('card-fan001-a08', 'preset-fantasy-001', 'plot', 'adventure', '魔法对决', '⚡', '魔法师的决斗'),
('card-fan001-a09', 'preset-fantasy-001', 'plot', 'adventure', '屠龙', '🐉', '挑战巨龙'),
('card-fan001-a10', 'preset-fantasy-001', 'plot', 'adventure', '元素融合', '🌈', '融合元素之力'),
-- equipment
('card-fan001-e01', 'preset-fantasy-001', 'plot', 'equipment', '魔杖', '🪄', '施展魔法的法杖'),
('card-fan001-e02', 'preset-fantasy-001', 'plot', 'equipment', '法典', '📖', '记载魔法的书籍'),
('card-fan001-e03', 'preset-fantasy-001', 'plot', 'equipment', '水晶球', '🔮', '占卜和储存魔力'),
('card-fan001-e04', 'preset-fantasy-001', 'plot', 'equipment', '元素宝石', '💠', '储存元素之力'),
('card-fan001-e05', 'preset-fantasy-001', 'plot', 'equipment', '护身符', '🧿', '保护佩戴者'),
('card-fan001-e06', 'preset-fantasy-001', 'plot', 'equipment', '封印卷轴', '📜', '封印邪恶'),
('card-fan001-e07', 'preset-fantasy-001', 'plot', 'equipment', '法师帽', '🎩', '增强魔力'),
('card-fan001-e08', 'preset-fantasy-001', 'plot', 'equipment', '魔法披风', '🧥', '隐身和防护'),
('card-fan001-e09', 'preset-fantasy-001', 'plot', 'equipment', '龙鳞甲', '🛡️', '龙鳞制成的护甲'),
('card-fan001-e10', 'preset-fantasy-001', 'plot', 'equipment', '元素法杖', '🔥', '操控元素');

-- ============================================
-- 魔幻传说 - AI魔法学院（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-fan001-w01-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Aurora', '🌌', 'Magical aurora'),
('card-fan001-w02-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Elemental Turbulence', '⚡', 'Elemental energy surge'),
('card-fan001-w03-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Elf Light', '🧚', 'Elven glow'),
('card-fan001-w04-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Magic Rain', '💧', 'Magical rain'),
('card-fan001-w05-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Blood Moon', '🔴', 'Mysterious blood moon night'),
('card-fan001-w06-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Magic Storm', '🌀', 'Magical storm'),
('card-fan001-w07-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Divine Light', '✨', 'Sacred light'),
('card-fan001-w08-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Darkness Falls', '🌑', 'Endless darkness'),
('card-fan001-w09-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Falling Stars', '💫', 'Stars falling from sky'),
('card-fan001-w10-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Genesis Dawn', '🌅', 'Light of creation'),
-- terrain
('card-fan001-t01-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Magic Tower', '🗼', 'Tall magic tower'),
('card-fan001-t02-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Magic Forest', '🌳', 'Magical forest'),
('card-fan001-t03-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Elf Village', '🧚', 'Elven home'),
('card-fan001-t04-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Crystal Cave', '💎', 'Sparkling crystal cave'),
('card-fan001-t05-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Abyss', '🕳️', 'Endless abyss'),
('card-fan001-t06-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Sky City', '🏰', 'City in the clouds'),
('card-fan001-t07-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Temple', '⛩️', 'Sacred hall'),
('card-fan001-t08-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Shadow Swamp', '🌑', 'Dark swamp'),
('card-fan001-t09-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Dragon Nest', '🐉', 'Dragon lair'),
('card-fan001-t10-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Elemental Plane', '🔥', 'Elemental world'),
-- adventure
('card-fan001-a01-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Magic Test', '📝', 'Pass magic trial'),
('card-fan001-a02-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Magic Research', '📚', 'Study ancient magic'),
('card-fan001-a03-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Elf Alliance', '🧚', 'Form alliance with elves'),
('card-fan001-a04-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Elemental Awakening', '🔥', 'Control elemental power'),
('card-fan001-a05-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Awaken Power', '💫', 'Awaken hidden power'),
('card-fan001-a06-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Seal Demon', '😈', 'Seal evil demon'),
('card-fan001-a07-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard important things'),
('card-fan001-a08-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Magic Duel', '⚡', 'Mage duel'),
('card-fan001-a09-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Dragon Slaying', '🐉', 'Challenge dragon'),
('card-fan001-a10-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Elemental Fusion', '🌈', 'Fuse elemental power'),
-- equipment
('card-fan001-e01-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Wand', '🪄', 'Cast magic spells'),
('card-fan001-e02-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Grimoire', '📖', 'Book of magic'),
('card-fan001-e03-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Crystal Ball', '🔮', 'Divination and magic storage'),
('card-fan001-e04-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Elemental Gem', '💠', 'Store elemental power'),
('card-fan001-e05-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Amulet', '🧿', 'Protect the wearer'),
('card-fan001-e06-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Seal Scroll', '📜', 'Seal evil'),
('card-fan001-e07-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Wizard Hat', '🎩', 'Enhance magic'),
('card-fan001-e08-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Magic Cloak', '🧥', 'Invisibility and protection'),
('card-fan001-e09-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Dragon Scale Armor', '🛡️', 'Armor from dragon scales'),
('card-fan001-e10-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Elemental Staff', '🔥', 'Control elements');
