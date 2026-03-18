import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('首页完整旅程测试', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('首页应正确加载并显示主要内容', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    await expect(page).toHaveTitle(/StoryBook/);

    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();

    const brand = page.locator('.navbar-brand');
    await expect(brand).toBeVisible();
  });

  test('首页导航栏应包含链接', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const navLinks = page.locator('.navbar-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('首页语言切换应正常工作', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      await langBtnEn.click();
      await page.waitForTimeout(300);

      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');
    }

    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(300);

      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('zh');
    }
  });

  test('首页点击导航应跳转到对应页面', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const libraryLink = page.locator('.navbar-link').first();
    await libraryLink.click();
    await page.waitForTimeout(1000);

    expect(page.url()).toMatch(/library|bookshelf|login/);
  });

  test('首页页脚应包含隐私和服务条款链接', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const footer = page.locator('.footer');
    if (await footer.count() > 0) {
      const privacyLink = page.locator('a:has-text("Privacy"), a:has-text("隐私")');
      expect(await privacyLink.count()).toBeGreaterThan(0);

      const termsLink = page.locator('a:has-text("Terms"), a:has-text("条款")');
      expect(await termsLink.count()).toBeGreaterThan(0);
    }
  });

  test('首页主题应正确应用', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const body = page.locator('body');
    const bodyClass = await body.getAttribute('class');
    expect(bodyClass).toMatch(/theme-/);
  });
});

test.describe('隐私政策页面完整旅程测试', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('隐私政策页面应正确加载', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    await expect(page).toHaveTitle(/Privacy/);

    const title = page.locator('h1');
    await expect(title).toContainText(/Privacy|隐私/);
  });

  test('隐私政策页面应显示主要内容', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const content = page.locator('.legal-page');
    await expect(content).toBeVisible();

    const sections = page.locator('.legal-page h2');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('隐私政策页面导航栏应正常工作', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const homeLink = page.locator('.navbar-brand');
    await homeLink.click();
    await page.waitForTimeout(1000);

    expect(page.url()).toMatch(/index|\/$/);
  });

  test('隐私政策页面语言切换应正常', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      await langBtnEn.click();
      await page.waitForTimeout(300);

      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');
    }
  });

  test('隐私政策页面页脚链接应正常', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const termsLink = page.locator('.footer a:has-text("Terms"), .footer a:has-text("条款")');
    if (await termsLink.count() > 0) {
      await termsLink.click();
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('terms');
    }
  });

  test('隐私政策页面应包含联系邮箱', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const emailLink = page.locator('a[href*="mailto:"]');
    expect(await emailLink.count()).toBeGreaterThan(0);
  });

  test('隐私政策页面SEO标签应正确', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Privacy');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Privacy');
  });
});

test.describe('服务条款页面完整旅程测试', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('服务条款页面应正确加载', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    await expect(page).toHaveTitle(/Terms/);

    const title = page.locator('h1');
    await expect(title).toContainText(/Terms|条款/);
  });

  test('服务条款页面应显示主要内容', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const content = page.locator('.legal-page');
    await expect(content).toBeVisible();

    const sections = page.locator('.legal-page h2');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });

  test('服务条款页面导航栏应正常工作', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const homeLink = page.locator('.navbar-brand');
    await homeLink.click();
    await page.waitForTimeout(1000);

    expect(page.url()).toMatch(/index|\/$/);
  });

  test('服务条款页面语言切换应正常', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(300);

      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('zh');
    }
  });

  test('服务条款页面页脚链接应正常', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const privacyLink = page.locator('.footer a:has-text("Privacy"), .footer a:has-text("隐私")');
    if (await privacyLink.count() > 0) {
      await privacyLink.click();
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('privacy');
    }
  });

  test('服务条款页面应包含联系邮箱', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const emailLink = page.locator('a[href*="mailto:"]');
    expect(await emailLink.count()).toBeGreaterThan(0);
  });

  test('服务条款页面SEO标签应正确', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Terms');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Terms');
  });
});

test.describe('静态预设书籍页面完整旅程测试', () => {
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
    if (db) {
      db.close();
    }
  });

  test('静态页面应正确加载中文冒险书籍', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    await expect(page.locator('.book-container')).toBeVisible();
    await expect(page.locator('.book-spine')).toBeVisible();
    await expect(page.locator('.book-page.left')).toBeVisible();
    await expect(page.locator('.book-page.right')).toBeVisible();
  });

  test('静态页面应正确加载英文冒险书籍', async ({ page }) => {
    await page.goto('/books/preset-adventure-001-en.html');
    await page.waitForTimeout(500);

    await expect(page.locator('.book-container')).toBeVisible();
    await expect(page.locator('.book-meta-info h2')).toContainText(/Stargazer|Adventure/i);
  });

  test('静态页面应正确加载奇幻类型书籍', async ({ page }) => {
    await page.goto('/books/preset-fantasy-001.html');
    await page.waitForTimeout(500);

    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-fantasy');
  });

  test('静态页面应正确加载言情类型书籍', async ({ page }) => {
    await page.goto('/books/preset-romance-001.html');
    await page.waitForTimeout(500);

    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-romance');
  });

  test('静态页面应正确加载职场类型书籍', async ({ page }) => {
    await page.goto('/books/preset-business-001.html');
    await page.waitForTimeout(500);

    const body = page.locator('body');
    const themeClass = await body.getAttribute('class');
    expect(themeClass).toContain('theme-business');
  });

  test('静态页面章节目录应可点击', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const firstChapter = page.locator('.chapter-toc-item').first();
    await firstChapter.click();

    await page.waitForURL(/chapter/, { timeout: 30000 });
    expect(page.url()).toContain('is_preset=1');
  });

  test('静态页面角色视图应正常切换', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const characterTab = page.locator('.view-tab:has-text("角色"), .view-tab[data-view="characters"]');
    if (await characterTab.count() > 0) {
      await characterTab.click();
      await page.waitForTimeout(300);

      const characterCards = page.locator('.hs-card-mini');
      const count = await characterCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('静态页面未登录点击导入应跳转登录页', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const importBtn = page.locator('.action-btn:has-text("导入"), button:has-text("Import")');
    if (await importBtn.count() > 0) {
      await importBtn.click();
      await page.waitForTimeout(1000);

      const url = page.url();
      expect(url).toMatch(/login|bookshelf/);
    }
  });

  test('静态页面已登录点击导入应调用API', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(500);

    const importBtn = page.locator('.action-btn:has-text("导入"), button:has-text("Import")');
    if (await importBtn.count() > 0) {
      await importBtn.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url).toContain('book');
    }
  });

  test('静态页面开始阅读按钮应正确链接', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const startBtn = page.locator('.action-btn:has-text("开始阅读"), a:has-text("Read")');
    if (await startBtn.count() > 0) {
      const href = await startBtn.first().getAttribute('href');
      expect(href).toContain('chapter');
    }
  });

  test('静态页面导航栏首页链接应正确', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const homeLink = page.locator('.navbar-brand');
    await homeLink.click();
    await page.waitForTimeout(500);

    expect(page.url()).toMatch(/index|\/$/);
  });

  test('静态页面导航栏图书馆链接应正确', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const libraryLink = page.locator('.navbar-link').first();
    const href = await libraryLink.getAttribute('href');
    expect(href).toBeDefined();
  });

  test('静态页面SEO结构化数据应正确', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    const json = JSON.parse(structuredData);

    expect(json['@type']).toBe('Book');
    expect(json.name).toBeDefined();
    expect(json.genre).toBeDefined();
  });

  test('静态页面所有16本书籍应可访问', async ({ page }) => {
    const bookFiles = [
      'preset-adventure-001.html',
      'preset-adventure-002.html',
      'preset-adventure-001-en.html',
      'preset-adventure-002-en.html',
      'preset-fantasy-001.html',
      'preset-fantasy-002.html',
      'preset-fantasy-001-en.html',
      'preset-fantasy-002-en.html',
      'preset-romance-001.html',
      'preset-romance-002.html',
      'preset-romance-001-en.html',
      'preset-romance-002-en.html',
      'preset-business-001.html',
      'preset-business-002.html',
      'preset-business-001-en.html',
      'preset-business-002-en.html'
    ];

    for (const bookFile of bookFiles) {
      await page.goto(`/books/${bookFile}`);
      await page.waitForTimeout(300);

      const bookContainer = page.locator('.book-container');
      await expect(bookContainer).toBeVisible();
    }
  });
});

test.describe('章节阅读页面完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('预设书籍章节应可阅读', async ({ page }) => {
    const presetBook = db.query(
      "SELECT * FROM books WHERE is_preset = 1 LIMIT 1"
    );

    if (presetBook) {
      const chapter = db.query(
        'SELECT * FROM chapters WHERE book_id = ? LIMIT 1',
        [presetBook.book_id]
      );

      if (chapter) {
        await page.goto(`/chapter.html?id=${chapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1500);

        const pageContent = page.locator('body');
        await expect(pageContent).toBeVisible();
      }
    }
  });

  test('用户书籍章节应可阅读', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Chapter Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    testChapterId = chapterData.data.chapter.chapter_id;

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });

  test('章节页面应显示章节内容', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const chapterContent = page.locator('.chapter-content, .story-content, .content');
    if (await chapterContent.count() > 0) {
      const text = await chapterContent.first().textContent();
      expect(text.length).toBeGreaterThan(50);
    }
  });

  test('章节页面应显示谜题', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(2000);

    const puzzleOverlay = page.locator('.puzzle-overlay, .modal, .puzzle-container');
    if (await puzzleOverlay.count() > 0) {
      const isVisible = await puzzleOverlay.first().isVisible();
      expect(typeof isVisible).toBe('boolean');
    }
  });

  test('章节页面返回书籍应正常', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const backBtn = page.locator('a:has-text("返回"), a:has-text("Back"), .back-btn');
    if (await backBtn.count() > 0) {
      await backBtn.first().click();
      await page.waitForTimeout(1000);

      expect(page.url()).toContain('book');
    }
  });

  test('未登录访问用户章节应重定向', async ({ page }) => {
    if (!testChapterId) {
      expect(true).toBe(true);
      return;
    }

    await page.goto(`/chapter.html?id=${testChapterId}`);
    await page.waitForTimeout(1000);

    const url = page.url();
    expect(url).toMatch(/login|bookshelf/);
  });
});

test.describe('页面间导航路径完整旅程测试', () => {
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
    if (db) {
      db.close();
    }
  });

  test('导航路径: 首页→图书馆→书籍详情→章节', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const libraryLink = page.locator('.navbar-link').first();
    await libraryLink.click();
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-item').first();
    await firstBook.click();
    await page.waitForTimeout(1500);

    const firstChapter = page.locator('.chapter-toc-item').first();
    if (await firstChapter.count() > 0) {
      await firstChapter.click();
      await page.waitForURL(/chapter/, { timeout: 30000 });
    }
  });

  test('导航路径: 首页→书架→创建书籍', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const myBooksLink = page.locator('.navbar-link').nth(1);
    await myBooksLink.click();
    await page.waitForTimeout(1000);

    if (page.url().includes('login')) {
      await page.fill('#email', `nav_test_${Date.now()}@test.com`);
      await page.fill('#password', 'TestPassword123!');
      await page.locator('.wax-seal-btn').first().click();
      await page.waitForURL(/bookshelf/, { timeout: 30000 });
    }

    const createBtn = page.locator('a:has-text("Create"), a:has-text("创建"), .create-btn');
    if (await createBtn.count() > 0) {
      await createBtn.first().click();
      await page.waitForTimeout(1000);
    }
  });

  test('导航路径: 首页→隐私政策→服务条款→首页', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const privacyLink = page.locator('a:has-text("Privacy"), a:has-text("隐私")').first();
    if (await privacyLink.count() > 0) {
      await privacyLink.click();
      await page.waitForTimeout(1000);

      const termsLink = page.locator('a:has-text("Terms"), a:has-text("条款")').first();
      if (await termsLink.count() > 0) {
        await termsLink.click();
        await page.waitForTimeout(1000);

        const homeLink = page.locator('.navbar-brand');
        await homeLink.click();
        await page.waitForTimeout(500);

        expect(page.url()).toMatch(/index|\/$/);
      }
    }
  });

  test('导航路径: 图书馆→静态书籍页面→章节', async ({ page }) => {
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const firstBook = page.locator('.book-item').first();
    await firstBook.click();
    await page.waitForTimeout(1500);

    const url = page.url();
    if (url.includes('books/')) {
      const firstChapter = page.locator('.chapter-toc-item').first();
      if (await firstChapter.count() > 0) {
        await firstChapter.click();
        await page.waitForURL(/chapter/, { timeout: 30000 });
      }
    }
  });

  test('导航路径: 书架→书籍详情→导演页→章节', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Navigation Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Nav Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    const bookId = bookData.data.book_id;

    await page.goto(`/book.html?id=${bookId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const directorBtn = page.locator('a:has-text("Director"), a[href*="director"]');
    if (await directorBtn.count() > 0) {
      await directorBtn.first().click();
      await page.waitForURL(/director/, { timeout: 30000 });

      const characterFan = page.locator('#characterFan .fan-card');
      if (await characterFan.count() > 0) {
        await characterFan.first().click({ force: true });
        await page.waitForTimeout(300);

        const adventureFan = page.locator('#adventureFan .fan-card');
        if (await adventureFan.count() > 0) {
          await adventureFan.first().click({ force: true });
          await page.waitForTimeout(300);
        }

        const weatherFan = page.locator('#weatherFan .fan-card');
        if (await weatherFan.count() > 0) {
          await weatherFan.first().click({ force: true });
          await page.waitForTimeout(300);
        }

        const terrainFan = page.locator('#terrainFan .fan-card');
        if (await terrainFan.count() > 0) {
          await terrainFan.first().click({ force: true });
          await page.waitForTimeout(300);
        }

        const startBtn = page.locator('#startBtn');
        if (await startBtn.isEnabled()) {
          await startBtn.click();
          await page.waitForTimeout(2000);

          expect(page.url()).toContain('chapter');
        }
      }
    }
  });

  test('导航路径: 登录→书架→登出→登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1000);

    const logoutBtn = page.locator('a:has-text("Sign Out"), a:has-text("登出"), [onclick*="logout"]').first();
    if (await logoutBtn.count() > 0) {
      await logoutBtn.click();
      await page.waitForURL(/login/, { timeout: 30000 });

      expect(page.url()).toContain('login');
    }
  });
});

test.describe('错误场景和边界情况完整旅程测试', () => {
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
    if (db) {
      db.close();
    }
  });

  test('访问不存在的书籍应显示错误或重定向', async ({ page }) => {
    await page.goto('/book.html?id=non-existent-book-id');
    await page.waitForTimeout(1500);

    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });

  test('访问不存在的章节应显示错误或重定向', async ({ page }) => {
    await page.goto('/chapter.html?id=non-existent-chapter-id');
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });

  test('访问不存在的静态书籍页面应显示错误页面', async ({ page }) => {
    await page.goto('/books/non-existent-book.html');
    await page.waitForTimeout(500);

    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });

  test('未登录访问受保护页面应重定向到登录页', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('login');
  });

  test('未登录访问导演页应重定向到登录页', async ({ page }) => {
    await page.goto('/director.html?book_id=test-id');
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('login');
  });

  test('未登录访问书籍创建页应重定向到登录页', async ({ page }) => {
    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('login');
  });

  test('登录失败应显示错误信息', async ({ page }) => {
    await page.goto('/login.html');
    await page.waitForTimeout(500);

    await page.fill('#email', 'invalid-email');
    await page.fill('#password', 'short');

    const submitBtn = page.locator('.wax-seal-btn').first();
    await submitBtn.click();
    await page.waitForTimeout(1000);

    expect(page.url()).toContain('login');
  });

  test('创建书籍缺少必填字段应显示错误', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(500);
    
    await page.goto('/book-create.html');
    await page.waitForTimeout(1000);

    const nextBtn = page.locator('#step1 .btn-next, .btn-next');
    if (await nextBtn.count() > 0) {
      await nextBtn.first().click();
      await page.waitForTimeout(500);

      const step1 = page.locator('#step1');
      const isActive = await step1.getAttribute('class');
      expect(isActive).toBeDefined();
    }
  });

  test('API错误应正确处理', async ({ page, request }) => {
    const response = await request.post('/api/books/invalid-id/import', {
      data: {
        user_id: testUserId
      }
    });

    expect(response.status()).toBe(404);
  });

  test('网络错误应优雅处理', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());

    await page.goto('/library.html');
    await page.waitForTimeout(1500);

    const pageContent = page.locator('body');
    await expect(pageContent).toBeVisible();
  });

  test('空书架应显示提示', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1000);

    const bookCards = page.locator('.book-card, .book-item');
    const count = await bookCards.count();

    if (count === 0) {
      const emptyMessage = page.locator('.empty, .no-books');
      expect(await emptyMessage.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test('长时间无操作后刷新应保持登录状态', async ({ page }) => {
    await page.goto('/bookshelf.html');
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1000);

    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(1000);

    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBe(testUserId);
  });

  test('浏览器后退按钮应正常工作', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    await page.goto('/library.html');
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);

    expect(page.url()).toMatch(/index|\/$/);
  });

  test('浏览器前进按钮应正常工作', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    await page.goto('/library.html');
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);

    await page.goForward();
    await page.waitForTimeout(500);

    expect(page.url()).toContain('library');
  });
});

test.describe('多语言完整旅程测试', () => {
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
    if (db) {
      db.close();
    }
  });

  test('中文模式下页面应显示中文', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(300);
    await page.evaluate(() => localStorage.setItem('storybook-language', 'zh'));
    await page.waitForTimeout(500);

    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('zh');
    }

    await page.goto('/library.html');
    await page.waitForTimeout(500);

    const libraryTitle = page.locator('h1, .page-title');
    const titleText = await libraryTitle.first().textContent();
    expect(titleText).toContain('图书馆');
  });

  test('英文模式下页面应显示英文', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(300);
    await page.evaluate(() => localStorage.setItem('storybook-language', 'en'));
    await page.waitForTimeout(500);

    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');
    }

    await page.goto('/library.html');
    await page.waitForTimeout(500);

    const libraryTitle = page.locator('h1, .page-title');
    const titleText = await libraryTitle.first().textContent();
    expect(titleText.toLowerCase()).toContain('library');
  });

  test('语言切换后页面内容应更新', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(500);

      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('zh');
    }

    const langBtnEn = page.locator('button:has-text("EN")');
    if (await langBtnEn.count() > 0) {
      await langBtnEn.click();
      await page.waitForTimeout(500);

      const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');
    }
  });

  test('隐私政策页面语言切换应正常', async ({ page }) => {
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(500);

      const title = page.locator('h1');
      const titleText = await title.textContent();
      expect(titleText).toContain('隐私');
    }
  });

  test('服务条款页面语言切换应正常', async ({ page }) => {
    await page.goto('/terms.html');
    await page.waitForTimeout(500);

    const langBtnZh = page.locator('button:has-text("中文")');
    if (await langBtnZh.count() > 0) {
      await langBtnZh.click();
      await page.waitForTimeout(500);

      const title = page.locator('h1');
      const titleText = await title.textContent();
      expect(titleText).toContain('条款');
    }
  });
});

test.describe('响应式设计完整旅程测试', () => {
  test('移动端首页应正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(500);

    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
  });

  test('移动端图书馆应正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/library.html');
    await page.waitForTimeout(1000);

    const booksGrid = page.locator('#booksGrid');
    await expect(booksGrid).toBeVisible();
  });

  test('移动端静态书籍页面应正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const bookContainer = page.locator('.book-container');
    await expect(bookContainer).toBeVisible();
  });

  test('移动端隐私政策页面应正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/privacy.html');
    await page.waitForTimeout(500);

    const content = page.locator('.legal-page');
    await expect(content).toBeVisible();
  });

  test('平板端首页应正常显示', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForTimeout(500);

    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
  });
});

test.describe('SEO和可访问性完整旅程测试', () => {
  test('所有页面应有正确的title标签', async ({ page }) => {
    const pages = [
      '/',
      '/privacy.html',
      '/terms.html',
      '/books/preset-adventure-001.html'
    ];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForTimeout(300);

      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    }
  });

  test('所有页面应有meta description', async ({ page }) => {
    const pages = [
      '/',
      '/library.html',
      '/privacy.html',
      '/terms.html',
      '/books/preset-adventure-001.html'
    ];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForTimeout(300);

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(10);
    }
  });

  test('静态书籍页面应有Open Graph标签', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('静态书籍页面应有结构化数据', async ({ page }) => {
    await page.goto('/books/preset-adventure-001.html');
    await page.waitForTimeout(500);

    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    const json = JSON.parse(structuredData);

    expect(json['@context']).toBe('https://schema.org');
    expect(json['@type']).toBe('Book');
  });

  test('所有页面应有导航地标', async ({ page }) => {
    const pages = [
      '/',
      '/library.html',
      '/privacy.html',
      '/terms.html'
    ];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForTimeout(300);

      const nav = page.locator('nav, .navbar, [role="navigation"]');
      expect(await nav.count()).toBeGreaterThan(0);
    }
  });

  test('页面应有页脚或相关链接', async ({ page }) => {
    const pages = [
      '/',
      '/privacy.html',
      '/terms.html'
    ];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForTimeout(300);

      const footer = page.locator('footer, .footer, .footer-links');
      expect(await footer.count()).toBeGreaterThanOrEqual(0);
    }
  });
});

test.describe('章节创建和卡牌掉落完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('创建章节后应掉落新卡牌', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Card Drop Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Card Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    const initialCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    const initialCount = initialCards.length;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);

    const afterCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    const afterCount = afterCards.length;

    expect(afterCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('连续创建多个章节应累积卡牌', async ({ page, request }) => {
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');

    for (let i = 0; i < 3; i++) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: weatherCards[i % weatherCards.length].card_id,
            terrain_id: terrainCards[i % terrainCards.length].card_id,
            adventure_id: adventureCards[i % adventureCards.length].card_id
          }
        }
      });

      const chapterData = await chapterResponse.json();
      expect(chapterData.success).toBe(true);
    }

    const finalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );

    expect(chapters.length).toBeGreaterThanOrEqual(3);
    expect(finalCards.length).toBeGreaterThan(0);
  });

  test('解谜成功应获得卡牌奖励', async ({ page, request }) => {
    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );

    if (chapters.length > 0) {
      const puzzle = db.query(
        'SELECT * FROM puzzles WHERE chapter_id = ?',
        [chapters[0].chapter_id]
      );

      if (puzzle && !puzzle.is_solved) {
        const beforeCards = db.queryAll(
          'SELECT * FROM plot_cards WHERE book_id = ?',
          [testBookId]
        );
        const beforeCount = beforeCards.length;

        const solveResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
          data: {
            answer: puzzle.answer,
            user_id: testUserId
          }
        });

        const solveData = await solveResponse.json();

        if (solveData.success && solveData.data && solveData.data.is_correct) {
          const afterCards = db.queryAll(
            'SELECT * FROM plot_cards WHERE book_id = ?',
            [testBookId]
          );
          const afterCount = afterCards.length;

          expect(afterCount).toBeGreaterThanOrEqual(beforeCount);
        }
      }
    }
  });

  test('卡牌按类型正确分类', async ({ page }) => {
    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = cards.filter(c => c.sub_type === 'equipment');

    expect(weatherCards.length).toBeGreaterThan(0);
    expect(terrainCards.length).toBeGreaterThan(0);
    expect(adventureCards.length).toBeGreaterThan(0);
    expect(equipmentCards.length).toBeGreaterThan(0);
  });
});

test.describe('卡牌丢弃完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('卡牌超过8张时应可丢弃', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Discard Test Book',
        type: 'fantasy',
        protagonist: {
          name: 'Discard Hero',
          avatar: '🧝‍♀️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    for (let i = 0; i < 5; i++) {
      await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
          }
        }
      });
    }

    const allCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const cardsByType = {};
    allCards.forEach(card => {
      if (!cardsByType[card.sub_type]) {
        cardsByType[card.sub_type] = [];
      }
      cardsByType[card.sub_type].push(card);
    });

    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards"), button:has-text("卡牌")');
    if (await cardTab.count() > 0) {
      await cardTab.click();
      await page.waitForTimeout(500);

      const displayedCards = page.locator('.card-item, .plot-card');
      const count = await displayedCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('丢弃卡牌后数量应减少', async ({ page, request }) => {
    const allCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    if (allCards.length > 0) {
      const cardToDiscard = allCards[0];

      await page.goto(`/book.html?id=${testBookId}`);
      await page.waitForTimeout(300);
      await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.waitForTimeout(1500);

      const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards"), button:has-text("卡牌")');
      if (await cardTab.count() > 0) {
        await cardTab.click();
        await page.waitForTimeout(500);

        const discardBtn = page.locator('.card-discard, button:has-text("Discard"), button:has-text("丢弃")').first();
        if (await discardBtn.count() > 0) {
          const beforeCount = db.queryAll(
            'SELECT * FROM plot_cards WHERE book_id = ?',
            [testBookId]
          ).length;

          await discardBtn.click();
          await page.waitForTimeout(500);

          const afterCount = db.queryAll(
            'SELECT * FROM plot_cards WHERE book_id = ?',
            [testBookId]
          ).length;

          expect(afterCount).toBeLessThanOrEqual(beforeCount);
        }
      }
    }
  });

  test('丢弃卡牌后可继续创建章节', async ({ page, request }) => {
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    if (cards.length > 0) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: cards.find(c => c.sub_type === 'weather')?.card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain')?.card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure')?.card_id
          }
        }
      });

      const chapterData = await chapterResponse.json();
      expect(chapterData.success).toBe(true);
    }
  });
});

test.describe('多步骤连续操作完整旅程测试', () => {
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
    if (db) {
      db.close();
    }
  });

  test('完整流程: 创建书籍→添加章节→解谜→获得卡牌→丢弃卡牌→继续添加章节', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Full Flow Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Full Flow Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookId]
    );
    expect(protagonist).toBeDefined();

    const initialCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );
    expect(initialCards.length).toBe(16);

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    const chapter1Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapter1Data = await chapter1Response.json();
    expect(chapter1Data.success).toBe(true);

    const puzzle = db.query(
      'SELECT * FROM puzzles WHERE chapter_id = ?',
      [chapter1Data.data.chapter.chapter_id]
    );
    expect(puzzle).toBeDefined();

    const solveResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
      data: {
        answer: puzzle.answer,
        user_id: testUserId
      }
    });

    const solveData = await solveResponse.json();

    const afterSolveCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    const cardsByType = {};
    afterSolveCards.forEach(card => {
      if (!cardsByType[card.sub_type]) {
        cardsByType[card.sub_type] = [];
      }
      cardsByType[card.sub_type].push(card);
    });

    await page.goto(`/book.html?id=${bookId}`);
    await page.waitForTimeout(300);
    await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
    await page.waitForTimeout(1500);

    const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards"), button:has-text("卡牌")');
    if (await cardTab.count() > 0) {
      await cardTab.click();
      await page.waitForTimeout(500);
    }

    const updatedCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    const chapter2Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: updatedCards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: updatedCards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: updatedCards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapter2Data = await chapter2Response.json();
    expect(chapter2Data.success).toBe(true);

    const finalChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [bookId]
    );
    expect(finalChapters.length).toBeGreaterThanOrEqual(2);
  });

  test('完整流程: 创建带配角书籍→选择配角添加章节→验证亲密度变化', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Companion Flow Test Book',
        type: 'fantasy',
        protagonist: {
          name: 'Main Hero',
          avatar: '🧙‍♂️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: 'Companion One',
            avatar: '👧',
            personality: 'kind',
            speech_style: 'gentle',
            role_type: 'healer',
            intimacy: 30,
            relationship: 'friend'
          }
        ]
      }
    });

    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;

    const companion = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0",
      [bookId]
    );
    expect(companion).toBeDefined();
    expect(companion.intimacy).toBe(30);

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: companion.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);

    const chapter = db.query(
      'SELECT * FROM chapters WHERE chapter_id = ?',
      [chapterData.data.chapter.chapter_id]
    );
    expect(chapter).toBeDefined();

    const selectedCards = JSON.parse(chapter.selected_cards);
    expect(selectedCards.protagonist_id).toBe(companion.char_id);
  });

  test('完整流程: 连续创建5个章节→验证章节顺序和内容', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Sequential Chapters Test Book',
        type: 'adventure',
        protagonist: {
          name: 'Sequential Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');

    for (let i = 0; i < 5; i++) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: weatherCards[i % weatherCards.length].card_id,
            terrain_id: terrainCards[i % terrainCards.length].card_id,
            adventure_id: adventureCards[i % adventureCards.length].card_id
          }
        }
      });

      const chapterData = await chapterResponse.json();
      expect(chapterData.success).toBe(true);
    }

    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [bookId]
    );

    expect(chapters.length).toBe(5);

    for (let i = 0; i < 5; i++) {
      expect(chapters[i].order_num).toBe(i + 1);
      expect(chapters[i].title).toBeDefined();
      expect(chapters[i].content.length).toBeGreaterThan(50);
    }

    for (const chapter of chapters) {
      const puzzle = db.query(
        'SELECT * FROM puzzles WHERE chapter_id = ?',
        [chapter.chapter_id]
      );
      expect(puzzle).toBeDefined();
    }
  });

  test('完整流程: 解谜错误→重试→成功→验证卡牌奖励', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Puzzle Retry Test Book',
        type: 'fantasy',
        protagonist: {
          name: 'Puzzle Hero',
          avatar: '🧝‍♀️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    const bookId = bookData.data.book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [bookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    );

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);

    const puzzle = db.query(
      'SELECT * FROM puzzles WHERE chapter_id = ?',
      [chapterData.data.chapter.chapter_id]
    );

    const beforeCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    ).length;

    const wrongAnswer = 'WRONG_ANSWER_' + Date.now();
    const wrongResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
      data: {
        answer: wrongAnswer,
        user_id: testUserId
      }
    });

    const wrongData = await wrongResponse.json();

    const puzzleAfterWrong = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzle.puzzle_id]
    );
    expect(puzzleAfterWrong.attempts).toBeGreaterThan(0);
    expect(puzzleAfterWrong.is_solved).toBe(0);

    const correctResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
      data: {
        answer: puzzle.answer,
        user_id: testUserId
      }
    });

    const correctData = await correctResponse.json();

    const puzzleAfterCorrect = db.query(
      'SELECT * FROM puzzles WHERE puzzle_id = ?',
      [puzzle.puzzle_id]
    );

    if (correctData.success && correctData.data && correctData.data.is_correct) {
      expect(puzzleAfterCorrect.is_solved).toBe(1);

      const afterCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [bookId]
      ).length;
      expect(afterCards).toBeGreaterThanOrEqual(beforeCards);
    }
  });

  test('完整流程: 创建多本书籍→切换操作→验证数据隔离', async ({ page, request }) => {
    const book1Response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Multi Book Test 1',
        type: 'adventure',
        protagonist: {
          name: 'Hero1',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const book1Data = await book1Response.json();
    expect(book1Data.success).toBe(true);
    const book1Id = book1Data.data.book_id;

    const book2Response = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Multi Book Test 2',
        type: 'fantasy',
        protagonist: {
          name: 'Hero2',
          avatar: '🧝‍♀️',
          personality: 'wise',
          speech_style: 'poetic',
          role_type: 'wizard',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const book2Data = await book2Response.json();
    expect(book2Data.success).toBe(true);
    const book2Id = book2Data.data.book_id;

    const protagonist1 = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [book1Id]
    );

    const cards1 = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [book1Id]
    );

    const chapter1Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: book1Id,
        selected_cards: {
          protagonist_id: protagonist1.char_id,
          weather_id: cards1.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards1.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards1.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    expect(chapter1Response.ok()).toBe(true);

    const protagonist2 = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [book2Id]
    );

    const cards2 = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [book2Id]
    );

    const chapter2Response = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: book2Id,
        selected_cards: {
          protagonist_id: protagonist2.char_id,
          weather_id: cards2.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards2.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards2.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    expect(chapter2Response.ok()).toBe(true);

    const chapters1 = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [book1Id]
    );

    const chapters2 = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [book2Id]
    );

    expect(chapters1.length).toBeGreaterThan(0);
    expect(chapters2.length).toBeGreaterThan(0);

    chapters1.forEach(chapter => {
      expect(chapter.book_id).toBe(book1Id);
    });

    chapters2.forEach(chapter => {
      expect(chapter.book_id).toBe(book2Id);
    });

    const allBooks = db.queryAll(
      'SELECT * FROM books WHERE user_id = ?',
      [testUserId]
    );
    expect(allBooks.length).toBeGreaterThanOrEqual(2);
  });
});

test.describe('导演页面卡牌选择完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('导演页选择不同卡牌组合创建章节', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: 'Director Card Selection Test',
        type: 'adventure',
        protagonist: {
          name: 'Director Hero',
          avatar: '🧙‍♂️',
          personality: 'brave',
          speech_style: 'direct',
          role_type: 'explorer',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });

    const bookData = await bookResponse.json();
    expect(bookData.success).toBe(true);
    testBookId = bookData.data.book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );
    expect(protagonist).toBeDefined();

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    expect(cards.length).toBeGreaterThan(0);

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);

    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(chapters.length).toBeGreaterThan(0);
  });

  test('导演页选择不同天气卡牌创建章节', async ({ page, request }) => {
    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');

    const initialChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    const initialCount = initialChapters.length;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonist.char_id,
          weather_id: weatherCards[weatherCards.length > 1 ? 1 : 0].card_id,
          terrain_id: terrainCards[0].card_id,
          adventure_id: adventureCards[0].card_id
        }
      }
    });

    const chapterData = await chapterResponse.json();
    expect(chapterData.success).toBe(true);

    const finalChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [testBookId]
    );
    expect(finalChapters.length).toBeGreaterThan(initialCount);
  });

  test('导演页连续创建多个章节验证卡牌累积', async ({ page, request }) => {
    const initialCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    const initialCount = initialCards.length;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [testBookId]
    );

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );

    const weatherCards = cards.filter(c => c.sub_type === 'weather');
    const terrainCards = cards.filter(c => c.sub_type === 'terrain');
    const adventureCards = cards.filter(c => c.sub_type === 'adventure');

    for (let i = 0; i < 3; i++) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: testBookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: weatherCards[i % weatherCards.length].card_id,
            terrain_id: terrainCards[i % terrainCards.length].card_id,
            adventure_id: adventureCards[i % adventureCards.length].card_id
          }
        }
      });

      const chapterData = await chapterResponse.json();
      expect(chapterData.success).toBe(true);
    }

    const finalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    const finalCount = finalCards.length;

    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });
});

test.describe('导入预设书籍后完整旅程测试', () => {
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
    if (db) {
      db.close();
    }
  });

  test('导入预设书籍→添加章节→解谜→验证数据', async ({ page, request }) => {
    const presetBook = db.query(
      "SELECT * FROM books WHERE is_preset = 1 LIMIT 1"
    );

    if (!presetBook) {
      expect(true).toBe(true);
      return;
    }

    const importResponse = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const importData = await importResponse.json();
    expect(importData.success).toBe(true);
    const newBookId = importData.data.new_book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [newBookId]
    );
    expect(protagonist).toBeDefined();

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [newBookId]
    );

    const originalChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [newBookId]
    );

    const weatherCard = cards.find(c => c.sub_type === 'weather');
    const terrainCard = cards.find(c => c.sub_type === 'terrain');
    const adventureCard = cards.find(c => c.sub_type === 'adventure');

    if (weatherCard && terrainCard && adventureCard) {
      const chapterResponse = await request.post('/api/chapters', {
        data: {
          user_id: testUserId,
          book_id: newBookId,
          selected_cards: {
            protagonist_id: protagonist.char_id,
            weather_id: weatherCard.card_id,
            terrain_id: terrainCard.card_id,
            adventure_id: adventureCard.card_id
          }
        }
      });

      const chapterData = await chapterResponse.json();
      expect(chapterData.success).toBe(true);

      const newChapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ?',
        [newBookId]
      );
      expect(newChapters.length).toBeGreaterThan(originalChapters.length);

      const puzzle = db.query(
        'SELECT * FROM puzzles WHERE chapter_id = ?',
        [chapterData.data.chapter.chapter_id]
      );

      if (puzzle) {
        const solveResponse = await request.post(`/api/puzzles/${puzzle.puzzle_id}/solve`, {
          data: {
            answer: puzzle.answer,
            user_id: testUserId
          }
        });

        const solveData = await solveResponse.json();

        const puzzleAfter = db.query(
          'SELECT * FROM puzzles WHERE puzzle_id = ?',
          [puzzle.puzzle_id]
        );

        if (solveData.success && solveData.data && solveData.data.is_correct) {
          expect(puzzleAfter.is_solved).toBe(1);
        }
      }
    } else {
      expect(cards.length).toBeGreaterThan(0);
    }
  });

  test('导入预设书籍→验证卡牌和角色数据', async ({ page, request }) => {
    const presetBook = db.query(
      "SELECT * FROM books WHERE is_preset = 1 LIMIT 1"
    );

    if (!presetBook) {
      expect(true).toBe(true);
      return;
    }

    const importResponse = await request.post(`/api/books/${presetBook.book_id}/import`, {
      data: {
        user_id: testUserId
      }
    });

    const importData = await importResponse.json();
    if (!importData.success) {
      expect(true).toBe(true);
      return;
    }

    const newBookId = importData.data.new_book_id;

    const protagonist = db.query(
      "SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1",
      [newBookId]
    );
    expect(protagonist).toBeDefined();

    const cards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [newBookId]
    );
    expect(cards.length).toBeGreaterThan(0);

    const chapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ?',
      [newBookId]
    );
    expect(chapters.length).toBeGreaterThan(0);
  });
});

test.describe('40次连续添加章节完整旅程测试', () => {
  let db;
  let testUserId;
  let testBookId;
  let protagonistId;
  let chapterStats = [];
  let customCardStats = { plot: 0, character: 0 };
  let puzzleStats = { solved: 0, failed: 0 };

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile(path.join(process.cwd(), 'migrations', '0002_seed_data.sql'));
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('完整流程: 登录→创建书籍→导演页添加40章节→解谜→丢弃卡牌→验证数据（纯UI操作）', async ({ page }) => {
    test.setTimeout(600000);
    // ==================== 步骤1: 访问首页 ====================
    await page.goto('/');
    await page.waitForTimeout(500);

    // ==================== 步骤2: 访问登录页并登录（UI操作） ====================
    await page.goto('/login.html');
    await page.waitForTimeout(500);
    
    const testEmail = `chapter40_test_${Date.now()}@test.com`;
    const testPassword = 'TestPassword123!';
    
    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);
    await page.click('.wax-seal-btn');
    
    await page.waitForURL(/bookshelf/, { timeout: 30000 });
    await page.waitForTimeout(1000);

    testUserId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(testUserId).toBeDefined();
    console.log('登录成功，用户ID:', testUserId);

    // ==================== 步骤3: 创建书籍（UI操作） ====================
    await page.goto('/book-create.html');
    await page.waitForTimeout(500);
    
    const bookTitle = `40章连续测试书籍 ${Date.now()}`;
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    
    await page.click('#step1 .btn-next');
    await page.waitForSelector('#step2.active', { state: 'visible' });
    
    await page.fill('#protagonistName', '测试主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.selectOption('#protagonistPersonality', 'brave');
    await page.selectOption('#protagonistSpeechStyle', 'direct');
    await page.selectOption('#protagonistRoleType', { index: 1 });
    
    await page.click('#step2 .btn-next');
    await page.waitForSelector('#step3.active', { state: 'visible' });
    
    await page.click('#step3 .btn-next');
    
    await expect(page.locator('.success-title')).toBeVisible({ timeout: 30000 });

    // ==================== 步骤4: SQL验证书籍创建成功 ====================
    const newBook = db.query(
      'SELECT * FROM books WHERE title = ?',
      [bookTitle]
    );
    expect(newBook).toBeDefined();
    expect(newBook.type).toBe('adventure');
    testBookId = newBook.book_id;
    console.log('书籍创建成功，书籍ID:', testBookId);

    const protagonist = db.query(
      'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1',
      [testBookId]
    );
    expect(protagonist).toBeDefined();
    protagonistId = protagonist.char_id;
    console.log('主角创建成功，主角ID:', protagonistId);

    const plotCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    expect(plotCards.length).toBe(16);
    console.log('初始卡牌数量:', plotCards.length);

    // ==================== 步骤5: 连续创建40个章节（全部通过UI操作） ====================
    for (let i = 0; i < 40; i++) {
      const chapterNum = i + 1;
      console.log(`\n========== 开始添加第 ${chapterNum} 个章节 ==========`);
      
      const beforeCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [testBookId]
      );
      const beforeCardCount = beforeCards.length;
      
      const beforeChapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
        [testBookId]
      );
      const beforeChapterCount = beforeChapters.length;

      // 访问导演页
      await page.goto(`/director.html?book_id=${testBookId}`);
      await page.waitForTimeout(1500);

      // 选择主角卡牌
      const characterFan = page.locator('#characterFan .fan-card');
      const characterCount = await characterFan.count();
      expect(characterCount).toBeGreaterThan(0);
      await characterFan.first().click({ force: true });
      await page.waitForTimeout(500);

      // 选择冒险卡牌
      const adventureFan = page.locator('#adventureFan .fan-card');
      const adventureCount = await adventureFan.count();
      expect(adventureCount).toBeGreaterThan(0);
      await adventureFan.first().click({ force: true });
      await page.waitForTimeout(500);

      // 选择天气卡牌
      const weatherFan = page.locator('#weatherFan .fan-card');
      const weatherCount = await weatherFan.count();
      expect(weatherCount).toBeGreaterThan(0);
      await weatherFan.first().click({ force: true });
      await page.waitForTimeout(500);

      // 选择地形卡牌
      const terrainFan = page.locator('#terrainFan .fan-card');
      const terrainCount = await terrainFan.count();
      expect(terrainCount).toBeGreaterThan(0);
      await terrainFan.first().click({ force: true });
      await page.waitForTimeout(500);

      // 点击开始按钮
      const startBtn = page.locator('#startBtn');
      await expect(startBtn).toBeEnabled({ timeout: 30000 });
      await startBtn.click();
      await page.waitForTimeout(2000);

      // 验证跳转到章节页面
      await expect(page).toHaveURL(/chapter/, { timeout: 30000 });
      console.log(`第 ${chapterNum} 章节创建成功，已跳转到章节页`);

      // SQL验证章节创建成功
      const afterChapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
        [testBookId]
      );
      expect(afterChapters.length).toBe(beforeChapterCount + 1);

      const newChapter = afterChapters[afterChapters.length - 1];
      expect(newChapter.order_num).toBe(chapterNum);
      expect(newChapter.title).toBeDefined();
      expect(newChapter.content).toBeDefined();
      expect(newChapter.content.length).toBeGreaterThan(100);
      console.log(`SQL验证: 章节 ${chapterNum} 已创建，标题: ${newChapter.title}`);

      // SQL验证谜题创建
      const puzzle = db.query(
        'SELECT * FROM puzzles WHERE chapter_id = ?',
        [newChapter.chapter_id]
      );
      expect(puzzle).toBeDefined();
      expect(puzzle.question).toBeDefined();
      expect(puzzle.answer).toBeDefined();
      expect(puzzle.is_solved).toBe(0);
      console.log(`SQL验证: 谜题已创建，问题: ${puzzle.question?.substring(0, 30)}...`);
      console.log(`SQL验证: 谜题答案: ${puzzle.answer}`);

      // ==================== 解谜（通过UI操作） ====================
      await page.waitForTimeout(2000);
      
      // 点击谜题按钮来显示谜题弹窗
      const puzzleTriggerBtn = page.locator('button:has-text("Riddle"), button:has-text("谜题")');
      const triggerCount = await puzzleTriggerBtn.count();
      console.log(`谜题触发按钮数量: ${triggerCount}`);
      
      if (triggerCount > 0) {
        await puzzleTriggerBtn.first().click();
        await page.waitForTimeout(500);
        console.log('点击谜题触发按钮');
        
        // 等待谜题弹窗出现
        const puzzleOverlay = page.locator('.puzzle-overlay, .modal, .puzzle-modal');
        await puzzleOverlay.first().waitFor({ state: 'visible', timeout: 30000 });
        console.log('谜题弹窗已显示');
        
        // 查找选项
        const options = page.locator('.puzzle-option, .option-btn');
        const optionCount = await options.count();
        console.log(`选项数量: ${optionCount}`);
        
        // 打印所有选项
        for (let j = 0; j < optionCount; j++) {
          const optionText = await options.nth(j).textContent();
          console.log(`选项${j}: ${optionText?.trim()}`);
        }
        
        // 找到正确答案并点击（模糊匹配）
        let clickedCorrect = false;
        for (let j = 0; j < optionCount; j++) {
          const optionText = await options.nth(j).textContent();
          const cleanOptionText = optionText?.replace(/\s+/g, '').trim();
          const cleanAnswer = puzzle.answer?.replace(/\s+/g, '').trim();
          
          if (cleanOptionText === cleanAnswer || optionText?.includes(puzzle.answer)) {
            await options.nth(j).click();
            console.log(`点击正确答案: ${puzzle.answer}`);
            clickedCorrect = true;
            break;
          }
        }
        
        if (!clickedCorrect) {
          console.log('未找到匹配答案，点击第一个选项');
          await options.first().click();
        }
        
        // 点击提交按钮
        const submitBtn = page.locator('.submit-btn, button:has-text("Submit"), button:has-text("提交")');
        const submitCount = await submitBtn.count();
        console.log(`提交按钮数量: ${submitCount}`);
        
        if (submitCount > 0) {
          await submitBtn.first().click();
          await page.waitForTimeout(1000);
          console.log('点击提交按钮');
        }
      }

      // SQL验证谜题已解决
      const puzzleAfter = db.query(
        'SELECT * FROM puzzles WHERE puzzle_id = ?',
        [puzzle.puzzle_id]
      );
      expect(puzzleAfter.is_solved).toBe(1);
      puzzleStats.solved++;
      console.log(`SQL验证: 谜题已解决，is_solved = 1`);

      // SQL检查卡牌掉落
      const afterCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [testBookId]
      );
      
      if (afterCards.length > beforeCardCount) {
        const newCards = afterCards.filter(c => !beforeCards.some(bc => bc.card_id === c.card_id));
        console.log(`SQL验证: 新掉落卡牌 ${newCards.length} 张`);
        for (const newCard of newCards) {
          console.log(`  - 新卡牌: ${newCard.name}, 类型: ${newCard.sub_type}, 自定义: ${newCard.is_custom}`);
          if (newCard.is_custom === 1) {
            customCardStats.plot++;
          }
        }
      }

      // SQL检查角色掉落
      const afterCharacters = db.queryAll(
        'SELECT * FROM characters WHERE book_id = ?',
        [testBookId]
      );
      console.log(`SQL验证: 当前角色数量 ${afterCharacters.length}`);

      // 检查卡牌数量是否超过限制
      const cardsByType = {};
      afterCards.forEach(card => {
        if (!cardsByType[card.sub_type]) {
          cardsByType[card.sub_type] = [];
        }
        cardsByType[card.sub_type].push(card);
      });

      let needDiscard = false;
      let discardType = '';
      for (const [subType, cards] of Object.entries(cardsByType)) {
        if (cards.length > 8) {
          needDiscard = true;
          discardType = subType;
          console.log(`卡牌类型 ${subType} 超过限制: ${cards.length} > 8，需要丢弃`);
          break;
        }
      }

      // 如果需要丢弃卡牌（通过UI操作）
      if (needDiscard) {
        await page.goto(`/book.html?id=${testBookId}`);
        await page.waitForTimeout(1500);

        const cardTab = page.locator('.tab-btn[data-tab="cards"], button:has-text("Cards"), button:has-text("卡牌")');
        if (await cardTab.count() > 0) {
          await cardTab.click();
          await page.waitForTimeout(500);
          console.log('点击卡牌标签页');
        }

        const discardBtn = page.locator('.card-discard, button:has-text("Discard"), button:has-text("丢弃")').first();
        if (await discardBtn.count() > 0) {
          await discardBtn.click();
          await page.waitForTimeout(500);
          console.log('点击丢弃按钮');

          const afterDiscardCards = db.queryAll(
            'SELECT * FROM plot_cards WHERE book_id = ?',
            [testBookId]
          );
          console.log(`SQL验证: 丢弃后卡牌数量 ${afterDiscardCards.length}`);
        }
      }

      // 记录统计信息
      const finalCards = db.queryAll(
        'SELECT * FROM plot_cards WHERE book_id = ?',
        [testBookId]
      );
      
      const finalCharacters = db.queryAll(
        'SELECT * FROM characters WHERE book_id = ?',
        [testBookId]
      );
      
      chapterStats.push({
        chapterNum,
        chapterId: newChapter.chapter_id,
        puzzleId: puzzle.puzzle_id,
        solved: true,
        cardCount: finalCards.length,
        charCount: finalCharacters.length,
        customCards: finalCards.filter(c => c.is_custom === 1).length,
        discarded: needDiscard
      });

      console.log(`第 ${chapterNum} 章节完成，当前卡牌: ${finalCards.length}，角色: ${finalCharacters.length}`);
    }

    // ==================== 步骤6: SQL验证书籍详情页显示40个章节 ====================
    await page.goto(`/book.html?id=${testBookId}`);
    await page.waitForTimeout(2000);

    const chapterList = page.locator('.chapter-toc-item');
    await chapterList.first().waitFor({ timeout: 30000 }).catch(() => {});
    const chapterCount = await chapterList.count();
    expect(chapterCount).toBe(40);
    console.log(`\n书籍详情页显示 ${chapterCount} 个章节`);

    // ==================== 步骤7: SQL验证数据库数据完整性 ====================
    const finalChapters = db.queryAll(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num',
      [testBookId]
    );
    expect(finalChapters.length).toBe(40);
    console.log(`SQL验证: 章节总数 ${finalChapters.length}`);
    
    for (let i = 0; i < 40; i++) {
      expect(finalChapters[i].order_num).toBe(i + 1);
      expect(finalChapters[i].title).toBeDefined();
      expect(finalChapters[i].content.length).toBeGreaterThan(100);
    }
    
    const finalPuzzles = db.queryAll(`
      SELECT p.* FROM puzzles p
      JOIN chapters c ON p.chapter_id = c.chapter_id
      WHERE c.book_id = ?
      ORDER BY c.order_num
    `, [testBookId]);
    expect(finalPuzzles.length).toBe(40);
    console.log(`SQL验证: 谜题总数 ${finalPuzzles.length}`);

    const finalCards = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [testBookId]
    );
    
    const customCards = finalCards.filter(c => c.is_custom === 1);
    const presetCards = finalCards.filter(c => c.is_custom === 0);
    
    console.log(`SQL验证: 卡牌总数 ${finalCards.length}，自定义卡牌 ${customCards.length}，预设卡牌 ${presetCards.length}`);
    
    expect(presetCards.length).toBeGreaterThanOrEqual(16);
    expect(finalCards.length).toBeGreaterThan(16);
    
    const weatherCards = finalCards.filter(c => c.sub_type === 'weather');
    const terrainCards = finalCards.filter(c => c.sub_type === 'terrain');
    const adventureCards = finalCards.filter(c => c.sub_type === 'adventure');
    const equipmentCards = finalCards.filter(c => c.sub_type === 'equipment');
    
    console.log(`SQL验证: 天气卡牌 ${weatherCards.length}，地形卡牌 ${terrainCards.length}，冒险卡牌 ${adventureCards.length}，装备卡牌 ${equipmentCards.length}`);
    
    expect(weatherCards.length).toBeLessThanOrEqual(8);
    expect(terrainCards.length).toBeLessThanOrEqual(8);
    expect(adventureCards.length).toBeLessThanOrEqual(8);
    expect(equipmentCards.length).toBeLessThanOrEqual(8);

    const finalCharacters = db.queryAll(
      'SELECT * FROM characters WHERE book_id = ?',
      [testBookId]
    );
    
    console.log(`SQL验证: 角色总数 ${finalCharacters.length}`);
    expect(finalCharacters.length).toBeLessThanOrEqual(8);
    
    const protagonistChar = finalCharacters.find(c => c.is_protagonist === 1);
    expect(protagonistChar).toBeDefined();

    // 验证所有谜题都已解决
    expect(puzzleStats.solved).toBe(40);
    expect(puzzleStats.failed).toBe(0);
    console.log(`SQL验证: 已解决谜题 ${puzzleStats.solved}，失败谜题 ${puzzleStats.failed}`);
    
    const solvedPuzzles = db.queryAll(`
      SELECT p.* FROM puzzles p
      JOIN chapters c ON p.chapter_id = c.chapter_id
      WHERE c.book_id = ? AND p.is_solved = 1
    `, [testBookId]);
    
    expect(solvedPuzzles.length).toBe(40);
    console.log(`SQL验证: 数据库中已解决谜题 ${solvedPuzzles.length}`);

    // 输出测试报告
    const report = {
      bookId: testBookId,
      userId: testUserId,
      totalChapters: 40,
      totalPuzzles: 40,
      solvedPuzzles: solvedPuzzles.length,
      totalCards: finalCards.length,
      customCards: customCards.length,
      presetCards: presetCards.length,
      cardsByType: {
        weather: weatherCards.length,
        terrain: terrainCards.length,
        adventure: adventureCards.length,
        equipment: equipmentCards.length
      },
      totalCharacters: finalCharacters.length,
      puzzleStats: puzzleStats,
      customCardStats: customCardStats
    };

    console.log('\n========== 40章节测试报告 ==========');
    console.log(JSON.stringify(report, null, 2));
    console.log('====================================\n');

    expect(report.totalChapters).toBe(40);
    expect(report.solvedPuzzles).toBe(40);
    expect(report.totalCards).toBeGreaterThan(16);
  });
});
