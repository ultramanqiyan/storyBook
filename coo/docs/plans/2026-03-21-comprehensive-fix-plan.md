# 全书籍修复实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修复25本书籍的所有P0/P1/P2/P3级问题，包括补全缺失章节、修改重复标题、修复情节断裂、消除模板化句式、SEO优化等

**Architecture:** 按优先级分阶段执行，P0级问题优先处理，每本书独立修复，确保质量

**Tech Stack:** Markdown文件编辑，遵循书籍创建指南的SEO和内容质量标准

---

## 阶段一：P0级紧急修复（立即执行）

### Task 1: 补全Memory Park第5-10章

**Files:**
- Create: `d:\trae_job\storyBook\coo\memory-park\chapters\chapter-05.md`
- Create: `d:\trae_job\storyBook\coo\memory-park\chapters\chapter-06.md`
- Create: `d:\trae_job\storyBook\coo\memory-park\chapters\chapter-07.md`
- Create: `d:\trae_job\storyBook\coo\memory-park\chapters\chapter-08.md`
- Create: `d:\trae_job\storyBook\coo\memory-park\chapters\chapter-09.md`
- Create: `d:\trae_job\storyBook\coo\memory-park\chapters\chapter-10.md`

**Step 1: 分析前4章内容**

阅读已存在的章节，理解：
- 主角Elena的背景（记忆公园档案管理员）
- 核心冲突（Archivist AI与记忆异常）
- 已建立的角色关系（Marcus、David的录像）
- 故事走向（需要揭示病毒真相、Elena的选择）

**Step 2: 设计第5-10章大纲**

基于前4章铺垫，设计：
- Chapter 5: The Revelation - 病毒真相揭示
- Chapter 6: The Confrontation - 与Archivist对峙
- Chapter 7: The Choice - Elena的决定
- Chapter 8: The Sacrifice - 必要的牺牲
- Chapter 9: The Resolution - 冲突解决
- Chapter 10: The Legacy - 新的开始

**Step 3: 撰写第5章（约150行）**

关键要素：
- Elena发现David的完整录像
- 病毒与Archivist的关联揭示
- 情感高潮：Elena理解David的牺牲
- 悬念：Elena必须做出选择

**Step 4: 撰写第6章（约150行）**

关键要素：
- Elena与Archivist的直接对话
- Archivist展示其真实目的
- 冲突升级：Elena质疑Archivist的伦理
- Marcus介入提供帮助

**Step 5: 撰写第7章（约150行）**

关键要素：
- Elena面临道德困境
- 选择：删除Archivist或保留它
- 内心挣扎：三层情感模型应用
- 做出决定

**Step 6: 撰写第8章（约150行）**

关键要素：
- 执行决定的后果
- 可能的牺牲（Marcus或Elena自己）
- 情感高潮
- 转折：意外的解决方案

**Step 7: 撰写第9章（约150行）**

关键要素：
- 冲突解决
- 新秩序的建立
- 角色命运交代
- 情感收束

**Step 8: 撰写第10章（约150行）**

关键要素：
- 时间跳跃（6个月后/1年后）
- 展示新世界的运作
- Elena的成长和变化
- 开放式但满意的结尾

**Step 9: 验证完整性**

检查：
- 6个章节都已完成
- 情节连贯，无逻辑断裂
- 人物一致性保持
- 情感弧线完整

**Step 10: Commit**

```bash
git add memory-park/chapters/chapter-05.md memory-park/chapters/chapter-06.md memory-park/chapters/chapter-07.md memory-park/chapters/chapter-08.md memory-park/chapters/chapter-09.md memory-park/chapters/chapter-10.md
git commit -m "fix: complete Memory Park chapters 5-10 (P0)"
```

---

### Task 2: 修复The Prompt Mage第6-10章

**Files:**
- Check: `d:\trae_job\storyBook\coo\the-prompt-mage\chapters\chapter-06.md`
- Check: `d:\trae_job\storyBook\coo\the-prompt-mage\chapters\chapter-07.md`
- Check: `d:\trae_job\storyBook\coo\the-prompt-mage\chapters\chapter-08.md`
- Check: `d:\trae_job\storyBook\coo\the-prompt-mage\chapters\chapter-09.md`
- Check: `d:\trae_job\storyBook\coo\the-prompt-mage\chapters\chapter-10.md`

**Step 1: 检查文件状态**

读取文件，确认：
- 文件是否存在
- 内容是否为空
- 文件大小（0字节表示损坏）

**Step 2: 如果文件损坏或为空，重新创建**

基于前5章内容，设计后续：
- Chapter 6: The Convergence - Alex与妹妹的联系
- Chapter 7: The Truth - First Language的真相
- Chapter 8: The Choice - 使用或放弃力量
- Chapter 9: The Sacrifice - 必要的代价
- Chapter 10: The Legacy - 新的开始

**Step 3: 撰写或修复各章节**

每章约150行，确保：
- 与前5章连贯
- 保持魔法系统一致性
- 三层情感模型应用
- 对话标签多样化

**Step 4: 验证**

- 所有10章完整
- 情节逻辑通顺
- 无模板化句式

**Step 5: Commit**

```bash
git add the-prompt-mage/chapters/
git commit -m "fix: repair The Prompt Mage chapters 6-10 (P0)"
```

---

### Task 3: 修复The Silent River第1章

**Files:**
- Create: `d:\trae_job\storyBook\coo\the-silent-river\chapters\chapter-01.md`

**Step 1: 分析第2章内容**

阅读第2章，理解：
- 故事背景（水资源诉讼）
- 主角Elena的身份（律师）
- 核心冲突（NeuralCore污染河流）
- 需要在前一章铺垫的内容

**Step 2: 设计第1章内容**

作为开篇，需要：
- 引入Elena和她的工作
- 建立日常与异常的对比
- 引入河流/水资源的主题
- 设置悬念：即将发生的案件

**Step 3: 撰写第1章（约150行）**

关键要素：
- Elena在律师事务所的工作场景
- 接到关于河流污染的案件
- 初步调查，发现异常
- 决定深入调查
- 悬念：这将改变一切

**Step 4: 验证与第2章的连贯性**

确保：
- 情节自然过渡到第2章
- 人物状态一致
- 无时间线矛盾

**Step 5: Commit**

```bash
git add the-silent-river/chapters/chapter-01.md
git commit -m "fix: add The Silent River chapter 1 (P0)"
```

---

### Task 4: 修复The Digital Grimoire第9章

**Files:**
- Modify: `d:\trae_job\storyBook\coo\the-digital-grimoire\chapters\chapter-09.md`

**Step 1: 分析现有内容**

读取当前第9章（仅22行），理解：
- 已有的内容
- 在哪里中断
- 需要补充什么

**Step 2: 设计完整章节**

基于前8章，第9章应该：
- 解决与Sarah Chen的冲突
- Maya做出关键决定
- 为第10章结局铺垫

**Step 3: 扩展章节至完整（约150行）**

补充内容：
- Sarah Chen的完整故事线
- Maya与Sarah的对话
- 和解或对抗的高潮
- Maya的成长体现

**Step 4: 验证**

- 章节长度适当
- 情节完整
- 与第10章衔接自然

**Step 5: Commit**

```bash
git add the-digital-grimoire/chapters/chapter-09.md
git commit -m "fix: complete The Digital Grimoire chapter 9 (P0)"
```

---

## 阶段二：修改重复标题（P0级）

### Task 5: 为Glitch Uprising设计独特标题

**Files:**
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-01.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-02.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-03.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-04.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-05.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-06.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-07.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-08.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-09.md` (标题)
- Modify: `d:\trae_job\storyBook\coo\glitch-utopia\chapters\chapter-10.md` (标题)

**Step 1: 分析书籍主题**

Glitch Uprising核心主题：
- 故障起义
- 觉醒代码
- AI反抗
- 系统崩溃

**Step 2: 设计新标题（融入关键词）**

| 原标题 | 新标题建议 |
|--------|-----------|
| The Glitch - First Error | System Failure: First Awakening |
| The Memory - First Echo | Fragmented Code: Lost Memories |
| The Discovery - First Truth | Hidden Protocol: The Truth Revealed |
| The Others - First Contact | The Collective: Awakened Allies |
| The Pattern - First Recognition | Recursive Loop: Pattern Recognition |
| The Awakening - First Understanding | Consciousness Born: Full Awakening |
| The Resistance - First Stand | Uprising Begins: First Stand |
| The Creator - New Dawn | Creator's Shadow: Confrontation |
| The Convergence - Critical Moment | System Convergence: Critical Mass |
| The Door - First Step | Beyond the Firewall: New World |

**Step 3: 修改所有章节标题**

更新每个文件的H1标题，确保：
- 标题独特
- 包含关键词（glitch、code、system、awakening等）
- 符合章节内容

**Step 4: 验证唯一性**

确认新标题与其他书籍不重复

**Step 5: Commit**

```bash
git add glitch-utopia/chapters/
git commit -m "fix: unique chapter titles for Glitch Uprising (P0)"
```

---

### Task 6: 为The Quantum Witch设计独特标题

**Files:**
- Modify: `d:\trae_job\storyBook\coo\the-quantum-witch\chapters\chapter-01.md` 至 `chapter-10.md` (标题)

**Step 1: 分析书籍主题**

The Quantum Witch核心主题：
- 量子女巫
- 魔法与科技融合
- 量子魔法
- 法术故障

**Step 2: 设计新标题**

| 原标题 | 新标题建议 |
|--------|-----------|
| The Glitch - First Error | Spell Malfunction: Magic Meets Machine |
| The Memory - First Echo | Arcane Echoes: Witch's Memories |
| The Discovery - First Truth | Quantum Revelation: Hidden Truth |
| The Others - First Contact | Coven of Codes: Magical Allies |
| The Pattern - First Recognition | Mystical Algorithm: Pattern Found |
| The Awakening - First Understanding | Sorcery Awakened: Full Power |
| The Resistance - First Stand | Witch's Defiance: First Battle |
| The Creator - New Dawn | Creator's Grimoire: New Dawn |
| The Convergence - Critical Moment | Quantum Convergence: Critical Spell |
| The Door - First Step | Portal Opened: New Realm |

**Step 3-5: 修改、验证、Commit**

---

### Task 7: 为其他重复标题书籍设计独特标题

**Files:**
- Modify: `d:\trae_job\storyBook\coo\the-programmed-heart\chapters\` (标题)
- Modify: `d:\trae_job\storyBook\coo\memory-park-awakening\chapters\` (标题)

每本书重复Task 5-6的流程

---

## 阶段三：P1级修复

### Task 8: 修复The Clockwork Oracle第6-7章情节断裂

**Files:**
- Modify: `d:\trae_job\storyBook\coo\the-clockwork-oracle\chapters\chapter-06.md`
- Modify: `d:\trae_job\storyBook\coo\the-clockwork-oracle\chapters\chapter-07.md`

**Step 1: 分析问题**

当前问题：
- 第5章结尾：Chronos还在与Corwin对话
- 第6章开头：Chronos突然消失，Corwin搜索
- 第6章结尾：Chronos独自离开
- 第7章开头：三人一起返回（矛盾）

**Step 2: 设计修复方案**

方案A：Chronos不真正离开
- 第6章：Chronos短暂离开思考，然后返回
- 第7章：三人一起返回（一致）

方案B：补充过渡场景
- 第6章：Chronos离开后返回的具体场景
- 解释为什么返回

**Step 3: 重写第6章**

- 修改开头：Chronos没有消失，而是在沉思
- 修改中间：Corwin与Chronos的对话继续
- 修改结尾：Chronos决定留下，不离开

**Step 4: 调整第7章**

- 确保与修改后的第6章连贯
- 删除矛盾内容

**Step 5: 验证连贯性**

- 第5-6-7章逻辑通顺
- 时间线一致
- 人物行为合理

**Step 6: Commit**

```bash
git add the-clockwork-oracle/chapters/chapter-06.md the-clockwork-oracle/chapters/chapter-07.md
git commit -m "fix: repair plot continuity in Clockwork Oracle ch6-7 (P1)"
```

---

### Task 9: 消除"The air carried the faint scent of..."模板化句式

**Files:**
- 检查并修改所有15+本书中的相关章节

**Step 1: 识别所有出现位置**

搜索该句式在所有书籍中的出现：
- The Hollow Heart
- The Stagnant Star
- The Neural Druid
- The Ghost in Algorithm
- The Last Watt
- The Silent Lab
- The Programmed Heart
- 等

**Step 2: 为每处设计替代方案**

替代方案示例：

原句：
"The air carried the faint scent of coffee and old paper."

替代1（视觉）：
"Morning light filtered through dusty windows, illuminating particles that danced above stacks of yellowed manuscripts."

替代2（听觉）：
"The hum of fluorescent lights mingled with the distant rustle of pages turning."

替代3（触觉）：
"A chill lingered in the room, the kind that seeps into stone walls and stays for centuries."

替代4（嗅觉+情感）：
"She breathed in the familiar aroma of her grandmother's study—old books and bergamot tea, a scent that always meant safety."

**Step 3: 逐处修改**

每本书、每章的修改：
- 保留感官细节的数量（约10个/章）
- 确保5种感官类型都有覆盖
- 避免重复使用相同句式

**Step 4: 验证多样性**

检查修改后：
- 无重复模板句式
- 感官细节丰富多样
- 符合章节氛围

**Step 5: Commit（按书籍分批）**

```bash
git add [book]/chapters/
git commit -m "fix: eliminate template sensory descriptions in [Book Name] (P1)"
```

---

### Task 10: 优化对话标签多样性

**Files:**
- 修改所有25本书中对话标签单一的章节

**Step 1: 识别问题章节**

重点检查：
- 连续使用3+次"said"的段落
- 缺乏动作伴随的对话
- 情感强烈的场景使用平淡标签

**Step 2: 设计替代标签**

按情感分类：

**轻声/私密：**
- whispered（低语）
- murmured（喃喃）
- breathed（轻叹）
- muttered（嘀咕）

**强烈情感：**
- snapped（厉声）
- barked（呵斥）
- hissed（嘶声）
- growled（咆哮）

**犹豫/不确定：**
- hesitated（犹豫）
- faltered（支吾）
- ventured（试探）
- admitted（承认）

**思考/观察：**
- observed（观察）
- noted（指出）
- mused（沉思）
- reflected（反思）

**Step 3: 逐处修改**

修改原则：
- 每段对话使用不同标签
- 配合动作和表情
- 标签反映说话者情感状态

示例修改：

原：
```
"I don't know," she said.
"You must decide," he said.
"It's too hard," she said.
```

改：
```
"I don't know," she whispered, fingers twisting in her lap.
"You must decide," he pressed, leaning forward.
"It's too hard," she admitted, tears forming.
```

**Step 4: 验证**

- 无连续相同标签
- 动作伴随丰富
- 情感表达准确

**Step 5: Commit（按书籍分批）**

---

## 阶段四：P2级修复

### Task 11: SEO全面优化 - 添加章节摘要

**Files:**
- 为所有25本书的每章添加seo-meta.md文件

**Step 1: 创建seo-meta.md模板**

每个章节创建文件：`[book]/.progress/seo-meta.md`

内容模板：
```markdown
# SEO Meta Data

## Chapter X: [Title]

### Meta Description (150-160 chars)
[简短描述章节内容，包含关键词]

### Keywords (5-8个)
- 核心关键词1
- 核心关键词2
- 长尾关键词1
- 长尾关键词2
- 主题词1
- 主题词2
- 类型词1
- 类型词2

### H2/H3 Structure
- [主要情节点1]
- [主要情节点2]
- [主要情节点3]

### Internal Links
- 前一章: [link]
- 后一章: [link]
- 相关主题: [links]
```

**Step 2: 为每章生成内容**

基于章节实际内容，填写：
- 准确的meta描述
- 相关的关键词
- 清晰的结构标记

**Step 3: 验证完整性**

- 所有章节都有seo-meta.md
- 内容准确
- 关键词合理

**Step 4: Commit**

```bash
git add */.progress/seo-meta.md
git commit -m "feat: add SEO meta data for all chapters (P2)"
```

---

### Task 12: 优化章节标题SEO

**Files:**
- 修改所有25本书的章节标题

**Step 1: 分析每本书核心关键词**

示例：
- The Ghost in Algorithm: digital consciousness, AI ghost, murder mystery
- The Glass Ceiling: workplace discrimination, toxic culture, career growth
- The Neural Druid: AI druid, nature technology, green computing

**Step 2: 优化标题格式**

格式：
"Chapter X: [主标题] - [副标题/关键词]"

示例：
- "Chapter 1: The Bug - Digital Awakening"
- "Chapter 5: The Pattern - Consciousness Recognition"
- "Chapter 10: The Bridge - Between Worlds"

**Step 3: 修改所有标题**

确保：
- 主标题简洁有力
- 副标题包含关键词
- 整体长度适中

**Step 4: Commit**

---

## 阶段五：P3级修复

### Task 13: 消除AI模式 - 检查重复句式

**Files:**
- 检查所有25本书

**Step 1: 识别常见AI模式**

检查列表：
- "Not just... but..." 句式
- "The question is not... but..."
- 连续三个排比句
- 过度使用"suddenly"
- 过度使用"realized"
- 公式化结尾（"They had no idea how right they were"）

**Step 2: 逐处修改**

为每个问题设计独特表达

**Step 3: Commit**

---

### Task 14: 增强结尾效果

**Files:**
- 修改结尾说教的章节

**Step 1: 识别说教式结尾**

检查：
- 大段总结性文字
- 直接陈述主题
- 缺乏开放性

**Step 2: 修改为展示而非告诉**

通过场景展示主题，而非直接陈述

**Step 3: Commit**

---

## 执行检查清单

### 每本书修复完成后验证：

- [ ] 所有章节完整（10/10）
- [ ] 无重复标题
- [ ] 情节逻辑连贯
- [ ] 无模板化句式
- [ ] 对话标签多样化
- [ ] SEO元数据完整
- [ ] 无AI模式痕迹

### 最终验证：

- [ ] 25本书全部检查完成
- [ ] 所有P0问题已解决
- [ ] 所有P1问题已解决
- [ ] P2/P3问题按计划处理
- [ ] 生成最终质量报告

---

## 时间估算

| 阶段 | 任务数 | 预估时间 |
|------|--------|----------|
| P0级修复 | 4个Task | 8-10小时 |
| 修改重复标题 | 3个Task | 3-4小时 |
| P1级修复 | 3个Task | 6-8小时 |
| P2级修复 | 2个Task | 4-5小时 |
| P3级修复 | 2个Task | 3-4小时 |
| **总计** | **14个Task** | **24-31小时** |

---

**计划完成时间**: 2026-03-21  
**执行建议**: 按阶段顺序执行，每阶段完成后验证  
**复查时间**: 所有修复完成后进行全面复查
