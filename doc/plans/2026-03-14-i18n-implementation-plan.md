# 国际化（i18n）实施计划

## 任务概述

全站国际化改造，支持中英文切换，包括前端、后端、配置文件、数据库迁移和测试。

## 任务列表

### 阶段1: 扩展翻译字典 (theme.js)

- [ ] 1.1 添加 meta 翻译（title, description, keywords）
- [ ] 1.2 添加 library 页面翻译
- [ ] 1.3 添加 bookshelf 页面翻译（删除确认弹窗等）
- [ ] 1.4 添加 book 页面翻译
- [ ] 1.5 添加 chapter 页面翻译（侧边栏、模态框、验证消息）
- [ ] 1.6 添加 director 页面翻译（提示文字、卡牌类型）
- [ ] 1.7 添加 create 页面翻译（表单标签、选项）
- [ ] 1.8 添加 options 翻译（personality, speechStyle, roleType, intimacy, relationship, cardType）
- [ ] 1.9 添加 messages 翻译（提示消息、验证消息）
- [ ] 1.10 添加 errors 翻译（错误消息码）

### 阶段2: HTML国际化 (8个页面)

- [ ] 2.1 index.html - 添加 data-i18n、SEO标签、语言切换按钮
- [ ] 2.2 login.html - 添加 data-i18n、SEO标签
- [ ] 2.3 library.html - 添加 data-i18n、SEO标签、修改 HTML lang
- [ ] 2.4 bookshelf.html - 添加 data-i18n、SEO标签、删除确认弹窗国际化
- [ ] 2.5 book.html - 添加 data-i18n、SEO标签
- [ ] 2.6 chapter.html - 添加 data-i18n、SEO标签、模态框国际化
- [ ] 2.7 director.html - 添加 data-i18n、SEO标签
- [ ] 2.8 book-create.html - 添加 data-i18n、SEO标签、修改 value 属性为英文key

### 阶段3: JS国际化

- [ ] 3.1 book-create.js - 替换硬编码文字为 t() 函数
- [ ] 3.2 book-create.js - 修改表单选项 value 为英文 key
- [ ] 3.3 director.js - 替换硬编码文字为 t() 函数
- [ ] 3.4 director.js - 修改卡牌类型为英文 key
- [ ] 3.5 api.js - 添加错误消息国际化处理

### 阶段4: 配置文件多语言化

- [ ] 4.1 创建 config/en/ 目录
- [ ] 4.2 创建 config/zh/ 目录
- [ ] 4.3 创建 config/en/book-types.json
- [ ] 4.4 创建 config/en/personality.json
- [ ] 4.5 创建 config/en/speech-style.json
- [ ] 4.6 创建 config/en/character-types.json
- [ ] 4.7 创建 config/en/plot-options.json
- [ ] 4.8 移动现有配置到 config/zh/
- [ ] 4.9 更新前端代码加载对应语言配置

### 阶段5: 后端API改造

- [ ] 5.1 chapters.js - AI提示词多语言化
- [ ] 5.2 chapters.js - 错误消息返回消息码
- [ ] 5.3 puzzles/[id]/solve.js - 卡牌名称多语言化
- [ ] 5.4 puzzles/[id]/solve.js - 消息返回消息码
- [ ] 5.5 books.js - 错误消息返回消息码

### 阶段6: 数据迁移脚本

- [ ] 6.1 创建 scripts/migrate-i18n-values.js
- [ ] 6.2 定义 valueMappings 映射表
- [ ] 6.3 编写角色数据迁移逻辑
- [ ] 6.4 编写卡牌数据迁移逻辑

### 阶段7: E2E测试编写

- [ ] 7.1 创建 tests/e2e/i18n.spec.js - 核心功能测试
- [ ] 7.2 创建 tests/e2e/i18n-pages.spec.js - 页面国际化测试
- [ ] 7.3 创建 tests/e2e/i18n-forms.spec.js - 表单国际化测试
- [ ] 7.4 创建 tests/e2e/i18n-api.spec.js - API消息测试
- [ ] 7.5 创建 tests/e2e/i18n-seo.spec.js - SEO标签测试

### 阶段8: 测试验证

- [ ] 8.1 运行所有E2E测试
- [ ] 8.2 手动验证语言切换功能
- [ ] 8.3 验证SEO标签正确性
- [ ] 8.4 验证数据迁移正确性

## 依赖关系

```
阶段1 (翻译字典) 
    ↓
阶段2 (HTML) + 阶段3 (JS) + 阶段4 (配置)
    ↓
阶段5 (后端API)
    ↓
阶段6 (数据迁移)
    ↓
阶段7 (E2E测试)
    ↓
阶段8 (验证)
```

## 预计工作量

| 阶段 | 预计文件数 | 复杂度 |
|------|-----------|--------|
| 阶段1 | 1 | 中 |
| 阶段2 | 8 | 高 |
| 阶段3 | 3 | 高 |
| 阶段4 | 11 | 中 |
| 阶段5 | 3 | 高 |
| 阶段6 | 1 | 中 |
| 阶段7 | 5 | 中 |
| 阶段8 | - | 低 |

## 注意事项

1. **value属性必须使用英文key**，避免数据库存储中文
2. **保持翻译字典结构一致**，中英文键名相同
3. **后端消息码统一格式**，如 `error.missingBookId`
4. **测试覆盖所有页面**，确保无遗漏
