# 书籍质量检测实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 对coo目录下41本书籍进行全面质量检测，生成质检报告和解决思路建议

**Architecture:** 串行执行，逐书逐章检测，10个维度共193项检测项，输出单书报告和汇总报告

**Tech Stack:** AI质检 + Markdown报告输出

**参考文档:** coo/docs/plans/2026-03-22-book-quality-standard-design.md

---

## 执行要求（强制）

```
┌─────────────────────────────────────────────────────────────┐
│                    执行要求（强制）                           │
├─────────────────────────────────────────────────────────────┤
│  ✅ 必须串行执行：每本书、每章按顺序逐一检测                   │
│  ✅ 必须全面覆盖：41本书籍，一本不允许遗漏                     │
│  ✅ 必须详细检测：每个检查项逐一检测，一项不漏                  │
│  ✅ 必须一次执行完毕：不能分批次执行                           │
│  ❌ 严禁批量执行：不能使用批量处理方式                         │
│  ❌ 严禁并行执行：不能同时检测多本书或多章                     │
│  ❌ 严禁跳过检测：不能跳过任何检查项                           │
│  ❌ 严禁筛检执行：不能只检测部分内容                           │
│  ❌ 严禁快速执行：不能为了速度而降低检测质量                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 书籍列表（41本）

| # | 书籍名称 | 状态 |
|---|----------|------|
| 1 | algorithmic-aesthetics | 待检测 |
| 2 | algorithmic-consciousness | 待检测 |
| 3 | algorithmic-ethics | 待检测 |
| 4 | algorithmic-humanity | 待检测 |
| 5 | algorithmic-identity | 待检测 |
| 6 | algorithmic-immortality | 待检测 |
| 7 | algorithmic-intent | 待检测 |
| 8 | algorithmic-self | 待检测 |
| 9 | algorithmic-truth | 待检测 |
| 10 | algorithmic-will | 待检测 |
| 11 | glitch-utopia-awakening-code | 待检测 |
| 12 | memory-park | 待检测 |
| 13 | memory-park-the-awakening | 待检测 |
| 14 | the-algorithmic-intimacy | 待检测 |
| 15 | the-algorithms-grimoire | 待检测 |
| 16 | the-algorithms-orphan | 待检测 |
| 17 | the-blame-game | 待检测 |
| 18 | the-borrowed-voice | 待检测 |
| 19 | the-calculated-risk | 待检测 |
| 20 | the-clockwork-oracle | 待检测 |
| 21 | the-degree-dust | 待检测 |
| 22 | the-digital-grimoire | 待检测 |
| 23 | the-digital-sage | 待检测 |
| 24 | the-efficiency-consultant | 待检测 |
| 25 | the-empty-mall | 待检测 |
| 26 | the-final-contribution | 待检测 |
| 27 | the-ghost-in-algorithm | 待检测 |
| 28 | the-ghost-writers-thesis | 待检测 |
| 29 | the-glass-ceiling | 待检测 |
| 30 | the-hollow-heart | 待检测 |
| 31 | the-last-curator | 待检测 |
| 32 | the-last-watt | 待检测 |
| 33 | the-neural-druid | 待检测 |
| 34 | the-optimized-student | 待检测 |
| 35 | the-oracle-of-valdoria | 待检测 |
| 36 | the-outsourced-memory | 待检测 |
| 37 | the-perfect-diagnosis | 待检测 |
| 38 | the-programmed-heart | 待检测 |
| 39 | the-prompt-mage | 待检测 |
| 40 | the-quantum-witch | 待检测 |
| 41 | the-silent-lab | 待检测 |

---

## Task 1: 读取质检标准文档

**Files:**
- Read: `coo/docs/plans/2026-03-22-book-quality-standard-design.md`

**Step 1: 读取质检标准文档**

读取质检标准设计文档，确认以下内容：
- 10个检测维度的检查项
- 评分机制和发布门槛
- 问题分级标准
- 报告格式要求

**Expected Output:**
- 确认193项检测项
- 确认评分规则
- 确认报告模板

---

## Task 2: 检测第1本书 - algorithmic-aesthetics

**Files:**
- Read: `coo/algorithmic-aesthetics/.progress/book-spec.md`
- Read: `coo/algorithmic-aesthetics/.progress/seo-meta.md`
- Read: `coo/algorithmic-aesthetics/chapters/chapter-01.md` ~ `chapter-10.md`
- Create: `coo/docs/reports/quality-check/algorithmic-aesthetics-report.md`

**Step 1: 读取书籍规格文档**

读取以下文件：
- `coo/algorithmic-aesthetics/.progress/book-spec.md`
- `coo/algorithmic-aesthetics/.progress/seo-meta.md`

提取关键信息：
- 书籍标题、类型、目标读者
- 章节标题列表
- 关键词列表
- 角色设定

**Step 2: 检测第1章**

读取 `coo/algorithmic-aesthetics/chapters/chapter-01.md`

执行10个维度检测：

**维度1: 内容质量（5项）**
- 情节连贯性：检查是否有逻辑断裂
- 角色一致性：检查角色设定是否与规格一致
- 世界观一致性：检查设定是否前后一致
- 章节衔接：检查与下一章的衔接
- 结局完整性：检查章节结尾是否完整

**维度2: AI痕迹检测（148项）**
- 第一层：词汇层面（25项）
  - AI高频词汇检测
  - 词汇重复问题检测
  - 词汇选择问题检测
- 第二层：句子层面（20项）
  - 句式模式问题
  - 标点使用问题
  - 句子逻辑问题
- 第三层：段落层面（15项）
  - 段落结构问题
  - 过渡模式问题
  - 信息分布问题
- 第四层：章节层面（15项）
  - 章节结构问题
  - 章节衔接问题
  - 章节完整性问题
- 第五层：内容层面（20项）
  - 情感描写问题
  - 对话质量问题
  - 描写深度问题
  - 逻辑深度问题
- 第六层：风格层面（10项）
  - 风格一致性问题
  - 风格独特性问题
  - 可读性问题
- 第七层：Google E-E-A-T专项（15项）
  - Experience检测
  - Expertise检测
  - Authoritativeness检测
  - Trustworthiness检测
- 第八层：Google Helpful Content专项（10项）
  - 读者价值检测
  - 满足搜索意图检测
- 第九层：Google AI检测算法专项（10项）
  - 语言模式检测
  - 内容模式检测
- 第十层：Google最新AI检测技术（8项）
  - 水印检测
  - 语义一致性检测
  - 创意原创性检测

**维度3: SEO优化（5项）**
- 章节标题优化
- 元描述质量
- 关键词密度
- 内容结构
- 内链机会

**维度4: 欧美读者适配（5项）**
- 文化准确性
- 生活场景真实性
- 语言地道性
- 价值观适配
- 地名/人名规范

**维度5: 语言连贯性（5项）**
- 句子连贯性
- 段落过渡
- 时态一致性
- 代词指代
- 重复表达

**维度6: 格式规范（5项）**
- 章节标题格式
- 段落格式
- 字数要求
- 文件命名
- 编码格式

**维度7: 法律风险（5项）**
- 版权问题
- 敏感内容
- 商标侵权
- 人物侵权
- 地名侵权

**维度8: 技术实现（5项）**
- 三层情感模型
- 感官细节要求
- 对话标签多样性
- 禁止元素检测
- 角色声音一致性

**维度9: 读者体验（5项）**
- 开篇吸引力
- 节奏控制
- 悬念设置
- 结尾效果
- 阅读流畅度

**维度10: 跨文档一致性（5项）**
- 书籍规格一致性
- SEO元数据一致性
- 角色设定一致性
- 系列书籍一致性
- 关键词一致性

**Step 3: 记录第1章检测结果**

记录以下内容：
- 各维度得分
- 发现的问题（按严重程度分类）
- 问题具体位置和描述
- 解决思路建议

**Step 4: 检测第2-10章**

按照Step 2-3的流程，逐一检测第2-10章：
- `coo/algorithmic-aesthetics/chapters/chapter-02.md`
- `coo/algorithmic-aesthetics/chapters/chapter-03.md`
- `coo/algorithmic-aesthetics/chapters/chapter-04.md`
- `coo/algorithmic-aesthetics/chapters/chapter-05.md`
- `coo/algorithmic-aesthetics/chapters/chapter-06.md`
- `coo/algorithmic-aesthetics/chapters/chapter-07.md`
- `coo/algorithmic-aesthetics/chapters/chapter-08.md`
- `coo/algorithmic-aesthetics/chapters/chapter-09.md`
- `coo/algorithmic-aesthetics/chapters/chapter-10.md`

**Step 5: 计算总分**

根据各章节检测结果，计算：
- 各维度平均得分
- 加权总分
- 问题总数统计

**Step 6: 生成单书报告**

创建报告文件：`coo/docs/reports/quality-check/algorithmic-aesthetics-report.md`

报告格式：
```markdown
# 书籍质量检测报告：algorithmic-aesthetics

> **检测日期**: 2026-03-22
> **检测版本**: v1.0
> **检测范围**: 全部10章

---

## 一、总体评估

| 项目 | 结果 |
|------|------|
| **总分** | XX/100 |
| **质量等级** | A/B/C/D/F |
| **发布建议** | 可发布/需优化/不可发布 |
| **严重问题** | X个 |
| **中等问题** | X个 |
| **轻微问题** | X个 |

---

## 二、维度得分

| 维度 | 得分 | 权重 | 加权得分 | 问题数 |
|------|------|------|----------|--------|
| 内容质量 | XX | 20% | XX | X |
| AI痕迹检测 | XX | 15% | XX | X |
| SEO优化 | XX | 15% | XX | X |
| 欧美读者适配 | XX | 15% | XX | X |
| 语言连贯性 | XX | 10% | XX | X |
| 技术实现 | XX | 10% | XX | X |
| 格式规范 | XX | 5% | XX | X |
| 法律风险 | XX | 5% | XX | X |
| 读者体验 | XX | 5% | XX | X |
| **总分** | - | - | **XX** | **X** |

---

## 三、问题列表

### 3.1 严重问题（必须修复）

| # | 章节 | 维度 | 问题描述 | 解决思路 |
|---|------|------|----------|----------|
| 1 | Ch3 | 内容质量 | 情节前后矛盾 | 建议重写第3章后半部分 |

### 3.2 中等问题（建议修复）

| # | 章节 | 维度 | 问题描述 | 解决思路 |
|---|------|------|----------|----------|
| 1 | Ch1 | AI痕迹 | 发现AI词汇"tapestry" | 建议替换为具体描述 |

### 3.3 轻微问题（可选修复）

| # | 章节 | 维度 | 问题描述 | 解决思路 |
|---|------|------|----------|----------|
| 1 | Ch5 | SEO优化 | 章节标题关键词不足 | 建议优化标题 |

---

## 四、跨文档一致性检测

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 书籍规格一致性 | ✅/⚠️/❌ | 说明 |
| SEO元数据一致性 | ✅/⚠️/❌ | 说明 |
| 角色设定一致性 | ✅/⚠️/❌ | 说明 |

---

## 五、章节详细检测

### 第1章：[章节标题]

| 维度 | 得分 | 问题数 |
|------|------|--------|
| 内容质量 | XX | X |
| AI痕迹检测 | XX | X |
| ... | ... | ... |

**问题列表**：
1. [问题描述]
2. [问题描述]

---

## 六、发布建议

[根据检测结果给出具体发布建议]
```

---

## Task 3-41: 检测第2-40本书

按照Task 2的流程，逐一检测剩余40本书：

| Task | 书籍名称 |
|------|----------|
| 3 | algorithmic-consciousness |
| 4 | algorithmic-ethics |
| 5 | algorithmic-humanity |
| 6 | algorithmic-identity |
| 7 | algorithmic-immortality |
| 8 | algorithmic-intent |
| 9 | algorithmic-self |
| 10 | algorithmic-truth |
| 11 | algorithmic-will |
| 12 | glitch-utopia-awakening-code |
| 13 | memory-park |
| 14 | memory-park-the-awakening |
| 15 | the-algorithmic-intimacy |
| 16 | the-algorithms-grimoire |
| 17 | the-algorithms-orphan |
| 18 | the-blame-game |
| 19 | the-borrowed-voice |
| 20 | the-calculated-risk |
| 21 | the-clockwork-oracle |
| 22 | the-degree-dust |
| 23 | the-digital-grimoire |
| 24 | the-digital-sage |
| 25 | the-efficiency-consultant |
| 26 | the-empty-mall |
| 27 | the-final-contribution |
| 28 | the-ghost-in-algorithm |
| 29 | the-ghost-writers-thesis |
| 30 | the-glass-ceiling |
| 31 | the-hollow-heart |
| 32 | the-last-curator |
| 33 | the-last-watt |
| 34 | the-neural-druid |
| 35 | the-optimized-student |
| 36 | the-oracle-of-valdoria |
| 37 | the-outsourced-memory |
| 38 | the-perfect-diagnosis |
| 39 | the-programmed-heart |
| 40 | the-prompt-mage |
| 41 | the-quantum-witch |
| 42 | the-silent-lab |

每本书的检测流程相同：
1. 读取书籍规格文档
2. 逐章检测（10章）
3. 记录检测结果
4. 计算总分
5. 生成单书报告

---

## Task 42: 生成汇总报告

**Files:**
- Create: `coo/docs/reports/quality-check/summary-report.md`

**Step 1: 汇总所有书籍检测结果**

统计以下内容：
- 各质量等级书籍数量
- 各维度平均得分
- 问题总数统计
- 优先修复列表

**Step 2: 生成汇总报告**

创建报告文件：`coo/docs/reports/quality-check/summary-report.md`

报告格式：
```markdown
# 书籍质量检测汇总报告

> **检测日期**: 2026-03-22
> **检测范围**: 41本书籍

---

## 一、总体统计

| 项目 | 数量 | 占比 |
|------|------|------|
| 可直接发布 | X本 | X% |
| 需优化后发布 | X本 | X% |
| 不可发布 | X本 | X% |

---

## 二、质量等级分布

| 等级 | 数量 | 书籍列表 |
|------|------|----------|
| A级(90-100) | X本 | [列表] |
| B级(80-89) | X本 | [列表] |
| C级(70-79) | X本 | [列表] |
| D级(60-69) | X本 | [列表] |
| F级(<60) | X本 | [列表] |

---

## 三、维度平均得分

| 维度 | 平均得分 | 最高分 | 最低分 |
|------|----------|--------|--------|
| 内容质量 | XX | XX | XX |
| AI痕迹检测 | XX | XX | XX |
| SEO优化 | XX | XX | XX |
| 欧美读者适配 | XX | XX | XX |
| 语言连贯性 | XX | XX | XX |
| 技术实现 | XX | XX | XX |
| 格式规范 | XX | XX | XX |
| 法律风险 | XX | XX | XX |
| 读者体验 | XX | XX | XX |

---

## 四、问题统计

| 维度 | 严重问题 | 中等问题 | 轻微问题 |
|------|----------|----------|----------|
| 内容质量 | X | X | X |
| AI痕迹检测 | X | X | X |
| SEO优化 | X | X | X |
| 欧美读者适配 | X | X | X |
| 语言连贯性 | X | X | X |
| 技术实现 | X | X | X |
| 格式规范 | X | X | X |
| 法律风险 | X | X | X |
| 读者体验 | X | X | X |
| **总计** | **X** | **X** | **X** |

---

## 五、优先修复列表

### P0（严重问题，必须修复）

| 书籍 | 问题数 | 主要问题 |
|------|--------|----------|
| [书籍名] | X | [问题描述] |

### P1（中等问题，建议修复）

| 书籍 | 问题数 | 主要问题 |
|------|--------|----------|
| [书籍名] | X | [问题描述] |

### P2（轻微问题，可选修复）

| 书籍 | 问题数 | 主要问题 |
|------|--------|----------|
| [书籍名] | X | [问题描述] |

---

## 六、详细报告列表

| # | 书籍名称 | 总分 | 等级 | 报告链接 |
|---|----------|------|------|----------|
| 1 | algorithmic-aesthetics | XX | A/B/C/D/F | [查看](./algorithmic-aesthetics-report.md) |
| 2 | algorithmic-consciousness | XX | A/B/C/D/F | [查看](./algorithmic-consciousness-report.md) |
| ... | ... | ... | ... | ... |

---

**报告完成时间**: 2026-03-22
**检测执行者**: AI Assistant
```

---

## 执行检查清单

在执行过程中，请确认以下事项：

### 开始前检查
- [ ] 已阅读质检标准设计文档
- [ ] 已确认10个维度的检测项
- [ ] 已确认评分规则
- [ ] 已确认报告格式

### 每本书检查
- [ ] 已读取书籍规格文档
- [ ] 已逐章检测（10章）
- [ ] 已记录所有问题
- [ ] 已计算总分
- [ ] 已生成单书报告

### 完成后检查
- [ ] 已检测41本书籍
- [ ] 已生成41份单书报告
- [ ] 已生成汇总报告
- [ ] 无遗漏书籍
- [ ] 无遗漏检测项

---

## 预计输出

| 输出项 | 数量 | 位置 |
|--------|------|------|
| 单书报告 | 41份 | coo/docs/reports/quality-check/[书名]-report.md |
| 汇总报告 | 1份 | coo/docs/reports/quality-check/summary-report.md |

---

**计划创建时间**: 2026-03-22
**计划创建者**: AI Assistant
