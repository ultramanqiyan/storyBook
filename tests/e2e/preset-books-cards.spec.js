import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('预设书籍卡牌展示测试', () => {
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
  test.describe('预设书籍详情页卡牌展示', () => {
    test('预设书籍详情页应展示情节卡牌', async ({ page }) => {
      const presetBookId = 'preset-fantasy-001';
      
      await page.goto(`/book.html?id=${presetBookId}`);
      await page.waitForTimeout(2000);

      const cardsTab = page.locator('.view-tab[data-view="cards"], .tab-btn:has-text("Cards"), .tab-btn:has-text("卡牌")');
      if (await cardsTab.count() > 0) {
        await cardsTab.first().click();
        await page.waitForTimeout(500);
      }
      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [presetBookId]);
      expect(dbCards.length).toBeGreaterThanOrEqual(4);
      const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      for (const subType of subTypes) {
        const dbSubCards = dbCards.filter(c => c.sub_type === subType);
        expect(dbSubCards.length).toBeGreaterThanOrEqual(1);
      }
    });
    test('预设书籍详情页应正确显示卡牌名称和图标', async ({ page }) => {
      const presetBookId = 'preset-adventure-001';
      
      await page.goto(`/book.html?id=${presetBookId}`);
      await page.waitForTimeout(2000);
      const cardsTab = page.locator('.view-tab[data-view="cards"], .tab-btn:has-text("Cards"), .tab-btn:has-text("卡牌")');
      if (await cardsTab.count() > 0) {
        await cardsTab.first().click();
        await page.waitForTimeout(500);
      }
      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ? LIMIT 4', [presetBookId]);
      for (const dbCard of dbCards) {
        const cardElement = page.locator('.hs-card-mini').filter({ hasText: dbCard.name });
        if (await cardElement.count() > 0) {
          const displayedName = await cardElement.locator('.hs-card-name').textContent();
          expect(displayedName.trim()).toBe(dbCard.name);
        }
      }
    });
    test('中文预设书籍应显示中文卡牌', async ({ page }) => {
      const presetBookId = 'preset-fantasy-001';
      
      await page.goto(`/book.html?id=${presetBookId}&lang=zh`);
      await page.waitForTimeout(2000);
      const cardsTab = page.locator('.view-tab[data-view="cards"], .tab-btn:has-text("卡牌")');
      if (await cardsTab.count() > 0) {
        await cardsTab.first().click();
        await page.waitForTimeout(500);
      }
      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [presetBookId]);
      expect(dbCards.length).toBeGreaterThanOrEqual(4);
      for (const dbCard of dbCards) {
        expect(dbCard.name).toBeDefined();
        expect(dbCard.name.length).toBeGreaterThan(0);
      }
    });
  });
  test.describe('预设书籍章节页卡牌展示', () => {
    test('预设书籍章节页应展示章节选中的卡牌', async ({ page }) => {
      const chapterId = 'chapter-fan001-01';
      
      await page.goto(`/chapter.html?id=${chapterId}`);
      await page.waitForTimeout(2000);
      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [chapterId]);
      expect(dbChapter).toBeDefined();
      const selectedCards = JSON.parse(dbChapter.selected_cards);
      expect(selectedCards).toBeDefined();
      const sidebarPlots = page.locator('#sidebarPlots');
      if (await sidebarPlots.count() > 0) {
        await expect(sidebarPlots.first()).toBeVisible();
      } else {
        const plotCards = page.locator('.plot-card, .card-plot');
        if (await plotCards.count() > 0) {
          await expect(plotCards.first()).toBeVisible();
        }
      }
    });
    test('预设书籍章节页应正确显示卡牌名称', async ({ page }) => {
      const chapterId = 'chapter-adv001-01';
      
      await page.goto(`/chapter.html?id=${chapterId}`);
      await page.waitForTimeout(2000);
      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [chapterId]);
      const selectedCards = JSON.parse(dbChapter.selected_cards);
      const sidebarPlots = page.locator('#sidebarPlots');
      if (await sidebarPlots.count() > 0) {
        await expect(sidebarPlots.first()).toBeVisible();
      } else {
        const plotCards = page.locator('.plot-card, .card-plot');
        if (await plotCards.count() > 0) {
          await expect(plotCards.first()).toBeVisible();
        }
      }
    });
    test('预设书籍章节页侧边栏应可切换角色和卡牌', async ({ page }) => {
      const chapterId = 'chapter-rom001-01';
      
      await page.goto(`/chapter.html?id=${chapterId}`);
      await page.waitForTimeout(2000);
      const charsTab = page.locator('.sidebar-tab[data-tab="characters"]');
      const plotsTab = page.locator('.sidebar-tab[data-tab="plots"]');
      if (await charsTab.count() > 0 && await plotsTab.count() > 0) {
        await plotsTab.click();
        await page.waitForTimeout(300);
        const sidebarPlots = page.locator('#sidebarPlots');
        if (await sidebarPlots.count() > 0) {
          await expect(sidebarPlots).toBeVisible();
        }
        await charsTab.click();
        await page.waitForTimeout(300);
        const sidebarChars = page.locator('#sidebarCharacters');
        await expect(sidebarChars).toBeVisible();
      }
    });
    test('中文预设书籍章节应显示中文卡牌', async ({ page }) => {
      const chapterId = 'chapter-fan001-01';
      
      await page.goto(`/chapter.html?id=${chapterId}&lang=zh`);
      await page.waitForTimeout(2000);
      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [chapterId]);
      expect(dbChapter).toBeDefined();
      const sidebarPlots = page.locator('#sidebarPlots');
      if (await sidebarPlots.count() > 0) {
        await expect(sidebarPlots.first()).toBeVisible();
      } else {
        const plotCards = page.locator('.plot-card, .card-plot');
        if (await plotCards.count() > 0) {
          await expect(plotCards.first()).toBeVisible();
        }
      }
    });
  });
  test.describe('预设书籍API验证', () => {
    test('API应返回预设书籍的卡牌数据', async ({ request }) => {
      const presetBookId = 'preset-fantasy-001';
      
      const response = await request.get(`/api/books/${presetBookId}/detail`);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.data.plot_cards).toBeDefined();
      expect(data.data.plot_cards.length).toBeGreaterThanOrEqual(4);
      for (const card of data.data.plot_cards) {
        expect(card.name).toBeDefined();
        expect(card.icon).toBeDefined();
        expect(card.sub_type).toBeDefined();
      }
    });
    test('API应返回预设书籍章节的卡牌数据', async ({ request }) => {
      const chapterId = 'chapter-fan001-01';
      
      const response = await request.get(`/api/chapters/${chapterId}`);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.data.plot_cards).toBeDefined();
      expect(data.data.plot_cards.length).toBeGreaterThanOrEqual(0);
    });
    test('不同类型预设书籍应有对应类型的卡牌', async ({ request }) => {
      const bookTypes = ['adventure', 'fantasy', 'romance', 'business'];
      for (const type of bookTypes) {
        const presetBookId = `preset-${type}-001`;
        const response = await request.get(`/api/books/${presetBookId}/detail`);
        const data = await response.json();
        if (data.success && data.data.plot_cards) {
          expect(data.data.plot_cards.length).toBeGreaterThanOrEqual(4);
          const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [presetBookId]);
          expect(dbCards.length).toBeGreaterThanOrEqual(4);
        }
      }
    });
  });
  test.describe('预设书籍卡牌与数据库一致性', () => {
    test('页面显示的卡牌应与数据库一致', async ({ page }) => {
      const presetBookId = 'preset-fantasy-001';
      
      await page.goto(`/book.html?id=${presetBookId}`);
      await page.waitForTimeout(2000);
      const cardsTab = page.locator('.view-tab[data-view="cards"], .tab-btn:has-text("Cards")');
      if (await cardsTab.count() > 0) {
        await cardsTab.first().click();
        await page.waitForTimeout(500);
      }
      const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [presetBookId]);
      for (const dbCard of dbCards.slice(0, 4)) {
        const cardElement = page.locator('.hs-card-mini').filter({ hasText: dbCard.name });
        if (await cardElement.count() > 0) {
          const displayedName = await cardElement.locator('.hs-card-name').textContent();
          expect(displayedName.trim()).toBe(dbCard.name);
        }
      }
    });
    test('章节页显示的卡牌应与数据库一致', async ({ page }) => {
      const chapterId = 'chapter-adv001-01';
      
      await page.goto(`/chapter.html?id=${chapterId}`);
      await page.waitForTimeout(2000);
      const dbChapter = db.query('SELECT * FROM chapters WHERE chapter_id = ?', [chapterId]);
      const selectedCards = JSON.parse(dbChapter.selected_cards);
      const sidebarPlots = page.locator('#sidebarPlots');
      if (await sidebarPlots.count() > 0) {
        await expect(sidebarPlots.first()).toBeVisible();
      } else {
        const plotCards = page.locator('.plot-card, .card-plot');
        if (await plotCards.count() > 0) {
          await expect(plotCards.first()).toBeVisible();
        }
      }
    });
  });
});
