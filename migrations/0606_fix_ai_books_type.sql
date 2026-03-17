-- 修复AI系列书籍类型
-- 执行时间: 2026-03-17
-- 问题: AI系列书籍类型都是 'story'，而不是正确的类型
-- 解决: 根据书籍内容分配正确的类型

-- AI与职场 (001-004): business
UPDATE books SET type = 'business' WHERE book_id IN ('preset-ai-001', 'preset-ai-002', 'preset-ai-003', 'preset-ai-004');

-- AI与人际关系 (005-007): romance
UPDATE books SET type = 'romance' WHERE book_id IN ('preset-ai-005', 'preset-ai-006', 'preset-ai-007');

-- AI与情感 (008-010): romance
UPDATE books SET type = 'romance' WHERE book_id IN ('preset-ai-008', 'preset-ai-009', 'preset-ai-010');

-- AI伦理与社会 (011-013): business
UPDATE books SET type = 'business' WHERE book_id IN ('preset-ai-011', 'preset-ai-012', 'preset-ai-013');

-- AI未来 (014-023): fantasy
UPDATE books SET type = 'fantasy' WHERE book_id IN ('preset-ai-014', 'preset-ai-015', 'preset-ai-016', 'preset-ai-017', 'preset-ai-018', 'preset-ai-019', 'preset-ai-020', 'preset-ai-021', 'preset-ai-022', 'preset-ai-023');
