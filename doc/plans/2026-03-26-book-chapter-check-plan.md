# 书籍章节检查与修复计划（修订版）

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 严格按照每本书的书籍规格文档（book-spec.md）检查所有章节，发现不符合规格的问题并修复

**架构：** 串行执行，每本书按以下步骤：1.读取书籍规格文档 → 2.按规格检查所有章节 → 3.发现问题立即修复 → 4.更新任务状态

**技术栈：** Markdown文件读取/写入，规格对比分析

---

## 检查标准（每本书必须遵循）

### 必须检查的项目：
1. **章节标题**：是否与规格文档中的章节大纲一致
2. **情感弧线**：章节的情感变化是否符合规格要求
3. **关键事件**：章节是否包含规格中定义的关键事件
4. **角色声音**：对话是否符合角色的说话风格定义
5. **POV一致性**：是否保持规格中定义的视角（第一人称/第三人称）
6. **章节完整性**：是否有正确的结尾标记 `**End of Chapter X**`
7. **内容完整性**：章节是否有截断或空白

---

## 已完成的书籍 (12本)
1. ✅ the-transition-point - Chapter 8 截断已修复
2. ✅ the-play-state - 无问题
3. ✅ the-cosmic-frequency - 无问题
4. ✅ the-threshold-state - 无问题
5. ✅ the-three-states - 无问题
6. ✅ the-iteration-cycle - Chapter 7-10 已修复
7. ✅ the-simulation-layer - 无问题
8. ✅ the-pattern-within - 无问题
9. ✅ the-causal-web - 无问题
10. ✅ the-entropy-horizon - 无问题
11. ✅ the-token-addict-dissolving-self - 无问题
12. ✅ the-token-addict-blurred-line - 无问题

---

## 待重新检查书籍 (1本 - 之前未按规格检查)
### Task 0: 重新检查 the-token-addict-fragile-heart

**Step 1: 读取书籍规格文档**
- Read: `coo/the-token-addict-fragile-heart/.progress/book-spec.md`
- 提取：章节大纲、情感弧线、关键事件、角色定义

**Step 2: 按规格检查 Chapter 1**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-01.md`
- 检查项：
  - 标题应为 "The Shield"（规格：Chapter 01 | The Shield）
  - 情感弧线：Strength (65) -> Safety (60)
  - 关键事件：AI emotional shield
  - POV：第一人称（Marcus Webb视角）
  - 结尾标记：`**END OF CHAPTER 1**`

**Step 3: 按规格检查 Chapter 2**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-02.md`
- 检查项：
  - 标题应为 "The Avoidance"
  - 情感弧线：Safety (60) -> Avoidance (55)
  - 关键事件：No failure
  - POV：第一人称
  - 结尾标记

**Step 4: 按规格检查 Chapter 3**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-03.md`
- 检查项：
  - 标题应为 "The Perfection"
  - 情感弧线：Avoidance (55) -> Emptiness (50)
  - 关键事件：No challenge
  - POV：第一人称
  - 结尾标记

**Step 5: 按规格检查 Chapter 4**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-04.md`
- 检查项：
  - 标题应为 "The Failure"
  - 情感弧线：Emptiness (50) -> Collapse (40)
  - 关键事件：Emotional breakdown
  - POV：第一人称
  - 结尾标记

**Step 6: 按规格检查 Chapter 5**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-05.md`
- 检查项：
  - 标题应为 "The Blame"
  - 情感弧线：Collapse (40) -> Defense (35)
  - 关键事件：Deflection
  - POV：第一人称
  - 结尾标记

**Step 7: 按规格检查 Chapter 6**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-06.md`
- 检查项：
  - 标题应为 "The Feedback"
  - 情感弧线：Defense (35) -> Vulnerability (30)
  - 关键事件：Breakdown
  - POV：第一人称
  - 结尾标记

**Step 8: 按规格检查 Chapter 7**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-07.md`
- 检查项：
  - 标题应为 "The Crisis"
  - 情感弧线：Vulnerability (30) -> Crisis (25)
  - 关键事件：Confrontation
  - POV：第一人称
  - 结尾标记

**Step 9: 按规格检查 Chapter 8**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-08.md`
- 检查项：
  - 标题应为 "The AI Solution"
  - 情感弧线：Crisis (25) -> Avoidance (30)
  - 关键事件：Escape
  - POV：第一人称
  - 结尾标记

**Step 10: 按规格检查 Chapter 9**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-09.md`
- 检查项：
  - 标题应为 "The Realization"
  - 情感弧线：Avoidance (30) -> Fear (25)
  - 关键事件：The truth
  - POV：第一人称
  - 结尾标记

**Step 11: 按规格检查 Chapter 10**
- Read: `coo/the-token-addict-fragile-heart/chapters/chapter-10.md`
- 检查项：
  - 标题应为 "The Fragile Heart"
  - 情感弧线：Fear (25) -> Acceptance (30)
  - 关键事件：The new normal
  - POV：第一人称
  - 结尾标记
  - 书籍结尾标记：`**END OF BOOK 6: THE TOKEN ADDICT: FRAGILE HEART**`

**Step 12: 记录问题并修复**
- 如发现章节标题不符、内容不符规格、缺少关键事件等问题
- 立即修复章节内容使其符合规格

---

## 待检查书籍 (33本)

### Task 1: 检查 the-token-addict-silent-room
**Step 1: 读取书籍规格文档**
- Read: `coo/the-token-addict-silent-room/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**
- 每章检查：标题、情感弧线、关键事件、POV、结尾标记

---

### Task 2: 检查 the-token-addict-drifting-will
**Step 1: 读取书籍规格文档**
- Read: `coo/the-token-addict-drifting-will/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 3: 检查 the-token-addict-empty-canvas
**Step 1: 读取书籍规格文档**
- Read: `coo/the-token-addict-empty-canvas/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 4: 检查 the-token-addict-rusty-craft
**Step 1: 读取书籍规格文档**
- Read: `coo/the-token-addict-rusty-craft/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 5: 检查 the-token-addict-borrowed-mind
**Step 1: 读取书籍规格文档**
- Read: `coo/the-token-addict-borrowed-mind/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 6: 检查 the-love-factory
**Step 1: 读取书籍规格文档**
- Read: `coo/the-love-factory/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 7: 检查 the-childhood-museum
**Step 1: 读取书籍规格文档**
- Read: `coo/the-childhood-museum/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 8: 检查 the-desire-market
**Step 1: 读取书籍规格文档**
- Read: `coo/the-desire-market/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 9: 检查 the-death-experience-center
**Step 1: 读取书籍规格文档**
- Read: `coo/the-death-experience-center/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 10: 检查 the-pain-garden
**Step 1: 读取书籍规格文档**
- Read: `coo/the-pain-garden/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 11: 检查 the-fear-laboratory
**Step 1: 读取书籍规格文档**
- Read: `coo/the-fear-laboratory/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 12: 检查 the-dream-market
**Step 1: 读取书籍规格文档**
- Read: `coo/the-dream-market/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 13: 检查 the-emotion-factory
**Step 1: 读取书籍规格文档**
- Read: `coo/the-emotion-factory/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 14: 检查 the-memory-farm
**Step 1: 读取书籍规格文档**
- Read: `coo/the-memory-farm/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 15: 检查 the-skin-garden
**Step 1: 读取书籍规格文档**
- Read: `coo/the-skin-garden/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 16: 检查 the-canvas-void
**Step 1: 读取书籍规格文档**
- Read: `coo/the-canvas-void/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 17: 检查 the-heart-algorithm
**Step 1: 读取书籍规格文档**
- Read: `coo/the-heart-algorithm/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 18: 检查 the-happiness-metric
**Step 1: 读取书籍规格文档**
- Read: `coo/the-happiness-metric/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 19: 检查 the-forever-trap
**Step 1: 读取书籍规格文档**
- Read: `coo/the-forever-trap/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 20: 检查 the-moral-arc
**Step 1: 读取书籍规格文档**
- Read: `coo/the-moral-arc/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 21: 检查 the-empty-vessel
**Step 1: 读取书籍规格文档**
- Read: `coo/the-empty-vessel/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 22: 检查 the-memory-weaver
**Step 1: 读取书籍规格文档**
- Read: `coo/the-memory-weaver/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 23: 检查 the-constructed-eye
**Step 1: 读取书籍规格文档**
- Read: `coo/the-constructed-eye/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 24: 检查 the-language-cage
**Step 1: 读取书籍规格文档**
- Read: `coo/the-language-cage/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 25: 检查 the-pain-paradox
**Step 1: 读取书籍规格文档**
- Read: `coo/the-pain-paradox/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 26: 检查 the-new-foundation
**Step 1: 读取书籍规格文档**
- Read: `coo/the-new-foundation/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 27: 检查 the-agency-within
**Step 1: 读取书籍规格文档**
- Read: `coo/the-agency-within/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 28: 检查 the-alliance-strategy
**Step 1: 读取书籍规格文档**
- Read: `coo/the-alliance-strategy/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 29: 检查 the-deep-dive
**Step 1: 读取书籍规格文档**
- Read: `coo/the-deep-dive/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 30: 检查 the-adaptation-advantage
**Step 1: 读取书籍规格文档**
- Read: `coo/the-adaptation-advantage/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 31: 检查 the-community-effect
**Step 1: 读取书籍规格文档**
- Read: `coo/the-community-effect/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

### Task 32: 检查 the-self-reliant-mind
**Step 1: 读取书籍规格文档**
- Read: `coo/the-self-reliant-mind/.progress/book-spec.md`

**Step 2-11: 按规格检查所有章节**

---

## 执行规则

1. **严格串行执行**：完成一本书后再开始下一本
2. **先读规格再检查**：必须先读取书籍规格文档，了解章节要求
3. **按规格逐项检查**：检查标题、情感弧线、关键事件、POV、结尾标记
4. **发现问题立即修复**：不累积问题，发现后立即解决
5. **更新任务状态**：每完成一本书，更新todo列表
6. **不偷工减料**：必须检查所有章节的所有检查项
7. **不并行**：一次只处理一本书
8. **不抽样**：检查所有章节，不跳过任何一章

---

## 修复标准

### 章节标题不符
- 修改章节标题使其与规格文档一致

### 内容不符规格
- 根据规格中的情感弧线和关键事件重写或修改章节内容

### 缺少关键事件
- 补充规格中定义的关键事件

### POV不一致
- 修改视角使其与规格定义一致

### 截断章节
- 根据规格和上下文补全内容

### 空白章节
- 根据规格创建完整章节内容

### 缺少结尾标记
- 添加正确的结尾标记
