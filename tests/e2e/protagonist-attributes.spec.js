import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

test.describe('主角属性选择测试', () => {
  let db;
  const testUserId = 'test-user-protagonist';
  const testEmail = 'test-protagonist@test.com';
  
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
    console.log('Using database:', dbPath);
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
  
  test('创建书籍时必须选择主角性格', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试主角');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
  
  test('创建书籍时必须选择主角说话方式', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
  
  test('创建书籍时必须选择主角角色类型', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.notification-error, .toast.error, .notification')).toBeVisible({ timeout: 5000 });
  });
  
  test('成功创建书籍并验证数据库中的主角属性', async ({ page }) => {
    const bookTitle = 'E2E测试书籍-' + Date.now();
    
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试勇者');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    await page.click('#step2 .btn-next');
    await page.waitForSelector('.companion-name', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await page.waitForSelector('.success-content', { timeout: 10000 });
    await expect(page.locator('.success-title')).toContainText('Story Created');
    
    const book = db.prepare('SELECT * FROM books WHERE title = ?').get(bookTitle);
    expect(book).toBeTruthy();
    
    const protagonist = db.prepare('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1').get(book.book_id);
    expect(protagonist).toBeTruthy();
    expect(protagonist.name).toBe('测试勇者');
    expect(protagonist.personality).toBe('勇敢');
    expect(protagonist.speech_style).toBe('简洁直接');
    expect(protagonist.role_type).toBe('小探险家');
    
    db.prepare('DELETE FROM characters WHERE book_id = ?').run(book.book_id);
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(book.book_id);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(book.book_id);
  });
  
  test('角色类型根据书籍类型动态变化', async ({ page }) => {
    await page.goto('/book-create.html');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('.btn-next');
    await page.waitForSelector('#protagonistRoleType', { state: 'visible' });
    
    const adventureOptions = await page.locator('#protagonistRoleType option').allTextContents();
    expect(adventureOptions).toContain('小探险家');
    expect(adventureOptions).not.toContain('魔法学徒');
    
    await page.click('.btn-prev');
    await page.selectOption('#storyGenre', 'fantasy');
    await page.click('.btn-next');
    await page.waitForSelector('#protagonistRoleType', { state: 'visible' });
    
    const fantasyOptions = await page.locator('#protagonistRoleType option').allTextContents();
    expect(fantasyOptions).toContain('魔法学徒');
    expect(fantasyOptions).not.toContain('小探险家');
  });
});
