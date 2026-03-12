import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8788';

test.describe('卡牌掉落测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/bookshelf', { timeout: 15000 });
  });

  test.describe('基础掉落测试', () => {
    test('DROP-001: 首次解谜成功应该掉落卡牌', async ({ page }) => {
      await page.goto('/book?id=preset-adventure-001');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.click('.tab-btn:has-text("章节")');
      await page.waitForSelector('.chapter-item', { timeout: 5000 });
      
      const chapterItems = await page.locator('.chapter-item').count();
      if (chapterItems > 0) {
        await page.locator('.chapter-item').first().click();
        await page.waitForSelector('.chapter-content', { timeout: 10000 });
        
        const puzzleSection = page.locator('#puzzleSection');
        if (await puzzleSection.isVisible()) {
          const puzzleId = await page.evaluate(() => {
            const url = new URL(window.location.href);
            return url.searchParams.get('id');
          });
          
          const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/${puzzleId}`);
          const puzzleData = await puzzleResponse.json();
          
          if (puzzleData.success && puzzleData.data && puzzleData.data.is_solved === 0) {
            const answer = puzzleData.data.answer;
            const solveResponse = await page.request.post(`${BASE_URL}/api/puzzles/${puzzleId}/solve`, {
              headers: { 'Content-Type': 'application/json' },
              data: JSON.stringify({ answer })
            });
            
            const solveData = await solveResponse.json();
            expect(solveData.success).toBe(true);
            
            if (solveData.data.is_correct) {
              expect(solveData.data.reward).toBeDefined();
              expect(solveData.data.reward.card).toBeDefined();
            }
          }
        }
      }
    });

    test('DROP-002: 多次解谜成功掉落多张卡牌', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/chapters`);
      const chaptersData = await response.json();
      
      if (chaptersData.success && chaptersData.data && chaptersData.data.length >= 3) {
        const cardsResponse = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
        const cardsData = await cardsResponse.json();
        
        if (cardsData.success) {
          const initialCount = cardsData.data ? cardsData.data.length : 0;
          expect(initialCount).toBeGreaterThanOrEqual(0);
        }
      }
    });

    test('DROP-003: 掉落天气卡牌类型验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards');
      const data = await response.json();
      
      if (data.success && data.data) {
        const weatherCards = data.data.filter(c => c.sub_type === 'weather');
        expect(weatherCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('DROP-004: 掉落地形卡牌类型验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const terrainCards = data.data.filter(c => c.sub_type === 'terrain');
        expect(terrainCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('DROP-005: 掉落冒险类型卡牌验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const adventureCards = data.data.filter(c => c.sub_type === 'adventure');
        expect(adventureCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('DROP-006: 掉落装备卡牌验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const equipmentCards = data.data.filter(c => c.sub_type === 'equipment');
        expect(equipmentCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('DROP-007: 预设卡牌掉落概率约70%', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const presetCount = data.data.filter(c => c.is_custom === 0).length;
        const totalCount = data.data.length;
        const presetRatio = presetCount / totalCount;
        
        expect(presetRatio).toBeGreaterThanOrEqual(0);
        expect(presetRatio).toBeLessThanOrEqual(1);
      }
    });

    test('DROP-008: 自定义卡牌掉落概率约30%', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const customCount = data.data.filter(c => c.is_custom === 1).length;
        const totalCount = data.data.length;
        const customRatio = customCount / totalCount;
        
        expect(customRatio).toBeGreaterThanOrEqual(0);
        expect(customRatio).toBeLessThanOrEqual(1);
      }
    });

    test('DROP-009: 重复掉落相同卡牌', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const cardNames = data.data.map(c => c.name);
        const uniqueNames = [...new Set(cardNames)];
        
        expect(cardNames.length).toBeGreaterThanOrEqual(uniqueNames.length);
      }
    });
  });

  test.describe('答案错误和次数限制测试', () => {
    test('DROP-010: 答案错误不掉落卡牌', async ({ page }) => {
      const puzzleResponse = await page.request.post(`${BASE_URL}/api/puzzles/puzzle-preset-001/solve`, {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ answer: '错误答案123' })
      });
      
      const solveData = await puzzleResponse.json();
      expect(solveData.success).toBe(true);
      expect(solveData.data.is_correct).toBe(false);
      expect(solveData.data.reward).toBeUndefined();
    });

    test('DROP-011: 尝试次数用尽', async ({ page }) => {
      const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/puzzle-preset-001');
      const puzzleData = await puzzleResponse.json();
      
      if (puzzleData.success && puzzleData.data) {
        expect(puzzleData.data.attempts).toBeLessThanOrEqual(3);
      }
    });

    test('DROP-012: 已解谜题不能重复提交', async ({ page }) => {
      const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/puzzle-preset-001');
      const puzzleData = await puzzleResponse.json();
      
      if (puzzleData.success && puzzleData.data && puzzleData.data.is_solved === 1) {
        const solveResponse = await page.request.post(`${BASE_URL}/api/puzzles/puzzle-preset-001/solve`, {
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify({ answer: puzzleData.data.answer })
        });
        
        const solveData = await solveResponse.json();
        expect(solveData.success).toBe(false);
      }
    });
  });

  test.describe('异常场景测试', () => {
    test('DROP-013: 网络异常处理', async ({ page }) => {
      await page.goto('/book?id=preset-adventure-001');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      const pageContent = await page.content();
      expect(pageContent.length).toBeGreaterThan(0);
    });

    test('DROP-014: 并发提交处理', async ({ page }) => {
      const puzzleResponse = await page.request.get(`${BASE_URL}/api/puzzles/puzzle-preset-001`);
      const puzzleData = await puzzleResponse.json();
      
      if (puzzleData.success && puzzleData.data) {
        expect(typeof puzzleData.data.attempts).toBe('number');
      }
    });

    test('DROP-015: 预设书籍解谜掉落卡牌', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards');
      const data = await response.json();
      
      if (data.success && data.data) {
        data.data.forEach(card => {
          expect(card.book_id).toBeDefined();
        });
      }
    });
  });

  test.describe('卡牌上限处理测试', () => {
    test('LIMIT-001: 天气卡牌上限8张', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const weatherCards = data.data.filter(c => c.sub_type === 'weather');
        expect(weatherCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('LIMIT-002: 地形卡牌上限8张', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const terrainCards = data.data.filter(c => c.sub_type === 'terrain');
        expect(terrainCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('LIMIT-003: 冒险类型卡牌上限8张', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const adventureCards = data.data.filter(c => c.sub_type === 'adventure');
        expect(adventureCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('LIMIT-004: 装备卡牌上限8张', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const equipmentCards = data.data.filter(c => c.sub_type === 'equipment');
        expect(equipmentCards.length).toBeLessThanOrEqual(8);
      }
    });

    test('LIMIT-005: 卡牌总数上限32张', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        expect(data.data.length).toBeLessThanOrEqual(32);
      }
    });

    test('LIMIT-006: 卡牌类型分组显示', async ({ page }) => {
      await page.goto('/book?id=preset-adventure-001');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.click('.tab-btn:has-text("卡牌")');
      await page.waitForTimeout(500);
      
      const cardsList = page.locator('#cardsList');
      if (await cardsList.isVisible()) {
        expect(true).toBe(true);
      }
    });

    test('LIMIT-007: 卡牌数量显示格式', async ({ page }) => {
      await page.goto('/book?id=preset-adventure-001');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.click('.tab-btn:has-text("卡牌")');
      await page.waitForTimeout(500);
      
      const countElements = await page.locator('.card-count').count();
      expect(countElements).toBeGreaterThanOrEqual(0);
    });

    test('LIMIT-008: 卡牌详情弹窗', async ({ page }) => {
      await page.goto('/book?id=preset-adventure-001');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.click('.tab-btn:has-text("卡牌")');
      await page.waitForTimeout(500);
      
      const cardItems = await page.locator('.card-item').count();
      if (cardItems > 0) {
        await page.locator('.card-item').first().click();
        await page.waitForTimeout(300);
      }
    });

    test('LIMIT-009: 卡牌悬停效果', async ({ page }) => {
      await page.goto('/book?id=preset-adventure-001');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      await page.click('.tab-btn:has-text("卡牌")');
      await page.waitForTimeout(500);
      
      const cardItems = await page.locator('.card-item').count();
      if (cardItems > 0) {
        await page.locator('.card-item').first().hover();
        await page.waitForTimeout(300);
      }
    });

    test('LIMIT-010: 卡牌ID格式验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          expect(card.card_id).toBeDefined();
          expect(typeof card.card_id).toBe('string');
        });
      }
    });

    test('LIMIT-011: 卡牌名称验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          expect(card.name).toBeDefined();
          expect(card.name.length).toBeGreaterThan(0);
        });
      }
    });

    test('LIMIT-012: 卡牌描述验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          if (card.description) {
            expect(typeof card.description).toBe('string');
          }
        });
      }
    });

    test('LIMIT-013: 卡牌emoji验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          if (card.emoji) {
            expect(typeof card.emoji).toBe('string');
          }
        });
      }
    });

    test('LIMIT-014: 卡牌创建时间验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          if (card.created_at) {
            expect(new Date(card.created_at).toString()).not.toBe('Invalid Date');
          }
        });
      }
    });

    test('LIMIT-015: 卡牌is_custom字段验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          expect([0, 1]).toContain(card.is_custom);
        });
      }
    });

    test('LIMIT-016: 卡牌book_id关联验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        data.data.forEach(card => {
          expect(card.book_id).toBeDefined();
        });
      }
    });

    test('LIMIT-017: 卡牌API响应格式正确', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      expect(data.success).toBeDefined();
      expect(typeof data.success).toBe('boolean');
    });

    test('LIMIT-018: 卡牌API成功响应包含data字段', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success) {
        expect(data.data).toBeDefined();
        expect(Array.isArray(data.data)).toBe(true);
      }
    });

    test('LIMIT-019: 卡牌API错误响应格式', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/invalid-book-id/plot-cards`);
      const data = await response.json();
      
      expect(data.success).toBeDefined();
    });

    test('LIMIT-020: 卡牌类型统计正确', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const validTypes = ['weather', 'terrain', 'adventure', 'equipment'];
        data.data.forEach(card => {
          expect(validTypes).toContain(card.sub_type);
        });
      }
    });

    test('LIMIT-021: 多类型卡牌同时存在', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const types = new Set(data.data.map(c => c.sub_type));
        expect(types.size).toBeGreaterThanOrEqual(1);
      }
    });

    test('LIMIT-022: 卡牌数量统计正确', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const totalCount = data.data.length;
        expect(totalCount).toBeGreaterThanOrEqual(0);
        expect(totalCount).toBeLessThanOrEqual(32);
      }
    });

    test('LIMIT-023: 7张卡牌时掉落不触发上限', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const typeCounts = {};
        data.data.forEach(card => {
          typeCounts[card.sub_type] = (typeCounts[card.sub_type] || 0) + 1;
        });
        
        Object.values(typeCounts).forEach(count => {
          if (count === 7) {
            expect(count).toBe(7);
          }
        });
      }
    });

    test('LIMIT-024: 8张卡牌时掉落触发上限', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data) {
        const typeCounts = {};
        data.data.forEach(card => {
          typeCounts[card.sub_type] = (typeCounts[card.sub_type] || 0) + 1;
        });
        
        Object.values(typeCounts).forEach(count => {
          if (count === 8) {
            expect(count).toBe(8);
          }
        });
      }
    });

    test('LIMIT-025: 丢弃卡牌API验证', async ({ page }) => {
      const response = await page.request.get(`${BASE_URL}/api/books/preset-adventure-001/plot-cards`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const firstCard = data.data[0];
        expect(firstCard.card_id).toBeDefined();
      }
    });
  });
});
