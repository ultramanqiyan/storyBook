# 卡牌互动小说书籍网站 - 数据库设计详细文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 项目名称 | 卡牌互动小说书籍网站 |
| 版本 | V1.0 |
| 创建日期 | 2026-03-11 |
| 文档类型 | 数据库设计文档 |

---

## 一、数据库概述

### 1.1 数据库类型

Cloudflare D1 (SQLite)

### 1.2 数据表清单

| 表名 | 说明 | 关联 |
|------|------|------|
| users | 用户表 | - |
| books | 书籍表 | users.user_id |
| characters | 角色卡牌表 | books.book_id |
| plot_cards | 情节卡牌表 | books.book_id |
| chapters | 章节表 | books.book_id |
| puzzles | 谜题表 | chapters.chapter_id |

### 1.3 ER图

```
┌─────────────┐       ┌─────────────┐
│   users     │       │    books    │
├─────────────┤       ├─────────────┤
│ user_id(PK) │◄──────│ user_id(FK) │
│ email       │       │ book_id(PK) │
│ password    │       │ title       │
│ created_at  │       │ type        │
│ updated_at  │       │ is_preset   │
└─────────────┘       │ created_at  │
                      │ updated_at  │
                      └──────┬──────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────┐       ┌─────────────┐     ┌─────────────┐
│ characters  │       │ plot_cards  │     │  chapters   │
├─────────────┤       ├─────────────┤     ├─────────────┤
│ char_id(PK) │       │ card_id(PK) │     │ chapter_id  │
│ book_id(FK) │       │ book_id(FK) │     │ book_id(FK) │
│ name        │       │ type        │     │ title       │
│ role_type   │       │ sub_type    │     │ content     │
│ personality │       │ name        │     │ order_num   │
│ speech_style│       │ icon        │     │ created_at  │
│ avatar      │       │ description │     └──────┬──────┘
│ intimacy    │       │ is_custom   │            │
│ is_protagonist│     │ created_at  │            │
│ created_at  │       └─────────────┘            ▼
└─────────────┘                             ┌─────────────┐
                                            │  puzzles    │
                                            ├─────────────┤
                                            │ puzzle_id   │
                                            │ chapter_id  │
                                            │ question    │
                                            │ answer      │
                                            │ attempts    │
                                            │ is_solved   │
                                            │ created_at  │
                                            └─────────────┘
```

---

## 二、数据表详细设计

### 2.1 users 表（用户表）

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| user_id | TEXT | PRIMARY KEY | - | 用户唯一标识，UUID格式 |
| email | TEXT | NOT NULL UNIQUE | - | 用户邮箱，用于登录 |
| password | TEXT | NOT NULL | - | bcrypt加密后的密码哈希 |
| created_at | TEXT | NOT NULL | datetime('now') | 创建时间 |
| updated_at | TEXT | NOT NULL | datetime('now') | 更新时间 |

**索引设计：**

```sql
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

**数据隔离规则：**
- 用户数据通过 user_id 进行隔离
- 所有查询必须包含 user_id 条件

---

### 2.2 books 表（书籍表）

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| book_id | TEXT | PRIMARY KEY | - | 书籍唯一标识，UUID格式 |
| user_id | TEXT | NOT NULL | - | 所属用户ID |
| title | TEXT | NOT NULL | - | 书籍名称，最大50字符 |
| type | TEXT | NOT NULL | - | 书籍类型：adventure/fantasy/romance/business |
| is_preset | INTEGER | NOT NULL | 0 | 是否为系统预设书籍：0-否，1-是 |
| created_at | TEXT | NOT NULL | datetime('now') | 创建时间 |
| updated_at | TEXT | NOT NULL | datetime('now') | 更新时间 |

**索引设计：**

```sql
CREATE INDEX idx_books_user_id ON books(user_id);
CREATE INDEX idx_books_type ON books(type);
CREATE INDEX idx_books_is_preset ON books(is_preset);
```

**书籍类型枚举：**

| 类型值 | 类型名称 |
|--------|----------|
| adventure | 儿童冒险 |
| fantasy | 魔幻传说 |
| romance | 都市言情 |
| business | 职场风云 |

**数据隔离规则：**
- 用户只能查看自己创建的书籍（user_id匹配）
- 系统预设书籍（is_preset=1）所有用户可见

---

### 2.3 characters 表（角色卡牌表）

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| char_id | TEXT | PRIMARY KEY | - | 角色唯一标识，UUID格式 |
| book_id | TEXT | NOT NULL | - | 所属书籍ID |
| name | TEXT | NOT NULL | - | 角色名称，最大20字符 |
| role_type | TEXT | NOT NULL | - | 角色类型（预设或自定义） |
| personality | TEXT | NOT NULL | - | 性格（预设或自定义） |
| speech_style | TEXT | NOT NULL | - | 说话方式（预设或自定义） |
| avatar | TEXT | NOT NULL | - | 头像标识（预设ID或emoji） |
| intimacy | INTEGER | - | 0 | 与主角亲密度：-100到+100 |
| relationship | TEXT | - | - | 与主角关系（可选） |
| is_protagonist | INTEGER | NOT NULL | 0 | 是否为主角：0-否，1-是 |
| created_at | TEXT | NOT NULL | datetime('now') | 创建时间 |
| updated_at | TEXT | NOT NULL | datetime('now') | 更新时间 |

**索引设计：**

```sql
CREATE INDEX idx_characters_book_id ON characters(book_id);
CREATE INDEX idx_characters_is_protagonist ON characters(is_protagonist);
```

**字段说明：**

| 字段 | 说明 |
|------|------|
| role_type | 角色类型，如：小探险家、法师、白领等 |
| personality | 性格，如：勇敢、谨慎、乐观等 |
| speech_style | 说话方式，如：简洁直接、幽默风趣等 |
| avatar | 头像标识，使用预设ID或emoji字符 |
| intimacy | 亲密度，主角为null，配角为-100到+100 |
| relationship | 与主角关系，如：朋友、导师、竞争对手等 |

**亲密度档位：**

| 档位 | 数值范围 | 显示文本 |
|------|----------|----------|
| 敌对 | -100 ~ -30 | 敌对 |
| 中立 | -29 ~ +29 | 中立 |
| 友好 | +30 ~ +100 | 友好 |

---

### 2.4 plot_cards 表（情节卡牌表）

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| card_id | TEXT | PRIMARY KEY | - | 卡牌唯一标识，UUID格式 |
| book_id | TEXT | NOT NULL | - | 所属书籍ID |
| type | TEXT | NOT NULL | - | 卡牌大类：plot（情节） |
| sub_type | TEXT | NOT NULL | - | 情节子类型：weather/terrain/adventure/equipment |
| name | TEXT | NOT NULL | - | 卡牌名称 |
| icon | TEXT | NOT NULL | - | 卡牌图标标识 |
| description | TEXT | - | - | 卡牌描述 |
| is_custom | INTEGER | NOT NULL | 0 | 是否为自定义卡牌：0-否，1-是 |
| created_at | TEXT | NOT NULL | datetime('now') | 创建时间 |

**索引设计：**

```sql
CREATE INDEX idx_plot_cards_book_id ON plot_cards(book_id);
CREATE INDEX idx_plot_cards_sub_type ON plot_cards(sub_type);
```

**情节子类型枚举：**

| 子类型值 | 子类型名称 | 上限 |
|----------|------------|------|
| weather | 天气 | 8张 |
| terrain | 地形 | 8张 |
| adventure | 冒险类型 | 8张 |
| equipment | 装备 | 8张 |

---

### 2.5 chapters 表（章节表）

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| chapter_id | TEXT | PRIMARY KEY | - | 章节唯一标识，UUID格式 |
| book_id | TEXT | NOT NULL | - | 所属书籍ID |
| title | TEXT | NOT NULL | - | 章节标题，纯标题不含序号 |
| content | TEXT | NOT NULL | - | 章节内容，约300字 |
| selected_cards | TEXT | - | - | 生成时选择的卡牌JSON |
| order_num | INTEGER | NOT NULL | - | 章节顺序号 |
| created_at | TEXT | NOT NULL | datetime('now') | 创建时间 |

**索引设计：**

```sql
CREATE INDEX idx_chapters_book_id ON chapters(book_id);
CREATE INDEX idx_chapters_order ON chapters(book_id, order_num);
```

**selected_cards 字段格式：**

```json
{
  "protagonist_id": "char-uuid-001",
  "supporting_ids": ["char-uuid-002", "char-uuid-003"],
  "weather_id": "card-uuid-001",
  "terrain_id": "card-uuid-002",
  "adventure_id": "card-uuid-003",
  "equipment_id": "card-uuid-004"
}
```

---

### 2.6 puzzles 表（谜题表）

| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| puzzle_id | TEXT | PRIMARY KEY | - | 谜题唯一标识，UUID格式 |
| chapter_id | TEXT | NOT NULL | - | 所属章节ID |
| question | TEXT | NOT NULL | - | 谜题问题 |
| answer | TEXT | NOT NULL | - | 谜题答案 |
| puzzle_type | TEXT | NOT NULL | - | 谜题类型：text/logic/choice |
| options | TEXT | - | - | 选择题选项JSON（可选） |
| attempts | INTEGER | NOT NULL | 0 | 已尝试次数 |
| max_attempts | INTEGER | NOT NULL | 3 | 最大尝试次数 |
| is_solved | INTEGER | NOT NULL | 0 | 是否已解决：0-否，1-是 |
| created_at | TEXT | NOT NULL | datetime('now') | 创建时间 |

**索引设计：**

```sql
CREATE INDEX idx_puzzles_chapter_id ON puzzles(chapter_id);
```

**谜题类型枚举：**

| 类型值 | 类型名称 | 说明 |
|--------|----------|------|
| text | 文字谜题 | 猜成语、字谜等 |
| logic | 逻辑谜题 | 数字规律、推理等 |
| choice | 选择题 | 多选一 |

**options 字段格式（选择题）：**

```json
["选项A", "选项B", "选项C", "选项D"]
```

---

## 三、数据库迁移脚本

### 3.1 初始化迁移 (0001_init.sql)

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

### 3.2 预设数据迁移 (0002_seed_data.sql)

```sql
-- 插入预设书籍
INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES
('preset-adventure-001', 'system', '小明的奇幻冒险', 'adventure', 1),
('preset-fantasy-001', 'system', '魔法学院传说', 'fantasy', 1),
('preset-romance-001', 'system', '都市恋曲', 'romance', 1),
('preset-business-001', 'system', '职场风云录', 'business', 1);

-- 插入预设角色（示例：儿童冒险书籍）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, is_protagonist) VALUES
('char-preset-001', 'preset-adventure-001', '小明', '小探险家', '勇敢', '简洁直接', '👦', NULL, 1),
('char-preset-002', 'preset-adventure-001', '小红', '小智者', '聪明', '幽默风趣', '👧', 50, 0);

-- 插入预设情节卡牌（示例）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-001', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '阳光明媚的好天气', 0),
('card-preset-002', 'preset-adventure-001', 'plot', 'terrain', '森林', '🌲', '神秘的森林', 0),
('card-preset-003', 'preset-adventure-001', 'plot', 'adventure', '寻宝', '🗺️', '寻找隐藏的宝藏', 0),
('card-preset-004', 'preset-adventure-001', 'plot', 'equipment', '放大镜', '🔍', '观察细节的工具', 0);

-- 插入预设章节（示例）
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-001', 'preset-adventure-001', '神秘的开端', '在一个阳光明媚的早晨，小明收到了一封神秘的信件。信上画着一张古老的地图，指向森林深处的一个秘密地点。小明决定踏上探险之旅...', 1);

-- 插入预设谜题（示例）
INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type) VALUES
('puzzle-preset-001', 'chapter-preset-001', '什么东西越洗越脏？', '水', 'text');
```

---

## 四、数据隔离规则

### 4.1 核心原则

**所有用户相关查询必须包含 user_id 过滤条件**

### 4.2 查询示例

```javascript
// 正确做法 - 包含user_id过滤
const books = await env.DB.prepare(
  'SELECT * FROM books WHERE user_id = ? OR is_preset = 1'
).bind(userId).all();

// 错误做法 - 缺少user_id过滤
const books = await env.DB.prepare(
  'SELECT * FROM books'
).all();
```

### 4.3 隔离规则表

| 表名 | 隔离字段 | 说明 |
|------|----------|------|
| users | user_id | 用户只能访问自己的数据 |
| books | user_id | 用户只能访问自己的书籍和预设书籍 |
| characters | book_id → books.user_id | 通过书籍间接隔离 |
| plot_cards | book_id → books.user_id | 通过书籍间接隔离 |
| chapters | book_id → books.user_id | 通过书籍间接隔离 |
| puzzles | chapter_id → chapters.book_id → books.user_id | 通过章节间接隔离 |

---

## 五、数据完整性约束

### 5.1 外键约束

SQLite默认不启用外键约束，需要在应用层保证数据完整性。

### 5.2 应用层约束

| 场景 | 约束规则 |
|------|----------|
| 创建书籍 | 必须关联有效的user_id |
| 创建角色 | 必须关联有效的book_id |
| 创建章节 | 必须关联有效的book_id |
| 创建谜题 | 必须关联有效的chapter_id |
| 删除书籍 | 级联删除关联的角色、卡牌、章节、谜题 |

### 5.3 级联删除逻辑

```javascript
async function deleteBook(env, bookId, userId) {
  // 1. 验证书籍所有权
  const book = await env.DB.prepare(
    'SELECT * FROM books WHERE book_id = ? AND user_id = ?'
  ).bind(bookId, userId).first();
  
  if (!book) {
    throw new Error('书籍不存在或无权限');
  }
  
  // 2. 删除关联的谜题（通过章节）
  await env.DB.prepare(`
    DELETE FROM puzzles 
    WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)
  `).bind(bookId).run();
  
  // 3. 删除关联的章节
  await env.DB.prepare(
    'DELETE FROM chapters WHERE book_id = ?'
  ).bind(bookId).run();
  
  // 4. 删除关联的角色卡牌
  await env.DB.prepare(
    'DELETE FROM characters WHERE book_id = ?'
  ).bind(bookId).run();
  
  // 5. 删除关联的情节卡牌
  await env.DB.prepare(
    'DELETE FROM plot_cards WHERE book_id = ?'
  ).bind(bookId).run();
  
  // 6. 删除书籍
  await env.DB.prepare(
    'DELETE FROM books WHERE book_id = ?'
  ).bind(bookId).run();
}
```

---

## 六、性能优化建议

### 6.1 索引使用

- 所有WHERE条件字段建立索引
- JOIN关联字段建立索引
- 排序字段建立索引

### 6.2 查询优化

- 使用 LIMIT 限制返回数量
- 避免 SELECT *，只查询需要的字段
- 使用分页查询

### 6.3 数据量预估

| 表名 | 预估数据量 | 说明 |
|------|------------|------|
| users | 10,000+ | 用户数量 |
| books | 50,000+ | 每用户平均5本书 |
| characters | 200,000+ | 每本书平均4个角色 |
| plot_cards | 400,000+ | 每本书平均8张情节卡 |
| chapters | 500,000+ | 每本书平均10章 |
| puzzles | 500,000+ | 每章1个谜题 |

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-11 | 初始版本 |
