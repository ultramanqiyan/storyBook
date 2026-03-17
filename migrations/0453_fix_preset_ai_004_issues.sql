-- Fix preset-ai-004 issues
-- 1. Fix chapter 5 order_num
-- 2. Fix chapter 7 title
-- 3. Add THE END to chapter 8

UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai004-05';

UPDATE chapters SET title = 'The Balance' WHERE chapter_id = 'chapter-ai004-07';

DELETE FROM chapters WHERE chapter_id = 'chapter-ai004-08';

INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES
('chapter-ai004-08', 'preset-ai-004', 8, 'The Future',
'Two years later, David approach had become industry standard. Companies around the world were adopting "wisdom-preserving" AI tools, recognizing that efficiency was not the only metric that mattered.

TechCorp had become a case study in the tech community - not for the initial failure, but for the recovery. The company had rebuilt its codebase with a new philosophy: preserve wisdom, optimize carefully, always understand why.

David had been promoted to Chief Technology Officer. His first act was to create a new role: Code Historian. The job description was simple: "Document the why behind the what. Preserve institutional knowledge. Ensure that every optimization understands what it is removing."

The Code Historian position was filled by Maria, the senior engineer who had first supported David concerns. She had been with the company for fourteen years now, and she knew more about the codebase than anyone. Her job was to ensure that wisdom was never again sacrificed for efficiency.

"I never thought I would have a job like this," Maria told David during her first week. "I always assumed that as I got older, I would become less relevant. But now I realize that my experience is exactly what the company needs."

"That is the lesson," David said. "AI can optimize, but it cannot remember. It can clean up, but it cannot understand why something was written in the first place. That is what humans are for."

CodeOptimizer was still running, but it was a different system now. Every optimization was reviewed by a human before being merged. Every deletion was documented with a reason. Every piece of "redundant" code was preserved in an archive, just in case.

The bugs had stopped. The onboarding time for new engineers had decreased. And perhaps most importantly, the engineers had stopped feeling like they were in competition with the AI. They were partners now, each bringing their own strengths to the work.

David looked out his office window at the city below. Somewhere out there, other companies were still making the same mistakes TechCorp had made - deploying AI to optimize without understanding the hidden costs. But word was spreading. The industry was learning.

His phone buzzed. A message from a CTO at another company: "We are about to deploy an AI code optimizer. Any advice?"

David smiled and typed back: "Remember that the code you are optimizing was written by people who knew things the AI cannot know. Preserve their wisdom. Document your reasons. And always, always ask: what are we losing in the name of efficiency?"

He hit send and leaned back in his chair. The work was never done. But at least now, they were asking the right questions.

THE END');
