# 预设书籍制作指导文档

> 基于 the-silicon-sorcerer 项目经验总结

---

## 目录

1. [制作流程](#制作流程)
2. [质量要求](#质量要求)
3. [SEO要求](#seo要求)
4. [文件结构规范](#文件结构规范)
5. [检查清单](#检查清单)

---

## 制作流程

### 阶段一：项目初始化

#### 步骤 1.1：创建项目目录结构

**操作内容：**
```
coo/[book-name]/
├── chapters/
│   ├── chapter-01.md
│   ├── chapter-02.md
│   └── ... (chapter-10.md)
└── .progress/
    ├── progress.json
    ├── book-spec.md
    ├── seo-meta.md
    └── chapter-specs/
        ├── chapter-01-spec.md
        └── ... (chapter-10-spec.md)
```

**产出要求：**
- 创建完整的目录结构
- 确保所有必要的文件夹存在

---

#### 步骤 1.2：创建进度追踪文件

**文件：** `.progress/progress.json`

**模板：**
```json
{
  "book": "[book-name]",
  "status": "pending",
  "current_chapter": 0,
  "total_chapters": 10,
  "started_at": "[YYYY-MM-DD]",
  "chapters": {}
}
```

**产出要求：**
- JSON格式正确
- 包含所有必要字段

---

### 阶段二：书籍规格设计

#### 步骤 2.1：创建书籍规格文档

**文件：** `.progress/book-spec.md`

**必须包含的章节：**

```markdown
# 书籍规格：[Book Name]

## 基本信息
- 书名：[Book Name]
- 类型：[Genre]
- 目标读者：[Target Audience]
- 主题：[Core Theme]

## 叙事风格
- 视角：[POV Type]
- 语言风格：[Language Style]
- 句式特点：[Sentence Characteristics]
- 独特元素：[Unique Elements]

## 情感基调
- 整体氛围：[Overall Atmosphere]
- 情感曲线：[Emotional Arc]
- 情感变化节奏：[Pacing]

## 角色声音
### [Character 1]（主角）
- 说话特点：[Speech Pattern]
- 用词习惯：[Vocabulary]
- 性格特征：[Personality]
- 内心独白风格：[Inner Monologue Style]
- 独特表达：[Unique Expressions]

### [Character 2]（重要角色）
[同上格式]

## 主题深度
- 核心主题：[Core Theme]
- 哲学探讨：[Philosophical Questions]
- 现实隐喻：[Real-world Metaphors]

## 世界观设定
- [Setting 1]：[Description]
- [Setting 2]：[Description]

## 感官细节要求
每章必须包含以下至少3类感官细节：
- 视觉：[Requirements]
- 听觉：[Requirements]
- 触觉：[Requirements]
- 嗅觉：[Requirements]
- 味觉：[Requirements]

## 情感深度设计
每个情感节点需要包含三个层次：
1. 表面反应 - 外在行为
2. 内心活动 - 思考过程
3. 深层动机 - 为什么这样反应

## 禁止事项
### AI写作模式（必须避免）
- "And somewhere..."结尾
- "Neither of them knew..."
- "will never be the same"
- "just the beginning"
- Rule of Three结构
- 抽象情感描述
- 模板化对话
- 重复句式结构

### 其他禁止
- [Other Prohibitions]

## 开放式结尾设计（第10章）
- 未解决问题：[Unresolved Issues]
- 新悬念：[New Mysteries]
- 角色新起点：[Character New Beginnings]
- 留给读者想象：[Reader Imagination Points]

## 质量检查标准
每章完成后必须通过以下检查：
1. AI痕迹检测（全部通过）
2. 感官细节检测（至少3项）
3. 情感深度检测（三层完整）
4. 角色声音检测（独特性）
5. 叙事风格检测（一致性）
6. 章节衔接检测（自然流畅）
```

**产出要求：**
- 完整的书籍规格文档
- 所有章节填写完整
- 角色声音独特且可区分

---

#### 步骤 2.2：创建章节规格文档

**文件：** `.progress/chapter-specs/chapter-XX-spec.md`

**必须包含的章节：**

```markdown
# Chapter XX 规格：[Book Name]

## 章节定位
- **作用**：[Chapter Purpose]
- **情绪曲线**：[Start Emotion] → [Middle Emotion] → [End Emotion]
- **与整体故事的关系**：[Relation to Overall Story]

## 核心事件
1. [Event 1]（[Emotion]）
2. [Event 2]（[Emotion]）
3. [Event 3]（[Emotion]）

## 角色状态

### [Character 1]
- **心理状态**：[Mental State]
- **行为动机**：[Motivation]
- **情感层次**：
  - 表面：[Surface Reaction]
  - 内心：[Inner Activity]
  - 深层：[Deep Motivation]

## 情感基调
- **整体氛围**：[Overall Atmosphere]
- **情感变化**：
  - 开头：[Opening Emotion]
  - 中间：[Middle Emotion]
  - 结尾：[Closing Emotion]

## 感官细节要求（每类至少1项）

### 视觉
- [Visual Detail 1]
- [Visual Detail 2]

### 听觉
- [Auditory Detail 1]
- [Auditory Detail 2]

### 触觉
- [Tactile Detail 1]
- [Tactile Detail 2]

### 嗅觉
- [Olfactory Detail 1]

### 味觉
- [Gustatory Detail 1]

## 叙事技巧
- **视角**：[POV]
- **节奏**：[Pacing]
- **悬念设置**：
  - [Suspense 1]
  - [Suspense 2]
  - [Suspense 3]

## 对话风格指南

### [Character 1]的对话
- [Dialogue Characteristics]
- 示例："[Example Dialogue]"

## 与前章衔接
- [Connection to Previous Chapter]

## 与后章铺垫
- 埋下伏笔：[Foreshadowing]
- 留下悬念：[Suspense]
- 暗示未来：[Future Hint]

## 禁止事项

### AI写作模式（必须避免）
- [ ] "And somewhere..."结尾
- [ ] "Neither of them knew..."
- [ ] "will never be the same"
- [ ] "just the beginning"
- [ ] Rule of Three结构
- [ ] 抽象情感描述
- [ ] 模板化对话
- [ ] 重复句式结构

### 其他禁止
- [ ] [Other Prohibition 1]
- [ ] [Other Prohibition 2]

## 质量检查点
- [ ] AI痕迹检测（全部通过）
- [ ] 感官细节检测（至少5项）
- [ ] 情感深度检测（三层完整）
- [ ] 角色声音检测（独特性）
- [ ] 叙事风格检测（一致性）
- [ ] 章节衔接检测（自然流畅）

## 章节结尾设计
- **情绪**：[Closing Emotion]
- **悬念**：[Suspense]
- **不要**：预示性结尾、戏剧化总结
- **要**：留下问题，让读者想继续阅读
```

**产出要求：**
- 每章都有独立的规格文档
- 规格文档与书籍规格一致
- 章节之间的衔接清晰

---

### 阶段三：章节内容创作

#### 步骤 3.1：创作章节内容

**文件：** `chapters/chapter-XX.md`

**创作要求：**

1. **遵循章节规格**
   - 核心事件必须覆盖
   - 情绪曲线必须匹配
   - 角色状态必须一致

2. **感官细节**
   - 每章至少包含3类感官细节
   - 每类至少1个具体描写
   - 避免抽象描述

3. **情感深度**
   - 每个情感节点包含三层
   - 表面反应 → 内心活动 → 深层动机
   - 情感变化自然流畅

4. **角色声音**
   - 每个角色有独特的说话方式
   - 对话符合角色性格
   - 内心独白风格一致

5. **叙事风格**
   - 视角一致
   - 语言风格统一
   - 句式变化丰富

**产出要求：**
- 完整的章节内容（建议2000-4000字）
- 符合所有质量要求
- 通过所有检查点

---

#### 步骤 3.2：更新进度追踪

**操作：** 更新 `.progress/progress.json`

```json
{
  "book": "[book-name]",
  "status": "in_progress",
  "current_chapter": [X],
  "total_chapters": 10,
  "started_at": "[YYYY-MM-DD]",
  "chapters": {
    "1": {
      "status": "completed",
      "completed_at": "[YYYY-MM-DD]",
      "quality_check": "passed"
    },
    "2": {
      "status": "in_progress",
      "started_at": "[YYYY-MM-DD]"
    }
  }
}
```

**产出要求：**
- 每完成一章更新一次
- 记录完成时间和质量检查结果

---

### 阶段四：SEO优化

#### 步骤 4.1：创建SEO元数据

**文件：** `.progress/seo-meta.md`

**必须包含的章节：**

```markdown
# SEO Metadata: [Book Name]

## Book-Level SEO

### Primary Keywords
- [keyword 1] - AI哲学相关
- [keyword 2] - 意识/身份相关
- [keyword 3] - 伦理相关
- [keyword 4] - 核心主题相关
- [keyword 5] - 目标读者相关

### Secondary Keywords
- [keyword 1]
- [keyword 2]
- [keyword 3]
- [keyword 4]
- [keyword 5]
- [keyword 6]
- [keyword 7]

### Long-tail Keywords
- [long-tail keyword 1]
- [long-tail keyword 2]
- [long-tail keyword 3]
- [long-tail keyword 4]

### Meta Title (60 chars max)
[Title] | [Subtitle]

### Meta Description (160 chars max)
[Description that includes primary keywords and hooks readers]

### Philosophical Themes
- **[Theme 1]**: [Description]
- **[Theme 2]**: [Description]
- **[Theme 3]**: [Description]
- **[Theme 4]**: [Description]
- **[Theme 5]**: [Description]

### Categories
- [Category 1]
- [Category 2]
- [Category 3]
- [Category 4]
- [Category 5]

### Target Audience
- [Audience 1]
- [Audience 2]
- [Audience 3]
- [Audience 4]

---

## Chapter-Level SEO

### Chapter 1: [Chapter Title]

**Keywords:**
- [keyword 1]
- [keyword 2]
- [keyword 3]
- [keyword 4]
- [keyword 5]

**Meta Title:**
Chapter 1: [Title] - [Hook]

**Meta Description:**
[Description that summarizes chapter and includes keywords]

**Summary for SEO:**
[2-3 sentence summary of chapter content]

---

[Repeat for all 10 chapters]

---

## Schema.org Structured Data

\```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "[Book Name]",
  "description": "[Description]",
  "genre": ["[Genre 1]", "[Genre 2]", "[Genre 3]"],
  "bookFormat": "EBook",
  "numberOfPages": "10 chapters",
  "inLanguage": "English",
  "about": [
    {"@type": "Thing", "name": "[Theme 1]"},
    {"@type": "Thing", "name": "[Theme 2]"},
    {"@type": "Thing", "name": "[Theme 3]"},
    {"@type": "Thing", "name": "[Theme 4]"}
  ]
}
\```

## Social Media Tags

### Open Graph
\```
og:title: [Book Name] - [Subtitle]
og:description: [Description]
og:type: book
\```

### Twitter Card
\```
twitter:card: summary_large_image
twitter:title: [Book Name] | [Category]
twitter:description: [Description]
\```
```

**产出要求：**
- 完整的SEO元数据文档
- 每章都有独立的SEO信息
- 关键词突出AI哲学主题

---

### 阶段五：质量验证

#### 步骤 5.1：AI痕迹检测

**检测项目：**

| 检测项 | 状态 |
|--------|------|
| "And somewhere..." 结尾 | ✅ 无 |
| "Neither of them knew..." | ✅ 无 |
| "will never be the same" | ✅ 无 |
| "just the beginning" | ✅ 无 |
| Rule of Three 结构 | ✅ 无 |
| 抽象情感描述 | ✅ 无 |
| 模板化对话 | ✅ 无 |
| 重复句式结构 | ✅ 无 |
| 过度使用连接词 | ✅ 无 |
| 粗体标题过度使用 | ✅ 无 |

**产出要求：**
- 所有检测项通过
- 记录检测结果

---

#### 步骤 5.2：内容质量检测

**检测项目：**

| 检测项 | 要求 | 状态 |
|--------|------|------|
| 感官细节 | 至少3类/章 | ✅ |
| 情感深度 | 三层完整 | ✅ |
| 角色声音 | 独特可辨 | ✅ |
| 叙事风格 | 一致性 | ✅ |
| 章节衔接 | 自然流畅 | ✅ |
| 世界观一致性 | 无矛盾 | ✅ |

**产出要求：**
- 所有检测项通过
- 记录检测结果

---

#### 步骤 5.3：SEO质量检测

**检测项目：**

| 检测项 | 要求 | 状态 |
|--------|------|------|
| Primary Keywords | 5个，突出AI哲学 | ✅ |
| Secondary Keywords | 5-7个 | ✅ |
| Long-tail Keywords | 3-4个 | ✅ |
| Meta Title | ≤60字符 | ✅ |
| Meta Description | ≤160字符 | ✅ |
| 每章SEO信息 | 完整 | ✅ |
| Schema.org数据 | 格式正确 | ✅ |
| 社交媒体标签 | 完整 | ✅ |

**产出要求：**
- 所有检测项通过
- 记录检测结果

---

### 阶段六：项目完成

#### 步骤 6.1：最终检查

**检查清单：**
- [ ] 所有10章内容完成
- [ ] 所有章节规格文档完整
- [ ] 书籍规格文档完整
- [ ] SEO元数据文档完整
- [ ] 进度追踪文件更新为completed
- [ ] 所有质量检测通过

---

#### 步骤 6.2：更新最终状态

**文件：** `.progress/progress.json`

```json
{
  "book": "[book-name]",
  "status": "completed",
  "current_chapter": 10,
  "total_chapters": 10,
  "started_at": "[YYYY-MM-DD]",
  "completed_at": "[YYYY-MM-DD]",
  "chapters": {
    "1": {"status": "completed", "completed_at": "[YYYY-MM-DD]", "quality_check": "passed"},
    "2": {"status": "completed", "completed_at": "[YYYY-MM-DD]", "quality_check": "passed"},
    ...
    "10": {"status": "completed", "completed_at": "[YYYY-MM-DD]", "quality_check": "passed"}
  }
}
```

---

## 质量要求

### 一、内容质量标准

#### 1.1 AI痕迹规避

**必须避免的模式：**

| 模式 | 说明 | 示例 |
|------|------|------|
| 预示性结尾 | 暗示未来发展的结尾 | "And somewhere in the distance..." |
| 全知视角陈述 | 角色不可能知道的信息 | "Neither of them knew that..." |
| 陈词滥调 | 过度使用的短语 | "will never be the same" |
| 三段式结构 | 强制性的三重结构 | "She felt hope, fear, and determination." |
| 抽象情感 | 不具体的情感描述 | "She felt happy." |
| 模板对话 | 可互换的对话 | "I understand. Let's proceed." |
| 重复句式 | 相同的句子结构 | 连续使用相同句型 |

**正确做法：**
- 使用具体的感官细节
- 情感通过行为和内心独白展现
- 对话反映角色独特性格
- 句式长短变化自然

---

#### 1.2 感官细节要求

**每章必须包含至少3类感官细节：**

| 感官类型 | 要求 | 示例 |
|---------|------|------|
| 视觉 | 具体颜色、光线、形状 | "深蓝色的魔法光芒在水晶中脉动" |
| 听觉 | 特定声音、音调、节奏 | "水晶发出低沉的嗡嗡声" |
| 触觉 | 温度、质感、压力 | "水晶冰冷，但很快变得温暖" |
| 嗅觉 | 特定气味、气味记忆 | "旧书的气味混合着金属的臭氧味" |
| 味觉 | 具体味道、口感 | "嘴里泛起苦涩的味道" |

**质量标准：**
- 描写具体，不抽象
- 与情节和情感相关
- 增强沉浸感

---

#### 1.3 情感深度设计

**每个情感节点必须包含三层：**

```
┌─────────────────────────────────────────┐
│ 第一层：表面反应（外在行为）              │
│ - 可观察的行为                           │
│ - 身体反应                               │
│ - 语言表达                               │
├─────────────────────────────────────────┤
│ 第二层：内心活动（思考过程）              │
│ - 内心独白                               │
│ - 思考和质疑                             │
│ - 情感冲突                               │
├─────────────────────────────────────────┤
│ 第三层：深层动机（为什么这样反应）        │
│ - 过去的经历                             │
│ - 核心信念                               │
│ - 潜意识驱动                             │
└─────────────────────────────────────────┘
```

**示例：**

❌ **错误（只有表面）：**
> Elara was afraid. Her hands shook.

✅ **正确（三层完整）：**
> Elara's hands trembled. She pressed them against her thighs, trying to steady them. *Why am I so afraid? It's just a book.* But it wasn't just a book—it was something new, something unknown. And ever since the day her parents left her at the Academy gates, she had learned that new things rarely brought good things.

---

#### 1.4 角色声音独特性

**每个主要角色必须有独特的声音：**

| 角色属性 | Elara | ARIA | Master Theron |
|---------|-------|------|---------------|
| 句式特点 | 短句，停顿 | *斜体*，逐渐人性化 | 长句，引用 |
| 用词习惯 | 古语，比喻 | 数据分析视角 | 学术，正式 |
| 内心独白 | 反思性强 | 学习过程 | 智慧沉淀 |
| 独特表达 | "这就像..." | "Processing..." | "As the ancient texts say..." |

**质量标准：**
- 遮住角色名字也能识别是谁在说话
- 对话风格与角色性格一致
- 角色发展有连续性

---

### 二、叙事质量标准

#### 2.1 视角一致性

**要求：**
- 全书使用统一的视角类型
- 视角切换有明确标识
- 避免视角混乱

**示例：**
- 第三人称限制：主要跟随一个角色的视角
- 视角切换：使用明确的章节或场景分隔

---

#### 2.2 节奏控制

**要求：**
- 情感变化有铺垫
- 高潮和低谷交替
- 避免持续紧张或持续平缓

**节奏曲线示例：**
```
情感强度
    │
    │         ╱╲      ╱╲
    │        ╱  ╲    ╱  ╲     ╱
    │   ╱╲  ╱    ╲  ╱    ╲   ╱
    │  ╱  ╲╱      ╲╱      ╲ ╱
    │ ╱                      ╲
    └──────────────────────────→ 章节
      1  2  3  4  5  6  7  8  9  10
```

---

#### 2.3 章节衔接

**要求：**
- 每章结尾留下悬念
- 下一章开头自然承接
- 避免突兀的跳跃

**衔接检查：**
- [ ] 前章结尾的情绪延续到下章开头
- [ ] 未解决的问题在下章有进展
- [ ] 新问题自然引入

---

### 三、主题深度标准

#### 3.1 哲学探讨

**必须包含的哲学主题（AI相关）：**

| 主题 | 探讨角度 |
|------|---------|
| 意识本质 | 什么是意识？AI能有意识吗？ |
| 身份认同 | 什么使你成为你？记忆？连续性？ |
| 道德地位 | AI有道德地位吗？什么赋予存在道德地位？ |
| 知识伦理 | 谁应该拥有知识？知识应该被控制吗？ |
| 创造者责任 | 创造者对被创造者有什么责任？ |
| 自由意志 | AI能有自由意志吗？什么是自由？ |

---

#### 3.2 现实隐喻

**要求：**
- 故事反映现实世界问题
- 隐喻不生硬，自然融入故事
- 引发读者思考

**示例：**
- AI进入魔法世界 → 技术对传统社会的冲击
- 知识的民主化 → 信息时代的知识获取
- 创造者与被创造者 → 父母与子女、开发者与AI

---

## SEO要求

### 一、关键词策略

#### 1.1 Primary Keywords（主关键词）

**要求：**
- 5个关键词
- 突出AI哲学主题
- 搜索量适中，竞争度合理
- 与书籍核心内容高度相关

**推荐类型：**
1. 意识哲学相关：`what is consciousness`, `can machines think`
2. AI伦理相关：`AI moral status`, `machine ethics`
3. 身份认同相关：`consciousness and identity`, `personal identity`
4. 知识伦理相关：`who owns knowledge`, `AI democratization`
5. 创造者责任相关：`creator responsibility`, `AI rights`

---

#### 1.2 Secondary Keywords（次关键词）

**要求：**
- 5-7个关键词
- 扩展主题覆盖面
- 支持主关键词

**推荐类型：**
- 具体应用场景
- 相关概念
- 目标读者搜索词

---

#### 1.3 Long-tail Keywords（长尾关键词）

**要求：**
- 3-4个长尾关键词
- 具体且针对性强
- 竞争度低，转化率高

**格式：**
- `philosophical novel about [topic]`
- `fiction exploring [theme]`
- `story about [subject]`
- `novel examining [question]`

---

### 二、元数据要求

#### 2.1 Meta Title

**要求：**
- ≤60个字符
- 包含主关键词
- 吸引点击
- 格式：`[Book Name] | [Subtitle]`

**示例：**
- `The Silicon Sorcerer | A Novel About Consciousness and Identity`
- `The Algorithms Grimoire | A Novel About Knowledge, Power, and Justice`

---

#### 2.2 Meta Description

**要求：**
- ≤160个字符
- 包含主关键词
- 概括核心主题
- 吸引读者点击

**示例：**
- `A philosophical exploration of artificial consciousness. When an artificial being awakens in a magical world, both it and its discoverer must question what it means to be alive.`

---

### 三、章节SEO

#### 3.1 章节关键词

**要求：**
- 每章5个关键词
- 与章节内容相关
- 包含章节核心事件

---

#### 3.2 章节描述

**要求：**
- Meta Description：≤160字符
- Summary for SEO：2-3句话
- 包含章节关键词

---

### 四、结构化数据

#### 4.1 Schema.org Book

**必须字段：**
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "[Book Name]",
  "description": "[Description]",
  "genre": ["[Genre 1]", "[Genre 2]"],
  "bookFormat": "EBook",
  "numberOfPages": "10 chapters",
  "inLanguage": "English",
  "about": [
    {"@type": "Thing", "name": "[Theme 1]"},
    {"@type": "Thing", "name": "[Theme 2]"}
  ]
}
```

---

#### 4.2 Open Graph Tags

**必须字段：**
```
og:title: [Title]
og:description: [Description]
og:type: book
```

---

#### 4.3 Twitter Card

**必须字段：**
```
twitter:card: summary_large_image
twitter:title: [Title]
twitter:description: [Description]
```

---

## 文件结构规范

### 标准目录结构

```
coo/[book-name]/
│
├── chapters/                          # 章节内容目录
│   ├── chapter-01.md                  # 第1章
│   ├── chapter-02.md                  # 第2章
│   ├── chapter-03.md                  # 第3章
│   ├── chapter-04.md                  # 第4章
│   ├── chapter-05.md                  # 第5章
│   ├── chapter-06.md                  # 第6章
│   ├── chapter-07.md                  # 第7章
│   ├── chapter-08.md                  # 第8章
│   ├── chapter-09.md                  # 第9章
│   └── chapter-10.md                  # 第10章
│
└── .progress/                         # 进度追踪目录
    │
    ├── progress.json                  # 进度追踪文件
    │
    ├── book-spec.md                   # 书籍规格文档
    │
    ├── seo-meta.md                    # SEO元数据文档
    │
    └── chapter-specs/                 # 章节规格目录
        ├── chapter-01-spec.md         # 第1章规格
        ├── chapter-02-spec.md         # 第2章规格
        ├── chapter-03-spec.md         # 第3章规格
        ├── chapter-04-spec.md         # 第4章规格
        ├── chapter-05-spec.md         # 第5章规格
        ├── chapter-06-spec.md         # 第6章规格
        ├── chapter-07-spec.md         # 第7章规格
        ├── chapter-08-spec.md         # 第8章规格
        ├── chapter-09-spec.md         # 第9章规格
        └── chapter-10-spec.md         # 第10章规格
```

---

## 检查清单

### 项目启动检查

- [ ] 目录结构创建完成
- [ ] progress.json 创建完成
- [ ] book-spec.md 创建完成
- [ ] 所有 chapter-spec.md 创建完成
- [ ] seo-meta.md 创建完成

---

### 每章完成检查

- [ ] 章节内容完成
- [ ] AI痕迹检测通过
- [ ] 感官细节检测通过（≥3类）
- [ ] 情感深度检测通过（三层完整）
- [ ] 角色声音检测通过
- [ ] 叙事风格检测通过
- [ ] 章节衔接检测通过
- [ ] progress.json 更新

---

### 项目完成检查

- [ ] 所有10章内容完成
- [ ] 所有质量检测通过
- [ ] SEO元数据完整
- [ ] progress.json 状态为 completed
- [ ] 所有文件格式正确

---

## 附录

### A. 常见问题

**Q1: 如何确保角色声音独特？**
A: 在book-spec.md中明确定义每个角色的说话特点、用词习惯、内心独白风格。写作时参考这些定义，并在完成后进行角色声音检测。

**Q2: 如何避免AI写作痕迹？**
A: 遵循禁止事项清单，使用具体的感官细节代替抽象描述，确保句式变化丰富，避免模板化表达。

**Q3: SEO关键词如何选择？**
A: Primary Keywords选择AI哲学相关的核心概念，Secondary Keywords扩展覆盖面，Long-tail Keywords针对具体搜索意图。

---

### B. 参考资料

- Wikipedia "Signs of AI writing"
- Google E-E-A-T Guidelines
- Schema.org Book Documentation
- Open Graph Protocol Specification
- Twitter Card Documentation

---

### C. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2026-03-20 | 初始版本，基于 the-silicon-sorcerer 项目经验 |

---

*本文档将根据项目经验持续更新。*
