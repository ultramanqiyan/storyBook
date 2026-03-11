# 《炉石传说》风格卡牌对战游戏核心玩法界面 Spec

## Why
在移动端实现一个《炉石传说》风格的卡牌对战游戏核心玩法界面，复刻其标志性的3D立体感、木质桌游质感与幽默卡通的艺术风格，为用户提供沉浸式的桌游体验。

## What Changes
- 在 `lego-mobile/lego-demo` 目录下创建独立的卡牌对战游戏模块
- 使用 TypeScript (TSX) 开发所有组件
- 实现3D战场环境渲染（使用 React Native Skia 或类似方案）
- 实现卡牌系统（手牌、随从、法术）
- 实现玩家信息系统（英雄、生命值、法力水晶）
- 实现交互系统（拖拽、攻击、打出卡牌）
- 实现动画与特效系统
- 添加详细日志系统用于问题定位
- 添加 Playwright 端到端用户测试

## Impact
- 新增目录: `lego-mobile/lego-demo/`
- 不影响现有 lego-mobile 的其他功能
- 独立开发和测试环境
- 使用 TypeScript 提供类型安全

## ADDED Requirements

### Requirement: TypeScript 开发规范
系统 SHALL 使用 TypeScript 进行开发。

#### Scenario: 组件开发
- **WHEN** 开发任何组件时
- **THEN** 使用 TSX 格式，定义完整的 Props 和 State 类型

#### Scenario: 类型定义
- **WHEN** 定义数据结构时
- **THEN** 创建对应的 TypeScript 接口或类型

### Requirement: 3D战场环境
系统 SHALL 提供3D战场环境渲染功能。

#### Scenario: 战场背景渲染
- **WHEN** 游戏开始时
- **THEN** 系统加载3D战场背景，应用卡通着色器，显示木质桌游质感

#### Scenario: 粒子效果
- **WHEN** 战场环境加载完成
- **THEN** 系统显示飘动的魔法粒子等动态效果

### Requirement: 玩家信息区域
系统 SHALL 显示玩家和对手的信息区域。

#### Scenario: 英雄头像显示
- **WHEN** 游戏界面加载
- **THEN** 顶部显示对手英雄头像，底部显示玩家英雄头像，使用圆形遮罩

#### Scenario: 生命值显示
- **WHEN** 生命值变化时
- **THEN** 数值更新并触发闪烁动画效果

#### Scenario: 法力水晶显示
- **WHEN** 回合开始或消耗法力时
- **THEN** 法力水晶水平排列，显示可用与已消耗状态

### Requirement: 手牌系统
系统 SHALL 实现手牌区域交互功能。

#### Scenario: 手牌排列
- **WHEN** 玩家查看手牌
- **THEN** 卡牌以弧形或直线排列，正面朝向玩家

#### Scenario: 卡牌悬停效果
- **WHEN** 玩家长按卡牌
- **THEN** 卡牌浮起并显示详细信息浮窗

#### Scenario: 卡牌拖拽
- **WHEN** 玩家拖拽卡牌
- **THEN** 卡牌跟随手指移动，显示拖拽轨迹

#### Scenario: 卡牌打出
- **WHEN** 玩家在合法位置释放卡牌
- **THEN** 卡牌飞向目标位置并触发效果

#### Scenario: 非法操作反馈
- **WHEN** 玩家在非法位置释放卡牌
- **THEN** 卡牌执行回弹与抖动动画

### Requirement: 随从战场
系统 SHALL 实现随从战场功能。

#### Scenario: 随从召唤
- **WHEN** 玩家打出随从卡牌
- **THEN** 随从模型在战场显示，播放入场动画

#### Scenario: 随从攻击
- **WHEN** 随从攻击目标
- **THEN** 随从模型转向目标并播放攻击动画

#### Scenario: 随从死亡
- **WHEN** 随从生命值归零
- **THEN** 播放死亡动画并移除随从

### Requirement: 牌库与弃牌堆
系统 SHALL 显示牌库与弃牌堆状态。

#### Scenario: 牌库显示
- **WHEN** 牌库有卡牌时
- **THEN** 显示剩余数量标签

#### Scenario: 弃牌堆显示
- **WHEN** 弃牌堆有卡牌时
- **THEN** 显示堆叠的卡牌图标

### Requirement: 按钮操作
系统 SHALL 提供游戏操作按钮。

#### Scenario: 英雄技能按钮
- **WHEN** 玩家点击英雄技能按钮
- **THEN** 触发英雄技能效果（如果法力足够）

#### Scenario: 结束回合按钮
- **WHEN** 玩家点击结束回合按钮
- **THEN** 切换到对手回合

### Requirement: 动画与特效
系统 SHALL 实现丰富的动画与特效。

#### Scenario: 卡牌打出动画
- **WHEN** 卡牌被打出
- **THEN** 播放飞行动画、粒子拖尾和落地效果

#### Scenario: 攻击动画
- **WHEN** 随从或英雄攻击
- **THEN** 播放弹道效果和命中爆炸粒子

#### Scenario: 伤害反馈
- **WHEN** 造成伤害时
- **THEN** 显示伤害数字浮动反馈

### Requirement: 日志系统
系统 SHALL 提供详细的日志用于问题定位。

#### Scenario: 操作日志
- **WHEN** 任何游戏操作发生
- **THEN** 记录详细日志信息

#### Scenario: 错误日志
- **WHEN** 发生错误时
- **THEN** 记录错误堆栈和上下文信息

### Requirement: Web预览支持
系统 SHALL 支持浏览器预览和调试。

#### Scenario: Web预览
- **WHEN** 开发者需要调试
- **THEN** 可通过浏览器预览界面并查看日志

### Requirement: Playwright E2E测试
系统 SHALL 提供完整的端到端测试覆盖。

#### Scenario: 游戏界面加载测试
- **WHEN** 运行 E2E 测试
- **THEN** 验证游戏界面正确加载，所有组件正确渲染

#### Scenario: 卡牌交互测试
- **WHEN** 运行 E2E 测试
- **THEN** 验证卡牌拖拽、打出、攻击等交互功能正常

#### Scenario: 游戏流程测试
- **WHEN** 运行 E2E 测试
- **THEN** 验证完整游戏流程（回合切换、胜负判定等）

#### Scenario: 动画效果测试
- **WHEN** 运行 E2E 测试
- **THEN** 验证动画和特效正确触发
