# Cloudflare Pages + Pages Functions + D1 部署指南

## 一、概述

本指南详细说明如何从零开始部署一个使用Cloudflare Pages托管前端、Pages Functions作为API、D1作为数据库的全栈项目。

---

## 二、前置准备

### 2.1 必需账号

| 账号 | 用途 | 注册地址 |
|------|------|----------|
| Cloudflare | 托管和数据库 | https://dash.cloudflare.com/sign-up |
| Node.js | 开发环境 | https://nodejs.org/ (v18+) |

### 2.2 安装Wrangler CLI

```bash
npm install -g wrangler
```

### 2.3 验证安装

```bash
wrangler --version
```

---

## 三、创建项目

### 3.1 初始化项目目录

```bash
mkdir my-project
cd my-project
npm init -y
```

### 3.2 创建目录结构

```
my-project/
├── functions/          # Pages Functions API
│   └── api/
│       └── users.js    # 示例API
├── migrations/         # 数据库迁移
├── public/             # 静态文件
│   ├── index.html
│   ├── css/
│   └── js/
├── wrangler.toml       # Cloudflare配置
├── package.json
└── vitest.config.js    # 测试配置(可选)
```

### 3.3 创建基础文件

**wrangler.toml**:
```toml
name = "my-project"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "my-project-db"
database_id = ""  # 创建数据库后填入
```

**functions/api/users.js**:
```javascript
export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    const result = await env.DB.prepare(
      'SELECT * FROM users LIMIT 10'
    ).all();
    
    return new Response(JSON.stringify({
      success: true,
      data: result.results
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

---

## 四、D1数据库配置

### 4.1 登录Cloudflare

```bash
wrangler login
```

这会打开浏览器，授权Wrangler访问你的Cloudflare账号。

### 4.2 创建D1数据库

```bash
wrangler d1 create my-project-db
```

执行后会返回类似信息：
```
✅ Successfully created DB 'my-project-db'
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 4.3 更新wrangler.toml

将返回的database_id填入wrangler.toml：

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-project-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # 填入实际ID
```

### 4.4 创建迁移文件

**migrations/0001_init.sql**:
```sql
CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS books (
  book_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 4.5 执行本地迁移

```bash
wrangler d1 execute my-project-db --local --file=./migrations/0001_init.sql
```

### 4.6 执行远程迁移

```bash
wrangler d1 execute my-project-db --remote --file=./migrations/0001_init.sql
```

---

## 五、本地开发

### 5.1 启动本地开发服务器

```bash
wrangler pages dev public --d1=DB=my-project-db
```

参数说明：
- `public`: 静态文件目录
- `--d1=DB=my-project-db`: 绑定D1数据库

### 5.2 访问本地服务

- 前端页面: http://localhost:8788
- API接口: http://localhost:8788/api/users

### 5.3 添加npm脚本

**package.json**:
```json
{
  "scripts": {
    "dev": "wrangler pages dev public --d1=DB=my-project-db",
    "deploy": "wrangler pages deploy public",
    "db:migrate:local": "wrangler d1 execute my-project-db --local --file=./migrations/0001_init.sql",
    "db:migrate:remote": "wrangler d1 execute my-project-db --remote --file=./migrations/0001_init.sql"
  }
}
```

---

## 六、部署到Cloudflare Pages

### 6.1 创建Pages项目

**方式一：通过CLI创建**

```bash
wrangler pages project create my-project
```

**方式二：通过控制台创建**

1. 登录 https://dash.cloudflare.com/
2. 进入 Workers & Pages
3. 点击 "Create application"
4. 选择 "Pages" -> "Upload assets"
5. 输入项目名称

### 6.2 部署代码

```bash
wrangler pages deploy public
```

### 6.3 绑定D1数据库

**方式一：通过wrangler.toml**

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-project-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**方式二：通过控制台**

1. 进入 Pages 项目设置
2. 选择 "Functions"
3. 在 "D1 database bindings" 中添加绑定
4. 变量名: `DB`，选择数据库: `my-project-db`

### 6.4 配置环境变量

1. 进入 Pages 项目设置
2. 选择 "Environment variables"
3. 添加生产环境和预览环境的变量

| 变量名 | 值 | 环境 |
|--------|-----|------|
| API_KEY | your-api-key | Production |
| API_KEY | test-api-key | Preview |

---

## 七、自定义域名

### 7.1 添加自定义域名

1. 进入 Pages 项目设置
2. 选择 "Custom domains"
3. 点击 "Set up a custom domain"
4. 输入域名并验证

### 7.2 DNS配置

如果域名不在Cloudflare：
1. 添加CNAME记录指向项目域名
2. 等待DNS生效

---

## 八、CI/CD配置

### 8.1 GitHub Actions

**.github/workflows/deploy.yml**:
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: pages deploy public
```

### 8.2 获取API Token

1. 登录Cloudflare控制台
2. 进入 "My Profile" -> "API Tokens"
3. 点击 "Create Token"
4. 选择 "Edit Cloudflare Workers" 模板
5. 复制Token并添加到GitHub Secrets

---

## 九、常见问题

### 9.1 本地开发数据库问题

**问题**: 本地开发时数据库为空

**解决**: 本地数据库存储在`.wrangler/state/`目录，需要单独执行迁移：
```bash
wrangler d1 execute my-project-db --local --file=./migrations/0001_init.sql
```

### 9.2 CORS问题

**问题**: API请求被CORS阻止

**解决**: 在API中添加CORS头：
```javascript
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
```

### 9.3 环境变量问题

**问题**: 本地开发无法访问环境变量

**解决**: 创建`.dev.vars`文件：
```
API_KEY=your-api-key
```

### 9.4 部署后数据库连接失败

**问题**: 部署后API返回数据库错误

**解决**: 检查D1绑定是否正确配置：
1. 确认wrangler.toml中的binding名称
2. 确认控制台中已添加D1绑定
3. 重新部署项目

---

## 十、最佳实践

### 10.1 项目结构建议

```
my-project/
├── functions/
│   ├── api/              # REST API
│   │   ├── users.js
│   │   └── utils.js      # 公共函数
│   └── _middleware.js    # 中间件(如CORS)
├── migrations/           # 数据库迁移(按版本命名)
│   ├── 0001_init.sql
│   └── 0002_add_table.sql
├── public/               # 静态文件
├── tests/                # 测试文件
├── wrangler.toml
├── .dev.vars             # 本地环境变量(不提交)
├── .gitignore
└── package.json
```

### 10.2 .gitignore建议

```
node_modules/
.wrangler/
.dev.vars
dist/
*.log
```

### 10.3 API响应格式建议

```javascript
// 成功响应
{
  "success": true,
  "data": { ... },
  "error": null
}

// 错误响应
{
  "success": false,
  "data": null,
  "error": "错误信息"
}
```

### 10.4 安全建议

| 措施 | 说明 |
|------|------|
| 参数化查询 | 防止SQL注入 |
| 输入验证 | 验证所有用户输入 |
| 环境变量 | API密钥存储在环境变量 |
| CORS限制 | 生产环境限制允许的域名 |
| 速率限制 | 防止API被滥用 |

---

## 十一、部署检查清单

### 11.1 部署前

- [ ] 代码已通过本地测试
- [ ] 数据库迁移文件已准备
- [ ] wrangler.toml配置正确
- [ ] 敏感信息已移至环境变量

### 11.2 部署时

- [ ] 创建D1数据库
- [ ] 执行远程数据库迁移
- [ ] 部署代码到Pages
- [ ] 绑定D1数据库
- [ ] 配置环境变量

### 11.3 部署后

- [ ] 验证前端页面可访问
- [ ] 验证API接口正常
- [ ] 验证数据库读写正常
- [ ] 配置自定义域名(如需要)
- [ ] 配置CI/CD(如需要)

---

## 十二、常用命令速查

| 命令 | 说明 |
|------|------|
| `wrangler login` | 登录Cloudflare |
| `wrangler d1 create <name>` | 创建D1数据库 |
| `wrangler d1 list` | 列出所有数据库 |
| `wrangler d1 execute <db> --local --file=<sql>` | 本地执行迁移 |
| `wrangler d1 execute <db> --remote --file=<sql>` | 远程执行迁移 |
| `wrangler pages dev <dir>` | 本地开发服务器 |
| `wrangler pages deploy <dir>` | 部署到Pages |
| `wrangler pages project list` | 列出所有Pages项目 |
