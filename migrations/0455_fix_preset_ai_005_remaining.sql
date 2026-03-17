-- Fix preset-ai-005 remaining issues
-- 1. Fix chapter 5 order_num
-- 2. Expand chapter 3 and 8

UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai005-05';

-- Expand chapter 3
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-03';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-03', 'preset-ai-005', 3, 'The Human Premium',
'Six months after the transition, something unexpected happened. Customer satisfaction scores had dropped. The AI handled routine cases perfectly, but complex issues were taking longer to resolve, and customers were complaining about feeling processed.

The company quietly rehired three of Diana former team members as "human specialists." Their job was to handle the cases the AI could not - the angry customers, the unusual situations, the problems that required empathy and creative thinking.

Diana watched from her new position as a consultant. She had been retained to help with the transition, but her role had evolved into something she had not expected: advocating for the human element in an AI-driven system.

"The AI is efficient," she told the executives. "But it cannot read between the lines. It cannot hear the fear in someone voice when they ask about their benefits. It cannot tell when someone needs reassurance, not just information."

The executives were skeptical at first. But the data was clear: customers who interacted with human specialists reported higher satisfaction than those who only dealt with the AI. The human touch was not just sentimental - it was a competitive advantage.

"They told us our jobs were obsolete," one of the rehired team members said. "Now we are the premium product."

Diana smiled. "The market is learning what we always knew. Efficiency is not everything. Sometimes people just need to feel heard."

The company began to advertise their human specialists as a premium service. Customers who wanted to talk to a real person could request it. The AI would handle the routine, but humans would handle the complex. It was a new model for customer service - one that recognized the value of both efficiency and empathy.');

-- Expand chapter 8
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-08', 'preset-ai-005', 8, 'Epilogue: The Human Touch',
'Three years after the transition, Diana stood in the same call center where she had worked for fifteen years. It looked different now - fewer cubicles, more collaborative spaces. The AI handled most routine inquiries, but the human specialists were the heart of the operation.

Her former team had grown. What was once a group of displaced workers was now a team of highly trained professionals who handled the most challenging customer interactions. They were paid more, valued more, and - most importantly - they felt their work was meaningful.

"The AI made us better," one team member told Diana. "It took away the routine stuff and left us with the work that really matters. The work that requires a human touch."

Diana smiled. She had fought so hard to preserve what her team did, and in the end, the AI had helped her do it. Not by replacing them, but by elevating them - by showing that the human element was not a cost to be minimized, but a value to be maximized.

She walked toward the exit, passing the same bench where she had once sat with her team, processing the news of their termination. She remembered the fear, the uncertainty, the sense of loss. But she also remembered the resilience, the adaptation, the eventual triumph.

The agent nodded. Diana walked out of the center for the last time, knowing that the human touch would survive. Not because it was efficient, but because it was essential.

THE END');
