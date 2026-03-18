import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('章节页面测试', () => {
  let uiChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    uiChecker = new UIChecker(page, projectName);
    await loginUser(page);
  });

  test('书籍详情页展示检查', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      await takeScreenshot(page, 'book-detail', projectName);
      
      await uiChecker.checkHorizontalScroll();
      
      console.log(`[${projectName}] 书籍详情页问题:`, uiChecker.getIssues());
    }
  });

  test('章节阅读页展示检查', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const bookCard = page.locator('.book-3d, .book-item').first();
    if (await bookCard.count() > 0) {
      await bookCard.click();
      await waitForPageReady(page);
      
      const chapterCard = page.locator('.chapter-toc-item, .chapter-card').first();
      if (await chapterCard.count() > 0) {
        await chapterCard.click();
        await waitForPageReady(page);
        
        await takeScreenshot(page, 'chapter-reading', projectName);
        
        await uiChecker.checkHorizontalScroll();
        
        console.log(`[${projectName}] 章节阅读页问题:`, uiChecker.getIssues());
      }
    }
  });
});
