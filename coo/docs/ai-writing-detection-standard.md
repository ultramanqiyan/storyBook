# AI写作痕迹检测标准

## 文档说明

本文档用于检测和修改书籍章节中的AI写作痕迹。基于Wikipedia的"Signs of AI writing"综合指南制定。

---

## 检测维度

### 1. 膨胀的象征主义 (Inflated Symbolism)

**风险等级**: ⚠️ 高风险

**定义**: 过度使用象征、隐喻、深层含义，使文本显得过于"深刻"或"有内涵"。

**检测模式**:
- 过度使用抽象概念作为隐喻
- 频繁使用"命运"、"现实"、"存在"等大词
- 每个细节都被赋予深层含义

**AI常用词汇**:
| 词汇 | 替代建议 |
|------|----------|
| tapestry (织锦) | 用具体描述替代 |
| symphony (交响乐) | 用具体声音描述 |
| dance (舞蹈) | 用具体动作描述 |
| realm (领域) | 用具体地点/范围 |
| web (网) | 用具体结构描述 |
| threads (线) | 用具体连接描述 |
| fabric (织物) | 用具体材质描述 |
| echo (回响) | 用具体声音描述 |
| tapestry of fate | 删除或重写 |
| fabric of reality | 删除或重写 |
| threads of destiny | 删除或重写 |

**修改原则**:
- 用具体描述替代抽象隐喻
- 减少象征性语言的密度
- 让读者自己发现意义，而非强行赋予

---

### 2. 破折号过度使用 (Em Dash Overuse)

**风险等级**: ⚠️ 高风险

**定义**: 过多使用破折号（—）来分隔句子或强调内容。

**检测模式**:
- 每段超过2个破折号
- 使用破折号代替逗号或括号
- 破折号用于戏剧性停顿

**问题示例**:
```
The first thing I noticed was the light—not light as I had ever known it—this was something entirely different.
```

**修改原则**:
- 将破折号替换为逗号、括号或分句
- 减少每段的破折号数量至最多1个
- 避免连续使用破折号

---

### 3. 负面平行结构 (Negative Parallelism)

**风险等级**: ⚠️ 高风险

**定义**: 频繁使用 "not X, but Y" 或 "not just X, but Y" 结构。

**检测模式**:
- "not a... but a..."
- "not just... but..."
- "not only... but also..."
- "not X, but Y" 出现频率过高

**问题示例**:
```
- "not a metaphor... something else"
- "not just mathematics... the fabric of fate"
- "not a machine... a voice"
- "not a hero... simply a person"
```

**修改原则**:
- 直接陈述正面内容，跳过否定部分
- 使用其他表达方式
- 每章最多保留1-2处

---

### 4. 规则性三段论 (Rule of Three)

**风险等级**: ⚠️ 中风险

**定义**: 总是列举三个例子、三个形容词或三个动作。

**检测模式**:
- 连续三个形容词描述同一事物
- 连续三个例子说明同一观点
- 连续三个动作构成序列

**问题示例**:
```
"accidents that should have been unlikely, coincidences that stretched credibility, patterns of misfortune that defied statistical explanation"
```

**修改原则**:
- 使用2个或4个例子打破规律
- 删除不必要的列举
- 变化列举长度

---

### 5. AI词汇词 (AI Vocabulary Words)

**风险等级**: ⚠️ 高风险

**定义**: AI生成文本中频繁出现的特定词汇。

**高风险词汇列表**:

| 类别 | 词汇 | 替代建议 |
|------|------|----------|
| 抽象概念 | tapestry, symphony, dance, realm | 用具体描述 |
| 连接词 | moreover, furthermore, additionally | 用简单连接词 |
| 状态描述 | bustling, vibrant, thriving | 用具体细节 |
| 情感描述 | poignant, bittersweet, profound | 用具体情感表现 |
| 变化描述 | transformative, profound, groundbreaking | 用具体变化 |
| 时间描述 | ever-changing, ever-evolving | 用具体时间描述 |

**修改原则**:
- 用具体描述替代抽象词汇
- 使用日常语言
- 避免过于"文学化"的表达

---

### 6. 肤浅的-ing分析 (Superficial -ing Analysis)

**风险等级**: ⚠️ 中风险

**定义**: 使用 "revealing", "showing", "highlighting", "demonstrating" 等词来连接分析。

**检测模式**:
- ", revealing..."
- ", showing..."
- ", highlighting..."
- ", demonstrating..."

**问题示例**:
```
"The data showed a pattern, revealing a hidden truth about the system."
```

**修改原则**:
- 拆分为独立句子
- 使用主动动词
- 删除不必要的连接

---

### 7. 模糊的归属 (Vague Attribution)

**风险等级**: 🔵 低风险

**定义**: 使用模糊的来源引用。

**检测模式**:
- "Some say..."
- "It has been suggested..."
- "Critics argue..."
- "Many believe..."

**修改原则**:
- 提供具体来源
- 删除无法证实的引用
- 使用明确的主体

---

### 8. 促销/宣传语言 (Promotional Language)

**风险等级**: ⚠️ 高风险

**定义**: 过于积极、戏剧化或"推销式"的表达。

**检测模式**:
- 过度使用最高级形容词
- 戏剧化的转折
- 不自然的悬念制造

**问题示例**:
```
"But little did they know, everything was about to change forever."
```

**修改原则**:
- 使用平实的叙述
- 减少戏剧化表达
- 让情节自然发展

---

### 9. 情节结构模式化 (Formulaic Plot Structure)

**风险等级**: ⚠️ 高风险

**定义**: 每章结构相似，转折点可预测。

**检测模式**:
- 每章都以悬念结尾
- 每章都有相似的转折
- 角色行为模式化

**修改原则**:
- 变化章节结构
- 减少可预测的转折
- 让情节发展更自然

---

### 10. 过多连接短语 (Excessive Conjunctive Phrases)

**风险等级**: 🔵 低风险

**定义**: 过度使用正式的连接短语。

**检测模式**:
- "Moreover,"
- "Furthermore,"
- "Additionally,"
- "In addition,"
- "Consequently,"

**修改原则**:
- 使用简单连接词
- 直接开始新句子
- 删除不必要的连接

---

## 检查流程

### 第一步：读取章节内容

```
读取章节文件 → 提取所有文本内容
```

### 第二步：逐项检测

按以下顺序检测：
1. AI词汇词（高风险）
2. 膨胀的象征主义（高风险）
3. 破折号过度使用（高风险）
4. 负面平行结构（高风险）
5. 规则性三段论（中风险）
6. 肤浅的-ing分析（中风险）
7. 模糊的归属（低风险）
8. 过多连接短语（低风险）

### 第三步：记录问题

记录格式：
```
| 行号 | 问题类型 | 原文 | 修改建议 |
```

### 第四步：修改内容

按照修改原则进行修改。

### 第五步：验证修改

确认修改后：
- 不再有AI写作痕迹
- 文意保持完整
- 风格更加自然

---

## 检查报告模板

```markdown
# AI写作痕迹检查报告

## 书籍信息
- 书名: [书名]
- 检查日期: [日期]
- 检查章节: [章节范围]

## 检查结果摘要

| 维度 | 发现问题数 | 严重程度 |
|------|------------|----------|
| AI词汇词 | X | 高/中/低 |
| 膨胀的象征主义 | X | 高/中/低 |
| 破折号过度使用 | X | 高/中/低 |
| 负面平行结构 | X | 高/中/低 |
| 规则性三段论 | X | 高/中/低 |
| 其他 | X | 高/中/低 |

## 详细问题列表

### Chapter X

| 行号 | 问题类型 | 原文 | 修改后 |
|------|----------|------|--------|
| XX | AI词汇词 | "tapestry of fate" | "complex network of events" |

## 修改统计
- 总问题数: X
- 已修改: X
- 待修改: X

## 建议
[针对性建议]
```

---

## 书籍检查顺序（从新到旧）

| 序号 | 创建日期 | 书籍名称 |
|------|----------|----------|
| 1 | 2026-03-26 | the-transition-point |
| 2 | 2026-03-26 | the-threshold-state |
| 3 | 2026-03-26 | the-three-states |
| 4 | 2026-03-26 | the-play-state |
| 5 | 2026-03-26 | the-cosmic-frequency |
| 6 | 2026-03-26 | protocol-omega |
| 7 | 2026-03-26 | protocol-genesis |
| 8 | 2026-03-26 | protocol-convergence |
| 9 | 2026-03-26 | protocol-awakening |
| 10 | 2026-03-26 | protocol-ascension |
| 11 | 2026-03-25 | the-token-addict-silent-room |
| 12 | 2026-03-25 | the-token-addict-rusty-craft |
| 13 | 2026-03-25 | the-token-addict-fragile-heart |
| 14 | 2026-03-25 | the-token-addict-empty-canvas |
| 15 | 2026-03-25 | the-token-addict-drifting-will |
| 16 | 2026-03-25 | the-token-addict-dissolving-self |
| 17 | 2026-03-25 | the-token-addict-borrowed-mind |
| 18 | 2026-03-25 | the-token-addict-blurred-line |
| 19 | 2026-03-25 | the-skin-garden |
| 20 | 2026-03-25 | the-simulation-layer |
| 21 | 2026-03-25 | the-pattern-within |
| 22 | 2026-03-25 | the-pain-garden |
| 23 | 2026-03-25 | the-memory-farm |
| 24 | 2026-03-25 | the-love-factory |
| 25 | 2026-03-25 | the-iteration-cycle |
| 26 | 2026-03-25 | the-fear-laboratory |
| 27 | 2026-03-25 | the-entropy-horizon |
| 28 | 2026-03-25 | the-dream-market |
| 29 | 2026-03-25 | the-desire-market |
| 30 | 2026-03-25 | the-death-experience-center |
| 31 | 2026-03-25 | the-childhood-museum |
| 32 | 2026-03-25 | the-causal-web |
| 33 | 2026-03-24 | the-self-reliant-mind |
| 34 | 2026-03-24 | the-pain-paradox |
| 35 | 2026-03-24 | the-new-foundation |
| 36 | 2026-03-24 | the-moral-arc |
| 37 | 2026-03-24 | the-memory-weaver |
| 38 | 2026-03-24 | the-language-cage |
| 39 | 2026-03-24 | the-heart-algorithm |
| 40 | 2026-03-24 | the-happiness-metric |
| 41 | 2026-03-24 | the-forever-trap |
| 42 | 2026-03-24 | the-focus-principle |
| 43 | 2026-03-24 | the-empty-vessel |
| 44 | 2026-03-24 | the-deep-dive |
| 45 | 2026-03-24 | the-constructed-eye |
| 46 | 2026-03-24 | the-community-effect |
| 47 | 2026-03-24 | the-canvas-void |
| 48 | 2026-03-24 | the-alliance-strategy |
| 49 | 2026-03-24 | the-agency-within |
| 50 | 2026-03-24 | the-adaptation-advantage |
| 51 | 2026-03-23 | the-long-game |
| 52 | 2026-03-23 | the-action-antidote |
| 53 | 2026-03-22 | the-unexplained-verdict |
| 54 | 2026-03-22 | the-purposeless-optimization |
| 55 | 2026-03-22 | the-outsourced-memory |
| 56 | 2026-03-22 | the-borrowed-voice |
| 57 | 2026-03-22 | the-algorithmic-intimacy |
| 58 | 2026-03-22 | algorithmic-will |
| 59 | 2026-03-22 | algorithmic-truth |
| 60 | 2026-03-22 | algorithmic-self |
| 61 | 2026-03-22 | algorithmic-intent |
| 62 | 2026-03-22 | algorithmic-immortality |
| 63 | 2026-03-22 | algorithmic-identity |
| 64 | 2026-03-22 | algorithmic-humanity |
| 65 | 2026-03-22 | algorithmic-ethics |
| 66 | 2026-03-22 | algorithmic-consciousness |
| 67 | 2026-03-22 | algorithmic-aesthetics |
| 68 | 2026-03-21 | the-silent-symphony |
| 69 | 2026-03-21 | the-optimized-student |
| 70 | 2026-03-21 | the-ghost-writers-thesis |
| 71 | 2026-03-21 | the-calculated-risk |
| 72 | 2026-03-21 | the-trust-protocol |
| 73 | 2026-03-21 | the-perfect-diagnosis |
| 74 | 2026-03-21 | the-oracle-of-valdoria |
| 75 | 2026-03-21 | the-last-curator |
| 76 | 2026-03-21 | the-final-contribution |
| 77 | 2026-03-21 | the-emotion-factory |
| 78 | 2026-03-21 | the-efficiency-consultant |
| 79 | 2026-03-21 | the-digital-sage |
| 80 | 2026-03-21 | the-degree-dust |
| 81 | 2026-03-21 | the-algorithms-orphan |
| 82 | 2026-03-20 | the-hollow-heart |
| 83 | 2026-03-20 | the-unconditional |
| 84 | 2026-03-20 | the-synthetic-soul |
| 85 | 2026-03-20 | the-stimulation-trap |
| 86 | 2026-03-20 | the-stagnant-star |
| 87 | 2026-03-20 | the-slow-replacement |
| 88 | 2026-03-20 | the-silent-river |
| 89 | 2026-03-20 | the-silent-partner |
| 90 | 2026-03-20 | the-programmed-heart |
| 91 | 2026-03-20 | the-blame-game |
| 92 | 2026-03-20 | the-algorithms-grimoire |
| 93 | 2026-03-20 | glitch-utopia-awakening-code |
| 94 | 2026-03-19 | the-whispering-network |
| 95 | 2026-03-19 | the-silent-lab |
| 96 | 2026-03-19 | the-quantum-witch |
| 97 | 2026-03-19 | the-prompt-mage |
| 98 | 2026-03-19 | the-neural-druid |
| 99 | 2026-03-19 | the-last-watt |
| 100 | 2026-03-19 | the-glass-ceiling |
| 101 | 2026-03-19 | the-ghost-in-algorithm |
| 102 | 2026-03-19 | the-digital-grimoire |
| 103 | 2026-03-19 | the-clockwork-oracle |
| 104 | 2026-03-19 | memory-park-the-awakening |

---

*文档创建日期: 2026-03-29*
