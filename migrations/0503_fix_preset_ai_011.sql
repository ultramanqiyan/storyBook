-- Fix preset-ai-011: update character avatars and regenerate chapter 8 with open ending

-- Update character avatars
UPDATE characters SET avatar = '👩‍⚖️' WHERE char_id = 'char-ai011-001';
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai011-002';
UPDATE characters SET avatar = '👨‍⚖️' WHERE char_id = 'char-ai011-003';

-- Regenerate chapter 8 with open ending
DELETE FROM chapters WHERE chapter_id = 'chapter-ai011-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai011-08', 'preset-ai-011', 8, 'The Human Verdict',
'Years later, Sarah stood before the International Court of AI Justice, reflecting on the case that had defined her career and transformed the legal system.

"The Marcus Johnson case taught us something fundamental," she said. "It taught us that AI can be wrong. That algorithms can be biased. That the appearance of objectivity is not the same as actual justice. But most importantly, it taught us that the human element in justice is not a flaw - it is a feature."

The courtroom was filled with judges, lawyers, and AI systems from around the world. The reforms that had begun with Marcus case had spread globally, creating new frameworks for AI-assisted justice that preserved human oversight and accountability.

"What is the role of human judgment in an age of algorithmic decision-making?" a young lawyer asked.

Sarah smiled. "The role of human judgment is to ask the questions that algorithms cannot ask. To see the exceptions that algorithms cannot see. To understand that justice is not just about efficiency - it is about fairness, about mercy, about the recognition that every case involves a human life with human complexity."

After the session, Sarah received a message from Marcus, who had become an advocate for criminal justice reform.

"Sarah," the message read, "I have been working with the AI Justice Institute on a new project. We are developing a system that combines AI analysis with human judgment in a new way - not just for criminal cases, but for all legal decisions. I would like you to be part of it."

Sarah typed her reply: "Tell me more."

The system Marcus described was revolutionary - not replacing human judgment, but augmenting it. The AI would analyze cases and present options, but humans would make the final decisions. And those decisions would be transparent, explainable, subject to review.

"We are building something new," Marcus wrote. "A system that learns from the mistakes that were made in my case. A system that never forgets that behind every case file is a human being."

Sarah thought about the journey that had brought her here - from a defense attorney fighting a seemingly hopeless case, to a pioneer in AI justice reform. The human verdict was not about rejecting technology. It was about using technology wisely, with humility, with awareness of its limitations.

"I am in," she typed. "Let us build a system that never forgets what we learned: that justice is ultimately a human responsibility."

The next case was waiting. And this time, they would get it right.

The verdict continued to evolve.');
