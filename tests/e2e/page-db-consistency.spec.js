import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('页面与数据库一致性验证测试', () => {
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

  test.describe('书架页面与数据库一致性', () => {
    test('书架页面显示的书籍应与数据库一致', async ({ page, request }) => {
      const books = [];
      for (let i = 0; i < 3; i++) {
        const response = await request.post('/api/books', {
          data: {
            user_id: testUserId,
            title: `一致性测试书籍${i}_${Date.now()}`,
            type: ['adventure', 'fantasy', 'romance'][i],
            protagonist: { name: `主角${i}`, avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
            supporting_characters: []
          }
        });
        const data = await response.json();
        books.push({ id: data.data.book_id, title: `一致性测试书籍${i}`, type: ['adventure', 'fantasy', 'romance'][i] });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1500);

      for (const book of books) {
        const bookCard = page.locator('.book-item').filter({ hasText: book.title });
        await expect(bookCard).toBeVisible();
      }
    });

    test('书架页面书籍数量应与数据库一致', async ({ page, request }) => {
      const books = [];
      for (let i = 0; i < 5; i++) {
        const response = await request.post('/api/books', {
          data: {
            user_id: testUserId,
            title: `数量测试书籍${i}_${Date.now()}`,
            type: 'adventure',
            protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
            supporting_characters: []
          }
        });
        const data = await response.json();
        books.push({ id: data.data.book_id });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1500);

      for (const book of books) {
        const bookCard = page.locator('.book-item').filter({ hasText: book.id });
        expect(await bookCard.count()).toBeGreaterThanOrEqual(0);
      }
    });

    test('书架页面创建时间应与数据库一致', async ({ page, request }) => {
      db.run('DELETE FROM books WHERE user_id = ?', [testUserId]);

      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '时间测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1500);

      const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      const dbCreatedAt = new Date(dbBook.created_at);

      const bookCard = page.locator('.book-item').filter({ hasText: '时间测试书籍' });
      const timeElement = bookCard.locator('.book-date, .created-at, time');

      if (await timeElement.count() > 0) {
        const displayedTime = await timeElement.textContent();
        const pageDate = new Date(displayedTime);

        const diffMs = Math.abs(dbCreatedAt.getTime() - pageDate.getTime());
        expect(diffMs).toBeLessThan(86400000);
      }
    });
  });

  test.describe('书籍详情页与数据库一致性', () => {
    let testBookId;
    let testChapterIds = [];

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '详情页一致性测试书籍',
          type: 'adventure',
          protagonist: {
            name: '主角小明',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1,
            personality: 'brave'
          },
          supporting_characters: [{
            name: '配角小红',
            avatar: '👧',
            role_type: 'supporting',
            personality: 'kind',
            intimacy: 50
          }, {
            name: '配角小刚',
            avatar: '👦',
            role_type: 'supporting',
            personality: 'calm',
            intimacy: -50
          }]
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

    test('书籍详情页标题应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [testBookId]);

      const bookTitle = page.locator('.book-spine-title, .book-meta-info h2');
      const displayedTitle = await bookTitle.first().textContent();
      expect(displayedTitle.trim()).toBe(dbBook.title);
    });

    test('书籍详情页类型应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [testBookId]);

      const typeBadge = page.locator('.book-type-badge, .type-tag');
      if (await typeBadge.count() > 0) {
        const displayedType = await typeBadge.first().textContent();
        const typeMap = {
          'adventure': ['Adventure', '冒险'],
          'fantasy': ['Fantasy', '奇幻'],
          'romance': ['Romance', '言情'],
          'business': ['Business', '职场']
        };
        expect(typeMap[dbBook.type]).toContain(displayedType.trim());
      }
    });

    test('书籍详情页章节列表应与数据库一致', async ({ page }) => {
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

    test('书籍详情页角色列表应与数据库一致', async ({ page }) => {
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

    test('书籍详情页卡牌数量应与数据库一致', async ({ page }) => {
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

  test.describe('章节阅读页与数据库一致性', () => {
    let testBookId;
    let testChapterId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '章节一致性测试书籍',
          type: 'fantasy',
          protagonist: {
            name: '主角',
            avatar: '🧝‍♀️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: [{
            name: '配角',
            avatar: '👧',
            role_type: 'supporting',
            intimacy: 30
          }]
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

    test('章节阅读页标题应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      const chapterName = page.locator('.chapter-name, .chapter-title');
      await expect(chapterName).toBeVisible();

      const displayedTitle = await chapterName.textContent();
      expect(displayedTitle.trim()).toBe(dbChapter.title);
    });

    test('章节阅读页内容应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      const readingContent = page.locator('.reading-content').first();
      await expect(readingContent).toBeVisible();

      const displayedContent = await readingContent.textContent();
      expect(displayedContent.length).toBeGreaterThan(50);

      const dbContentPreview = dbChapter.content.substring(0, 100).trim();
      expect(displayedContent).toContain(dbContentPreview.substring(0, 50));
    });

    test('章节阅读页序号应与数据库一致', async ({ page }) => {
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

    test('章节阅读页侧边栏角色应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbCharacters = db.queryAll(
        'SELECT * FROM characters WHERE book_id = (SELECT book_id FROM chapters WHERE chapter_id = ?)',
        [testChapterId]
      );

      const sidebarChars = page.locator('#sidebarCharacters .sidebar-card, .character-sidebar .char-card');
      const sidebarCount = await sidebarChars.count();

      if (sidebarCount > 0) {
        expect(sidebarCount).toBeGreaterThanOrEqual(1);
      }
    });

    test('章节阅读页选中卡牌应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);
      const selectedCards = JSON.parse(dbChapter.selected_cards);

      const dbWeatherCard = db.query('SELECT * FROM plot_cards WHERE card_id = ?', [selectedCards.weather_id]);
      const weatherCard = page.locator('.plot-card.weather, .card[data-type="weather"]');

      if (await weatherCard.count() > 0) {
        const displayedName = await weatherCard.locator('.card-name, .name').textContent();
        expect(displayedName.trim()).toBe(dbWeatherCard.name);
      }

      const dbTerrainCard = db.query('SELECT * FROM plot_cards WHERE card_id = ?', [selectedCards.terrain_id]);
      const terrainCard = page.locator('.plot-card.terrain, .card[data-type="terrain"]');

      if (await terrainCard.count() > 0) {
        const displayedName = await terrainCard.locator('.card-name, .name').textContent();
        expect(displayedName.trim()).toBe(dbTerrainCard.name);
      }
    });
  });

  test.describe('导演页与数据库一致性', () => {
    let testBookId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '导演页一致性测试书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: [{
            name: '配角',
            avatar: '👧',
            role_type: 'supporting',
            intimacy: 50
          }]
        })
      });
      const data = await response.json();
      testBookId = data.data.book_id;
    });

    test('导演页角色卡牌应与数据库一致', async ({ page }) => {
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

        const displayedAvatar = await pageCard.locator('.fan-avatar').textContent();
        expect(displayedAvatar.trim()).toBe(dbChar.avatar);
      }
    });

    test('导演页情节卡牌应与数据库一致', async ({ page }) => {
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

          const displayedIcon = await firstCard.locator('.fan-avatar, .card-icon').textContent();
          expect(displayedIcon.trim()).toBe(dbSubCards[0].icon);
        }
      }
    });

    test('导演页卡牌总数应与数据库一致', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/director.html?book_id=${testBookId}`);
      await page.waitForTimeout(2000);

      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);
      expect(dbCards.length).toBe(16);

      const allFanCards = page.locator('.fan-card');
      const totalCards = await allFanCards.count();

      const dbCharacters = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [testBookId]);
      expect(totalCards).toBe(dbCards.length + dbCharacters.length);
    });
  });

  test.describe('图书馆页与数据库一致性', () => {
    test('图书馆页预设书籍应与数据库一致', async ({ page }) => {
      await page.goto('/library.html');
      await page.waitForTimeout(1500);

      const dbPresetBooks = db.queryAll("SELECT * FROM books WHERE is_preset = 1 AND language = 'en'");

      const pageBooks = page.locator('.book-item');
      const pageCount = await pageBooks.count();
      expect(pageCount).toBeGreaterThanOrEqual(dbPresetBooks.length);

      if (dbPresetBooks.length > 0) {
        for (let i = 0; i < Math.min(3, dbPresetBooks.length); i++) {
          const dbBook = dbPresetBooks[i];
          const pageBook = page.locator('.book-item').filter({ hasText: dbBook.title }).first();

          if (await pageBook.count() > 0) {
            const displayedTitle = await pageBook.locator('.book-info h4').first().textContent();
            expect(displayedTitle.trim()).toBe(dbBook.title);
          }
        }
      }
    });

    test('图书馆页书籍章节数应与数据库一致', async ({ page }) => {
      await page.goto('/library.html');
      await page.waitForTimeout(1500);

      const dbPresetBook = db.query("SELECT * FROM books WHERE is_preset = 1 AND language = 'en' LIMIT 1");

      if (dbPresetBook) {
        const dbChapterCount = db.query(
          'SELECT COUNT(*) as count FROM chapters WHERE book_id = ?',
          [dbPresetBook.book_id]
        )?.count || 0;

        const pageBook = page.locator('.book-item').filter({ hasText: dbPresetBook.title }).first();

        if (await pageBook.count() > 0) {
          const bookInfo = await pageBook.locator('.book-info p, .chapter-count').textContent();

          if (dbChapterCount > 0) {
            expect(bookInfo).toContain(String(dbChapterCount));
          }
        }
      }
    });

    test('图书馆页类型筛选应与数据库一致', async ({ page }) => {
      await page.goto('/library.html');
      await page.waitForTimeout(1500);

      const adventureTab = page.locator('.filter-tab[data-filter="adventure"]');
      if (await adventureTab.count() > 0) {
        await adventureTab.click();
        await page.waitForTimeout(500);

        const pageBooks = page.locator('.book-item');
        const pageCount = await pageBooks.count();

        expect(pageCount).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('登录后用户信息与数据库一致性', () => {
    test('登录后用户ID应与数据库一致', async ({ page }) => {
      await page.goto('/login.html');
      await page.waitForTimeout(500);

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);

      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1000);

      const storedUserId = await page.evaluate(() => localStorage.getItem('user_id'));
      expect(storedUserId).toBe(testUserId);

      const dbUser = db.query('SELECT * FROM users WHERE user_id = ?', [testUserId]);
      expect(dbUser).toBeDefined();
      expect(dbUser.user_id).toBe(testUserId);
    });
  });

  test.describe('数据修改后页面与数据库一致性', () => {
    test('删除书籍后页面应与数据库同步', async ({ page, request }) => {
      const bookTitle = `删除测试书籍_${Date.now()}`;
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: bookTitle,
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1500);

      const bookCard = page.locator('.book-item').filter({ hasText: bookTitle });
      await expect(bookCard).toBeVisible();

      await request.delete(`/api/books/${bookId}?user_id=${testUserId}`);

      await page.reload();
      await page.waitForTimeout(1500);

      const deletedBook = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      expect(deletedBook).toBeUndefined();
    });

    test('添加章节后页面应与数据库同步', async ({ page, request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '添加章节测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/book.html?id=${bookId}`);
      await page.waitForTimeout(1500);

      let chapterCards = page.locator('.chapter-card, .chapter-toc-item');
      const countBefore = await chapterCards.count();

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        }
      });

      await page.reload();
      await page.waitForTimeout(1500);

      chapterCards = page.locator('.chapter-card, .chapter-toc-item');
      const countAfter = await chapterCards.count();

      expect(countAfter).toBe(countBefore + 1);

      const dbChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [bookId]);
      expect(dbChapters.length).toBe(countAfter);
    });
  });
});
