# COO书籍质量检测与修复实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 按照2026-03-22-book-quality-standard-design.md标准，串行检查coo目录下所有书籍，检查完毕一本书后修复这本书问题，然后再下一本

**Architecture:** 按日期从后往前顺序，逐书串行检测，每本书逐章检测198项检测项，检测完成后立即修复，再进入下一本

**Tech Stack:** Markdown文档检测与修复，质量标准文档

---

## 执行要求（强制）

```
┌─────────────────────────────────────────────────────────────┐
│                   执行要求（强制）                           │
├─────────────────────────────────────────────────────────────┤
│ ✅ 必须串行执行：每本书、每章按顺序逐一检测                  │
│ ✅ 必须全面覆盖：所有书籍，一本不允许遗漏                    │
│ ✅ 必须详细检测：每个检查项逐一检测，一项不漏                │
│ ✅ 必须检测后修复：检查完毕一本书后立即修复问题              │
│ ❌ 严禁批量执行：不能使用批量处理方式                        │
│ ❌ 严禁并行执行：不能同时检测多本书或多章                    │
│ ❌ 严禁跳过检测：不能跳过任何检查项                          │
│ ❌ 严禁简化检测：不能简化或跳过任何检测步骤                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 质量检测标准文档路径

`coo/docs/plans/2026-03-22-book-quality-standard-design.md`

---

## 检测维度与权重（共198项检测项）

| 维度 | 权重 | 检测项数 | 优先级 |
|------|------|----------|--------|
| 内容质量 | 20% | 5项 | P0 |
| AI痕迹检测 | 15% | 148项 | P0 |
| SEO优化 | 15% | 5项 | P0 |
| 欧美读者适配 | 15% | 5项 | P0 |
| 语言连贯性 | 10% | 5项 | P1 |
| 技术实现 | 10% | 5项 | P1 |
| 格式规范 | 5% | 5项 | P2 |
| 法律风险 | 5% | 5项 | P2 |
| 读者体验 | 5% | 5项 | P2 |
| 跨文档一致性 | - | 5项 | P0 |
| 文档格式规范 | - | 5项 | P2 |

---

## 书籍检测顺序（按日期从后往前）

### 第一批：2026-03-27（3本）

| 序号 | 书名 | 章节数 |
|------|------|--------|
| 1 | algorithmic-aesthetics | 10章 |
| 2 | algorithmic-identity | 10章 |
| 3 | the-oracle-of-valdoria | 10章 |

### 第二批：2026-03-26（26本）

| 序号 | 书名 | 章节数 |
|------|------|--------|
| 4 | the-token-addict-rusty-craft | 10章 |
| 5 | the-token-addict-empty-canvas | 10章 |
| 6 | the-token-addict-drifting-will | 10章 |
| 7 | the-token-addict-silent-room | 10章 |
| 8 | the-token-addict-fragile-heart | 10章 |
| 9 | the-iteration-cycle | 10章 |
| 10 | the-transition-point | 10章 |
| 11 | the-pain-paradox | 10章 |
| 12 | the-deep-dive | 10章 |
| 13 | algorithmic-will | 10章 |
| 14 | the-play-state | 10章 |
| 15 | the-verificationist | 10章 |
| 16 | the-unexplained-verdict | 10章 |
| 17 | the-token-addict-dissolving-self | 10章 |
| 18 | the-token-addict-blurred-line | 10章 |
| 19 | the-moral-arc | 10章 |
| 20 | the-long-game | 10章 |
| 21 | the-forever-trap | 10章 |
| 22 | the-empty-vessel | 10章 |
| 23 | algorithmic-self | 10章 |
| 24 | the-threshold-state | 10章 |
| 25 | the-simulation-layer | 10章 |
| 26 | the-pattern-within | 10章 |
| 27 | the-entropy-horizon | 10章 |
| 28 | the-cosmic-frequency | 10章 |
| 29 | the-causal-web | 10章 |

### 第三批：2026-03-25（50本）

| 序号 | 书名 | 章节数 |
|------|------|--------|
| 30 | the-whispering-network | 10章 |
| 31 | the-memory-weaver | 10章 |
| 32 | the-final-contribution | 10章 |
| 33 | the-blame-game | 10章 |
| 34 | algorithmic-truth | 10章 |
| 35 | the-self-reliant-mind | 10章 |
| 36 | the-silent-partner | 10章 |
| 37 | the-perfect-diagnosis | 10章 |
| 38 | the-heart-algorithm | 10章 |
| 39 | the-glass-ceiling | 10章 |
| 40 | the-efficiency-consultant | 10章 |
| 41 | the-action-antidote | 10章 |
| 42 | algorithmic-consciousness | 10章 |
| 43 | the-synthetic-soul | 10章 |
| 44 | the-symphony-of-oneself | 10章 |
| 45 | the-silent-symphony | 10章 |
| 46 | the-optimized-student | 10章 |
| 47 | the-empty-mall | 10章 |
| 48 | the-digital-sage | 10章 |
| 49 | the-community-effect | 10章 |
| 50 | the-canvas-void | 10章 |
| 51 | the-algorithms-orphan | 10章 |
| 52 | the-token-addict-borrowed-mind | 10章 |
| 53 | the-skin-garden | 10章 |
| 54 | the-programmed-heart | 10章 |
| 55 | the-outsourced-memory | 10章 |
| 56 | the-memory-farm | 10章 |
| 57 | the-hollow-heart | 10章 |
| 58 | the-ghost-writers-thesis | 10章 |
| 59 | the-constructed-eye | 10章 |
| 60 | the-borrowed-voice | 10章 |
| 61 | memory-park-the-awakening | 10章 |
| 62 | the-stagnant-star | 10章 |
| 63 | the-slow-replacement | 10章 |
| 64 | the-purposeless-optimization | 10章 |
| 65 | the-emotion-factory | 10章 |
| 66 | the-desire-market | 10章 |
| 67 | the-degree-dust | 10章 |
| 68 | the-calculated-risk | 10章 |
| 69 | the-algorithmic-intimacy | 10章 |
| 70 | the-adaptation-advantage | 10章 |
| 71 | the-stimulation-trap | 10章 |
| 72 | the-silent-river | 10章 |
| 73 | the-last-curator | 10章 |
| 74 | the-fear-laboratory | 10章 |
| 75 | the-dream-market | 10章 |
| 76 | algorithmic-intent | 10章 |
| 77 | the-unconditional | 10章 |
| 78 | the-pain-garden | 10章 |
| 79 | the-death-experience-center | 10章 |
| 80 | algorithmic-humanity | 10章 |
| 81 | the-childhood-museum | 10章 |
| 82 | the-love-factory | 10章 |

### 第四批：2026-03-24（18本）

| 序号 | 书名 | 章节数 |
|------|------|--------|
| 83 | the-happiness-metric | 10章 |
| 84 | the-trust-protocol | 10章 |
| 85 | the-silent-lab | 10章 |
| 86 | the-quantum-witch | 10章 |
| 87 | the-prompt-mage | 10章 |
| 88 | the-new-foundation | 10章 |
| 89 | the-neural-druid | 10章 |
| 90 | the-last-watt | 10章 |
| 91 | the-ghost-in-algorithm | 10章 |
| 92 | the-focus-principle | 10章 |
| 93 | the-digital-grimoire | 10章 |
| 94 | the-clockwork-oracle | 10章 |
| 95 | the-alliance-strategy | 10章 |
| 96 | the-algorithms-grimoire | 10章 |
| 97 | the-agency-within | 10章 |
| 98 | memory-park | 10章 |
| 99 | glitch-utopia-awakening-code | 10章 |
| 100 | algorithmic-immortality | 10章 |
| 101 | algorithmic-ethics | 10章 |

---

## 单书检测与修复流程

### Task N: 检测书籍 [书名]

**Files:**
- 检测: `coo/[书名]/chapters/chapter-01.md` ~ `chapter-10.md`
- 规格文档: `coo/[书名]/.progress/book-spec.md`
- SEO文档: `coo/[书名]/.progress/seo-meta.md`
- 报告输出: `coo/docs/reports/quality-check/[日期]-[书名]-quality-report.md`

**Step 1: 读取书籍规格文档**

读取 `coo/[书名]/.progress/book-spec.md`，提取：
- 书名、类型、主角、背景设定
- 章节标题列表
- 角色设定
- 关键词列表

**Step 2: 读取SEO元数据文档**

读取 `coo/[书名]/.progress/seo-meta.md`，提取：
- 章节标题优化列表
- 关键词密度目标
- 元描述

**Step 3: 逐章检测（Chapter 1-10）**

对每一章执行以下检测：

#### 3.1 内容质量检测（5项）
- [ ] 情节连贯性：前后章节逻辑是否连贯
- [ ] 角色一致性：角色设定是否与规格一致
- [ ] 世界观一致性：设定是否前后一致
- [ ] 章节衔接：章节间是否有逻辑联系
- [ ] 结局完整性：结局是否完整合理

#### 3.2 AI痕迹检测（148项）

**第一层：词汇层面（25项）**
- [ ] 抽象意象词检测：tapestry, symphony, dance, mosaic, kaleidoscope, canvas, landscape
- [ ] 空洞强调词检测：importantly, notably, significantly, crucially
- [ ] AI常用动词检测：delve, explore, navigate, unlock, harness, leverage, facilitate
- [ ] 过度连接词检测：Furthermore, Moreover, Additionally, Consequently, Subsequently
- [ ] 模糊表达检测：Some might say, It could be argued, One might consider
- [ ] 假设性表达检测：If only, What if, Suppose that, Imagine if
- [ ] 过度修饰词检测：incredibly, absolutely, completely, totally, utterly
- [ ] 高频词过度使用：同一词在单章出现>10次
- [ ] 形容词堆砌：连续3个以上形容词
- [ ] 副词过度使用：副词占比>5%

**第二层：句子层面（20项）**
- [ ] 开头句式重复：连续3句以相同方式开头
- [ ] 结尾句式重复：连续3句以相同方式结尾
- [ ] 中间句式重复：句子结构高度相似
- [ ] 被动语态过多：被动语态占比>30%
- [ ] 长短句失衡：句长标准差过大
- [ ] 破折号过度使用：单章破折号>10个
- [ ] 感叹号过度使用：单章感叹号>5个
- [ ] 省略号过度使用：单章省略号>8个
- [ ] 分号使用过度：单章分号>15个
- [ ] 因果关系牵强检测
- [ ] 逻辑跳跃检测
- [ ] 循环论证检测
- [ ] 假设前提错误检测

**第三层：段落层面（15项）**
- [ ] 段落长度雷同：连续段落长度差异<20%
- [ ] 段落开头重复：连续段落开头相似
- [ ] 段落结尾重复：连续段落结尾相似
- [ ] 单句段落过多：单句段落占比>40%
- [ ] 超长段落：单段>300字
- [ ] 过渡词模板检测
- [ ] 过渡句重复检测
- [ ] 缺乏过渡检测
- [ ] 过渡过于明显检测
- [ ] 信息密度不均检测
- [ ] 主题句缺失检测
- [ ] 支撑句不足检测
- [ ] 总结句缺失检测

**第四层：章节层面（15项）**
- [ ] 开头模式重复：多章开头模式相似
- [ ] 结尾模式重复：多章结尾模式相似
- [ ] 节奏单一：章节节奏缺乏变化
- [ ] 高潮缺失：章节无明显高潮点
- [ ] 时间线跳跃检测
- [ ] 场景切换生硬检测
- [ ] 悬念设置模板检测
- [ ] 回顾过度检测
- [ ] 开头无钩子检测
- [ ] 结尾无悬念检测
- [ ] 中间无转折检测
- [ ] 篇幅失衡检测

**第五层：内容层面（20项）**
- [ ] 抽象情感标签：直接陈述情感
- [ ] 情感过度描述：形容词堆砌
- [ ] 情感转折生硬：情感变化无铺垫
- [ ] 情感层次单一：缺乏情感层次
- [ ] 情感与行为不符：情感与行为矛盾
- [ ] 情感重复：相似情感描写重复
- [ ] 对话标签模板：固定对话标签
- [ ] 对话过于完美：对话过于流畅
- [ ] 对话信息过载：对话承载过多信息
- [ ] 对话缺乏潜台词：对话过于直白
- [ ] 对话角色声音雷同：不同角色说话方式相似
- [ ] 对话与叙述失衡：对话占比不合理
- [ ] 感官描写单一：仅依赖视觉描写
- [ ] 描写过于抽象：缺乏具体细节
- [ ] 描写与情感脱节：描写不服务于情感
- [ ] 描写过度：描写过多影响节奏
- [ ] 描写重复：相似场景描写重复
- [ ] 假深刻表达检测
- [ ] 循环论证检测
- [ ] 空洞对比检测
- [ ] 逻辑漏洞检测

**第六层：风格层面（10项）**
- [ ] 叙述视角切换：视角切换不规范
- [ ] 时态切换：时态切换不规范
- [ ] 语体切换：语体切换不规范
- [ ] 基调切换：基调切换不自然
- [ ] 缺乏个人风格：风格过于普通
- [ ] 风格模仿痕迹：明显模仿其他作品
- [ ] 风格与题材不符：风格不适合题材
- [ ] 阅读难度过高：词汇/句式过于复杂
- [ ] 阅读难度过低：词汇/句式过于简单
- [ ] 节奏问题：节奏过快或过慢

**第七层：Google E-E-A-T专项（15项）**
- [ ] 缺乏个人经历：无第一人称真实经历
- [ ] 经历描述模糊：经历细节不具体
- [ ] 经历与角色不符：经历与角色背景矛盾
- [ ] 情感经历空洞：情感体验描述空洞
- [ ] 感官经历缺失：缺乏真实感官体验
- [ ] 专业知识错误：专业概念描述错误
- [ ] 知识深度不足：专业内容过于浅显
- [ ] 知识更新滞后：使用过时信息
- [ ] 概念解释模板：概念解释方式雷同
- [ ] 专业术语滥用：专业术语使用不当
- [ ] 缺乏独特观点：观点过于普通
- [ ] 缺乏原创见解：见解与他人相似
- [ ] 引用来源模糊：引用不具体
- [ ] 缺乏深度分析：分析停留在表面
- [ ] 结论过于绝对：结论缺乏条件限定

**第八层：Google Helpful Content专项（10项）**
- [ ] 内容空洞：缺乏实质内容
- [ ] 信息价值低：信息对读者无帮助
- [ ] 重复信息：信息重复无新意
- [ ] 信息过时：信息已过时
- [ ] 缺乏实用性：内容不实用
- [ ] 偏离主题：内容偏离标题/主题
- [ ] 未回答核心问题：核心问题未解决
- [ ] 信息不完整：关键信息缺失
- [ ] 过度优化：过度堆砌关键词

**第九层：Google AI检测算法专项（10项）**
- [ ] 困惑度过低：语言过于流畅自然
- [ ] 爆发度异常：句子长度变化异常
- [ ] 词汇分布异常：词汇使用分布异常
- [ ] 语法过于完美：无语法错误
- [ ] 标点使用异常：标点使用模式异常
- [ ] 结构过于规整：结构过于完美
- [ ] 信息密度均匀：信息分布过于均匀
- [ ] 缺乏随机性：内容缺乏意外元素
- [ ] 过度平衡：观点过于平衡
- [ ] 缺乏个性：缺乏个人特色

**第十层：Google最新AI检测技术（8项）**
- [ ] AI水印痕迹：检测到AI水印
- [ ] 统计水印：词汇选择有统计特征
- [ ] 语义漂移：长文本语义不一致
- [ ] 主题跳跃：主题跳跃不自然
- [ ] 上下文丢失：丢失前文上下文
- [ ] 情节模板化：情节使用常见模板
- [ ] 角色模板化：角色设定使用常见模板
- [ ] 结局模板化：结局使用常见模板

#### 3.3 SEO优化检测（5项）
- [ ] 章节标题优化：标题是否包含关键词
- [ ] 元描述质量：是否有吸引人的元描述
- [ ] 关键词密度：是否符合目标密度
- [ ] 内容结构：是否有清晰的段落结构
- [ ] 内链机会：是否有内链机会

#### 3.4 欧美读者适配检测（5项）
- [ ] 文化准确性：是否有文化错误
- [ ] 生活场景真实性：场景是否真实
- [ ] 语言地道性：是否有中式英语
- [ ] 价值观适配：价值观是否适配
- [ ] 地名/人名规范：命名是否合理

#### 3.5 语言连贯性检测（5项）**
- [ ] 句子连贯性：句子是否连贯
- [ ] 段落过渡：段落间是否有过渡
- [ ] 时态一致性：时态是否一致
- [ ] 代词指代：代词指代是否清晰
- [ ] 重复表达：是否有重复表达

#### 3.6 技术实现检测（5项）**
- [ ] 三层情感模型：是否实现三层情感
- [ ] 感官细节要求：是否有足够感官细节
- [ ] 对话标签多样性：对话标签是否多样
- [ ] 禁止元素检测：是否发现禁止元素
- [ ] 角色声音一致性：角色声音是否一致

#### 3.7 格式规范检测（5项）**
- [ ] 章节标题格式：标题格式是否正确
- [ ] 段落格式：段落格式是否正确
- [ ] 字数要求：字数是否达标
- [ ] 文件命名：文件命名是否规范
- [ ] 编码格式：编码格式是否正确

#### 3.8 法律风险检测（5项）**
- [ ] 版权问题：是否有抄袭内容
- [ ] 敏感内容：是否有敏感话题
- [ ] 商标侵权：是否使用他人商标
- [ ] 人物侵权：是否使用真实人物
- [ ] 地名侵权：是否使用受保护地名

#### 3.9 读者体验检测（5项）**
- [ ] 开篇吸引力：开篇是否有吸引力
- [ ] 节奏控制：节奏是否合理
- [ ] 悬念设置：是否有悬念设置
- [ ] 结尾效果：结尾是否有推动力
- [ ] 阅读流畅性：阅读是否流畅

#### 3.10 跨文档一致性检测（5项）**
- [ ] 书籍规格一致性：章节内容与book-spec.md是否一致
- [ ] SEO元数据一致性：章节标题与seo-meta.md是否一致
- [ ] 角色设定一致性：章节角色与character.md是否一致
- [ ] 系列书籍一致性：与同系列其他书籍设定是否一致
- [ ] 关键词一致性：章节关键词与SEO文档是否一致

**Step 4: 生成检测报告**

生成检测报告，包含：
- 总体评估（总分、质量等级、发布建议）
- 维度得分详情
- 问题列表（严重、中等、轻微）
- 跨文档一致性检查结果
- 章节详细检测结果

**Step 5: 修复问题**

根据检测报告，修复以下问题：
1. 严重问题：必须修复
2. 中等问题：建议修复
3. 轻微问题：可选修复

**Step 6: 验证修复**

重新检测修复后的内容，确保问题已解决。

**Step 7: 保存报告**

将检测报告保存到 `coo/docs/reports/quality-check/[日期]-[书名]-quality-report.md`

---

## 执行计划

### 阶段一：2026-03-27书籍（3本）

#### Task 1: 检测 algorithmic-aesthetics
- 章节数：10章
- 检测项：198项/章
- 检测后修复

#### Task 2: 检测 algorithmic-identity
- 章节数：10章
- 检测项：198项/章
- 检测后修复

#### Task 3: 检测 the-oracle-of-valdoria
- 章节数：10章
- 检测项：198项/章
- 检测后修复

### 阶段二：2026-03-26书籍（26本）

#### Task 4-29: 检测 2026-03-26 书籍
- 每本书10章，198项/章
- 检测后修复

### 阶段三：2026-03-25书籍（50本）

#### Task 30-79: 检测 2026-03-25 书籍
- 每本书10章，198项/章
- 检测后修复

### 阶段四：2026-03-24书籍（18本）

#### Task 80-101: 检测 2026-03-24 书籍
- 每本书10章，198项/章
- 检测后修复

---

## 报告输出路径

每本书的检测报告保存到：
`coo/docs/reports/quality-check/2026-03-27-[书名]-quality-report.md`

---

## 注意事项

1. **必须串行执行**：不能同时检测多本书或多章
2. **必须全面检测**：不能跳过任何检测项
3. **必须检测后修复**：检测完毕一本书后立即修复问题
4. **必须保存报告**：每本书检测完成后保存检测报告
5. **禁止简化检测**：严格按照标准文档执行

---

**文档创建时间**: 2026-03-27
**计划版本**: v1.0
