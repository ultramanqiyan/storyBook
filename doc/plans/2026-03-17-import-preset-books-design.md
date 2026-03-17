# 预设书籍数据导入设计

## 需求背景

用户需要将线上16本预设书籍的所有数据导入到线下本地数据库。目前线下数据库缺少这些数据。

## 数据统计

### 线上备份文件数据量

| 表名 | 总记录数 | 预设书籍相关记录数 |
|------|----------|-------------------|
| books | 20 | 16 |
| characters | 58 | 48 |
| chapters | 192 | 160 |
| plot_cards | 396 | 320 |
| puzzles | 59 | 48 |

### 16本预设书籍列表

| 书籍ID | 中文名 | 英文名 | 类型 |
|--------|--------|--------|------|
| preset-adventure-003 | 丛林奇遇记 | Jungle Adventures | adventure |
| preset-adventure-004 | 极地探险队 | Polar Expedition | adventure |
| preset-fantasy-003 | 龙族守护者 | Dragon Guardian | fantasy |
| preset-fantasy-004 | 魔法学院大逃亡 | Magic Academy Escape | fantasy |
| preset-romance-003 | 咖啡店的邂逅 | Cafe Encounter | romance |
| preset-romance-004 | 青梅竹马的重逢 | Childhood Sweethearts | romance |
| preset-business-003 | 创业合伙人 | Startup Partners | business |
| preset-business-004 | 职场新人逆袭记 | Rookie Rising | business |
| preset-adventure-003-en | Jungle Adventures | - | adventure |
| preset-adventure-004-en | Polar Expedition | - | adventure |
| preset-fantasy-003-en | Dragon Guardian | - | fantasy |
| preset-fantasy-004-en | Magic Academy Escape | - | fantasy |
| preset-romance-003-en | Cafe Encounter | - | romance |
| preset-romance-004-en | Childhood Sweethearts | - | romance |
| preset-business-003-en | Startup Partners | - | business |
| preset-business-004-en | Rookie Rising | - | business |

### 每本书数据结构

- 1 条 books 记录
- 3 条 characters 记录
- 10 条 chapters 记录
- 20 条 plot_cards 记录
- 3 条 puzzles 记录（通过 chapter_id 关联）

## 实现方案

### 方案选择

修改现有 `scripts/import-from-backup.js` 脚本，扩展其功能。

### 实现步骤

1. **扩展 bookIds 列表**
   - 从原来的4本书扩展到16本书
   - 包含所有中英文版本

2. **添加 puzzles 表导入**
   - puzzles 通过 chapter_id 关联
   - 需要匹配对应的 chapter_id 模式（如 chapter-adv003-*, chapter-adv004-* 等）

3. **增强验证逻辑**
   - 导入后验证每本书的各表数据量
   - 预期每本书：1 book + 3 characters + 10 chapters + 20 plot_cards + 3 puzzles

4. **错误处理**
   - 使用 INSERT OR IGNORE 避免主键冲突
   - 详细的导入日志输出

## 数据完整性保障

- 导入前检查本地数据库状态
- 导入后验证各表记录数
- 输出详细的导入日志，包括成功/失败数量

## 文件修改

- `scripts/import-from-backup.js` - 主要修改文件

## 验证方法

运行脚本后，检查输出日志确认：
- 16 条 books 记录导入成功
- 48 条 characters 记录导入成功
- 160 条 chapters 记录导入成功
- 320 条 plot_cards 记录导入成功
- 48 条 puzzles 记录导入成功
