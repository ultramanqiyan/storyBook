-- 修复 plot_cards 表中 type 和 sub_type 字段值
-- 问题：seed数据中 type 存储了 'weather'/'terrain'/'adventure'/'equipment'，sub_type 存储了具体名称
-- 正确：type 应该是 'plot'，sub_type 应该是 'weather'/'terrain'/'adventure'/'equipment'

-- 首先删除所有预设书籍的情节卡片
DELETE FROM plot_cards WHERE book_id LIKE 'preset-%';

-- 重新插入正确的预设情节卡片
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
-- 儿童冒险 - 星空探险家
('card-adv001-01', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气，适合户外探险'),
('card-adv001-02', 'preset-adventure-001', 'plot', 'terrain', '海滩', '🏖️', '金色的海滩，可以发现海洋的秘密'),
('card-adv001-03', 'preset-adventure-001', 'plot', 'adventure', '寻宝', '🗺️', '寻找隐藏的宝藏，充满惊喜'),
('card-adv001-04', 'preset-adventure-001', 'plot', 'equipment', '望远镜', '🔭', '观察远方，发现隐藏的线索'),

-- 儿童冒险 - 深海探险队
('card-adv002-01', 'preset-adventure-002', 'plot', 'weather', '蓝天', '🌤️', '湛蓝的天空，海风轻拂'),
('card-adv002-02', 'preset-adventure-002', 'plot', 'terrain', '岛屿', '🏝️', '神秘的岛屿，等待探索'),
('card-adv002-03', 'preset-adventure-002', 'plot', 'adventure', '救援', '🆘', '救援被困的朋友，展现勇气'),
('card-adv002-04', 'preset-adventure-002', 'plot', 'equipment', '相机', '📷', '记录美丽的瞬间'),

-- 魔幻传说 - AI魔法学院
('card-fan001-01', 'preset-fantasy-001', 'plot', 'weather', '极光', '🌌', '绚丽的魔法极光，充满魔力'),
('card-fan001-02', 'preset-fantasy-001', 'plot', 'terrain', '魔法塔', '🗼', '高耸的魔法塔，学习魔法的地方'),
('card-fan001-03', 'preset-fantasy-001', 'plot', 'adventure', '魔法测试', '📝', '通过魔法试炼，证明实力'),
('card-fan001-04', 'preset-fantasy-001', 'plot', 'equipment', '魔杖', '🪄', '施展魔法的法杖，不可或缺'),

-- 魔幻传说 - 平行世界的我
('card-fan002-01', 'preset-fantasy-002', 'plot', 'weather', '时空裂隙', '🌀', '时空扭曲的裂缝，通往另一个世界'),
('card-fan002-02', 'preset-fantasy-002', 'plot', 'terrain', '镜像空间', '🪞', '镜像的世界，另一个自己'),
('card-fan002-03', 'preset-fantasy-002', 'plot', 'adventure', '穿越异界', '🌀', '穿越到另一个世界，探索未知'),
('card-fan002-04', 'preset-fantasy-002', 'plot', 'equipment', '护身符', '🧿', '保护佩戴者，抵御危险'),

-- 都市言情 - 代码恋人
('card-rom001-01', 'preset-romance-001', 'plot', 'weather', '霓虹', '🌃', '城市的霓虹灯，浪漫的夜晚'),
('card-rom001-02', 'preset-romance-001', 'plot', 'terrain', '公司', '🏢', '忙碌的公司，故事开始的地方'),
('card-rom001-03', 'preset-romance-001', 'plot', 'adventure', '邂逅', '💫', '命运的相遇，爱情的开始'),
('card-rom001-04', 'preset-romance-001', 'plot', 'equipment', '手机', '📱', '联系的工具，传递心意'),

-- 都市言情 - 算法姻缘
('card-rom002-01', 'preset-romance-002', 'plot', 'weather', '晴天', '☀️', '阳光明媚，适合约会'),
('card-rom002-02', 'preset-romance-002', 'plot', 'terrain', '咖啡厅', '☕', '温馨的咖啡厅，浪漫的约会地点'),
('card-rom002-03', 'preset-romance-002', 'plot', 'adventure', '约会', '🌹', '甜蜜的约会，增进感情'),
('card-rom002-04', 'preset-romance-002', 'plot', 'equipment', '相机', '📷', '记录美好瞬间，留下回忆'),

-- 职场风云 - 周报战争
('card-bus001-01', 'preset-business-001', 'plot', 'weather', '阴天', '☁️', '阴沉的天空，职场如战场'),
('card-bus001-02', 'preset-business-001', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室，周报的战场'),
('card-bus001-03', 'preset-business-001', 'plot', 'adventure', '谈判', '🤝', '商务谈判，展现能力'),
('card-bus001-04', 'preset-business-001', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备，战斗的武器'),

-- 职场风云 - 副业狂想曲
('card-bus002-01', 'preset-business-002', 'plot', 'weather', '晴天', '☀️', '晴朗的天气，新的开始'),
('card-bus002-02', 'preset-business-002', 'plot', 'terrain', '办公室', '🏢', '忙碌的办公室，双重生活的起点'),
('card-bus002-03', 'preset-business-002', 'plot', 'adventure', '创新', '💡', '技术创新，突破自我'),
('card-bus002-04', 'preset-business-002', 'plot', 'equipment', '笔记本电脑', '💻', '工作必备，创作的工具'),

-- English versions - Children's Adventure - Stargazer's Quest
('card-adv001-01-en', 'preset-adventure-001-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine, perfect for outdoor adventures'),
('card-adv001-02-en', 'preset-adventure-001-en', 'plot', 'terrain', 'Beach', '🏖️', 'Golden beach, discover ocean secrets'),
('card-adv001-03-en', 'preset-adventure-001-en', 'plot', 'adventure', 'Treasure Hunt', '🗺️', 'Search for hidden treasures, full of surprises'),
('card-adv001-04-en', 'preset-adventure-001-en', 'plot', 'equipment', 'Telescope', '🔭', 'Observe the distance, discover hidden clues'),

-- English versions - Children's Adventure - The Deep Sea Explorers
('card-adv002-01-en', 'preset-adventure-002-en', 'plot', 'weather', 'Blue Sky', '🌤️', 'Clear blue sky, gentle sea breeze'),
('card-adv002-02-en', 'preset-adventure-002-en', 'plot', 'terrain', 'Island', '🏝️', 'Mysterious island, waiting to be explored'),
('card-adv002-03-en', 'preset-adventure-002-en', 'plot', 'adventure', 'Rescue', '🆘', 'Rescue trapped friends, show courage'),
('card-adv002-04-en', 'preset-adventure-002-en', 'plot', 'equipment', 'Camera', '📷', 'Capture beautiful moments'),

-- English versions - Fantasy Legend - The Academy of Smart Magic
('card-fan001-01-en', 'preset-fantasy-001-en', 'plot', 'weather', 'Aurora', '🌌', 'Magical aurora, full of enchantment'),
('card-fan001-02-en', 'preset-fantasy-001-en', 'plot', 'terrain', 'Magic Tower', '🗼', 'Towering magic tower, where magic is learned'),
('card-fan001-03-en', 'preset-fantasy-001-en', 'plot', 'adventure', 'Magic Test', '📝', 'Pass the magic trial, prove your power'),
('card-fan001-04-en', 'preset-fantasy-001-en', 'plot', 'equipment', 'Magic Wand', '🪄', 'Essential tool for casting spells'),

-- English versions - Fantasy Legend - The Other Me
('card-fan002-01-en', 'preset-fantasy-002-en', 'plot', 'weather', 'Time Rift', '🌀', 'Distorted space-time rift, gateway to another world'),
('card-fan002-02-en', 'preset-fantasy-002-en', 'plot', 'terrain', 'Mirror Dimension', '🪞', 'Mirror world, another version of yourself'),
('card-fan002-03-en', 'preset-fantasy-002-en', 'plot', 'adventure', 'Dimension Travel', '🌀', 'Cross to another world, explore the unknown'),
('card-fan002-04-en', 'preset-fantasy-002-en', 'plot', 'equipment', 'Amulet', '🧿', 'Protects the wearer from danger'),

-- English versions - Urban Romance - Love in the Code
('card-rom001-01-en', 'preset-romance-001-en', 'plot', 'weather', 'Neon Lights', '🌃', 'City neon lights, romantic evening'),
('card-rom001-02-en', 'preset-romance-001-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office, where the story begins'),
('card-rom001-03-en', 'preset-romance-001-en', 'plot', 'adventure', 'Chance Meeting', '💫', 'Fateful encounter, the start of love'),
('card-rom001-04-en', 'preset-romance-001-en', 'plot', 'equipment', 'Phone', '📱', 'Tool for connection, conveying feelings'),

-- English versions - Urban Romance - Algorithm of Love
('card-rom002-01-en', 'preset-romance-002-en', 'plot', 'weather', 'Sunny', '☀️', 'Bright sunshine, perfect for a date'),
('card-rom002-02-en', 'preset-romance-002-en', 'plot', 'terrain', 'Cafe', '☕', 'Cozy cafe, romantic date spot'),
('card-rom002-03-en', 'preset-romance-002-en', 'plot', 'adventure', 'Date', '🌹', 'Sweet date, deepen the bond'),
('card-rom002-04-en', 'preset-romance-002-en', 'plot', 'equipment', 'Camera', '📷', 'Capture beautiful moments, create memories'),

-- English versions - Corporate Drama - The Weekly Report Wars
('card-bus001-01-en', 'preset-business-001-en', 'plot', 'weather', 'Cloudy', '☁️', 'Overcast sky, workplace is a battlefield'),
('card-bus001-02-en', 'preset-business-001-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office, the weekly report battlefield'),
('card-bus001-03-en', 'preset-business-001-en', 'plot', 'adventure', 'Negotiation', '🤝', 'Business negotiation, showcase your skills'),
('card-bus001-04-en', 'preset-business-001-en', 'plot', 'equipment', 'Laptop', '💻', 'Essential for work, weapon of battle'),

-- English versions - Corporate Drama - The Side Hustle Symphony
('card-bus002-01-en', 'preset-business-002-en', 'plot', 'weather', 'Sunny', '☀️', 'Clear weather, a new beginning'),
('card-bus002-02-en', 'preset-business-002-en', 'plot', 'terrain', 'Office', '🏢', 'Busy office, starting point of dual life'),
('card-bus002-03-en', 'preset-business-002-en', 'plot', 'adventure', 'Innovation', '💡', 'Technical innovation, break through'),
('card-bus002-04-en', 'preset-business-002-en', 'plot', 'equipment', 'Laptop', '💻', 'Essential for work, tool for creation');
