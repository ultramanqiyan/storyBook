# 预设书籍SQL和静态页面生成指南

## 概述

本文档说明如何为预设书籍生成SQL数据文件和静态HTML页面，并部署到线上。

## 目录结构

```
storyBook/
├── migrations/                    # SQL迁移文件
│   ├── 0002_seed_data.sql         # 原始预设书籍数据
│   ├── 0011_new_preset_books.sql  # 新预设书籍数据
│   └── 0013_supplement_new_books_plot_cards.sql  # 补充情节卡牌
├── scripts/
│   └── generate-preset-pages.js   # 静态页面生成脚本
└── src/frontend/
    ├── books/                     # 书籍静态页面
    └── chapters/                  # 章节静态页面
```

## 一、SQL文件生成

### 1.1 数据表结构

预设书籍需要填充以下数据表：

| 表名 | 说明 | 必填字段 |
|------|------|----------|
| `books` | 书籍信息 | book_id, title, type, is_preset, language |
| `characters` | 角色卡牌 | char_id, book_id, name, role_type, personality |
| `chapters` | 章节内容 | chapter_id, book_id, title, content, selected_cards |
| `plot_cards` | 情节卡牌 | card_id, book_id, type, sub_type, name, icon |
| `puzzles` | 谜题 | puzzle_id, chapter_id, question, answer |

### 1.2 书籍ID命名规范

```
preset-{type}-{number}[-en]
```

- `type`: 书籍类型 (adventure/fantasy/romance/business)
- `number`: 书籍编号 (001, 002, 003...)
- `-en`: 英文版后缀（可选）

示例：
- `preset-adventure-003` - 儿童冒险类第3本书（中文版）
- `preset-adventure-003-en` - 儿童冒险类第3本书（英文版）

### 1.3 情节卡牌规范

每本书应有 **16张情节卡牌**（每种类型4张）：

| sub_type | 中文名 | 说明 |
|----------|--------|------|
| `weather` | 天气 | 天气相关的卡牌 |
| `terrain` | 地形 | 地点/场景相关的卡牌 |
| `adventure` | 冒险 | 动作/事件相关的卡牌 |
| `equipment` | 装备 | 道具/物品相关的卡牌 |

### 1.4 SQL文件示例

```sql
-- 书籍
INSERT INTO books (book_id, user_id, title, type, is_preset, language) VALUES
('preset-adventure-003', 'system', '丛林奇遇记', 'adventure', 1, 'zh');

-- 角色（每本书3个）
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv003-001', 'preset-adventure-003', '小森', '丛林探险家', '勇敢善良', '温和亲切', '👦', NULL, NULL, 1);

-- 章节（每本书10章，每章300字以上）
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chapter-adv003-01', 'preset-adventure-003', '神秘的老地图', '内容...', '{"weather":{...},"terrain":{...}}', 1);

-- 情节卡牌（每本书16张）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-adv003-w01', 'preset-adventure-003', 'plot', 'weather', '晴天', '☀️', '阳光明媚');

-- 谜题（每本书3个）
INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type) VALUES
('puzzle-adv003-01', 'chapter-adv003-03', '问题？', '答案', 'riddle');
```

### 1.5 导入SQL到数据库

```bash
# 本地数据库
wrangler d1 execute storybook_database --local --file=migrations/your_file.sql

# 远程数据库
wrangler d1 execute storybook_database --remote --file=migrations/your_file.sql
```

## 二、静态页面生成

### 2.1 生成脚本

使用 `scripts/generate-preset-pages.js` 脚本生成静态页面。

### 2.2 配置SQL文件路径

脚本会自动读取以下SQL文件：

```javascript
const sqlPaths = [
  'migrations/0002_seed_data.sql',
  'migrations/0010_fix_plot_cards_fields.sql',
  'migrations/0011_new_preset_books.sql',
  'migrations/0012_fix_seed_plot_cards_part1.sql',
  'migrations/0012_fix_seed_plot_cards_part2.sql',
  'migrations/0012_fix_seed_plot_cards_part3.sql',
  'migrations/0013_supplement_new_books_plot_cards.sql'
];
```

如需添加新的SQL文件，修改 `sqlPaths` 数组即可。

### 2.3 运行生成脚本

```bash
node scripts/generate-preset-pages.js
```

### 2.4 输出结果

脚本会生成：
- **书籍页面**: `src/frontend/books/preset-{type}-{number}.html`
- **章节页面**: `src/frontend/chapters/chapter-{type}-{number}.html`

### 2.5 页面功能

书籍页面包含三个视图：
1. **章节目录** - 显示所有章节标题
2. **角色卡牌** - 显示所有角色
3. **情节卡牌** - 按类型分组显示情节卡牌

## 三、完整流程：新增预设书籍并上线

### 步骤1：创建SQL迁移文件

在 `migrations/` 目录下创建新的SQL文件，命名格式：`00XX_new_preset_books_描述.sql`

**SQL文件需要包含以下数据表**：

| 表名 | 必填内容 | 说明 |
|------|----------|------|
| `books` | 书籍基本信息 | book_id, title, type, is_preset=1, language |
| `characters` | 角色数据 | 每本书3个角色，包含主角 |
| `chapters` | 章节数据 | 每本书10个章节，每章>300字 |
| `plot_cards` | 情节卡牌 | 每本书16张（4种类型×4张） |
| `puzzles` | 谜题数据 | 可选，每本书3个谜题 |

**SQL模板示例**：

```sql
-- 1. 书籍数据
INSERT OR IGNORE INTO books (book_id, user_id, title, type, is_preset, language) VALUES
('preset-adventure-005', 'system', '新书标题', 'adventure', 1, 'zh'),
('preset-adventure-005-en', 'system', 'New Book Title', 'adventure', 1, 'en');

-- 2. 角色数据
INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES
('char-adv005-001', 'preset-adventure-005', '主角名', '角色类型', '性格描述', '说话风格', '👦', NULL, NULL, 1);

-- 3. 章节数据
INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES
('chap-adv005-01', 'preset-adventure-005', '第一章标题', '章节内容...', '卡牌ID列表', 1);

-- 4. 情节卡牌（每种类型4张）
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description) VALUES
('card-adv005-w01', 'preset-adventure-005', 'plot', 'weather', '晴天', '☀️', '描述'),
('card-adv005-t01', 'preset-adventure-005', 'plot', 'terrain', '森林', '🌲', '描述'),
('card-adv005-a01', 'preset-adventure-005', 'plot', 'adventure', '探险', '🧭', '描述'),
('card-adv005-e01', 'preset-adventure-005', 'plot', 'equipment', '地图', '🗺️', '描述');
```

**注意事项**：
- `book_id` 格式：`preset-{类型缩写}-{序号}`，如 `preset-adventure-005`
- `is_preset` 必须为 `1`
- `language` 为 `zh` 或 `en`
- 情节卡牌命名：`card-{类型缩写}{序号}-{类型缩写}{卡牌序号}`
- SQLite单引号转义使用 `''` 而非 `\'`

### 步骤2：本地测试

```bash
# 1. 执行本地数据库迁移
wrangler d1 execute storybook_database --local --file=./migrations/00XX_new_preset_books.sql

# 2. 验证数据
wrangler d1 execute storybook_database --local --command "SELECT * FROM books WHERE book_id LIKE 'preset-%'"
```

### 步骤3：生成静态页面

```bash
# 运行生成脚本
node scripts/generate-preset-pages.js
```

**如需修改生成脚本读取的SQL文件**，编辑 `scripts/generate-preset-pages.js`：

```javascript
const sqlFiles = [
  path.join(__dirname, '../migrations/0002_seed_data.sql'),
  path.join(__dirname, '../migrations/0011_new_preset_books.sql'),
  // 添加新的SQL文件
  path.join(__dirname, '../migrations/00XX_new_preset_books.sql'),
];
```

### 步骤4：线上部署

```bash
# 1. 执行线上数据库迁移
wrangler d1 execute storybook_database --remote --file=./migrations/00XX_new_preset_books.sql

# 2. 部署前端（包含静态页面）
wrangler pages deploy src/frontend --project-name=storybook --commit-dirty=true
```

### 步骤5：验证

```bash
# 检查线上数据
wrangler d1 execute storybook_database --remote --command "SELECT book_id, title FROM books WHERE is_preset = 1"

# 访问验证
# 公共图书馆: https://storybook.pages.dev/library.html
# 书籍详情: https://storybook.pages.dev/books/preset-adventure-005.html
```

### 步骤6：完整命令汇总

```bash
# === 本地开发 ===
wrangler d1 execute storybook_database --local --file=./migrations/00XX_new_preset_books.sql
node scripts/generate-preset-pages.js

# === 线上部署 ===
wrangler d1 execute storybook_database --remote --file=./migrations/00XX_new_preset_books.sql
wrangler pages deploy src/frontend --project-name=storybook --commit-dirty=true
```

## 四、注意事项

### 4.1 SQL语法

- SQLite使用双单引号 `''` 转义单引号，不是反斜杠 `\'`
- 示例：`'It''s a beautiful day'`

### 4.2 情节卡牌类型

- 必须使用标准类型：`weather`, `terrain`, `adventure`, `equipment`
- 不要使用其他值，否则不会显示在页面上

### 4.3 章节selected_cards格式

```json
{
  "weather": {"name": "晴天", "icon": "☀️", "description": "..."},
  "terrain": {"name": "丛林", "icon": "🌲", "description": "..."},
  "adventure": {"name": "探险", "icon": "🧭", "description": "..."},
  "equipment": {"name": "地图", "icon": "🗺️", "description": "..."}
}
```

## 五、常见问题

### Q: 公共图书馆看不到书籍？

**原因**：线上数据库没有书籍数据

**解决方案**：
```bash
wrangler d1 execute storybook_database --remote --file=./migrations/00XX_new_preset_books.sql
```

### Q: 情节卡牌不显示？

检查：
1. SQL文件是否在 `sqlPaths` 数组中
2. `sub_type` 是否为标准类型
3. `book_id` 是否与书籍ID匹配

### Q: 情节卡牌重复？

**原因**：多个SQL文件有相同内容

**解决方案**：使用内容去重或合并SQL

### Q: 章节内容显示不完整？

检查：
1. SQL文件中单引号是否正确转义
2. 章节内容是否超过字段长度限制

### Q: 静态页面没有更新？

1. 确认SQL文件已导入数据库
2. 重新运行生成脚本
3. 清除浏览器缓存

### Q: SQL执行报错？

**原因**：单引号转义问题

**解决方案**：使用 `''` 替代 `\'`

## 六、部署架构说明

### 6.1 技术架构

| 组件 | 技术 | 说明 |
|------|------|------|
| 前端托管 | Cloudflare Pages | 静态HTML页面 |
| 数据库 | Cloudflare D1 | SQLite数据库 |
| API | Cloudflare Workers | Functions API |

### 6.2 数据流向

```
SQL文件 → 本地数据库测试 → 生成静态页面 → 线上数据库 → 前端部署
```

### 6.3 关键文件

| 文件 | 用途 |
|------|------|
| `wrangler.toml` | Cloudflare配置 |
| `migrations/*.sql` | 数据库迁移文件 |
| `scripts/generate-preset-pages.js` | 静态页面生成脚本 |
| `src/frontend/books/*.html` | 书籍静态页面 |
| `src/frontend/chapters/*.html` | 章节静态页面 |
