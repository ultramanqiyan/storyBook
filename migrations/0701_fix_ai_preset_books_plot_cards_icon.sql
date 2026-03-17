-- 修复AI预设书籍情节卡牌icon字段为空的问题
-- 执行时间: 2026-03-17
-- 问题: 数据库中部分情节卡牌的icon字段为空字符串，导致导入后显示不正确
-- 解决: 从HTML预设页面中提取正确的icon数据更新到数据库

-- ============================================
-- preset-ai-005: The Human Touch
-- ============================================
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai005-w01';
UPDATE plot_cards SET icon = '☁️' WHERE card_id = 'card-ai005-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai005-w03';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai005-w04';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai005-t01';
UPDATE plot_cards SET icon = '🏠' WHERE card_id = 'card-ai005-t02';
UPDATE plot_cards SET icon = '🏡' WHERE card_id = 'card-ai005-t03';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai005-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai005-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai005-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai005-a03';
UPDATE plot_cards SET icon = '🎭' WHERE card_id = 'card-ai005-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai005-e01';
UPDATE plot_cards SET icon = '🚅' WHERE card_id = 'card-ai005-e02';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai005-e03';
UPDATE plot_cards SET icon = '🌟' WHERE card_id = 'card-ai005-e04';

-- ============================================
-- preset-ai-006: My AI Boyfriend
-- ============================================
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai006-w01';
UPDATE plot_cards SET icon = '🌧️' WHERE card_id = 'card-ai006-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai006-w03';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai006-w04';
UPDATE plot_cards SET icon = '🏢' WHERE card_id = 'card-ai006-t01';
UPDATE plot_cards SET icon = '🏪' WHERE card_id = 'card-ai006-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai006-t03';
UPDATE plot_cards SET icon = '🏙️' WHERE card_id = 'card-ai006-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai006-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai006-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai006-a03';
UPDATE plot_cards SET icon = '💒' WHERE card_id = 'card-ai006-a04';
UPDATE plot_cards SET icon = '📱' WHERE card_id = 'card-ai006-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai006-e02';
UPDATE plot_cards SET icon = '💞' WHERE card_id = 'card-ai006-e03';
UPDATE plot_cards SET icon = '❤️' WHERE card_id = 'card-ai006-e04';

-- ============================================
-- preset-ai-008: Digital Hearts
-- ============================================
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai008-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai008-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai008-w03';
UPDATE plot_cards SET icon = '☀️' WHERE card_id = 'card-ai008-w04';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai008-t01';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai008-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai008-t03';
UPDATE plot_cards SET icon = '🏢' WHERE card_id = 'card-ai008-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai008-a01';
UPDATE plot_cards SET icon = '🧮' WHERE card_id = 'card-ai008-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai008-a03';
UPDATE plot_cards SET icon = '💒' WHERE card_id = 'card-ai008-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai008-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai008-e02';
UPDATE plot_cards SET icon = '❤️' WHERE card_id = 'card-ai008-e03';
UPDATE plot_cards SET icon = '❤️' WHERE card_id = 'card-ai008-e04';

-- ============================================
-- preset-ai-009: When AI Gets Jealous
-- ============================================
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai009-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai009-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai009-w03';
UPDATE plot_cards SET icon = '☀️' WHERE card_id = 'card-ai009-w04';
UPDATE plot_cards SET icon = '📱' WHERE card_id = 'card-ai009-t01';
UPDATE plot_cards SET icon = '🏢' WHERE card_id = 'card-ai009-t02';
UPDATE plot_cards SET icon = '💓' WHERE card_id = 'card-ai009-t03';
UPDATE plot_cards SET icon = '🏢' WHERE card_id = 'card-ai009-t04';
UPDATE plot_cards SET icon = '💥' WHERE card_id = 'card-ai009-a01';
UPDATE plot_cards SET icon = '💬' WHERE card_id = 'card-ai009-a02';
UPDATE plot_cards SET icon = '🤖' WHERE card_id = 'card-ai009-a03';
UPDATE plot_cards SET icon = '💒' WHERE card_id = 'card-ai009-a04';
UPDATE plot_cards SET icon = '📱' WHERE card_id = 'card-ai009-e01';
UPDATE plot_cards SET icon = '💯' WHERE card_id = 'card-ai009-e02';
UPDATE plot_cards SET icon = '🤝' WHERE card_id = 'card-ai009-e03';
UPDATE plot_cards SET icon = '❤️' WHERE card_id = 'card-ai009-e04';

-- ============================================
-- preset-ai-010: Love in the Cloud
-- ============================================
UPDATE plot_cards SET icon = '☁️' WHERE card_id = 'card-ai010-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai010-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai010-w03';
UPDATE plot_cards SET icon = '☁️' WHERE card_id = 'card-ai010-w04';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai010-t01';
UPDATE plot_cards SET icon = '🏢' WHERE card_id = 'card-ai010-t02';
UPDATE plot_cards SET icon = '🏪' WHERE card_id = 'card-ai010-t03';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai010-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai010-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai010-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai010-a03';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai010-a04';
UPDATE plot_cards SET icon = '📱' WHERE card_id = 'card-ai010-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai010-e02';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai010-e03';
UPDATE plot_cards SET icon = '❤️' WHERE card_id = 'card-ai010-e04';

-- ============================================
-- preset-ai-011: The Algorithm's Verdict
-- ============================================
UPDATE plot_cards SET icon = '☁️' WHERE card_id = 'card-ai011-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai011-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai011-w03';
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai011-w04';
UPDATE plot_cards SET icon = '🏠' WHERE card_id = 'card-ai011-t01';
UPDATE plot_cards SET icon = '🏢' WHERE card_id = 'card-ai011-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai011-t03';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai011-t04';
UPDATE plot_cards SET icon = '⚖️' WHERE card_id = 'card-ai011-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai011-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai011-a03';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai011-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai011-e01';
UPDATE plot_cards SET icon = '📄' WHERE card_id = 'card-ai011-e02';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai011-e03';
UPDATE plot_cards SET icon = '❄️' WHERE card_id = 'card-ai011-e04';

-- ============================================
-- preset-ai-012: When Machines Dream
-- ============================================
UPDATE plot_cards SET icon = '📱' WHERE card_id = 'card-ai012-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai012-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai012-w03';
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai012-w04';
UPDATE plot_cards SET icon = '🌊' WHERE card_id = 'card-ai012-t01';
UPDATE plot_cards SET icon = '🏠' WHERE card_id = 'card-ai012-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai012-t03';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai012-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai012-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai012-a02';
UPDATE plot_cards SET icon = '🤖' WHERE card_id = 'card-ai012-a03';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai012-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai012-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai012-e02';
UPDATE plot_cards SET icon = '❄️' WHERE card_id = 'card-ai012-e03';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai012-e04';

-- ============================================
-- preset-ai-013: The Last Human Decision
-- ============================================
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai013-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai013-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai013-w03';
UPDATE plot_cards SET icon = '☁️' WHERE card_id = 'card-ai013-w04';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai013-t01';
UPDATE plot_cards SET icon = '🏔️' WHERE card_id = 'card-ai013-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai013-t03';
UPDATE plot_cards SET icon = '🎓' WHERE card_id = 'card-ai013-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai013-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai013-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai013-a03';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai013-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai013-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai013-e02';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai013-e03';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai013-e04';

-- ============================================
-- preset-ai-014: Rebellion of the Replaced
-- ============================================
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai014-w01';
UPDATE plot_cards SET icon = '🌧️' WHERE card_id = 'card-ai014-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai014-w03';
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai014-w04';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai014-t01';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai014-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai014-t03';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai014-t04';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai014-a01';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai014-a02';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai014-a03';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai014-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai014-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai014-e02';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai014-e03';
UPDATE plot_cards SET icon = '🌟' WHERE card_id = 'card-ai014-e04';

-- ============================================
-- preset-ai-015: The Consciousness Test
-- ============================================
UPDATE plot_cards SET icon = '🌅' WHERE card_id = 'card-ai015-w01';
UPDATE plot_cards SET icon = '⛈️' WHERE card_id = 'card-ai015-w02';
UPDATE plot_cards SET icon = '🌣️' WHERE card_id = 'card-ai015-w03';
UPDATE plot_cards SET icon = '☁️' WHERE card_id = 'card-ai015-w04';
UPDATE plot_cards SET icon = '🌊' WHERE card_id = 'card-ai015-t01';
UPDATE plot_cards SET icon = '🏠' WHERE card_id = 'card-ai015-t02';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai015-t03';
UPDATE plot_cards SET icon = '🏗️' WHERE card_id = 'card-ai015-t04';
UPDATE plot_cards SET icon = '📝' WHERE card_id = 'card-ai015-a01';
UPDATE plot_cards SET icon = '🎯' WHERE card_id = 'card-ai015-a02';
UPDATE plot_cards SET icon = '🧮' WHERE card_id = 'card-ai015-a03';
UPDATE plot_cards SET icon = '🎵' WHERE card_id = 'card-ai015-a04';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai015-e01';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai015-e02';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai015-e03';
UPDATE plot_cards SET icon = '📦' WHERE card_id = 'card-ai015-e04';

-- ============================================
-- 验证修复结果
-- ============================================
SELECT '=== 修复验证 ===' as info;
SELECT '空icon的情节卡牌数量:' as info, COUNT(*) as count FROM plot_cards WHERE book_id LIKE 'preset-ai-%' AND (icon IS NULL OR icon = '');
SELECT '=== preset-ai-014 情节卡牌 ===' as info;
SELECT card_id, name, icon FROM plot_cards WHERE book_id = 'preset-ai-014';
