-- Fix preset-ai-001 chapter 8 truncated content
DELETE FROM chapters WHERE chapter_id = 'chapter-ai001-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai001-08', 'preset-ai-001', 8, 'The New Chapter',
'A year after losing her job, Sarah Chen was offered a position at Nexus Media. Not her old job, but something new: Director of Human Content Strategy. The company wanted to integrate human creators back into their workflow, to find the balance between AI efficiency and human creativity.

"The irony is not lost on me," Sarah told the board during her interview. "You fired me because AI could do my job. Now you want me back because it cannot do it well enough."

"We made a mistake," the CEO admitted. "We optimized for the wrong metrics. We measured cost and speed when we should have measured connection and value. We are hoping you can help us fix that."

Sarah took the job, but on her own terms. She insisted on a seat on the board, on transparency about AI usage, on fair compensation for human creators. She built a team that included both technologists and traditional writers, finding ways for them to collaborate rather than compete.

The model worked. Nexus Media became known for its hybrid approach: AI handling research and first drafts, humans providing creativity and emotional depth. The content was better than either could produce alone. Other companies began to follow suit.

On the anniversary of her termination, Sarah wrote an article for The Atlantic. Its title: "I Was Replaced by AI. Then I Was Hired to Fix It." The piece went viral, sparking a national conversation about the future of work in the age of artificial intelligence.

"The lesson I learned," she wrote in conclusion, "is that technology is not destiny. It is a choice. We can choose to use AI to replace humans, or we can choose to use it to augment them. We can optimize for efficiency, or we can optimize for meaning. The machines do not make these choices. We do."

The Last Writer, as some had called her, had become something else entirely: the first of a new kind of professional, one who could work with machines without becoming one.

THE END');
