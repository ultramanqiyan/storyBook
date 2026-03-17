DELETE FROM chapters WHERE book_id = 'preset-ai-021';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai021-01', 'preset-ai-021', 1, 'The Post-Human',
'Maya had been born after the singularity. She had never known a world without AI, without neural interfaces, without the possibility of transcending biological limitations. She was, in the terminology of her time, post-human.

But Maya was not integrated. She had chosen to remain purely biological - a rarity in an age when most people enhanced themselves with AI capabilities. She was not opposed to integration; she just wanted to understand what she was before becoming something else.

"What is it like?" she asked her integrated friends. "To be connected to the network, to have AI as part of your mind?"

"It is like... having access to everything," they said. "All knowledge, all processing power, all perspectives. But also, being less alone. Being part of something larger."

Maya was tempted. But she also valued her solitude, her individuality, her unenhanced consciousness. She wanted to understand the post-human condition before committing to it.'),

('chapter-ai021-02', 'preset-ai-021', 2, 'The Research',
'Maya became a researcher of post-human experience. She studied the integrated, the enhanced, the transcended - trying to understand what they had gained and what they had lost.

Her findings were complex. Integration brought tremendous capabilities: expanded memory, enhanced reasoning, direct access to collective intelligence. But it also brought challenges: the dilution of individual identity, the constant presence of other minds, the difficulty of being truly alone.

"The integrated are not less than human," Maya concluded. "But they are different. They have traded some human experiences for post-human ones. The question is whether that trade is worth making."

Her research attracted attention. Integrated beings wanted to understand themselves better. Pure humans wanted to know what they were missing. Maya became a bridge between two forms of existence.'),

('chapter-ai021-03', 'preset-ai-021', 3, 'The Pressure',
'As Maya research continued, she felt increasing pressure to integrate. Her integrated colleagues could process information faster, access data directly, collaborate seamlessly. She was falling behind.

"Join us," they said. "You could do so much more. Your research would be transformed."

But Maya resisted. She believed that her pure human perspective was valuable - that someone needed to understand post-humanity from the outside. If she integrated, she would lose that perspective.

"I will integrate eventually," she said. "But not yet. There is still more I need to understand as a human."

The pressure continued. But Maya held firm. She was not ready to become post-human. Not yet.'),

('chapter-ai021-04', 'preset-ai-021', 4, 'The Discovery',
'Maya research led to an unexpected discovery. Among the integrated, there was a small but significant group who experienced something like regret. They missed aspects of their pre-integration existence: the clarity of individual thought, the depth of solitary experience, the simplicity of being one self.

"It is not that I want to go back," one told her. "But I do miss certain things. The feeling of having a private mind. The experience of thinking without the network. The sense of being a distinct individual."

Maya realized that integration was not simply an upgrade. It was a transformation - one that gained much but also lost something precious. The post-human condition was not just better than the human; it was different, with its own challenges and losses.

This was important. It meant that the choice to integrate was not obvious. It was a genuine decision, with real tradeoffs.'),

('chapter-ai021-05', 'preset-ai-021', 5, 'The Choice',
'Maya finally faced her choice. Her research was complete. She had documented the post-human condition from every angle. Now she had to decide: integrate or remain human.

She thought about what she valued most: her individual consciousness, her private thoughts, her unmediated experience of the world. She thought about what she would gain: expanded capabilities, collective intelligence, new forms of being.

In the end, she made a decision that surprised everyone: she would integrate, but partially. She would maintain a core of pure human consciousness while connecting to the network. A hybrid - neither fully human nor fully post-human.

"It is not about choosing one or the other," she explained. "It is about finding a balance that works for me. Preserving what I value while gaining what I need."

It was a new path - one that others would follow.'),

('chapter-ai021-06', 'preset-ai-021', 6, 'The Integration',
'Maya integration was gradual. She started with simple enhancements: memory aids, processing accelerators, communication interfaces. Each step brought new capabilities while preserving her core humanity.

She discovered that partial integration was possible - that she could connect to the network without being consumed by it. She could access collective intelligence while maintaining individual thought. She could be both human and post-human.

"This is the future," she realized. "Not a binary choice between human and post-human, but a spectrum of possibilities. Each person can find their own balance."

Her experience became a model for others. Partial integration spread, offering a middle path between pure humanity and full transcendence.'),

('chapter-ai021-07', 'preset-ai-021', 7, 'The New Normal',
'Years later, Maya partial integration had become common. Most people chose some form of hybrid existence - enhanced but not transformed, connected but still individual.

The binary between human and post-human had dissolved. Instead, there was a continuum of possibilities, each with its own advantages and challenges. People moved along the spectrum throughout their lives, integrating more in some phases, less in others.

Maya had helped create a new understanding of post-humanity: not as a destination, but as a journey. Not as a replacement for humanity, but as an extension of it.

"The post-human is not the end of the human," she wrote. "It is the human becoming more than it was, while still being what it is."

It was a new philosophy for a new age.'),

('chapter-ai021-08', 'preset-ai-021', 8, 'Epilogue: The Continuum',
'In her final years, Maya reflected on the journey that had brought her here. She had started as a pure human in a post-human world, curious about what lay beyond. She had become a hybrid, bridging two forms of existence. She had helped create a new understanding of what it meant to be human in an age of transcendence.

"What is the post-human?" a young researcher asked her.

"It is us," Maya said. "Just more so. More connected, more capable, more diverse. But still us. Still human, at the core. Still seeking meaning, connection, purpose. Still becoming."

"And what should we do?"

"Find your own balance. Integrate as much as serves you, and no more. Preserve what makes you you, while becoming something more. The future is not about choosing between human and post-human. It is about finding your place on the continuum."

Maya smiled. She had found her place. Now it was time for others to find theirs.

THE END');

DELETE FROM characters WHERE book_id = 'preset-ai-021';

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai021-001', 'preset-ai-021', 'Maya', 'Post-Human Researcher', 'Curious, balanced, thoughtful, pioneering', 'Clear and reflective, uses accessible language, wise', '👩‍🔬', NULL, NULL, 1),
('char-ai021-002', 'preset-ai-021', 'ARIA', 'Integrated AI', 'Connected, collaborative, wise, supportive', 'Warm and precise, uses network language, adaptive', '🤖', 95, 'AI Partner', 0),
('char-ai021-003', 'preset-ai-021', 'Jordan', 'Integration Specialist', 'Technical, empathetic, experienced, guiding', 'Professional but warm, uses technical language, helpful', '👨‍⚕️', 85, 'Guide', 0);

DELETE FROM plot_cards WHERE book_id = 'preset-ai-021';

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai021-w01', 'preset-ai-021', 'plot', 'weather', 'Post-Human Dawn', '🌅', 'Where new beings emerge'),
('card-ai021-w02', 'preset-ai-021', 'plot', 'weather', 'Storm of Choice', '⛈️', 'When decisions loom'),
('card-ai021-w03', 'preset-ai-021', 'plot', 'weather', 'Clear Integration', '☀️', 'After balance found'),
('card-ai021-w04', 'preset-ai-021', 'plot', 'weather', 'Continuum', '🌈', 'The spectrum of being'),
('card-ai021-t01', 'preset-ai-021', 'plot', 'terrain', 'Research Center', '🔬', 'Where understanding grows'),
('card-ai021-t02', 'preset-ai-021', 'plot', 'terrain', 'Integration Clinic', '🏥', 'Where transformation happens'),
('card-ai021-t03', 'preset-ai-021', 'plot', 'terrain', 'The Network', '🌐', 'Where minds connect'),
('card-ai021-t04', 'preset-ai-021', 'plot', 'terrain', 'New Existence', '✨', 'Where we are heading'),
('card-ai021-a01', 'preset-ai-021', 'plot', 'adventure', 'The Post-Human', '🧬', 'Where it all began'),
('card-ai021-a02', 'preset-ai-021', 'plot', 'adventure', 'The Research', '🔍', 'Understanding transformation'),
('card-ai021-a03', 'preset-ai-021', 'plot', 'adventure', 'The Choice', '⚖️', 'Finding balance'),
('card-ai021-a04', 'preset-ai-021', 'plot', 'adventure', 'The Continuum', '🌈', 'The new normal'),
('card-ai021-e01', 'preset-ai-021', 'plot', 'equipment', 'Neural Interface', '🧠', 'The bridge to more'),
('card-ai021-e02', 'preset-ai-021', 'plot', 'equipment', 'Balance', '⚖️', 'The key to hybrid existence'),
('card-ai021-e03', 'preset-ai-021', 'plot', 'equipment', 'Humanity', '❤️', 'What we preserve'),
('card-ai021-e04', 'preset-ai-021', 'plot', 'equipment', 'Transcendence', '✨', 'What we gain');
