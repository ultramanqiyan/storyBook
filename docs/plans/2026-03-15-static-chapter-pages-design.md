# 预设书籍章节静态HTML页面设计

## 背景

当前预设书籍的章节页面是动态渲染的（通过API从D1数据库获取数据），这对SEO不友好。搜索引擎爬虫无法直接抓取章节内容。

## 目标

将预设书籍的章节页面改为静态HTML文件，实现：
- SEO优化：搜索引擎可直接抓取章节内容
- 与现有书籍详情页架构保持一致
- 保持与动态章节页相同的视觉效果和交互体验

## 文件结构

```
src/frontend/
├── books/
│   ├── preset-fantasy-001-en.html      # 书籍详情（已有）
│   └── ...
├── chapters/                            # 新增目录
│   ├── chapter-fan001-01-en.html
│   ├── chapter-fan001-02-en.html
│   └── ...（所有预设章节）
├── css/
│   └── ...（复用现有样式）
└── js/
    └── ...（复用现有脚本）
```

## 技术方案

### 1. 静态HTML生成

扩展现有的 `scripts/generate-preset-pages.js` 脚本，新增章节页面生成功能：

```javascript
// 现有功能：生成书籍详情页
generateBookHTML(book, characters, chapters)

// 新增功能：生成章节页
generateChapterHTML(book, chapter, prevChapter, nextChapter, characters, plotCards)
```

### 2. 章节HTML结构

每个章节HTML包含：

#### Meta标签
- `<title>`: Chapter X: Title - Book Name - StoryBook
- `<meta description>`: 章节摘要
- Open Graph标签

#### 结构化数据 (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Chapter",
  "name": "Chapter Title",
  "isPartOf": {
    "@type": "Book",
    "name": "Book Title"
  },
  "position": 1
}
```

#### 页面布局
复用现有 `chapter.html` 的布局和样式：
- 双页书籍布局（左右页）
- 羊皮纸纹理背景
- 章节标题装饰
- 对话块样式
- 角色高亮
- 底部导航栏

### 3. 章节导航

静态章节之间的导航：
- 上一章/下一章链接
- 返回书籍详情页链接
- 章节进度指示

### 4. 书籍详情页更新

更新预设书籍详情页中的章节链接：
- 从 `chapter.html?id=xxx&is_preset=1` 改为 `chapters/xxx.html`

## 数据来源

章节内容从 `migrations/0002_seed_data.sql` 中解析，与现有书籍详情页生成逻辑一致。

## 样式复用

静态章节页将引用现有的CSS文件：
- `../css/variables.css`
- `../css/main.css`
- `../css/animations.css`
- `../css/components.css`
- `../css/themes.css`
- `../css/responsive.css`

## 不包含的功能

静态章节页不包含以下需要用户登录的功能：
- 谜题系统（需要API交互）
- 卡片奖励系统
- 自定义角色/剧情卡片创建

这些功能仅在动态章节页（非预设书籍）中可用。

## 实施步骤

1. 创建 `src/frontend/chapters/` 目录
2. 扩展 `generate-preset-pages.js` 脚本
3. 生成所有预设章节的静态HTML
4. 更新书籍详情页的章节链接
5. 测试验证

## 预期成果

- 约80个静态章节HTML文件（8本书 × 10章节 × 2语言）
- SEO友好的章节内容
- 与动态页面一致的视觉效果
