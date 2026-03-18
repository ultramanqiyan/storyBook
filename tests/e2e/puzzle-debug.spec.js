import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8788';

test.describe('Puzzle Button Verification Tests', () => {
  
  test('验证预设书籍章节有puzzle_id', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001-en`);
    const data = await response.json();
    
    const chaptersWithPuzzle = data.data.filter(c => c.puzzle_id);
    console.log(`Chapters with puzzle: ${chaptersWithPuzzle.length}`);
    
    for (const chapter of chaptersWithPuzzle) {
      console.log(`Chapter ${chapter.order_num} (${chapter.chapter_id}): puzzle_id = ${chapter.puzzle_id}`);
    }
    
    expect(chaptersWithPuzzle.length).toBeGreaterThan(0);
  });

  test('验证导入后书籍章节显示解谜按钮', async ({ page }) => {
    const testEmail = `test-puzzle-${Date.now()}@test.com`;
    const testPassword = 'Test123456';
    
    await page.goto(`${BASE_URL}/login.html`);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/bookshelf\.html/, { timeout: 30000 });
    
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const firstBook = await page.$('.book-item');
    if (firstBook) {
      await firstBook.click();
      await page.waitForTimeout(1000);
      
      const importButton = await page.$('button:has-text("Import")');
      if (importButton) {
        await importButton.click();
        await page.waitForURL(/book\.html\?id=[^&]+$/, { timeout: 30000 });
        
        const currentUrl = page.url();
        const bookIdMatch = currentUrl.match(/id=([^&]+)/);
        const bookId = bookIdMatch ? bookIdMatch[1] : null;
        console.log('Imported book ID:', bookId);
        
        if (bookId) {
          const chaptersResponse = await page.request.get(`${BASE_URL}/api/chapters?book_id=${bookId}`);
          const chaptersData = await chaptersResponse.json();
          
          const chapterWithPuzzle = chaptersData.data.find(c => c.puzzle_id);
          console.log('Chapter with puzzle after import:', chapterWithPuzzle);
          
          if (chapterWithPuzzle) {
            await page.goto(`${BASE_URL}/chapter.html?id=${chapterWithPuzzle.chapter_id}`);
            await page.waitForTimeout(2000);
            
            const pageContent = await page.content();
            const hasPuzzleTrigger = pageContent.includes('puzzle-trigger');
            const hasPuzzleButton = pageContent.includes('Solve the Guardian');
            
            console.log('Has puzzle-trigger class:', hasPuzzleTrigger);
            console.log('Has puzzle button:', hasPuzzleButton);
            
            expect(hasPuzzleTrigger).toBe(true);
            expect(hasPuzzleButton).toBe(true);
          }
        }
      }
    }
  });

  test('验证章节数正确显示', async ({ page }) => {
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const bookItems = await page.$$('.book-item');
    
    for (const item of bookItems.slice(0, 3)) {
      const title = await item.$eval('.book-title', el => el.textContent).catch(() => 'Unknown');
      const info = await item.$eval('.book-info p', el => el.textContent).catch(() => 'No info');
      console.log(`Book: ${title}, Info: ${info}`);
      
      const chapterMatch = info.match(/(\d+)\s*chapters?/i);
      if (chapterMatch) {
        const chapterCount = parseInt(chapterMatch[1]);
        console.log(`  Chapter count: ${chapterCount}`);
        expect(chapterCount).toBeGreaterThan(0);
      }
    }
  });
});
