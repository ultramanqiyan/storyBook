-- Fix preset-ai-018 short chapters (expand to >1500 characters)
DELETE FROM chapters WHERE book_id = 'preset-ai-018' AND order_num IN (2,3,4,5,6,7,8);

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai018-02', 'preset-ai-018', 2, 'The Movement',
'James''s declaration spread through the literary community like wildfire. "The Last Book" became an anthem for human writers struggling to find their place in an AI-dominated world. Within weeks, James was receiving messages from authors, poets, journalists, and readers who felt the same way he did.

"They told us we were obsolete," one poet wrote. "They said AI could do what we do, only faster and cheaper. But they were wrong. Art is not about efficiency. It is about connection. And connection requires a human heart."

James began organizing. He reached out to other writers who shared his vision, and together they formed what would become known as the Authentic Literature Movement. Their manifesto was simple: stories written by humans, for humans, celebrating the imperfect beauty of lived experience.

"WeWe are not against technology," James clarified in interviews. "We are for humanity. AI can be a useful tool. But when it replaces human creativity entirely, we lose something precious. We lose the connection between writer and reader. We lose the vulnerability that makes stories meaningful."

The movement grew. Books featuring human authors sold out. Readers began to seek out authentic literature, willing to pay a premium for stories that felt real. The AI publishing industry pushed back. They argued that their products were just as valid, that the distinction between human and machine creativity was arbitrary. But the market had spoken. People wanted something that machines could not provide.

James became the face of a movement he had never intended to lead. He was invited to speak at conferences, to testify before legislatures, to debate AI advocates on television. Through it all, he kept writing - stories about the struggle, about the beauty of imperfection, about the human spirit that refused to be automated.

"This is not about winning or losing," he told his followers. "It is about preserving something essential. Stories are how we understand each other. They are how we process our experiences. They are how we connect across time and space. If we lose human stories, we lose part of our humanity."'),

('chapter-ai018-03', 'preset-ai-018', 3, 'The Challenge',
'A major AI publisher challenged James to a competition: write a novel alongside their best AI, and let the public decide which was better. It was a publicity stunt, designed to prove that AI could match human creativity. The company''s PR team framed it as the ultimate test of man versus machine.

James''s advisors told him to decline. "The competition is rigged," they said. "The AI will have advantages you cannot match. It can generate thousands of options and select the best. You only get one shot."

But James accepted. "If we believe human writing matters," he said, "we should not be afraid to prove it it"

He spent a year on his novel, pouring his heart into every page. He wrote about his grandmother, who had taught him to love stories; about his years of struggle as a writer; about the fear that AI would make literature obsolete. The AI generated thousands of options in the same time, selecting the best through a combination of algorithm and human curation. The result was polished, professional, undeniably compelling

The results were announced at a literary festival. James''s novel won, but not by much. The AI had come close - close enough to make people question whether the distinction between human and machine writing really mattered

    "Maybe we are not so different," the AI company representative said. "Maybe art is art, regardless of its origin."

    But James knew the difference. His novel had come from his life, his pain, his joy. The AI novel was a simulation, a pattern-matching exercise that produced something that looked like emotion but was not. The difference mattered, even if it was hard to articulate

    "The AI novel was about love," James said in his acceptance speech. "But the AI has never been in love. It has never felt a heart break, never waited for a letter that never came, never held someone and wondered if this was forever. My novel is about those things because I have lived them. That is the difference. That is why human writing matters."

    The audience applauded. The AI company representative looked uncomfortable. And James knew that the competition had been worth it - not because he had won, but because he had made people think.'),

('chapter-ai018-04', 'preset-ai-018', 4, 'The Teaching',
'James started a school for human writers. He called it "The Human Voice," and it was dedicated to teaching not just technique, but philosophy: why human writing mattered, what made it different, how to preserve authenticity in an age of AI

"The goal is not to compete with machines," he told his students on the first day. "The goal is to do what machines cannot: to write from lived experience, to express emotions that you have actually felt, to connect with other humans through the shared language of story."

The curriculum was unconventional. Alongside writing craft, students studied philosophy, psychology, and literature. They were encouraged to travel, to fall in love, to experience loss - to live fully, because living was the source of stories

"AI can analyze a thousand novels and produce one that looks like emotion," James explained. "But it cannot feel. It has never known joy or grief or love. When you write, you are not just putting words on paper. You are translating your humanity into narrative form. That is something no machine can do"

    His students went on to create remarkable works. Some became famous; others remained obscure. But all of them carried forward the belief that human creativity was worth preserving. They became teachers themselves, spreading James''s philosophy to new generations

    Years later, one of his students would write: "James taught us that stories are not about perfection. They are about connection. And connection requires vulnerability - the willingness to show your scars, your flaws, your humanity. That is something no machine can fake"

    The school became a movement within a movement. Graduates opened studios, started magazines, wrote books, made films - all united by the belief that human creativity was not obsolete, but essential.'),

('chapter-ai018-05', 'preset-ai-018', 5, 'The Legacy',
'James grew old watching the literary world transform. AI continued to advance, producing works of increasing sophistication. But human writing did not disappear. Instead, it found a new place: as a luxury good, a statement of values, a way of connecting with something real

"Human-written" became a label that commanded premium prices. Not because human books were better in some objective sense, but because they meant something that AI books could not. They were a connection to another person, a reminder that behind the words was a life lived, a heart that had felt, a mind that had struggled to express something true

James''s books were still read, still studied, still shared as examples of what human creativity could achieve. He had become a symbol of a movement that had changed how people thought about writing and technology

"Did you ever regret not using AI?" an interviewer asked. "Did you ever feel like you were missing out on tools that could have made your work easier?"

"Never," James said. "My books are mine. They came from my life, my experiences, my heart. No machine could have written them, because no machine lived them. That is the value of human writing - it is a record of a human life. When you read my books, you are not just reading stories. You are hearing a person. And that connection is something AI can never replicate"

    He paused, looking at the interviewer with eyes that had seen decades of change. "Technology can do many things. But it cannot live. And living is where stories come from"

    James''s legacy was not just his books, but his philosophy - a way of thinking about writing that emphasized human connection over technical perfection, emotional truth over narrative beauty.'),

('chapter-ai018-06', 'preset-ai-018', 6, 'The Future',
'New generations of writers grew up with AI tools. They used them skillfully, but they also learned the value of human creativity. The debate that James had helped start continued, evolving with each new technology

    Some writers embraced AI fully, creating hybrid works that blended human and machine creativity. Others rejected it entirely, working with traditional tools and techniques. Most fell somewhere in between, using AI as one tool among many while maintaining their human voice

    James watched from retirement, pleased that the conversation continued. He had never wanted to stop progress; he had wanted to ensure that human creativity had a place in the future. And it did. The world had not chosen between human and machine writing - it had made room for both

"The last original story will never be written," he said in a final interview. "As long as humans have experiences, they will have something to express. And as long as they have something to express, there will be stories that only they can write. AI can simulate, but it cannot originate. It can imitate, but it cannot experience. That distinction will always matter to some people. And those people will always be my audience"

    He smiled at the interviewer. "I am not worried about the future. Humans have been telling stories for tens of thousands of years. We painted on cave walls before we had written language. We told stories around fires before we had printing presses. Stories are not something we do - they are something we are. Technology can change how we tell stories, but it cannot change that fundamental truth"

    The interview aired, and James''s words were shared widely. They became a touchstone for a new generation of writers who were trying to find their way in a world where the boundaries between human and machine were increasingly blurred.'),

('chapter-ai018-07', 'preset-ai-018', 7, 'The Recognition',
'James received countless awards for his contributions to literature. He was inducted into halls of fame, given honorary degrees, celebrated at galas and ceremonies. But the recognition that meant the most came from the writers he had inspired

    Letters arrived daily from authors, poets, journalists, and readers who had found their voice because of him. They shared stories of doubt and discovery, of moments when they had almost given up, of how his example had given them courage

    "You taught us that our humanity is our greatest asset," one wrote. "In a world of artificial perfection, our flaws are our strength. Our pain is our gift. Our lives are our stories. Thank you for showing us that what makes us different from machines is exactly what makes us valuable"

    Another wrote: "I almost quit writing when AI started generating better prose than I could produce. Then I read ''The Last Book,'' and I understood. I was not competing with machines. I was expressing my life. That changed everything"

    James smiled as he read the messages. He had spent his career trying to prove that human creativity mattered. Now, a new generation was carrying that message forward, finding their own ways to create stories that only humans could tell

    The last original story had not been written. It never would be. As long as humans lived and loved and struggled and dreamed, there would be stories that only they could tell

    That was James''s legacy. Not a single book, but a movement. Not a moment, but a future. He had proven that in a world of artificial intelligence, human creativity was not obsolete - it was essential.'),

('chapter-ai018-08', 'preset-ai-018', 8, 'Epilogue: The Last Original Story',
'Years after James passed, his books were still read. Writers covered his stories, reinterpreted his themes, found new meanings in old words. The human voice, it turned out, could not be silenced by technology

    A young writer visited James''s grave, leaving a handwritten manuscript as an offering. She stood in the quiet cemetery, thinking about the man who had changed her life

    "Thank you," she whispered. "For showing me that my voice matters. For reminding me that imperfect is beautiful. For proving that the last original story is always the next one"

    She walked away, humming a story that had just come to her. It was not polished. It was not finished. But it was hers - born from her life, her experiences, her unique perspective on the world. In that moment, she was part of a tradition that stretched back to the first humans who had gathered around fires and told stories

    The Authentic Literature movement continued. New leaders emerged, new voices rose, new stories were written. The debate between human and AI creativity evolved, but the core truth remained: stories created by humans, for humans, had a value that could not be replicated by machines

    James''s school still operated, training new generations of writers in the philosophy he had developed. His books were still taught, his interviews still quoted, his example still inspired. He had become part of the history of human creativity - a chapter in a story that would continue as long as humans existed

    That was James''s legacy: not just books, but a movement. Not just a moment, but a future where human stories would always matter

THE END');
