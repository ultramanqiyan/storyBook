-- Fix preset-ai-005 final issues
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai005-05' AND order_num IS NULL;

DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-08', 'preset-ai-005', 8, 'Epilogue: The Human Touch',
'Three years after the transition, Diana stood in the same call center where she had worked for fifteen years. It looked different now - fewer cubicles, more collaborative spaces. The AI handled most routine inquiries, but the human specialists were the heart of the operation.

Her former team had grown. What was once a group of displaced workers was now a team of highly trained professionals who handled the most challenging customer interactions. They were paid more, valued more, and - most importantly - they felt their work was meaningful.

"The AI made us better," one team member told Diana. "It took away the routine stuff and left us with the work that really matters. The work that requires a human touch."

Diana smiled. She had fought so hard to preserve what her team did, and in the end, the AI had helped her do it. Not by replacing them, but by elevating them - by showing that the human element was not a cost to be minimized, but a value to be maximized.

She walked toward the exit, passing the same bench where she had once sat with her team, processing the news of their termination. She remembered the fear, the uncertainty, the sense of loss. But she also remembered the resilience, the adaptation, the eventual triumph.

A young agent stopped her. "Are you Diana Chen? The one who started the Human Touch program?"

Diana nodded.

"I just wanted to thank you. I was going to quit customer service - I thought it was a dying field. But then I heard about your program. Now I know this work has a future. A real future."

The agent nodded. Diana walked out of the center for the last time, knowing that the human touch would survive. Not because it was efficient, but because it was essential.

THE END');
