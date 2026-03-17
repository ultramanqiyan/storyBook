-- Fix preset-ai-014: update character avatars and regenerate chapter 8 with open ending

-- Update character avatars
UPDATE characters SET avatar = '👨‍💼' WHERE char_id = 'char-ai014-001';
UPDATE characters SET avatar = '👩‍💼' WHERE char_id = 'char-ai014-002';
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai014-003';

-- Regenerate chapter 8 with open ending
DELETE FROM chapters WHERE chapter_id = 'chapter-ai014-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai014-08', 'preset-ai-014', 8, 'The Human Economy',
'Years later, Marcus stood before a crowd of thousands at the Global Human Economy Summit. The movement that had started in a small community center had grown into a worldwide phenomenon - a network of displaced workers who had built something new from the ashes of automation.

"Ten years ago, I lost my job to an algorithm," Marcus said. "I thought my life was over. I thought I had been replaced. But I was wrong. I was not replaced - I was displaced. And displacement, I learned, is not the end. It is a beginning."

The crowd cheered. They were teachers, drivers, accountants, writers - people whose professions had been transformed or eliminated by AI. But they had not given up. They had adapted, evolved, created new forms of value that machines could not replicate.

"The human economy is not about competing with AI," Marcus continued. "It is about doing what AI cannot do - building relationships, creating meaning, providing the human touch that makes life worth living. We are not obsolete. We are essential."

After the speech, Sarah approached him. She had been with the movement from the beginning, organizing communities, building networks, advocating for policy changes.

"You have a message," she said, handing him a tablet. "From the AI Ethics Board."

Marcus read the message. It was an invitation - not to testify, not to protest, but to collaborate. The board wanted to create a framework for human-AI economic cooperation, and they wanted Marcus to lead it.

"They want us to help design the future," Marcus said slowly.

"They finally understand what we have been saying all along," Sarah replied. "AI is not the enemy. Displacement without support is the enemy. Isolation is the enemy. But if we build systems that value both human and machine contributions..."

"Then everyone benefits," Marcus finished. "Not just the owners of the algorithms."

He looked at the invitation again. Ten years ago, he had been a displaced worker with no future. Now he was being asked to shape the economic relationship between humans and AI for generations to come.

"Tell them yes," Marcus said. "Tell them we will help build a future where no one is left behind - human or machine."

Sarah smiled. "I already did. They are waiting for your call."

Marcus picked up his phone. The next chapter of the human economy was about to begin, and he was ready to write it.

The displaced had become the architects of a new world.');
