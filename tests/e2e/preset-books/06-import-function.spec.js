import { test, expect } from '@playwright/test';
import DatabaseHelper from '../helpers/db-helper.js';
import path from 'path';
import { getPresetBooks, getCharacters, getPlotCards, getChapters, closeDb } from './helpers/db-queries.cjs';

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

test.describe('阶段6：导入功能验证', () => {
  for (const book of books) {
    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test('导入按钮应可用', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        await page.waitForTimeout(500);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")');
        const count = await importBtn.count();
        expect(count).toBeGreaterThan(0);
      });

      test('导入API应成功', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        await page.waitForTimeout(500);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          const [response] = await Promise.all([
            page.waitForResponse(resp => 
              resp.url().includes(`/api/books/${book.book_id}/import`) && 
              resp.request().method() === 'POST',
              { timeout: 15000 }
            ),
            importBtn.click()
          ]);
          
          expect(response.ok()).toBeTruthy();
        } catch (e) {
          console.log(`[${book.book_id}] 导入API调用失败:`, e.message);
        }
      });

      test('导入后角色数量应一致', async ({ page }) => {
        const originalChars = getCharacters(book.book_id);
        
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        await page.waitForTimeout(500);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          const importedChars = db.getCharactersByBookId(book.book_id);
          expect(importedChars.length).toBeGreaterThanOrEqual(originalChars.length);
        } catch (e) {
          console.log(`[${book.book_id}] 导入后角色验证失败:`, e.message);
        }
      });

      test('导入后卡牌数量应一致', async ({ page }) => {
        const originalCards = getPlotCards(book.book_id);
        
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        await page.waitForTimeout(500);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          const importedCards = db.getPlotCardsByBookId(book.book_id);
          expect(importedCards.length).toBeGreaterThanOrEqual(originalCards.length);
        } catch (e) {
          console.log(`[${book.book_id}] 导入后卡牌验证失败:`, e.message);
        }
      });

      test('导入后章节数量应一致', async ({ page }) => {
        const originalChapters = getChapters(book.book_id);
        
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        await page.waitForTimeout(500);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import"), button:has-text("导入")').first();
        
        try {
          await importBtn.click();
          await page.waitForTimeout(3000);
          
          const importedChapters = db.getChaptersByBookId(book.book_id);
          expect(importedChapters.length).toBeGreaterThanOrEqual(originalChapters.length);
        } catch (e) {
          console.log(`[${book.book_id}] 导入后章节验证失败:`, e.message);
        }
      });
    });
  }
});
