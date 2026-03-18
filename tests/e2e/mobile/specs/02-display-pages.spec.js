import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot, checkHorizontalScroll } from '../utils/mobile-helpers.js';
import { UIChecker, UI_STANDARDS } from '../utils/ui-standards.js';
import { AccessibilityChecker } from '../utils/accessibility-checker.js';

test.describe('页面展示测试', () => {
  let uiChecker;
  let a11yChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    uiChecker = new UIChecker(page, projectName);
    a11yChecker = new AccessibilityChecker(page, projectName);
    await loginUser(page);
  });

  test('书架页面展示检查', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'bookshelf-initial', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    await uiChecker.checkFontSize('h1', 16);
    await uiChecker.checkFontSize('.book-info h4', 12);
    
    const bookCards = page.locator('.book-3d, .book-item');
    const count = await bookCards.count();
    
    if (count > 0) {
      await uiChecker.checkTouchTarget('.book-3d, .book-item');
    }
    
    await uiChecker.checkElementOcclusion('.navbar');
    
    const addBtn = page.locator('.btn-3d, .add-book-card');
    if (await addBtn.count() > 0) {
      await uiChecker.checkTouchTarget('.btn-3d, .add-book-card');
    }
    
    console.log(`[${projectName}] 书架页面问题:`, uiChecker.getIssues());
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
      
      await uiChecker.checkFontSize('.book-meta-info h2', 16);
      await uiChecker.checkFontSize('.chapter-card .chapter-title', 12);
      
      const tabs = page.locator('.view-tab');
      const tabCount = await tabs.count();
      if (tabCount > 0) {
        await uiChecker.checkTouchTarget('.view-tab');
      }
      
      const actionBtns = page.locator('.action-btn');
      if (await actionBtns.count() > 0) {
        await uiChecker.checkTouchTarget('.action-btn');
      }
      
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
        
        await uiChecker.checkFontSize('.manuscript-text, .page-text', UI_STANDARDS.MIN_FONT_SIZE);
        await uiChecker.checkFontSize('.chapter-name, .manuscript-title .chapter-name', 16);
        
        const navBtns = page.locator('.scroll-nav-btn');
        if (await navBtns.count() > 0) {
          await uiChecker.checkTouchTarget('.scroll-nav-btn');
        }
        
        const puzzleBtn = page.locator('.puzzle-trigger button, button:has-text("Solve")');
        if (await puzzleBtn.count() > 0) {
          await uiChecker.checkTouchTarget('.puzzle-trigger button');
        }
        
        console.log(`[${projectName}] 章节阅读页问题:`, uiChecker.getIssues());
      }
    }
  });

  test('导演页展示检查', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'director-page', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    await uiChecker.checkFontSize('.director-header h1', 16);
    
    const fanCards = page.locator('.fan-card');
    if (await fanCards.count() > 0) {
      await uiChecker.checkTouchTarget('.fan-card');
    }
    
    const stageSlots = page.locator('.stage-slot');
    if (await stageSlots.count() > 0) {
      await uiChecker.checkTouchTarget('.stage-slot');
    }
    
    const startBtn = page.locator('.hearthstone-btn, #startBtn');
    if (await startBtn.count() > 0) {
      await uiChecker.checkTouchTarget('.hearthstone-btn, #startBtn');
    }
    
    console.log(`[${projectName}] 导演页问题:`, uiChecker.getIssues());
  });

  test('可访问性基础检查', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await a11yChecker.checkImagesHaveAlt();
    await a11yChecker.checkFormLabels();
    await a11yChecker.checkButtonNames();
    
    console.log(`[${projectName}] 可访问性问题:`, a11yChecker.getIssues());
  });
});
