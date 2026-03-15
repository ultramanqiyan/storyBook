import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('卡牌上限检查功能', () => {
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

  test('书籍创建时应包含四种类型卡牌', async ({ request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '卡牌上限测试',
        type: 'adventure',
        protagonist: {
          name: '测试主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await createBookResponse.json();
    const bookId = bookData.data.book_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = cards.filter(c => c.sub_type === 'equipment');
    
    expect(weatherCards.length).toBeGreaterThan(0);
    expect(terrainCards.length).toBeGreaterThan(0);
    expect(adventureCards.length).toBeGreaterThan(0);
    expect(equipmentCards.length).toBeGreaterThan(0);
  });

  test('API应返回卡牌列表', async ({ request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '卡牌API测试',
        type: 'adventure',
        protagonist: {
          name: '测试主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await createBookResponse.json();
    const bookId = bookData.data.book_id;

    const response = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  test('每种类型卡牌独立计算', async ({ request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '卡牌类型测试',
        type: 'adventure',
        protagonist: {
          name: '测试主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await createBookResponse.json();
    const bookId = bookData.data.book_id;

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );
    
    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = cards.filter(c => c.sub_type === 'equipment');
    
    expect(weatherCards.length).toBeGreaterThanOrEqual(1);
    expect(terrainCards.length).toBeGreaterThanOrEqual(1);
    expect(adventureCards.length).toBeGreaterThanOrEqual(1);
    expect(equipmentCards.length).toBeGreaterThanOrEqual(1);
  });
});
