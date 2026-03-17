DELETE FROM chapters WHERE book_id = 'preset-ai-017';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai017-01', 'preset-ai-017', 1, 'The Portrait',
'David was an artist in a world where AI could generate any image in seconds. His portraits were good - he had spent decades mastering his craft - but they could not compete with the speed and perfection of algorithmically-generated art.

Every day, he watched as AI-produced images flooded the internet. They were beautiful, technically flawless, perfectly composed. And they were everywhere - in advertisements, in magazines, on the walls of people who wanted art without the wait or the cost.

David had almost given up. He had considered closing his studio, finding a job that did not require him to pour his soul into a world that seemed to prefer machine-made perfection. But then a client came to him with an unusual request.

"I want you to paint my mother," the woman said. "Not from a photograph - from my memories. I want you to capture who she was, not just what she looked like."

David was intrigued. AI could generate images from descriptions, but it could not paint from memories. It could not capture the essence of a person who existed only in someone mind. This was something only a human could do.

He spent weeks talking to his client, learning about the mother she had lost. He heard stories about her laugh, her kindness, the way she made everyone feel seen. He learned about her struggles, her dreams, the life she had lived. He learned about the small moments that made her who she was.

When David finally put brush to canvas, he was not just painting a face. He was painting a life. The portrait that emerged was not photographically accurate - it was something better. It captured the essence of a person in a way that no algorithm could.

"This is her," the client said, tears in his eyes. "This is exactly who she was."

David had found his purpose: to create art that required human understanding, human connection, human love.'),

('chapter-ai017-02', 'preset-ai-017', 2, 'The Studio',
'Word spread about David portrait. Soon, he had a waiting list of clients who wanted something that AI could not provide: art that captured the essence of a person, not just their appearance.

He hired assistants - young artists who had been discouraged by the rise of AI art. He taught them his method: not just technique, but the art of listening, of understanding, of translating human experience into visual form.

"AI can generate images," he told them. "But it cannot understand what it means to be human. It cannot capture the light in someone eyes when they talk about the person they love. It cannot paint the weight of a life lived. That is our job."

The studio became a sanctuary for human art. People came not just for portraits, but for the experience of being truly seen by another human being. David and his assistants did not just paint faces; they captured souls.'),

('chapter-ai017-03', 'preset-ai-017', 3, 'The Challenge',
'A tech company challenged David to a competition: paint a portrait alongside their best AI, and let the public decide which was better. It was a publicity stunt, but David accepted.

He spent a month with his subject, learning their story, understanding their essence. The AI generated thousands of options in the same time, each one technically perfect.

The results were announced at a gallery showing. The AI portrait was stunning - flawless composition, perfect lighting, beautiful colors. David portrait was rougher, more impressionistic. But it had something the AI portrait lacked: it felt alive.

The public voted. David won, but not by much. The competition had shown something important: that human art still had value, even in a world of AI perfection.'),

('chapter-ai017-04', 'preset-ai-017', 4, 'The School',
'David started a school for human artists. He taught them not just technique, but philosophy: why human art mattered, what made it different, how to preserve authenticity in an age of AI.

"The goal is not to compete with machines," he told his students. "The goal is to do what machines cannot: to create from lived experience, to express emotions that you have actually felt, to connect with other humans through the shared language of art."

His students went on to create remarkable works. Some became famous; others remained obscure. But all of them carried forward the belief that human creativity was worth preserving.'),

('chapter-ai017-05', 'preset-ai-017', 5, 'The Legacy',
'David grew old watching the art world transform. AI continued to advance, producing works of increasing sophistication. But human art did not disappear. Instead, it found a new place: as a luxury good, a statement of values, a way of connecting with something real.

"Human-made" became a label that commanded premium prices. Not because human art was better, but because it meant something that AI art could not. It was a connection to another person, a reminder that behind the work was a life lived.

David portraits were still displayed in galleries, still studied by new artists, still admired as examples of what human creativity could achieve. He had become a symbol of a movement that had changed how people thought about art and technology.'),

('chapter-ai017-06', 'preset-ai-017', 6, 'The Future',
'New generations of artists grew up with AI tools. They used them skillfully, but they also learned the value of human creativity. The debate that David had helped start continued, evolving with each new technology.

Some artists embraced AI fully, creating hybrid works that blended human and machine creativity. Others rejected it entirely, working with traditional tools and techniques. Most fell somewhere in between, using AI as one tool among many while maintaining their human voice.

David watched from retirement, pleased that the conversation continued. He had never wanted to stop progress; he had wanted to ensure that human creativity had a place in the future. And it did.'),

('chapter-ai017-07', 'preset-ai-017', 7, 'The Recognition',
'David received countless awards for his contributions to art. But the recognition that meant the most came from the artists he had inspired.

"You taught us that our humanity is our greatest asset," one wrote. "In a world of artificial perfection, our flaws are our strength. Our vision is our gift. Our lives are our art."

David smiled as he read the messages. He had spent his career trying to prove that human creativity mattered. Now, a new generation was carrying that message forward.'),

('chapter-ai017-08', 'preset-ai-017', 8, 'Epilogue: The Human Touch',
'Years after David passed, his portraits were still displayed in museums and homes around the world. Each one was a testament to the power of human connection, a reminder that art could be more than decoration - it could be a bridge between souls.

A young artist visited David studio, now a museum. She stood before his final self-portrait, painted in his last year. It was not his most technically accomplished work, but it was perhaps his most honest. The face that looked back at her was lined with age, but the eyes were full of life.

"Thank you," she whispered. "For showing me that art is not about perfection. It is about truth. It is about connection. It is about being human."

She walked away, already planning her first portrait. She would paint her grandmother, she decided. Not from a photograph, but from her memories. She would capture who her grandmother was, not just what she looked like.

That was the legacy David had left: not just portraits, but a way of seeing. Not just art, but a philosophy. Not just a career, but a calling.

THE END');

DELETE FROM characters WHERE book_id = 'preset-ai-017';

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai017-001', 'preset-ai-017', 'David', 'Portrait Artist', 'Patient, insightful, authentic, masterful', 'Thoughtful and warm, uses artistic language, wise', '🎨', NULL, NULL, 1),
('char-ai017-002', 'preset-ai-017', 'Maria', 'First Client', 'Grieving, grateful, searching, hopeful', 'Emotional and honest, uses personal language, open', '👩', 85, 'Client', 0),
('char-ai017-003', 'preset-ai-017', 'Alex', 'Student', 'Young, talented, searching, authentic', 'Eager and questioning, uses contemporary language, learning', '👨‍🎨', 75, 'Student', 0);

DELETE FROM plot_cards WHERE book_id = 'preset-ai-017';

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai017-w01', 'preset-ai-017', 'plot', 'weather', 'Studio Light', '🌅', 'Where art begins'),
('card-ai017-w02', 'preset-ai-017', 'plot', 'weather', 'Storm of Emotion', '⛈️', 'When memories flood'),
('card-ai017-w03', 'preset-ai-017', 'plot', 'weather', 'Clear Vision', '☀️', 'After understanding'),
('card-ai017-w04', 'preset-ai-017', 'plot', 'weather', 'Human Light', '🌤️', 'That reveals truth'),
('card-ai017-t01', 'preset-ai-017', 'plot', 'terrain', 'Art Studio', '🎨', 'Where portraits are born'),
('card-ai017-t02', 'preset-ai-017', 'plot', 'terrain', 'Gallery', '🖼️', 'Where art is shown'),
('card-ai017-t03', 'preset-ai-017', 'plot', 'terrain', 'Art School', '🎓', 'Where wisdom passes on'),
('card-ai017-t04', 'preset-ai-017', 'plot', 'terrain', 'Memory', '💭', 'Where portraits live on'),
('card-ai017-a01', 'preset-ai-017', 'plot', 'adventure', 'The Portrait', '🖼️', 'Where it all began'),
('card-ai017-a02', 'preset-ai-017', 'plot', 'adventure', 'The Challenge', '🏆', 'Proving value'),
('card-ai017-a03', 'preset-ai-017', 'plot', 'adventure', 'The School', '🎓', 'Passing on wisdom'),
('card-ai017-a04', 'preset-ai-017', 'plot', 'adventure', 'The Legacy', '💫', 'Living on'),
('card-ai017-e01', 'preset-ai-017', 'plot', 'equipment', 'Brush', '🖌️', 'The tool of expression'),
('card-ai017-e02', 'preset-ai-017', 'plot', 'equipment', 'Canvas', '🖼️', 'The surface of truth'),
('card-ai017-e03', 'preset-ai-017', 'plot', 'equipment', 'Vision', '👁️', 'The gift of seeing'),
('card-ai017-e04', 'preset-ai-017', 'plot', 'equipment', 'Humanity', '❤️', 'What cannot be faked');
