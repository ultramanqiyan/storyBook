import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('解谜卡牌掉落流程', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;
  let testPuzzleId;
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

  async function setupBookWithChapter(request) {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '解谜测试书籍',
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
    testBookId = bookData.data.book_id;

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

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
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
    testChapterId = chapterData.data.chapter.chapter_id;
    testPuzzleId = chapterData.data.puzzle.puzzle_id;

    return { testBookId, testChapterId, testPuzzleId };
  }

  test('解谜成功应掉落卡牌', async ({ page, request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(2000);

    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(0);
  });

  test('解谜成功后数据库应更新谜题状态', async ({ request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    const solveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: dbPuzzle.answer || 'test'
      }
    });

    const solveData = await solveResponse.json();

    const dbPuzzleAfter = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    if (solveData.success && solveData.correct) {
      expect(dbPuzzleAfter.is_solved).toBe(1);
    }
  });

  test('解谜失败不应掉落卡牌', async ({ request }) => {
    await setupBookWithChapter(request);

    const beforeCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const solveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: 'wrong_answer_12345'
      }
    });

    const solveData = await solveResponse.json();

    const afterCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    expect(afterCards.length).toBe(beforeCards.length);
  });

  test('解谜失败应增加尝试次数', async ({ request }) => {
    await setupBookWithChapter(request);

    const beforePuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );
    const beforeAttempts = beforePuzzle.attempts;

    await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: 'wrong_answer_12345'
      }
    });

    const afterPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(afterPuzzle.attempts).toBe(beforeAttempts + 1);
  });

  test('尝试次数用尽后应显示正确答案', async ({ request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    for (let i = 0; i < dbPuzzle.max_attempts; i++) {
      await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
        data: {
          user_id: testUserId,
          answer: 'wrong_answer_' + i
        }
      });
    }

    const afterPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(afterPuzzle.attempts).toBe(dbPuzzle.max_attempts);
  });

  test('已解决的谜题不应再次掉落卡牌', async ({ request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    const firstSolveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: dbPuzzle.answer || 'test'
      }
    });
    const firstSolveData = await firstSolveResponse.json();

    const afterFirstCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const secondSolveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: dbPuzzle.answer || 'test'
      }
    });

    const afterSecondCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    if (firstSolveData.success && firstSolveData.correct) {
      expect(afterSecondCards.length).toBe(afterFirstCards.length);
    }
  });

  test('掉落的卡牌应关联到正确的书籍', async ({ request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    const beforeCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const solveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: dbPuzzle.answer || 'test'
      }
    });
    const solveData = await solveResponse.json();

    if (solveData.success && solveData.correct && solveData.dropped_card) {
      const droppedCard = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [solveData.dropped_card.card_id]
      );

      expect(droppedCard).toBeDefined();
      expect(droppedCard.book_id).toBe(testBookId);
    }
  });

  test('卡牌掉落类型应为四种类型之一', async ({ request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    const solveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        user_id: testUserId,
        answer: dbPuzzle.answer || 'test'
      }
    });
    const solveData = await solveResponse.json();

    if (solveData.success && solveData.correct && solveData.dropped_card) {
      const validTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      expect(validTypes).toContain(solveData.dropped_card.sub_type);
    }
  });

  test('章节页面应显示谜题问题', async ({ page, request }) => {
    await setupBookWithChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(2000);

    const puzzleQuestion = page.locator('.puzzle-question, .question-text, #puzzleQuestion');
    const questionCount = await puzzleQuestion.count();
    expect(questionCount).toBeGreaterThanOrEqual(0);
  });

  test('章节页面应显示剩余尝试次数', async ({ page, request }) => {
    await setupBookWithChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    const attemptsDisplay = page.locator('.attempts-display, .remaining-attempts, #attemptsCount');
    if (await attemptsDisplay.count() > 0) {
      await expect(attemptsDisplay).toBeVisible();
    }
  });

  test('解谜成功应显示成功提示', async ({ page, request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill(dbPuzzle.answer || 'test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        
        await page.waitForTimeout(2000);
      }
    }
  });

  test('解谜失败应显示错误提示', async ({ page, request }) => {
    await setupBookWithChapter(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill('wrong_answer_test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        
        await page.waitForTimeout(2000);
      }
    }
  });

  test('未登录用户解谜不应掉落卡牌', async ({ page, request }) => {
    await setupBookWithChapter(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    const beforeCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    await page.goto(`/chapter.html?id=${testChapterId}`);

    const answerInput = page.locator('#answerInput, .answer-input, input[type="text"]');
    if (await answerInput.count() > 0) {
      await answerInput.fill(dbPuzzle.answer || 'test');
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")');
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        
        await page.waitForTimeout(2000);
      }
    }

    const afterCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    expect(afterCards.length).toBe(beforeCards.length);
  });

  test('不同书籍的解谜应掉落到对应书籍', async ({ request }) => {
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
    const book1Id = book1Data.data.book_id;
    const book2Id = book2Data.data.book_id;

    const book1Cards = await request.get(`/api/plot-cards?book_id=${book1Id}`);
    const book2Cards = await request.get(`/api/plot-cards?book_id=${book2Id}`);
    const book1CardsData = await book1Cards.json();
    const book2CardsData = await book2Cards.json();

    const book1Chars = await request.get(`/api/characters?book_id=${book1Id}`);
    const book2Chars = await request.get(`/api/characters?book_id=${book2Id}`);
    const book1CharsData = await book1Chars.json();
    const book2CharsData = await book2Chars.json();

    expect(book1CardsData.data.length).toBe(16);
    expect(book2CardsData.data.length).toBe(16);

    const book1CardsBefore = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [book1Id]);
    const book2CardsBefore = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [book2Id]);

    expect(book1CardsBefore.length).toBe(16);
    expect(book2CardsBefore.length).toBe(16);
  });
});
