# URL后缀遗漏修改问题

## 问题现象

在移除URL中的 `.html` 后缀时，部分文件被遗漏修改，导致线上页面URL格式不一致。

### 遗漏的文件

| 文件 | 遗漏位置 | 问题代码 |
|------|----------|----------|
| `scripts/generate-from-db.js` | 第1212、1214行 | `href="../index.html"` |
| `scripts/generate-from-db.js` | 第2134行 | `href="../books/${book.bookId}.html"` |
| `src/frontend/js/api.js` | 第45、53行 | `window.location.href = 'login.html'` |

## 根本原因

1. **修改范围不完整**：只修改了主要文件，没有全面检查所有相关文件
2. **脚本文件被忽略**：`generate-from-db.js` 是生成静态页面的脚本，修改后需要重新生成所有页面
3. **缺少全局搜索验证**：修改后没有用 `grep` 全局搜索确认是否还有遗漏

## 解决方案

### 1. 全面搜索遗漏

```bash
# 搜索所有 .html 后缀的URL
grep -rn '\.html' src/frontend --include="*.js" --include="*.html"
grep -rn '\.html' scripts --include="*.js"
```

### 2. 修改遗漏的文件

```javascript
// api.js 修改
window.location.href = 'login.html';  // 改为
window.location.href = 'login';

// generate-from-db.js 修改
href="../index.html"  // 改为
href="../index"

href="../books/${book.bookId}.html"  // 改为
href="../books/${book.bookId}"
```

### 3. 重新生成静态文件

```bash
node scripts/generate-from-db.js
```

### 4. 部署到Production

```bash
# 必须指定 --branch=main 才能部署到 Production
wrangler pages deploy src/frontend --project-name=storybook --branch=main
```

## 预防措施

### 1. 修改前全局搜索

在修改URL格式前，先全局搜索所有相关代码：

```bash
grep -rn '\.html' src/frontend scripts --include="*.js" --include="*.html"
```

### 2. 修改后验证

修改完成后，再次搜索确认没有遗漏：

```bash
# 搜索URL中的 .html 后缀（排除文件名和CSS链接）
grep -rn 'href="[^"]*\.html"' src/frontend scripts
grep -rn "location.href.*\.html" src/frontend scripts
```

### 3. 部署类型区分

Cloudflare Pages 有两种部署类型：

| 类型 | 命令 | 说明 |
|------|------|------|
| Preview | `wrangler pages deploy` | 不带 `--branch` 参数，自定义域名不会更新 |
| Production | `wrangler pages deploy --branch=main` | 带 `--branch=main`，自定义域名会更新 |

### 4. 检查清单

URL格式修改检查清单：

- [ ] 搜索所有 `.html` 后缀的URL
- [ ] 修改主HTML文件中的静态链接
- [ ] 修改JS文件中的动态链接
- [ ] 修改生成脚本中的URL
- [ ] 重新生成静态文件
- [ ] 部署到 Production（带 `--branch=main`）
- [ ] 验证自定义域名是否更新

## 相关代码

- `src/frontend/js/api.js`
- `scripts/generate-from-db.js`
- `src/frontend/*.html`

## 发现时间

2026-03-19

## 影响范围

- 所有静态生成的书籍页面
- 所有章节页面
- 登录跳转逻辑
