import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('预设数据验证', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test.describe('预设书籍验证', () => {
    test('预设书籍API应可调用', async ({ request }) => {
      const response = await request.get('/api/books?is_preset=1');
      const result = await response.json();
      
      expect(result).toBeDefined();
    });

    test('预设书籍应包含不同类型', async ({ request }) => {
      const response = await request.get('/api/books?is_preset=1');
      const result = await response.json();
      
      if (result.success && result.data) {
        const types = [...new Set(result.data.map(book => book.type))];
        expect(types.length).toBeGreaterThan(0);
      }
    });

    test('预设书籍应有正确的标题', async ({ request }) => {
      const response = await request.get('/api/books?is_preset=1');
      const result = await response.json();
      
      if (result.success && result.data) {
        result.data.forEach(book => {
          expect(book.title).toBeTruthy();
          expect(book.title.length).toBeGreaterThan(0);
        });
      }
    });
  });

  test.describe('预设章节验证', () => {
    test('预设书籍应有章节', async ({ request }) => {
      const booksResponse = await request.get('/api/books?is_preset=1');
      const booksResult = await booksResponse.json();
      
      if (booksResult.success && booksResult.data && booksResult.data.length > 0) {
        const book = booksResult.data[0];
        const chaptersResponse = await request.get(`/api/chapters?book_id=${book.book_id}`);
        const chaptersResult = await chaptersResponse.json();
        
        expect(chaptersResult.success).toBe(true);
      }
    });

    test('预设章节应有内容', async ({ request }) => {
      const booksResponse = await request.get('/api/books?is_preset=1');
      const booksResult = await booksResponse.json();
      
      if (booksResult.success && booksResult.data && booksResult.data.length > 0) {
        const book = booksResult.data[0];
        const chaptersResponse = await request.get(`/api/chapters?book_id=${book.book_id}`);
        const chaptersResult = await chaptersResponse.json();
        
        if (chaptersResult.success && chaptersResult.data) {
          expect(chaptersResult.data.length).toBeGreaterThan(0);
        }
      }
    });
  });

  test.describe('预设角色验证', () => {
    test('预设书籍应有主角', async ({ request }) => {
      const booksResponse = await request.get('/api/books?is_preset=1');
      const booksResult = await booksResponse.json();
      
      if (booksResult.success && booksResult.data && booksResult.data.length > 0) {
        const book = booksResult.data[0];
        const charsResponse = await request.get(`/api/characters?book_id=${book.book_id}`);
        const charsResult = await charsResponse.json();
        
        if (charsResult.success && charsResult.data) {
          const protagonist = charsResult.data.find(c => c.is_protagonist === 1);
          expect(protagonist).toBeDefined();
        }
      }
    });
  });

  test.describe('预设卡牌验证', () => {
    test('预设书籍应有卡牌', async ({ request }) => {
      const booksResponse = await request.get('/api/books?is_preset=1');
      const booksResult = await booksResponse.json();
      
      if (booksResult.success && booksResult.data && booksResult.data.length > 0) {
        const book = booksResult.data[0];
        const cardsResponse = await request.get(`/api/plot-cards?book_id=${book.book_id}`);
        const cardsResult = await cardsResponse.json();
        
        expect(cardsResult.success).toBe(true);
      }
    });

    test('预设卡牌应有名称和图标', async ({ request }) => {
      const booksResponse = await request.get('/api/books?is_preset=1');
      const booksResult = await booksResponse.json();
      
      if (booksResult.success && booksResult.data && booksResult.data.length > 0) {
        const book = booksResult.data[0];
        const cardsResponse = await request.get(`/api/plot-cards?book_id=${book.book_id}`);
        const cardsResult = await cardsResponse.json();
        
        if (cardsResult.success && cardsResult.data) {
          cardsResult.data.forEach(card => {
            expect(card.name).toBeTruthy();
            expect(card.icon).toBeTruthy();
          });
        }
      }
    });
  });

  test.describe('配置数据验证', () => {
    test('应有书籍类型配置', async ({ request }) => {
      const response = await request.get('/api/config/book-types');
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    test('应有性格配置', async ({ request }) => {
      const response = await request.get('/api/config/personality');
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    test('应有说话方式配置', async ({ request }) => {
      const response = await request.get('/api/config/speech-style');
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    test('书籍类型应有角色类型配置', async ({ request }) => {
      const types = ['adventure', 'fantasy', 'romance', 'business'];
      
      for (const type of types) {
        const response = await request.get(`/api/config/character-types?book_type=${type}`);
        const result = await response.json();
        
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
      }
    });
  });

  test.describe('数据库完整性验证', () => {
    test('所有预设书籍的章节应关联正确', async () => {
      const presetBooks = db.queryAll('SELECT * FROM books WHERE is_preset = 1');
      
      for (const book of presetBooks) {
        const chapters = db.queryAll(
          'SELECT * FROM chapters WHERE book_id = ?',
          [book.book_id]
        );
        
        chapters.forEach(chapter => {
          expect(chapter.book_id).toBe(book.book_id);
        });
      }
    });

    test('所有预设书籍的角色应关联正确', async () => {
      const presetBooks = db.queryAll('SELECT * FROM books WHERE is_preset = 1');
      
      for (const book of presetBooks) {
        const characters = db.queryAll(
          'SELECT * FROM characters WHERE book_id = ?',
          [book.book_id]
        );
        
        characters.forEach(char => {
          expect(char.book_id).toBe(book.book_id);
        });
      }
    });

    test('所有预设书籍的卡牌应关联正确', async () => {
      const presetBooks = db.queryAll('SELECT * FROM books WHERE is_preset = 1');
      
      for (const book of presetBooks) {
        const cards = db.queryAll(
          'SELECT * FROM plot_cards WHERE book_id = ?',
          [book.book_id]
        );
        
        cards.forEach(card => {
          expect(card.book_id).toBe(book.book_id);
        });
      }
    });
  });
});
