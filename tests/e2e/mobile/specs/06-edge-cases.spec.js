import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('边缘场景测试', () => {
  let uiChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    uiChecker = new UIChecker(page, projectName);
  });

  test('空数据状态显示', async ({ page }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'bookshelf-state', projectName);
    
    console.log(`[${projectName}] 书架页面状态检查完成`);
  });

  test('横屏模式检查', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'landscape-mode', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    console.log(`[${projectName}] 横屏模式问题:`, uiChecker.getIssues());
  });

  test('导航栏固定检查', async ({ page }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const navbar = page.locator('.navbar');
    if (await navbar.count() > 0) {
      const position = await navbar.evaluate(el => window.getComputedStyle(el).position);
      console.log(`[${projectName}] 导航栏定位: ${position}`);
    }
    
    await takeScreenshot(page, 'navbar-check', projectName);
  });
});
