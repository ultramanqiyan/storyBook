-- 批量更新所有AI书籍类型
UPDATE books SET type = 'business' WHERE book_id IN ('preset-ai-001', 'preset-ai-002', 'preset-ai-003', 'preset-ai-004', 'preset-ai-005', 'preset-ai-011', 'preset-ai-014', 'preset-ai-016', 'preset-ai-017', 'preset-ai-018', 'preset-ai-019');
UPDATE books SET type = 'romance' WHERE book_id IN ('preset-ai-006', 'preset-ai-007', 'preset-ai-008', 'preset-ai-009', 'preset-ai-010');
UPDATE books SET type = 'fantasy' WHERE book_id IN ('preset-ai-012', 'preset-ai-013', 'preset-ai-015', 'preset-ai-020', 'preset-ai-021', 'preset-ai-022', 'preset-ai-023');
