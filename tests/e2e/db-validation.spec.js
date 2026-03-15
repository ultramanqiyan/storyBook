import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('数据库操作SQL验证测试', () => {
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

  test.describe('创建书籍 - 数据库验证', () => {
    test('创建书籍后SQL验证books表记录', async ({ request }) => {
      const bookTitle = `SQL验证书籍_${Date.now()}`;
      
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: bookTitle,
          type: 'adventure',
          protagonist: {
            name: 'SQL主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const data = await response.json();
      expect(data.success).toBe(true);
      const bookId = data.data.book_id;
      
      const book = db.query(
        'SELECT * FROM books WHERE book_id = ?',
        [bookId]
      );
      
      expect(book).toBeDefined();
      expect(book.book_id).toBe(bookId);
      expect(book.user_id).toBe(testUserId);
      expect(book.title).toBe(bookTitle);
      expect(book.type).toBe('adventure');
      expect(book.is_preset).toBe(0);
      expect(book.language).toBeDefined();
      expect(book.created_at).toBeDefined();
      expect(book.updated_at).toBeDefined();
      
      const createdAt = new Date(book.created_at);
      const updatedAt = new Date(book.updated_at);
      expect(createdAt.getTime()).toBeLessThanOrEqual(Date.now() + 5000);
      expect(updatedAt.getTime()).toBeLessThanOrEqual(Date.now() + 5000);
    });

    test('创建书籍后SQL验证characters表主角记录', async ({ request }) => {
      const protagonistName = `主角_${Date.now()}`;
      
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '角色验证书籍',
          type: 'fantasy',
          protagonist: {
            name: protagonistName,
            avatar: '🧝‍♀️',
            personality: 'wise',
            speech_style: 'poetic',
            role_type: 'wizard',
            background: '来自神秘森林',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const data = await response.json();
      const bookId = data.data.book_id;
      
      const protagonist = db.query(
        'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
        [bookId]
      );
      
      expect(protagonist).toBeDefined();
      expect(protagonist.name).toBe(protagonistName);
      expect(protagonist.avatar).toBe('🧝‍♀️');
      expect(protagonist.personality).toBe('wise');
      expect(protagonist.speech_style).toBe('poetic');
      expect(protagonist.role_type).toBe('wizard');
      expect(protagonist.is_protagonist).toBe(1);
      expect(protagonist.intimacy).toBeDefined();
      expect(protagonist.char_id).toBeDefined();
    });

    test('创建书籍后SQL验证characters表配角记录', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '配角验证书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: [
            {
              name: '配角A',
              avatar: '👧',
              personality: 'kind',
              speech_style: 'gentle',
              role_type: 'healer',
              intimacy: 50,
              relationship: 'friend'
            },
            {
              name: '配角B',
              avatar: '🧔',
              personality: 'serious',
              speech_style: 'formal',
              role_type: 'warrior',
              intimacy: -30,
              relationship: 'rival'
            }
          ]
        }
      });
      
      const data = await response.json();
      const bookId = data.data.book_id;
      
      const supportingChars = db.queryAll(
        'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0 ORDER BY name',
        [bookId]
      );
      
      expect(supportingChars.length).toBe(2);
      
      expect(supportingChars[0].name).toBe('配角A');
      expect(supportingChars[0].personality).toBe('kind');
      expect(supportingChars[0].speech_style).toBe('gentle');
      expect(supportingChars[0].role_type).toBe('healer');
      expect(supportingChars[0].intimacy).toBe(50);
      expect(supportingChars[0].relationship).toBe('friend');
      
      expect(supportingChars[1].name).toBe('配角B');
      expect(supportingChars[1].personality).toBe('serious');
      expect(supportingChars[1].speech_style).toBe('formal');
      expect(supportingChars[1].role_type).toBe('warrior');
      expect(supportingChars[1].intimacy).toBe(-30);
      expect(supportingChars[1].relationship).toBe('rival');
    });

    test('创建书籍后SQL验证plot_cards表记录', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '卡牌验证书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const data = await response.json();
      const bookId = data.data.book_id;
      
      const cards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [bookId]
      );
      
      expect(cards.length).toBe(16);
      
      const weatherCards = cards.filter(c => c.sub_type === 'weather');
      const terrainCards = cards.filter(c => c.sub_type === 'terrain');
      const adventureCards = cards.filter(c => c.sub_type === 'adventure');
      const equipmentCards = cards.filter(c => c.sub_type === 'equipment');
      
      expect(weatherCards.length).toBe(4);
      expect(terrainCards.length).toBe(4);
      expect(adventureCards.length).toBe(4);
      expect(equipmentCards.length).toBe(4);
      
      cards.forEach(card => {
        expect(card.card_id).toBeDefined();
        expect(card.book_id).toBe(bookId);
        expect(card.name).toBeDefined();
        expect(card.name.length).toBeGreaterThan(0);
        expect(card.description).toBeDefined();
        expect(card.type).toBe('plot');
        expect(card.sub_type).toBeDefined();
      });
    });

    test('创建书籍后SQL验证外键关联', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '外键验证书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const data = await response.json();
      const bookId = data.data.book_id;
      
      const book = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      const characters = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
      
      expect(book).toBeDefined();
      expect(characters.length).toBeGreaterThan(0);
      expect(cards.length).toBeGreaterThan(0);
      
      characters.forEach(char => {
        expect(char.book_id).toBe(bookId);
      });
      
      cards.forEach(card => {
        expect(card.book_id).toBe(bookId);
      });
    });
  });

  test.describe('添加章节 - 数据库验证', () => {
    let testBookId;
    let protagonistId;
    let weatherCardId;
    let terrainCardId;
    let adventureCardId;
    let equipmentCardId;

    test.beforeAll(async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '章节测试书籍',
          type: 'adventure',
          protagonist: {
            name: '章节主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const data = await response.json();
      testBookId = data.data.book_id;
      
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
    });

    test('添加章节后SQL验证chapters表记录', async ({ request }) => {
      const response = await request.post('/api/chapters', {
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
      
      const data = await response.json();
      expect(data.success).toBe(true);
      const chapterId = data.data.chapter.chapter_id;
      
      const chapter = db.query(
        'SELECT * FROM chapters WHERE chapter_id = ?',
        [chapterId]
      );
      
      expect(chapter).toBeDefined();
      expect(chapter.chapter_id).toBe(chapterId);
      expect(chapter.book_id).toBe(testBookId);
      expect(chapter.title).toBeDefined();
      expect(chapter.title.length).toBeGreaterThan(0);
      expect(chapter.content).toBeDefined();
      expect(chapter.content.length).toBeGreaterThan(50);
      expect(chapter.order_num).toBeDefined();
      expect(chapter.selected_cards).toBeDefined();
      expect(chapter.created_at).toBeDefined();
    });

    test('添加章节后SQL验证selected_cards字段', async ({ request }) => {
      const response = await request.post('/api/chapters', {
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
      
      const data = await response.json();
      const chapterId = data.data.chapter.chapter_id;
      
      const chapter = db.query(
        'SELECT selected_cards FROM chapters WHERE chapter_id = ?',
        [chapterId]
      );
      
      const selectedCards = JSON.parse(chapter.selected_cards);
      
      expect(selectedCards.protagonist_id).toBe(protagonistId);
      expect(selectedCards.weather_id).toBe(weatherCardId);
      expect(selectedCards.terrain_id).toBe(terrainCardId);
      expect(selectedCards.adventure_id).toBe(adventureCardId);
      expect(selectedCards.equipment_id).toBe(equipmentCardId);
    });

    test('添加章节后SQL验证puzzles表记录', async ({ request }) => {
      const response = await request.post('/api/chapters', {
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
      
      const data = await response.json();
      const chapterId = data.data.chapter.chapter_id;
      const puzzleId = data.data.puzzle.puzzle_id;
      
      const puzzle = db.query(
        'SELECT * FROM puzzles WHERE puzzle_id = ?',
        [puzzleId]
      );
      
      expect(puzzle).toBeDefined();
      expect(puzzle.puzzle_id).toBe(puzzleId);
      expect(puzzle.chapter_id).toBe(chapterId);
      expect(puzzle.question).toBeDefined();
      expect(puzzle.question.length).toBeGreaterThan(0);
      expect(puzzle.puzzle_type).toBeDefined();
      expect(puzzle.is_solved).toBe(0);
      expect(puzzle.attempts).toBe(0);
      expect(puzzle.max_attempts).toBe(3);
    });

    test('添加多个章节后SQL验证order_num递增', async ({ request }) => {
      const bookResponse = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '多章节测试书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const bookData = await bookResponse.json();
      const bookId = bookData.data.book_id;
      
      const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
      const charsData = await charsResponse.json();
      const charId = charsData.data.find(c => c.is_protagonist === 1).char_id;
      
      const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;
      
      for (let i = 0; i < 3; i++) {
        await request.post('/api/chapters', {
          data: {
            user_id: testUserId,
            book_id: bookId,
            selected_cards: {
              protagonist_id: charId,
              weather_id: cards.find(c => c.sub_type === 'weather').card_id,
              terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
              adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
              equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
            }
          }
        });
      }
      
      const chapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
        [bookId]
      );
      
      expect(chapters.length).toBe(3);
      expect(chapters[0].order_num).toBe(1);
      expect(chapters[1].order_num).toBe(2);
      expect(chapters[2].order_num).toBe(3);
    });

    test('添加章节后SQL验证外键关联', async ({ request }) => {
      const response = await request.post('/api/chapters', {
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
      
      const data = await response.json();
      const chapterId = data.data.chapter.chapter_id;
      const puzzleId = data.data.puzzle.puzzle_id;
      
      const chapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [chapterId]);
      const puzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [puzzleId]);
      const book = db.query('SELECT * FROM books WHERE book_id = ?', [testBookId]);
      
      expect(chapter.book_id).toBe(testBookId);
      expect(puzzle.chapter_id).toBe(chapterId);
      expect(book.book_id).toBe(testBookId);
    });
  });

  test.describe('更新操作 - 数据库验证', () => {
    test('更新书籍updated_at字段', async ({ request }) => {
      const createResponse = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '更新测试书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const createData = await createResponse.json();
      const bookId = createData.data.book_id;
      
      const bookBefore = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      const createdAtBefore = bookBefore.created_at;
      const updatedAtBefore = bookBefore.updated_at;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await request.put(`/api/books/${bookId}`, {
        data: {
          title: '更新后的标题'
        }
      });
      
      const bookAfter = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      
      expect(bookAfter.title).toBe('更新后的标题');
      expect(bookAfter.created_at).toBe(createdAtBefore);
    });

    test('解决谜题后SQL验证is_solved字段', async ({ request }) => {
      const bookResponse = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '谜题解决测试',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const bookData = await bookResponse.json();
      const bookId = bookData.data.book_id;
      
      const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
      const charsData = await charsResponse.json();
      const charId = charsData.data.find(c => c.is_protagonist === 1).char_id;
      
      const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;
      
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: charId,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        }
      });
      
      const chapterData = await chapterResponse.json();
      const puzzleId = chapterData.data.puzzle.puzzle_id;
      
      const puzzleBefore = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [puzzleId]);
      expect(puzzleBefore.is_solved).toBe(0);
      expect(puzzleBefore.attempts).toBe(0);
      expect(puzzleBefore.max_attempts).toBe(3);
      expect(puzzleBefore.question).toBeDefined();
      expect(puzzleBefore.answer).toBeDefined();
    });

    test('卡牌使用后SQL验证status字段', async ({ request }) => {
      const bookResponse = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '卡牌状态测试',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const bookData = await bookResponse.json();
      const bookId = bookData.data.book_id;
      
      const cardsBefore = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [bookId, 'weather']
      );
      
      expect(cardsBefore.length).toBeGreaterThan(0);
      cardsBefore.forEach(card => {
        expect(card.card_id).toBeDefined();
        expect(card.book_id).toBe(bookId);
      });
    });
  });

  test.describe('数据完整性验证', () => {
    test('删除书籍应级联删除相关数据', async ({ request }) => {
      const bookResponse = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '删除测试书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const bookData = await bookResponse.json();
      const bookId = bookData.data.book_id;
      
      const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
      const charsData = await charsResponse.json();
      const charId = charsData.data.find(c => c.is_protagonist === 1).char_id;
      
      const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;
      
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: charId,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        }
      });
      
      const chapterData = await chapterResponse.json();
      const chapterId = chapterData.data.chapter.chapter_id;
      const puzzleId = chapterData.data.puzzle.puzzle_id;
      
      const bookBefore = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      const charsBefore = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cardsBefore = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
      const chaptersBefore = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [bookId]);
      const puzzlesBefore = db.queryAll('SELECT * FROM puzzles WHERE chapter_id = ?', [chapterId]);
      
      expect(bookBefore).toBeDefined();
      expect(charsBefore.length).toBeGreaterThan(0);
      expect(cardsBefore.length).toBeGreaterThan(0);
      expect(chaptersBefore.length).toBeGreaterThan(0);
      expect(puzzlesBefore.length).toBeGreaterThan(0);
    });

    test('用户创建的所有书籍应正确关联', async ({ request }) => {
      const bookIds = [];
      
      for (let i = 0; i < 3; i++) {
        const response = await request.post('/api/books', {
          data: {
            user_id: testUserId,
            title: `用户关联测试书籍_${i}`,
            type: 'adventure',
            protagonist: {
              name: `主角_${i}`,
              avatar: '🧙‍♂️',
              personality: 'brave',
              speech_style: 'direct',
              role_type: 'explorer',
              is_protagonist: 1
            },
            supporting_characters: []
          }
        });
        
        const data = await response.json();
        bookIds.push(data.data.book_id);
      }
      
      const books = db.queryAll(
        'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC',
        [testUserId]
      );
      
      const userBooks = books.filter(b => bookIds.includes(b.book_id));
      expect(userBooks.length).toBe(3);
      
      userBooks.forEach(book => {
        expect(book.user_id).toBe(testUserId);
      });
    });

    test('数据库字段类型验证', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '字段类型测试',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            personality: 'brave',
            speech_style: 'direct',
            role_type: 'explorer',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      
      const data = await response.json();
      const bookId = data.data.book_id;
      
      const book = db.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
      
      expect(typeof book.book_id).toBe('string');
      expect(typeof book.user_id).toBe('string');
      expect(typeof book.title).toBe('string');
      expect(typeof book.type).toBe('string');
      expect(typeof book.is_preset).toBe('number');
      expect(typeof book.created_at).toBe('string');
      expect(typeof book.updated_at).toBe('string');
      
      const character = db.query('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      
      expect(typeof character.char_id).toBe('string');
      expect(typeof character.book_id).toBe('string');
      expect(typeof character.name).toBe('string');
      expect(typeof character.is_protagonist).toBe('number');
      expect(typeof character.intimacy).toBe('number');
    });
  });
});
