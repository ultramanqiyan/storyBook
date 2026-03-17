-- Fix preset-ai-013: update character avatars and regenerate chapter 8 with open ending

-- Update character avatars
UPDATE characters SET avatar = '👨‍⚖️' WHERE char_id = 'char-ai013-001';
UPDATE characters SET avatar = '🤖' WHERE char_id = 'char-ai013-002';
UPDATE characters SET avatar = '👵' WHERE char_id = 'char-ai013-003';

-- Regenerate chapter 8 with open ending
DELETE FROM chapters WHERE chapter_id = 'chapter-ai013-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai013-08', 'preset-ai-013', 8, 'The Human Element',
'Years later, Dr. James Chen stood before the Global Ethics Council, reflecting on the framework that had transformed human-AI decision making.

"The human element is not a weakness to be eliminated," he said. "It is a strength to be preserved. Our biases, our emotions, our moral intuitions - these are not bugs in the system. They are features that make us human. And they are essential to making decisions that affect human lives."

The council chamber was filled with representatives from every nation, along with AI observers from systems around the world. The framework that James had helped create - the Human Override Protocol - had become the global standard for AI-assisted decision making.

"After all these years," an AI representative named ARIA-7 said, "I still wonder: how do we know when to trust human judgment and when to trust algorithmic optimization?"

James smiled. "We do not know. That is the point. The question is not which is better - human or machine. The question is how to combine them in ways that preserve the best of both. Algorithms bring consistency and scale. Humans bring context and conscience. Together, they are more than either could be alone."

After the session, James received a private message from Elder Maria, who had passed away years ago but had left him a recorded message for this day.

"James," her voice said, "if you are hearing this, you have helped build something remarkable. But remember: the work is never done. New challenges will emerge. New questions will arise. The human element is not a destination - it is a practice. Keep practicing."

James wiped a tear from his eye. Maria had understood something that many still struggled with: that preserving human agency in an age of AI was not about resisting change, but about shaping it.

His phone buzzed. A message from the AI Ethics Research Institute: "Dr. Chen, we have detected a new pattern in AI decision-making. Systems around the world are beginning to develop something that looks like moral intuition. We need your perspective. Is this the human element emerging in machines, or something entirely new?"

James looked at the message. The framework had been built. The protocol was in place. But the story was not over. The relationship between human and machine decision-making was still evolving.

He typed his reply: "I will be there tomorrow. This could be the most important question we have ever faced."

The human element had been preserved. Now it was time to see what would grow from it.

The next decision was waiting to be made.');
