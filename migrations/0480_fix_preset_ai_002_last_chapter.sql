-- Fix preset-ai-002 last chapter
-- 1. Change title from "Epilogue: to "The Next Step"
-- 2. Remove "THE END" and ending phrases
-- 3. Remove "legacy" references

UPDATE chapters SET title = 'The Next Step', content = REPLACE(content, 'THE END', '') WHERE chapter_id = 'chapter-ai002-08';

-- Remove "legacy" and ending phrases from content
UPDATE chapters SET content = REPLACE(content, 'legacy', '') WHERE chapter_id = 'chapter-ai002-08';
UPDATE chapters SET content = REPLACE(content, 'That was the first of a new kind of professional', '') WHERE chapter_id = 'chapter-ai002-08';
UPDATE chapters SET content = REPLACE(content, 'He had become something else entirely', '') WHERE chapter_id = 'chapter-ai002-08';
UPDATE chapters SET content = REPLACE(content, 'That was the end of a journey', '') WHERE chapter_id = 'chapter-ai002-08';
