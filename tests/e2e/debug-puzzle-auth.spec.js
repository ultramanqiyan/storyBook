import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8788';

test.describe('Debug Puzzle Button - With Auth', () => {
  
  test('登录后访问章节页面检查解谜按钮', async ({ page }) => {
    const testEmail = `test-debug-${Date.now()}@test.com`;
    const testPassword = 'Test123456';
    
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForSelector('input[type="email"]', { timeout: 30000 });
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) {
        btn.style.display = 'block';
        btn.click();
      }
    });
    
    await page.waitForTimeout(3000);
    
    await page.goto(`${BASE_URL}/chapter.html?id=chapter-adv001-03-en`);
    await page.waitForTimeout(3000);
    
    const url = page.url();
    console.log('Current URL:', url);
    
    if (url.includes('login.html')) {
      console.log('Still on login page, checking form...');
      const form = await page.$('form');
      if (form) {
        console.log('Form found, submitting...');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000);
        await page.goto(`${BASE_URL}/chapter.html?id=chapter-adv001-03-en`);
        await page.waitForTimeout(3000);
      }
    }
    
    const pageContent = await page.content();
    const hasPuzzleTrigger = pageContent.includes('puzzle-trigger');
    const hasPuzzleButton = pageContent.includes('Solve the Guardian');
    
    console.log('Has puzzle-trigger class:', hasPuzzleTrigger);
    console.log('Has puzzle button:', hasPuzzleButton);
    
    const allChaptersData = await page.evaluate(() => {
      return window.allChapters || 'not defined';
    });
    console.log('allChapters data:', JSON.stringify(allChaptersData, null, 2));
    
    const isPresetChapter = await page.evaluate(() => {
      return window.isPresetChapter;
    });
    console.log('isPresetChapter:', isPresetChapter);
    
    const currentChapterData = await page.evaluate(() => {
      return window.currentChapter || 'not defined';
    });
    console.log('currentChapter:', JSON.stringify(currentChapterData, null, 2));
  });
});
