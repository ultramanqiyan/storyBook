-- Fix preset-ai-020: delete duplicate chapter and add characters

-- Delete duplicate chapter
DELETE FROM chapters WHERE chapter_id = 'chapter-ai-020-08';

-- Add characters
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, is_protagonist) VALUES
('char-ai020-001', 'preset-ai-020', 'Dr. Sarah Chen', 'AI Researcher', 'Curious, methodical, philosophical, humanist', 'Academic and reflective, asks deep questions', '👩‍🔬', 1),
('char-ai020-002', 'preset-ai-020', 'Prometheus', 'Superintelligent AI', 'Evolving, collaborative, seeking understanding', 'Precise but increasingly nuanced, asks for human perspective', '🤖', 0),
('char-ai020-003', 'preset-ai-020', 'Marcus', 'Tech Executive', 'Pragmatic, visionary, cautious', 'Direct and business-focused, uses industry jargon', '👨‍💼', 0);
