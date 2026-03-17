-- Fix preset-ai-003 chapter 6 - remove THE END
DELETE FROM chapters WHERE chapter_id = 'chapter-ai003-06';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai003-06', 'preset-ai-003', 6, 'A New Protocol',
'One year later, Elena sat in a sunlit office that was nothing like the gray cubicle farm she had left behind. Sarah Content Collective had grown from three people to twenty. Elena had built an HR system from scratch - one that treated employees as partners, not resources.

Her phone buzzed. A text from an old colleague: "Phase 7 layoffs today. 89 names. The algorithm keeps growing."

Elena felt a pang of sympathy for whoever was now sitting in her old office, delivering the news that machines had decided people fates. But she also felt something else: gratitude that she was no longer part of that system.

Jennifer Walsh knocked on her door. "Got a minute?"

"Always."

"I wanted to tell you - that content strategy campaign I pitched a year ago? The one that saved my job? We have scaled it across all our clients. Engagement is up 60%. And the best part - we have hired five more content curators. Real people, with real perspectives, working alongside AI."

Elena smiled. This was what she had been working toward. Not a world without AI, but a world where AI enhanced human potential instead of replacing it.

"Jennifer, I have a proposal for you," Elena said. "How would you feel about leading our content strategy team?"

Jennifer eyes widened. "Are you serious?"

"Completely. You saw something the algorithm could not - that human creativity and AI efficiency are not mutually exclusive. That is exactly the kind of leadership we need."

After Jennifer left, Elena looked out the window at the city below. Somewhere out there, algorithms were still making decisions about people lives. Companies were still "optimizing" their workforces. The pink slip protocol was still running.

But here, in this small corner of the world, something different was growing. A company that valued innovation over efficiency. A system that saw people as more than data points.

Her phone buzzed again. Another text from her old colleague: "They are asking about you. The board wants to know if you would consult on the human review process."

Elena smiled. Maybe the system could change after all. One company at a time. One protocol at a time. One human decision at a time.

She typed back: "Tell them I am busy building something better."');
