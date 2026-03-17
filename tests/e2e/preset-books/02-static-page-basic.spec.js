import { test, expect } from '@playwright/test';
import { getPresetBooks, getChapters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();

test.describe('阶段2：静态页面基础验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
      });

      test('页面应加载成功', async ({ page }) => {
        await expect(page.locator('.book-container')).toBeVisible();
      });

      test('书籍标题应正确', async ({ page }) => {
        const title = await page.locator('.book-meta-info h2').textContent();
        expect(title.trim()).toBe(book.title);
      });

      test('类型标签应正确显示', async ({ page }) => {
        const typeBadge = page.locator('.type-badge');
        await expect(typeBadge).toBeVisible();
      });

      test('章节目录数量应正确', async ({ page }) => {
        const dbChapters = getChapters(book.book_id);
        const pageChapters = await page.locator('.chapter-toc-item').count();
        expect(pageChapters).toBe(dbChapters.length);
      });

      test('章节编号应正确显示', async ({ page }) => {
        const chapterItems = await page.locator('.chapter-toc-item .chapter-number').allTextContents();
        const isZh = book.language === 'zh';
        const expectedPrefix = isZh ? '第' : 'Ch.';
        
        if (chapterItems.length > 0) {
          expect(chapterItems[0]).toContain(expectedPrefix);
        }
      });
    });
  }
});
