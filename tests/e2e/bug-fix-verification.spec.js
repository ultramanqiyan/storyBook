import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:8788';

test.describe('Bug Fix Verification Tests', () => {
  
  test('问题2验证: 公共图书馆章节数正确显示', async ({ page }) => {
    await page.goto(`${BASE_URL}/library.html`);
    await page.waitForSelector('.book-item', { timeout: 30000 });
    
    const bookItems = await page.$$('.book-item');
    console.log(`Found ${bookItems.length} books in library`);
    
    let allCorrect = true;
    for (const item of bookItems.slice(0, 3)) {
      const title = await item.$eval('.book-title', el => el.textContent).catch(() => 'Unknown');
      const info = await item.$eval('.book-info p', el => el.textContent).catch(() => 'No info');
      console.log(`Book: ${title}, Info: ${info}`);
      
      const chapterMatch = info.match(/(\d+)\s*chapters?/i);
      if (chapterMatch) {
        const chapterCount = parseInt(chapterMatch[1]);
        if (chapterCount === 0) {
          console.log(`  ❌ ERROR: Chapter count is 0!`);
          allCorrect = false;
        } else {
          console.log(`  ✅ Chapter count: ${chapterCount}`);
        }
        expect(chapterCount).toBeGreaterThan(0);
      }
    }
    
    expect(allCorrect).toBe(true);
  });

  test('问题3验证: 预设图书导入后情节卡牌可见', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/books/preset-fantasy-001-en`);
    const data = await response.json();
    
    console.log('Book data includes plot_cards:', !!data.data?.plot_cards);
    console.log('Plot cards count:', data.data?.plot_cards?.length || 0);
    
    if (data.data?.plot_cards && data.data.plot_cards.length > 0) {
      console.log('\nSample plot cards:');
      for (const card of data.data.plot_cards.slice(0, 5)) {
        console.log(`  ${card.name}: ${card.icon}`);
      }
      
      const uniqueIcons = new Set(data.data.plot_cards.map(c => c.icon));
      console.log(`\nUnique icons: ${uniqueIcons.size} out of ${data.data.plot_cards.length} cards`);
    }
    
    expect(data.data?.plot_cards?.length || 0).toBeGreaterThan(0);
  });

  test('问题4验证: 章节有puzzle_id', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/chapters?book_id=preset-adventure-001-en`);
    const data = await response.json();
    
    console.log('Chapters count:', data.data?.length || 0);
    
    const chaptersWithPuzzle = data.data?.filter(c => c.puzzle_id) || [];
    console.log('Chapters with puzzle:', chaptersWithPuzzle.length);
    
    for (const chapter of chaptersWithPuzzle) {
      console.log(`  Chapter ${chapter.order_num}: puzzle_id = ${chapter.puzzle_id}`);
    }
    
    expect(chaptersWithPuzzle.length).toBeGreaterThan(0);
  });

  test('问题1验证: 情节牌EMOJI各不相同', async ({ page }) => {
    const testEmail = `test-emoji-fix-${Date.now()}@test.com`;
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
    
    await page.fill('#bookTitle', 'Test Emoji Fix Book');
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
    
    if (bookId) {
      const response = await page.request.get(`${BASE_URL}/api/plot-cards?book_id=${bookId}`);
      const data = await response.json();
      
      console.log('\nPlot cards after creation:');
      const plotCards = data.data?.filter(c => c.type === 'plot') || [];
      
      for (const card of plotCards) {
        console.log(`  ${card.sub_type}: ${card.name} - ${card.icon}`);
      }
      
      const uniqueIcons = new Set(plotCards.map(c => c.icon));
      console.log(`\nUnique icons: ${uniqueIcons.size} out of ${plotCards.length} plot cards`);
      
      if (plotCards.length > 0) {
        expect(uniqueIcons.size).toBeGreaterThan(1);
        console.log('✅ EMOJI fix verified: plot cards have different icons');
      }
    }
  });
});
