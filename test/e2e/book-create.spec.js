import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('书籍创建流程', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('创建书籍并验证数据库', async ({ page }) => {
    const testUserId = db.getTestUserId();
    const testBookTitle = `测试书籍_${Date.now()}`;
    const protagonistName = '测试主角';
    const companionName = '测试配角';

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await expect(page.locator('.create-header h1')).toContainText('Create New Story');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', testBookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', protagonistName);
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    const companionInput = page.locator('#companion1 .form-input');
    await companionInput.fill(companionName);
    await page.locator('#companion1Avatars .avatar-option').first().click();
    await page.click('#step3 .btn-next:has-text("Create Story")');

    await expect(page.locator('.success-title')).toContainText('Story Created', { timeout: 15000 });

    const books = db.getBooksByTitle(testBookTitle);
    expect(books.length).toBe(1);
    expect(books[0].title).toBe(testBookTitle);
    expect(books[0].type).toBe('adventure');
    expect(books[0].user_id).toBe(testUserId);
    expect(books[0].is_preset).toBe(0);

    const bookId = books[0].book_id;

    const protagonist = db.getProtagonistByBookId(bookId);
    expect(protagonist).toBeDefined();
    expect(protagonist.name).toBe(protagonistName);
    expect(protagonist.is_protagonist).toBe(1);

    const supporting = db.getSupportingByBookId(bookId);
    expect(supporting.length).toBe(1);
    expect(supporting[0].name).toBe(companionName);
    expect(supporting[0].is_protagonist).toBe(0);

    const plotCards = db.getPlotCardsByBookId(bookId);
    expect(plotCards.length).toBeGreaterThan(0);

    const weatherCards = db.getPlotCardsBySubType(bookId, 'weather');
    expect(weatherCards.length).toBe(4);

    const terrainCards = db.getPlotCardsBySubType(bookId, 'terrain');
    expect(terrainCards.length).toBe(4);

    const adventureCards = db.getPlotCardsBySubType(bookId, 'adventure');
    expect(adventureCards.length).toBe(4);

    const equipmentCards = db.getPlotCardsBySubType(bookId, 'equipment');
    expect(equipmentCards.length).toBe(4);
  });

  test('创建书籍不填写标题应失败', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step1.active')).toBeVisible();
  });

  test('创建书籍不选择类型应失败', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', '测试书籍');
    await page.click('#step1 .btn-next:has-text("Next")');

    await expect(page.locator('#step1.active')).toBeVisible();
  });
});
