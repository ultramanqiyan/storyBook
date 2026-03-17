-- Fix preset-ai-005 issues
-- 1. Fix chapter 5 order_num
-- 2. Fix chapter 7 title
-- 3. Expand short chapters

UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai005-05';

UPDATE chapters SET title = 'The Legacy' WHERE chapter_id = 'chapter-ai005-07';

-- Expand chapter 3
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-03';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-03', 'preset-ai-005', 3, 'The Human Premium',
'Six months after the transition, something unexpected happened. Customer satisfaction scores had dropped. The AI handled routine cases perfectly, but complex issues were taking longer to resolve, and customers were complaining about feeling processed.

The company quietly rehired three of Diana former team members as "human specialists." Their job was to handle the cases the AI could not - the angry customers, the unusual situations, the problems that required empathy and creative thinking.

Diana watched from her new position as a consultant. She had been retained to help with the transition, but her role had evolved into something she had not expected: advocating for the human element in an AI-driven system.

"The AI is efficient," she told the executives. "But it cannot read between the lines. It cannot hear the fear in someone voice when they ask about their benefits. It cannot tell when someone needs reassurance, not just information."

The executives were skeptical at first. But the data was clear: customers who interacted with human specialists reported higher satisfaction than those who only dealt with the AI. The human touch was not just sentimental - it was a competitive advantage.

"They told us our jobs were obsolete," one of the rehired team members said. "Now we are the premium product."

Diana smiled. "The market is learning what we always knew. Efficiency is not everything. Sometimes people just need to feel heard."');

-- Expand chapter 4
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-04';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-04', 'preset-ai-005', 4, 'A New Kind of Service',
'Diana started a consulting business, helping other companies navigate the AI transition while preserving their human touch. She taught them what she had learned: that efficiency was not everything, that some problems needed empathy, that the best customer service combined AI speed with human understanding.

Her first client was a healthcare company struggling with patient complaints. The AI system handled appointment scheduling and insurance questions, but patients were frustrated by the lack of personal attention.

Diana helped them redesign their approach. The AI would handle routine inquiries, but human agents would be available for sensitive conversations - discussing test results, explaining treatment options, supporting patients through difficult decisions.

The results were immediate. Patient satisfaction scores improved. Complaints decreased. The human agents reported higher job satisfaction too - they were no longer handling routine questions, but focusing on the meaningful interactions that had drawn them to healthcare in the first place.

"This is the future," Diana told her team. "Not AI versus humans, but AI and humans working together. Each doing what they do best."

Word spread. More companies hired Diana to help them find the balance. She hired back several of her former team members, creating a new kind of consulting firm that specialized in human-AI collaboration.

"The irony is not lost on me," she told a reporter. "The same transition that eliminated our jobs has created new ones. We are not doing the same work we did before. We are doing something more valuable - helping companies understand that humanity is a competitive advantage."

Diana looked at her team - many of them the same people she had transitioned out nine months earlier. They were not just surviving the AI revolution. They were thriving in it.');

-- Expand chapter 5
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-05';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-05', 'preset-ai-005', 5, 'The Training',
'Diana developed a training program to teach customer service professionals how to work alongside AI. The curriculum included:

- Understanding AI capabilities and limitations
- Identifying cases that require human judgment
- Combining AI efficiency with human empathy
- Translating soft skills into measurable outcomes

The program was demanding. Participants had to demonstrate not just technical competence, but emotional intelligence, creative problem-solving, and the ability to connect with customers on a human level.

"The AI can answer questions," Diana told a group of trainees. "But it cannot ask the right questions. It can provide information, but it cannot provide comfort. It can solve problems, but it cannot make people feel understood."

One trainee raised her hand. "How do we know when to take over from the AI?"

"Listen for the hesitation," Diana said. "The pause before someone speaks. The catch in their voice. The question behind the question. The AI hears words. You need to hear what is not being said."

The training was transformative. Graduates of the program were in high demand - companies were realizing that the human touch was not a luxury, but a necessity. The AI revolution had not eliminated the need for human service; it had elevated it.

"The AI is brilliant at what it does," Diana told a graduating class. "But it cannot care. It cannot empathize. It cannot look at a customer and see a person with a story, not just a problem to solve. That is what you bring. That is the human difference."

The trainee nodded. "So the AI is a tool, not a replacement."

"Exactly," Diana smiled. "And the best tools are the ones that make humans more human, not less."');

-- Expand chapter 6
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-06';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-06', 'preset-ai-005', 6, 'The Balance',
'A year after the transition, Diana company was a model for the industry. They had found the balance between AI efficiency and human connection.

The AI handled 70% of inquiries automatically. The remaining 30% - the complex cases, the emotional situations, the problems that required creative solutions - were routed to human specialists. The result was a system that was both efficient and empathetic.

"We used to measure success by speed," Diana told a group of visiting executives. "How quickly could we close tickets? How many customers could we handle per hour? Now we measure success by outcomes. Did we solve the problem? Did the customer feel heard? Would they recommend us to a friend?"

The executives took notes. They were all facing the same challenges - how to integrate AI without losing the human touch that made their companies successful.

"The mistake is thinking that AI and humans are competing," Diana continued. "They are not. They are complementary. The AI handles the routine, freeing humans to focus on what they do best - connecting with other humans, solving complex problems, providing the empathy and understanding that no machine can replicate."

After the presentation, a young executive approached Diana. "What about the jobs that were lost? The people who were replaced by AI?"

Diana expression softened. "That is the hard truth. Some jobs did disappear. But new jobs emerged - better jobs, more meaningful jobs. The key is helping people transition, training them for the roles that AI cannot fill. That is the responsibility we have to our employees."

She looked out the window at the customer service center below. "We eliminated the jobs that did not really need a human. What remained were the jobs that required humanity. And those jobs turned out to be more meaningful, more valuable, and more fulfilling than the ones they replaced."');

-- Expand chapter 7
DELETE FROM chapters WHERE chapter_id = 'chapter-ai005-07';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai005-07', 'preset-ai-005', 7, 'The Legacy',
'Two years later, Diana training program had been adopted by hundreds of companies. Her methodology - The Human Touch Approach - was taught in business schools and professional development programs around the world.

She received an award for Innovation in Customer Experience. In her acceptance speech, she reflected on the journey that had brought her here.

"When I first learned that AI would replace my team, I was devastated," she told the audience. "I had spent fifteen years building a culture of care, and I thought it was all being erased. But I was wrong. The culture did not disappear - it evolved. It became something more valuable than I had imagined."

She paused, looking out at the crowd. "The AI revolution taught us something important: that efficiency is not the only metric that matters. That some things cannot be automated. That the human touch is not a relic of the past, but a competitive advantage for the future."

After the ceremony, a young woman approached Diana. She was a customer service manager facing the same transition Diana had navigated years ago.

"I am scared," the woman admitted. "I do not know how to prepare my team."

Diana smiled. "Start by remembering what makes your team valuable. Not their ability to answer routine questions - the AI can do that. But their ability to connect, to empathize, to solve problems that require human judgment. That is what you need to preserve and develop."

"How do I know if we are doing it right?"

"You will know," Diana said, "when your customers stop feeling processed and start feeling heard. When your employees stop feeling replaced and start feeling valued. When you realize that the AI has not diminished your humanity - it has revealed how essential it truly is."

The audience applauded. Diana looked out at the crowd - former team members, trainees, industry leaders. They had all learned the same lesson: the human touch was not obsolete. It was more valuable than ever.');
