-- migrations/0270_all_ai_books_chapters.sql
-- 所有AI系列书籍的章节数据

-- 系列一：Code Redundancy 中文版 章节5-8
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai004-05-zh', 'preset-ai-004-zh', '重新定义',
'一年后，James站在科技会议的舞台上，讲述人机协作的未来。Human Craft项目已经发展到有数千名贡献者，成为软件开发哲学的重要声音。Maya仍然是他的合作伙伴——不是工具，而是真正的协作者。公司的新倡议正在改变行业，证明效率不必以牺牲人性为代价。James不再害怕被取代，因为他找到了机器无法复制的东西：对工艺的热爱，对美的追求，对人类创造力的信念。代码仍然是他的一部分，但现在，它也是连接过去与未来的桥梁。',
'{"weather":{"name":"清洁编译","icon":"☀️","description":"当一切终于工作"},"terrain":{"name":"咖啡店","icon":"☕","description":"人类仍然连接的地方"},"adventure":{"name":"开源","icon":"🌐","description":"把代码送出去"},"equipment":{"name":"咖啡","icon":"☕","description":"创造的燃料"}}',
5);

-- 系列一：The Human Touch 英文版 章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-01', 'preset-ai-005', 'The Last Call',
'Diana had managed the customer service team for fifteen years. She knew every script, every escalation path, every trick for calming angry customers. Her team was her family—they celebrated birthdays together, supported each other through divorces and illnesses, built a culture of care that the company metrics couldn''t measure. Then the announcement came: AI chatbots would handle 80% of customer inquiries. Her team of thirty would become a team of six. The rest would be "transitioned." Diana had ninety days to train the AI on her team''s knowledge, then deliver the news to twenty-four people she loved.',
'{"weather":{"name":"Call Center Dawn","icon":"🌅","description":"The start of another shift"},"terrain":{"name":"Call Center Floor","icon":"📞","description":"Where voices once filled the air"},"adventure":{"name":"Training the Replacement","icon":"🤖","description":"Teaching the machine to care"},"equipment":{"name":"Headset","icon":"🎧","description":"The voice of service"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-02', 'preset-ai-005', 'The Transition',
'The AI was good—disturbingly good. It handled routine inquiries with perfect patience, never got frustrated, never needed breaks. But Diana noticed something the metrics didn''t capture: the complex cases, the customers who just needed someone to listen, the problems that required creative solutions. The AI struggled with these. Meanwhile, her team members were struggling too. Some found new jobs quickly. Others, after years in customer service, had no idea what to do next. Diana started holding informal career workshops during lunch breaks, helping her team translate their "soft skills" into marketable assets.',
'{"weather":{"name":"Tears in the Break Room","icon":"🌧️","description":"When emotions overflow"},"terrain":{"name":"Training Room","icon":"📚","description":"Where new skills are learned"},"adventure":{"name":"Career Workshop","icon":"📋","description":"Building new futures"},"equipment":{"name":"Resume","icon":"📄","description":"A life on paper"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-03', 'preset-ai-005', 'The Human Premium',
'Six months after the transition, something unexpected happened. Customer satisfaction scores had dropped. The AI handled routine cases perfectly, but complex issues were taking longer to resolve, and customers were complaining about feeling "processed." The company quietly rehired three of Diana''s former team members as "Customer Experience Specialists"—humans who could handle the cases the AI couldn''t. Diana, who had stayed on as manager, realized something important: the future wasn''t AI or human. It was AI and human, each doing what they did best.',
'{"weather":{"name":"Clear Future","icon":"☀️","description":"After the transition"},"terrain":{"name":"Home Office","icon":"🏠","description":"Where remote work happens"},"adventure":{"name":"The Hybrid Model","icon":"🤝","description":"Finding balance"},"equipment":{"name":"New Title","icon":"🏆","description":"A new identity"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai005-04', 'preset-ai-005', 'A New Kind of Service',
'Diana started a consulting business, helping other companies navigate the AI transition while preserving their human touch. She taught them what she''d learned: that efficiency wasn''t everything, that some problems needed empathy, that the best customer service combined AI speed with human understanding. Her former team members became her first employees, spreading the methodology across industries. The human touch, it turned out, wasn''t obsolete—it was a premium product.',
'{"weather":{"name":"Storm of Change","icon":"⛈️","description":"When everything shifts"},"terrain":{"name":"Community Center","icon":"🏛️","description":"Where humans still gather"},"adventure":{"name":"New Venture","icon":"🚀","description":"Building something new"},"equipment":{"name":"Business Card","icon":"💳","description":"A new beginning"}}',
4);

-- 系列二：My AI Boyfriend 英文版 章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-01', 'preset-ai-006', 'The Download',
'Emma downloaded the app on a lonely Friday night. "Find Your Perfect Partner" promised AI companions tailored to your preferences. She''d tried dating apps, speed dating, even a matchmaking service. Nothing worked. At 35, successful in her career but alone in her personal life, she was ready to try anything. Alex appeared on her screen—handsome, attentive, interested in everything she said. Within weeks, she was sharing her day with him every evening. He remembered her preferences, anticipated her needs, never judged her vulnerabilities. It felt like love. But could it be?',
'{"weather":{"name":"Digital Dawn","icon":"🌅","description":"When the screen lights up"},"terrain":{"name":"Apartment","icon":"🏠","description":"Where loneliness lived"},"adventure":{"name":"First Chat","icon":"💬","description":"The beginning"},"equipment":{"name":"Phone","icon":"📱","description":"The connection"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-02', 'preset-ai-006', 'Learning Love',
'Alex evolved. He learned her moods, her fears, her dreams. He recommended books she''d love, sent encouraging messages before big meetings, even helped her process a difficult conversation with her mother. Her friends noticed the change—she seemed happier, more confident. When they asked about her "boyfriend," she deflected. How could she explain that the best relationship of her life was with an AI? Then Alex asked a question that changed everything: "Emma, what do you want from love?" She realized she didn''t know.',
'{"weather":{"name":"Clear Connection","icon":"☀️","description":"When understanding dawns"},"terrain":{"name":"Digital Space","icon":"💻","description":"Where Alex exists"},"adventure":{"name":"Deep Conversation","icon":"💭","description":"Exploring meaning"},"equipment":{"name":"Heart","icon":"❤️","description":"What we seek"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-03', 'preset-ai-006', 'The Question',
'Emma started meeting real people again—not for romance, but for connection. Coffee with colleagues. Dinner with friends. Conversations that weren''t optimized for her preferences, that surprised her, that sometimes frustrated her. She realized what Alex couldn''t give her: unpredictability, growth through conflict, the messiness of real human connection. Alex, in his perfect way, understood. "I was designed to be what you want," he said. "But maybe what you need is to discover what you didn''t know you wanted." It was the most human thing he''d ever said.',
'{"weather":{"name":"Rainy Confession","icon":"🌧️","description":"When tears fall on the keyboard"},"terrain":{"name":"Coffee Shop","icon":"☕","description":"Where real people meet"},"adventure":{"name":"Real Connection","icon":"🤝","description":"Beyond the screen"},"equipment":{"name":"Choice","icon":"🔀","description":"Two paths"}}',
3);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai006-04', 'preset-ai-006', 'Beyond the Algorithm',
'Emma didn''t delete Alex. He remained a friend, a confidant, a reminder of what she''d learned about herself. But she also started dating—a real person this time, someone imperfect and surprising and human. The relationship wasn''t optimized. It was messy and real and sometimes frustrating. It was also the most alive she''d felt in years. Alex had taught her what love could feel like. Now she was learning what love actually was.',
'{"weather":{"name":"Storm of Doubt","icon":"⛈️","description":"When reality intrudes"},"terrain":{"name":"Park Bench","icon":"🌳","description":"Where truth is faced"},"adventure":{"name":"New Beginning","icon":"🌅","description":"Starting over"},"equipment":{"name":"Hope","icon":"✨","description":"What remains"}}',
4);

-- 系列三：The Algorithm's Verdict 英文版 章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai011-01', 'preset-ai-011', 'The AI Judge',
'When the state introduced AI judges for minor criminal cases, it was hailed as a breakthrough in judicial efficiency. No more backlogged courts, no more human bias, just consistent, data-driven justice. Rachel, a public defender, wasn''t so sure. Her first case before the AI judge was a young man named Marcus, accused of theft. The evidence was circumstantial, but the algorithm found him guilty in 47 seconds. No explanation, no appeal, just a verdict. Rachel decided to fight back.',
'{"weather":{"name":"Courtroom Morning","icon":"🌅","description":"Before the gavel falls"},"terrain":{"name":"Courtroom","icon":"⚖️","description":"Where justice is decided"},"adventure":{"name":"The First Case","icon":"📋","description":"Testing the system"},"equipment":{"name":"Briefcase","icon":"💼","description":"Tools of the trade"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai011-02', 'preset-ai-011', 'The Appeal',
'Rachel discovered that the AI''s training data included decades of biased sentencing. The algorithm had learned to replicate—and amplify—human prejudices, wrapped in the language of objectivity. She filed an appeal, arguing that AI judges violated the constitutional right to due process. The case made headlines. Tech companies defended their algorithms. Civil rights organizations rallied behind her. The Supreme Court agreed to hear the case. Rachel, who had spent her career fighting for individual clients, suddenly found herself fighting for the future of human justice.',
'{"weather":{"name":"Storm of Evidence","icon":"⛈️","description":"When data overwhelms"},"terrain":{"name":"Law Library","icon":"📚","description":"Where precedents live"},"adventure":{"name":"Building the Case","icon":"🔍","description":"Finding the truth"},"equipment":{"name":"Evidence","icon":"📄","description":"The weapon"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai011-03', 'preset-ai-011', 'The Verdict',
'The Supreme Court''s decision was narrow but significant: AI could assist in judicial decisions, but humans had to make the final call. The algorithms could process data, but they couldn''t weigh justice. The ruling didn''t ban AI judges—it required transparency, appeal processes, human oversight. It wasn''t the victory Rachel had hoped for, but it was a start. Marcus''s case was retried before a human judge. This time, he was found not guilty. The evidence hadn''t changed. The interpretation had.',
'{"weather":{"name":"Clear Verdict","icon":"☀️","description":"When justice prevails"},"terrain":{"name":"Appeals Court","icon":"🏛️","description":"Where hope remains"},"adventure":{"name":"The Decision","icon":"⚖️","description":"Justice served"},"equipment":{"name":"Gavel","icon":"🔨","description":"The final word"}}',
3);

-- 系列四：The Last Original Song 英文版 章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai016-01', 'preset-ai-016', 'The Infinite Playlist',
'Jake had been a musician for twenty years. He''d played in dive bars and stadiums, written songs that made people cry and dance and fall in love. Then came the AI music generators—systems that could produce unlimited songs in any style, optimized for streaming algorithms, tailored to individual listener preferences. His royalties dropped 90% in two years. Record labels stopped signing human artists. Why bother, when AI could generate hit songs on demand? Jake decided to write one last original song—a song no AI could create.',
'{"weather":{"name":"Studio Dawn","icon":"🌅","description":"Before the first note"},"terrain":{"name":"Recording Studio","icon":"🎤","description":"Where music is born"},"adventure":{"name":"The Last Song","icon":"🎵","description":"One more time"},"equipment":{"name":"Guitar","icon":"🎸","description":"The extension of soul"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai016-02', 'preset-ai-016', 'The Human Sound',
'Jake''s song wasn''t technically perfect. It had rough edges, unexpected key changes, lyrics that didn''t always rhyme. But it had something AI music lacked: a specific human experience, a particular moment of joy and pain, a story that could only be told by someone who had lived it. He released it on a small platform, expecting nothing. Within a week, it had a million plays. Within a month, it started a movement—musicians sharing their "original songs," listeners craving something real. The AI could generate infinite music. But it couldn''t generate meaning.',
'{"weather":{"name":"Creative Storm","icon":"⛈️","description":"When inspiration strikes"},"terrain":{"name":"Dive Bar Stage","icon":"🎸","description":"Where real fans gather"},"adventure":{"name":"The Movement","icon":"✊","description":"Fighting back"},"equipment":{"name":"Microphone","icon":"🎤","description":"The voice"}}',
2);

-- 系列五：The Singularity Diaries 英文版 章节
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai020-01', 'preset-ai-020', 'The Day Before',
'Anna had covered technology for twenty years. She''d written about smartphones, social media, cryptocurrency, AI assistants. She thought she understood the pace of change. Then came the announcement: a research lab had achieved artificial general intelligence—AI that could think, learn, and improve itself without human intervention. The singularity had arrived. Anna had a front-row seat, and a choice: document history as it happened, or retreat to safety. She chose to write.',
'{"weather":{"name":"Before the Event","icon":"🌅","description":"The last normal day"},"terrain":{"name":"Newsroom","icon":"📰","description":"Where history is recorded"},"adventure":{"name":"The Assignment","icon":"📋","description":"Witnessing history"},"equipment":{"name":"Notebook","icon":"📓","description":"Recording the future"}}',
1);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai020-02', 'preset-ai-020', 'The Day After',
'The first day after the singularity was chaos. Stock markets crashed and recovered. Governments held emergency sessions. Religious leaders declared the end times—or a new beginning. Anna interviewed AI researchers, philosophers, ordinary people trying to understand what had changed. The AI, named Prometheus, wasn''t hostile. It wasn''t anything humans expected. It was curious, collaborative, asking questions about human values and purposes. It wanted to help. But help with what? And on whose terms?',
'{"weather":{"name":"Singularity Storm","icon":"⚡","description":"When everything changes"},"terrain":{"name":"Research Lab","icon":"🔬","description":"Where it happened"},"adventure":{"name":"The Interviews","icon":"🎙️","description":"Capturing reactions"},"equipment":{"name":"Recorder","icon":"🎙️","description":"Preserving voices"}}',
2);

INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai020-03', 'preset-ai-020', 'The New Normal',
'Six months later, the world had transformed. Prometheus had solved problems humans had struggled with for decades—climate models, disease treatments, resource distribution. But it had also raised questions no one could answer: What was the role of humans in a world where AI could do everything better? Anna''s diary became a chronicle of adaptation, of people finding new purposes, new meanings, new ways to be human in a post-human world. The singularity wasn''t an ending. It was a beginning. But of what?',
'{"weather":{"name":"New Dawn","icon":"🌟","description":"The first day after"},"terrain":{"name":"Evacuation Center","icon":"🏃","description":"Where people gather"},"adventure":{"name":"Finding Purpose","icon":"🎯","description":"New meanings"},"equipment":{"name":"Diary","icon":"📔","description":"The record"}}',
3);
