# 预设书籍Emoji修复实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修改所有预设书籍的卡牌名称使其与项目标准emoji配置一致，消除重复emoji问题

**Architecture:** 
1. 创建卡牌名称映射表（预设名称 → 标准名称）
2. 批量修改HTML文件中的卡牌名称
3. 生成数据库迁移脚本更新数据库
4. 验证修复结果

**Tech Stack:** Node.js, SQL, HTML

---

## 前置分析

### 问题统计

| 分类 | 书籍数 | 缺失卡牌数 |
|------|--------|-----------|
| AI系列 | 46本 | 419张 |
| 非AI英文 | 20本 | 170张 |
| 中文书籍 | 66本 | 597张 |
| **总计** | **86本** | **767张** |

### 修复策略

由于AI系列书籍没有标准emoji配置，我们采用以下策略：

1. **非AI书籍**：修改卡牌名称匹配标准配置
2. **AI书籍**：暂时保持现状，后续单独处理

---

## Task 1: 创建卡牌名称映射表

**Files:**
- Create: `scripts/preset-card-name-mapping.json`

**Step 1: 分析缺失卡牌并创建映射**

运行脚本生成映射表：

```bash
node scripts/generate-card-name-mapping.js
```

**Step 2: 验证映射表**

检查映射表内容，确保：
- 每个缺失卡牌都有对应的标准名称
- 映射关系正确

---

## Task 2: 修改英文预设书籍HTML文件

**Files:**
- Modify: `src/frontend/books/preset-adventure-*-en.html`
- Modify: `src/frontend/books/preset-business-*-en.html`
- Modify: `src/frontend/books/preset-fantasy-*-en.html`
- Modify: `src/frontend/books/preset-romance-*-en.html`

**Step 1: 创建批量修改脚本**

```javascript
// scripts/fix-preset-card-names.js
// 读取映射表，批量修改HTML文件中的卡牌名称
```

**Step 2: 运行修改脚本**

```bash
node scripts/fix-preset-card-names.js --lang=en
```

**Step 3: 验证修改结果**

```bash
node scripts/analyze-all-preset-emojis.js
```

预期：非AI英文书籍缺失卡牌数减少

---

## Task 3: 修改中文预设书籍HTML文件

**Files:**
- Modify: `src/frontend/books/preset-adventure-*.html` (非-en结尾)
- Modify: `src/frontend/books/preset-business-*.html`
- Modify: `src/frontend/books/preset-fantasy-*.html`
- Modify: `src/frontend/books/preset-romance-*.html`

**Step 1: 运行修改脚本**

```bash
node scripts/fix-preset-card-names.js --lang=zh
```

**Step 2: 验证修改结果**

```bash
node scripts/analyze-all-preset-emojis.js
```

---

## Task 4: 生成数据库迁移脚本

**Files:**
- Create: `migrations/0710_fix_preset_card_names.sql`

**Step 1: 生成迁移SQL**

```bash
node scripts/generate-db-migration.js
```

**Step 2: 执行迁移**

```bash
wrangler d1 execute storybook_database --local --file=./migrations/0710_fix_preset_card_names.sql
```

**Step 3: 验证数据库**

```bash
wrangler d1 execute storybook_database --local --command "SELECT book_id, COUNT(*) as unmatched FROM plot_cards WHERE book_id LIKE 'preset-%' AND icon = '' GROUP BY book_id"
```

---

## Task 5: 验证修复结果

**Step 1: 运行完整分析**

```bash
node scripts/analyze-all-preset-emojis.js
```

**Step 2: 检查关键指标**

- 重复emoji书籍数：应为0
- 非AI书籍缺失卡牌数：应为0

**Step 3: 手动验证示例书籍**

访问 http://localhost:8788/books/preset-ai-014 确认emoji显示正确

---

## Task 6: 提交更改

**Step 1: 提交HTML文件修改**

```bash
git add src/frontend/books/preset-*.html
git commit -m "fix: update preset book card names to match standard emoji config"
```

**Step 2: 提交迁移脚本**

```bash
git add migrations/0710_fix_preset_card_names.sql
git commit -m "fix: add migration to update preset card names in database"
```

---

## 注意事项

1. **AI系列书籍**：由于没有标准emoji配置，本次不修改
2. **备份**：修改前确保有备份
3. **测试**：修改后需要测试导入功能是否正常

---

## 预期结果

| 指标 | 修复前 | 修复后 |
|------|--------|--------|
| 重复emoji书籍 | 57本 | 0本 |
| 非AI英文缺失卡牌 | 170张 | 0张 |
| 中文书籍缺失卡牌 | 597张 | 0张 |
