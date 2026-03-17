# 预设书籍数据导入实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修改 import-from-backup.js 脚本，将线上16本预设书籍的所有数据导入到线下本地数据库。

**Architecture:** 扩展现有脚本功能，增加 bookIds 列表，添加 puzzles 表导入逻辑，增强验证功能。

**Tech Stack:** Node.js, better-sqlite3, 正则表达式

---

## Task 1: 扩展 bookIds 列表

**Files:**
- Modify: `scripts/import-from-backup.js:28-36`

**Step 1: 修改 bookIds 列表**

将现有的 bookIds 列表从4本书扩展到16本书：

```javascript
const bookIds = [
  'preset-adventure-003', 'preset-adventure-004',
  'preset-adventure-003-en', 'preset-adventure-004-en',
  'preset-fantasy-003', 'preset-fantasy-004',
  'preset-fantasy-003-en', 'preset-fantasy-004-en',
  'preset-romance-003', 'preset-romance-004',
  'preset-romance-003-en', 'preset-romance-004-en',
  'preset-business-003', 'preset-business-004',
  'preset-business-003-en', 'preset-business-004-en'
];
```

**Step 2: 更新脚本描述**

修改脚本开头的描述：

```javascript
console.log('📦 从线上备份导入16本预设书籍数据');
```

---

## Task 2: 添加 puzzles 表导入逻辑

**Files:**
- Modify: `scripts/import-from-backup.js:48-55`

**Step 1: 添加 puzzles 表匹配模式**

在 plotCardPattern 之后添加 puzzles 表的匹配模式：

```javascript
const puzzlePattern = new RegExp(`INSERT INTO "puzzles".*VALUES\\('.*?(?:chapter-adv003|chapter-adv004|chapter-fan003|chapter-fan004|chapter-rom003|chapter-rom004|chapter-bus003|chapter-bus004).*?'\\);`, 'g');
const puzzlesMatches = sqlContent.match(puzzlePattern) || [];
```

**Step 2: 更新数据统计输出**

在 console.log 中添加 puzzles 统计：

```javascript
console.log(`\n📊 找到数据:`);
console.log(`  书籍: ${booksMatches.length}`);
console.log(`  角色: ${charsMatches.length}`);
console.log(`  章节: ${chaptersMatches.length}`);
console.log(`  情节卡牌: ${plotCardsMatches.length}`);
console.log(`  谜题: ${puzzlesMatches.length}`);
```

**Step 3: 将 puzzles 加入导入语句列表**

```javascript
const importStatements = [
  ...booksMatches,
  ...charsMatches,
  ...chaptersMatches,
  ...plotCardsMatches,
  ...puzzlesMatches
];
```

---

## Task 3: 增强验证逻辑

**Files:**
- Modify: `scripts/import-from-backup.js:89-98`

**Step 1: 更新验证查询**

修改验证查询以覆盖所有16本书：

```javascript
console.log('\n📊 验证导入结果...');

const buildBookIdCondition = () => {
  return bookIds.map(id => `book_id = '${id}'`).join(' OR ');
};

const bookCount = db.prepare(`SELECT COUNT(*) as count FROM books WHERE is_preset = 1`).get();
const charCount = db.prepare(`SELECT COUNT(*) as count FROM characters WHERE ${buildBookIdCondition()}`).get();
const chapterCount = db.prepare(`SELECT COUNT(*) as count FROM chapters WHERE ${buildBookIdCondition()}`).get();
const plotCardCount = db.prepare(`SELECT COUNT(*) as count FROM plot_cards WHERE ${buildBookIdCondition()}`).get();
const puzzleCount = db.prepare(`SELECT COUNT(*) as count FROM puzzles WHERE chapter_id LIKE 'chapter-adv00%' OR chapter_id LIKE 'chapter-fan00%' OR chapter_id LIKE 'chapter-rom00%' OR chapter_id LIKE 'chapter-bus00%'`).get();

console.log(`  书籍: ${bookCount.count} (预期: 16)`);
console.log(`  角色: ${charCount.count} (预期: 48)`);
console.log(`  章节: ${chapterCount.count} (预期: 160)`);
console.log(`  情节卡牌: ${plotCardCount.count} (预期: 320)`);
console.log(`  谜题: ${puzzleCount.count} (预期: 48)`);
```

---

## Task 4: 添加数据完整性检查

**Files:**
- Modify: `scripts/import-from-backup.js`

**Step 1: 在导入前添加检查**

在导入语句执行前添加：

```javascript
console.log('\n📋 导入前检查...');
const existingBooks = db.prepare("SELECT COUNT(*) as count FROM books WHERE is_preset = 1").get();
if (existingBooks.count > 0) {
  console.log(`  ⚠️ 已存在 ${existingBooks.count} 本预设书籍，将跳过重复数据`);
}
```

**Step 2: 添加每本书的详细验证**

在验证部分添加每本书的详细检查：

```javascript
console.log('\n📚 每本书数据验证:');
for (const bookId of bookIds) {
  const charCnt = db.prepare(`SELECT COUNT(*) as count FROM characters WHERE book_id = ?`).get(bookId);
  const chapterCnt = db.prepare(`SELECT COUNT(*) as count FROM chapters WHERE book_id = ?`).get(bookId);
  const cardCnt = db.prepare(`SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?`).get(bookId);
  console.log(`  ${bookId}: 角色=${charCnt.count}, 章节=${chapterCnt.count}, 卡牌=${cardCnt.count}`);
}
```

---

## Task 5: 测试脚本

**Step 1: 运行脚本**

```bash
node scripts/import-from-backup.js
```

**预期输出:**
```
📦 从线上备份导入16本预设书籍数据
数据库路径: ...
SQL备份路径: ...

📊 找到数据:
  书籍: 16
  角色: 48
  章节: 160
  情节卡牌: 320
  谜题: 48

📝 导入数据...

✅ 导入完成: 成功 592, 失败 0

📊 验证导入结果...
  书籍: 16 (预期: 16)
  角色: 48 (预期: 48)
  章节: 160 (预期: 160)
  情节卡牌: 320 (预期: 320)
  谜题: 48 (预期: 48)

📚 每本书数据验证:
  preset-adventure-003: 角色=3, 章节=10, 卡牌=20
  ...

✅ 导入完成！
```

---

## Task 6: 提交更改

**Step 1: 提交代码**

```bash
git add scripts/import-from-backup.js doc/plans/2026-03-17-import-preset-books-design.md
git commit -m "feat: 扩展import-from-backup脚本支持导入16本预设书籍完整数据"
```
