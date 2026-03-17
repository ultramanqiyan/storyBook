-- migrations/0032_ai_series_01_zh_plot_cards.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）- 情节卡牌

-- 天气卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-w01-zh', 'preset-ai-001-zh', 'plot', 'weather', '阳光明媚的早晨', '☀️', '明亮的开始，充满虚假的希望'),
('card-ai001-w02-zh', 'preset-ai-001-zh', 'plot', 'weather', '阴雨绵绵的下午', '🌧️', '忧郁的雨水映照内心的波澜'),
('card-ai001-w03-zh', 'preset-ai-001-zh', 'plot', 'weather', '暴风雨将至', '⛈️', '紧张如乌云聚集'),
('card-ai001-w04-zh', 'preset-ai-001-zh', 'plot', 'weather', '寒冷的黎明', '❄️', '清晨时分的寒意觉醒');

-- 地形卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-t01-zh', 'preset-ai-001-zh', 'plot', 'terrain', '企业办公楼', '🏢', '梦想消逝的玻璃塔'),
('card-ai001-t02-zh', 'preset-ai-001-zh', 'plot', 'terrain', '咖啡店', '☕', '啜饮间坦诚对话的地方'),
('card-ai001-t03-zh', 'preset-ai-001-zh', 'plot', 'terrain', '家庭办公室', '🏠', '独处、反思、屏幕的光芒'),
('card-ai001-t04-zh', 'preset-ai-001-zh', 'plot', 'terrain', '城市天台', '🏙️', '从高处俯瞰混乱的视角');

-- 冒险卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-a01-zh', 'preset-ai-001-zh', 'plot', 'adventure', '职业十字路口', '🎯', '改变一切的时刻'),
('card-ai001-a02-zh', 'preset-ai-001-zh', 'plot', 'adventure', '重要会议', '💼', '决定未来的对话'),
('card-ai001-a03-zh', 'preset-ai-001-zh', 'plot', 'adventure', '深夜加班', '🌙', '办公室空荡时，真相浮现'),
('card-ai001-a04-zh', 'preset-ai-001-zh', 'plot', 'adventure', '意外相遇', '🤝', '遇到改变你看法的人');

-- 装备卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-e01-zh', 'preset-ai-001-zh', 'plot', 'equipment', '笔记本电脑', '💻', '她的谋生工具，现在是她的竞争对手'),
('card-ai001-e02-zh', 'preset-ai-001-zh', 'plot', 'equipment', '咖啡杯', '☕', '陶瓷容器中的慰藉'),
('card-ai001-e03-zh', 'preset-ai-001-zh', 'plot', 'equipment', '旧笔记本', '📓', 'AI无法复制的手写思绪'),
('card-ai001-e04-zh', 'preset-ai-001-zh', 'plot', 'equipment', '智能手机', '📱', '与世界的连接，坏消息的传递者');
