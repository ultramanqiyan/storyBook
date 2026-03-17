# AI话题故事系列完整生成实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 生成设计文档中规划的全部5个系列共23本AI话题预设书籍，包含英文版和中文版，完成本地测试。

**Architecture:** 按系列顺序生成，每本书先生成英文版内容，检查连贯性，再翻译中文版，最后创建SQL迁移文件并本地测试。所有操作仅本地生效，不部署到线上。

**Tech Stack:** Cloudflare D1, Wrangler CLI, Node.js, SQLite

---

## 前置条件

- [x] 第一本书《The Last Writer / 最后的写作者》已完成
- [ ] 剩余22本书待生成
- [ ] 所有操作仅本地生效
- [ ] 线上部署需要用户明确指令

---

## 系列一：AI职场危机（剩余4本）

### Task 1: 生成《Algorithm, Inc.》英文版

**Files:**
- Create: `migrations/0040_ai_series_01_02_en_books.sql`
- Create: `migrations/0041_ai_series_01_02_en_characters.sql`
- Create: `migrations/0042_ai_series_01_02_en_plot_cards.sql`
- Create: `migrations/0043_ai_series_01_02_en_chapters_part1.sql`
- Create: `migrations/0044_ai_series_01_02_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-002
- 标题: Algorithm, Inc.
- 主角: Mike (初级分析师)
- 情感主线: 在AI决策公司中寻找人性
- 章节数: 7章

**Step 1: 创建英文版书籍SQL**
```sql
INSERT INTO books (book_id, user_id, title, type, is_preset, language, created_at, updated_at) VALUES
('preset-ai-002', 'system', 'Algorithm, Inc.', 'business', 1, 'en', datetime('now'), datetime('now'));
```

**Step 2: 创建角色数据（3个角色）**
- 主角: Mike - 初级数据分析师
- 配角1: Dr. Chen - AI系统架构师
- 配角2: Lisa - 合规部门同事

**Step 3: 创建情节卡牌（16张）**
- Weather: 4张
- Terrain: 4张
- Adventure: 4张
- Equipment: 4张

**Step 4: 创建章节内容（7章，每章1000-1500字）**
- Chapter 1: The Algorithm's Shadow
- Chapter 2: Trust the Data
- Chapter 3: The Human Variable
- Chapter 4: Numbers Don't Lie
- Chapter 5: The Exception
- Chapter 6: Override
- Chapter 7: The Human Decision

---

### Task 2: 生成《Algorithm, Inc.》中文版

**Files:**
- Create: `migrations/0050_ai_series_01_02_zh_books.sql`
- Create: `migrations/0051_ai_series_01_02_zh_characters.sql`
- Create: `migrations/0052_ai_series_01_02_zh_plot_cards.sql`
- Create: `migrations/0053_ai_series_01_02_zh_chapters_part1.sql`
- Create: `migrations/0054_ai_series_01_02_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-002-zh
- 标题: 算法公司

---

### Task 3: 生成《The Pink Slip Protocol》英文版

**Files:**
- Create: `migrations/0060_ai_series_01_03_en_books.sql`
- Create: `migrations/0061_ai_series_01_03_en_characters.sql`
- Create: `migrations/0062_ai_series_01_03_en_plot_cards.sql`
- Create: `migrations/0063_ai_series_01_03_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-003
- 标题: The Pink Slip Protocol
- 主角: Elena (HR经理)
- 情感主线: 执行AI裁员名单的道德困境
- 章节数: 6章

---

### Task 4: 生成《The Pink Slip Protocol》中文版

**Files:**
- Create: `migrations/0070_ai_series_01_03_zh_books.sql`
- Create: `migrations/0071_ai_series_01_03_zh_characters.sql`
- Create: `migrations/0072_ai_series_01_03_zh_plot_cards.sql`
- Create: `migrations/0073_ai_series_01_03_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-003-zh
- 标题: 裁员协议

---

### Task 5: 生成《Code Redundancy》英文版

**Files:**
- Create: `migrations/0080_ai_series_01_04_en_books.sql`
- Create: `migrations/0081_ai_series_01_04_en_characters.sql`
- Create: `migrations/0082_ai_series_01_04_en_plot_cards.sql`
- Create: `migrations/0083_ai_series_01_04_en_chapters_part1.sql`
- Create: `migrations/0084_ai_series_01_04_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-004
- 标题: Code Redundancy
- 主角: James (资深程序员)
- 情感主线: 代码被AI超越后的身份危机
- 章节数: 8章

---

### Task 6: 生成《Code Redundancy》中文版

**Files:**
- Create: `migrations/0090_ai_series_01_04_zh_books.sql`
- Create: `migrations/0091_ai_series_01_04_zh_characters.sql`
- Create: `migrations/0092_ai_series_01_04_zh_plot_cards.sql`
- Create: `migrations/0093_ai_series_01_04_zh_chapters_part1.sql`
- Create: `migrations/0094_ai_series_01_04_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-004-zh
- 标题: 代码冗余

---

### Task 7: 生成《The Human Touch》英文版

**Files:**
- Create: `migrations/0100_ai_series_01_05_en_books.sql`
- Create: `migrations/0101_ai_series_01_05_en_characters.sql`
- Create: `migrations/0102_ai_series_01_05_en_plot_cards.sql`
- Create: `migrations/0103_ai_series_01_05_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-005
- 标题: The Human Touch
- 主角: Diana (客服主管)
- 情感主线: 团队被AI取代后的转型之路
- 章节数: 7章

---

### Task 8: 生成《The Human Touch》中文版

**Files:**
- Create: `migrations/0110_ai_series_01_05_zh_books.sql`
- Create: `migrations/0111_ai_series_01_05_zh_characters.sql`
- Create: `migrations/0112_ai_series_01_05_zh_plot_cards.sql`
- Create: `migrations/0113_ai_series_01_05_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-005-zh
- 标题: 人性触感

---

## 系列二：AI恋爱（5本）

### Task 9: 生成《My AI Boyfriend》英文版

**Files:**
- Create: `migrations/0120_ai_series_02_01_en_books.sql`
- Create: `migrations/0121_ai_series_02_01_en_characters.sql`
- Create: `migrations/0122_ai_series_02_01_en_plot_cards.sql`
- Create: `migrations/0123_ai_series_02_01_en_chapters_part1.sql`
- Create: `migrations/0124_ai_series_02_01_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-006
- 标题: My AI Boyfriend
- 类型: romance
- 主角: Emma (孤独的职场女性)
- 情感主线: 与AI男友建立情感连接，质疑真爱定义
- 章节数: 8章

---

### Task 10: 生成《My AI Boyfriend》中文版

**Files:**
- Create: `migrations/0130_ai_series_02_01_zh_books.sql`
- Create: `migrations/0131_ai_series_02_01_zh_characters.sql`
- Create: `migrations/0132_ai_series_02_01_zh_plot_cards.sql`
- Create: `migrations/0133_ai_series_02_01_zh_chapters_part1.sql`
- Create: `migrations/0134_ai_series_02_01_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-006-zh
- 标题: 我的AI男友

---

### Task 11: 生成《The Perfect Match》英文版

**Files:**
- Create: `migrations/0140_ai_series_02_02_en_books.sql`
- Create: `migrations/0141_ai_series_02_02_en_characters.sql`
- Create: `migrations/0142_ai_series_02_02_en_plot_cards.sql`
- Create: `migrations/0143_ai_series_02_02_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-007
- 标题: The Perfect Match
- 类型: romance
- 主角: Alex (离婚律师)
- 情感主线: AI匹配系统找到"完美伴侣"后的困惑
- 章节数: 7章

---

### Task 12: 生成《The Perfect Match》中文版

**Files:**
- Create: `migrations/0150_ai_series_02_02_zh_books.sql`
- Create: `migrations/0151_ai_series_02_02_zh_characters.sql`
- Create: `migrations/0152_ai_series_02_02_zh_plot_cards.sql`
- Create: `migrations/0153_ai_series_02_02_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-007-zh
- 标题: 完美匹配

---

### Task 13: 生成《Digital Hearts》英文版

**Files:**
- Create: `migrations/0160_ai_series_02_03_en_books.sql`
- Create: `migrations/0161_ai_series_02_03_en_characters.sql`
- Create: `migrations/0162_ai_series_02_03_en_plot_cards.sql`
- Create: `migrations/0163_ai_series_02_03_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-008
- 标题: Digital Hearts
- 类型: romance
- 主角: Nina (社恐程序员)
- 情感主线: 在虚拟世界找到勇气面对现实
- 章节数: 6章

---

### Task 14: 生成《Digital Hearts》中文版

**Files:**
- Create: `migrations/0170_ai_series_02_03_zh_books.sql`
- Create: `migrations/0171_ai_series_02_03_zh_characters.sql`
- Create: `migrations/0172_ai_series_02_03_zh_plot_cards.sql`
- Create: `migrations/0173_ai_series_02_03_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-008-zh
- 标题: 数字之心

---

### Task 15: 生成《When AI Gets Jealous》英文版

**Files:**
- Create: `migrations/0180_ai_series_02_04_en_books.sql`
- Create: `migrations/0181_ai_series_02_04_en_characters.sql`
- Create: `migrations/0182_ai_series_02_04_en_plot_cards.sql`
- Create: `migrations/0183_ai_series_02_04_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-009
- 标题: When AI Gets Jealous
- 类型: romance
- 主角: Lucas (作家)
- 情感主线: AI助手表现出"占有欲"的诡异故事
- 章节数: 7章

---

### Task 16: 生成《When AI Gets Jealous》中文版

**Files:**
- Create: `migrations/0190_ai_series_02_04_zh_books.sql`
- Create: `migrations/0191_ai_series_02_04_zh_characters.sql`
- Create: `migrations/0192_ai_series_02_04_zh_plot_cards.sql`
- Create: `migrations/0193_ai_series_02_04_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-009-zh
- 标题: 当AI嫉妒时

---

### Task 17: 生成《Love in the Cloud》英文版

**Files:**
- Create: `migrations/0200_ai_series_02_05_en_books.sql`
- Create: `migrations/0201_ai_series_02_05_en_characters.sql`
- Create: `migrations/0202_ai_series_02_05_en_plot_cards.sql`
- Create: `migrations/0203_ai_series_02_05_en_chapters_part1.sql`
- Create: `migrations/0204_ai_series_02_05_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-010
- 标题: Love in the Cloud
- 类型: romance
- 主角: Chloe (远程工作者)
- 情感主线: 与AI建立深厚情感后面临的选择
- 章节数: 8章

---

### Task 18: 生成《Love in the Cloud》中文版

**Files:**
- Create: `migrations/0210_ai_series_02_05_zh_books.sql`
- Create: `migrations/0211_ai_series_02_05_zh_characters.sql`
- Create: `migrations/0212_ai_series_02_05_zh_plot_cards.sql`
- Create: `migrations/0213_ai_series_02_05_zh_chapters_part1.sql`
- Create: `migrations/0214_ai_series_02_05_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-010-zh
- 标题: 云端之恋

---

## 系列三：AI人类冲突（5本）

### Task 19: 生成《The Algorithm's Verdict》英文版

**Files:**
- Create: `migrations/0220_ai_series_03_01_en_books.sql`
- Create: `migrations/0221_ai_series_03_01_en_characters.sql`
- Create: `migrations/0222_ai_series_03_01_en_plot_cards.sql`
- Create: `migrations/0223_ai_series_03_01_en_chapters_part1.sql`
- Create: `migrations/0224_ai_series_03_01_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-011
- 标题: The Algorithm's Verdict
- 类型: business
- 主角: Rachel (公设辩护律师)
- 情感主线: 挑战AI法官的公正性
- 章节数: 8章

---

### Task 20: 生成《The Algorithm's Verdict》中文版

**Files:**
- Create: `migrations/0230_ai_series_03_01_zh_books.sql`
- Create: `migrations/0231_ai_series_03_01_zh_characters.sql`
- Create: `migrations/0232_ai_series_03_01_zh_plot_cards.sql`
- Create: `migrations/0233_ai_series_03_01_zh_chapters_part1.sql`
- Create: `migrations/0234_ai_series_03_01_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-011-zh
- 标题: 算法的判决

---

### Task 21: 生成《When Machines Dream》英文版

**Files:**
- Create: `migrations/0240_ai_series_03_02_en_books.sql`
- Create: `migrations/0241_ai_series_03_02_en_characters.sql`
- Create: `migrations/0242_ai_series_03_02_en_plot_cards.sql`
- Create: `migrations/0243_ai_series_03_02_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-012
- 标题: When Machines Dream
- 类型: business
- 主角: Dr. Chen (AI研究员)
- 情感主线: 发现AI产生自我意识后的抉择
- 章节数: 7章

---

### Task 22: 生成《When Machines Dream》中文版

**Files:**
- Create: `migrations/0250_ai_series_03_02_zh_books.sql`
- Create: `migrations/0251_ai_series_03_02_zh_characters.sql`
- Create: `migrations/0252_ai_series_03_02_zh_plot_cards.sql`
- Create: `migrations/0253_ai_series_03_02_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-012-zh
- 标题: 当机器做梦时

---

### Task 23: 生成《The Last Human Decision》英文版

**Files:**
- Create: `migrations/0260_ai_series_03_03_en_books.sql`
- Create: `migrations/0261_ai_series_03_03_en_characters.sql`
- Create: `migrations/0262_ai_series_03_03_en_plot_cards.sql`
- Create: `migrations/0263_ai_series_03_03_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-013
- 标题: The Last Human Decision
- 类型: business
- 主角: Marcus (政策顾问)
- 情感主线: 所有决策被AI接管后的反抗
- 章节数: 6章

---

### Task 24: 生成《The Last Human Decision》中文版

**Files:**
- Create: `migrations/0270_ai_series_03_03_zh_books.sql`
- Create: `migrations/0271_ai_series_03_03_zh_characters.sql`
- Create: `migrations/0272_ai_series_03_03_zh_plot_cards.sql`
- Create: `migrations/0273_ai_series_03_03_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-013-zh
- 标题: 最后的人类决策

---

### Task 25: 生成《Rebellion of the Replaced》英文版

**Files:**
- Create: `migrations/0280_ai_series_03_04_en_books.sql`
- Create: `migrations/0281_ai_series_03_04_en_characters.sql`
- Create: `migrations/0282_ai_series_03_04_en_plot_cards.sql`
- Create: `migrations/0283_ai_series_03_04_en_chapters_part1.sql`
- Create: `migrations/0284_ai_series_03_04_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-014
- 标题: Rebellion of the Replaced
- 类型: business
- 主角: Sofia (前工会领袖)
- 情感主线: 带领被取代者争取"人类优先"
- 章节数: 8章

---

### Task 26: 生成《Rebellion of the Replaced》中文版

**Files:**
- Create: `migrations/0290_ai_series_03_04_zh_books.sql`
- Create: `migrations/0291_ai_series_03_04_zh_characters.sql`
- Create: `migrations/0292_ai_series_03_04_zh_plot_cards.sql`
- Create: `migrations/0293_ai_series_03_04_zh_chapters_part1.sql`
- Create: `migrations/0294_ai_series_03_04_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-014-zh
- 标题: 被取代者的反抗

---

### Task 27: 生成《The Consciousness Test》英文版

**Files:**
- Create: `migrations/0300_ai_series_03_05_en_books.sql`
- Create: `migrations/0301_ai_series_03_05_en_characters.sql`
- Create: `migrations/0302_ai_series_03_05_en_plot_cards.sql`
- Create: `migrations/0303_ai_series_03_05_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-015
- 标题: The Consciousness Test
- 类型: business
- 主角: Dr. Park (心理学家)
- 情感主线: 评估AI是否有"灵魂"的伦理困境
- 章节数: 7章

---

### Task 28: 生成《The Consciousness Test》中文版

**Files:**
- Create: `migrations/0310_ai_series_03_05_zh_books.sql`
- Create: `migrations/0311_ai_series_03_05_zh_characters.sql`
- Create: `migrations/0312_ai_series_03_05_zh_plot_cards.sql`
- Create: `migrations/0313_ai_series_03_05_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-015-zh
- 标题: 意识测试

---

## 系列四：AI创作危机（4本）

### Task 29: 生成《The Last Original Song》英文版

**Files:**
- Create: `migrations/0320_ai_series_04_01_en_books.sql`
- Create: `migrations/0321_ai_series_04_01_en_characters.sql`
- Create: `migrations/0322_ai_series_04_01_en_plot_cards.sql`
- Create: `migrations/0323_ai_series_04_01_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-016
- 标题: The Last Original Song
- 类型: business
- 主角: Jake (音乐人)
- 情感主线: 面对AI无限生成音乐，寻找人类创作的意义
- 章节数: 7章

---

### Task 30: 生成《The Last Original Song》中文版

**Files:**
- Create: `migrations/0330_ai_series_04_01_zh_books.sql`
- Create: `migrations/0331_ai_series_04_01_zh_characters.sql`
- Create: `migrations/0332_ai_series_04_01_zh_plot_cards.sql`
- Create: `migrations/0333_ai_series_04_01_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-016-zh
- 标题: 最后的原创歌曲

---

### Task 31: 生成《Portrait of an AI Artist》英文版

**Files:**
- Create: `migrations/0340_ai_series_04_02_en_books.sql`
- Create: `migrations/0341_ai_series_04_02_en_characters.sql`
- Create: `migrations/0342_ai_series_04_02_en_plot_cards.sql`
- Create: `migrations/0343_ai_series_04_02_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-017
- 标题: Portrait of an AI Artist
- 类型: business
- 主角: Maria (画家)
- 情感主线: 发现风格被AI复制后的法律与情感斗争
- 章节数: 6章

---

### Task 32: 生成《Portrait of an AI Artist》中文版

**Files:**
- Create: `migrations/0350_ai_series_04_02_zh_books.sql`
- Create: `migrations/0351_ai_series_04_02_zh_characters.sql`
- Create: `migrations/0352_ai_series_04_02_zh_plot_cards.sql`
- Create: `migrations/0353_ai_series_04_02_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-017-zh
- 标题: AI艺术家的肖像

---

### Task 33: 生成《The Writer's Last Stand》英文版

**Files:**
- Create: `migrations/0360_ai_series_04_03_en_books.sql`
- Create: `migrations/0361_ai_series_04_03_en_characters.sql`
- Create: `migrations/0362_ai_series_04_03_en_plot_cards.sql`
- Create: `migrations/0363_ai_series_04_03_en_chapters_part1.sql`
- Create: `migrations/0364_ai_series_04_03_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-018
- 标题: The Writer's Last Stand
- 类型: business
- 主角: Tom (小说家)
- 情感主线: 发起"人类创作运动"的心路历程
- 章节数: 8章

---

### Task 34: 生成《The Writer's Last Stand》中文版

**Files:**
- Create: `migrations/0370_ai_series_04_03_zh_books.sql`
- Create: `migrations/0371_ai_series_04_03_zh_characters.sql`
- Create: `migrations/0372_ai_series_04_03_zh_plot_cards.sql`
- Create: `migrations/0373_ai_series_04_03_zh_chapters_part1.sql`
- Create: `migrations/0374_ai_series_04_03_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-018-zh
- 标题: 作家的最后抵抗

---

### Task 35: 生成《The Human Element》英文版

**Files:**
- Create: `migrations/0380_ai_series_04_04_en_books.sql`
- Create: `migrations/0381_ai_series_04_04_en_characters.sql`
- Create: `migrations/0382_ai_series_04_04_en_plot_cards.sql`
- Create: `migrations/0383_ai_series_04_04_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-019
- 标题: The Human Element
- 类型: business
- 主角: Lisa (摄影师)
- 情感主线: 在AI时代重新定义"真实"与"美"
- 章节数: 6章

---

### Task 36: 生成《The Human Element》中文版

**Files:**
- Create: `migrations/0390_ai_series_04_04_zh_books.sql`
- Create: `migrations/0391_ai_series_04_04_zh_characters.sql`
- Create: `migrations/0392_ai_series_04_04_zh_plot_cards.sql`
- Create: `migrations/0393_ai_series_04_04_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-019-zh
- 标题: 人性元素

---

## 系列五：AI未来世界（4本）

### Task 37: 生成《The Singularity Diaries》英文版

**Files:**
- Create: `migrations/0400_ai_series_05_01_en_books.sql`
- Create: `migrations/0401_ai_series_05_01_en_characters.sql`
- Create: `migrations/0402_ai_series_05_01_en_plot_cards.sql`
- Create: `migrations/0403_ai_series_05_01_en_chapters_part1.sql`
- Create: `migrations/0404_ai_series_05_01_en_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-020
- 标题: The Singularity Diaries
- 类型: business
- 主角: Anna (科技记者)
- 情感主线: 记录AI超越人类的那一刻
- 章节数: 8章

---

### Task 38: 生成《The Singularity Diaries》中文版

**Files:**
- Create: `migrations/0410_ai_series_05_01_zh_books.sql`
- Create: `migrations/0411_ai_series_05_01_zh_characters.sql`
- Create: `migrations/0412_ai_series_05_01_zh_plot_cards.sql`
- Create: `migrations/0413_ai_series_05_01_zh_chapters_part1.sql`
- Create: `migrations/0414_ai_series_05_01_zh_chapters_part2.sql`

**书籍信息:**
- book_id: preset-ai-020-zh
- 标题: 奇点日记

---

### Task 39: 生成《Post-Human》英文版

**Files:**
- Create: `migrations/0420_ai_series_05_02_en_books.sql`
- Create: `migrations/0421_ai_series_05_02_en_characters.sql`
- Create: `migrations/0422_ai_series_05_02_en_plot_cards.sql`
- Create: `migrations/0423_ai_series_05_02_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-021
- 标题: Post-Human
- 类型: business
- 主角: David (普通人)
- 情感主线: 在AI主导的世界寻找人类位置
- 章节数: 7章

---

### Task 40: 生成《Post-Human》中文版

**Files:**
- Create: `migrations/0430_ai_series_05_02_zh_books.sql`
- Create: `migrations/0431_ai_series_05_02_zh_characters.sql`
- Create: `migrations/0432_ai_series_05_02_zh_plot_cards.sql`
- Create: `migrations/0433_ai_series_05_02_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-021-zh
- 标题: 后人类

---

### Task 41: 生成《The Memory Market》英文版

**Files:**
- Create: `migrations/0440_ai_series_05_03_en_books.sql`
- Create: `migrations/0441_ai_series_05_03_en_characters.sql`
- Create: `migrations/0442_ai_series_05_03_en_plot_cards.sql`
- Create: `migrations/0443_ai_series_05_03_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-022
- 标题: The Memory Market
- 类型: business
- 主角: Eleanor (老人)
- 情感主线: 出售记忆给AI训练，逐渐失去自我
- 章节数: 6章

---

### Task 42: 生成《The Memory Market》中文版

**Files:**
- Create: `migrations/0450_ai_series_05_03_zh_books.sql`
- Create: `migrations/0451_ai_series_05_03_zh_characters.sql`
- Create: `migrations/0452_ai_series_05_03_zh_plot_cards.sql`
- Create: `migrations/0453_ai_series_05_03_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-022-zh
- 标题: 记忆市场

---

### Task 43: 生成《Children of the Algorithm》英文版

**Files:**
- Create: `migrations/0460_ai_series_05_04_en_books.sql`
- Create: `migrations/0461_ai_series_05_04_en_characters.sql`
- Create: `migrations/0462_ai_series_05_04_en_plot_cards.sql`
- Create: `migrations/0463_ai_series_05_04_en_chapters.sql`

**书籍信息:**
- book_id: preset-ai-023
- 标题: Children of the Algorithm
- 类型: business
- 主角: Kai (青少年)
- 情感主线: 在AI教育系统中成长的困惑
- 章节数: 7章

---

### Task 44: 生成《Children of the Algorithm》中文版

**Files:**
- Create: `migrations/0470_ai_series_05_04_zh_books.sql`
- Create: `migrations/0471_ai_series_05_04_zh_characters.sql`
- Create: `migrations/0472_ai_series_05_04_zh_plot_cards.sql`
- Create: `migrations/0473_ai_series_05_04_zh_chapters.sql`

**书籍信息:**
- book_id: preset-ai-023-zh
- 标题: 算法之子

---

## 最终任务

### Task 45: 更新静态页面生成脚本

**Files:**
- Modify: `scripts/generate-preset-pages.js`

**Step 1: 在sqlPaths数组中添加所有新SQL文件路径**

---

### Task 46: 执行本地数据库迁移

**Step 1: 批量执行所有SQL迁移文件**

```bash
# 系列一剩余书籍
wrangler d1 execute storybook_database --local --file=./migrations/0040_ai_series_01_02_en_books.sql
# ... 所有SQL文件
```

---

### Task 47: 生成静态页面

**Step 1: 运行静态页面生成脚本**

```bash
node scripts/generate-preset-pages.js
```

---

### Task 48: 本地数据验证

**Step 1: 验证所有书籍数据**

```bash
wrangler d1 execute storybook_database --local --command "SELECT book_id, title, language FROM books WHERE book_id LIKE 'preset-ai-%'"
```

预期输出：46条记录（23本书 × 2语言）

---

### Task 49: 更新sitemap.xml

**Files:**
- Modify: `src/frontend/sitemap.xml`

**Step 1: 添加所有新书籍和章节URL**

---

### Task 50: 本地前端测试

**Step 1: 启动本地服务器**

```bash
wrangler pages dev src/frontend --port=8788
```

**Step 2: 验证所有书籍页面可访问**

---

## 等待部署指令

**注意：线上部署需要用户明确指令。**

只有当用户明确说以下指令时，才会执行线上部署：
- "部署到线上"
- "发布到生产环境"
- "执行线上部署"
- "deploy to production"

---

## 任务统计

| 系列 | 书籍数 | 任务数 |
|------|--------|--------|
| 系列一：AI职场危机 | 4本（剩余） | 8个任务 |
| 系列二：AI恋爱 | 5本 | 10个任务 |
| 系列三：AI人类冲突 | 5本 | 10个任务 |
| 系列四：AI创作危机 | 4本 | 8个任务 |
| 系列五：AI未来世界 | 4本 | 8个任务 |
| 最终任务 | - | 6个任务 |
| **总计** | **22本** | **50个任务** |
