# 线上数据库备份说明

## 备份信息

| 项目 | 内容 |
|------|------|
| 备份日期 | 2026-03-18 |
| 数据库类型 | Cloudflare D1 (SQLite) |
| 数据库名称 | storybook_database |
| 数据库ID | 155b2bfd-3108-4b23-af12-9afd64b25b7f |
| 备份文件 | database_backup.sql |

## 数据库表结构

| 表名 | 说明 |
|------|------|
| users | 用户表 |
| books | 书籍表 |
| characters | 角色卡牌表 |
| plot_cards | 情节卡牌表 |
| chapters | 章节表 |
| puzzles | 谜题表 |

## 数据统计

| 表名 | 记录数 |
|------|--------|
| users | 1 |
| books | 45+ |
| characters | 100+ |
| plot_cards | 若干 |
| chapters | 若干 |
| puzzles | 若干 |

## 恢复方法

### 方法1：使用 wrangler CLI

```bash
# 导入到本地数据库
npx wrangler d1 execute storybook_database --local --file=database_backup.sql

# 导入到远程数据库（谨慎操作！）
npx wrangler d1 execute storybook_database --remote --file=database_backup.sql
```

### 方法2：使用 Cloudflare Dashboard

1. 登录 Cloudflare Dashboard
2. 进入 Workers & Pages > D1
3. 选择 storybook_database
4. 点击 Console
5. 复制粘贴 SQL 内容执行

## 备份命令

```bash
# 导出远程数据库
npx wrangler d1 export storybook_database --remote --output=database_backup.sql

# 导出本地数据库
npx wrangler d1 export storybook_database --output=database_backup_local.sql
```

## 注意事项

1. **敏感数据**：备份文件包含用户密码哈希，请妥善保管
2. **恢复风险**：恢复到远程数据库会覆盖现有数据，请谨慎操作
3. **定期备份**：建议每周进行一次完整备份
4. **版本控制**：重要变更前后都应创建备份

## 相关配置

```toml
# wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "storybook_database"
database_id = "155b2bfd-3108-4b23-af12-9afd64b25b7f"
```

---

*备份由系统自动创建于 2026-03-18*
