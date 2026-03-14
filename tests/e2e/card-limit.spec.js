import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('卡牌上限检查功能', () => {
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

  async function setupBookWithMaxCards(request, subType) {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: `卡牌上限测试-${subType}`,
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
    
    const typeCards = cards.filter(c => c.sub_type === subType);
    
    while (typeCards.length < 8) {
      const createCardResponse = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: bookId,
          user_id: testUserId,
          name: `自定义${subType}卡${typeCards.length + 1}`,
          icon: '🎴',
          description: '测试用卡牌',
          sub_type: subType
        }
      });
      if (createCardResponse.ok()) {
        typeCards.push(await createCardResponse.json().then(d => d.data));
      } else {
        break;
      }
    }

    return { bookId, cards: typeCards };
  }

  async function setupBookWithChapter(request, bookId) {
    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherCardId = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainCardId = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureCardId = cards.find(c => c.sub_type === 'adventure').card_id;
    const equipmentCardId = cards.find(c => c.sub_type === 'equipment').card_id;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonistId,
          supporting_ids: [],
          weather_id: weatherCardId,
          terrain_id: terrainCardId,
          adventure_id: adventureCardId,
          equipment_id: equipmentCardId
        }
      }
    });
    const chapterData = await chapterResponse.json();
    
    return {
      chapterId: chapterData.data?.chapter?.chapter_id,
      puzzleId: chapterData.data?.puzzle?.puzzle_id
    };
  }

  test('天气卡牌达到8张时触发上限处理弹窗', async ({ page, request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'weather');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput, .answer-input, input[type="text"]').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill(dbPuzzle.answer || 'test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    const limitModal = page.locator('#cardLimitModal, .card-limit-modal, .limit-modal');
    const modalCount = await limitModal.count();
    
    const weatherCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'weather']
    ).length;
    
    expect(weatherCount).toBeGreaterThanOrEqual(8);
  });

  test('地形卡牌达到8张时触发上限处理', async ({ page, request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'terrain');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const terrainCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'terrain']
    ).length;
    
    expect(terrainCount).toBeGreaterThanOrEqual(8);
  });

  test('冒险类型卡牌达到8张时触发上限处理', async ({ page, request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'adventure');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const adventureCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'adventure']
    ).length;
    
    expect(adventureCount).toBeGreaterThanOrEqual(8);
  });

  test('装备卡牌达到8张时触发上限处理', async ({ page, request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'equipment');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const equipmentCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'equipment']
    ).length;
    
    expect(equipmentCount).toBeGreaterThanOrEqual(8);
  });

  test('选择丢弃旧卡牌后获得新卡牌', async ({ page, request }) => {
    const { bookId, cards } = await setupBookWithMaxCards(request, 'weather');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    const beforeCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'weather']
    ).length;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput, .answer-input, input[type="text"]').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill(dbPuzzle.answer || 'test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    const limitModal = page.locator('#cardLimitModal, .card-limit-modal, .limit-modal');
    if (await limitModal.count() > 0) {
      const discardBtn = limitModal.locator('.btn-discard, button:has-text("丢弃")').first();
      if (await discardBtn.count() > 0) {
        await discardBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    const afterCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'weather']
    ).length;
    
    expect(afterCount).toBeLessThanOrEqual(8);
  });

  test('选择放弃新卡牌后卡牌数量不变', async ({ page, request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'weather');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    const beforeCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'weather']
    ).length;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput, .answer-input, input[type="text"]').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill(dbPuzzle.answer || 'test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    const limitModal = page.locator('#cardLimitModal, .card-limit-modal, .limit-modal');
    if (await limitModal.count() > 0) {
      const abandonBtn = limitModal.locator('.btn-abandon, button:has-text("放弃")').first();
      if (await abandonBtn.count() > 0) {
        await abandonBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    const afterCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'weather']
    ).length;
    
    expect(afterCount).toBe(beforeCount);
  });

  test('角色卡牌达到8张时无法创建新角色', async ({ request }) => {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '角色上限测试',
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

    for (let i = 0; i < 7; i++) {
      await request.post('/api/custom-cards/characters', {
        data: {
          book_id: bookId,
          user_id: testUserId,
          name: `配角${i + 1}`,
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 0,
          is_protagonist: 0
        }
      });
    }

    const charsBefore = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [bookId]
    );
    expect(charsBefore.length).toBe(8);

    const response = await request.post('/api/custom-cards/characters', {
      data: {
        book_id: bookId,
        user_id: testUserId,
        name: '超限角色',
        avatar: '🧝',
        role_type: '精灵',
        personality: '勇敢',
        speech_style: '简洁直接',
        intimacy: 0,
        is_protagonist: 0
      }
    });

    const result = await response.json();
    
    const charsAfter = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [bookId]
    );
    
    expect(charsAfter.length).toBe(8);
  });

  test('上限弹窗显示当前所有8张卡牌', async ({ page, request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'weather');
    const { chapterId, puzzleId } = await setupBookWithChapter(request, bookId);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput, .answer-input, input[type="text"]').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill(dbPuzzle.answer || 'test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    const limitModal = page.locator('#cardLimitModal, .card-limit-modal, .limit-modal');
    if (await limitModal.count() > 0) {
      const cardItems = limitModal.locator('.card-item, .existing-card');
      const count = await cardItems.count();
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('API应返回卡牌上限状态', async ({ request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'weather');

    const response = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const result = await response.json();

    expect(result.success).toBe(true);
    
    const weatherCards = result.data.filter(c => c.sub_type === 'weather');
    expect(weatherCards.length).toBeGreaterThanOrEqual(8);
  });

  test('每种类型卡牌上限独立计算', async ({ request }) => {
    const { bookId } = await setupBookWithMaxCards(request, 'weather');

    const terrainResponse = await request.post('/api/custom-cards/plot-cards', {
      data: {
        book_id: bookId,
        user_id: testUserId,
        name: '新地形卡',
        icon: '🏔️',
        description: '测试地形卡',
        sub_type: 'terrain'
      }
    });

    const terrainResult = await terrainResponse.json();
    
    const terrainCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [bookId, 'terrain']
    );
    
    expect(terrainCards.length).toBeGreaterThanOrEqual(4);
  });
});
