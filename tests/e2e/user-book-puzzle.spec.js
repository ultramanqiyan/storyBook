import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8788';

test.describe('User Created Book Puzzle Tests', () => {
  
  test('用户创建书籍并添加章节后验证puzzle按钮', async ({ page }) => {
    const testEmail = `test-user-book-${Date.now()}@test.com`;
    const testPassword = 'Test123456';
    
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForSelector('input[type="email"]', { timeout: 30000 });
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    });
    
    await page.waitForURL(/bookshelf\.html/, { timeout: 30000 });
    console.log('Logged in successfully');
    
    await page.goto(`${BASE_URL}/book-create.html`);
    await page.waitForSelector('#bookTitle', { timeout: 30000 });
    
    await page.fill('#bookTitle', 'Test Puzzle Book');
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', 'Test Hero');
    
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    });
    
    await page.waitForURL(/director\.html/, { timeout: 30000 });
    console.log('Book created, on director page');
    
    const currentUrl = page.url();
    const bookIdMatch = currentUrl.match(/book_id=([^&]+)/);
    const bookId = bookIdMatch ? bookIdMatch[1] : null;
    console.log('Created book ID:', bookId);
    
    await page.waitForSelector('.fan-card', { timeout: 30000 });
    
    const protagonistCard = await page.$('.fan-card[data-type="protagonist"]');
    if (protagonistCard) {
      await protagonistCard.click();
      await page.waitForTimeout(500);
    }
    
    const weatherCards = await page.$$('.fan-card[data-type="weather"]');
    if (weatherCards.length > 0) {
      await weatherCards[0].click();
      await page.waitForTimeout(500);
    }
    
    const terrainCards = await page.$$('.fan-card[data-type="terrain"]');
    if (terrainCards.length > 0) {
      await terrainCards[0].click();
      await page.waitForTimeout(500);
    }
    
    const adventureCards = await page.$$('.fan-card[data-type="adventure"]');
    if (adventureCards.length > 0) {
      await adventureCards[0].click();
      await page.waitForTimeout(500);
    }
    
    const equipmentCards = await page.$$('.fan-card[data-type="equipment"]');
    if (equipmentCards.length > 0) {
      await equipmentCards[0].click();
      await page.waitForTimeout(500);
    }
    
    const directBtn = await page.$('button:has-text("Direct")');
    if (directBtn) {
      await directBtn.click();
      await page.waitForTimeout(3000);
    }
    
    if (bookId) {
      const chaptersResponse = await page.request.get(`${BASE_URL}/api/chapters?book_id=${bookId}`);
      const chaptersData = await chaptersResponse.json();
      console.log('Chapters after creation:', JSON.stringify(chaptersData.data, null, 2));
      
      if (chaptersData.data && chaptersData.data.length > 0) {
        const chapterWithPuzzle = chaptersData.data.find(c => c.puzzle_id);
        console.log('Chapter with puzzle:', chapterWithPuzzle);
        
        if (chapterWithPuzzle) {
          await page.goto(`${BASE_URL}/chapter.html?id=${chapterWithPuzzle.chapter_id}`);
          await page.waitForTimeout(2000);
          
          const pageContent = await page.content();
          const hasPuzzleTrigger = pageContent.includes('puzzle-trigger');
          const hasPuzzleButton = pageContent.includes('Solve the Guardian');
          
          console.log('Has puzzle-trigger class:', hasPuzzleTrigger);
          console.log('Has puzzle button:', hasPuzzleButton);
          
          const chapterUrl = page.url();
          console.log('Chapter URL:', chapterUrl);
          console.log('is_preset param:', chapterUrl.includes('is_preset'));
          
          const readingContent = await page.$('.reading-content');
          if (readingContent) {
            const contentHtml = await readingContent.innerHTML();
            console.log('Reading content length:', contentHtml.length);
          }
          
          expect(hasPuzzleTrigger).toBe(true);
        } else {
          console.log('No chapter with puzzle found');
        }
      }
    }
  });
});
