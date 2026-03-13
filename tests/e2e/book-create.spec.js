import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('书籍创建流程', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('创建书籍并验证数据库', async ({ page, request }) => {
    const testUserId = db.getTestUserId();
    const testBookTitle = `测试书籍_${Date.now()}`;
    const protagonistName = '测试主角';
    const companionName = '测试配角';

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await expect(page.locator('.create-header h1')).toContainText('Create New Story');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', testBookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', protagonistName);
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    const companionInput = page.locator('#companion1 .form-input');
    await companionInput.fill(companionName);
    await page.locator('#companion1Avatars .avatar-option').first().click();
    await page.click('#step3 .btn-next:has-text("Create Story")');

    await expect(page.locator('.success-title')).toContainText('Story Created', { timeout: 15000 });

    const viewStoryLink = page.locator('.success-content a:has-text("View Story")');
    await expect(viewStoryLink).toBeVisible();
    
    const bookHref = await viewStoryLink.getAttribute('href');
    expect(bookHref).toMatch(/book(\.html)?\?id=/);
    
    const bookId = bookHref.split('id=')[1];
    expect(bookId).toBeDefined();

    const booksResponse = await request.get(`/api/books/${bookId}`);
    const booksData = await booksResponse.json();
    expect(booksData.success).toBe(true);
    expect(booksData.data.title).toBe(testBookTitle);
    expect(booksData.data.type).toBe('adventure');
    expect(booksData.data.user_id).toBe(testUserId);

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    expect(charsData.success).toBe(true);
    
    const protagonist = charsData.data.find(c => c.is_protagonist === 1);
    expect(protagonist).toBeDefined();
    expect(protagonist.name).toBe(protagonistName);

    const supporting = charsData.data.filter(c => c.is_protagonist === 0);
    expect(supporting.length).toBe(1);
    expect(supporting[0].name).toBe(companionName);

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    expect(cardsData.success).toBe(true);
    expect(cardsData.data.length).toBeGreaterThan(0);

    const weatherCards = cardsData.data.filter(c => c.sub_type === 'weather');
    expect(weatherCards.length).toBe(4);

    const terrainCards = cardsData.data.filter(c => c.sub_type === 'terrain');
    expect(terrainCards.length).toBe(4);

    const adventureCards = cardsData.data.filter(c => c.sub_type === 'adventure');
    expect(adventureCards.length).toBe(4);

    const equipmentCards = cardsData.data.filter(c => c.sub_type === 'equipment');
    expect(equipmentCards.length).toBe(4);
  });

  test('创建书籍不填写标题应失败', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await page.waitForTimeout(2000);

    await expect(page.locator('.success-title')).not.toBeVisible();
  });

  test('创建书籍不选择类型应失败', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '测试书籍');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await page.waitForTimeout(2000);

    await expect(page.locator('.success-title')).not.toBeVisible();
  });

  test('创建书籍不填写主角名应在创建时显示错误', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await page.waitForTimeout(1000);

    await expect(page.locator('.success-title')).not.toBeVisible();
  });

  test('创建书籍不选择主角头像应可以继续', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '测试主角');
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();
  });

  test('创建书籍可以不添加配角', async ({ page, request }) => {
    const testUserId = db.getTestUserId();
    const testBookTitle = `无配角书籍_${Date.now()}`;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', testBookTitle);
    await page.selectOption('#storyGenre', 'fantasy');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await expect(page.locator('.success-title')).toContainText('Story Created', { timeout: 15000 });

    const viewStoryLink = page.locator('.success-content a:has-text("View Story")');
    const bookHref = await viewStoryLink.getAttribute('href');
    const bookId = bookHref.split('id=')[1];

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();

    const supporting = charsData.data.filter(c => c.is_protagonist === 0);
    expect(supporting.length).toBe(0);
  });

  test('创建书籍API应返回正确的数据', async ({ request }) => {
    const testUserId = db.getTestUserId();
    const testBookTitle = `API测试书籍_${Date.now()}`;

    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: testBookTitle,
        type: 'adventure',
        protagonist: {
          name: 'API主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.book_id).toBeDefined();
    expect(data.data.title).toBe(testBookTitle);
    expect(data.data.type).toBe('adventure');
  });

  test('创建书籍后数据库应有正确记录', async ({ request }) => {
    const testUserId = db.getTestUserId();
    const testBookTitle = `数据库测试书籍_${Date.now()}`;

    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: testBookTitle,
        type: 'romance',
        protagonist: {
          name: '数据库主角',
          avatar: '💕',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const data = await response.json();
    const bookId = data.data.book_id;

    const dbBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookId]
    );

    expect(dbBook).toBeDefined();
    expect(dbBook.title).toBe(testBookTitle);
    expect(dbBook.type).toBe('romance');
    expect(dbBook.user_id).toBe(testUserId);
  });

  test('创建书籍应自动创建主角角色', async ({ request }) => {
    const testUserId = db.getTestUserId();

    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '角色测试书籍',
        type: 'adventure',
        protagonist: {
          name: '自动主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const data = await response.json();
    const bookId = data.data.book_id;

    const dbChars = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
      [bookId]
    );

    expect(dbChars.length).toBe(1);
    expect(dbChars[0].name).toBe('自动主角');
  });

  test('创建书籍应自动创建初始卡牌', async ({ request }) => {
    const testUserId = db.getTestUserId();

    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '卡牌测试书籍',
        type: 'adventure',
        protagonist: {
          name: '卡牌主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const data = await response.json();
    const bookId = data.data.book_id;

    const dbCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    expect(dbCards.length).toBe(16);

    const weatherCards = dbCards.filter(c => c.sub_type === 'weather');
    const terrainCards = dbCards.filter(c => c.sub_type === 'terrain');
    const adventureCards = dbCards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = dbCards.filter(c => c.sub_type === 'equipment');

    expect(weatherCards.length).toBe(4);
    expect(terrainCards.length).toBe(4);
    expect(adventureCards.length).toBe(4);
    expect(equipmentCards.length).toBe(4);
  });

  test('不同类型书籍应有不同的卡牌', async ({ request }) => {
    const testUserId = db.getTestUserId();

    const adventureResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '冒险书籍',
        type: 'adventure',
        protagonist: {
          name: '冒险主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const fantasyResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '奇幻书籍',
        type: 'fantasy',
        protagonist: {
          name: '奇幻主角',
          avatar: '🧝‍♀️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const adventureData = await adventureResponse.json();
    const fantasyData = await fantasyResponse.json();

    const adventureCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [adventureData.data.book_id]
    );

    const fantasyCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [fantasyData.data.book_id]
    );

    const adventureNames = adventureCards.map(c => c.name);
    const fantasyNames = fantasyCards.map(c => c.name);

    expect(adventureNames).not.toEqual(fantasyNames);
  });

  test('创建书籍页面应正确显示步骤', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await expect(page.locator('#step1')).toBeVisible();

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '步骤测试');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();
  });

  test('创建书籍未登录应跳转到登录页', async ({ page }) => {
    await page.goto('/book-create.html');

    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  test('创建书籍应正确设置创建时间', async ({ request }) => {
    const testUserId = db.getTestUserId();

    const beforeTime = Date.now();
    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '时间测试书籍',
        type: 'adventure',
        protagonist: {
          name: '时间主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const afterTime = Date.now();

    const data = await response.json();
    const dbBook = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [data.data.book_id]
    );

    expect(dbBook.created_at).toBeDefined();
  });

  test('创建书籍可以添加多个配角', async ({ page, request }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '多配角书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await page.locator('#companion1 .form-input').fill('配角1');
    await page.locator('#companion1Avatars .avatar-option').first().click();

    const addCompanionBtn = page.locator('.add-companion-btn');
    if (await addCompanionBtn.count() > 0) {
      await addCompanionBtn.click();
      await page.waitForTimeout(300);
      await page.locator('#companion2 .form-input').fill('配角2');
      await page.locator('#companion2Avatars .avatar-option').first().click();
    }

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await expect(page.locator('.success-title')).toContainText('Story Created', { timeout: 15000 });
  });
});
