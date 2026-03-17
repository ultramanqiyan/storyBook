-- migrations/0072_ai_series_01_03_zh_plot_cards.sql
-- AI职场危机系列 - 第三本：裁员协议（中文版）- 情节卡牌

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-w01-zh', 'preset-ai-003-zh', 'plot', 'weather', '周一早晨', '🌅', '坏消息最糟糕的时间'),
('card-ai003-w02-zh', 'preset-ai-003-zh', 'plot', 'weather', '雨天告别', '🌧️', '当泪水与雨水混合'),
('card-ai003-w03-zh', 'preset-ai-003-zh', 'plot', 'weather', '清白的良心', '☀️', '在最艰难的决定之后'),
('card-ai003-w04-zh', 'preset-ai-003-zh', 'plot', 'weather', '辞职风暴', '⛈️', '当一个人变成许多人');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-t01-zh', 'preset-ai-003-zh', 'plot', 'terrain', 'HR办公室', '🏢', '职业生涯终结的地方'),
('card-ai003-t02-zh', 'preset-ai-003-zh', 'plot', 'terrain', '离职面谈室', '🚪', '最后的对话'),
('card-ai003-t03-zh', 'preset-ai-003-zh', 'plot', 'terrain', '天台', '🏙️', '重担消散的地方'),
('card-ai003-t04-zh', 'preset-ai-003-zh', 'plot', 'terrain', '咖啡店', '☕', '诚实存在的地方');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-a01-zh', 'preset-ai-003-zh', 'plot', 'adventure', '名单', '📋', '曾经是人的名字'),
('card-ai003-a02-zh', 'preset-ai-003-zh', 'plot', 'adventure', '对话', '💬', '最难说出口的话'),
('card-ai003-a03-zh', 'preset-ai-003-zh', 'plot', 'adventure', '例外', '⚠️', '当协议失败时'),
('card-ai003-a04-zh', 'preset-ai-003-zh', 'plot', 'adventure', '辞职', '📝', '当信使离开时');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-e01-zh', 'preset-ai-003-zh', 'plot', 'equipment', '遣散费包裹', '📦', '装在盒子里的职业生涯'),
('card-ai003-e02-zh', 'preset-ai-003-zh', 'plot', 'equipment', '个人物品箱', '🗃️', '浓缩成纸板的生活'),
('card-ai003-e03-zh', 'preset-ai-003-zh', 'plot', 'equipment', '工牌', '🎫', '访问被拒绝'),
('card-ai003-e04-zh', 'preset-ai-003-zh', 'plot', 'equipment', '辞职信', '📄', '离开的重量');
