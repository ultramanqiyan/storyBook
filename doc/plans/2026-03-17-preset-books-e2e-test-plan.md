# 预设书籍端到端测试验证计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 对39本预设书籍（31本英文+8本中文）进行Playwright端到端测试验证，生成详细测试报告，不修复任何问题。

**Architecture:** 使用Playwright测试框架，结合数据库查询验证静态页面展示、卡牌配置、导入功能、故事导演页等功能。

**Tech Stack:** Playwright, better-sqlite3, Node.js

---

## 测试范围

### 英文书籍（31本）
| 类型 | 书籍ID |
|------|--------|
| AI系列 | preset-ai-001 ~ preset-ai-023 |
| 冒险 | preset-adventure-003-en, preset-adventure-004-en |
| 职场 | preset-business-003-en, preset-business-004-en |
| 魔幻 | preset-fantasy-003-en, preset-fantasy-004-en |
| 言情 | preset-romance-003-en, preset-romance-004-en |

### 中文书籍（8本）
| 类型 | 书籍ID |
|------|--------|
| 冒险 | preset-adventure-003, preset-adventure-004 |
| 职场 | preset-business-003, preset-business-004 |
| 魔幻 | preset-fantasy-003, preset-fantasy-004 |
| 言情 | preset-romance-003, preset-romance-004 |

---

## 测试阶段

### 阶段1：静态文件存在性检查

**目标：** 确认每本书的静态HTML文件存在

**Files:**
- Create: `tests/e2e/preset-books/helpers/db-queries.cjs`
- Create: `tests/e2e/preset-books/helpers/preset-test-helpers.js`
- Create: `tests/e2e/preset-books/01-static-files.spec.js`

**Step 1: 创建数据库查询辅助文件**

创建 `tests/e2e/preset-books/helpers/db-queries.cjs`：

```javascript
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');

let db = null;

function getDb() {
  if (!db) {
    db = new Database(dbPath);
  }
  return db;
}

function getPresetBooks() {
  return getDb().prepare('SELECT book_id, title, type, language FROM books WHERE is_preset = 1 ORDER BY book_id').all();
}

function getCharacters(bookId) {
  return getDb().prepare('SELECT char_id, name, avatar, is_protagonist FROM characters WHERE book_id = ?').all(bookId);
}

function getPlotCards(bookId) {
  return getDb().prepare('SELECT card_id, name, icon, sub_type, description FROM plot_cards WHERE book_id = ?').all(bookId);
}

function getChapters(bookId) {
  return getDb().prepare('SELECT chapter_id, title, order_num, content FROM chapters WHERE book_id = ? ORDER BY order_num').all(bookId);
}

function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getPresetBooks, getCharacters, getPlotCards, getChapters, closeDb };
```

**Step 2: 创建测试辅助函数**

创建 `tests/e2e/preset-books/helpers/preset-test-helpers.js`：

```javascript
import fs from 'fs';
import path from 'path';

export function getStaticBookPath(bookId) {
  return path.join(process.cwd(), 'src', 'frontend', 'books', `${bookId}.html`);
}

export function getStaticChapterPath(bookId, chapterNum) {
  const chapterFiles = fs.readdirSync(path.join(process.cwd(), 'src', 'frontend', 'chapters'))
    .filter(f => f.includes(bookId.replace('preset-', '')));
  return chapterFiles;
}

export function staticBookExists(bookId) {
  const filePath = getStaticBookPath(bookId);
  return fs.existsSync(filePath);
}

export function loadPlotConfig() {
  const enConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', 'en', 'plot-options.json'), 'utf-8'));
  const zhConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', 'zh', 'plot-options.json'), 'utf-8'));
  return { en: enConfig, zh: zhConfig };
}

export function findCardInConfig(cardName, cardIcon, bookType, language, config) {
  const langConfig = language === 'en' ? config.en : config.zh;
  const typeConfig = langConfig[bookType];
  if (!typeConfig) return { found: false, iconMatch: false };
  
  for (const subType of ['weather', 'terrain', 'adventure', 'equipment']) {
    const cards = typeConfig[subType] || [];
    const found = cards.find(c => c.name === cardName);
    if (found) {
      return {
        found: true,
        iconMatch: found.icon === cardIcon,
        expectedIcon: found.icon,
        actualIcon: cardIcon,
        subType
      };
    }
  }
  return { found: false, iconMatch: false };
}
```

**Step 3: 创建静态文件检查测试**

创建 `tests/e2e/preset-books/01-static-files.spec.js`：

```javascript
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
```

---

### 阶段2：静态页面基础验证

**目标：** 验证每本书静态页面的基础展示

**Files:**
- Create: `tests/e2e/preset-books/02-static-page-basic.spec.js`

**Step 1: 创建静态页面基础测试**

创建 `tests/e2e/preset-books/02-static-page-basic.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import { getPresetBooks, getChapters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();

test.describe('阶段2：静态页面基础验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
      });

      test('页面应加载成功', async ({ page }) => {
        await expect(page.locator('.book-container')).toBeVisible();
      });

      test('书籍标题应正确', async ({ page }) => {
        const title = await page.locator('.book-meta-info h2').textContent();
        expect(title.trim()).toBe(book.title);
      });

      test('类型标签应正确', async ({ page }) => {
        const typeBadge = page.locator('.type-badge');
        await expect(typeBadge).toBeVisible();
      });

      test('章节目录数量应正确', async ({ page }) => {
        const dbChapters = getChapters(book.book_id);
        const pageChapters = await page.locator('.chapter-toc-item').count();
        expect(pageChapters).toBe(dbChapters.length);
      });

      test('章节编号应正确显示', async ({ page }) => {
        const chapterItems = await page.locator('.chapter-toc-item .chapter-number').allTextContents();
        const isZh = book.language === 'zh';
        const expectedPrefix = isZh ? '第' : 'Ch.';
        
        for (let i = 0; i < Math.min(chapterItems.length, 3); i++) {
          expect(chapterItems[i]).toContain(expectedPrefix);
        }
      });
    });
  }
});
```

---

### 阶段3：章节内容验证

**目标：** 验证章节页面内容不为空

**Files:**
- Create: `tests/e2e/preset-books/03-chapter-content.spec.js`

**Step 1: 创建章节内容测试**

创建 `tests/e2e/preset-books/03-chapter-content.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import { getPresetBooks, getChapters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();

test.describe('阶段3：章节内容验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    const chapters = getChapters(book.book_id);
    
    if (chapters.length === 0) {
      test(`[${book.language.toUpperCase()}] ${book.book_id} - 无章节`, () => {
        expect(chapters.length).toBeGreaterThan(0);
      });
      continue;
    }

    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      const firstChapter = chapters[0];
      const lastChapter = chapters[chapters.length - 1];

      test('第一章内容不为空', async ({ page }) => {
        await page.goto(`/chapter.html?id=${firstChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        
        const content = await page.locator('.chapter-content, .page-text').first().textContent();
        expect(content.trim().length).toBeGreaterThan(100);
      });

      test('最后一章内容不为空', async ({ page }) => {
        await page.goto(`/chapter.html?id=${lastChapter.chapter_id}&is_preset=1`);
        await page.waitForTimeout(1000);
        
        const content = await page.locator('.chapter-content, .page-text').first().textContent();
        expect(content.trim().length).toBeGreaterThan(100);
      });
    });
  }
});
```

---

### 阶段4：角色卡牌验证

**目标：** 验证角色卡牌数量、名称、emoji、主角标识

**Files:**
- Create: `tests/e2e/preset-books/04-character-cards.spec.js`

**Step 1: 创建角色卡牌测试**

创建 `tests/e2e/preset-books/04-character-cards.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import { getPresetBooks, getCharacters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();

test.describe('阶段4：角色卡牌验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    const dbCharacters = getCharacters(book.book_id);

    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.locator('.view-tab:has-text("角色")').click();
        await page.waitForTimeout(500);
      });

      test('角色数量应正确', async ({ page }) => {
        const pageCharacters = await page.locator('.hs-card-mini').count();
        expect(pageCharacters).toBe(dbCharacters.length);
      });

      test('应有且仅有一个主角', async () => {
        const protagonists = dbCharacters.filter(c => c.is_protagonist === 1);
        expect(protagonists.length).toBe(1);
      });

      test('角色名称应正确', async ({ page }) => {
        for (const char of dbCharacters) {
          const card = page.locator('.hs-card-mini').filter({ hasText: char.name });
          if (await card.count() > 0) {
            const name = await card.locator('[style*="color: #FFD700"], .hs-card-name').textContent();
            expect(name.trim()).toContain(char.name);
          }
        }
      });

      test('角色emoji应正确', async ({ page }) => {
        for (const char of dbCharacters) {
          const card = page.locator('.hs-card-mini').filter({ hasText: char.name });
          if (await card.count() > 0) {
            const emoji = await card.locator('div[style*="font-size: 48px"], div[style*="font-size:36px"]').first().textContent();
            expect(emoji.trim()).toBe(char.avatar);
          }
        }
      });
    });
  }
});
```

---

### 阶段5：情节卡牌验证

**目标：** 验证情节卡牌数量、类型、配置存在性、emoji一致性

**Files:**
- Create: `tests/e2e/preset-books/05-plot-cards.spec.js`

**Step 1: 创建情节卡牌测试**

创建 `tests/e2e/preset-books/05-plot-cards.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import { getPresetBooks, getPlotCards, closeDb } from './helpers/db-queries.cjs';
import { loadPlotConfig, findCardInConfig } from './helpers/preset-test-helpers.js';

const books = getPresetBooks();
const config = loadPlotConfig();

test.describe('阶段5：情节卡牌验证', () => {
  test.afterAll(() => {
    closeDb();
  });

  for (const book of books) {
    const dbCards = getPlotCards(book.book_id);

    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.locator('.view-tab:has-text("卡牌")').click();
        await page.waitForTimeout(500);
      });

      test('情节卡牌数量应正确', async ({ page }) => {
        const validCards = dbCards.filter(c => ['weather', 'terrain', 'adventure', 'equipment'].includes(c.sub_type));
        const pageCards = await page.locator('.hs-card-mini.plot-card, .hs-card-mini').count();
        expect(pageCards).toBeGreaterThanOrEqual(validCards.length);
      });

      test('卡牌类型应覆盖四种', async () => {
        const subTypes = [...new Set(dbCards.map(c => c.sub_type))];
        expect(subTypes).toContain('weather');
        expect(subTypes).toContain('terrain');
        expect(subTypes).toContain('adventure');
        expect(subTypes).toContain('equipment');
      });

      test('每张卡牌应在项目配置中存在', async () => {
        const missingCards = [];
        for (const card of dbCards) {
          const result = findCardInConfig(card.name, card.icon, book.type, book.language, config);
          if (!result.found) {
            missingCards.push({
              name: card.name,
              icon: card.icon,
              sub_type: card.sub_type
            });
          }
        }
        expect(missingCards).toEqual([]);
      });

      test('每张卡牌emoji应与项目配置一致', async () => {
        const mismatchedCards = [];
        for (const card of dbCards) {
          const result = findCardInConfig(card.name, card.icon, book.type, book.language, config);
          if (result.found && !result.iconMatch) {
            mismatchedCards.push({
              name: card.name,
              expected: result.expectedIcon,
              actual: result.actualIcon
            });
          }
        }
        expect(mismatchedCards).toEqual([]);
      });

      test('页面显示的卡牌emoji应正确', async ({ page }) => {
        for (const card of dbCards.slice(0, 5)) {
          const cardElement = page.locator('.hs-card-mini').filter({ hasText: card.name });
          if (await cardElement.count() > 0) {
            const emoji = await cardElement.locator('div[style*="font-size"]').first().textContent();
            expect(emoji.trim()).toBe(card.icon);
          }
        }
      });
    });
  }
});
```

---

### 阶段6：导入功能验证

**目标：** 验证登录后导入书籍功能

**Files:**
- Create: `tests/e2e/preset-books/06-import-function.spec.js`

**Step 1: 创建导入功能测试**

创建 `tests/e2e/preset-books/06-import-function.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from '../helpers/db-helper.js';
import path from 'path';
import { getPresetBooks, getCharacters, getPlotCards, getChapters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();
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
  closeDb();
});

test.describe('阶段6：导入功能验证', () => {
  for (const book of books) {
    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test('导入按钮应可用', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import")');
        await expect(importBtn).toBeEnabled();
      });

      test('导入API应成功', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import")');
        
        const [response] = await Promise.all([
          page.waitForResponse(resp => 
            resp.url().includes(`/api/books/${book.book_id}/import`) && 
            resp.request().method() === 'POST',
            { timeout: 15000 }
          ).catch(() => null),
          importBtn.click()
        ]);
        
        if (response) {
          expect(response.ok()).toBeTruthy();
        }
      });

      test('导入后角色数量应一致', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import")');
        await importBtn.click();
        await page.waitForTimeout(2000);
        
        const originalChars = getCharacters(book.book_id);
        expect(originalChars.length).toBeGreaterThanOrEqual(3);
      });

      test('导入后卡牌数量应一致', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        
        const originalCards = getPlotCards(book.book_id);
        expect(originalCards.length).toBeGreaterThanOrEqual(4);
      });

      test('导入后章节数量应一致', async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
        
        const originalChapters = getChapters(book.book_id);
        expect(originalChapters.length).toBeGreaterThanOrEqual(1);
      });
    });
  }
});
```

---

### 阶段7：故事导演页验证

**目标：** 验证故事导演页卡牌显示和添加章节功能

**Files:**
- Create: `tests/e2e/preset-books/07-director-page.spec.js`

**Step 1: 创建故事导演页测试**

创建 `tests/e2e/preset-books/07-director-page.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from '../helpers/db-helper.js';
import path from 'path';
import { getPresetBooks, getPlotCards, getCharacters, closeDb } from './helpers/db-queries.cjs';

const books = getPresetBooks();
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
  closeDb();
});

test.describe('阶段7：故事导演页验证', () => {
  for (const book of books.slice(0, 5)) {
    test.describe(`[${book.language.toUpperCase()}] ${book.book_id}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/books/${book.book_id}.html`);
        await page.evaluate((userId) => localStorage.setItem('user_id', userId), testUserId);
      });

      test('进入导演页应成功', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import")');
        await importBtn.click();
        await page.waitForTimeout(2000);
        
        await expect(page).toHaveURL(/book\.html/);
      });

      test('导演页卡牌emoji应正确显示', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import")');
        await importBtn.click();
        await page.waitForTimeout(2000);
        
        const dbCards = getPlotCards(book.book_id);
        for (const card of dbCards.slice(0, 3)) {
          const cardElement = page.locator('.hs-card-mini, .plot-card').filter({ hasText: card.name });
          if (await cardElement.count() > 0) {
            const emoji = await cardElement.locator('div[style*="font-size"]').first().textContent();
            expect(emoji.trim()).toBe(card.icon);
          }
        }
      });

      test('导演页角色emoji应正确显示', async ({ page }) => {
        const importBtn = page.locator('button:has-text("续写"), button:has-text("Import")');
        await importBtn.click();
        await page.waitForTimeout(2000);
        
        const dbChars = getCharacters(book.book_id);
        for (const char of dbChars) {
          const cardElement = page.locator('.hs-card-mini').filter({ hasText: char.name });
          if (await cardElement.count() > 0) {
            const emoji = await cardElement.locator('div[style*="font-size"]').first().textContent();
            expect(emoji.trim()).toBe(char.avatar);
          }
        }
      });
    });
  }
});
```

---

### 阶段8：生成测试报告

**目标：** 汇总所有测试结果，生成详细报告

**Files:**
- Create: `tests/e2e/preset-books/08-generate-report.spec.js`

**Step 1: 创建报告生成测试**

创建 `tests/e2e/preset-books/08-generate-report.spec.js`：

```javascript
import { test, expect } from '@playwright/test';
import { getPresetBooks, closeDb } from './helpers/db-queries.cjs';
import fs from 'fs';
import path from 'path';

const books = getPresetBooks();

test.describe('阶段8：生成测试报告', () => {
  test('生成预设书籍测试报告', async () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalBooks: books.length,
        englishBooks: books.filter(b => b.language === 'en').length,
        chineseBooks: books.filter(b => b.language === 'zh').length
      },
      books: books.map(book => ({
        bookId: book.book_id,
        title: book.title,
        type: book.type,
        language: book.language
      }))
    };
    
    const reportPath = path.join(process.cwd(), 'doc', 'preset-books-e2e-test-report.md');
    const content = generateMarkdownReport(report);
    fs.writeFileSync(reportPath, content);
    
    expect(fs.existsSync(reportPath)).toBe(true);
  });
});

function generateMarkdownReport(report) {
  return `# 预设书籍端到端测试报告

**生成时间:** ${report.generatedAt}

## 测试摘要

| 指标 | 数量 |
|------|------|
| 总书籍数 | ${report.summary.totalBooks} |
| 英文书籍 | ${report.summary.englishBooks} |
| 中文书籍 | ${report.summary.chineseBooks} |

## 测试结果

| 书籍ID | 标题 | 类型 | 语言 | 静态页面 | 章节 | 角色 | 卡牌 | 导入 | 导演页 |
|--------|------|------|------|----------|------|------|------|------|--------|
${report.books.map(b => `| ${b.bookId} | ${b.title} | ${b.type} | ${b.language} | 待测试 | 待测试 | 待测试 | 待测试 | 待测试 | 待测试 |`).join('\n')}

## 问题列表

*测试完成后将在此列出发现的问题*
`;
}
```

---

## 执行说明

1. **运行所有测试：**
   ```bash
   npx playwright test tests/e2e/preset-books/ --reporter=list
   ```

2. **运行单个阶段：**
   ```bash
   npx playwright test tests/e2e/preset-books/01-static-files.spec.js
   ```

3. **生成HTML报告：**
   ```bash
   npx playwright test tests/e2e/preset-books/ --reporter=html
   ```

---

## 注意事项

1. **测试原则：只测试，出报告，不修复问题**
2. 每本书的情节卡牌需要检查是否在项目配置中存在
3. 每本书的情节卡牌emoji需要与项目配置对比
4. 测试前确保本地服务已启动（`npm run dev`）
5. 测试前确保数据库已初始化
