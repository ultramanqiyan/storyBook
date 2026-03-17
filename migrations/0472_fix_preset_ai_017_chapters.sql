-- Fix preset-ai-017 short chapters (expand to >1500 characters)
DELETE FROM chapters WHERE book_id = 'preset-ai-017' AND order_num IN (2,3,4,5,6,7,8);

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai017-02', 'preset-ai-017', 2, 'The Studio',
'Word spread about David''s portrait. Soon, he had a waiting list of clients who wanted something that AI could not provide: art that captured the essence of a person, not just their appearance.

He took on more commissions. Each portrait was a collaboration - not between artist and subject, but between two human beings trying to understand each other. David would spend hours, sometimes days, talking to his clients before he even picked up a brush.

"The AI can give you a perfect likeness," he told one client. "But I want to give you something more. I want to paint who this person is, not just what they looked like."

He hired assistants - young artists who had been discouraged by the rise of AI art. Many had considered giving up entirely, convinced that their skills were obsolete. David gave them a new purpose.

"AI can generate images," he taught them. "But it cannot understand what it means to be human. It cannot capture the light in someone''s eyes when they talk about the person they love. It cannot paint the weight of a life lived. That is our job."

The studio became a sanctuary for human art. People came not just for portraits, but for the experience of being truly seen by another human being. David and his assistants did not just paint faces; they captured souls. They listened to stories, witnessed grief, celebrated love, and translated all of it into paint on canvas.

"Every portrait is an act of love," David wrote in his journal. "It is saying to another person: I see you. I understand you. You matter. No algorithm can do that, because no algorithm cares."

The studio grew. The waiting list grew longer. And David realized that he had stumbled onto something important - not just a business, but a movement.'),

('chapter-ai017-03', 'preset-ai-017', 3, 'The Challenge',
'A tech company challenged David to a competition: paint a portrait alongside their best AI, and let the public decide which was better. It was a publicity stunt, designed to prove that AI could match human creativity. The company''s PR team framed it as the ultimate test of man versus machine.

David''s advisors told him to decline. "The competition is rigged," they said. "The AI will have advantages you cannot match. It can generate thousands of options and select the best. You only get one shot."

But David accepted. "If we believe human art matters," he said, "we should not be afraid to prove it."

He spent a month with his subject - an elderly woman named Eleanor who had lived through wars, raised five children, and lost her husband of fifty years. David visited her home, looked at her photographs, listened to her stories. He learned about her childhood in a small village, her years as a teacher, the garden she had tended for decades.

The AI generated thousands of options in the same time, each one technically perfect. The company''s team selected the best and refined it further. The result was stunning - flawless composition, perfect lighting, beautiful colors. Eleanor looked like a queen from a fairy tale.

David''s portrait was rougher, more impressionistic. Eleanor looked like what she was: a woman who had lived, who had loved and lost, who carried the weight of decades in the lines of her face. But she also looked like someone who had found peace, who had built something beautiful, who had been deeply loved.

The results were announced at a gallery showing. The public voted. David won, but not by much. The competition had shown something important: that human art still had value, even in a world of AI perfection.

"The AI painted a beautiful picture," one voter commented. "But David painted a person. I feel like I know Eleanor from his portrait. The AI portrait could have been anyone."

Eleanor herself was asked which she preferred. She studied both portraits for a long time.

"The AI made me look like I never was," she said finally. "David made me look like I truly am. I know which one I would want my grandchildren to remember me by."

The competition had proven something: that the human touch could not be replicated by algorithms.'),

('chapter-ai017-04', 'preset-ai-017', 4, 'The School',
'David started a school for human artists. He called it "The Human Touch," and it was dedicated to teaching not just technique, but philosophy: why human art mattered, what made it different, how to preserve authenticity in an age of AI.

"The goal is not to compete with machines," he told his students on the first day. "The goal is to do what machines cannot: to create from lived experience, to express emotions that you have actually felt, to connect with other humans through the shared language of art."

The curriculum was unconventional. Alongside drawing and painting, students studied psychology, philosophy, and literature. They were encouraged to travel, to fall in love, to experience loss - to live fully, because living was the source of art.

"AI can analyze a thousand portraits and produce one that looks like emotion," David explained. "But it cannot feel. It has never known joy or grief or love. When you paint, you are not just applying pigment to canvas. You are translating your humanity into visual form. That is something no machine can do."

His students went on to create remarkable works. Some became famous; others remained obscure. But all of them carried forward the belief that human creativity was worth preserving. They became teachers themselves, spreading David''s philosophy to new generations.

Years later, one of his students would write: "David taught us that art is not about perfection. It is about connection. And connection requires vulnerability - the willingness to show your scars, your flaws, your humanity. That is something no machine can fake."

The school became a movement within a movement. Graduates opened studios, started galleries, wrote books, made films - all united by the belief that human creativity was not obsolete, but essential.'),

('chapter-ai017-05', 'preset-ai-017', 5, 'The Legacy',
'David grew old watching the art world transform. AI continued to advance, producing works of increasing sophistication. But human art did not disappear. Instead, it found a new place: as a luxury good, a statement of values, a way of connecting with something real.

"Human-made" became a label that commanded premium prices. Not because human art was better in some objective sense, but because it meant something that AI art could not. It was a connection to another person, a reminder that behind the work was a life lived, a heart that had felt, a mind that had struggled to express something true.

David''s portraits were still displayed in galleries, still studied by new artists, still admired as examples of what human creativity could achieve. He had become a symbol of a movement that had changed how people thought about art and technology.

"Did you ever regret not using AI?" an interviewer asked. "Did you ever feel like you were missing out on tools that could have made your work easier?"

"Never," David said. "My portraits are mine. They came from my conversations, my understanding, my love for the people I painted. No machine could have created them, because no machine cared about those people. That is the value of human art - it is an act of love. And love cannot be automated."

He paused, looking at the interviewer with eyes that had seen decades of change. "Technology can do many things. But it cannot care. And caring is where art comes from."

David''s legacy was not just his paintings, but his philosophy - a way of thinking about art that emphasized human connection over technical perfection, emotional truth over visual beauty.'),

('chapter-ai017-06', 'preset-ai-017', 6, 'The Future',
'New generations of artists grew up with AI tools. They used them skillfully, but they also learned the value of human creativity. The debate that David had helped start continued, evolving with each new technology.

Some artists embraced AI fully, creating hybrid works that blended human and machine creativity. Others rejected it entirely, working with traditional tools and techniques. Most fell somewhere in between, using AI as one tool among many while maintaining their human voice.

David watched from retirement, pleased that the conversation continued. He had never wanted to stop progress; he had wanted to ensure that human creativity had a place in the future. And it did. The world had not chosen between human and machine art - it had made room for both.

"The last human portrait will never be painted," he said in a final interview. "As long as humans have faces and souls, there will be artists who want to capture them. And as long as there are artists who care, there will be portraits that only they can create. AI can simulate, but it cannot care. It can imitate, but it cannot love. That distinction will always matter to some people. And those people will always be my audience."

He smiled at the interviewer. "I am not worried about the future. Humans have been painting portraits for tens of thousands of years. We painted on cave walls before we had canvas. We used charcoal before we had oil paints. Art is not something we do - it is something we are. Technology can change how we create, but it cannot change that fundamental truth."

The interview aired, and David''s words were shared widely. They became a touchstone for a new generation of artists who were trying to find their way in a world where the boundaries between human and machine were increasingly blurred.'),

('chapter-ai017-07', 'preset-ai-017', 7, 'The Recognition',
'David received countless awards for his contributions to art. He was inducted into halls of fame, given honorary degrees, celebrated at galas and ceremonies. But the recognition that meant the most came from the artists he had inspired.

Letters arrived daily from painters, sculptors, photographers, and creators of all kinds who had found their voice because of him. They shared stories of doubt and discovery, of moments when they had almost given up, of how his example had given them courage.

"You taught us that our humanity is our greatest asset," one wrote. "In a world of artificial perfection, our flaws are our strength. Our vision is our gift. Our lives are our art. Thank you for showing us that what makes us different from machines is exactly what makes us valuable."

Another wrote: "I almost quit painting when AI started generating better portraits than I could paint. Then I saw your work, and I understood. I was not competing with machines. I was connecting with people. That changed everything."

David smiled as he read the messages. He had spent his career trying to prove that human creativity mattered. Now, a new generation was carrying that message forward, finding their own ways to create art that only humans could make.

The last human portrait had not been painted. It never would be. As long as humans lived and loved and struggled and dreamed, there would be portraits that only they could create.

That was David''s legacy. Not a single painting, but a movement. Not a moment, but a future. He had proven that in a world of artificial intelligence, human creativity was not obsolete - it was essential.'),

('chapter-ai017-08', 'preset-ai-017', 8, 'Epilogue: The Human Touch',
'Years after David passed, his portraits were still displayed in museums and homes around the world. Each one was a testament to the power of human connection, a reminder that art could be more than decoration - it could be a bridge between souls.

A young artist visited David''s studio, now a museum. She stood before his final self-portrait, painted in his last year. It was not his most technically accomplished work, but it was perhaps his most honest. The face that looked back at her was lined with age, but the eyes were full of life - the eyes of someone who had seen deeply, loved fully, and created with purpose.

"Thank you," she whispered. "For showing me that art is not about perfection. It is about truth. It is about connection. It is about being human."

She walked away, already planning her own portrait - not of a client, but of her grandmother, who had passed the year before. She would paint from memory, from love, from the stories her grandmother had told her. Not from a photograph, but from her heart. She would capture who her grandmother was, not just what she looked like.

The Human Touch movement continued. New leaders emerged, new voices rose, new portraits were painted. The debate between human and AI creativity evolved, but the core truth remained: art created by humans, for humans, had a value that could not be replicated by machines.

David''s school still operated, training new generations of artists in the philosophy he had developed. His portraits were still taught, his interviews still quoted, his example still inspired. He had become part of the history of human creativity - a chapter in a story that would continue as long as humans existed.

That was the legacy David had left: not just portraits, but a way of seeing. Not just art, but a philosophy. Not just a career, but a calling.

THE END');
