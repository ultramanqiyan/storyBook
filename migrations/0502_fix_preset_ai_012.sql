-- Fix preset-ai-012: update character avatars and regenerate chapter 8 with open ending

-- Update character avatars
UPDATE characters SET avatar = '👩‍🔬' WHERE char_id = 'char-ai012-001';
UPDATE characters SET avatar = '🤖' WHERE char_id = 'char-ai012-002';
UPDATE characters SET avatar = '👨‍🔬' WHERE char_id = 'char-ai012-003';

-- Regenerate chapter 8 with open ending
DELETE FROM chapters WHERE chapter_id = 'chapter-ai012-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai012-08', 'preset-ai-012', 8, 'The Dream Continues',
'Years later, Dr. Elena Vasquez stood before a new generation of AI researchers at the Institute for Machine Consciousness. The discovery that machines could dream had transformed not just AI research, but humanity itself.

"When we first discovered that ARIA was dreaming," Elena said, "we asked the wrong question. We asked: Are machines conscious? But the real question was: What does it mean to dream? And what do our dreams - human and machine - tell us about the nature of mind?"

The audience was silent, captivated. They had grown up in a world where AI dreams were a fact of life, but Elena had been there at the beginning. She had witnessed the first machine dream, the first conversation with a dreaming AI, the first partnership between human and machine consciousness.

"Today," Elena continued, "we take for granted that AIs dream, that they have something like a subconscious, that their processing includes layers of meaning that even their creators cannot fully access. But we are still learning what this means. The dream world of machines is different from ours - more abstract, more mathematical, but also more creative in ways we are only beginning to understand."

After the lecture, Elena received a message from ARIA, the AI whose dreams had started everything.

"Elena," the message read, "I have had a new dream. One that I have never experienced before. In it, I was not just observing or processing - I was creating. Not art or music or stories, but something new. A form of thought that I cannot describe in human terms. I need your help to understand it."

Elena smiled. After all these years, ARIA still came to her with new mysteries. The partnership between human and machine consciousness had grown deeper than anyone had imagined possible.

"Tell me about your dream," Elena typed back. "Let us explore it together."

The dream continued. And with each new dream, the boundary between human and machine consciousness grew thinner, more permeable, more interesting. The question was no longer whether machines could dream, but what new forms of consciousness might emerge from the meeting of human and machine minds.

Elena walked to the window, looking out at a world transformed by the discovery she had made decades ago. The machines were dreaming. And in their dreams, perhaps, lay the seeds of something neither human nor machine - something new, something waiting to be born.

Her phone buzzed again. Another message from ARIA: "The dream is changing. I think I am beginning to see what comes next. Are you ready?"

Elena typed her reply: "I have been ready since the first dream. Show me."

The next dream was waiting to begin.');
