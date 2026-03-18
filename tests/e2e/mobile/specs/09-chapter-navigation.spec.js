import { test, expect } from '@playwright/test';

test.describe('章节页移动端翻页测试', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test('预设书籍：初始只显示左页', async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const leftPage = page.locator('.reading-page.left');
    const rightPage = page.locator('.reading-page.right');
    
    await expect(leftPage).toBeVisible();
    await expect(rightPage).not.toBeVisible();
  });

  test('预设书籍：点击Next显示右页', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    await nextBtn.click();
    await page.waitForTimeout(500);
    
    const rightPage = page.locator('.reading-page.right');
    await expect(rightPage).toBeVisible();
    await expect(rightPage).toHaveClass(/active/);
  });

  test('预设书籍：右页状态点击Next跳转页面', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    
    await nextBtn.click();
    await page.waitForTimeout(500);
    
    const rightPage = page.locator('.reading-page.right');
    await expect(rightPage).toBeVisible();
    
    const href = await nextBtn.getAttribute('href');
    if (href) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
      
      const url = page.url();
      expect(url).not.toContain('chapter-ai001-01.html');
    }
  });

  test('预设书籍：右页状态点击Contents返回左页', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    await nextBtn.click();
    await page.waitForTimeout(500);
    
    const rightPage = page.locator('.reading-page.right');
    await expect(rightPage).toBeVisible();
    
    const contentsBtn = page.locator('.scroll-nav-btn:has-text("Contents")');
    await contentsBtn.click();
    await page.waitForTimeout(500);
    
    await expect(rightPage).not.toBeVisible();
  });

  test('预设书籍：书脊隐藏', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const spine = page.locator('.reading-spine');
    await expect(spine).not.toBeVisible();
  });

  test('预设书籍：导航按钮尺寸合适', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-ai001-01.html');
    await page.waitForLoadState('networkidle');
    
    const navBtns = page.locator('.scroll-nav-btn');
    const count = await navBtns.count();
    
    for (let i = 0; i < count; i++) {
      const btn = navBtns.nth(i);
      const box = await btn.boundingBox();
      
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeLessThanOrEqual(60);
    }
  });

  test('中文预设书籍：移动端单页显示', async ({ page }) => {
    await page.goto('http://127.0.0.1:8080/chapters/chapter-adv003-01.html');
    await page.waitForLoadState('networkidle');
    
    const leftPage = page.locator('.reading-page.left');
    const rightPage = page.locator('.reading-page.right');
    
    await expect(leftPage).toBeVisible();
    await expect(rightPage).not.toBeVisible();
  });
});
