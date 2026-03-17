# 预设书籍清理实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 清理无效的预设书籍数据，保留线上已有书籍 + AI系列英文版，删除AI系列中文版，同步线上缺失数据到本地

**Architecture:** 
1. 备份数据库和代码（安全第一）
2. 同步线上缺失数据到本地（新增）
3. 删除静态HTML文件（无风险）
4. 删除本地数据库记录及相关数据（需谨慎）
5. 重新生成静态页面确保一致性

**Tech Stack:** Cloudflare D1 (SQLite), Node.js, Wrangler CLI, Git

---

## ⚠️ 重要安全要求

### 🔴 严格限制：只操作线下，禁止操作线上

| 操作类型 | 线下（本地） | 线上（远程） |
|----------|-------------|-------------|
| 数据库读取 | ✅ 允许 | ✅ 允许（仅读取/导出） |
| 数据库写入 | ✅ 允许 | ❌ **禁止** |
| 数据库删除 | ✅ 允许 | ❌ **禁止** |
| 静态文件修改 | ✅ 允许 | ❌ **禁止** |
| Git推送 | ✅ 允许 | ✅ 允许 |

### 质检原则

每一步操作后必须执行质检，确认：
1. **操作结果符合预期** - 实际结果与预期一致
2. **无副作用** - 没有误删或误改其他数据
3. **数据完整性** - 相关数据保持完整
4. **可回滚** - 确保有备份可恢复

---

**📊 文件统计更新 (2026-03-17 第三次验证 - 修正版):**
- 总删除文件数: **144个** (原280个 → 修正减少136个)
- **修正**: 其他系列(003/004/006)文件保留，这些是线上有效的书籍
- **新增**: 同步线上003/004/006系列数据到本地数据库
- 删除范围: 仅AI系列中文版

---

## 第零阶段：备份（必须先执行）

### Task 0.1: 导出线上数据库表到SQL文件

**Files:**
- Create: `backups/remote_storybook_database_backup.sql`

**Step 1: 确认备份目录存在**

```powershell
New-Item -ItemType Directory -Force -Path backups
```

**Step 2: 导出线上数据库数据（只读操作）**

```bash
npx wrangler d1 export storybook_database --remote --output backups/remote_storybook_database_backup.sql
```

**Step 3: 质检 - 验证备份文件**

```powershell
# 检查文件是否存在
Test-Path backups/remote_storybook_database_backup.sql

# 检查文件大小
(Get-Item backups/remote_storybook_database_backup.sql).Length

# 检查文件内容是否包含关键表
Select-String -Path backups/remote_storybook_database_backup.sql -Pattern "CREATE TABLE books" | Select-Object -First 1
Select-String -Path backups/remote_storybook_database_backup.sql -Pattern "CREATE TABLE chapters" | Select-Object -First 1
Select-String -Path backups/remote_storybook_database_backup.sql -Pattern "CREATE TABLE characters" | Select-Object -First 1
```

**质检标准:**
- [ ] 文件存在
- [ ] 文件大小 > 10KB
- [ ] 包含 books, chapters, characters 表定义
- [ ] 包含 INSERT 语句

**预期输出:** 生成完整的线上数据库备份文件

---

### Task 0.2: 导出本地数据库表到SQL文件

**Files:**
- Create: `backups/local_storybook_database_backup.sql`

**Step 1: 导出本地数据库数据**

```bash
npx wrangler d1 export storybook_database --local --output backups/local_storybook_database_backup.sql
```

**Step 2: 质检 - 验证备份文件**

```powershell
# 检查文件是否存在
Test-Path backups/local_storybook_database_backup.sql

# 检查文件大小
(Get-Item backups/local_storybook_database_backup.sql).Length

# 统计书籍数量
(Select-String -Path backups/local_storybook_database_backup.sql -Pattern "INSERT INTO .books.").Count
```

**质检标准:**
- [ ] 文件存在
- [ ] 文件大小 > 10KB
- [ ] 包含书籍数据（约62条INSERT）

**预期输出:** 生成完整的本地数据库备份文件

---

### Task 0.3: 验证备份文件完整性

**Step 1: 对比两个备份文件**

```powershell
# 列出两个备份文件信息
Get-ChildItem backups/*.sql | Select-Object Name, Length, LastWriteTime

# 检查线上备份是否包含003/004/006系列
Select-String -Path backups/remote_storybook_database_backup.sql -Pattern "preset-adventure-003|preset-adventure-004|preset-fantasy-003|preset-fantasy-004|preset-romance-003|preset-romance-004|preset-business-003|preset-business-004" | Measure-Object
```

**Step 2: 质检 - 确认备份完整**

```powershell
# 统计线上备份中的书籍数量
(Select-String -Path backups/remote_storybook_database_backup.sql -Pattern "INSERT INTO .books.").Count

# 统计本地备份中的书籍数量
(Select-String -Path backups/local_storybook_database_backup.sql -Pattern "INSERT INTO .books.").Count
```

**质检标准:**
- [ ] 两个备份文件都存在
- [ ] 两个文件大小都 > 10KB
- [ ] 线上备份包含更多书籍（包含003/004系列）
- [ ] 记录线上备份书籍数量和本地备份书籍数量的差异

---

### Task 0.4: 提交备份文件到main分支

**Step 1: 确保在main分支**

```bash
git checkout main
```

**Step 2: 添加备份文件**

```bash
git add backups/
```

**Step 3: 提交备份**

```bash
git commit -m "backup: add database backup before cleanup (2026-03-17)"
```

**Step 4: 质检 - 验证提交**

```bash
# 检查最新提交
git log -1 --oneline

# 检查提交内容
git show --stat HEAD
```

**质检标准:**
- [ ] 提交成功
- [ ] 提交信息正确
- [ ] 包含两个备份文件

---

### Task 0.5: 同步到GitHub

**Step 1: 推送到GitHub**

```bash
git push origin main
```

**Step 2: 质检 - 验证推送**

```bash
# 检查远程状态
git remote -v

# 检查本地和远程同步状态
git status
```

**质检标准:**
- [ ] 推送成功
- [ ] 本地和远程同步

**预期输出:** 成功推送到GitHub

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

**Step 3: 质检 - 验证标签**

```bash
# 列出所有标签
git tag -l

# 查看标签详情
git show backup-before-cleanup-2026-03-17
```

**质检标准:**
- [ ] 标签创建成功
- [ ] 标签推送到GitHub成功
- [ ] 标签信息正确

**预期输出:** 标签已创建并推送到GitHub

---

## 第零点五阶段：同步线上缺失数据到本地（新增）

### Task 0.7: 从线上备份提取003/004/006系列数据

**Files:**
- Create: `migrations/sync_online_data_003_004_006.sql`

**Step 1: 分析线上备份数据**

```powershell
# 检查线上备份中003/004系列书籍
Select-String -Path backups/remote_storybook_database_backup.sql -Pattern "preset-adventure-003|preset-adventure-004|preset-fantasy-003|preset-fantasy-004|preset-romance-003|preset-romance-004|preset-business-003|preset-business-004" | ForEach-Object { $_.Line.Substring(0, [Math]::Min(200, $_.Line.Length)) }
```

**Step 2: 创建同步SQL文件**

从线上备份中提取以下数据创建 `migrations/sync_online_data_003_004_006.sql`:
- books 表: 003, 004 系列书籍（中英文）
- characters 表: 相关角色
- chapters 表: 相关章节
- plot_cards 表: 相关情节卡牌
- puzzles 表: 相关谜题

**Step 3: 质检 - 验证同步文件**

```powershell
# 检查文件是否存在
Test-Path migrations/sync_online_data_003_004_006.sql

# 统计INSERT语句数量
(Select-String -Path migrations/sync_online_data_003_004_006.sql -Pattern "INSERT INTO").Count

# 检查是否包含预期的书籍ID
Select-String -Path migrations/sync_online_data_003_004_006.sql -Pattern "preset-adventure-003|preset-fantasy-003|preset-romance-003|preset-business-003" | Measure-Object
```

**质检标准:**
- [ ] 同步文件创建成功
- [ ] 包含 books INSERT 语句（至少16条：4系列 x 2书籍 x 2语言）
- [ ] 包含 characters INSERT 语句
- [ ] 包含预期的书籍ID

---

### Task 0.8: 执行数据同步到本地数据库

**⚠️ 安全检查：确认只操作本地数据库**

```bash
# 确认命令包含 --local 参数，不是 --remote
echo "确认：以下命令使用 --local 参数，只操作本地数据库"
```

**Step 1: 执行同步SQL（本地）**

```bash
npx wrangler d1 execute storybook_database --local --file=./migrations/sync_online_data_003_004_006.sql
```

**Step 2: 质检 - 验证同步结果**

```bash
# 检查新增的书籍数量
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-adventure-00%' OR book_id LIKE 'preset-fantasy-00%' OR book_id LIKE 'preset-romance-00%' OR book_id LIKE 'preset-business-00%'"

# 列出新增的书籍
npx wrangler d1 execute storybook_database --local --command "SELECT book_id, title FROM books WHERE book_id LIKE 'preset-adventure-00%' OR book_id LIKE 'preset-fantasy-00%' OR book_id LIKE 'preset-romance-00%' OR book_id LIKE 'preset-business-00%' ORDER BY book_id"

# 检查新增的角色数量
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as count FROM characters WHERE book_id LIKE 'preset-adventure-00%' OR book_id LIKE 'preset-fantasy-00%' OR book_id LIKE 'preset-romance-00%' OR book_id LIKE 'preset-business-00%'"
```

**Step 3: 质检 - 确认线上数据未被修改**

```bash
# 查询线上数据库书籍数量（只读查询）
npx wrangler d1 execute storybook_database --remote --command "SELECT COUNT(*) as count FROM books WHERE is_preset = 1"

# 对比本地和线上数据
echo "线上预设书籍数量应该与同步前一致"
```

**质检标准:**
- [ ] 本地新增书籍数量正确（约16本）
- [ ] 新增书籍ID符合预期（003, 004系列）
- [ ] 新增角色数量正确
- [ ] **线上数据未被修改**（只读验证）

**Step 4: 提交**

```bash
git add migrations/sync_online_data_003_004_006.sql
git commit -m "chore: add sync migration for online 003/004/006 series data"
```

---

## 第一阶段：删除无效静态文件

### Task 1: 删除AI系列中文版书籍HTML页面（23个文件）

**Files:**
- Delete: `src/frontend/books/preset-ai-001-zh.html` ~ `preset-ai-023-zh.html`

**Step 1: 质检 - 列出要删除的文件确认**

```powershell
# 列出所有AI中文书籍页面
Get-ChildItem src/frontend/books/preset-ai-*-zh.html | ForEach-Object { $_.Name }

# 统计数量
Get-ChildItem src/frontend/books/preset-ai-*-zh.html | Measure-Object
```

**质检标准:**
- [ ] 文件数量为23个
- [ ] 所有文件名符合 `preset-ai-XXX-zh.html` 格式

**Step 2: 执行删除**

```powershell
Remove-Item src/frontend/books/preset-ai-*-zh.html
```

**Step 3: 质检 - 验证删除成功**

```powershell
# 确认文件已删除
Get-ChildItem src/frontend/books/preset-ai-*-zh.html | Measure-Object

# 确认AI英文版书籍页面保留
Get-ChildItem src/frontend/books/preset-ai-*.html | Where-Object { $_.Name -notmatch '-zh' } | Measure-Object

# 确认其他系列书籍页面保留
Get-ChildItem src/frontend/books/preset-adventure*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-fantasy*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-romance*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-business*.html | Measure-Object
```

**质检标准:**
- [ ] AI中文书籍页面数量为0
- [ ] AI英文书籍页面数量为23个
- [ ] 其他系列页面完整保留

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove AI series Chinese version book pages (23 files)"
```

**Step 5: 质检 - 验证提交**

```bash
git show --stat HEAD
```

**质检标准:**
- [ ] 提交包含23个文件删除
- [ ] 没有误删其他文件

---

### Task 2: 删除AI系列中文版章节HTML页面（119个文件，两种格式）

**Files:**
- Delete: `src/frontend/chapters/chapter-ai*-zh.html` (约60个)
- Delete: `src/frontend/chapters/preset-ai-*-zh-ch*.html` (约59个)

**Step 1: 质检 - 列出要删除的文件确认**

```powershell
# 格式1: chapter-aiXXX-YY-zh.html
Get-ChildItem src/frontend/chapters/chapter-ai*-zh.html | Measure-Object

# 格式2: preset-ai-XXX-zh-chYY.html
Get-ChildItem src/frontend/chapters/preset-ai-*-zh-ch*.html | Measure-Object

# 总计
$total = (Get-ChildItem src/frontend/chapters/chapter-ai*-zh.html).Count + (Get-ChildItem src/frontend/chapters/preset-ai-*-zh-ch*.html).Count
Write-Host "总计要删除的文件数: $total"
```

**质检标准:**
- [ ] 格式1文件数量约60个
- [ ] 格式2文件数量约59个
- [ ] 总计约119个文件

**Step 2: 执行删除**

```powershell
# 删除格式1
Remove-Item src/frontend/chapters/chapter-ai*-zh.html

# 删除格式2
Remove-Item src/frontend/chapters/preset-ai-*-zh-ch*.html
```

**Step 3: 质检 - 验证删除成功**

```powershell
# 确认格式1已删除
Get-ChildItem src/frontend/chapters/chapter-ai*-zh.html | Measure-Object

# 确认格式2已删除
Get-ChildItem src/frontend/chapters/preset-ai-*-zh-ch*.html | Measure-Object

# 确认AI英文版章节页面保留
Get-ChildItem src/frontend/chapters/chapter-ai*.html | Where-Object { $_.Name -notmatch '-zh' } | Measure-Object

# 确认其他系列章节页面保留
Get-ChildItem src/frontend/chapters/chapter-adv*.html | Measure-Object
Get-ChildItem src/frontend/chapters/chapter-fan*.html | Measure-Object
Get-ChildItem src/frontend/chapters/chapter-rom*.html | Measure-Object
Get-ChildItem src/frontend/chapters/chapter-bus*.html | Measure-Object
```

**质检标准:**
- [ ] AI中文章节页面（格式1）数量为0
- [ ] AI中文章节页面（格式2）数量为0
- [ ] AI英文章节页面保留
- [ ] 其他系列章节页面保留

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove AI series Chinese version chapter pages (119 files, 2 formats)"
```

**Step 5: 质检 - 验证提交**

```bash
git show --stat HEAD
```

**质检标准:**
- [ ] 提交包含约119个文件删除
- [ ] 没有误删其他文件

---

### Task 3: 删除临时迁移文件（2个文件）

**Files:**
- Delete: `migrations/temp_add_chapters_ai003.sql`
- Delete: `migrations/temp_add_chapter_ai002_08.sql`

**Step 1: 质检 - 列出临时文件**

```powershell
Get-ChildItem migrations/temp_*.sql | ForEach-Object { $_.Name }
```

**质检标准:**
- [ ] 存在2个临时文件

**Step 2: 删除临时文件**

```powershell
Remove-Item migrations/temp_*.sql
```

**Step 3: 质检 - 验证删除成功**

```powershell
# 确认临时文件已删除
Get-ChildItem migrations/temp_*.sql | Measure-Object

# 确认其他迁移文件保留
Get-ChildItem migrations/*.sql | Measure-Object
```

**质检标准:**
- [ ] 临时文件数量为0
- [ ] 其他迁移文件保留

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: remove temp migration files (2 files)"
```

---

## 第二阶段：删除本地数据库记录

### Task 4: 创建删除迁移文件

**Files:**
- Create: `migrations/0601_cleanup_ai_chinese_books.sql`

**Step 1: 创建删除迁移文件**

```sql
-- 删除AI系列中文书籍及相关数据
-- 执行时间: 2026-03-17
-- ⚠️ 注意：此文件只用于本地数据库，不要用于线上

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

**Step 2: 质检 - 验证文件内容**

```powershell
# 检查文件是否存在
Test-Path migrations/0601_cleanup_ai_chinese_books.sql

# 检查是否包含DELETE语句
Select-String -Path migrations/0601_cleanup_ai_chinese_books.sql -Pattern "DELETE FROM"

# 检查是否只删除中文版（包含 -zh 条件）
Select-String -Path migrations/0601_cleanup_ai_chinese_books.sql -Pattern "preset-ai-%-zh"
```

**质检标准:**
- [ ] 文件创建成功
- [ ] 包含5个DELETE语句
- [ ] 所有DELETE条件包含 `-zh` 后缀（只删除中文版）
- [ ] 不包含 `--remote` 或线上操作

**Step 3: 提交**

```bash
git add migrations/0601_cleanup_ai_chinese_books.sql
git commit -m "chore: add cleanup migration for AI Chinese books"
```

---

### Task 5: 执行删除迁移（本地）

**⚠️ 安全检查：确认只操作本地数据库**

```bash
# 确认命令包含 --local 参数，不是 --remote
echo "⚠️ 安全检查：以下命令使用 --local 参数，只操作本地数据库"
echo "命令：npx wrangler d1 execute storybook_database --local --file=./migrations/0601_cleanup_ai_chinese_books.sql"
```

**Step 1: 执行前质检 - 记录当前状态**

```bash
# 记录删除前的AI中文书籍数量
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as ai_zh_books FROM books WHERE book_id LIKE 'preset-ai-%-zh'"

# 记录删除前的AI英文书籍数量（应该保持不变）
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as ai_en_books FROM books WHERE book_id LIKE 'preset-ai-%' AND book_id NOT LIKE 'preset-ai-%-zh'"

# 记录删除前的总书籍数量
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as total_books FROM books WHERE is_preset = 1"
```

**Step 2: 执行迁移（本地）**

```bash
npx wrangler d1 execute storybook_database --local --file=./migrations/0601_cleanup_ai_chinese_books.sql
```

**Step 3: 质检 - 验证删除结果**

```bash
# 验证AI中文书籍已删除（应该为0）
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as ai_zh_books FROM books WHERE book_id LIKE 'preset-ai-%-zh'"

# 验证AI英文书籍保留（应该与删除前一致）
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as ai_en_books FROM books WHERE book_id LIKE 'preset-ai-%' AND book_id NOT LIKE 'preset-ai-%-zh'"

# 验证其他系列书籍保留
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as other_books FROM books WHERE book_id LIKE 'preset-adventure%' OR book_id LIKE 'preset-fantasy%' OR book_id LIKE 'preset-romance%' OR book_id LIKE 'preset-business%'"

# 列出所有保留的预设书籍
npx wrangler d1 execute storybook_database --local --command "SELECT book_id, title FROM books WHERE is_preset = 1 ORDER BY book_id"
```

**Step 4: 质检 - 确认线上数据未被修改**

```bash
# 查询线上数据库书籍数量（只读查询）
npx wrangler d1 execute storybook_database --remote --command "SELECT COUNT(*) as count FROM books WHERE is_preset = 1"

# 查询线上AI中文书籍数量（应该与删除前一致）
npx wrangler d1 execute storybook_database --remote --command "SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-ai-%-zh'"
```

**质检标准:**
- [ ] 本地AI中文书籍数量为0
- [ ] 本地AI英文书籍数量保持23本
- [ ] 本地其他系列书籍保持完整
- [ ] **线上数据未被修改**（只读验证，AI中文书籍数量应该与删除前一致）

---

## 第三阶段：重新生成静态页面

### Task 6: 重新生成静态页面

**Step 1: 质检 - 记录生成前的文件数量**

```powershell
# 记录生成前的书籍页面数量
Get-ChildItem src/frontend/books/preset-*.html | Measure-Object

# 记录生成前的章节页面数量
Get-ChildItem src/frontend/chapters/*.html | Measure-Object
```

**Step 2: 运行生成脚本**

```bash
node scripts/generate-from-db.js
```

**Step 3: 质检 - 验证生成的文件**

```powershell
# 统计生成的书籍页面
Get-ChildItem src/frontend/books/preset-*.html | Measure-Object

# 统计生成的章节页面
Get-ChildItem src/frontend/chapters/*.html | Measure-Object

# 验证AI中文书籍页面不存在
Get-ChildItem src/frontend/books/preset-ai-*-zh.html | Measure-Object

# 验证AI英文书籍页面存在
Get-ChildItem src/frontend/books/preset-ai-*.html | Where-Object { $_.Name -notmatch '-zh' } | Measure-Object

# 验证其他系列页面存在
Get-ChildItem src/frontend/books/preset-adventure*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-fantasy*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-romance*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-business*.html | Measure-Object
```

**质检标准:**
- [ ] AI中文书籍页面数量为0
- [ ] AI英文书籍页面数量为23个
- [ ] 其他系列页面完整
- [ ] 章节页面与书籍匹配

**Step 4: 提交**

```bash
git add -A
git commit -m "chore: regenerate static pages after cleanup and sync"
```

---

## 第四阶段：最终验证和提交

### Task 7: 全面质检

**Step 1: 验证静态文件删除**

```powershell
# 验证AI中文书籍页面已删除
Get-ChildItem src/frontend/books/preset-ai-*-zh.html | Measure-Object

# 验证AI中文章节页面已删除
Get-ChildItem src/frontend/chapters/chapter-ai*-zh.html | Measure-Object
Get-ChildItem src/frontend/chapters/preset-ai-*-zh-ch*.html | Measure-Object
```

**Step 2: 验证保留的文件**

```powershell
# 验证AI英文书籍页面保留
Get-ChildItem src/frontend/books/preset-ai-*.html | Where-Object { $_.Name -notmatch '-zh' } | Measure-Object

# 验证其他系列页面保留（包括003/004/006）
Get-ChildItem src/frontend/books/preset-adventure*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-fantasy*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-romance*.html | Measure-Object
Get-ChildItem src/frontend/books/preset-business*.html | Measure-Object
```

**Step 3: 验证本地数据库**

```bash
# 验证本地AI中文书籍已删除
npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as count FROM books WHERE book_id LIKE 'preset-ai-%-zh'"

# 验证本地保留的书籍
npx wrangler d1 execute storybook_database --local --command "SELECT book_id, title FROM books WHERE is_preset = 1 ORDER BY book_id"
```

**Step 4: 最终确认线上数据未被修改**

```bash
# 查询线上数据库（只读）
npx wrangler d1 execute storybook_database --remote --command "SELECT COUNT(*) as total FROM books WHERE is_preset = 1"
npx wrangler d1 execute storybook_database --remote --command "SELECT COUNT(*) as ai_zh FROM books WHERE book_id LIKE 'preset-ai-%-zh'"
npx wrangler d1 execute storybook_database --remote --command "SELECT COUNT(*) as ai_en FROM books WHERE book_id LIKE 'preset-ai-%' AND book_id NOT LIKE 'preset-ai-%-zh'"
```

**质检标准:**
- [ ] 本地AI中文书籍页面数量为0
- [ ] 本地AI中文章节页面数量为0
- [ ] 本地AI英文书籍页面数量为23个
- [ ] 本地其他系列页面完整
- [ ] 本地AI中文书籍数据库记录为0
- [ ] **线上数据完全未被修改**

---

### Task 8: 更新清理报告

**Files:**
- Modify: `doc/preset-books-cleanup-report.md`

**Step 1: 更新检查清单**

将所有检查项标记为已完成

**Step 2: 添加执行记录**

记录执行时间、结果等信息

**Step 3: 提交**

```bash
git add doc/
git commit -m "docs: update cleanup report with execution results"
```

---

### Task 9: 最终提交和推送

**Step 1: 查看所有变更**

```bash
git status
git log --oneline -10
```

**Step 2: 最终质检 - 确认所有变更符合预期**

```bash
# 查看所有删除的文件
git diff --stat backup-before-cleanup-2026-03-17 HEAD

# 确认没有意外的修改
git diff backup-before-cleanup-2026-03-17 HEAD -- src/frontend/books/ | head -50
```

**Step 3: 推送到GitHub**

```bash
git push origin main
```

**Step 4: 最终质检 - 确认线上数据库未被修改**

```bash
# 最终确认线上数据
npx wrangler d1 execute storybook_database --remote --command "SELECT book_id, title FROM books WHERE is_preset = 1 ORDER BY book_id LIMIT 10"
```

**质检标准:**
- [ ] 所有变更已提交
- [ ] 推送成功
- [ ] **线上数据库完全未被修改**

**预期输出:** 成功推送到GitHub

---

## 执行顺序总结

| 阶段 | Task | 描述 | 文件数 | 风险 | 质检点 |
|------|------|------|--------|------|--------|
| **第零阶段** | 0.1-0.6 | 备份数据库和代码 | - | 🟢 低 | 6个 |
| **第零点五阶段** | 0.7-0.8 | 同步线上缺失数据到本地 | - | 🟡 中 | 4个 |
| 第一阶段 | 1 | 删除AI中文书籍页面 | 23个 | 🟢 低 | 3个 |
| 第一阶段 | 2 | 删除AI中文章节页面 | 119个 | 🟢 低 | 3个 |
| 第一阶段 | 3 | 删除临时迁移文件 | 2个 | 🟢 低 | 2个 |
| 第二阶段 | 4-5 | 删除本地数据库记录 | 38+条 | 🟡 中 | 5个 |
| 第三阶段 | 6 | 重新生成静态页面 | - | 🟢 低 | 3个 |
| 第四阶段 | 7-9 | 最终验证和提交 | - | 🟢 低 | 4个 |
| **总计** | - | - | **144个文件** | - | **30个质检点** |

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
npx wrangler d1 execute storybook_database --local --file=backups/local_storybook_database_backup.sql
```

---

## 注意事项

1. **第零阶段必须先执行** - 备份是所有操作的前提
2. **🔴 严格限制：只操作线下，禁止操作线上** - 所有数据库操作必须使用 `--local` 参数
3. **建议分阶段执行** - 先执行备份和静态文件清理，确认无误后再执行数据库操作
4. **保持频繁提交** - 每个Task完成后立即提交，便于回滚
5. **每步质检** - 每个操作后执行质检，确认结果符合预期
6. **线上只读验证** - 定期查询线上数据库确认未被修改
7. **新增文件格式** - 注意删除 `preset-ai-*-zh-ch*.html` 格式的文件
8. **⚠️ 重要修正** - 其他系列(003/004/006)文件保留，这些是线上有效的书籍
9. **⚠️ 新增任务** - 同步线上003/004/006系列数据到本地数据库
