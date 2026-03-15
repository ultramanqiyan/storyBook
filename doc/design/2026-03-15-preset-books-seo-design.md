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

### URL 设计

| 类型 | URL 格式 | 渲染方式 |
|------|----------|----------|
| 预设书籍 | `/books/preset-adventure-001.html` | 静态 HTML |
| 用户书籍 | `/book.html?id=user-xxx` | CSR |

### 静态页面结构

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>星空探险家 - StoryBook</title>
  <meta name="description" content="一段奇妙的星空探险故事...">
  <meta name="keywords" content="互动故事, 星空探险, AI故事">
  
  <!-- Open Graph -->
  <meta property="og:title" content="星空探险家 - StoryBook">
  <meta property="og:description" content="一段奇妙的星空探险故事...">
  <meta property="og:type" content="book">
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
    "name": "星空探险家",
    "description": "一段奇妙的星空探险故事...",
    "genre": "Adventure",
    "inLanguage": "zh",
    "author": {
      "@type": "Organization",
      "name": "StoryBook"
    }
  }
  </script>
</head>
<body class="theme-adventure">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">首页</a>
      <a href="../library.html" class="navbar-link">图书馆</a>
    </div>
  </nav>
  
  <!-- 完整的书籍内容 -->
  <div class="book-page">
    <div class="book-header">
      <h1 class="book-title">星空探险家</h1>
      <span class="book-type">冒险</span>
    </div>
    
    <div class="book-cover">
      <div class="book-icon">⭐</div>
    </div>
    
    <div class="book-description">
      <p>一段奇妙的星空探险故事，跟随小星和月兔探索神秘岛屿...</p>
    </div>
    
    <!-- 角色列表 -->
    <div class="characters-section">
      <h2>主要角色</h2>
      <div class="character-card">
        <span class="character-icon">👦</span>
        <h3>小星</h3>
        <p>小探险家 - 好奇心强、善于观察</p>
      </div>
      <div class="character-card">
        <span class="character-icon">🐰</span>
        <h3>月兔</h3>
        <p>精灵向导 - 调皮可爱、知识渊博</p>
      </div>
    </div>
    
    <!-- 章节列表 -->
    <div class="chapters-section">
      <h2>章节目录</h2>
      <a href="../chapter.html?id=chapter-adv001-01" class="chapter-link">
        第一章：幸运的开始
      </a>
      <a href="../chapter.html?id=chapter-adv001-02" class="chapter-link">
        第二章：神秘的岛屿
      </a>
    </div>
    
    <button class="btn-primary" onclick="importBook()">
      导入到我的书架
    </button>
  </div>
  
  <!-- 外部脚本 -->
  <script src="../js/api.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
</body>
</html>
```

## 生成脚本

### 脚本位置

`scripts/generate-preset-pages.js`

### 脚本功能

1. 读取 `migrations/0002_seed_data.sql` 中的预设书籍数据
2. 解析 SQL 提取书籍、角色、章节信息
3. 为每本书生成中英文两个静态页面
4. 输出到 `src/frontend/books/` 目录

### 脚本示例

```javascript
// scripts/generate-preset-pages.js

const fs = require('fs');
const path = require('path');

function parseBooksFromSQL(sql) {
  const books = [];
  const bookRegex = /INSERT INTO books.*?VALUES\s*\((.*?)\);/gs;
  const matches = sql.matchAll(bookRegex);
  
  for (const match of matches) {
    const values = parseValues(match[1]);
    books.push({
      book_id: values[0],
      title: values[2],
      type: values[3],
      language: values[5]
    });
  }
  
  return books;
}

function generateBookHTML(book, characters, chapters) {
  return `<!DOCTYPE html>
<html lang="${book.language === 'zh' ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <title>${book.title} - StoryBook</title>
  <!-- ... 完整 HTML ... -->
</head>
<body class="theme-${book.type}">
  <!-- ... 完整内容 ... -->
</body>
</html>`;
}

function main() {
  const sqlPath = path.join(__dirname, '../migrations/0002_seed_data.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  const books = parseBooksFromSQL(sql);
  const characters = parseCharactersFromSQL(sql);
  const chapters = parseChaptersFromSQL(sql);
  
  const outputDir = path.join(__dirname, '../src/frontend/books');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  books.forEach(book => {
    const bookCharacters = characters.filter(c => c.book_id === book.book_id);
    const bookChapters = chapters.filter(c => c.book_id === book.book_id);
    
    const html = generateBookHTML(book, bookCharacters, bookChapters);
    const suffix = book.language === 'zh' ? '' : '-en';
    const filename = `${book.book_id}${suffix}.html`;
    
    fs.writeFileSync(path.join(outputDir, filename), html);
    console.log(`生成: ${filename}`);
  });
  
  console.log(`\n完成！共生成 ${books.length} 个静态页面`);
}

main();
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

### 自动化配置

在 `package.json` 中添加：

```json
{
  "scripts": {
    "generate:pages": "node scripts/generate-preset-pages.js",
    "prebuild": "npm run generate:pages"
  }
}
```

## 维护说明

### 样式/动画更新

- ❌ 不需要重新生成静态页面
- ✅ 直接修改 CSS/JS 文件即可

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

## 待办事项

- [ ] 创建 `scripts/generate-preset-pages.js` 脚本
- [ ] 创建 `src/frontend/books/` 目录
- [ ] 更新 `package.json` 添加 npm scripts
- [ ] 更新 `library.html` 链接指向静态页面
- [ ] 更新 sitemap.xml 包含所有预设书籍页面

## 发现时间

2026-03-15
