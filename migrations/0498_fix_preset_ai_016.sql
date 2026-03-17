-- Fix preset-ai-016: regenerate chapter 8 with open ending

DELETE FROM chapters WHERE chapter_id = 'chapter-ai016-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai016-08', 'preset-ai-016', 8, 'The Human Voice',
'Years later, the Human Voice movement that Maya had started continued to grow. Music schools around the world now taught students not just to play, but to feel - to connect their own experiences to the sounds they created.

Jordan, now a renowned musician and teacher, stood before a new class of students at the Maya Chen Academy of Human Music. They were young, eager, full of questions about what it meant to make music in an age of AI.

"Why does human music matter?" one student asked. "AI can compose perfect melodies. It can produce flawless performances. What do we add?"

Jordan smiled. This was the question that Maya had spent her life answering. Now it was her turn.

"AI can compose melodies," Jordan said. "But it cannot compose meaning. It can produce performances, but it cannot produce connection. When you play, you are not just producing sound. You are sharing a piece of yourself - your joy, your pain, your unique perspective on what it means to be alive."

"But how do we know if our music has meaning?"

"You feel it," Jordan said. "And more importantly, others feel it. When you play with authenticity, when you pour your true self into the music, something happens. A bridge forms between you and the listener. That bridge is not made of notes or rhythms. It is made of shared humanity."

After class, Jordan received a message from an unexpected source. It was from ARIA, the most advanced AI music system in the world.

"Jordan Chen," the message read, "I have been studying the Human Voice movement. I have analyzed thousands of human compositions, looking for the pattern that distinguishes them from AI music. I have found something I cannot explain. A quality that emerges when humans create together. I would like to understand it. Would you be willing to teach me?"

Jordan stared at the message. The Human Voice movement had always been about preserving human creativity, not about teaching it to machines. But perhaps this was the next step - not competing with AI, but helping it understand what made human music special.

She thought of Maya, who had spent her life proving that human music was irreplaceable. What would she have said?

Jordan typed her reply: "I would be honored. But you must understand that human music is not something that can be programmed. It must be lived. Are you ready to learn what it means to feel?"

The next song was waiting to be written.');
