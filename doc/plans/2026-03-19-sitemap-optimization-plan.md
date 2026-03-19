# Sitemap 优化实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 优化 sitemap.xml，移除章节页面和中文书籍，提高 AI 预设英文书籍权重

**Architecture:** 修改 generate-sitemap.js 脚本，移除章节生成逻辑，过滤中文书籍，按系列分配不同权重

**Tech Stack:** Node.js, better-sqlite3

---

## Task 1: 修改 generate-sitemap.js 核心逻辑

**Files:**
- Modify: `scripts/generate-sitemap.js`

**Step 1: 修改 how-to-play.html 权重**

找到第 52-56 行，将 how-to-play.html 的权重从 0.7 改为 0.8：

```javascript
sitemap += generateUrlEntry(`${baseUrl}/how-to-play.html`, '0.8', 'monthly', [
  { lang: 'zh', href: `${baseUrl}/how-to-play.html?lang=zh` },
  { lang: 'en', href: `${baseUrl}/how-to-play.html?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/how-to-play.html` }
]);
```

**Step 2: 修改 library.html 权重**

找到第 46-50 行，将 library.html 的权重从 0.9 改为 0.8：

```javascript
sitemap += generateUrlEntry(`${baseUrl}/library.html`, '0.8', 'weekly', [
  { lang: 'zh', href: `${baseUrl}/library.html?lang=zh` },
  { lang: 'en', href: `${baseUrl}/library.html?lang=en` },
  { lang: 'x-default', href: `${baseUrl}/library.html` }
]);
```

**Step 3: 重写预设书籍生成逻辑**

替换第 61-118 行的预设书籍生成逻辑：

```javascript
const presetBooks = db.prepare(`
  SELECT book_id, title, type, language 
  FROM books 
  WHERE book_id LIKE 'preset-%' 
  ORDER BY book_id
`).all();

presetBooks.forEach(book => {
  const bookId = book.book_id;
  
  if (bookId.includes('-zh')) return;
  
  const isAi = bookId.startsWith('preset-ai-');
  const priority = isAi ? '0.9' : '0.5';
  
  sitemap += generateUrlEntry(`${baseUrl}/books/${bookId}.html`, priority, 'monthly');
});
```

**Step 4: 移除章节生成逻辑**

删除第 120-160 行的章节生成逻辑（从 `const chapters = ...` 到 `addedChapters` 相关代码）

**Step 5: 更新日志输出**

修改第 166-167 行的日志输出：

```javascript
console.log('✅ sitemap.xml 已更新');
console.log(`   英文书籍数量: ${presetBooks.filter(b => !b.book_id.includes('-zh')).length}`);
```

---

## Task 2: 运行脚本生成新 sitemap

**Step 1: 运行生成脚本**

Run: `node scripts/generate-sitemap.js`

Expected output:
```
✅ sitemap.xml 已更新
   英文书籍数量: [数量]
```

**Step 2: 验证 sitemap 内容**

检查生成的 sitemap.xml：
- 确认没有章节页面
- 确认没有中文书籍（不含 `-zh`）
- 确认 AI 书籍权重为 0.9
- 确认其他书籍权重为 0.5

---

## Task 3: 验证最终结果

**Step 1: 统计 URL 数量**

Run: `grep -c "<url>" src/frontend/sitemap.xml`

Expected: 约 50 个 URL

**Step 2: 验证 AI 书籍权重**

Run: `grep -A3 "preset-ai-" src/frontend/sitemap.xml | grep priority`

Expected: 所有 AI 书籍 priority 为 0.9

**Step 3: 验证其他书籍权重**

Run: `grep -A3 "preset-adventure-\|preset-business-\|preset-fantasy-\|preset-romance-" src/frontend/sitemap.xml | grep priority`

Expected: 所有其他书籍 priority 为 0.5

---

## 预期最终 Sitemap 结构

| 页面类型 | 数量 | 权重 |
|----------|------|------|
| 首页 | 1 | 1.0 |
| library.html | 1 | 0.8 |
| how-to-play.html | 1 | 0.8 |
| AI 预设英文书籍 | 23 | 0.9 |
| 其他英文书籍 | ~23 | 0.5 |
| privacy.html | 1 | 0.3 |
| terms.html | 1 | 0.3 |
| **总计** | **~50** | - |
