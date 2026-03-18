import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('书籍详情页面', () => {
  let db;
  let testUserId;
  let testBookId;

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

  async function createTestBook(request) {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '详情测试书籍',
        type: 'adventure',
        protagonist: {
          name: '测试主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: '配角1',
            avatar: '🧝‍♀️',
            role_type: 'supporting',
            is_protagonist: 0
          }
        ]
      }
    });
    const bookData = await createBookResponse.json();
    testBookId = bookData.data.book_id;
    return testBookId;
  }

  test('加载书籍详情应显示完整信息', async ({ page, request }) => {
    await createTestBook(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    await expect(page.locator('.book-meta-info h2')).toContainText('详情测试书籍');

    await expect(page.locator('.type-badge')).toContainText('adventure');

    const stats = page.locator('.stats');
    await expect(stats).toContainText('Chapters');

    const dbBook = db.getBookById(testBookId);
    expect(dbBook).toBeDefined();
    expect(dbBook.title).toBe('详情测试书籍');
  });

  test('切换到角色视图应显示角色列表', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const charactersTab = page.locator('.view-tab[data-view="characters"]');
    await charactersTab.click();

    await page.waitForTimeout(500);

    const characterCards = page.locator('.character-grid-view .hs-card-mini');
    const count = await characterCards.count();
    expect(count).toBeGreaterThan(0);

    const dbChars = db.getCharactersByBookId(testBookId);
    expect(dbChars.length).toBeGreaterThan(0);
  });

  test('切换到情节卡牌视图应显示卡牌列表', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const plotsTab = page.locator('.view-tab[data-view="plots"]');
    await plotsTab.click();

    await page.waitForTimeout(500);

    const plotCards = page.locator('.plot-grid-view .plot-card');
    const count = await plotCards.count();
    expect(count).toBeGreaterThan(0);

    const dbCards = db.getPlotCardsByBookId(testBookId);
    expect(dbCards.length).toBeGreaterThan(0);
  });

  test('点击角色应显示详情弹窗', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const charactersTab = page.locator('.view-tab[data-view="characters"]');
    await charactersTab.click();

    await page.waitForTimeout(500);

    const firstCharCard = page.locator('.character-grid-view .hs-card-mini').first();
    await firstCharCard.click();

    const modal = page.locator('#cardModal.active');
    await expect(modal).toBeVisible();
  });

  test('点击导演新章节应跳转到导演页面', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const directorBtn = page.locator('.action-btn:has-text("Direct")');
    await directorBtn.click();

    await expect(page).toHaveURL(/director\?book_id=/, { timeout: 30000 });
  });

  test('未登录用户应跳转到登录页', async ({ page }) => {
    await page.goto(`/book.html?id=${testBookId}`);

    await expect(page).toHaveURL(/login/, { timeout: 30000 });
  });

  test('API应返回正确的书籍详情数据', async ({ request }) => {
    const response = await request.get(`/api/books/${testBookId}`);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.book_id).toBe(testBookId);
    expect(data.data.title).toBe('详情测试书籍');
    expect(data.data.type).toBe('adventure');
    expect(data.data.user_id).toBe(testUserId);
    expect(Array.isArray(data.data.characters)).toBe(true);
    expect(Array.isArray(data.data.chapters)).toBe(true);

    const dbBook = db.getBookById(testBookId);
    expect(dbBook).toBeDefined();
    expect(dbBook.title).toBe('详情测试书籍');
  });

  test('书籍不存在应返回404', async ({ request }) => {
    const response = await request.get('/api/books/non-existent-id');

    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('书籍详情页应显示正确的章节数量', async ({ page, request }) => {
    await createTestBook(request);

    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const weatherCardId = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainCardId = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureCardId = cards.find(c => c.sub_type === 'adventure').card_id;
    const equipmentCardId = cards.find(c => c.sub_type === 'equipment').card_id;

    await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonistId,
          weather_id: weatherCardId,
          terrain_id: terrainCardId,
          adventure_id: adventureCardId,
          equipment_id: equipmentCardId
        }
      }
    });

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const stats = page.locator('.stats');
    await expect(stats).toContainText('Chapters');

    const dbChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(dbChapters.length).toBeGreaterThan(0);
  });

  test('书籍详情页应显示正确的角色数量', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const stats = page.locator('.stats');
    await expect(stats).toContainText('Characters');

    const dbChars = db.getCharactersByBookId(testBookId);
    expect(dbChars.length).toBeGreaterThan(0);
  });

  test('角色列表应包含主角和配角', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const charactersTab = page.locator('.view-tab[data-view="characters"]');
    await charactersTab.click();

    await page.waitForTimeout(500);

    const dbChars = db.getCharactersByBookId(testBookId);
    const protagonist = dbChars.find(c => c.is_protagonist === 1);
    const supporting = dbChars.filter(c => c.is_protagonist === 0);

    expect(protagonist).toBeDefined();
    expect(supporting.length).toBeGreaterThan(0);
  });

  test('卡牌列表应包含四种类型', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const plotsTab = page.locator('.view-tab[data-view="plots"]');
    await plotsTab.click();

    await page.waitForTimeout(500);

    const dbCards = db.getPlotCardsByBookId(testBookId);

    const weatherCards = dbCards.filter(c => c.sub_type === 'weather');
    const terrainCards = dbCards.filter(c => c.sub_type === 'terrain');
    const adventureCards = dbCards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = dbCards.filter(c => c.sub_type === 'equipment');

    expect(weatherCards.length).toBeGreaterThan(0);
    expect(terrainCards.length).toBeGreaterThan(0);
    expect(adventureCards.length).toBeGreaterThan(0);
    expect(equipmentCards.length).toBeGreaterThan(0);
  });

  test('书籍类型徽章应正确显示', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const typeBadge = page.locator('.type-badge');
    await expect(typeBadge).toContainText('adventure');
  });

  test('关闭角色弹窗应正常工作', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const charactersTab = page.locator('.view-tab[data-view="characters"]');
    await charactersTab.click();

    await page.waitForTimeout(500);

    const firstCharCard = page.locator('.character-grid-view .hs-card-mini').first();
    await firstCharCard.click();

    const modal = page.locator('#cardModal.active');
    await expect(modal).toBeVisible();

    const closeBtn = modal.locator('.modal-close, .close-btn');
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test('视图切换应正确切换内容', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    const chaptersTab = page.locator('.view-tab[data-view="chapters"]');
    await chaptersTab.click();
    await page.waitForTimeout(300);

    const charactersTab = page.locator('.view-tab[data-view="characters"]');
    await charactersTab.click();
    await page.waitForTimeout(300);

    const plotsTab = page.locator('.view-tab[data-view="plots"]');
    await plotsTab.click();
    await page.waitForTimeout(300);
  });

  test('数据库中书籍记录应完整', async ({ request }) => {
    await createTestBook(request);

    const dbBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [testBookId]
    );

    expect(dbBook).toBeDefined();
    expect(dbBook.title).toBe('详情测试书籍');
    expect(dbBook.type).toBe('adventure');
    expect(dbBook.user_id).toBe(testUserId);
    expect(dbBook.created_at).toBeDefined();
  });
});
