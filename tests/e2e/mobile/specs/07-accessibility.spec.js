import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { AccessibilityChecker } from '../utils/accessibility-checker.js';

test.describe('可访问性测试', () => {
  let a11yChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    a11yChecker = new AccessibilityChecker(page, projectName);
    await loginUser(page);
  });

  test('书架页可访问性检查', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await a11yChecker.checkImagesHaveAlt();
    await a11yChecker.checkFormLabels();
    await a11yChecker.checkButtonNames();
    
    await takeScreenshot(page, 'a11y-bookshelf', projectName);
    
    console.log(`[${projectName}] 书架页可访问性问题:`, a11yChecker.getIssues());
  });

  test('书籍创建页可访问性检查', async ({ page }) => {
    await page.goto('/book-create.html');
    await waitForPageReady(page);
    
    await a11yChecker.checkImagesHaveAlt();
    await a11yChecker.checkFormLabels();
    await a11yChecker.checkButtonNames();
    
    await takeScreenshot(page, 'a11y-book-create', projectName);
    
    console.log(`[${projectName}] 书籍创建页可访问性问题:`, a11yChecker.getIssues());
  });

  test('导演页可访问性检查', async ({ page }) => {
    await page.goto('/director.html');
    await waitForPageReady(page);
    
    await a11yChecker.checkImagesHaveAlt();
    await a11yChecker.checkButtonNames();
    
    await takeScreenshot(page, 'a11y-director', projectName);
    
    console.log(`[${projectName}] 导演页可访问性问题:`, a11yChecker.getIssues());
  });

  test('焦点导航测试', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const focusableElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      return elements.slice(0, 10).map(el => ({
        tag: el.tagName,
        text: el.textContent?.substring(0, 30),
        tabindex: el.tabIndex
      }));
    });
    
    console.log(`[${projectName}] 可聚焦元素(前10个):`, focusableElements);
    
    for (let i = 0; i < Math.min(5, focusableElements.length); i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName + (el.textContent?.substring(0, 20) || '') : 'none';
      });
      
      console.log(`[${projectName}] Tab ${i + 1}: ${focused}`);
    }
    
    await takeScreenshot(page, 'a11y-focus-nav', projectName);
  });
});
