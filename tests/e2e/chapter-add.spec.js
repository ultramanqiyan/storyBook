import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('章节添加流程', () => {
  let db;
  let testBookId;
  let testUserId;
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

  async function setupBook(request) {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '测试书籍_章节测试',
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
    const createBookData = await createBookResponse.json();
    expect(createBookData.success).toBe(true);
    testBookId = createBookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = cards.filter(c => c.sub_type === 'equipment');
    
    weatherCardId = weatherCards[0].card_id;
    terrainCardId = terrainCards[0].card_id;
    adventureCardId = adventureCards[0].card_id;
    equipmentCardId = equipmentCards[0].card_id;

    return { testBookId, protagonistId, weatherCardId, terrainCardId, adventureCardId, equipmentCardId };
  }

  test('添加章节并验证数据库', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await setupBook(request);

    await page.goto(`/director.html?book_id=${testBookId}`);

    await expect(page.locator('.director-header h1')).toContainText('Story Director');

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="protagonist"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="weather"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="terrain"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="adventure"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${equipmentCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="equipment"].filled')).toBeVisible();

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeEnabled();

    await startBtn.click();

    await expect(page).toHaveURL(/chapter/, { timeout: 15000 });

    const chaptersResponse = await request.get(`/api/chapters?book_id=${testBookId}`);
    const chaptersData = await chaptersResponse.json();
    expect(chaptersData.success).toBe(true);
    expect(chaptersData.data.length).toBe(1);

    const chapter = chaptersData.data[0];
    expect(chapter.book_id).toBe(testBookId);
    expect(chapter.title).toBeDefined();
    expect(chapter.content).toBeDefined();
    expect(chapter.order_num).toBe(1);

    const selectedCards = JSON.parse(chapter.selected_cards);
    expect(selectedCards.protagonist_id).toBe(protagonistId);
    
    const selectedWeatherCard = (await request.get(`/api/plot-cards?book_id=${testBookId}`)).json();
    expect(selectedWeatherCard).toBeDefined();
  });

  test('未选择必需卡牌时按钮应禁用', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await setupBook(request);

    await page.goto(`/director.html?book_id=${testBookId}`);

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click({ force: true });
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click({ force: true });
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click({ force: true });
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click({ force: true });
    await expect(startBtn).toBeEnabled();
  });

  test('添加章节API应返回正确的数据', async ({ request }) => {
    await setupBook(request);

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
    expect(data.data.chapter).toBeDefined();
    expect(data.data.chapter.chapter_id).toBeDefined();
    expect(data.data.chapter.title).toBeDefined();
    expect(data.data.chapter.content).toBeDefined();
    expect(data.data.puzzle).toBeDefined();
    expect(data.data.puzzle.puzzle_id).toBeDefined();
  });

  test('添加章节后数据库应有正确记录', async ({ request }) => {
    await setupBook(request);

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

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [chapterId]
    );

    expect(dbChapter).toBeDefined();
    expect(dbChapter.book_id).toBe(testBookId);
    expect(dbChapter.title).toBeDefined();
    expect(dbChapter.content).toBeDefined();
    expect(dbChapter.selected_cards).toBeDefined();
  });

  test('添加章节应自动创建谜题', async ({ request }) => {
    await setupBook(request);

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

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    expect(dbPuzzle).toBeDefined();
    expect(dbPuzzle.chapter_id).toBe(chapterId);
    expect(dbPuzzle.question).toBeDefined();
    expect(dbPuzzle.answer).toBeDefined();
  });

  test('添加多个章节应正确排序', async ({ request }) => {
    await setupBook(request);

    for (let i = 0; i < 3; i++) {
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
    expect(dbChapters[0].order_num).toBe(1);
    expect(dbChapters[1].order_num).toBe(2);
    expect(dbChapters[2].order_num).toBe(3);
  });

  test('章节内容应包含故事文本', async ({ request }) => {
    await setupBook(request);

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

    expect(data.data.chapter.content).toBeDefined();
    expect(data.data.chapter.content.length).toBeGreaterThan(0);
  });

  test('章节标题应自动生成', async ({ request }) => {
    await setupBook(request);

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

    expect(data.data.chapter.title).toBeDefined();
    expect(data.data.chapter.title.length).toBeGreaterThan(0);
  });

  test('章节应关联正确的卡牌', async ({ request }) => {
    await setupBook(request);

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

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [chapterId]
    );

    const selectedCards = JSON.parse(dbChapter.selected_cards);
    expect(selectedCards.protagonist_id).toBe(protagonistId);
    expect(selectedCards.weather_id).toBe(weatherCardId);
    expect(selectedCards.terrain_id).toBe(terrainCardId);
    expect(selectedCards.adventure_id).toBe(adventureCardId);
    expect(selectedCards.equipment_id).toBe(equipmentCardId);
  });

  test('导演页面未登录应跳转到登录页', async ({ page, request }) => {
    await setupBook(request);

    await page.goto(`/director.html?book_id=${testBookId}`);

    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  test('导演页面应正确显示卡牌列表', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await setupBook(request);

    await page.goto(`/director.html?book_id=${testBookId}`);

    const fanCards = page.locator('.fan-card');
    const count = await fanCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('选择卡牌后应显示在槽位中', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await setupBook(request);

    await page.goto(`/director.html?book_id=${testBookId}`);

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="protagonist"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click({ force: true });
    await expect(page.locator('[data-slot="weather"].filled')).toBeVisible();
  });

  test('章节创建时间应正确记录', async ({ request }) => {
    await setupBook(request);

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

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [chapterId]
    );

    expect(dbChapter.created_at).toBeDefined();
  });

  test('不同书籍的章节应独立', async ({ request }) => {
    const book1Response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '书籍1',
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

    const book2Response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '书籍2',
        type: 'fantasy',
        protagonist: {
          name: '主角2',
          avatar: '🧝‍♀️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const book1Data = await book1Response.json();
    const book2Data = await book2Response.json();

    const book1Chars = await request.get(`/api/characters?book_id=${book1Data.data.book_id}`);
    const book2Chars = await request.get(`/api/characters?book_id=${book2Data.data.book_id}`);

    const book1CharsData = await book1Chars.json();
    const book2CharsData = await book2Chars.json();

    const book1Cards = await request.get(`/api/plot-cards?book_id=${book1Data.data.book_id}`);
    const book2Cards = await request.get(`/api/plot-cards?book_id=${book2Data.data.book_id}`);

    const book1CardsData = await book1Cards.json();
    const book2CardsData = await book2Cards.json();

    await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: book1Data.data.book_id,
        selected_cards: {
          protagonist_id: book1CharsData.data.find(c => c.is_protagonist === 1).char_id,
          weather_id: book1CardsData.data.find(c => c.sub_type === 'weather').card_id,
          terrain_id: book1CardsData.data.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: book1CardsData.data.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: book1CardsData.data.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });

    await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: book2Data.data.book_id,
        selected_cards: {
          protagonist_id: book2CharsData.data.find(c => c.is_protagonist === 1).char_id,
          weather_id: book2CardsData.data.find(c => c.sub_type === 'weather').card_id,
          terrain_id: book2CardsData.data.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: book2CardsData.data.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: book2CardsData.data.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });

    const book1Chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [book1Data.data.book_id]
    );

    const book2Chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [book2Data.data.book_id]
    );

    expect(book1Chapters.length).toBe(1);
    expect(book2Chapters.length).toBe(1);
    expect(book1Chapters[0].book_id).not.toBe(book2Chapters[0].book_id);
  });

  test('配角参与章节生成应正确记录', async ({ request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '配角参与测试书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: '配角1',
            avatar: '👧',
            role_type: 'supporting',
            personality: '勇敢',
            speech_style: '简洁直接',
            intimacy: 50,
            relationship: '朋友'
          }
        ]
      }
    });
    const bookData = await createBookResponse.json();
    const bookId = bookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonist = charsData.data.find(c => c.is_protagonist === 1);
    const supporting = charsData.data.filter(c => c.is_protagonist === 0);

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          supporting_ids: supporting.map(s => s.char_id),
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);

    const dbChapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [chapterData.data.chapter.chapter_id]
    );

    const selectedCards = JSON.parse(dbChapter.selected_cards);
    expect(selectedCards.supporting_ids).toBeDefined();
    expect(selectedCards.supporting_ids.length).toBe(1);
  });

  test('选择不同卡牌组合应生成不同章节', async ({ request }) => {
    const setup = await setupBook(request);
    const currentBookId = setup.testBookId;
    const currentProtagonistId = setup.protagonistId;
    const currentTerrainCardId = setup.terrainCardId;
    const currentAdventureCardId = setup.adventureCardId;
    const currentEquipmentCardId = setup.equipmentCardId;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${currentBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const weatherCards = cards.filter(c => c.sub_type === 'weather');

    const chapter1Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          supporting_ids: [],
          weather_id: weatherCards[0].card_id,
          terrain_id: currentTerrainCardId,
          adventure_id: currentAdventureCardId,
          equipment_id: currentEquipmentCardId
        }
      }
    });

    const chapter1Data = await chapter1Response.json();

    const chapter2Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          supporting_ids: [],
          weather_id: weatherCards[1]?.card_id || weatherCards[0].card_id,
          terrain_id: currentTerrainCardId,
          adventure_id: currentAdventureCardId,
          equipment_id: currentEquipmentCardId
        }
      }
    });

    const chapter2Data = await chapter2Response.json();

    expect(chapter1Data.data.chapter.chapter_id).not.toBe(chapter2Data.data.chapter.chapter_id);

    const dbChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [currentBookId]
    );
    expect(dbChapters.length).toBe(2);
  });

  test('章节生成应验证用户权限', async ({ request }) => {
    const setup = await setupBook(request);
    const currentBookId = setup.testBookId;
    const currentProtagonistId = setup.protagonistId;
    const currentWeatherCardId = setup.weatherCardId;
    const currentTerrainCardId = setup.terrainCardId;
    const currentAdventureCardId = setup.adventureCardId;
    const currentEquipmentCardId = setup.equipmentCardId;

    const otherUserId = 'other-user-' + Date.now();
    const response = await request.post('/api/chapters', {
      data: {
        user_id: otherUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          weather_id: currentWeatherCardId,
          terrain_id: currentTerrainCardId,
          adventure_id: currentAdventureCardId,
          equipment_id: currentEquipmentCardId
        }
      }
    });

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('章节生成应验证书籍存在', async ({ request }) => {
    const response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: 'non-existent-book-id',
        selected_cards: {
          protagonist_id: 'non-existent-protagonist',
          weather_id: 'non-existent-weather',
          terrain_id: 'non-existent-terrain',
          adventure_id: 'non-existent-adventure',
          equipment_id: 'non-existent-equipment'
        }
      }
    });

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('章节生成应验证必需卡牌', async ({ request }) => {
    const setup = await setupBook(request);
    const currentBookId = setup.testBookId;
    const currentProtagonistId = setup.protagonistId;
    const currentWeatherCardId = setup.weatherCardId;
    const currentTerrainCardId = setup.terrainCardId;

    const response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          weather_id: currentWeatherCardId,
          terrain_id: currentTerrainCardId
        }
      }
    });

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('章节内容长度应在合理范围', async ({ request }) => {
    const setup = await setupBook(request);
    const currentBookId = setup.testBookId;
    const currentProtagonistId = setup.protagonistId;
    const currentWeatherCardId = setup.weatherCardId;
    const currentTerrainCardId = setup.terrainCardId;
    const currentAdventureCardId = setup.adventureCardId;
    const currentEquipmentCardId = setup.equipmentCardId;

    const response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          weather_id: currentWeatherCardId,
          terrain_id: currentTerrainCardId,
          adventure_id: currentAdventureCardId,
          equipment_id: currentEquipmentCardId
        }
      }
    });

    const data = await response.json();
    const content = data.data.chapter.content;

    expect(content.length).toBeGreaterThan(50);
    expect(content.length).toBeLessThan(10000);
  });

  test('谜题应有正确的问题和答案', async ({ request }) => {
    const setup = await setupBook(request);
    const currentBookId = setup.testBookId;
    const currentProtagonistId = setup.protagonistId;
    const currentWeatherCardId = setup.weatherCardId;
    const currentTerrainCardId = setup.terrainCardId;
    const currentAdventureCardId = setup.adventureCardId;
    const currentEquipmentCardId = setup.equipmentCardId;

    const response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          weather_id: currentWeatherCardId,
          terrain_id: currentTerrainCardId,
          adventure_id: currentAdventureCardId,
          equipment_id: currentEquipmentCardId
        }
      }
    });

    const data = await response.json();
    const puzzle = data.data.puzzle;

    expect(puzzle.question).toBeDefined();
    expect(puzzle.question.length).toBeGreaterThan(0);
    expect(puzzle.puzzle_type).toBeDefined();
    
    if (puzzle.answer) {
      expect(puzzle.answer.length).toBeGreaterThan(0);
    }
  });

  test('谜题初始状态应为未解决', async ({ request }) => {
    const setup = await setupBook(request);
    const currentBookId = setup.testBookId;
    const currentProtagonistId = setup.protagonistId;
    const currentWeatherCardId = setup.weatherCardId;
    const currentTerrainCardId = setup.terrainCardId;
    const currentAdventureCardId = setup.adventureCardId;
    const currentEquipmentCardId = setup.equipmentCardId;

    const response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: currentBookId,
        selected_cards: {
          protagonist_id: currentProtagonistId,
          weather_id: currentWeatherCardId,
          terrain_id: currentTerrainCardId,
          adventure_id: currentAdventureCardId,
          equipment_id: currentEquipmentCardId
        }
      }
    });

    const data = await response.json();
    const puzzleId = data.data.puzzle.puzzle_id;

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    expect(dbPuzzle.is_solved).toBe(0);
    expect(dbPuzzle.attempts).toBe(0);
    expect(dbPuzzle.max_attempts).toBe(3);
  });
});
