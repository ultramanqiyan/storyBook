import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('卡牌丢弃弹窗测试', () => {
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
    if (db) db.close();
  });
  
  test('书籍创建时应包含卡牌', async ({ request }) => {
    const bookId = 'test-book-discard-' + Date.now();
    
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '测试丢弃书籍',
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
    expect(bookData.success).toBe(true);
    
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookData.data.book_id]
    );
    
    expect(cards.length).toBeGreaterThan(0);
  });
  
  test('卡牌数量应正确', async ({ request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '测试卡牌数量',
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
    
    const weatherCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookData.data.book_id, 'weather']
    );
    
    expect(weatherCards.length).toBeGreaterThan(0);
  });
});
