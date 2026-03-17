import { test, expect } from '@playwright/test';
import { getPresetBooks, getCharacters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();

test.describe('阶段4：角色卡牌验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    const dbCharacters = getCharacters(book.book_id);

    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        const characterTab = page.locator('.view-tab:has-text("角色"), .view-tab:has-text("Characters")');
        if (await characterTab.count() > 0) {
          await characterTab.click();
          await page.waitForTimeout(500);
        }
      });

      test('角色数量应正确', async ({ page }) => {
        const pageCharacters = await page.locator('.hs-card-mini, .character-card').count();
        expect(pageCharacters).toBe(dbCharacters.length);
      });

      test('应有且仅有一个主角', async () => {
        const protagonists = dbCharacters.filter(c => c.is_protagonist === 1);
        expect(protagonists.length).toBe(1);
      });

      test('角色名称应正确', async ({ page }) => {
        for (const char of dbCharacters) {
          const card = page.locator('.hs-card-mini, .character-card').filter({ hasText: char.name });
          if (await card.count() > 0) {
            const name = await card.locator('.hs-card-name, .card-name, [class*="name"]').first().textContent();
            expect(name.trim()).toContain(char.name);
          }
        }
      });

      test('角色emoji应正确', async ({ page }) => {
        for (const char of dbCharacters) {
          const card = page.locator('.hs-card-mini, .character-card').filter({ hasText: char.name });
          if (await card.count() > 0) {
            const emojiElement = card.locator('div[style*="font-size"]').first();
            if (await emojiElement.count() > 0) {
              const emoji = await emojiElement.textContent();
              expect(emoji.trim()).toBe(char.avatar);
            }
          }
        }
      });

      test('主角应有特殊标识', async ({ page }) => {
        const protagonist = dbCharacters.find(c => c.is_protagonist === 1);
        if (protagonist) {
          const card = page.locator('.hs-card-mini, .character-card').filter({ hasText: protagonist.name });
          if (await card.count() > 0) {
            const protagonistBadge = card.locator('.protagonist-badge, [class*="protagonist"], [class*="star"]');
            const hasProtagonistMark = await protagonistBadge.count() > 0;
            expect(hasProtagonistMark).toBe(true);
          }
        }
      });
    });
  }
});
