# StoryBook HelloWorld 项目设计文档

## 一、项目概述

### 1.1 项目目标

创建一个简单的HelloWorld网站，验证Cloudflare Pages + Pages Functions + D1数据库的完整技术栈，为后续正式项目开发提供基础模板。

### 1.2 核心功能

1. 首页展示"HelloWorld"
2. 调用API获取版本信息
3. 从D1数据库读取版本数据
4. 页面展示版本号

---

## 二、技术架构

### 2.1 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| 前端 | 原生HTML/CSS/JS | 无框架，简单直接 |
| 托管 | Cloudflare Pages | 静态文件托管 |
| API | Pages Functions | 无服务器API |
| 数据库 | Cloudflare D1 | 边缘SQLite数据库 |

### 2.2 架构图

```
┌─────────────────────────────────────────────────────────┐
│                    用户浏览器                            │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Cloudflare Pages                           │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │  src/frontend/  │    │    functions/api/           │ │
│  │   index.html    │───►│    version.js               │ │
│  └─────────────────┘    └──────────────┬──────────────┘ │
│                                        │                 │
│                         ┌──────────────▼──────────────┐ │
│                         │    D1 Database              │ │
│                         │    storybook_database       │ │
│                         │    - version表              │ │
│                         └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 三、目录结构

```
storyBook/
├── src/
│   └── frontend/              # 静态文件
│       └── index.html         # 首页
├── functions/                  # Pages Functions
│   └── api/
│       └── version.js         # 版本API
├── migrations/                 # 数据库迁移
│   └── 0001_init.sql          # 初始化version表
├── test/                       # 测试代码
│   └── e2e/                    # 端到端测试
│       └── version.spec.js     # 版本验证测试
├── deploy/                     # 部署脚本
│   ├── dev-local.bat           # 本地测试脚本
│   └── deploy-remote.bat       # 远程部署脚本
├── doc/                        # 项目文档
│   └── design/                 # 设计文档
│       └── 2026-03-11-storybook-helloworld-design.md
├── wrangler.toml              # Cloudflare配置
└── package.json               # 项目配置
```

---

## 四、数据库设计

### 4.1 version表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键，自增 |
| version | TEXT | 版本号 |
| description | TEXT | 版本描述 |
| created_at | TEXT | 创建时间 |

### 4.2 初始数据

```sql
INSERT INTO version (version, description) VALUES ('V0.1', '初始版本 - HelloWorld');
```

---

## 五、API设计

### 5.1 GET /api/version

**请求**: 无参数

**响应**:
```json
{
  "success": true,
  "data": {
    "version": "V0.1",
    "description": "初始版本 - HelloWorld",
    "created_at": "2026-03-11 12:00:00"
  }
}
```

**错误响应**:
```json
{
  "success": false,
  "data": null,
  "error": "错误信息"
}
```

---

## 六、前端设计

### 6.1 页面内容

- 标题: "StoryBook HelloWorld"
- 版本信息展示区域
- 加载状态提示

### 6.2 交互流程

1. 页面加载完成
2. 调用 /api/version 接口
3. 显示返回的版本信息

---

## 七、部署脚本设计

### 7.1 dev-local.bat

本地开发测试脚本，功能：
1. 执行本地数据库迁移
2. 启动本地开发服务器

### 7.2 deploy-remote.bat

远程部署脚本，功能：
1. 检查登录状态
2. 创建D1数据库
3. 执行远程数据库迁移
4. 部署到Cloudflare Pages

---

## 八、测试设计

### 8.1 端到端测试

- 验证首页可访问
- 验证版本信息正确显示

---

## 九、验收标准

1. 本地开发环境可正常运行
2. 页面正确显示版本信息
3. API正确返回数据库数据
4. 部署脚本可一键部署

---

## 十、部署信息

### 10.1 线上地址

| 环境 | 地址 |
|------|------|
| 生产环境 | https://storybook-d4u.pages.dev/ |
| API接口 | https://storybook-d4u.pages.dev/api/version |

### 10.2 Cloudflare配置

| 配置项 | 值 |
|--------|-----|
| 项目名称 | storybook |
| D1数据库名 | storybook_database |
| D1数据库ID | 91e6d818-a707-4725-8c05-0923482a53ef |
| 绑定变量名 | DB |

### 10.3 部署日期

2026-03-11
