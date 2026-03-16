# 玩法介绍页面设计方案

## 文档信息

| 项目 | 内容 |
|------|------|
| 项目名称 | 玩法介绍页面 |
| 版本 | V1.0 |
| 创建日期 | 2026-03-16 |
| 状态 | 已确认 |

---

## 一、项目概述

| 项目 | 内容 |
|------|------|
| **页面名称** | 玩法介绍页 |
| **文件路径** | `src/frontend/how-to-play.html` |
| **入口位置** | 首页导航栏添加链接 |
| **目标用户** | 新用户 + 已登录用户 |
| **国际化** | 支持中英文切换 |

---

## 二、页面布局

### 2.1 整体结构

```
┌─────────────────────────────────────────────────────────────┐
│  顶部导航栏（固定，与首页一致，含语言切换）                    │
├────────────┬────────────────────────────────────────────────┤
│            │                                                │
│  侧边导航   │              内容区                            │
│  (固定)     │           (可滚动)                             │
│            │                                                │
│  ○ 整体介绍 │   模块 A/B/C/D/E 内容                          │
│  ○ 创建书籍 │                                                │
│  ○ 卡牌系统 │                                                │
│  ○ 章节生成 │                                                │
│  ○ 解谜玩法 │                                                │
│            │                                                │
├────────────┴────────────────────────────────────────────────┤
│  底部：[开始创作] 按钮                                        │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 响应式设计

- **桌面端**：左侧导航固定，右侧内容滚动
- **移动端**：导航栏折叠为顶部横向滚动条

---

## 三、模块内容

### 3.1 模块A - 整体介绍

**标题区域**：
- 中文：欢迎来到 StoryBook
- 英文：Welcome to StoryBook

**副标题**：
- 中文：创造属于你的互动小说世界
- 英文：Create Your Own Interactive Stories

**口号**：
- 中文：每一次选择，都是一个新故事的开始
- 英文：Every choice begins a new story

**核心价值卡片**：

| 卡片 | 中文 | 英文 |
|------|------|------|
| 卡片1标题 | 互动创作 | Interactive Creation |
| 卡片1描述 | 你是故事的导演，选择角色和情节，编织独特的故事 | You are the director. Choose characters and plots to weave unique stories |
| 卡片2标题 | 卡牌收集 | Card Collection |
| 卡片2描述 | 每张卡牌都是故事的拼图，收集它们吧！ | Each card is a puzzle piece of your story. Collect them all! |
| 卡片3标题 | 趣味解谜 | Fun Puzzles |
| 卡片3描述 | 解开谜题获得神秘奖励，丰富你的收藏 | Solve puzzles to earn mysterious rewards and enrich your collection |

---

### 3.2 模块B - 创建书籍

**标题**：
- 中文：创建你的第一本书
- 英文：Create Your First Book

**步骤展示**：

| 步骤 | 中文 | 英文 |
|------|------|------|
| Step 1 | 选择书籍类型 | Choose Book Type |
| Step 1 描述 | 每种类型有独特的视觉风格和角色设定 | Each type has unique visual style and character settings |
| Step 2 | 创建主角 | Create Protagonist |
| Step 2 描述 | 定义主角的性格、说话方式和角色类型 | Define personality, speech style, and character type |
| Step 3 | 添加配角（可选） | Add Supporting Characters (Optional) |
| Step 3 描述 | 配角可以丰富故事，最多添加 3 个 | Enrich your story with up to 3 supporting characters |
| 关系说明 | 设置与主角的关系：友好 / 中立 / 敌对 | Set relationship: Friendly / Neutral / Hostile |

---

### 3.3 模块C - 卡牌系统

**标题**：
- 中文：卡牌系统
- 英文：Card System

**卡牌类型**：

| 类型 | 中文 | 英文 | 上限 |
|------|------|------|------|
| 角色卡牌 | 角色卡牌 | Character Cards | 8张 |
| 天气 | 天气 | Weather | 8张 |
| 地形 | 地形 | Terrain | 8张 |
| 冒险类型 | 冒险类型 | Adventure Type | 8张 |
| 装备 | 装备 | Equipment | 8张 |

**获取方式**：

| 方式 | 中文 | 英文 |
|------|------|------|
| 方式1 | 创建书籍时自动生成主角和配角的角色卡牌 | Character cards are auto-generated when creating a book |
| 方式2 | 解谜成功随机掉落 1 张情节卡牌 | Solve puzzles to randomly earn 1 plot card |
| 方式3 | 超过上限时需要选择丢弃一张卡牌 | When over limit, choose a card to discard |

---

### 3.4 模块D - 章节生成

**标题**：
- 中文：章节生成
- 英文：Chapter Generation

**副标题**：
- 中文：在"故事导演"页面，你可以选择卡牌来生成新的章节
- 英文：In the "Story Director" page, select cards to generate new chapters

**选择流程**：

| 步骤 | 中文 | 英文 |
|------|------|------|
| Step 1 | 选择主角 | Select Protagonist |
| Step 1 提示 | 必须选择 1 个角色作为本章主角 | Must select 1 character as the chapter protagonist |
| Step 2 | 选择情节卡牌 | Select Plot Cards |
| Step 2 提示 | 每种类型必须且只能选择 1 张 | Must select exactly 1 card of each type |
| Step 3 | 开始拍摄 | Start Shooting |
| Step 3 描述 | AI 将根据你选择的卡牌生成约 300 字的章节 | AI will generate a ~300 word chapter based on your selected cards |

---

### 3.5 模块E - 解谜玩法

**标题**：
- 中文：解谜玩法
- 英文：Puzzle Gameplay

**副标题**：
- 中文：每个章节都包含一个谜题，解开它获得奖励！
- 英文：Each chapter contains a puzzle. Solve it to earn rewards!

**谜题规则**：

| 规则 | 中文 | 英文 |
|------|------|------|
| 规则1 | 每个章节固定有 1 个谜题 | Each chapter has exactly 1 puzzle |
| 规则2 | 最多尝试 3 次 | Maximum 3 attempts |
| 规则3 | 答错会显示剩余尝试次数 | Wrong answers show remaining attempts |
| 规则4 | 答对获得 1 张随机情节卡牌 | Correct answer earns 1 random plot card |

**谜题类型**：

| 类型 | 中文 | 英文 |
|------|------|------|
| 文字谜题 | 文字谜题（猜成语、字谜） | Word Puzzles (Idioms, Riddles) |
| 逻辑谜题 | 逻辑谜题（数字规律、推理） | Logic Puzzles (Number patterns, Deduction) |
| 选择题 | 选择题（多选一） | Multiple Choice |

**奖励说明**：
- 中文：提示：登录用户才能获得卡牌奖励
- 英文：Note: Only logged-in users can earn card rewards

---

## 四、技术实现

### 4.1 文件改动清单

| 文件 | 改动 |
|------|------|
| `src/frontend/how-to-play.html` | 新建页面 |
| `src/frontend/index.html` | 导航栏添加"玩法介绍"链接 |
| `src/frontend/js/theme.js` | 扩展翻译字典（添加新页面翻译） |

### 4.2 样式方案

复用现有 `src/frontend/css/` 目录下的样式文件：
- `variables.css` - CSS变量
- `main.css` - 主样式
- `components.css` - 组件样式
- `themes.css` - 主题样式
- `responsive.css` - 响应式样式
- `animations.css` - 动画效果

### 4.3 国际化方案

- 使用 `data-i18n` 属性标记翻译文本
- 扩展 `theme.js` 中的 `translations` 对象
- 复用导航栏语言切换按钮

### 4.4 导航实现

- 侧边导航使用锚点跳转（`#section-a`, `#section-b` 等）
- 滚动时高亮当前模块对应的导航项
- 点击导航项平滑滚动到对应模块

---

## 五、首页入口

在 `src/frontend/index.html` 导航栏添加链接：

```
导航栏位置：[StoryBook] [My Library] [How to Play] [Sign In]
```

---

## 六、验收标准

| 验收项 | 验收标准 |
|--------|----------|
| 页面访问 | 可以通过首页导航栏访问玩法介绍页 |
| 侧边导航 | 点击导航项可以跳转到对应模块 |
| 滚动高亮 | 滚动时当前模块的导航项高亮 |
| 国际化 | 切换语言后，所有文本正确显示对应语言 |
| 响应式 | 移动端导航栏正常显示和使用 |
| 开始创作 | 底部按钮可以跳转到书籍创建页 |

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-16 | 初始版本 |
