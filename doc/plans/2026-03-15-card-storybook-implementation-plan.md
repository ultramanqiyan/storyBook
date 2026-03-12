# 卡牌互动小说书籍网站 - 完整实施计划

> **For Claude:** REQUIRED SUB-SKILL: 使用test-driven-development进行TDD开发，使用requesting-code-review进行代码审查

**Goal:** 创建一个完整的卡牌互动小说书籍网站，支持用户注册登录、书籍管理、卡牌系统、章节生成和解谜功能。

**Architecture:** 采用Cloudflare Pages + Pages Functions + D1架构（不使用Workers）：
- 前端：`src/frontend/` 静态文件
- 后端：`functions/api/*.js` Pages Functions
- 数据库：D1 SQLite，通过 `env.DB` 绑定访问

**Tech Stack:** Cloudflare Pages, D1 (SQLite), 原生HTML/CSS/JS, Vitest, Playwright

**Special Requirements:**
- 使用TDD开发模式（先写测试，再实现）
- 单元测试覆盖率 >80%
- E2E测试使用线下环境（local D1），覆盖率 >80%
- 自动部署到Cloudflare线上
- 不要使用subagent，直接一个会话执行

---

## Phase 1: 项目初始化与配置

### Task 1.1: 更新package.json

**Files:**
- Modify: `package.json`

**Step 1: 编写失败的测试**

创建 `tests/unit/setup.test.js` 测试配置文件存在性：

```javascript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('项目配置', () => {
  it('应该有package.json', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
    expect(pkg.name).toBe('storybook');
  });

  it('应该有vitest配置', () => {
    const fs = await import('fs');
    expect(fs.existsSync('vitest.config.js')).toBe(true);
  });

  it('应该有wrangler配置', () => {
    const fs = await import('fs');
    expect(fs.existsSync('wrangler.toml')).toBe(true);
  });
});
```

**Step 2: 运行测试确认失败**

Run: `npm test`
Expected: FAIL - vitest未安装

**Step 3: 更新package.json添加依赖**

```json
{
  "name": "storybook",
  "version": "0.1.0",
  "description": "卡牌互动小说书籍网站",
  "type": "module",
  "scripts": {
    "dev": "wrangler pages dev src/frontend --port 8788 --compatibility-flag nodejs_compat",
    "deploy": "wrangler pages deploy src/frontend --project-name=storybook",
    "db:create": "wrangler d1 create storybook_database",
    "db:migrate:local": "wrangler d1 execute storybook_database --local --file=./migrations/0001_init.sql",
    "db:migrate:remote": "wrangler d1 execute storybook_database --remote --file=./migrations/0001_init.sql",
    "db:seed:local": "wrangler d1 execute storybook_database --local --file=./migrations/0002_seed_data.sql",
    "db:seed:remote": "wrangler d1 execute storybook_database --remote --file=./migrations/0002_seed_data.sql",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@vitest/coverage-v8": "^1.0.0",
    "vitest": "^1.0.0",
    "wrangler": "^3.24.0"
  }
}
```

**Step 4: 运行npm install**

Run: `npm install`

**Step 5: Commit**

```bash
git add package.json
git commit -m "chore: 添加测试依赖"
```

---

### Task 1.2: 创建Vitest配置

**Files:**
- Create: `vitest.config.js`

**Step 1: 创建配置文件**

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['functions/**/*.js'],
      exclude: ['functions/api/version.js'],
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80
    },
    testTimeout: 10000
  }
});
```

**Step 2: 运行测试确认通过**

Run: `npm test`
Expected: PASS

**Step 3: Commit**

```bash
git add vitest.config.js
git commit -m "chore: 添加Vitest配置"
```

---

### Task 1.3: 创建Playwright配置（线下E2E测试）

**Files:**
- Create: `playwright.config.js`

**Step 1: 创建配置文件**

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
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

**Step 2: Commit**

```bash
git add playwright.config.js
git commit -m "test: 添加Playwright E2E测试配置"
```

---

## Phase 2: 数据库设计

### Task 2.1: 创建数据库迁移脚本

**Files:**
- Modify: `migrations/0001_init.sql`

**Step 1: 编写失败的测试**

创建 `tests/unit/database.test.js`：

```javascript
import { describe, it, expect } from 'vitest';

describe('数据库表结构', () => {
  it('应该包含users表', async () => {
    // 测试会读取SQL文件并验证表存在
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0001_init.sql', 'utf-8')
    );
    expect(sql).toContain('CREATE TABLE');
    expect(sql).toContain('users');
  });

  it('应该包含books表', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0001_init.sql', 'utf-8')
    );
    expect(sql).toContain('books');
  });

  it('应该包含characters表', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0001_init.sql', 'utf-8')
    );
    expect(sql).toContain('characters');
  });

  it('应该包含plot_cards表', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0001_init.sql', 'utf-8')
    );
    expect(sql).toContain('plot_cards');
  });

  it('应该包含chapters表', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0001_init.sql', 'utf-8')
    );
    expect(sql).toContain('chapters');
  });

  it('应该包含puzzles表', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0001_init.sql', 'utf-8')
    );
    expect(sql).toContain('puzzles');
  });
});
```

**Step 2: 运行测试确认失败**

Run: `npm test tests/unit/database.test.js`
Expected: FAIL - SQL文件不包含新表

**Step 3: 更新迁移脚本**

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

**Step 4: 运行测试确认通过**

Run: `npm test tests/unit/database.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add migrations/0001_init.sql tests/unit/database.test.js
git commit -m "feat: 添加完整数据库表结构"
```

---

### Task 2.2: 创建预设数据脚本

**Files:**
- Create: `migrations/0002_seed_data.sql`

**Step 1: 编写失败的测试**

```javascript
import { describe, it, expect } from 'vitest';

describe('预设数据', () => {
  it('应该有预设书籍数据', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0002_seed_data.sql', 'utf-8')
    );
    expect(sql).toContain('INSERT INTO books');
    expect(sql).toContain('preset-');
  });

  it('应该有预设角色数据', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0002_seed_data.sql', 'utf-8')
    );
    expect(sql).toContain('INSERT INTO characters');
  });

  it('应该有预设情节卡牌数据', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0002_seed_data.sql', 'utf-8')
    );
    expect(sql).toContain('INSERT INTO plot_cards');
  });

  it('应该有预设章节数据', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0002_seed_data.sql', 'utf-8')
    );
    expect(sql).toContain('INSERT INTO chapters');
  });

  it('应该有预设谜题数据', async () => {
    const sql = await import('fs').then(fs => 
      fs.readFileSync('migrations/0002_seed_data.sql', 'utf-8')
    );
    expect(sql).toContain('INSERT INTO puzzles');
  });
});
```

**Step 2: 运行测试确认失败**

Run: `npm test tests/unit/seed-data.test.js`
Expected: FAIL - 文件不存在

**Step 3: 创建预设数据**

```sql
-- 预设书籍
INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES
('preset-adventure-001', 'system', '小明的奇幻冒险', 'adventure', 1),
('preset-fantasy-001', 'system', '魔法学院传说', 'fantasy', 1),
('preset-romance-001', 'system', '都市恋曲', 'romance', 1),
('preset-business-001', 'system', '职场风云录', 'business', 1);

-- 预设角色
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, is_protagonist) VALUES
('char-preset-001', 'preset-adventure-001', '小明', '小探险家', '勇敢', '简洁直接', '👦', 1),
('char-preset-002', 'preset-adventure-001', '小红', '小智者', '聪明', '幽默风趣', '👧', 0);

-- 预设情节卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-001', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气', 0),
('card-preset-002', 'preset-adventure-001', 'plot', 'terrain', '森林', '🌲', '神秘的森林', 0);

-- 预设章节
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-001', 'preset-adventure-001', '神秘的开端', '在一个阳光明媚的早晨，小明收到了一封神秘的信件...', 1);

-- 预设谜题
INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type) VALUES
('puzzle-preset-001', 'chapter-preset-001', '什么东西越洗越脏？', '水', 'text');
```

**Step 4: 运行测试确认通过**

Run: `npm test tests/unit/seed-data.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add migrations/0002_seed_data.sql tests/unit/seed-data.test.js
git commit -m "feat: 添加预设数据"
```

---

## Phase 3: API工具函数

### Task 3.1: 创建API工具函数

**Files:**
- Create: `functions/api/utils.js`
- Test: `tests/unit/api-utils.test.js`

**Step 1: 编写失败的测试**

```javascript
import { describe, it, expect } from 'vitest';
import { 
  createSuccessResponse, 
  createErrorResponse, 
  generateId,
  validateEmail,
  validatePassword 
} from '../../functions/api/utils.js';

describe('API Utils - 成功响应', () => {
  it('应该创建正确格式的成功响应', async () => {
    const data = { id: '123', name: 'test' };
    const response = createSuccessResponse(data);
    const json = await response.json();
    
    expect(json.success).toBe(true);
    expect(json.data).toEqual(data);
    expect(json.error).toBeNull();
  });
});

describe('API Utils - 错误响应', () => {
  it('应该创建正确格式的错误响应', () => {
    const response = createErrorResponse('Test error', 400);
    
    expect(response.status).toBe(400);
    expect(response.headers.get('Content-Type')).toBe('application/json');
  });
});

describe('API Utils - ID生成', () => {
  it('应该生成唯一ID', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});

describe('API Utils - 邮箱验证', () => {
  it('应该正确验证有效邮箱', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });
  
  it('应该正确验证无效邮箱', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});

describe('API Utils - 密码验证', () => {
  it('应该正确验证有效密码', () => {
    expect(validatePassword('123456')).toBe(true);
  });
  
  it('应该正确验证无效密码', () => {
    expect(validatePassword('12345')).toBe(false);
  });
});
```

**Step 2: 运行测试确认失败**

Run: `npm test tests/unit/api-utils.test.js`
Expected: FAIL - 模块不存在

**Step 3: 实现工具函数**

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

export function generateId() {
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 6 && password.length <= 20;
}

export function createOptionsResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
```

**Step 4: 运行测试确认通过**

Run: `npm test tests/unit/api-utils.test.js`
Expected: PASS

**Step 5: 调用代码审查技能**

[调用 Skill: requesting-code-review]

---

## Phase 4: 用户系统

### Task 4.1: 用户注册/登录API

**Files:**
- Create: `functions/api/users.js`
- Test: `tests/unit/users.test.js`

**Step 1: 编写失败的测试**

```javascript
import { describe, it, expect } from 'vitest';

describe('Users API', () => {
  describe('POST /api/users', () => {
    it('应该创建新用户');
    it('应该登录已有用户');
    it('应该验证邮箱格式');
    it('应该验证密码长度');
    it('应该防止SQL注入');
  });

  describe('GET /api/users', () => {
    it('应该返回用户信息');
    it('应该返回书籍数量');
  });
});
```

**Step 2-5: TDD流程（每次迭代）**

1. 运行测试：`npm test tests/unit/users.test.js`
2. 实现最小代码使测试通过
3. 提交代码
4. 调用代码审查

[详细实现代码见正式实施阶段]

---

## Phase 5: 书籍系统

### Task 5.1: 书籍CRUD API

**Files:**
- Create: `functions/api/books.js`
- Test: `tests/unit/books.test.js`

[完整的TDD流程]

---

## Phase 6: 角色系统

### Task 6.1: 角色API

**Files:**
- Create: `functions/api/characters.js`
- Test: `tests/unit/characters.test.js`

---

## Phase 7: 卡牌系统

### Task 7.1: 情节卡牌API

**Files:**
- Create: `functions/api/plot-cards.js`
- Test: `tests/unit/plot-cards.test.js`

---

## Phase 8: 章节系统

### Task 8.1: 章节API

**Files:**
- Create: `functions/api/chapters.js`
- Test: `tests/unit/chapters.test.js`

---

## Phase 9: 谜题系统

### Task 9.1: 谜题API

**Files:**
- Create: `functions/api/puzzles.js`
- Test: `tests/unit/puzzles.test.js`

---

## Phase 10: 前端页面

### Task 10.1: 首页

**Files:**
- Create: `src/frontend/index.html`
- Test: `tests/e2e/index.spec.js`

### Task 10.2: 登录页

**Files:**
- Create: `src/frontend/login.html`
- Test: `tests/e2e/login.spec.js`

### Task 10.3: 书架页

**Files:**
- Create: `src/frontend/bookshelf.html`
- Test: `tests/e2e/bookshelf.spec.js`

### Task 10.4: 书籍详情页

**Files:**
- Create: `src/frontend/book.html`
- Test: `tests/e2e/book.spec.js`

### Task 10.5: 故事导演页

**Files:**
- Create: `src/frontend/director.html`
- Test: `tests/e2e/director.spec.js`

### Task 10.6: 章节阅读页

**Files:**
- Create: `src/frontend/chapter.html`
- Test: `tests/e2e/chapter.spec.js`

---

## Phase 11: 线下E2E测试

### Task 11.1: E2E测试环境配置

**Files:**
- Modify: `playwright.config.js`

**Step 1: 配置线下D1测试**

Playwright使用本地wrangler dev服务器，数据库使用`--local` D1

**Step 2: 运行线下E2E测试**

Run: `npm run test:e2e`
Expected: 所有测试通过

**Step 3: 检查覆盖率**

Run: `npm run test:coverage`
Expected: 分支覆盖率 >80%

---

## Phase 12: 自动部署

### Task 12.1: 部署脚本

**Files:**
- Create: `deploy/deploy-remote.bat`

**Step 1: 创建部署脚本**

```batch
@echo off
REM 自动部署到Cloudflare

echo 开始部署...

REM 运行数据库迁移
echo 正在执行数据库迁移...
wrangler d1 execute storybook_database --remote --file=./migrations/0001_init.sql

echo 正在植入预设数据...
wrangler d1 execute storybook_database --remote --file=./migrations/0002_seed_data.sql

REM 部署到Cloudflare Pages
echo 正在部署前端...
wrangler pages deploy src/frontend --project-name=storybook

echo 部署完成！
pause
```

**Step 2: 测试部署脚本**

Run: `deploy/deploy-remote.bat`
Expected: 成功部署到线上

---

## 验收清单

- [ ] 项目初始化完成
- [ ] 数据库迁移成功
- [ ] 所有API实现并通过单元测试
- [ ] 所有页面实现并通过E2E测试
- [ ] 单元测试覆盖率 >80%
- [ ] E2E测试覆盖率 >80%
- [ ] 自动部署成功

---

## 执行顺序

1. Phase 1: 项目初始化与配置
2. Phase 2: 数据库设计
3. Phase 3: API工具函数
4. Phase 4-9: 各系统API实现（每个系统TDD+代码审查）
5. Phase 10: 前端页面
6. Phase 11: E2E测试
7. Phase 12: 自动部署
