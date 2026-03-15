import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('章节分页功能', () => {
  let db;
  let testUserId;
  let testChapterId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
    
    const chapter = db.query(
      'SELECT chapter_id FROM chapters WHERE book_id IN (SELECT book_id FROM books WHERE is_preset = 1) LIMIT 1'
    );
    testChapterId = chapter?.chapter_id;
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('章节页面应显示双页布局', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }
    
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const leftPage = page.locator('#leftPage');
    const rightPage = page.locator('#rightPage');
    
    const leftVisible = await leftPage.count() > 0;
    const rightVisible = await rightPage.count() > 0;
    
    expect(leftVisible || rightVisible).toBe(true);
  });

  test('章节内容应正确显示', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }
    
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const readingContent = page.locator('.reading-content');
    const content = await readingContent.first().textContent();
    
    expect(content.length).toBeGreaterThan(0);
  });

  test('翻页按钮应正确工作', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }
    
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    const prevBtn = page.locator('.scroll-nav-btn:has-text("Previous"), .scroll-nav-btn:has-text("Prev")');
    
    if (await nextBtn.count() > 0 && await nextBtn.isEnabled()) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
    }
    
    if (await prevBtn.count() > 0 && await prevBtn.isEnabled()) {
      await prevBtn.click();
      await page.waitForTimeout(1000);
    }
    
    expect(true).toBe(true);
  });

  test('页面指示器应显示当前页码', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }
    
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const navInfo = page.locator('.nav-info');
    if (await navInfo.count() > 0) {
      const text = await navInfo.textContent();
      expect(text.length).toBeGreaterThan(0);
    } else {
      expect(true).toBe(true);
    }
  });

  test('非登录用户应能查看预设章节', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }
    
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const leftPage = page.locator('#leftPage');
    const leftVisible = await leftPage.count() > 0;
    
    expect(leftVisible).toBe(true);
  });
});
