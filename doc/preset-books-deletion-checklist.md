# 预设书籍清理 - 具体删除清单报告

**日期**: 2026-03-17
**状态**: 待执行
**最后检查时间**: 2026-03-17 (第三次重新验证 - 修正错误)

---

## ⚠️ 重要更正

**之前的分析有误！** 经过第三次验证，发现：

1. **线上数据库有 003、004、006 系列书籍** - 这些书籍是有效的
2. **本地数据库没有 003、004、006 系列书籍数据** - 本地数据不完整
3. **本地静态文件有 003、004、006 系列页面** - 这些页面是有效的

**修正后的删除范围：只删除 AI 系列中文版，不删除其他系列的 003、004、006**

---

## 变更摘要

### 与上次检查相比的变化（修正版）

| 类别 | 上次数量 | 本次数量 | 变化 |
|------|----------|----------|------|
| AI中文书籍页面 | 23个 | 23个 | 无变化 |
| AI中文章节页面 | 50个 | **119个** | **+69个** |
| ~~其他系列书籍页面~~ | ~~24个~~ | **0个（保留）** | **修正：不删除** |
| ~~其他系列章节页面~~ | ~~112个~~ | **0个（保留）** | **修正：不删除** |
| 临时迁移文件 | 2个 | 2个 | 无变化 |
| **总计** | **211个** | **144个** | **减少67个** |

---

## 一、静态文件删除清单（修正版）

### 1.1 AI系列中文版书籍HTML页面（23个文件）

**目录**: `src/frontend/books/`

| 序号 | 文件名 |
|------|--------|
| 1 | preset-ai-001-zh.html |
| 2 | preset-ai-002-zh.html |
| 3 | preset-ai-003-zh.html |
| 4 | preset-ai-004-zh.html |
| 5 | preset-ai-005-zh.html |
| 6 | preset-ai-006-zh.html |
| 7 | preset-ai-007-zh.html |
| 8 | preset-ai-008-zh.html |
| 9 | preset-ai-009-zh.html |
| 10 | preset-ai-010-zh.html |
| 11 | preset-ai-011-zh.html |
| 12 | preset-ai-012-zh.html |
| 13 | preset-ai-013-zh.html |
| 14 | preset-ai-014-zh.html |
| 15 | preset-ai-015-zh.html |
| 16 | preset-ai-016-zh.html |
| 17 | preset-ai-017-zh.html |
| 18 | preset-ai-018-zh.html |
| 19 | preset-ai-019-zh.html |
| 20 | preset-ai-020-zh.html |
| 21 | preset-ai-021-zh.html |
| 22 | preset-ai-022-zh.html |
| 23 | preset-ai-023-zh.html |

---

### 1.2 AI系列中文版章节HTML页面（119个文件）

**目录**: `src/frontend/chapters/`

#### 1.2.1 chapter-aiXXX-YY-zh.html 格式（约60个文件）

删除模式: `chapter-ai*-zh.html`

#### 1.2.2 preset-ai-XXX-zh-chYY.html 格式（约59个文件）

删除模式: `preset-ai-*-zh-ch*.html`

---

### 1.3 临时迁移文件（2个文件）

**目录**: `migrations/`

| 序号 | 文件名 |
|------|--------|
| 1 | temp_add_chapters_ai003.sql |
| 2 | temp_add_chapter_ai002_08.sql |

---

### 1.4 静态文件删除统计（修正版）

| 类别 | 文件数量 |
|------|----------|
| AI系列中文版书籍页面 | 23个 |
| AI系列中文版章节页面 (两种格式) | 119个 |
| 临时迁移文件 | 2个 |
| **总计** | **144个** |

---

## 二、保留的文件（不删除）

### 2.1 其他系列书籍页面（保留）

**原因**: 线上数据库有这些书籍的数据

| 系列 | 书籍ID | 线上状态 |
|------|--------|----------|
| 冒险 | preset-adventure-003 | ✅ 冒险丛林奇遇记 |
| 冒险 | preset-adventure-003-en | ✅ Adventure |
| 冒险 | preset-adventure-004 | ✅ 冒险极地探险队 |
| 冒险 | preset-adventure-006 | ✅ 冒险星际探险家 |
| 奇幻 | preset-fantasy-003 | ✅ 奇幻龙族守护者 |
| 奇幻 | preset-fantasy-004 | ✅ 奇幻魔法学院大逃亡 |
| 奇幻 | preset-fantasy-006 | ✅ 奇幻龙之守护者 |
| 言情 | preset-romance-003 | ✅ 言情咖啡店的邂逅 |
| 言情 | preset-romance-004 | ✅ 言情青梅竹马的重逢 |
| 言情 | preset-romance-006 | ✅ 言情跨越时空的爱 |
| 职场 | preset-business-003 | ✅ 职场创业合伙人 |
| 职场 | preset-business-004 | ✅ 职场职场新人逆袭记 |
| 职场 | preset-business-006 | ✅ 职场创业逆袭 |

### 2.2 本地数据库数据不完整问题

**发现**: 本地数据库缺少 003、004、006 系列书籍的数据

**解决方案**: 从线上数据库同步这些书籍数据到本地

**需要同步的数据**:
- books 表: 003, 004, 006 系列书籍记录
- characters 表: 相关角色数据
- chapters 表: 相关章节数据
- plot_cards 表: 相关情节卡牌数据
- puzzles 表: 相关谜题数据

---

## 三、本地数据库删除清单

### 3.1 书籍表（books）删除内容

**删除条件**: `book_id LIKE 'preset-ai-%-zh'`

**数量**: 23本书籍

---

## 四、删除命令汇总（修正版）

### 4.1 静态文件删除命令

```powershell
# 删除AI系列中文版书籍页面
Remove-Item src/frontend/books/preset-ai-*-zh.html

# 删除AI系列中文版章节页面 (两种格式)
Remove-Item src/frontend/chapters/chapter-ai*-zh.html
Remove-Item src/frontend/chapters/preset-ai-*-zh-ch*.html

# 删除临时迁移文件
Remove-Item migrations/temp_*.sql

# 注意：不删除其他系列(003/004/006)的文件，这些是有效的
```

### 4.2 数据库删除SQL

```sql
-- 删除谜题（依赖章节）
DELETE FROM puzzles WHERE chapter_id IN (
  SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-ai-%-zh'
);

-- 删除章节
DELETE FROM chapters WHERE book_id LIKE 'preset-ai-%-zh';

-- 删除情节卡牌
DELETE FROM plot_cards WHERE book_id LIKE 'preset-ai-%-zh';

-- 删除角色
DELETE FROM characters WHERE book_id LIKE 'preset-ai-%-zh';

-- 删除书籍
DELETE FROM books WHERE book_id LIKE 'preset-ai-%-zh';
```

---

## 五、执行检查清单

- [ ] 确认AI系列中文版书籍页面已删除（23个）
- [ ] 确认AI系列中文版章节页面已删除（119个，两种格式）
- [ ] 确认临时迁移文件已删除（2个）
- [ ] 确认数据库书籍记录已删除（23条）
- [ ] 确认数据库章节记录已删除（15条）
- [ ] 确认其他系列(003/004/006)文件保留完整
- [ ] 确认保留的书籍数量正确（线上书籍 + AI英文版）

---

## 六、变更记录

| 日期 | 变更内容 |
|------|----------|
| 2026-03-17 | 初始创建报告 |
| 2026-03-17 | 重新验证：章节文件数量从108个更新为112个 |
| 2026-03-17 | 新增：临时迁移文件2个 |
| 2026-03-17 | 总计文件数量从205个更新为211个 |
| 2026-03-17 | 第二次重新验证：发现新增 preset-ai-XXX-zh-chYY.html 格式文件59个 |
| 2026-03-17 | AI中文章节页面从50个更新为119个 |
| 2026-03-17 | **第三次重新验证（修正）**：确认线上有003/004/006系列书籍 |
| 2026-03-17 | **修正：不删除其他系列(003/004/006)的文件，这些是有效的** |
| 2026-03-17 | **总计文件数量从280个修正为144个** |
