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

  it('应该有8本预设书籍（每种类型2本）', () => {
    expect(sql).toContain('INSERT INTO books');
    expect(sql).toContain('preset-adventure-001');
    expect(sql).toContain('preset-adventure-002');
    expect(sql).toContain('preset-fantasy-001');
    expect(sql).toContain('preset-fantasy-002');
    expect(sql).toContain('preset-romance-001');
    expect(sql).toContain('preset-romance-002');
    expect(sql).toContain('preset-business-001');
    expect(sql).toContain('preset-business-002');
  });

  it('应该有预设角色数据', () => {
    expect(sql).toContain('INSERT INTO characters');
    expect(sql).toContain('char-adventure-');
    expect(sql).toContain('char-fantasy-');
    expect(sql).toContain('char-romance-');
    expect(sql).toContain('char-business-');
  });

  it('应该有预设章节数据', () => {
    expect(sql).toContain('INSERT INTO chapters');
    expect(sql).toContain('chapter-adventure-');
    expect(sql).toContain('chapter-fantasy-');
    expect(sql).toContain('chapter-romance-');
    expect(sql).toContain('chapter-business-');
  });

  it('应该有预设谜题数据', () => {
    expect(sql).toContain('INSERT INTO puzzles');
    expect(sql).toContain('puzzle-adventure-');
    expect(sql).toContain('puzzle-fantasy-');
    expect(sql).toContain('puzzle-romance-');
    expect(sql).toContain('puzzle-business-');
  });

  it('章节应该有selected_cards字段', () => {
    expect(sql).toContain('selected_cards');
    expect(sql).toContain('"weather"');
    expect(sql).toContain('"terrain"');
    expect(sql).toContain('"adventure"');
    expect(sql).toContain('"equipment"');
  });
});
