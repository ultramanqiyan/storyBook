# Superpowers 技能调用规则

## 规则概述

所有需求、开发、测试、部署环节必须调用superpowers技能。这是强制要求，确保开发流程规范化。

## 可用技能列表

| 技能名称 | 适用场景 | 调用时机 |
|----------|----------|----------|
| `brainstorming` | 创建功能、构建组件、添加功能、修改行为 | 开始任何创造性工作前 |
| `writing-plans` | 有规格或需求的多步骤任务 | 开始编码前 |
| `executing-plans` | 有书面实施计划需要执行 | 有计划后执行 |
| `subagent-driven-development` | 执行有独立任务的实施计划 | 当前会话中执行计划 |
| `test-driven-development` | 实现功能或修复Bug | 编写实现代码前 |
| `systematic-debugging` | 遇到Bug、测试失败、意外行为 | 提出修复方案前 |
| `requesting-code-review` | 完成任务、实现主要功能、合并前 | 验证工作符合要求 |
| `receiving-code-review` | 收到代码审查反馈 | 实施建议前 |
| `verification-before-completion` | 即将声称工作完成、修复、通过 | 提交或创建PR前 |
| `finishing-a-development-branch` | 实现完成、测试通过 | 决定如何集成工作 |
| `dispatching-parallel-agents` | 面对2+独立任务 | 可并行工作时 |
| `writing-skills` | 创建新技能、编辑现有技能 | 部署前验证技能 |

## 各环节技能调用要求

### 需求环节

| 活动 | 必须调用的技能 | 说明 |
|------|----------------|------|
| 新功能设计 | `brainstorming` | 探索用户意图、需求和设计 |
| 需求分析 | `brainstorming` | 深入理解需求 |
| 编写需求文档 | `writing-plans` | 规划文档结构 |

### 开发环节

| 活动 | 必须调用的技能 | 说明 |
|------|----------------|------|
| 开始新功能 | `brainstorming` | 设计功能和组件 |
| 编写实现计划 | `writing-plans` | 规划实现步骤 |
| 执行实现计划 | `executing-plans` 或 `subagent-driven-development` | 按计划执行 |
| 功能开发 | `test-driven-development` | 先写测试再实现 |
| 修复Bug | `systematic-debugging` | 系统化调试 |

### 测试环节

| 活动 | 必须调用的技能 | 说明 |
|------|----------------|------|
| 测试失败分析 | `systematic-debugging` | 分析失败原因 |
| 测试通过验证 | `verification-before-completion` | 确认测试真正通过 |

### 部署环节

| 活动 | 必须调用的技能 | 说明 |
|------|----------------|------|
| 部署前检查 | `verification-before-completion` | 确认所有检查通过 |
| 完成开发分支 | `finishing-a-development-branch` | 决定如何集成 |
| 代码审查 | `requesting-code-review` | 请求代码审查 |

## 流程图

```
┌─────────────────────────────────────────────────────────────┐
│                        开始任务                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              判断任务类型，选择对应技能                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ 新功能   │    │ Bug修复  │    │ 部署     │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │               │
         ▼               ▼               ▼
    brainstorming   systematic-    verification-
    writing-plans   debugging      before-completion
    executing-                     finishing-a-
    plans                          development-branch
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │    任务完成验证      │
              │ verification-before │
              │    -completion      │
              └─────────────────────┘
```

## 调用示例

### 示例1：开发新功能

```
用户: 帮我添加用户登录功能

助手: 我需要先使用brainstorming技能来设计这个功能。
[调用 Skill: brainstorming]
...
设计完成后，使用writing-plans技能规划实现步骤。
[调用 Skill: writing-plans]
...
计划确认后，使用test-driven-development技能实现功能。
[调用 Skill: test-driven-development]
...
实现完成后，使用verification-before-completion技能验证。
[调用 Skill: verification-before-completion]
```

### 示例2：修复Bug

```
用户: 登录功能报错了

助手: 我需要先使用systematic-debugging技能来分析问题。
[调用 Skill: systematic-debugging]
...
找到原因后，使用test-driven-development技能修复。
[调用 Skill: test-driven-development]
...
修复完成后，使用verification-before-completion技能验证。
[调用 Skill: verification-before-completion]
```

### 示例3：部署上线

```
用户: 准备部署到生产环境

助手: 我需要先使用verification-before-completion技能确认所有检查通过。
[调用 Skill: verification-before-completion]
...
验证通过后，使用finishing-a-development-branch技能决定集成方式。
[调用 Skill: finishing-a-development-branch]
```

## 检查清单

在开始任何任务前，请确认：

- [ ] 是否已识别任务类型？
- [ ] 是否已选择正确的技能？
- [ ] 是否已调用技能？
- [ ] 是否按技能指导执行？

### 需求阶段检查

- [ ] 是否调用了 `brainstorming` 技能？

### 开发阶段检查

- [ ] 新功能是否调用了 `brainstorming` 技能？
- [ ] 是否调用了 `writing-plans` 技能？
- [ ] 是否调用了 `test-driven-development` 技能？

### 测试阶段检查

- [ ] Bug是否调用了 `systematic-debugging` 技能？
- [ ] 是否调用了 `verification-before-completion` 技能？

### 部署阶段检查

- [ ] 是否调用了 `verification-before-completion` 技能？
- [ ] 是否调用了 `finishing-a-development-branch` 技能？

## 注意事项

1. **技能调用是强制的**，不是可选的
2. **按顺序调用技能**，不要跳过步骤
3. **遵循技能指导**，不要自行其是
4. **记录技能调用**，便于追溯

## 禁止事项

### 禁止使用 Git Worktree

**本项目禁止使用 `git worktree` 功能。**

| 项目 | 说明 |
|------|------|
| 禁止原因 | 历史上多次出现问题，包括但不限于：分支混乱、文件冲突、状态不同步等 |
| 替代方案 | 使用常规的分支切换方式：`git checkout`、`git switch` 或创建新分支 |
| 强制级别 | **绝对禁止**，无例外情况 |

**禁止的操作：**
- ❌ `git worktree add`
- ❌ `git worktree remove`
- ❌ `git worktree prune`
- ❌ 任何与 worktree 相关的操作

**推荐的操作：**
- ✅ `git checkout <branch>` - 切换分支
- ✅ `git switch <branch>` - 切换分支（Git 2.23+）
- ✅ `git checkout -b <new-branch>` - 创建并切换新分支
- ✅ `git stash` - 暂存当前修改后切换分支
