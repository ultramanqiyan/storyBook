# 预设书籍 SEO 优化方案

## 概述

为预设书籍生成静态 HTML 页面，以实现最佳 SEO 效果和社交分享支持。

## 问题分析

### 当前架构

项目使用 Cloudflare Pages 托管，采用 CSR（客户端渲染）方式：

```
用户请求 → Cloudflare 返回空 HTML 骨架 → 浏览器执行 JS → 加载数据 → 渲染内容
```

### SEO 问题

| 问题 | 影响 |
|------|------|
| 搜索引擎爬虫可能不执行 JS | 页面内容不被索引 |
| 社交媒体爬虫不执行 JS | 分享时无预览 |
| 页面加载速度较慢 | 用户体验和 SEO 排名受影响 |

## 风险分析

### 风险清单

| # | 风险 | 概率 | 影响 | 缓解措施 |
|---|------|------|------|----------|
| 1 | SQL 解析失败 | 中 | 高 | 添加测试用例，验证解析结果 |
| 2 | 忘记重新生成页面 | 高 | 中 | CI/CD 自动化，prebuild 钩子 |
| 3 | 路径引用错误 | 低 | 高 | 使用相对路径 `../`，本地测试验证 |
| 4 | 样式不一致 | 低 | 中 | 复用现有 CSS，保持模板一致 |
| 5 | SEO 效果不佳 | 低 | 中 | 遵循 Google 最佳实践 |
| 6 | 部署失败 | 低 | 高 | Cloudflare 自动部署，无需额外配置 |
| 7 | 中英文版本混淆 | 低 | 中 | 按语言字段分别生成，文件名区分 |
| 8 | 现有链接兼容性 | 中 | 中 | 保留原动态页面，新页面使用新 URL |

### 风险详细说明

#### 1. SQL 解析失败

**问题：** INSERT 语句格式多变，单引号转义、多行值等可能导致解析失败

**解决方案：**
- 使用健壮的正则表达式
- 添加解析结果验证
- 考虑使用 SQLite 直接读取（备选方案）

#### 2. 忘记重新生成页面

**问题：** SQL 更新后忘记运行生成脚本

**解决方案：**
- 在 `package.json` 中配置 `prebuild` 钩子
- CI/CD 流程中自动运行

```json
{
  "scripts": {
    "generate:pages": "node scripts/generate-preset-pages.js",
    "prebuild": "npm run generate:pages"
  }
}
```

#### 3. 路径引用错误

**问题：** 静态页面在 `books/` 子目录，CSS/JS 路径可能错误

**解决方案：**
- 使用相对路径 `../css/`、`../js/`
- 本地测试验证所有链接

## 解决方案：预渲染静态页面

### 架构设计

```
src/frontend/
├── css/                        ← 样式文件（修改不影响静态页面）
│   ├── variables.css
│   ├── main.css
│   ├── themes.css
│   └── ...
├── js/                         ← 脚本文件（修改不影响静态页面）
│   ├── main.js
│   ├── theme.js
│   └── ...
├── books/                      ← 预设书籍静态页面
│   ├── preset-adventure-001.html
│   ├── preset-adventure-001-en.html
│   ├── preset-adventure-002.html
│   └── ...
├── book.html                   ← 用户书籍动态页面（CSR）
├── library.html                ← 图书馆页面
└── index.html                  ← 首页
```

### URL 设计与兼容性

| 场景 | URL | 处理方式 |
|------|-----|----------|
| 预设书籍（SEO优化） | `/books/preset-adventure-001.html` | 静态页面（推荐） |
| 预设书籍（旧链接兼容） | `/book.html?id=preset-adventure-001` | 动态页面（保留） |
| 用户书籍 | `/book.html?id=user-xxx` | 动态页面 |

**说明：** 保留原动态页面 `book.html` 以兼容旧链接，新页面使用 `/books/` 路径。

## SEO 实现详解

### 1. Meta 标签

```html
<!-- 基础 SEO -->
<title>星空探险家 - StoryBook | AI互动冒险故事</title>
<meta name="description" content="星空探险家是一段奇妙的AI互动冒险故事，跟随小星和月兔探索神秘岛屿...">
<meta name="keywords" content="互动故事, AI故事, 星空探险, 儿童故事">
<link rel="canonical" href="https://your-domain.com/books/preset-adventure-001.html">

<!-- Open Graph (社交分享) -->
<meta property="og:title" content="星空探险家 - StoryBook">
<meta property="og:description" content="一段奇妙的星空探险故事...">
<meta property="og:type" content="book">
<meta property="og:url" content="https://your-domain.com/books/preset-adventure-001.html">
<meta property="og:image" content="https://your-domain.com/images/books/adventure-001.png">
<meta property="og:locale" content="zh_CN">
<meta property="og:locale:alternate" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="星空探险家 - StoryBook">
<meta name="twitter:description" content="一段奇妙的星空探险故事...">
<meta name="twitter:image" content="https://your-domain.com/images/books/adventure-001.png">
```

### 2. 结构化数据 (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "星空探险家",
  "description": "一段奇妙的星空探险故事，跟随小星和月兔探索神秘岛屿...",
  "genre": "Adventure",
  "inLanguage": "zh",
  "author": {
    "@type": "Organization",
    "name": "StoryBook",
    "url": "https://your-domain.com"
  },
  "character": [
    {
      "@type": "Person",
      "name": "小星",
      "description": "小探险家，好奇心强、善于观察、有点害羞"
    },
    {
      "@type": "Person",
      "name": "月兔",
      "description": "精灵向导，调皮可爱、知识渊博"
    },
    {
      "@type": "Person",
      "name": "爷爷",
      "description": "退休天文学家，慈祥睿智、神秘"
    }
  ],
  "numberOfPages": "10",
  "bookFormat": "EBook",
  "audience": {
    "@type": "Audience",
    "audienceType": "Children"
  }
}
</script>
```

### 3. Sitemap 更新

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- 预设书籍页面 - 中文 -->
  <url>
    <loc>https://your-domain.com/books/preset-adventure-001.html</loc>
    <lastmod>2026-03-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" 
                href="https://your-domain.com/books/preset-adventure-001-en.html"/>
  </url>
  
  <!-- 预设书籍页面 - 英文 -->
  <url>
    <loc>https://your-domain.com/books/preset-adventure-001-en.html</loc>
    <lastmod>2026-03-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="zh" 
                href="https://your-domain.com/books/preset-adventure-001.html"/>
  </url>
  
  <!-- ... 其他书籍 -->
</urlset>
```

### 4. robots.txt

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml

# 允许爬取预设书籍静态页面
Allow: /books/

# 允许爬取主要页面
Allow: /index.html
Allow: /library.html
Allow: /privacy.html
Allow: /terms.html
```

## 部署方案

### Cloudflare Pages 部署结构

```
┌─────────────────────────────────────────────────────────┐
│                  Cloudflare Pages                        │
├─────────────────────────────────────────────────────────┤
│  src/frontend/                                           │
│  ├── index.html          ← 首页                          │
│  ├── library.html        ← 图书馆                        │
│  ├── book.html           ← 用户书籍（动态）              │
│  ├── books/              ← 预设书籍静态页面              │
│  │   ├── preset-adventure-001.html                      │
│  │   ├── preset-adventure-001-en.html                   │
│  │   └── ...                                            │
│  ├── css/                ← 样式文件                      │
│  └── js/                 ← 脚本文件                      │
├─────────────────────────────────────────────────────────┤
│  functions/api/          ← API 接口                      │
└─────────────────────────────────────────────────────────┘
```

### 部署流程

```
┌─────────────────────────────────────────────────────────┐
│  1. 本地运行生成脚本                                     │
│     npm run generate:pages                               │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  2. 静态文件生成到 src/frontend/books/                   │
│     ├── preset-adventure-001.html                        │
│     ├── preset-adventure-001-en.html                     │
│     └── ...                                              │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  3. Git 提交并推送                                       │
│     git add .                                            │
│     git commit -m "feat: 添加预设书籍静态页面"           │
│     git push                                             │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│  4. Cloudflare Pages 自动部署                            │
│     - 无需额外配置                                       │
│     - 静态文件自动托管                                   │
│     - 全球 CDN 分发                                      │
└─────────────────────────────────────────────────────────┘
```

### 自动化配置

在 `package.json` 中添加：

```json
{
  "scripts": {
    "generate:pages": "node scripts/generate-preset-pages.js",
    "prebuild": "npm run generate:pages",
    "predeploy": "npm run generate:pages"
  }
}
```

## 生成脚本

### 脚本位置

`scripts/generate-preset-pages.js`

### 数据来源

从 `migrations/0002_seed_data.sql` 中提取：

| 表 | 字段 | 用途 |
|---|---|---|
| `books` | book_id, title, type, language | 书籍基本信息 |
| `characters` | book_id, name, role, personality, icon | 角色列表 |
| `chapters` | chapter_id, book_id, title, order_num | 章节目录 |

### 生成流程

```
┌─────────────────────────────────────────────────────────┐
│            migrations/0002_seed_data.sql                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              解析 SQL 提取数据                           │
│  - 解析 INSERT 语句                                     │
│  - 提取 books, characters, chapters 数据               │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              按书籍分组                                 │
│  - 每本书关联其角色和章节                               │
│  - 区分中英文版本                                       │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              生成 HTML 模板                             │
│  - 填充书籍内容                                         │
│  - 添加 SEO meta 标签                                   │
│  - 添加结构化数据                                       │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              输出静态文件                               │
│  src/frontend/books/                                    │
│  ├── preset-adventure-001.html                          │
│  ├── preset-adventure-001-en.html                       │
│  └── ...                                                │
└─────────────────────────────────────────────────────────┘
```

### 静态页面模板

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>${book.title} - StoryBook | AI互动${book.typeName}故事</title>
  <meta name="description" content="${book.description}">
  <meta name="keywords" content="互动故事, AI故事, ${book.title}, ${book.typeName}">
  <link rel="canonical" href="https://your-domain.com/books/${book.book_id}.html">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${book.title} - StoryBook">
  <meta property="og:description" content="${book.description}">
  <meta property="og:type" content="book">
  <meta property="og:url" content="https://your-domain.com/books/${book.book_id}.html">
  <meta property="og:locale" content="zh_CN">
  
  <!-- 外部样式 -->
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/themes.css">
  
  <!-- 结构化数据 -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "${book.title}",
    "description": "${book.description}",
    "genre": "${book.type}",
    "inLanguage": "zh",
    "author": { "@type": "Organization", "name": "StoryBook" },
    "character": ${JSON.stringify(book.characters)}
  }
  </script>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">首页</a>
      <a href="../library.html" class="navbar-link">图书馆</a>
    </div>
  </nav>
  
  <div class="book-page">
    <h1 class="book-title">${book.title}</h1>
    <span class="book-type">${book.typeName}</span>
    
    <div class="characters-section">
      <h2>主要角色</h2>
      ${book.characters.map(c => `
        <div class="character-card">
          <span class="character-icon">${c.icon}</span>
          <h3>${c.name}</h3>
          <p>${c.role} - ${c.personality}</p>
        </div>
      `).join('')}
    </div>
    
    <div class="chapters-section">
      <h2>章节目录</h2>
      ${book.chapters.map(ch => `
        <a href="../chapter.html?id=${ch.chapter_id}" class="chapter-link">
          第${ch.order}章：${ch.title}
        </a>
      `).join('')}
    </div>
    
    <button class="btn-primary" onclick="importBook('${book.book_id}')">
      导入到我的书架
    </button>
  </div>
  
  <script src="../js/api.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
</body>
</html>
```

## 新增预设书籍流程

### 步骤

1. **添加数据**
   ```sql
   -- 在 migrations/0002_seed_data.sql 中添加
   INSERT INTO books VALUES ('preset-new-001', 'system', '新书名', 'adventure', 1, 'zh');
   INSERT INTO characters VALUES (...);
   INSERT INTO chapters VALUES (...);
   ```

2. **生成页面**
   ```bash
   npm run generate:pages
   ```

3. **提交部署**
   ```bash
   git add .
   git commit -m "feat: 添加新预设书籍"
   git push
   ```

### 自动化流程

配置 `prebuild` 钩子后，流程简化为：

```bash
# 只需提交 SQL 更改
git add migrations/0002_seed_data.sql
git commit -m "feat: 添加新预设书籍"
git push  # Cloudflare 自动构建时会运行 generate:pages
```

## 维护说明

### 样式/动画更新

- ❌ 不需要重新生成静态页面
- ✅ 直接修改 CSS/JS 文件即可
- 原因：静态页面引用外部 CSS/JS 文件

### 内容更新

- ✅ 需要重新运行生成脚本
- 预设书籍内容很少改变，通常只在数据库迁移时更新

### SEO 优化更新

- ✅ 需要重新运行生成脚本
- 修改脚本中的 meta 标签或结构化数据后重新生成

## 效果对比

| 指标 | 当前 CSR | 静态页面 |
|------|----------|----------|
| SEO 效果 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 社交分享 | ❌ 不支持 | ✅ 完美支持 |
| 首屏加载 | 较慢 | 快 |
| 维护成本 | 低 | 中 |
| 用户体验 | 相同 | 相同 |
| 搜索排名 | 一般 | 更好 |

## 待办事项

- [ ] 创建 `scripts/generate-preset-pages.js` 脚本
- [ ] 创建 `src/frontend/books/` 目录
- [ ] 更新 `package.json` 添加 npm scripts
- [ ] 更新 `library.html` 链接指向静态页面
- [ ] 创建 `sitemap.xml` 包含所有预设书籍页面
- [ ] 创建 `robots.txt`
- [ ] 添加 og:image 图片资源
- [ ] 测试生成脚本的正确性

## 发现时间

2026-03-15
