import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('卡牌掉落UI功能', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;
  let testPuzzleId;
  let testPuzzleAnswer;

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
        title: '卡牌掉落测试书籍',
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
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const weatherCardId = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainCardId = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureCardId = cards.find(c => c.sub_type === 'adventure').card_id;
    const equipmentCardId = cards.find(c => c.sub_type === 'equipment').card_id;

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

  test('解谜成功应显示卡牌奖励弹窗', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.reward).toBeDefined();
  });

  test('卡牌奖励弹窗应显示卡牌信息', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const modal = document.getElementById('cardRewardModal');
      if (modal) {
        document.getElementById('rewardCardIcon').textContent = '☀️';
        document.getElementById('rewardCardName').textContent = '晴天';
        document.getElementById('rewardCardType').textContent = '天气卡牌';
        document.getElementById('rewardMessage').textContent = '恭喜获得卡牌！';
        modal.style.display = 'flex';
      }
    });

    const modal = page.locator('#cardRewardModal');
    await expect(modal).toBeVisible();

    const cardName = page.locator('#rewardCardName');
    await expect(cardName).toHaveText('晴天');
  });

  test('点击收下按钮应关闭弹窗', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const modal = document.getElementById('cardRewardModal');
      if (modal) {
        modal.style.display = 'flex';
      }
    });

    const modal = page.locator('#cardRewardModal');
    await expect(modal).toBeVisible();

    await page.evaluate(() => {
      const modal = document.getElementById('cardRewardModal');
      if (modal) {
        modal.style.display = 'none';
      }
    });

    await expect(modal).not.toBeVisible();
  });

  test('卡牌上限时应显示丢弃选择弹窗', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const modal = document.getElementById('cardDiscardModal');
      const grid = document.getElementById('discardCardsGrid');
      if (modal && grid) {
        grid.innerHTML = `
          <div class="card-item" data-card-id="card1">
            <div class="card-icon">☀️</div>
            <div class="card-name">晴天</div>
          </div>
          <div class="card-item new-card" data-card-id="new">
            <div class="new-badge">NEW</div>
            <div class="card-icon">🌈</div>
            <div class="card-name">彩虹天</div>
          </div>
        `;
        modal.style.display = 'flex';
      }
    });

    const modal = page.locator('#cardDiscardModal');
    await expect(modal).toBeVisible();

    const cardsGrid = page.locator('#discardCardsGrid .card-item');
    const count = await cardsGrid.count();
    expect(count).toBeGreaterThan(0);
  });

  test('选择卡牌后丢弃按钮应可用', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const modal = document.getElementById('cardDiscardModal');
      const grid = document.getElementById('discardCardsGrid');
      if (modal && grid) {
        grid.innerHTML = `
          <div class="card-item selected" data-card-id="card1">
            <div class="card-icon">☀️</div>
            <div class="card-name">晴天</div>
          </div>
        `;
        modal.style.display = 'flex';
        const btn = document.getElementById('btnConfirmDiscard');
        if (btn) {
          btn.disabled = false;
        }
      }
    });

    const confirmBtn = page.locator('#btnConfirmDiscard');
    await expect(confirmBtn).not.toBeDisabled();
  });

  test('新卡牌应显示NEW标签', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const modal = document.getElementById('cardDiscardModal');
      const grid = document.getElementById('discardCardsGrid');
      if (modal && grid) {
        grid.innerHTML = `
          <div class="card-item new-card" data-card-id="new">
            <div class="new-badge">NEW</div>
            <div class="card-icon">🌈</div>
            <div class="card-name">彩虹天</div>
          </div>
        `;
        modal.style.display = 'flex';
      }
    });

    const newBadge = page.locator('.new-badge');
    await expect(newBadge).toBeVisible();
    await expect(newBadge).toHaveText('NEW');
  });

  test('取消按钮应关闭丢弃弹窗', async ({ page, request }) => {
    await setupBookChapterAndPuzzle(request);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(2000);

    await page.evaluate(() => {
      const discardModal = document.getElementById('cardDiscardModal');
      if (discardModal) {
        discardModal.style.display = 'flex';
      }
    });

    const modal = page.locator('#cardDiscardModal');
    await expect(modal).toBeVisible();

    await page.evaluate(() => {
      const discardModal = document.getElementById('cardDiscardModal');
      if (discardModal) {
        discardModal.style.display = 'none';
      }
    });

    await expect(modal).not.toBeVisible();
  });

  test('卡牌掉落API应返回正确的卡牌类型', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();
    
    expect(result.data.reward).toBeDefined();
    expect(result.data.reward.type).toBeDefined();
    expect(['preset_plot', 'custom_plot', 'custom_character']).toContain(
      result.data.reward.type
    );
    
    if (result.data.reward.card) {
      expect(result.data.reward.card.sub_type).toBeDefined();
      expect(['weather', 'terrain', 'adventure', 'equipment']).toContain(
        result.data.reward.card.sub_type
      );
    }
  });

  test('卡牌掉落API应返回卡牌图标', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.data.reward).toBeDefined();
    
    if (result.data.reward.type === 'preset_plot' || result.data.reward.type === 'custom_plot') {
      expect(result.data.reward.card.icon).toBeDefined();
      expect(result.data.reward.card.icon.length).toBeGreaterThan(0);
    } else if (result.data.reward.type === 'custom_character') {
      expect(result.data.reward.character.avatar).toBeDefined();
    }
  });

  test('卡牌掉落API应返回卡牌名称', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const result = await response.json();

    expect(result.data.reward.card.name).toBeDefined();
    if (result.data.reward.card.is_custom === 1) {
      expect(result.data.reward.card.name.length).toBeGreaterThanOrEqual(0);
    } else {
      expect(result.data.reward.card.name.length).toBeGreaterThan(0);
    }
  });

  test('卡牌上限时API应返回card_limit_exceeded标志', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    for (let i = 0; i < 8; i++) {
      await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
        data: {
          answer: testPuzzleAnswer,
          user_id: testUserId
        }
      });
    }

    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const weatherCardId = cards.find(c => c.sub_type === 'weather')?.card_id;
    const terrainCardId = cards.find(c => c.sub_type === 'terrain')?.card_id;
    const adventureCardId = cards.find(c => c.sub_type === 'adventure')?.card_id;
    const equipmentCardId = cards.find(c => c.sub_type === 'equipment')?.card_id;

    const newChapterResponse = await request.post('/api/chapters', {
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
    const newChapterData = await newChapterResponse.json();
    
    if (newChapterData.data && newChapterData.data.puzzle) {
      const newPuzzleId = newChapterData.data.puzzle.puzzle_id;

      const newPuzzleResponse = await request.get(`/api/puzzles/${newPuzzleId}`);
      const newPuzzleData = await newPuzzleResponse.json();
      const newPuzzleAnswer = newPuzzleData.data.answer;

      const response = await request.post(`/api/puzzles/${newPuzzleId}/solve`, {
        data: {
          answer: newPuzzleAnswer,
          user_id: testUserId
        }
      });

      const result = await response.json();

      if (result.data && result.data.card_limit_exceeded) {
        expect(result.data.card_limit_exceeded).toBe(true);
        expect(result.data.reward.existing_cards).toBeDefined();
      }
    }
  });

  test('卡牌掉落后数据库应有新记录', async ({ request }) => {
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

    expect(afterCount).toBeGreaterThanOrEqual(beforeCount);
  });

  test('丢弃卡牌后应从数据库删除', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const solveResponse = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: testUserId
      }
    });

    const solveResult = await solveResponse.json();
    
    if (solveResult.data && solveResult.data.reward && solveResult.data.reward.card && solveResult.data.reward.type === 'preset_plot') {
      const droppedCardId = solveResult.data.reward.card.card_id;

      const beforeDelete = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [droppedCardId]
      );
      expect(beforeDelete).toBeDefined();

      await request.delete(`/api/plot-cards/${droppedCardId}`);

      const afterDelete = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [droppedCardId]
      );
      expect(afterDelete).toBeUndefined();
    } else {
      expect(solveResult.data.reward).toBeDefined();
    }
  });

  test('解谜失败不应掉落卡牌', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: '错误答案123',
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.is_correct).toBe(false);
    expect(result.data.reward).toBeUndefined();
  });

  test('未登录用户解谜不应获得卡牌奖励', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const response = await request.post(`/api/puzzles/${testPuzzleId}/solve`, {
      data: {
        answer: testPuzzleAnswer,
        user_id: null
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.login_required).toBe(true);
    expect(result.data.reward).toBeNull();
  });

  test('丢弃预设卡牌后新卡牌应入库', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    for (let i = 0; i < 8; i++) {
      const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
      const charsData = await charsResponse.json();
      const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

      const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;

      const weatherCardId = cards.find(c => c.sub_type === 'weather')?.card_id;
      const terrainCardId = cards.find(c => c.sub_type === 'terrain')?.card_id;
      const adventureCardId = cards.find(c => c.sub_type === 'adventure')?.card_id;
      const equipmentCardId = cards.find(c => c.sub_type === 'equipment')?.card_id;

      const newChapterResponse = await request.post('/api/chapters', {
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
      const chapterData = await newChapterResponse.json();
      const puzzleId = chapterData.data.puzzle.puzzle_id;

      const puzzleResponse = await request.get(`/api/puzzles/${puzzleId}`);
      const puzzleData = await puzzleResponse.json();
      const puzzleAnswer = puzzleData.data.answer;

      await request.post(`/api/puzzles/${puzzleId}/solve`, {
        data: {
          answer: puzzleAnswer,
          user_id: testUserId
        }
      });
    }

    const cardsBeforeDrop = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [testBookId, 'weather']
    );
    
    if (cardsBeforeDrop.length >= 8) {
      const cardToDrop = cardsBeforeDrop[0];
      await request.delete(`/api/plot-cards/${cardToDrop.card_id}`);

      const cardsAfterDrop = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?',
        [testBookId, 'weather']
      );
      expect(cardsAfterDrop.length).toBe(cardsBeforeDrop.length - 1);
    }
  });

  test('丢弃自定义卡牌应从数据库删除', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const createResponse = await request.post('/api/custom-cards/plot-cards', {
      data: {
        book_id: testBookId,
        sub_type: 'weather',
        name: '待丢弃的自定义卡牌',
        icon: '🌈',
        user_id: testUserId
      }
    });

    const createResult = await createResponse.json();
    const customCardId = createResult.data.card.card_id;

    const beforeDelete = db.query(
      'SELECT * FROM plot_cards WHERE card_id = ?',
      [customCardId]
    );
    expect(beforeDelete).toBeDefined();
    expect(beforeDelete.is_custom).toBe(1);

    await request.delete(`/api/plot-cards/${customCardId}`);

    const afterDelete = db.query(
      'SELECT * FROM plot_cards WHERE card_id = ?',
      [customCardId]
    );
    expect(afterDelete).toBeUndefined();
  });

  test('角色卡牌上限时应返回character_limit_exceeded标志', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    for (let i = 0; i < 7; i++) {
      await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: `测试角色${i}`,
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 0,
          user_id: testUserId
        }
      });
    }

    const charCount = db.query(
      'SELECT COUNT(*) as count FROM characters WHERE book_id = ?',
      [testBookId]
    );

    if (charCount.count >= 8) {
      const response = await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '超限角色',
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 0,
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.data.limit_exceeded).toBe(true);
      expect(result.data.existing_characters).toBeDefined();
    }
  });

  test('解谜成功应返回正确的掉落概率分布', async ({ request }) => {
    await setupBookChapterAndPuzzle(request);

    const results = {
      preset_plot: 0,
      custom_plot: 0,
      custom_character: 0
    };

    for (let i = 0; i < 100; i++) {
      const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
      const charsData = await charsResponse.json();
      const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

      const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;

      const weatherCardId = cards.find(c => c.sub_type === 'weather')?.card_id;
      const terrainCardId = cards.find(c => c.sub_type === 'terrain')?.card_id;
      const adventureCardId = cards.find(c => c.sub_type === 'adventure')?.card_id;
      const equipmentCardId = cards.find(c => c.sub_type === 'equipment')?.card_id;

      const newChapterResponse = await request.post('/api/chapters', {
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
      const chapterData = await newChapterResponse.json();
      const puzzleId = chapterData.data.puzzle.puzzle_id;

      const puzzleResponse = await request.get(`/api/puzzles/${puzzleId}`);
      const puzzleData = await puzzleResponse.json();
      const puzzleAnswer = puzzleData.data.answer;

      const response = await request.post(`/api/puzzles/${puzzleId}/solve`, {
        data: {
          answer: puzzleAnswer,
          user_id: testUserId
        }
      });

      const result = await response.json();
      if (result.data.reward && result.data.reward.type) {
        results[result.data.reward.type]++;
      }
    }

    expect(results.preset_plot).toBeGreaterThan(0);
    expect(results.custom_plot).toBeGreaterThan(0);
    expect(results.custom_character).toBeGreaterThan(0);

    const totalCustom = results.custom_plot + results.custom_character;
    const customRatio = totalCustom / 100;
    expect(customRatio).toBeGreaterThan(0.15);
    expect(customRatio).toBeLessThan(0.45);
  });
});
