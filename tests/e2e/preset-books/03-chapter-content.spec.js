import { test, expect } from '@playwright/test';
import { getPresetBooks, getChapters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();

test.describe('阶段3：章节内容验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    const chapters = getChapters(book.book_id);
    
    if (chapters.length === 0) {
      test(`[${book.language.toUpperCase()}] ${book.book_id} - 无章节数据`, () => {
        expect(chapters.length).toBeGreaterThan(0);
      });
      continue;
    }

    const firstChapter = chapters[0];
    const lastChapter = chapters[chapters.length - 1];
    const middleIndex = Math.floor(chapters.length / 2);
    const middleChapter = chapters[middleIndex];

    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test('第一章页面应加载成功', async ({ page }) => {
        await page.goto(`/chapter.html?id=${firstChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        await expect(page.locator('.book-container, .chapter-container, .page-content')).toBeVisible();
      });

      test('第一章内容不应为空', async ({ page }) => {
        await page.goto(`/chapter.html?id=${firstChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        
        const content = await page.locator('.page-text, .chapter-content, .left-page .right-page').first().textContent();
        expect(content.trim().length).toBeGreaterThan(100);
      });

      test('中间章节内容不应为空', async ({ page }) => {
        await page.goto(`/chapter.html?id=${middleChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        
        const content = await page.locator('.page-text, .chapter-content, .left-page .right-page').first().textContent();
        expect(content.trim().length).toBeGreaterThan(100);
      });

      test('最后一章内容不应为空', async ({ page }) => {
        await page.goto(`/chapter.html?id=${lastChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        
        const content = await page.locator('.page-text, .chapter-content, .left-page .right-page').first().textContent();
        expect(content.trim().length).toBeGreaterThan(100);
      });

      test('章节标题应正确显示', async ({ page }) => {
        await page.goto(`/chapter.html?id=${firstChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        
        const titleElement = page.locator('.chapter-title, h1, .page-title').first();
        const title = await titleElement.textContent();
        expect(title.trim().length).toBeGreaterThan(0);
      });
    });
  }
});
