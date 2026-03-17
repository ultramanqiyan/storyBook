-- migrations/0042_ai_series_01_02_en_plot_cards.sql
-- AI职场危机系列 - 第二本：Algorithm, Inc.（英文版）- 情节卡牌

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-w01', 'preset-ai-002', 'plot', 'weather', 'Digital Dawn', '🌅', 'The glow of screens replacing sunlight'),
('card-ai002-w02', 'preset-ai-002', 'plot', 'weather', 'Data Storm', '🌩️', 'When algorithms collide, humans get caught in the crossfire'),
('card-ai002-w03', 'preset-ai-002', 'plot', 'weather', 'Clear Output', '☀️', 'When the numbers finally make sense'),
('card-ai002-w04', 'preset-ai-002', 'plot', 'weather', 'System Fog', '🌫️', 'Uncertainty in the machine');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-t01', 'preset-ai-002', 'plot', 'terrain', 'Algorithm HQ', '🏢', 'Where human intuition goes to die'),
('card-ai002-t02', 'preset-ai-002', 'plot', 'terrain', 'Server Room', '🖥️', 'The cold heart of the machine'),
('card-ai002-t03', 'preset-ai-002', 'plot', 'terrain', 'Rooftop Garden', '🌿', 'The only place with real air'),
('card-ai002-t04', 'preset-ai-002', 'plot', 'terrain', 'Break Room', '☕', 'Where humans still pretend to connect');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-a01', 'preset-ai-002', 'plot', 'adventure', 'The Override', '⚡', 'When a human must override the machine'),
('card-ai002-a02', 'preset-ai-002', 'plot', 'adventure', 'Data Review', '📊', 'Finding truth in the numbers'),
('card-ai002-a03', 'preset-ai-002', 'plot', 'adventure', 'System Update', '🔄', 'When everything changes overnight'),
('card-ai002-a04', 'preset-ai-002', 'plot', 'adventure', 'The Exception', '⚠️', 'The case that shouldn''t exist');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai002-e01', 'preset-ai-002', 'plot', 'equipment', 'Access Badge', '🎫', 'Your ticket to the algorithm''s world'),
('card-ai002-e02', 'preset-ai-002', 'plot', 'equipment', 'Encrypted Drive', '💾', 'Secrets that could destroy careers'),
('card-ai002-e03', 'preset-ai-002', 'plot', 'equipment', 'Coffee', '☕', 'The fuel of human resistance'),
('card-ai002-e04', 'preset-ai-002', 'plot', 'equipment', 'Old Notebook', '📓', 'Where human thoughts still matter');
