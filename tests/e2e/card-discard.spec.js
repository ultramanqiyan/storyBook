import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

test.describe('卡牌丢弃弹窗测试', () => {
  let db;
  
  test.beforeAll(async () => {
    const d1Dir = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    const files = fs.readdirSync(d1Dir);
    const dbFiles = files.filter(f => f.endsWith('.sqlite') && f !== 'db.sqlite' && !f.endsWith('-shm') && !f.endsWith('-wal'));
    const dbFile = dbFiles.sort((a, b) => {
      const statA = fs.statSync(path.join(d1Dir, a));
      const statB = fs.statSync(path.join(d1Dir, b));
      return statB.size - statA.size;
    })[0];
    const dbPath = path.join(d1Dir, dbFile);
    db = new Database(dbPath);
  });
  
  test.afterAll(async () => {
    if (db) db.close();
  });
  
  test('当卡牌达到上限时显示丢弃弹窗', async ({ page }) => {
    const bookId = 'test-book-discard-' + Date.now();
    const userId = 'test-user-discard';
    
    db.prepare('INSERT OR IGNORE INTO users (user_id, email, password) VALUES (?, ?, ?)').run(userId, 'test-discard@test.com', 'test');
    db.prepare('INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)').run(bookId, userId, '测试丢弃书籍', 'adventure');
    
    for (let i = 0; i < 8; i++) {
      db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run(
        `card-discard-${i}`, bookId, 'plot', 'weather', `天气${i}`, '☀️'
      );
    }
    
    const chapterId = 'chapter-discard-' + Date.now();
    db.prepare('INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES (?, ?, ?, ?, 1)').run(chapterId, bookId, '测试章节', '测试内容');
    
    const puzzleId = 'puzzle-discard-' + Date.now();
    db.prepare('INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES (?, ?, ?, ?, ?, ?)').run(
      puzzleId, chapterId, '测试问题？', 'A', 'choice', '["A","B","C","D"]'
    );
    
    await page.goto(`/chapter.html?id=${chapterId}`);
    
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), userId);
    await page.reload();
    
    await page.waitForTimeout(1000);
    
    const puzzleBtn = page.locator('.scroll-nav-btn:has-text("Riddle"), .scroll-nav-btn:has-text("谜题")');
    if (await puzzleBtn.count() > 0) {
      await puzzleBtn.first().click();
      await page.waitForTimeout(500);
    }
    
    const optionA = page.locator('.puzzle-option:has-text("A")');
    if (await optionA.count() > 0) {
      await optionA.click();
    }
    
    const submitBtn = page.locator('.puzzle-submit');
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
    }
    
    await expect(page.locator('#cardDiscardModal, #discardOverlay')).toBeVisible({ timeout: 5000 });
    
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM puzzles WHERE chapter_id = ?').run(chapterId);
    db.prepare('DELETE FROM chapters WHERE chapter_id = ?').run(chapterId);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM users WHERE user_id = ?').run(userId);
  });
  
  test('选择卡牌后可以丢弃', async ({ page }) => {
    const bookId = 'test-book-discard2-' + Date.now();
    const userId = 'test-user-discard2';
    
    db.prepare('INSERT OR IGNORE INTO users (user_id, email, password) VALUES (?, ?, ?)').run(userId, 'test-discard2@test.com', 'test');
    db.prepare('INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)').run(bookId, userId, '测试丢弃书籍2', 'adventure');
    
    for (let i = 0; i < 8; i++) {
      db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run(
        `card-discard2-${i}`, bookId, 'plot', 'weather', `天气${i}`, '☀️'
      );
    }
    
    const chapterId = 'chapter-discard2-' + Date.now();
    db.prepare('INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES (?, ?, ?, ?, 1)').run(chapterId, bookId, '测试章节', '测试内容');
    
    const puzzleId = 'puzzle-discard2-' + Date.now();
    db.prepare('INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES (?, ?, ?, ?, ?, ?)').run(
      puzzleId, chapterId, '测试问题？', 'A', 'choice', '["A","B","C","D"]'
    );
    
    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), userId);
    await page.reload();
    
    await page.waitForTimeout(1000);
    
    const puzzleBtn = page.locator('.scroll-nav-btn:has-text("Riddle"), .scroll-nav-btn:has-text("谜题")');
    if (await puzzleBtn.count() > 0) {
      await puzzleBtn.first().click();
      await page.waitForTimeout(500);
    }
    
    const optionA = page.locator('.puzzle-option:has-text("A")');
    if (await optionA.count() > 0) {
      await optionA.click();
    }
    
    const submitBtn = page.locator('.puzzle-submit');
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
    }
    
    await expect(page.locator('#cardDiscardModal, #discardOverlay')).toBeVisible({ timeout: 5000 });
    
    const cardItem = page.locator('.discard-card, .card-item').first();
    if (await cardItem.count() > 0) {
      await cardItem.click();
    }
    
    const confirmBtn = page.locator('#confirmDiscardBtn, #btnConfirmDiscard');
    if (await confirmBtn.count() > 0) {
      await confirmBtn.click();
    }
    
    await expect(page.locator('.notification-success, .notification')).toBeVisible({ timeout: 5000 });
    
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM puzzles WHERE chapter_id = ?').run(chapterId);
    db.prepare('DELETE FROM chapters WHERE chapter_id = ?').run(chapterId);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM users WHERE user_id = ?').run(userId);
  });
});
