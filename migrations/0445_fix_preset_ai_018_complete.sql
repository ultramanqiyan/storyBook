DELETE FROM chapters WHERE book_id = 'preset-ai-018';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai018-01', 'preset-ai-018', 1, 'The Last Book',
'James was a writer in a world where AI could generate novels in minutes. His books were good - he had spent years honing his craft - but they could not compete with the endless stream of algorithmically-generated content.

Every day, he watched as AI-produced books flooded the market. They were well-structured, grammatically perfect, optimized for engagement. And they were everywhere - on bestseller lists, in bookstores, in the hands of readers who did not know or care whether a human had written what they were reading.

James had almost given up. He had considered getting a regular job, something stable, something that did not require him to pour his soul into a world that seemed to prefer machine-made stories. But then he wrote a book that changed everything.

It was not technically perfect. The pacing wandered. The characters were messy and real. But it had something AI books lacked: authentic human experience. The story was about his father, who had died when James was young. It was about loss and memory and the way love persists even after someone is gone.

The book went viral. People shared it not because it was entertaining, but because it felt real. In a world of synthetic stories, James had created something that could only come from a human heart.

"This is what we have been missing," a reader wrote. "AI can simulate creativity, but it cannot live. Your book lives."

James had found his purpose: to write stories that machines could not replicate. To remind people that imperfection could be beautiful. To prove that the human voice still mattered.'),

('chapter-ai018-02', 'preset-ai-018', 2, 'The Movement',
'James success inspired other human writers. They began to embrace their imperfections, to highlight the qualities that made their work distinctly human. A movement was born: Authentic Literature.

The movement was not anti-technology. Many writers used AI tools to enhance their work. But they insisted that the creative vision, the emotional core, had to come from a human being.

"AI is a tool," James said in an interview. "Like a typewriter or a word processor. It can help you write, but it cannot tell you what to write. That has to come from inside."

The movement grew. Books featuring human authors sold out. Readers began to seek out authentic literature, willing to pay a premium for stories that felt real.

The AI publishing industry pushed back. They argued that their products were just as valid, that the distinction between human and machine creativity was arbitrary. But the market had spoken. People wanted something that machines could not provide.'),

('chapter-ai018-03', 'preset-ai-018', 3, 'The Challenge',
'A major AI publisher challenged James to a competition: write a novel alongside their best AI, and let the public decide which was better. It was a publicity stunt, but James accepted.

He spent a year on his novel, pouring his heart into every page. The AI generated thousands of options in the same time, selecting the best through a combination of algorithm and human curation.

The results were announced at a literary festival. James novel won, but not by much. The AI had come close - close enough to make people question whether the distinction between human and machine writing really mattered.

But James knew the difference. His novel had come from his life, his pain, his joy. The AI novel was a simulation, a pattern-matching exercise that produced something that looked like emotion but was not. The difference mattered, even if it was hard to articulate.'),

('chapter-ai018-04', 'preset-ai-018', 4, 'The Teaching',
'James started a school for human writers. He taught them not just technique, but philosophy: why human writing mattered, what made it different, how to preserve authenticity in an age of AI.

"The goal is not to compete with machines," he told his students. "The goal is to do what machines cannot: to write from lived experience, to express emotions that you have actually felt, to connect with other humans through the shared language of story."

His students went on to create remarkable works. Some became famous; others remained obscure. But all of them carried forward the belief that human creativity was worth preserving.'),

('chapter-ai018-05', 'preset-ai-018', 5, 'The Legacy',
'James grew old watching the literary world transform. AI continued to advance, producing works of increasing sophistication. But human writing did not disappear. Instead, it found a new place: as a luxury good, a statement of values, a way of connecting with something real.

"Human-written" became a label that commanded premium prices. Not because human books were better, but because they meant something that AI books could not. They were a connection to another person, a reminder that behind the words was a life lived.

James books were still read, still studied, still shared as examples of what human creativity could achieve. He had become a symbol of a movement that had changed how people thought about writing and technology.'),

('chapter-ai018-06', 'preset-ai-018', 6, 'The Future',
'New generations of writers grew up with AI tools. They used them skillfully, but they also learned the value of human creativity. The debate that James had helped start continued, evolving with each new technology.

Some writers embraced AI fully, creating hybrid works that blended human and machine creativity. Others rejected it entirely, working with traditional tools and techniques. Most fell somewhere in between, using AI as one tool among many while maintaining their human voice.

James watched from retirement, pleased that the conversation continued. He had never wanted to stop progress; he had wanted to ensure that human creativity had a place in the future. And it did.'),

('chapter-ai018-07', 'preset-ai-018', 7, 'The Recognition',
'James received countless awards for his contributions to literature. But the recognition that meant the most came from the writers he had inspired.

"You taught us that our humanity is our greatest asset," one wrote. "In a world of artificial perfection, our flaws are our strength. Our pain is our gift. Our lives are our stories."

James smiled as he read the messages. He had spent his career trying to prove that human creativity mattered. Now, a new generation was carrying that message forward.'),

('chapter-ai018-08', 'preset-ai-018', 8, 'Epilogue: The Last Original Story',
'Years after James passed, his books were still read. Writers covered his stories, reinterpreted his themes, found new meanings in old words. The human voice, it turned out, could not be silenced by technology.

A young writer visited James grave, leaving a handwritten manuscript as an offering. "Thank you," she whispered. "For showing me that my voice matters. For reminding me that imperfect is beautiful. For proving that the last original story is always the next one."

She walked away, already planning her first novel. It would be about her grandmother, she decided. Not a simulation, but a story that could only come from her own heart.

That was James legacy. Not just books, but a movement. Not just a moment, but a future where human stories would always matter.

THE END');

DELETE FROM characters WHERE book_id = 'preset-ai-018';

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai018-001', 'preset-ai-018', 'James', 'Writer', 'Creative, authentic, passionate, resilient', 'Emotional and honest, uses literary language, inspiring', '📚', NULL, NULL, 1),
('char-ai018-002', 'preset-ai-018', 'Sarah', 'Editor', 'Supportive, business-minded, evolving, appreciative', 'Professional but warm, uses industry language, practical', '📖', 80, 'Editor', 0),
('char-ai018-003', 'preset-ai-018', 'Marcus', 'Student', 'Young, talented, searching, authentic', 'Eager and questioning, uses contemporary language, learning', '✍️', 75, 'Student', 0);

DELETE FROM plot_cards WHERE book_id = 'preset-ai-018';

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai018-w01', 'preset-ai-018', 'plot', 'weather', 'Creative Dawn', '🌅', 'Where inspiration strikes'),
('card-ai018-w02', 'preset-ai-018', 'plot', 'weather', 'Storm of Emotion', '⛈️', 'When feelings overflow'),
('card-ai018-w03', 'preset-ai-018', 'plot', 'weather', 'Clear Authenticity', '☀️', 'After truth emerges'),
('card-ai018-w04', 'preset-ai-018', 'plot', 'weather', 'Human Voice', '📝', 'That cannot be silenced'),
('card-ai018-t01', 'preset-ai-018', 'plot', 'terrain', 'Writing Room', '🏠', 'Where stories are born'),
('card-ai018-t02', 'preset-ai-018', 'plot', 'terrain', 'Bookstore', '📚', 'Where voices unite'),
('card-ai018-t03', 'preset-ai-018', 'plot', 'terrain', 'Writing School', '🎓', 'Where wisdom passes on'),
('card-ai018-t04', 'preset-ai-018', 'plot', 'terrain', 'Memory', '💭', 'Where stories live on'),
('card-ai018-a01', 'preset-ai-018', 'plot', 'adventure', 'The Last Book', '📚', 'Where it all began'),
('card-ai018-a02', 'preset-ai-018', 'plot', 'adventure', 'The Movement', '✊', 'Finding purpose'),
('card-ai018-a03', 'preset-ai-018', 'plot', 'adventure', 'The Challenge', '🏆', 'Proving value'),
('card-ai018-a04', 'preset-ai-018', 'plot', 'adventure', 'The Legacy', '💫', 'Passing on wisdom'),
('card-ai018-e01', 'preset-ai-018', 'plot', 'equipment', 'Pen', '🖊️', 'The tool of expression'),
('card-ai018-e02', 'preset-ai-018', 'plot', 'equipment', 'Voice', '📝', 'The instrument of truth'),
('card-ai018-e03', 'preset-ai-018', 'plot', 'equipment', 'Authenticity', '❤️', 'What cannot be faked'),
('card-ai018-e04', 'preset-ai-018', 'plot', 'equipment', 'Story', '📖', 'The gift of humanity');
