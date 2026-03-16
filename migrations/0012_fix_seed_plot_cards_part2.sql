-- 修复预设书籍的情节卡牌数据 - 第二部分
-- 包含：魔幻传说-平行世界的我、都市言情、职场风云

-- ============================================
-- 魔幻传说 - 平行世界的我（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-fan002-w01', 'preset-fantasy-002', 'plot', 'weather', '时空裂隙', '🌀', '时空扭曲的裂缝'),
('card-fan002-w02', 'preset-fantasy-002', 'plot', 'weather', '永恒黄昏', '🌆', '永不消逝的黄昏'),
('card-fan002-w03', 'preset-fantasy-002', 'plot', 'weather', '觉醒之光', '💫', '力量觉醒的光芒'),
('card-fan002-w04', 'preset-fantasy-002', 'plot', 'weather', '精灵光', '🧚', '精灵的光芒'),
('card-fan002-w05', 'preset-fantasy-002', 'plot', 'weather', '黑暗降临', '🌑', '无尽的黑暗'),
('card-fan002-w06', 'preset-fantasy-002', 'plot', 'weather', '灵魂雾', '👻', '充满灵魂的迷雾'),
('card-fan002-w07', 'preset-fantasy-002', 'plot', 'weather', '光明普照', '✨', '神圣的光芒'),
('card-fan002-w08', 'preset-fantasy-002', 'plot', 'weather', '魔法风暴', '🌀', '充满魔力的风暴'),
('card-fan002-w09', 'preset-fantasy-002', 'plot', 'weather', '传送门光', '🌀', '传送门的神秘光芒'),
('card-fan002-w10', 'preset-fantasy-002', 'plot', 'weather', '创世晨曦', '🌅', '创世之初的光芒'),
-- terrain
('card-fan002-t01', 'preset-fantasy-002', 'plot', 'terrain', '镜像空间', '🪞', '镜像的世界'),
('card-fan002-t02', 'preset-fantasy-002', 'plot', 'terrain', '异世界', '🌀', '另一个维度'),
('card-fan002-t03', 'preset-fantasy-002', 'plot', 'terrain', '魔法森林', '🌳', '充满魔法的森林'),
('card-fan002-t04', 'preset-fantasy-002', 'plot', 'terrain', '精灵村落', '🧚', '精灵的家园'),
('card-fan002-t05', 'preset-fantasy-002', 'plot', 'terrain', '时间裂缝', '⏳', '时间扭曲之地'),
('card-fan002-t06', 'preset-fantasy-002', 'plot', 'terrain', '深渊', '🕳️', '无尽的深渊'),
('card-fan002-t07', 'preset-fantasy-002', 'plot', 'terrain', '神殿', '⛩️', '神圣的殿堂'),
('card-fan002-t08', 'preset-fantasy-002', 'plot', 'terrain', '浮空岛', '🏝️', '漂浮在空中的岛屿'),
('card-fan002-t09', 'preset-fantasy-002', 'plot', 'terrain', '封印之地', '🔒', '封印恶魔的地方'),
('card-fan002-t10', 'preset-fantasy-002', 'plot', 'terrain', '天空城', '🏰', '云端的城市'),
-- adventure
('card-fan002-a01', 'preset-fantasy-002', 'plot', 'adventure', '穿越异界', '🌀', '穿越到另一个世界'),
('card-fan002-a02', 'preset-fantasy-002', 'plot', 'adventure', '发现秘密', '🔮', '揭开隐藏的秘密'),
('card-fan002-a03', 'preset-fantasy-002', 'plot', 'adventure', '魔法研究', '📚', '研究古老的魔法'),
('card-fan002-a04', 'preset-fantasy-002', 'plot', 'adventure', '精灵结盟', '🧚', '与精灵结为盟友'),
('card-fan002-a05', 'preset-fantasy-002', 'plot', 'adventure', '解除诅咒', '🔮', '解除古老的诅咒'),
('card-fan002-a06', 'preset-fantasy-002', 'plot', 'adventure', '觉醒力量', '💫', '觉醒隐藏的力量'),
('card-fan002-a07', 'preset-fantasy-002', 'plot', 'adventure', '元素融合', '🌈', '融合元素之力'),
('card-fan002-a08', 'preset-fantasy-002', 'plot', 'adventure', '元素试炼', '🔥', '元素之神的考验'),
('card-fan002-a09', 'preset-fantasy-002', 'plot', 'adventure', '灵魂救赎', '👼', '救赎迷失的灵魂'),
('card-fan002-a10', 'preset-fantasy-002', 'plot', 'adventure', '守护使命', '🛡️', '守护重要的东西'),
-- equipment
('card-fan002-e01', 'preset-fantasy-002', 'plot', 'equipment', '护身符', '🧿', '保护佩戴者'),
('card-fan002-e02', 'preset-fantasy-002', 'plot', 'equipment', '传送卷轴', '📜', '瞬间传送'),
('card-fan002-e03', 'preset-fantasy-002', 'plot', 'equipment', '法典', '📖', '记载魔法的书籍'),
('card-fan002-e04', 'preset-fantasy-002', 'plot', 'equipment', '水晶球', '🔮', '占卜和储存魔力'),
('card-fan002-e05', 'preset-fantasy-002', 'plot', 'equipment', '召唤石', '💎', '召唤生物'),
('card-fan002-e06', 'preset-fantasy-002', 'plot', 'equipment', '灵魂石', '💜', '储存灵魂'),
('card-fan002-e07', 'preset-fantasy-002', 'plot', 'equipment', '元素宝石', '💠', '储存元素之力'),
('card-fan002-e08', 'preset-fantasy-002', 'plot', 'equipment', '魔法披风', '🧥', '隐身和防护'),
('card-fan002-e09', 'preset-fantasy-002', 'plot', 'equipment', '传送门符', '🌀', '开启传送门'),
('card-fan002-e10', 'preset-fantasy-002', 'plot', 'equipment', '精灵戒指', '💍', '精灵的祝福');

-- ============================================
-- 魔幻传说 - 平行世界的我（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-fan002-w01-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Time Rift', '🌀', 'Time-space distortion'),
('card-fan002-w02-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Eternal Dusk', '🌆', 'Never-ending dusk'),
('card-fan002-w03-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Awakening Light', '💫', 'Power awakening glow'),
('card-fan002-w04-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Elf Light', '🧚', 'Elven glow'),
('card-fan002-w05-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Darkness Falls', '🌑', 'Endless darkness'),
('card-fan002-w06-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Soul Mist', '👻', 'Mist filled with souls'),
('card-fan002-w07-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Divine Light', '✨', 'Sacred light'),
('card-fan002-w08-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Magic Storm', '🌀', 'Magical storm'),
('card-fan002-w09-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Portal Light', '🌀', 'Mysterious portal glow'),
('card-fan002-w10-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Genesis Dawn', '🌅', 'Light of creation'),
-- terrain
('card-fan002-t01-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Mirror Space', '🪞', 'Mirror world'),
('card-fan002-t02-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Other World', '🌀', 'Another dimension'),
('card-fan002-t03-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Magic Forest', '🌳', 'Magical forest'),
('card-fan002-t04-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Elf Village', '🧚', 'Elven home'),
('card-fan002-t05-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Time Fissure', '⏳', 'Time-distorted place'),
('card-fan002-t06-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Abyss', '🕳️', 'Endless abyss'),
('card-fan002-t07-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Temple', '⛩️', 'Sacred hall'),
('card-fan002-t08-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Floating Island', '🏝️', 'Island in the sky'),
('card-fan002-t09-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Sealed Land', '🔒', 'Place sealing demons'),
('card-fan002-t10-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Sky City', '🏰', 'City in the clouds'),
-- adventure
('card-fan002-a01-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Cross Worlds', '🌀', 'Travel to another world'),
('card-fan002-a02-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Discover Secrets', '🔮', 'Uncover hidden secrets'),
('card-fan002-a03-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Magic Research', '📚', 'Study ancient magic'),
('card-fan002-a04-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Elf Alliance', '🧚', 'Form alliance with elves'),
('card-fan002-a05-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Break Curse', '🔮', 'Remove ancient curse'),
('card-fan002-a06-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Awaken Power', '💫', 'Awaken hidden power'),
('card-fan002-a07-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Elemental Fusion', '🌈', 'Fuse elemental power'),
('card-fan002-a08-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Elemental Trial', '🔥', 'Elemental gods test'),
('card-fan002-a09-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Soul Redemption', '👼', 'Redeem lost souls'),
('card-fan002-a10-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Guardian Mission', '🛡️', 'Guard important things'),
-- equipment
('card-fan002-e01-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Amulet', '🧿', 'Protect the wearer'),
('card-fan002-e02-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Teleport Scroll', '📜', 'Instant teleport'),
('card-fan002-e03-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Grimoire', '📖', 'Book of magic'),
('card-fan002-e04-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Crystal Ball', '🔮', 'Divination and magic storage'),
('card-fan002-e05-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Summoning Stone', '💎', 'Summon creatures'),
('card-fan002-e06-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Soul Stone', '💜', 'Store souls'),
('card-fan002-e07-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Elemental Gem', '💠', 'Store elemental power'),
('card-fan002-e08-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Magic Cloak', '🧥', 'Invisibility and protection'),
('card-fan002-e09-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Portal Rune', '🌀', 'Open portal'),
('card-fan002-e10-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Elf Ring', '💍', 'Elven blessing');

-- ============================================
-- 都市言情 - 代码恋人（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-rom001-w01', 'preset-romance-001', 'plot', 'weather', '霓虹', '🌃', '城市的霓虹灯'),
('card-rom001-w02', 'preset-romance-001', 'plot', 'weather', '月色', '🌙', '皎洁的月光'),
('card-rom001-w03', 'preset-romance-001', 'plot', 'weather', '晴天', '☀️', '阳光明媚'),
('card-rom001-w04', 'preset-romance-001', 'plot', 'weather', '雨天', '🌧️', '淅淅沥沥的雨'),
('card-rom001-w05', 'preset-romance-001', 'plot', 'weather', '阴天', '☁️', '阴沉的天空'),
('card-rom001-w06', 'preset-romance-001', 'plot', 'weather', '雷电', '⛈️', '暴风雨'),
('card-rom001-w07', 'preset-romance-001', 'plot', 'weather', '黄昏', '🌆', '温柔的黄昏'),
('card-rom001-w08', 'preset-romance-001', 'plot', 'weather', '雾霾', '🌫️', '雾霾天气'),
('card-rom001-w09', 'preset-romance-001', 'plot', 'weather', '星空', '⭐', '繁星点点'),
('card-rom001-w10', 'preset-romance-001', 'plot', 'weather', '晨光', '🌅', '温暖的晨光'),
-- terrain
('card-rom001-t01', 'preset-romance-001', 'plot', 'terrain', '公司', '🏢', '忙碌的公司'),
('card-rom001-t02', 'preset-romance-001', 'plot', 'terrain', '天台', '🌃', '城市的天台'),
('card-rom001-t03', 'preset-romance-001', 'plot', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅'),
('card-rom001-t04', 'preset-romance-001', 'plot', 'terrain', '会议室', '📋', '严肃的会议室'),
('card-rom001-t05', 'preset-romance-001', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室'),
('card-rom001-t06', 'preset-romance-001', 'plot', 'terrain', '公园', '🌳', '安静的公园'),
-- adventure
('card-rom001-a01', 'preset-romance-001', 'plot', 'adventure', '邂逅', '💫', '命运的相遇'),
('card-rom001-a02', 'preset-romance-001', 'plot', 'adventure', '陪伴', '👫', '默默的陪伴'),
('card-rom001-a03', 'preset-romance-001', 'plot', 'adventure', '追求', '💝', '努力追求'),
('card-rom001-a04', 'preset-romance-001', 'plot', 'adventure', '告白', '💕', '勇敢的表白'),
('card-rom001-a05', 'preset-romance-001', 'plot', 'adventure', '误会', '😔', '令人心痛的误会'),
('card-rom001-a06', 'preset-romance-001', 'plot', 'adventure', '分离', '😢', '不舍的离别'),
('card-rom001-a07', 'preset-romance-001', 'plot', 'adventure', '和解', '🤝', '重归于好'),
('card-rom001-a08', 'preset-romance-001', 'plot', 'adventure', '危机处理', '🚨', '处理危机'),
('card-rom001-a09', 'preset-romance-001', 'plot', 'adventure', '热恋', '❤️', '热恋的甜蜜'),
('card-rom001-a10', 'preset-romance-001', 'plot', 'adventure', '约会', '🌹', '甜蜜的约会'),
-- equipment
('card-rom001-e01', 'preset-romance-001', 'plot', 'equipment', '手机', '📱', '联系的工具'),
('card-rom001-e02', 'preset-romance-001', 'plot', 'equipment', '耳机', '🎧', '分享音乐'),
('card-rom001-e03', 'preset-romance-001', 'plot', 'equipment', '咖啡', '☕', '温暖的咖啡'),
('card-rom001-e04', 'preset-romance-001', 'plot', 'equipment', '雨伞', '☂️', '雨中共享'),
('card-rom001-e05', 'preset-romance-001', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备'),
('card-rom001-e06', 'preset-romance-001', 'plot', 'equipment', '书本', '📚', '共同的爱好'),
('card-rom001-e07', 'preset-romance-001', 'plot', 'equipment', '项链', '📿', '珍贵的礼物'),
('card-rom001-e08', 'preset-romance-001', 'plot', 'equipment', '鲜花', '💐', '浪漫的礼物');

-- ============================================
-- 都市言情 - 代码恋人（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-rom001-w01-en', 'preset-romance-001-en', 'plot', 'weather', 'Neon', '🌃', 'City neon lights'),
('card-rom001-w02-en', 'preset-romance-001-en', 'plot', 'weather', 'Moonlight', '🌙', 'Bright moonlight'),
('card-rom001-w03-en', 'preset-romance-001-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine'),
('card-rom001-w04-en', 'preset-romance-001-en', 'plot', 'weather', 'Rainy', '🌧️', 'Light rain'),
('card-rom001-w05-en', 'preset-romance-001-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky'),
('card-rom001-w06-en', 'preset-romance-001-en', 'plot', 'weather', 'Thunder', '⛈️', 'Storm'),
('card-rom001-w07-en', 'preset-romance-001-en', 'plot', 'weather', 'Dusk', '🌆', 'Gentle dusk'),
('card-rom001-w08-en', 'preset-romance-001-en', 'plot', 'weather', 'Fog', '🌫️', 'Foggy weather'),
('card-rom001-w09-en', 'preset-romance-001-en', 'plot', 'weather', 'Starry', '⭐', 'Starry sky'),
('card-rom001-w10-en', 'preset-romance-001-en', 'plot', 'weather', 'Morning Light', '🌅', 'Warm morning light'),
-- terrain
('card-rom001-t01-en', 'preset-romance-001-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office'),
('card-rom001-t02-en', 'preset-romance-001-en', 'plot', 'terrain', 'Rooftop', '🌃', 'City rooftop'),
('card-rom001-t03-en', 'preset-romance-001-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe'),
('card-rom001-t04-en', 'preset-romance-001-en', 'plot', 'terrain', 'Meeting Room', '📋', 'Serious meeting room'),
('card-rom001-t05-en', 'preset-romance-001-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office'),
('card-rom001-t06-en', 'preset-romance-001-en', 'plot', 'terrain', 'Park', '🌳', 'Quiet park'),
-- adventure
('card-rom001-a01-en', 'preset-romance-001-en', 'plot', 'adventure', 'Encounter', '💫', 'Fateful meeting'),
('card-rom001-a02-en', 'preset-romance-001-en', 'plot', 'adventure', 'Company', '👫', 'Quiet companionship'),
('card-rom001-a03-en', 'preset-romance-001-en', 'plot', 'adventure', 'Pursuit', '💝', 'Earnest pursuit'),
('card-rom001-a04-en', 'preset-romance-001-en', 'plot', 'adventure', 'Confession', '💕', 'Brave confession'),
('card-rom001-a05-en', 'preset-romance-001-en', 'plot', 'adventure', 'Misunderstanding', '😔', 'Painful misunderstanding'),
('card-rom001-a06-en', 'preset-romance-001-en', 'plot', 'adventure', 'Separation', '😢', 'Reluctant parting'),
('card-rom001-a07-en', 'preset-romance-001-en', 'plot', 'adventure', 'Reconciliation', '🤝', 'Make peace'),
('card-rom001-a08-en', 'preset-romance-001-en', 'plot', 'adventure', 'Crisis', '🚨', 'Handle crisis'),
('card-rom001-a09-en', 'preset-romance-001-en', 'plot', 'adventure', 'Passion', '❤️', 'Passionate love'),
('card-rom001-a10-en', 'preset-romance-001-en', 'plot', 'adventure', 'Date', '🌹', 'Sweet date'),
-- equipment
('card-rom001-e01-en', 'preset-romance-001-en', 'plot', 'equipment', 'Phone', '📱', 'Communication tool'),
('card-rom001-e02-en', 'preset-romance-001-en', 'plot', 'equipment', 'Headphones', '🎧', 'Share music'),
('card-rom001-e03-en', 'preset-romance-001-en', 'plot', 'equipment', 'Coffee', '☕', 'Warm coffee'),
('card-rom001-e04-en', 'preset-romance-001-en', 'plot', 'equipment', 'Umbrella', '☂️', 'Share in rain'),
('card-rom001-e05-en', 'preset-romance-001-en', 'plot', 'equipment', 'Laptop', '💻', 'Work essential'),
('card-rom001-e06-en', 'preset-romance-001-en', 'plot', 'equipment', 'Book', '📚', 'Shared interest'),
('card-rom001-e07-en', 'preset-romance-001-en', 'plot', 'equipment', 'Necklace', '📿', 'Precious gift'),
('card-rom001-e08-en', 'preset-romance-001-en', 'plot', 'equipment', 'Flowers', '💐', 'Romantic gift');

-- ============================================
-- 都市言情 - 算法姻缘（中文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-rom002-w01', 'preset-romance-002', 'plot', 'weather', '晴天', '☀️', '阳光明媚'),
('card-rom002-w02', 'preset-romance-002', 'plot', 'weather', '夕阳', '🌇', '浪漫的夕阳'),
('card-rom002-w03', 'preset-romance-002', 'plot', 'weather', '多云', '⛅', '云朵飘浮'),
('card-rom002-w04', 'preset-romance-002', 'plot', 'weather', '星空', '⭐', '繁星点点'),
('card-rom002-w05', 'preset-romance-002', 'plot', 'weather', '阴天', '☁️', '阴沉的天空'),
('card-rom002-w06', 'preset-romance-002', 'plot', 'weather', '雨天', '🌧️', '淅淅沥沥的雨'),
('card-rom002-w07', 'preset-romance-002', 'plot', 'weather', '月色', '🌙', '皎洁的月光'),
('card-rom002-w08', 'preset-romance-002', 'plot', 'weather', '黄昏', '🌆', '温柔的黄昏'),
('card-rom002-w09', 'preset-romance-002', 'plot', 'weather', '彩虹', '🌈', '美丽的彩虹'),
('card-rom002-w10', 'preset-romance-002', 'plot', 'weather', '初雪', '❄️', '第一场雪'),
-- terrain
('card-rom002-t01', 'preset-romance-002', 'plot', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅'),
('card-rom002-t02', 'preset-romance-002', 'plot', 'terrain', '餐厅', '🍽️', '浪漫的餐厅'),
('card-rom002-t03', 'preset-romance-002', 'plot', 'terrain', '公司', '🏢', '忙碌的公司'),
('card-rom002-t04', 'preset-romance-002', 'plot', 'terrain', '海边', '🏖️', '浪漫的海边'),
('card-rom002-t05', 'preset-romance-002', 'plot', 'terrain', '老街', '🏘️', '怀旧的老街'),
('card-rom002-t06', 'preset-romance-002', 'plot', 'terrain', '天台', '🌃', '城市的天台'),
('card-rom002-t07', 'preset-romance-002', 'plot', 'terrain', '画廊', '🖼️', '艺术的画廊'),
('card-rom002-t08', 'preset-romance-002', 'plot', 'terrain', '公园', '🌳', '安静的公园'),
-- adventure
('card-rom002-a01', 'preset-romance-002', 'plot', 'adventure', '邂逅', '💫', '命运的相遇'),
('card-rom002-a02', 'preset-romance-002', 'plot', 'adventure', '约会', '🌹', '甜蜜的约会'),
('card-rom002-a03', 'preset-romance-002', 'plot', 'adventure', '暧昧', '💗', '暧昧的时光'),
('card-rom002-a04', 'preset-romance-002', 'plot', 'adventure', '误会', '😔', '令人心痛的误会'),
('card-rom002-a05', 'preset-romance-002', 'plot', 'adventure', '冷战', '💔', '痛苦的冷战'),
('card-rom002-a06', 'preset-romance-002', 'plot', 'adventure', '追求', '💝', '努力追求'),
('card-rom002-a07', 'preset-romance-002', 'plot', 'adventure', '告白', '💕', '勇敢的表白'),
('card-rom002-a08', 'preset-romance-002', 'plot', 'adventure', '复合', '💕', '重新在一起'),
('card-rom002-a09', 'preset-romance-002', 'plot', 'adventure', '求婚', '💍', '浪漫的求婚'),
-- equipment
('card-rom002-e01', 'preset-romance-002', 'plot', 'equipment', '手机', '📱', '联系的工具'),
('card-rom002-e02', 'preset-romance-002', 'plot', 'equipment', '咖啡', '☕', '温暖的咖啡'),
('card-rom002-e03', 'preset-romance-002', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备'),
('card-rom002-e04', 'preset-romance-002', 'plot', 'equipment', '相机', '📷', '记录美好瞬间'),
('card-rom002-e05', 'preset-romance-002', 'plot', 'equipment', '雨伞', '☂️', '雨中共享'),
('card-rom002-e06', 'preset-romance-002', 'plot', 'equipment', '手表', '⌚', '时间的见证'),
('card-rom002-e07', 'preset-romance-002', 'plot', 'equipment', '鲜花', '💐', '浪漫的礼物'),
('card-rom002-e08', 'preset-romance-002', 'plot', 'equipment', '戒指', '💍', '爱情的象征');

-- ============================================
-- 都市言情 - 算法姻缘（英文版）
-- ============================================
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- weather
('card-rom002-w01-en', 'preset-romance-002-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine'),
('card-rom002-w02-en', 'preset-romance-002-en', 'plot', 'weather', 'Sunset', '🌇', 'Romantic sunset'),
('card-rom002-w03-en', 'preset-romance-002-en', 'plot', 'weather', 'Cloudy', '⛅', 'Clouds floating'),
('card-rom002-w04-en', 'preset-romance-002-en', 'plot', 'weather', 'Starry', '⭐', 'Starry sky'),
('card-rom002-w05-en', 'preset-romance-002-en', 'plot', 'weather', 'Overcast', '☁️', 'Overcast sky'),
('card-rom002-w06-en', 'preset-romance-002-en', 'plot', 'weather', 'Rainy', '🌧️', 'Light rain'),
('card-rom002-w07-en', 'preset-romance-002-en', 'plot', 'weather', 'Moonlight', '🌙', 'Bright moonlight'),
('card-rom002-w08-en', 'preset-romance-002-en', 'plot', 'weather', 'Dusk', '🌆', 'Gentle dusk'),
('card-rom002-w09-en', 'preset-romance-002-en', 'plot', 'weather', 'Rainbow', '🌈', 'Beautiful rainbow'),
('card-rom002-w10-en', 'preset-romance-002-en', 'plot', 'weather', 'First Snow', '❄️', 'First snow'),
-- terrain
('card-rom002-t01-en', 'preset-romance-002-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe'),
('card-rom002-t02-en', 'preset-romance-002-en', 'plot', 'terrain', 'Restaurant', '🍽️', 'Romantic restaurant'),
('card-rom002-t03-en', 'preset-romance-002-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office'),
('card-rom002-t04-en', 'preset-romance-002-en', 'plot', 'terrain', 'Beach', '🏖️', 'Romantic beach'),
('card-rom002-t05-en', 'preset-romance-002-en', 'plot', 'terrain', 'Old Street', '🏘️', 'Nostalgic old street'),
('card-rom002-t06-en', 'preset-romance-002-en', 'plot', 'terrain', 'Rooftop', '🌃', 'City rooftop'),
('card-rom002-t07-en', 'preset-romance-002-en', 'plot', 'terrain', 'Gallery', '🖼️', 'Art gallery'),
('card-rom002-t08-en', 'preset-romance-002-en', 'plot', 'terrain', 'Park', '🌳', 'Quiet park'),
-- adventure
('card-rom002-a01-en', 'preset-romance-002-en', 'plot', 'adventure', 'Encounter', '💫', 'Fateful meeting'),
('card-rom002-a02-en', 'preset-romance-002-en', 'plot', 'adventure', 'Date', '🌹', 'Sweet date'),
('card-rom002-a03-en', 'preset-romance-002-en', 'plot', 'adventure', 'Ambiguity', '💗', 'Ambiguous time'),
('card-rom002-a04-en', 'preset-romance-002-en', 'plot', 'adventure', 'Misunderstanding', '😔', 'Painful misunderstanding'),
('card-rom002-a05-en', 'preset-romance-002-en', 'plot', 'adventure', 'Cold War', '💔', 'Painful cold war'),
('card-rom002-a06-en', 'preset-romance-002-en', 'plot', 'adventure', 'Pursuit', '💝', 'Earnest pursuit'),
('card-rom002-a07-en', 'preset-romance-002-en', 'plot', 'adventure', 'Confession', '💕', 'Brave confession'),
('card-rom002-a08-en', 'preset-romance-002-en', 'plot', 'adventure', 'Reunion', '💕', 'Get back together'),
('card-rom002-a09-en', 'preset-romance-002-en', 'plot', 'adventure', 'Proposal', '💍', 'Romantic proposal'),
-- equipment
('card-rom002-e01-en', 'preset-romance-002-en', 'plot', 'equipment', 'Phone', '📱', 'Communication tool'),
('card-rom002-e02-en', 'preset-romance-002-en', 'plot', 'equipment', 'Coffee', '☕', 'Warm coffee'),
('card-rom002-e03-en', 'preset-romance-002-en', 'plot', 'equipment', 'Laptop', '💻', 'Work essential'),
('card-rom002-e04-en', 'preset-romance-002-en', 'plot', 'equipment', 'Camera', '📷', 'Capture moments'),
('card-rom002-e05-en', 'preset-romance-002-en', 'plot', 'equipment', 'Umbrella', '☂️', 'Share in rain'),
('card-rom002-e06-en', 'preset-romance-002-en', 'plot', 'equipment', 'Watch', '⌚', 'Witness of time'),
('card-rom002-e07-en', 'preset-romance-002-en', 'plot', 'equipment', 'Flowers', '💐', 'Romantic gift'),
('card-rom002-e08-en', 'preset-romance-002-en', 'plot', 'equipment', 'Ring', '💍', 'Symbol of love');
