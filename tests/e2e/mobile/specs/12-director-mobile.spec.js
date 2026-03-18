import { test, expect } from '@playwright/test';

test.describe('导演页移动端测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('导演页无横向滚动', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/director.html');
    await page.waitForLoadState('networkidle');
    
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(hasHorizontalScroll).toBe(false);
  });

  test('舞台预览区域可见', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const stageGrid = page.locator('.stage-grid');
    await expect(stageGrid).toBeVisible();
    
    const stageSlots = page.locator('.stage-slot');
    const count = await stageSlots.count();
    expect(count).toBeGreaterThan(0);
  });

  test('舞台格子不超出屏幕', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const stageSlots = page.locator('.stage-slot');
    const count = await stageSlots.count();
    
    for (let i = 0; i < Math.min(count, 8); i++) {
      const slot = stageSlots.nth(i);
      const box = await slot.boundingBox();
      
      if (box) {
        expect(box.x + box.width).toBeLessThanOrEqual(400);
      }
    }
  });

  test('卡牌尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const fanCards = page.locator('.fan-card');
    const count = await fanCards.count();
    
    if (count > 0) {
      const card = fanCards.first();
      const box = await card.boundingBox();
      
      if (box) {
        expect(box.width).toBeLessThanOrEqual(70);
        expect(box.height).toBeLessThanOrEqual(100);
      }
    }
  });

  test('标题字体大小合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const title = page.locator('.director-header h1');
    const fontSize = await title.evaluate(el => {
      return window.getComputedStyle(el).fontSize;
    });
    
    const size = parseFloat(fontSize);
    expect(size).toBeLessThanOrEqual(22);
  });

  test('按钮尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const btn = page.locator('.hearthstone-btn').first();
    const count = await btn.count();
    
    if (count > 0) {
      const box = await btn.boundingBox();
      
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('三栏布局变为单列', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/director.html');
    await page.waitForLoadState('networkidle');
    
    const layout = page.locator('.three-column-layout');
    const display = await layout.evaluate(el => {
      return window.getComputedStyle(el).display;
    });
    
    expect(display).toBe('flex');
    
    const flexDirection = await layout.evaluate(el => {
      return window.getComputedStyle(el).flexDirection;
    });
    
    expect(flexDirection).toBe('column');
  });
});
