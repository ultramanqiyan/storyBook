# 项目目录规范

## 目录结构

```
storyBook/
├── src/                    # 开发代码
│   ├── frontend/           # 前端代码
│   ├── backend/            # 后端代码
│   └── shared/             # 共享代码
├── test/                   # 测试代码
│   ├── unit/               # 单元测试
│   ├── integration/        # 集成测试
│   └── e2e/                # 端到端测试
├── doc/                    # 项目文档
│   ├── api/                # API文档
│   ├── design/             # 设计文档
│   └── requirements/       # 需求文档
├── experience/             # 项目经验
│   ├── pitfalls/           # 踩坑经验
│   ├── solutions/          # 解决方案
│   └── best-practices/     # 最佳实践
├── history/                # 历史旧项目（只作参考）
├── history_summary/        # 历史旧项目总结（只作参考）
├── tool/                   # 历史旧工具（无用）
├── deploy/                 # 部署脚本
│   ├── scripts/            # 部署脚本
│   └── config/             # 部署配置
└── .trae/                  # Trae配置
    ├── skills/             # 技能定义
    └── rules/              # 项目规则
```

## 目录用途说明

| 目录 | 用途 | 说明 |
|------|------|------|
| `src/` | 开发代码 | 所有业务代码放于此目录 |
| `test/` | 测试代码 | 所有测试相关代码放于此目录 |
| `doc/` | 项目文档 | API文档、设计文档、需求文档等 |
| `experience/` | 项目经验 | 踩坑经验、解决方案、最佳实践 |
| `history/` | 历史旧项目 | 仅作参考，不修改 |
| `history_summary/` | 历史项目总结 | 仅作参考，不修改 |
| `tool/` | 历史旧工具 | 无用，仅保留 |
| `deploy/` | 部署脚本 | 部署相关脚本和配置 |

## 文件放置规则

### 必须遵守

1. **开发代码** → `src/` 目录
   - 前端代码放 `src/frontend/`
   - 后端代码放 `src/backend/`
   - 共享代码放 `src/shared/`

2. **测试代码** → `test/` 目录
   - 单元测试放 `test/unit/`
   - 集成测试放 `test/integration/`
   - E2E测试放 `test/e2e/`

3. **项目文档** → `doc/` 目录
   - API文档放 `doc/api/`
   - 设计文档放 `doc/design/`
   - 需求文档放 `doc/requirements/`

4. **项目经验** → `experience/` 目录
   - 踩坑经验放 `experience/pitfalls/`
   - 解决方案放 `experience/solutions/`
   - 最佳实践放 `experience/best-practices/`

5. **部署脚本** → `deploy/` 目录
   - 部署脚本放 `deploy/scripts/`
   - 部署配置放 `deploy/config/`

### 禁止事项

- ❌ 不要在 `history/` 目录下修改文件
- ❌ 不要在 `history_summary/` 目录下修改文件
- ❌ 不要在 `tool/` 目录下添加新文件
- ❌ 不要在根目录下随意创建文件

## 检查清单

创建新文件时，请确认：

- [ ] 开发代码是否放在 `src/` 目录？
- [ ] 测试代码是否放在 `test/` 目录？
- [ ] 文档是否放在 `doc/` 目录？
- [ ] 经验总结是否放在 `experience/` 目录？
- [ ] 部署脚本是否放在 `deploy/` 目录？
