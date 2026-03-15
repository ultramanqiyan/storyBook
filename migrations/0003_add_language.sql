-- 添加language字段到books表
ALTER TABLE books ADD COLUMN language TEXT NOT NULL DEFAULT 'zh';

-- 创建language索引
CREATE INDEX IF NOT EXISTS idx_books_language ON books(language);
