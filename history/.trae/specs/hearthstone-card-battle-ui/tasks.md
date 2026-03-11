# Tasks

## Phase 1: 项目初始化与基础架构
- [x] Task 1: 创建 lego-demo 目录结构和 TypeScript 配置
  - [x] SubTask 1.1: 创建 lego-demo 目录结构
  - [x] SubTask 1.2: 创建 tsconfig.json 配置
  - [x] SubTask 1.3: 创建 package.json 配置
  - [x] SubTask 1.4: 创建基础入口文件 App.tsx
  - [x] SubTask 1.5: 创建类型定义文件 types.ts
  - [x] SubTask 1.6: 创建日志工具类 Logger.ts

## Phase 2: 核心组件开发
- [x] Task 2: 实现战场背景组件 Battlefield.tsx
  - [x] SubTask 2.1: 创建战场背景渲染
  - [x] SubTask 2.2: 实现木质纹理效果
  - [x] SubTask 2.3: 添加粒子背景效果

- [x] Task 3: 实现玩家信息组件 PlayerInfo.tsx
  - [x] SubTask 3.1: 创建英雄头像组件 HeroAvatar.tsx
  - [x] SubTask 3.2: 创建生命值显示组件 HealthDisplay.tsx
  - [x] SubTask 3.3: 创建法力水晶组件 ManaCrystals.tsx
  - [x] SubTask 3.4: 实现数值变化动画

- [x] Task 4: 实现手牌系统 HandCards.tsx
  - [x] SubTask 4.1: 创建卡牌组件 Card.tsx
  - [x] SubTask 4.2: 实现手牌弧形排列
  - [x] SubTask 4.3: 实现长按悬停效果
  - [x] SubTask 4.4: 实现拖拽交互
  - [x] SubTask 4.5: 实现卡牌打出动画

- [x] Task 5: 实现随从战场 MinionField.tsx
  - [x] SubTask 5.1: 创建随从组件 Minion.tsx
  - [x] SubTask 5.2: 实现随从槽位布局
  - [x] SubTask 5.3: 实现随从攻击动画
  - [x] SubTask 5.4: 实现随从死亡动画

- [x] Task 6: 实现牌库与弃牌堆 DeckArea.tsx
  - [x] SubTask 6.1: 创建牌库显示组件
  - [x] SubTask 6.2: 创建弃牌堆显示组件

- [x] Task 7: 实现操作按钮 ActionButtons.tsx
  - [x] SubTask 7.1: 创建英雄技能按钮
  - [x] SubTask 7.2: 创建结束回合按钮
  - [x] SubTask 7.3: 实现按钮状态管理

## Phase 3: 游戏状态管理
- [x] Task 8: 实现游戏状态管理 GameState.tsx
  - [x] SubTask 8.1: 创建游戏状态 Context
  - [x] SubTask 8.2: 实现卡牌数据管理
  - [x] SubTask 8.3: 实现回合管理
  - [x] SubTask 8.4: 实现法力管理

## Phase 4: 动画与特效系统
- [x] Task 9: 实现动画系统 Animations.ts
  - [x] SubTask 9.1: 实现卡牌飞行动画
  - [x] SubTask 9.2: 实现攻击弹道动画
  - [x] SubTask 9.3: 实现伤害数字浮动
  - [x] SubTask 9.4: 实现粒子特效系统

## Phase 5: Web预览与测试
- [x] Task 10: 创建 Web 预览页面
  - [x] SubTask 10.1: 创建 demo.html 预览页面
  - [x] SubTask 10.2: 集成日志输出面板
  - [x] SubTask 10.3: 添加交互测试功能

- [x] Task 11: 实现 Playwright E2E 测试
  - [x] SubTask 11.1: 创建 Playwright 配置文件
  - [x] SubTask 11.2: 创建游戏界面加载测试
  - [x] SubTask 11.3: 创建卡牌交互测试
  - [x] SubTask 11.4: 创建游戏流程测试
  - [x] SubTask 11.5: 创建动画效果测试

- [x] Task 12: 集成测试与调试
  - [x] SubTask 12.1: 运行所有 E2E 测试
  - [x] SubTask 12.2: 修复发现的 Bug
  - [x] SubTask 12.3: 性能优化

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 1, Task 8]
- [Task 5] depends on [Task 1, Task 8]
- [Task 6] depends on [Task 1]
- [Task 7] depends on [Task 1, Task 8]
- [Task 8] depends on [Task 1]
- [Task 9] depends on [Task 2, Task 4, Task 5]
- [Task 10] depends on [Task 1]
- [Task 11] depends on [Task 2, Task 3, Task 4, Task 5, Task 6, Task 7, Task 8, Task 9]
- [Task 12] depends on [Task 11]
