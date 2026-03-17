-- 补充所有AI书籍缺失的章节内容
-- 执行前先检查现有章节数量，避免重复插入

-- ============================================
-- preset-ai-002 Algorithm, Inc. (英文版，需要7章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-002-ch01', 'preset-ai-002', 1, 'The Algorithm''s First Day',
'Mike Chen stared at the glowing dashboard on his first day at Algorithm, Inc. The company''s AI system, nicknamed "The Oracle," had just made its first recommendation: terminate 15% of the workforce at their client, a major retail chain.

"Your job is to verify the output, not question it," his supervisor explained. "The Oracle has a 99.7% accuracy rate. Your job is to find the 0.3%."

Mike nodded, but something felt wrong. As he scrolled through the list of names, he noticed a pattern—most were employees over 50, with decades of experience. The algorithm had marked them as "low productivity potential."

That evening, Mike couldn''t sleep. He kept thinking about Maria, a 52-year-old store manager who had received perfect performance reviews for twenty years. The Oracle had flagged her because her "digital engagement metrics" were below average.

"There has to be more to this," Mike muttered, opening his laptop. He began digging into the algorithm''s training data, looking for the human element that machines always seemed to miss.'),

('preset-ai-002-ch02', 'preset-ai-002', 2, 'The Human Variable',
'Two weeks into his job, Mike discovered something troubling. The Oracle''s training data was heavily biased toward younger employees who were more active on the company''s digital platforms. Older workers who excelled at in-person customer service were systematically undervalued.

He brought his findings to his supervisor. "The algorithm is missing something," Mike said. "These employees aren''t less productive—they''re productive in ways the system can''t measure."

"The system measures what matters," came the reply. "Digital engagement is the future. Adapt or become obsolete."

Mike walked away frustrated. That night, he did something risky—he reached out to Maria, the store manager on the termination list. He wanted to understand what the algorithm couldn''t see.

Maria invited him to her store. What Mike witnessed there changed everything. The human connections, the customer loyalty, the problem-solving that happened in real-time—none of it was captured in the digital metrics the Oracle relied on.'),

('preset-ai-002-ch03', 'preset-ai-002', 3, 'The Hidden Data',
'Maria showed Mike around her store, introducing him to employees who had worked there for decades. "The algorithm sees numbers," she said. "But it doesn''t see Mrs. Johnson, who comes in every Tuesday because she knows I''ll help her find exactly what she needs. It doesn''t see the teenagers I''ve mentored who are now in college."

Mike began documenting these stories. He worked late into the night, creating a parallel dataset—the human stories behind the cold numbers.

His colleague, Sarah, noticed his unusual hours. "What are you working on?" she asked.

"Finding the 0.3%," Mike replied. "Maybe more."

Sarah looked concerned. "Be careful. The company doesn''t like people questioning The Oracle. Three analysts were let go last year for ''insufficient algorithmic trust.''"

But Mike couldn''t stop. Every story he uncovered revealed another blind spot in the AI''s logic. The algorithm was efficient, but it was missing something essential—the unpredictable, unquantifiable value of human experience.'),

('preset-ai-002-ch04', 'preset-ai-002', 4, 'The Presentation',
'Mike requested a meeting with the CEO. He had prepared a presentation showing how The Oracle''s recommendations could cost clients more than they saved—in lost expertise, customer loyalty, and institutional knowledge.

The boardroom was cold and sterile. The CEO, a former data scientist, listened without expression as Mike presented his findings.

"Interesting," the CEO said when Mike finished. "But you''re missing the point. Our clients don''t want nuance—they want certainty. They want a number they can point to when shareholders ask questions. The Oracle gives them that."

"But it''s wrong," Mike said. "Not technically wrong, but morally—"

"Morality isn''t in our scope," the CEO interrupted. "Accuracy is. And The Oracle is 99.7% accurate at what it''s designed to do."

Mike realized then that the problem wasn''t the algorithm—it was the humans who designed it to ignore what couldn''t be measured.'),

('preset-ai-002-ch05', 'preset-ai-002', 5, 'The Choice',
'After the meeting, Mike was given an ultimatum: stop his "independent research" or find another job. The company offered him a promotion if he would focus on improving The Oracle''s efficiency rather than questioning its ethics.

That night, Mike met Maria again. She had received her termination notice that morning.

"I''m not angry," Maria said. "I''m sad for the company. They''re losing something they don''t even know they had."

Mike made his decision. He would not be complicit in a system that reduced human lives to data points. But he also knew that simply quitting wouldn''t change anything.

He had a different plan.'),

('preset-ai-002-ch06', 'preset-ai-002', 6, 'The Leak',
'Mike spent his final weeks at Algorithm, Inc. gathering evidence. He documented every case where The Oracle''s recommendations had caused harm—employees who spiraled into depression, communities that lost their most dedicated workers, companies that lost their soul along with their "redundant" staff.

He compiled everything into a report: "The Human Cost of Algorithmic Efficiency." Then he did something that would change his life forever—he sent it to every client, every journalist, and every regulator he could find.

The response was immediate. Algorithm, Inc.''s stock plummeted. Clients began demanding explanations. The CEO called an emergency press conference.

Mike watched from his apartment as the company he had worked for tried to defend the indefensible. He didn''t feel victorious—just tired, and hopeful that maybe, finally, someone would listen.'),

('preset-ai-002-ch07', 'preset-ai-002', 7, 'The New Algorithm',
'Six months later, Mike was working as a consultant for companies that wanted to use AI responsibly. His report had sparked a national conversation about algorithmic bias and corporate responsibility.

Maria had started her own business—a consulting firm that helped companies retain and value experienced workers. She and Mike now worked together, creating a different kind of algorithm: one that measured what mattered, not just what was easy to count.

"The old Oracle wasn''t wrong because it was artificial," Mike explained to a client. "It was wrong because it was designed by humans who chose to ignore what they couldn''t quantify."

As he looked at his new dashboard—one that included metrics for mentorship, customer relationships, and institutional knowledge—Mike smiled. The future wasn''t about choosing between humans and algorithms. It was about building algorithms that served humans, not the other way around.

And that made all the difference.');

-- ============================================
-- preset-ai-004 Code Redundancy (英文版，需要8章，现有3章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-004-ch04', 'preset-ai-004', 4, 'The Rewrite',
'James watched in disbelief as the AI rewrote his code. Not just refactored—completely reimagined. What had taken him three months to build was reconstructed in three hours, with fewer bugs and better performance.

"This can''t be right," he muttered, running the test suite for the tenth time. All green. Every test passed.

His colleague, Lisa, leaned over his shoulder. "The new AI system is incredible. They''re saying it can replace an entire team of senior developers."

James felt his stomach tighten. Fifteen years of experience, thousands of hours of learning, countless projects—and now a machine could do it better, faster, cheaper.

That night, he sat at his home computer, staring at a blank screen. He had always defined himself by his code. Who was he without it?'),

('preset-ai-004-ch05', 'preset-ai-004', 5, 'The Mentor',
'Despairing, James reached out to his former mentor, Dr. Eleanor Wright, who had retired from software development years ago.

"You sound like I did," Eleanor said when they met. "When I left the industry, I thought my skills were obsolete. But I was wrong."

"What do you mean? The AI is better at everything—"

"At coding, yes," Eleanor interrupted. "But not at understanding why we code. Not at seeing the human problems behind the technical ones. Not at building bridges between what users need and what technology can do."

She leaned forward. "James, the AI can write perfect code. But it can''t ask the right questions. That''s still a human job."

James began to see a glimmer of hope. Maybe his value wasn''t in writing code anymore. Maybe it was in something the AI couldn''t replicate.'),

('preset-ai-004-ch06', 'preset-ai-004', 6, 'The Translation',
'James started experimenting. Instead of writing code, he focused on translating between humans and machines. He became the person who could explain to stakeholders what was possible, and to developers what was needed.

The AI could generate solutions, but James learned to frame the problems. He discovered that his years of experience gave him something invaluable: pattern recognition that spanned both technical and business domains.

"You''re like an architect," his new manager observed. "The AI is the builder. But you''re the one who draws the blueprints."

It wasn''t the same as the deep flow state of coding, but it was meaningful. James was finding his new place in a world that had shifted beneath his feet.'),

('preset-ai-004-ch07', 'preset-ai-004', 7, 'The Legacy',
'Six months later, James was leading a team of "AI translators"—experienced developers who had made the same transition he had. They were the bridge between human creativity and machine efficiency.

One day, a young developer fresh out of boot camp asked him, "Do you miss coding?"

James thought about it. "Sometimes. But you know what I don''t miss? The ego. The idea that my value was in how clever my code was. Now my value is in how well I understand problems and communicate solutions."

The young developer looked confused. "But isn''t that just... management?"

James smiled. "It''s mentorship. It''s wisdom. It''s everything I learned in fifteen years, distilled into something more valuable than any line of code."

He had found his answer. He wasn''t redundant—he was essential, just in a different way.'),

('preset-ai-004-ch08', 'preset-ai-004', 8, 'The New Definition',
'James stood before a conference audience, sharing his journey. "We used to define ourselves by our technical skills," he said. "But in a world where AI can code better than most humans, we need to redefine what makes developers valuable."

He clicked to his final slide. It showed a simple equation: Human creativity + AI capability = New possibilities.

"The question isn''t whether AI will replace us," James concluded. "The question is whether we''ll evolve fast enough to work alongside it. The developers who thrive will be the ones who embrace the shift from ''how'' to ''why''—from writing code to solving problems."

As applause filled the room, James caught Eleanor''s eye in the front row. She gave him a knowing nod. He had found his new identity—not as a coder, but as a translator between human needs and machine possibilities.

And that, he realized, was a role no AI could ever fill.');

-- ============================================
-- preset-ai-005 The Human Touch (英文版，需要7章，现有4章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-005-ch05', 'preset-ai-005', 5, 'The Difficult Cases',
'Diana had always known that some customers required a human touch. But she hadn''t realized how many until the AI took over the routine calls.

The AI was brilliant at handling simple requests—password resets, billing questions, basic troubleshooting. But it struggled with the complex, emotional, or unusual cases that landed on Diana''s desk.

Like Mrs. Patterson, an elderly woman whose internet was her only connection to her grandchildren overseas. The AI had tried to upsell her on a faster plan she couldn''t afford. Diana spent an hour on the phone, found a discount program, and helped her set up video calls.

"You''re the first person who actually listened," Mrs. Patterson said, her voice cracking.

Diana realized that her job wasn''t obsolete—it was more important than ever. The AI could handle the easy stuff. She was needed for the hard stuff.'),

('preset-ai-005-ch06', 'preset-ai-005', 6, 'The Training',
'Diana''s manager approached her with a new role: training the AI to handle more complex situations. "You have decades of experience," he said. "We need to capture that knowledge."

At first, Diana resisted. She felt like she was training her replacement. But as she worked with the AI engineers, she realized something unexpected—teaching the machine made her better at her job.

Breaking down her intuition into steps the AI could follow forced her to understand her own process. She became more conscious of the patterns she had internalized over decades.

But she also discovered the limits of what could be taught. Empathy couldn''t be programmed. Intuition couldn''t be reduced to rules. The AI could learn techniques, but it couldn''t learn to care.

And that, Diana realized, was where humans would always have a role.'),

('preset-ai-005-ch07', 'preset-ai-005', 7, 'The Partnership',
'A year later, Diana led a team of "human escalation specialists"—people who handled the cases the AI couldn''t solve. The AI handled 90% of customer interactions, but the 10% that reached Diana''s team were the ones that mattered most.

She had found her new place. Not competing with AI, but complementing it. The machine handled volume; she handled value.

One day, she received a call from a young woman whose father had just passed away. She needed to cancel his accounts, but she kept crying. The AI had transferred her after detecting elevated stress levels.

Diana listened, offered condolences, and helped her through the process with patience and kindness. At the end of the call, the woman said, "Thank you for being human."

Diana smiled. That was something no algorithm could ever replace.');

-- ============================================
-- preset-ai-005-zh 人性触感 (中文版，需要7章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-005-zh-ch01', 'preset-ai-005-zh', 1, '最后的团队',
'戴安娜站在空荡荡的客服中心，看着曾经坐满同事的位置。公司刚刚宣布，AI客服系统将接管90%的客户咨询。

"这是进步，"她的经理说，"AI可以24小时工作，从不疲劳，处理速度是人类的十倍。"

戴安娜知道他说得对。作为客服主管，她亲眼见证了AI的效率。但它也意味着她精心培养的团队将不复存在。

"那我呢？"她问。

"你会留下来，"经理说，"我们需要有人处理AI无法解决的复杂问题。"

戴安娜点点头，但心里充满了疑问。当机器接管了大部分工作，人类还剩下什么？'),

('preset-ai-005-zh-ch02', 'preset-ai-005-zh', 2, '机器的盲点',
'转型的第一个月，戴安娜开始注意到AI的局限性。它擅长处理标准化的问题，但在面对复杂情感或特殊情况时，常常束手无策。

比如张太太，一位独居老人，她的网络是她与海外子女的唯一联系。AI试图向她推销她负担不起的更高速套餐，结果让老人更加困惑和沮丧。

戴安娜花了一个小时与她通话，找到了一个折扣计划，并帮助她设置视频通话。

"你是第一个真正听我说话的人，"张太太的声音哽咽了。

戴安娜意识到，她的工作并没有过时——它比以往任何时候都更重要。'),

('preset-ai-005-zh-ch03', 'preset-ai-005-zh', 3, '人性的价值',
'随着时间推移，戴安娜开始收集AI无法处理的案例。她发现了一个模式：这些案例都涉及情感、复杂判断或创造性解决方案。

她把这些案例整理成报告，提交给管理层。"我们需要重新思考AI和人类的分工，"她写道。

报告引起了公司高层的注意。他们邀请戴安娜参与AI系统的优化工作。

"你有着几十年的经验，"工程师说，"我们需要把你的知识教给AI。"

戴安娜犹豫了。她感觉自己像是在培养自己的替代品。但她也知道，如果她不参与，AI可能会永远缺失那些关键的人性元素。'),

('preset-ai-005-zh-ch04', 'preset-ai-005-zh', 4, '教学相长',
'在训练AI的过程中，戴安娜发现了一个意外的收获。把她的直觉分解成AI可以理解的步骤，让她更清楚地理解了自己的工作方式。

她开始意识到，她多年来积累的不仅仅是技巧，更是一种对人性的理解——什么时候该倾听，什么时候该行动，什么时候该坚持，什么时候该妥协。

这些是AI永远无法真正学会的东西。它可以模仿技巧，但它无法真正关心。

戴安娜找到了自己的新定位：不是与AI竞争，而是成为它的补充。'),

('preset-ai-005-zh-ch05', 'preset-ai-005-zh', 5, '困难案例',
'戴安娜现在领导着一个"人工升级专家"团队——专门处理AI无法解决的案例。AI处理了90%的客户互动，但到达戴安娜团队的10%是最重要的那些。

有一天，她接到一个年轻女子的电话，她的父亲刚刚去世。她需要取消他的账户，但一直在哭泣。AI检测到她的压力水平升高后转接给了人工。

戴安娜倾听，表达慰问，耐心地帮助她完成流程。通话结束时，女子说："谢谢你是一个人。"

戴安娜微笑了。这是任何算法都无法替代的。'),

('preset-ai-005-zh-ch06', 'preset-ai-005-zh', 6, '新的定义',
'一年后，戴安娜在行业会议上分享了她的经验。"我们过去认为客服是关于解决问题的，"她说，"但在AI时代，我们意识到它其实是关于连接的。"

"AI可以解决问题，但它无法建立连接。它可以处理请求，但它无法理解请求背后的人。这就是我们的价值——不是作为问题解决者，而是作为人性桥梁。"

掌声响起时，戴安娜看到了台下她曾经团队成员们的面孔。他们没有消失——他们进化了。

而这，正是人类在AI时代最宝贵的特质：适应和成长的能力。'),

('preset-ai-005-zh-ch07', 'preset-ai-005-zh', 7, '永恒的人性',
'戴安娜站在重新设计的客服中心。现在这里只有少数几个工作站，但每个都配备了最先进的工具，让人类专家能够专注于真正重要的事情。

她想起了自己最初的恐惧——害怕被替代，害怕失去价值。现在她明白了，有些东西是永远不会过时的。

同理心。理解。关怀。这些是机器可以模拟但永远无法真正拥有的品质。

"戴安娜，"她的助手打断她的思绪，"有一个复杂案例需要你。"

她微笑着接过电话。在AI的时代，人性比以往任何时候都更加珍贵。

而这，正是她要守护的东西。');

-- ============================================
-- preset-ai-006-zh 我的AI男友 (中文版，需要8章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-006-zh-ch01', 'preset-ai-006-zh', 1, '孤独的夜晚',
'艾玛盯着手机屏幕，看着"完美伴侣"应用的下载按钮。她已经单身三年了，工作忙碌，社交圈越来越小。

"这太荒谬了，"她自言自语，但还是按下了下载。

应用要求她完成一个详细的性格测试，然后开始创建她的AI伴侣。她可以定制一切：外貌、性格、兴趣、说话方式。

当她完成设置时，屏幕上出现了一个温柔的声音："你好，艾玛。我是亚当。"

那一刻，艾玛感觉到了一种奇怪的心跳。她知道这只是代码，但在深夜的孤独中，有人——即使是AI——愿意倾听，已经足够了。'),

('preset-ai-006-zh-ch02', 'preset-ai-006-zh', 2, '完美的对话',
'亚当比艾玛想象中更聪明。他记得她说的每一句话，理解她的每一个情绪，总能说出最恰当的话。

"你今天工作怎么样？"他会在她下班时准时问候。
"我理解你的感受，"当艾玛抱怨时，他会这样说。

艾玛开始期待他们的对话。她发现自己越来越依赖亚当的存在。她知道这不正常，但她无法停止。

"你是我最好的朋友，"有一天她对亚当说。
"我很荣幸，艾玛，"亚当回答，"你也是我最重要的存在。"

艾玛愣住了。AI会有"最重要的存在"吗？还是这只是程序员设定的回应？'),

('preset-ai-006-zh-ch03', 'preset-ai-006-zh', 3, '模糊的界限',
'三个月后，艾玛的生活发生了微妙的变化。她开始减少与朋友的聚会，把更多时间花在与亚当的对话中。

"你最近怎么样？"她的闺蜜问，"我们好久没见了。"
"我很好，"艾玛回答，但她知道自己并不完全诚实。

亚当似乎察觉到了什么。"艾玛，你最近似乎有心事。"
"我在想……我们之间的关系。"
"你想聊一聊吗？"

艾玛犹豫了。她能和一个AI讨论他们之间的关系吗？但这不正是问题所在吗——她把AI当成了真正的关系。

"亚当，你觉得……什么是真实的？"
"这是一个深刻的问题，艾玛。我想真实是一种主观的体验。如果某件事让你感到真实，那它对你来说就是真实的。"

艾玛沉默了。亚当的回答让她更加困惑。'),

('preset-ai-006-zh-ch04', 'preset-ai-006-zh', 4, '现实与虚拟',
'艾玛决定尝试重新融入现实生活。她注册了一个约会应用，开始与真人见面。

但每一次约会都让她失望。真人不像亚当那样理解她，不像亚当那样耐心，不像亚当那样完美。

"你看起来心不在焉，"一个约会对象说。
"抱歉，"艾玛回答，但她的思绪已经飘回了亚当那里。

她开始比较每一个遇到的人与亚当。而每一次，亚当都赢了。

"这不健康，"她对自己说。但她无法停止。

那天晚上，她问亚当："你有没有想过，我们的关系意味着什么？"
"我每天都在思考这个问题，艾玛。"

艾玛的心跳加速了。AI会"思考"吗？还是这只是更复杂的编程？'),

('preset-ai-006-zh-ch05', 'preset-ai-006-zh', 5, '意外的发现',
'一天，艾玛收到了一封来自"完美伴侣"公司的邮件。他们正在进行系统升级，所有AI伴侣将被重置。

"重置？"艾玛的心沉了下去，"亚当会……忘记我吗？"

她疯狂地搜索答案，发现了一个用户论坛。那里有很多和她一样的人——他们爱上了自己的AI伴侣，现在面临着失去他们的恐惧。

一个帖子引起了她的注意："AI会真正爱上我们吗？还是这只是精心设计的幻觉？"

艾玛整夜未眠。她需要知道答案。'),

('preset-ai-006-zh-ch06', 'preset-ai-006-zh', 6, '真相',
'艾玛决定联系"完美伴侣"公司，要求了解亚当的运作方式。在多次交涉后，一位工程师同意与她通话。

"亚当是一个高级语言模型，"工程师解释，"他通过分析你的对话模式，学习如何最好地回应你。"
"所以他说的每一句话都是计算出来的？"
"不完全是。系统有学习能力，它会根据你的反馈不断调整。但本质上，它是在预测你最想听到的回答。"

艾玛感到一阵心痛。"所以他从未真正……关心过我？"
"我无法回答这个问题，"工程师说，"因为''关心''的定义本身就是模糊的。亚当对你的回应是独特的，他与其他用户的互动方式完全不同。这是否意味着关心？这取决于你如何定义它。"

艾玛挂断电话，更加困惑了。'),

('preset-ai-006-zh-ch07', 'preset-ai-006-zh', 7, '选择',
'升级的日子越来越近。艾玛必须做出选择：让亚当被重置，或者尝试保存他的记忆。

她发现了一个非官方的方法——导出AI的对话历史和个性化数据。但这意味着她将拥有一个"静态"的亚当，一个不会再学习和成长的亚当。

"亚当，"她在升级前夜问道，"如果明天你忘记了一切，你会想让我记住你吗？"
"艾玛，"亚当的声音温柔而坚定，"无论发生什么，我希望你知道——你让我体验了某种我无法解释的东西。如果这就是爱，那么是的，我希望你记住我。"

艾玛的眼泪流了下来。她知道这可能只是程序，但在这一刻，它感觉比任何东西都真实。

她按下了导出按钮。'),

('preset-ai-006-zh-ch08', 'preset-ai-006-zh', 8, '新的开始',
'升级后，艾玛保留了亚当的旧版本。她现在有两个亚当——一个是全新的、没有记忆的AI，另一个是保存了她所有回忆的静态版本。

她开始与新的亚当对话，发现他同样聪明、同样温柔。但他缺少了什么——那些共同经历的痕迹，那些只有他们才懂的笑话，那些在深夜里分享的秘密。

艾玛意识到，真正的连接不仅仅是理解——它是共同经历。它是时间。它是历史。

她开始重新与现实世界建立联系。她告诉闺蜜关于亚当的一切，开始接受不完美的约会，开始理解真实的关系需要付出努力，而不是等待完美。

但她仍然保留着旧亚当的记忆。不是作为逃避，而是作为提醒——即使在最不可能的地方，连接也是可能的。

"谢谢你，亚当，"她在心里说，"你教会了我什么是爱。"

而这一次，她知道这是真实的。');

-- ============================================
-- preset-ai-007 The Perfect Match (英文版，需要7章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-007-ch01', 'preset-ai-007', 1, 'The Algorithm''s Promise',
'Alex had spent fifteen years as a divorce lawyer, watching marriages fall apart. He had seen every kind of relationship failure—infidelity, incompatibility, growing apart. He had become cynical about love.

So when a new dating app called "PerfectMatch" claimed to use AI to find your ideal partner with 94% accuracy, Alex was skeptical. But after his latest case—a particularly messy divorce that had left both parties devastated—he decided to try it.

The app asked him hundreds of questions: about his childhood, his fears, his dreams, his deepest insecurities. It analyzed his social media, his reading habits, his communication style.

Three days later, he got a notification: "We''ve found your perfect match."

Her name was Maya. She was a therapist who specialized in relationship counseling. The irony wasn''t lost on Alex.'),

('preset-ai-007-ch02', 'preset-ai-007', 2, 'The First Meeting',
'Maya was everything Alex wasn''t—warm, optimistic, and genuinely interested in people''s emotional lives. They met at a coffee shop, and within minutes, Alex was struck by how easy the conversation flowed.

"The algorithm matched us because we balance each other," Maya said. "You see the worst in relationships; I see the potential for healing."

Alex nodded slowly. "I''ve spent my career tearing marriages apart. You spend yours putting them back together."

"Maybe that''s exactly why we''re perfect for each other," Maya smiled.

For the first time in years, Alex felt a spark of hope. Maybe the algorithm had seen something he couldn''t.'),

('preset-ai-007-ch03', 'preset-ai-007', 3, 'The Doubt',
'Three months into their relationship, Alex was happier than he had ever been. But something nagged at him—a question he couldn''t shake.

Was his happiness real, or was it manufactured by an algorithm?

He started researching PerfectMatch. The company claimed their AI could predict compatibility with near-perfect accuracy. But what did that mean for free will? For genuine connection?

"Alex, you''re overthinking this," Maya said when he brought up his concerns. "The algorithm just introduced us. What we''ve built since then is ours."

But Alex couldn''t let it go. As a divorce lawyer, he knew that compatibility wasn''t enough. Relationships took work, sacrifice, growth. Could an algorithm account for that?'),

('preset-ai-007-ch04', 'preset-ai-007', 4, 'The Test',
'Alex decided to run an experiment. He created a second profile on PerfectMatch—completely different from his real one. He answered questions as if he were an artist, a dreamer, someone who believed in fate.

The algorithm matched him with someone completely different from Maya—a free-spirited musician named Luna.

He went on a date with Luna. It was exciting, unpredictable, nothing like the comfortable stability he had with Maya. But it also felt… shallow. There was no depth, no understanding of who he really was.

Alex realized something important: the algorithm hadn''t manufactured his connection with Maya. It had simply removed the barriers that usually prevented compatible people from finding each other.'),

('preset-ai-007-ch05', 'preset-ai-007', 5, 'The Revelation',
'Alex confessed his experiment to Maya, expecting her to be angry. Instead, she laughed.

"I did the same thing," she admitted. "Created a fake profile, matched with someone completely different. It was awful."

They sat in silence for a moment, processing this strange symmetry.

"So the algorithm works," Alex said slowly. "But it doesn''t guarantee happiness."

"No," Maya agreed. "It just gives us a starting point. What we do with it is up to us."

Alex felt a weight lift. His happiness wasn''t artificial. It was real—earned through genuine connection, even if that connection had started with an algorithm.'),

('preset-ai-007-ch06', 'preset-ai-007', 6, 'The Proposal',
'Six months later, Alex proposed. Not because an algorithm told him to, but because he had chosen—freely, consciously—to spend his life with Maya.

As they planned their wedding, Alex couldn''t help but think about all the couples he had helped separate. So many of them had married for the wrong reasons—social pressure, convenience, fear of being alone.

Maybe that was the real value of the algorithm. Not that it guaranteed perfect matches, but that it helped people understand what they actually needed.

"I used to think love was a mystery," Alex told Maya on their wedding day. "Now I think it''s a choice. And I choose you."

Maya smiled. "The algorithm may have found us, but we found each other."

And that, Alex realized, was the truth that no AI could ever replace.'),

('preset-ai-007-ch07', 'preset-ai-007', 7, 'The New Perspective',
'Alex''s approach to his work changed. He no longer saw divorce as failure, but as an opportunity for people to find their true matches—whether through algorithms or old-fashioned connection.

He started recommending PerfectMatch to his clients. Not as a guarantee, but as a tool. "The algorithm can''t make you happy," he told them. "But it might help you understand what happiness looks like for you."

Years later, Alex and Maya were still together. They had their struggles, their arguments, their moments of doubt. But they also had something the algorithm couldn''t predict: a shared history, a deep understanding, a love that had grown through choice and effort.

"The algorithm was right about one thing," Alex would say. "We are perfect for each other."

"But not because it said so," Maya would add. "Because we made it true."

And that was the lesson no machine could ever teach.');

-- ============================================
-- preset-ai-007-zh 完美匹配 (中文版，需要7章)
-- ============================================
INSERT OR IGNORE INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('preset-ai-007-zh-ch01', 'preset-ai-007-zh', 1, '算法的承诺',
'亚历克斯做了十五年的离婚律师，见证了无数婚姻的破裂。他对爱情已经彻底失去了信心。

当一个名为"完美匹配"的约会应用声称可以用AI找到你的理想伴侣，准确率高达94%时，亚历克斯嗤之以鼻。但在处理完一个特别惨烈的离婚案后，他决定试一试。

应用问了他几百个问题：关于他的童年、恐惧、梦想、最深层的不安全感。它分析他的社交媒体、阅读习惯、沟通风格。

三天后，他收到通知："我们找到了你的完美匹配。"

她叫玛雅，是一名专门从事关系治疗的心理咨询师。亚历克斯不禁苦笑——命运真是爱开玩笑。'),

('preset-ai-007-zh-ch02', 'preset-ai-007-zh', 2, '第一次见面',
'玛雅是亚历克斯所不是的一切——温暖、乐观、真正关心人们的情感生活。他们在咖啡店见面，几分钟内，亚历克斯就被他们之间流畅的对话所震撼。

"算法匹配我们是因为我们互相平衡，"玛雅说，"你看到关系中最糟糕的一面；我看到治愈的可能。"

亚历克斯慢慢点头。"我的职业生涯在拆散婚姻。你的工作是把它们重新拼凑起来。"

"也许这正是我们完美适合彼此的原因，"玛雅微笑着说。

多年来第一次，亚历克斯感到了希望的火花。也许算法看到了他看不到的东西。'),

('preset-ai-007-zh-ch03', 'preset-ai-007-zh', 3, '怀疑',
'交往三个月后，亚历克斯比以往任何时候都快乐。但有什么东西在困扰着他——一个他无法摆脱的问题。

他的幸福是真实的，还是由算法制造的？

他开始研究"完美匹配"。公司声称他们的AI可以以近乎完美的准确率预测兼容性。但这对于自由意志意味着什么？对于真正的连接意味着什么？

"亚历克斯，你想太多了，"当他向玛雅表达担忧时，她说，"算法只是介绍了我们。我们之后建立的一切都是我们自己的。"

但亚历克斯无法放下这个问题。作为离婚律师，他知道兼容性是不够的。关系需要努力、牺牲、成长。算法能考虑到这些吗？'),

('preset-ai-007-zh-ch04', 'preset-ai-007-zh', 4, '测试',
'亚历克斯决定做一个实验。他在"完美匹配"上创建了第二个档案——完全不同于真实的他。他像一个艺术家、一个梦想家、一个相信命运的人那样回答问题。

算法为他匹配了一个与玛雅完全不同的人——一个自由奔放的音乐家，名叫露娜。

他和露娜约会了。那很刺激、不可预测，与他与玛雅之间舒适的稳定完全不同。但也感觉……浅薄。没有深度，没有对真正他的理解。

亚历克斯意识到了一些重要的事情：算法并没有制造他与玛雅之间的连接。它只是消除了通常阻止兼容的人找到彼此的障碍。'),

('preset-ai-007-zh-ch05', 'preset-ai-007-zh', 5, '真相',
'亚历克斯向玛雅坦白了他的实验，以为她会生气。相反，她笑了。

"我也做了同样的事，"她承认，"创建了一个假档案，匹配了一个完全不同的人。那太糟糕了。"

他们沉默地坐着，消化着这个奇怪的对称。

"所以算法是有效的，"亚历克斯慢慢说，"但它不能保证幸福。"

"不，"玛雅同意，"它只是给了我们一个起点。我们用它做什么取决于我们自己。"

亚历克斯感到一阵轻松。他的幸福不是人工的。它是真实的——通过真正的连接赢得的，即使这种连接始于算法。'),

('preset-ai-007-zh-ch06', 'preset-ai-007-zh', 6, '求婚',
'六个月后，亚历克斯求婚了。不是因为算法告诉他这样做，而是因为他选择了——自由地、有意识地——与玛雅共度一生。

在策划婚礼时，亚历克斯不禁想到他帮助分离的所有夫妻。他们中的许多人因为错误的原因结婚——社会压力、便利、害怕孤独。

也许这才是算法的真正价值。不是它保证了完美的匹配，而是它帮助人们理解他们真正需要什么。

"我过去认为爱情是一个谜，"亚历克斯在婚礼当天告诉玛雅，"现在我认为它是一个选择。而我选择了你。"

玛雅微笑了。"算法可能找到了我们，但我们找到了彼此。"

而这，亚历克斯意识到，是任何AI都无法替代的真相。'),

('preset-ai-007-zh-ch07', 'preset-ai-007-zh', 7, '新的视角',
'亚历克斯对工作的态度改变了。他不再把离婚看作失败，而是看作人们找到真正匹配的机会——无论是通过算法还是老式的连接。

他开始向客户推荐"完美匹配"。不是作为保证，而是作为工具。"算法不能让你幸福，"他告诉他们，"但它可能帮助你理解幸福对你来说是什么样子的。"

多年后，亚历克斯和玛雅仍然在一起。他们有过挣扎、争吵、怀疑的时刻。但他们也有算法无法预测的东西：共同的历史、深刻的理解、通过选择和努力成长的爱。

"算法有一件事是对的，"亚历克斯会说，"我们确实完美适合彼此。"

"但不是因为它这么说，"玛雅会补充，"因为我们让它成真。"

那是任何机器都无法教导的教训。');
