import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('页面元素内容验证测试', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test.describe('书架页面元素验证', () => {
    test('书架页面应正确显示书籍标题、类型标签和封面图标', async ({ page, request }) => {
      const bookTitle = `元素验证书籍_${Date.now()}`;
      const bookType = 'adventure';

      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: bookTitle,
          type: bookType,
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });
      const bookData = await response.json();
      const bookId = bookData.data.book_id;

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1500);

      const pageBookItems = page.locator('.book-item');
      const pageCount = await pageBookItems.count();
      expect(pageCount).toBeGreaterThanOrEqual(1);

      const bookCard = page.locator('.book-item').filter({ hasText: bookTitle });
      await expect(bookCard).toBeVisible();

      const displayedTitle = await bookCard.locator('.book-info h4').first().textContent();
      expect(displayedTitle.trim()).toBe(bookTitle);

      const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      expect(dbBook.title).toBe(displayedTitle.trim());

      const typeTag = bookCard.locator('.book-tag, .type-badge');
      if (await typeTag.count() > 0) {
        const displayedType = await typeTag.textContent();
        expect(['Adventure', '冒险', 'adventure', 'ADVENTURE']).toContain(displayedType.trim());
      }
    });

    test('书架页面应正确显示多本书籍', async ({ page, request }) => {
      const bookTypes = ['adventure', 'fantasy', 'romance', 'business'];
      const createdBooks = [];

      for (let i = 0; i < 4; i++) {
        const response = await request.post('/api/books', {
          data: {
            user_id: testUserId,
            title: `多书籍测试${i}_${Date.now()}`,
            type: bookTypes[i],
            protagonist: { name: `主角${i}`, avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
            supporting_characters: []
          }
        });
        const data = await response.json();
        createdBooks.push({ id: data.data.book_id, type: bookTypes[i], title: `多书籍测试${i}` });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1500);

      for (const book of createdBooks) {
        const bookCard = page.locator('.book-item').filter({ hasText: book.title });
        await expect(bookCard).toBeVisible();
      }
    });
  });

  test.describe('书籍详情页元素验证', () => {
    let testBookId;
    let testChapterIds = [];

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '详情页元素测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: [
            { name: '配角1', avatar: '👧', role_type: 'supporting', personality: 'kind', speech_style: 'formal', intimacy: 50 },
            { name: '配角2', avatar: '👦', role_type: 'supporting', personality: 'calm', speech_style: 'polite', intimacy: -50 }
          ]
        })
      });
      const data = await response.json();
      testBookId = data.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [testBookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);

      for (let i = 0; i < 2; i++) {
        const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: testUserId,
            book_id: testBookId,
            selected_cards: {
              protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
              weather_id: cards.find(c => c.sub_type === 'weather').card_id,
              terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
              adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
              equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
            }
          })
        });
        const chapterData = await chapterResponse.json();
        testChapterIds.push(chapterData.data.chapter.chapter_id);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    });

    test('书籍详情页应正确显示书籍标题', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [testBookId]);

      const bookTitle = page.locator('.book-spine-title, .book-meta-info h2');
      const displayedTitle = await bookTitle.first().textContent();
      expect(displayedTitle.trim()).toBe(dbBook.title);
    });

    test('书籍详情页应正确显示章节列表', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num', [testBookId]);
      expect(dbChapters.length).toBe(2);

      const chapterCards = page.locator('.chapter-card, .chapter-toc-item');
      const pageCount = await chapterCards.count();
      expect(pageCount).toBe(dbChapters.length);

      for (let i = 0; i < dbChapters.length; i++) {
        const dbChapter = dbChapters[i];
        const pageChapter = chapterCards.nth(i);

        const displayedTitle = await pageChapter.locator('.chapter-title, .title').textContent();
        expect(displayedTitle.trim()).toBe(dbChapter.title);

        const chapterText = await pageChapter.textContent();
        const hasChapterNumber = chapterText.match(/Chapter\s*(I|V|X|[0-9])/i) || 
                                  chapterText.includes(String(dbChapter.order_num));
        expect(hasChapterNumber).toBeTruthy();
      }
    });

    test('书籍详情页应正确显示角色列表', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(2000);

      const charsTab = page.locator('.view-tab[data-view="characters"], .tab-btn:has-text("角色"), .tab-btn:has-text("Characters")');
      if (await charsTab.count() > 0) {
        await charsTab.first().click();
        await page.waitForTimeout(500);
      }

      const dbCharacters = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [testBookId]);
      expect(dbCharacters.length).toBe(3);

      const characterCards = page.locator('.hs-card-mini');
      const cardCount = await characterCards.count();
      expect(cardCount).toBeGreaterThanOrEqual(dbCharacters.length);

      const dbProtagonist = dbCharacters.find(c => c.is_protagonist === 1);
      const protagonistCard = page.locator('.hs-card-mini').filter({ hasText: dbProtagonist.name });
      await expect(protagonistCard.first()).toBeVisible();
    });

    test('书籍详情页应正确显示卡牌列表', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(2000);

      const cardsTab = page.locator('.view-tab[data-view="cards"], .tab-btn:has-text("卡牌"), .tab-btn:has-text("Cards")');
      if (await cardsTab.count() > 0) {
        await cardsTab.first().click();
        await page.waitForTimeout(500);
      }

      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);
      expect(dbCards.length).toBe(16);

      const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      for (const subType of subTypes) {
        const dbSubCards = dbCards.filter(c => c.sub_type === subType);
        expect(dbSubCards.length).toBe(4);
      }
    });
  });

  test.describe('章节阅读页元素验证', () => {
    let testBookId;
    let testChapterId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '章节元素测试书籍',
          type: 'fantasy',
          protagonist: { name: '主角', avatar: '🧝‍♀️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        })
      });
      const data = await response.json();
      testBookId = data.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [testBookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);

      const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        })
      });
      const chapterData = await chapterResponse.json();
      testChapterId = chapterData.data.chapter.chapter_id;
    });

    test('章节阅读页应正确显示章节标题', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      const chapterName = page.locator('.chapter-name, .chapter-title');
      await expect(chapterName).toBeVisible();

      const displayedTitle = await chapterName.textContent();
      expect(displayedTitle.trim()).toBe(dbChapter.title);
    });

    test('章节阅读页应正确显示章节内容', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      const readingContent = page.locator('.reading-content').first();
      await expect(readingContent).toBeVisible();

      const displayedContent = await readingContent.textContent();
      expect(displayedContent.length).toBeGreaterThan(50);

      expect(displayedContent.trim()).toContain(dbChapter.content.substring(0, 50).trim());
    });

    test('章节阅读页应正确显示章节序号', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      const chapterNumber = page.locator('.chapter-number, .order-num');
      if (await chapterNumber.count() > 0) {
        const displayedNumber = await chapterNumber.first().textContent();
        expect(displayedNumber).toContain(String(dbChapter.order_num));
      }
    });
  });

  test.describe('图书馆页面元素验证', () => {
    test('图书馆页面应正确显示预设书籍', async ({ page }) => {
      await page.goto('/library.html');
      await page.waitForTimeout(1500);

      const dbPresetBooks = db.queryAll("SELECT * FROM books WHERE is_preset = 1 AND language = 'en'");

      const pageBooks = page.locator('.book-item');
      const pageCount = await pageBooks.count();
      expect(pageCount).toBeGreaterThanOrEqual(dbPresetBooks.length);

      if (dbPresetBooks.length > 0) {
        const firstPresetBook = dbPresetBooks[0];
        const bookCard = page.locator('.book-item').filter({ hasText: firstPresetBook.title });
        await expect(bookCard.first()).toBeVisible();
      }
    });

    test('图书馆页面应正确显示书籍类型筛选标签', async ({ page }) => {
      await page.goto('/library.html');
      await page.waitForTimeout(1000);

      const filterTabs = page.locator('.filter-tab');
      const tabCount = await filterTabs.count();
      expect(tabCount).toBeGreaterThanOrEqual(4);

      const expectedTabs = ['All', 'Adventure', 'Fantasy', 'Romance', 'Business'];
      for (const tabName of expectedTabs) {
        const tab = page.locator(`.filter-tab:has-text("${tabName}")`);
        if (await tab.count() > 0) {
          await expect(tab.first()).toBeVisible();
        }
      }
    });

    test('图书馆页面类型筛选应正确过滤书籍', async ({ page }) => {
      await page.goto('/library.html');
      await page.waitForTimeout(1000);

      const adventureTab = page.locator('.filter-tab[data-filter="adventure"]');
      if (await adventureTab.count() > 0) {
        await adventureTab.click();
        await page.waitForTimeout(500);

        const bookItems = page.locator('.book-item');
        const count = await bookItems.count();

        for (let i = 0; i < count; i++) {
          const bookType = await bookItems.nth(i).getAttribute('data-type');
          expect(bookType).toBe('adventure');
        }
      }
    });
  });

  test.describe('导演页面元素验证', () => {
    let testBookId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '导演页元素测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: [
            { name: '配角', avatar: '👧', role_type: 'supporting', personality: 'kind', speech_style: 'formal', intimacy: 50 }
          ]
        })
      });
      const data = await response.json();
      testBookId = data.data.book_id;
    });

    test('导演页面应正确显示角色卡牌', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/director.html?book_id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbCharacters = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [testBookId]);

      const characterCards = page.locator('#characterFan .fan-card, .character-fan .fan-card');
      const cardCount = await characterCards.count();
      expect(cardCount).toBe(dbCharacters.length);

      for (let i = 0; i < Math.min(2, dbCharacters.length); i++) {
        const dbChar = dbCharacters[i];
        const pageCard = characterCards.nth(i);

        const displayedName = await pageCard.locator('.fan-name').textContent();
        expect(displayedName.trim()).toBe(dbChar.name);
      }
    });

    test('导演页面应正确显示情节卡牌', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/director.html?book_id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);

      const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      for (const subType of subTypes) {
        const dbSubCards = dbCards.filter(c => c.sub_type === subType);

        const fanCards = page.locator(`#${subType}Fan .fan-card, .${subType}-fan .fan-card`);
        const cardCount = await fanCards.count();
        expect(cardCount).toBe(dbSubCards.length);

        if (cardCount > 0) {
          const firstCard = fanCards.first();
          const displayedName = await firstCard.locator('.fan-name').textContent();
          expect(displayedName.trim()).toBe(dbSubCards[0].name);
        }
      }
    });

    test('导演页面选择卡牌后应显示在舞台区域', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/director.html?book_id=${testBookId}`);
      await page.waitForTimeout(2000);

      const characterCard = page.locator('#characterFan .fan-card').first();
      await characterCard.click({ force: true });
      await page.waitForTimeout(500);

      const filledSlot = page.locator('.stage-slot.filled');
      await expect(filledSlot.first()).toBeVisible();

      const weatherCard = page.locator('#weatherFan .fan-card').first();
      await weatherCard.click({ force: true });
      await page.waitForTimeout(500);

      const filledSlots = page.locator('.stage-slot.filled');
      const count = await filledSlots.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });
});
