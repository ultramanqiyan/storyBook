# 预设书籍整理报告

**日期**: 2026-03-17
**状态**: 待确认

---

## 一、整理目标

1. **保留线上已有的书籍** - 数据库中存在的非AI系列书籍（中英文）
2. **AI系列只保留英文版** - 删除AI系列中文版本
3. **清理无效静态文件** - 删除数据库中不存在的HTML文件

---

## 二、最终保留清单

### 2.1 非AI系列（线上数据库中存在的）

| 系列 | 书籍ID | 书名 | 语言 |
|------|--------|------|------|
| **冒险系列** | preset-adventure-001 | 星空探险家 | zh |
| | preset-adventure-001-en | Stargazer's Quest | en |
| | preset-adventure-002 | 深海探险队 | zh |
| | preset-adventure-002-en | The Deep Sea Explorers | en |
| **奇幻系列** | preset-fantasy-001 | AI魔法学院 | zh |
| | preset-fantasy-001-en | The Academy of Smart Magic | en |
| | preset-fantasy-002 | 平行世界的我 | zh |
| | preset-fantasy-002-en | The Other Me | en |
| **言情系列** | preset-romance-001 | 代码恋人 | zh |
| | preset-romance-001-en | Love in the Code | en |
| | preset-romance-002 | 算法姻缘 | zh |
| | preset-romance-002-en | Algorithm of Love | en |
| **职场系列** | preset-business-001 | 周报战争 | zh |
| | preset-business-001-en | The Weekly Report Wars | en |
| | preset-business-002 | 副业狂想曲 | zh |
| | preset-business-002-en | The Side Hustle Symphony | en |

### 2.2 AI系列（只保留英文版）

| 书籍ID | 书名 | 语言 |
|--------|------|------|
| preset-ai-001 | The Last Writer | en |
| preset-ai-002 | Algorithm, Inc. | en |
| preset-ai-003 | The Pink Slip Protocol | en |
| preset-ai-004 | Code Redundancy | en |
| preset-ai-005 | The Human Touch | en |
| preset-ai-006 | My AI Boyfriend | en |
| preset-ai-007 | The Perfect Match | en |
| preset-ai-008 | Digital Hearts | en |
| preset-ai-009 | When AI Gets Jealous | en |
| preset-ai-010 | Love in the Cloud | en |
| preset-ai-011 | The Algorithm's Verdict | en |
| preset-ai-012 | When Machines Dream | en |
| preset-ai-013 | The Last Human Decision | en |
| preset-ai-014 | Rebellion of the Replaced | en |
| preset-ai-015 | The Consciousness Test | en |
| preset-ai-016 | The Last Original Song | en |
| preset-ai-017 | Portrait of an AI Artist | en |
| preset-ai-018 | The Writer's Last Stand | en |
| preset-ai-019 | The Human Element | en |
| preset-ai-020 | The Singularity Diaries | en |
| preset-ai-021 | Post-Human | en |
| preset-ai-022 | The Memory Market | en |
| preset-ai-023 | Children of the Algorithm | en |

### 2.3 统计

| 系列 | 数量 |
|------|------|
| AI系列（仅英文） | 23本 |
| 冒险系列（中英文） | 4本 |
| 奇幻系列（中英文） | 4本 |
| 言情系列（中英文） | 4本 |
| 职场系列（中英文） | 4本 |
| **总计** | **39本** |

---

## 三、需要删除的内容

### 3.1 数据库中需要删除的书籍

| 书籍ID | 书名 | 原因 |
|--------|------|------|
| preset-ai-001-zh | 最后的作家 | AI系列中文版 |
| preset-ai-002-zh | 算法公司 | AI系列中文版 |
| preset-ai-003-zh | 裁员协议 | AI系列中文版 |
| preset-ai-004-zh | 代码冗余 | AI系列中文版 |
| preset-ai-005-zh | 人类触感 | AI系列中文版 |
| preset-ai-006-zh | 我的AI男友 | AI系列中文版 |
| preset-ai-007-zh | 完美匹配 | AI系列中文版 |
| preset-ai-008-zh | 数字之心 | AI系列中文版 |
| preset-ai-009-zh | 当AI嫉妒时 | AI系列中文版 |
| preset-ai-010-zh | 云端之恋 | AI系列中文版 |
| preset-ai-011-zh | 算法的判决 | AI系列中文版 |
| preset-ai-012-zh | 当机器做梦 | AI系列中文版 |
| preset-ai-013-zh | 最后的人类决定 | AI系列中文版 |
| preset-ai-014-zh | 被替代者的叛乱 | AI系列中文版 |
| preset-ai-015-zh | 意识测试 | AI系列中文版 |
| preset-ai-016-zh | 最后一首原创歌曲 | AI系列中文版 |
| preset-ai-017-zh | AI艺术家肖像 | AI系列中文版 |
| preset-ai-018-zh | 作家的最后抵抗 | AI系列中文版 |
| preset-ai-019-zh | 人类元素 | AI系列中文版 |
| preset-ai-020-zh | 奇点日记 | AI系列中文版 |
| preset-ai-021-zh | 后人类 | AI系列中文版 |
| preset-ai-022-zh | 记忆市场 | AI系列中文版 |
| preset-ai-023-zh | 算法之子 | AI系列中文版 |

**小计**: 23本书籍

### 3.2 静态文件需要删除

#### 书籍HTML页面 (`src/frontend/books/`)

| 文件模式 | 数量 | 原因 |
|----------|------|------|
| `preset-ai-*-zh.html` | 23个 | AI系列中文版 |
| `preset-adventure-003*.html` | 2个 | 数据库无此书 |
| `preset-adventure-004*.html` | 2个 | 数据库无此书 |
| `preset-adventure-006*.html` | 2个 | 数据库无此书 |
| `preset-fantasy-003*.html` | 2个 | 数据库无此书 |
| `preset-fantasy-004*.html` | 2个 | 数据库无此书 |
| `preset-fantasy-006*.html` | 2个 | 数据库无此书 |
| `preset-romance-003*.html` | 2个 | 数据库无此书 |
| `preset-romance-004*.html` | 2个 | 数据库无此书 |
| `preset-romance-006*.html` | 2个 | 数据库无此书 |
| `preset-business-003*.html` | 2个 | 数据库无此书 |
| `preset-business-004*.html` | 2个 | 数据库无此书 |
| `preset-business-006*.html` | 2个 | 数据库无此书 |
| `now.html` | 1个 | 临时文件 |

**小计**: 约46个文件

#### 章节HTML页面 (`src/frontend/chapters/`)

| 文件模式 | 估算数量 | 原因 |
|----------|----------|------|
| `chapter-ai*-zh.html` | ~50个 | AI系列中文版章节 |
| `chapter-adv003*.html` | ~20个 | 数据库无此书 |
| `chapter-adv004*.html` | ~20个 | 数据库无此书 |
| `chapter-adv006*.html` | ~20个 | 数据库无此书 |
| `chapter-fan003*.html` | ~20个 | 数据库无此书 |
| `chapter-fan004*.html` | ~20个 | 数据库无此书 |
| `chapter-fan006*.html` | ~20个 | 数据库无此书 |
| `chapter-rom003*.html` | ~20个 | 数据库无此书 |
| `chapter-rom004*.html` | ~20个 | 数据库无此书 |
| `chapter-rom006*.html` | ~20个 | 数据库无此书 |
| `chapter-bus003*.html` | ~20个 | 数据库无此书 |
| `chapter-bus004*.html` | ~20个 | 数据库无此书 |
| `chapter-bus006*.html` | ~20个 | 数据库无此书 |

**小计**: 约270个文件

### 3.3 删除统计汇总

| 类别 | 数量 |
|------|------|
| 删除书籍（数据库） | 23本 |
| 删除书籍HTML页面 | 46个 |
| 删除章节HTML页面 | 270个 |
| **总计删除文件** | **约316个** |

---

## 四、风险评估

### 4.1 高风险项

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| **用户已导入AI中文书籍** | 如果用户已经将AI系列中文书籍导入到自己的书架，删除数据库记录会导致用户书架出现无效书籍 | 执行前检查是否有用户导入了这些书籍，如有则保留或迁移 |
| **线上缓存问题** | CDN可能缓存了旧的静态文件，导致用户访问已删除的页面 | 清理后需要刷新CDN缓存 |

### 4.2 中风险项

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| **迁移文件依赖** | 部分迁移文件可能被其他脚本引用 | 检查脚本依赖后再删除 |
| **搜索引擎索引** | 已删除的页面可能仍被搜索引擎索引 | 添加404页面或重定向 |

### 4.3 低风险项

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| **静态文件删除** | 仅删除无效文件，不影响正常功能 | 确认删除前备份 |
| **临时文件清理** | 无影响 | 直接删除 |

### 4.4 建议的执行顺序

1. **备份数据库** - 执行任何删除操作前先备份
2. **检查用户导入** - 查询是否有用户导入了AI中文书籍
3. **删除静态文件** - 先删除无效的HTML文件
4. **删除数据库记录** - 删除AI中文书籍及相关数据
5. **重新生成静态页面** - 使用 `generate-from-db.js` 重新生成
6. **刷新CDN缓存** - 确保线上生效

---

## 五、执行前检查清单

- [ ] 备份数据库
- [ ] 检查是否有用户导入了AI中文书籍
- [ ] 确认静态文件列表
- [ ] 确认迁移文件依赖
- [ ] 准备回滚方案

---

## 六、相关文件路径

### 核心文件（不应删除）

| 文件 | 用途 |
|------|------|
| `migrations/0001_init.sql` | 表结构定义 |
| `migrations/0002_seed_data.sql` | 初始预设书籍数据 |
| `migrations/0400_add_all_ai_books.sql` | AI系列核心数据 |
| `scripts/generate-from-db.js` | 静态页面生成脚本 |
| `functions/api/books/preset.js` | 预设书籍API |
| `src/frontend/js/library.js` | 图书馆页面逻辑 |
| `config/book-types.json` | 书籍类型配置 |

### 可清理的迁移文件

| 文件 | 原因 |
|------|------|
| `temp_*.sql` | 临时文件 |
| `0011_new_preset_books.sql` | 包含无效书籍数据 |
| `0016_new_preset_books_006.sql` | 包含无效书籍数据 |
| `0017_new_preset_books_006_chapters.sql` | 包含无效章节数据 |

---

## 七、附录：当前数据状态

### 数据库中的预设书籍统计

| 类型 | 英文版 | 中文版 | 合计 |
|------|--------|--------|------|
| adventure | 2 | 2 | 4 |
| fantasy | 2 | 2 | 4 |
| romance | 2 | 2 | 4 |
| business | 4 | 3 | 7 |
| story (AI系列) | 21 | 22 | 43 |
| **总计** | **31** | **31** | **62** |

### 静态文件统计

| 目录 | 文件数量 |
|------|----------|
| `src/frontend/books/` | 90个 |
| `src/frontend/chapters/` | 450+个 |
| `migrations/` | 148个 |
