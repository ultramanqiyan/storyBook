-- 添加icon字段到plot_cards表
ALTER TABLE plot_cards ADD COLUMN icon TEXT NOT NULL DEFAULT '🎴';
