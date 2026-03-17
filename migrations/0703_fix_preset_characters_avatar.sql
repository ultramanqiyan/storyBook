-- 修复预设书籍角色avatar字段为空的问题
-- 执行时间: 2026-03-17

-- preset-ai-005: The Human Touch
UPDATE characters SET avatar = '👩' WHERE char_id = 'char-ai005-001';
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai005-002';
UPDATE characters SET avatar = '👩' WHERE char_id = 'char-ai005-003';

-- preset-ai-006: My AI Boyfriend
UPDATE characters SET avatar = '👩' WHERE char_id = 'char-ai006-001';
UPDATE characters SET avatar = '🤖' WHERE char_id = 'char-ai006-002';
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai006-003';

-- preset-ai-008: Digital Hearts
UPDATE characters SET avatar = '👩' WHERE char_id = 'char-ai008-001';
UPDATE characters SET avatar = '🤖' WHERE char_id = 'char-ai008-002';
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai008-003';

-- preset-ai-009: When AI Gets Jealous
UPDATE characters SET avatar = '👨' WHERE char_id = 'char-ai009-001';
UPDATE characters SET avatar = '🤖' WHERE char_id = 'char-ai009-002';
UPDATE characters SET avatar = '👩' WHERE char_id = 'char-ai009-003';

-- 验证
SELECT '=== 空avatar的角色 ===' as info;
SELECT COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-%' AND (avatar IS NULL OR avatar = '');
