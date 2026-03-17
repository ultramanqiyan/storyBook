-- Fix preset-ai-016 short chapters (expand to >1500 characters)
DELETE FROM chapters WHERE book_id = 'preset-ai-016' AND order_num IN (2,3,4,5,6,7,8);

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai016-02', 'preset-ai-016', 2, 'The Movement',
'Maya''s declaration spread through the artistic community like wildfire. "The Last Original Song" became an anthem for human artists struggling to find their place in an AI-dominated world. Within weeks, she was receiving messages from musicians, painters, writers, and creators of all kinds who felt the same way she did.

"They told us we were obsolete," one musician wrote. "They said AI could do what we do, only faster and cheaper. But they were wrong. Art is not about efficiency. It is about connection. And connection requires a human heart."

Maya began organizing. She reached out to other artists who shared her vision, and together they formed what would become known as the Human Art Movement. Their manifesto was simple: art created by humans, for humans, celebrating the imperfect beauty of lived experience.

"We are not against technology," Maya clarified in interviews. "We are for humanity. AI can be a useful tool. But when it replaces human creativity entirely, we lose something precious. We lose the connection between artist and audience. We lose the vulnerability that makes art meaningful."

The movement grew. Concerts featuring human artists sold out. Galleries displayed works that proudly bore the marks of their human creators - brushstrokes, imperfections, the evidence of hands and hearts at work. People began to seek out authentic art, willing to pay a premium for work that felt real.

The AI art industry pushed back. They argued that their products were just as valid, that the distinction between human and machine creativity was arbitrary, that Maya and her followers were simply afraid of progress. But the market had spoken. People wanted something that machines could not provide.

Maya became the face of a movement she had never intended to lead. She was invited to speak at conferences, to testify before legislatures, to debate AI advocates on television. Through it all, she kept writing songs - songs about the struggle, about the beauty of imperfection, about the human spirit that refused to be automated.

"This is not about winning or losing," she told her followers. "It is about preserving something essential. Art is how we understand each other. It is how we process our experiences. It is how we connect across time and space. If we lose human art, we lose part of our humanity."'),

('chapter-ai016-03', 'preset-ai-016', 3, 'The Challenge',
'A major AI music company challenged Maya to a competition: write a song alongside their best AI, and let the public decide which was better. It was a publicity stunt, designed to prove that AI could match human creativity. Maya''s advisors told her to decline - the competition was rigged, the AI would have advantages she could not match.

But Maya accepted. "If we believe human art matters," she said, "we should not be afraid to prove it."

She spent weeks on her song, pouring her heart into every line. She wrote about her grandmother, who had taught her to sing; about her first heartbreak, which had taught her to write; about the years of struggle, which had taught her to persist. Every word came from her life, her experience, her truth.

The AI generated thousands of options in the same time, selecting the best through a combination of algorithm and human curation. The result was polished, professional, undeniably catchy. It sounded like a hit song.

The results were announced at a gala event. Maya''s song won, but not by much. The AI had come close - close enough to make people question whether the distinction between human and machine art really mattered.

"Maybe we are not so different," the AI company representative said. "Maybe art is art, regardless of its origin."

But Maya knew the difference. Her song had come from her life, her pain, her joy. The AI song was a simulation, a pattern-matching exercise that produced something that looked like emotion but was not. The difference mattered, even if it was hard to articulate.

"The AI song was about love," Maya said in her acceptance speech. "But the AI has never been in love. It has never felt a heart break, never waited for a phone call that never came, never held someone and wondered if this was forever. My song is about those things because I have lived them. That is the difference. That is why human art matters."

The audience applauded. The AI company representative looked uncomfortable. And Maya knew that the competition had been worth it - not because she had won, but because she had made people think.'),

('chapter-ai016-04', 'preset-ai-016', 4, 'The Teaching',
'Maya started a school for human artists. She called it "The Human Voice," and it was dedicated to teaching not just technique, but philosophy: why human art mattered, what made it different, how to preserve authenticity in an age of AI.

"The goal is not to compete with machines," she told her students on the first day. "The goal is to do what machines cannot: to create from lived experience, to express emotions that you have actually felt, to connect with other humans through the shared language of art."

The curriculum was unconventional. Alongside music theory and composition, students studied philosophy, psychology, and the history of human creativity. They were encouraged to travel, to fall in love, to experience loss - to live fully, because living was the source of art.

"AI can analyze a thousand love songs and produce one that sounds like love," Maya explained. "But it cannot fall in love. It cannot know what it feels like to lose someone, to find someone, to be transformed by connection. That knowledge comes from living. And that is what makes human art irreplaceable."

Her students went on to create remarkable works. Some became famous; others remained obscure. But all of them carried forward the belief that human creativity was worth preserving. They became teachers themselves, spreading Maya''s philosophy to new generations.

Years later, one of her students would write: "Maya taught us that art is not about perfection. It is about connection. And connection requires vulnerability - the willingness to show your scars, your flaws, your humanity. That is something no machine can fake."

The school became a movement within a movement. Graduates formed bands, opened galleries, wrote books, made films - all united by the belief that human creativity was not obsolete, but essential. They proved that there was still an audience for art that came from the heart.'),

('chapter-ai016-05', 'preset-ai-016', 5, 'The Legacy',
'Maya grew old watching the art world transform. AI continued to advance, producing works of increasing sophistication. But human art did not disappear. Instead, it found a new place: as a luxury good, a statement of values, a way of connecting with something real.

"Human-made" became a label that commanded premium prices. Not because human art was better in some objective sense, but because it meant something that AI art could not. It was a connection to another person, a reminder that behind the work was a life lived, a heart that had felt, a mind that had struggled to express something true.

Maya''s songs were still played, still covered by new artists, still shared as examples of what human creativity could achieve. She had become a symbol of a movement that had changed how people thought about art and technology. Young artists cited her as an inspiration; scholars wrote papers about her impact; documentaries explored her life and work.

"Did you ever regret not using AI?" an interviewer asked. "Did you ever feel like you were missing out on tools that could have made your work better?"

"Never," Maya said. "My songs are mine. They came from my life, my experiences, my heart. No machine could have written them, because no machine lived them. That is the value of human art - it is a record of a human life. When you listen to my songs, you are not just hearing music. You are hearing a person. And that connection is something AI can never replicate."

She paused, looking at the interviewer with eyes that had seen decades of change. "Technology can do many things. But it cannot live. And living is where art comes from."'),

('chapter-ai016-06', 'preset-ai-016', 6, 'The Future',
'New generations of artists grew up with AI tools. They used them skillfully, but they also learned the value of human creativity. The debate that Maya had helped start continued, evolving with each new technology.

Some artists embraced AI fully, creating hybrid works that blended human and machine creativity. Others rejected it entirely, working with traditional tools and techniques. Most fell somewhere in between, using AI as one tool among many while maintaining their human voice.

Maya watched from retirement, pleased that the conversation continued. She had never wanted to stop progress; she had wanted to ensure that human creativity had a place in the future. And it did. The world had not chosen between human and machine art - it had made room for both.

"The last original song will never be written," she said in a final interview. "As long as humans have experiences, they will have something to express. And as long as they have something to express, there will be art that only they can create. AI can simulate, but it cannot originate. It can imitate, but it cannot experience. That distinction will always matter to some people. And those people will always be my audience."

She smiled at the interviewer. "I am not worried about the future. Humans have been creating art for tens of thousands of years. We painted on cave walls before we had written language. We sang before we had instruments. Art is not something we do - it is something we are. Technology can change how we create, but it cannot change that fundamental truth."

The interview aired, and Maya''s words were shared widely. They became a touchstone for a new generation of artists who were trying to find their way in a world where the boundaries between human and machine were increasingly blurred.'),

('chapter-ai016-07', 'preset-ai-016', 7, 'The Recognition',
'Maya received countless awards for her contributions to music and art. She was inducted into halls of fame, given honorary degrees, celebrated at galas and ceremonies. But the recognition that meant the most came from the artists she had inspired.

Letters arrived daily from musicians, writers, painters, and creators who had found their voice because of her. They shared stories of doubt and discovery, of moments when they had almost given up, of how her example had given them courage.

"You taught us that our humanity is our greatest asset," one wrote. "In a world of artificial perfection, our flaws are our strength. Our pain is our gift. Our lives are our art. Thank you for showing us that what makes us different from machines is exactly what makes us valuable."

Another wrote: "I almost quit music when AI started generating better songs than I could write. Then I heard ''The Last Original Song,'' and I understood. I was not competing with machines. I was expressing my life. That changed everything."

Maya smiled as she read the messages. She had spent her career trying to prove that human creativity mattered. Now, a new generation was carrying that message forward, finding their own ways to create art that only humans could make.

The last original song had not been written. It never would be. As long as humans lived and loved and struggled and dreamed, there would be songs that only they could sing.

That was Maya''s legacy. Not a single song, but a movement. Not a moment, but a future. She had proven that in a world of artificial intelligence, human creativity was not obsolete - it was essential.'),

('chapter-ai016-08', 'preset-ai-016', 8, 'Epilogue: The Human Voice',
'Years after Maya passed, her songs were still sung. Artists covered them, reinterpreted them, found new meanings in old words. The human voice, it turned out, could not be silenced by technology.

A young songwriter visited Maya''s grave, leaving a handwritten lyric sheet as an offering. She stood in the quiet cemetery, thinking about the woman who had changed her life.

"Thank you," she whispered. "For showing me that my voice matters. For reminding me that imperfect is beautiful. For proving that the last original song is always the next one."

She walked away, humming a melody that had just come to her. It was not polished. It was not finished. But it was hers - born from her life, her experiences, her unique perspective on the world. In that moment, she was part of a tradition that stretched back to the first humans who had raised their voices in song.

The Human Art Movement continued. New leaders emerged, new voices rose, new songs were written. The debate between human and AI creativity evolved, but the core truth remained: art created by humans, for humans, had a value that could not be replicated by machines.

Maya''s school still operated, training new generations of artists in the philosophy she had developed. Her songs were still taught, her interviews still quoted, her example still inspired. She had become part of the history of human creativity - a chapter in a story that would continue as long as humans existed.

The young songwriter walked into the city, her new melody still forming in her mind. She did not know if it would be a hit. She did not know if anyone would ever hear it. But she knew why she was writing it - not to compete with AI, not to prove anything, but because she had something to express.

That was the persistence of human creativity. It was not perfect. It was not finished. But it was hers.

And that was enough. That was everything.

THE END');
