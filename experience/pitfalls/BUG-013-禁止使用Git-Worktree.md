# 禁止使用 Git Worktree

## 问题现象

项目中使用 `git worktree` 功能时，多次出现以下问题：

1. **分支混乱** - worktree 和主仓库之间的分支状态不一致
2. **文件冲突** - 多个 worktree 之间的文件状态冲突
3. **状态不同步** - 修改后状态无法正确同步到主仓库
4. **操作复杂** - 增加了不必要的复杂度，容易出错

## 根本原因

Git worktree 虽然提供了多工作目录的功能，但在实际使用中：

1. 项目成员对 worktree 机制理解不深
2. 多个 worktree 之间的状态管理容易出错
3. 与 IDE 和工具的集成存在兼容性问题
4. 问题排查和恢复成本高

## 解决方案

**完全禁止使用 git worktree 功能。**

使用常规的分支管理方式替代：

```bash
# 切换分支
git checkout <branch>
git switch <branch>

# 创建新分支
git checkout -b <new-branch>

# 暂存当前修改
git stash
git stash pop
```

## 预防措施

1. 已在 `.trae/rules/superpowers_rules.md` 中添加禁止规则
2. 已从可用技能列表中移除 `using-git-worktrees` 技能
3. 所有开发人员需知晓此规则

## 相关代码

- 规则文件：`.trae/rules/superpowers_rules.md`

## 发现时间

2026-03-18

## 影响范围

全体开发人员，所有涉及分支管理的操作
