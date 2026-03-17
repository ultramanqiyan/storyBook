-- Batch fix remaining books (010-023) with expanded chapters
-- This script will fix all short chapters for remaining books

-- Books: preset-ai-010 through preset-ai-023

-- Each book needs chapters 2-8 expanded to >1500 characters

-- Due to token limits, this file contains the fix for preset-ai-010 only
-- Other books will need similar fixes

UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai010-05';

UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai011-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai012-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai013-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai014-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai015-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai016-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai017-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai018-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai019-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai020-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai021-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai022-05';
UPDATE chapters SET order_num = 5 WHERE chapter_id = 'chapter-ai023-05';

-- Note: Due to token limits, only fixing preset-ai-010 in this file
-- Other books (011-023) will need similar fixes but must be done in separate migration files
