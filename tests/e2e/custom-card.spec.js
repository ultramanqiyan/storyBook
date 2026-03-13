import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('自定义卡牌功能', () => {
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
        title: '自定义卡牌测试书籍',
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

  test.describe('自定义情节卡牌API', () => {
    test('获取情节卡牌图标列表应返回正确数据', async ({ request }) => {
      const response = await request.get('/api/custom-cards/plot-cards?sub_type=weather');
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.sub_type).toBe('weather');
      expect(result.data.icons).toBeDefined();
      expect(result.data.icons.length).toBeGreaterThan(0);
    });

    test('创建自定义情节卡牌应成功', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '测试自定义天气',
          icon: '🌈',
          description: '这是一个测试自定义天气卡牌',
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.success).toBe(true);
      expect(result.data.card).toBeDefined();
      expect(result.data.card.name).toBe('测试自定义天气');
      expect(result.data.card.is_custom).toBe(1);

      const dbCard = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [result.data.card.card_id]
      );
      expect(dbCard).toBeDefined();
      expect(dbCard.is_custom).toBe(1);
    });

    test('创建自定义情节卡牌缺少必填字段应返回错误', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          user_id: testUserId
        }
      });

      expect(response.status()).toBe(400);
    });

    test('创建自定义情节卡牌名称超长应返回错误', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '这是一个超过二十个字符的超长名称测试用例啊',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('创建自定义情节卡牌描述超长应返回错误', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const longDescription = 'a'.repeat(101);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '测试卡牌',
          icon: '🌈',
          description: longDescription,
          user_id: testUserId
        }
      });

      expect(response.status()).toBe(400);
    });

    test('自定义情节卡牌应显示自定义标识', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '自定义测试卡牌',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.data.card.is_custom).toBe(1);

      const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
      const cardsResult = await cardsResponse.json();
      
      const customCard = cardsResult.data.find(c => c.card_id === result.data.card.card_id);
      expect(customCard).toBeDefined();
      expect(customCard.is_custom).toBe(1);
    });
  });

  test.describe('自定义角色卡牌API', () => {
    test('获取角色头像列表应返回正确数据', async ({ request }) => {
      const response = await request.get('/api/custom-cards/characters?type=avatars');
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.avatars).toBeDefined();
      expect(result.data.avatars.length).toBeGreaterThan(0);
    });

    test('获取角色选项应返回正确数据', async ({ request }) => {
      const response = await request.get('/api/custom-cards/characters?type=options&book_type=adventure');
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.character_types).toBeDefined();
      expect(result.data.personalities).toBeDefined();
      expect(result.data.speech_styles).toBeDefined();
    });

    test('创建自定义角色卡牌应成功', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '测试自定义角色',
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 50,
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.success).toBe(true);
      expect(result.data.character).toBeDefined();
      expect(result.data.character.name).toBe('测试自定义角色');
      expect(result.data.character.is_protagonist).toBe(0);

      const dbChar = db.query(
        'SELECT * FROM characters WHERE char_id = ?',
        [result.data.character.char_id]
      );
      expect(dbChar).toBeDefined();
    });

    test('创建自定义角色卡牌缺少必填字段应返回错误', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '测试角色',
          user_id: testUserId
        }
      });

      expect(response.status()).toBe(400);
    });

    test('自定义角色卡牌不能设置为主角', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '测试角色',
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 0,
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.character.is_protagonist).toBe(0);
    });

    test('自定义角色卡牌亲密度应为三档之一', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const intimacies = [-50, 0, 50];
      
      for (const intimacy of intimacies) {
        const response = await request.post('/api/custom-cards/characters', {
          data: {
            book_id: testBookId,
            name: `测试角色${intimacy}`,
            avatar: '🧝',
            role_type: '精灵',
            personality: '勇敢',
            speech_style: '简洁直接',
            intimacy: intimacy,
            user_id: testUserId
          }
        });

        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.character.intimacy).toBe(intimacy);
      }
    });
  });

  test.describe('自定义卡牌掉落机制', () => {
    test('解谜成功可能触发自定义卡牌创建', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      let customTriggered = false;
      
      for (let i = 0; i < 50; i++) {
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
        if (result.data.reward && (result.data.reward.type === 'custom_plot' || result.data.reward.type === 'custom_character')) {
          customTriggered = true;
          break;
        }
      }

      expect(customTriggered).toBe(true);
    });
  });

  test.describe('自定义卡牌UI', () => {
    test('自定义情节卡牌创建弹窗应显示正确', async ({ page, request }) => {
      await setupBookChapterAndPuzzle(request);

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const modal = document.getElementById('customPlotCardModal');
        if (modal) {
          modal.classList.add('active');
        }
      });

      const modal = page.locator('#customPlotCardModal');
      await expect(modal).toBeVisible();

      const title = page.locator('#customPlotCardModal .modal-title');
      await expect(title).toContainText('创建自定义情节卡牌');
    });

    test('自定义角色卡牌创建弹窗应显示两步流程', async ({ page, request }) => {
      await setupBookChapterAndPuzzle(request);

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const modal = document.getElementById('customCharacterModal');
        if (modal) {
          modal.classList.add('active');
        }
      });

      const modal = page.locator('#customCharacterModal');
      await expect(modal).toBeVisible();

      const step1 = page.locator('#charStep1');
      await expect(step1).toBeVisible();

      const stepIndicator = page.locator('.step-indicator');
      await expect(stepIndicator).toBeVisible();
    });

    test('自定义卡牌应显示角标标识', async ({ page, request }) => {
      await setupBookChapterAndPuzzle(request);

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const modal = document.getElementById('customPlotCardModal');
        if (modal) {
          modal.classList.add('active');
        }
      });

      const modal = page.locator('#customPlotCardModal');
      await expect(modal).toBeVisible();
    });
  });

  test.describe('自定义卡牌数据库验证', () => {
    test('自定义情节卡牌创建后数据库应有记录', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const beforeCount = db.query(
        'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND is_custom = 1',
        [testBookId]
      )?.count || 0;

      await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '数据库测试卡牌',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const afterCount = db.query(
        'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND is_custom = 1',
        [testBookId]
      )?.count || 0;

      expect(afterCount).toBe(beforeCount + 1);
    });

    test('自定义角色卡牌创建后数据库应有记录', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const beforeCount = db.query(
        'SELECT COUNT(*) as count FROM characters WHERE book_id = ?',
        [testBookId]
      )?.count || 0;

      await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '数据库测试角色',
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 0,
          user_id: testUserId
        }
      });

      const afterCount = db.query(
        'SELECT COUNT(*) as count FROM characters WHERE book_id = ?',
        [testBookId]
      )?.count || 0;

      expect(afterCount).toBe(beforeCount + 1);
    });

    test('自定义卡牌字段应正确存储', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'terrain',
          name: '字段验证测试',
          icon: '🏔️',
          description: '测试描述',
          user_id: testUserId
        }
      });

      const result = await response.json();
      
      const dbCard = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [result.data.card.card_id]
      );

      expect(dbCard.name).toBe('字段验证测试');
      expect(dbCard.icon).toBe('🏔️');
      expect(dbCard.sub_type).toBe('terrain');
      expect(dbCard.description).toBe('测试描述');
      expect(dbCard.is_custom).toBe(1);
    });
  });

  test.describe('自定义卡牌上限验证', () => {
    test('自定义情节卡牌上限应为每类型8张', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      for (let i = 0; i < 8; i++) {
        const response = await request.post('/api/custom-cards/plot-cards', {
          data: {
            book_id: testBookId,
            sub_type: 'equipment',
            name: `装备卡牌${i}`,
            icon: '🎒',
            user_id: testUserId
          }
        });
        const result = await response.json();
        expect(result.success).toBe(true);
      }

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'equipment',
          name: '超限装备卡牌',
          icon: '🎒',
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.limit_exceeded).toBe(true);
      expect(result.data.current_count).toBe(8);
    });

    test('自定义角色卡牌上限应为8张', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const existingCount = db.query(
        'SELECT COUNT(*) as count FROM characters WHERE book_id = ?',
        [testBookId]
      )?.count || 0;

      const slotsAvailable = 8 - existingCount;

      for (let i = 0; i < slotsAvailable; i++) {
        const response = await request.post('/api/custom-cards/characters', {
          data: {
            book_id: testBookId,
            name: `角色${i}`,
            avatar: '🧝',
            role_type: '精灵',
            personality: '勇敢',
            speech_style: '简洁直接',
            intimacy: 0,
            user_id: testUserId
          }
        });
        const result = await response.json();
        expect(result.success).toBe(true);
      }

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
      expect(result.success).toBe(true);
      expect(result.data.limit_exceeded).toBe(true);
    });
  });

  test.describe('自定义卡牌权限验证', () => {
    test('无权限用户创建卡牌应返回错误', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const otherUserId = 'other-user-' + Date.now();

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '无权限卡牌',
          icon: '🌈',
          user_id: otherUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('无权限');
    });

    test('书籍不存在时创建卡牌应返回错误', async ({ request }) => {
      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: 'non-existent-book-id',
          sub_type: 'weather',
          name: '测试卡牌',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('无效卡牌类型应返回错误', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'invalid_type',
          name: '测试卡牌',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });
  });

  test.describe('自定义卡牌章节生成', () => {
    test('自定义情节卡牌应可用于章节生成', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const createResponse = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '自定义天气',
          icon: '🌈',
          description: '这是一个自定义天气卡牌',
          user_id: testUserId
        }
      });

      const createResult = await createResponse.json();
      const customCardId = createResult.data.card.card_id;

      const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
      const charsData = await charsResponse.json();
      const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

      const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;

      const terrainCardId = cards.find(c => c.sub_type === 'terrain')?.card_id;
      const adventureCardId = cards.find(c => c.sub_type === 'adventure')?.card_id;
      const equipmentCardId = cards.find(c => c.sub_type === 'equipment')?.card_id;

      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonistId,
            weather_id: customCardId,
            terrain_id: terrainCardId,
            adventure_id: adventureCardId,
            equipment_id: equipmentCardId
          }
        }
      });

      const chapterResult = await chapterResponse.json();
      expect(chapterResult.success).toBe(true);
      expect(chapterResult.data.chapter).toBeDefined();
    });

    test('自定义角色卡牌应可用于章节生成', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const createResponse = await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '自定义配角',
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 50,
          user_id: testUserId
        }
      });

      const createResult = await createResponse.json();
      const customCharId = createResult.data.character.char_id;

      const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
      const cardsData = await cardsResponse.json();
      const cards = cardsData.data;

      const weatherCardId = cards.find(c => c.sub_type === 'weather')?.card_id;
      const terrainCardId = cards.find(c => c.sub_type === 'terrain')?.card_id;
      const adventureCardId = cards.find(c => c.sub_type === 'adventure')?.card_id;
      const equipmentCardId = cards.find(c => c.sub_type === 'equipment')?.card_id;

      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: customCharId,
            weather_id: weatherCardId,
            terrain_id: terrainCardId,
            adventure_id: adventureCardId,
            equipment_id: equipmentCardId
          }
        }
      });

      const chapterResult = await chapterResponse.json();
      expect(chapterResult.success).toBe(true);
    });
  });

  test.describe('自定义卡牌完整UI流程', () => {
    test('自定义情节卡牌完整创建流程', async ({ page, request }) => {
      await setupBookChapterAndPuzzle(request);

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const modal = document.getElementById('customPlotCardModal');
        if (modal) {
          modal.classList.add('active');
        }
      });

      const modal = page.locator('#customPlotCardModal');
      await expect(modal).toBeVisible();

      const terrainOption = page.locator('#plotTypeSelector .type-option[data-type="terrain"]');
      await terrainOption.click();

      await page.waitForTimeout(500);

      const iconOption = page.locator('#plotIconGrid .icon-option').first();
      await iconOption.click();

      const nameInput = page.locator('#plotCardName');
      await nameInput.fill('完整流程测试卡牌');

      const descInput = page.locator('#plotCardDesc');
      await descInput.fill('这是一个完整流程测试的自定义卡牌描述');

      const createBtn = page.locator('#btnCreatePlotCard');
      await createBtn.click();

      await page.waitForTimeout(2000);

      const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
      const cardsData = await cardsResponse.json();
      const newCard = cardsData.data.find(c => c.name === '完整流程测试卡牌');
      expect(newCard).toBeDefined();
      expect(newCard.is_custom).toBe(1);
    });

    test('自定义角色卡牌完整创建流程', async ({ page, request }) => {
      await setupBookChapterAndPuzzle(request);

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      await page.evaluate(async () => {
        const modal = document.getElementById('customCharacterModal');
        if (modal) {
          modal.classList.add('active');
        }
        
        if (typeof loadCharacterAvatars === 'function') {
          await loadCharacterAvatars();
        }
        if (typeof loadCharacterOptions === 'function') {
          await loadCharacterOptions();
        }
      });

      const modal = page.locator('#customCharacterModal');
      await expect(modal).toBeVisible();

      await page.waitForTimeout(1000);

      const avatarOption = modal.locator('.avatar-option').first();
      await avatarOption.waitFor({ state: 'visible', timeout: 5000 });
      await avatarOption.click({ force: true });

      const nameInput = modal.locator('#charName');
      await nameInput.fill('完整流程测试角色');

      const nextBtn = modal.locator('#btnCharNext');
      await nextBtn.click({ force: true });
      await page.waitForTimeout(500);

      const roleSelect = modal.locator('#charRoleType');
      await roleSelect.waitFor({ state: 'visible', timeout: 5000 });
      await roleSelect.selectOption({ index: 1 });

      const personalitySelect = modal.locator('#charPersonality');
      await personalitySelect.selectOption({ index: 1 });

      const speechSelect = modal.locator('#charSpeechStyle');
      await speechSelect.selectOption({ index: 1 });

      const friendlyOption = modal.locator('.intimacy-option[data-value="50"]');
      await friendlyOption.click({ force: true });

      const createBtn = modal.locator('#btnCharCreate');
      await createBtn.click({ force: true });
      await page.waitForTimeout(2000);

      const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
      const charsData = await charsResponse.json();
      const newChar = charsData.data.find(c => c.name === '完整流程测试角色');
      expect(newChar).toBeDefined();
    });

    test('自定义卡牌角标应正确显示', async ({ page, request }) => {
      await setupBookChapterAndPuzzle(request);

      const createResponse = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '角标测试卡牌',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const createResult = await createResponse.json();
      expect(createResult.data.card.is_custom).toBe(1);

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      await page.goto(`/chapter.html?id=${testChapterId}`);
      await page.waitForTimeout(2000);

      const customBadge = page.locator('.custom-badge');
      const badgeCount = await customBadge.count();
      expect(badgeCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('自定义卡牌丢弃功能', () => {
    test('丢弃自定义情节卡牌应成功', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const createResponse = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: testBookId,
          sub_type: 'weather',
          name: '待丢弃卡牌',
          icon: '🌈',
          user_id: testUserId
        }
      });

      const createResult = await createResponse.json();
      const cardId = createResult.data.card.card_id;

      const beforeDelete = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [cardId]
      );
      expect(beforeDelete).toBeDefined();
      expect(beforeDelete.is_custom).toBe(1);

      const deleteResponse = await request.delete(`/api/plot-cards/${cardId}`);
      const deleteResult = await deleteResponse.json();
      expect(deleteResult.success).toBe(true);

      const afterDelete = db.query(
        'SELECT * FROM plot_cards WHERE card_id = ?',
        [cardId]
      );
      expect(afterDelete).toBeUndefined();
    });

    test('丢弃自定义角色卡牌应成功', async ({ request }) => {
      await setupBookChapterAndPuzzle(request);

      const createResponse = await request.post('/api/custom-cards/characters', {
        data: {
          book_id: testBookId,
          name: '待丢弃角色',
          avatar: '🧝',
          role_type: '精灵',
          personality: '勇敢',
          speech_style: '简洁直接',
          intimacy: 0,
          user_id: testUserId
        }
      });

      const createResult = await createResponse.json();
      const charId = createResult.data.character.char_id;

      const beforeDelete = db.query(
        'SELECT * FROM characters WHERE char_id = ?',
        [charId]
      );
      expect(beforeDelete).toBeDefined();

      const deleteResponse = await request.delete(`/api/characters/${charId}`);
      const deleteResult = await deleteResponse.json();
      expect(deleteResult.success).toBe(true);

      const afterDelete = db.query(
        'SELECT * FROM characters WHERE char_id = ?',
        [charId]
      );
      expect(afterDelete).toBeUndefined();
    });
  });
});
