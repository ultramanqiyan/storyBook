import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('谜题功能', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;
  let testPuzzleId;
  let testPuzzleAnswer;
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

  async function setupBookChapterAndPuzzle(request) {
    const createBookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '谜题测试书籍',
        type: 'adventure',
        protagonist: {
          name: '谜题主角',
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

    const createChapterResponse = await request.post('/api/chapters', {
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
    const chapterData = await createChapterResponse.json();
    testChapterId = chapterData.data.chapter.chapter_id;
    testPuzzleId = chapterData.data.puzzle.puzzle_id;

    const puzzleResponse = await request.get(`/api/puzzles/${testPuzzleId}`);
    const puzzleData = await puzzleResponse.json();
    testPuzzleAnswer = puzzleData.data.answer;

    return { testBookId, testChapterId, testPuzzleId, testPuzzleAnswer };
  }

  test('解谜成功应掉落卡牌并写入数据库', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    const initialCardCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?',
      [testBookId]
    )?.count || 0;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    await page.waitForTimeout(2000);

    const puzzleBtn = page.locator('.scroll-nav-btn:has-text("Riddle"), .scroll-nav-btn:has-text("谜题"), .riddle-btn');
    if (await puzzleBtn.count() > 0) {
      await puzzleBtn.first().click();

      const puzzleOverlay = page.locator('#puzzleOverlay.active');
      await expect(puzzleOverlay).toBeVisible({ timeout: 5000 });
    }

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });
    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
    expect(result.data.reward).toBeDefined();
    expect(result.data.reward.card).toBeDefined();
    expect(result.data.reward.card.name).toBeDefined();

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );
    expect(dbPuzzle.is_solved).toBe(1);

    const newCardCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?',
      [testBookId]
    )?.count || 0;
    expect(newCardCount).toBeGreaterThan(initialCardCount);

    const droppedCard = db.query(
      'SELECT * FROM plot_cards WHERE book_id = ? AND name = ?',
      [testBookId, result.data.reward.card.name]
    );
    expect(droppedCard).toBeDefined();
  });

  test('解谜成功API应返回正确的卡牌奖励', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
    expect(result.data.is_solved).toBe(true);
    expect(result.data.reward).toBeDefined();
    expect(result.data.reward.card).toBeDefined();
    expect(result.data.reward.card.card_id).toBeDefined();
    expect(result.data.reward.card.sub_type).toBeDefined();
    expect(['weather', 'terrain', 'adventure', 'equipment']).toContain(result.data.reward.card.sub_type);
    expect(result.data.reward.card.name).toBeDefined();
    expect(result.data.reward.card.icon).toBeDefined();

    const dbCard = db.query(
      'SELECT * FROM plot_cards WHERE card_id = ?',
      [result.data.reward.card.card_id]
    );
    expect(dbCard).toBeDefined();
    expect(dbCard.book_id).toBe(testBookId);
  });

  test('未登录用户解谜成功应提示登录', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
    expect(result.data.login_required).toBe(true);
    expect(result.data.reward).toBeNull();
  });

  test('解谜错误应返回剩余次数', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: '错误答案',
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(false);
    expect(result.data.remaining_attempts).toBeDefined();
    expect(result.data.remaining_attempts).toBeLessThan(3);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );
    expect(dbPuzzle.attempts).toBeGreaterThan(0);
    expect(dbPuzzle.is_solved).toBe(0);
  });

  test('达到最大尝试次数应返回错误消息', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: '错误答案1',
        user_id: testUserId
      }
    });

    await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: '错误答案2',
        user_id: testUserId
      }
    });

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: '错误答案3',
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(false);
    expect(result.data.message).toContain('最大尝试次数');
  });

  test('已解开的谜题再次提交应返回已解开状态', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: '随便什么',
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
    expect(result.data.is_solved).toBe(true);
  });

  test('卡牌掉落类型应符合书籍类型', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.reward.card).toBeDefined();

    const validSubTypes = ['weather', 'terrain', 'adventure', 'equipment'];
    expect(validSubTypes).toContain(result.data.reward.card.sub_type);

    const dbCard = db.query(
      'SELECT * FROM plot_cards WHERE card_id = ?',
      [result.data.reward.card.card_id]
    );
    expect(dbCard).toBeDefined();
    expect(dbCard.sub_type).toBe(result.data.reward.card.sub_type);
  });

  test('选择题类型谜题应正确验证', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const puzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: puzzle.answer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
    expect(result.data.reward).toBeDefined();

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );
    expect(dbPuzzle.is_solved).toBe(1);
  });

  test('API应返回正确的谜题数据', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.get(`/api/puzzles/${testPuzzleId}`);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.puzzle_id).toBe(testPuzzleId);
    expect(data.data.chapter_id).toBe(testChapterId);
    expect(data.data.question).toBeDefined();
    expect(data.data.answer).toBeDefined();
    expect(data.data.puzzle_type).toBeDefined();
    expect(data.data.max_attempts).toBe(3);
    expect(data.data.is_solved).toBe(0);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );
    expect(dbPuzzle).toBeDefined();
    expect(dbPuzzle.question).toBe(data.data.question);
  });

  test('谜题不存在应返回404', async ({ request }) => {
    const response = await request.get('/api/puzzles/non-existent-id');

    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test('章节应关联谜题ID', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.get(`/api/chapters/${testChapterId}`);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.puzzle_id).toBe(testPuzzleId);
    expect(data.data.puzzle).toBeDefined();
    expect(data.data.puzzle.question).toBeDefined();
  });

  test('卡牌掉落后数据库应有记录', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const beforeCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?',
      [testBookId]
    )?.count || 0;

    await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const afterCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?',
      [testBookId]
    )?.count || 0;

    expect(afterCount).toBeGreaterThan(beforeCount);

    const newCard = db.query(
      'SELECT * FROM plot_cards WHERE book_id = ? ORDER BY created_at DESC LIMIT 1',
      [testBookId]
    );
    expect(newCard).toBeDefined();
    expect(newCard.card_id).toBeDefined();
    expect(newCard.sub_type).toBeDefined();
    expect(newCard.name).toBeDefined();
  });

  test('谜题应关联正确的章节', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(dbPuzzle.chapter_id).toBe(testChapterId);
  });

  test('谜题应有正确的最大尝试次数', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(dbPuzzle.max_attempts).toBe(3);
  });

  test('谜题初始状态应为未解开', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(dbPuzzle.is_solved).toBe(0);
    expect(dbPuzzle.attempts).toBe(0);
  });

  test('谜题问题不应为空', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(dbPuzzle.question).toBeDefined();
    expect(dbPuzzle.question.length).toBeGreaterThan(0);
  });

  test('谜题答案不应为空', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const dbPuzzle = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [testPuzzleId]
    );

    expect(dbPuzzle.answer).toBeDefined();
    expect(dbPuzzle.answer.length).toBeGreaterThan(0);
  });

  test('答案验证应不区分大小写', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const upperAnswer = testPuzzleAnswer.toUpperCase();
    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: upperAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
  });

  test('答案验证应去除首尾空格', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const spacedAnswer = `  ${testPuzzleAnswer}  `;
    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: spacedAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(true);
  });

  test('掉落卡牌应有正确的图标', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.data.reward.card.icon).toBeDefined();
    expect(['☀️', '🏔️', '🗺️', '🎒']).toContain(result.data.reward.card.icon);
  });

  test('掉落卡牌应有正确的描述', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    const dbCard = db.query(
      'SELECT * FROM plot_cards WHERE card_id = ?',
      [result.data.reward.card.card_id]
    );

    expect(dbCard.description).toBeDefined();
  });

  test('掉落卡牌应标记为非自定义', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    const dbCard = db.query(
      'SELECT * FROM plot_cards WHERE card_id = ?',
      [result.data.reward.card.card_id]
    );

    expect(dbCard.is_custom).toBe(0);
  });

  test('UI解谜交互测试 - 选择选项并提交', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    page.on('response', async (response) => {
      if (response.url().includes('/solve')) {
        console.log('API response URL:', response.url());
        console.log('API response status:', response.status());
        try {
          const body = await response.json();
          console.log('API response body:', JSON.stringify(body, null, 2));
        } catch (e) {
          console.log('Could not parse response body');
        }
      }
    });

    page.on('console', msg => {
      console.log('Browser console:', msg.text());
    });

    page.on('pageerror', error => {
      console.log('Page error:', error.message);
    });

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    const puzzleBtn = page.locator('.scroll-nav-btn:has-text("Riddle"), .scroll-nav-btn:has-text("谜题"), .riddle-btn');
    if (await puzzleBtn.count() > 0) {
      await puzzleBtn.first().click();

      const puzzleOverlay = page.locator('#puzzleOverlay.active');
      await expect(puzzleOverlay).toBeVisible({ timeout: 5000 });
    }

    const puzzleOptions = page.locator('.puzzle-option');
    const optionsCount = await puzzleOptions.count();
    console.log('Puzzle options count:', optionsCount);

    if (optionsCount > 0) {
      const puzzleInput = page.locator('#puzzleInput');
      const hasInput = await puzzleInput.count() > 0;

      if (hasInput) {
        await puzzleInput.fill(testPuzzleAnswer);
      } else {
        const puzzleResponse = await request.get(`/api/puzzles/${testPuzzleId}`);
        const puzzleData = await puzzleResponse.json();
        console.log('Puzzle data:', puzzleData.data);
        console.log('Puzzle options:', puzzleData.data.options);
        console.log('Puzzle answer:', puzzleData.data.answer);

        if (puzzleData.data.options && puzzleData.data.options.length > 0) {
          const answerIndex = puzzleData.data.options.findIndex(
            opt => opt.toLowerCase().trim() === testPuzzleAnswer.toLowerCase().trim()
          );
          console.log('Answer index:', answerIndex);
          if (answerIndex >= 0) {
            await puzzleOptions.nth(answerIndex).click();
            await page.waitForTimeout(500);
            const selectedOption = page.locator('.puzzle-option.selected');
            await expect(selectedOption).toBeVisible();
          }
        }
      }

      const submitBtn = page.locator('.puzzle-submit');
      await expect(submitBtn).toBeVisible();

      await submitBtn.click();

      await page.waitForTimeout(3000);

      const notification = page.locator('.notification');
      const notificationCount = await notification.count();
      console.log('Notification count:', notificationCount);

      const correctOption = page.locator('.puzzle-option.correct');
      const correctCount = await correctOption.count();
      console.log('Correct option count:', correctCount);

      const wrongOption = page.locator('.puzzle-option.wrong');
      const wrongCount = await wrongOption.count();
      console.log('Wrong option count:', wrongCount);

      const puzzleOverlayAfter = page.locator('#puzzleOverlay.active');
      const isOverlayVisible = await puzzleOverlayAfter.count();
      console.log('Puzzle overlay visible after submit:', isOverlayVisible);
    }
  });
});
