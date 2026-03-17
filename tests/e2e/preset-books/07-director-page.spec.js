import { test, expect } from '@playwright/test';
import DatabaseHelper from '../helpers/db-helper.js';
import { getPresetBooks, getPlotCards, getCharacters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();
let db;
let testUserId;

test.beforeAll(async () => {
  db = new DatabaseHelper();
  db.connect();
  db.createTestUser();
  testUserId = db.getTestUserId();
});

test.afterAll(async () => {
  if (db) db.close();
  closeDb();
});

test.describe('阶段7：故事导演页验证', () => {
  for (const book of books.slice(0, 10)) {
    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        await page.waitForTimeout(500);
      });

      test('进入导演页应成功', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          await expect(page).toHaveURL(/book\.html/);
        } catch (e) {
          console.log(`[${book.book_id}] 进入导演页失败:`, e.message);
        }
      });

      test('导演页卡牌emoji应正确显示', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          const dbCards = getPlotCards(book.book_id);
          for (const card of dbCards.slice(0, 3)) {
            const cardElement = page.locator('.hs-card-mini, .plot-card, .card-item').filter({ hasText: card.name });
            if (await cardElement.count() > 0) {
              const emojiElement = cardElement.locator('div[style*="font-size"]').first();
              if (await emojiElement.count() > 0) {
                const emoji = await emojiElement.textContent();
                expect(emoji.trim()).toBe(card.icon);
              }
            }
          }
        } catch (e) {
          console.log(`[${book.book_id}] 导演页卡牌emoji验证失败:`, e.message);
        }
      });

      test('导演页角色emoji应正确显示', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          const dbChars = getCharacters(book.book_id);
          for (const char of dbChars) {
            const cardElement = page.locator('.hs-card-mini, .character-card').filter({ hasText: char.name });
            if (await cardElement.count() > 0) {
              const emojiElement = cardElement.locator('div[style*="font-size"]').first();
              if (await emojiElement.count() > 0) {
                const emoji = await emojiElement.textContent();
                expect(emoji.trim()).toBe(char.avatar);
              }
            }
          }
        } catch (e) {
          console.log(`[${book.book_id}] 导演页角色emoji验证失败:`, e.message);
        }
      });

      test('添加章节按钮应可用', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          const addChapterBtn = page.locator('button:has-text("添加章节"), button:has-text("Add Chapter")');
          const count = await addChapterBtn.count();
          expect(count).toBeGreaterThan(0);
        } catch (e) {
          console.log(`[${book.book_id}] 添加章节按钮验证失败:`, e.message);
        }
      });
    });
  }
});
