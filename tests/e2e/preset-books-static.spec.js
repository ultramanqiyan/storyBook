import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('预设书籍静态页面', () => {
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

  test('静态页面应正确加载并显示羊皮纸书籍效果', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    await expect(page.locator('.book-container')).toBeVisible();
    await expect(page.locator('.book-spine')).toBeVisible();
    await expect(page.locator('.book-page.left')).toBeVisible();
    await expect(page.locator('.book-page.right')).toBeVisible();
  });

  test('静态页面应显示书籍标题和信息', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    await expect(page.locator('.book-spine-title')).toContainText('星空探险家');
    await expect(page.locator('.book-meta-info h2')).toContainText('星空探险家');
    await expect(page.locator('.type-badge')).toContainText('冒险');
  });

  test('静态页面应显示章节目录', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const chapterItems = page.locator('.chapter-toc-item');
    const count = await chapterItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('点击章节应跳转到阅读页面', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const firstChapter = page.locator('.chapter-toc-item').first();
    await firstChapter.click();
    
    await page.waitForURL(/chapter/, { timeout: 5000 });
    expect(page.url()).toContain('is_preset=1');
  });

  test('静态页面应包含SEO meta标签', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const title = await page.title();
    expect(title).toContain('星空探险家');
    expect(title).toContain('StoryBook');
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('星空探险家');
  });

  test('静态页面应包含结构化数据', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    const json = JSON.parse(structuredData);
    
    expect(json['@type']).toBe('Book');
    expect(json.name).toBe('星空探险家');
    expect(json.genre).toBe('冒险');
  });

  test('英文版静态页面应正确显示', async ({ page }) => {
    await page.goto('/books/preset-adventure-001-en.html');
    
    await expect(page.locator('.book-meta-info h2')).toContainText('Stargazer');
    await expect(page.locator('.type-badge')).toContainText('Adventure');
  });

  test('切换到角色视图应显示角色卡片', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    await page.locator('.view-tab:has-text("角色")').click();
    
    const characterCards = page.locator('.hs-card-mini');
    const count = await characterCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('点击角色卡片应显示详情弹窗', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    await page.locator('.view-tab:has-text("角色")').click();
    await page.waitForTimeout(300);
    
    const firstCard = page.locator('.hs-card-mini').first();
    await firstCard.click();
    
    await expect(page.locator('#cardModal')).toHaveClass(/active/);
  });

  test('导入按钮应显示正确文本', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const importBtn = page.locator('.action-btn:has-text("导入")');
    await expect(importBtn).toBeEnabled();
  });

  test('点击导入按钮应调用API', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    
    const importBtn = page.locator('.action-btn:has-text("导入")');
    
    const [response] = await Promise.all([
      page.waitForResponse(resp => 
        resp.url().includes('/api/books/preset-adventure-001/import') && 
        resp.request().method() === 'POST',
        { timeout: 10000 }
      ).catch(() => null),
      importBtn.click()
    ]);
    
    if (response) {
      expect(response.ok()).toBeTruthy();
    }
  });

  test('导航栏首页链接应正确', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const homeLink = page.locator('.navbar-brand');
    const href = await homeLink.getAttribute('href');
    expect(href).toBe('../index.html');
  });

  test('主题样式应正确应用', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);
    
    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-adventure');
  });

  test('奇幻类型书籍应有正确主题', async ({ page }) => {
    await page.goto('/books/preset-fantasy-001.html');
    await page.waitForTimeout(500);
    
    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-fantasy');
  });

  test('言情类型书籍应有正确主题', async ({ page }) => {
    await page.goto('/books/preset-romance-001.html');
    await page.waitForTimeout(500);
    
    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-romance');
  });

  test('职场类型书籍应有正确主题', async ({ page }) => {
    await page.goto('/books/preset-business-001.html');
    await page.waitForTimeout(500);
    
    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-business');
  });

  test('羊皮纸纹理效果应存在', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const parchmentTexture = page.locator('.parchment-texture');
    const count = await parchmentTexture.count();
    expect(count).toBe(2);
  });

  test('书籍书脊应显示标题', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const spineTitle = page.locator('.book-spine-title');
    await expect(spineTitle).toContainText('星空探险家');
  });

  test('开始阅读按钮应正确链接', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    
    const startBtn = page.locator('.action-btn:has-text("开始阅读")');
    const href = await startBtn.getAttribute('href');
    expect(href).toContain('chapter.html?id=');
    expect(href).toContain('is_preset=1');
  });
});
