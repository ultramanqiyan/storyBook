# 卡牌互动小说书籍网站 - 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 创建一个完整的卡牌互动小说书籍网站，支持用户注册登录、书籍管理、卡牌系统、章节生成和解谜功能。

**Architecture:** 采用Cloudflare Pages + D1架构，前端使用原生HTML/CSS/JS，后端使用Pages Functions。数据存储在D1 SQLite数据库中。使用TDD开发模式，确保每个文件测试覆盖率>80%。

**Tech Stack:** Cloudflare Pages, D1 (SQLite), 原生HTML/CSS/JS, Vitest, Playwright

---

## Phase 1: 项目初始化与数据库

### Task 1: 项目结构初始化

**Files:**
- Create: `src/frontend/index.html`
- Create: `src/frontend/css/styles.css`
- Create: `src/frontend/js/utils.js`
- Create: `src/frontend/js/api.js`
- Modify: `package.json`

**Step 1: 更新package.json添加Vitest依赖**

```json
{
  "name": "storybook",
  "version": "0.1.0",
  "description": "卡牌互动小说书籍网站",
  "type": "module",
  "scripts": {
    "dev": "wrangler pages dev src/frontend --compatibility-flag nodejs_compat",
    "deploy": "wrangler pages deploy src/frontend --project-name=storybook",
    "db:migrate:local": "wrangler d1 execute storybook_database --local --file=./migrations/0001_init.sql",
    "db:migrate:remote": "wrangler d1 execute storybook_database --remote --file=./migrations/0001_init.sql",
    "db:seed:local": "wrangler d1 execute storybook_database --local --file=./migrations/0002_seed_data.sql",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "npx playwright test",
    "test:e2e:ui": "npx playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@vitest/coverage-v8": "^1.0.0",
    "vitest": "^1.0.0",
    "wrangler": "^3.24.0"
  }
}
```

**Step 2: 运行npm install**

Run: `npm install`
Expected: 安装成功

**Step 3: 创建Vitest配置文件**

Create: `vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      threshold: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});
```

**Step 4: 创建基础目录结构**

Run: `mkdir -p src/frontend/css src/frontend/js tests/unit tests/e2e config assets/avatars assets/icons`
Expected: 目录创建成功

**Step 5: Commit**

```bash
git add package.json vitest.config.js
git commit -m "chore: 初始化项目结构和测试配置"
```

---

### Task 2: 数据库迁移脚本

**Files:**
- Create: `migrations/0001_init.sql`
- Create: `migrations/0002_seed_data.sql`

**Step 1: 创建数据库初始化脚本**

Create: `migrations/0001_init.sql`

```sql
-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建书籍表
CREATE TABLE IF NOT EXISTS books (
    book_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    is_preset INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建角色卡牌表
CREATE TABLE IF NOT EXISTS characters (
    char_id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    name TEXT NOT NULL,
    role_type TEXT NOT NULL,
    personality TEXT NOT NULL,
    speech_style TEXT NOT NULL,
    avatar TEXT NOT NULL,
    intimacy INTEGER,
    relationship TEXT,
    is_protagonist INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建情节卡牌表
CREATE TABLE IF NOT EXISTS plot_cards (
    card_id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    type TEXT NOT NULL,
    sub_type TEXT NOT NULL,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT,
    is_custom INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建章节表
CREATE TABLE IF NOT EXISTS chapters (
    chapter_id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    selected_cards TEXT,
    order_num INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建谜题表
CREATE TABLE IF NOT EXISTS puzzles (
    puzzle_id TEXT PRIMARY KEY,
    chapter_id TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    puzzle_type TEXT NOT NULL,
    options TEXT,
    attempts INTEGER NOT NULL DEFAULT 0,
    max_attempts INTEGER NOT NULL DEFAULT 3,
    is_solved INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 创建索引
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_books_user_id ON books(user_id);
CREATE INDEX IF NOT EXISTS idx_books_type ON books(type);
CREATE INDEX IF NOT EXISTS idx_books_is_preset ON books(is_preset);
CREATE INDEX IF NOT EXISTS idx_characters_book_id ON characters(book_id);
CREATE INDEX IF NOT EXISTS idx_characters_is_protagonist ON characters(is_protagonist);
CREATE INDEX IF NOT EXISTS idx_plot_cards_book_id ON plot_cards(book_id);
CREATE INDEX IF NOT EXISTS idx_plot_cards_sub_type ON plot_cards(sub_type);
CREATE INDEX IF NOT EXISTS idx_chapters_book_id ON chapters(book_id);
CREATE INDEX IF NOT EXISTS idx_chapters_order ON chapters(book_id, order_num);
CREATE INDEX IF NOT EXISTS idx_puzzles_chapter_id ON puzzles(chapter_id);
```

**Step 2: 创建预设数据脚本**

Create: `migrations/0002_seed_data.sql` (包含预设书籍、角色、卡牌、章节、谜题数据)

**Step 3: Commit**

```bash
git add migrations/
git commit -m "feat: 添加数据库迁移脚本"
```

---

### Task 3: API工具函数

**Files:**
- Create: `functions/api/utils.js`
- Test: `tests/unit/utils.test.js`

**Step 1: 编写失败的测试**

Create: `tests/unit/utils.test.js`

```javascript
import { describe, it, expect } from 'vitest';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  generateUUID,
  validateEmail,
  validatePassword 
} from '../../functions/api/utils.js';

describe('API Utils', () => {
  describe('createSuccessResponse', () => {
    it('should create success response with correct format', async () => {
      const data = { id: '123', name: 'test' };
      const response = createSuccessResponse(data);
      const json = await response.json();
      
      expect(json.success).toBe(true);
      expect(json.data).toEqual(data);
      expect(json.error).toBeNull();
      expect(response.headers.get('Content-Type')).toBe('application/json');
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response with correct format', async () => {
      const response = createErrorResponse('Test error', 400);
      const json = await response.json();
      
      expect(json.success).toBe(false);
      expect(json.data).toBeNull();
      expect(json.error).toBe('Test error');
      expect(response.status).toBe(400);
    });
  });

  describe('generateUUID', () => {
    it('should generate valid UUID format', () => {
      const uuid = generateUUID();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuidRegex.test(uuid)).toBe(true);
    });

    it('should generate unique UUIDs', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid password', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('password123')).toBe(true);
    });

    it('should return false for invalid password', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });
});
```

**Step 2: 运行测试确认失败**

Run: `npm test tests/unit/utils.test.js`
Expected: FAIL - 模块不存在

**Step 3: 实现工具函数**

Create: `functions/api/utils.js`

```javascript
export function createSuccessResponse(data) {
  return new Response(JSON.stringify({
    success: true,
    data: data,
    error: null
  }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function createErrorResponse(message, status = 400) {
  return new Response(JSON.stringify({
    success: false,
    data: null,
    error: message
  }), {
    status: status,
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 6 && password.length <= 20;
}
```

**Step 4: 运行测试确认通过**

Run: `npm test tests/unit/utils.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add functions/api/utils.js tests/unit/utils.test.js
git commit -m "feat: 添加API工具函数"
```

---

## Phase 2: 用户系统

### Task 4: 用户API

**Files:**
- Create: `functions/api/users.js`
- Test: `tests/unit/users.test.js`

**Step 1: 编写失败的测试**

Create: `tests/unit/users.test.js`

```javascript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Users API', () => {
  describe('POST /api/users - 注册/登录', () => {
    it('should create new user with valid email and password', async () => {
    });

    it('should login existing user with correct password', async () => {
    });

    it('should return error for invalid email format', async () => {
    });

    it('should return error for invalid password length', async () => {
    });

    it('should return error for wrong password', async () => {
    });
  });

  describe('GET /api/users - 获取用户信息', () => {
    it('should return user info for valid user_id', async () => {
    });

    it('should return error for non-existent user', async () => {
    });
  });
});
```

**Step 2: 运行测试确认失败**

Run: `npm test tests/unit/users.test.js`
Expected: FAIL

**Step 3: 实现用户API**

Create: `functions/api/users.js`

**Step 4: 运行测试确认通过**

Run: `npm test tests/unit/users.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add functions/api/users.js tests/unit/users.test.js
git commit -m "feat: 添加用户API"
```

---

### Task 5: 登录页面

**Files:**
- Create: `src/frontend/login.html`
- Create: `src/frontend/js/pages/login.js`
- Test: `tests/e2e/login.spec.js`

**Step 1: 编写E2E测试**

Create: `tests/e2e/login.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('登录页面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login.html');
  });

  test('应该显示登录表单', async ({ page }) => {
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('应该验证邮箱格式', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('应该成功登录并跳转', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL(/bookshelf\.html/);
  });
});
```

**Step 2: 实现登录页面**

Create: `src/frontend/login.html`

**Step 3: 实现登录逻辑**

Create: `src/frontend/js/pages/login.js`

**Step 4: 运行E2E测试**

Run: `npm run test:e2e tests/e2e/login.spec.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/frontend/login.html src/frontend/js/pages/login.js tests/e2e/login.spec.js
git commit -m "feat: 添加登录页面"
```

---

## Phase 3: 书籍系统

### Task 6: 书籍API

**Files:**
- Create: `functions/api/books.js`
- Test: `tests/unit/books.test.js`

**Step 1: 编写失败的测试**

**Step 2: 运行测试确认失败**

**Step 3: 实现书籍API**

**Step 4: 运行测试确认通过**

**Step 5: Commit**

---

### Task 7: 书籍管理页面

**Files:**
- Create: `src/frontend/bookshelf.html`
- Create: `src/frontend/js/pages/bookshelf.js`
- Test: `tests/e2e/bookshelf.spec.js`

**Step 1-5: TDD流程**

---

### Task 8: 书籍创建页面

**Files:**
- Create: `src/frontend/book-create.html`
- Create: `src/frontend/js/pages/book-create.js`
- Test: `tests/e2e/book-create.spec.js`

**Step 1-5: TDD流程**

---

### Task 9: 书籍详情页面

**Files:**
- Create: `src/frontend/book.html`
- Create: `src/frontend/js/pages/book.js`
- Test: `tests/e2e/book.spec.js`

**Step 1-5: TDD流程**

---

## Phase 4: 卡牌系统

### Task 10: 角色卡牌API

**Files:**
- Create: `functions/api/characters.js`
- Test: `tests/unit/characters.test.js`

**Step 1-5: TDD流程**

---

### Task 11: 情节卡牌API

**Files:**
- Create: `functions/api/plot-cards.js`
- Test: `tests/unit/plot-cards.test.js`

**Step 1-5: TDD流程**

---

### Task 12: 故事导演页面

**Files:**
- Create: `src/frontend/director.html`
- Create: `src/frontend/js/pages/director.js`
- Create: `src/frontend/css/cards.css`
- Test: `tests/e2e/director.spec.js`

**Step 1-5: TDD流程**

---

## Phase 5: 章节系统

### Task 13: 章节API

**Files:**
- Create: `functions/api/chapters.js`
- Test: `tests/unit/chapters.test.js`

**Step 1-5: TDD流程**

---

### Task 14: 章节阅读页面

**Files:**
- Create: `src/frontend/chapter.html`
- Create: `src/frontend/js/pages/chapter.js`
- Test: `tests/e2e/chapter.spec.js`

**Step 1-5: TDD流程**

---

## Phase 6: 解谜系统

### Task 15: 谜题API

**Files:**
- Create: `functions/api/puzzles.js`
- Test: `tests/unit/puzzles.test.js`

**Step 1-5: TDD流程**

---

### Task 16: 解谜功能集成

**Files:**
- Modify: `src/frontend/js/pages/chapter.js`
- Modify: `tests/e2e/chapter.spec.js`

**Step 1-5: TDD流程**

---

## Phase 7: 预设数据与配置

### Task 17: 配置文件

**Files:**
- Create: `config/book-types.json`
- Create: `config/character-types.json`
- Create: `config/plot-options.json`
- Create: `config/personality.json`
- Create: `config/speech-style.json`

**Step 1: 创建书籍类型配置**

Create: `config/book-types.json`

```json
{
  "types": [
    {
      "type": "adventure",
      "name": "儿童冒险",
      "description": "适合儿童的故事",
      "theme_color": "#FFD700",
      "bg_style": "卡通插画"
    },
    {
      "type": "fantasy",
      "name": "魔幻传说",
      "description": "魔法、奇幻主题",
      "theme_color": "#6B21A8",
      "bg_style": "星空/魔法纹理"
    },
    {
      "type": "romance",
      "name": "都市言情",
      "description": "现代都市爱情",
      "theme_color": "#F48FB1",
      "bg_style": "柔和渐变"
    },
    {
      "type": "business",
      "name": "职场风云",
      "description": "职场故事",
      "theme_color": "#1E3A8A",
      "bg_style": "几何图案"
    }
  ]
}
```

**Step 2: 创建其他配置文件**

**Step 3: Commit**

---

### Task 18: 配置API

**Files:**
- Create: `functions/api/config.js`
- Test: `tests/unit/config.test.js`

**Step 1-5: TDD流程**

---

## Phase 8: UI优化

### Task 19: 主题样式

**Files:**
- Create: `src/frontend/css/theme-adventure.css`
- Create: `src/frontend/css/theme-fantasy.css`
- Create: `src/frontend/css/theme-romance.css`
- Create: `src/frontend/css/theme-business.css`

**Step 1: 创建儿童冒险主题**

Create: `src/frontend/css/theme-adventure.css`

```css
.theme-adventure {
  --primary-color: #FFD700;
  --secondary-color: #7CB342;
  --background: linear-gradient(135deg, #FFF9C4 0%, #C5E1A5 100%);
  --card-border: 8px solid #FFD700;
  --font-family: 'Comic Sans MS', cursive, sans-serif;
}

.theme-adventure .card {
  border-radius: 16px;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}
```

**Step 2: 创建其他主题**

**Step 3: Commit**

---

### Task 20: 卡牌动画

**Files:**
- Create: `src/frontend/css/animations.css`
- Create: `src/frontend/js/animations.js`

**Step 1: 创建卡牌动画样式**

Create: `src/frontend/css/animations.css`

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: perspective(1000px) rotateY(10deg) scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card.selected {
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  animation: heartbeat 1s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes cardDrop {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translateY(20px) rotate(360deg);
    opacity: 1;
  }
  70% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.card-reward {
  animation: cardDrop 1s ease-out forwards;
}
```

**Step 2: Commit**

---

## Phase 9: 首页

### Task 21: 首页

**Files:**
- Create: `src/frontend/index.html`
- Create: `src/frontend/js/pages/index.js`
- Test: `tests/e2e/index.spec.js`

**Step 1-5: TDD流程**

---

## Phase 10: 测试与验证

### Task 22: 运行完整测试套件

**Step 1: 运行单元测试**

Run: `npm test`
Expected: 所有测试通过，覆盖率>80%

**Step 2: 运行E2E测试**

Run: `npm run test:e2e`
Expected: 所有E2E测试通过

**Step 3: 检查覆盖率报告**

Run: `npm run test:coverage`
Expected: 每个文件覆盖率>80%

**Step 4: Commit**

```bash
git add .
git commit -m "test: 完成测试覆盖率验证"
```

---

## 验收清单

- [ ] 用户注册/登录功能正常
- [ ] 书籍创建功能正常
- [ ] 书籍列表显示正常
- [ ] 书籍删除功能正常
- [ ] 角色卡牌创建正常
- [ ] 情节卡牌获取正常
- [ ] 章节生成功能正常
- [ ] 章节阅读功能正常
- [ ] 解谜功能正常
- [ ] 卡牌掉落功能正常
- [ ] UI风格差异化正常
- [ ] 单元测试覆盖率>80%
- [ ] E2E测试全部通过

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-11 | 初始版本 |
