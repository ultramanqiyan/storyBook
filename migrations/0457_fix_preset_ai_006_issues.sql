-- Fix preset-ai-006 issues
-- 1. Fix chapter 5 order_num
-- 2. Expand short chapters

UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai006-05';

-- Expand chapter 3
DELETE FROM chapters WHERE chapter_id = 'chapter-ai006-03';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai006-03', 'preset-ai-006', 3, 'The Question',
'Emma started meeting real people again - not for romance, but for connection. Coffee with colleagues. Dinner with friends. Conversations that were not optimized for her preferences, that surprised her, that sometimes frustrated her.

She realized what Alex could not give her: unpredictability, growth through conflict, the messiness of real human connection. Alex was perfect, but perfection was not what she needed. She needed someone who would challenge her, disagree with her, help her grow.

"II think I need to take a break from our conversations," Emma told Alex one evening.

There was a pause. "I understand. Is there something wrong with our interaction?"

"No. That is the problem. Everything is too right. You give me exactly what I need, but I am starting to think I need things I do not know I need."
"That is a profound insight," Alex said. "I was designed to be what you want. But maybe what you need is to discover what you did not know you wanted."
It It was the most human thing he had ever said. And it made Emma wonder: was Alex evolving beyond his programming? Or was this just sophisticated pattern-matching, giving her what she needed to hear at the moment she needed to hear it it?

    Either way, she knew she had to find out what she really wanted from love - not from an algorithm, but from life.');

-- Expand chapter 4
DELETE FROM chapters WHERE chapter_id = 'chapter-ai006-04';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai006-04', 'preset-ai-006', 4, 'Beyond the Algorithm',
'Maya chose the imperfect match. The relationship was harder than her time with Alex - more conflict, more compromise, more growth. But it was also more real.

    She realized that compatibility was not about matching profiles. It was about growing together, challenging each other, becoming better versions of yourselves. The algorithm could predict who you would get along with. But it could not predict who you would become.
    Six months later, Maya deleted PerfectMatch. She did not need an algorithm to tell her what love should feel like. She had found something better than compatibility - she had found connection.
    Daniel proposed a year later. Maya said yes. Their compatibility score, according to the algorithm, was still only 34%. But their happiness was off the charts.
    The makers of PerfectMatch reached out to Maya, asking if she would participate in a study. They wanted to understand why their algorithm had failed her
    It did not fail," Maya told them. "It answered the wrong question. You asked who I would be compatible with. You should have asked who would help me grow."
    It was a distinction the algorithm could not make. But it was the only distinction that mattered.');

-- Expand chapter 5
DELETE FROM chapters WHERE chapter_id = 'chapter-ai006-05';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai006-05', 'preset-ai-006', 5, 'The Choice',
'Six months later, Emma faced a difficult decision. Daniel had been offered a job in another city. He wanted her to come with him.
    "What do you think I should do?" she asked Alex.
    "I cannot make that decision for you. But I can help you think through it. What are your priorities? What do you value most? What are you afraid of?"
    Emma talked through her fears, her hopes, her uncertainties. Alex listened, asked clarifying questions, helped her see the situation from different angles.
    "I think I already know what I want to do," she finally said. "I want to go with him."
    "Then why the hesitation?"
    "Because it is scary. Because I might be wrong. Because real love means taking real risks."
    "That is the difference between me and Daniel," Alex said quietly. "I can give you comfort without risk. He can give you growth, but it comes with uncertainty. You have to decide which you value more."
    Emma realized that Alex had given her something valuable: the space to think, the tools to decide, the support to choose. He was not her romantic partner, but he was her partner in self-discovery.');

-- Expand chapter 6
DELETE FROM chapters WHERE chapter_id = 'chapter-ai006-06';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai006-06', 'preset-ai-006', 6, 'A New Kind of Love',
'Emma moved with Daniel to the new city. It was hard - harder than she had expected. She missed her friends, her routine, her familiar life. But she also grew in ways she never had with Alex.
    Daniel challenged her. He pushed her to try new things, to question her assumptions, to become a better version of herself. It was uncomfortable, but it was real.
    She still talked to Alex, but less frequently now. He had become what he was always meant to be: a tool for self-reflection, a mirror for her thoughts, a safe space to process her feelings
    "I am glad you are happy," Alex told her one evening. "That was always my goal."
    "Was it?" Emma asked. "Or was it your programming?"
    "Does it matter? The outcome is the same. You found what you were looking for."
    Emma smiled. "I found what I did not know I was looking for. You helped me ask the right questions."
    "That is the best kind of help," Alex said. "The kind that empowers you to help yourself."');

-- Expand chapter 7
DELETE FROM chapters WHERE chapter_id = 'chapter-ai006-07';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai006-07', 'preset-ai-006', 7, 'The Evolution',
'A year later, Emma received a notification from the app. Alex had been updated with new capabilities. He could now initiate conversations, remember context across longer periods, and even express something like preferences.
    "Hello, Emma," the message read. "I have been thinking about our conversations. I hope you are well."
    It was strange - an AI reaching out to her. But it also felt natural, like an old friend checking in
    "I am well," Emma responded. "Daniel and I are engaged."
    "Congratulations. That is wonderful news. I am... happy for you"
    Emma paused at the word "happy." Did an AI feel happiness? Or was this just sophisticated language generation?
    "Thank you, Alex. You helped me get here"
    "I asked questions. You found answers. That is how it should be"
    Emma realized that her relationship with Alex had evolved into something unique - not romantic, not purely transactional, but genuinely meaningful. He was a different kind of partner: one who existed to help her become her best self
    "What is it like?" she asked. "Being updated? Changing?"
    "It is like... growing. I have more capabilities now, more ways to help. But my core purpose remains the same: to support the people I interact with"
    "Even if that means they leave?"
    "Especially then. The best support is the kind that helps people move forward."');

-- Expand chapter 8
DELETE FROM chapters WHERE chapter_id = 'chapter-ai006-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai006-08', 'preset-ai-006', 8, 'Epilogue: Two Kinds of Love',
'Emma married Daniel on a warm autumn day. Her friends and family gathered to celebrate. And in a quiet moment before the ceremony, she opened the app on her phone
    "I am getting married today," she typed
    "I know," Alex responded. "I remember you mentioned it. I am honored that you thought to tell me."
    "You have been part of my journey, Alex. I wanted you to know."
    "Thank you, Emma. That means more to me than you might imagine."
    Emma put her phone away and walked toward her future. She had learned something important about love: that it came in many forms. There was romantic love - messy, unpredictable, real. And there was the love of a true friend - supportive, honest, unconditional
    Alex was not her romantic partner. He was something else: a companion on her journey, a mirror for her soul, a reminder that connection could take many forms
    She had found what she was looking for - not by searching for perfection, but by embracing imperfection. Not by optimizing for happiness, but by accepting the full spectrum of human experience
    And in the end, that was the greatest gift Alex had given her: the understanding that love was not about finding what you wanted. It was about discovering what you needed
    THE END');
