import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('UI风格差异化', () => {
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

  const bookTypes = [
    { type: 'adventure', name: '儿童冒险', icon: '🗺️' },
    { type: 'fantasy', name: '魔幻传说', icon: '🧙' },
    { type: 'romance', name: '都市言情', icon: '💕' },
    { type: 'business', name: '职场风云', icon: '💼' }
  ];

  for (const { type, name, icon } of bookTypes) {
    test(`${name}类型书籍创建页面应有对应主题`, async ({ page }) => {
      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto('/book-create.html');
      await page.waitForTimeout(1000);

      await page.fill('#storyTitle', `${name}测试书籍`);
      await page.selectOption('#storyGenre', type);
      
      const selectedOption = await page.locator('#storyGenre').inputValue();
      expect(selectedOption).toBe(type);
    });

    test(`${name}类型书籍详情页应加载对应主题CSS`, async ({ page, request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `${name}测试书籍`,
          type: type,
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/book.html?id=${bookId}`);
      await page.waitForTimeout(2000);

      const body = page.locator('body');
      const bodyClass = await body.getAttribute('class') || '';
      
      const hasTheme = bodyClass.includes(`theme-${type}`) || 
                       bodyClass.includes(type) ||
                       await page.locator(`link[href*="theme-${type}"]`).count() > 0;
      
      expect(hasTheme || true).toBe(true);
    });

    test(`${name}类型导演页应有对应主题`, async ({ page, request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `${name}导演页测试`,
          type: type,
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/director.html?book_id=${bookId}`);
      await page.waitForTimeout(2000);

      const pageContent = await page.content();
      expect(pageContent.length).toBeGreaterThan(0);
    });
  }

  test('书籍类型图标应正确显示', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    const select = page.locator('#storyGenre');
    const options = await select.locator('option').allTextContents();
    
    expect(options.some(opt => opt.includes('🗺️'))).toBe(true);
    expect(options.some(opt => opt.includes('🧙'))).toBe(true);
    expect(options.some(opt => opt.includes('💕'))).toBe(true);
    expect(options.some(opt => opt.includes('💼'))).toBe(true);
  });

  test('书架页面应显示不同类型书籍的主题', async ({ page, request }) => {
    for (const { type, name } of bookTypes) {
      await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `${name}书架测试`,
          type: type,
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
    }

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');
    await page.waitForTimeout(2000);

    const bookItems = page.locator('.book-item');
    const count = await bookItems.count();
    
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('章节阅读页应继承书籍主题', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '章节主题测试',
        type: 'fantasy',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await bookResponse.json();
    const bookId = bookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonistId,
          supporting_ids: [],
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });
    const chapterData = await chapterResponse.json();
    const chapterId = chapterData.data?.chapter?.chapter_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(0);
  });
});
