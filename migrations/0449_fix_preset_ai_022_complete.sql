DELETE FROM chapters WHERE book_id = 'preset-ai-022';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai022-01', 'preset-ai-022', 1, 'The Memory Market',
'In the year 2089, memories had become currency. With neural recording technology, people could extract, store, and trade their experiences. The memory market was the largest economy in the world.

Dr. Sarah Chen was a memory broker - someone who facilitated the exchange of experiences between people. She had seen it all: the wealthy buying happy childhoods, the lonely purchasing love affairs, the curious exploring lives they had never lived.

But Sarah had also seen the dark side. People becoming addicted to purchased memories, losing track of which experiences were their own. Identity fragmentation, memory dependency, the erosion of authentic self.

"The memory market gives people what they want," she told her colleagues. "But it also takes something away. The question is whether the trade is worth it."

Her latest case would force her to confront that question in a way she never expected.'),

('chapter-ai022-02', 'preset-ai-022', 2, 'The Client',
'A man came to Sarah with an unusual request. He wanted to buy a specific memory - not a happy experience or an exciting adventure, but a moment of profound loss.

"I need to understand what grief feels like," he said. "I have never lost anyone. I do not know what that kind of love and loss is like. I want to experience it."

Sarah was troubled. "Why would you want to experience grief?"

"Because it is part of being human. I have purchased joy, excitement, love, wonder. But I have never experienced the depths of human emotion that come with loss. I feel incomplete."

Sarah had encountered many unusual requests, but this one was different. The client was not seeking pleasure; he was seeking authenticity. He wanted to experience the full range of human emotion, even the painful parts.

"I will help you," she said. "But I need to understand more about why."'),

('chapter-ai022-03', 'preset-ai-022', 3, 'The Investigation',
'Sarah investigated her client background. He was a successful memory trader who had bought and sold thousands of experiences. But something was missing from his collection: genuine suffering.

"He has curated a life of positive experiences," Sarah realized. "But in doing so, he has avoided the pain that gives those experiences meaning. He is like someone who has only ever seen the highlights of a film."

She found a donor - someone willing to sell a memory of profound loss. The donor had lost a child years ago and had never fully processed the grief. Selling the memory was a way of letting go.

But as Sarah prepared the transfer, she began to question the ethics of what she was doing. Was it right to sell grief? To commodify the deepest human experiences? The memory market had always troubled her, but this case brought her concerns into sharp focus.'),

('chapter-ai022-04', 'preset-ai-022', 4, 'The Transfer',
'The memory transfer was successful. The client experienced the donor grief - the loss of a child, the emptiness that followed, the slow process of learning to live with absence.

"It is overwhelming," he said afterward. "I had no idea. The depth of it. The way it changes everything."

But something unexpected happened. The donor, having sold the memory, began to heal. Without the vivid recollection of loss, she could process her grief more objectively. The pain was still there, but it was less sharp.

And the client, having experienced genuine grief, began to change. He stopped buying happy memories and started seeking more complex experiences. He wanted to understand the full range of human emotion, not just the pleasant parts.

"This is what I was missing," he told Sarah. "The depth. The meaning. The sense that experiences matter because they can be lost."'),

('chapter-ai022-05', 'preset-ai-022', 5, 'The Revelation',
'Sarah began to see the memory market differently. It was not just about buying and selling experiences; it was about the distribution of human meaning. Some people had too much pain; others had too little. The market allowed for a kind of emotional rebalancing.

But there were risks. People could become addicted to purchased emotions, losing touch with their authentic selves. The wealthy could buy their way into experiences they had not earned. The poor could be forced to sell their most precious memories.

"We need regulation," Sarah argued. "Not to stop the trade, but to ensure it serves human flourishing. Memories are not just commodities; they are the substance of identity."

She began to advocate for reforms: limits on memory sales, protections for vulnerable populations, requirements for counseling before major transactions. The memory market could be a tool for human growth, but only if properly managed.'),

('chapter-ai022-06', 'preset-ai-022', 6, 'The Reform',
'Sarah advocacy led to changes. The memory market was regulated, with safeguards to prevent exploitation and addiction. People could still trade experiences, but with greater awareness of the consequences.

The reforms were controversial. Some argued that they infringed on personal freedom. Others contended that they did not go far enough. But Sarah believed they struck a balance between individual choice and collective responsibility.

"The memory market is a tool," she said. "Like any tool, it can be used well or poorly. Our job is to create the conditions for it to be used well."

The market evolved. New services emerged: memory synthesis (creating artificial experiences), memory editing (modifying existing memories), memory sharing (temporary exchanges without permanent transfer). The possibilities expanded, and so did the ethical challenges.'),

('chapter-ai022-07', 'preset-ai-022', 7, 'The Future',
'Years later, Sarah looked back on her career. The memory market had transformed society in ways both expected and surprising. People were more empathetic, having experienced lives very different from their own. But they were also more fragmented, their identities composed of purchased and original experiences.

"I used to think memories were sacred," she reflected. "That they should not be bought and sold. But I was wrong. Memories are meant to be shared. The question is not whether to trade them, but how to do so in a way that enhances rather than diminishes our humanity."

She had helped shape a new understanding of memory: not as private property, but as a shared resource. Not as fixed identity, but as fluid experience. The memory market had changed what it meant to be human.'),

('chapter-ai022-08', 'preset-ai-022', 8, 'Epilogue: The Shared Mind',
'On her retirement, Sarah was asked what she had learned from her decades in the memory market.

"That we are not as separate as we think," she said. "Our experiences can be shared, our emotions can be transmitted, our lives can intersect in ways we never imagined. The memory market revealed something fundamental about human nature: we are designed to connect, to share, to understand each other from the inside."

"Is that a good thing?"

"It is a powerful thing. And like any power, it can be used for good or ill. The memory market gave us the ability to truly understand each other. What we do with that ability is up to us."

Sarah smiled. She had spent her career trading in memories. Now she would make some new ones of her own - experiences that were hers alone, at least for a while.

THE END');

DELETE FROM characters WHERE book_id = 'preset-ai-022';

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai022-001', 'preset-ai-022', 'Dr. Sarah Chen', 'Memory Broker', 'Ethical, thoughtful, cautious, evolving', 'Professional but warm, uses careful language, wise', '👩‍💼', NULL, NULL, 1),
('char-ai022-002', 'preset-ai-022', 'Marcus', 'Memory Client', 'Searching, wealthy, curious, transforming', 'Direct and questioning, uses transactional language, evolving', '👨', 80, 'Client', 0),
('char-ai022-003', 'preset-ai-022', 'Elena', 'Memory Donor', 'Grieving, healing, generous, resilient', 'Quiet and thoughtful, uses emotional language, brave', '👩', 75, 'Donor', 0);

DELETE FROM plot_cards WHERE book_id = 'preset-ai-022';

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai022-w01', 'preset-ai-022', 'plot', 'weather', 'Market Dawn', '🌅', 'Where memories are traded'),
('card-ai022-w02', 'preset-ai-022', 'plot', 'weather', 'Storm of Emotion', '⛈️', 'When grief is shared'),
('card-ai022-w03', 'preset-ai-022', 'plot', 'weather', 'Clear Understanding', '☀️', 'After truth emerges'),
('card-ai022-w04', 'preset-ai-022', 'plot', 'weather', 'Shared Horizon', '🌤️', 'For connected minds'),
('card-ai022-t01', 'preset-ai-022', 'plot', 'terrain', 'Memory Market', '🏪', 'Where experiences are sold'),
('card-ai022-t02', 'preset-ai-022', 'plot', 'terrain', 'Transfer Clinic', '🏥', 'Where memories move'),
('card-ai022-t03', 'preset-ai-022', 'plot', 'terrain', 'Memory Bank', '🏦', 'Where experiences are stored'),
('card-ai022-t04', 'preset-ai-022', 'plot', 'terrain', 'Shared Mind', '🧠', 'Where we connect'),
('card-ai022-a01', 'preset-ai-022', 'plot', 'adventure', 'The Market', '💰', 'Where it all began'),
('card-ai022-a02', 'preset-ai-022', 'plot', 'adventure', 'The Request', '❓', 'An unusual client'),
('card-ai022-a03', 'preset-ai-022', 'plot', 'adventure', 'The Transfer', '🔄', 'Grief exchanged'),
('card-ai022-a04', 'preset-ai-022', 'plot', 'adventure', 'The Reform', '⚖️', 'Building ethics'),
('card-ai022-e01', 'preset-ai-022', 'plot', 'equipment', 'Memory Chip', '💾', 'The vessel of experience'),
('card-ai022-e02', 'preset-ai-022', 'plot', 'equipment', 'Neural Interface', '🧠', 'The bridge to minds'),
('card-ai022-e03', 'preset-ai-022', 'plot', 'equipment', 'Grief', '💔', 'The deepest memory'),
('card-ai022-e04', 'preset-ai-022', 'plot', 'equipment', 'Connection', '🤝', 'What we share');
