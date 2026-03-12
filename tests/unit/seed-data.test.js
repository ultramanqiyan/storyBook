import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';

describe('预设数据', () => {
  const sqlPath = 'migrations/0002_seed_data.sql';
  let sql = '';

  beforeAll(() => {
    if (existsSync(sqlPath)) {
      sql = readFileSync(sqlPath, 'utf-8');
    }
  });

  it('应该有预设书籍数据', () => {
    expect(sql).toContain('INSERT INTO books');
    expect(sql).toContain('preset-');
    expect(sql).toContain('adventure');
    expect(sql).toContain('fantasy');
  });

  it('应该有4本预设书籍', () => {
    expect(sql).toContain('preset-adventure-001');
    expect(sql).toContain('preset-fantasy-001');
    expect(sql).toContain('preset-romance-001');
    expect(sql).toContain('preset-business-001');
  });

  it('应该有预设角色数据', () => {
    expect(sql).toContain('INSERT INTO characters');
    expect(sql).toContain('char-preset-');
  });

  it('应该有预设情节卡牌数据', () => {
    expect(sql).toContain('INSERT INTO plot_cards');
    expect(sql).toContain('card-preset-');
  });

  it('应该有预设章节数据', () => {
    expect(sql).toContain('INSERT INTO chapters');
    expect(sql).toContain('chapter-preset-');
  });

  it('应该有预设谜题数据', () => {
    expect(sql).toContain('INSERT INTO puzzles');
    expect(sql).toContain('puzzle-preset-');
  });
});
