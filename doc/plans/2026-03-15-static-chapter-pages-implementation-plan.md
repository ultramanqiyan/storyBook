# 预设书籍章节静态HTML页面实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 为预设书籍生成静态HTML章节页面，实现SEO优化

**Architecture:** 扩展现有的 generate-preset-pages.js 脚本，新增章节页面生成功能，复用现有 chapter.html 的布局和样式

**Tech Stack:** Node.js, SQL解析, HTML生成

---

## Task 1: 创建章节输出目录

**Files:**
- Create: `src/frontend/chapters/` 目录

**Step 1: 创建目录**

```bash
mkdir -p src/frontend/chapters
```

**Step 2: 验证目录创建**

```bash
ls -la src/frontend/
```
Expected: 看到 `chapters` 目录

**Step 3: Commit**

```bash
git add src/frontend/chapters/.gitkeep
git commit -m "chore: create chapters directory for static chapter pages"
```

---

## Task 2: 扩展生成脚本 - 添加章节HTML生成函数

**Files:**
- Modify: `scripts/generate-preset-pages.js`

**Step 1: 添加 generateChapterHTML 函数**

在 `generateBookHTML` 函数后添加以下代码：

```javascript
function generateChapterHTML(book, chapter, prevChapter, nextChapter, characters, plotCards) {
  const lang = book.language;
  const isZh = lang === 'zh';
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const orderNum = chapter.orderNum;
  
  const characterSchema = characters.map(c => ({
    '@type': 'Person',
    name: c.name,
    description: `${c.roleType} - ${c.personality}`
  }));
  
  const formattedContent = formatChapterContent(chapter.content, isZh);
  const leftContent = formattedContent.leftContent;
  const rightContent = formattedContent.rightContent;
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isZh ? '第' : 'Chapter '}${romanNumerals[orderNum - 1] || orderNum}: ${chapter.title} - ${book.title} - StoryBook</title>
  <meta name="description" content="${isZh ? '阅读' : 'Read'} ${chapter.title} - ${book.title}">
  <meta name="keywords" content="${isZh ? '互动故事, AI故事, ' + book.title + ', ' + chapter.title : 'interactive story, AI story, ' + book.title + ', ' + chapter.title}">
  <meta property="og:title" content="${chapter.title} - ${book.title}">
  <meta property="og:description" content="${isZh ? '阅读' : 'Read'} ${chapter.title}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/themes.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Chapter",
    "name": "${chapter.title}",
    "isPartOf": {
      "@type": "Book",
      "name": "${book.title}",
      "genre": "${book.type}"
    },
    "position": ${orderNum},
    "inLanguage": "${isZh ? 'zh' : 'en'}"
  }
  </script>
  <style>
    .book-reader-page {
      height: 100vh;
      padding-top: 80px;
      display: flex;
      justify-content: center;
      perspective: 2000px;
      overflow: hidden;
    }
    
    .reading-book-container {
      position: relative;
      width: 95%;
      max-width: 1400px;
      height: calc(100vh - 160px);
      min-height: 500px;
      display: flex;
      justify-content: center;
    }
    
    .reading-spine {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 100%;
      background: linear-gradient(90deg, 
        #1a0a00 0%, 
        #3a2a1a 15%, 
        #2a1a0a 50%, 
        #3a2a1a 85%, 
        #1a0a00 100%);
      border-radius: 5px;
      z-index: 10;
      box-shadow: 
        0 0 30px rgba(0, 0, 0, 0.6),
        inset 0 0 15px rgba(0, 0, 0, 0.4);
    }
    
    .reading-spine::before {
      content: '';
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 90%;
      background: linear-gradient(180deg, 
        #654321 0%, 
        #8B4513 30%,
        #A0522D 50%,
        #8B4513 70%,
        #654321 100%);
      border-radius: 3px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }
    
    .reading-page {
      position: absolute;
      width: calc(50% - 35px);
      height: 100%;
      background: #f4e4bc;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    }
    
    .reading-page.left {
      left: 0;
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .reading-page.right {
      right: 0;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
    .parchment-texture {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(ellipse at top left, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at center, transparent 0%, rgba(139, 90, 43, 0.05) 100%);
      pointer-events: none;
    }
    
    .page-edge {
      position: absolute;
      pointer-events: none;
    }
    
    .page-edge.top {
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(180deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.bottom {
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(0deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.left {
      top: 0;
      left: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(90deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .page-edge.right {
      top: 0;
      right: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(270deg, 
        rgba(80, 40, 20, 0.3) 0%, 
        transparent 100%);
    }
    
    .reading-content {
      position: relative;
      height: 100%;
      padding: 40px 35px;
      overflow: hidden;
      color: #1a1008;
      z-index: 1;
    }
    
    .manuscript-title {
      text-align: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(139, 90, 43, 0.4);
    }
    
    .manuscript-title .chapter-num {
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #8B4513;
      letter-spacing: 4px;
      margin-bottom: 8px;
    }
    
    .manuscript-title .chapter-name {
      font-family: 'MedievalSharp', cursive;
      font-size: 28px;
      color: #2a1810;
      text-shadow: 1px 1px 0 rgba(139, 90, 43, 0.2);
    }
    
    .manuscript-title::before,
    .manuscript-title::after {
      content: '❧';
      display: block;
      font-size: 24px;
      color: #8B4513;
      opacity: 0.7;
    }
    
    .manuscript-title::after {
      margin-top: 10px;
    }
    
    .manuscript-text {
      font-family: 'Spectral', serif;
      font-size: 18px;
      line-height: 1.9;
      color: #1a1008;
    }
    
    .manuscript-text p {
      margin-bottom: 20px;
      text-align: justify;
    }
    
    .drop-cap {
      font-family: 'Pirata One', cursive;
      font-size: 4.5em;
      float: left;
      line-height: 0.8;
      padding-right: 12px;
      padding-top: 8px;
      color: #8B4513;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .dialogue-block {
      margin: 25px 0;
      padding: 15px 20px;
      background: rgba(139, 90, 43, 0.08);
      border-left: 4px solid #8B4513;
      border-radius: 0 8px 8px 0;
    }
    
    .dialogue-block .speaker {
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #8B4513;
      margin-bottom: 8px;
    }
    
    .dialogue-block .speech {
      font-style: italic;
      color: #2a1810;
    }
    
    .section-divider {
      text-align: center;
      margin: 30px 0;
      color: #8B4513;
      font-size: 20px;
      letter-spacing: 10px;
    }
    
    .section-divider::before {
      content: '═══';
    }
    
    .reading-nav-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, rgba(15, 15, 35, 0.95) 0%, rgba(10, 10, 25, 0.98) 100%);
      backdrop-filter: blur(10px);
      border-top: 2px solid rgba(255, 215, 0, 0.3);
      padding: 15px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
    }
    
    .scroll-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 25px;
      background: linear-gradient(180deg, #f4e4bc 0%, #d4c4a0 100%);
      border: 2px solid #8B4513;
      border-radius: 8px;
      font-family: 'MedievalSharp', cursive;
      font-size: 14px;
      color: #2a1810;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 
        0 3px 0 #654321,
        0 5px 10px rgba(0, 0, 0, 0.2);
      text-decoration: none;
    }
    
    .scroll-nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 5px 0 #654321,
        0 8px 15px rgba(0, 0, 0, 0.3);
    }
    
    .nav-info {
      color: #a0a0a0;
      font-family: 'Cinzel', serif;
    }
    
    @media (max-width: 1000px) {
      .reading-book-container {
        width: 100%;
        height: auto;
        min-height: auto;
      }
      
      .reading-spine {
        display: none;
      }
      
      .reading-page {
        position: relative;
        width: 100%;
        min-height: 500px;
        margin-bottom: 20px;
        border-radius: 8px;
      }
    }
    
    @media (max-width: 600px) {
      .reading-content {
        padding: 25px 20px;
      }
      
      .manuscript-text {
        font-size: 16px;
      }
      
      .drop-cap {
        font-size: 3.5em;
      }
    }
  </style>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library.html" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf.html" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
    </div>
  </nav>
  
  <div class="book-reader-page">
    <div class="reading-book-container">
      <div class="reading-spine"></div>
      
      <div class="reading-page left">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge left"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          <div class="manuscript-title">
            <div class="chapter-num">${isZh ? '第' : 'CHAPTER '}${romanNumerals[orderNum - 1] || orderNum}</div>
            <div class="chapter-name">${chapter.title}</div>
          </div>
          <div class="manuscript-text">
            ${leftContent}
          </div>
        </div>
      </div>
      
      <div class="reading-page right">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge right"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          <div class="manuscript-text">
            ${rightContent}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="reading-nav-bar">
    ${prevChapter 
      ? `<a href="${prevChapter.chapterId}.html" class="scroll-nav-btn">← ${isZh ? '上一章' : 'Previous'}</a>`
      : `<a href="../books/${book.bookId}.html" class="scroll-nav-btn">← ${isZh ? '目录' : 'Contents'}</a>`
    }
    <div class="nav-info">
      <a href="../books/${book.bookId}.html" style="color: #FFD700; text-decoration: none;">${book.title}</a>
      <span style="margin: 0 10px;">|</span>
      ${isZh ? '第' : 'Chapter '}${orderNum} ${isZh ? '章' : ''} ${isZh ? '' : 'of '}${chapter.totalChapters || '?'}
    </div>
    ${nextChapter 
      ? `<a href="${nextChapter.chapterId}.html" class="scroll-nav-btn">${isZh ? '下一章' : 'Next'} →</a>`
      : `<span class="scroll-nav-btn" style="opacity: 0.5; cursor: default;">${isZh ? '已完结' : 'The End'}</span>`
    }
  </div>
  
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.body.className = 'theme-${book.type}';
      if (typeof createParticles === 'function') {
        createParticles(document.getElementById('particles'), 20);
      }
    });
  </script>
</body>
</html>`;
}

function formatChapterContent(content, isZh) {
  if (!content) {
    return { leftContent: '<p>No content available</p>', rightContent: '' };
  }
  
  const paragraphs = content.split(/\\n\\n|\\n/).filter(p => p.trim());
  
  if (paragraphs.length === 0) {
    return { leftContent: '<p>No content available</p>', rightContent: '' };
  }
  
  const halfIndex = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, halfIndex);
  const rightParagraphs = paragraphs.slice(halfIndex);
  
  let leftContent = '';
  leftParagraphs.forEach((p, index) => {
    if (index === 0) {
      leftContent += \`<p><span class="drop-cap">\${p.charAt(0)}</span>\${formatParagraph(p.slice(1), isZh)}</p>\\n\`;
    } else {
      leftContent += \`<p>\${formatParagraph(p, isZh)}</p>\\n\`;
    }
  });
  
  let rightContent = '';
  rightParagraphs.forEach(p => {
    rightContent += \`<p>\${formatParagraph(p, isZh)}</p>\\n\`;
  });
  
  return { leftContent, rightContent };
}

function formatParagraph(text, isZh) {
  let formatted = text
    .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*([^*]+)\\*/g, '<em>$1</em>');
  
  const dialoguePattern = /^([^:]+):\\s*"([^"]+)"$/;
  const match = formatted.match(dialoguePattern);
  
  if (match) {
    return \`<div class="dialogue-block"><div class="speaker">\${match[1]}:</div><div class="speech">"\${match[2]}"</div></div>\`;
  }
  
  return formatted;
}
```

**Step 2: 验证脚本语法**

```bash
node --check scripts/generate-preset-pages.js
```
Expected: 无错误输出

**Step 3: Commit**

```bash
git add scripts/generate-preset-pages.js
git commit -m "feat: add generateChapterHTML function for static chapter pages"
```

---

## Task 3: 扩展生成脚本 - 修改main函数生成章节

**Files:**
- Modify: `scripts/generate-preset-pages.js`

**Step 1: 修改main函数，添加章节生成逻辑**

将main函数修改为：

```javascript
function main() {
  const sqlPath = path.join(__dirname, '../migrations/0002_seed_data.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  const booksRaw = parseInsertStatements(sql, 'books');
  const charactersRaw = parseInsertStatements(sql, 'characters');
  const chaptersRaw = parseInsertStatements(sql, 'chapters');
  
  console.log(`解析到 ${booksRaw.length} 本书籍`);
  console.log(`解析到 ${charactersRaw.length} 个角色`);
  console.log(`解析到 ${chaptersRaw.length} 个章节`);
  
  const books = booksRaw.map(b => ({
    bookId: b[0],
    userId: b[1],
    title: b[2],
    type: b[3],
    isPreset: b[4],
    language: b[5]
  }));
  
  const characters = charactersRaw.map(c => ({
    charId: c[0],
    bookId: c[1],
    name: c[2],
    roleType: c[3],
    personality: c[4],
    speechStyle: c[5],
    avatar: c[6],
    intimacy: c[7],
    relationship: c[8],
    isProtagonist: c[9] === '1' || c[9] === 1
  }));
  
  const chapters = chaptersRaw.map(ch => ({
    chapterId: ch[0],
    bookId: ch[1],
    title: ch[2],
    content: ch[3],
    selectedCards: ch[4],
    orderNum: parseInt(ch[5], 10)
  }));
  
  // 生成书籍详情页
  const booksOutputDir = path.join(__dirname, '../src/frontend/books');
  if (!fs.existsSync(booksOutputDir)) {
    fs.mkdirSync(booksOutputDir, { recursive: true });
  }
  
  let bookCount = 0;
  books.forEach(book => {
    const bookCharacters = characters.filter(c => c.bookId === book.bookId);
    const bookChapters = chapters.filter(ch => ch.bookId === book.bookId);
    
    const html = generateBookHTML(book, bookCharacters, bookChapters);
    const filename = `${book.bookId}.html`;
    
    fs.writeFileSync(path.join(booksOutputDir, filename), html);
    console.log(`✓ 生成书籍: ${filename} (${bookCharacters.length} 角色, ${bookChapters.length} 章节)`);
    bookCount++;
  });
  
  // 生成章节页面
  const chaptersOutputDir = path.join(__dirname, '../src/frontend/chapters');
  if (!fs.existsSync(chaptersOutputDir)) {
    fs.mkdirSync(chaptersOutputDir, { recursive: true });
  }
  
  let chapterCount = 0;
  books.forEach(book => {
    const bookCharacters = characters.filter(c => c.bookId === book.bookId);
    const bookChapters = chapters
      .filter(ch => ch.bookId === book.bookId)
      .sort((a, b) => a.orderNum - b.orderNum);
    
    bookChapters.forEach((chapter, index) => {
      const prevChapter = index > 0 ? bookChapters[index - 1] : null;
      const nextChapter = index < bookChapters.length - 1 ? bookChapters[index + 1] : null;
      
      chapter.totalChapters = bookChapters.length;
      
      const html = generateChapterHTML(book, chapter, prevChapter, nextChapter, bookCharacters, []);
      const filename = `${chapter.chapterId}.html`;
      
      fs.writeFileSync(path.join(chaptersOutputDir, filename), html);
      console.log(`✓ 生成章节: ${filename}`);
      chapterCount++;
    });
  });
  
  console.log(`\n完成！共生成 ${bookCount} 个书籍页面, ${chapterCount} 个章节页面`);
  console.log(`书籍输出目录: ${booksOutputDir}`);
  console.log(`章节输出目录: ${chaptersOutputDir}`);
}

main();
```

**Step 2: 运行生成脚本**

```bash
node scripts/generate-preset-pages.js
```
Expected: 输出生成的文件数量

**Step 3: 验证生成的文件**

```bash
ls src/frontend/chapters/ | head -10
```
Expected: 看到章节HTML文件列表

**Step 4: Commit**

```bash
git add scripts/generate-preset-pages.js src/frontend/chapters/
git commit -m "feat: generate static chapter HTML pages for preset books"
```

---

## Task 4: 更新书籍详情页的章节链接

**Files:**
- Modify: `scripts/generate-preset-pages.js`

**Step 1: 修改generateBookHTML中的章节链接**

找到章节链接生成部分，将：
```javascript
href="../chapter.html?id=${ch.chapterId}&is_preset=1"
```

改为：
```javascript
href="../chapters/${ch.chapterId}.html"
```

**Step 2: 重新运行生成脚本**

```bash
node scripts/generate-preset-pages.js
```

**Step 3: 验证链接更新**

```bash
grep -n "chapters/" src/frontend/books/preset-fantasy-001-en.html | head -3
```
Expected: 看到新的章节链接格式

**Step 4: Commit**

```bash
git add scripts/generate-preset-pages.js src/frontend/books/
git commit -m "feat: update chapter links to use static HTML pages"
```

---

## Task 5: 验证SEO效果

**Files:**
- Test: 手动验证

**Step 1: 检查章节页面的meta标签**

```bash
head -30 src/frontend/chapters/chapter-fan001-01-en.html
```
Expected: 看到完整的title, meta description, og标签

**Step 2: 检查JSON-LD结构化数据**

```bash
grep -A 10 "application/ld+json" src/frontend/chapters/chapter-fan001-01-en.html
```
Expected: 看到Chapter类型的结构化数据

**Step 3: 检查章节导航**

```bash
grep -A 5 "reading-nav-bar" src/frontend/chapters/chapter-fan001-01-en.html
```
Expected: 看到上一章/下一章导航链接

---

## Task 6: 更新部署配置（如需要）

**Files:**
- Check: `wrangler.toml` 或 Cloudflare Pages 配置

**Step 1: 确认静态文件路由**

确保 Cloudflare Pages 能正确服务 `src/frontend/chapters/` 目录下的静态文件。

**Step 2: 本地测试**

```bash
npx wrangler pages dev src/frontend
```

**Step 3: 访问测试**

打开浏览器访问：
- `http://localhost:8788/books/preset-fantasy-001-en.html`
- `http://localhost:8788/chapters/chapter-fan001-01-en.html`

Expected: 页面正常显示，样式正确

**Step 4: Commit（如有修改）**

```bash
git add .
git commit -m "chore: update deployment config for static chapter pages"
```

---

## 预期成果

- 约80个静态章节HTML文件
- 每个章节包含完整的SEO meta标签
- JSON-LD结构化数据
- 与动态页面一致的视觉效果
- 章节间导航功能
