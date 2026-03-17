-- Fix preset-ai-014 chapter 8
DELETE FROM chapters WHERE chapter_id = 'chapter-ai014-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai014-08', 'preset-ai-014', 8, 'Epilogue: The Human Economy',
'On his deathbed, Marcus was surrounded by family, friends, and fellow workers from the cooperative he had founded. A reporter asked if he would share what he had learned from his journey.

Marcus gathered his strength. His voice was weak, but his words were clear.

"That we are not defined by our jobs," he said. "We are defined by our humanity. The economy tried to tell us that we were only worth what we could produce. But we proved that we are worth more than that. We proved that human connection, human creativity, human care - these things have value that no machine can replicate."

"And the Displaced? What happens to them now?"

"We will always be with you. Every time technology advances, there will be people left behind. The question is not whether that will happen, but how you respond. Do you discard them? Or do you build a world where everyone has a place?"

His family gathered closer. They had built that world together - not perfectly, but persistently. They had shown that the future could include everyone, if people were willing to fight for it.

Marcus closed his eyes. He had started his journey as a displaced worker, a man who had lost his job to a machine and did not know where he fit in the new world. He had found a new place, a new purpose, a new way to contribute. And in doing so, he had helped build an economy that valued what made people human.

The cooperative he founded continued after his death, growing into a network that employed tens of thousands. His grandchildren carried on his work, advocating for human-centered policies, building new cooperatives, teaching others the lessons he had taught them.

The Displaced movement became part of history, a story of how people fought back when the economy tried to discard them. It was taught in schools, studied by economists, cited by politicians. But more importantly, it was remembered by the people it had helped - the workers who had found new purpose, the communities that had been rebuilt, the families that had been saved from despair.

That was the rebellion worth fighting for.

THE END');
