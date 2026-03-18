import { test, expect } from '@playwright/test';
import { loginUser, waitForPageReady, takeScreenshot } from '../utils/mobile-helpers.js';
import { UIChecker } from '../utils/ui-standards.js';

test.describe('本地化测试', () => {
  let uiChecker;
  let projectName;

  test.beforeEach(async ({ page }) => {
    projectName = test.info().project.name;
    uiChecker = new UIChecker(page, projectName);
  });

  test('英文文本显示检查', async ({ page }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    await takeScreenshot(page, 'localization-bookshelf', projectName);
    
    const textElements = page.locator('h1, h2, h3, p, span, a, button');
    const count = await textElements.count();
    
    let overflowCount = 0;
    for (let i = 0; i < Math.min(20, count); i++) {
      const el = textElements.nth(i);
      const hasOverflow = await el.evaluate(node => {
        return node.scrollWidth > node.clientWidth + 5;
      });
      if (hasOverflow) {
        overflowCount++;
        const text = await el.textContent();
        console.log(`[${projectName}] 文本溢出: ${text?.substring(0, 50)}`);
      }
    }
    
    console.log(`[${projectName}] 英文文本溢出数量: ${overflowCount}`);
  });

  test('按钮文本长度检查', async ({ page }) => {
    await loginUser(page);
    await page.goto('/bookshelf.html');
    await waitForPageReady(page);
    
    const buttons = page.locator('button, .btn, a.btn');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(10, count); i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const box = await btn.boundingBox();
      
      if (box && text) {
        const textLength = text.trim().length;
        const widthPerChar = box.width / textLength;
        
        if (widthPerChar < 6) {
          console.log(`[${projectName}] 按钮文本可能过长: "${text.trim()}" (${box.width}px)`);
        }
      }
    }
    
    await takeScreenshot(page, 'localization-buttons', projectName);
  });
});
