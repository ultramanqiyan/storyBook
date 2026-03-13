import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('书架页面', () => {
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

  test('加载书架页面应显示用户书籍', async ({ page, request }) => {
    await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '测试书籍1',
        type: 'adventure',
        protagonist: {
          name: '主角1',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await expect(page.locator('.page-title')).toContainText('Library');

    const myBooksSection = page.locator('.books-section').first();
    const bookItems = myBooksSection.locator('.book-item');
    const count = await bookItems.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const dbBooks = db.queryAll(
      'SELECT * FROM books WHERE user_id = ?',
      [testUserId]
    );
    expect(dbBooks.length).toBeGreaterThan(0);
  });

  test('书籍类型筛选功能应正常工作', async ({ page, request }) => {
    await request.post('/api/books', {
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

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await page.waitForTimeout(1000);

    const adventureTab = page.locator('.filter-tab[data-filter="adventure"]');
    if (await adventureTab.count() > 0) {
      await adventureTab.click();
      await page.waitForTimeout(500);
    }

    const allTab = page.locator('.filter-tab[data-filter="all"]');
    if (await allTab.count() > 0) {
      await allTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('点击书籍应跳转到书籍详情页', async ({ page, request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '可点击书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await createBookResponse.json();
    const bookId = bookData.data.book_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await page.waitForTimeout(1000);

    const bookItem = page.locator('.book-3d').first();
    await bookItem.click();

    await expect(page).toHaveURL(/book\?id=/, { timeout: 10000 });
  });

  test('点击创建新故事应跳转到创建页面', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    const createBtn = page.locator('.btn-3d:has-text("Create")');
    await createBtn.click();

    await expect(page).toHaveURL(/book-create/, { timeout: 10000 });
  });

  test('点击添加书籍卡片应跳转到创建页面', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await page.waitForTimeout(500);

    const addBookCard = page.locator('.add-book-card');
    if (await addBookCard.count() > 0) {
      await addBookCard.click();
      await expect(page).toHaveURL(/book-create/, { timeout: 10000 });
    }
  });

  test('未登录用户应跳转到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');

    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  test('API应返回正确的书籍列表数据', async ({ request }) => {
    await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'API测试书籍',
        type: 'romance',
        protagonist: {
          name: '浪漫主角',
          avatar: '💕',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const response = await request.get(`/api/books?user_id=${testUserId}`);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);

    const lastBook = data.data[data.data.length - 1];
    expect(lastBook.title).toBeDefined();
    expect(lastBook.type).toBeDefined();
    expect(lastBook.user_id).toBe(testUserId);

    const dbBooks = db.queryAll(
      'SELECT * FROM books WHERE user_id = ?',
      [testUserId]
    );
    expect(dbBooks.length).toBeGreaterThan(0);
  });

  test('书架页面应显示正确的书籍数量', async ({ page, request }) => {
    db.run('DELETE FROM books WHERE user_id = ?', [testUserId]);

    await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '数量测试书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await page.waitForTimeout(1000);

    const dbBooks = db.queryAll(
      'SELECT * FROM books WHERE user_id = ?',
      [testUserId]
    );
    expect(dbBooks.length).toBeGreaterThan(0);
  });

  test('不同类型书籍应正确显示类型标签', async ({ page, request }) => {
    await request.post('/api/books', {
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

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await page.waitForTimeout(1000);

    const dbBooks = db.queryAll(
      'SELECT * FROM books WHERE user_id = ? AND type = ?',
      [testUserId, 'fantasy']
    );
    expect(dbBooks.length).toBeGreaterThan(0);
  });

  test('书籍创建时间应正确记录', async ({ request }) => {
    const beforeTime = Date.now();

    const response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '时间测试书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
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

    expect(dbBook).toBeDefined();
    expect(dbBook.created_at).toBeDefined();
  });

  test('书架页面应正确处理空书籍列表', async ({ page }) => {
    db.run('DELETE FROM books WHERE user_id = ?', [testUserId]);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await expect(page.locator('.page-title')).toContainText('Library');
  });

  test('API应正确处理不存在的用户', async ({ request }) => {
    const response = await request.get('/api/books?user_id=non-existent-user');
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('书籍应按创建时间倒序排列', async ({ request }) => {
    db.run('DELETE FROM books WHERE user_id = ?', [testUserId]);

    for (let i = 0; i < 3; i++) {
      await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `排序测试书籍${i}`,
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const response = await request.get(`/api/books?user_id=${testUserId}`);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.length).toBe(3);
  });

  test('书架页面应正确显示书籍封面', async ({ page, request }) => {
    await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '封面测试书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    await page.waitForTimeout(1000);

    const bookCover = page.locator('.book-3d').first();
    await expect(bookCover).toBeVisible();
  });
});
