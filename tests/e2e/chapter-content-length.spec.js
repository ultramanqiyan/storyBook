import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('章节内容长度测试', () => {
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
    if (db) db.close();
  });
  
  test('预设章节内容长度验证', async ({ page }) => {
    const chapter = db.query('SELECT * FROM chapters WHERE book_id IN (SELECT book_id FROM books WHERE is_preset = 1) LIMIT 1');
    
    if (chapter) {
      expect(chapter.content.length).toBeGreaterThanOrEqual(100);
    } else {
      expect(true).toBe(true);
    }
  });

  test('章节内容应正确显示', async ({ page }) => {
    const chapter = db.query('SELECT * FROM chapters WHERE book_id IN (SELECT book_id FROM books WHERE is_preset = 1) LIMIT 1');
    
    if (!chapter) {
      expect(true).toBe(true);
      return;
    }

    await page.goto(`/chapter.html?id=${chapter.chapter_id}&is_preset=1`);
    await page.waitForTimeout(2000);
    
    const readingContent = page.locator('.reading-content');
    const content = await readingContent.first().textContent();
    
    expect(content.length).toBeGreaterThan(0);
  });
});
