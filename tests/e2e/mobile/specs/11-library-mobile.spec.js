import { test, expect } from '@playwright/test';

test.describe('图书馆移动端布局测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('图书馆页面加载', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
  });

  test('图书馆页面标题可见', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const pageTitle = page.locator('.page-title');
    await expect(pageTitle).toBeVisible();
  });

  test('图书馆筛选标签可见', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const filterTabs = page.locator('.filter-tab');
    const count = await filterTabs.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('预设书籍页面可访问', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/books/preset-ai-001.html');
    await page.waitForLoadState('networkidle');
    
    const bookTitle = page.locator('.book-title, h1, .title');
    const count = await bookTitle.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('图书馆页面标题字体大小', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const pageTitle = page.locator('.page-title');
    const fontSize = await pageTitle.evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });
    
    const size = parseFloat(fontSize);
    expect(size).toBeLessThanOrEqual(24);
  });
});
