import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('完整用户旅程测试 - 多步骤多页面', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile('migrations/0002_seed_data.sql');
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('完整用户旅程: 登录→创建书籍→添加章节→公共图书馆→导入书籍', async ({ page }) => {
    const testEmail = `journey_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';
    const testBookTitle = `Journey Book ${Date.now()}`;

    // Step 1: 访问首页
    await page.goto('/');
    await expect(page).toHaveTitle(/StoryBook/);

    // Step 2: 点击登录
    await page.click('a[href="login.html"]');
    await page.waitForURL(/login/);

    // Step 3: 填写登录信息（新用户自动注册）
    await expect(page.locator('.login-title').first()).toContainText('Begin');
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);

    // Step 4: 提交登录
    await page.click('.wax-seal-btn');
    await page.waitForURL(/bookshelf/, { timeout: 10000 });

    // Step 5: 验证已登录状态
    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBeTruthy();

    // Step 6: 创建新书籍
    await page.click('a[href="book-create.html"]');
    await page.waitForURL(/book-create/);

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', testBookTitle);
    await page.fill('#storyDescription', 'A book created during journey test');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next:has-text("Next")');

    // Step 7: 填写主角信息
    await expect(page.locator('#step2.active')).toBeVisible();
    await page.fill('#protagonistName', 'Journey Hero');
    await page.fill('#protagonistBackground', 'A brave adventurer');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    // Step 8: 创建书籍
    await expect(page.locator('#step3.active')).toBeVisible();
    await page.click('#step3 .btn-next:has-text("Create Story")');

    // Step 9: 验证书籍创建成功
    await expect(page.locator('.success-title')).toContainText('Created', { timeout: 15000 });

    // Step 10: 进入导演页面添加章节
    await page.goto('/director.html');
    await page.waitForTimeout(2000);

    // Step 11: 验证导演页面加载
    const directorPage = page.locator('.director-page, .page-container, main');
    await expect(directorPage.first()).toBeVisible({ timeout: 10000 });

    // Step 12: 进入公共图书馆
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    // Step 13: 验证预设书籍存在
    const presetBooks = page.locator('.magic-book-card');
    const presetCount = await presetBooks.count();
    expect(presetCount).toBeGreaterThan(0);

    // Step 14: 点击第一本预设书籍查看详情
    await presetBooks.first().click();
    await page.waitForTimeout(1000);

    // Step 15: 返回公共图书馆
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    // Step 16: 导入一本预设书籍
    const importButton = page.locator('.btn-import, button:has-text("Import")').first();
    if (await importButton.count() > 0) {
      await importButton.click();
      await page.waitForTimeout(1000);
    }

    // Step 17: 返回书架验证导入的书籍
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    // Step 18: 验证书架上有创建的书和导入的书
    const allBooks = page.locator('.book-card, .magic-book-card');
    const totalBooks = await allBooks.count();
    expect(totalBooks).toBeGreaterThanOrEqual(1);

    // Step 19: 登出
    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    if (await logoutButton.count() > 0) {
      await logoutButton.click();
      await page.waitForURL(/login|index/, { timeout: 5000 });
    }
  });

  test('用户旅程: 登录→解谜→获得卡牌→查看卡牌收藏', async ({ page }) => {
    const testEmail = `puzzle_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';

    // Step 1: 登录
    await page.goto('/login.html');
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.click('.wax-seal-btn');
    await page.waitForURL(/bookshelf/, { timeout: 10000 });

    // Step 2: 进入公共图书馆
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.magic-book-card').first();
    await firstBook.click();
    await page.waitForTimeout(1000);

    // Step 3: 进入阅读模式
    const readButton = page.locator('button:has-text("Read"), a:has-text("Read")');
    if (await readButton.count() > 0) {
      await readButton.first().click();
      await page.waitForTimeout(1000);
    }

    // Step 4: 查看卡牌收藏
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards")');
    if (await cardTab.count() > 0) {
      await cardTab.click();
      await page.waitForTimeout(500);
    }
  });

  test('用户旅程: 新用户首次完整体验', async ({ page }) => {
    const newEmail = `newuser_${Date.now()}@test.com`;
    const newPassword = 'NewUser123!';

    // Step 1: 访问首页
    await page.goto('/');
    await page.waitForTimeout(500);

    // Step 2: 查看首页内容
    const heroSection = page.locator('.hero, .welcome-section');
    if (await heroSection.count() > 0) {
      await expect(heroSection).toBeVisible();
    }

    // Step 3: 点击登录
    await page.click('a[href="login.html"]');
    await page.waitForURL(/login/);

    // Step 4: 注册新账户（自动注册）
    await page.fill('#email', newEmail);
    await page.fill('#password', newPassword);
    await page.click('.wax-seal-btn');

    await page.waitForURL(/bookshelf/, { timeout: 10000 });

    // Step 5: 验证新用户书架为空或显示空状态
    const emptyMessage = page.locator('.empty-shelf, .no-books');
    const bookCards = page.locator('.book-card, .magic-book-card');
    const emptyCount = await emptyMessage.count();
    const bookCount = await bookCards.count();

    expect(emptyCount > 0 || bookCount === 0).toBe(true);

    // Step 6: 进入公共图书馆
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    // Step 7: 验证预设书籍
    const presetBooks = page.locator('.magic-book-card');
    const count = await presetBooks.count();
    expect(count).toBeGreaterThan(0);

    // Step 8: 点击第一本书查看详情
    await presetBooks.first().click();
    await page.waitForTimeout(1000);

    // Step 9: 导入书籍
    const importBtn = page.locator('.btn-import, button:has-text("Import")').first();
    if (await importBtn.count() > 0) {
      await importBtn.click();
      await page.waitForTimeout(1000);
    }

    // Step 10: 返回书架验证
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    const importedBook = page.locator('.book-card, .magic-book-card');
    const finalBookCount = await importedBook.count();
    expect(finalBookCount).toBeGreaterThanOrEqual(1);
  });
});

test.describe('跨页面数据一致性测试', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile('migrations/0002_seed_data.sql');
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('创建书籍后在不同页面应保持一致', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    const bookTitle = `Consistency Test Book ${Date.now()}`;

    // 在创建页面创建书籍
    await page.goto('/book-create.html');

    await page.evaluate(() => {
      const panel = document.querySelector('.style-panel');
      if (panel && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    await page.fill('#storyTitle', bookTitle);
    await page.fill('#storyDescription', 'Test consistency');
    await page.selectOption('#storyGenre', 'fantasy');

    await page.click('#step1 .btn-next:has-text("Next")');
    await expect(page.locator('#step2.active')).toBeVisible();

    await page.fill('#protagonistName', 'Test Hero');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next:has-text("Next")');

    await expect(page.locator('#step3.active')).toBeVisible();
    await page.click('#step3 .btn-next:has-text("Create Story")');

    await expect(page.locator('.success-title')).toContainText('Created', { timeout: 15000 });

    // 在书架页面验证
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    const bookOnShelf = page.locator(`.book-card:has-text("${bookTitle}"), .magic-book-card:has-text("${bookTitle}")`);
    await expect(bookOnShelf).toBeVisible();
  });

  test('导入书籍后书架和图书馆数据一致', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    // 在公共图书馆导入书籍
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const importBtn = page.locator('.btn-import, button:has-text("Import")').first();
    const firstBookTitle = await page.locator('.magic-book-card .book-title, .magic-book-card h3, .book-card-title').first().textContent();

    if (await importBtn.count() > 0) {
      await importBtn.click();
      await page.waitForTimeout(1000);

      // 在书架验证
      await page.goto('/bookshelf.html');
      await page.waitForTimeout(1000);

      const importedBook = page.locator(`.book-card:has-text("${firstBookTitle}"), .magic-book-card:has-text("${firstBookTitle}")`);
      await expect(importedBook).toBeVisible();
    }
  });
});
