-- ============================================
-- 为英文版预设书籍添加谜题数据
-- ============================================

INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type) VALUES
-- Adventure - Stargazer's Quest
('puzzle-adv001-01-en', 'chapter-adv001-03-en', 'What gets dirtier the more you wash it?', 'Water', 'riddle'),
('puzzle-adv001-02-en', 'chapter-adv001-05-en', 'I have a head but no neck, a body cold and sleek. I have wings but cannot fly, no feet yet I can move. What am I?', 'Fish', 'riddle'),
('puzzle-adv001-03-en', 'chapter-adv001-08-en', 'What comes out at night and disappears during the day?', 'Stars', 'riddle'),

-- Adventure - The Deep Sea Explorers
('puzzle-adv002-01-en', 'chapter-adv002-03-en', 'What has teeth but cannot bite?', 'Comb', 'riddle'),
('puzzle-adv002-02-en', 'chapter-adv002-05-en', 'Thousands of threads, millions of lines, invisible when they hit the water. What is it?', 'Rain', 'riddle'),
('puzzle-adv002-03-en', 'chapter-adv002-08-en', 'What loves to come out more when it gets hotter?', 'Sweat', 'riddle'),

-- Fantasy - The Academy of Smart Magic
('puzzle-fan001-01-en', 'chapter-fan001-02-en', 'What has four legs but cannot walk?', 'Table', 'riddle'),
('puzzle-fan001-02-en', 'chapter-fan001-05-en', 'What increases the more you share it?', 'Knowledge', 'riddle'),
('puzzle-fan001-03-en', 'chapter-fan001-09-en', 'What gets bigger the more you take away from it?', 'Hole', 'riddle'),

-- Fantasy - The Other Me
('puzzle-fan002-01-en', 'chapter-fan002-02-en', 'What moves forward every day but never leaves its place?', 'Clock', 'riddle'),
('puzzle-fan002-02-en', 'chapter-fan002-06-en', 'What has a head but no feet?', 'Garlic', 'riddle'),
('puzzle-fan002-03-en', 'chapter-fan002-09-en', 'What gets smaller the more you wash it?', 'Soap', 'riddle'),

-- Romance - Love in the Code
('puzzle-rom001-01-en', 'chapter-rom001-02-en', 'What has an eye but cannot see?', 'Needle', 'riddle'),
('puzzle-rom001-02-en', 'chapter-rom001-05-en', 'What has a mouth but cannot speak?', 'Teapot', 'riddle'),
('puzzle-rom001-03-en', 'chapter-rom001-08-en', 'What has hands but cannot hold things?', 'Clock', 'riddle'),

-- Romance - Algorithm of Love
('puzzle-rom002-01-en', 'chapter-rom002-03-en', 'What has legs but cannot walk?', 'Table', 'riddle'),
('puzzle-rom002-02-en', 'chapter-rom002-06-en', 'What has ears but cannot hear?', 'Cup', 'riddle'),
('puzzle-rom002-03-en', 'chapter-rom002-09-en', 'What has a tongue but cannot speak?', 'Shoe', 'riddle'),

-- Business - The Weekly Report Wars
('puzzle-bus001-01-en', 'chapter-bus001-03-en', 'What gets shorter the more you use it?', 'Pencil', 'riddle'),
('puzzle-bus001-02-en', 'chapter-bus001-06-en', 'What gets longer the more it burns?', 'Smoke', 'riddle'),
('puzzle-bus001-03-en', 'chapter-bus001-09-en', 'What has leaves but is not a tree?', 'Book', 'riddle'),

-- Business - The Side Hustle Symphony
('puzzle-bus002-01-en', 'chapter-bus002-02-en', 'What has a neck but no head?', 'Bottle', 'riddle'),
('puzzle-bus002-02-en', 'chapter-bus002-05-en', 'What has a back but cannot sit?', 'Chair', 'riddle'),
('puzzle-bus002-03-en', 'chapter-bus002-08-en', 'What has a door but cannot enter?', 'Bookshelf', 'riddle');
