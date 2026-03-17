-- migrations/0052_ai_series_01_02_zh_plot_cards.sql
-- AI职场危机系列 - 第二本：算法公司（中文版）- 情节卡牌

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-w01-zh', 'preset-ai-002-zh', 'plot', 'weather', '数字黎明', '🌅', '屏幕的光芒取代了阳光'),
('card-ai002-w02-zh', 'preset-ai-002-zh', 'plot', 'weather', '数据风暴', '🌩️', '当算法碰撞，人类被卷入交火'),
('card-ai002-w03-zh', 'preset-ai-002-zh', 'plot', 'weather', '清晰输出', '☀️', '当数字终于变得有意义'),
('card-ai002-w04-zh', 'preset-ai-002-zh', 'plot', 'weather', '系统迷雾', '🌫️', '机器中的不确定性');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-t01-zh', 'preset-ai-002-zh', 'plot', 'terrain', '算法总部', '🏢', '人类直觉消亡的地方'),
('card-ai002-t02-zh', 'preset-ai-002-zh', 'plot', 'terrain', '服务器机房', '🖥️', '机器冰冷的心脏'),
('card-ai002-t03-zh', 'preset-ai-002-zh', 'plot', 'terrain', '屋顶花园', '🌿', '唯一有真实空气的地方'),
('card-ai002-t04-zh', 'preset-ai-002-zh', 'plot', 'terrain', '休息室', '☕', '人类仍然假装连接的地方');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-a01-zh', 'preset-ai-002-zh', 'plot', 'adventure', '人工干预', '⚡', '当人类必须覆盖机器'),
('card-ai002-a02-zh', 'preset-ai-002-zh', 'plot', 'adventure', '数据审查', '📊', '在数字中寻找真相'),
('card-ai002-a03-zh', 'preset-ai-002-zh', 'plot', 'adventure', '系统更新', '🔄', '当一切在一夜之间改变'),
('card-ai002-a04-zh', 'preset-ai-002-zh', 'plot', 'adventure', '例外案例', '⚠️', '不该存在的案例');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-e01-zh', 'preset-ai-002-zh', 'plot', 'equipment', '门禁卡', '🎫', '你进入算法世界的门票'),
('card-ai002-e02-zh', 'preset-ai-002-zh', 'plot', 'equipment', '加密硬盘', '💾', '可能毁掉职业生涯的秘密'),
('card-ai002-e03-zh', 'preset-ai-002-zh', 'plot', 'equipment', '咖啡', '☕', '人类抵抗的燃料'),
('card-ai002-e04-zh', 'preset-ai-002-zh', 'plot', 'equipment', '旧笔记本', '📓', '人类思想仍然重要的地方');
