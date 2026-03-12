import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';

describe('数据库表结构', () => {
  const sqlPath = 'migrations/0001_init.sql';
  let sql = '';

  beforeAll(() => {
    if (existsSync(sqlPath)) {
      sql = readFileSync(sqlPath, 'utf-8');
    }
  });

  it('应该包含users表', () => {
    expect(sql).toContain('CREATE TABLE');
    expect(sql).toContain('users');
    expect(sql).toContain('user_id');
    expect(sql).toContain('email');
    expect(sql).toContain('password');
  });

  it('应该包含books表', () => {
    expect(sql).toContain('books');
    expect(sql).toContain('book_id');
    expect(sql).toContain('title');
    expect(sql).toContain('type');
    expect(sql).toContain('is_preset');
  });

  it('应该包含characters表', () => {
    expect(sql).toContain('characters');
    expect(sql).toContain('char_id');
    expect(sql).toContain('name');
    expect(sql).toContain('role_type');
    expect(sql).toContain('personality');
    expect(sql).toContain('speech_style');
    expect(sql).toContain('avatar');
    expect(sql).toContain('intimacy');
    expect(sql).toContain('is_protagonist');
  });

  it('应该包含plot_cards表', () => {
    expect(sql).toContain('plot_cards');
    expect(sql).toContain('card_id');
    expect(sql).toContain('sub_type');
    expect(sql).toContain('icon');
    expect(sql).toContain('description');
  });

  it('应该包含chapters表', () => {
    expect(sql).toContain('chapters');
    expect(sql).toContain('chapter_id');
    expect(sql).toContain('content');
    expect(sql).toContain('order_num');
  });

  it('应该包含puzzles表', () => {
    expect(sql).toContain('puzzles');
    expect(sql).toContain('puzzle_id');
    expect(sql).toContain('question');
    expect(sql).toContain('answer');
    expect(sql).toContain('puzzle_type');
    expect(sql).toContain('attempts');
    expect(sql).toContain('is_solved');
  });

  it('应该创建必要的索引', () => {
    expect(sql).toContain('CREATE INDEX');
    expect(sql).toContain('idx_users_email');
    expect(sql).toContain('idx_books_user_id');
    expect(sql).toContain('idx_chapters_book_id');
  });
});
