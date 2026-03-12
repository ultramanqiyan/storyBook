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

  test('创建书籍并验证数据库', async ({ page, request }) => {
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

    const viewStoryLink = page.locator('.success-content a:has-text("View Story")');
    await expect(viewStoryLink).toBeVisible();
    
    const bookHref = await viewStoryLink.getAttribute('href');
    expect(bookHref).toMatch(/book\.html\?id=/);
    
    const bookId = bookHref.split('id=')[1];
    expect(bookId).toBeDefined();

    const booksResponse = await request.get(`/api/books/${bookId}`);
    const booksData = await booksResponse.json();
    expect(booksData.success).toBe(true);
    expect(booksData.data.title).toBe(testBookTitle);
    expect(booksData.data.type).toBe('adventure');
    expect(booksData.data.user_id).toBe(testUserId);

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    expect(charsData.success).toBe(true);
    
    const protagonist = charsData.data.find(c => c.is_protagonist === 1);
    expect(protagonist).toBeDefined();
    expect(protagonist.name).toBe(protagonistName);

    const supporting = charsData.data.filter(c => c.is_protagonist === 0);
    expect(supporting.length).toBe(1);
    expect(supporting[0].name).toBe(companionName);

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    expect(cardsData.success).toBe(true);
    expect(cardsData.data.length).toBeGreaterThan(0);

    const weatherCards = cardsData.data.filter(c => c.sub_type === 'weather');
    expect(weatherCards.length).toBe(4);

    const terrainCards = cardsData.data.filter(c => c.sub_type === 'terrain');
    expect(terrainCards.length).toBe(4);

    const adventureCards = cardsData.data.filter(c => c.sub_type === 'adventure');
    expect(adventureCards.length).toBe(4);

    const equipmentCards = cardsData.data.filter(c => c.sub_type === 'equipment');
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

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await page.waitForTimeout(2000);

    await expect(page.locator('.success-title')).not.toBeVisible();
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

    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();

    await page.click('#step3 .btn-next:has-text("Create Story")');

    await page.waitForTimeout(2000);

    await expect(page.locator('.success-title')).not.toBeVisible();
  });
});
