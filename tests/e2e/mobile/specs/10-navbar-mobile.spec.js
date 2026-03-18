import { test, expect } from '@playwright/test';

test.describe('导航栏移动端测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('导航栏元素可见', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    const brand = page.locator('.navbar-brand');
    await expect(brand).toBeVisible();
  });

  test('导航栏字体大小合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const navbar = page.locator('.navbar');
    const fontSize = await navbar.evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });
    
    const size = parseFloat(fontSize);
    expect(size).toBeLessThanOrEqual(12);
  });

  test('导航链接不拥挤', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const links = page.locator('.navbar-link');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toBeVisible();
      
      const box = await link.boundingBox();
      expect(box.width).toBeGreaterThan(20);
    }
  });

  test('语言切换按钮可用', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const zhBtn = page.locator('.lang-btn:has-text("中文")');
    const count = await zhBtn.count();
    
    if (count > 0) {
      await zhBtn.first().click();
      await page.waitForTimeout(500);
    }
  });

  test('导航栏高度合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/library.html');
    await page.waitForLoadState('networkidle');
    
    const navbar = page.locator('.navbar');
    const box = await navbar.boundingBox();
    
    expect(box.height).toBeLessThanOrEqual(55);
  });
});
