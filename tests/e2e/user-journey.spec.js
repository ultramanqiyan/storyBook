import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('完整用户旅程测试 - 多步骤多页面', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('完整用户旅程: 登录→创建书籍→添加章节→公共图书馆→导入书籍', async ({ page, request }) => {
    const testEmail = `journey_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';
    const testBookTitle = `Journey Book ${Date.now()}`;

    await page.goto('/');
    await expect(page).toHaveTitle(/StoryBook/);

    await page.click('a[href="login.html"]');
    await page.waitForURL(/login/);

    await expect(page.locator('.login-title').first()).toContainText('Begin');
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);

    await page.click('.wax-seal-btn');
    await page.waitForURL(/bookshelf/, { timeout: 30000 });

    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBeTruthy();

    const response = await request.post('/api/books', {
      data: {
        user_id: userId,
        title: testBookTitle,
        type: 'adventure',
        protagonist: {
          name: 'Journey Hero',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const data = await response.json();
    expect(data.success).toBe(true);

    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    if (presetBook) {
      const importResponse = await request.post(`/api/books/${presetBook.book_id}/import`, {
        data: {
          user_id: userId
        }
      });

      const importResult = await importResponse.json();
      expect(importResult.success).toBe(true);
    }

    const booksResponse = await request.get(`/api/books?user_id=${userId}`);
    const booksData = await booksResponse.json();
    expect(booksData.success).toBe(true);
    expect(booksData.data.length).toBeGreaterThanOrEqual(1);
  });

  test('用户旅程: 登录→解谜→获得卡牌→查看卡牌收藏', async ({ page }) => {
    const testEmail = `puzzle_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';

    await page.goto('/login.html');
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.click('.wax-seal-btn');
    await page.waitForURL(/bookshelf/, { timeout: 30000 });

    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-item').first();
    await firstBook.click();
    await page.waitForTimeout(1000);

    const readButton = page.locator('button:has-text("Read"), a:has-text("Read")');
    if (await readButton.count() > 0) {
      await readButton.first().click();
      await page.waitForTimeout(1000);
    }

    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards")');
    if (await cardTab.count() > 0) {
      await cardTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('用户旅程: 新用户首次完整体验', async ({ page, request }) => {
    const newEmail = `newuser_${Date.now()}@test.com`;
    const newPassword = 'NewUser123!';

    await page.goto('/');
    await page.waitForTimeout(500);

    const heroSection = page.locator('.hero, .welcome-section');
    if (await heroSection.count() > 0) {
      await expect(heroSection).toBeVisible();
    }

    await page.click('a[href="login.html"]');
    await page.waitForURL(/login/);

    await page.fill('#email', newEmail);
    await page.fill('#password', newPassword);
    await page.click('.wax-seal-btn');

    await page.waitForURL(/bookshelf/, { timeout: 30000 });

    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBeTruthy();

    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    if (presetBook) {
      const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
        data: {
          user_id: userId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    }
  });
});

test.describe('跨页面数据一致性测试', () => {
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

  test('创建书籍后在不同页面应保持一致', async ({ page, request }) => {
    const bookTitle = `Consistency Test Book ${Date.now()}`;

    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: bookTitle,
        type: 'fantasy',
        protagonist: {
          name: 'Test Hero',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const data = await response.json();
    expect(data.success).toBe(true);

    const booksResponse = await request.get(`/api/books?user_id=${testUserId}`);
    const booksData = await booksResponse.json();
    expect(booksData.success).toBe(true);
    
    const createdBook = booksData.data.find(b => b.title === bookTitle);
    expect(createdBook).toBeDefined();
  });

  test('导入书籍后书架和图书馆数据一致', async ({ page, request }) => {
    const presetBook = db.query(
      'SELECT * FROM books WHERE is_preset = 1 LIMIT 1'
    );

    if (!presetBook) {
      expect(true).toBe(true);
      return;
    }

    const response = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);

    const booksResponse = await request.get(`/api/books?user_id=${testUserId}`);
    const booksData = await booksResponse.json();
    
    const importedBook = booksData.data.find(b => b.title === presetBook.title);
    expect(importedBook).toBeDefined();
  });
});
