import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('创建书籍流程测试', () => {
  let uiChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    uiChecker = new UIChecker(page, projectName);
    await loginUser(page);
  });

  test('步骤1: 进入创建书籍页面', async ({ page }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'book-create-page', projectName);
    
    await uiChecker.checkHorizontalScroll();
    
    const titleInput = page.locator('#storyTitle');
    if (await titleInput.count() > 0) {
      await titleInput.fill('Mobile Test Book ' + Date.now());
    }
    
    console.log(`[${projectName}] 创建书籍页面问题:`, uiChecker.getIssues());
  });

  test('步骤2: 填写书籍信息', async ({ page }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    const titleInput = page.locator('#storyTitle');
    if (await titleInput.count() > 0) {
      await titleInput.fill('Mobile Test Book ' + Date.now());
    }
    
    await takeScreenshot(page, 'book-create-filled', projectName);
    
    console.log(`[${projectName}] 填写书籍信息问题:`, uiChecker.getIssues());
  });

  test('步骤3: 检查书籍创建表单UI', async ({ page }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    await uiChecker.checkFontSize('.form-label', 12);
    
    const submitBtn = page.locator('.wax-seal-btn, button[type="submit"]');
    if (await submitBtn.count() > 0) {
      await uiChecker.checkTouchTarget('.wax-seal-btn, button[type="submit"]');
    }
    
    await takeScreenshot(page, 'book-create-ui-check', projectName);
    
    console.log(`[${projectName}] 书籍创建表单UI问题:`, uiChecker.getIssues());
  });
});
