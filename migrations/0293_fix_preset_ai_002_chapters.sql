-- 修复 preset-ai-002 (Algorithm, Inc.) 的章节问题
-- 1. 添加缺失的第4章
-- 2. 扩展过短的第5、6、7章

-- 首先删除所有章节
DELETE FROM chapters WHERE book_id = 'preset-ai-002';

-- 重新添加所有章节
INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai002-01', 'preset-ai-002', 1, 'The Algorithm''s Shadow',
'The morning briefing at Algorithm, Inc. always began the same way: Dr. Chen presenting the latest efficiency metrics while the junior analysts tried to look attentive. Mike had been here six months, and he still couldn''t shake the feeling that something was fundamentally wrong with their work.

"Today''s focus is the loan approval algorithm," Dr. Chen announced, his voice smooth and confident. "We''ve achieved a 34% improvement in processing time, and accuracy is holding steady at 94%. Excellent work, team."

Mike raised his hand. "Dr. Chen, I have a question about the accuracy metrics."

The room went quiet. Questions were not encouraged at these briefings.

"Go ahead, Mike."

"I''ve been reviewing the rejection data, and I noticed something concerning. The algorithm seems to be rejecting applications from certain neighborhoods at a much higher rate than others, even when the financial profiles are identical."

Dr. Chen''s smile didn''t waver. "That''s not a bug, Mike. It''s a feature. The algorithm has identified patterns that correlate with loan default risk. Neighborhoods with higher default rates naturally receive more rejections."

"But what if those patterns reflect historical discrimination rather than actual risk? What if we''re perpetuating the very biases we claim to eliminate?"

The silence that followed was deafening. Dr. Chen''s eyes narrowed slightly.

"I appreciate your concern, Mike. But you need to trust the data. The algorithm doesn''t have feelings or prejudices. It simply processes information more efficiently than any human could. That''s not bias—it''s progress."

After the meeting, Lisa caught up with Mike in the hallway. She was one of the few colleagues who didn''t treat him like a pariah for asking questions.

"You need to be careful," she whispered. "Chen doesn''t like people questioning his algorithms. Especially not in front of the whole team."

"I''m not trying to cause trouble," Mike replied. "I just want to understand. If our algorithm is discriminating against people, shouldn''t we fix it?"

Lisa glanced around, then pulled him into an empty conference room.

"Look, I''ve been here three years. I''ve seen what happens to people who ask too many questions. They get reassigned to ''special projects'' that never seem to materialize. Or they get let go for ''performance reasons.'' The company values efficiency above everything else—including ethics."

"That''s exactly my point. What good is efficiency if we''re hurting people?"

Lisa sighed. "I''m not saying you''re wrong. I''m saying you need to be smart about this. Document everything. Build a case. And when you''re ready to act, make sure you have allies."

Mike nodded slowly. She was right. He couldn''t fight this alone. But he couldn''t stay silent either. Not when he knew what the algorithm was doing.'),

('chapter-ai002-02', 'preset-ai-002', 2, 'Trust the Data',
'Two weeks passed, and Mike heard nothing about his report. He tried to focus on his regular work—optimizing ad placement algorithms, fine-tuning recommendation engines—but his mind kept drifting back to those loan applications.

Lisa found him in the break room, staring at the coffee machine like it held the secrets of the universe.

"Still thinking about the loan algorithm?" she asked.

"I can''t help it. I keep seeing those rejection letters. Real people with real dreams being told no by a machine that doesn''t even know them."

Lisa poured herself a cup of coffee. "Have you considered that maybe the algorithm is right? Maybe those neighborhoods do have higher default rates, and the algorithm is just protecting the bank''s interests."

"That''s exactly the problem. The algorithm is protecting the bank''s interests, not the people''s. And the reason those neighborhoods have higher default rates is because banks have been denying them loans for decades. It''s a self-fulfilling prophecy."

Lisa considered this. "So what are you going to do?"

"I''m going to run my own analysis. Compare the algorithm''s decisions with actual outcomes, not just predictions. See if there''s a gap between what the algorithm thinks will happen and what actually happens."

"That sounds like a lot of work."

"It is. But if I''m right, it could change everything."

Mike spent the next month working late into the night, gathering data from public records, cross-referencing loan applications with actual repayment rates. The results were worse than he had imagined.

The algorithm wasn''t just reflecting historical bias—it was amplifying it. Qualified applicants from certain neighborhoods were being rejected at rates 40% higher than equally qualified applicants from other areas. And when those rejected applicants managed to get loans elsewhere, they repaid them at the same rate as everyone else.

The algorithm wasn''t predicting risk. It was creating it.

Mike compiled his findings into a report and submitted it through the official channels. He expected pushback, but he wasn''t prepared for what came next.

A meeting invitation appeared in his calendar: "Urgent: Algorithm Review with Dr. Chen and Legal Team."

The subject line made his stomach sink. This wasn''t a discussion. It was a defense.'),

('chapter-ai002-03', 'preset-ai-002', 3, 'The Human Variable',
'The board meeting was scheduled for Friday. Mike spent the week in a state of suspended anxiety, waiting for news that might never come.

On Wednesday, Lisa found him in the rooftop garden—the only place in the building with real plants and natural light.

"You look terrible."

"I haven''t been sleeping. Every time I close my eyes, I see those rejection letters. Real people whose lives are being destroyed by an algorithm that thinks it knows better."

Lisa sat down beside him. "What happened in the meeting with Dr. Chen?"

"They said my analysis was ''incomplete'' and ''failed to account for confounding variables.'' They thanked me for my concern and suggested I focus on my assigned projects. And then Legal reminded me of my NDA."

"So they''re burying it."

"They''re not just burying it. They''re expanding the algorithm to three new markets next quarter. Millions more people will be affected."

Lisa was quiet for a long moment. "What are you going to do?"

"I don''t know. I''ve done everything I can internally. The system is designed to protect itself, not the people it affects."

"Have you considered going public?"

Mike looked at her sharply. "That would violate my NDA. I could lose everything—my job, my career, my savings."

"Or you could change everything. For millions of people."

The weight of her words settled over him. She was right, of course. But the cost...

"I need to think about it," he said finally.

"Take your time," Lisa replied. "But not too much time. The board meets on Friday, and once they approve the expansion, it''ll be much harder to stop."

That night, Mike couldn''t sleep. He lay in bed, staring at the ceiling, thinking about the people whose lives were being decided by an algorithm that didn''t know them. He thought about his own parents, immigrants who had been denied loan after loan before finally finding a bank willing to give them a chance. That chance had changed everything for their family.

What if no one had given them that chance? What if an algorithm had decided they were too risky?

The next morning, Mike made a decision. He reached out to a journalist he had met at a tech ethics conference—a reporter named Rachel Kim who had built her career exposing corporate wrongdoing.

"Rachel," he said when she answered. "I have a story for you. But I need to know—if I share this, what happens next?"

Rachel''s voice was calm, professional. "That depends on what you have. But I can tell you this: I''ve spent my career holding powerful institutions accountable. I know how to protect sources, and I know how to make sure the truth comes out."

Mike took a deep breath. "Okay. Let''s meet."'),

('chapter-ai002-04', 'preset-ai-002', 4, 'The Whistleblower',
'Rachel Kim was not what Mike had expected. He had imagined a hardened investigative journalist—someone cynical and aggressive. Instead, she was soft-spoken, thoughtful, and asked questions that cut to the heart of things.

"So let me understand this correctly," she said, her pen hovering over her notebook. "The algorithm is systematically denying loans to qualified applicants from certain neighborhoods, and when you raised this internally, you were told to ''trust the data''?"

Mike nodded. "That''s exactly what happened. And when I showed them that the data itself was biased—historical lending patterns that reflected decades of discrimination—they said it didn''t matter. The algorithm was profitable, and that was all that counted."

Rachel leaned back in her chair. They were meeting in a small café three blocks from Mike''s office, far enough to avoid running into colleagues, close enough that he could return for his afternoon meetings.

"Do you have documentation?" she asked.

Mike hesitated. This was the point of no return. If he shared the internal reports, the emails, the meeting notes—he would be betraying his employer. He could lose his job, his career, everything he had worked for.

But then he thought about the families who had been denied loans. The small business owners who had been forced to close. The communities that had been systematically excluded from the American dream.

"I have everything," he said, pulling a USB drive from his pocket. "Emails, meeting notes, the original data analysis. It''s all here."

Rachel took the drive, her expression serious. "You understand what this means, right? Once this story breaks, there''s no going back."

"I know," Mike said. "But someone has to do something. And if the company won''t listen, maybe the public will."

Rachel nodded slowly. "I''ll need time to verify everything. Cross-check the data, interview other sources. This isn''t something we can rush."

"How long?"

"Two weeks, maybe three. I want to make sure this story is bulletproof before we publish. Because believe me, Algorithm, Inc. will come at us with everything they have."

Mike stood up to leave. "Thank you," he said. "For taking this seriously."

"Thank you," Rachel replied. "For having the courage to speak up. Not everyone would."

As Mike walked back to the office, he felt a strange mix of fear and relief. The wheels were in motion now. Whatever happened next, he knew he had done the right thing.'),

('chapter-ai002-05', 'preset-ai-002', 5, 'The Fallout',
'The article dropped on a Tuesday morning. By noon, Algorithm, Inc.''s stock had dropped 23%. By evening, the CEO was doing damage control on every major news network.

Mike watched it all unfold from his apartment, his phone buzzing constantly with messages from colleagues, friends, and even a few reporters who had somehow gotten his number.

The article was everything Rachel had promised—and more. She had verified every claim, interviewed former employees who had witnessed similar issues, and brought in independent experts to analyze the algorithm. The result was a devastating exposé that painted Algorithm, Inc. not as a victim of biased data, but as a willing participant in perpetuating systemic discrimination.

The company''s response was swift and predictable. First, denial. Then, deflection. Then, when the evidence became impossible to ignore, a carefully worded statement about "unintended consequences" and a promise to "review our processes."

Mike expected to be fired. He had his resignation letter ready, his desk packed, his goodbyes rehearsed. But when he was called into the CEO''s office on Friday, it wasn''t to fire him.

"We want you to lead the remediation effort," Dr. Chen said, his expression unreadable. "You identified the problem. You should be part of the solution."

Mike stared at him. "You want me to fix the algorithm I just exposed?"

"We want you to help us do better. Isn''t that what you wanted?"

The question hung in the air. Was it? Mike had wanted justice, accountability, change. But could he achieve that from inside the company that had fought so hard to ignore him?

"I''ll think about it," he said finally.

Dr. Chen nodded. "Take the weekend. But understand this—we''re at a crossroads. The company can either learn from this or double down on the old ways. Your voice could make the difference."

Mike left the office more conflicted than ever. Rachel called that night.

"They''re offering you a job?" she asked, incredulous. "After everything?"

"They want me to lead the remediation effort."

"And you''re considering it?"

"I don''t know," Mike admitted. "Part of me thinks I should walk away. But another part thinks maybe this is how change happens—not from the outside, but from within."

Rachel was quiet for a moment. "Just be careful. Companies like this don''t change because they want to. They change because they have to. And as soon as the pressure is off..."

"I know," Mike said. "But what if I can make a real difference? What if this is the opportunity I''ve been waiting for?"

"Then take it," Rachel said. "But keep your eyes open. And keep my number handy."'),

('chapter-ai002-06', 'preset-ai-002', 6, 'The Override',
'Six months after the scandal, Algorithm, Inc. was a different company—or at least, it appeared to be. The biased algorithm had been replaced. New oversight committees had been formed. Mike had been promoted to "Ethics Compliance Lead," a title that came with a corner office and a seat at the executive table.

But the more he saw, the more he realized that the changes were largely cosmetic. The new algorithm was better, yes, but it still contained subtle biases that the oversight committee—stacked with company loyalists—consistently downplayed or ignored.

"We need to adjust the parameters," Mike argued in yet another meeting. "The approval rates for minority applicants are still 15% lower than for white applicants with identical credit profiles."

"That''s within acceptable variance," the committee chair replied, not looking up from her tablet. "And we have to consider the business impact of further adjustments."

"Since when is discrimination an ''acceptable variance''?" Mike asked, his voice rising.

"Mike, we all appreciate your passion, but you need to understand the bigger picture. We''re a business, not a charity. Every percentage point of approval we add is a percentage point of risk."

The meeting ended without resolution. Again.

That night, Mike made a decision. He had tried working within the system, and the system had failed. It was time for a different approach.

He began documenting everything—the ignored reports, the dismissed concerns, the subtle pressure to look the other way. He also started reaching out to regulators, lawmakers, and other whistleblowers. Quietly, carefully, building a case that would be impossible to ignore.

Lisa found him in his office late one evening, surrounded by documents.

"You''re doing it again, aren''t you?" she asked softly.

Mike looked up. "Doing what?"

"Fighting a battle you can''t win. Mike, I supported you before because what the company was doing was wrong. But now? They''re trying. Maybe not as hard as you''d like, but they''re trying. Can''t you meet them halfway?"

"Halfway isn''t good enough when people''s lives are being destroyed," Mike replied. "And I''m not sure they are trying. I think they''re waiting for the heat to die down so they can go back to business as usual."

Lisa sighed. "Just... be careful. You''ve already made enemies. Don''t make martyrs of yourself."

Mike smiled grimly. "I''m not trying to be a martyr. I''m trying to make a difference. There''s a difference."

"Is there?" Lisa asked, and walked away.

Mike turned back to his documents. She was right, of course. He was walking a dangerous line. But someone had to walk it. And if not him, then who?'),

('chapter-ai002-07', 'preset-ai-002', 7, 'The Human Decision',
'One year after Mike first raised concerns about the algorithm, Algorithm, Inc. was a transformed company. Congressional hearings had led to new regulations. Competitors had emerged with genuinely fair algorithms. Mike was now the head of the Ethics Division—a real division with real power.

But the transformation hadn''t come easily. There had been more articles, more investigations, more resignations. The CEO had stepped down. Dr. Chen had retired. A new leadership team had taken over, genuinely committed to doing things differently.

Mike stood at the window of his office, looking out at the city below. A year ago, he had been a junior analyst, afraid to speak up. Now he was shaping the future of ethical AI—not just at Algorithm, Inc., but across the industry.

His phone buzzed. A message from Rachel: "Congratulations on the settlement. You did good."

The class-action lawsuit had settled that morning. $500 million in damages to affected borrowers. A commitment to rewrite every algorithm from scratch. Independent oversight for the next decade.

It wasn''t perfect. It wouldn''t undo the damage that had already been done. But it was something.

Lisa knocked on his door. "Ready for the press conference?"

Mike nodded. Today, he would stand in front of the cameras and explain what had changed—and what still needed to change. He would talk about the importance of human oversight, the dangers of blind faith in algorithms, the need for constant vigilance.

But first, he had one more thing to do.

He pulled out his phone and typed a message to his younger self, the one who had been afraid to speak up:

"You did the right thing. It was hard, and it cost you more than you expected. But in the end, it mattered. The world is a little better because you refused to stay silent. And that''s all any of us can hope for."

He deleted the message without sending it—there was no one to send it to, after all. But writing it helped him understand something he hadn''t fully grasped before.

The algorithm had been the problem, yes. But the real issue had been human decisions—the decision to prioritize profit over fairness, the decision to ignore evidence, the decision to trust the machine instead of questioning it.

In the end, it wasn''t about algorithms at all. It was about people. And people, unlike machines, could choose to do better.

Mike walked out of his office, ready to face the cameras. The work wasn''t done—it would never be done. But for the first time in a long time, he felt hopeful about the future.

And that, he realized, was worth fighting for.');
