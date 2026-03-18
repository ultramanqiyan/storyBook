import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8788';

test.describe('Bug Verification Tests', () => {
  
  test('问题2: 公共图书馆章节数展示为0', async ({ page }) => {
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const bookItems = await page.$$('.book-item');
    console.log(`Found ${bookItems.length} books in library`);
    
    for (const item of bookItems) {
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

  test('问题1: 情节牌EMOJI展示问题 - 书籍页', async ({ page }) => {
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const firstBook = await page.$('.book-item');
    if (firstBook) {
      await firstBook.click();
      await page.waitForURL(/book\.html/, { timeout: 30000 });
      
      await page.click('button[data-view="plots"]');
      await page.waitForTimeout(1000);
      
      const plotCards = await page.$$('.hs-card-mini.plot-card');
      console.log(`Found ${plotCards.length} plot cards`);
      
      const emojis = [];
      for (const card of plotCards) {
        const icon = await card.$eval('div[style*="font-size: 36px"]', el => el.textContent).catch(() => '');
        const name = await card.$eval('div[style*="color: #f4e4bc"]', el => el.textContent).catch(() => '');
        console.log(`Plot card: ${name}, Icon: ${icon}`);
        emojis.push({ name, icon });
      }
      
      const uniqueEmojis = new Set(emojis.map(e => e.icon));
      console.log(`Unique emojis count: ${uniqueEmojis.size}, Total cards: ${emojis.length}`);
    }
  });

  test('问题3: 预设图书导入后情节卡牌看不到', async ({ page }) => {
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const firstBook = await page.$('.book-item');
    if (firstBook) {
      await firstBook.click();
      await page.waitForURL(/book\.html/, { timeout: 30000 });
      
      const importButton = await page.$('button:has-text("Import")');
      if (importButton) {
        console.log('Found import button, clicking...');
        await importButton.click();
        
        await page.waitForURL(/book\.html\?id=[^&]+$/, { timeout: 30000 });
        console.log('Imported book, now on book page');
        
        await page.click('button[data-view="plots"]');
        await page.waitForTimeout(1000);
        
        const plotCards = await page.$$('.hs-card-mini.plot-card');
        console.log(`After import: Found ${plotCards.length} plot cards`);
        expect(plotCards.length).toBeGreaterThan(0);
      }
    }
  });

  test('问题4: 章节内容页解谜按钮看不到', async ({ page }) => {
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const firstBook = await page.$('.book-item');
    if (firstBook) {
      await firstBook.click();
      await page.waitForURL(/book\.html/, { timeout: 30000 });
      
      const chapterItems = await page.$$('.chapter-toc-item');
      if (chapterItems.length > 0) {
        await chapterItems[0].click();
        await page.waitForURL(/chapter\.html/, { timeout: 30000 });
        
        const puzzleButton = await page.$('button:has-text("Riddle"), button:has-text("解谜")');
        console.log(`Puzzle button found: ${!!puzzleButton}`);
        
        const puzzleTrigger = await page.$('.puzzle-trigger');
        console.log(`Puzzle trigger found: ${!!puzzleTrigger}`);
      }
    }
  });

  test('创建新书籍验证情节牌EMOJI', async ({ page }) => {
    const testEmail = `test-emoji-${Date.now()}@test.com`;
    const testPassword = 'Test123456';
    
    await page.goto(`${BASE_URL}/login.html`);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/bookshelf\.html/, { timeout: 30000 });
    
    await page.click('a[href="book-create.html"]');
    await page.waitForURL(/book-create\.html/, { timeout: 30000 });
    
    await page.fill('#bookTitle', 'Test Emoji Book');
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', 'Test Hero');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/director\.html/, { timeout: 30000 });
    
    const fanCards = await page.$$('.fan-card');
    console.log(`Found ${fanCards.length} fan cards in director page`);
    
    const emojis = [];
    for (const card of fanCards) {
      const icon = await card.$eval('.fan-avatar', el => el.textContent).catch(() => '');
      const name = await card.$eval('.fan-name', el => el.textContent).catch(() => '');
      const type = await card.getAttribute('data-type').catch(() => '');
      console.log(`Card: ${name}, Icon: ${icon}, Type: ${type}`);
      if (type !== 'protagonist' && type !== 'supporting') {
        emojis.push({ name, icon, type });
      }
    }
    
    const uniqueEmojis = new Set(emojis.map(e => e.icon));
    console.log(`Plot cards - Unique emojis: ${uniqueEmojis.size}, Total: ${emojis.length}`);
    console.log('All emojis:', emojis);
  });
});
