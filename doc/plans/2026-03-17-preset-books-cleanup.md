# 预设书籍清理实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 清理无效的预设书籍数据，保留线上已有书籍 + AI系列英文版，删除AI系列中文版及无效静态文件

**Architecture:** 
1. 备份数据库和代码（安全第一）
2. 删除静态HTML文件（无风险）
3. 删除本地数据库记录及相关数据（需谨慎）
4. 重新生成静态页面确保一致性

**Tech Stack:** Cloudflare D1 (SQLite), Node.js, Wrangler CLI, Git

**⚠️ 注意:** 本计划仅包含本地操作，不涉及线上数据库和部署

---

## 第零阶段：备份（必须先执行）

### Task 0.1: 导出线上数据库表到SQL文件

**Files:**
- Create: `backup/remote-db-backup-2026-03-17.sql`

**Step 1: 创建备份目录**

```powershell
New-Item -ItemType Directory -Force -Path backup
```

**Step 2: 导出线上数据库所有表**

```bash
npx wrangler d1 execute storybook_database --remote --command "SELECT sql FROM sqlite_master WHERE type='table'" > backup/remote-db-schema-2026-03-17.sql
```

**Step 3: 导出线上数据库数据**

```bash
npx wrangler d1 export storybook_database --remote --output backup/remote-db-backup-2026-03-17.sql
```

**预期输出:** 生成完整的线上数据库备份文件

---

### Task 0.2: 导出本地数据库表到SQL文件

**Files:**
- Create: `backup/local-db-backup-2026-03-17.sql`

**Step 1: 导出本地数据库所有表**

```bash
npx wrangler d1 execute storybook_database --local --command "SELECT sql FROM sqlite_master WHERE type='table'" > backup/local-db-schema-2026-03-17.sql
```

**Step 2: 导出本地数据库数据**

```bash
npx wrangler d1 export storybook_database --local --output backup/local-db-backup-2026-03-17.sql
```

**预期输出:** 生成完整的本地数据库备份文件

---

### Task 0.3: 验证备份文件

**Step 1: 检查备份文件是否存在**

```powershell
Get-ChildItem backup/*.sql | ForEach-Object { Write-Host $_.Name, $_.Length }
```

**预期输出:** 4个备份文件，每个文件大小 > 0

**Step 2: 检查备份文件内容**

```powershell
Get-Content backup/remote-db-backup-2026-03-17.sql | Select-Object -First 20
Get-Content backup/local-db-backup-2026-03-17.sql | Select-Object -First 20
```

**预期输出:** 显示SQL文件头部内容，确认包含CREATE TABLE和INSERT语句

---

### Task 0.4: 提交备份文件到main分支

**Step 1: 确保在main分支**

```bash
git checkout main
```

**Step 2: 添加备份文件**

```bash
git add backup/
```

**Step 3: 提交备份**

```bash
git commit -m "backup: add database backup before cleanup (2026-03-17)"
```

---

### Task 0.5: 同步到GitHub

**Step 1: 推送到GitHub**

```bash
git push origin main
```

**预期输出:** 成功推送到GitHub

**Step 2: 验证GitHub上的备份**

访问GitHub仓库确认备份文件已上传

---

### Task 0.6: 创建备份标签

**Step 1: 创建Git标签**

```bash
git tag -a backup-before-cleanup-2026-03-17 -m "Backup before preset books cleanup"
```

**Step 2: 推送标签到GitHub**

```bash
git push origin backup-before-cleanup-2026-03-17
```

**预期输出:** 标签已创建并推送到GitHub

---

## 第一阶段：删除无效静态文件

### Task 1: 删除AI系列中文版书籍HTML页面

**Files:**
- Delete: `src/frontend/books/preset-ai-001-zh.html`
- Delete: `src/frontend/books/preset-ai-002-zh.html`
- Delete: `src/frontend/books/preset-ai-003-zh.html`
- Delete: `src/frontend/books/preset-ai-004-zh.html`
- Delete: `src/frontend/books/preset-ai-005-zh.html`
- Delete: `src/frontend/books/preset-ai-006-zh.html`
- Delete: `src/frontend/books/preset-ai-007-zh.html`
- Delete: `src/frontend/books/preset-ai-008-zh.html`
- Delete: `src/frontend/books/preset-ai-009-zh.html`
- Delete: `src/frontend/books/preset-ai-010-zh.html`
- Delete: `src/frontend/books/preset-ai-011-zh.html`
- Delete: `src/frontend/books/preset-ai-012-zh.html`
- Delete: `src/frontend/books/preset-ai-013-zh.html`
- Delete: `src/frontend/books/preset-ai-014-zh.html`
- Delete: `src/frontend/books/preset-ai-015-zh.html`
- Delete: `src/frontend/books/preset-ai-016-zh.html`
- Delete: `src/frontend/books/preset-ai-017-zh.html`
- Delete: `src/frontend/books/preset-ai-018-zh.html`
- Delete: `src/frontend/books/preset-ai-019-zh.html`
- Delete: `src/frontend/books/preset-ai-020-zh.html`
- Delete: `src/frontend/books/preset-ai-021-zh.html`
- Delete: `src/frontend/books/preset-ai-022-zh.html`
- Delete: `src/frontend/books/preset-ai-023-zh.html`

**Step 1: 列出要删除的文件确认**

```powershell
Get-ChildItem src/frontend/books/preset-ai-*-zh.html | ForEach-Object { $_.Name }
```

**预期输出:** 23个文件名

**Step 2: 执行删除**

```powershell
Remove-Item src/frontend/books/preset-ai-*-zh.html
```

**Step 3: 验证删除成功**

```powershell
Get-ChildItem src/frontend/books/preset-ai-*-zh.html
```

**预期输出:** 无文件

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove AI series Chinese version book pages"
```

---

### Task 2: 删除AI系列中文版章节HTML页面

**Files:**
- Delete: `src/frontend/chapters/chapter-ai*-zh.html` (所有匹配文件)

**Step 1: 列出要删除的文件确认**

```powershell
Get-ChildItem src/frontend/chapters/chapter-ai*-zh.html | ForEach-Object { $_.Name }
```

**预期输出:** 约50个文件名

**Step 2: 执行删除**

```powershell
Remove-Item src/frontend/chapters/chapter-ai*-zh.html
```

**Step 3: 验证删除成功**

```powershell
Get-ChildItem src/frontend/chapters/chapter-ai*-zh.html
```

**预期输出:** 无文件

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove AI series Chinese version chapter pages"
```

---

### Task 3: 删除无效的其他系列书籍HTML页面

**Files:**
- Delete: `src/frontend/books/preset-adventure-003*.html`
- Delete: `src/frontend/books/preset-adventure-004*.html`
- Delete: `src/frontend/books/preset-adventure-006*.html`
- Delete: `src/frontend/books/preset-fantasy-003*.html`
- Delete: `src/frontend/books/preset-fantasy-004*.html`
- Delete: `src/frontend/books/preset-fantasy-006*.html`
- Delete: `src/frontend/books/preset-romance-003*.html`
- Delete: `src/frontend/books/preset-romance-004*.html`
- Delete: `src/frontend/books/preset-romance-006*.html`
- Delete: `src/frontend/books/preset-business-003*.html`
- Delete: `src/frontend/books/preset-business-004*.html`
- Delete: `src/frontend/books/preset-business-006*.html`
- Delete: `src/frontend/books/now.html`

**Step 1: 列出要删除的文件确认**

```powershell
Get-ChildItem src/frontend/books/preset-adventure-003*.html, src/frontend/books/preset-adventure-004*.html, src/frontend/books/preset-adventure-006*.html, src/frontend/books/preset-fantasy-003*.html, src/frontend/books/preset-fantasy-004*.html, src/frontend/books/preset-fantasy-006*.html, src/frontend/books/preset-romance-003*.html, src/frontend/books/preset-romance-004*.html, src/frontend/books/preset-romance-006*.html, src/frontend/books/preset-business-003*.html, src/frontend/books/preset-business-004*.html, src/frontend/books/preset-business-006*.html, src/frontend/books/now.html | ForEach-Object { $_.Name }
```

**预期输出:** 约25个文件名

**Step 2: 执行删除**

```powershell
Remove-Item src/frontend/books/preset-adventure-003*.html, src/frontend/books/preset-adventure-004*.html, src/frontend/books/preset-adventure-006*.html, src/frontend/books/preset-fantasy-003*.html, src/frontend/books/preset-fantasy-004*.html, src/frontend/books/preset-fantasy-006*.html, src/frontend/books/preset-romance-003*.html, src/frontend/books/preset-romance-004*.html, src/frontend/books/preset-romance-006*.html, src/frontend/books/preset-business-003*.html, src/frontend/books/preset-business-004*.html, src/frontend/books/preset-business-006*.html, src/frontend/books/now.html
```

**Step 3: 验证删除成功**

```powershell
Get-ChildItem src/frontend/books/ | Where-Object { $_.Name -match '003|004|006|now' }
```

**预期输出:** 无文件

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove invalid book pages (003-006 series without DB data)"
```

---

### Task 4: 删除无效的其他系列章节HTML页面

**Files:**
- Delete: `src/frontend/chapters/chapter-adv003*.html`
- Delete: `src/frontend/chapters/chapter-adv004*.html`
- Delete: `src/frontend/chapters/chapter-adv006*.html`
- Delete: `src/frontend/chapters/chapter-fan003*.html`
- Delete: `src/frontend/chapters/chapter-fan004*.html`
- Delete: `src/frontend/chapters/chapter-fan006*.html`
- Delete: `src/frontend/chapters/chapter-rom003*.html`
- Delete: `src/frontend/chapters/chapter-rom004*.html`
- Delete: `src/frontend/chapters/chapter-rom006*.html`
- Delete: `src/frontend/chapters/chapter-bus003*.html`
- Delete: `src/frontend/chapters/chapter-bus004*.html`
- Delete: `src/frontend/chapters/chapter-bus006*.html`

**Step 1: 列出要删除的文件确认**

```powershell
Get-ChildItem src/frontend/chapters/chapter-adv003*.html, src/frontend/chapters/chapter-adv004*.html, src/frontend/chapters/chapter-adv006*.html, src/frontend/chapters/chapter-fan003*.html, src/frontend/chapters/chapter-fan004*.html, src/frontend/chapters/chapter-fan006*.html, src/frontend/chapters/chapter-rom003*.html, src/frontend/chapters/chapter-rom004*.html, src/frontend/chapters/chapter-rom006*.html, src/frontend/chapters/chapter-bus003*.html, src/frontend/chapters/chapter-bus004*.html, src/frontend/chapters/chapter-bus006*.html | Measure-Object
```

**预期输出:** 约240个文件

**Step 2: 执行删除**

```powershell
Remove-Item src/frontend/chapters/chapter-adv003*.html, src/frontend/chapters/chapter-adv004*.html, src/frontend/chapters/chapter-adv006*.html, src/frontend/chapters/chapter-fan003*.html, src/frontend/chapters/chapter-fan004*.html, src/frontend/chapters/chapter-fan006*.html, src/frontend/chapters/chapter-rom003*.html, src/frontend/chapters/chapter-rom004*.html, src/frontend/chapters/chapter-rom006*.html, src/frontend/chapters/chapter-bus003*.html, src/frontend/chapters/chapter-bus004*.html, src/frontend/chapters/chapter-bus006*.html
```

**Step 3: 验证删除成功**

```powershell
Get-ChildItem src/frontend/chapters/ | Where-Object { $_.Name -match 'adv003|adv004|adv006|fan003|fan004|fan006|rom003|rom004|rom006|bus003|bus004|bus006' } | Measure-Object
```

**预期输出:** 0个文件

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove invalid chapter pages (003-006 series without DB data)"
```

---

## 第二阶段：删除本地数据库记录

### Task 5: 创建数据库备份迁移文件

**Files:**
- Create: `migrations/0600_backup_before_cleanup.sql`

**Step 1: 创建备份迁移文件**

```sql
-- 备份AI系列中文书籍数据（删除前）
-- 创建时间: 2026-03-17

CREATE TABLE IF NOT EXISTS books_backup_20260317 AS 
SELECT * FROM books WHERE book_id LIKE 'preset-ai-%-zh';

CREATE TABLE IF NOT EXISTS characters_backup_20260317 AS 
SELECT * FROM characters WHERE book_id LIKE 'preset-ai-%-zh';

CREATE TABLE IF NOT EXISTS chapters_backup_20260317 AS 
SELECT * FROM chapters WHERE book_id LIKE 'preset-ai-%-zh';

CREATE TABLE IF NOT EXISTS plot_cards_backup_20260317 AS 
SELECT * FROM plot_cards WHERE book_id LIKE 'preset-ai-%-zh';

CREATE TABLE IF NOT EXISTS puzzles_backup_20260317 AS 
SELECT * FROM puzzles WHERE chapter_id IN (
  SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-ai-%-zh'
);
```

**Step 2: 执行备份迁移（本地）**

```bash
npx wrangler d1 execute storybook_database --local --file=./migrations/0600_backup_before_cleanup.sql
```

**预期输出:** 成功创建备份表

**Step 3: 提交**

```bash
git add migrations/0600_backup_before_cleanup.sql
git commit -m "chore: add backup migration before cleanup"
```

---

### Task 6: 创建删除迁移文件

**Files:**
- Create: `migrations/0601_cleanup_ai_chinese_books.sql`

**Step 1: 创建删除迁移文件**

```sql
-- 删除AI系列中文书籍及相关数据
-- 执行时间: 2026-03-17

-- 1. 删除谜题（依赖章节）
DELETE FROM puzzles WHERE chapter_id IN (
  SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-ai-%-zh'
);

-- 2. 删除章节
DELETE FROM chapters WHERE book_id LIKE 'preset-ai-%-zh';

-- 3. 删除情节卡牌
DELETE FROM plot_cards WHERE book_id LIKE 'preset-ai-%-zh';

-- 4. 删除角色
DELETE FROM characters WHERE book_id LIKE 'preset-ai-%-zh';

-- 5. 删除书籍
DELETE FROM books WHERE book_id LIKE 'preset-ai-%-zh';

-- 验证删除结果
SELECT 'Remaining AI Chinese books:' as info;
SELECT book_id, title FROM books WHERE book_id LIKE 'preset-ai-%-zh';

SELECT 'Remaining AI Chinese chapters:' as info;
SELECT chapter_id, title FROM chapters WHERE book_id LIKE 'preset-ai-%-zh';

SELECT 'Remaining AI Chinese characters:' as info;
SELECT char_id, name FROM characters WHERE book_id LIKE 'preset-ai-%-zh';

SELECT 'Remaining AI Chinese plot_cards:' as info;
SELECT card_id, name FROM plot_cards WHERE book_id LIKE 'preset-ai-%-zh';
```

**Step 2: 提交**

```bash
git add migrations/0601_cleanup_ai_chinese_books.sql
git commit -m "chore: add cleanup migration for AI Chinese books"
```

---

### Task 7: 执行删除迁移（本地）

**Step 1: 执行迁移（本地）**

```bash
npx wrangler d1 execute storybook_database --local --file=./migrations/0601_cleanup_ai_chinese_books.sql
```

**预期输出:** 
- 删除23本书籍
- 删除相关章节、角色、情节卡牌
- 验证查询返回空结果

**Step 2: 验证本地数据**

```bash
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-ai-%-zh'"
```

**预期输出:** count = 0

**Step 3: 验证保留的书籍**

```bash
npx wrangler d1 execute storybook_database --local --command "SELECT book_id, title FROM books WHERE is_preset = 1 ORDER BY book_id"
```

**预期输出:** 39本书籍（AI英文23本 + 其他系列16本）

---

## 第三阶段：重新生成静态页面

### Task 8: 更新生成脚本（如需要）

**Files:**
- Modify: `scripts/generate-from-db.js`

**Step 1: 检查生成脚本是否需要修改**

检查脚本是否正确处理保留的书籍类型

**Step 2: 如需修改，更新脚本**

确保脚本只生成数据库中存在的书籍页面

**Step 3: 提交（如有修改）**

```bash
git add scripts/generate-from-db.js
git commit -m "fix: update generate script for cleanup"
```

---

### Task 9: 重新生成静态页面

**Step 1: 运行生成脚本**

```bash
node scripts/generate-from-db.js
```

**预期输出:** 生成39本书籍页面和对应章节页面

**Step 2: 验证生成的文件**

```powershell
Get-ChildItem src/frontend/books/preset-*.html | Measure-Object
```

**预期输出:** 约39个文件（保留的书籍）

**Step 3: 提交**

```bash
git add -A
git commit -m "chore: regenerate static pages after cleanup"
```

---

## 第四阶段：清理迁移文件

### Task 10: 删除临时迁移文件

**Files:**
- Delete: `migrations/temp_*.sql`

**Step 1: 列出临时文件**

```powershell
Get-ChildItem migrations/temp_*.sql | ForEach-Object { $_.Name }
```

**Step 2: 删除临时文件**

```powershell
Remove-Item migrations/temp_*.sql
```

**Step 3: 提交**

```bash
git add -A
git commit -m "chore: remove temp migration files"
```

---

### Task 11: 更新清理报告

**Files:**
- Modify: `doc/preset-books-cleanup-report.md`

**Step 1: 更新检查清单**

将所有检查项标记为已完成

**Step 2: 添加执行记录**

记录执行时间、结果等信息

**Step 3: 提交**

```bash
git add doc/preset-books-cleanup-report.md
git commit -m "docs: update cleanup report with execution results"
```

---

## 执行顺序总结

| 阶段 | Task | 描述 | 风险 |
|------|------|------|------|
| **第零阶段** | 0.1-0.6 | 备份数据库和代码 | 🟢 低 |
| 第一阶段 | 1-4 | 删除静态文件 | 🟢 低 |
| 第二阶段 | 5-7 | 删除本地数据库记录 | 🟡 中 |
| 第三阶段 | 8-9 | 重新生成静态页面 | 🟢 低 |
| 第四阶段 | 10-11 | 清理迁移文件 | 🟢 低 |

---

## 回滚方案

如果执行过程中出现问题：

### 从GitHub恢复备份
```bash
git checkout backup-before-cleanup-2026-03-17
```

### 静态文件回滚
```bash
git checkout HEAD~1 -- src/frontend/books/
git checkout HEAD~1 -- src/frontend/chapters/
```

### 本地数据库回滚
```bash
npx wrangler d1 execute storybook_database --local --file=backup/local-db-backup-2026-03-17.sql
```

---

## 注意事项

1. **第零阶段必须先执行** - 备份是所有操作的前提
2. **本计划仅涉及本地操作** - 不影响线上环境
3. **建议分阶段执行** - 先执行备份和静态文件清理，确认无误后再执行数据库操作
4. **保持频繁提交** - 每个Task完成后立即提交，便于回滚
5. **线上操作需另行安排** - 线上数据库删除和部署需要单独的计划
