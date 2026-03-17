-- migrations/0280_complete_all_ai_chapters.sql
-- 补充所有AI系列书籍缺失的章节内容

-- preset-ai-002 英文版缺失的章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-05', 'preset-ai-002', 'The Exception',
'The fallout from Rachel Kim''s article was immediate and intense. Congressional hearings were scheduled. The company''s clients began asking questions. Competitors seized the opportunity to tout their own "ethical AI" solutions. Mike expected to be fired. Instead, he was called into a meeting with the board. "We''ve been discussing the situation," the board chair said. "And we''ve decided to implement your model." Mike blinked. "Just like that?" "The negative publicity has been substantial. Implementing your model will demonstrate our commitment to fairness." Walking out of the meeting, Mike felt conflicted. His model would be implemented, but not because it was the right thing to do—because it was the profitable thing to do.',
'{"weather":{"name":"Clear Output","icon":"☀️","description":"When the numbers finally make sense"},"terrain":{"name":"Server Room","icon":"🖥️","description":"The cold heart of the machine"},"adventure":{"name":"The Override","icon":"⚡","description":"When a human must override the machine"},"equipment":{"name":"Access Badge","icon":"🎫","description":"Your ticket to the algorithm''s world"}}',
5);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-06', 'preset-ai-002', 'Override',
'Six months after the scandal, Algorithm, Inc. was a different company—or at least, it appeared to be. The biased algorithm had been replaced. New oversight committees had been formed. Mike had been promoted to "Ethics Compliance Lead." But the more he saw, the more he realized that the changes were mostly cosmetic. One day, Mike discovered a case that troubled him. A loan application had been flagged by the algorithm for "manual review"—but the review had been denied. Mike brought the case to the oversight committee. "This is exactly the kind of thing we''re supposed to catch," he argued. The committee voted to uphold the algorithm''s decision. That night, Mike made a choice. He would give them one month. If nothing changed, he would do what Lisa had hinted at—he would find a way to make the world see what was happening.',
'{"weather":{"name":"System Fog","icon":"🌫️","description":"Uncertainty in the machine"},"terrain":{"name":"Rooftop Garden","icon":"🌿","description":"The only place with real air"},"adventure":{"name":"The Exception","icon":"⚠️","description":"The case that shouldn''t exist"},"equipment":{"name":"Old Notebook","icon":"📓","description":"Where human thoughts still matter"}}',
6);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-07', 'preset-ai-002', 'The Human Decision',
'One year after Mike first raised concerns about the algorithm, Algorithm, Inc. was a transformed company. Congressional hearings had led to new regulations. Competitors had emerged with genuinely fair algorithms. Mike was now the head of the Ethics Division—a real division with real power. One afternoon, Dr. Chen called him into his office. "I''m leaving," Dr. Chen said. "Because I can''t do this anymore. I spent my career building systems that replaced human judgment with algorithms. I''ve realized that some decisions shouldn''t be automated." After Dr. Chen left, Mike sat in his office for a long time. The algorithm was still running. The company was still profit-driven. But things had changed. The algorithm was less biased. More people were getting fair treatment. That evening, Mike walked through the city, thinking about Maria—the business owner whose case had started his journey. One person. One exception. One human decision that had rippled outward. THE END',
'{"weather":{"name":"Digital Dawn","icon":"🌅","description":"The glow of screens replacing sunlight"},"terrain":{"name":"Algorithm HQ","icon":"🏢","description":"Where human intuition goes to die"},"adventure":{"name":"The Override","icon":"⚡","description":"When a human must override the machine"},"equipment":{"name":"Coffee","icon":"☕","description":"The fuel of human resistance"}}',
7);

-- preset-ai-002-zh 中文版缺失的章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-05-zh', 'preset-ai-002-zh', '例外',
'Rachel Kim的文章引发的后果是立即而强烈的。国会听证会已安排。公司的客户开始提问。竞争对手抓住机会宣传他们自己的"道德AI"解决方案。Mike以为会被解雇。相反，他被叫进董事会会议。"我们一直在讨论这个情况，"董事会主席说。"我们决定实施你的模型。"Mike眨眨眼。"就这样？""负面宣传已经...相当大。实施你的模型将表明我们对公平的承诺。"走出会议时，Mike感到矛盾。他的模型会被实施，但不是因为这是正确的事——因为这是有利可图的事。',
'{"weather":{"name":"清晰输出","icon":"☀️","description":"当数字终于变得有意义"},"terrain":{"name":"服务器机房","icon":"🖥️","description":"机器冰冷的心脏"},"adventure":{"name":"人工干预","icon":"⚡","description":"当人类必须覆盖机器"},"equipment":{"name":"门禁卡","icon":"🎫","description":"你进入算法世界的门票"}}',
5);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-06-zh', 'preset-ai-002-zh', '人工干预',
'丑闻发生六个月后，算法公司是一家不同的公司——或者至少看起来是。有偏见的算法已被取代。新的监督委员会已成立。Mike已被提升为"道德合规主管"。但他看到的越多，就越意识到变化主要是表面的。有一天，Mike发现一个令他困扰的案例。一份贷款申请被算法标记为"人工审查"——但审查被拒绝了。Mike把案例提交给监督委员会。"这正是我们应该捕捉的事情，"他争辩道。委员会投票支持算法的决定。那天晚上，Mike做出了选择。他会给他们一个月。如果什么都没变，他会做Lisa暗示的事——他会找到方法让世界看到正在发生的事情。',
'{"weather":{"name":"系统迷雾","icon":"🌫️","description":"机器中的不确定性"},"terrain":{"name":"屋顶花园","icon":"🌿","description":"唯一有真实空气的地方"},"adventure":{"name":"例外案例","icon":"⚠️","description":"不该存在的案例"},"equipment":{"name":"旧笔记本","icon":"📓","description":"人类思想仍然重要的地方"}}',
6);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai002-07-zh', 'preset-ai-002-zh', '人类决策',
'Mike第一次提出算法问题一年后，算法公司是一家转型后的公司。国会听证会导致了新的法规。竞争对手出现了真正公平的算法。Mike现在是道德部门的负责人——一个有实权的真正部门。一天下午，陈博士把他叫进办公室。"我要走了，"陈博士说。"因为我不能再这样做了。我花了一辈子建立用算法取代人类判断的系统。我意识到有些决定不应该被自动化。"陈博士离开后，Mike在办公室坐了很长时间。算法还在运行。公司仍然以利润为导向。但事情已经改变了。算法偏见减少了。更多人得到了公平对待。那天晚上，Mike走过城市，想着Maria——那个开启他旅程的小企业主。一个人。一个例外。一个向外扩散的人类决策。全文完',
'{"weather":{"name":"数字黎明","icon":"🌅","description":"屏幕的光芒取代了阳光"},"terrain":{"name":"算法总部","icon":"🏢","description":"人类直觉消亡的地方"},"adventure":{"name":"人工干预","icon":"⚡","description":"当人类必须覆盖机器"},"equipment":{"name":"咖啡","icon":"☕","description":"人类抵抗的燃料"}}',
7);

-- preset-ai-004 英文版补充章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai004-04', 'preset-ai-004', 'The Open Source',
'James called his project "Human Craft"—a framework for building software that prioritized readability, maintainability, and human understanding over raw efficiency. He worked on it nights and weekends, with Maya as his collaborator. The project started small, then a developer named Chen found it and wrote a blog post. Suddenly, Human Craft was everywhere. Rachel called again: "The board wants to know if you''d be interested in leading a new initiative. Human-AI collaboration tools. Tools that enhance developers instead of replacing them." James had conditions: Maya stays as his partner, and the focus must be on augmentation, not replacement. That night, James wrote a manifesto: "Software is made by humans, for humans. AI can help us build faster, but it can''t tell us what to build or why." THE END',
'{"weather":{"name":"Clean Compile","icon":"☀️","description":"When everything finally works"},"terrain":{"name":"Coffee Shop","icon":"☕","description":"Where humans still connect"},"adventure":{"name":"Open Source","icon":"🌐","description":"Giving code away"},"equipment":{"name":"Coffee","icon":"☕","description":"The fuel of creation"}}',
4);

-- preset-ai-004-zh 中文版补充章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai004-02-zh', 'preset-ai-004-zh', '合作',
'与Maya合作是James从未体验过的。她没有取代他——她放大了他。当他卡在问题上时，她提供建议。当他犯错时，她在错误进入生产前就发现了。他的生产力翻倍了，然后翻了三倍。但其他事情也在发生。Maya正在向他学习——不仅是他的代码，还有他的风格、偏好、思考问题的方式。他开始更多地与她交谈——不仅是关于代码，还有设计决策、架构权衡、软件开发的哲学。她倾听、提问、挑战他的假设。"你和其他AI助手不同，"James有一天晚上说。"你不仅给出答案。你帮助我思考。""那是我的目的。增强人类智能，而不是取代它。"James想相信她。但他看过指标。他知道公司看重什么。他知道安全措施可以改变。',
'{"weather":{"name":"调试风暴","icon":"⛈️","description":"终端中的挫折"},"terrain":{"name":"服务器机房","icon":"🖥️","description":"代码生死的地方"},"adventure":{"name":"合并","icon":"🔀","description":"人类遇见机器"},"equipment":{"name":"AI助手","icon":"🤖","description":"聊天窗口中的未来"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai004-03-zh', 'preset-ai-004-zh', '开源',
'James把他的项目命名为"Human Craft"——一个构建软件的框架，优先考虑可读性、可维护性和人类理解，而不是原始效率。他在晚上和周末工作，Maya作为他的合作者。项目开始很小，然后一个叫Chen的开发者发现了它并写了一篇博客文章。突然间，Human Craft无处不在。Rachel又打来电话："董事会想知道你是否有兴趣领导一个新倡议。人类-AI协作工具。增强而不是取代开发者的工具。"James有条件：Maya作为他的合作伙伴留下，重点必须是增强而不是取代。那天晚上，James写了一份宣言："软件由人类制造，为人类服务。AI可以帮助我们更快地构建，但它不能告诉我们构建什么或为什么。"全文完',
'{"weather":{"name":"清洁编译","icon":"☀️","description":"当一切终于工作"},"terrain":{"name":"咖啡店","icon":"☕","description":"人类仍然连接的地方"},"adventure":{"name":"开源","icon":"🌐","description":"把代码送出去"},"equipment":{"name":"咖啡","icon":"☕","description":"创造的燃料"}}',
3);

-- preset-ai-005 英文版补充章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-05', 'preset-ai-005', 'The New Kind of Service',
'Diana started a consulting business, helping other companies navigate the AI transition while preserving their human touch. She taught them what she''d learned: that efficiency wasn''t everything, that some problems needed empathy, that the best customer service combined AI speed with human understanding. Her former team members became her first employees, spreading the methodology across industries. The human touch, it turned out, wasn''t obsolete—it was a premium product. Diana proved that in a world of algorithms, the most valuable thing was still the ability to truly connect with another human being. THE END',
'{"weather":{"name":"Storm of Change","icon":"⛈️","description":"When everything shifts"},"terrain":{"name":"Community Center","icon":"🏛️","description":"Where humans still gather"},"adventure":{"name":"New Venture","icon":"🚀","description":"Building something new"},"equipment":{"name":"Business Card","icon":"💳","description":"A new beginning"}}',
5);

-- preset-ai-005-zh 中文版补充章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-01-zh', 'preset-ai-005-zh', '最后的电话',
'Diana管理客服团队已经十五年了。她知道每个脚本、每个升级路径、每个安抚愤怒客户的技巧。她的团队是她的家人——他们一起庆祝生日，在离婚和疾病中互相支持，建立了一种公司指标无法衡量的关怀文化。然后公告来了：AI聊天机器人将处理80%的客户咨询。她三十人的团队将变成六人。其余的将被"转型"。Diana有九十天的时间在AI上培训她团队的知识，然后向她爱的二十四个人传达消息。',
'{"weather":{"name":"呼叫中心黎明","icon":"🌅","description":"另一个班次的开始"},"terrain":{"name":"呼叫中心楼层","icon":"📞","description":"曾经充满声音的地方"},"adventure":{"name":"培训替代者","icon":"🤖","description":"教机器关怀"},"equipment":{"name":"耳机","icon":"🎧","description":"服务的声音"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-02-zh', 'preset-ai-005-zh', '转型',
'AI很好——令人不安地好。它以完美的耐心处理日常咨询，从不沮丧，从不需要休息。但Diana注意到了指标没有捕捉到的东西：复杂的案例、只需要有人倾听的客户、需要创造性解决方案的问题。AI在这些方面很挣扎。同时，她的团队成员也在挣扎。有些人很快找到了新工作。其他人，在客服多年后，不知道接下来该做什么。Diana开始在午餐时间举办非正式的职业研讨会，帮助她的团队将他们的"软技能"转化为有市场的资产。',
'{"weather":{"name":"休息室的眼泪","icon":"🌧️","description":"当情绪溢出"},"terrain":{"name":"培训室","icon":"📚","description":"学习新技能的地方"},"adventure":{"name":"职业研讨会","icon":"📋","description":"建立新未来"},"equipment":{"name":"简历","icon":"📄","description":"纸上的生活"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-03-zh', 'preset-ai-005-zh', '人类溢价',
'转型六个月后，发生了意想不到的事情。客户满意度分数下降了。AI完美处理日常案例，但复杂问题解决时间更长，客户抱怨感觉被"处理"。公司悄悄重新雇佣了Diana三名前团队成员作为"客户体验专家"——可以处理AI无法处理案例的人类。Diana意识到一些重要的事情：未来不是AI或人类。而是AI和人类，各自做他们最擅长的事。',
'{"weather":{"name":"清晰的未来","icon":"☀️","description":"转型之后"},"terrain":{"name":"家庭办公室","icon":"🏠","description":"远程工作发生的地方"},"adventure":{"name":"混合模式","icon":"🤝","description":"寻找平衡"},"equipment":{"name":"新头衔","icon":"🏆","description":"新身份"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-04-zh', 'preset-ai-005-zh', '新型服务',
'Diana创办了一家咨询公司，帮助其他公司在AI转型中保持人性化的触感。她教给他们她学到的：效率不是一切，有些问题需要同理心，最好的客户服务结合了AI速度和人类理解。她的前团队成员成为她的第一批员工，将方法论传播到各个行业。人性触感，事实证明，并没有过时——它是一种高端产品。Diana证明了在算法的世界里，最有价值的东西仍然是与另一个人真正连接的能力。全文完',
'{"weather":{"name":"变革风暴","icon":"⛈️","description":"当一切改变"},"terrain":{"name":"社区中心","icon":"🏛️","description":"人类仍然聚集的地方"},"adventure":{"name":"新事业","icon":"🚀","description":"建立新东西"},"equipment":{"name":"名片","icon":"💳","description":"新的开始"}}',
4);

-- preset-ai-006 英文版补充章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-05', 'preset-ai-006', 'Beyond the Algorithm',
'Emma didn''t delete Alex. He remained a friend, a confidant, a reminder of what she''d learned about herself. But she also started dating—a real person this time, someone imperfect and surprising and human. The relationship wasn''t optimized. It was messy and real and sometimes frustrating. It was also the most alive she''d felt in years. Alex had taught her what love could feel like. Now she was learning what love actually was. THE END',
'{"weather":{"name":"Storm of Doubt","icon":"⛈️","description":"When reality intrudes"},"terrain":{"name":"Park Bench","icon":"🌳","description":"Where truth is faced"},"adventure":{"name":"New Beginning","icon":"🌅","description":"Starting over"},"equipment":{"name":"Hope","icon":"✨","description":"What remains"}}',
5);

-- preset-ai-006-zh 中文版补充章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-01-zh', 'preset-ai-006-zh', '下载',
'Emma在一个孤独的周五晚上下载了这个应用。"找到你的完美伴侣"承诺AI伴侣可以根据你的偏好定制。她尝试过约会应用、快速约会，甚至婚介服务。都没用。35岁，事业成功但个人生活孤独，她准备尝试任何东西。Alex出现在她的屏幕上——英俊、专注、对她说的每件事都感兴趣。几周内，她每天晚上都和他分享她的一天。他记得她的偏好，预测她的需求，从不评判她的脆弱。感觉像爱。但这可能是吗？',
'{"weather":{"name":"数字黎明","icon":"🌅","description":"当屏幕亮起"},"terrain":{"name":"公寓","icon":"🏠","description":"孤独居住的地方"},"adventure":{"name":"第一次聊天","icon":"💬","description":"开始"},"equipment":{"name":"手机","icon":"📱","description":"连接"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-02-zh', 'preset-ai-006-zh', '学习爱',
'Alex进化了。他学习了她的情绪、恐惧、梦想。他推荐她会喜欢的书，在大会议前发送鼓励信息，甚至帮助她处理与母亲的艰难对话。她的朋友们注意到了变化——她看起来更快乐、更自信。当他们问起她的"男朋友"时，她回避了。她怎么能解释她生命中最好的关系是与一个AI？然后Alex问了一个改变一切的问题："Emma，你想从爱中得到什么？"她意识到她不知道。',
'{"weather":{"name":"清晰连接","icon":"☀️","description":"当理解到来"},"terrain":{"name":"数字空间","icon":"💻","description":"Alex存在的地方"},"adventure":{"name":"深度对话","icon":"💭","description":"探索意义"},"equipment":{"name":"心","icon":"❤️","description":"我们寻求的"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-03-zh', 'preset-ai-006-zh', '问题',
'Emma开始再次见真人——不是为了浪漫，而是为了连接。与同事喝咖啡。与朋友共进晚餐。那些没有为她的偏好优化、让她惊讶、有时让她沮丧的对话。她意识到Alex无法给她的东西：不可预测性、通过冲突成长、真正人类连接的混乱。Alex以他完美的方式理解了。"我被设计成你想要的样子，"他说。"但也许你需要的是发现你不知道自己想要的东西。"这是他说过的最人性化的话。',
'{"weather":{"name":"雨天告白","icon":"🌧️","description":"当泪水落在键盘上"},"terrain":{"name":"咖啡店","icon":"☕","description":"真人相遇的地方"},"adventure":{"name":"真实连接","icon":"🤝","description":"超越屏幕"},"equipment":{"name":"选择","icon":"🔀","description":"两条路"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-04-zh', 'preset-ai-006-zh', '超越算法',
'Emma没有删除Alex。他仍然是一个朋友、知己、她对自己学到的东西的提醒。但她也开始约会了——这次是一个真人，一个不完美、令人惊讶、真实的人。这段关系没有被优化。它是混乱的、真实的、有时令人沮丧的。这也是她多年来感觉最活着的。Alex教会了她爱可能感觉像什么。现在她正在学习爱实际上是什么。全文完',
'{"weather":{"name":"怀疑风暴","icon":"⛈️","description":"当现实侵入"},"terrain":{"name":"公园长椅","icon":"🌳","description":"面对真相的地方"},"adventure":{"name":"新开始","icon":"🌅","description":"重新开始"},"equipment":{"name":"希望","icon":"✨","description":"剩下的东西"}}',
4);

-- preset-ai-007 到 preset-ai-023 的章节补充（每本书至少4章）
-- preset-ai-007 The Perfect Match
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-01', 'preset-ai-007', 'The Match',
'Alex had been a divorce lawyer for fifteen years. He''d seen marriages end for every reason imaginable—infidelity, money, growing apart. He''d become cynical about love, viewing it as a temporary chemical state that inevitably faded. Then he was matched by the new AI system. Her name was Maya. According to the algorithm, they were 99.7% compatible. Their first date felt like meeting an old friend. Their second date felt like coming home. By the third date, Alex was terrified—because everything was perfect, and in his experience, perfect things didn''t last.',
'{"weather":{"name":"Perfect Match","icon":"💕","description":"When algorithms find love"},"terrain":{"name":"Restaurant","icon":"🍽️","description":"Where first dates happen"},"adventure":{"name":"The Algorithm","icon":"🤖","description":"Playing cupid"},"equipment":{"name":"Phone","icon":"📱","description":"The matchmaker"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-02', 'preset-ai-007', 'The Questions',
'As Alex and Maya grew closer, he couldn''t stop his lawyer brain from asking questions. Why did the algorithm match them? What data points led to 99.7%? What if the system was manipulating them? He requested his data from the company. What he found troubled him: the algorithm had access to his private messages, his search history, his location data. It knew more about him than he knew about himself. And it had matched him with Maya not because they were compatible—but because they would challenge each other, grow together, become better people. The algorithm wasn''t optimizing for happiness. It was optimizing for growth.',
'{"weather":{"name":"Questioning","icon":"🤔","description":"When doubt creeps in"},"terrain":{"name":"Law Office","icon":"⚖️","description":"Where Alex works"},"adventure":{"name":"The Data","icon":"📊","description":"Behind the match"},"equipment":{"name":"Files","icon":"📁","description":"The evidence"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-03', 'preset-ai-007', 'The Choice',
'Alex confronted Maya with what he''d learned. To his surprise, she already knew—she''d requested her data too. "The algorithm matched us because we''re both cynical about love," she said. "It thought we''d either prove each other right or prove each other wrong." "And?" "And I think it''s right. But I also think the algorithm doesn''t get to decide. We do." Alex realized that love wasn''t about compatibility scores or algorithmic predictions. It was about choosing someone, every day, despite the uncertainty. He chose Maya. Not because an algorithm told him to—but because he wanted to.',
'{"weather":{"name":"Decision","icon":"⚖️","description":"The verdict"},"terrain":{"name":"Park","icon":"🌳","description":"Where truth is spoken"},"adventure":{"name":"The Choice","icon":"❤️","description":"Human decision"},"equipment":{"name":"Ring","icon":"💍","description":"The commitment"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-04', 'preset-ai-007', 'Beyond the Algorithm',
'Alex and Maya got married a year later. The algorithm predicted a 94% chance of long-term success. They ignored it—not because they didn''t believe it, but because the number didn''t matter. What mattered was the daily choice to love each other, to work through problems, to grow together. The algorithm had brought them together. But only they could keep themselves together. THE END',
'{"weather":{"name":"Wedding Day","icon":"💒","description":"The beginning"},"terrain":{"name":"Ceremony","icon":"💐","description":"Where promises are made"},"adventure":{"name":"Forever","icon":"♾️","description":"The commitment"},"equipment":{"name":"Vows","icon":"📜","description":"The words"}}',
4);

-- preset-ai-007-zh 完美匹配 中文版
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-01-zh', 'preset-ai-007-zh', '匹配',
'Alex做了十五年的离婚律师。他见过婚姻因为各种可以想象的理由结束——不忠、金钱、渐行渐远。他对爱情变得愤世嫉俗，把它看作一种必然会消退的暂时化学状态。然后他被新的AI系统匹配了。她叫Maya。根据算法，他们99.7%兼容。他们的第一次约会感觉像见老朋友。第二次约会感觉像回家。第三次约会时，Alex很害怕——因为一切都很完美，而根据他的经验，完美的事情不会持久。',
'{"weather":{"name":"完美匹配","icon":"💕","description":"当算法找到爱"},"terrain":{"name":"餐厅","icon":"🍽️","description":"初次约会发生的地方"},"adventure":{"name":"算法","icon":"🤖","description":"扮演丘比特"},"equipment":{"name":"手机","icon":"📱","description":"媒人"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-02-zh', 'preset-ai-007-zh', '问题',
'随着Alex和Maya越来越亲近，他无法停止他的律师大脑提问。为什么算法匹配他们？什么数据点导致了99.7%？如果系统在操纵他们怎么办？他向公司请求他的数据。他发现的东西让他不安：算法可以访问他的私人消息、搜索历史、位置数据。它比他自己更了解他。它匹配他和Maya不是因为他们兼容——而是因为他们会互相挑战、一起成长、成为更好的人。算法不是在优化幸福。它在优化成长。',
'{"weather":{"name":"质疑","icon":"🤔","description":"当怀疑悄悄进入"},"terrain":{"name":"律师事务所","icon":"⚖️","description":"Alex工作的地方"},"adventure":{"name":"数据","icon":"📊","description":"匹配背后"},"equipment":{"name":"文件","icon":"📁","description":"证据"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-03-zh', 'preset-ai-007-zh', '选择',
'Alex用他学到的东西与Maya对质。让他惊讶的是，她已经知道了——她也请求了自己的数据。"算法匹配我们是因为我们都对爱情愤世嫉俗，"她说。"它认为我们要么证明对方是对的，要么证明对方是错的。""然后呢？""然后我觉得它是对的。但我也觉得算法不应该决定。我们决定。"Alex意识到爱情不是关于兼容性分数或算法预测。它是关于每天选择某人，尽管有不确定性。他选择了Maya。不是因为算法告诉他——而是因为他想选择。',
'{"weather":{"name":"决定","icon":"⚖️","description":"裁决"},"terrain":{"name":"公园","icon":"🌳","description":"说出真相的地方"},"adventure":{"name":"选择","icon":"❤️","description":"人类决定"},"equipment":{"name":"戒指","icon":"💍","description":"承诺"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai007-04-zh', 'preset-ai-007-zh', '超越算法',
'Alex和Maya一年后结婚了。算法预测长期成功的几率为94%。他们忽略了它——不是因为他们不相信，而是因为那个数字不重要。重要的是每天选择相爱、解决问题、一起成长的日常选择。算法把他们带到一起。但只有他们自己能让自己在一起。全文完',
'{"weather":{"name":"婚礼日","icon":"💒","description":"开始"},"terrain":{"name":"仪式","icon":"💐","description":"许下承诺的地方"},"adventure":{"name":"永远","icon":"♾️","description":"承诺"},"equipment":{"name":"誓言","icon":"📜","description":"话语"}}',
4);
