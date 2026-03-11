# BUG-009 Wrangler本地开发D1数据库绑定问题

## 问题现象

使用 `wrangler pages dev` 启动本地开发服务器后，API访问D1数据库时报错：
```
D1_ERROR: no such table: version: SQLITE_ERROR
```

但使用 `wrangler d1 execute --local` 命令可以成功执行迁移，数据库中确实有数据。

## 根本原因

在启动命令中使用了 `--d1=DB=storybook_database` 参数，这会创建一个独立的数据库绑定，与 wrangler.toml 中的配置冲突。

**错误命令**:
```bash
wrangler pages dev src/frontend --d1=DB=storybook_database --compatibility-flag nodejs_compat
```

这导致：
1. 开发服务器使用一个数据库文件
2. 迁移命令使用另一个数据库文件
3. 两个数据库文件不同步

## 解决方案

**正确命令**：不使用 `--d1` 参数，让 wrangler 自动从 wrangler.toml 读取 D1 配置。

```bash
wrangler pages dev src/frontend --compatibility-flag nodejs_compat
```

**前提条件**：wrangler.toml 中已正确配置 D1 数据库：
```toml
[[d1_databases]]
binding = "DB"
database_name = "storybook_database"
database_id = "xxx"
```

## 预防措施

1. 本地开发时不要使用 `--d1` 参数，让 wrangler 自动读取配置
2. D1 数据库配置应放在 wrangler.toml 中，而不是命令行参数
3. 遇到数据库找不到表的问题时，检查是否使用了多个数据库文件

## 相关代码

- `wrangler.toml`
- `deploy/dev-local.bat`

## 发现时间

2026-03-11

## 影响范围

所有使用 Cloudflare Pages + D1 的本地开发环境

## 规则提炼

> **CODE-006**: 本地开发时不要使用 `--d1` 参数，让 wrangler 自动从 wrangler.toml 读取 D1 配置
