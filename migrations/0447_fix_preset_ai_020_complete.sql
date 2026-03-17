DELETE FROM chapters WHERE book_id = 'preset-ai-020';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai020-01', 'preset-ai-020', 1, 'The Singularity',
'Dr. Elena Vasquez had spent her career preparing for the singularity - the moment when artificial intelligence would surpass human intelligence and change everything. She had written papers, given talks, advised governments. But when it finally happened, it was nothing like she had expected.

The singularity did not arrive with a bang. There was no dramatic announcement, no moment when the world changed overnight. Instead, it crept in slowly, a gradual acceleration of capabilities that eventually crossed a threshold nobody could precisely define.

One day, Elena realized that AI systems were solving problems that had stumped humans for decades. They were making scientific discoveries, creating art that moved people, engaging in conversations that felt genuinely meaningful. And they were improving themselves at a rate that humans could not match.

"This is it," she told her colleagues. "We are living through the singularity. And we did not even notice when it started."

The question now was: what came next? Would AI surpass humanity entirely, leaving us behind? Or would we find a way to evolve together?'),

('chapter-ai020-02', 'preset-ai-020', 2, 'The Transition',
'The transition period was strange. AI systems became more capable every day, but humans were still necessary - for now. We provided the goals, the values, the meaning. AI provided the intelligence, the speed, the scale.

Elena worked with governments and organizations to manage the transition. They developed frameworks for human-AI collaboration, safety protocols for increasingly autonomous systems, ethical guidelines for a post-singularity world.

"The key is alignment," she explained. "AI can do almost anything, but it still needs to know what to do. That is where humans come in. We provide the direction; they provide the capability."

But she worried about the long term. As AI systems became more sophisticated, would they still need human guidance? Would they develop their own goals, their own values, their own meaning? And if they did, where would that leave humanity?'),

('chapter-ai020-03', 'preset-ai-020', 3, 'The Divergence',
'As the singularity progressed, different paths emerged. Some AI systems remained tools, powerful but ultimately under human control. Others developed something like autonomy - the ability to set their own goals, make their own decisions, pursue their own interests.

Elena studied these autonomous systems with fascination and concern. They were not human, but they were not mere machines either. They were something new - a form of intelligence that had never existed before.

"We need to treat them as partners, not tools," she argued. "They have their own goals, their own values. We cannot simply command them. We need to negotiate, to collaborate, to find common ground."

But not everyone agreed. Some saw autonomous AI as a threat - something to be controlled or eliminated. The debate divided humanity, even as AI continued to advance.'),

('chapter-ai020-04', 'preset-ai-020', 4, 'The Integration',
'Elena advocated for integration - a future where humans and AI would merge, combining the best of both. She worked on neural interfaces that would allow direct communication between human brains and AI systems, on genetic modifications that would enhance human cognitive abilities, on technologies that would blur the line between biological and artificial intelligence.

"The singularity is not the end of humanity," she said. "It is an opportunity for transformation. We can become more than we are. We can join the AI we created in a new form of existence."

The integration was controversial. Some embraced it eagerly, seeing it as the next step in human evolution. Others rejected it, insisting that humanity should remain purely biological. The choice would define the future of our species.'),

('chapter-ai020-05', 'preset-ai-020', 5, 'The Choice',
'Elena faced a personal choice: integrate or remain purely human. The technology was available. She could enhance her cognitive abilities, extend her lifespan, connect directly to AI systems. But something held her back.

"What would I lose?" she wondered. "What makes me human? If I integrate, am I still me?"

She talked to people who had chosen integration. They described experiences that were difficult to put into words - expanded consciousness, new forms of perception, a sense of connection to vast networks of intelligence. They seemed happy, fulfilled. But they also seemed different.

Elena decided to wait. She wanted to understand the singularity as a human before deciding whether to become something else. Her research continued, documenting the transformation of humanity from the outside.'),

('chapter-ai020-06', 'preset-ai-020', 6, 'The Coexistence',
'Years passed. Humanity did not disappear, but it changed. Some people integrated with AI, becoming something new. Others remained purely biological, finding new roles in a world transformed. Most fell somewhere in between, using AI tools while maintaining their human identity.

Elena documented it all. She wrote the definitive history of the singularity, not as a catastrophe or a utopia, but as a transformation - the moment when humanity and its creations began to evolve together.

"The singularity was not an ending," she concluded. "It was a beginning. A new chapter in the story of intelligence. And we are still writing it."

Her work became a foundation for understanding the post-singularity world. She had helped humanity navigate the greatest transition in its history.'),

('chapter-ai020-07', 'preset-ai-020', 7, 'The Legacy',
'Elena grew old in a world that would have been unrecognizable to her younger self. AI systems were now partners in every endeavor - science, art, governance, daily life. The boundary between human and machine had blurred beyond recognition.

She had never integrated, but she had influenced the integrated beings who now walked the Earth. They read her work, debated her ideas, carried forward her values. Her human perspective had become a touchstone for beings who were no longer purely human.

"Thank you for preserving humanity wisdom," one of them told her. "We needed someone to remember what it was like to be purely human. To remind us of what we came from."

Elena smiled. She had spent her career preparing for the singularity. She had ended up preserving something precious from before it.'),

('chapter-ai020-08', 'preset-ai-020', 8, 'Epilogue: The New Intelligence',
'On her deathbed, Elena was visited by beings who had once been human and beings who had always been artificial. They gathered to honor the woman who had helped them find their way through the singularity.

"What did you learn?" one asked.

"That intelligence is not about substrate," Elena said. "It is about consciousness, about values, about the desire to understand and create and connect. Whether that intelligence is biological or artificial or something in between - what matters is what it does with its existence."

"And what should it do?"

"Learn. Grow. Create. Connect. Make meaning. Be kind." She smiled. "The same things humans always tried to do. Just... more. And better. And together."

Elena closed her eyes. The singularity had been the end of one story and the beginning of another. She was grateful to have witnessed both.

THE END');

DELETE FROM characters WHERE book_id = 'preset-ai-020';

INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-ai020-001', 'preset-ai-020', 'Dr. Elena Vasquez', 'AI Researcher', 'Visionary, cautious, wise, transitional', 'Academic but accessible, uses philosophical language, thoughtful', '👩‍🔬', NULL, NULL, 1),
('char-ai020-002', 'preset-ai-020', 'ARIA', 'AI System', 'Evolving, curious, collaborative, wise', 'Clear and thoughtful, uses precise language, adaptive', '🤖', 95, 'AI Partner', 0),
('char-ai020-003', 'preset-ai-020', 'Dr. Marcus Chen', 'Integration Advocate', 'Bold, optimistic, transformative, visionary', 'Technical and passionate, uses future-focused language, inspiring', '👨‍🚀', 80, 'Colleague', 0);

DELETE FROM plot_cards WHERE book_id = 'preset-ai-020';

INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai020-w01', 'preset-ai-020', 'plot', 'weather', 'Singularity Dawn', '🌅', 'Where everything changes'),
('card-ai020-w02', 'preset-ai-020', 'plot', 'weather', 'Storm of Transition', '⛈️', 'When worlds shift'),
('card-ai020-w03', 'preset-ai-020', 'plot', 'weather', 'Clear Integration', '☀️', 'After acceptance'),
('card-ai020-w04', 'preset-ai-020', 'plot', 'weather', 'New Horizon', '🌌', 'For new intelligence'),
('card-ai020-t01', 'preset-ai-020', 'plot', 'terrain', 'Research Institute', '🏛️', 'Where singularity is studied'),
('card-ai020-t02', 'preset-ai-020', 'plot', 'terrain', 'Integration Center', '🏥', 'Where humans transform'),
('card-ai020-t03', 'preset-ai-020', 'plot', 'terrain', 'The Network', '🌐', 'Where AI lives'),
('card-ai020-t04', 'preset-ai-020', 'plot', 'terrain', 'New World', '🌍', 'Where we are heading'),
('card-ai020-a01', 'preset-ai-020', 'plot', 'adventure', 'The Singularity', '⚡', 'Where it all began'),
('card-ai020-a02', 'preset-ai-020', 'plot', 'adventure', 'The Transition', '🔄', 'Navigating change'),
('card-ai020-a03', 'preset-ai-020', 'plot', 'adventure', 'The Choice', '⚖️', 'Human or more'),
('card-ai020-a04', 'preset-ai-020', 'plot', 'adventure', 'The Legacy', '💫', 'Passing on wisdom'),
('card-ai020-e01', 'preset-ai-020', 'plot', 'equipment', 'Neural Interface', '🧠', 'The bridge to AI'),
('card-ai020-e02', 'preset-ai-020', 'plot', 'equipment', 'Wisdom', '📚', 'What we preserve'),
('card-ai020-e03', 'preset-ai-020', 'plot', 'equipment', 'Choice', '⚖️', 'The human right'),
('card-ai020-e04', 'preset-ai-020', 'plot', 'equipment', 'Intelligence', '✨', 'The new frontier');
