# AI系列英文书籍逐本验证修复计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 逐本验证和修复所有23本AI系列英文书籍，确保每本书有8章以上、内容长度≥1500字符、类型正确，并通过Playwright端到端测试验证页面内容。

**Architecture:** 
1. 每本书独立处理：数据库验证 → 类型更新 → 章节修复 → 静态页面生成 → Playwright测试
2. 使用验证脚本检查数据库状态
3. 使用Playwright测试验证实际页面内容
4. 一本通过后才处理下一本

**Tech Stack:** Node.js, Wrangler CLI (Cloudflare D1), Playwright, SQLite

---

## 前置条件

- 开发服务器运行在 http://127.0.0.1:8788
- 数据库使用 storybook_database (本地D1数据库)
- Playwright 已安装配置
- 跳过所有中文版本书籍

---

## 验证标准

| 检查项 | 标准 |
|--------|------|
| 章节数量 | ≥8章 |
| 内容长度 | ≥1500字符/章 |
| 书籍类型 | 按内容主题分类 |
| 静态页面 | 必须生成成功 |
| Playwright测试 | 必须全部通过 |

---

## 书籍类型分类

| 书籍ID | 类型 | 书籍ID | 类型 | 书籍ID | 类型 |
|--------|------|--------|------|--------|------|
| preset-ai-001 | business | preset-ai-009 | romance | preset-ai-017 | business |
| preset-ai-002 | business | preset-ai-010 | romance | preset-ai-018 | business |
| preset-ai-003 | business | preset-ai-011 | business | preset-ai-019 | business |
| preset-ai-004 | business | preset-ai-012 | fantasy | preset-ai-020 | fantasy |
| preset-ai-005 | business | preset-ai-013 | fantasy | preset-ai-021 | fantasy |
| preset-ai-006 | romance | preset-ai-014 | business | preset-ai-022 | fantasy |
| preset-ai-007 | romance | preset-ai-015 | fantasy | preset-ai-023 | fantasy |
| preset-ai-008 | romance | preset-ai-016 | business | | |

---

## Task 1: preset-ai-001 验证和修复

**当前状态:** 8章, min_len=1530, type=business ✓

**Step 1: 验证数据库状态**
Run: `npx wrangler d1 execute storybook_database --local --command "SELECT book_id, type, COUNT(*) as cnt, MIN(LENGTH(content)) as min_len FROM chapters ch JOIN books b ON ch.book_id = b.book_id WHERE b.book_id = 'preset-ai-001' GROUP BY b.book_id"`
Expected: type=business, cnt≥8, min_len≥1500

**Step 2: 生成静态页面**
Run: `node scripts/generate-preset-pages.js`
Expected: 生成成功

**Step 3: 启动开发服务器**
Run: `npm run dev` (后台运行)
Expected: 服务器运行在 http://127.0.0.1:8788

**Step 4: 运行Playwright测试**
Run: `npx playwright test tests/e2e/ai-book-validation.spec.js -g "preset-ai-001" --reporter=list`
Expected: 所有测试通过

**Step 5: 如果测试失败，检查并修复**
- 检查页面内容是否正确显示
- 检查章节链接是否有效
- 检查内容长度是否符合预期

---

## Task 2: preset-ai-002 验证和修复

**当前状态:** 7章, min_len=2290, type=story ✗

**Step 1: 验证数据库状态**
Run: `npx wrangler d1 execute storybook_database --local --command "SELECT book_id, type FROM books WHERE book_id = 'preset-ai-002'"`
Expected: 需要更新类型为business

**Step 2: 更新书籍类型**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-002'"`
Expected: 类型更新成功

**Step 3: 检查章节数量**
Run: `npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as cnt FROM chapters WHERE book_id = 'preset-ai-002'"`
Expected: 7章，需要补充到8章

**Step 4: 创建补充章节migration**
File: `migrations/0501_add_preset_ai_002_chapter8.sql`
内容: 添加第8章，内容≥1500字符

**Step 5: 执行migration**
Run: `npx wrangler d1 execute storybook_database --local --file migrations/0501_add_preset_ai_002_chapter8.sql`
Expected: 章节添加成功

**Step 6: 重新验证**
Run: `npx wrangler d1 execute storybook_database --local --command "SELECT COUNT(*) as cnt, MIN(LENGTH(content)) as min_len FROM chapters WHERE book_id = 'preset-ai-002'"`
Expected: cnt=8, min_len≥1500

**Step 7: 生成静态页面**
Run: `node scripts/generate-preset-pages.js`
Expected: 生成成功

**Step 8: 运行Playwright测试**
Run: `npx playwright test tests/e2e/ai-book-validation.spec.js -g "preset-ai-002" --reporter=list`
Expected: 所有测试通过

---

## Task 3: preset-ai-003 验证和修复

**当前状态:** 4章, min_len=1255, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-003'"`

**Step 2: 检查章节问题**
- 章节数量: 4章 → 需要补充到8章
- 内容长度: min_len=1255 → 需要扩展到≥1500

**Step 3: 创建完整章节migration**
File: `migrations/0502_fix_preset_ai_003.sql`
内容: 删除现有章节，重新插入8章完整内容

**Step 4: 执行migration并验证**
Run: `npx wrangler d1 execute storybook_database --local --file migrations/0502_fix_preset_ai_003.sql`

**Step 5: 生成静态页面并测试**
Run: `node scripts/generate-preset-pages.js`
Run: `npx playwright test tests/e2e/ai-book-validation.spec.js -g "preset-ai-003" --reporter=list`

---

## Task 4: preset-ai-004 验证和修复

**当前状态:** 8章, min_len=756, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-004'"`

**Step 2: 检查短章节**
Run: `npx wrangler d1 execute storybook_database --local --command "SELECT chapter_id, LENGTH(content) as len FROM chapters WHERE book_id = 'preset-ai-004' AND LENGTH(content) < 1500 ORDER BY order_num"`

**Step 3: 创建扩展章节migration**
File: `migrations/0503_expand_preset_ai_004.sql`
内容: 扩展所有短章节到≥1500字符

**Step 4: 执行migration并验证**
Run: `npx wrangler d1 execute storybook_database --local --file migrations/0503_expand_preset_ai_004.sql`

**Step 5: 生成静态页面并测试**
Run: `node scripts/generate-preset-pages.js`
Run: `npx playwright test tests/e2e/ai-book-validation.spec.js -g "preset-ai-004" --reporter=list`

---

## Task 5: preset-ai-005 验证和修复

**当前状态:** 6章, min_len=1744, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-005'"`

**Step 2: 补充章节到8章**
File: `migrations/0504_add_preset_ai_005_chapters.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 6: preset-ai-006 验证和修复

**当前状态:** 6章, min_len=1829, type=story ✗

**Step 1: 更新类型为romance**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'romance' WHERE book_id = 'preset-ai-006'"`

**Step 2: 补充章节到8章**
File: `migrations/0505_add_preset_ai_006_chapters.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 7: preset-ai-007 验证和修复

**当前状态:** 6章, min_len=1827, type=story ✗

**Step 1: 更新类型为romance**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'romance' WHERE book_id = 'preset-ai-007'"`

**Step 2: 补充章节到8章**
File: `migrations/0506_add_preset_ai_007_chapters.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 8: preset-ai-008 验证和修复

**当前状态:** 6章, min_len=1268, type=story ✗

**Step 1: 更新类型为romance**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'romance' WHERE book_id = 'preset-ai-008'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0507_fix_preset_ai_008.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 9: preset-ai-009 验证和修复

**当前状态:** 6章, min_len=1081, type=story ✗

**Step 1: 更新类型为romance**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'romance' WHERE book_id = 'preset-ai-009'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0508_fix_preset_ai_009.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 10: preset-ai-010 验证和修复

**当前状态:** 4章, min_len=968, type=story ✗

**Step 1: 更新类型为romance**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'romance' WHERE book_id = 'preset-ai-010'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0509_fix_preset_ai_010.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 11: preset-ai-011 验证和修复

**当前状态:** 4章, min_len=1107, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-011'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0510_fix_preset_ai_011.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 12: preset-ai-012 验证和修复

**当前状态:** 3章, min_len=798, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-012'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0511_fix_preset_ai_012.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 13: preset-ai-013 验证和修复

**当前状态:** 3章, min_len=905, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-013'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0512_fix_preset_ai_013.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 14: preset-ai-014 验证和修复

**当前状态:** 3章, min_len=651, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-014'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0513_fix_preset_ai_014.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 15: preset-ai-015 验证和修复

**当前状态:** 3章, min_len=601, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-015'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0514_fix_preset_ai_015.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 16: preset-ai-016 验证和修复

**当前状态:** 3章, min_len=827, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-016'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0515_fix_preset_ai_016.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 17: preset-ai-017 验证和修复

**当前状态:** 2章, min_len=643, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-017'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0516_fix_preset_ai_017.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 18: preset-ai-018 验证和修复

**当前状态:** 2章, min_len=639, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-018'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0517_fix_preset_ai_018.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 19: preset-ai-019 验证和修复

**当前状态:** 2章, min_len=506, type=story ✗

**Step 1: 更新类型为business**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'business' WHERE book_id = 'preset-ai-019'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0518_fix_preset_ai_019.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 20: preset-ai-020 验证和修复

**当前状态:** 3章, min_len=568, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-020'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0519_fix_preset_ai_020.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 21: preset-ai-021 验证和修复

**当前状态:** 2章, min_len=533, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-021'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0520_fix_preset_ai_021.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 22: preset-ai-022 验证和修复

**当前状态:** 2章, min_len=535, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-022'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0521_fix_preset_ai_022.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 23: preset-ai-023 验证和修复

**当前状态:** 2章, min_len=660, type=story ✗

**Step 1: 更新类型为fantasy**
Run: `npx wrangler d1 execute storybook_database --local --command "UPDATE books SET type = 'fantasy' WHERE book_id = 'preset-ai-023'"`

**Step 2: 补充章节到8章并扩展短章节**
File: `migrations/0522_fix_preset_ai_023.sql`

**Step 3: 执行migration并验证**

**Step 4: 生成静态页面并测试**

---

## Task 24: 最终验证

**Step 1: 验证所有书籍状态**
Run: `npx wrangler d1 execute storybook_database --local --command "SELECT book_id, type, COUNT(*) as cnt, MIN(LENGTH(content)) as min_len FROM chapters ch JOIN books b ON ch.book_id = b.book_id WHERE b.book_id LIKE 'preset-ai-%' AND b.book_id NOT LIKE '%-zh' GROUP BY b.book_id ORDER BY b.book_id"`
Expected: 所有书籍 cnt≥8, min_len≥1500, type正确

**Step 2: 运行所有Playwright测试**
Run: `npx playwright test tests/e2e/ai-book-validation.spec.js --reporter=list`
Expected: 所有测试通过

**Step 3: 生成最终报告**
输出所有书籍的验证结果

---

## 每本书的标准处理流程

```
1. 检查当前状态
   ↓
2. 更新类型（如需要）
   ↓
3. 检查章节数量和长度
   ↓
4. 创建migration文件（如需要）
   - 补充缺失章节
   - 扩展短章节
   ↓
5. 执行migration
   ↓
6. 验证数据库状态
   ↓
7. 生成静态页面
   ↓
8. 运行Playwright测试
   ↓
9. 如果失败，修复并重试
   ↓
10. 标记完成，进入下一本
```
