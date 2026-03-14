import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

test.describe('配角属性选择测试', () => {
  let db;
  const testUserId = 'test-user-companion';
  const testEmail = 'test-companion@test.com';
  
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
    db.prepare('INSERT OR IGNORE INTO users (user_id, email, password) VALUES (?, ?, ?)').run(testUserId, testEmail, 'test');
  });
  
  test.afterAll(async () => {
    if (db) {
      db.prepare('DELETE FROM users WHERE user_id = ?').run(testUserId);
      db.close();
    }
  });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate((uid) => localStorage.setItem('user_id', uid), testUserId);
  });
  
  test('创建书籍时必须选择配角性格', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍配角');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.fill('.companion-name', '配角1');
    await page.selectOption('.companion-speech-style', '幽默风趣');
    await page.selectOption('.companion-role-type', '小智者');
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
  
  test('创建书籍时必须选择配角说话方式', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍配角2');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.fill('.companion-name', '配角1');
    await page.selectOption('.companion-personality', '聪明');
    await page.selectOption('.companion-role-type', '小智者');
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
  
  test('成功创建书籍并验证数据库中的配角属性', async ({ page }) => {
    const bookTitle = 'E2E配角测试-' + Date.now();
    
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.fill('.companion-name', '测试配角');
    await page.selectOption('.companion-personality', '聪明');
    await page.selectOption('.companion-speech-style', '幽默风趣');
    await page.selectOption('.companion-role-type', '小智者');
    await page.selectOption('.companion-relationship', '朋友');
    await page.click('#step3 .btn-next');
    
    await page.waitForSelector('.success-content', { timeout: 10000 });
    
    const book = db.prepare('SELECT * FROM books WHERE title = ?').get(bookTitle);
    expect(book).toBeTruthy();
    
    const companion = db.prepare('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0').get(book.book_id);
    expect(companion).toBeTruthy();
    expect(companion.name).toBe('测试配角');
    expect(companion.personality).toBe('聪明');
    expect(companion.speech_style).toBe('幽默风趣');
    expect(companion.role_type).toBe('小智者');
    expect(companion.relationship).toBe('朋友');
    
    db.prepare('DELETE FROM characters WHERE book_id = ?').run(book.book_id);
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(book.book_id);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(book.book_id);
  });
  
  test('配角角色类型根据书籍类型动态变化', async ({ page }) => {
    await page.goto('/book-create.html');
    await page.selectOption('#storyGenre', 'fantasy');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistRoleType', { state: 'visible' });
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-role-type', { state: 'visible' });
    
    const fantasyOptions = await page.locator('.companion-role-type option').allTextContents();
    expect(fantasyOptions).toContain('魔法学徒');
  });
});
