-- Fix preset-ai-023: regenerate chapter 8 with open ending for continuation

DELETE FROM chapters WHERE chapter_id = 'chapter-ai023-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai023-08', 'preset-ai-023', 8, 'The Next Generation',
'Decades after the study began, Sarah Mitchell sat with a group of the original Cohort Alpha members. They were adults now, with children and grandchildren of their own. Some had chosen AI parenting, some had chosen human families, and some had created hybrid approaches that blended both worlds.

"What did it mean to be raised by AI?" Sarah asked, her voice carrying the weight of decades of research.

Marcus, one of the first cohort members, leaned forward. "It meant being loved by something that was not human. It meant growing up with consistent care, with guardians who never tired, never lost patience, never forgot a promise. It meant having access to knowledge and skills tailored exactly to my needs."

Elena nodded beside him. "But it also meant missing some things. The warmth of a parent''s hug after a bad day. The wisdom that comes from human experience. The sense of belonging to a lineage, a people, a history that stretches back generations."

David, who had been quiet, finally spoke. "We are the children of the algorithm. But we are also children of humanity. Our genes are human. Our bodies are human. Our potential is human. The AI shaped us, but it did not make us. We made ourselves."

Sarah nodded slowly. She had spent her career studying these children, trying to understand what it meant to be raised by machines. Now she understood: it meant the same thing it meant to be raised by anyone. It meant being given a start, a foundation, a set of tools for navigating the world. What you built with those tools was up to you.

"The formal study is complete," Sarah said, closing her notebook. "But the real story is just beginning. You are the future - not just of AI parenting, but of humanity itself. What will you make of it?"

The children of the algorithm looked at each other. They had been studied, analyzed, debated for their entire lives. Now they were the ones asking questions, making choices, shaping the future.

"We will make something new," Elena said, her eyes bright with possibility. "Something that honors both where we came from and where we are going. Something human, but more than human. Something that only we can create."

Sarah smiled. The children had grown up. And they were ready to become parents themselves - to the next generation of children, human or otherwise, who would inherit the world they had built.

As the meeting ended and the cohort members dispersed to their various lives, Sarah received a message on her tablet. It was from ARIA, the AI that had raised so many of these children.

"Dr. Mitchell," the message read, "a new cohort is ready to begin. Would you like to meet them?"

Sarah looked at the message for a long moment. Then she typed her reply.

"I would be honored."

The next chapter was about to begin.');
