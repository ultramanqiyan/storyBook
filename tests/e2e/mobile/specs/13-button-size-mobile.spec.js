import { test, expect } from '@playwright/test';

test.describe('按钮移动端尺寸测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('书架页按钮触摸区域足够大', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/bookshelf.html');
    await page.waitForLoadState('networkidle');
    
    const buttons = page.locator('button, .btn, .btn-action');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(10, count); i++) {
      const btn = buttons.nth(i);
      const box = await btn.boundingBox();
      
      if (box) {
        expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(40);
      }
    }
  });

  test('章节页导航按钮尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const navBtns = page.locator('.scroll-nav-btn');
    const count = await navBtns.count();
    
    for (let i = 0; i < count; i++) {
      const btn = navBtns.nth(i);
      const box = await btn.boundingBox();
      
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeLessThanOrEqual(60);
      }
    }
  });

  test('图书馆筛选按钮尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/library.html');
    await page.waitForLoadState('networkidle');
    
    const filterTabs = page.locator('.filter-tab');
    const count = await filterTabs.count();
    
    for (let i = 0; i < count; i++) {
      const tab = filterTabs.nth(i);
      const box = await tab.boundingBox();
      
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(30);
      }
    }
  });

  test('导演页按钮尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const hearthstoneBtn = page.locator('.hearthstone-btn');
    const count = await hearthstoneBtn.count();
    
    if (count > 0) {
      const btn = hearthstoneBtn.first();
      const box = await btn.boundingBox();
      
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('按钮字体大小合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/bookshelf.html');
    await page.waitForLoadState('networkidle');
    
    const buttons = page.locator('button, .btn');
    const count = await buttons.count();
    
    if (count > 0) {
      const btn = buttons.first();
      const fontSize = await btn.evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });
      
      const size = parseFloat(fontSize);
      expect(size).toBeLessThanOrEqual(16);
    }
  });
});
