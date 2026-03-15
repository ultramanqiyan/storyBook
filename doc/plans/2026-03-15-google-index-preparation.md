# Google 索引准备 - 设计文档

## 概述

为网站提交 Google 索引做准备，包括法律页面和 SEO 优化。

## 项目背景

- 目标用户：国际用户
- 数据收集：账户信息 + 用户创建的内容
- 追踪技术：localStorage（功能性数据）
- 联系方式：ultraman84@qq.com

## 设计方案

### 第一阶段：立即实施（无需域名）

#### 1. 隐私政策页面

**文件：** `src/frontend/privacy.html`

**内容要点：**
- 数据收集说明：邮箱、用户名、用户创建的故事内容
- 数据存储：localStorage（语言偏好、主题偏好、登录状态）
- 数据使用：仅用于提供服务，不与第三方共享
- 用户权利：GDPR 要求的访问、删除、导出数据权利
- 联系方式：ultraman84@qq.com
- 双语支持：中英文版本

#### 2. 服务条款页面

**文件：** `src/frontend/terms.html`

**内容要点：**
- 服务描述：AI 生成故事平台
- 用户责任：合法使用、内容所有权
- 知识产权：AI 生成内容的版权说明
- 免责声明：AI 生成内容的准确性免责
- 服务变更：保留修改服务的权利
- 双语支持：中英文版本

#### 3. 页脚链接更新

**修改文件：** 所有 HTML 页面的页脚

**修改内容：**
```html
<a href="privacy.html" data-i18n="footer.privacy">Privacy</a>
<a href="terms.html" data-i18n="footer.terms">Terms</a>
```

### 第二阶段：域名确定后实施

#### 1. robots.txt

**文件：** `src/frontend/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

#### 2. sitemap.xml

**文件：** `src/frontend/sitemap.xml`

包含所有 8 个页面，双语版本。

#### 3. HTML 页面 SEO 优化

- 添加 canonical URL
- 添加 og:image
- 添加结构化数据 (JSON-LD)

## 文件清单

### 新建文件

| 文件 | 说明 |
|------|------|
| `src/frontend/privacy.html` | 隐私政策页面 |
| `src/frontend/terms.html` | 服务条款页面 |

### 修改文件

| 文件 | 说明 |
|------|------|
| `src/frontend/index.html` | 更新页脚链接 |
| `src/frontend/login.html` | 更新页脚链接 |
| `src/frontend/library.html` | 更新页脚链接 |
| `src/frontend/bookshelf.html` | 更新页脚链接 |
| `src/frontend/book.html` | 更新页脚链接 |
| `src/frontend/chapter.html` | 更新页脚链接 |
| `src/frontend/director.html` | 更新页脚链接 |
| `src/frontend/book-create.html` | 更新页脚链接 |

## 注意事项

1. 所有法律页面需要支持双语（中英文）
2. 页面样式需要与现有页面保持一致
3. 第二阶段任务需要等待域名确定后实施

## 发现时间

2026-03-15
