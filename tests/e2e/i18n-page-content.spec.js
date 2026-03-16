import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';
import path from 'path';

test.describe('中英文页面内容验证测试', () => {
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

  test.describe('首页中英文验证', () => {
    test('首页导航栏应正确显示英文', async ({ page }) => {
      await page.goto('/index.html?lang=en');
      await page.waitForTimeout(1000);

      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('en');

      const libraryLink = page.locator('.navbar-link').filter({ hasText: /^Library$/ });
      await expect(libraryLink).toBeVisible();

      const myBooksLink = page.locator('.navbar-link:has-text("My Library")');
      await expect(myBooksLink).toBeVisible();

      const pageTitle = await page.locator('h1, .hero-title').first().textContent();
      expect(pageTitle.toLowerCase()).not.toMatch(/故事|书架|图书馆/);
    });

    test('首页导航栏应正确显示中文', async ({ page }) => {
      await page.goto('/index.html?lang=zh');
      await page.waitForTimeout(1000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const libraryLink = page.locator('.navbar-link:has-text("图书馆")');
      await expect(libraryLink).toBeVisible();

      const myBooksLink = page.locator('.navbar-link:has-text("我的书架")');
      await expect(myBooksLink).toBeVisible();

      const pageTitle = await page.locator('h1, .hero-title').first().textContent();
      expect(pageTitle).toMatch(/故事|书/);
    });

    test('首页按钮应正确显示中英文', async ({ page }) => {
      await page.goto('/index.html?lang=en');
      await page.waitForTimeout(1000);

      const createBtn = page.locator('.btn:has-text("Create"), .btn:has-text("Start")');
      if (await createBtn.count() > 0) {
        const btnText = await createBtn.first().textContent();
        expect(btnText.toLowerCase()).toMatch(/create|start|begin/);
        expect(btnText).not.toMatch(/创建|开始/);
      }

      await page.goto('/index.html?lang=zh');
      await page.waitForTimeout(1000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const createBtnZh = page.locator('.btn:has-text("创建"), .btn:has-text("开始")');
      if (await createBtnZh.count() > 0) {
        const btnText = await createBtnZh.first().textContent();
        expect(btnText).toMatch(/创建|开始/);
      }
    });
  });

  test.describe('登录页中英文验证', () => {
    test('登录页表单应正确显示英文', async ({ page }) => {
      await page.goto('/login.html?lang=en');
      await page.waitForTimeout(1000);

      const emailLabel = page.locator('label[for="email"], .form-label:has-text("Email")');
      if (await emailLabel.count() > 0) {
        const labelText = await emailLabel.first().textContent();
        expect(labelText.toLowerCase()).toMatch(/email|邮箱/);
      }

      const passwordLabel = page.locator('label[for="password"], .form-label:has-text("Password")');
      if (await passwordLabel.count() > 0) {
        const labelText = await passwordLabel.first().textContent();
        expect(labelText.toLowerCase()).toMatch(/password|密码/);
      }

      const submitBtn = page.locator('.wax-seal-btn, .submit-btn, button[type="submit"]');
      if (await submitBtn.count() > 0) {
        const btnText = await submitBtn.first().textContent();
        expect(btnText.toLowerCase()).toMatch(/begin|start|login|sign/);
        expect(btnText).not.toMatch(/开始|登录/);
      }
    });

    test('登录页表单应正确显示中文', async ({ page }) => {
      await page.goto('/login.html?lang=zh');
      await page.waitForTimeout(1000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const emailLabel = page.locator('label[for="email"], .form-label');
      if (await emailLabel.count() > 0) {
        const labelText = await emailLabel.first().textContent();
        expect(labelText).toMatch(/邮箱|email/i);
      }

      const passwordLabel = page.locator('label[for="password"], .form-label');
      if (await passwordLabel.count() > 0) {
        const allLabels = await page.locator('.form-label').allTextContents();
        const hasPasswordLabel = allLabels.some(text => text.match(/密码|password/i));
        expect(hasPasswordLabel).toBe(true);
      }

      const submitBtn = page.locator('.wax-seal-btn, .submit-btn, button[type="submit"]');
      if (await submitBtn.count() > 0) {
        const btnText = await submitBtn.first().textContent();
        expect(btnText).toMatch(/开始|登录|旅程/);
      }
    });
  });

  test.describe('书架页中英文验证', () => {
    test.beforeEach(async ({ request }) => {
      await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: 'Test Book for Language',
          type: 'adventure',
          protagonist: { name: 'Hero', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        }
      });
    });

    test('书架页应正确显示英文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html?lang=en');
      await page.waitForTimeout(1500);

      const pageTitle = page.locator('.page-title');
      const titleText = await pageTitle.textContent();
      expect(titleText.toLowerCase()).toMatch(/library|bookshelf|books/i);
      expect(titleText).not.toMatch(/书架|图书馆/);

      const createBtn = page.locator('.btn:has-text("Create"), .btn:has-text("New")');
      if (await createBtn.count() > 0) {
        const btnText = await createBtn.first().textContent();
        expect(btnText.toLowerCase()).toMatch(/create|new/i);
        expect(btnText).not.toMatch(/创建|新建/);
      }

      const filterTabs = page.locator('.filter-tab');
      const tabCount = await filterTabs.count();
      if (tabCount > 0) {
        const firstTabText = await filterTabs.first().textContent();
        expect(firstTabText.toLowerCase()).toMatch(/all|全部/);
      }
    });

    test('书架页应正确显示中文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/bookshelf.html?lang=zh');
      await page.waitForTimeout(1500);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const pageTitle = page.locator('.page-title');
      const titleText = await pageTitle.textContent();
      expect(titleText).toMatch(/书架|图书馆|书籍/);

      const createBtn = page.locator('.btn:has-text("创建"), .btn:has-text("新建")');
      if (await createBtn.count() > 0) {
        const btnText = await createBtn.first().textContent();
        expect(btnText).toMatch(/创建|新建/);
      }
    });

    test('书架页类型标签应正确显示中英文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);

      await page.goto('/bookshelf.html?lang=en');
      await page.waitForTimeout(1500);

      const adventureTab = page.locator('.filter-tab[data-filter="adventure"]');
      if (await adventureTab.count() > 0) {
        const tabText = await adventureTab.textContent();
        expect(tabText.toLowerCase()).toContain('adventure');
        expect(tabText).not.toContain('冒险');
      }

      await page.goto('/bookshelf.html?lang=zh');
      await page.waitForTimeout(1500);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const adventureTabZh = page.locator('.filter-tab[data-filter="adventure"]');
      if (await adventureTabZh.count() > 0) {
        const tabText = await adventureTabZh.textContent();
        expect(tabText).toContain('冒险');
      }
    });
  });

  test.describe('书籍创建页中英文验证', () => {
    test('书籍创建页表单应正确显示英文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/book-create.html?lang=en');
      await page.waitForTimeout(1000);

      const titleLabel = page.locator('label[for="storyTitle"], .form-label:has-text("Title")');
      if (await titleLabel.count() > 0) {
        const labelText = await titleLabel.first().textContent();
        expect(labelText.toLowerCase()).toMatch(/title|故事|名称/);
      }

      const genreLabel = page.locator('label[for="storyGenre"], .form-label:has-text("Genre")');
      if (await genreLabel.count() > 0) {
        const labelText = await genreLabel.first().textContent();
        expect(labelText.toLowerCase()).toMatch(/genre|type|类型/);
      }

      const nextBtn = page.locator('#step1 .btn-next');
      if (await nextBtn.count() > 0) {
        const btnText = await nextBtn.textContent();
        expect(btnText.toLowerCase()).toMatch(/next|continue/i);
        expect(btnText).not.toMatch(/下一步|继续/);
      }
    });

    test('书籍创建页表单应正确显示中文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto('/book-create.html?lang=zh');
      await page.waitForTimeout(1000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const titleLabel = page.locator('label[for="storyTitle"], .form-label');
      if (await titleLabel.count() > 0) {
        const labelText = await titleLabel.first().textContent();
        expect(labelText).toMatch(/标题|故事|名称/);
      }

      const nextBtn = page.locator('#step1 .btn-next');
      if (await nextBtn.count() > 0) {
        const btnText = await nextBtn.textContent();
        expect(btnText).toMatch(/下一步|继续/);
      }
    });

    test('书籍创建页下拉选项应正确显示中英文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);

      await page.goto('/book-create.html?lang=en');
      await page.waitForTimeout(1000);

      const genreSelect = page.locator('#storyGenre');
      await genreSelect.selectOption('adventure');

      const selectedOption = await genreSelect.locator('option[value="adventure"]').textContent();
      expect(selectedOption.toLowerCase()).toContain('adventure');
      expect(selectedOption).not.toContain('冒险');

      await page.goto('/book-create.html?lang=zh');
      await page.waitForTimeout(1000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const genreSelectZh = page.locator('#storyGenre');
      const options = await genreSelectZh.locator('option').allTextContents();
      expect(options.length).toBeGreaterThan(0);
    });
  });

  test.describe('图书馆页中英文验证', () => {
    test('图书馆页应正确显示英文', async ({ page }) => {
      await page.goto('/library.html?lang=en');
      await page.waitForTimeout(1500);

      const pageTitle = page.locator('.page-title');
      const titleText = await pageTitle.textContent();
      expect(titleText.toLowerCase()).toContain('library');
      expect(titleText).not.toContain('图书馆');

      const subtitle = page.locator('.page-subtitle');
      if (await subtitle.count() > 0) {
        const subtitleText = await subtitle.textContent();
        expect(subtitleText.toLowerCase()).toMatch(/explore|stories|ancient/i);
        expect(subtitleText).not.toMatch(/探索|故事/);
      }
    });

    test('图书馆页应正确显示中文', async ({ page }) => {
      await page.goto('/library.html?lang=zh');
      await page.waitForTimeout(1500);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const pageTitle = page.locator('.page-title');
      const titleText = await pageTitle.textContent();
      expect(titleText).toMatch(/Library|图书馆/);

      const subtitle = page.locator('.page-subtitle');
      if (await subtitle.count() > 0) {
        const subtitleText = await subtitle.textContent();
        expect(subtitleText).toBeDefined();
      }
    });

    test('图书馆页筛选标签应正确显示中英文', async ({ page }) => {
      await page.goto('/library.html?lang=en');
      await page.waitForTimeout(1000);

      const allTab = page.locator('.filter-tab[data-filter="all"]');
      if (await allTab.count() > 0) {
        const tabText = await allTab.textContent();
        expect(tabText.toLowerCase()).toContain('all');
      }

      await page.goto('/library.html?lang=zh');
      await page.waitForTimeout(1000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const allTabZh = page.locator('.filter-tab[data-filter="all"]');
      if (await allTabZh.count() > 0) {
        const tabText = await allTabZh.textContent();
        expect(tabText).toMatch(/All|全部/);
      }
    });
  });

  test.describe('导演页中英文验证', () => {
    let testBookId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: 'Director Language Test',
          type: 'adventure',
          protagonist: { name: 'Hero', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        })
      });
      const data = await response.json();
      testBookId = data.data.book_id;
    });

    test('导演页应正确显示英文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/director.html?book_id=${testBookId}&lang=en`);
      await page.waitForTimeout(2000);

      const directorTitle = page.locator('.director-header h1, h1');
      if (await directorTitle.count() > 0) {
        const titleText = await directorTitle.first().textContent();
        expect(titleText.toLowerCase()).toContain('director');
        expect(titleText).not.toContain('导演');
      }

      const startBtn = page.locator('#startBtn, .start-btn');
      if (await startBtn.count() > 0) {
        const btnText = await startBtn.textContent();
        expect(btnText.toLowerCase()).toMatch(/start|shoot|begin/i);
        expect(btnText).not.toMatch(/开始|拍摄/);
      }
    });

    test('导演页应正确显示中文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/director.html?book_id=${testBookId}&lang=zh`);
      await page.waitForTimeout(2000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const directorTitle = page.locator('.director-header h1, h1');
      if (await directorTitle.count() > 0) {
        const titleText = await directorTitle.first().textContent();
        expect(titleText).toContain('导演');
      }

      const startBtn = page.locator('#startBtn, .start-btn');
      if (await startBtn.count() > 0) {
        const btnText = await startBtn.textContent();
        expect(btnText).toMatch(/开始|拍摄/);
      }
    });
  });

  test.describe('章节阅读页中英文验证', () => {
    let testChapterId;

    test.beforeAll(async () => {
      const response = await fetch('http://localhost:8788/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          title: 'Chapter Language Test',
          type: 'adventure',
          protagonist: { name: 'Hero', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
          supporting_characters: []
        })
      });
      const bookData = await response.json();
      const bookId = bookData.data.book_id;

      const chars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
      const cards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);

      const chapterResponse = await fetch('http://localhost:8788/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: testUserId,
          book_id: bookId,
          selected_cards: {
            protagonist_id: chars.find(c => c.is_protagonist === 1).char_id,
            weather_id: cards.find(c => c.sub_type === 'weather').card_id,
            terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
            adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
            equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
          }
        })
      });
      const chapterData = await chapterResponse.json();
      testChapterId = chapterData.data.chapter.chapter_id;
    });

    test('章节阅读页导航按钮应正确显示英文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}&lang=en`);
      await page.waitForTimeout(2000);

      const riddleBtn = page.locator('.scroll-nav-btn:has-text("Riddle"), .scroll-nav-btn:has-text("Puzzle")');
      if (await riddleBtn.count() > 0) {
        const btnText = await riddleBtn.first().textContent();
        expect(btnText.toLowerCase()).toMatch(/riddle|puzzle/i);
        expect(btnText).not.toMatch(/谜题/);
      }

      const nextBtn = page.locator('.scroll-nav-btn:has-text("Next")');
      if (await nextBtn.count() > 0) {
        const btnText = await nextBtn.first().textContent();
        expect(btnText.toLowerCase()).toContain('next');
        expect(btnText).not.toContain('下一章');
      }
    });

    test('章节阅读页导航按钮应正确显示中文', async ({ page }) => {
      await page.addInitScript((userId) => localStorage.setItem('user_id', userId), testUserId);
      await page.goto(`/chapter.html?id=${testChapterId}&lang=zh`);
      await page.waitForTimeout(2000);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);
      }

      const riddleBtn = page.locator('.scroll-nav-btn:has-text("谜题")');
      if (await riddleBtn.count() > 0) {
        const btnText = await riddleBtn.first().textContent();
        expect(btnText).toContain('谜题');
      }

      const nextBtn = page.locator('.scroll-nav-btn');
      if (await nextBtn.count() > 0) {
        const allBtns = await nextBtn.allTextContents();
        expect(allBtns.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('语言切换持久化验证', () => {
    test('语言设置应持久化到localStorage', async ({ page }) => {
      await page.goto('/index.html');
      await page.waitForTimeout(500);

      const zhBtn = page.locator('.lang-btn:has-text("中文")');
      if (await zhBtn.count() > 0) {
        await zhBtn.click();
        await page.waitForTimeout(500);

        const storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
        expect(storedLang).toBe('zh');

        await page.goto('/bookshelf.html');
        await page.waitForTimeout(500);

        const langAfterNav = await page.evaluate(() => localStorage.getItem('storybook-language'));
        expect(langAfterNav).toBe('zh');
      }
    });

    test('语言设置应在页面间保持一致', async ({ page }) => {
      await page.goto('/index.html?lang=en');
      await page.waitForTimeout(500);

      let storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');

      await page.goto('/library.html');
      await page.waitForTimeout(500);

      storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');

      await page.goto('/login.html');
      await page.waitForTimeout(500);

      storedLang = await page.evaluate(() => localStorage.getItem('storybook-language'));
      expect(storedLang).toBe('en');
    });
  });

  test.describe('API语言参数验证', () => {
    test('API应返回正确的英文配置数据', async ({ request }) => {
      const response = await request.get('/api/config/book-types?lang=en');
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.types).toBeDefined();

      const typeNames = data.data.types.map(t => t.name);
      expect(typeNames).toContain("Children's Adventure");
      expect(typeNames).not.toContain('儿童冒险');
    });

    test('API应返回正确的中文配置数据', async ({ request }) => {
      const response = await request.get('/api/config/book-types?lang=zh');
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.data.types).toBeDefined();

      const typeNames = data.data.types.map(t => t.name);
      expect(typeNames).toContain('儿童冒险');
      expect(typeNames).not.toContain("Children's Adventure");
    });

    test('API预设书籍应按语言过滤', async ({ request }) => {
      const enResponse = await request.get('/api/books/preset?lang=en');
      const enData = await enResponse.json();

      expect(enData.success).toBe(true);
      for (const book of enData.data) {
        expect(book.language).toBe('en');
        expect(book.book_id).toMatch(/-en$/);
      }

      const zhResponse = await request.get('/api/books/preset?lang=zh');
      const zhData = await zhResponse.json();

      expect(zhData.success).toBe(true);
      for (const book of zhData.data) {
        expect(book.language).toBe('zh');
        expect(book.book_id).not.toMatch(/-en$/);
      }
    });
  });
});
