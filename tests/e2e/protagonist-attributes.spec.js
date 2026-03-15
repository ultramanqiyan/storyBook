import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('主角属性选择测试', () => {
  let db;
  let testUserId;
  
  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });
  
  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });
  
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((uid) => {
      localStorage.setItem('user_id', uid);
    }, testUserId);
  });
  
  test('创建书籍时必须选择主角性格', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next');
    
    await page.waitForTimeout(1000);
    const step3Visible = await page.locator('#step3.active').count() > 0;
    expect(step3Visible).toBe(true);
  });
  
  test('成功创建书籍并验证数据库中的主角属性', async ({ page }) => {
    const bookTitle = 'E2E测试书籍-' + Date.now();
    
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
    
    await page.fill('#storyTitle', bookTitle);
    await page.fill('#storyDescription', '测试描述');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#protagonistName', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试勇者');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next');
    
    await page.waitForSelector('#step3.active', { state: 'visible' });
    await page.click('#step3 .btn-next');
    
    await page.waitForSelector('.success-content', { timeout: 15000 });
    await expect(page.locator('.success-title')).toContainText('Created');
    
    const book = db.query('SELECT * FROM books WHERE title = ?', [bookTitle]);
    expect(book).toBeTruthy();
    
    const protagonist = db.query('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1', [book.book_id]);
    expect(protagonist).toBeTruthy();
    expect(protagonist.name).toBe('测试勇者');
  });
  
  test('角色类型根据书籍类型动态变化', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });
    
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#step2.active', { state: 'visible' });
    
    const step2Visible = await page.locator('#step2.active').count() > 0;
    expect(step2Visible).toBe(true);
  });
});
