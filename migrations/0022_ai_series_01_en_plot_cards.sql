-- migrations/0022_ai_series_01_en_plot_cards.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）- 情节卡牌

-- Weather Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-w01', 'preset-ai-001', 'plot', 'weather', 'Sunny Morning', '☀️', 'A bright start, full of false hope'),
('card-ai001-w02', 'preset-ai-001', 'plot', 'weather', 'Rainy Afternoon', '🌧️', 'Melancholic rain mirrors inner turmoil'),
('card-ai001-w03', 'preset-ai-001', 'plot', 'weather', 'Storm Warning', '⛈️', 'Tension builds like dark clouds gathering'),
('card-ai001-w04', 'preset-ai-001', 'plot', 'weather', 'Cold Dawn', '❄️', 'A chilling realization in the early hours');

-- Terrain Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-t01', 'preset-ai-001', 'plot', 'terrain', 'Corporate Office', '🏢', 'The glass tower where dreams go to die'),
('card-ai001-t02', 'preset-ai-001', 'plot', 'terrain', 'Coffee Shop', '☕', 'Where honest conversations happen between sips'),
('card-ai001-t03', 'preset-ai-001', 'plot', 'terrain', 'Home Office', '🏠', 'Solitude, reflection, and the glow of screens'),
('card-ai001-t04', 'preset-ai-001', 'plot', 'terrain', 'City Rooftop', '🏙️', 'Perspective from above the chaos below');

-- Adventure Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-a01', 'preset-ai-001', 'plot', 'adventure', 'Career Crossroads', '🎯', 'The moment that changes everything'),
('card-ai001-a02', 'preset-ai-001', 'plot', 'adventure', 'Important Meeting', '💼', 'A conversation that will define her future'),
('card-ai001-a03', 'preset-ai-001', 'plot', 'adventure', 'Late Night Work', '🌙', 'When the office is empty, truths emerge'),
('card-ai001-a04', 'preset-ai-001', 'plot', 'adventure', 'Unexpected Encounter', '🤝', 'Running into someone who changes your perspective');

-- Equipment Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-e01', 'preset-ai-001', 'plot', 'equipment', 'Laptop', '💻', 'The tool of her trade, now her competitor'),
('card-ai001-e02', 'preset-ai-001', 'plot', 'equipment', 'Coffee Cup', '☕', 'Comfort in a ceramic vessel'),
('card-ai001-e03', 'preset-ai-001', 'plot', 'equipment', 'Old Notebook', '📓', 'Handwritten thoughts AI cannot replicate'),
('card-ai001-e04', 'preset-ai-001', 'plot', 'equipment', 'Smartphone', '📱', 'Connection to the world, bearer of bad news');
