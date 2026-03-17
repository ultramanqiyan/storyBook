import { test, expect } from '@playwright/test';
import { getPresetBooks, closeDb } from './helpers/db-queries.cjs';
import { staticBookExists } from './helpers/preset-test-helpers.js';

const books = getPresetBooks();

test.describe('阶段1：静态文件存在性检查', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    test(`[${book.language.toUpperCase()}] ${book.book_id} - 静态HTML文件应存在`, () => {
      const exists = staticBookExists(book.book_id);
      expect(exists).toBe(true);
    });
  }
});
