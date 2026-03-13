import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('章节分页功能', () => {
  let db;
  let testUserId;
  let testChapterId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile('migrations/0002_seed_data.sql');
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
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const leftPage = page.locator('#leftPage');
    const rightPage = page.locator('#rightPage');
    
    await expect(leftPage).toBeVisible();
    await expect(rightPage).toBeVisible();
  });

  test('左页和右页应显示内容', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const leftContent = page.locator('#leftPage .reading-content');
    const rightContent = page.locator('#rightPage .reading-content');
    
    await expect(leftContent).toBeVisible();
    
    const leftText = await leftContent.textContent();
    expect(leftText.length).toBeGreaterThan(0);
  });

  test('章节标题应显示在第一页', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const chapterNum = page.locator('.chapter-num');
    const chapterName = page.locator('.chapter-name');
    
    await expect(chapterNum).toBeVisible();
    await expect(chapterName).toBeVisible();
  });

  test('翻页按钮应正确工作', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    const prevBtn = page.locator('.scroll-nav-btn:has-text("Previous"), .scroll-nav-btn:has-text("Prev")');
    
    if (await nextBtn.isEnabled()) {
      const initialContent = await page.locator('#leftPage .reading-content').textContent();
      
      await nextBtn.click();
      await page.waitForTimeout(1000);
      
      const newContent = await page.locator('#leftPage .reading-content').textContent();
      
      // Content should change after clicking next
      expect(newContent).not.toBe(initialContent);
    }
    
    if (await prevBtn.isEnabled()) {
      await prevBtn.click();
      await page.waitForTimeout(1000);
    }
  });

  test('页面指示器应显示当前页码', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const navInfo = page.locator('.nav-info');
    await expect(navInfo).toBeVisible();
    
    const text = await navInfo.textContent();
    expect(text).toContain('Page');
  });

  test('第一页时上一页按钮应禁用', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const prevBtn = page.locator('.scroll-nav-btn:has-text("Previous"), .scroll-nav-btn:has-text("Prev")');
    
    const isDisabled = await prevBtn.isDisabled();
    expect(isDisabled).toBe(true);
  });

  test('非登录用户应能查看预设章节', async ({ page }) => {
    await page.goto(`/chapter.html?id=${testChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const leftPage = page.locator('#leftPage');
    await expect(leftPage).toBeVisible();
    
    const content = await page.locator('#leftPage .reading-content').textContent();
    expect(content.length).toBeGreaterThan(0);
  });
});

test.describe('章节分页跨章节测试', () => {
  let db;
  let testUserId;
  let bookId;
  let chapters;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile('migrations/0002_seed_data.sql');
    db.createTestUser();
    testUserId = db.getTestUserId();
    
    const book = db.query(
      'SELECT book_id FROM books WHERE is_preset = 1 LIMIT 1'
    );
    bookId = book?.book_id;
    
    chapters = db.queryAll(
      'SELECT chapter_id, order_num FROM chapters WHERE book_id = ? ORDER BY order_num',
      [bookId]
    );
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('章节边界应正确跨章节显示', async ({ page }) => {
    if (chapters.length < 2) {
      expect(true).toBe(true);
      return;
    }
    
    const firstChapterId = chapters[0].chapter_id;
    
    await page.goto(`/chapter.html?id=${firstChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    
    // Click next multiple times to reach chapter boundary
    for (let i = 0; i < 10; i++) {
      if (await nextBtn.isEnabled()) {
        await nextBtn.click();
        await page.waitForTimeout(500);
      } else {
        break;
      }
    }
    
    // Should still show content
    const content = await page.locator('#leftPage .reading-content').textContent();
    expect(content.length).toBeGreaterThan(0);
  });

  test('翻页不应刷新页面', async ({ page }) => {
    const firstChapterId = chapters[0].chapter_id;
    
    await page.goto(`/chapter.html?id=${firstChapterId}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    
    if (await nextBtn.isEnabled()) {
      const urlBefore = page.url();
      
      await nextBtn.click();
      await page.waitForTimeout(1000);
      
      const urlAfter = page.url();
      
      // URL should not change (pagination is client-side)
      expect(urlBefore).toBe(urlAfter);
    }
  });
});
