-- 添加缺失的字段

-- books表添加language字段
ALTER TABLE books ADD COLUMN language TEXT NOT NULL DEFAULT 'zh';

-- plot_cards表添加icon字段
ALTER TABLE plot_cards ADD COLUMN icon TEXT NOT NULL DEFAULT '🎴';

-- 创建language索引
CREATE INDEX IF NOT EXISTS idx_books_language ON books(language);
