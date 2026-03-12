# Playwright E2E测试设计方案

## 一、概述

本文档描述了StoryBook项目的Playwright端到端测试设计方案，重点覆盖**书籍创建**和**章节添加**两个核心流程。

## 二、技术选型

| 组件 | 选择 | 说明 |
|------|------|------|
| 测试框架 | Playwright | 已配置，版本 ^1.40.0 |
| 数据库查询 | better-sqlite3 | 同步API，性能好 |
| 测试环境 | 本地开发环境 | `npm run dev`，端口8788 |
| 数据隔离 | 每次测试前清空 | 重新执行迁移脚本 |
| 认证方式 | 测试前创建测试用户 | 模拟localStorage登录状态 |

## 三、目录结构

```
test/e2e/
├── book-create.spec.js      # 书籍创建测试
├── chapter-add.spec.js      # 章节添加测试
└── helpers/
    └── db-helper.js         # 数据库查询工具
```

## 四、数据库文件位置

本地开发时，Cloudflare D1数据库的SQLite文件位于：
```
.wrangler/state/v3/d1/miniflare-D1DatabaseObject/<uuid>/db.sqlite
```

## 五、测试用例设计

### 5.1 书籍创建流程测试

**测试步骤：**
1. 重置数据库
2. 创建测试用户
3. 模拟登录（设置localStorage）
4. 访问 book-create.html
5. Step1：输入标题、选择类型
6. Step2：输入主角名称、选择头像
7. Step3：添加1个配角
8. 点击创建按钮
9. 等待成功提示

**数据库验证：**
- `books` 表：验证新增记录，字段正确
  - title, type, user_id, is_preset
- `characters` 表：验证主角和配角记录
  - 主角：is_protagonist=1, role_type='protagonist'
  - 配角：is_protagonist=0, role_type='supporting'
- `plot_cards` 表：验证初始卡牌生成
  - 按书籍类型生成对应的天气、地形、冒险、装备卡牌

### 5.2 章节添加流程测试

**前置条件：** 已有书籍和角色

**测试步骤：**
1. 访问 director.html?book_id=xxx
2. 选择主角（必需）
3. 选择冒险卡（必需）
4. 选择天气卡（必需）
5. 选择地形卡（必需）
6. 可选：选择装备卡
7. 点击"Start Production"按钮
8. 等待章节创建成功

**数据库验证：**
- `chapters` 表：验证新增章节
  - book_id, title, content, order_num
- `puzzles` 表：验证新增谜题
  - chapter_id, question, puzzle_type, answer
- `characters` 表：验证亲密度更新
  - 参与角色的intimacy字段变化

## 六、核心代码结构

### 6.1 数据库辅助工具 (db-helper.js)

```javascript
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class DatabaseHelper {
  constructor() {
    this.dbPath = this.findDatabasePath();
    this.db = null;
  }

  findDatabasePath() {
    // 查找 .wrangler/state/v3/d1/ 下的 sqlite 文件
  }

  connect() {
    this.db = new Database(this.dbPath);
  }

  close() {
    if (this.db) this.db.close();
  }

  resetDatabase() {
    // 执行迁移脚本
  }

  createTestUser() {
    // 创建测试用户
  }

  query(sql, params) {
    return this.db.prepare(sql).get(params);
  }

  queryAll(sql, params) {
    return this.db.prepare(sql).all(params);
  }

  getBookById(id) { /* ... */ }
  getCharactersByBookId(bookId) { /* ... */ }
  getPlotCardsByBookId(bookId) { /* ... */ }
  getChaptersByBookId(bookId) { /* ... */ }
  getPuzzlesByChapterId(chapterId) { /* ... */ }
}
```

### 6.2 书籍创建测试 (book-create.spec.js)

```javascript
const { test, expect } = require('@playwright/test');
const DatabaseHelper = require('./helpers/db-helper');

test.describe('书籍创建流程', () => {
  let db;

  test.beforeEach(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
  });

  test.afterEach(async () => {
    db.close();
  });

  test('创建书籍并验证数据库', async ({ page }) => {
    // 模拟登录
    await page.addInitScript(() => {
      localStorage.setItem('userId', 'test-user-001');
    });

    // 访问页面
    await page.goto('/book-create.html');

    // Step 1: 基本信息
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('.btn-next');

    // Step 2: 主角
    await page.fill('#protagonistName', '测试主角');
    await page.click('.avatar-option:first-child');
    await page.click('.btn-next');

    // Step 3: 配角
    await page.fill('#companion1 input', '测试配角');
    await page.click('.btn-next');

    // 创建
    await page.click('.btn-next:has-text("Create Story")');

    // 等待成功
    await expect(page.locator('.success-title')).toContainText('Story Created');

    // 数据库验证
    const books = db.queryAll('SELECT * FROM books WHERE title = ?', ['测试书籍']);
    expect(books.length).toBe(1);

    const characters = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [books[0].book_id]);
    expect(characters.length).toBe(2); // 主角 + 配角

    const plotCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [books[0].book_id]);
    expect(plotCards.length).toBeGreaterThan(0);
  });
});
```

## 七、依赖安装

需要安装 `better-sqlite3`：
```bash
npm install --save-dev better-sqlite3
```

## 八、Playwright配置调整

需要调整 `playwright.config.js`：
- 测试目录指向 `test/e2e`
- 配置全局setup/teardown

## 九、注意事项

1. **数据库路径**：本地D1数据库路径可能因wrangler版本变化，需要动态查找
2. **测试隔离**：每个测试独立运行，互不影响
3. **异步操作**：页面操作后需要等待API响应完成
4. **选择器稳定性**：使用稳定的CSS选择器或data-testid
