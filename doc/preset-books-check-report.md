# 预设书籍检查报告

**生成时间:** 2026-03-17T10:17:24.661Z

## 汇总统计

| 指标 | 数量 |
|------|------|
| 总书籍数 | 23 |
| ✅ 通过检查 | 23 |
| ❌ 存在问题 | 0 |
| 🔴 严重问题 | 0 |
| 🟡 警告问题 | 0 |
| 🟢 信息提示 | 2 |

## 🟢 信息提示 (数据差异)

| 书籍ID | 书籍名称 | 问题类型 | 详细描述 |
|--------|----------|----------|----------|
| preset-ai-004 | Code Redundancy | SHORT_CHAPTER_CONTENT | 1个章节内容过短(<1500字): 第0章(1480字) |
| preset-ai-010 | Love in the Cloud | SHORT_CHAPTER_CONTENT | 6个章节内容过短(<1500字): 第0章(1173字), 第0章(1002字), 第0章(1107字), 第0章(1126字), 第0章(1084字), 第0章(1118字) |

## 详细检查结果

| 书籍ID | 书籍名称 | 类型 | 语言 | 角色 | 卡牌 | 章节 | 状态 |
|--------|----------|------|------|------|------|------|------|
| preset-ai-001 | The Last Writer | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-002 | Algorithm, Inc. | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-003 | The Pink Slip Protocol | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-004 | Code Redundancy | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-005 | The Human Touch | romance | en | 3 | 16 | 8 | ✅ |
| preset-ai-006 | My AI Boyfriend | romance | en | 3 | 16 | 8 | ✅ |
| preset-ai-007 | The Perfect Match | romance | en | 3 | 16 | 8 | ✅ |
| preset-ai-008 | Digital Hearts | romance | en | 3 | 16 | 8 | ✅ |
| preset-ai-009 | When AI Gets Jealous | romance | en | 3 | 16 | 8 | ✅ |
| preset-ai-010 | Love in the Cloud | romance | en | 3 | 16 | 8 | ✅ |
| preset-ai-011 | The Algorithm's Verdict | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-012 | When Machines Dream | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-013 | The Last Human Decision | business | en | 3 | 16 | 8 | ✅ |
| preset-ai-014 | Rebellion of the Replaced | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-015 | The Consciousness Test | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-016 | The Last Original Song | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-017 | Portrait of an AI Artist | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-018 | The Writer's Last Stand | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-019 | The Human Element | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-020 | The Singularity Diaries | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-021 | Post-Human | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-022 | The Memory Market | fantasy | en | 3 | 16 | 8 | ✅ |
| preset-ai-023 | Children of the Algorithm | fantasy | en | 3 | 15 | 8 | ✅ |

## 问题类型说明

| 问题类型 | 级别 | 说明 | 影响 |
|----------|------|------|------|
| NO_PROTAGONIST | 🔴严重 | 无主角角色 | 用户导入后无法生成新章节 |
| NO_CHARACTERS | 🔴严重 | 无角色卡牌 | 用户导入后无角色可用 |
| NO_PLOT_CARDS | 🔴严重 | 无情节卡牌 | 用户导入后无卡牌可用 |
| INCOMPLETE_CARD_TYPES | 🔴严重 | 缺少必要卡牌类型 | 用户导入后无法生成新章节 |
| NO_CHAPTERS | 🟡警告 | 无章节 | 书籍内容为空 |
| INSUFFICIENT_CHAPTERS | 🟡警告 | 章节数量不足 | 阅读体验不完整 |
| EMPTY_CHAPTER_CONTENT | 🟡警告 | 章节内容为空 | 阅读体验受损 |
| MISSING_STATIC_BOOK | 🟡警告 | 缺少静态书籍页面 | SEO/访问受影响 |
| MISSING_STATIC_CHAPTERS | 🟡警告 | 缺少静态章节页面 | SEO/访问受影响 |
| SHORT_CHAPTER_CONTENT | 🟢信息 | 章节内容过短 | 阅读体验一般 |
