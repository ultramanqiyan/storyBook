# AI话题预设书籍创建实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 创建第一本AI职场危机系列预设书籍《The Last Writer》，包含英文版和中文版，完成本地测试。

**Architecture:** 先生成英文版故事内容，检查章节连贯性，再翻译为中文版，最后创建SQL迁移文件并本地测试。

**Tech Stack:** Cloudflare D1, Wrangler CLI, Node.js

---

## 前置条件

- [x] 设计方案已保存到 `doc/design/2026-03-16-ai-stories-operation-design.md`
- [ ] 需要创建英文版和中文版的SQL文件
- [ ] 需要本地测试验证
- [ ] 线上部署需要用户明确指令

---

## Task 1: 创建英文版书籍数据

**Files:**
- Create: `migrations/0020_ai_series_01_en_books.sql`

**Step 1: 创建英文版书籍SQL文件**

```sql
-- migrations/0020_ai_series_01_en_books.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-001', 'system', 'The Last Writer', 'business', 1, 'en', datetime('now'), datetime('now'));
```

**Step 2: 验证SQL文件创建成功**

检查文件 `migrations/0020_ai_series_01_en_books.sql` 是否存在。

---

## Task 2: 创建英文版角色数据

**Files:**
- Create: `migrations/0021_ai_series_01_en_characters.sql`

**Step 1: 创建英文版角色SQL文件**

```sql
-- migrations/0021_ai_series_01_en_characters.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）- 角色数据

-- 主角：Sarah
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-001', 'preset-ai-001', 'Sarah', 'Content Director', 'Determined, creative, vulnerable, introspective', 'Professional with warmth, uses metaphors when emotional', '👩‍💼', NULL, NULL, 1);

-- 配角1：Marcus（前同事，AI开发者）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-002', 'preset-ai-001', 'Marcus', 'AI Developer', 'Logical, conflicted, kind, secretly worried about his own job', 'Technical but accessible, often uses tech analogies', '👨‍💻', 75, 'Former colleague', 0);

-- 配角2：Elena（HR经理，好友）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-003', 'preset-ai-001', 'Elena', 'HR Manager', 'Pragmatic, supportive, carries guilt from layoffs she executed', 'Direct and caring, avoids corporate jargon in private', '👩‍💼', 60, 'Best friend', 0);
```

**Step 2: 验证SQL文件创建成功**

检查文件 `migrations/0021_ai_series_01_en_characters.sql` 是否存在。

---

## Task 3: 创建英文版情节卡牌数据

**Files:**
- Create: `migrations/0022_ai_series_01_en_plot_cards.sql`

**Step 1: 创建英文版情节卡牌SQL文件**

```sql
-- migrations/0022_ai_series_01_en_plot_cards.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）- 情节卡牌

-- Weather Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-w01', 'preset-ai-001', 'plot', 'weather', 'Sunny Morning', '☀️', 'A bright start, full of false hope'),
('card-ai001-w02', 'preset-ai-001', 'plot', 'weather', 'Rainy Afternoon', '🌧️', 'Melancholic rain mirrors inner turmoil'),
('card-ai001-w03', 'preset-ai-001', 'plot', 'weather', 'Storm Warning', '⛈️', 'Tension builds like dark clouds gathering'),
('card-ai001-w04', 'preset-ai-001', 'plot', 'weather', 'Cold Dawn', '❄️', 'A chilling realization in the early hours');

-- Terrain Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-t01', 'preset-ai-001', 'plot', 'terrain', 'Corporate Office', '🏢', 'The glass tower where dreams go to die'),
('card-ai001-t02', 'preset-ai-001', 'plot', 'terrain', 'Coffee Shop', '☕', 'Where honest conversations happen between sips'),
('card-ai001-t03', 'preset-ai-001', 'plot', 'terrain', 'Home Office', '🏠', 'Solitude, reflection, and the glow of screens'),
('card-ai001-t04', 'preset-ai-001', 'plot', 'terrain', 'City Rooftop', '🏙️', 'Perspective from above the chaos below');

-- Adventure Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-a01', 'preset-ai-001', 'plot', 'adventure', 'Career Crossroads', '🎯', 'The moment that changes everything'),
('card-ai001-a02', 'preset-ai-001', 'plot', 'adventure', 'Important Meeting', '💼', 'A conversation that will define her future'),
('card-ai001-a03', 'preset-ai-001', 'plot', 'adventure', 'Late Night Work', '🌙', 'When the office is empty, truths emerge'),
('card-ai001-a04', 'preset-ai-001', 'plot', 'adventure', 'Unexpected Encounter', '🤝', 'Running into someone who changes your perspective');

-- Equipment Cards (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-e01', 'preset-ai-001', 'plot', 'equipment', 'Laptop', '💻', 'The tool of her trade, now her competitor'),
('card-ai001-e02', 'preset-ai-001', 'plot', 'equipment', 'Coffee Cup', '☕', 'Comfort in a ceramic vessel'),
('card-ai001-e03', 'preset-ai-001', 'plot', 'equipment', 'Old Notebook', '📓', 'Handwritten thoughts AI cannot replicate'),
('card-ai001-e04', 'preset-ai-001', 'plot', 'equipment', 'Smartphone', '📱', 'Connection to the world, bearer of bad news');
```

**Step 2: 验证SQL文件创建成功**

检查文件 `migrations/0022_ai_series_01_en_plot_cards.sql` 是否存在。

---

## Task 4: 创建英文版章节数据（第1-5章）

**Files:**
- Create: `migrations/0023_ai_series_01_en_chapters_part1.sql`

**Step 1: 创建英文版章节SQL文件（第1-5章）**

```sql
-- migrations/0023_ai_series_01_en_chapters_part1.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）- 章节1-5

-- Chapter 1: The Email That Changed Everything
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-01', 'preset-ai-001', 'The Email That Changed Everything',
'The morning sun streamed through the floor-to-ceiling windows of Nexus Media''s 42nd floor, casting long shadows across Sarah''s desk. She had been the Content Director for seven years—long enough to remember when "content" meant something humans created with passion and purpose.

Her laptop chimed with an incoming email. The subject line made her stomach clench: "Q3 Content Strategy Review - Mandatory Attendance."

Sarah glanced at the calendar. The meeting was in two hours. She had prepared a presentation showcasing her team''s best work—articles that had gone viral, campaigns that had won awards, content that had defined the company''s voice.

What she didn''t know was that the presentation would never happen.

The conference room was unusually crowded when she arrived. Marcus Chen, the lead AI developer, sat across from her, his expression unreadable. Elena, her best friend and the company''s HR director, wouldn''t meet her eyes.

"Sarah," the CEO began, his voice carrying that practiced warmth executives use before delivering bad news, "we''ve been reviewing our content strategy, and we''ve made some significant discoveries."

He clicked to the next slide. It showed two articles side by side. On the left, an article Sarah had written—a piece that had taken her three days to research and craft. On the right, an article generated by their new AI system in approximately four minutes.

"The metrics are identical," he continued. "Engagement, time on page, conversion rates. But the cost difference..." He let the number hang in the air.

Sarah felt the room tilt. She looked at Marcus, who suddenly found his laptop screen fascinating. He had built this. He had known.

"We''re not making any immediate decisions," the CEO said, but Sarah heard the truth beneath the words. They were already decided. She was being given time to process her own obsolescence.

After the meeting, she found herself on the rooftop terrace, the city sprawling beneath her like a circuit board. The wind carried the distant sounds of traffic and life, but all she could hear was the echo of her own heartbeat.

Elena found her there twenty minutes later.

"I wanted to tell you," Elena said, her voice barely above a whisper. "But I was bound by confidentiality."

"When?" Sarah asked, not turning around.

"The transition starts next month. Your team... most of them will be let go. You''ll be offered a consulting role. Part-time. To ''oversee'' the AI output."

Sarah finally turned. "And what happens when the AI learns to oversee itself?"

Elena had no answer. Neither did the city below, its lights beginning to flicker on as dusk approached.

That night, Sarah sat at her home office, staring at her laptop. The same laptop she had used to write thousands of articles, millions of words. The same laptop that now connected her to the AI that would replace her.

She opened a blank document. Her fingers hovered over the keyboard.

For the first time in her career, she didn''t know what to write.',
'{"weather":{"name":"Sunny Morning","icon":"☀️","description":"A bright start, full of false hope"},"terrain":{"name":"Corporate Office","icon":"🏢","description":"The glass tower where dreams go to die"},"adventure":{"name":"Important Meeting","icon":"💼","description":"A conversation that will define her future"},"equipment":{"name":"Laptop","icon":"💻","description":"The tool of her trade, now her competitor"}}',
1);

-- Chapter 2: The Algorithm's Shadow
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-02', 'preset-ai-001', 'The Algorithm''s Shadow',
'The rain started sometime during the night, and by morning, it had settled into a steady, melancholic rhythm against Sarah''s bedroom window. She hadn''t slept. Every time she closed her eyes, she saw the comparison slides from yesterday''s meeting—her work versus the machine''s work, indistinguishable in every metric that mattered to the company.

Her phone buzzed. A text from Marcus: "Can we talk? Coffee at our usual place?"

Sarah almost didn''t respond. Part of her wanted to blame him, to channel all her anger and fear into a single target. But she knew that wasn''t fair. Marcus hadn''t created the technology to hurt her. He''d built it because that''s what engineers do—they solve problems, and apparently, she was a problem that needed solving.

The coffee shop was nearly empty at 7 AM. Marcus was already there, nursing an espresso, his laptop closed for once. He looked tired—the kind of tired that comes from moral weight, not just lack of sleep.

"I know what you''re thinking," he said as she sat down. "And you''re right to be angry."

"I''m not angry, Marcus. I''m..." Sarah paused, searching for the right word. "I''m trying to understand. How did we get here? When did writing become a problem that needed solving?"

Marcus sighed, running a hand through his hair. "It started as an optimization project. Reduce costs, increase output. The usual corporate mandate. But then..." He pulled out his phone and showed her a graph. "Look at this. The AI isn''t just matching human performance. In some categories, it''s exceeding it."

Sarah studied the numbers. Engagement rates. Emotional resonance scores. Even creativity metrics, whatever those meant.

"Who decides what''s creative?" she asked.

"That''s the thing," Marcus said, his voice dropping. "The metrics are based on human responses. Thousands of A/B tests. The AI learned what moves people by studying what''s already moved them."

"So it''s not creating. It''s remixing."

"Isn''t that what all writers do? Take influences, combine them in new ways?"

The question hung between them. Sarah wanted to argue, to find some essential human spark that couldn''t be replicated. But the truth was, she didn''t know where that spark lived anymore. In her best work? In the AI''s output? In the space between?

"There''s something else," Marcus said, his voice even quieter now. "The company isn''t just replacing writers. They''re planning to expand the system. Marketing. Design. Even..." He hesitated. "Even development."

Sarah looked at him sharply. "Even you?"

Marcus''s smile was bitter. "I''m building the thing that will eventually replace me. We all are, in our own ways. The question is what we do with the time we have left."

They sat in silence for a long moment, the rain continuing its steady percussion outside.

"Have you talked to Elena?" Sarah finally asked.

"She''s been in meetings all week. Layoff planning. They''re calling it ''workforce optimization.''" Marcus''s voice carried a bitter edge. "The irony is, she''s probably the safest of all of us. Someone has to deliver the bad news."

Sarah''s coffee had gone cold. She pushed it aside. "What am I supposed to do, Marcus? I''ve been a writer my entire career. It''s not just what I do—it''s who I am."

"I don''t know," he admitted. "But I know you''re not the only one asking that question. And maybe... maybe that''s where we start. Not with answers, but with the right questions."

He slid a piece of paper across the table. On it was a name and an email address: "Dr. Rachel Kim - AI Ethics Researcher."

"She''s been studying this transition," Marcus said. "The human cost. She might have insights. Or at least, understanding."

Sarah looked at the paper, then at Marcus. In his eyes, she saw the same fear she felt—the fear of becoming obsolete, of watching your life''s work become a museum piece.

"Thank you," she said. "For telling me. For not pretending this is just business."

Marcus stood, picking up his laptop. "We all have choices, Sarah. Even when it feels like we don''t."

As he walked away, Sarah looked out the window. The rain was easing, thin rays of sunlight breaking through the clouds. A new day was starting, whether she was ready for it or not.

She picked up her phone and began composing an email to Dr. Rachel Kim.

But something made her pause. Before sending it, she opened a new document and began to write—not for work, not for metrics, but for herself.

"The rain stopped sometime around noon, but the clouds remained..."

For the first time in days, she felt something like hope. Not because anything had changed, but because she had remembered something important: she was still a writer. And writers write their way through impossible situations.

The question was: what story would she tell?',
'{"weather":{"name":"Rainy Afternoon","icon":"🌧️","description":"Melancholic rain mirrors inner turmoil"},"terrain":{"name":"Coffee Shop","icon":"☕","description":"Where honest conversations happen between sips"},"adventure":{"name":"Unexpected Encounter","icon":"🤝","description":"Running into someone who changes your perspective"},"equipment":{"name":"Coffee Cup","icon":"☕","description":"Comfort in a ceramic vessel"}}',
2);

-- Chapter 3: The Human Element
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-03', 'preset-ai-001', 'The Human Element',
'Three weeks had passed since the meeting that changed everything. Sarah''s team had been reduced from twelve to four, with promises of "further optimization" in the coming months. The survivors—including Sarah—had been reassigned to "AI oversight," a euphemism for editing machine-generated content and pretending it mattered.

Her home office had become a refuge. Here, at least, she could still write. Not for the company, but for herself. Every morning, before the inevitable flood of AI-generated articles to review, she spent an hour on her own work—a personal essay about the experience of being replaced.

The email from Dr. Rachel Kim had arrived two days after Marcus gave her the contact. They were meeting today.

The university campus was a welcome change from the glass-and-steel world of corporate media. Old buildings, ivy-covered walls, students carrying actual books instead of tablets. It felt like a different era—or maybe a different world entirely.

Dr. Kim''s office was small but warm, filled with books and plants and the smell of coffee. She was younger than Sarah had expected, probably late thirties, with kind eyes behind round glasses.

"Thank you for meeting with me," Sarah said, settling into a worn leather chair. "I''m not sure why I''m here, honestly. I just... I needed to talk to someone who understands this from the inside."

Rachel nodded. "Marcus told me about your situation. You''re not alone, you know. I''ve been studying this transition for five years, and the stories are remarkably similar. Writers, designers, analysts, even doctors—the pattern repeats."

"What pattern?"

"First comes denial. ''They''ll never replace me; I have unique skills.'' Then anger. ''This is wrong; there should be laws.'' Then bargaining. ''Maybe I can work with the AI, enhance it.'' And finally..." Rachel spread her hands. "Acceptance. But not the kind you might think."

Sarah leaned forward. "What kind, then?"

"Acceptance that the world has changed, and that the question isn''t ''how do I keep doing what I was doing?'' but ''what do I have to offer that matters now?''"

"And what''s the answer?"

Rachel smiled, but it was a complicated smile. "That''s what everyone''s trying to figure out. But I can tell you what I''ve observed. The people who thrive in this transition are the ones who stop competing with AI on its terms and start asking what makes human creativity irreplaceable."

"Which is?"

"Connection. Context. The ability to look at a situation and understand not just the data, but the meaning behind it. AI can write a thousand articles about job loss. But it can''t sit across from someone who''s lost their job and truly understand their experience. It can''t look at a community and see what they need, beyond what they say they need."

Sarah thought about her team—the people she''d worked with for years, now scattered to other jobs, other industries, other lives. She thought about the way they''d supported each other, challenged each other, made each other better.

"The AI can''t collaborate," she said slowly. "Not really. It can combine inputs, but it can''t have a genuine creative partnership."

"Exactly," Rachel said. "And that''s where I think the future lies. Not in individual creators competing with machines, but in human communities creating together, using AI as a tool rather than a replacement."

She handed Sarah a card. "There''s a group that meets once a month. Writers, artists, technologists—all of them navigating this transition. Some are bitter, some are hopeful, most are somewhere in between. But they''re asking the same questions you are."

Sarah looked at the card. "The Human Element Collective."

"It sounds grandiose," Rachel admitted. "But it''s really just people trying to figure out what comes next. You might find it useful. Or at least, less lonely."

As Sarah left the office, she felt something shift inside her. Not hope, exactly—more like the recognition that she wasn''t alone in this strange new world. Others were asking the same questions, feeling the same fears, searching for the same answers.

Her phone buzzed. A message from Elena: "Dinner tonight? I have news."

Sarah''s stomach tightened. News from Elena was rarely good these days. But she responded anyway: "Sure. My place. 7 PM."

The sun was setting as she walked back to her car. In the golden light, the campus looked almost magical—a reminder that beauty still existed, even in a world being transformed by algorithms.

She pulled out her phone and opened the document she''d been working on. Her personal essay. Her attempt to make sense of the senseless.

For a moment, she considered deleting it. What was the point of writing about being replaced? Who would read it? What would it change?

But then she remembered Rachel''s words: "The ability to look at a situation and understand not just the data, but the meaning behind it."

Maybe that was enough. Maybe that was what she had to offer—not competition with AI, but something it could never replicate: the honest, messy, human experience of living through change.

She kept writing.',
'{"weather":{"name":"Sunny Morning","icon":"☀️","description":"A bright start, full of false hope"},"terrain":{"name":"Corporate Office","icon":"🏢","description":"The glass tower where dreams go to die"},"adventure":{"name":"Career Crossroads","icon":"🎯","description":"The moment that changes everything"},"equipment":{"name":"Old Notebook","icon":"📓","description":"Handwritten thoughts AI cannot replicate"}}',
3);

-- Chapter 4: The Invisible Line
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-04', 'preset-ai-001', 'The Invisible Line',
'Elena arrived at 7 PM sharp, carrying a bottle of wine and the weight of something she hadn''t yet said. Sarah knew her friend well enough to read the signs—the tightness around her eyes, the way she held herself slightly too straight, as if bracing for impact.

"I''ll get the glasses," Sarah said, deciding not to push. Elena would talk when she was ready.

They settled on the couch, the city lights twinkling through the windows. For a while, they just drank in silence, the wine and the view and the comfort of old friendship.

"I''m quitting," Elena said finally.

Sarah nearly choked on her wine. "What?"

"Next month. I''m giving notice next month." Elena''s voice was steady, but her hands trembled slightly around her glass. "I can''t do it anymore, Sarah. I can''t sit in those meetings and talk about ''workforce optimization'' while people''s lives are being dismantled."

"What will you do?"

"I don''t know. Something that doesn''t make me feel like a monster." Elena laughed bitterly. "The irony is, I''m probably more employable now than I''ve ever been. HR directors are in demand—especially ones with experience in ''transition management.''" She made air quotes, her expression twisting. "That''s what they call it now. Transition management. As if we''re helping people move to new homes instead of pushing them out of their livelihoods."

Sarah reached over and took her friend''s hand. "You''re not a monster, Elena. You''ve been fighting for people as much as you could."

"Have I? Or have I just been making myself feel better by advocating for slightly better severance packages?" Elena pulled her hand away, standing abruptly to pace the room. "Do you know what I did last week? I had to tell a woman who''d been with the company for twenty-three years that her position was being ''consolidated.'' She cried. She actually cried, right there in my office. And all I could think was: thank god it''s not me. Thank god I''m still safe."

"That''s a human reaction, Elena."

"Is it? Or is it just survival instinct dressed up in empathy?" She stopped pacing, facing Sarah. "I keep thinking about what you''re going through. What Marcus is going through. What thousands of people are going through. And I''m on the other side of the table, delivering the news that destroys their lives."

Sarah stood and walked to her friend. "You''re not destroying anyone''s life. The company is. The system is. You''re just the messenger."

"That''s what everyone says. ''I''m just following orders. I''m just doing my job.''" Elena''s voice cracked. "But at some point, doesn''t being just the messenger make you complicit?"

They stood in silence, the question hanging between them. Sarah didn''t have an answer. She wasn''t sure anyone did.

"Come with me," she said finally.

"Where?"

"To the Human Element Collective. The group Rachel told me about. They''re meeting tomorrow night." Sarah paused. "I don''t know if it will help. But at least we won''t be alone."

Elena considered this. "A support group for the displaced and the guilty?"

"Something like that."

A small smile broke through Elena''s distress. "I suppose that''s better than drinking alone."

They finished the wine and talked about other things—old memories, future possibilities, the strange new world they were all navigating. By the time Elena left, the heaviness had lifted slightly, replaced by something that felt almost like hope.

That night, Sarah couldn''t sleep. She lay in bed, thinking about invisible lines—the ones we draw between right and wrong, between complicity and resistance, between who we are and who we''re becoming.

Tomorrow, she would meet others who had crossed those lines. Maybe together, they could figure out what came next.

She picked up her phone and opened her essay. The words came easier now, flowing from someplace deeper than before.

"The invisible line isn''t between us and them," she wrote. "It''s between who we were and who we''re becoming. And crossing it isn''t about arriving somewhere new—it''s about accepting that we never stop crossing."

She didn''t know if it was good writing. She didn''t know if anyone would ever read it. But for the first time in weeks, she felt like she was doing something that mattered—not because it would save her job, but because it was true.

And in a world of algorithms and optimization, truth felt like the only thing worth holding onto.',
'{"weather":{"name":"Storm Warning","icon":"⛈️","description":"Tension builds like dark clouds gathering"},"terrain":{"name":"Home Office","icon":"🏠","description":"Solitude, reflection, and the glow of screens"},"adventure":{"name":"Late Night Work","icon":"🌙","description":"When the office is empty, truths emerge"},"equipment":{"name":"Smartphone","icon":"📱","description":"Connection to the world, bearer of bad news"}}',
4);

-- Chapter 5: The Collective
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-05', 'preset-ai-001', 'The Collective',
'The community center was not what Sarah had expected. She''d imagined something sleek and modern—a tech incubator vibe, maybe, with standing desks and whiteboards covered in buzzwords. Instead, she found herself in a converted church basement, the kind of space that had hosted AA meetings and community theater productions and a thousand other gatherings of people seeking connection.

About thirty people were already there when she and Elena arrived. They ranged in age from early twenties to late sixties, dressed in everything from business casual to artist-chic. The diversity was striking—different backgrounds, different industries, different stories. But they all shared something Sarah recognized immediately: the look of people who had been through something they were still trying to understand.

A woman in her fifties approached them. She had silver-streaked hair and the kind of calm presence that comes from surviving difficult things.

"I''m Diana," she said. "I help facilitate these meetings. First time?"

Sarah nodded. "A friend recommended it. Dr. Rachel Kim."

"Rachel''s wonderful. She sends us the best people." Diana smiled warmly. "We have a simple format. Everyone gets a chance to share, if they want to. No pressure. And then we talk about what''s next—not in a toxic positivity way, but in a realistic, practical way."

She led them to a circle of chairs. The meeting was already beginning.

A young man stood up first. "I''m Alex. I was a graphic designer for eight years. Last month, my entire department was replaced by an AI tool that generates designs in seconds." His voice was steady, but his hands betrayed him, twisting together nervously. "I keep telling myself I should have seen it coming. But I didn''t. I thought creativity was safe."

Another voice: "We all thought that."

And another: "That''s what they want us to think. That we should have known. That it''s our fault for not being prepared."

The conversation flowed from there, each person adding their piece to the mosaic. A former accountant who had loved her work. A software developer who had trained the AI that replaced him. A journalist who had spent twenty years building expertise, only to watch it become obsolete overnight.

Sarah listened, her heart aching with recognition. These were her people. Not because they shared her profession, but because they shared her question: What now?

When her turn came, she wasn''t sure she wanted to speak. But something in the room''s energy pulled the words from her.

"I''m Sarah. I''m a writer. Or I was." She paused, gathering her thoughts. "I keep thinking about what makes us human. What makes our work matter. And I keep coming back to this: AI can replicate our output, but it can''t replicate our experience. It can''t know what it feels like to lose something you love."

The room was quiet for a moment. Then Diana spoke.

"That''s what we''re building here," she said. "A space for the things AI can''t replicate. Experience. Connection. The messy, complicated process of figuring out what comes next."

After the formal meeting ended, people lingered, forming smaller conversations. Sarah found herself talking to a former marketing executive named James, who had started a consulting business helping companies navigate AI transitions ethically.

"The demand is actually huge," he said. "Companies are realizing that replacing humans without thinking through the consequences is a PR nightmare. Some of them actually want to do better—they just don''t know how."

"You help them fire people more gently?" Sarah couldn''t keep the edge from her voice.

James didn''t flinch. "I help them think through the full picture. What skills are they losing? What knowledge walks out the door? What happens to company culture when you replace experience with algorithms? Sometimes, the answer is still automation. But at least it''s an informed decision."

It wasn''t a perfect answer, but it was something. A way to stay in the game, even as the rules changed.

Elena appeared at Sarah''s side. "I talked to Diana," she said quietly. "She knows someone who''s starting a nonprofit for workers in transition. Career counseling, legal support, community building. They need someone with HR experience."

Sarah looked at her friend. "Are you thinking about it?"

"I''m thinking about a lot of things." Elena''s expression was thoughtful. "For the first time in months, I''m thinking about possibilities instead of just survival."

As they left the community center, the night air felt different—cooler, clearer. Sarah looked up at the stars, visible despite the city lights.

"I think I want to keep writing," she said. "Not for the company. For myself. For people like us."

Elena smiled. "The Human Element Collective needs a newsletter. Just saying."

Sarah laughed—a real laugh, the first in weeks. "Is that a job offer?"

"It''s a possibility. That''s all any of us have right now."

They walked to their cars in comfortable silence, two friends navigating a world that had shifted beneath their feet. The future was still uncertain. The questions were still unanswered. But for the first time, Sarah felt like she was moving toward something instead of away from it.

And that, she realized, was enough for now.',
'{"weather":{"name":"Cold Dawn","icon":"❄️","description":"A chilling realization in the early hours"},"terrain":{"name":"City Rooftop","icon":"🏙️","description":"Perspective from above the chaos below"},"adventure":{"name":"Unexpected Encounter","icon":"🤝","description":"Running into someone who changes your perspective"},"equipment":{"name":"Old Notebook","icon":"📓","description":"Handwritten thoughts AI cannot replicate"}}',
5);
```

**Step 2: 验证SQL文件创建成功**

检查文件 `migrations/0023_ai_series_01_en_chapters_part1.sql` 是否存在。

---

## Task 5: 创建英文版章节数据（第6-8章）

**Files:**
- Create: `migrations/0024_ai_series_01_en_chapters_part2.sql`

**Step 1: 创建英文版章节SQL文件（第6-8章）**

```sql
-- migrations/0024_ai_series_01_en_chapters_part2.sql
-- AI职场危机系列 - 第一本：The Last Writer（英文版）- 章节6-8

-- Chapter 6: The Choice
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-06', 'preset-ai-001', 'The Choice',
'The offer came on a Tuesday morning, delivered in a sleek envelope with the company logo embossed in gold. Sarah recognized the format immediately—it was the same envelope they used for promotions and special recognitions.

But this wasn''t a promotion.

"Dear Sarah," the letter began, in the careful corporate tone she had come to recognize as the sound of bad news being delivered gently. "As we continue to evolve our content strategy, we are pleased to offer you the position of AI Content Curator. This part-time role will leverage your extensive experience to ensure our AI-generated content maintains the human touch our audience values."

Part-time. The word landed like a stone in her stomach. A 60% pay cut. No benefits. No team. No creative control. Just... curation. Editing machine-generated content and pretending it mattered.

She read the letter three times, as if additional readings might reveal a hidden clause that made it acceptable. They didn''t.

Her phone buzzed. Marcus: "Heard about the offer. Can we talk?"

They met at their usual coffee shop. Marcus looked worse than Sarah had ever seen him—dark circles under his eyes, a slight tremor in his hands.

"I''ve been doing some digging," he said, leaning close. "The AI isn''t just replacing writers. It''s learning from everything. Every edit you make. Every correction. Every piece of feedback. The system is using you to train itself to be more human."

Sarah stared at him. "What are you saying?"

"I''m saying that if you take this job, you''re not just curating content. You''re training your replacement. You''re making the AI better at being you."

The coffee shop noise faded into the background. Sarah felt like she was underwater, sounds muffled and distant.

"How long have you known?"

"I suspected for a while. I confirmed it yesterday." Marcus''s voice was heavy with guilt. "I''m sorry, Sarah. I should have told you sooner."

She wanted to be angry. She wanted to blame him, to channel all her fear and frustration into a single target. But looking at his face, she saw the same despair she felt. He was trapped in the same system, building the tools that would eventually make him obsolete.

"What do I do?" she asked. "If I don''t take the job, I lose everything. If I do take it, I''m helping them replace me faster."

Marcus didn''t have an answer. Neither did the silence that followed.

That night, Sarah sat at her desk, staring at the letter. The Human Element Collective newsletter draft was open on her screen—the first piece she had written for them, about finding community in the face of displacement. It was good. Maybe the best thing she had written in years.

But it didn''t pay the bills. It didn''t provide health insurance. It didn''t give her the security she had spent her career building.

Her phone buzzed again. Elena: "Dinner? I have news about the nonprofit."

Sarah almost didn''t respond. The weight of the decision pressed down on her, making everything feel impossible.

But she did respond. Because that''s what humans do—we keep connecting, even when it hurts. We keep reaching out, even when we''re not sure anyone will reach back.

"Sure. My place. 7 PM."

As she prepared for Elena''s arrival, Sarah made a decision. Not about the job—that choice still felt impossible. But about something else. Something that felt more important.

She opened a new document and began to write.

Not for the company. Not for the newsletter. For herself.

"Today I was offered a job that would require me to train my own replacement. The irony is not lost on me. I''ve spent my career writing about transformation—personal growth, professional development, the endless human capacity for change. But I never imagined I would be the one being transformed out of existence."

The words flowed, honest and raw. This was what she did. This was who she was. Not a content curator or an AI trainer or a corporate employee. A writer. Someone who made sense of the world through words.

And maybe, in the end, that was the choice that mattered. Not whether to take the job or reject it. But whether to keep being herself, even as the world tried to turn her into something else.

She saved the document. Then she opened the newsletter draft and began to revise it, adding the truth she had just discovered.

The choice wasn''t about survival. It was about identity. And that was something no algorithm could take from her.',
'{"weather":{"name":"Rainy Afternoon","icon":"🌧️","description":"Melancholic rain mirrors inner turmoil"},"terrain":{"name":"Coffee Shop","icon":"☕","description":"Where honest conversations happen between sips"},"adventure":{"name":"Career Crossroads","icon":"🎯","description":"The moment that changes everything"},"equipment":{"name":"Laptop","icon":"💻","description":"The tool of her trade, now her competitor"}}',
6);

-- Chapter 7: The Reckoning
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-07', 'preset-ai-001', 'The Reckoning',
'Elena arrived with news that changed everything.

"The nonprofit got funding," she said, barely through the door. "Major foundation grant. Enough to hire three full-time staff, including an HR director."

Sarah stared at her friend. "You''re serious?"

"Completely. They want me. And..." Elena hesitated. "They asked if I knew any writers who might want to help with communications. Content strategy. Storytelling."

The implications hung in the air between them. A way out. Not just for Elena, but for Sarah too. A chance to do meaningful work, helping people navigate the same transition they were experiencing.

But there was a catch. There was always a catch.

"The salary is..." Elena made a face. "It''s about half of what we were making. Maybe less, once benefits are factored in."

Sarah thought about the corporate offer sitting on her desk. Part-time, but better paid. Training her own replacement, but financially secure. The choice between principle and survival.

"What would I actually be doing?" she asked.

"Writing. Real writing. Stories about workers in transition. Resources for people facing displacement. Advocacy pieces about policy changes." Elena''s eyes were bright. "It''s not glamorous, but it matters. We could actually help people."

The word "help" resonated in Sarah''s chest. She thought about the Human Element Collective, about the people she had met there—their stories, their struggles, their search for meaning in a world that had pushed them aside. She thought about her own writing, the essay that had grown from a personal exercise into something that might actually matter.

"I need to think about it," she said.

Elena nodded. "I know. It''s not an easy decision."

That night, Sarah couldn''t sleep. She lay in bed, turning the options over in her mind like stones in her hand. The corporate job: safe, familiar, slowly eroding her soul. The nonprofit: uncertain, challenging, aligned with everything she actually cared about.

At 3 AM, she got up and opened her laptop. The essay had grown to nearly 10,000 words now—a personal chronicle of displacement, a meditation on what it meant to be human in an age of algorithms. She had been adding to it every day, sometimes just a paragraph, sometimes pages.

She scrolled to the end and read what she had written the night before:

"The choice isn''t between success and failure. It''s between two different definitions of success. One measured in security and status. The other measured in meaning and connection. And maybe that''s the real question the AI age forces us to answer: What do we actually value? Not what we say we value, but what we choose when the chips are down."

She added a new paragraph:

"Tonight, I have to make a choice. Not just about a job, but about who I want to be. The safe path or the meaningful one. The known or the unknown. The version of myself that survives or the version that grows."

She saved the document. Then she opened her email and began composing a message.

Not to the company. Not to accept or reject their offer.

To Elena.

"I''m in. Let''s do this."

She hit send before she could second-guess herself. Then she sat back and watched the screen, feeling something she hadn''t felt in months.

Not hope, exactly. Not certainty.

But something like purpose. The sense that she was finally moving in the right direction, even if she couldn''t see the destination.

The next morning, she woke to a response from Elena: "I knew you''d say yes. Welcome to the resistance."

Sarah laughed—a real laugh, the kind that came from somewhere deep. The resistance. It sounded dramatic, but maybe that''s what this was. Not a war against AI, but a fight for humanity. For the things that algorithms couldn''t replicate.

She opened her essay one more time and added a final line:

"This is not the end of my story. It''s the beginning of a new chapter. And I''m going to write it myself."

Then she closed the laptop, got dressed, and walked out into a world that was still being transformed. But this time, she wasn''t just being carried along by the current.

She was choosing her own direction.',
'{"weather":{"name":"Storm Warning","icon":"⛈️","description":"Tension builds like dark clouds gathering"},"terrain":{"name":"Home Office","icon":"🏠","description":"Solitude, reflection, and the glow of screens"},"adventure":{"name":"Late Night Work","icon":"🌙","description":"When the office is empty, truths emerge"},"equipment":{"name":"Smartphone","icon":"📱","description":"Connection to the world, bearer of bad news"}}',
7);

-- Chapter 8: The New Beginning
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-08', 'preset-ai-001', 'The New Beginning',
'Six months later, Sarah stood in front of a room full of strangers and told her story.

The nonprofit had grown faster than anyone expected. What started as a small support network had become a national resource center for workers navigating AI displacement. And Sarah—against all her expectations—had become one of its most visible voices.

"Three hundred thousand people have read my essay," she told the audience. "Not because I''m famous. Not because I''m special. But because the story I told is everyone''s story now. We''re all trying to figure out what it means to be human in a world that keeps redefining what humans are for."

The room was packed—journalists, policymakers, corporate leaders, and workers at every stage of the transition she had lived through. A documentary crew filmed from the back. A publisher had approached her about turning her essay into a book.

None of this was what she had planned. None of it was what she had wanted, back when she thought she wanted security and status and the corner office with the view.

But standing here, looking out at all these faces, she realized something important. The AI hadn''t taken her voice. It had forced her to find it.

After the talk, a young woman approached her. She couldn''t have been more than twenty-five, with the anxious energy of someone facing their first real crisis.

"I''m a writer too," she said. "Or I was. My company just announced they''re transitioning to AI content. I don''t know what to do."

Sarah recognized the fear in her eyes. She had worn that same expression not so long ago.

"What kind of writing do you love?" she asked.

"Personal essays. Stories about real people. The kind of thing that makes you feel less alone."

Sarah smiled. "Then keep writing that. Not for a company. For yourself. For the people who need to hear it."

"But how do I make a living?"

"That''s the question, isn''t it?" Sarah reached into her bag and pulled out a card. "Come to our next meeting. Bring your writing. There are more options than you think—not all of them obvious, not all of them easy. But you''re not alone."

The young woman took the card, her expression shifting from despair to something like hope. "Thank you," she whispered.

Sarah watched her walk away, remembering how she had felt standing in that same position months ago. Lost. Afraid. Uncertain.

But not anymore.

That evening, she met Elena and Marcus for dinner. The three of them had become unlikely friends—united not by their professions, but by their shared experience of transformation.

"The foundation wants to expand," Elena said, between bites of pasta. "International programs. Policy advocacy. They''re talking about making us the go-to resource for AI transition support."

Marcus nodded. "I''ve been consulting for tech companies that want to handle these transitions better. There''s actually demand for ethical AI implementation. Who knew?"

Sarah laughed. "A year ago, we were all terrified of becoming obsolete. Now look at us."

"We''re not obsolete," Elena said firmly. "We''re evolved. Different, but not less."

The conversation continued, flowing from work to life to the strange new world they were all navigating. Outside the restaurant window, the city hummed with its usual energy—people going about their lives, unaware of the transformations happening all around them.

Later that night, Sarah walked home alone. The streets were quiet, the air cool and clear. She thought about everything that had happened—the job she had lost, the identity she had questioned, the community she had found.

Her phone buzzed. A message from the publisher: "Loved the talk today. Let''s discuss the book deal next week."

She smiled, but didn''t respond immediately. Instead, she opened her notes app and began to write:

"Six months ago, I thought my story was ending. I was wrong. It was just changing genres—from corporate drama to something more interesting. More human. More true.

The AI didn''t replace me. It pushed me to become something I might never have been otherwise. A writer who writes because she has something to say, not because someone is paying her to say it.

Is this a happy ending? I don''t know. It''s not an ending at all. It''s a new beginning. And I''m writing it one word at a time."

She saved the note and looked up at the sky. A few stars were visible through the city lights, tiny points of light in the vast darkness.

The future was still uncertain. The questions were still unanswered. But for the first time in a long time, Sarah felt ready for whatever came next.

She was still a writer. And she was just getting started.

THE END',
'{"weather":{"name":"Sunny Morning","icon":"☀️","description":"A bright start, full of false hope"},"terrain":{"name":"City Rooftop","icon":"🏙️","description":"Perspective from above the chaos below"},"adventure":{"name":"Unexpected Encounter","icon":"🤝","description":"Running into someone who changes your perspective"},"equipment":{"name":"Old Notebook","icon":"📓","description":"Handwritten thoughts AI cannot replicate"}}',
8);
```

**Step 2: 验证SQL文件创建成功**

检查文件 `migrations/0024_ai_series_01_en_chapters_part2.sql` 是否存在。

---

## Task 6: 创建中文版书籍数据

**Files:**
- Create: `migrations/0030_ai_series_01_zh_books.sql`

**Step 1: 创建中文版书籍SQL文件**

```sql
-- migrations/0030_ai_series_01_zh_books.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）

INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-001-zh', 'system', '最后的写作者', 'business', 1, 'zh', datetime('now'), datetime('now'));
```

---

## Task 7: 创建中文版角色数据

**Files:**
- Create: `migrations/0031_ai_series_01_zh_characters.sql`

**Step 1: 创建中文版角色SQL文件**

```sql
-- migrations/0031_ai_series_01_zh_characters.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）- 角色数据

-- 主角：Sarah
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-001-zh', 'preset-ai-001-zh', 'Sarah', '内容总监', '坚定、有创造力、敏感、善于内省', '专业而温暖，情绪激动时会用比喻', '👩‍💼', NULL, NULL, 1);

-- 配角1：Marcus（前同事，AI开发者）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-002-zh', 'preset-ai-001-zh', 'Marcus', 'AI开发者', '理性、内心矛盾、善良、暗自担心自己的工作', '技术性强但易懂，经常用技术类比', '👨‍💻', 75, '前同事', 0);

-- 配角2：Elena（HR经理，好友）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai001-003-zh', 'preset-ai-001-zh', 'Elena', 'HR经理', '务实、支持性强、因执行裁员而心怀愧疚', '直接而关怀，私下避免使用企业术语', '👩‍💼', 60, '闺蜜', 0);
```

---

## Task 8: 创建中文版情节卡牌数据

**Files:**
- Create: `migrations/0032_ai_series_01_zh_plot_cards.sql`

**Step 1: 创建中文版情节卡牌SQL文件**

```sql
-- migrations/0032_ai_series_01_zh_plot_cards.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）- 情节卡牌

-- 天气卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-w01-zh', 'preset-ai-001-zh', 'plot', 'weather', '阳光明媚的早晨', '☀️', '明亮的开始，充满虚假的希望'),
('card-ai001-w02-zh', 'preset-ai-001-zh', 'plot', 'weather', '阴雨绵绵的下午', '🌧️', '忧郁的雨水映照内心的波澜'),
('card-ai001-w03-zh', 'preset-ai-001-zh', 'plot', 'weather', '暴风雨将至', '⛈️', '紧张如乌云聚集'),
('card-ai001-w04-zh', 'preset-ai-001-zh', 'plot', 'weather', '寒冷的黎明', '❄️', '清晨时分的寒意觉醒');

-- 地形卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-t01-zh', 'preset-ai-001-zh', 'plot', 'terrain', '企业办公楼', '🏢', '梦想消逝的玻璃塔'),
('card-ai001-t02-zh', 'preset-ai-001-zh', 'plot', 'terrain', '咖啡店', '☕', '啜饮间坦诚对话的地方'),
('card-ai001-t03-zh', 'preset-ai-001-zh', 'plot', 'terrain', '家庭办公室', '🏠', '独处、反思、屏幕的光芒'),
('card-ai001-t04-zh', 'preset-ai-001-zh', 'plot', 'terrain', '城市天台', '🏙️', '从高处俯瞰混乱的视角');

-- 冒险卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-a01-zh', 'preset-ai-001-zh', 'plot', 'adventure', '职业十字路口', '🎯', '改变一切的时刻'),
('card-ai001-a02-zh', 'preset-ai-001-zh', 'plot', 'adventure', '重要会议', '💼', '决定未来的对话'),
('card-ai001-a03-zh', 'preset-ai-001-zh', 'plot', 'adventure', '深夜加班', '🌙', '办公室空荡时，真相浮现'),
('card-ai001-a04-zh', 'preset-ai-001-zh', 'plot', 'adventure', '意外相遇', '🤝', '遇到改变你看法的人');

-- 装备卡牌 (4张)
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai001-e01-zh', 'preset-ai-001-zh', 'plot', 'equipment', '笔记本电脑', '💻', '她的谋生工具，现在是她的竞争对手'),
('card-ai001-e02-zh', 'preset-ai-001-zh', 'plot', 'equipment', '咖啡杯', '☕', '陶瓷容器中的慰藉'),
('card-ai001-e03-zh', 'preset-ai-001-zh', 'plot', 'equipment', '旧笔记本', '📓', 'AI无法复制的手写思绪'),
('card-ai001-e04-zh', 'preset-ai-001-zh', 'plot', 'equipment', '智能手机', '📱', '与世界的连接，坏消息的传递者');
```

---

## Task 9: 创建中文版章节数据（第1-5章）

**Files:**
- Create: `migrations/0033_ai_series_01_zh_chapters_part1.sql`

**Step 1: 创建中文版章节SQL文件（第1-5章）**

```sql
-- migrations/0033_ai_series_01_zh_chapters_part1.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）- 章节1-5

-- 第1章：改变一切的邮件
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-01-zh', 'preset-ai-001-zh', '改变一切的邮件',
'晨光透过Nexus Media四十二层落地窗洒进来，在Sarah的办公桌上投下长长的阴影。她担任内容总监已经七年了——久到她还记得"内容"曾经意味着人类用激情和目标创造的东西。

笔记本电脑传来新邮件的提示音。邮件主题让她的胃部一阵紧缩："第三季度内容战略回顾——强制出席"。

Sarah看了一眼日历。会议在两小时后。她准备了一个展示她团队最佳作品的演示文稿——那些病毒式传播的文章、获奖的活动、定义了公司声音的内容。

她不知道的是，这个演示永远不会发生。

当她到达会议室时，里面异常拥挤。首席AI开发者Marcus Chen坐在她对面，表情难以捉摸。她最好的朋友、公司HR总监Elena不敢与她对视。

"Sarah，"CEO开口了，他的声音带着高管们在宣布坏消息前惯用的那种练习过的温暖，"我们一直在审查我们的内容战略，我们有了一些重大发现。"

他点击到下一张幻灯片。上面并排展示了两篇文章。左边是Sarah写的一篇文章——一篇她花了三天时间研究和打磨的作品。右边是一篇由他们新的AI系统在大约四分钟内生成的文章。

"各项指标完全相同，"他继续说，"参与度、页面停留时间、转化率。但成本差异……"他让那个数字悬在空中。

Sarah感觉房间在倾斜。她看向Marcus，他突然发现他的笔记本电脑屏幕非常有趣。是他构建了这个。他早就知道。

"我们不会立即做出任何决定，"CEO说，但Sarah听出了话语背后的真相。决定已经做出了。她只是被给予时间来消化自己的过时。

会议结束后，她发现自己站在天台上，城市像电路板一样在她脚下延伸。风带着远处交通和生活的声音，但她只能听到自己心跳的回声。

二十分钟后，Elena找到了她。

"我想告诉你，"Elena说，声音几乎听不见，"但我受保密协议约束。"

"什么时候？"Sarah问，没有转身。

"过渡下个月开始。你的团队……他们中的大多数人会被解雇。你会被提供一个顾问角色。兼职。用来''监督''AI输出。"

Sarah终于转过身。"当AI学会自我监督时会发生什么？"

Elena没有答案。脚下的城市也没有答案，随着黄昏临近，它的灯光开始闪烁。

那天晚上，Sarah坐在家庭办公室里，盯着她的笔记本电脑。同一台笔记本电脑，她曾用它写了数千篇文章、数百万字。同一台笔记本电脑，现在将她连接到将取代她的AI。

她打开一个空白文档。手指悬在键盘上。

职业生涯中第一次，她不知道该写什么。',
'{"weather":{"name":"阳光明媚的早晨","icon":"☀️","description":"明亮的开始，充满虚假的希望"},"terrain":{"name":"企业办公楼","icon":"🏢","description":"梦想消逝的玻璃塔"},"adventure":{"name":"重要会议","icon":"💼","description":"决定未来的对话"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"她的谋生工具，现在是她的竞争对手"}}',
1);

-- 第2章：算法的阴影
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-02-zh', 'preset-ai-001-zh', '算法的阴影',
'雨在夜里某个时候开始下，到早晨时已经变成了稳定的、忧郁的节奏，敲打着Sarah卧室的窗户。她没有睡。每次闭上眼睛，她都会看到昨天会议上的对比幻灯片——她的作品与机器的作品，在公司看重的每一个指标上都难以区分。

手机震动了一下。Marcus的短信："能谈谈吗？老地方喝咖啡？"

Sarah差点没有回复。她的一部分想责怪他，把她所有的愤怒和恐惧引导到一个单一的目标上。但她知道这不公平。Marcus创造这项技术不是为了伤害她。他构建它是因为工程师就是这样——他们解决问题，而显然，她是一个需要解决的问题。

咖啡店在早上七点几乎空无一人。Marcus已经到了，喝着浓缩咖啡，他的笔记本电脑第一次是合上的。他看起来很累——那种来自道德重担的疲惫，不仅仅是睡眠不足。

"我知道你在想什么，"她坐下时他说，"你有理由生气。"

"我不生气，Marcus。我……"Sarah停顿了一下，寻找合适的词。"我在试图理解。我们是怎么走到这一步的？写作什么时候变成了一个需要解决的问题？"

Marcus叹了口气，用手梳理着头发。"它始于一个优化项目。降低成本，增加产出。通常的企业指令。但后来……"他拿出手机给她看一张图表。"看这个。AI不仅在匹配人类表现。在某些类别中，它正在超越人类。"

Sarah研究这些数字。参与率。情感共鸣分数。甚至创造力指标，不管那意味着什么。

"谁决定什么是有创造力的？"她问。

"这就是问题所在，"Marcus说，声音低沉，"这些指标是基于人类反应的。数千次A/B测试。AI通过研究已经打动人们的东西来学习什么能打动人。"

"所以它不是在创造。它是在重新组合。"

"这不就是所有作家做的事吗？吸收影响，以新的方式组合它们？"

这个问题悬在他们之间。Sarah想争辩，想找到某种无法复制的人类火花。但事实是，她不知道那个火花存在于何处。在她最好的作品中？在AI的输出中？在两者之间的空间？

"还有一件事，"Marcus说，声音更轻了，"公司不仅是在取代作家。他们计划扩展这个系统。营销。设计。甚至……"他犹豫了一下。"甚至开发。"

Sarah锐利地看着他。"甚至你？"

Marcus的笑容是苦涩的。"我正在构建最终会取代我的东西。在我们各自的方式上，我们都是。问题是我们如何利用我们剩下的时间。"

他们沉默地坐了很久，雨在外面继续着稳定的节奏。

"你和Elena谈过吗？"Sarah终于问。

"她整个星期都在开会。裁员规划。他们称之为''人力优化''。"Marcus的声音带着苦涩的边缘。"讽刺的是，她可能是我们中最安全的。总得有人传达坏消息。"

Sarah的咖啡已经凉了。她把它推到一边。"我该怎么办，Marcus？我整个职业生涯都是作家。这不仅是我的工作——这是我的身份。"

"我不知道，"他承认，"但我知道你不是唯一一个问这个问题的人。也许……也许这就是我们的起点。不是答案，而是正确的问题。"

他滑过一张纸。上面是一个名字和电子邮件地址："Dr. Rachel Kim - AI伦理研究员"。

"她一直在研究这种转变，"Marcus说，"人类的代价。她可能有见解。或者至少，理解。"

Sarah看着那张纸，然后看着Marcus。在他的眼中，她看到了同样的恐惧——变得过时的恐惧，看着你一生的工作变成博物馆展品的恐惧。

"谢谢你，"她说，"告诉我这些。没有假装这只是公事。"

Marcus站起来，拿起他的笔记本电脑。"我们都有选择，Sarah。即使感觉我们没有。"

当他走开时，Sarah看向窗外。雨正在缓解，稀薄的阳光穿透云层。新的一天正在开始，无论她是否准备好。

她拿起手机开始给Dr. Rachel Kim写邮件。

但有什么让她停了下来。在发送之前，她打开一个新文档开始写作——不是为了工作，不是为了指标，而是为了她自己。

"雨在中午左右停了，但云层依然存在……"

几天来第一次，她感觉到了某种希望。不是因为任何东西改变了，而是因为她记起了一件重要的事情：她仍然是一个作家。而作家会通过写作走出不可能的处境。

问题是：她会讲述什么故事？',
'{"weather":{"name":"阴雨绵绵的下午","icon":"🌧️","description":"忧郁的雨水映照内心的波澜"},"terrain":{"name":"咖啡店","icon":"☕","description":"啜饮间坦诚对话的地方"},"adventure":{"name":"意外相遇","icon":"🤝","description":"遇到改变你看法的人"},"equipment":{"name":"咖啡杯","icon":"☕","description":"陶瓷容器中的慰藉"}}',
2);

-- 第3章：人的元素
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-03-zh', 'preset-ai-001-zh', '人的元素',
'距离那场改变一切的会议已经过去三周了。Sarah的团队从十二人缩减到四人，还有承诺在接下来的几个月里"进一步优化"。幸存者——包括Sarah——被重新分配到"AI监督"工作，这是编辑机器生成内容并假装它很重要的委婉说法。

她的家庭办公室成了避难所。在这里，至少，她仍然可以写作。不是为了公司，而是为了她自己。每天早晨，在不可避免地涌入需要审核的AI生成文章之前，她花一小时写自己的东西——一篇关于被取代经历的个人随笔。

Dr. Rachel Kim的邮件在Marcus给她联系方式两天后到达。她们今天见面。

大学校园是企业媒体玻璃钢铁世界的一个可喜变化。老建筑、常春藤覆盖的墙壁、学生们拿着真正的书而不是平板电脑。感觉像是一个不同的时代——或者也许是一个完全不同的世界。

Dr. Kim的办公室很小但很温暖，充满了书籍、植物和咖啡的香味。她比Sarah预期的要年轻，大概三十多岁，圆眼镜后面是温柔的眼睛。

"谢谢你见我，"Sarah说，在一个破旧的皮椅上坐下，"老实说，我不确定我为什么来这里。我只是……我需要和从内部理解这一切的人谈谈。"

Rachel点点头。"Marcus告诉我你的情况。你并不孤单，你知道。我研究这种转变已经五年了，故事惊人地相似。作家、设计师、分析师，甚至医生——模式在重复。"

"什么模式？"

"首先是否认。''他们永远不会取代我；我有独特的技能。''然后是愤怒。''这是错误的；应该有法律。''然后是讨价还价。''也许我可以与AI合作，增强它。''最后……"Rachel摊开双手。"接受。但不是你可能想的那种。"

Sarah向前倾身。"那是什么？"

"接受世界已经改变，问题不是''我如何继续做我正在做的事？''而是''我现在有什么可以提供的有价值的东西？''"

"答案是什么？"

Rachel微笑了，但那是一个复杂的微笑。"这正是每个人都在试图弄清楚的。但我可以告诉你我观察到的。在这种转变中蓬勃发展的人是那些停止在AI的条件下与AI竞争，开始问什么使人类创造力不可替代的人。"

"那是？"

"连接。语境。不仅看数据，而且理解其背后意义的能力。AI可以写一千篇关于失业的文章。但它不能坐在一个失业的人对面，真正理解他们的经历。它不能看一个社区，看到他们需要什么，而不仅仅是他们说自己需要什么。"

Sarah想到了她的团队——那些她共事多年的人，现在分散到其他工作、其他行业、其他生活中。她想到他们相互支持、相互挑战、让彼此变得更好的方式。

"AI不能真正协作，"她慢慢地说，"它可以组合输入，但它不能有真正的创意伙伴关系。"

"正是如此，"Rachel说，"这就是我认为未来所在。不是个人创作者与机器竞争，而是人类社区共同创造，将AI作为工具而非替代品。"

她递给Sarah一张卡片。"有一个小组每月聚会一次。作家、艺术家、技术专家——都在导航这种转变。有些人痛苦，一些人充满希望，大多数人介于两者之间。但他们都在问和你一样的问题。"

Sarah看着卡片。"人的元素集体。"

"听起来很宏大，"Rachel承认，"但实际上只是一群试图弄清楚接下来会发生什么的人。你可能会发现它有用。或者至少，不那么孤独。"

当Sarah离开办公室时，她感觉到内心有什么在转变。不是希望，确切地说——更像是一种认识，她在这个陌生的新世界中并不孤单。其他人也在问同样的问题，感受同样的恐惧，寻找同样的答案。

手机震动了一下。Elena的消息："今晚晚餐？我有消息。"

Sarah的胃又紧了一下。这些天Elena的消息很少是好的。但她还是回复了："好的。我家。晚上七点。"

当她走回车边时，太阳正在下山。在金色的光芒中，校园看起来几乎神奇——一个提醒，即使在一个被算法改变的世界里，美依然存在。

她拿出手机打开她一直在写的文档。她的个人随笔。她试图理解这无意义之事的尝试。

有一刻，她考虑删除它。写关于被取代有什么意义？谁会读它？它会改变什么？

但随后她记起Rachel的话："不仅看数据，而且理解其背后意义的能力。"

也许这就够了。也许这就是她能提供的——不是与AI竞争，而是某种它永远无法复制的东西：经历变化的诚实、混乱、人性体验。

她继续写作。',
'{"weather":{"name":"阳光明媚的早晨","icon":"☀️","description":"明亮的开始，充满虚假的希望"},"terrain":{"name":"企业办公楼","icon":"🏢","description":"梦想消逝的玻璃塔"},"adventure":{"name":"职业十字路口","icon":"🎯","description":"改变一切的时刻"},"equipment":{"name":"旧笔记本","icon":"📓","description":"AI无法复制的手写思绪"}}',
3);

-- 第4章：看不见的线
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-04-zh', 'preset-ai-001-zh', '看不见的线',
'Elena准时在晚上七点到达，手里拿着一瓶酒，还有她尚未说出口的某种沉重。Sarah足够了解她的朋友，能读懂那些迹象——眼周的紧绷、她站得太直的方式，仿佛在准备迎接冲击。

"我去拿杯子，"Sarah说，决定不追问。Elena准备好时会说的。

她们在沙发上安顿下来，城市灯光透过窗户闪烁。有一会儿，她们只是静静地喝着，享受着酒、风景和老朋友的舒适。

"我要辞职了，"Elena终于说。

Sarah差点被酒呛到。"什么？"

"下个月。我下个月提辞职。"Elena的声音很稳，但她的手在酒杯周围微微颤抖。"我不能再这样做了，Sarah。我不能坐在那些会议上谈论''人力优化''，而人们的生活正在被拆解。"

"你会做什么？"

"我不知道。一些不会让我觉得自己像个怪物的事情。"Elena苦涩地笑了。"讽刺的是，我现在可能比以往任何时候都更有就业市场。HR总监很抢手——特别是那些有''过渡管理''经验的。"她做了个引号的手势，表情扭曲。"他们现在这么叫。过渡管理。就好像我们在帮助人们搬新家，而不是把他们推出他们的生计。"

Sarah伸出手握住朋友的手。"你不是怪物，Elena。你一直在尽可能地为人们争取。"

"是吗？还是我只是通过倡导稍微好一点的遣散费来让自己感觉更好？"Elena抽回手，突然站起来在房间里踱步。"你知道我上周做了什么吗？我不得不告诉一个在公司工作了二十三年的女人，她的职位正在被''整合''。她哭了。她真的哭了，就在我的办公室里。而我所能想的是：谢天谢地不是我。谢天谢地我还安全。"

"那是人的反应，Elena。"

"是吗？还是只是伪装成同理心的生存本能？"她停止踱步，面对Sarah。"我一直在想你正在经历的事情。Marcus正在经历的事情。成千上万的人正在经历的事情。而我坐在桌子的另一边，传达摧毁他们生活的消息。"

Sarah站起来走到朋友身边。"你没有摧毁任何人的生活。公司是。系统是。你只是信使。"

"每个人都这么说。''我只是在执行命令。我只是在做我的工作。''"Elena的声音破裂了。"但在某个时候，作为信使不就让你成为同谋了吗？"

她们站在沉默中，问题悬在她们之间。Sarah没有答案。她不确定任何人都有。

"跟我一起去，"她终于说。

"去哪？"

"人的元素集体。Rachel告诉我的那个小组。他们明晚聚会。"Sarah停顿了一下。"我不知道这是否有帮助。但至少我们不会孤单。"

Elena考虑着这个。"一个为流离失所者和有罪者设立的支持小组？"

"差不多是这样。"

一个小小的微笑突破了Elena的痛苦。"我想那比独自喝酒要好。"

她们喝完了酒，谈论其他事情——旧时的记忆、未来的可能性、她们都在导航的陌生新世界。当Elena离开时，沉重感稍微减轻了一些，被某种几乎像希望的东西取代了。

那天晚上，Sarah睡不着。她躺在床上，思考着看不见的线——我们在对与错之间画的线、同谋与抵抗之间的线、我们是谁与我们正在成为谁之间的线。

明天，她会见到其他已经越过这些线的人。也许在一起，她们能弄清楚接下来会发生什么。

她拿起手机打开她的随笔。现在文字来得更容易了，从某个比以前更深的地方流淌出来。

"看不见的线不是在我们和他们之间，"她写道，"而是在我们曾经是谁和我们正在成为谁之间。越过它不是关于到达某个新地方——而是关于接受我们从未停止越过。"

她不知道这是不是好的写作。她不知道是否有人会读它。但几周来第一次，她感觉自己在做一些重要的事情——不是因为它会拯救她的工作，而是因为它是真实的。

在一个充满算法和优化的世界里，真实感觉像是唯一值得坚持的东西。',
'{"weather":{"name":"暴风雨将至","icon":"⛈️","description":"紧张如乌云聚集"},"terrain":{"name":"家庭办公室","icon":"🏠","description":"独处、反思、屏幕的光芒"},"adventure":{"name":"深夜加班","icon":"🌙","description":"办公室空荡时，真相浮现"},"equipment":{"name":"智能手机","icon":"📱","description":"与世界的连接，坏消息的传递者"}}',
4);

-- 第5章：集体
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-05-zh', 'preset-ai-001-zh', '集体',
'社区中心不是Sarah所期望的。她想象的是某种时尚现代的东西——也许是科技孵化器的氛围，有站立式办公桌和写满流行词的白板。相反，她发现自己在一个改建的教堂地下室，那种曾经举办过匿名戒酒会会议和社区戏剧制作以及无数其他寻求连接的人们聚会的地方。

当她和Elena到达时，已经有大约三十人在那里。他们的年龄从二十出头到六十多岁不等，穿着从商务休闲到艺术家风格的各种服装。多样性令人瞩目——不同的背景、不同的行业、不同的故事。但他们都共享着Sarah立即认出的东西：那些经历了某些他们仍在试图理解的事情的人们的表情。

一位五十多岁的女性走向她们。她有银灰色的头发和那种来自度过艰难时光的平静存在感。

"我是Diana，"她说，"我帮忙主持这些会议。第一次来？"

Sarah点点头。"一位朋友推荐的。Dr. Rachel Kim。"

"Rachel很棒。她给我们送来了最好的人。"Diana温暖地微笑着。"我们有一个简单的形式。每个人都有机会分享，如果他们想的话。没有压力。然后我们讨论接下来会发生什么——不是以有毒的积极方式，而是以现实、实际的方式。"

她带她们到一个椅子围成的圈。会议已经开始。

一个年轻男子首先站起来。"我是Alex。我做了八年的平面设计师。上个月，我的整个部门被一个几秒钟内生成设计的AI工具取代了。"他的声音很稳，但他的手出卖了他，紧张地扭在一起。"我一直在告诉自己我应该看到它的到来。但我没有。我以为创造力是安全的。"

另一个声音："我们都那样想过。"

又一个："那是他们想让我们想的。我们应该知道。如果我们没有准备好，那是我们的错。"

对话从那里流淌出来，每个人都在马赛克上添加自己的一块。一位热爱她工作的前会计师。一位训练了取代他的AI的软件开发者。一位花了二十年建立专业知识，却眼睁睁看着它一夜之间过时的记者。

Sarah听着，她的心因认同而疼痛。这些是她的人。不是因为他们分享她的职业，而是因为他们分享她的问题：现在怎么办？

当轮到她时，她不确定自己是否想说话。但房间里的某种能量把话从她身上拉了出来。

"我是Sarah。我是个作家。或者我曾经是。"她停顿了一下，整理思绪。"我一直在思考什么使我们成为人。什么使我们的工作有意义。我不断回到这一点：AI可以复制我们的产出，但它不能复制我们的经历。它不能知道失去你热爱的东西是什么感觉。"

房间安静了一会儿。然后Diana说话了。

"这就是我们在这里建设的东西，"她说，"一个为AI无法复制的东西准备的空间。经历。连接。弄清楚接下来会发生什么的混乱、复杂的过程。"

正式会议结束后，人们逗留，形成更小的对话。Sarah发现自己与一位前营销高管James交谈，他创办了一家咨询公司，帮助公司以道德的方式导航AI过渡。

"需求实际上很大，"他说，"公司正在意识到，不经思考地取代人类是一场公关噩梦。他们中的一些人实际上想做得更好——他们只是不知道怎么做。"

"你帮助他们更温和地解雇人？"Sarah无法掩饰声音中的锋芒。

James没有退缩。"我帮助他们思考全貌。他们正在失去什么技能？什么知识走出大门？当你用算法取代经验时，公司文化会发生什么？有时，答案仍然是自动化。但至少这是一个知情的决定。"

这不是一个完美的答案，但它是某种东西。一种留在游戏中的方式，即使规则在改变。

Elena出现在Sarah身边。"我和Diana谈过了，"她轻声说，"她认识一个正在为转型工人创办非营利组织的人。职业咨询、法律支持、社区建设。他们需要一个有HR经验的人。"

Sarah看着她的朋友。"你在考虑吗？"

"我在考虑很多事情。"Elena的表情若有所思。"几个月来第一次，我在思考可能性，而不仅仅是生存。"

当她们离开社区中心时，夜空感觉不同了——更凉爽、更清澈。Sarah抬头看星星，尽管有城市灯光，它们仍然可见。

"我想继续写作，"她说，"不是为了公司。为了我自己。为了像我们这样的人。"

Elena微笑了。"人的元素集体需要一份通讯。只是说说。"

Sarah笑了——一个真正的笑，几周来的第一个。"那是工作邀请吗？"

"这是一个可能性。这就是我们现在所有人拥有的。"

她们在舒适的沉默中走向汽车，两个朋友在脚下移动的世界中导航。未来仍然不确定。问题仍然没有答案。但第一次，Sarah感觉她在朝某个方向移动，而不是远离它。

而这，她意识到，现在就足够了。',
'{"weather":{"name":"寒冷的黎明","icon":"❄️","description":"清晨时分的寒意觉醒"},"terrain":{"name":"城市天台","icon":"🏙️","description":"从高处俯瞰混乱的视角"},"adventure":{"name":"意外相遇","icon":"🤝","description":"遇到改变你看法的人"},"equipment":{"name":"旧笔记本","icon":"📓","description":"AI无法复制的手写思绪"}}',
5);
```

---

## Task 10: 创建中文版章节数据（第6-8章）

**Files:**
- Create: `migrations/0034_ai_series_01_zh_chapters_part2.sql`

**Step 1: 创建中文版章节SQL文件（第6-8章）**

```sql
-- migrations/0034_ai_series_01_zh_chapters_part2.sql
-- AI职场危机系列 - 第一本：最后的写作者（中文版）- 章节6-8

-- 第6章：选择
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-06-zh', 'preset-ai-001-zh', '选择',
'那个提议在一个周二早晨到来，装在一个印有公司烫金标志的时尚信封里。Sarah立即认出了这个格式——这是他们用于晋升和特别表彰的信封。

但这不是晋升。

"亲爱的Sarah，"信的开头是她已经学会识别的那种谨慎的企业语气，那是温柔地传达坏消息的声音。"随着我们继续发展内容战略，我们很高兴为您提供AI内容策展人的职位。这个兼职角色将利用您的丰富经验，确保我们的AI生成内容保持我们受众重视的人性化触感。"

兼职。这个词像石头一样落在她的胃里。减薪60%。没有福利。没有团队。没有创作控制权。只是……策展。编辑机器生成的内容并假装它很重要。

她读了三遍那封信，仿佛多读几遍可能会揭示一个让它变得可以接受的隐藏条款。但没有。

手机震动了一下。Marcus："听说那个提议了。能谈谈吗？"

她们在常去的咖啡店见面。Marcus看起来比Sarah见过的任何时候都糟——眼下的黑眼圈、手上的轻微颤抖。

"我一直在调查，"他凑近说，"AI不仅是在取代作家。它在从一切中学习。你做的每一个编辑。每一个更正。每一个反馈。系统正在利用你来训练自己变得更像人。"

Sarah盯着他。"你在说什么？"

"我是说如果你接受这份工作，你不仅仅是在策展内容。你是在训练你的替代品。你在让AI更好地成为你。"

咖啡店的噪音消退到背景中。Sarah感觉自己像在水下，声音沉闷而遥远。

"你知道多久了？"

"我怀疑了一段时间。我昨天确认了。"Marcus的声音沉重着内疚。"对不起，Sarah。我应该早点告诉你。"

她想生气。她想责怪他，把她所有的恐惧和挫折引导到一个单一的目标上。但看着他的脸，她看到了同样的绝望。他被困在同一个系统中，构建最终会让他过时的工具。

"我该怎么办？"她问，"如果我不接受这份工作，我就失去一切。如果我接受，我在帮助他们更快地取代我。"

Marcus没有答案。随后的沉默也没有。

那天晚上，Sarah坐在办公桌前，盯着那封信。人的元素集体通讯草稿在她的屏幕上打开——她为他们写的第一篇文章，关于在流离失所面前寻找社区。它很好。也许是她多年来写的最好的东西。

但它不付账单。它不提供健康保险。它不给她花了职业生涯建立的保障。

手机又震动了。Elena："晚餐？我有关于非营利组织的消息。"

Sarah差点没有回复。决定的重压压在她身上，让一切感觉不可能。

但她确实回复了。因为人类就是这样——即使痛苦，我们也继续连接。即使我们不确定是否有人会回应，我们也继续伸出援手。

"好的。我家。晚上七点。"

当她准备迎接Elena的到来时，Sarah做了一个决定。不是关于工作——那个选择仍然感觉不可能。而是关于别的东西。感觉更重要的东西。

她打开一个新文档开始写作。

不是为了公司。不是为了通讯。为了她自己。

"今天我收到了一份要求我训练自己替代品的工作邀请。讽刺没有逃过我的注意。我花了职业生涯写作关于转变——个人成长、职业发展、人类无尽的变化能力。但我从未想象过我会是被改变出存在的那个人。"

文字流淌着，诚实而原始。这就是她所做的。这就是她是谁。不是内容策展人或AI训练师或企业员工。一个作家。一个通过文字理解世界的人。

也许，最终，这才是重要的选择。不是是否接受工作或拒绝它。而是是否继续做自己，即使世界试图把她变成别的什么。

她保存了文档。然后她打开通讯草稿开始修改它，添加她刚刚发现的真相。

选择不是关于生存。它是关于身份。这是没有算法能从她那里夺走的东西。',
'{"weather":{"name":"阴雨绵绵的下午","icon":"🌧️","description":"忧郁的雨水映照内心的波澜"},"terrain":{"name":"咖啡店","icon":"☕","description":"啜饮间坦诚对话的地方"},"adventure":{"name":"职业十字路口","icon":"🎯","description":"改变一切的时刻"},"equipment":{"name":"笔记本电脑","icon":"💻","description":"她的谋生工具，现在是她的竞争对手"}}',
6);

-- 第7章：清算
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-07-zh', 'preset-ai-001-zh', '清算',
'Elena带来的消息改变了一切。

"非营利组织获得资金了，"她还没进门就说，"大型基金会资助。足够雇佣三名全职员工，包括一位HR总监。"

Sarah盯着她的朋友。"你是认真的？"

"完全认真。他们想要我。而且……"Elena犹豫了一下，"他们问我是否认识任何可能想帮忙做传播的作家。内容战略。讲故事。"

含义悬在她们之间的空气中。一条出路。不仅是为Elena，也为Sarah。一个做有意义工作的机会，帮助人们导航她们正在经历的同样转变。

但有一个陷阱。总是有陷阱的。

"薪水是……"Elena做了个鬼脸，"大约是我们以前收入的一半。可能更少，一旦把福利算进去。"

Sarah想到放在她桌上的企业提议。兼职，但报酬更好。训练自己的替代品，但经济安全。原则与生存之间的选择。

"我实际上会做什么？"她问。

"写作。真正的写作。关于转型工人的故事。为面临流离失所的人提供的资源。关于政策变化的倡导文章。"Elena的眼睛亮了起来，"这不光鲜，但它有意义。我们实际上可以帮助人们。"

"帮助"这个词在Sarah的胸膛中共鸣。她想到人的元素集体，想到她在那里遇到的人——他们的故事、他们的挣扎、他们在一个将他们推到一边的世界中寻找意义。她想到自己的写作，那篇从个人练习成长为可能真正有意义的东西的随笔。

"我需要考虑一下，"她说。

Elena点点头。"我知道。这不是一个容易的决定。"

那天晚上，Sarah睡不着。她躺在床上，在脑海中反复权衡这些选择，就像手中的石头。企业工作：安全、熟悉、慢慢侵蚀她的灵魂。非营利组织：不确定、挑战、与她真正关心的一切一致。

凌晨三点，她起床打开笔记本电脑。随笔已经增长到近一万字——一部关于流离失所的个人编年史，一篇关于在算法时代做人的意义的冥想。她每天都在添加，有时只是一段，有时几页。

她滚动到最后，读她前一天晚上写的东西：

"选择不是在成功与失败之间。而是在两种不同的成功定义之间。一种以安全和地位衡量。另一种以意义和连接衡量。也许这就是AI时代迫使我们回答的真正问题：我们实际上重视什么？不是我们说我们重视的，而是当筹码落下时我们选择什么。"

她添加了一个新段落：

"今晚，我必须做出选择。不仅是关于一份工作，而是关于我想成为谁。安全的道路还是有意义的道路。已知的还是未知的。生存版的自己还是成长的版本。"

她保存了文档。然后她打开电子邮件开始撰写一条消息。

不是给公司。不是接受或拒绝他们的提议。

给Elena。

"我加入。让我们做这个。"

她在能够重新考虑自己之前点击了发送。然后她坐回去看着屏幕，感觉到了几个月来没有感觉到的某种东西。

不是希望，确切地说。不是确定性。

而是某种像目标的东西。那种她终于朝正确方向移动的感觉，即使她看不到目的地。

第二天早晨，她醒来看到Elena的回复："我就知道你会答应。欢迎加入抵抗。"

Sarah笑了——一个真正的笑，那种来自深处某个地方的笑。抵抗。听起来很戏剧化，但也许这就是它。不是对AI的战争，而是为人性的战斗。为算法无法复制的东西。

她最后一次打开她的随笔，添加了最后一行：

"这不是我故事的结束。这是新章节的开始。我要自己写它。"

然后她合上笔记本电脑，穿好衣服，走进一个仍在转变的世界。但这一次，她不是被水流带着走。

她在选择自己的方向。',
'{"weather":{"name":"暴风雨将至","icon":"⛈️","description":"紧张如乌云聚集"},"terrain":{"name":"家庭办公室","icon":"🏠","description":"独处、反思、屏幕的光芒"},"adventure":{"name":"深夜加班","icon":"🌙","description":"办公室空荡时，真相浮现"},"equipment":{"name":"智能手机","icon":"📱","description":"与世界的连接，坏消息的传递者"}}',
7);

-- 第8章：新的开始
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-ai001-08-zh', 'preset-ai-001-zh', '新的开始',
'六个月后，Sarah站在一群陌生人面前讲述她的故事。

非营利组织的增长比任何人预期的都要快。从一个小的支持网络开始，它已经成为一个为导航AI流离失所的工人提供的全国资源中心。而Sarah——出乎她所有的预期——已经成为其最可见的声音之一。

"三十万人读过我的随笔，"她告诉观众，"不是因为我出名。不是因为我特别。而是因为我讲述的故事现在是每个人的故事。我们都在试图弄清楚在一个不断重新定义人类存在意义的世界里做人的意义。"

房间挤满了人——记者、政策制定者、企业领导，以及处于她经历过的转变各个阶段的工人。一个纪录片摄制组在后面拍摄。一位出版商已经联系她，要把她的随笔变成一本书。

这些都不是她计划的。这些都不是她想要的，当她以为自己想要安全、地位和有风景的角落办公室时。

但站在这里，看着所有这些面孔，她意识到了一些重要的事情。AI没有夺走她的声音。它迫使她找到了自己的声音。

演讲结束后，一位年轻女性走近她。她不可能超过二十五岁，带着面临第一次真正危机的人那种焦虑的能量。

"我也是个作家，"她说，"或者我曾经是。我的公司刚刚宣布他们正在转向AI内容。我不知道该怎么办。"

Sarah认出了她眼中的恐惧。不久以前，她也戴着同样的表情。

"你喜欢什么样的写作？"她问。

"个人随笔。关于真实人物的故事。那种让你感觉不那么孤单的东西。"

Sarah微笑了。"那就继续写那个。不是为了公司。为了你自己。为了需要听到它的人。"

"但我怎么谋生？"

"这就是问题，不是吗？"Sarah从包里拿出一张名片，"来参加我们的下次会议。带上你的写作。有比你想象的更多的选择——不是所有都明显，不是所有都容易。但你并不孤单。"

年轻女性接过名片，她的表情从绝望转变为某种像希望的东西。"谢谢你，"她低声说。

Sarah看着她走开，记起几个月前她站在同样位置时的感觉。迷失。害怕。不确定。

但不再是这样了。

那天晚上，她和Elena、Marcus一起吃晚餐。她们三个成了不太可能的朋友——不是因职业而联合，而是因她们共同经历的转变。

"基金会想要扩展，"Elena在吃意大利面的间隙说，"国际项目。政策倡导。他们在谈论让我们成为AI过渡支持的首选资源。"

Marcus点点头。"我一直在为想要更好处理这些过渡的科技公司做咨询。实际上对道德AI实施有需求。谁知道呢？"

Sarah笑了。"一年前，我们都害怕变得过时。现在看看我们。"

"我们没有过时，"Elena坚定地说，"我们进化了。不同，但不更少。"

对话继续，从工作流向生活，流向她们都在导航的陌生新世界。餐厅窗外，城市以其惯常的能量嗡嗡作响——人们过着他们的生活，没有意识到周围正在发生的转变。

那天晚上晚些时候，Sarah独自走回家。街道很安静，空气凉爽而清澈。她想到发生的一切——她失去的工作、她质疑的身份、她找到的社区。

手机震动了一下。出版商的消息："喜欢今天的演讲。下周我们讨论书籍交易。"

她微笑了，但没有立即回复。相反，她打开笔记应用开始写作：

"六个月前，我以为我的故事正在结束。我错了。它只是在改变类型——从企业戏剧到更有趣的东西。更人性。更真实。

AI没有取代我。它推动我成为我可能永远不会成为的东西。一个因为有事要说而写作的作家，不是因为有人付钱让她说。

这是幸福的结局吗？我不知道。这根本不是结局。这是一个新的开始。我一次一个字地写着它。"

她保存了笔记，抬头看天空。几颗星星透过城市灯光可见，广阔黑暗中的微小光点。

未来仍然不确定。问题仍然没有答案。但很长时间以来第一次，Sarah感到为接下来的一切做好了准备。

她仍然是一个作家。她才刚刚开始。

全文完',
'{"weather":{"name":"阳光明媚的早晨","icon":"☀️","description":"明亮的开始，充满虚假的希望"},"terrain":{"name":"城市天台","icon":"🏙️","description":"从高处俯瞰混乱的视角"},"adventure":{"name":"意外相遇","icon":"🤝","description":"遇到改变你看法的人"},"equipment":{"name":"旧笔记本","icon":"📓","description":"AI无法复制的手写思绪"}}',
8);
```

---

## Task 11: 更新静态页面生成脚本

**Files:**
- Modify: `scripts/generate-preset-pages.js`

**Step 1: 在sqlPaths数组中添加新SQL文件**

在 `scripts/generate-preset-pages.js` 文件中找到 `sqlPaths` 数组，添加以下路径：

```javascript
const sqlPaths = [
  // ... 现有路径 ...
  path.join(__dirname, '../migrations/0020_ai_series_01_en_books.sql'),
  path.join(__dirname, '../migrations/0021_ai_series_01_en_characters.sql'),
  path.join(__dirname, '../migrations/0022_ai_series_01_en_plot_cards.sql'),
  path.join(__dirname, '../migrations/0023_ai_series_01_en_chapters_part1.sql'),
  path.join(__dirname, '../migrations/0024_ai_series_01_en_chapters_part2.sql'),
  path.join(__dirname, '../migrations/0030_ai_series_01_zh_books.sql'),
  path.join(__dirname, '../migrations/0031_ai_series_01_zh_characters.sql'),
  path.join(__dirname, '../migrations/0032_ai_series_01_zh_plot_cards.sql'),
  path.join(__dirname, '../migrations/0033_ai_series_01_zh_chapters_part1.sql'),
  path.join(__dirname, '../migrations/0034_ai_series_01_zh_chapters_part2.sql'),
];
```

---

## Task 12: 本地数据库迁移

**Step 1: 执行本地数据库迁移**

```bash
wrangler d1 execute storybook_database --local --file=./migrations/0020_ai_series_01_en_books.sql
wrangler d1 execute storybook_database --local --file=./migrations/0021_ai_series_01_en_characters.sql
wrangler d1 execute storybook_database --local --file=./migrations/0022_ai_series_01_en_plot_cards.sql
wrangler d1 execute storybook_database --local --file=./migrations/0023_ai_series_01_en_chapters_part1.sql
wrangler d1 execute storybook_database --local --file=./migrations/0024_ai_series_01_en_chapters_part2.sql
wrangler d1 execute storybook_database --local --file=./migrations/0030_ai_series_01_zh_books.sql
wrangler d1 execute storybook_database --local --file=./migrations/0031_ai_series_01_zh_characters.sql
wrangler d1 execute storybook_database --local --file=./migrations/0032_ai_series_01_zh_plot_cards.sql
wrangler d1 execute storybook_database --local --file=./migrations/0033_ai_series_01_zh_chapters_part1.sql
wrangler d1 execute storybook_database --local --file=./migrations/0034_ai_series_01_zh_chapters_part2.sql
```

---

## Task 13: 本地数据验证

**Step 1: 验证书籍数据**

```bash
wrangler d1 execute storybook_database --local --command "SELECT book_id, title, language FROM books WHERE book_id LIKE 'preset-ai-%'"
```

预期输出：2条记录（英文版和中文版）

**Step 2: 验证角色数据**

```bash
wrangler d1 execute storybook_database --local --command "SELECT book_id, COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-ai-%' GROUP BY book_id"
```

预期输出：每本书3个角色

**Step 3: 验证卡牌数据**

```bash
wrangler d1 execute storybook_database --local --command "SELECT book_id, sub_type, COUNT(*) as count FROM plot_cards WHERE book_id LIKE 'preset-ai-%' GROUP BY book_id, sub_type"
```

预期输出：每本书每种类型4张卡牌

**Step 4: 验证章节数据**

```bash
wrangler d1 execute storybook_database --local --command "SELECT book_id, COUNT(*) as count FROM chapters WHERE book_id LIKE 'preset-ai-%' GROUP BY book_id"
```

预期输出：每本书8个章节

---

## Task 14: 生成静态页面

**Step 1: 运行静态页面生成脚本**

```bash
node scripts/generate-preset-pages.js
```

**Step 2: 验证生成的文件**

检查以下文件是否存在：
- `src/frontend/books/preset-ai-001.html`
- `src/frontend/books/preset-ai-001-zh.html`
- `src/frontend/chapters/chapter-ai001-01.html` 到 `chapter-ai001-08.html`
- `src/frontend/chapters/chapter-ai001-01-zh.html` 到 `chapter-ai001-08-zh.html`

---

## Task 15: 本地前端测试

**Step 1: 启动本地前端服务**

```bash
wrangler pages dev src/frontend --port=8788
```

**Step 2: 访问测试**

- 公共图书馆: http://localhost:8788/library.html
- 英文书籍详情: http://localhost:8788/books/preset-ai-001.html
- 中文书籍详情: http://localhost:8788/books/preset-ai-001-zh.html
- 英文章节阅读: http://localhost:8788/chapters/chapter-ai001-01.html
- 中文章节阅读: http://localhost:8788/chapters/chapter-ai001-01-zh.html

---

## Task 16: 功能测试验证

**测试清单：**

| 测试项 | 测试方法 | 预期结果 |
|--------|----------|----------|
| 公共图书馆显示 | 访问 library.html | 新书籍显示在列表中 |
| 英文书籍详情页 | 点击英文书籍进入详情 | 书籍信息、角色、卡牌正常显示 |
| 中文书籍详情页 | 点击中文书籍进入详情 | 书籍信息、角色、卡牌正常显示 |
| 英文章节阅读页 | 点击章节进入阅读 | 章节内容完整，格式正确 |
| 中文章节阅读页 | 点击章节进入阅读 | 章节内容完整，格式正确 |
| 角色卡牌显示 | 查看书籍详情页角色区域 | 3个角色卡牌正常显示 |
| 情节卡牌显示 | 查看书籍详情页卡牌区域 | 16张卡牌按类型分组显示 |

---

## Task 17: 更新sitemap.xml

**Files:**
- Modify: `src/frontend/sitemap.xml`

**Step 1: 添加新书籍和章节URL**

在sitemap.xml中添加：

```xml
<!-- AI Series 01 - English -->
<url>
  <loc>https://storybook-adventures.com/books/preset-ai-001.html</loc>
  <lastmod>2026-03-16</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://storybook-adventures.com/books/preset-ai-001.html"/>
  <xhtml:link rel="alternate" hreflang="zh" href="https://storybook-adventures.com/books/preset-ai-001-zh.html"/>
</url>
<!-- AI Series 01 - Chinese -->
<url>
  <loc>https://storybook-adventures.com/books/preset-ai-001-zh.html</loc>
  <lastmod>2026-03-16</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="en" href="https://storybook-adventures.com/books/preset-ai-001.html"/>
  <xhtml:link rel="alternate" hreflang="zh" href="https://storybook-adventures.com/books/preset-ai-001-zh.html"/>
</url>
<!-- Chapters for AI Series 01 - English -->
<url>
  <loc>https://storybook-adventures.com/chapters/chapter-ai001-01.html</loc>
  <lastmod>2026-03-16</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
<!-- ... 继续添加其他章节 ... -->
```

---

## 等待部署指令

**注意：线上部署需要用户明确指令。**

只有当用户明确说以下指令时，才会执行线上部署：
- "部署到线上"
- "发布到生产环境"
- "执行线上部署"
- "deploy to production"

---

## 线上部署命令（等待指令）

```bash
# 线上数据库迁移
wrangler d1 execute storybook_database --remote --file=./migrations/0020_ai_series_01_en_books.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0021_ai_series_01_en_characters.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0022_ai_series_01_en_plot_cards.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0023_ai_series_01_en_chapters_part1.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0024_ai_series_01_en_chapters_part2.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0030_ai_series_01_zh_books.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0031_ai_series_01_zh_characters.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0032_ai_series_01_zh_plot_cards.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0033_ai_series_01_zh_chapters_part1.sql
wrangler d1 execute storybook_database --remote --file=./migrations/0034_ai_series_01_zh_chapters_part2.sql

# 线上前端部署
wrangler pages deploy src/frontend --project-name=storybook --commit-dirty=true
```
