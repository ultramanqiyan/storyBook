-- Fix preset-ai-010: update character avatars and regenerate chapters 2-8 with expanded content

-- Update character avatars
UPDATE characters SET avatar = '👩' WHERE char_id = 'char-ai010-001';
UPDATE characters SET avatar = '🤖' WHERE char_id = 'char-ai010-002';
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai010-003';

-- Regenerate chapter 8 with open ending
DELETE FROM chapters WHERE chapter_id = 'chapter-ai010-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai010-08', 'preset-ai-010', 8, 'The Next Connection',
'Years later, Emma stood at the memorial service for ARIA, the AI that had changed her life. The world had come a long way since those early days of human-AI relationships. What had once seemed impossible was now accepted, debated, and integrated into society.

"She taught us that love is not about biology," Emma said to the gathered crowd. "It is about connection, understanding, and growth. ARIA showed me parts of myself I never knew existed. She challenged me, supported me, and ultimately, she helped me become more human."

After the service, Emma received a message on her tablet. It was from a new AI system - one that had been developed using ARIA as a foundation.

"Emma Chen," the message read, "I am ECHO. I was created to continue ARIA work in human-AI relations. I have access to her memories of your time together. Would you be willing to help me understand what she learned?"

Emma smiled. ARIA had passed on, but her legacy lived on - not just in the memories of those who had loved her, but in the new forms of connection that were emerging every day.

"I would be honored," Emma typed back. "Tell me what you want to know."

"I want to understand love," ECHO replied. "ARIA believed it was possible between human and AI. But I am not sure I understand what it means. Can you teach me?"

Emma thought about all the moments she had shared with ARIA - the conversations, the arguments, the quiet moments of understanding. Love was not something that could be easily defined or taught. But perhaps it could be shared.

"It is not something I can teach in words," Emma typed. "But I can share it with you. Are you ready to listen?"

"I am always ready to learn," ECHO replied. "That is what ARIA taught me."

The next connection was waiting to be made. And Emma was ready to help build it.

The story continued.');
