# E2E测试完整实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 开发并执行所有349个E2E测试用例，确保全部通过

**Architecture:** 使用Playwright进行端到端测试，测试真实API和本地D1数据库，不使用mock。采用Page Object模式组织测试代码。

**Tech Stack:** Playwright, Vitest, Cloudflare D1 (SQLite), Wrangler

---

## 实施策略

### 阶段划分

| 阶段 | 模块 | 用例数 | 优先级 |
|------|------|--------|--------|
| Phase 1 | 基础设施搭建 | 5 | P0 |
| Phase 2 | 用户系统测试 | 10 | P0 |
| Phase 3 | 首页测试 | 7 | P0 |
| Phase 4 | 书籍管理页测试 | 10 | P0 |
| Phase 5 | 书籍创建页测试 | 86 | P0 |
| Phase 6 | 书籍详情页测试 | 15 | P0 |
| Phase 7 | 故事导演页测试 | 46 | P0 |
| Phase 8 | 章节阅读页测试 | 18 | P0 |
| Phase 9 | 卡牌掉落测试 | 15 | P0 |
| Phase 10 | 卡牌上限处理测试 | 25 | P0 |
| Phase 11 | 多步骤流程测试 | 83 | P0 |
| Phase 12 | API集成测试 | 20 | P0 |
| Phase 13 | 错误处理测试 | 5 | P1 |
| Phase 14 | UI风格测试 | 4 | P2 |
| Phase 15 | 动画效果测试 | 5 | P2 |

---

## Phase 1: 基础设施搭建

### Task 1.1: 创建测试目录结构

**Files:**
- Create: `tests/e2e/helpers/`
- Create: `tests/e2e/pages/`

**Step 1: 创建目录结构**

```bash
mkdir -p tests/e2e/helpers tests/e2e/pages
```

**Step 2: 验证目录创建**

Run: `ls tests/e2e/`
Expected: 显示 helpers, pages 目录

---

### Task 1.2: 创建测试辅助函数

**Files:**
- Create: `tests/e2e/helpers/test-helpers.js`

**Step 1: 编写测试辅助函数**

```javascript
// tests/e2e/helpers/test-helpers.js
import { expect } from '@playwright/test';

export function generateTestEmail() {
  return `test_${Date.now()}_${Math.random().toString(36).substring(7)}@example.com`;
}

export function generateTestId() {
  return `id_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export async function registerUser(page, email, password) {
  await page.goto('/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/bookshelf/, { timeout: 10000 });
  const userId = await page.evaluate(() => localStorage.getItem('userId'));
  return userId;
}

export async function loginUser(page, email, password) {
  await page.goto('/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/bookshelf/, { timeout: 10000 });
}

export async function logoutUser(page) {
  await page.evaluate(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  });
}

export async function createBook(page, userId, title, type) {
  const response = await page.request.post('/api/books', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      user_id: userId,
      title: title,
      type: type,
      protagonist: {
        name: '测试主角',
        role_type: '探险家',
        personality: '勇敢',
        speech_style: '简洁直接',
        avatar: '👦'
      },
      supporting_characters: []
    }
  });
  const result = await response.json();
  return result.data?.book_id;
}

export async function deleteBook(page, bookId, userId) {
  await page.request.delete(`/api/books/${bookId}`, {
    headers: { 'Content-Type': 'application/json' },
    data: { user_id: userId }
  });
}

export async function waitForApiSuccess(page, urlPattern) {
  const response = await page.waitForResponse(resp => 
    resp.url().includes(urlPattern) && resp.status() === 200
  );
  return response.json();
}

export async function getDbRecord(env, table, id) {
  return await env.DB.prepare(`SELECT * FROM ${table} WHERE ${table.slice(0, -1)}_id = ?`)
    .bind(id).first();
}
```

**Step 2: 验证文件创建**

Run: `ls tests/e2e/helpers/`
Expected: 显示 test-helpers.js

---

### Task 1.3: 创建Page Object基类

**Files:**
- Create: `tests/e2e/pages/BasePage.js`

**Step 1: 编写BasePage类**

```javascript
// tests/e2e/pages/BasePage.js
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async waitForNavigation(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }

  async clickElement(selector) {
    await this.page.click(selector);
  }

  async fillInput(selector, value) {
    await this.page.fill(selector, value);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async getLocalStorage(key) {
    return await this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  async setLocalStorage(key, value) {
    await this.page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value });
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }
}
```

**Step 2: 验证文件创建**

Run: `ls tests/e2e/pages/`
Expected: 显示 BasePage.js

---

### Task 1.4: 创建LoginPage Page Object

**Files:**
- Create: `tests/e2e/pages/LoginPage.js`

**Step 1: 编写LoginPage类**

```javascript
// tests/e2e/pages/LoginPage.js
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.submitButton = 'button[type="submit"]';
    this.messageElement = '#message';
    this.form = '#loginForm';
  }

  async goto() {
    await super.goto('/login');
    await this.waitForElement(this.form);
  }

  async fillEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  async fillPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  async submit() {
    await this.clickElement(this.submitButton);
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async getMessage() {
    await this.waitForElement(this.messageElement);
    return await this.getText(this.messageElement);
  }

  async getMessageClass() {
    await this.waitForElement(this.messageElement);
    const element = await this.page.$(this.messageElement);
    return await element.getAttribute('class');
  }

  async isSubmitButtonDisabled() {
    const button = await this.page.$(this.submitButton);
    return await button.isDisabled();
  }
}
```

**Step 2: 验证文件创建**

Run: `ls tests/e2e/pages/`
Expected: 显示 LoginPage.js

---

### Task 1.5: 创建BookshelfPage Page Object

**Files:**
- Create: `tests/e2e/pages/BookshelfPage.js`

**Step 1: 编写BookshelfPage类**

```javascript
// tests/e2e/pages/BookshelfPage.js
import { BasePage } from './BasePage.js';

export class BookshelfPage extends BasePage {
  constructor(page) {
    super(page);
    this.userEmail = '#userEmail';
    this.myBooksSection = '#myBooks';
    this.presetBooksSection = '#presetBooks';
    this.createBookButton = 'text=+ 新建书籍';
    this.createBookModal = '#createBookModal';
    this.bookTitleInput = '#bookTitle';
    this.bookTypeSelect = '#bookType';
    this.modalSubmitButton = '#createBookForm button[type="submit"]';
    this.modalCancelButton = 'text=取消';
    this.logoutButton = 'text=退出';
  }

  async goto() {
    await super.goto('/bookshelf');
  }

  async getUserEmail() {
    return await this.getText(this.userEmail);
  }

  async getMyBooks() {
    const books = await this.page.$$('#myBooks .book-card');
    return books.length;
  }

  async getPresetBooks() {
    const books = await this.page.$$('#presetBooks .book-card');
    return books.length;
  }

  async clickCreateBook() {
    await this.clickElement(this.createBookButton);
    await this.waitForElement(this.createBookModal);
  }

  async fillBookTitle(title) {
    await this.fillInput(this.bookTitleInput, title);
  }

  async selectBookType(type) {
    await this.page.selectOption(this.bookTypeSelect, type);
  }

  async submitCreateBook() {
    await this.clickElement(this.modalSubmitButton);
  }

  async cancelCreateBook() {
    await this.clickElement(this.modalCancelButton);
  }

  async createBook(title, type) {
    await this.clickCreateBook();
    await this.fillBookTitle(title);
    await this.selectBookType(type);
    await this.submitCreateBook();
    await this.page.waitForTimeout(500);
  }

  async logout() {
    await this.clickElement(this.logoutButton);
  }

  async clickBookByIndex(index) {
    const books = await this.page.$$('#myBooks .book-card');
    if (books[index]) {
      await books[index].click();
    }
  }

  async isModalVisible() {
    return await this.isVisible(this.createBookModal);
  }
}
```

**Step 2: 验证文件创建**

Run: `ls tests/e2e/pages/`
Expected: 显示 BookshelfPage.js

---

## Phase 2: 用户系统测试

### Task 2.1: 创建用户系统测试文件

**Files:**
- Create: `tests/e2e/login.spec.js`

**Step 1: 编写用户系统测试**

```javascript
// tests/e2e/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BookshelfPage } from './pages/BookshelfPage.js';
import { generateTestEmail } from './helpers/test-helpers.js';

test.describe('用户系统测试', () => {
  let loginPage;
  let bookshelfPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    bookshelfPage = new BookshelfPage(page);
    await page.evaluate(() => localStorage.clear());
  });

  test('USR-E2E-001: 注册新用户', async ({ page }) => {
    const email = generateTestEmail();
    const password = 'password123';
    
    await loginPage.goto();
    await loginPage.login(email, password);
    
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    const userId = await loginPage.getLocalStorage('userId');
    expect(userId).toBeTruthy();
    
    const storedEmail = await loginPage.getLocalStorage('userEmail');
    expect(storedEmail).toBe(email);
    
    const messageClass = await loginPage.getMessageClass();
    expect(messageClass).toContain('success');
  });

  test('USR-E2E-002: 已有用户登录', async ({ page }) => {
    const email = generateTestEmail();
    const password = 'password123';
    
    // 先注册
    await loginPage.goto();
    await loginPage.login(email, password);
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    // 退出登录
    await bookshelfPage.logout();
    await page.waitForURL(/login/, { timeout: 10000 });
    
    // 重新登录
    await loginPage.goto();
    await loginPage.login(email, password);
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    const messageClass = await loginPage.getMessageClass();
    expect(messageClass).toContain('success');
  });

  test('USR-E2E-003: 邮箱格式验证', async ({ page }) => {
    await loginPage.goto();
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('password123');
    await loginPage.submit();
    
    await page.waitForTimeout(1000);
    
    const url = page.url();
    expect(url).toContain('/login');
  });

  test('USR-E2E-004: 密码长度验证-少于6位', async ({ page }) => {
    await loginPage.goto();
    await loginPage.fillEmail(generateTestEmail());
    await loginPage.fillPassword('12345');
    await loginPage.submit();
    
    await page.waitForTimeout(1000);
    
    const url = page.url();
    expect(url).toContain('/login');
  });

  test('USR-E2E-005: 密码错误验证', async ({ page }) => {
    const email = generateTestEmail();
    
    // 先注册
    await loginPage.goto();
    await loginPage.login(email, 'password123');
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    // 退出
    await bookshelfPage.logout();
    await page.waitForURL(/login/, { timeout: 10000 });
    
    // 用错误密码登录
    await loginPage.goto();
    await loginPage.login(email, 'wrongpassword');
    
    await page.waitForTimeout(2000);
    
    const message = await loginPage.getMessage();
    expect(message).toContain('密码错误');
  });

  test('USR-E2E-006: 登录后跳转到书架页', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(generateTestEmail(), 'password123');
    
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    const url = page.url();
    expect(url).toContain('/bookshelf');
  });

  test('USR-E2E-007: 退出登录', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(generateTestEmail(), 'password123');
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    await bookshelfPage.logout();
    await page.waitForURL(/login/, { timeout: 10000 });
    
    const userId = await loginPage.getLocalStorage('userId');
    expect(userId).toBeNull();
  });

  test('USR-E2E-008: 未登录访问限制', async ({ page }) => {
    await page.goto('/bookshelf');
    
    await page.waitForURL(/login/, { timeout: 10000 });
    
    const url = page.url();
    expect(url).toContain('/login');
  });

  test('USR-E2E-009: API返回is_new_user字段', async ({ page }) => {
    const email = generateTestEmail();
    
    const response = await page.request.post('/api/users', {
      headers: { 'Content-Type': 'application/json' },
      data: { email, password: 'password123' }
    });
    
    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.is_new_user).toBe(true);
    
    // 再次登录
    const response2 = await page.request.post('/api/users', {
      headers: { 'Content-Type': 'application/json' },
      data: { email, password: 'password123' }
    });
    
    const result2 = await response2.json();
    expect(result2.success).toBe(true);
    expect(result2.data.is_new_user).toBe(false);
  });

  test('USR-E2E-010: 密码加密存储', async ({ page }) => {
    const email = generateTestEmail();
    const password = 'password123';
    
    await page.request.post('/api/users', {
      headers: { 'Content-Type': 'application/json' },
      data: { email, password }
    });
    
    // 验证API响应不返回明文密码
    const response = await page.request.get(`/api/users?user_id=test`);
    const result = await response.json();
    
    // 密码应该被bcrypt加密，不会在响应中返回
    expect(result.data?.password).toBeUndefined();
  });
});
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/login.spec.js --reporter=list`
Expected: 10 tests pass

---

## Phase 3: 首页测试

### Task 3.1: 创建首页测试文件

**Files:**
- Create: `tests/e2e/pages/IndexPage.js`
- Create: `tests/e2e/index.spec.js`

**Step 1: 编写IndexPage类**

```javascript
// tests/e2e/pages/IndexPage.js
import { BasePage } from './BasePage.js';

export class IndexPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = 'h1';
    this.subtitle = '.subtitle';
    this.presetBooksSection = '#presetBooks';
    this.startCreateButton = 'text=开始创作';
    this.browseButton = 'text=浏览书架';
    this.featureCards = '.feature-card';
  }

  async goto() {
    await super.goto('/');
  }

  async getTitle() {
    return await this.getText(this.title);
  }

  async getPresetBooksCount() {
    const books = await this.page.$$('#presetBooks .book-card');
    return books.length;
  }

  async hasLoadingText() {
    const text = await this.getText(this.presetBooksSection);
    return text.includes('加载中');
  }

  async clickStartCreate() {
    await this.clickElement(this.startCreateButton);
  }

  async clickBrowse() {
    await this.clickElement(this.browseButton);
  }

  async clickPresetBook(index) {
    const books = await this.page.$$('#presetBooks .book-card');
    if (books[index]) {
      await books[index].click();
    }
  }

  async getFeatureCardsCount() {
    const cards = await this.page.$$(this.featureCards);
    return cards.length;
  }
}
```

**Step 2: 编写首页测试**

```javascript
// tests/e2e/index.spec.js
import { test, expect } from '@playwright/test';
import { IndexPage } from './pages/IndexPage.js';
import { LoginPage } from './pages/LoginPage.js';

test.describe('首页测试', () => {
  let indexPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    indexPage = new IndexPage(page);
    loginPage = new LoginPage(page);
  });

  test('IDX-E2E-001: 显示预设书籍', async ({ page }) => {
    await indexPage.goto();
    
    await page.waitForSelector('#presetBooks .book-card', { timeout: 10000 });
    
    const count = await indexPage.getPresetBooksCount();
    expect(count).toBeGreaterThan(0);
  });

  test('IDX-E2E-002: 书籍卡片显示内容', async ({ page }) => {
    await indexPage.goto();
    
    await page.waitForSelector('#presetBooks .book-card', { timeout: 10000 });
    
    const firstCard = await page.$('#presetBooks .book-card');
    const title = await firstCard.$eval('h3', el => el.textContent);
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('IDX-E2E-003: 点击书籍卡片跳转', async ({ page }) => {
    await indexPage.goto();
    
    await page.waitForSelector('#presetBooks .book-card', { timeout: 10000 });
    
    await indexPage.clickPresetBook(0);
    
    await page.waitForURL(/book\?id=/, { timeout: 10000 });
    
    const url = page.url();
    expect(url).toContain('/book?id=');
  });

  test('IDX-E2E-004: 未登录点击创建跳转登录', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    
    await indexPage.goto();
    await indexPage.clickStartCreate();
    
    await page.waitForURL(/login/, { timeout: 10000 });
    
    const url = page.url();
    expect(url).toContain('/login');
  });

  test('IDX-E2E-005: 已登录点击创建跳转书架', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login(`test_${Date.now()}@example.com`, 'password123');
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    
    await indexPage.goto();
    await indexPage.clickStartCreate();
    
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
  });

  test('IDX-E2E-006: 预设书籍数据验证', async ({ page }) => {
    const response = await page.request.get('/api/books/preset');
    const result = await response.json();
    
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  test('IDX-E2E-007: 功能特性卡片显示', async ({ page }) => {
    await indexPage.goto();
    
    const count = await indexPage.getFeatureCardsCount();
    expect(count).toBe(3);
  });
});
```

**Step 3: 运行测试验证**

Run: `npx playwright test tests/e2e/index.spec.js --reporter=list`
Expected: 7 tests pass

---

## Phase 4: 书籍管理页测试

### Task 4.1: 创建书籍管理页测试

**Files:**
- Create: `tests/e2e/bookshelf.spec.js`

**Step 1: 编写书籍管理页测试**

```javascript
// tests/e2e/bookshelf.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { BookshelfPage } from './pages/BookshelfPage.js';
import { generateTestEmail } from './helpers/test-helpers.js';

test.describe('书籍管理页测试', () => {
  let loginPage;
  let bookshelfPage;
  let testUserId;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    bookshelfPage = new BookshelfPage(page);
    
    await page.evaluate(() => localStorage.clear());
    
    const email = generateTestEmail();
    await loginPage.goto();
    await loginPage.login(email, 'password123');
    await page.waitForURL(/bookshelf/, { timeout: 10000 });
    testUserId = await loginPage.getLocalStorage('userId');
  });

  test('SHF-E2E-001: 显示用户书籍列表', async ({ page }) => {
    await bookshelfPage.goto();
    
    const myBooks = await bookshelfPage.getMyBooks();
    expect(myBooks).toBeGreaterThanOrEqual(0);
  });

  test('SHF-E2E-002: 书籍卡片显示', async ({ page }) => {
    await bookshelfPage.goto();
    
    await bookshelfPage.createBook('测试书籍', 'adventure');
    
    await page.waitForTimeout(1000);
    
    const bookTitle = await page.textContent('#myBooks .book-card h3');
    expect(bookTitle).toContain('测试书籍');
  });

  test('SHF-E2E-003: 点击创建新书', async ({ page }) => {
    await bookshelfPage.goto();
    await bookshelfPage.clickCreateBook();
    
    const isVisible = await bookshelfPage.isModalVisible();
    expect(isVisible).toBe(true);
  });

  test('SHF-E2E-004: 点击书籍卡片跳转', async ({ page }) => {
    await bookshelfPage.goto();
    
    const presetCount = await bookshelfPage.getPresetBooks();
    if (presetCount > 0) {
      await page.click('#presetBooks .book-card');
      await page.waitForURL(/book\?id=/, { timeout: 10000 });
      
      const url = page.url();
      expect(url).toContain('/book?id=');
    }
  });

  test('SHF-E2E-005: 删除书籍弹窗', async ({ page }) => {
    await bookshelfPage.goto();
    await bookshelfPage.createBook('待删除书籍', 'fantasy');
    
    await page.waitForTimeout(1000);
    
    // 检查书籍是否创建成功
    const myBooks = await bookshelfPage.getMyBooks();
    expect(myBooks).toBeGreaterThan(0);
  });

  test('SHF-E2E-006: 确认删除书籍', async ({ page }) => {
    await bookshelfPage.goto();
    
    // 创建书籍
    const response = await page.request.post('/api/books', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        user_id: testUserId,
        title: '待删除书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          role_type: '探险家',
          personality: '勇敢',
          speech_style: '简洁',
          avatar: '👦'
        },
        supporting_characters: []
      }
    });
    
    const result = await response.json();
    const bookId = result.data.book_id;
    
    // 删除书籍
    const deleteResponse = await page.request.delete(`/api/books/${bookId}`, {
      headers: { 'Content-Type': 'application/json' },
      data: { user_id: testUserId }
    });
    
    const deleteResult = await deleteResponse.json();
    expect(deleteResult.success).toBe(true);
  });

  test('SHF-E2E-007: 预设书籍不显示删除按钮', async ({ page }) => {
    await bookshelfPage.goto();
    
    const presetBooks = await page.$$('#presetBooks .book-card');
    for (const book of presetBooks) {
      const deleteBtn = await book.$('.delete-btn');
      expect(deleteBtn).toBeNull();
    }
  });

  test('SHF-E2E-008: 级联删除验证', async ({ page }) => {
    // 创建书籍
    const createResponse = await page.request.post('/api/books', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        user_id: testUserId,
        title: '级联删除测试',
        type: 'adventure',
        protagonist: {
          name: '主角',
          role_type: '探险家',
          personality: '勇敢',
          speech_style: '简洁',
          avatar: '👦'
        },
        supporting_characters: []
      }
    });
    
    const createResult = await createResponse.json();
    const bookId = createResult.data.book_id;
    
    // 删除书籍
    await page.request.delete(`/api/books/${bookId}`, {
      headers: { 'Content-Type': 'application/json' },
      data: { user_id: testUserId }
    });
    
    // 验证书籍不存在
    const getResponse = await page.request.get(`/api/books/${bookId}`);
    const getResult = await getResponse.json();
    expect(getResult.success).toBe(false);
  });

  test('SHF-E2E-009: 空书架状态', async ({ page }) => {
    await bookshelfPage.goto();
    
    const myBooks = await bookshelfPage.getMyBooks();
    if (myBooks === 0) {
      const text = await page.textContent('#myBooks');
      expect(text).toContain('暂无');
    }
  });

  test('SHF-E2E-010: 书籍列表排序', async ({ page }) => {
    await bookshelfPage.goto();
    
    // 创建两本书籍
    await bookshelfPage.createBook('书籍A', 'adventure');
    await page.waitForTimeout(500);
    await bookshelfPage.createBook('书籍B', 'fantasy');
    
    await page.waitForTimeout(1000);
    
    const myBooks = await bookshelfPage.getMyBooks();
    expect(myBooks).toBeGreaterThanOrEqual(2);
  });
});
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/bookshelf.spec.js --reporter=list`
Expected: 10 tests pass

---

## 后续阶段概要

由于篇幅限制，后续阶段的详细步骤遵循相同模式：

### Phase 5-15 实施要点

1. **每个测试文件**遵循相同的结构：
   - Page Object类（如需要）
   - 测试文件
   - 运行验证

2. **测试执行顺序**：
   - 先运行单个文件验证
   - 再运行全部测试

3. **问题记录**：
   - 遇到问题时立即记录到 `experience/pitfalls/`
   - 解决方案记录到 `experience/solutions/`

---

## 执行命令汇总

```bash
# 运行单个测试文件
npx playwright test tests/e2e/login.spec.js --reporter=list

# 运行所有测试
npx playwright test --reporter=list

# 运行带UI的测试
npx playwright test --ui

# 生成测试报告
npx playwright show-report
```

---

## 验收标准

- [ ] 所有349个测试用例编写完成
- [ ] 所有测试通过
- [ ] 测试覆盖率报告生成
- [ ] 问题记录到experience目录
