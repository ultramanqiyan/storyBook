# 卡牌掉落UI与公共图书馆功能设计文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 项目名称 | 卡牌互动小说书籍网站 |
| 创建日期 | 2026-03-13 |
| 文档类型 | 功能设计文档 |
| 状态 | 已确认 |

---

## 一、功能概述

本文档涵盖两个核心功能的设计：

1. **卡牌掉落与丢弃UI交互** - 解谜成功后获得卡牌的完整交互流程
2. **公共图书馆** - 预设书籍的展示与导入功能

---

## 二、卡牌掉落与丢弃UI交互

### 2.1 功能需求

| 需求ID | 需求描述 | 优先级 |
|--------|----------|--------|
| CD-001 | 解谜成功后展示获得卡牌动画 | P0 |
| CD-002 | 卡牌从屏幕中央飞入模态框 | P0 |
| CD-003 | 用户点击"收下"后关闭弹窗 | P0 |
| CD-004 | 卡牌上限超过8张时弹出丢弃选择 | P0 |
| CD-005 | 丢弃弹窗展示9张卡牌供选择 | P0 |
| CD-006 | 新获得的卡牌可以被丢弃 | P0 |
| CD-007 | 单选模式选择要丢弃的卡牌 | P0 |

### 2.2 交互流程

#### 2.2.1 正常获得卡牌流程

```
用户解谜成功
    │
    ▼
┌─────────────────────────┐
│  API返回：is_correct=true │
│  reward.card = {...}      │
│  card_limit_exceeded=false│
└─────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  卡牌从屏幕中央飞入      │
│  (动画时长: 0.8s)        │
└─────────────────────────┘
    │
    ▼
┌─────────────────────────┐
│  模态框展示获得的卡牌    │
│  ┌─────────────────┐    │
│  │   ✨ 📖 ✨      │    │
│  │   [卡牌图标]    │    │
│  │   [卡牌名称]    │    │
│  │   [卡牌描述]    │    │
│  └─────────────────┘    │
│                         │
│  [   收下   ]           │
└─────────────────────────┘
    │
    ▼
用户点击"收下"
    │
    ▼
关闭弹窗，返回章节页面
```

#### 2.2.2 卡牌上限已满流程

```
用户解谜成功
    │
    ▼
┌─────────────────────────┐
│  API返回：is_correct=true │
│  reward.card = {...}      │
│  card_limit_exceeded=true │
│  reward.existing_cards=[] │
└─────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  第一步弹窗：展示获得卡牌            │
│  ┌─────────────────┐                │
│  │   ✨ 📖 ✨      │                │
│  │   [新卡牌]      │                │
│  │   恭喜获得！    │                │
│  └─────────────────┘                │
│                                     │
│  [   继续   ]                       │
└─────────────────────────────────────┘
    │
    ▼
用户点击"继续"
    │
    ▼
┌─────────────────────────────────────┐
│  第二步弹窗：背包已满                │
│  ┌───────────────────────────────┐  │
│  │  ⚠️ 该类型卡牌已达上限(8张)   │  │
│  │  请选择一张丢弃               │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│  │ 📖 │ │ 📖 │ │ 📖 │ │ 📖 │  │
│  │卡1 │ │卡2 │ │卡3 │ │卡4 │  │
│  └─────┘ └─────┘ └─────┘ └─────┘  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│  │ 📖 │ │ 📖 │ │ 📖 │ │ ✨ │  │
│  │卡5 │ │卡6 │ │卡7 │ │新卡 │  │
│  └─────┘ └─────┘ └─────┘ └─────┘  │
│      ↑                              │
│  [选中状态：金色边框 + 光晕]         │
│                                     │
│  [   取消   ]  [ 丢弃选中 ]         │
└─────────────────────────────────────┘
    │
    ▼
用户选择一张卡牌并点击"丢弃选中"
    │
    ▼
┌─────────────────────────────────────┐
│  确认弹窗                            │
│  ┌───────────────────────────────┐  │
│  │  确定要丢弃【卡牌名称】吗？    │  │
│  │  丢弃后无法恢复               │  │
│  └───────────────────────────────┘  │
│                                     │
│  [   取消   ]  [   确认   ]         │
└─────────────────────────────────────┘
    │
    ▼
用户确认丢弃
    │
    ▼
API调用：删除选中卡牌 + 添加新卡牌
    │
    ▼
关闭弹窗，显示成功提示
```

### 2.3 UI组件设计

#### 2.3.1 获得卡牌弹窗

```html
<!-- 获得卡牌弹窗 -->
<div class="card-reward-modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="card-fly-in-animation">
      <div class="reward-card">
        <div class="card-glow"></div>
        <div class="card-icon">☀️</div>
        <div class="card-name">晴天</div>
        <div class="card-type">天气卡牌</div>
      </div>
    </div>
    <div class="reward-message">恭喜获得卡牌！</div>
    <button class="btn-receive">收下</button>
  </div>
</div>
```

#### 2.3.2 丢弃选择弹窗

```html
<!-- 丢弃选择弹窗 -->
<div class="card-discard-modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h3>⚠️ 背包已满</h3>
      <p>该类型卡牌已达上限(8张)，请选择一张丢弃</p>
    </div>
    <div class="cards-grid">
      <!-- 8张现有卡牌 + 1张新卡牌 -->
      <div class="card-item" data-card-id="xxx">
        <div class="card-icon">☀️</div>
        <div class="card-name">晴天</div>
      </div>
      <!-- ... 更多卡牌 ... -->
      <div class="card-item new-card" data-card-id="new">
        <div class="new-badge">NEW</div>
        <div class="card-icon">🌧️</div>
        <div class="card-name">小雨</div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-cancel">取消</button>
      <button class="btn-discard" disabled>丢弃选中</button>
    </div>
  </div>
</div>
```

### 2.4 API接口

#### 2.4.1 解谜成功响应（已有，需前端处理）

```javascript
// 成功响应 - 未超上限
{
  "success": true,
  "data": {
    "is_correct": true,
    "is_solved": true,
    "message": "恭喜！答案正确！",
    "reward": {
      "card": {
        "card_id": "card_xxx",
        "sub_type": "weather",
        "name": "晴天",
        "icon": "☀️",
        "description": "天气类型卡牌"
      },
      "message": "恭喜获得卡牌【晴天】！"
    },
    "card_limit_exceeded": false
  }
}

// 成功响应 - 超上限
{
  "success": true,
  "data": {
    "is_correct": true,
    "is_solved": true,
    "message": "恭喜！答案正确！",
    "reward": {
      "card": {
        "card_id": "card_xxx",
        "sub_type": "weather",
        "name": "小雨",
        "icon": "🌧️",
        "description": "天气类型卡牌"
      },
      "sub_type": "weather",
      "current_count": 8,
      "existing_cards": [
        { "card_id": "card_1", "name": "晴天", "icon": "☀️" },
        // ... 7张现有卡牌
      ],
      "message": "恭喜获得卡牌【小雨】！但该类型卡牌已达上限（8张），请选择丢弃一张。"
    },
    "card_limit_exceeded": true
  }
}
```

#### 2.4.2 丢弃卡牌接口（已有，需确认）

```
DELETE /api/plot-cards/{card_id}
```

#### 2.4.3 添加卡牌接口（超上限时需要）

```
POST /api/plot-cards
{
  "book_id": "book_xxx",
  "card": {
    "sub_type": "weather",
    "name": "小雨",
    "icon": "🌧️",
    "description": "天气类型卡牌"
  }
}
```

### 2.5 动画效果

| 动画名称 | 时长 | 效果描述 |
|----------|------|----------|
| 卡牌飞入 | 0.8s | 卡牌从屏幕中央放大并飞入弹窗位置 |
| 光晕脉冲 | 1.5s | 卡牌周围光晕循环脉冲 |
| 选中效果 | 0.3s | 点击卡牌时边框变金色 + 轻微放大 |
| 丢弃消失 | 0.5s | 卡牌淡出 + 向上飘散 |

---

## 三、公共图书馆功能

### 3.1 功能需求

| 需求ID | 需求描述 | 优先级 |
|--------|----------|--------|
| LIB-001 | 创建独立的公共图书馆页面 | P0 |
| LIB-002 | 页面风格：魔法书架（中世纪复古） | P0 |
| LIB-003 | 书籍以悬浮魔法形式展示 | P0 |
| LIB-004 | 支持按类型筛选书籍 | P0 |
| LIB-005 | 点击书籍显示详情弹窗 | P0 |
| LIB-006 | 导入功能：复制书籍到用户书架 | P0 |
| LIB-007 | 导入时复制：书籍信息+章节+卡牌 | P0 |
| LIB-008 | 导入时重置谜题状态为未解开 | P0 |
| LIB-009 | 导入动画：魔法转化+飞向用户 | P1 |

### 3.2 页面布局

#### 3.2.1 整体结构

```
┌─────────────────────────────────────────────────────────────────┐
│  背景层：深蓝紫色渐变 + 星空粒子 + 魔法光点漂浮                  │
├─────────────────────────────────────────────────────────────────┤
│  导航栏：古老符文装饰边框 + 蜡烛图标                             │
│  📚 Ancient Library of Tales        [🏠首页] [📖我的书架]        │
├─────────────────────────────────────────────────────────────────┤
│  神秘符文装饰线                                                  │
│  ◈───────✧───────◈───────✧───────◈───────✧───────◈            │
├─────────────────────────────────────────────────────────────────┤
│  筛选区域                                                        │
│  [✨全部] [🗺️冒险] [🧙魔幻] [💕言情] [💼职场]                   │
├─────────────────────────────────────────────────────────────────┤
│  魔法书架展示区                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  书籍悬浮展示 + 底部魔法光圈 + 类型对应光晕              │   │
│  │  [📖] [📖] [📖] [📖]                                    │   │
│  │  书名 书名 书名 书名                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│  [古老木质书架框架 + 神秘符文雕刻]                               │
├─────────────────────────────────────────────────────────────────┤
│  Footer: "May the stories guide your journey..."                │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.2.2 书籍卡片设计

```
悬浮书籍卡片
┌─────────────────────────┐
│   ✨ ✨ ✨ ✨ ✨ ✨ ✨    │  ← 魔法粒子漂浮
│  ╔═══════════════════╗  │
│  ║    [类型图标]     ║  │  ← 冒险🔥/魔幻❄️/言情⭐/职场🌿
│  ║       🗺️         ║  │
│  ║    ┌─────────┐   ║  │
│  ║    │  📖     │   ║  │  ← 书籍主体(皮革纹理+金属扣)
│  ║    │ 冒险    │   ║  │
│  ║    │ 故事    │   ║  │
│  ║    └─────────┘   ║  │
│  ╚═══════════════════╝  │
│     ○ ○ ○ ○ ○ ○ ○      │  ← 底部魔法光圈
└─────────────────────────┘
      📜 勇者传说
      📖 4章节 | 🎭 8角色 | 🃏 12卡牌
```

### 3.3 类型光晕效果

| 类型 | 图标 | 光晕颜色 | 粒子效果 | 符文风格 |
|------|------|----------|----------|----------|
| 冒险 | 🗺️ | 橙红色火焰 | 🔥 火焰粒子 + 热浪扭曲 | 古代探险符文 |
| 魔幻 | 🧙 | 冰蓝色星光 | ❄️ 冰霜粒子 + 星光闪烁 | 魔法咒语符文 |
| 言情 | 💕 | 粉紫色玫瑰 | 🌸 花瓣粒子 + 柔光闪烁 | 爱情符文 |
| 职场 | 💼 | 金色光芒 | ✨ 金色粒子 + 光芒四射 | 成功符文 |

### 3.4 交互流程

#### 3.4.1 浏览书籍

```
用户进入公共图书馆
    │
    ▼
页面加载动画
- 星空背景渐显
- 书籍从虚空中浮现
- 魔法粒子飘散
    │
    ▼
展示所有预设书籍
    │
    ▼
用户可筛选类型
- 点击筛选标签
- 书籍淡出淡入切换
    │
    ▼
用户悬停书籍
- 书籍轻微上下浮动
- 光晕增强
- 符文闪烁
```

#### 3.4.2 查看详情

```
用户点击书籍
    │
    ▼
弹出书籍详情弹窗
┌─────────────────────────────────────────┐
│  📖 书籍详情                            │
│  ────────────────────────────────       │
│  📜 勇者传说                            │
│  🏷️ 类型：儿童冒险                     │
│  📅 创建：古老时代                      │
│  📖 章节：4章                           │
│  🎭 角色：主角+3配角                    │
│  ────────────────────────────────       │
│  📖 故事简介                            │
│  在遥远的魔法大陆...                    │
│  ────────────────────────────────       │
│  🎭 主要角色        🃏 卡牌预览         │
│  🧙‍♂️ 主角：艾拉     ☀️🏔️🗺️🎒         │
│  👸 配角：公主莉莉                       │
│  ────────────────────────────────       │
│  [   ✨ 导入到我的书架 ✨   ]           │
│  [关闭] ❌                              │
└─────────────────────────────────────────┘
```

#### 3.4.3 导入书籍

```
用户点击"导入到我的书架"
    │
    ▼
导入动画开始
Step 1: 书籍开始发光，光晕增强
Step 2: 书籍周围出现魔法阵，符文旋转
Step 3: 书籍化作魔法光束飞向用户
Step 4: 显示"导入成功"提示
    │
    ▼
API调用：复制书籍数据
- 复制书籍基本信息
- 复制角色信息
- 复制卡牌信息
- 复制章节内容
- 重置谜题状态为未解开
    │
    ▼
显示成功弹窗
┌─────────────────────────────────┐
│  ✨ 导入成功！✨                │
│  《勇者传说》已加入你的书架      │
│                                 │
│  [前往书架]  [继续探索]         │
└─────────────────────────────────┘
```

### 3.5 API接口

#### 3.5.1 获取预设书籍列表（已有）

```
GET /api/books/preset
Response:
{
  "success": true,
  "data": [
    {
      "book_id": "preset_001",
      "title": "勇者传说",
      "type": "adventure",
      "chapter_count": 4,
      "is_preset": 1
    }
  ]
}
```

#### 3.5.2 获取预设书籍详情（需新增）

```
GET /api/books/preset/{book_id}/detail
Response:
{
  "success": true,
  "data": {
    "book": { ... },
    "characters": [ ... ],
    "plot_cards": [ ... ],
    "chapters": [ ... ]
  }
}
```

#### 3.5.3 导入预设书籍（需新增）

```
POST /api/books/preset/{book_id}/import
Request:
{
  "user_id": "user_xxx"
}
Response:
{
  "success": true,
  "data": {
    "new_book_id": "book_xxx",
    "message": "导入成功"
  }
}
```

### 3.6 导航调整

需要在以下页面添加"公共图书馆"入口：

| 页面 | 位置 | 操作 |
|------|------|------|
| index.html | 导航栏 | 添加"📚 公共图书馆"链接 |
| bookshelf.html | 导航栏 | 添加"📚 公共图书馆"链接 |
| library.html | 导航栏 | 添加返回链接 |

---

## 四、文件变更清单

### 4.1 新增文件

| 文件路径 | 描述 |
|----------|------|
| `src/frontend/library.html` | 公共图书馆页面 |
| `src/frontend/css/library.css` | 公共图书馆样式 |
| `src/frontend/js/library.js` | 公共图书馆逻辑 |
| `functions/api/books/[id]/import.js` | 导入预设书籍API |
| `functions/api/books/[id]/detail.js` | 获取预设书籍详情API |

### 4.2 修改文件

| 文件路径 | 修改内容 |
|----------|----------|
| `src/frontend/chapter.html` | 添加卡牌掉落弹窗UI和逻辑 |
| `src/frontend/css/style.css` | 添加卡牌弹窗样式 |
| `src/frontend/js/api.js` | 添加导入书籍API调用 |
| `src/frontend/index.html` | 导航栏添加公共图书馆入口 |
| `src/frontend/bookshelf.html` | 导航栏添加公共图书馆入口，移除预设书籍区域 |

---

## 五、验收标准

### 5.1 卡牌掉落功能

- [ ] 解谜成功后显示卡牌飞入动画
- [ ] 弹窗正确展示获得的卡牌信息
- [ ] 点击"收下"后弹窗关闭
- [ ] 卡牌上限已满时显示两步弹窗
- [ ] 丢弃弹窗正确展示9张卡牌
- [ ] 新卡牌有"NEW"标识
- [ ] 单选模式正常工作
- [ ] 选中卡牌有视觉反馈
- [ ] 丢弃后新卡牌正确添加

### 5.2 公共图书馆功能

- [ ] 页面正确加载，显示魔法书架风格
- [ ] 书籍悬浮效果正常
- [ ] 类型筛选功能正常
- [ ] 点击书籍显示详情弹窗
- [ ] 详情弹窗显示完整信息
- [ ] 导入动画流畅
- [ ] 导入后书籍出现在用户书架
- [ ] 导入后章节、卡牌、角色正确复制
- [ ] 导入后谜题状态重置为未解开

---

## 六、技术实现细节

### 6.1 预设书籍存储方案

#### 6.1.1 数据库Schema（已有）

```sql
-- books表使用 is_preset 字段区分
CREATE TABLE books (
    book_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,           -- 预设书籍: 'system'
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    is_preset INTEGER NOT NULL DEFAULT 0,  -- 0=用户书籍, 1=预设书籍
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_books_is_preset ON books(is_preset);
```

#### 6.1.2 预设书籍数据结构

| 数据表 | 预设书籍数据 | 说明 |
|--------|--------------|------|
| `books` | ✅ 已有 | 8本预设书籍（每种类型2本） |
| `characters` | ✅ 已有 | 每本书的主角和配角 |
| `chapters` | ✅ 已有 | 每本书10个章节 |
| `puzzles` | ✅ 已有 | 部分章节有谜题 |
| `plot_cards` | ❌ 需补充 | 预设书籍的情节卡牌 |

#### 6.1.3 需补充的Seed数据

需要在 `migrations/0002_seed_data.sql` 中补充预设书籍的卡牌数据：

```sql
-- 预设书籍卡牌数据示例
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
-- 小明的奇幻冒险 (preset-adventure-001)
('card-preset-adventure-001-weather-01', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-adventure-001-weather-02', 'preset-adventure-001', 'plot', 'weather', '彩虹天', '🌈', '天气类型卡牌', 0),
-- ... 每种类型4张卡牌，共16张
-- 其他预设书籍类似...
```

### 6.2 导入过程实现

#### 6.2.1 导入API实现逻辑

```javascript
// POST /api/books/preset/{book_id}/import
async function importPresetBook(presetBookId, userId) {
  // 1. 查询预设书籍完整数据
  const presetBook = await db.prepare(
    'SELECT * FROM books WHERE book_id = ? AND is_preset = 1'
  ).bind(presetBookId).first();
  
  if (!presetBook) {
    throw new Error('预设书籍不存在');
  }
  
  // 2. 生成新ID
  const newBookId = generateId();
  const idMapping = {
    characters: new Map(),
    cards: new Map(),
    chapters: new Map(),
    puzzles: new Map()
  };
  
  // 3. 复制书籍基本信息
  await db.prepare(
    'INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)'
  ).bind(newBookId, userId, presetBook.title, presetBook.type).run();
  
  // 4. 复制角色数据
  const characters = await db.prepare(
    'SELECT * FROM characters WHERE book_id = ?'
  ).bind(presetBookId).all();
  
  for (const char of characters.results) {
    const newCharId = generateId();
    idMapping.characters.set(char.char_id, newCharId);
    await db.prepare(
      'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(newCharId, newBookId, char.name, char.role_type, char.personality, char.speech_style, char.avatar, char.intimacy, char.relationship, char.is_protagonist).run();
  }
  
  // 5. 复制卡牌数据
  const cards = await db.prepare(
    'SELECT * FROM plot_cards WHERE book_id = ?'
  ).bind(presetBookId).all();
  
  for (const card of cards.results) {
    const newCardId = generateId();
    idMapping.cards.set(card.card_id, newCardId);
    await db.prepare(
      'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(newCardId, newBookId, card.type, card.sub_type, card.name, card.icon, card.description, card.is_custom).run();
  }
  
  // 6. 复制章节数据
  const chapters = await db.prepare(
    'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num'
  ).bind(presetBookId).all();
  
  for (const chapter of chapters.results) {
    const newChapterId = generateId();
    idMapping.chapters.set(chapter.chapter_id, newChapterId);
    
    // 更新selected_cards中的ID引用
    let selectedCards = JSON.parse(chapter.selected_cards);
    // 更新卡牌ID引用...
    
    await db.prepare(
      'INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(newChapterId, newBookId, chapter.title, chapter.content, JSON.stringify(selectedCards), chapter.order_num).run();
  }
  
  // 7. 复制谜题数据（重置状态）
  const puzzles = await db.prepare(
    'SELECT * FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)'
  ).bind(presetBookId).all();
  
  for (const puzzle of puzzles.results) {
    const newPuzzleId = generateId();
    const newChapterId = idMapping.chapters.get(puzzle.chapter_id);
    await db.prepare(
      'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, attempts, max_attempts, is_solved) VALUES (?, ?, ?, ?, ?, ?, 0, 3, 0)'
    ).bind(newPuzzleId, newChapterId, puzzle.question, puzzle.answer, puzzle.puzzle_type, puzzle.options).run();
  }
  
  return { new_book_id: newBookId, message: '导入成功' };
}
```

#### 6.2.2 导入数据映射关系

```
预设书籍 (is_preset=1, user_id='system')
    │
    ▼ 复制
用户书籍 (is_preset=0, user_id=当前用户)
    │
    ├── books: book_id → 新ID
    ├── characters: char_id → 新ID, book_id → 新book_id
    ├── plot_cards: card_id → 新ID, book_id → 新book_id
    ├── chapters: chapter_id → 新ID, book_id → 新book_id
    │   └── selected_cards: 更新卡牌ID引用
    └── puzzles: puzzle_id → 新ID, chapter_id → 新chapter_id
        └── is_solved = 0 (重置为未解开)
```

### 6.3 公共图书馆只读模式

#### 6.3.1 设计原则

| 场景 | 行为 | 原因 |
|------|------|------|
| 浏览预设书籍 | ✅ 允许 | 展示内容 |
| 阅读章节内容 | ✅ 允许 | 展示内容 |
| 解谜 | ❌ 禁止 | 谜题状态无法独立保存 |
| 获得卡牌 | ❌ 禁止 | 卡牌无法绑定到用户 |
| 导入书籍 | ✅ 允许 | 复制到用户书架后可正常操作 |

#### 6.3.2 前端实现

```javascript
// 判断是否为预设书籍
function isPresetBook(bookId) {
  return bookId.startsWith('preset-');
}

// 章节页面：预设书籍隐藏解谜功能
if (isPresetBook(bookId)) {
  // 隐藏谜题输入框
  document.querySelector('.puzzle-section').style.display = 'none';
  // 显示提示信息
  showPresetBookNotice();
}

// 显示预设书籍提示
function showPresetBookNotice() {
  const notice = document.createElement('div');
  notice.className = 'preset-notice';
  notice.innerHTML = `
    <p>📖 这是公共图书馆的书籍</p>
    <p>如需解谜和收集卡牌，请先导入到您的书架</p>
    <button onclick="importBook()">导入到我的书架</button>
  `;
  document.body.appendChild(notice);
}
```

### 6.4 预设书籍初始化方案

#### 6.4.1 手动执行Seed

```bash
# 本地开发环境
wrangler d1 execute storybook-db --local --file=migrations/0001_init.sql
wrangler d1 execute storybook-db --local --file=migrations/0002_seed_data.sql

# 生产环境
wrangler d1 execute storybook-db --remote --file=migrations/0001_init.sql
wrangler d1 execute storybook-db --remote --file=migrations/0002_seed_data.sql
```

#### 6.4.2 Seed文件更新清单

| 文件 | 更新内容 |
|------|----------|
| `migrations/0002_seed_data.sql` | 补充预设书籍的卡牌数据 |

---

## 七、E2E测试方案

### 7.1 测试文件结构

```
test/e2e/
├── helpers/
│   └── db-helper.js          # 数据库辅助类（已有）
├── card-drop.spec.js         # 卡牌掉落测试（新增）
├── library.spec.js           # 公共图书馆测试（新增）
└── book-import.spec.js       # 书籍导入测试（新增）
```

### 7.2 卡牌掉落测试 (card-drop.spec.js)

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('卡牌掉落功能', () => {
  let db;
  let testBookId;
  let testUserId;
  let testChapterId;
  let testPuzzleId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) db.close();
  });

  async function setupBookWithChapter(request) {
    // 创建书籍
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '卡牌测试书籍',
        type: 'adventure',
        protagonist: { name: '主角', avatar: '🧙‍♂️', role_type: 'protagonist', is_protagonist: 1 },
        supporting_characters: []
      }
    });
    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    // 获取卡牌和角色
    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    // 创建章节
    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonistId,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });
    const chapterData = await chapterResponse.json();
    testChapterId = chapterData.data.chapter.chapter_id;
    testPuzzleId = chapterData.data.puzzle.puzzle_id;

    return { testBookId, testChapterId, testPuzzleId };
  }

  test('解谜成功后应获得卡牌', async ({ page, request }) => {
    await setupBookWithChapter(request);

    // 获取谜题答案
    const puzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [testPuzzleId]);
    const answer = puzzle.answer;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    // 等待页面加载
    await expect(page.locator('.chapter-content')).toBeVisible();

    // 提交正确答案
    await page.fill('#puzzleInput', answer);
    await page.click('#submitAnswer');

    // 验证卡牌掉落弹窗出现
    await expect(page.locator('.card-reward-modal')).toBeVisible({ timeout: 5000 });

    // 验证数据库中新增了卡牌
    const cardsBefore = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);
    const initialCount = cardsBefore.length;

    // 点击收下
    await page.click('.btn-receive');

    // 等待弹窗关闭
    await expect(page.locator('.card-reward-modal')).not.toBeVisible();

    // 验证数据库
    const cardsAfter = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);
    expect(cardsAfter.length).toBe(initialCount + 1);
  });

  test('卡牌上限已满时应显示丢弃选择', async ({ page, request }) => {
    await setupBookWithChapter(request);

    // 先添加8张同类型卡牌
    for (let i = 0; i < 8; i++) {
      await request.post('/api/plot-cards', {
        data: {
          book_id: testBookId,
          card: {
            sub_type: 'weather',
            name: `测试天气卡${i}`,
            icon: '☀️',
            description: '测试卡牌'
          }
        }
      });
    }

    // 获取谜题答案
    const puzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [testPuzzleId]);
    const answer = puzzle.answer;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    // 提交正确答案
    await page.fill('#puzzleInput', answer);
    await page.click('#submitAnswer');

    // 验证第一步弹窗
    await expect(page.locator('.card-reward-modal')).toBeVisible();
    await page.click('.btn-continue');

    // 验证第二步丢弃选择弹窗
    await expect(page.locator('.card-discard-modal')).toBeVisible();
    await expect(page.locator('.card-discard-modal .card-item')).toHaveCount(9);
  });

  test('丢弃卡牌后应正确添加新卡牌', async ({ page, request }) => {
    // ... 类似上面的测试
  });

  test('解谜失败不应获得卡牌', async ({ page, request }) => {
    await setupBookWithChapter(request);

    const cardsBefore = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${testChapterId}`);

    // 提交错误答案
    await page.fill('#puzzleInput', '错误答案');
    await page.click('#submitAnswer');

    // 等待错误提示
    await expect(page.locator('.notification.error')).toBeVisible();

    // 验证卡牌数量不变
    const cardsAfter = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [testBookId]);
    expect(cardsAfter.length).toBe(cardsBefore.length);
  });
});
```

### 7.3 公共图书馆测试 (library.spec.js)

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('公共图书馆功能', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
    
    // 执行seed数据初始化预设书籍
    db.execSqlFile('./migrations/0002_seed_data.sql');
  });

  test.afterAll(async () => {
    if (db) db.close();
  });

  test('公共图书馆页面应显示预设书籍', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/library.html');

    // 验证页面标题
    await expect(page.locator('.page-title')).toContainText('Library');

    // 验证预设书籍显示
    const bookCards = page.locator('.book-card');
    const count = await bookCards.count();
    expect(count).toBeGreaterThan(0);

    // 验证数据库中的预设书籍数量
    const presetBooks = db.queryAll('SELECT * FROM books WHERE is_preset = 1');
    expect(presetBooks.length).toBeGreaterThan(0);
  });

  test('类型筛选应正常工作', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/library.html');

    // 点击冒险类型筛选
    await page.click('.filter-tab[data-filter="adventure"]');

    // 验证显示的书籍都是冒险类型
    const visibleBooks = await page.locator('.book-card:visible').all();
    for (const book of visibleBooks) {
      const type = await book.getAttribute('data-type');
      expect(type).toBe('adventure');
    }
  });

  test('点击书籍应显示详情弹窗', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/library.html');

    // 点击第一本书
    await page.click('.book-card:first-child');

    // 验证详情弹窗出现
    await expect(page.locator('.book-detail-modal')).toBeVisible();

    // 验证弹窗内容
    await expect(page.locator('.book-detail-modal .book-title')).toBeVisible();
    await expect(page.locator('.book-detail-modal .btn-import')).toBeVisible();
  });

  test('预设书籍章节页面应隐藏解谜功能', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    // 获取预设书籍的章节ID
    const presetChapter = db.query(
      'SELECT chapter_id FROM chapters WHERE book_id LIKE "preset-%" LIMIT 1'
    );

    if (presetChapter) {
      await page.goto(`/chapter.html?id=${presetChapter.chapter_id}`);

      // 验证预设书籍提示出现
      await expect(page.locator('.preset-notice')).toBeVisible();

      // 验证解谜功能隐藏
      await expect(page.locator('.puzzle-section')).not.toBeVisible();
    }
  });
});
```

### 7.4 书籍导入测试 (book-import.spec.js)

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('书籍导入功能', () => {
  let db;
  let testUserId;
  let presetBookId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
    
    // 执行seed数据初始化预设书籍
    db.execSqlFile('./migrations/0002_seed_data.sql');
    
    // 获取一个预设书籍ID
    const presetBook = db.query('SELECT book_id FROM books WHERE is_preset = 1 LIMIT 1');
    presetBookId = presetBook.book_id;
  });

  test.afterAll(async () => {
    if (db) db.close();
  });

  test('导入预设书籍应复制所有数据', async ({ page, request }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/library.html');

    // 点击导入按钮
    await page.click('.book-card:first-child');
    await page.click('.btn-import');

    // 等待导入成功提示
    await expect(page.locator('.import-success')).toBeVisible({ timeout: 10000 });

    // 获取新书籍ID
    const newBookId = await page.locator('.import-success').getAttribute('data-book-id');

    // 验证数据库 - 书籍
    const newBook = db.query('SELECT * FROM books WHERE book_id = ?', [newBookId]);
    expect(newBook).toBeDefined();
    expect(newBook.user_id).toBe(testUserId);
    expect(newBook.is_preset).toBe(0);

    // 验证数据库 - 角色
    const originalChars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [presetBookId]);
    const newChars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [newBookId]);
    expect(newChars.length).toBe(originalChars.length);

    // 验证数据库 - 卡牌
    const originalCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [presetBookId]);
    const newCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [newBookId]);
    expect(newCards.length).toBe(originalCards.length);

    // 验证数据库 - 章节
    const originalChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [presetBookId]);
    const newChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [newBookId]);
    expect(newChapters.length).toBe(originalChapters.length);

    // 验证数据库 - 谜题状态重置
    const newPuzzles = db.queryAll(
      'SELECT * FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)',
      [newBookId]
    );
    for (const puzzle of newPuzzles) {
      expect(puzzle.is_solved).toBe(0);
      expect(puzzle.attempts).toBe(0);
    }
  });

  test('导入后书籍应出现在用户书架', async ({ page, request }) => {
    // 先导入一本书
    const importResponse = await request.post(`/api/books/preset/${presetBookId}/import`, {
      data: { user_id: testUserId }
    });
    const importData = await importResponse.json();
    const newBookId = importData.data.new_book_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/bookshelf.html');

    // 验证新书籍出现在书架
    const bookCard = page.locator(`.book-card[data-id="${newBookId}"]`);
    await expect(bookCard).toBeVisible();
  });

  test('导入后可以正常解谜', async ({ page, request }) => {
    // 导入书籍
    const importResponse = await request.post(`/api/books/preset/${presetBookId}/import`, {
      data: { user_id: testUserId }
    });
    const importData = await importResponse.json();
    const newBookId = importData.data.new_book_id;

    // 获取新书籍的章节和谜题
    const newChapter = db.query(
      'SELECT chapter_id FROM chapters WHERE book_id = ? LIMIT 1',
      [newBookId]
    );
    const newPuzzle = db.query(
      'SELECT * FROM puzzles WHERE chapter_id = ?',
      [newChapter.chapter_id]
    );

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/chapter.html?id=${newChapter.chapter_id}`);

    // 验证解谜功能可用
    await expect(page.locator('.puzzle-section')).toBeVisible();

    // 提交答案
    await page.fill('#puzzleInput', newPuzzle.answer);
    await page.click('#submitAnswer');

    // 验证成功
    await expect(page.locator('.notification.success')).toBeVisible();

    // 验证数据库谜题状态更新
    const updatedPuzzle = db.query('SELECT * FROM puzzles WHERE puzzle_id = ?', [newPuzzle.puzzle_id]);
    expect(updatedPuzzle.is_solved).toBe(1);
  });

  test('重复导入同一本书应创建独立副本', async ({ request }) => {
    // 第一次导入
    const import1 = await request.post(`/api/books/preset/${presetBookId}/import`, {
      data: { user_id: testUserId }
    });
    const data1 = await import1.json();

    // 第二次导入
    const import2 = await request.post(`/api/books/preset/${presetBookId}/import`, {
      data: { user_id: testUserId }
    });
    const data2 = await import2.json();

    // 验证两个不同的book_id
    expect(data1.data.new_book_id).not.toBe(data2.data.new_book_id);

    // 验证数据库中有两本独立的书籍
    const books = db.queryAll(
      'SELECT * FROM books WHERE user_id = ? AND title = (SELECT title FROM books WHERE book_id = ?)',
      [testUserId, presetBookId]
    );
    expect(books.length).toBe(2);
  });

  test('导入API应返回正确的数据', async ({ request }) => {
    const response = await request.post(`/api/books/preset/${presetBookId}/import`, {
      data: { user_id: testUserId }
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.new_book_id).toBeDefined();
    expect(data.data.message).toContain('成功');
  });
});
```

### 7.5 数据库验证要点

| 测试场景 | 数据库验证 |
|----------|------------|
| 卡牌掉落 | `plot_cards` 表新增记录 |
| 卡牌丢弃 | `plot_cards` 表删除记录 |
| 书籍导入 | `books` 表新增记录，`is_preset=0` |
| 角色复制 | `characters` 表新增记录，`book_id` 更新 |
| 卡牌复制 | `plot_cards` 表新增记录，`book_id` 更新 |
| 章节复制 | `chapters` 表新增记录，`selected_cards` ID更新 |
| 谜题复制 | `puzzles` 表新增记录，`is_solved=0` |

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-13 | 初始版本，包含卡牌掉落UI和公共图书馆设计 |
| V1.1 | 2026-03-13 | 新增技术实现细节和E2E测试方案 |
