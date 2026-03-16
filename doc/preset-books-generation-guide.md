# 预设书籍SQL和静态页面生成指南

## 概述

本文档说明如何为预设书籍生成SQL数据文件和静态HTML页面。

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

## 三、完整流程

### 添加新预设书籍的步骤

1. **创建SQL文件**
   - 在 `migrations/` 目录创建新的SQL文件
   - 按照命名规范创建书籍ID
   - 填充书籍、角色、章节、情节卡牌、谜题数据

2. **导入数据库**
   ```bash
   wrangler d1 execute storybook_database --local --file=migrations/your_file.sql
   ```

3. **更新生成脚本**
   - 在 `generate-preset-pages.js` 的 `sqlPaths` 数组中添加新SQL文件路径

4. **生成静态页面**
   ```bash
   node scripts/generate-preset-pages.js
   ```

5. **验证结果**
   - 访问 `http://127.0.0.1:8788/books/preset-{type}-{number}.html`
   - 检查章节、角色、情节卡牌是否正确显示

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

### Q: 情节卡牌不显示？

检查：
1. SQL文件是否在 `sqlPaths` 数组中
2. `sub_type` 是否为标准类型
3. `book_id` 是否与书籍ID匹配

### Q: 章节内容显示不完整？

检查：
1. SQL文件中单引号是否正确转义
2. 章节内容是否超过字段长度限制

### Q: 静态页面没有更新？

1. 确认SQL文件已导入数据库
2. 重新运行生成脚本
3. 清除浏览器缓存
