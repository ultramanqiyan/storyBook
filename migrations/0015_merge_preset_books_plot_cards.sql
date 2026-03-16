-- 合并预设书籍情节卡牌数据
-- 解决重复卡牌问题：删除0011文件中的4张基础卡牌，保留0013文件的16张完整卡牌
-- 执行时间: 2026-03-16

-- 首先删除所有新预设书籍的情节卡牌（包括两种格式的卡牌）
-- 0011文件格式: card-{book}-XX (如 card-adv003-01)
-- 0013文件格式: card-{book}-{类型}XX (如 card-adv003-w01)

-- 儿童冒险
DELETE FROM plot_cards WHERE book_id = 'preset-adventure-003' AND card_id LIKE 'card-adv003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-adventure-003-en' AND card_id LIKE 'card-adv003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-adventure-004' AND card_id LIKE 'card-adv004-%';
DELETE FROM plot_cards WHERE book_id = 'preset-adventure-004-en' AND card_id LIKE 'card-adv004-%';

-- 魔幻传说
DELETE FROM plot_cards WHERE book_id = 'preset-fantasy-003' AND card_id LIKE 'card-fan003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-fantasy-003-en' AND card_id LIKE 'card-fan003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-fantasy-004' AND card_id LIKE 'card-fan004-%';
DELETE FROM plot_cards WHERE book_id = 'preset-fantasy-004-en' AND card_id LIKE 'card-fan004-%';

-- 都市言情
DELETE FROM plot_cards WHERE book_id = 'preset-romance-003' AND card_id LIKE 'card-rom003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-romance-003-en' AND card_id LIKE 'card-rom003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-romance-004' AND card_id LIKE 'card-rom004-%';
DELETE FROM plot_cards WHERE book_id = 'preset-romance-004-en' AND card_id LIKE 'card-rom004-%';

-- 职场风云
DELETE FROM plot_cards WHERE book_id = 'preset-business-003' AND card_id LIKE 'card-bus003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-business-003-en' AND card_id LIKE 'card-bus003-%';
DELETE FROM plot_cards WHERE book_id = 'preset-business-004' AND card_id LIKE 'card-bus004-%';
DELETE FROM plot_cards WHERE book_id = 'preset-business-004-en' AND card_id LIKE 'card-bus004-%';

-- 重新插入情节卡牌（每本书16张，每种类型4张）
-- 使用统一的命名格式: card-{book}-{类型缩写}{序号}

-- ============================================
-- 儿童冒险 - 丛林奇遇记（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-adv003-w01', 'preset-adventure-003', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气，适合丛林探险'),
('card-adv003-w02', 'preset-adventure-003', 'plot', 'weather', '晨雾', '🌫️', '朦胧的晨雾，丛林披上神秘面纱'),
('card-adv003-w03', 'preset-adventure-003', 'plot', 'weather', '星空夜', '🌙', '繁星点点的夜晚，萤火虫闪烁'),
('card-adv003-w04', 'preset-adventure-003', 'plot', 'weather', '彩虹天', '🌈', '雨后的彩虹，丛林更加美丽'),
-- terrain (4张)
('card-adv003-t01', 'preset-adventure-003', 'plot', 'terrain', '丛林', '🌲', '神秘的丛林，充满未知'),
('card-adv003-t02', 'preset-adventure-003', 'plot', 'terrain', '瀑布', '💦', '壮观的瀑布，隐藏着洞穴'),
('card-adv003-t03', 'preset-adventure-003', 'plot', 'terrain', '榕树下', '🌳', '千年榕树，丛林长老'),
('card-adv003-t04', 'preset-adventure-003', 'plot', 'terrain', '萤火虫小径', '✨', '萤火虫指引的神秘小路'),
-- adventure (4张)
('card-adv003-a01', 'preset-adventure-003', 'plot', 'adventure', '探险', '🧭', '探索未知的地方，发现秘密'),
('card-adv003-a02', 'preset-adventure-003', 'plot', 'adventure', '解谜', '🧩', '解开古老的谜题，获得线索'),
('card-adv003-a03', 'preset-adventure-003', 'plot', 'adventure', '救援', '🆘', '救援被困的朋友，保护丛林'),
('card-adv003-a04', 'preset-adventure-003', 'plot', 'adventure', '守护使命', '🛡️', '守护丛林，保护自然'),
-- equipment (4张)
('card-adv003-e01', 'preset-adventure-003', 'plot', 'equipment', '老地图', '🗺️', '神秘的古老地图，指引方向'),
('card-adv003-e02', 'preset-adventure-003', 'plot', 'equipment', '相机', '📷', '拍摄美景，记录发现'),
('card-adv003-e03', 'preset-adventure-003', 'plot', 'equipment', '手电筒', '🔦', '照亮黑暗，探索洞穴'),
('card-adv003-e04', 'preset-adventure-003', 'plot', 'equipment', '神奇种子', '🌱', '让土地重生的神奇种子');

-- ============================================
-- 儿童冒险 - 丛林奇遇记（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-adv003-w01-en', 'preset-adventure-003-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine, perfect for jungle exploration'),
('card-adv003-w02-en', 'preset-adventure-003-en', 'plot', 'weather', 'Morning Fog', '🌫️', 'Hazy morning fog, jungle mystery'),
('card-adv003-w03-en', 'preset-adventure-003-en', 'plot', 'weather', 'Starry Night', '🌙', 'Starry night with fireflies'),
('card-adv003-w04-en', 'preset-adventure-003-en', 'plot', 'weather', 'Rainbow', '🌈', 'Rainbow after rain, jungle beauty'),
-- terrain (4张)
('card-adv003-t01-en', 'preset-adventure-003-en', 'plot', 'terrain', 'Jungle', '🌲', 'Mysterious jungle, full of unknowns'),
('card-adv003-t02-en', 'preset-adventure-003-en', 'plot', 'terrain', 'Waterfall', '💦', 'Spectacular waterfall with hidden cave'),
('card-adv003-t03-en', 'preset-adventure-003-en', 'plot', 'terrain', 'Banyan Tree', '🌳', 'Ancient banyan, jungle elder'),
('card-adv003-t04-en', 'preset-adventure-003-en', 'plot', 'terrain', 'Firefly Path', '✨', 'Firefly-guided mysterious trail'),
-- adventure (4张)
('card-adv003-a01-en', 'preset-adventure-003-en', 'plot', 'adventure', 'Explore', '🧭', 'Explore unknown places, discover secrets'),
('card-adv003-a02-en', 'preset-adventure-003-en', 'plot', 'adventure', 'Solve Puzzles', '🧩', 'Solve ancient puzzles, get clues'),
('card-adv003-a03-en', 'preset-adventure-003-en', 'plot', 'adventure', 'Rescue', '🆘', 'Rescue trapped friends, protect jungle'),
('card-adv003-a04-en', 'preset-adventure-003-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard the jungle, protect nature'),
-- equipment (4张)
('card-adv003-e01-en', 'preset-adventure-003-en', 'plot', 'equipment', 'Old Map', '🗺️', 'Mysterious ancient map, guides the way'),
('card-adv003-e02-en', 'preset-adventure-003-en', 'plot', 'equipment', 'Camera', '📷', 'Capture beautiful scenes, record discoveries'),
('card-adv003-e03-en', 'preset-adventure-003-en', 'plot', 'equipment', 'Flashlight', '🔦', 'Light up darkness, explore caves'),
('card-adv003-e04-en', 'preset-adventure-003-en', 'plot', 'equipment', 'Magic Seed', '🌱', 'Life-giving seed for barren lands');

-- ============================================
-- 儿童冒险 - 极地探险队（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-adv004-w01', 'preset-adventure-004', 'plot', 'weather', '雪天', '❄️', '银装素裹的雪景，极地的美丽'),
('card-adv004-w02', 'preset-adventure-004', 'plot', 'weather', '极光', '🌌', '绚丽的极光，北极的灵魂'),
('card-adv004-w03', 'preset-adventure-004', 'plot', 'weather', '蓝天', '🌤️', '湛蓝的天空，极地的清澈'),
('card-adv004-w04', 'preset-adventure-004', 'plot', 'weather', '暴风雪', '🌨️', '猛烈的暴风雪，极地的考验'),
-- terrain (4张)
('card-adv004-t01', 'preset-adventure-004', 'plot', 'terrain', '冰原', '🧊', '广阔的冰原，北极的世界'),
('card-adv004-t02', 'preset-adventure-004', 'plot', 'terrain', '冰川', '🏔️', '巍峨的冰川，极地的壮丽'),
('card-adv004-t03', 'preset-adventure-004', 'plot', 'terrain', '冰洞', '🪨', '神秘的冰洞，蓝色的光芒'),
('card-adv004-t04', 'preset-adventure-004', 'plot', 'terrain', '科考站', '🔬', '科研基地，探险的起点'),
-- adventure (4张)
('card-adv004-a01', 'preset-adventure-004', 'plot', 'adventure', '救援', '🆘', '救援被困的朋友，保护北极'),
('card-adv004-a02', 'preset-adventure-004', 'plot', 'adventure', '科考', '🔬', '科学研究，了解北极'),
('card-adv004-a03', 'preset-adventure-004', 'plot', 'adventure', '守护使命', '🛡️', '守护北极，保护地球'),
('card-adv004-a04', 'preset-adventure-004', 'plot', 'adventure', '观察动物', '🦋', '观察北极动物，了解生态'),
-- equipment (4张)
('card-adv004-e01', 'preset-adventure-004', 'plot', 'equipment', '相机', '📷', '记录北极的美丽与变化'),
('card-adv004-e02', 'preset-adventure-004', 'plot', 'equipment', '羽绒服', '🧥', '保暖的衣物，抵御严寒'),
('card-adv004-e03', 'preset-adventure-004', 'plot', 'equipment', '望远镜', '🔭', '观察远方，发现动物'),
('card-adv004-e04', 'preset-adventure-004', 'plot', 'equipment', '徽章', '🏅', '北极守护者徽章，荣誉象征');

-- ============================================
-- 儿童冒险 - 极地探险队（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-adv004-w01-en', 'preset-adventure-004-en', 'plot', 'weather', 'Snow', '❄️', 'Snow-covered landscape, Arctic beauty'),
('card-adv004-w02-en', 'preset-adventure-004-en', 'plot', 'weather', 'Aurora', '🌌', 'Spectacular aurora, Arctic soul'),
('card-adv004-w03-en', 'preset-adventure-004-en', 'plot', 'weather', 'Blue Sky', '🌤️', 'Clear blue sky, Arctic clarity'),
('card-adv004-w04-en', 'preset-adventure-004-en', 'plot', 'weather', 'Blizzard', '🌨️', 'Fierce blizzard, Arctic challenge'),
-- terrain (4张)
('card-adv004-t01-en', 'preset-adventure-004-en', 'plot', 'terrain', 'Ice Plains', '🧊', 'Vast ice plains, Arctic world'),
('card-adv004-t02-en', 'preset-adventure-004-en', 'plot', 'terrain', 'Glacier', '🏔️', 'Majestic glacier, Arctic grandeur'),
('card-adv004-t03-en', 'preset-adventure-004-en', 'plot', 'terrain', 'Ice Cave', '🪨', 'Mysterious ice cave, blue glow'),
('card-adv004-t04-en', 'preset-adventure-004-en', 'plot', 'terrain', 'Research Station', '🔬', 'Research base, expedition start'),
-- adventure (4张)
('card-adv004-a01-en', 'preset-adventure-004-en', 'plot', 'adventure', 'Rescue', '🆘', 'Rescue trapped friends, protect the Arctic'),
('card-adv004-a02-en', 'preset-adventure-004-en', 'plot', 'adventure', 'Research', '🔬', 'Scientific research, understand the Arctic'),
('card-adv004-a03-en', 'preset-adventure-004-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard the Arctic, protect Earth'),
('card-adv004-a04-en', 'preset-adventure-004-en', 'plot', 'adventure', 'Observe Animals', '🦋', 'Observe Arctic animals, understand ecology'),
-- equipment (4张)
('card-adv004-e01-en', 'preset-adventure-004-en', 'plot', 'equipment', 'Camera', '📷', 'Document Arctic beauty and changes'),
('card-adv004-e02-en', 'preset-adventure-004-en', 'plot', 'equipment', 'Parka', '🧥', 'Warm clothing, resist the cold'),
('card-adv004-e03-en', 'preset-adventure-004-en', 'plot', 'equipment', 'Telescope', '🔭', 'Observe from afar, discover animals'),
('card-adv004-e04-en', 'preset-adventure-004-en', 'plot', 'equipment', 'Badge', '🏅', 'Arctic Guardian badge, symbol of honor');

-- ============================================
-- 魔幻传说 - 龙族守护者（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-fan003-w01', 'preset-fantasy-003', 'plot', 'weather', '火焰风暴', '🔥', '火焰与龙息交织的风暴'),
('card-fan003-w02', 'preset-fantasy-003', 'plot', 'weather', '极光', '🌌', '绚丽的魔法极光'),
('card-fan003-w03', 'preset-fantasy-003', 'plot', 'weather', '黑暗降临', '🌑', '无尽的黑暗'),
('card-fan003-w04', 'preset-fantasy-003', 'plot', 'weather', '创世晨曦', '🌅', '创世之初的光芒'),
-- terrain (4张)
('card-fan003-t01', 'preset-fantasy-003', 'plot', 'terrain', '龙之巢', '🐉', '巨龙的巢穴，龙族的家园'),
('card-fan003-t02', 'preset-fantasy-003', 'plot', 'terrain', '龙族学院', '🏫', '培养龙族守护者的地方'),
('card-fan003-t03', 'preset-fantasy-003', 'plot', 'terrain', '神殿', '⛩️', '神圣的殿堂'),
('card-fan003-t04', 'preset-fantasy-003', 'plot', 'terrain', '深渊', '🕳️', '无尽的深渊'),
-- adventure (4张)
('card-fan003-a01', 'preset-fantasy-003', 'plot', 'adventure', '屠龙', '🐉', '挑战巨龙，证明勇气'),
('card-fan003-a02', 'preset-fantasy-003', 'plot', 'adventure', '元素觉醒', '🔥', '掌控元素之力'),
('card-fan003-a03', 'preset-fantasy-003', 'plot', 'adventure', '守护使命', '🛡️', '守护龙族'),
('card-fan003-a04', 'preset-fantasy-003', 'plot', 'adventure', '魔法对决', '⚡', '魔法师的决斗'),
-- equipment (4张)
('card-fan003-e01', 'preset-fantasy-003', 'plot', 'equipment', '龙鳞甲', '🛡️', '龙鳞制成的护甲，坚不可摧'),
('card-fan003-e02', 'preset-fantasy-003', 'plot', 'equipment', '元素宝石', '💠', '储存元素之力'),
('card-fan003-e03', 'preset-fantasy-003', 'plot', 'equipment', '魔杖', '🪄', '施展魔法的法杖'),
('card-fan003-e04', 'preset-fantasy-003', 'plot', 'equipment', '龙心勋章', '🏅', '龙族最高荣誉');

-- ============================================
-- 魔幻传说 - 龙族守护者（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-fan003-w01-en', 'preset-fantasy-003-en', 'plot', 'weather', 'Fire Storm', '🔥', 'Fire and dragon breath intertwined'),
('card-fan003-w02-en', 'preset-fantasy-003-en', 'plot', 'weather', 'Aurora', '🌌', 'Spectacular magical aurora'),
('card-fan003-w03-en', 'preset-fantasy-003-en', 'plot', 'weather', 'Darkness Falls', '🌑', 'Endless darkness'),
('card-fan003-w04-en', 'preset-fantasy-003-en', 'plot', 'weather', 'Genesis Dawn', '🌅', 'Light of creation'),
-- terrain (4张)
('card-fan003-t01-en', 'preset-fantasy-003-en', 'plot', 'terrain', 'Dragon Nest', '🐉', 'Dragon lair, home of dragons'),
('card-fan003-t02-en', 'preset-fantasy-003-en', 'plot', 'terrain', 'Dragon Academy', '🏫', 'Where Dragon Guardians are trained'),
('card-fan003-t03-en', 'preset-fantasy-003-en', 'plot', 'terrain', 'Temple', '⛩️', 'Sacred hall'),
('card-fan003-t04-en', 'preset-fantasy-003-en', 'plot', 'terrain', 'Abyss', '🕳️', 'Endless abyss'),
-- adventure (4张)
('card-fan003-a01-en', 'preset-fantasy-003-en', 'plot', 'adventure', 'Dragon Battle', '🐉', 'Challenge dragons, prove courage'),
('card-fan003-a02-en', 'preset-fantasy-003-en', 'plot', 'adventure', 'Elemental Awakening', '🔥', 'Control elemental power'),
('card-fan003-a03-en', 'preset-fantasy-003-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard the dragon race'),
('card-fan003-a04-en', 'preset-fantasy-003-en', 'plot', 'adventure', 'Magic Duel', '⚡', 'Mage duel'),
-- equipment (4张)
('card-fan003-e01-en', 'preset-fantasy-003-en', 'plot', 'equipment', 'Dragon Scale Armor', '🛡️', 'Armor made of dragon scales, indestructible'),
('card-fan003-e02-en', 'preset-fantasy-003-en', 'plot', 'equipment', 'Elemental Gem', '💠', 'Store elemental power'),
('card-fan003-e03-en', 'preset-fantasy-003-en', 'plot', 'equipment', 'Magic Wand', '🪄', 'Cast magic spells'),
('card-fan003-e04-en', 'preset-fantasy-003-en', 'plot', 'equipment', 'Dragon Heart Medal', '🏅', 'Dragon race highest honor');

-- ============================================
-- 魔幻传说 - 魔法学院大逃亡（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-fan004-w01', 'preset-fantasy-004', 'plot', 'weather', '时空裂隙', '🌀', '时空扭曲的裂缝，穿越的通道'),
('card-fan004-w02', 'preset-fantasy-004', 'plot', 'weather', '极光', '🌌', '绚丽的魔法极光'),
('card-fan004-w03', 'preset-fantasy-004', 'plot', 'weather', '黑暗降临', '🌑', '无尽的黑暗'),
('card-fan004-w04', 'preset-fantasy-004', 'plot', 'weather', '创世晨曦', '🌅', '创世之初的光芒'),
-- terrain (4张)
('card-fan004-t01', 'preset-fantasy-004', 'plot', 'terrain', '魔法塔', '🗼', '高耸的魔法塔，学院的核心'),
('card-fan004-t02', 'preset-fantasy-004', 'plot', 'terrain', '禁闭室', '🔒', '关押学生的密室'),
('card-fan004-t03', 'preset-fantasy-004', 'plot', 'terrain', '神殿', '⛩️', '神圣的殿堂'),
('card-fan004-t04', 'preset-fantasy-004', 'plot', 'terrain', '时空裂缝', '⏳', '时间扭曲之地'),
-- adventure (4张)
('card-fan004-a01', 'preset-fantasy-004', 'plot', 'adventure', '时空穿梭', '⏳', '穿越时空，逃离困境'),
('card-fan004-a02', 'preset-fantasy-004', 'plot', 'adventure', '解谜', '🧩', '解开古老的谜题'),
('card-fan004-a03', 'preset-fantasy-004', 'plot', 'adventure', '守护使命', '🛡️', '守护重要的东西'),
('card-fan004-a04', 'preset-fantasy-004', 'plot', 'adventure', '魔法对决', '⚡', '魔法师的决斗'),
-- equipment (4张)
('card-fan004-e01', 'preset-fantasy-004', 'plot', 'equipment', '护身符', '🧿', '保护佩戴者，抵御魔法'),
('card-fan004-e02', 'preset-fantasy-004', 'plot', 'equipment', '封印卷轴', '📜', '封印邪恶'),
('card-fan004-e03', 'preset-fantasy-004', 'plot', 'equipment', '魔杖', '🪄', '施展魔法的法杖'),
('card-fan004-e04', 'preset-fantasy-004', 'plot', 'equipment', '时空徽章', '🏅', '时空使者徽章');

-- ============================================
-- 魔幻传说 - 魔法学院大逃亡（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-fan004-w01-en', 'preset-fantasy-004-en', 'plot', 'weather', 'Time Rift', '🌀', 'Distorted space-time rift, passage for travel'),
('card-fan004-w02-en', 'preset-fantasy-004-en', 'plot', 'weather', 'Aurora', '🌌', 'Spectacular magical aurora'),
('card-fan004-w03-en', 'preset-fantasy-004-en', 'plot', 'weather', 'Darkness Falls', '🌑', 'Endless darkness'),
('card-fan004-w04-en', 'preset-fantasy-004-en', 'plot', 'weather', 'Genesis Dawn', '🌅', 'Light of creation'),
-- terrain (4张)
('card-fan004-t01-en', 'preset-fantasy-004-en', 'plot', 'terrain', 'Magic Tower', '🗼', 'Towering magic tower, academy core'),
('card-fan004-t02-en', 'preset-fantasy-004-en', 'plot', 'terrain', 'Locked Room', '🔒', 'Secret room holding students'),
('card-fan004-t03-en', 'preset-fantasy-004-en', 'plot', 'terrain', 'Temple', '⛩️', 'Sacred hall'),
('card-fan004-t04-en', 'preset-fantasy-004-en', 'plot', 'terrain', 'Time Fissure', '⏳', 'Time-distorted place'),
-- adventure (4张)
('card-fan004-a01-en', 'preset-fantasy-004-en', 'plot', 'adventure', 'Time Travel', '⏳', 'Travel through time, escape danger'),
('card-fan004-a02-en', 'preset-fantasy-004-en', 'plot', 'adventure', 'Solve Puzzles', '🧩', 'Solve ancient puzzles'),
('card-fan004-a03-en', 'preset-fantasy-004-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard what matters'),
('card-fan004-a04-en', 'preset-fantasy-004-en', 'plot', 'adventure', 'Magic Duel', '⚡', 'Mage duel'),
-- equipment (4张)
('card-fan004-e01-en', 'preset-fantasy-004-en', 'plot', 'equipment', 'Amulet', '🧿', 'Protects wearer, resists magic'),
('card-fan004-e02-en', 'preset-fantasy-004-en', 'plot', 'equipment', 'Seal Scroll', '📜', 'Seal evil'),
('card-fan004-e03-en', 'preset-fantasy-004-en', 'plot', 'equipment', 'Magic Wand', '🪄', 'Cast magic spells'),
('card-fan004-e04-en', 'preset-fantasy-004-en', 'plot', 'equipment', 'Time Badge', '🏅', 'Time Messenger badge');

-- ============================================
-- 都市言情 - 咖啡店的邂逅（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-rom003-w01', 'preset-romance-003', 'plot', 'weather', '夕阳', '🌇', '浪漫的夕阳，温暖的时光'),
('card-rom003-w02', 'preset-romance-003', 'plot', 'weather', '雨天', '🌧️', '淅淅沥沥的雨，邂逅的开始'),
('card-rom003-w03', 'preset-romance-003', 'plot', 'weather', '晴天', '☀️', '阳光明媚，适合约会'),
('card-rom003-w04', 'preset-romance-003', 'plot', 'weather', '月色', '🌙', '皎洁的月光，浪漫的夜晚'),
-- terrain (4张)
('card-rom003-t01', 'preset-romance-003', 'plot', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅，故事开始的地方'),
('card-rom003-t02', 'preset-romance-003', 'plot', 'terrain', '画廊', '🖼️', '艺术的画廊，心动的瞬间'),
('card-rom003-t03', 'preset-romance-003', 'plot', 'terrain', '画室', '🎨', '创作的空间，共同的梦想'),
('card-rom003-t04', 'preset-romance-003', 'plot', 'terrain', '街道', '🛤️', '安静的街道，浪漫的散步'),
-- adventure (4张)
('card-rom003-a01', 'preset-romance-003', 'plot', 'adventure', '邂逅', '💫', '命运的相遇，爱情的开始'),
('card-rom003-a02', 'preset-romance-003', 'plot', 'adventure', '约会', '🌹', '甜蜜的约会'),
('card-rom003-a03', 'preset-romance-003', 'plot', 'adventure', '告白', '💕', '勇敢的表白'),
('card-rom003-a04', 'preset-romance-003', 'plot', 'adventure', '求婚', '💍', '浪漫的求婚'),
-- equipment (4张)
('card-rom003-e01', 'preset-romance-003', 'plot', 'equipment', '画板', '🎨', '艺术的创作，表达心意'),
('card-rom003-e02', 'preset-romance-003', 'plot', 'equipment', '咖啡', '☕', '温暖的咖啡'),
('card-rom003-e03', 'preset-romance-003', 'plot', 'equipment', '戒指', '💍', '爱情的象征'),
('card-rom003-e04', 'preset-romance-003', 'plot', 'equipment', '鲜花', '💐', '浪漫的礼物');

-- ============================================
-- 都市言情 - 咖啡店的邂逅（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-rom003-w01-en', 'preset-romance-003-en', 'plot', 'weather', 'Sunset', '🌇', 'Romantic sunset, warm moments'),
('card-rom003-w02-en', 'preset-romance-003-en', 'plot', 'weather', 'Rainy', '🌧️', 'Light rain, start of encounter'),
('card-rom003-w03-en', 'preset-romance-003-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine, perfect for dates'),
('card-rom003-w04-en', 'preset-romance-003-en', 'plot', 'weather', 'Moonlight', '🌙', 'Bright moonlight, romantic night'),
-- terrain (4张)
('card-rom003-t01-en', 'preset-romance-003-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe, where the story begins'),
('card-rom003-t02-en', 'preset-romance-003-en', 'plot', 'terrain', 'Gallery', '🖼️', 'Art gallery, moment of heartbeat'),
('card-rom003-t03-en', 'preset-romance-003-en', 'plot', 'terrain', 'Studio', '🎨', 'Creative space, shared dreams'),
('card-rom003-t04-en', 'preset-romance-003-en', 'plot', 'terrain', 'Street', '🛤️', 'Quiet street, romantic walk'),
-- adventure (4张)
('card-rom003-a01-en', 'preset-romance-003-en', 'plot', 'adventure', 'Encounter', '💫', 'Fateful meeting, start of love'),
('card-rom003-a02-en', 'preset-romance-003-en', 'plot', 'adventure', 'Date', '🌹', 'Sweet date'),
('card-rom003-a03-en', 'preset-romance-003-en', 'plot', 'adventure', 'Confession', '💕', 'Brave confession'),
('card-rom003-a04-en', 'preset-romance-003-en', 'plot', 'adventure', 'Proposal', '💍', 'Romantic proposal'),
-- equipment (4张)
('card-rom003-e01-en', 'preset-romance-003-en', 'plot', 'equipment', 'Easel', '🎨', 'Artistic creation, express feelings'),
('card-rom003-e02-en', 'preset-romance-003-en', 'plot', 'equipment', 'Coffee', '☕', 'Warm coffee'),
('card-rom003-e03-en', 'preset-romance-003-en', 'plot', 'equipment', 'Ring', '💍', 'Symbol of love'),
('card-rom003-e04-en', 'preset-romance-003-en', 'plot', 'equipment', 'Flowers', '💐', 'Romantic gift');

-- ============================================
-- 都市言情 - 青梅竹马的重逢（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-rom004-w01', 'preset-romance-004', 'plot', 'weather', '樱花雨', '🌸', '樱花飘落的美景，浪漫的回忆'),
('card-rom004-w02', 'preset-romance-004', 'plot', 'weather', '晴天', '☀️', '阳光明媚，重逢的日子'),
('card-rom004-w03', 'preset-romance-004', 'plot', 'weather', '夕阳', '🌇', '浪漫的夕阳'),
('card-rom004-w04', 'preset-romance-004', 'plot', 'weather', '月色', '🌙', '皎洁的月光'),
-- terrain (4张)
('card-rom004-t01', 'preset-romance-004', 'plot', 'terrain', '校园', '🏫', '青春的校园，回忆的地方'),
('card-rom004-t02', 'preset-romance-004', 'plot', 'terrain', '老街', '🏘️', '怀旧的老街'),
('card-rom004-t03', 'preset-romance-004', 'plot', 'terrain', '公园', '🌳', '安静的公园'),
('card-rom004-t04', 'preset-romance-004', 'plot', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅'),
-- adventure (4张)
('card-rom004-a01', 'preset-romance-004', 'plot', 'adventure', '重逢', '🎉', '再次相遇，旧情复燃'),
('card-rom004-a02', 'preset-romance-004', 'plot', 'adventure', '约会', '🌹', '甜蜜的约会'),
('card-rom004-a03', 'preset-romance-004', 'plot', 'adventure', '告白', '💕', '勇敢的表白'),
('card-rom004-a04', 'preset-romance-004', 'plot', 'adventure', '求婚', '💍', '浪漫的求婚'),
-- equipment (4张)
('card-rom004-e01', 'preset-romance-004', 'plot', 'equipment', '信纸', '✉️', '手写的情书，传递心意'),
('card-rom004-e02', 'preset-romance-004', 'plot', 'equipment', '相机', '📷', '记录美好瞬间'),
('card-rom004-e03', 'preset-romance-004', 'plot', 'equipment', '戒指', '💍', '爱情的象征'),
('card-rom004-e04', 'preset-romance-004', 'plot', 'equipment', '鲜花', '💐', '浪漫的礼物');

-- ============================================
-- 都市言情 - 青梅竹马的重逢（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-rom004-w01-en', 'preset-romance-004-en', 'plot', 'weather', 'Cherry Blossoms', '🌸', 'Falling cherry blossoms, romantic memories'),
('card-rom004-w02-en', 'preset-romance-004-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine, day of reunion'),
('card-rom004-w03-en', 'preset-romance-004-en', 'plot', 'weather', 'Sunset', '🌇', 'Romantic sunset'),
('card-rom004-w04-en', 'preset-romance-004-en', 'plot', 'weather', 'Moonlight', '🌙', 'Bright moonlight'),
-- terrain (4张)
('card-rom004-t01-en', 'preset-romance-004-en', 'plot', 'terrain', 'Campus', '🏫', 'Youthful campus, place of memories'),
('card-rom004-t02-en', 'preset-romance-004-en', 'plot', 'terrain', 'Old Street', '🏘️', 'Nostalgic old street'),
('card-rom004-t03-en', 'preset-romance-004-en', 'plot', 'terrain', 'Park', '🌳', 'Quiet park'),
('card-rom004-t04-en', 'preset-romance-004-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe'),
-- adventure (4张)
('card-rom004-a01-en', 'preset-romance-004-en', 'plot', 'adventure', 'Reunion', '🎉', 'Meet again, old flames reignite'),
('card-rom004-a02-en', 'preset-romance-004-en', 'plot', 'adventure', 'Date', '🌹', 'Sweet date'),
('card-rom004-a03-en', 'preset-romance-004-en', 'plot', 'adventure', 'Confession', '💕', 'Brave confession'),
('card-rom004-a04-en', 'preset-romance-004-en', 'plot', 'adventure', 'Proposal', '💍', 'Romantic proposal'),
-- equipment (4张)
('card-rom004-e01-en', 'preset-romance-004-en', 'plot', 'equipment', 'Letter Paper', '✉️', 'Handwritten love letters, convey feelings'),
('card-rom004-e02-en', 'preset-romance-004-en', 'plot', 'equipment', 'Camera', '📷', 'Capture beautiful moments'),
('card-rom004-e03-en', 'preset-romance-004-en', 'plot', 'equipment', 'Ring', '💍', 'Symbol of love'),
('card-rom004-e04-en', 'preset-romance-004-en', 'plot', 'equipment', 'Flowers', '💐', 'Romantic gift');

-- ============================================
-- 职场风云 - 创业合伙人（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-bus003-w01', 'preset-business-003', 'plot', 'weather', '晴天', '☀️', '晴朗的天气，新的开始'),
('card-bus003-w02', 'preset-business-003', 'plot', 'weather', '阴天', '☁️', '阴沉的天空，挑战来临'),
('card-bus003-w03', 'preset-business-003', 'plot', 'weather', '彩虹', '🌈', '雨后彩虹，成功在望'),
('card-bus003-w04', 'preset-business-003', 'plot', 'weather', '晨光', '🌅', '温暖的晨光，创业的希望'),
-- terrain (4张)
('card-bus003-t01', 'preset-business-003', 'plot', 'terrain', '办公室', '🏢', '创业的办公室，梦想的起点'),
('card-bus003-t02', 'preset-business-003', 'plot', 'terrain', '会议室', '📋', '严肃的会议室'),
('card-bus003-t03', 'preset-business-003', 'plot', 'terrain', '总部', '🏙️', '公司总部'),
('card-bus003-t04', 'preset-business-003', 'plot', 'terrain', '咖啡馆', '☕', '商务洽谈'),
-- adventure (4张)
('card-bus003-a01', 'preset-business-003', 'plot', 'adventure', '融资', '💰', '获得融资，企业发展'),
('card-bus003-a02', 'preset-business-003', 'plot', 'adventure', '转型', '🔄', '战略转型'),
('card-bus003-a03', 'preset-business-003', 'plot', 'adventure', '扩张', '🌍', '业务扩张'),
('card-bus003-a04', 'preset-business-003', 'plot', 'adventure', '上市', '📈', '公司上市'),
-- equipment (4张)
('card-bus003-e01', 'preset-business-003', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备，创业的工具'),
('card-bus003-e02', 'preset-business-003', 'plot', 'equipment', '合同', '📄', '商务合同'),
('card-bus003-e03', 'preset-business-003', 'plot', 'equipment', '奖杯', '🏆', '荣誉象征'),
('card-bus003-e04', 'preset-business-003', 'plot', 'equipment', '名片', '💳', '商务名片');

-- ============================================
-- 职场风云 - 创业合伙人（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-bus003-w01-en', 'preset-business-003-en', 'plot', 'weather', 'Sunny', '☀️', 'Clear weather, new beginning'),
('card-bus003-w02-en', 'preset-business-003-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky, challenges ahead'),
('card-bus003-w03-en', 'preset-business-003-en', 'plot', 'weather', 'Rainbow', '🌈', 'Rainbow after rain, success in sight'),
('card-bus003-w04-en', 'preset-business-003-en', 'plot', 'weather', 'Morning Light', '🌅', 'Warm morning light, startup hope'),
-- terrain (4张)
('card-bus003-t01-en', 'preset-business-003-en', 'plot', 'terrain', 'Office', '🏢', 'Startup office, starting point of dreams'),
('card-bus003-t02-en', 'preset-business-003-en', 'plot', 'terrain', 'Meeting Room', '📋', 'Serious meeting room'),
('card-bus003-t03-en', 'preset-business-003-en', 'plot', 'terrain', 'Headquarters', '🏙️', 'Company headquarters'),
('card-bus003-t04-en', 'preset-business-003-en', 'plot', 'terrain', 'Cafe', '☕', 'Business meeting'),
-- adventure (4张)
('card-bus003-a01-en', 'preset-business-003-en', 'plot', 'adventure', 'Funding', '💰', 'Get funding, business growth'),
('card-bus003-a02-en', 'preset-business-003-en', 'plot', 'adventure', 'Pivot', '🔄', 'Strategic pivot'),
('card-bus003-a03-en', 'preset-business-003-en', 'plot', 'adventure', 'Expansion', '🌍', 'Business expansion'),
('card-bus003-a04-en', 'preset-business-003-en', 'plot', 'adventure', 'IPO', '📈', 'Go public'),
-- equipment (4张)
('card-bus003-e01-en', 'preset-business-003-en', 'plot', 'equipment', 'Laptop', '💻', 'Essential for work, startup tool'),
('card-bus003-e02-en', 'preset-business-003-en', 'plot', 'equipment', 'Contract', '📄', 'Business contract'),
('card-bus003-e03-en', 'preset-business-003-en', 'plot', 'equipment', 'Trophy', '🏆', 'Symbol of honor'),
('card-bus003-e04-en', 'preset-business-003-en', 'plot', 'equipment', 'Business Card', '💳', 'Business card');

-- ============================================
-- 职场风云 - 职场新人逆袭记（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-bus004-w01', 'preset-business-004', 'plot', 'weather', '阴天', '☁️', '阴沉的天空，职场的挑战'),
('card-bus004-w02', 'preset-business-004', 'plot', 'weather', '晴天', '☀️', '晴朗的天气'),
('card-bus004-w03', 'preset-business-004', 'plot', 'weather', '彩虹', '🌈', '雨后彩虹'),
('card-bus004-w04', 'preset-business-004', 'plot', 'weather', '晨光', '🌅', '温暖的晨光'),
-- terrain (4张)
('card-bus004-t01', 'preset-business-004', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室，成长的战场'),
('card-bus004-t02', 'preset-business-004', 'plot', 'terrain', '会议室', '📋', '严肃的会议室'),
('card-bus004-t03', 'preset-business-004', 'plot', 'terrain', '客户公司', '🏛️', '客户的办公地'),
('card-bus004-t04', 'preset-business-004', 'plot', 'terrain', '楼顶', '🌃', '天台风景'),
-- adventure (4张)
('card-bus004-a01', 'preset-business-004', 'plot', 'adventure', '突破', '🚀', '取得突破，证明自己'),
('card-bus004-a02', 'preset-business-004', 'plot', 'adventure', '项目启动', '🚀', '启动新项目'),
('card-bus004-a03', 'preset-business-004', 'plot', 'adventure', '崛起', '📈', '快速崛起'),
('card-bus004-a04', 'preset-business-004', 'plot', 'adventure', '团队管理', '👥', '管理团队'),
-- equipment (4张)
('card-bus004-e01', 'preset-business-004', 'plot', 'equipment', '笔记本', '📓', '工作记录，成长的见证'),
('card-bus004-e02', 'preset-business-004', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备'),
('card-bus004-e03', 'preset-business-004', 'plot', 'equipment', '奖杯', '🏆', '荣誉象征'),
('card-bus004-e04', 'preset-business-004', 'plot', 'equipment', '钢笔', '🖊️', '签字用笔');

-- ============================================
-- 职场风云 - 职场新人逆袭记（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather (4张)
('card-bus004-w01-en', 'preset-business-004-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky, workplace challenges'),
('card-bus004-w02-en', 'preset-business-004-en', 'plot', 'weather', 'Sunny', '☀️', 'Clear weather'),
('card-bus004-w03-en', 'preset-business-004-en', 'plot', 'weather', 'Rainbow', '🌈', 'Rainbow after rain'),
('card-bus004-w04-en', 'preset-business-004-en', 'plot', 'weather', 'Morning Light', '🌅', 'Warm morning light'),
-- terrain (4张)
('card-bus004-t01-en', 'preset-business-004-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office, battlefield for growth'),
('card-bus004-t02-en', 'preset-business-004-en', 'plot', 'terrain', 'Meeting Room', '📋', 'Serious meeting room'),
('card-bus004-t03-en', 'preset-business-004-en', 'plot', 'terrain', 'Client Office', '🏛️', 'Client workplace'),
('card-bus004-t04-en', 'preset-business-004-en', 'plot', 'terrain', 'Rooftop', '🌃', 'Rooftop view'),
-- adventure (4张)
('card-bus004-a01-en', 'preset-business-004-en', 'plot', 'adventure', 'Breakthrough', '🚀', 'Make a breakthrough, prove yourself'),
('card-bus004-a02-en', 'preset-business-004-en', 'plot', 'adventure', 'Project Launch', '🚀', 'Start new project'),
('card-bus004-a03-en', 'preset-business-004-en', 'plot', 'adventure', 'Rise', '📈', 'Rapid rise'),
('card-bus004-a04-en', 'preset-business-004-en', 'plot', 'adventure', 'Team Management', '👥', 'Manage team'),
-- equipment (4张)
('card-bus004-e01-en', 'preset-business-004-en', 'plot', 'equipment', 'Notebook', '📓', 'Work records, witness to growth'),
('card-bus004-e02-en', 'preset-business-004-en', 'plot', 'equipment', 'Laptop', '💻', 'Essential for work'),
('card-bus004-e03-en', 'preset-business-004-en', 'plot', 'equipment', 'Trophy', '🏆', 'Symbol of honor'),
('card-bus004-e04-en', 'preset-business-004-en', 'plot', 'equipment', 'Pen', '🖊️', 'Signing pen');
