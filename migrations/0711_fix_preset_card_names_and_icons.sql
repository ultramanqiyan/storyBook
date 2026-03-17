-- 修复预设书籍卡牌名称和emoji
-- 执行时间: 2026-03-17T12:50:12.376Z
-- 总计: 105 条更新语句

-- preset-adventure-003: 星空夜 -> 星空
UPDATE plot_cards SET name = '星空', icon = '🌙' WHERE card_id = 'card-adv003-w03';
-- preset-adventure-003: 彩虹天 -> 彩虹
UPDATE plot_cards SET name = '彩虹', icon = '🌈' WHERE card_id = 'card-adv003-w04';
-- preset-adventure-003: 丛林 -> 森林
UPDATE plot_cards SET name = '森林', icon = '🌲' WHERE card_id = 'card-adv003-t01';
-- preset-adventure-003: 榕树下 -> 树屋
UPDATE plot_cards SET name = '树屋', icon = '🏡' WHERE card_id = 'card-adv003-t03';
-- preset-adventure-003: 萤火虫小径 -> 花园
UPDATE plot_cards SET name = '花园', icon = '🌻' WHERE card_id = 'card-adv003-t04';
-- preset-adventure-003: 守护使命 -> 救援
UPDATE plot_cards SET name = '救援', icon = '🆘' WHERE card_id = 'card-adv003-a04';
-- preset-adventure-003: 老地图 -> 地图
UPDATE plot_cards SET name = '地图', icon = '🗺️' WHERE card_id = 'card-adv003-e01';
-- preset-adventure-003: 丛林 -> 森林
UPDATE plot_cards SET name = '森林', icon = '🌲' WHERE card_id = 'card-adv003-02';
-- preset-adventure-003: 老地图 -> 地图
UPDATE plot_cards SET name = '地图', icon = '🗺️' WHERE card_id = 'card-adv003-04';
-- preset-adventure-003-en: Morning Fog -> Morning Mist
UPDATE plot_cards SET name = 'Morning Mist', icon = '🌫️' WHERE card_id = 'card-adv003-w02-en';
-- preset-adventure-003-en: Jungle -> Forest
UPDATE plot_cards SET name = 'Forest', icon = '🌲' WHERE card_id = 'card-adv003-t01-en';
-- preset-adventure-003-en: Banyan Tree -> Treehouse
UPDATE plot_cards SET name = 'Treehouse', icon = '🏡' WHERE card_id = 'card-adv003-t03-en';
-- preset-adventure-003-en: Firefly Path -> Garden
UPDATE plot_cards SET name = 'Garden', icon = '🌻' WHERE card_id = 'card-adv003-t04-en';
-- preset-adventure-003-en: Explore -> Exploration
UPDATE plot_cards SET name = 'Exploration', icon = '🧭' WHERE card_id = 'card-adv003-a01-en';
-- preset-adventure-003-en: Solve Puzzles -> Puzzle Solving
UPDATE plot_cards SET name = 'Puzzle Solving', icon = '🧩' WHERE card_id = 'card-adv003-a02-en';
-- preset-adventure-003-en: Guardian Mission -> Rescue
UPDATE plot_cards SET name = 'Rescue', icon = '🆘' WHERE card_id = 'card-adv003-a04-en';
-- preset-adventure-003-en: Old Map -> Map
UPDATE plot_cards SET name = 'Map', icon = '🗺️' WHERE card_id = 'card-adv003-e01-en';
-- preset-adventure-003-en: Jungle -> Forest
UPDATE plot_cards SET name = 'Forest', icon = '🌲' WHERE card_id = 'card-adv003-02-en';
-- preset-adventure-003-en: Explore -> Exploration
UPDATE plot_cards SET name = 'Exploration', icon = '🧭' WHERE card_id = 'card-adv003-03-en';
-- preset-adventure-003-en: Old Map -> Map
UPDATE plot_cards SET name = 'Map', icon = '🗺️' WHERE card_id = 'card-adv003-04-en';
-- preset-adventure-004: 暴风雪 -> 雷雨
UPDATE plot_cards SET name = '雷雨', icon = '⛈️' WHERE card_id = 'card-adv004-w04';
-- preset-adventure-004: 冰原 -> 雪山
UPDATE plot_cards SET name = '雪山', icon = '🗻' WHERE card_id = 'card-adv004-t01';
-- preset-adventure-004: 冰川 -> 雪山
UPDATE plot_cards SET name = '雪山', icon = '🗻' WHERE card_id = 'card-adv004-t02';
-- preset-adventure-004: 冰洞 -> 洞穴
UPDATE plot_cards SET name = '洞穴', icon = '🕳️' WHERE card_id = 'card-adv004-t03';
-- preset-adventure-004: 科考 -> 发现秘密
UPDATE plot_cards SET name = '发现秘密', icon = '🔮' WHERE card_id = 'card-adv004-a02';
-- preset-adventure-004: 守护使命 -> 救援
UPDATE plot_cards SET name = '救援', icon = '🆘' WHERE card_id = 'card-adv004-a03';
-- preset-adventure-004: 羽绒服 -> 背包
UPDATE plot_cards SET name = '背包', icon = '🎒' WHERE card_id = 'card-adv004-e02';
-- preset-adventure-004: 徽章 -> 指南针
UPDATE plot_cards SET name = '指南针', icon = '🧭' WHERE card_id = 'card-adv004-e04';
-- preset-adventure-004: 冰原 -> 雪山
UPDATE plot_cards SET name = '雪山', icon = '🗻' WHERE card_id = 'card-adv004-02';
-- preset-adventure-004-en: Snow -> Snowy
UPDATE plot_cards SET name = 'Snowy', icon = '❄️' WHERE card_id = 'card-adv004-w01-en';
-- preset-adventure-004-en: Blizzard -> Thunderstorm
UPDATE plot_cards SET name = 'Thunderstorm', icon = '⛈️' WHERE card_id = 'card-adv004-w04-en';
-- preset-adventure-004-en: Ice Plains -> Snow Mountain
UPDATE plot_cards SET name = 'Snow Mountain', icon = '🗻' WHERE card_id = 'card-adv004-t01-en';
-- preset-adventure-004-en: Glacier -> Snow Mountain
UPDATE plot_cards SET name = 'Snow Mountain', icon = '🗻' WHERE card_id = 'card-adv004-t02-en';
-- preset-adventure-004-en: Ice Cave -> Cave
UPDATE plot_cards SET name = 'Cave', icon = '🕳️' WHERE card_id = 'card-adv004-t03-en';
-- preset-adventure-004-en: Research -> Discover Secrets
UPDATE plot_cards SET name = 'Discover Secrets', icon = '🔮' WHERE card_id = 'card-adv004-a02-en';
-- preset-adventure-004-en: Guardian Mission -> Rescue
UPDATE plot_cards SET name = 'Rescue', icon = '🆘' WHERE card_id = 'card-adv004-a03-en';
-- preset-adventure-004-en: Observe Animals -> Animal Watching
UPDATE plot_cards SET name = 'Animal Watching', icon = '🦋' WHERE card_id = 'card-adv004-a04-en';
-- preset-adventure-004-en: Parka -> Backpack
UPDATE plot_cards SET name = 'Backpack', icon = '🎒' WHERE card_id = 'card-adv004-e02-en';
-- preset-adventure-004-en: Badge -> Compass
UPDATE plot_cards SET name = 'Compass', icon = '🧭' WHERE card_id = 'card-adv004-e04-en';
-- preset-adventure-004-en: Snow -> Snowy
UPDATE plot_cards SET name = 'Snowy', icon = '❄️' WHERE card_id = 'card-adv004-01-en';
-- preset-adventure-004-en: Ice Plains -> Snow Mountain
UPDATE plot_cards SET name = 'Snow Mountain', icon = '🗻' WHERE card_id = 'card-adv004-02-en';
-- preset-business-003: 晨光 -> 晴天
UPDATE plot_cards SET name = '晴天', icon = '☀️' WHERE card_id = 'card-bus003-w04';
-- preset-business-003: 咖啡馆 -> 咖啡厅
UPDATE plot_cards SET name = '咖啡厅', icon = '☕' WHERE card_id = 'card-bus003-t04';
-- preset-business-003-en: Morning Light -> Sunny
UPDATE plot_cards SET name = 'Sunny', icon = '☀️' WHERE card_id = 'card-bus003-w04-en';
-- preset-business-003-en: Cafe -> Coffee Shop
UPDATE plot_cards SET name = 'Coffee Shop', icon = '☕' WHERE card_id = 'card-bus003-t04-en';
-- preset-business-003-en: Funding -> Financing
UPDATE plot_cards SET name = 'Financing', icon = '💰' WHERE card_id = 'card-bus003-a01-en';
-- preset-business-003-en: Pivot -> Transformation
UPDATE plot_cards SET name = 'Transformation', icon = '🔄' WHERE card_id = 'card-bus003-a02-en';
-- preset-business-003-en: Funding -> Financing
UPDATE plot_cards SET name = 'Financing', icon = '💰' WHERE card_id = 'card-bus003-03-en';
-- preset-business-004: 晨光 -> 晴天
UPDATE plot_cards SET name = '晴天', icon = '☀️' WHERE card_id = 'card-bus004-w04';
-- preset-business-004: 楼顶 -> 天台
UPDATE plot_cards SET name = '天台', icon = '🌃' WHERE card_id = 'card-bus004-t04';
-- preset-business-004: 突破 icon update
UPDATE plot_cards SET icon = '🎯' WHERE card_id = 'card-bus004-a01';
-- preset-business-004: 笔记本 -> 记事本
UPDATE plot_cards SET name = '记事本', icon = '📓' WHERE card_id = 'card-bus004-e01';
-- preset-business-004: 钢笔 -> 签字笔
UPDATE plot_cards SET name = '签字笔', icon = '🖊️' WHERE card_id = 'card-bus004-e04';
-- preset-business-004: 突破 icon update
UPDATE plot_cards SET icon = '🎯' WHERE card_id = 'card-bus004-03';
-- preset-business-004: 笔记本 -> 记事本
UPDATE plot_cards SET name = '记事本', icon = '📓' WHERE card_id = 'card-bus004-04';
-- preset-business-004-en: Morning Light -> Sunny
UPDATE plot_cards SET name = 'Sunny', icon = '☀️' WHERE card_id = 'card-bus004-w04-en';
-- preset-business-004-en: Client Office -> Client Company
UPDATE plot_cards SET name = 'Client Company', icon = '🏛️' WHERE card_id = 'card-bus004-t03-en';
-- preset-business-004-en: Breakthrough icon update
UPDATE plot_cards SET icon = '🎯' WHERE card_id = 'card-bus004-a01-en';
-- preset-business-004-en: Notebook -> Planner
UPDATE plot_cards SET name = 'Planner', icon = '📓' WHERE card_id = 'card-bus004-e01-en';
-- preset-business-004-en: Breakthrough icon update
UPDATE plot_cards SET icon = '🎯' WHERE card_id = 'card-bus004-03-en';
-- preset-business-004-en: Notebook -> Planner
UPDATE plot_cards SET name = 'Planner', icon = '📓' WHERE card_id = 'card-bus004-04-en';
-- preset-fantasy-003: 火焰风暴 -> 魔法风暴
UPDATE plot_cards SET name = '魔法风暴', icon = '🌀' WHERE card_id = 'card-fan003-w01';
-- preset-fantasy-003: 创世晨曦 -> 创世曙光
UPDATE plot_cards SET name = '创世曙光', icon = '🌅' WHERE card_id = 'card-fan003-w04';
-- preset-fantasy-003: 龙之巢 -> 龙巢
UPDATE plot_cards SET name = '龙巢', icon = '🐉' WHERE card_id = 'card-fan003-t01';
-- preset-fantasy-003: 龙族学院 -> 魔法塔
UPDATE plot_cards SET name = '魔法塔', icon = '🗼' WHERE card_id = 'card-fan003-t02';
-- preset-fantasy-003: 魔杖 -> 魔法杖
UPDATE plot_cards SET name = '魔法杖', icon = '🪄' WHERE card_id = 'card-fan003-e03';
-- preset-fantasy-003: 龙心勋章 -> 龙之心
UPDATE plot_cards SET name = '龙之心', icon = '❤️' WHERE card_id = 'card-fan003-e04';
-- preset-fantasy-003: 火焰风暴 -> 魔法风暴
UPDATE plot_cards SET name = '魔法风暴', icon = '🌀' WHERE card_id = 'card-fan003-01';
-- preset-fantasy-003: 龙之巢 -> 龙巢
UPDATE plot_cards SET name = '龙巢', icon = '🐉' WHERE card_id = 'card-fan003-02';
-- preset-fantasy-003-en: Fire Storm -> Magic Storm
UPDATE plot_cards SET name = 'Magic Storm', icon = '🌀' WHERE card_id = 'card-fan003-w01-en';
-- preset-fantasy-003-en: Dragon Nest -> Dragon's Lair
UPDATE plot_cards SET name = 'Dragon''s Lair', icon = '🐉' WHERE card_id = 'card-fan003-t01-en';
-- preset-fantasy-003-en: Dragon Academy -> Magic Tower
UPDATE plot_cards SET name = 'Magic Tower', icon = '🗼' WHERE card_id = 'card-fan003-t02-en';
-- preset-fantasy-003-en: Fire Storm -> Magic Storm
UPDATE plot_cards SET name = 'Magic Storm', icon = '🌀' WHERE card_id = 'card-fan003-01-en';
-- preset-fantasy-003-en: Dragon Nest -> Dragon's Lair
UPDATE plot_cards SET name = 'Dragon''s Lair', icon = '🐉' WHERE card_id = 'card-fan003-02-en';
-- preset-fantasy-004: 时空裂隙 icon update
UPDATE plot_cards SET icon = '🕳️' WHERE card_id = 'card-fan004-w01';
-- preset-fantasy-004: 创世晨曦 -> 创世曙光
UPDATE plot_cards SET name = '创世曙光', icon = '🌅' WHERE card_id = 'card-fan004-w04';
-- preset-fantasy-004: 时空裂缝 -> 时间裂隙
UPDATE plot_cards SET name = '时间裂隙', icon = '⏳' WHERE card_id = 'card-fan004-t04';
-- preset-fantasy-004: 魔杖 -> 魔法杖
UPDATE plot_cards SET name = '魔法杖', icon = '🪄' WHERE card_id = 'card-fan004-e03';
-- preset-fantasy-004: 时空徽章 -> 传送符文
UPDATE plot_cards SET name = '传送符文', icon = '🌀' WHERE card_id = 'card-fan004-e04';
-- preset-fantasy-004: 时空裂隙 icon update
UPDATE plot_cards SET icon = '🕳️' WHERE card_id = 'card-fan004-01';
-- preset-fantasy-004-en: Time Rift icon update
UPDATE plot_cards SET icon = '🕳️' WHERE card_id = 'card-fan004-w01-en';
-- preset-fantasy-004-en: Seal Scroll -> Sealing Scroll
UPDATE plot_cards SET name = 'Sealing Scroll', icon = '📜' WHERE card_id = 'card-fan004-e02-en';
-- preset-fantasy-004-en: Time Rift icon update
UPDATE plot_cards SET icon = '🕳️' WHERE card_id = 'card-fan004-01-en';
-- preset-romance-003: 月色 -> 月光
UPDATE plot_cards SET name = '月光', icon = '🌙' WHERE card_id = 'card-rom003-w04';
-- preset-romance-003: 咖啡厅 -> 咖啡馆
UPDATE plot_cards SET name = '咖啡馆', icon = '☕' WHERE card_id = 'card-rom003-t01';
-- preset-romance-003: 画室 -> 画廊
UPDATE plot_cards SET name = '画廊', icon = '🖼️' WHERE card_id = 'card-rom003-t03';
-- preset-romance-003: 街道 -> 老街
UPDATE plot_cards SET name = '老街', icon = '🏘️' WHERE card_id = 'card-rom003-t04';
-- preset-romance-003: 邂逅 -> 初遇
UPDATE plot_cards SET name = '初遇', icon = '💫' WHERE card_id = 'card-rom003-a01';
-- preset-romance-003: 画板 -> 画布
UPDATE plot_cards SET name = '画布', icon = '🎨' WHERE card_id = 'card-rom003-e01';
-- preset-romance-003: 咖啡厅 -> 咖啡馆
UPDATE plot_cards SET name = '咖啡馆', icon = '☕' WHERE card_id = 'card-rom003-02';
-- preset-romance-003: 邂逅 -> 初遇
UPDATE plot_cards SET name = '初遇', icon = '💫' WHERE card_id = 'card-rom003-03';
-- preset-romance-003: 画板 -> 画布
UPDATE plot_cards SET name = '画布', icon = '🎨' WHERE card_id = 'card-rom003-04';
-- preset-romance-003-en: Rainy -> Rainy Day
UPDATE plot_cards SET name = 'Rainy Day', icon = '🌧️' WHERE card_id = 'card-rom003-w02-en';
-- preset-romance-003-en: Sunny -> Sunny Day
UPDATE plot_cards SET name = 'Sunny Day', icon = '☀️' WHERE card_id = 'card-rom003-w03-en';
-- preset-romance-003-en: Studio -> Gallery
UPDATE plot_cards SET name = 'Gallery', icon = '🖼️' WHERE card_id = 'card-rom003-t03-en';
-- preset-romance-003-en: Street -> Old Street
UPDATE plot_cards SET name = 'Old Street', icon = '🏘️' WHERE card_id = 'card-rom003-t04-en';
-- preset-romance-003-en: Encounter -> First Meeting
UPDATE plot_cards SET name = 'First Meeting', icon = '💫' WHERE card_id = 'card-rom003-a01-en';
-- preset-romance-003-en: Easel -> Canvas
UPDATE plot_cards SET name = 'Canvas', icon = '🎨' WHERE card_id = 'card-rom003-e01-en';
-- preset-romance-003-en: Encounter -> First Meeting
UPDATE plot_cards SET name = 'First Meeting', icon = '💫' WHERE card_id = 'card-rom003-03-en';
-- preset-romance-003-en: Easel -> Canvas
UPDATE plot_cards SET name = 'Canvas', icon = '🎨' WHERE card_id = 'card-rom003-04-en';
-- preset-romance-004: 月色 -> 月光
UPDATE plot_cards SET name = '月光', icon = '🌙' WHERE card_id = 'card-rom004-w04';
-- preset-romance-004: 咖啡厅 -> 咖啡馆
UPDATE plot_cards SET name = '咖啡馆', icon = '☕' WHERE card_id = 'card-rom004-t04';
-- preset-romance-004-en: Cherry Blossoms -> Cherry Blossom Rain
UPDATE plot_cards SET name = 'Cherry Blossom Rain', icon = '🌸' WHERE card_id = 'card-rom004-w01-en';
-- preset-romance-004-en: Sunny -> Sunny Day
UPDATE plot_cards SET name = 'Sunny Day', icon = '☀️' WHERE card_id = 'card-rom004-w02-en';
-- preset-romance-004-en: Cherry Blossoms -> Cherry Blossom Rain
UPDATE plot_cards SET name = 'Cherry Blossom Rain', icon = '🌸' WHERE card_id = 'card-rom004-01-en';

-- 验证
SELECT '=== 更新后的卡牌检查 ===' as info;
SELECT book_id, COUNT(*) as unmatched FROM plot_cards 
WHERE book_id LIKE 'preset-%' AND book_id NOT LIKE 'preset-ai-%' 
AND (icon IS NULL OR icon = '') 
GROUP BY book_id;
