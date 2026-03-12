# Playwright E2E测试实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现书籍创建和章节添加两个核心流程的Playwright端到端测试，包含网页操作和SQLite数据库验证。

**Architecture:** 使用Playwright进行页面操作，better-sqlite3直接查询本地D1数据库文件验证数据，每个测试独立运行并重置数据库。

**Tech Stack:** Playwright, better-sqlite3, Cloudflare D1 (SQLite)

---

## Task 1: 安装测试依赖

**Files:**
- Modify: `package.json`

**Step 1: 安装better-sqlite3**

Run: `npm install --save-dev better-sqlite3`

Expected: 安装成功，package.json中devDependencies添加better-sqlite3

**Step 2: 验证安装**

Run: `npm list better-sqlite3`

Expected: 显示better-sqlite3版本

---

## Task 2: 创建数据库辅助工具

**Files:**
- Create: `test/e2e/helpers/db-helper.js`

**Step 1: 创建helpers目录**

Run: `mkdir -p test/e2e/helpers` (Windows: `New-Item -ItemType Directory -Force -Path test/e2e/helpers`)

**Step 2: 编写db-helper.js**

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const TEST_USER_ID = 'test-user-001';
const TEST_USER_EMAIL = 'test@example.com';
const TEST_USER_PASSWORD = 'testpassword123';

class DatabaseHelper {
  constructor() {
    this.db = null;
    this.dbPath = null;
  }

  findDatabasePath() {
    const wranglerPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1');
    
    if (!fs.existsSync(wranglerPath)) {
      return null;
    }

    const miniflarePath = path.join(wranglerPath, 'miniflare-D1DatabaseObject');
    
    if (!fs.existsSync(miniflarePath)) {
      return null;
    }

    const dirs = fs.readdirSync(miniflarePath);
    for (const dir of dirs) {
      const dbPath = path.join(miniflarePath, dir, 'db.sqlite');
      if (fs.existsSync(dbPath)) {
        return dbPath;
      }
    }

    return null;
  }

  connect() {
    this.dbPath = this.findDatabasePath();
    if (!this.dbPath) {
      throw new Error('Database file not found. Make sure wrangler dev is running.');
    }
    this.db = new Database(this.dbPath);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  resetDatabase() {
    this.execSqlFile(path.join(process.cwd(), 'migrations', '0001_init.sql'));
  }

  execSqlFile(filePath) {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = sql.split(';').filter(s => s.trim());
    for (const statement of statements) {
      try {
        this.db.exec(statement);
      } catch (e) {
        // Ignore "table already exists" errors
        if (!e.message.includes('already exists')) {
          throw e;
        }
      }
    }
  }

  createTestUser() {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync(TEST_USER_PASSWORD, 10);
    
    this.db.prepare(
      'INSERT OR REPLACE INTO users (user_id, email, password) VALUES (?, ?, ?)'
    ).run(TEST_USER_ID, TEST_USER_EMAIL, hashedPassword);
  }

  getTestUserId() {
    return TEST_USER_ID;
  }

  query(sql, params = []) {
    return this.db.prepare(sql).get(...params);
  }

  queryAll(sql, params = []) {
    return this.db.prepare(sql).all(...params);
  }

  run(sql, params = []) {
    return this.db.prepare(sql).run(...params);
  }

  getBookById(bookId) {
    return this.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
  }

  getBooksByTitle(title) {
    return this.queryAll('SELECT * FROM books WHERE title = ?', [title]);
  }

  getCharactersByBookId(bookId) {
    return this.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
  }

  getProtagonistByBookId(bookId) {
    return this.query('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1', [bookId]);
  }

  getSupportingByBookId(bookId) {
    return this.queryAll('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0', [bookId]);
  }

  getPlotCardsByBookId(bookId) {
    return this.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
  }

  getPlotCardsBySubType(bookId, subType) {
    return this.queryAll('SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?', [bookId, subType]);
  }

  getChaptersByBookId(bookId) {
    return this.queryAll('SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num', [bookId]);
  }

  getPuzzlesByChapterId(chapterId) {
    return this.queryAll('SELECT * FROM puzzles WHERE chapter_id = ?', [chapterId]);
  }

  countBooks() {
    const result = this.query('SELECT COUNT(*) as count FROM books');
    return result ? result.count : 0;
  }

  countCharacters() {
    const result = this.query('SELECT COUNT(*) as count FROM characters');
    return result ? result.count : 0;
  }

  countChapters() {
    const result = this.query('SELECT COUNT(*) as count FROM chapters');
    return result ? result.count : 0;
  }

  countPuzzles() {
    const result = this.query('SELECT COUNT(*) as count FROM puzzles');
    return result ? result.count : 0;
  }
}

module.exports = DatabaseHelper;
```

**Step 3: 验证文件创建**

Run: `ls test/e2e/helpers/`

Expected: 显示 db-helper.js

---

## Task 3: 更新Playwright配置

**Files:**
- Modify: `playwright.config.js`

**Step 1: 读取当前配置**

Run: `cat playwright.config.js`

**Step 2: 更新配置**

将 `testDir` 从 `'./tests/e2e'` 改为 `'./test/e2e'`：

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://localhost:8788',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8788',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
```

**Step 3: 验证配置**

Run: `npx playwright test --list`

Expected: 列出现有测试文件

---

## Task 4: 创建书籍创建测试

**Files:**
- Create: `test/e2e/book-create.spec.js`

**Step 1: 编写测试文件**

```javascript
const { test, expect } = require('@playwright/test');
const DatabaseHelper = require('./helpers/db-helper');

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
      localStorage.setItem('userId', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await expect(page.locator('.create-header h1')).toContainText('Create New Story');

    await page.fill('#storyTitle', testBookTitle);
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('button:has-text("Next")');

    await expect(page.locator('#step2')).toBeVisible();

    await page.fill('#protagonistName', protagonistName);
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('button:has-text("Next")');

    await expect(page.locator('#step3')).toBeVisible();

    const companionInput = page.locator('#companion1 input');
    await companionInput.fill(companionName);
    await page.locator('#companion1Avatars .avatar-option').first().click();
    await page.click('button:has-text("Create Story")');

    await expect(page.locator('.success-title')).toContainText('Story Created', { timeout: 10000 });

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
      localStorage.setItem('userId', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.selectOption('#storyGenre', 'adventure');
    await page.click('button:has-text("Next")');

    await expect(page.locator('#step1')).toBeVisible();
  });

  test('创建书籍不选择类型应失败', async ({ page }) => {
    const testUserId = db.getTestUserId();

    await page.addInitScript((userId) => {
      localStorage.setItem('userId', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    await page.fill('#storyTitle', '测试书籍');
    await page.click('button:has-text("Next")');

    await expect(page.locator('#step1')).toBeVisible();
  });
});
```

**Step 2: 验证语法**

Run: `node --check test/e2e/book-create.spec.js`

Expected: 无错误输出

---

## Task 5: 创建章节添加测试

**Files:**
- Create: `test/e2e/chapter-add.spec.js`

**Step 1: 编写测试文件**

```javascript
const { test, expect } = require('@playwright/test');
const DatabaseHelper = require('./helpers/db-helper');

test.describe('章节添加流程', () => {
  let db;
  let testBookId;
  let testUserId;
  let protagonistId;
  let weatherCardId;
  let terrainCardId;
  let adventureCardId;
  let equipmentCardId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();

    testBookId = createTestBook(db, testUserId);
    
    const cards = db.getPlotCardsByBookId(testBookId);
    weatherCardId = cards.find(c => c.sub_type === 'weather')?.card_id;
    terrainCardId = cards.find(c => c.sub_type === 'terrain')?.card_id;
    adventureCardId = cards.find(c => c.sub_type === 'adventure')?.card_id;
    equipmentCardId = cards.find(c => c.sub_type === 'equipment')?.card_id;
    
    const protagonist = db.getProtagonistByBookId(testBookId);
    protagonistId = protagonist?.char_id;
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('添加章节并验证数据库', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('userId', userId);
    }, testUserId);

    await page.goto(`/director.html?book_id=${testBookId}`);

    await expect(page.locator('.director-header h1')).toContainText('Story Director');

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click();
    await expect(page.locator('[data-slot="protagonist"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click();
    await expect(page.locator('[data-slot="weather"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click();
    await expect(page.locator('[data-slot="terrain"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click();
    await expect(page.locator('[data-slot="adventure"].filled')).toBeVisible();

    await page.locator(`.fan-card[data-id="${equipmentCardId}"]`).click();
    await expect(page.locator('[data-slot="equipment"].filled')).toBeVisible();

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeEnabled();

    await startBtn.click();

    await expect(page).toHaveURL(/chapter\.html/, { timeout: 15000 });

    const chapters = db.getChaptersByBookId(testBookId);
    expect(chapters.length).toBe(1);

    const chapter = chapters[0];
    expect(chapter.book_id).toBe(testBookId);
    expect(chapter.title).toBeDefined();
    expect(chapter.content).toBeDefined();
    expect(chapter.order_num).toBe(1);

    const selectedCards = JSON.parse(chapter.selected_cards);
    expect(selectedCards.protagonist_id).toBe(protagonistId);
    expect(selectedCards.weather_id).toBe(weatherCardId);
    expect(selectedCards.terrain_id).toBe(terrainCardId);
    expect(selectedCards.adventure_id).toBe(adventureCardId);
    expect(selectedCards.equipment_id).toBe(equipmentCardId);

    const puzzles = db.getPuzzlesByChapterId(chapter.chapter_id);
    expect(puzzles.length).toBe(1);

    const puzzle = puzzles[0];
    expect(puzzle.question).toBeDefined();
    expect(puzzle.answer).toBeDefined();
    expect(puzzle.puzzle_type).toBe('text');
    expect(puzzle.is_solved).toBe(0);
    expect(puzzle.max_attempts).toBe(3);
  });

  test('未选择必需卡牌时按钮应禁用', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('userId', userId);
    }, testUserId);

    await page.goto(`/director.html?book_id=${testBookId}`);

    const startBtn = page.locator('#startBtn');
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${protagonistId}"]`).click();
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${weatherCardId}"]`).click();
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${terrainCardId}"]`).click();
    await expect(startBtn).toBeDisabled();

    await page.locator(`.fan-card[data-id="${adventureCardId}"]`).click();
    await expect(startBtn).toBeEnabled();
  });
});

function createTestBook(db, userId) {
  const bookId = 'test-book-' + Date.now();
  db.run(
    'INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)',
    [bookId, userId, '测试书籍', 'adventure']
  );

  const protagonistId = 'test-protagonist-' + Date.now();
  db.run(
    'INSERT INTO characters (char_id, book_id, name, avatar, personality, speech_style, role_type, is_protagonist, intimacy) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)',
    [protagonistId, bookId, '测试主角', '🧙‍♂️', '', '', '', 1, 0]
  );

  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const icons = { weather: '☀️', terrain: '🌲', adventure: '🗺️', equipment: '🎒' };
  
  for (const subType of subTypes) {
    for (let i = 0; i < 4; i++) {
      const cardId = `test-card-${subType}-${i}-${Date.now()}`;
      db.run(
        'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
        [cardId, bookId, 'plot', subType, `测试${subType}${i}`, icons[subType], `测试描述`]
      );
    }
  }

  return bookId;
}
```

**Step 2: 验证语法**

Run: `node --check test/e2e/chapter-add.spec.js`

Expected: 无错误输出

---

## Task 6: 运行测试验证

**Step 1: 启动开发服务器**

Run: `npm run dev` (在后台运行)

**Step 2: 运行书籍创建测试**

Run: `npx playwright test test/e2e/book-create.spec.js --headed`

Expected: 测试通过

**Step 3: 运行章节添加测试**

Run: `npx playwright test test/e2e/chapter-add.spec.js --headed`

Expected: 测试通过

**Step 4: 运行所有E2E测试**

Run: `npx playwright test`

Expected: 所有测试通过

---

## Task 7: 提交代码

**Step 1: 查看变更**

Run: `git status`

**Step 2: 添加文件**

Run: `git add test/e2e/helpers/db-helper.js test/e2e/book-create.spec.js test/e2e/chapter-add.spec.js playwright.config.js package.json package-lock.json doc/plans/2026-03-12-playwright-e2e-test-design.md`

**Step 3: 提交**

Run: `git commit -m "feat: add Playwright E2E tests for book creation and chapter addition

- Add db-helper.js for SQLite database verification
- Add book-create.spec.js for book creation flow testing
- Add chapter-add.spec.js for chapter addition flow testing
- Update playwright.config.js test directory
- Add better-sqlite3 dependency for database queries"`
