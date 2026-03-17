-- migrations/0043_ai_series_01_02_en_chapters_part1.sql
-- AI职场危机系列 - 第二本：Algorithm, Inc.（英文版）- 章节1-4

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-01', 'preset-ai-002', 'The Algorithm''s Shadow',
'The morning briefing at Algorithm, Inc. always began the same way: Dr. Chen presenting the latest efficiency metrics while the junior analysts tried to look attentive. Mike had been here six months, and he still couldn''t shake the feeling that something was fundamentally wrong with their work.

"Today''s highlight," Dr. Chen announced, his voice as smooth as the algorithms he designed, "the lending algorithm has processed 47,000 loan applications with a 99.7% accuracy rate. Human loan officers averaged 87%."

Mike raised his hand. "Dr. Chen, what happens to the 0.3% that the algorithm gets wrong?"

The room went quiet. Dr. Chen''s smile didn''t waver. "Those cases are reviewed by our compliance team. An acceptable margin for the efficiency gained."

After the meeting, Lisa caught Mike in the hallway. "You need to stop asking questions like that."

"I''m just trying to understand how it works."

"That''s the problem." Lisa glanced around. "Understanding isn''t your job. Trusting the algorithm is."

That night, Mike couldn''t sleep. He kept thinking about those 141 people—the 0.3% who were denied by the algorithm and had to fight for human review. What if the algorithm was wrong? What if it was systematically wrong?

He logged into the system from home, something he wasn''t supposed to do. The data was anonymized, but he could see patterns. Denied applications clustered in certain zip codes. Certain names appeared more often in the rejection pile.

The next morning, he requested a meeting with Dr. Chen.

"I''ve found something," Mike said, his hands trembling slightly as he placed his analysis on the desk. "The algorithm appears to be... biased."

Dr. Chen looked at the numbers, then at Mike. "Bias implies intent. What you''re seeing is statistical correlation."

"But correlation doesn''t mean causation. These people are being denied loans because of where they live, not because of their creditworthiness."

"They''re being denied because the data predicts higher risk in those areas. The algorithm doesn''t see race or neighborhood—it sees numbers."

"But the numbers reflect historical discrimination. If we use them, we perpetuate it."

Dr. Chen leaned back. "Mike, do you know why we built this system? Because human loan officers were even more biased. At least the algorithm is consistent."

"Consistently wrong is still wrong."

For a long moment, Dr. Chen said nothing. Then: "I''ll review your findings. But I suggest you focus on your assigned tasks. We all have roles here."

Walking back to his desk, Mike realized he had a choice. He could do what Lisa said—trust the algorithm, do his job, collect his paycheck. Or he could keep digging, keep asking questions, keep pushing.

The algorithm would never understand why that choice mattered. But Mike did.',
'{"weather":{"name":"Digital Dawn","icon":"🌅","description":"The glow of screens replacing sunlight"},"terrain":{"name":"Algorithm HQ","icon":"🏢","description":"Where human intuition goes to die"},"adventure":{"name":"Data Review","icon":"📊","description":"Finding truth in the numbers"},"equipment":{"name":"Access Badge","icon":"🎫","description":"Your ticket to the algorithm''s world"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-02', 'preset-ai-002', 'Trust the Data',
'Two weeks passed, and Mike heard nothing about his report. He tried to focus on his regular work—optimizing ad placement algorithms, fine-tuning recommendation engines—but his mind kept drifting back to those loan applications.

Lisa found him in the break room, staring at the coffee machine like it held the answers to the universe.

"You''re still thinking about it, aren''t you?"

"How can I not? Dr. Chen said he''d review my findings, but nothing''s changed. The algorithm is still running."

Lisa sighed. "Mike, let me tell you something about this company. We don''t fix things that aren''t broken."

"But it is broken. People are being denied opportunities because of where they live."

"People were being denied opportunities before the algorithm too. At least now it''s consistent."

"Consistent discrimination isn''t better."

Lisa set down her mug. "I''ve been here five years. I''ve seen a dozen people like you come through. Idealistic. Wanting to change things. You know what happens to them?"

"They leave?"

"Some leave. Some learn to work within the system. Some..." She hesitated. "Some find ways to make change from the inside. Slowly. Carefully."

That night, Mike made a decision. He wouldn''t be the idealist who burned out or the pragmatist who gave up. He would find a way to prove the algorithm was wrong—not with arguments, but with better data.

For the next month, he worked double shifts. His regular job during the day, his investigation at night. He cross-referenced denied applications with public records, credit histories, employment data. He built a new model, one that accounted for the historical biases the original algorithm ignored.

When he was done, he had proof. The algorithm wasn''t just perpetuating bias—it was amplifying it. People who would have been approved by human loan officers were being systematically denied.

He requested another meeting with Dr. Chen.

"I''ve built an alternative model," Mike said, presenting his findings. "It maintains 99.2% accuracy while reducing bias by 40%."

Dr. Chen studied the data. His expression was unreadable. "This is impressive work, Mike. But you''ve missed something fundamental."

"What?"

"The algorithm isn''t designed to be fair. It''s designed to be profitable."

Mike felt the floor shift beneath him. "But we could be both. Fair and profitable."

"Could we? Your model reduces bias by 40%, but it also reduces efficiency by 0.5%. In our world, that''s millions of dollars."

"It''s also thousands of people getting fair treatment."

Dr. Chen closed the folder. "I''ll present this to the board. But I want you to understand something. This company was built on the belief that algorithms are better than humans. If we admit this one is flawed, we undermine everything we stand for."

Walking out, Mike realized the problem wasn''t the algorithm. The problem was the people who built it, the people who trusted it, the people who refused to question it.

The algorithm was just doing what it was told. The humans were the ones who had failed.',
'{"weather":{"name":"Clear Output","icon":"☀️","description":"When the numbers finally make sense"},"terrain":{"name":"Server Room","icon":"🖥️","description":"The cold heart of the machine"},"adventure":{"name":"System Update","icon":"🔄","description":"When everything changes overnight"},"equipment":{"name":"Encrypted Drive","icon":"💾","description":"Secrets that could destroy careers"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-03', 'preset-ai-002', 'The Human Variable',
'The board meeting was scheduled for Friday. Mike spent the week in a state of suspended anxiety, waiting for news that might never come.

On Wednesday, Lisa found him in the rooftop garden—the only place in the building with real plants and natural light.

"You look terrible."

"I haven''t been sleeping."

"Because of the board meeting?"

Mike nodded. "What if they reject it? What if nothing changes?"

Lisa sat beside him. "Can I tell you a secret?"

"Of course."

"Three years ago, I found something similar. Not with the lending algorithm, but with our hiring system. It was filtering out candidates based on patterns that correlated with age and disability."

Mike stared at her. "What did you do?"

"I reported it. Dr. Chen thanked me and said he''d look into it. Six months later, I found out the algorithm was still running. When I asked why, I was told it was ''under review.''" She laughed bitterly. "It''s still under review. Three years later."

"Why didn''t you push harder?"

"Because I learned something important. This company doesn''t change because of internal pressure. It changes because of external consequences." She looked at him. "Sometimes the only way to fix a broken system is to let the world see it''s broken."

Mike understood what she was suggesting. It was dangerous. It was probably illegal. But it might be the only way.

Friday came. Dr. Chen called Mike into his office.

"The board has reviewed your findings," he said, his voice carefully neutral. "They''ve decided to continue with the current algorithm while your model undergoes further testing."

"Further testing? I''ve already tested it extensively."

"The board appreciates your initiative. But they need more data before making such a significant change."

Mike knew what that meant. More data meant more time. More time meant more people being denied loans unfairly. More people whose lives were being shaped by a biased algorithm.

"Dr. Chen, with respect, every day we wait, more people are affected."

"And every day we change something without proper testing, we risk breaking what works. The board has made its decision."

Walking out, Mike made his choice. He would give them one month. If nothing changed, he would do what Lisa had hinted at. He would find a way to make the world see what was happening inside Algorithm, Inc.

That night, he started documenting everything. Every meeting. Every email. Every piece of data. He didn''t know how he would use it yet, but he knew he needed to be ready.

The algorithm didn''t care about fairness. But maybe, just maybe, the world still did.',
'{"weather":{"name":"System Fog","icon":"🌫️","description":"Uncertainty in the machine"},"terrain":{"name":"Rooftop Garden","icon":"🌿","description":"The only place with real air"},"adventure":{"name":"The Exception","icon":"⚠️","description":"The case that shouldn''t exist"},"equipment":{"name":"Old Notebook","icon":"📓","description":"Where human thoughts still matter"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-04', 'preset-ai002', 'Numbers Don''t Lie',
'The month passed slowly. Mike continued his regular work while building his case in secret. He interviewed people who had been denied loans, documenting their stories. He analyzed the algorithm''s decisions, finding patterns that proved systemic bias.

On the day before his deadline, Dr. Chen called him in.

"We''ve completed our review of your model," Dr. Chen said. "The board has decided not to implement it."

"May I ask why?"

"Your model is technically sound. But it requires additional computational resources that would reduce our profit margins. In the current market, that''s not acceptable."

"So profit matters more than fairness?"

Dr. Chen''s expression hardened. "Mike, you''ve been here six months. You don''t understand how this industry works. Every company uses algorithms like ours. If we handicap ourselves with fairness constraints, we''ll be outcompeted by companies that don''t."

"Then maybe the whole industry is wrong."

"Maybe it is. But that''s not a battle you can win from inside this office."

Mike stood up. "You''re right. It''s not."

He walked out and went straight to Lisa''s desk. "I''m going to do it. The thing you hinted at."

Lisa looked around, then lowered her voice. "Are you sure? Once you do this, there''s no going back."

"I''m sure."

"Then listen carefully. There''s a journalist who''s been covering AI ethics. Her name is Rachel Kim. She''s written about algorithmic bias before. But you need to be careful—whistleblower protections only go so far."

That night, Mike composed an email. He attached his findings, his documentation, his interviews. He explained how the algorithm worked, how it perpetuated bias, how the company knew and chose to do nothing.

His finger hovered over the send button. This would change everything. He might lose his job. He might face legal consequences. But staying silent felt worse.

He pressed send.

The next morning, he went to work as usual. No one knew what he''d done. The algorithm kept running. The loans kept being processed. The bias kept perpetuating.

But now, somewhere out there, someone was reading the truth.

Three days later, Rachel Kim published her article. "Inside Algorithm, Inc.: How One Company''s AI Systematically Discriminates Against Minorities."

The story went viral. By noon, Algorithm, Inc.''s stock had dropped 15%. By evening, there were calls for congressional hearings.

Mike watched it all from his desk, wondering if he should feel triumphant. Instead, he felt hollow. The algorithm was still running. The company was still denying loans unfairly. The world now knew, but knowing wasn''t the same as changing.

His phone buzzed. A text from Lisa: "You did the right thing. But now the real work begins."

She was right. Exposing the problem was just the first step. Fixing it would be much harder.',
'{"weather":{"name":"Data Storm","icon":"🌩️","description":"When algorithms collide, humans get caught in the crossfire"},"terrain":{"name":"Algorithm HQ","icon":"🏢","description":"Where human intuition goes to die"},"adventure":{"name":"Data Review","icon":"📊","description":"Finding truth in the numbers"},"equipment":{"name":"Encrypted Drive","icon":"💾","description":"Secrets that could destroy careers"}}',
4);
