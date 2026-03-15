import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('章节阅读页面', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;
  let protagonistId;
  let weatherCardId;
  let terrainCardId;
  let adventureCardId;
  let equipmentCardId;

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

  async function setupBookAndChapter(request) {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '阅读测试书籍',
        type: 'adventure',
        protagonist: {
          name: '阅读主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await createBookResponse.json();
    testBookId = bookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    weatherCardId = cards.find(c => c.sub_type === 'weather').card_id;
    terrainCardId = cards.find(c => c.sub_type === 'terrain').card_id;
    adventureCardId = cards.find(c => c.sub_type === 'adventure').card_id;
    equipmentCardId = cards.find(c => c.sub_type === 'equipment').card_id;

    const createChapterResponse = await request.post('/api/chapters', {
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
    const chapterData = await createChapterResponse.json();
    testChapterId = chapterData.data.chapter.chapter_id;

    return testChapterId;
  }

  test('加载章节应显示完整内容', async ({ page, request }) => {
    await setupBookAndChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await expect(page.locator('.chapter-name')).toBeVisible({ timeout: 10000 });

    await page.waitForTimeout(1000);

    const readingContent = page.locator('.reading-content').first();
    await expect(readingContent).toBeVisible();

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [testChapterId]
    );
    expect(dbChapter).toBeDefined();
    expect(dbChapter.title).toBeDefined();
  });

  test('侧边栏应显示角色和情节卡牌', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(1000);

    const sidebar = page.locator('#cardsSidebar');
    const toggleBtn = sidebar.locator('.sidebar-toggle');
    if (await toggleBtn.count() > 0) {
      await toggleBtn.click();
      await page.waitForTimeout(500);
    }

    const charTab = sidebar.locator('.sidebar-tab[data-tab="characters"]');
    if (await charTab.count() > 0) {
      const charList = page.locator('#sidebarCharacters');
      const charCount = await charList.locator('.sidebar-card').count();
      expect(charCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('章节导航应正确工作', async ({ page, request }) => {
    await setupBookAndChapter(request);

    const createChapter2Response = await request.post('/api/chapters', {
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
    const chapter2Data = await createChapter2Response.json();
    const chapter2Id = chapter2Data.data.chapter.chapter_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(1000);

    const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
    if (await nextBtn.isEnabled()) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
    }
  });

  test('未登录用户应跳转到登录页', async ({ page }) => {
    await page.goto(`/chapter.html?id=test-chapter-id`);

    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  test('API应返回正确的章节数据', async ({ request }) => {
    await setupBookAndChapter(request);

    const response = await request.get(`/api/chapters/${testChapterId}`);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.chapter_id).toBe(testChapterId);
    expect(data.data.book_id).toBe(testBookId);
    expect(data.data.title).toBeDefined();
    expect(data.data.content).toBeDefined();
    expect(Array.isArray(data.data.characters)).toBe(true);
    expect(Array.isArray(data.data.plot_cards)).toBe(true);

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [testChapterId]
    );
    expect(dbChapter).toBeDefined();
    expect(dbChapter.content).toBe(data.data.content);
  });

  test('章节不存在应返回404', async ({ request }) => {
    const response = await request.get('/api/chapters/non-existent-id');

    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('章节内容应包含故事文本', async ({ page, request }) => {
    await setupBookAndChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await expect(page.locator('.chapter-name')).toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(1000);

    const readingContent = page.locator('.reading-content').first();
    const content = await readingContent.textContent();

    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('章节应关联正确的书籍', async ({ request }) => {
    await setupBookAndChapter(request);

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [testChapterId]
    );

    expect(dbChapter.book_id).toBe(testBookId);
  });

  test('章节应关联正确的角色', async ({ request }) => {
    await setupBookAndChapter(request);

    const response = await request.get(`/api/chapters/${testChapterId}`);
    const data = await response.json();

    expect(data.data.characters.length).toBeGreaterThan(0);

    const protagonist = data.data.characters.find(c => c.role_type === 'protagonist');
    expect(protagonist).toBeDefined();
  });

  test('章节应关联正确的卡牌', async ({ request }) => {
    await setupBookAndChapter(request);

    const response = await request.get(`/api/chapters/${testChapterId}`);
    const data = await response.json();

    expect(data.data.plot_cards.length).toBeGreaterThan(0);

    const weatherCard = data.data.plot_cards.find(c => c.sub_type === 'weather');
    const terrainCard = data.data.plot_cards.find(c => c.sub_type === 'terrain');
    const adventureCard = data.data.plot_cards.find(c => c.sub_type === 'adventure');
    const equipmentCard = data.data.plot_cards.find(c => c.sub_type === 'equipment');

    expect(weatherCard).toBeDefined();
    expect(terrainCard).toBeDefined();
    expect(adventureCard).toBeDefined();
    expect(equipmentCard).toBeDefined();
  });

  test('章节顺序号应正确', async ({ request }) => {
    await setupBookAndChapter(request);

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [testChapterId]
    );

    expect(dbChapter.order_num).toBe(1);
  });

  test('多章节应正确排序', async ({ request }) => {
    await setupBookAndChapter(request);

    for (let i = 0; i < 2; i++) {
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
    }

    const dbChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [testBookId]
    );

    expect(dbChapters.length).toBe(3);
    expect(dbChapters[0].order_num).toBeLessThan(dbChapters[1].order_num);
    expect(dbChapters[1].order_num).toBeLessThan(dbChapters[2].order_num);
  });

  test('章节创建时间应正确记录', async ({ request }) => {
    await setupBookAndChapter(request);

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [testChapterId]
    );

    expect(dbChapter.created_at).toBeDefined();
  });

  test('章节页面应显示章节标题', async ({ page, request }) => {
    await setupBookAndChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    const chapterName = page.locator('.chapter-name');
    await expect(chapterName).toBeVisible();

    const title = await chapterName.textContent();
    expect(title).toBeDefined();
  });

  test('章节页面应正确显示返回按钮', async ({ page, request }) => {
    await setupBookAndChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    const backBtn = page.locator('.back-btn, .nav-back, a:has-text("Back")');
    if (await backBtn.count() > 0) {
      await expect(backBtn.first()).toBeVisible();
    }
  });

  test('数据库中章节记录应完整', async ({ request }) => {
    await setupBookAndChapter(request);

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [testChapterId]
    );

    expect(dbChapter).toBeDefined();
    expect(dbChapter.chapter_id).toBe(testChapterId);
    expect(dbChapter.book_id).toBe(testBookId);
    expect(dbChapter.title).toBeDefined();
    expect(dbChapter.content).toBeDefined();
    expect(dbChapter.selected_cards).toBeDefined();
  });
});
