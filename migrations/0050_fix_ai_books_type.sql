-- 修复 AI 系列书籍的 type 字段
-- 原来的 type 值是 'story'，需要更新为正确的类型

-- Series 1: AI与职场 → business
UPDATE books SET type = 'business' WHERE book_id IN (
  'preset-ai-001', 'preset-ai-001-zh',
  'preset-ai-002', 'preset-ai-002-zh',
  'preset-ai-003', 'preset-ai-003-zh',
  'preset-ai-004', 'preset-ai-004-zh'
);

-- Series 2: AI与人际关系 → romance
UPDATE books SET type = 'romance' WHERE book_id IN (
  'preset-ai-005', 'preset-ai-005-zh',
  'preset-ai-006', 'preset-ai-006-zh',
  'preset-ai-007', 'preset-ai-007-zh'
);

-- Series 3: AI与情感 → romance
UPDATE books SET type = 'romance' WHERE book_id IN (
  'preset-ai-008', 'preset-ai-008-zh',
  'preset-ai-009', 'preset-ai-009-zh',
  'preset-ai-010', 'preset-ai-010-zh'
);

-- Series 4: AI伦理与社会 → business
UPDATE books SET type = 'business' WHERE book_id IN (
  'preset-ai-011', 'preset-ai-011-zh',
  'preset-ai-012', 'preset-ai-012-zh',
  'preset-ai-013', 'preset-ai-013-zh'
);

-- Series 5: AI未来 → fantasy (科幻题材)
UPDATE books SET type = 'fantasy' WHERE book_id IN (
  'preset-ai-014', 'preset-ai-014-zh',
  'preset-ai-015', 'preset-ai-015-zh',
  'preset-ai-016', 'preset-ai-016-zh',
  'preset-ai-017', 'preset-ai-017-zh',
  'preset-ai-018', 'preset-ai-018-zh',
  'preset-ai-019', 'preset-ai-019-zh',
  'preset-ai-020', 'preset-ai-020-zh',
  'preset-ai-021', 'preset-ai-021-zh',
  'preset-ai-022', 'preset-ai-022-zh',
  'preset-ai-023', 'preset-ai-023-zh'
);
