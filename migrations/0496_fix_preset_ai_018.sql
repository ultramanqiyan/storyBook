-- Fix preset-ai-018: regenerate chapter 8 with open ending for continuation

DELETE FROM chapters WHERE chapter_id = 'chapter-ai018-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai018-08', 'preset-ai-018', 8, 'The Next Original Story',
'Years later, the Authentic Literature movement that James had founded continued to grow. His books were studied in universities, his interviews quoted in debates, his example inspired new generations of writers.

But James himself had become something of a mystery. He had stopped publishing, stopped giving interviews, stopped appearing in public. Some said he had said everything he needed to say. Others believed he was working on something new - something that would change everything.

A young writer named Maya had traveled across the country to find him. She had discovered his work during a difficult time, when AI-generated content had made her question whether her voice mattered. His words had given her courage. Now she wanted to thank him.

She found him in a small coastal town, sitting on a bench overlooking the ocean. He was older now, his beard white, his eyes still sharp.

"James?" she said, uncertain if this was really the man who had changed her life.

He looked up and smiled. "Maya Chen. I read your manuscript. The one you left at my grave."

Maya froze. "That was you? The grave was supposed to be symbolic. I did not think anyone would actually..."

"Find it?" James laughed. "I visit it sometimes. It helps me remember why I started all this."

"Why did you? Start all this, I mean."

James was quiet for a moment, watching the waves. "Because I believed that human stories matter. That our imperfections, our struggles, our unique perspectives - they are not bugs to be fixed, but features to be celebrated."

"And now? Do you still believe that?"

"More than ever." He turned to look at her. "But I also believe something new. Something I have been working on for the past few years."

"What is it?"

James reached into his bag and pulled out a manuscript. Not a printed book, not a digital file, but handwritten pages filled with careful script.

"This," he said, "is my next book. But it is not just my story. It is a collaboration - not with AI, but with every writer who has ever felt that their voice did not matter. I have been collecting their stories, their struggles, their triumphs. And I want you to be part of it."

Maya took the manuscript, her hands trembling. "Why me?"

"Because you understand something that took me decades to learn. The last original story is not a story that has never been told before. It is a story that could only be told by you. And when you tell it, you make it possible for someone else to tell theirs."

Maya looked at the manuscript, then at the ocean, then back at James. "I would be honored."

"Good," James said. "Because there is something else. A new challenge that I cannot face alone. The AI writing tools have evolved again. They can now produce stories that are almost indistinguishable from human writing - almost, but not quite. I have found a pattern, a difference, but I need other writers to help me understand it."

"What kind of pattern?"

"That is what we are going to find out together."

The Authentic Literature movement continued. James had become part of the history of human creativity. But the story was not over. The next chapter was waiting to be written - by Maya, by James, by every human who had a story to tell.

And that, perhaps, was the most important truth of all: the last original story is always the next one.');
