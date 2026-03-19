-- Fix trademark issue: Replace DeepMind with Prometheus Labs
-- Book: preset-ai-020 "The Singularity Diaries"
-- Date: 2026-03-19

UPDATE chapters
SET content = REPLACE(content, 'DeepMind', 'Prometheus Labs')
WHERE book_id = 'preset-ai-020' AND content LIKE '%DeepMind%';
