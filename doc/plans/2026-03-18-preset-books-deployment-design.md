# 预设书籍上线方案设计

## 概述

本文档描述预设书籍更新的上线方案，包括SQL导出、验证和上线流程。

## 目标

- 从线下数据库导出31本英文 + 8本中文预设书籍的SQL文件
- 充分验证SQL文件的正确性
- 安全地将预设书籍更新到线上环境

## 数据概况

| 语言 | 数量 | 书籍类型 |
|------|------|----------|
| 英文 | 31本 | adventure(2) + AI系列(23) + business(2) + fantasy(2) + romance(2) |
| 中文 | 8本 | adventure(2) + business(2) + fantasy(2) + romance(2) |

## 流程设计

### 准备阶段（上线前，本地执行）

```
步骤P1: 从线下数据库导出预设书籍SQL文件
步骤P2: 创建临时测试数据库
步骤P3: 将SQL文件导入临时数据库
步骤P4: 验证数据完整性
步骤P5: 验证内容正确性
步骤P6: 验证通过，SQL文件准备就绪
```

### 上线阶段（线上执行）

```
步骤1: 部署代码到线上
步骤2: [暂停] 等待人工确认OK
步骤3: 备份线上预设书籍数据（安全措施）
步骤4: 删除线上所有预设书籍
步骤5: 导入新SQL文件
步骤6: 验证导入结果
```

## 技术方案

### 一、SQL导出脚本

**脚本名称**：`scripts/export-preset-books-for-production.js`

**功能**：
- 从本地D1数据库导出所有 `is_preset = 1` 的书籍及其关联数据
- 生成标准INSERT语句的SQL文件
- 输出文件：`migrations/production_preset_books_YYYYMMDD.sql`

**导出数据表及顺序**：
```
1. books (WHERE is_preset = 1)
2. characters (WHERE book_id LIKE 'preset-%')
3. plot_cards (WHERE book_id LIKE 'preset-%')
4. chapters (WHERE book_id LIKE 'preset-%')
5. puzzles (WHERE chapter_id IN 预设书籍的章节)
```

### 二、验证脚本

**脚本名称**：`scripts/verify-preset-books-sql.js`

**验证项目**：

| 验证项 | 说明 |
|--------|------|
| **基础数据验证** | |
| 书籍数量 | 英文31本 + 中文8本 = 39本 |
| 角色数量 | 每本书至少1个角色 |
| 章节数量 | 每本书至少1个章节 |
| 卡牌数量 | 每本书至少1个卡牌 |
| 谜题数量 | 章节谜题关联正确 |
| **内容验证** | |
| 章节目录 | 每本书的章节按order_num排序，标题不为空 |
| 章节内容 | 每个章节的content字段不为空，内容长度合理 |
| 角色卡牌 | 每个角色有name、role_type、personality等必填字段 |
| 情节卡牌 | 每个卡牌有name、type、icon等必填字段 |
| **格式验证** | |
| JSON格式 | chapters.content、selected_cards等字段JSON格式正确 |
| Emoji验证 | 所有文本字段中的emoji字符编码正确，无乱码 |
| 外键关联 | characters.book_id、chapters.book_id等关联正确 |

**Emoji验证具体检查**：
- 书籍标题中的emoji
- 章节标题和内容中的emoji
- 角色名称和描述中的emoji
- 情节卡牌名称和描述中的emoji
- 确保emoji在SQL文件中正确编码（UTF-8）

**验证方式**：
- 创建临时测试数据库（不影响现有本地数据）
- 导入SQL文件
- 执行验证查询
- 输出验证报告

### 三、上线脚本

**脚本名称**：`deploy/deploy-preset-books.bat`

**执行流程**：

```batch
步骤1: 部署代码到线上
步骤2: [暂停] 等待人工确认OK
步骤3: 备份线上预设书籍数据
步骤4: 删除线上预设书籍
步骤5: 导入新预设书籍
步骤6: 验证导入结果
```

### 四、删除预设书籍SQL

**文件名称**：`migrations/delete_preset_books.sql`

**内容**（按外键依赖顺序删除）：

```sql
DELETE FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id LIKE 'preset-%');
DELETE FROM chapters WHERE book_id LIKE 'preset-%';
DELETE FROM plot_cards WHERE book_id LIKE 'preset-%';
DELETE FROM characters WHERE book_id LIKE 'preset-%';
DELETE FROM books WHERE is_preset = 1;
```

## 文件清单

| 文件 | 用途 | 存放位置 |
|------|------|----------|
| `export-preset-books-for-production.js` | 导出SQL | `scripts/` |
| `verify-preset-books-sql.js` | 验证SQL | `scripts/` |
| `deploy-preset-books.bat` | 上线脚本 | `deploy/` |
| `delete_preset_books.sql` | 删除语句 | `migrations/` |
| `production_preset_books_YYYYMMDD.sql` | 预设书籍数据 | `migrations/` |

## 安全措施

1. **备份保护**：上线前备份线上预设书籍数据
2. **临时验证**：使用临时数据库验证，不影响本地数据
3. **人工确认**：代码部署后等待人工确认再执行数据库操作
4. **验证报告**：每步都有验证输出，确保操作正确

## 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| SQL文件损坏 | 导入失败 | 充分验证后再上线 |
| 删除操作失误 | 数据丢失 | 先备份再删除 |
| 导入中断 | 数据不完整 | 验证导入结果 |

## 发现时间

2026-03-18
