# 预设书籍情节卡牌修复实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修复39本预设书籍的情节卡牌，从项目配置中随机抽取，确保所有卡牌在配置中存在，并重新生成静态文件。

**Architecture:** 使用Node.js脚本连接SQLite数据库，批量更新情节卡牌，然后调用现有脚本重新生成静态HTML文件。

**Tech Stack:** Node.js, better-sqlite3, fs

---

## Task 1: 创建修复脚本框架

**Files:**
- Create: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 创建脚本文件**

创建 `scripts/fix-preset-books-plot-cards.js`：

```javascript
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = findDatabasePath();

function findDatabasePath() {
  const wranglerPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1');
  const miniflarePath = path.join(wranglerPath, 'miniflare-D1DatabaseObject');
  const files = fs.readdirSync(miniflarePath);
  const sqliteFiles = files.filter(f => f.endsWith('.sqlite'));
  const filesWithStats = sqliteFiles.map(f => ({
    name: f,
    path: path.join(miniflarePath, f),
    mtime: fs.statSync(path.join(miniflarePath, f)).mtime.getTime()
  }));
  filesWithStats.sort((a, b) => b.mtime - a.mtime);
  return filesWithStats[0].path;
}

console.log('Database path:', dbPath);
```

**Step 2: 验证脚本可以运行**

Run: `node scripts/fix-preset-books-plot-cards.js`
Expected: 输出数据库路径

---

## Task 2: 实现随机抽取算法

**Files:**
- Modify: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 添加种子随机函数**

```javascript
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

function selectCards(cards, count, seed) {
  const random = seededRandom(seed);
  const shuffled = [...cards].sort(() => random() - 0.5);
  return shuffled.slice(0, count);
}
```

**Step 2: 测试随机抽取**

Run: `node -e "console.log(selectCards([{name:'a'},{name:'b'},{name:'c'},{name:'d'},{name:'e'}], 3, 'test-seed').map(c=>c.name))"`
Expected: 输出3个随机选择的名称

---

## Task 3: 加载项目配置

**Files:**
- Modify: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 添加配置加载函数**

```javascript
function loadConfig(language) {
  const configPath = path.join(process.cwd(), 'config', language, 'plot-options.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

function getCardsForBookType(config, bookType, subType) {
  return config[bookType]?.[subType] || [];
}
```

**Step 2: 验证配置加载**

Run: `node -e "const config = loadConfig('en'); console.log(config.adventure.weather.length)"`
Expected: 输出 20

---

## Task 4: 查询预设书籍

**Files:**
- Modify: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 添加数据库查询函数**

```javascript
function getPresetBooks(db) {
  return db.prepare('SELECT book_id, title, type, language FROM books WHERE is_preset = 1 ORDER BY book_id').all();
}

function getCharacters(db, bookId) {
  return db.prepare('SELECT char_id, name, is_protagonist FROM characters WHERE book_id = ?').all(bookId);
}

function deletePlotCards(db, bookId) {
  return db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
}

function insertPlotCard(db, card) {
  return db.prepare(`
    INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(card.card_id, card.book_id, 'plot', card.sub_type, card.name, card.icon, card.description);
}
```

**Step 2: 验证查询函数**

Run: `node -e "const db = new Database(dbPath); console.log(getPresetBooks(db).length)"`
Expected: 输出 39

---

## Task 5: 生成新卡牌

**Files:**
- Modify: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 添加卡牌生成函数**

```javascript
function generateNewCards(book, config) {
  const newCards = [];
  const bookType = book.type;
  const language = book.language;
  
  for (const subType of ['weather', 'terrain', 'adventure', 'equipment']) {
    const availableCards = getCardsForBookType(config, bookType, subType);
    const seed = `${book.book_id}-${subType}`;
    const selectedCards = selectCards(availableCards, 8, seed);
    
    for (const card of selectedCards) {
      newCards.push({
        card_id: `${book.book_id}-${subType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        book_id: book.book_id,
        sub_type: subType,
        name: card.name,
        icon: card.icon,
        description: card.description
      });
    }
  }
  
  return newCards;
}
```

**Step 2: 验证卡牌生成**

Run: `node -e "const book = {book_id:'test',type:'adventure',language:'en'}; console.log(generateNewCards(book, loadConfig('en')).length)"`
Expected: 输出 32

---

## Task 6: 主修复流程

**Files:**
- Modify: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 添加主函数**

```javascript
async function main() {
  const db = new Database(dbPath);
  const report = {
    totalBooks: 0,
    updatedBooks: 0,
    totalCardsUpdated: 0,
    missingCharacters: [],
    errors: []
  };
  
  try {
    const books = getPresetBooks(db);
    report.totalBooks = books.length;
    
    const enConfig = loadConfig('en');
    const zhConfig = loadConfig('zh');
    
    for (const book of books) {
      try {
        console.log(`Processing: ${book.book_id}`);
        
        const characters = getCharacters(db, book.book_id);
        if (characters.length < 3) {
          report.missingCharacters.push({
            bookId: book.book_id,
            characterCount: characters.length
          });
        }
        
        deletePlotCards(db, book.book_id);
        
        const config = book.language === 'en' ? enConfig : zhConfig;
        const newCards = generateNewCards(book, config);
        
        for (const card of newCards) {
          insertPlotCard(db, card);
        }
        
        report.updatedBooks++;
        report.totalCardsUpdated += newCards.length;
        
      } catch (error) {
        report.errors.push({
          bookId: book.book_id,
          error: error.message
        });
      }
    }
    
    console.log('\n=== Fix Report ===');
    console.log(JSON.stringify(report, null, 2));
    
    const reportPath = path.join(process.cwd(), 'doc', 'preset-books-fix-report.md');
    fs.writeFileSync(reportPath, generateReportMarkdown(report));
    console.log(`\nReport saved to: ${reportPath}`);
    
  } finally {
    db.close();
  }
}

function generateReportMarkdown(report) {
  return `# 预设书籍情节卡牌修复报告

**修复时间:** ${new Date().toISOString()}

## 修复摘要

| 指标 | 数量 |
|------|------|
| 总书籍数 | ${report.totalBooks} |
| 已更新书籍 | ${report.updatedBooks} |
| 更新卡牌总数 | ${report.totalCardsUpdated} |

## 问题列表

${report.missingCharacters.length > 0 ? `
### 角色卡牌缺失

| 书籍ID | 角色数量 |
|--------|----------|
${report.missingCharacters.map(c => `| ${c.bookId} | ${c.characterCount} |`).join('\n')}
` : '无'}

${report.errors.length > 0 ? `
### 错误列表

| 书籍ID | 错误信息 |
|--------|----------|
${report.errors.map(e => `| ${e.bookId} | ${e.error} |`).join('\n')}
` : '无'}
`;
}

main().catch(console.error);
```

**Step 2: 运行修复脚本**

Run: `node scripts/fix-preset-books-plot-cards.js`
Expected: 输出修复报告

---

## Task 7: 重新生成静态文件

**Files:**
- Modify: `scripts/fix-preset-books-plot-cards.js`

**Step 1: 添加静态文件生成调用**

```javascript
import { execSync } from 'child_process';

async function regenerateStaticFiles() {
  console.log('\n=== Regenerating Static Files ===');
  
  try {
    execSync('node scripts/generate-preset-books-static.js', {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('Static files regenerated successfully');
  } catch (error) {
    console.error('Failed to regenerate static files:', error.message);
    throw error;
  }
}

async function main() {
  // ... existing code ...
  
  // After database update
  await regenerateStaticFiles();
  
  // ... rest of the code ...
}
```

**Step 2: 验证静态文件生成**

Run: `node scripts/fix-preset-books-plot-cards.js`
Expected: 静态文件重新生成

---

## Task 8: 验证修复结果

**Files:**
- Run: `tests/e2e/preset-books/08-generate-report.spec.js`

**Step 1: 运行端到端测试**

Run: `npx playwright test tests/e2e/preset-books/08-generate-report.spec.js --reporter=list`
Expected: 所有卡牌配置验证通过

**Step 2: 检查测试报告**

Read: `doc/preset-books-e2e-test-report.md`
Expected: 配置存在列全部为 ✅

---

## 执行说明

1. **运行修复脚本：**
   ```bash
   node scripts/fix-preset-books-plot-cards.js
   ```

2. **验证修复结果：**
   ```bash
   npx playwright test tests/e2e/preset-books/08-generate-report.spec.js --reporter=list
   ```

3. **查看修复报告：**
   - 修复报告：`doc/preset-books-fix-report.md`
   - 测试报告：`doc/preset-books-e2e-test-report.md`
