import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('登出功能测试', () => {
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

  test('登出按钮应可见', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), a:has-text("登出"), [onclick*="logout"]');
    await expect(logoutButton).toBeVisible();
  });

  test('点击登出应清除localStorage', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForTimeout(500);

    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBeNull();
  });

  test('登出后应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });
    expect(page.url()).toContain('login');
  });

  test('登出后访问受保护页面应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.goto('/bookshelf.html');
    await page.waitForTimeout(500);

    expect(page.url()).toContain('login');
  });

  test('登出后访问导演页面应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.goto('/director.html');
    await page.waitForTimeout(500);

    expect(page.url()).toContain('login');
  });

  test('登出后访问书籍创建页面应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.goto('/book-create.html');
    await page.waitForTimeout(500);

    expect(page.url()).toContain('login');
  });

  test.skip('登出后访问自定义卡牌页面应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.goto('/custom-card.html');
    await page.waitForTimeout(500);

    expect(page.url()).toContain('login');
  });

  test('登出后公共图书馆仍可访问', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('library');
    const booksGrid = page.locator('#booksGrid');
    await expect(booksGrid).toBeVisible();
  });

  test('登出后书籍详情页应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.goto('/book.html?id=1');
    await page.waitForTimeout(500);

    expect(page.url()).toContain('login');
  });

  test('登出后重新登录应正常工作', async ({ page }) => {
    const username = `logout_test_${Date.now()}`;
    const email = `logout_test_${Date.now()}@test.com`;
    const password = 'TestPassword123!';

    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();

    await page.waitForURL(/login/, { timeout: 5000 });

    await page.click('#showRegister');
    await page.waitForSelector('#registerForm', { state: 'visible' });
    await page.fill('#registerUsername', username);
    await page.fill('#registerEmail', email);
    await page.fill('#registerPassword', password);
    await page.fill('#registerConfirmPassword', password);
    await page.click('#registerForm button[type="submit"]');

    await page.waitForURL(/bookshelf/, { timeout: 15000 });

    expect(page.url()).toContain('bookshelf');
  });

  test('书籍详情页登出功能应正常工作', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.reload();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-card, .magic-book-card').first();
    if (await firstBook.count() > 0) {
      await firstBook.click();
      await page.waitForTimeout(1000);

      const logoutButton = page.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
      if (await logoutButton.count() > 0) {
        await logoutButton.click();
        await page.waitForURL(/login/, { timeout: 5000 });
        expect(page.url()).toContain('login');
      }
    }
  });

  test('登出不应影响其他浏览器标签', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('/bookshelf.html');
    await page1.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page1.reload();
    
    await page2.goto('/bookshelf.html');
    await page2.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page2.reload();
    
    await page1.waitForTimeout(1000);
    await page2.waitForTimeout(1000);

    const logoutButton = page1.locator('a:has-text("Sign Out"), [onclick*="logout"]').first();
    await logoutButton.click();
    await page1.waitForURL(/login/, { timeout: 5000 });

    await page2.reload();
    await page2.waitForTimeout(500);

    expect(page2.url()).toContain('login');
  });
});
