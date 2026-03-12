# 卡牌互动小说缺失功能实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现所有缺失功能（P0/P1/P2），使用TDD方式开发，完成后进行代码审查和E2E测试

**Architecture:** Cloudflare Pages + Pages Functions + D1数据库，前端使用原生HTML/CSS/JS

**Tech Stack:** Cloudflare Pages Functions, D1 (SQLite), Vitest, Playwright, bcryptjs

---

## Phase 1: 创建配置文件和配置API (P0)

### Task 1.1: 创建配置文件

**Files:**
- Create: `config/book-types.json`
- Create: `config/character-types.json`
- Create: `config/plot-options.json`
- Create: `config/personality.json`
- Create: `config/speech-style.json`

**Step 1: 创建书籍类型配置**

```json
{
  "types": [
    { "type": "adventure", "name": "儿童冒险", "theme_color": "#FFD700", "bg_style": "卡通插画" },
    { "type": "fantasy", "name": "魔幻传说", "theme_color": "#6B21A8", "bg_style": "星空/魔法纹理" },
    { "type": "romance", "name": "都市言情", "theme_color": "#F48FB1", "bg_style": "柔和渐变" },
    { "type": "business", "name": "职场风云", "theme_color": "#1E3A8A", "bg_style": "几何图案" }
  ]
}
```

**Step 2: 创建角色类型配置（按书籍类型）**

```json
{
  "adventure": ["小探险家", "小勇士", "小智者", "小动物", "小魔法师", "小发明家", "小侦探", "小船长"],
  "fantasy": ["法师", "战士", "游侠", "牧师", "刺客", "德鲁伊", "术士", "圣骑士", "巫师", "盗贼"],
  "romance": ["白领", "学生", "艺术家", "医生", "律师", "记者", "设计师", "程序员", "教师", "创业者"],
  "business": ["经理", "专员", "创业者", "顾问", "总监", "助理", "销售", "工程师", "分析师", "主管"]
}
```

**Step 3: 创建性格预设配置**

```json
{
  "personality": ["勇敢", "谨慎", "乐观", "悲观", "冷静", "冲动", "善良", "自私", "幽默", "严肃", "温柔", "暴躁", "好奇", "沉稳", "活泼", "懒惰", "外向", "阴险", "随和", "傲慢", "懦弱", "贪婪", "多疑", "偏执", "冷漠"]
}
```

**Step 4: 创建说话方式预设配置**

```json
{
  "speech_styles": ["简洁直接", "啰嗦详细", "礼貌客气", "尖酸刻薄", "幽默风趣", "严肃正式", "温柔体贴", "咄咄逼人", "慢条斯理", "快速急促", "诗意文艺", "务实平淡", "夸张生动", "阴阳怪气", "热情奔放", "冷淡疏离", "睿智深沉", "天真单纯", "讽刺挖苦", "抱怨连天", "命令式", "敷衍了事", "油嘴滑舌", "沉默寡言", "爱打断人"]
}
```

**Step 5: 创建情节选项配置（按书籍类型和子类型）**

包含weather、terrain、adventure、equipment四种类型，每种类型每种书籍20个选项。

---

### Task 1.2: 创建配置API (TDD)

**Files:**
- Create: `tests/unit/config.test.js`
- Create: `functions/api/config/book-types.js`
- Create: `functions/api/config/character-types.js`
- Create: `functions/api/config/personality.js`
- Create: `functions/api/config/speech-style.js`
- Create: `functions/api/config/plot-options.js`

**Step 1: 编写配置API测试**

```javascript
import { describe, it, expect, vi } from 'vitest';

describe('Config API', () => {
  describe('GET /api/config/book-types', () => {
    it('should return all book types', async () => {
      // 测试返回4种书籍类型
    });
  });

  describe('GET /api/config/character-types', () => {
    it('should return character types for adventure book', async () => {
      // 测试返回儿童冒险的8种角色类型
    });
    it('should return character types for fantasy book', async () => {
      // 测试返回魔幻传说的10种角色类型
    });
  });

  describe('GET /api/config/personality', () => {
    it('should return 25 personality options', async () => {
      // 测试返回25种性格预设
    });
  });

  describe('GET /api/config/speech-style', () => {
    it('should return 25 speech style options', async () => {
      // 测试返回25种说话方式预设
    });
  });

  describe('GET /api/config/plot-options', () => {
    it('should return plot options for adventure book', async () => {
      // 测试返回儿童冒险的情节选项
    });
  });
});
```

**Step 2: 实现配置API**

每个API读取对应的JSON配置文件并返回。

---

## Phase 2: 完善书籍创建API (P0)

### Task 2.1: 支持创建书籍时同时创建角色 (TDD)

**Files:**
- Modify: `tests/unit/books.test.js`
- Modify: `functions/api/books.js`

**Step 1: 编写测试 - 创建书籍时创建主角**

```javascript
it('should create protagonist when creating book', async () => {
  const response = await env.DB.prepare(
    'SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1'
  ).bind(bookId).first();
  
  expect(response).not.toBeNull();
  expect(response.name).toBe('小明');
});
```

**Step 2: 编写测试 - 创建书籍时创建配角**

```javascript
it('should create supporting characters when creating book', async () => {
  const response = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM characters WHERE book_id = ? AND is_protagonist = 0'
  ).bind(bookId).first();
  
  expect(response.count).toBe(2);
});
```

**Step 3: 修改books.js支持角色创建**

---

## Phase 3: 实现卡牌掉落系统 (P0)

### Task 3.1: 解谜成功后掉落卡牌 (TDD)

**Files:**
- Modify: `tests/unit/puzzles.test.js`
- Modify: `functions/api/puzzles/[id]/solve.js`

**Step 1: 编写测试 - 解谜成功返回卡牌奖励**

```javascript
it('should return card reward when puzzle solved correctly', async () => {
  // 解谜成功后应该返回掉落的卡牌信息
  expect(result.data.reward).toBeDefined();
  expect(result.data.reward.card).toBeDefined();
  expect(result.data.reward.card.sub_type).toBeOneOf(['weather', 'terrain', 'adventure', 'equipment']);
});
```

**Step 2: 编写测试 - 卡牌写入数据库**

```javascript
it('should save dropped card to database', async () => {
  // 验证卡牌已写入plot_cards表
  const card = await env.DB.prepare(
    'SELECT * FROM plot_cards WHERE card_id = ?'
  ).bind(result.data.reward.card.card_id).first();
  
  expect(card).not.toBeNull();
});
```

**Step 3: 实现卡牌掉落逻辑**

- 从配置文件中随机选择一种情节卡牌
- 70%概率掉落预设卡牌，30%概率掉落自定义卡牌槽位
- 将卡牌写入plot_cards表

---

## Phase 4: 实现卡牌上限检查和丢弃功能 (P0)

### Task 4.1: 卡牌上限检查 (TDD)

**Files:**
- Create: `tests/unit/card-limit.test.js`
- Modify: `functions/api/chapters.js`
- Modify: `functions/api/puzzles/[id]/solve.js`

**Step 1: 编写测试 - 检查卡牌上限**

```javascript
it('should check card limit before dropping', async () => {
  // 当某种类型卡牌达到8张时，应该返回需要丢弃的提示
});
```

**Step 2: 实现卡牌上限检查逻辑**

### Task 4.2: 卡牌丢弃API (TDD)

**Files:**
- Create: `tests/unit/plot-cards-delete.test.js`
- Create: `functions/api/plot-cards/[id].js`

**Step 1: 编写测试 - 丢弃卡牌**

```javascript
it('should delete card successfully', async () => {
  const response = await fetch('/api/plot-cards/' + cardId, { method: 'DELETE' });
  expect(response.data.deleted).toBe(true);
  
  // 验证数据库中卡牌已删除
  const card = await env.DB.prepare('SELECT * FROM plot_cards WHERE card_id = ?').bind(cardId).first();
  expect(card).toBeNull();
});
```

**Step 2: 实现丢弃卡牌API**

---

## Phase 5: 实现故事导演页 (P0)

### Task 5.1: 创建导演页前端 (TDD)

**Files:**
- Create: `src/frontend/director.html`
- Create: `src/frontend/css/director.css`
- Create: `src/frontend/js/director.js`
- Create: `tests/e2e/director.spec.js`

**Step 1: 编写E2E测试 - 导演页基本功能**

```javascript
test('应该显示角色卡牌区域', async ({ page }) => {
  await page.goto('/director?bookId=' + bookId);
  await expect(page.locator('.character-cards')).toBeVisible();
});

test('应该显示四种情节卡牌区域', async ({ page }) => {
  await page.goto('/director?bookId=' + bookId);
  await expect(page.locator('.weather-cards')).toBeVisible();
  await expect(page.locator('.terrain-cards')).toBeVisible();
  await expect(page.locator('.adventure-cards')).toBeVisible();
  await expect(page.locator('.equipment-cards')).toBeVisible();
});

test('必须选择主角才能生成章节', async ({ page }) => {
  // 不选主角点击开始拍摄应该提示错误
});

test('必须选择每种情节卡牌各一张', async ({ page }) => {
  // 不选完整卡牌点击开始拍摄应该提示错误
});

test('点击开始拍摄应该生成章节', async ({ page }) => {
  // 选择完整卡牌后点击开始拍摄
  // 验证跳转到书籍详情页
  // 验证新章节已创建
});
```

**Step 2: 实现导演页HTML结构**

三栏布局：舞台区域 + 卡牌选择区域 + 操作按钮

**Step 3: 实现导演页JavaScript逻辑**

- 加载角色卡牌
- 加载情节卡牌（按子类型分组）
- 卡牌选择逻辑
- 开始拍摄（调用章节生成API）

---

## Phase 6: 实现书籍创建页 (P0)

### Task 6.1: 创建书籍创建页前端 (TDD)

**Files:**
- Create: `src/frontend/book-create.html`
- Create: `src/frontend/css/book-create.css`
- Create: `src/frontend/js/book-create.js`
- Create: `tests/e2e/book-create.spec.js`

**Step 1: 编写E2E测试 - 多步骤创建流程**

```javascript
test('步骤1: 应该显示基本信息表单', async ({ page }) => {
  await page.goto('/book-create');
  await expect(page.locator('#step1')).toBeVisible();
  await expect(page.locator('#bookTitle')).toBeVisible();
  await expect(page.locator('#bookType')).toBeVisible();
});

test('步骤2: 应该显示主角信息表单', async ({ page }) => {
  // 填写基本信息后进入步骤2
});

test('步骤3: 应该显示配角信息表单', async ({ page }) => {
  // 填写主角信息后进入步骤3
});

test('步骤4: 应该显示创建成功页面', async ({ page }) => {
  // 完成创建后显示成功页面
});

test('创建成功后应该跳转到书籍详情页', async ({ page }) => {
  // 点击前往书籍详情应该正确跳转
});

test('应该验证必填字段', async ({ page }) => {
  // 不填写必填字段应该无法进入下一步
});
```

**Step 2: 实现多步骤创建页面**

- 步骤1：基本信息（书名、类型）
- 步骤2：主角信息（名称、头像、性格、说话方式、角色类型）
- 步骤3：配角信息（可选，最多3个）
- 步骤4：创建成功

---

## Phase 7: 实现亲密度系统 (P1)

### Task 7.1: 亲密度显示和更新 (TDD)

**Files:**
- Modify: `tests/unit/characters.test.js`
- Modify: `functions/api/characters.js`
- Modify: `functions/api/chapters.js`

**Step 1: 编写测试 - 亲密度显示**

```javascript
it('should return intimacy display text', async () => {
  // 亲密度50应该显示为"友好"
  // 亲密度0应该显示为"中立"
  // 亲密度-50应该显示为"敌对"
});
```

**Step 2: 编写测试 - 章节生成时更新亲密度**

```javascript
it('should update intimacy when chapter is generated', async () => {
  // 生成章节后，配角的亲密度应该被更新
});
```

**Step 3: 实现亲密度逻辑**

---

## Phase 8: 实现风格差异化UI (P2)

### Task 8.1: 创建主题CSS文件 (TDD)

**Files:**
- Create: `src/frontend/css/theme-adventure.css`
- Create: `src/frontend/css/theme-fantasy.css`
- Create: `src/frontend/css/theme-romance.css`
- Create: `src/frontend/css/theme-business.css`
- Create: `tests/e2e/theme.spec.js`

**Step 1: 编写E2E测试 - 主题应用**

```javascript
test('儿童冒险书籍应该应用黄色主题', async ({ page }) => {
  // 检查主色调是否为黄色
});

test('魔幻传说书籍应该应用紫色主题', async ({ page }) => {
  // 检查主色调是否为紫色
});
```

**Step 2: 实现主题CSS**

每种书籍类型独立的颜色、背景、边框、图标风格。

---

## Phase 9: 实现动画效果 (P2)

### Task 9.1: 卡牌动画 (TDD)

**Files:**
- Modify: `src/frontend/css/style.css`
- Create: `tests/e2e/animation.spec.js`

**Step 1: 编写E2E测试 - 动画效果**

```javascript
test('卡牌悬停应该有3D翻转效果', async ({ page }) => {
  // 悬停卡牌，检查transform样式
});

test('卡牌选中应该有心跳动画', async ({ page }) => {
  // 选中卡牌，检查animation
});
```

**Step 2: 实现CSS动画**

- 卡牌悬停：3D翻转 + 放大
- 卡牌选中：金色光晕 + 心跳动画
- 获得新卡：抽卡动画 + 闪卡特效
- 解谜成功：金币掉落 + 卡牌飞入

---

## Phase 10: 代码审查

### Task 10.1: 使用requesting-code-review技能

**Files:**
- Review all modified and created files

**Step 1: 调用代码审查技能**

检查：
- 代码规范
- 安全性
- 性能
- 测试覆盖率

---

## Phase 11: 完善E2E测试用例

### Task 11.1: 修改现有测试用例

**Files:**
- Modify: `tests/e2e/app.spec.js`

**要求:**
1. 断言检查页面元素内容符合预期
2. 修改数据时检查SQLite数据库内容
3. 不使用mock数据库

**Step 1: 增强首页测试**

```javascript
test('应该显示正确的预设书籍数量', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.book-card', { timeout: 10000 });
  
  // 验证数据库中的预设书籍数量
  const response = await page.request.get('http://localhost:8788/api/books/preset');
  const data = await response.json();
  
  const books = await page.locator('.book-card').count();
  expect(books).toBe(data.data.length);
});
```

**Step 2: 增强登录测试**

```javascript
test('注册后应该写入数据库', async ({ page }) => {
  const testEmail = `test${Date.now()}@example.com`;
  await page.goto('/login');
  await page.fill('#email', testEmail);
  await page.fill('#password', '123456');
  await page.click('button[type="submit"]');
  
  await page.waitForURL('**/bookshelf', { timeout: 15000 });
  
  // 验证数据库中有该用户
  const response = await page.request.get(`http://localhost:8788/api/users?user_id=${userId}`);
  const data = await response.json();
  expect(data.data.email).toBe(testEmail);
});
```

**Step 3: 增强书籍创建测试**

```javascript
test('创建书籍后应该写入数据库', async ({ page }) => {
  // 创建书籍
  // 验证数据库中书籍记录
  // 验证数据库中角色记录（主角和配角）
});
```

**Step 4: 增强章节生成测试**

```javascript
test('生成章节后应该写入数据库', async ({ page }) => {
  // 在导演页选择卡牌生成章节
  // 验证数据库中章节记录
  // 验证数据库中谜题记录
});
```

**Step 5: 增强解谜测试**

```javascript
test('解谜成功后应该掉落卡牌并写入数据库', async ({ page }) => {
  // 解谜成功
  // 验证返回的卡牌奖励
  // 验证数据库中plot_cards表有新记录
});
```

### Task 11.2: 添加新功能测试

**新增测试用例:**
- 故事导演页完整流程测试
- 书籍创建页多步骤流程测试
- 卡牌上限检查和丢弃测试
- 亲密度系统测试
- 主题切换测试
- 动画效果测试

---

## Phase 12: 运行所有测试并验证

### Task 12.1: 运行单元测试

```bash
npm run test
```

目标：覆盖率 > 80%

### Task 12.2: 运行E2E测试

```bash
# 启动本地Cloudflare环境
npx wrangler pages dev . --port 8788 --d1 storybook_database=.wrangler/state/v3/d1/miniflare-D1DatabaseObject

# 运行Playwright测试
npx playwright test
```

目标：所有测试通过

### Task 12.3: 验证功能完整性

- 所有P0功能已实现
- 所有P1功能已实现
- 所有P2功能已实现
- 所有测试用例通过

---

## 执行顺序

1. Phase 1: 配置文件和配置API
2. Phase 2: 完善书籍创建API
3. Phase 3: 卡牌掉落系统
4. Phase 4: 卡牌上限检查和丢弃
5. Phase 5: 故事导演页
6. Phase 6: 书籍创建页
7. Phase 7: 亲密度系统
8. Phase 8: 风格差异化UI
9. Phase 9: 动画效果
10. Phase 10: 代码审查
11. Phase 11: 完善E2E测试
12. Phase 12: 运行测试验证

---

## 注意事项

1. **TDD开发**：每个功能先写测试，再实现代码
2. **数据库验证**：E2E测试必须验证SQLite数据库内容
3. **真实环境**：使用本地Cloudflare环境，不使用mock
4. **频繁提交**：每完成一个小功能就提交代码
5. **覆盖率目标**：单元测试 > 80%，E2E测试覆盖核心流程
