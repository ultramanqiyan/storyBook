import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('首页完整测试', () => {
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

  test('首页应正确加载', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    await expect(page).toHaveTitle(/StoryBook/);
  });

  test('首页应显示导航栏', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const nav = page.locator('nav, .navbar, .nav');
    await expect(nav).toBeVisible();
  });

  test('首页应显示登录和注册链接', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const loginLink = page.locator('a[href="login.html"], a:has-text("登录")');
    const registerLink = page.locator('a[href="login.html"], a:has-text("注册")');

    const loginCount = await loginLink.count();
    const registerCount = await registerLink.count();

    expect(loginCount + registerCount).toBeGreaterThan(0);
  });

  test('首页应显示功能介绍', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const features = page.locator('.feature, .feature-card, .intro-section, .features');
    const count = await features.count();
    expect(count).toBeGreaterThan(0);
  });

  test('首页点击登录应跳转到登录页', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const loginLink = page.locator('a[href="login.html"]').first();
    await loginLink.click();

    await page.waitForURL(/login/, { timeout: 30000 });
    expect(page.url()).toContain('login');
  });

  test('已登录用户访问首页应重定向到书架', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/');
    await page.waitForTimeout(1000);

    await page.waitForURL(/bookshelf/, { timeout: 30000 });
    expect(page.url()).toContain('bookshelf');
  });

  test('首页应显示特色故事或预设书籍', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const featuredSection = page.locator('.featured, .featured-stories, .preset-books, .bookshelf, .hero');
    const storyCards = page.locator('.story-card, .book-preview, .featured-card, .book-3d');

    const featuredCount = await featuredSection.count();
    const storyCount = await storyCards.count();

    expect(featuredCount + storyCount).toBeGreaterThan(0);
  });

  test('首页应显示品牌标识', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const logo = page.locator('.logo, .brand, h1, .hero-title');
    await expect(logo.first()).toBeVisible();
  });

  test('首页静态资源应正确加载', async ({ page }) => {
    const failedRequests = [];

    page.on('requestfailed', request => {
      failedRequests.push(request.url());
    });

    await page.goto('/');
    await page.waitForTimeout(1000);

    const criticalResources = failedRequests.filter(url => 
      url.includes('.css') || url.includes('.js')
    );

    expect(criticalResources.length).toBe(0);
  });

  test('首页响应式设计 - 桌面视图', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForTimeout(500);

    const mainContent = page.locator('main, .main-content, .container, .hero, body');
    await expect(mainContent.first()).toBeVisible();
  });

  test('首页响应式设计 - 移动视图', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(500);

    const mainContent = page.locator('main, .main-content, .container, .hero, body');
    await expect(mainContent.first()).toBeVisible();
  });

  test('首页应显示页脚', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const footer = page.locator('footer, .footer');
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('首页链接应可点击', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const links = page.locator('a[href]');
    const count = await links.count();

    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });

  test('首页应显示行动号召按钮', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const ctaButton = page.locator('.cta-button, .action-btn, .hero-buttons a, .hero-buttons button, a:has-text("开始"), a:has-text("Start")');
    const count = await ctaButton.count();
    expect(count).toBeGreaterThan(0);
  });

  test('首页特色故事卡片点击应跳转', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const storyCard = page.locator('.story-card a, .featured-card a, .book-preview a, .book-3d a').first();
    if (await storyCard.count() > 0) {
      await storyCard.click();
      await page.waitForTimeout(500);
      expect(page.url()).not.toBe('/');
    }
  });

  test('未登录用户访问受保护页面应重定向到登录页', async ({ page }) => {
    const protectedPages = [
      '/bookshelf.html',
      '/book-create.html'
    ];

    for (const protectedPage of protectedPages) {
      await page.goto(protectedPage);
      await page.waitForTimeout(1000);

      const currentUrl = page.url();
      const isRedirected = currentUrl.includes('login') || currentUrl.includes('index');
      expect(isRedirected).toBe(true);
    }
  });
});

test.describe('首页性能测试', () => {
  test('首页加载时间应在合理范围内', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test('首页无JavaScript错误', async ({ page }) => {
    const errors = [];

    page.on('pageerror', error => {
      errors.push(error.message);
    });

    await page.goto('/');
    await page.waitForTimeout(1000);

    expect(errors.length).toBe(0);
  });
});
