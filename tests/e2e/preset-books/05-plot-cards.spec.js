import { test, expect } from '@playwright/test';
import { getPresetBooks, getPlotCards, closeDb } from './helpers/db-queries.cjs';
import { loadPlotConfig, findCardInConfig } from './helpers/preset-test-helpers.js';

const books = getPresetBooks();
const config = loadPlotConfig();

test.describe('阶段5：情节卡牌验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    const dbCards = getPlotCards(book.book_id);

    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        const cardTab = page.locator('.view-tab:has-text("卡牌"), .view-tab:has-text("Cards")');
        if (await cardTab.count() > 0) {
          await cardTab.click();
          await page.waitForTimeout(500);
        }
      });

      test('情节卡牌数量应正确', async ({ page }) => {
        const validCards = dbCards.filter(c => ['weather', 'terrain', 'adventure', 'equipment'].includes(c.sub_type));
        const pageCards = await page.locator('.hs-card-mini, .plot-card, .card-item').count();
        expect(pageCards).toBeGreaterThanOrEqual(validCards.length);
      });

      test('卡牌类型应覆盖四种', async () => {
        const subTypes = [...new Set(dbCards.map(c => c.sub_type))];
        expect(subTypes).toContain('weather');
        expect(subTypes).toContain('terrain');
        expect(subTypes).toContain('adventure');
        expect(subTypes).toContain('equipment');
      });

      test('每张卡牌应在项目配置中存在', async () => {
        const missingCards = [];
        for (const card of dbCards) {
          const result = findCardInConfig(card.name, card.icon, book.type, book.language, config);
          if (!result.found) {
            missingCards.push({
              name: card.name,
              icon: card.icon,
              sub_type: card.sub_type
            });
          }
        }
        if (missingCards.length > 0) {
          console.log(`[${book.book_id}] 缺失卡牌配置:`, missingCards);
        }
        expect(missingCards).toEqual([]);
      });

      test('每张卡牌emoji应与项目配置一致', async () => {
        const mismatchedCards = [];
        for (const card of dbCards) {
          const result = findCardInConfig(card.name, card.icon, book.type, book.language, config);
          if (result.found && !result.iconMatch) {
            mismatchedCards.push({
              name: card.name,
              expected: result.expectedIcon,
              actual: result.actualIcon
            });
          }
        }
        if (mismatchedCards.length > 0) {
          console.log(`[${book.book_id}] Emoji不匹配卡牌:`, mismatchedCards);
        }
        expect(mismatchedCards).toEqual([]);
      });

      test('页面显示的卡牌emoji应正确', async ({ page }) => {
        for (const card of dbCards.slice(0, 5)) {
          const cardElement = page.locator('.hs-card-mini, .plot-card, .card-item').filter({ hasText: card.name });
          if (await cardElement.count() > 0) {
            const emojiElement = cardElement.locator('div[style*="font-size"]').first();
            if (await emojiElement.count() > 0) {
              const emoji = await emojiElement.textContent();
              expect(emoji.trim()).toBe(card.icon);
            }
          }
        }
      });

      test('卡牌详情弹窗应正确显示', async ({ page }) => {
        if (dbCards.length > 0) {
          const firstCard = dbCards[0];
          const cardElement = page.locator('.hs-card-mini, .plot-card, .card-item').filter({ hasText: firstCard.name });
          if (await cardElement.count() > 0) {
            await cardElement.click();
            await page.waitForTimeout(500);
            
            const modal = page.locator('.card-modal, .modal, .popup');
            if (await modal.count() > 0) {
              await expect(modal).toBeVisible();
            }
          }
        }
      });
    });
  }
});
