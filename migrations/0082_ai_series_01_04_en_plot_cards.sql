-- migrations/0082_ai_series_01_04_en_plot_cards.sql
-- AI职场危机系列 - 第四本：Code Redundancy（英文版）- 情节卡牌

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai004-w01', 'preset-ai-004', 'plot', 'weather', 'Blue Screen Morning', '🖥️', 'When code stops working'),
('card-ai004-w02', 'preset-ai-004', 'plot', 'weather', 'Debug Storm', '⛈️', 'Frustration in the terminal'),
('card-ai004-w03', 'preset-ai-004', 'plot', 'weather', 'Clean Compile', '☀️', 'When everything finally works'),
('card-ai004-w04', 'preset-ai-004', 'plot', 'weather', 'Legacy Sunset', '🌅', 'The end of an era');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai004-t01', 'preset-ai-004', 'plot', 'terrain', 'Server Room', '🖥️', 'Where code lives and dies'),
('card-ai004-t02', 'preset-ai-004', 'plot', 'terrain', 'Home Office', '🏠', 'Where identity crisis happens'),
('card-ai004-t03', 'preset-ai-004', 'plot', 'terrain', 'Coffee Shop', '☕', 'Where humans still connect'),
('card-ai004-t04', 'preset-ai-004', 'plot', 'terrain', 'Tech Conference', '🎤', 'Where the future is announced');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai004-a01', 'preset-ai-004', 'plot', 'adventure', 'The Rewrite', '🔄', 'Starting over from scratch'),
('card-ai004-a02', 'preset-ai-004', 'plot', 'adventure', 'Code Review', '👀', 'When AI judges your work'),
('card-ai004-a03', 'preset-ai-004', 'plot', 'adventure', 'The Merge', '🔀', 'Human meets machine'),
('card-ai004-a04', 'preset-ai-004', 'plot', 'adventure', 'Open Source', '🌐', 'Giving code away');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai004-e01', 'preset-ai-004', 'plot', 'equipment', 'Keyboard', '⌨️', 'The extension of self'),
('card-ai004-e02', 'preset-ai-004', 'plot', 'equipment', 'Legacy Code', '📜', 'The weight of the past'),
('card-ai004-e03', 'preset-ai-004', 'plot', 'equipment', 'AI Assistant', '🤖', 'The future in a chat window'),
('card-ai004-e04', 'preset-ai-004', 'plot', 'equipment', 'Coffee', '☕', 'The fuel of creation');
