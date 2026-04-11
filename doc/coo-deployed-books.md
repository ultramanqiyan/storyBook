# COO系列已部署书籍登记

## 概述

本文档记录所有已部署到生产环境的COO系列书籍。

**最后更新**: 2026-04-11

---

## 已部署书籍列表

### 2026-04-11 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-vision-question | The Vision Question | Adventure | 10 | 1 | ✅ 已部署 |
| preset-coo-the-love-factory | The Love Factory | Romance | 10 | 3 | ✅ 已部署 |
| preset-coo-the-entropy-horizon | The Entropy Horizon | Business | 10 | 4 | ✅ 已部署 |

### 2026-04-02 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-token-addict-borrowed-mind | The Token Addict: Borrowed Mind | Business | 10 | 3 | ✅ 已部署 |
| preset-coo-the-transition-point | The Convergence - Gathering | Adventure | 10 | 0 | ✅ 已部署 |
| preset-coo-the-trust-protocol | The Trust Protocol: A Novel About Decentralized Deception | Business | 10 | 4 | ✅ 已部署 |

### 2026-04-01 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-memory-park | Memory Park | Fantasy | 10 | - | ✅ 已部署 |
| preset-coo-the-silent-poet | The Silent Poet | Fantasy | 10 | - | ✅ 已部署 |
| preset-coo-the-pain-garden | The Pain Garden | Fantasy | 10 | - | ✅ 已部署 |
| preset-coo-the-empty-mall | The Empty Mall | Business | 10 | - | ✅ 已部署 |

### 2026-03-30 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-clockwork-oracle | The Clockwork Oracle | Fantasy | 10 | - | ✅ 已部署 |
| preset-coo-the-glass-ceiling | The Glass Ceiling | Business | 10 | - | ✅ 已部署 |

### 2026-03-27 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-quantum-witch | The Quantum Witch | Fantasy | 10 | - | ✅ 已部署 |
| preset-coo-the-prompt-mage | The Prompt Mage | Fantasy | 10 | - | ✅ 已部署 |

### 2026-03-26 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-hollow-heart | The Hollow Heart | Business | 10 | - | ✅ 已部署 |
| preset-coo-the-silent-lab | The Silent Lab | Business | 10 | - | ✅ 已部署 |

### 2026-03-25 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-whispering-network | The Whispering Network | Fantasy | 11 | - | ✅ 已部署 |
| preset-coo-the-synthetic-soul | The Synthetic Soul | Business | 10 | - | ✅ 已部署 |

### 2026-03-24 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-blame-game | The Blame Game | Business | 10 | - | ✅ 已部署 |
| preset-coo-the-silent-partner | The Silent Partner | Business | 10 | - | ✅ 已部署 |

### 2026-03-23 部署

| 书籍ID | 标题 | 主题类型 | 章节数 | 角色数 | 部署状态 |
|--------|------|----------|--------|--------|----------|
| preset-coo-the-neural-druid | The Neural Druid | Fantasy | 10 | - | ✅ 已部署 |
| preset-coo-the-unconditional | The Unconditional | Business | 10 | - | ✅ 已部署 |

---

## 统计

- **总部署书籍**: 21本
- **Business类型**: 10本
- **Fantasy类型**: 7本
- **Adventure类型**: 2本
- **Romance类型**: 1本
- **总章节数**: 约210章

---

## 部署流程

1. 运行部署脚本: `node scripts/deploy-all.js --overwrite <book-name>`
2. 检查静态文件质量
3. 更新sitemap.xml
4. 登记到本文档

---

## 注意事项

- 所有书籍使用 `preset-coo-` 前缀
- 章节ID使用 `chapter-coo-<book-name>-<number>` 格式
- 每个静态页面包含两个章节（左右页设计）
