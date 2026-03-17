# AI系列书籍逐本验证流程实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 逐本验证和修复所有23本AI系列书籍，确保每本书有8章以上、内容长度达标、类型正确，并通过端到端测试验证。

**Architecture:** 
1. 创建验证脚本检查数据库中的书籍数据
2. 创建Playwright测试验证静态页面内容
3. 创建主流程脚本协调整个验证流程
4. 逐本处理，每本完成后才进入下一本

**Tech Stack:** Node.js, Wrangler CLI (Cloudflare D1), Playwright, SQLite

---

## 前置条件

- 开发服务器运行在 http://127.0.0.1:8788
- 数据库使用 storybook_database (本地D1数据库)
- Playwright 已安装配置

---

## Task 1: 创建单本书验证脚本

**Files:**
- Create: `scripts/validate-single-book.js`

**Step 1: 创建验证脚本框架**

```javascript
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_MIN_LENGTH = {
  en: 1500,
  zh: 800
};

const MIN_CHAPTERS = 8;

const BOOK_TYPES = {
  'preset-ai-001': 'business',
  'preset-ai-002': 'business',
  'preset-ai-003': 'business',
  'preset-ai-004': 'business',
  'preset-ai-005': 'business',
  'preset-ai-006': 'romance',
  'preset-ai-007': 'romance',
  'preset-ai-008': 'romance',
  'preset-ai-009': 'romance',
  'preset-ai-010': 'romance',
  'preset-ai-011': 'business',
  'preset-ai-012': 'fantasy',
  'preset-ai-013': 'fantasy',
  'preset-ai-014': 'business',
  'preset-ai-015': 'fantasy',
  'preset-ai-016': 'business',
  'preset-ai-017': 'business',
  'preset-ai-018': 'business',
  'preset-ai-019': 'business',
  'preset-ai-020': 'fantasy',
  'preset-ai-021': 'fantasy',
  'preset-ai-022': 'fantasy',
  'preset-ai-023': 'fantasy'
};

function runQuery(query) {
  const result = execSync(
    `npx wrangler d1 execute storybook_database --local --command "${query.replace(/"/g, '\\"')}"`,
    { cwd: path.join(__dirname, '..'), encoding: 'utf-8' }
  );
  return result;
}

function parseQueryResult(result) {
  const lines = result.split('\n');
  const dataLines = lines.filter(line => line.includes('│') && !line.includes('book_id') && !line.includes('──'));
  return dataLines.map(line => {
    const parts = line.split('│').filter(p => p.trim());
    return parts.map(p => p.trim());
  }).filter(arr => arr.length > 0);
}

export function validateBook(bookId) {
  const results = {
    bookId,
    passed: true,
    errors: [],
    warnings: [],
    stats: {}
  };

  const expectedType = BOOK_TYPES[bookId];
  if (!expectedType) {
    results.errors.push(`Unknown book ID: ${bookId}`);
    results.passed = false;
    return results;
  }

  const lang = bookId.endsWith('-zh') ? 'zh' : 'en';
  const baseId = lang === 'zh' ? bookId.replace('-zh', '') : bookId;
  const minLength = CONTENT_MIN_LENGTH[lang];

  console.log(`\nValidating ${bookId}...`);
  console.log(`  Language: ${lang}`);
  console.log(`  Expected type: ${expectedType}`);
  console.log(`  Min content length: ${minLength}`);
  console.log(`  Min chapters: ${MIN_CHAPTERS}`);

  return results;
}

export function validateBookPair(baseId) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Validating book pair: ${baseId}`);
  console.log('='.repeat(60));

  const enResult = validateBook(baseId);
  const zhResult = validateBook(`${baseId}-zh`);

  return {
    baseId,
    en: enResult,
    zh: zhResult,
    bothPassed: enResult.passed && zhResult.passed
  };
}

const bookId = process.argv[2];
if (bookId) {
  if (bookId.includes('-zh')) {
    validateBook(bookId);
  } else {
    validateBookPair(bookId);
  }
}
```

**Step 2: 测试脚本可运行**

Run: `node scripts/validate-single-book.js preset-ai-001`
Expected: 输出验证信息

**Step 3: Commit**

```bash
git add scripts/validate-single-book.js
git commit -m "feat: add single book validation script"
```

---

## Task 2: 实现数据库验证逻辑

**Files:**
- Modify: `scripts/validate-single-book.js`

**Step 1: 添加书籍记录验证**

在 `validateBook` 函数中添加：

```javascript
export function validateBook(bookId) {
  const results = {
    bookId,
    passed: true,
    errors: [],
    warnings: [],
    stats: {}
  };

  const expectedType = BOOK_TYPES[bookId];
  if (!expectedType) {
    results.errors.push(`Unknown book ID: ${bookId}`);
    results.passed = false;
    return results;
  }

  const lang = bookId.endsWith('-zh') ? 'zh' : 'en';
  const baseId = lang === 'zh' ? bookId.replace('-zh', '') : bookId;
  const minLength = CONTENT_MIN_LENGTH[lang];

  console.log(`\nValidating ${bookId}...`);
  console.log(`  Language: ${lang}`);
  console.log(`  Expected type: ${expectedType}`);
  console.log(`  Min content length: ${minLength}`);
  console.log(`  Min chapters: ${MIN_CHAPTERS}`);

  // 验证书籍记录
  try {
    const bookQuery = `SELECT book_id, title, type, language FROM books WHERE book_id = '${bookId}'`;
    const bookResult = runQuery(bookQuery);
    const bookRows = parseQueryResult(bookResult);

    if (bookRows.length === 0) {
      results.errors.push(`Book record not found in database`);
      results.passed = false;
      return results;
    }

    const book = bookRows[0];
    results.stats.title = book[1];
    results.stats.currentType = book[2];
    results.stats.language = book[3];

    if (book[2] !== expectedType) {
      results.warnings.push(`Type mismatch: expected ${expectedType}, got ${book[2]}`);
    }

    console.log(`  ✓ Book record found: ${book[1]}`);
  } catch (error) {
    results.errors.push(`Failed to query book: ${error.message}`);
    results.passed = false;
    return results;
  }

  return results;
}
```

**Step 2: 添加章节验证逻辑**

继续在 `validateBook` 函数中添加：

```javascript
  // 验证章节数量和内容
  try {
    const chapterQuery = `SELECT chapter_id, title, LENGTH(content) as len FROM chapters WHERE book_id = '${bookId}' ORDER BY order_num`;
    const chapterResult = runQuery(chapterQuery);
    const chapterRows = parseQueryResult(chapterResult);

    results.stats.chapterCount = chapterRows.length;

    if (chapterRows.length < MIN_CHAPTERS) {
      results.errors.push(`Insufficient chapters: ${chapterRows.length} < ${MIN_CHAPTERS}`);
      results.passed = false;
    } else {
      console.log(`  ✓ Chapter count: ${chapterRows.length}`);
    }

    // 检查每章内容长度
    const shortChapters = [];
    chapterRows.forEach((row, index) => {
      const length = parseInt(row[2]);
      if (length < minLength) {
        shortChapters.push({
          chapter: row[0],
          title: row[1],
          length: length
        });
      }
    });

    if (shortChapters.length > 0) {
      results.errors.push(`Short chapters found: ${shortChapters.map(c => `${c.chapter}(${c.length})`).join(', ')}`);
      results.passed = false;
    } else {
      console.log(`  ✓ All chapters meet minimum length`);
    }

    results.stats.shortChapters = shortChapters;
    results.stats.minChapterLength = Math.min(...chapterRows.map(r => parseInt(r[2])));
    results.stats.maxChapterLength = Math.max(...chapterRows.map(r => parseInt(r[2])));

  } catch (error) {
    results.errors.push(`Failed to query chapters: ${error.message}`);
    results.passed = false;
  }

  console.log(`  ${results.passed ? '✓ PASSED' : '✗ FAILED'}`);
  return results;
```

**Step 3: 测试验证逻辑**

Run: `node scripts/validate-single-book.js preset-ai-001`
Expected: 显示详细的验证结果

**Step 4: Commit**

```bash
git add scripts/validate-single-book.js
git commit -m "feat: implement database validation logic"
```

---

## Task 3: 创建Playwright端到端测试

**Files:**
- Create: `tests/e2e/ai-book-validation.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8788';

const AI_BOOKS = [
  { id: 'preset-ai-001', title: 'The Last Writer', type: 'business' },
  { id: 'preset-ai-001-zh', title: '最后的作家', type: 'business' },
  // ... 其他书籍
];

test.describe('AI系列书籍验证', () => {
  test.describe.configure({ mode: 'serial' });

  for (const book of AI_BOOKS) {
    test(`${book.id} - 书籍页面应正确显示`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}.html`);
      
      // 验证书籍容器存在
      await expect(page.locator('.book-container')).toBeVisible();
      
      // 验证书籍标题
      const titleElement = page.locator('.book-meta-info h2');
      await expect(titleElement).toContainText(book.title);
    });

    test(`${book.id} - 章节目录应完整`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}.html`);
      
      const chapterItems = page.locator('.chapter-toc-item');
      const count = await chapterItems.count();
      
      // 至少8章
      expect(count).toBeGreaterThanOrEqual(8);
    });

    test(`${book.id} - 章节内容应完整显示`, async ({ page }) => {
      await page.goto(`${BASE_URL}/books/${book.id}.html`);
      
      // 点击第一章
      const firstChapter = page.locator('.chapter-toc-item').first();
      await firstChapter.click();
      
      await page.waitForURL(/chapter/, { timeout: 5000 });
      
      // 验证内容显示
      const content = page.locator('.reading-content');
      const text = await content.first().textContent();
      
      // 内容长度验证
      expect(text.length).toBeGreaterThan(500);
    });
  }
});
```

**Step 2: 运行测试验证框架**

Run: `npx playwright test tests/e2e/ai-book-validation.spec.js --list`
Expected: 列出所有测试用例

**Step 3: Commit**

```bash
git add tests/e2e/ai-book-validation.spec.js
git commit -m "feat: add AI book validation playwright tests"
```

---

## Task 4: 创建主流程脚本

**Files:**
- Create: `scripts/process-ai-books.js`

**Step 1: 创建主流程脚本**

```javascript
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateBookPair } from './validate-single-book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_BOOK_BASE_IDS = [
  'preset-ai-001', 'preset-ai-002', 'preset-ai-003', 'preset-ai-004',
  'preset-ai-005', 'preset-ai-006', 'preset-ai-007', 'preset-ai-008',
  'preset-ai-009', 'preset-ai-010', 'preset-ai-011', 'preset-ai-012',
  'preset-ai-013', 'preset-ai-014', 'preset-ai-015', 'preset-ai-016',
  'preset-ai-017', 'preset-ai-018', 'preset-ai-019', 'preset-ai-020',
  'preset-ai-021', 'preset-ai-022', 'preset-ai-023'
];

function generateStaticPages() {
  console.log('\n📚 Generating static pages...');
  execSync('node scripts/generate-preset-pages.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
}

function runPlaywrightTest(bookId) {
  console.log(`\n🎭 Running Playwright test for ${bookId}...`);
  try {
    execSync(`npx playwright test tests/e2e/ai-book-validation.spec.js -g "${bookId}"`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error(`Playwright test failed for ${bookId}`);
    return false;
  }
}

function updateBookType(bookId, newType) {
  console.log(`\n📝 Updating book type for ${bookId} to ${newType}...`);
  const query = `UPDATE books SET type = '${newType}' WHERE book_id = '${bookId}'`;
  execSync(`npx wrangler d1 execute storybook_database --local --command "${query}"`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
}

async function main() {
  const startIndex = parseInt(process.argv[2]) || 0;
  const endIndex = parseInt(process.argv[3]) || AI_BOOK_BASE_IDS.length - 1;

  console.log('🚀 AI系列书籍逐本验证流程');
  console.log(`处理范围: ${startIndex + 1} 到 ${endIndex + 1}`);
  
  const results = [];

  for (let i = startIndex; i <= endIndex; i++) {
    const baseId = AI_BOOK_BASE_IDS[i];
    console.log(`\n${'='.repeat(70)}`);
    console.log(`[${i + 1}/${AI_BOOK_BASE_IDS.length}] 处理: ${baseId}`);
    console.log('='.repeat(70));

    const result = {
      baseId,
      dbValidation: null,
      staticPages: false,
      e2eTest: false
    };

    // Step 1: 数据库验证
    console.log('\n📊 Step 1: 数据库验证');
    const validationResult = validateBookPair(baseId);
    result.dbValidation = validationResult;

    if (!validationResult.bothPassed) {
      console.log(`\n⚠️  ${baseId} 数据库验证失败，跳过后续步骤`);
      results.push(result);
      continue;
    }

    // Step 2: 生成静态页面
    console.log('\n📄 Step 2: 生成静态页面');
    try {
      generateStaticPages();
      result.staticPages = true;
    } catch (error) {
      console.error(`静态页面生成失败: ${error.message}`);
      results.push(result);
      continue;
    }

    // Step 3: Playwright端到端测试
    console.log('\n🎭 Step 3: Playwright端到端测试');
    result.e2eTest = runPlaywrightTest(baseId);

    results.push(result);

    if (result.e2eTest) {
      console.log(`\n✅ ${baseId} 验证完成！`);
    } else {
      console.log(`\n❌ ${baseId} 验证失败`);
    }
  }

  // 输出总结
  console.log('\n\n' + '='.repeat(70));
  console.log('📋 验证结果总结');
  console.log('='.repeat(70));

  results.forEach(r => {
    const status = r.dbValidation?.bothPassed && r.staticPages && r.e2eTest ? '✅' : '❌';
    console.log(`${status} ${r.baseId}: DB=${r.dbValidation?.bothPassed || false}, Pages=${r.staticPages}, E2E=${r.e2eTest}`);
  });

  const passed = results.filter(r => r.dbValidation?.bothPassed && r.staticPages && r.e2eTest).length;
  console.log(`\n总计: ${passed}/${results.length} 通过`);
}

main().catch(console.error);
```

**Step 2: 测试主流程脚本**

Run: `node scripts/process-ai-books.js 0 0`
Expected: 只处理第一本书

**Step 3: Commit**

```bash
git add scripts/process-ai-books.js
git commit -m "feat: add main process script for AI book validation"
```

---

## Task 5: 修复preset-ai-001并验证流程

**Files:**
- Modify: `migrations/` (创建新的migration文件)

**Step 1: 检查preset-ai-001当前状态**

Run: `node scripts/validate-single-book.js preset-ai-001`
Expected: 显示当前验证结果

**Step 2: 如果需要修复，创建migration文件**

根据验证结果，创建或修改migration文件来：
- 更新书籍类型
- 补充缺失章节
- 扩展内容长度

**Step 3: 执行migration**

Run: `npx wrangler d1 execute storybook_database --local --file migrations/XXXX_fix_preset_ai_001.sql`

**Step 4: 重新验证**

Run: `node scripts/validate-single-book.js preset-ai-001`
Expected: 验证通过

**Step 5: 生成静态页面**

Run: `node scripts/generate-preset-pages.js`

**Step 6: 运行Playwright测试**

Run: `npx playwright test tests/e2e/ai-book-validation.spec.js -g "preset-ai-001"`

**Step 7: Commit**

```bash
git add migrations/XXXX_fix_preset_ai_001.sql
git commit -m "fix: update preset-ai-001 with correct type and content"
```

---

## Task 6-28: 逐本修复和验证 (preset-ai-002 到 preset-ai-023)

每本书重复以下步骤：

**Step 1: 验证书籍当前状态**
Run: `node scripts/validate-single-book.js preset-ai-XXX`

**Step 2: 根据验证结果修复**
- 创建/修改migration文件
- 执行migration
- 更新书籍类型

**Step 3: 重新验证**
Run: `node scripts/validate-single-book.js preset-ai-XXX`

**Step 4: 生成静态页面**
Run: `node scripts/generate-preset-pages.js`

**Step 5: 运行Playwright测试**
Run: `npx playwright test tests/e2e/ai-book-validation.spec.js -g "preset-ai-XXX"`

**Step 6: Commit**
```bash
git add migrations/ scripts/
git commit -m "fix: update preset-ai-XXX with correct type and content"
```

---

## Task 29: 最终验证和总结

**Step 1: 运行完整验证**

Run: `node scripts/process-ai-books.js`

**Step 2: 运行所有Playwright测试**

Run: `npx playwright test tests/e2e/ai-book-validation.spec.js`

**Step 3: 生成验证报告**

检查所有46本书（23对）的验证结果

**Step 4: 最终Commit**

```bash
git add .
git commit -m "feat: complete AI book validation with correct types and content"
```

---

## 验证标准总结

| 检查项 | 英文版标准 | 中文版标准 |
|--------|-----------|-----------|
| 章节数量 | ≥8章 | ≥8章 |
| 内容长度 | ≥1500字符/章 | ≥800字符/章 |
| 书籍类型 | 按内容主题分类 | 按内容主题分类 |
| 静态页面 | 必须生成成功 | 必须生成成功 |
| E2E测试 | 必须全部通过 | 必须全部通过 |

---

## 书籍类型分类表

| 书籍ID | 类型 | 书籍ID | 类型 | 书籍ID | 类型 |
|--------|------|--------|------|--------|------|
| preset-ai-001 | business | preset-ai-009 | romance | preset-ai-017 | business |
| preset-ai-002 | business | preset-ai-010 | romance | preset-ai-018 | business |
| preset-ai-003 | business | preset-ai-011 | business | preset-ai-019 | business |
| preset-ai-004 | business | preset-ai-012 | fantasy | preset-ai-020 | fantasy |
| preset-ai-005 | business | preset-ai-013 | fantasy | preset-ai-021 | fantasy |
| preset-ai-006 | romance | preset-ai-014 | business | preset-ai-022 | fantasy |
| preset-ai-007 | romance | preset-ai-015 | fantasy | preset-ai-023 | fantasy |
| preset-ai-008 | romance | preset-ai-016 | business | | |
