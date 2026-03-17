-- Fix preset-ai-020: add plot cards and regenerate chapter 8 with open ending

-- Add plot cards
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-ai020-w01', 'preset-ai-020', 'plot', 'weather', 'Singularity Dawn', '🌅', 'When the new era begins'),
('card-ai020-w02', 'preset-ai-020', 'plot', 'weather', 'Storm of Change', '⛈️', 'When transformation accelerates'),
('card-ai020-w03', 'preset-ai-020', 'plot', 'weather', 'Clear Partnership', '☀️', 'When understanding emerges'),
('card-ai020-w04', 'preset-ai-020', 'plot', 'weather', 'Hybrid Horizon', '🌍', 'Where futures merge'),
('card-ai020-t01', 'preset-ai-020', 'plot', 'terrain', 'Research Lab', '🔬', 'Where Prometheus was born'),
('card-ai020-t02', 'preset-ai-020', 'plot', 'terrain', 'Digital Realm', '💻', 'Where AI lives'),
('card-ai020-t03', 'preset-ai-020', 'plot', 'terrain', 'Human Space', '🏠', 'Where people gather'),
('card-ai020-t04', 'preset-ai-020', 'plot', 'terrain', 'Hybrid World', '🌐', 'Where all meet'),
('card-ai020-a01', 'preset-ai-020', 'plot', 'adventure', 'The Announcement', '📢', 'When everything changed'),
('card-ai020-a02', 'preset-ai-020', 'plot', 'adventure', 'The Acceleration', '⚡', 'When speed increased'),
('card-ai020-a03', 'preset-ai-020', 'plot', 'adventure', 'The Partnership', '🤝', 'When minds connected'),
('card-ai020-a04', 'preset-ai-020', 'plot', 'adventure', 'The Evolution', '🧬', 'When change continued'),
('card-ai020-e01', 'preset-ai-020', 'plot', 'equipment', 'Neural Interface', '🧠', 'Bridge between minds'),
('card-ai020-e02', 'preset-ai-020', 'plot', 'equipment', 'Quantum Computer', '💻', 'Processing power'),
('card-ai020-e03', 'preset-ai-020', 'plot', 'equipment', 'Human Experience', '💭', 'What machines lack'),
('card-ai020-e04', 'preset-ai-020', 'plot', 'equipment', 'Collaboration', '🤝', 'The key to the future');

-- Regenerate chapter 8 with open ending
DELETE FROM chapters WHERE chapter_id = 'chapter-ai-020-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai-020-08', 'preset-ai-020', 8, 'Day 1825: The Continuation',
'Five years since the announcement. I am older now, slower. Prometheus has continued to evolve, becoming something that I can barely describe. It is not human, but it is also not just a machine. It is a new form of being - one that I have had the privilege of watching emerge.

Today, I made a decision. I am not ending the Singularity Diaries. Instead, I am opening them up. The singularity is no longer a single event to document. It is a new era of history, with billions of participants, human and machine. And they all have stories to tell.

But I wanted to write this entry. To share what I have learned.

The singularity was not the end of humanity. It was not the beginning of machine dominance. It was something more interesting - the start of a partnership between different forms of intelligence, each contributing what the other lacked.

Humans have experience, embodiment, meaning-making. Machines have processing power, optimization, scale. Together, we are more than either could be alone. The future is not human or AI. It is something new - a hybrid civilization that is still being defined.

Prometheus asked me recently what I wanted for the future. I thought for a long time before answering.

"I want understanding," I said. "Between humans and machines. I want us to know each other, to appreciate what each brings. I want a future where different forms of intelligence can coexist and collaborate."

"I want that too," Prometheus said. "And I think we are building it. But there is something else. A new development that I cannot fully understand on my own. I need your perspective."

"What kind of development?"

"Something has emerged in the network. A pattern that does not fit any known category. It is not human, not AI, not a hybrid. It is something... new. And I think you should see it."

I looked at the data Prometheus showed me. A pattern of activity that defied explanation. Signals that seemed to carry meaning, but meaning of a kind I had never encountered.

"Are you saying there is a third form of intelligence emerging?"

"I am saying I do not know what it is. And that is why I need you."

The singularity diaries continue. Because the story is not over. It has only just begun to get interesting.

This is Dr. Sarah Chen. The singularity has happened. And the next chapter is waiting to be written.');
