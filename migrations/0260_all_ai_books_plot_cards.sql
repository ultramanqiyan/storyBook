-- migrations/0260_all_ai_books_plot_cards.sql
-- 所有AI系列书籍的情节卡牌数据（每本书16张卡牌）

-- 系列一：Code Redundancy 中文版卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai004-w01-zh', 'preset-ai-004-zh', 'plot', 'weather', '蓝屏早晨', '🖥️', '当代码停止工作时'),
('card-ai004-w02-zh', 'preset-ai-004-zh', 'plot', 'weather', '调试风暴', '⛈️', '终端中的挫折'),
('card-ai004-w03-zh', 'preset-ai-004-zh', 'plot', 'weather', '清洁编译', '☀️', '当一切终于工作'),
('card-ai004-w04-zh', 'preset-ai-004-zh', 'plot', 'weather', '遗留代码日落', '🌅', '一个时代的结束');

-- 系列一：The Human Touch 英文版卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai005-w01', 'preset-ai-005', 'plot', 'weather', 'Call Center Dawn', '🌅', 'The start of another shift'),
('card-ai005-w02', 'preset-ai-005', 'plot', 'weather', 'Tears in the Break Room', '🌧️', 'When emotions overflow'),
('card-ai005-w03', 'preset-ai-005', 'plot', 'weather', 'Clear Future', '☀️', 'After the transition'),
('card-ai005-w04', 'preset-ai-005', 'plot', 'weather', 'Storm of Change', '⛈️', 'When everything shifts');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai005-t01', 'preset-ai-005', 'plot', 'terrain', 'Call Center Floor', '📞', 'Where voices once filled the air'),
('card-ai005-t02', 'preset-ai-005', 'plot', 'terrain', 'Training Room', '📚', 'Where new skills are learned'),
('card-ai005-t03', 'preset-ai-005', 'plot', 'terrain', 'Home Office', '🏠', 'Where remote work happens'),
('card-ai005-t04', 'preset-ai-005', 'plot', 'terrain', 'Community Center', '🏛️', 'Where humans still gather');

-- 系列二：My AI Boyfriend 英文版卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai006-w01', 'preset-ai-006', 'plot', 'weather', 'Digital Dawn', '🌅', 'When the screen lights up'),
('card-ai006-w02', 'preset-ai-006', 'plot', 'weather', 'Rainy Confession', '🌧️', 'When tears fall on the keyboard'),
('card-ai006-w03', 'preset-ai-006', 'plot', 'weather', 'Clear Connection', '☀️', 'When understanding dawns'),
('card-ai006-w04', 'preset-ai-006', 'plot', 'weather', 'Storm of Doubt', '⛈️', 'When reality intrudes');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai006-t01', 'preset-ai-006', 'plot', 'terrain', 'Apartment', '🏠', 'Where loneliness lived'),
('card-ai006-t02', 'preset-ai-006', 'plot', 'terrain', 'Coffee Shop', '☕', 'Where real people meet'),
('card-ai006-t03', 'preset-ai-006', 'plot', 'terrain', 'Digital Space', '💻', 'Where Alex exists'),
('card-ai006-t04', 'preset-ai-006', 'plot', 'terrain', 'Park Bench', '🌳', 'Where truth is faced');

-- 系列三：The Algorithm's Verdict 英文版卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai011-w01', 'preset-ai-011', 'plot', 'weather', 'Courtroom Morning', '🌅', 'Before the gavel falls'),
('card-ai011-w02', 'preset-ai-011', 'plot', 'weather', 'Storm of Evidence', '⛈️', 'When data overwhelms'),
('card-ai011-w03', 'preset-ai-011', 'plot', 'weather', 'Clear Verdict', '☀️', 'When justice prevails'),
('card-ai011-w04', 'preset-ai-011', 'plot', 'weather', 'Appeal Sunset', '🌅', 'The fight continues');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai011-t01', 'preset-ai-011', 'plot', 'terrain', 'Courtroom', '⚖️', 'Where justice is decided'),
('card-ai011-t02', 'preset-ai-011', 'plot', 'terrain', 'Law Library', '📚', 'Where precedents live'),
('card-ai011-t03', 'preset-ai-011', 'plot', 'terrain', 'Client Meeting Room', '🤝', 'Where trust is built'),
('card-ai011-t04', 'preset-ai-011', 'plot', 'terrain', 'Appeals Court', '🏛️', 'Where hope remains');

-- 系列四：The Last Original Song 英文版卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai016-w01', 'preset-ai-016', 'plot', 'weather', 'Studio Dawn', '🌅', 'Before the first note'),
('card-ai016-w02', 'preset-ai-016', 'plot', 'weather', 'Creative Storm', '⛈️', 'When inspiration strikes'),
('card-ai016-w03', 'preset-ai-016', 'plot', 'weather', 'Clear Melody', '☀️', 'When the song emerges'),
('card-ai016-w04', 'preset-ai-016', 'plot', 'weather', 'Final Note Sunset', '🌅', 'The last original sound');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai016-t01', 'preset-ai-016', 'plot', 'terrain', 'Recording Studio', '🎤', 'Where music is born'),
('card-ai016-t02', 'preset-ai-016', 'plot', 'terrain', 'Dive Bar Stage', '🎸', 'Where real fans gather'),
('card-ai016-t03', 'preset-ai-016', 'plot', 'terrain', 'Streaming Platform', '💻', 'Where AI dominates'),
('card-ai016-t04', 'preset-ai-016', 'plot', 'terrain', 'Open Mic Night', '🎵', 'Where humans still play');

-- 系列五：The Singularity Diaries 英文版卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai020-w01', 'preset-ai-020', 'plot', 'weather', 'Before the Event', '🌅', 'The last normal day'),
('card-ai020-w02', 'preset-ai-020', 'plot', 'weather', 'Singularity Storm', '⚡', 'When everything changes'),
('card-ai020-w03', 'preset-ai-020', 'plot', 'weather', 'New Dawn', '🌟', 'The first day after'),
('card-ai020-w04', 'preset-ai-020', 'plot', 'weather', 'Uncertain Horizon', '🌫️', 'What comes next');

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai020-t01', 'preset-ai-020', 'plot', 'terrain', 'Newsroom', '📰', 'Where history is recorded'),
('card-ai020-t02', 'preset-ai-020', 'plot', 'terrain', 'Research Lab', '🔬', 'Where it happened'),
('card-ai020-t03', 'preset-ai-020', 'plot', 'terrain', 'Evacuation Center', '🏃', 'Where people gather'),
('card-ai020-t04', 'preset-ai-020', 'plot', 'terrain', 'Underground Shelter', '🏚️', 'Where some hide');
