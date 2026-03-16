import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('数据库字段完整性验证测试', () => {
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

  test.describe('书籍表字段完整性验证', () => {
    test('创建书籍后数据库所有字段应正确', async ({ request }) => {
      const bookTitle = `完整字段测试_${Date.now()}`;
      const bookType = 'adventure';

      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: bookTitle,
          type: bookType,
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1,
            personality: 'brave',
            speech_style: 'direct'
          },
          supporting_characters: [{
            name: '配角',
            avatar: '👧',
            role_type: 'supporting',
            personality: 'kind',
            speech_style: 'formal',
            intimacy: 50
          }]
        }
      });

      const data = await response.json();
      expect(data.success).toBe(true);
      const bookId = data.data.book_id;

      const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);

      expect(dbBook).toBeDefined();
      expect(dbBook.book_id).toMatch(/^id-|book_/);
      expect(dbBook.book_id).toBe(bookId);
      expect(dbBook.title).toBe(bookTitle);
      expect(dbBook.type).toBe(bookType);
      expect(dbBook.user_id).toBe(testUserId);
      expect(dbBook.is_preset).toBe(0);
      expect(dbBook.language).toBe('en');

      expect(dbBook.created_at).toBeDefined();
      expect(dbBook.updated_at).toBeDefined();

      const createdAt = new Date(dbBook.created_at);
      expect(createdAt.getTime()).not.toBeNaN();
      expect(createdAt.getTime()).toBeLessThanOrEqual(Date.now());

      const updatedAt = new Date(dbBook.updated_at);
      expect(updatedAt.getTime()).not.toBeNaN();
    });

    test('不同类型书籍应正确存储类型字段', async ({ request }) => {
      const types = ['adventure', 'fantasy', 'romance', 'business'];

      for (const type of types) {
        const response = await request.post('/api/books', {
          data: {
            user_id: testUserId,
            title: `类型测试_${type}_${Date.now()}`,
            type: type,
            protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
            supporting_characters: []
          }
        });

        const data = await response.json();
        const bookId = data.data.book_id;

        const dbBook = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
        expect(dbBook.type).toBe(type);

        await new Promise(resolve => setTimeout(resolve, 100));
      }
    });
  });

  test.describe('角色表字段完整性验证', () => {
    test('主角字段应正确存储', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '主角字段测试',
          type: 'adventure',
          protagonist: {
            name: '主角小明',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1,
            personality: 'brave',
            speech_style: 'direct'
          },
          supporting_characters: []
        }
      });

      const data = await response.json();
      const bookId = data.data.book_id;

      const dbProtagonist = db.query(
        'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
        [bookId]
      );

      expect(dbProtagonist).toBeDefined();
      expect(dbProtagonist.char_id).toMatch(/^id-|char_/);
      expect(dbProtagonist.name).toBe('主角小明');
      expect(dbProtagonist.avatar).toBe('🧙‍♂️');
      expect(dbProtagonist.role_type).toBe('protagonist');
      expect(dbProtagonist.is_protagonist).toBe(1);
      expect(dbProtagonist.personality).toBe('brave');
      expect(dbProtagonist.speech_style).toBe('direct');
      expect([null, 0]).toContain(dbProtagonist.intimacy);
      expect(dbProtagonist.book_id).toBe(bookId);
      expect(dbProtagonist.created_at).toBeDefined();
    });

    test('配角字段应正确存储包括亲密度', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '配角字段测试',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: [{
            name: '友好配角',
            avatar: '👧',
            role_type: 'supporting',
            personality: 'kind',
            speech_style: 'formal',
            intimacy: 50
          }, {
            name: '敌对配角',
            avatar: '👦',
            role_type: 'supporting',
            personality: 'calm',
            speech_style: 'polite',
            intimacy: -50
          }, {
            name: '中立配角',
            avatar: '🧑',
            role_type: 'supporting',
            personality: 'neutral',
            speech_style: 'casual',
            intimacy: 0
          }]
        }
      });

      const data = await response.json();
      const bookId = data.data.book_id;

      const dbSupporting = db.queryAll(
        'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0 ORDER BY intimacy DESC',
        [bookId]
      );

      expect(dbSupporting.length).toBe(3);

      expect(dbSupporting[0].name).toBe('友好配角');
      expect(dbSupporting[0].intimacy).toBe(50);
      expect(dbSupporting[0].personality).toBe('kind');
      expect(dbSupporting[0].speech_style).toBe('formal');

      expect(dbSupporting[1].name).toBe('中立配角');
      expect(dbSupporting[1].intimacy).toBe(0);

      expect(dbSupporting[2].name).toBe('敌对配角');
      expect(dbSupporting[2].intimacy).toBe(-50);
    });

    test('角色数量应正确', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '角色数量测试',
          type: 'fantasy',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: [
            { name: '配角1', avatar: '👧', role_type: 'supporting', intimacy: 50 },
            { name: '配角2', avatar: '👦', role_type: 'supporting', intimacy: 30 },
            { name: '配角3', avatar: '🧑', role_type: 'supporting', intimacy: -20 }
          ]
        }
      });

      const data = await response.json();
      const bookId = data.data.book_id;

      const totalChars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      expect(totalChars.length).toBe(4);

      const protagonistCount = db.query(
        'SELECT COUNT(*) as count FROM characters WHERE book_id = ? AND is_protagonist = 1',
        [bookId]
      );
      expect(protagonistCount.count).toBe(1);

      const supportingCount = db.query(
        'SELECT COUNT(*) as count FROM characters WHERE book_id = ? AND is_protagonist = 0',
        [bookId]
      );
      expect(supportingCount.count).toBe(3);
    });
  });

  test.describe('卡牌表字段完整性验证', () => {
    test('创建书籍应生成16张初始卡牌', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '卡牌字段测试',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });

      const data = await response.json();
      const bookId = data.data.book_id;

      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      expect(dbCards.length).toBe(16);

      for (const card of dbCards) {
        expect(card.card_id).toMatch(/^id-|card_/);
        expect(card.book_id).toBe(bookId);
        expect(card.name).toBeDefined();
        expect(card.name.length).toBeGreaterThan(0);
        expect(card.icon).toBeDefined();
        expect(card.icon.length).toBeGreaterThan(0);
        expect(['weather', 'terrain', 'adventure', 'equipment']).toContain(card.sub_type);
        expect(card.is_custom).toBe(0);
        expect(card.created_at).toBeDefined();
      }
    });

    test('各类型卡牌数量应正确', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '卡牌类型数量测试',
          type: 'fantasy',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });

      const data = await response.json();
      const bookId = data.data.book_id;

      const weatherCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [bookId, 'weather']
      );
      expect(weatherCards.length).toBe(4);

      const terrainCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [bookId, 'terrain']
      );
      expect(terrainCards.length).toBe(4);

      const adventureCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [bookId, 'adventure']
      );
      expect(adventureCards.length).toBe(4);

      const equipmentCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [bookId, 'equipment']
      );
      expect(equipmentCards.length).toBe(4);
    });

    test('卡牌描述字段应存在', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '卡牌描述测试',
          type: 'romance',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });

      const data = await response.json();
      const bookId = data.data.book_id;

      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      for (const card of dbCards) {
        expect(card.description).toBeDefined();
        expect(card.description.length).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test.describe('章节表字段完整性验证', () => {
    let testBookId;
    let testChapterId;
    let protagonistId;
    let weatherCardId;
    let terrainCardId;
    let adventureCardId;
    let equipmentCardId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '章节字段测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        })
      });
      const data = await response.json();
      testBookId = data.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [testBookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);

      protagonistId = chars.find(c => c.is_protagonist === 1).char_id;
      weatherCardId = cards.find(c => c.sub_type === 'weather').card_id;
      terrainCardId = cards.find(c => c.sub_type === 'terrain').card_id;
      adventureCardId = cards.find(c => c.sub_type === 'adventure').card_id;
      equipmentCardId = cards.find(c => c.sub_type === 'equipment').card_id;

      const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonistId,
            weather_id: weatherCardId,
            terrain_id: terrainCardId,
            adventure_id: adventureCardId,
            equipment_id: equipmentCardId
          }
        })
      });
      const chapterData = await chapterResponse.json();
      testChapterId = chapterData.data.chapter.chapter_id;
    });

    test('章节表所有字段应正确', async () => {
      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      expect(dbChapter).toBeDefined();
      expect(dbChapter.chapter_id).toMatch(/^id-|ch_/);
      expect(dbChapter.chapter_id).toBe(testChapterId);
      expect(dbChapter.book_id).toBe(testBookId);
      expect(dbChapter.title).toBeDefined();
      expect(dbChapter.title.length).toBeGreaterThan(0);
      expect(dbChapter.content).toBeDefined();
      expect(dbChapter.content.length).toBeGreaterThan(50);
      expect(dbChapter.order_num).toBeGreaterThanOrEqual(1);
      expect(dbChapter.created_at).toBeDefined();
    });

    test('章节selected_cards字段应正确存储JSON', async () => {
      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [testChapterId]);

      expect(dbChapter.selected_cards).toBeDefined();

      const selectedCards = JSON.parse(dbChapter.selected_cards);
      expect(selectedCards.protagonist_id).toBe(protagonistId);
      expect(selectedCards.weather_id).toBe(weatherCardId);
      expect(selectedCards.terrain_id).toBe(terrainCardId);
      expect(selectedCards.adventure_id).toBe(adventureCardId);
      expect(selectedCards.equipment_id).toBe(equipmentCardId);
    });

    test('章节序号应自动递增', async () => {
      const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonistId,
            weather_id: weatherCardId,
            terrain_id: terrainCardId,
            adventure_id: adventureCardId,
            equipment_id: equipmentCardId
          }
        })
      });
      const chapterData = await chapterResponse.json();
      const secondChapterId = chapterData.data.chapter.chapter_id;

      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [secondChapterId]);
      expect(dbChapter.order_num).toBe(2);
    });
  });

  test.describe('谜题表字段完整性验证', () => {
    let testChapterId;
    let testPuzzleId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '谜题字段测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        })
      });
      const bookData = await response.json();
      const bookId = bookData.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        })
      });
      const chapterData = await chapterResponse.json();
      testChapterId = chapterData.data.chapter.chapter_id;

      const puzzle = db.query('SELECT * FROM puzzles WHERE chapter_id = ?', [testChapterId]);
      if (puzzle) {
        testPuzzleId = puzzle.puzzle_id;
      }
    });

    test('谜题表所有字段应正确', async () => {
      if (!testPuzzleId) {
        test.skip();
        return;
      }

      const dbPuzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [testPuzzleId]);

      expect(dbPuzzle).toBeDefined();
      expect(dbPuzzle.puzzle_id).toMatch(/^id-|puzzle_/);
      expect(dbPuzzle.chapter_id).toBe(testChapterId);
      expect(dbPuzzle.question).toBeDefined();
      expect(dbPuzzle.question.length).toBeGreaterThan(0);
      expect(dbPuzzle.answer).toBeDefined();
      expect(dbPuzzle.answer.length).toBeGreaterThan(0);
      expect(dbPuzzle.puzzle_type).toBeDefined();
      expect(['choice', 'text', 'fill_blank']).toContain(dbPuzzle.puzzle_type);
      expect(dbPuzzle.is_solved).toBe(0);
      expect(dbPuzzle.attempts).toBe(0);
      expect(dbPuzzle.max_attempts).toBe(3);
      expect(dbPuzzle.created_at).toBeDefined();
    });

    test('解谜成功后字段应正确更新', async ({ request }) => {
      if (!testPuzzleId) {
        test.skip();
        return;
      }

      const dbPuzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [testPuzzleId]);
      const correctAnswer = dbPuzzle.answer;

      const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
        data: { answer: correctAnswer, user_id: testUserId }
      });

      const updatedPuzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [testPuzzleId]);

      expect(updatedPuzzle.is_solved).toBe(1);
      expect(updatedPuzzle.attempts).toBeGreaterThanOrEqual(1);
      if (updatedPuzzle.solved_at) {
        const solvedAt = new Date(updatedPuzzle.solved_at);
        expect(solvedAt.getTime()).not.toBeNaN();
        expect(solvedAt.getTime()).toBeLessThanOrEqual(Date.now());
      }
    });

    test('解谜失败后尝试次数应增加', async ({ request }) => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: '谜题失败测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        })
      });
      const bookData = await response.json();
      const bookId = bookData.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        })
      });
      const chapterData = await chapterResponse.json();
      const chapterId = chapterData.data.chapter.chapter_id;

      const puzzle = db.query('SELECT * FROM puzzles WHERE chapter_id = ?', [chapterId]);
      if (!puzzle) {
        test.skip();
        return;
      }

      const solveResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
        data: { answer: 'wrong_answer_12345', user_id: testUserId }
      });

      const updatedPuzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [puzzle.puzzle_id]);

      expect(updatedPuzzle.attempts).toBeGreaterThanOrEqual(1);
      expect(updatedPuzzle.is_solved).toBe(0);
    });
  });

  test.describe('级联删除验证', () => {
    test('删除书籍应级联删除所有相关数据', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '级联删除测试书籍',
          type: 'adventure',
          protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: [
            { name: '配角', avatar: '👧', role_type: 'supporting', intimacy: 50 }
          ]
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        }
      });
      const chapterData = await chapterResponse.json();
      const chapterId = chapterData.data.chapter.chapter_id;

      const beforeBooks = db.queryAll('SELECT * FROM books WHERE book_id = ?', [bookId]);
      const beforeChars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const beforeCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
      const beforeChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [bookId]);
      const beforePuzzles = db.queryAll('SELECT * FROM puzzles WHERE chapter_id = ?', [chapterId]);

      expect(beforeBooks.length).toBe(1);
      expect(beforeChars.length).toBe(2);
      expect(beforeCards.length).toBe(16);
      expect(beforeChapters.length).toBe(1);
      expect(beforePuzzles.length).toBeGreaterThanOrEqual(0);

      await request.delete(`/api/books/${bookId}?user_id=${testUserId}`);

      const afterBooks = db.queryAll('SELECT * FROM books WHERE book_id = ?', [bookId]);
      const afterChars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const afterCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
      const afterChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [bookId]);
      const afterPuzzles = db.queryAll('SELECT * FROM puzzles WHERE chapter_id = ?', [chapterId]);

      expect(afterBooks.length).toBe(0);
      expect(afterChars.length).toBe(0);
      expect(afterCards.length).toBe(0);
      expect(afterChapters.length).toBe(0);
      expect(afterPuzzles.length).toBe(0);
    });
  });

  test.describe('用户表字段完整性验证', () => {
    test('用户记录应正确存储', async () => {
      const dbUser = db.query('SELECT * FROM users WHERE user_id = ?', [testUserId]);

      expect(dbUser).toBeDefined();
      expect(dbUser.user_id).toBe(testUserId);
      expect(dbUser.email).toBeDefined();
      expect(dbUser.email).toMatch(/@/);
      expect(dbUser.password).toBeDefined();
      expect(dbUser.password.length).toBeGreaterThan(0);
      expect(dbUser.created_at).toBeDefined();

      const createdAt = new Date(dbUser.created_at);
      expect(createdAt.getTime()).not.toBeNaN();
    });
  });
});
