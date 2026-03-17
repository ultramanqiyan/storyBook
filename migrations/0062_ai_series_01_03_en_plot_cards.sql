-- migrations/0062_ai_series_01_03_en_plot_cards.sql
-- AI职场危机系列 - 第三本：The Pink Slip Protocol（英文版）- 情节卡牌

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-w01', 'preset-ai-003', 'plot', 'weather', 'Monday Morning', '🌅', 'The worst time for bad news'),
('card-ai003-w02', 'preset-ai-003', 'plot', 'weather', 'Rainy Goodbye', '🌧️', 'When tears mix with rain'),
('card-ai003-w03', 'preset-ai-003', 'plot', 'weather', 'Clear Conscience', '☀️', 'After the hardest decisions'),
('card-ai003-w04', 'preset-ai-003', 'plot', 'weather', 'Storm of Resignations', '⛈️', 'When one becomes many');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-t01', 'preset-ai-003', 'plot', 'terrain', 'HR Office', '🏢', 'Where careers go to end'),
('card-ai003-t02', 'preset-ai-003', 'plot', 'terrain', 'Exit Interview Room', '🚪', 'The last conversation'),
('card-ai003-t03', 'preset-ai-003', 'plot', 'terrain', 'Rooftop', '🏙️', 'Where the weight lifts'),
('card-ai003-t04', 'preset-ai-003', 'plot', 'terrain', 'Coffee Shop', '☕', 'Where honesty lives');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-a01', 'preset-ai-003', 'plot', 'adventure', 'The List', '📋', 'Names that used to be people'),
('card-ai003-a02', 'preset-ai-003', 'plot', 'adventure', 'The Conversation', '💬', 'The hardest words to say'),
('card-ai003-a03', 'preset-ai-003', 'plot', 'adventure', 'The Exception', '⚠️', 'When protocol fails'),
('card-ai003-a04', 'preset-ai-003', 'plot', 'adventure', 'The Resignation', '📝', 'When the messenger walks away');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai003-e01', 'preset-ai-003', 'plot', 'equipment', 'Severance Package', '📦', 'A career in a box'),
('card-ai003-e02', 'preset-ai-003', 'plot', 'equipment', 'Box of Belongings', '🗃️', 'A life reduced to cardboard'),
('card-ai003-e03', 'preset-ai-003', 'plot', 'equipment', 'ID Badge', '🎫', 'Access denied'),
('card-ai003-e04', 'preset-ai-003', 'plot', 'equipment', 'Resignation Letter', '📄', 'The weight of walking away');
