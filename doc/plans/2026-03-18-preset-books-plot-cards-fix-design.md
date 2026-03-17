# 预设书籍情节卡牌修复设计文档

**创建时间:** 2026-03-18

## 问题背景

经过端到端测试发现，39本预设书籍（31本英文+8本中文）中，有37本书的情节卡牌名称在项目配置文件中找不到对应项，导致卡牌配置验证失败。

## 解决方案

### 核心思路

将每本预设书籍的情节卡牌重新设置，从项目现有的配置文件中随机抽取，确保所有卡牌都在配置中存在。

### 卡牌数量

- 每本书：32张卡牌
- 每个类型：8张卡牌（weather/terrain/adventure/equipment）

### 随机策略

使用书籍ID作为随机种子，确保同一本书每次生成相同的卡牌组合。

## 修复范围

### 英文书籍（31本）

| 类型 | 书籍ID |
|------|--------|
| AI系列 | preset-ai-001 ~ preset-ai-023 |
| 冒险 | preset-adventure-003-en, preset-adventure-004-en |
| 职场 | preset-business-003-en, preset-business-004-en |
| 魔幻 | preset-fantasy-003-en, preset-fantasy-004-en |
| 言情 | preset-romance-003-en, preset-romance-004-en |

### 中文书籍（8本）

| 类型 | 书籍ID |
|------|--------|
| 冒险 | preset-adventure-003, preset-adventure-004 |
| 职场 | preset-business-003, preset-business-004 |
| 魔幻 | preset-fantasy-003, preset-fantasy-004 |
| 言情 | preset-romance-003, preset-romance-004 |

## 项目配置情况

每种书籍类型都有80张卡牌配置：

| 书籍类型 | weather | terrain | adventure | equipment | 总计 |
|----------|---------|---------|-----------|-----------|------|
| adventure | 20张 | 20张 | 20张 | 20张 | 80张 |
| fantasy | 20张 | 20张 | 20张 | 20张 | 80张 |
| romance | 20张 | 20张 | 20张 | 20张 | 80张 |
| business | 20张 | 20张 | 20张 | 20张 | 80张 |

## 修复流程

```
1. 加载项目配置（plot-options.json）
2. 查询所有预设书籍（39本）
3. 检查角色卡牌是否缺失
4. 为每本书生成新卡牌（固定种子随机抽取）
5. 更新数据库（先删除后插入）
6. 重新生成静态HTML文件
7. 输出修复报告
```

## 数据处理策略

| 数据类型 | 处理方式 |
|----------|----------|
| 情节卡牌 | 先删除原有，再插入新的 |
| 角色卡牌 | 保持不变，检查缺失 |
| 章节内容 | 保持不变 |
| 静态文件 | 重新生成 |

## 随机抽取算法

```javascript
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

function selectCards(cards, count, seed) {
  const random = seededRandom(seed);
  const shuffled = [...cards].sort(() => random() - 0.5);
  return shuffled.slice(0, count);
}
```

## 输出文件

1. 修复脚本：`scripts/fix-preset-books-plot-cards.js`
2. 修复报告：`doc/preset-books-fix-report.md`

## 验证方式

修复完成后，重新运行端到端测试，确认所有卡牌配置验证通过。
