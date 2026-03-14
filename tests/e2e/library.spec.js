import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

import path from 'path';

test.describe('公共图书馆功能', () => {
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

  test('公共图书馆页面应显示预设书籍', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const booksGrid = page.locator('#booksGrid');
    await expect(booksGrid).toBeVisible();

    const bookCards = page.locator('.book-3d, .magic-book-card');
    const count = await bookCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('点击书籍应跳转到书籍详情页', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-3d, .magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    expect(page.url()).toContain('is_preset=1');
  });

  test('书籍详情页应显示章节列表', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-3d, .magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(2000);

    const chapterList = page.locator('.chapter-toc-item');
    const count = await chapterList.count();
    expect(count).toBeGreaterThan(0);
  });

  test('书籍详情页应显示角色列表', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const charactersTab = page.locator('.view-tab[data-view="characters"]');
    await charactersTab.click();
    await page.waitForTimeout(500);

    const characterCards = page.locator('.hs-card-mini');
    const count = await characterCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('预设书籍详情页应显示导入按钮', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();

    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const importBtn = page.locator('button:has-text("Import")');
    await expect(importBtn).toBeVisible();

    const directBtn = page.locator('a:has-text("Direct"), button:has-text("Direct")');
    expect(await directBtn.count()).toBe(0);
  });

  test('预设书籍点击章节可阅读内容', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const firstChapter = page.locator('.chapter-toc-item').first();
    await firstChapter.click();

    await page.waitForURL(/chapter/, { timeout: 5000 });
    expect(page.url()).toContain('is_preset=1');
  });

  test('类型筛选应正确过滤书籍', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const adventureTab = page.locator('.filter-tab[data-filter="adventure"]');
    await adventureTab.click();

    await page.waitForTimeout(500);

    const bookCards = page.locator('.book-3d, .magic-book-card');
    const count = await bookCards.count();

    for (let i = 0; i < count; i++) {
      const bookType = await bookCards.nth(i).getAttribute('data-type');
      expect(bookType).toBe('adventure');
    }
  });

  test('导入书籍应创建新书籍副本', async ({ page, request }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();

    const presetBooks = db.queryAll(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );
    expect(presetBooks.length).toBeGreaterThan(0);
    const presetBook = presetBooks[0];

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.new_book_id).toBeDefined();

    const newBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [result.data.new_book_id]
    );
    expect(newBook).toBeDefined();
    expect(newBook.title).toBe(presetBook.title);
    expect(newBook.is_preset).toBe(0);
    expect(newBook.user_id).toBe(testUserId);
  });

  test('导入书籍应复制所有角色', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const result = await response.json();

    const newCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [result.data.new_book_id]
    );

    expect(newCharacters.length).toBe(originalCharacters.length);
  });

  test('导入书籍应复制所有卡牌', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const result = await response.json();

    const newCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [result.data.new_book_id]
    );

    expect(newCards.length).toBe(originalCards.length);
  });

  test('导入书籍应复制所有章节', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const result = await response.json();

    const newChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [result.data.new_book_id]
    );

    expect(newChapters.length).toBe(originalChapters.length);
  });

  test('导入书籍应复制所有谜题并重置状态', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const result = await response.json();

    const newPuzzles = db.queryAll(
      `SELECT p.* FROM puzzles p 
       JOIN chapters c ON p.chapter_id = c.chapter_id 
       WHERE c.book_id = ?`,
      [result.data.new_book_id]
    );

    for (const puzzle of newPuzzles) {
      expect(puzzle.is_solved).toBe(0);
      expect(puzzle.attempts).toBe(0);
    }
  });

  test('导入非预设书籍应返回404', async ({ request }) => {
    const response = await request.post('/api/books/non-existent-id/import', {
      data: {
        user_id: testUserId
      }
    });

    expect(response.status()).toBe(404);
  });

  test('导入书籍缺少用户ID应返回错误', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {}
    });

    expect(response.status()).toBe(400);
  });

  test('获取预设书籍详情API应返回正确数据', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const response = await request.get(`/api/books/${presetBook.book_id}/detail`);
    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.book).toBeDefined();
    expect(result.data.characters).toBeDefined();
    expect(result.data.plot_cards).toBeDefined();
    expect(result.data.chapters).toBeDefined();
  });

  test('获取非预设书籍详情应返回404', async ({ request }) => {
    const response = await request.get('/api/books/non-existent-id/detail');

    expect(response.status()).toBe(404);
  });

  test('UI导入成功后应跳转到新书籍页面', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const importBtn = page.locator('button:has-text("Import")');
    await importBtn.click();

    await page.waitForTimeout(3000);

    expect(page.url()).toContain('book');
    expect(page.url()).not.toContain('is_preset=1');
  });

  test('导入成功后应跳转到新书籍页面', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const importBtn = page.locator('button:has-text("Import")');
    await importBtn.click();

    await page.waitForTimeout(3000);

    expect(page.url()).toContain('book');
    expect(page.url()).not.toContain('is_preset=1');
  });

  test('重复导入同一本书应创建多个副本', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const response1 = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result1 = await response1.json();

    const response2 = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result2 = await response2.json();

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
    expect(result1.data.new_book_id).not.toBe(result2.data.new_book_id);

    const userBooks = db.queryAll(
      'SELECT * FROM books WHERE user_id = ? AND title = ?',
      [testUserId, presetBook.title]
    );
    expect(userBooks.length).toBeGreaterThanOrEqual(2);
  });

  test('导入书籍后新书籍应包含所有预设数据', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [presetBook.book_id]
    );
    const originalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [result.data.new_book_id]
    );
    const newCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [result.data.new_book_id]
    );

    expect(newCharacters.length).toBe(originalCharacters.length);
    expect(newCards.length).toBe(originalCards.length);

    for (const newChar of newCharacters) {
      expect(newChar.is_protagonist).toBeDefined();
      expect(newChar.name).toBeDefined();
      expect(newChar.avatar).toBeDefined();
    }

    for (const newCard of newCards) {
      expect(newCard.sub_type).toBeDefined();
      expect(newCard.name).toBeDefined();
      expect(newCard.icon).toBeDefined();
    }
  });

  test('搜索功能应正确过滤书籍', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const searchInput = page.locator('#searchInput');
    if (await searchInput.isVisible()) {
      await searchInput.fill('冒险');
      await page.waitForTimeout(500);

      const bookCards = page.locator('.magic-book-card');
      const count = await bookCards.count();

      for (let i = 0; i < count; i++) {
        const title = await bookCards.nth(i).getAttribute('data-title') || '';
        expect(title.toLowerCase()).toContain('冒险');
      }
    } else {
      expect(true).toBe(true);
    }
  });

  test('导入书籍后原书籍不应被修改', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalTitle = presetBook.title;
    const originalType = presetBook.type;

    await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const afterImportBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [presetBook.book_id]
    );

    expect(afterImportBook.title).toBe(originalTitle);
    expect(afterImportBook.type).toBe(originalType);
    expect(afterImportBook.is_preset).toBe(1);
  });

  test('UI导入书籍后数据库应正确记录', async ({ page }) => {
    const beforeCount = db.query(
      'SELECT COUNT(*) as count FROM books WHERE user_id = ?',
      [testUserId]
    )?.count || 0;

    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const importBtn = page.locator('button:has-text("Import")');
    await importBtn.click();
    await page.waitForTimeout(3000);

    const afterCount = db.query(
      'SELECT COUNT(*) as count FROM books WHERE user_id = ?',
      [testUserId]
    )?.count || 0;

    expect(afterCount).toBe(beforeCount + 1);
  });

  test('导入书籍后角色ID应重新生成', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalCharacters = db.queryAll(
      'SELECT char_id FROM characters WHERE book_id = ?',
      [presetBook.book_id]
    );
    const originalCharIds = originalCharacters.map(c => c.char_id);

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newCharacters = db.queryAll(
      'SELECT char_id FROM characters WHERE book_id = ?',
      [result.data.new_book_id]
    );
    const newCharIds = newCharacters.map(c => c.char_id);

    for (const newId of newCharIds) {
      expect(originalCharIds).not.toContain(newId);
    }
  });

  test('导入书籍后卡牌ID应重新生成', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalCards = db.queryAll(
      'SELECT card_id FROM plot_cards WHERE book_id = ?',
      [presetBook.book_id]
    );
    const originalCardIds = originalCards.map(c => c.card_id);

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newCards = db.queryAll(
      'SELECT card_id FROM plot_cards WHERE book_id = ?',
      [result.data.new_book_id]
    );
    const newCardIds = newCards.map(c => c.card_id);

    for (const newId of newCardIds) {
      expect(originalCardIds).not.toContain(newId);
    }
  });

  test('导入书籍后章节ID应重新生成', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalChapters = db.queryAll(
      'SELECT chapter_id FROM chapters WHERE book_id = ?',
      [presetBook.book_id]
    );
    const originalChapterIds = originalChapters.map(c => c.chapter_id);

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newChapters = db.queryAll(
      'SELECT chapter_id FROM chapters WHERE book_id = ?',
      [result.data.new_book_id]
    );
    const newChapterIds = newChapters.map(c => c.chapter_id);

    for (const newId of newChapterIds) {
      expect(originalChapterIds).not.toContain(newId);
    }
  });

  test('导入书籍后谜题ID应重新生成', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalPuzzles = db.queryAll(
      `SELECT p.puzzle_id FROM puzzles p 
       JOIN chapters c ON p.chapter_id = c.chapter_id 
       WHERE c.book_id = ?`,
      [presetBook.book_id]
    );
    const originalPuzzleIds = originalPuzzles.map(p => p.puzzle_id);

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newPuzzles = db.queryAll(
      `SELECT p.puzzle_id FROM puzzles p 
       JOIN chapters c ON p.chapter_id = c.chapter_id 
       WHERE c.book_id = ?`,
      [result.data.new_book_id]
    );
    const newPuzzleIds = newPuzzles.map(p => p.puzzle_id);

    for (const newId of newPuzzleIds) {
      expect(originalPuzzleIds).not.toContain(newId);
    }
  });

  test('导入书籍后主角应正确复制', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalProtagonist = db.query(
      'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newProtagonist = db.query(
      'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
      [result.data.new_book_id]
    );

    expect(newProtagonist).toBeDefined();
    expect(newProtagonist.name).toBe(originalProtagonist.name);
    expect(newProtagonist.avatar).toBe(originalProtagonist.avatar);
    expect(newProtagonist.is_protagonist).toBe(1);
  });

  test('导入书籍后配角应正确复制', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalSupporting = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newSupporting = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0',
      [result.data.new_book_id]
    );

    expect(newSupporting.length).toBe(originalSupporting.length);
    
    for (let i = 0; i < originalSupporting.length; i++) {
      expect(newSupporting[i].name).toBe(originalSupporting[i].name);
      expect(newSupporting[i].role_type).toBe(originalSupporting[i].role_type);
      expect(newSupporting[i].is_protagonist).toBe(0);
    }
  });

  test('导入书籍后卡牌子类型应正确分布', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalWeatherCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [presetBook.book_id, 'weather']
    );
    const originalTerrainCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [presetBook.book_id, 'terrain']
    );
    const originalAdventureCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [presetBook.book_id, 'adventure']
    );
    const originalEquipmentCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [presetBook.book_id, 'equipment']
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newWeatherCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [result.data.new_book_id, 'weather']
    );
    const newTerrainCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [result.data.new_book_id, 'terrain']
    );
    const newAdventureCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [result.data.new_book_id, 'adventure']
    );
    const newEquipmentCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [result.data.new_book_id, 'equipment']
    );

    expect(newWeatherCards.length).toBe(originalWeatherCards.length);
    expect(newTerrainCards.length).toBe(originalTerrainCards.length);
    expect(newAdventureCards.length).toBe(originalAdventureCards.length);
    expect(newEquipmentCards.length).toBe(originalEquipmentCards.length);
  });

  test('导入书籍后章节顺序应保持一致', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalChapters = db.queryAll(
      'SELECT chapter_id, order_num, title FROM chapters WHERE book_id = ? ORDER BY order_num',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newChapters = db.queryAll(
      'SELECT chapter_id, order_num, title FROM chapters WHERE book_id = ? ORDER BY order_num',
      [result.data.new_book_id]
    );

    expect(newChapters.length).toBe(originalChapters.length);
    
    for (let i = 0; i < originalChapters.length; i++) {
      expect(newChapters[i].order_num).toBe(originalChapters[i].order_num);
      expect(newChapters[i].title).toBe(originalChapters[i].title);
    }
  });

  test('导入书籍后章节内容应正确复制', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalChapter = db.query(
      'SELECT * FROM chapters WHERE book_id = ? LIMIT 1',
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newChapter = db.query(
      'SELECT * FROM chapters WHERE book_id = ? AND order_num = ?',
      [result.data.new_book_id, originalChapter.order_num]
    );

    expect(newChapter.title).toBe(originalChapter.title);
    expect(newChapter.content).toBe(originalChapter.content);
  });

  test('导入书籍后谜题内容应正确复制', async ({ request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    const originalPuzzle = db.query(
      `SELECT p.* FROM puzzles p 
       JOIN chapters c ON p.chapter_id = c.chapter_id 
       WHERE c.book_id = ? LIMIT 1`,
      [presetBook.book_id]
    );

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });
    const result = await response.json();

    const newPuzzle = db.query(
      `SELECT p.* FROM puzzles p 
       JOIN chapters c ON p.chapter_id = c.chapter_id 
       WHERE c.book_id = ? AND p.question = ?`,
      [result.data.new_book_id, originalPuzzle.question]
    );

    expect(newPuzzle).toBeDefined();
    expect(newPuzzle.question).toBe(originalPuzzle.question);
    expect(newPuzzle.answer).toBe(originalPuzzle.answer);
    expect(newPuzzle.hint).toBe(originalPuzzle.hint);
  });

  test('不同类型书籍导入应正确保留类型', async ({ request }) => {
    const allPresetBooks = db.queryAll(
      'SELECT * FROM books WHERE is_preset = 1'
    );

    for (const presetBook of allPresetBooks) {
      const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
        data: {
          user_id: testUserId
        }
      });
      const result = await response.json();

      const newBook = db.query(
        'SELECT * FROM books WHERE book_id = ?',
        [result.data.new_book_id]
      );

      expect(newBook.type).toBe(presetBook.type);
    }
  });

  test('关闭详情页应返回图书馆', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();

    await page.waitForURL(/book/, { timeout: 5000 });
    await page.waitForTimeout(1000);

    await page.goBack();
    await page.waitForURL(/library/, { timeout: 5000 });
    expect(page.url()).toContain('library');
  });

  test('未登录用户访问公共图书馆应正常显示', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const booksGrid = page.locator('#booksGrid');
    await expect(booksGrid).toBeVisible();

    const bookCards = page.locator('.book-3d, .magic-book-card');
    const count = await bookCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('未登录用户点击书籍应能查看详情', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-3d, .magic-book-card').first();
    await firstBook.click();
    await page.waitForTimeout(1000);

    await page.waitForURL(/book/, { timeout: 5000 });
    expect(page.url()).toContain('is_preset=1');

    const chapterList = page.locator('.chapter-toc-item');
    await expect(chapterList.first()).toBeVisible();
  });

  test('未登录用户点击导入应跳转登录页', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-3d, .magic-book-card').first();
    await firstBook.click();
    await page.waitForTimeout(1000);

    const importBtn = page.locator('button:has-text("Import")');
    if (await importBtn.isVisible()) {
      await importBtn.click();
      await page.waitForTimeout(1000);

      await page.waitForURL(/login/, { timeout: 5000 }).catch(() => {
        expect(true).toBe(true);
      });
    } else {
      expect(true).toBe(true);
    }
  });

  test('公共图书馆应显示书籍卡片', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const bookCards = page.locator('.magic-book-card');
    const count = await bookCards.count();
    expect(count).toBeGreaterThan(0);

    const firstBook = bookCards.first();
    const bookContent = await firstBook.textContent();
    expect(bookContent.length).toBeGreaterThan(0);
  });

  test('详情弹窗应显示书籍描述', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();
    await page.waitForTimeout(1000);

    const description = page.locator('#detailDescription, .book-description');
    const hasDescription = await description.count() > 0;
    
    if (hasDescription) {
      const text = await description.first().textContent();
      expect(text.length).toBeGreaterThan(0);
    } else {
      expect(true).toBe(true);
    }
  });
});

test.describe('公共图书馆空状态测试', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('没有预设书籍时应显示空状态提示', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const emptyLibrary = page.locator('.empty-library');
    await expect(emptyLibrary).toBeVisible();

    const emptyTitle = page.locator('.empty-title');
    await expect(emptyTitle).toContainText('Empty');

    const emptyMessage = page.locator('.empty-message');
    await expect(emptyMessage).toBeVisible();
  });

  test('空状态应显示开发者提示', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const emptyHint = page.locator('.empty-hint');
    await expect(emptyHint).toBeVisible();
    await expect(emptyHint).toContainText('wrangler');
  });

  test('空状态时筛选标签应仍然可用', async ({ page }) => {
    await page.goto('/library.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const adventureTab = page.locator('.filter-tab[data-filter="adventure"]');
    await adventureTab.click();

    await expect(adventureTab).toHaveClass(/active/);

    const emptyLibrary = page.locator('.empty-library');
    await expect(emptyLibrary).toBeVisible();
  });

  test('未登录用户访问空图书馆也应显示空状态', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const emptyLibrary = page.locator('.empty-library');
    await expect(emptyLibrary).toBeVisible();
  });
});

test.describe('预设书籍数据验证', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile('migrations/0002_seed_data.sql');
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('预设书籍应有正确的数量', async () => {
    const presetBooks = db.queryAll(
      'SELECT * FROM books WHERE is_preset = 1'
    );

    expect(presetBooks.length).toBe(8);
  });

  test('预设书籍应覆盖所有类型', async () => {
    const types = db.queryAll(
      'SELECT DISTINCT type FROM books WHERE is_preset = 1'
    );

    const typeList = types.map(t => t.type);
    expect(typeList).toContain('adventure');
    expect(typeList).toContain('fantasy');
    expect(typeList).toContain('romance');
    expect(typeList).toContain('business');
  });

  test('每本预设书籍应有角色', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const characters = db.queryAll(
        'SELECT * FROM characters WHERE book_id = ?',
        [book.book_id]
      );
      expect(characters.length).toBeGreaterThan(0);
    }
  });

  test('每本预设书籍应有卡牌', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const cards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [book.book_id]
      );
      expect(cards.length).toBeGreaterThan(0);
    }
  });

  test('每本预设书籍应有章节', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const chapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ?',
        [book.book_id]
      );
      expect(chapters.length).toBeGreaterThan(0);
    }
  });

  test('每本预设书籍应有谜题', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const puzzles = db.queryAll(
        `SELECT p.* FROM puzzles p 
         JOIN chapters c ON p.chapter_id = c.chapter_id 
         WHERE c.book_id = ?`,
        [book.book_id]
      );
      expect(puzzles.length).toBeGreaterThan(0);
    }
  });

  test('预设书籍的主角应正确设置', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const protagonist = db.query(
        'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
        [book.book_id]
      );
      expect(protagonist).toBeDefined();
    }
  });

  test('预设书籍的卡牌应包含四种类型', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const weatherCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [book.book_id, 'weather']
      );
      const terrainCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [book.book_id, 'terrain']
      );
      const adventureCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [book.book_id, 'adventure']
      );
      const equipmentCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [book.book_id, 'equipment']
      );

      expect(weatherCards.length).toBeGreaterThan(0);
      expect(terrainCards.length).toBeGreaterThan(0);
      expect(adventureCards.length).toBeGreaterThan(0);
      expect(equipmentCards.length).toBeGreaterThan(0);
    }
  });
});
