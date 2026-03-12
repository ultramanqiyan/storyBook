# 卡牌互动小说书籍网站 - 接口字段详细文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 项目名称 | 卡牌互动小说书籍网站 |
| 版本 | V1.0 |
| 创建日期 | 2026-03-11 |
| 文档类型 | API接口文档 |

---

## 一、接口概述

### 1.1 基础信息

| 项目 | 内容 |
|------|------|
| 基础URL | `/api` |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |

### 1.2 统一响应格式

#### 成功响应

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

#### 错误响应

```json
{
  "success": false,
  "data": null,
  "error": "错误信息"
}
```

### 1.3 HTTP状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（未登录） |
| 403 | 禁止访问（无权限） |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

### 1.4 请求头

| 头字段 | 值 | 说明 |
|--------|-----|------|
| Content-Type | application/json | 请求体格式 |
| Accept | application/json | 响应格式 |

---

## 二、用户接口

### 2.1 用户注册/登录

**接口地址：** `POST /api/users`

**说明：** 用户注册或登录。如果邮箱不存在则创建新用户，否则验证密码登录。

**请求参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| email | string | 是 | 用户邮箱，最大100字符 |
| password | string | 是 | 用户密码，6-20字符 |

**请求示例：**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.user_id | string | 用户ID |
| data.email | string | 用户邮箱 |
| data.is_new_user | boolean | 是否为新用户 |
| data.created_at | string | 创建时间 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "user_id": "usr-abc123def456",
    "email": "user@example.com",
    "is_new_user": true,
    "created_at": "2026-03-11T10:00:00Z"
  },
  "error": null
}
```

**错误响应：**

| 错误信息 | 说明 |
|----------|------|
| 邮箱格式不正确 | 邮箱格式验证失败 |
| 密码长度必须在6-20个字符之间 | 密码长度验证失败 |
| 密码错误 | 登录时密码验证失败 |

---

### 2.2 获取用户信息

**接口地址：** `GET /api/users`

**说明：** 获取当前登录用户信息。

**请求参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 是 | 用户ID（从localStorage获取） |

**查询参数：** `?user_id=usr-abc123def456`

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.user_id | string | 用户ID |
| data.email | string | 用户邮箱 |
| data.book_count | number | 创建的书籍数量 |
| data.created_at | string | 创建时间 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "user_id": "usr-abc123def456",
    "email": "user@example.com",
    "book_count": 5,
    "created_at": "2026-03-11T10:00:00Z"
  },
  "error": null
}
```

---

## 三、书籍接口

### 3.1 获取书籍列表

**接口地址：** `GET /api/books`

**说明：** 获取用户的书籍列表和系统预设书籍。

**请求参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 否 | 用户ID，不传则只返回预设书籍 |

**查询参数：** `?user_id=usr-abc123def456`

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.books | array | 书籍列表 |
| data.books[].book_id | string | 书籍ID |
| data.books[].title | string | 书籍名称 |
| data.books[].type | string | 书籍类型 |
| data.books[].type_name | string | 书籍类型名称 |
| data.books[].is_preset | boolean | 是否为预设书籍 |
| data.books[].chapter_count | number | 章节数量 |
| data.books[].created_at | string | 创建时间 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "books": [
      {
        "book_id": "preset-adventure-001",
        "title": "小明的奇幻冒险",
        "type": "adventure",
        "type_name": "儿童冒险",
        "is_preset": true,
        "chapter_count": 4,
        "created_at": "2026-03-11T10:00:00Z"
      },
      {
        "book_id": "book-xyz789",
        "title": "我的冒险故事",
        "type": "adventure",
        "type_name": "儿童冒险",
        "is_preset": false,
        "chapter_count": 2,
        "created_at": "2026-03-11T11:00:00Z"
      }
    ]
  },
  "error": null
}
```

---

### 3.2 创建书籍

**接口地址：** `POST /api/books`

**说明：** 创建新书籍，同时创建主角和配角角色卡牌。

**请求参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 是 | 用户ID |
| title | string | 是 | 书籍名称，最大50字符 |
| type | string | 是 | 书籍类型：adventure/fantasy/romance/business |
| protagonist | object | 是 | 主角信息 |
| protagonist.name | string | 是 | 主角名称，最大20字符 |
| protagonist.role_type | string | 是 | 角色类型 |
| protagonist.personality | string | 是 | 性格 |
| protagonist.speech_style | string | 是 | 说话方式 |
| protagonist.avatar | string | 是 | 头像标识 |
| supporting_characters | array | 否 | 配角列表，最多3个 |
| supporting_characters[].name | string | 是 | 配角名称 |
| supporting_characters[].role_type | string | 是 | 角色类型 |
| supporting_characters[].personality | string | 是 | 性格 |
| supporting_characters[].speech_style | string | 是 | 说话方式 |
| supporting_characters[].avatar | string | 是 | 头像标识 |
| supporting_characters[].intimacy | number | 是 | 亲密度：-100到+100 |
| supporting_characters[].relationship | string | 否 | 与主角关系 |

**请求示例：**

```json
{
  "user_id": "usr-abc123def456",
  "title": "我的冒险故事",
  "type": "adventure",
  "protagonist": {
    "name": "小明",
    "role_type": "小探险家",
    "personality": "勇敢",
    "speech_style": "简洁直接",
    "avatar": "👦"
  },
  "supporting_characters": [
    {
      "name": "小红",
      "role_type": "小智者",
      "personality": "聪明",
      "speech_style": "幽默风趣",
      "avatar": "👧",
      "intimacy": 50,
      "relationship": "朋友"
    }
  ]
}
```

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.book_id | string | 书籍ID |
| data.title | string | 书籍名称 |
| data.type | string | 书籍类型 |
| data.characters | array | 创建的角色列表 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "book_id": "book-xyz789",
    "title": "我的冒险故事",
    "type": "adventure",
    "characters": [
      {
        "char_id": "char-001",
        "name": "小明",
        "is_protagonist": true
      },
      {
        "char_id": "char-002",
        "name": "小红",
        "is_protagonist": false
      }
    ]
  },
  "error": null
}
```

**错误响应：**

| 错误信息 | 说明 |
|----------|------|
| 书籍名称不能为空 | 标题验证失败 |
| 书籍名称不能超过50个字符 | 标题长度验证失败 |
| 书籍类型无效 | 类型验证失败 |
| 主角信息不能为空 | 主角验证失败 |
| 配角数量不能超过3个 | 配角数量验证失败 |

---

### 3.3 获取书籍详情

**接口地址：** `GET /api/books/:book_id`

**说明：** 获取书籍详细信息，包括章节列表和角色列表。

**路径参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_id | string | 是 | 书籍ID |

**查询参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 否 | 用户ID（用于权限验证） |

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.book | object | 书籍信息 |
| data.book.book_id | string | 书籍ID |
| data.book.title | string | 书籍名称 |
| data.book.type | string | 书籍类型 |
| data.book.type_name | string | 书籍类型名称 |
| data.book.is_preset | boolean | 是否为预设书籍 |
| data.chapters | array | 章节列表 |
| data.chapters[].chapter_id | string | 章节ID |
| data.chapters[].title | string | 章节标题 |
| data.chapters[].order_num | number | 章节顺序 |
| data.chapters[].has_puzzle | boolean | 是否有谜题 |
| data.chapters[].puzzle_solved | boolean | 谜题是否已解决 |
| data.characters | array | 角色列表 |
| data.characters[].char_id | string | 角色ID |
| data.characters[].name | string | 角色名称 |
| data.characters[].is_protagonist | boolean | 是否为主角 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "book": {
      "book_id": "book-xyz789",
      "title": "我的冒险故事",
      "type": "adventure",
      "type_name": "儿童冒险",
      "is_preset": false
    },
    "chapters": [
      {
        "chapter_id": "chapter-001",
        "title": "神秘的开端",
        "order_num": 1,
        "has_puzzle": true,
        "puzzle_solved": false
      }
    ],
    "characters": [
      {
        "char_id": "char-001",
        "name": "小明",
        "is_protagonist": true
      },
      {
        "char_id": "char-002",
        "name": "小红",
        "is_protagonist": false
      }
    ]
  },
  "error": null
}
```

---

### 3.4 删除书籍

**接口地址：** `DELETE /api/books/:book_id`

**说明：** 删除书籍及其关联数据（角色、卡牌、章节、谜题）。

**路径参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_id | string | 是 | 书籍ID |

**请求体：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 是 | 用户ID |

**请求示例：**

```json
{
  "user_id": "usr-abc123def456"
}
```

**成功响应：**

```json
{
  "success": true,
  "data": {
    "deleted": true
  },
  "error": null
}
```

**错误响应：**

| 错误信息 | 说明 |
|----------|------|
| 书籍不存在或无权限 | 书籍ID无效或非所有者 |
| 预设书籍不能删除 | 尝试删除预设书籍 |

---

## 四、角色卡牌接口

### 4.1 获取书籍角色卡牌

**接口地址：** `GET /api/books/:book_id/characters`

**说明：** 获取书籍的所有角色卡牌。

**路径参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_id | string | 是 | 书籍ID |

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.characters | array | 角色列表 |
| data.characters[].char_id | string | 角色ID |
| data.characters[].name | string | 角色名称 |
| data.characters[].role_type | string | 角色类型 |
| data.characters[].personality | string | 性格 |
| data.characters[].speech_style | string | 说话方式 |
| data.characters[].avatar | string | 头像标识 |
| data.characters[].intimacy | number | 亲密度（主角为null） |
| data.characters[].intimacy_display | string | 亲密度显示文本 |
| data.characters[].relationship | string | 与主角关系 |
| data.characters[].is_protagonist | boolean | 是否为主角 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "characters": [
      {
        "char_id": "char-001",
        "name": "小明",
        "role_type": "小探险家",
        "personality": "勇敢",
        "speech_style": "简洁直接",
        "avatar": "👦",
        "intimacy": null,
        "intimacy_display": null,
        "relationship": null,
        "is_protagonist": true
      },
      {
        "char_id": "char-002",
        "name": "小红",
        "role_type": "小智者",
        "personality": "聪明",
        "speech_style": "幽默风趣",
        "avatar": "👧",
        "intimacy": 50,
        "intimacy_display": "友好",
        "relationship": "朋友",
        "is_protagonist": false
      }
    ]
  },
  "error": null
}
```

---

## 五、情节卡牌接口

### 5.1 获取书籍情节卡牌

**接口地址：** `GET /api/books/:book_id/plot-cards`

**说明：** 获取书籍的所有情节卡牌，按子类型分组。

**路径参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_id | string | 是 | 书籍ID |

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.weather | array | 天气卡牌列表 |
| data.terrain | array | 地形卡牌列表 |
| data.adventure | array | 冒险类型卡牌列表 |
| data.equipment | array | 装备卡牌列表 |
| data.*[].card_id | string | 卡牌ID |
| data.*[].name | string | 卡牌名称 |
| data.*[].icon | string | 卡牌图标 |
| data.*[].description | string | 卡牌描述 |
| data.*[].is_custom | boolean | 是否为自定义卡牌 |
| data.*[].count | number | 当前类型的卡牌数量 |
| data.*[].max_count | number | 当前类型的卡牌上限 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "weather": [
      {
        "card_id": "card-001",
        "name": "晴天",
        "icon": "☀️",
        "description": "阳光明媚的好天气",
        "is_custom": false
      }
    ],
    "terrain": [
      {
        "card_id": "card-002",
        "name": "森林",
        "icon": "🌲",
        "description": "神秘的森林",
        "is_custom": false
      }
    ],
    "adventure": [
      {
        "card_id": "card-003",
        "name": "寻宝",
        "icon": "🗺️",
        "description": "寻找隐藏的宝藏",
        "is_custom": false
      }
    ],
    "equipment": [
      {
        "card_id": "card-004",
        "name": "放大镜",
        "icon": "🔍",
        "description": "观察细节的工具",
        "is_custom": false
      }
    ],
    "counts": {
      "weather": { "count": 1, "max_count": 8 },
      "terrain": { "count": 1, "max_count": 8 },
      "adventure": { "count": 1, "max_count": 8 },
      "equipment": { "count": 1, "max_count": 8 }
    }
  },
  "error": null
}
```

---

### 5.2 丢弃卡牌

**接口地址：** `DELETE /api/plot-cards/:card_id`

**说明：** 丢弃一张情节卡牌。

**路径参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| card_id | string | 是 | 卡牌ID |

**请求体：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_id | string | 是 | 用户ID |

**请求示例：**

```json
{
  "user_id": "usr-abc123def456"
}
```

**成功响应：**

```json
{
  "success": true,
  "data": {
    "deleted": true
  },
  "error": null
}
```

---

## 六、章节接口

### 6.1 添加章节

**接口地址：** `POST /api/chapters`

**说明：** 生成新章节。第一阶段使用假数据返回。

**请求参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_id | string | 是 | 书籍ID |
| user_id | string | 是 | 用户ID |
| selected_cards | object | 是 | 选择的卡牌 |
| selected_cards.protagonist_id | string | 是 | 主角ID |
| selected_cards.supporting_ids | array | 否 | 配角ID列表 |
| selected_cards.weather_id | string | 是 | 天气卡牌ID |
| selected_cards.terrain_id | string | 是 | 地形卡牌ID |
| selected_cards.adventure_id | string | 是 | 冒险类型卡牌ID |
| selected_cards.equipment_id | string | 是 | 装备卡牌ID |

**请求示例：**

```json
{
  "book_id": "book-xyz789",
  "user_id": "usr-abc123def456",
  "selected_cards": {
    "protagonist_id": "char-001",
    "supporting_ids": ["char-002"],
    "weather_id": "card-001",
    "terrain_id": "card-002",
    "adventure_id": "card-003",
    "equipment_id": "card-004"
  }
}
```

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.chapter | object | 章节信息 |
| data.chapter.chapter_id | string | 章节ID |
| data.chapter.title | string | 章节标题 |
| data.chapter.content | string | 章节内容 |
| data.chapter.order_num | number | 章节顺序 |
| data.puzzle | object | 谜题信息 |
| data.puzzle.puzzle_id | string | 谜题ID |
| data.puzzle.question | string | 谜题问题 |
| data.puzzle.puzzle_type | string | 谜题类型 |
| data.puzzle.options | array | 选择题选项（可选） |
| data.updated_intimacy | array | 更新的亲密度列表 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "chapter": {
      "chapter_id": "chapter-002",
      "title": "森林探险",
      "content": "阳光透过树叶洒下斑驳的光影，小明和小红踏入了神秘的森林。放大镜在阳光下闪闪发光，他们决定寻找传说中的宝藏...",
      "order_num": 2
    },
    "puzzle": {
      "puzzle_id": "puzzle-002",
      "question": "什么东西越洗越脏？",
      "puzzle_type": "text",
      "options": null
    },
    "updated_intimacy": [
      {
        "char_id": "char-002",
        "intimacy": 55
      }
    ]
  },
  "error": null
}
```

**错误响应：**

| 错误信息 | 说明 |
|----------|------|
| 必须选择主角 | 未选择主角 |
| 必须选择天气卡牌 | 未选择天气卡牌 |
| 必须选择地形卡牌 | 未选择地形卡牌 |
| 必须选择冒险类型卡牌 | 未选择冒险类型卡牌 |
| 必须选择装备卡牌 | 未选择装备卡牌 |
| 卡牌数量已达上限 | 情节卡牌数量超过上限 |

---

### 6.2 获取章节详情

**接口地址：** `GET /api/chapters/:chapter_id`

**说明：** 获取章节详细内容，包括谜题和使用的卡牌。

**路径参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| chapter_id | string | 是 | 章节ID |

**成功响应：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.chapter | object | 章节信息 |
| data.chapter.chapter_id | string | 章节ID |
| data.chapter.title | string | 章节标题 |
| data.chapter.content | string | 章节内容 |
| data.chapter.order_num | number | 章节顺序 |
| data.puzzle | object | 谜题信息 |
| data.puzzle.puzzle_id | string | 谜题ID |
| data.puzzle.question | string | 谜题问题 |
| data.puzzle.puzzle_type | string | 谜题类型 |
| data.puzzle.options | array | 选择题选项 |
| data.puzzle.attempts | number | 已尝试次数 |
| data.puzzle.max_attempts | number | 最大尝试次数 |
| data.puzzle.is_solved | boolean | 是否已解决 |
| data.selected_cards | object | 使用的卡牌信息 |
| data.selected_cards.protagonist | object | 主角信息 |
| data.selected_cards.supporting | array | 配角信息列表 |
| data.selected_cards.weather | object | 天气卡牌信息 |
| data.selected_cards.terrain | object | 地形卡牌信息 |
| data.selected_cards.adventure | object | 冒险类型卡牌信息 |
| data.selected_cards.equipment | object | 装备卡牌信息 |
| error | null | 错误信息 |

**响应示例：**

```json
{
  "success": true,
  "data": {
    "chapter": {
      "chapter_id": "chapter-001",
      "title": "神秘的开端",
      "content": "在一个阳光明媚的早晨，小明收到了一封神秘的信件...",
      "order_num": 1
    },
    "puzzle": {
      "puzzle_id": "puzzle-001",
      "question": "什么东西越洗越脏？",
      "puzzle_type": "text",
      "options": null,
      "attempts": 0,
      "max_attempts": 3,
      "is_solved": false
    },
    "selected_cards": {
      "protagonist": {
        "char_id": "char-001",
        "name": "小明",
        "avatar": "👦"
      },
      "supporting": [
        {
          "char_id": "char-002",
          "name": "小红",
          "avatar": "👧"
        }
      ],
      "weather": {
        "card_id": "card-001",
        "name": "晴天",
        "icon": "☀️"
      },
      "terrain": {
        "card_id": "card-002",
        "name": "森林",
        "icon": "🌲"
      },
      "adventure": {
        "card_id": "card-003",
        "name": "寻宝",
        "icon": "🗺️"
      },
      "equipment": {
        "card_id": "card-004",
        "name": "放大镜",
        "icon": "🔍"
      }
    }
  },
  "error": null
}
```

---

## 七、谜题接口

### 7.1 提交谜题答案

**接口地址：** `POST /api/puzzles`

**说明：** 提交谜题答案，验证正确性。

**请求参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| puzzle_id | string | 是 | 谜题ID |
| user_id | string | 是 | 用户ID |
| answer | string | 是 | 用户答案 |

**请求示例：**

```json
{
  "puzzle_id": "puzzle-001",
  "user_id": "usr-abc123def456",
  "answer": "水"
}
```

**成功响应（答案正确）：**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 是否成功 |
| data | object | 响应数据 |
| data.is_correct | boolean | 答案是否正确 |
| data.remaining_attempts | number | 剩余尝试次数 |
| data.reward | object | 奖励信息（答案正确时） |
| data.reward.card | object | 获得的卡牌信息 |
| error | null | 错误信息 |

**响应示例（答案正确）：**

```json
{
  "success": true,
  "data": {
    "is_correct": true,
    "remaining_attempts": 3,
    "reward": {
      "card": {
        "card_id": "card-005",
        "name": "雨天",
        "icon": "🌧️",
        "sub_type": "weather",
        "description": "淅淅沥沥的雨天"
      }
    }
  },
  "error": null
}
```

**响应示例（答案错误）：**

```json
{
  "success": true,
  "data": {
    "is_correct": false,
    "remaining_attempts": 2,
    "reward": null
  },
  "error": null
}
```

**响应示例（尝试次数用尽）：**

```json
{
  "success": true,
  "data": {
    "is_correct": false,
    "remaining_attempts": 0,
    "correct_answer": "水",
    "reward": null
  },
  "error": null
}
```

**错误响应：**

| 错误信息 | 说明 |
|----------|------|
| 谜题不存在 | 谜题ID无效 |
| 谜题已解决 | 已经解决过的谜题 |
| 尝试次数已用尽 | 超过最大尝试次数 |

---

## 八、预设数据接口

### 8.1 获取书籍类型配置

**接口地址：** `GET /api/config/book-types`

**说明：** 获取所有书籍类型配置。

**成功响应：**

```json
{
  "success": true,
  "data": {
    "types": [
      {
        "type": "adventure",
        "name": "儿童冒险",
        "description": "适合儿童的故事",
        "theme_color": "#FFD700",
        "bg_style": "卡通插画"
      },
      {
        "type": "fantasy",
        "name": "魔幻传说",
        "description": "魔法、奇幻主题",
        "theme_color": "#6B21A8",
        "bg_style": "星空/魔法纹理"
      },
      {
        "type": "romance",
        "name": "都市言情",
        "description": "现代都市爱情",
        "theme_color": "#F48FB1",
        "bg_style": "柔和渐变"
      },
      {
        "type": "business",
        "name": "职场风云",
        "description": "职场故事",
        "theme_color": "#1E3A8A",
        "bg_style": "几何图案"
      }
    ]
  },
  "error": null
}
```

---

### 8.2 获取角色类型配置

**接口地址：** `GET /api/config/character-types`

**说明：** 获取角色类型配置，按书籍类型分组。

**查询参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_type | string | 是 | 书籍类型 |

**成功响应：**

```json
{
  "success": true,
  "data": {
    "book_type": "adventure",
    "character_types": [
      "小探险家",
      "小勇士",
      "小智者",
      "小动物",
      "小魔法师",
      "小发明家",
      "小侦探",
      "小船长"
    ]
  },
  "error": null
}
```

---

### 8.3 获取性格预设

**接口地址：** `GET /api/config/personality`

**说明：** 获取性格预设列表。

**成功响应：**

```json
{
  "success": true,
  "data": {
    "personality": [
      "勇敢", "谨慎", "乐观", "悲观", "冷静",
      "冲动", "善良", "自私", "幽默", "严肃",
      "温柔", "暴躁", "好奇", "沉稳", "活泼",
      "懒惰", "外向", "阴险", "随和", "傲慢",
      "懦弱", "贪婪", "多疑", "偏执", "冷漠"
    ]
  },
  "error": null
}
```

---

### 8.4 获取说话方式预设

**接口地址：** `GET /api/config/speech-style`

**说明：** 获取说话方式预设列表。

**成功响应：**

```json
{
  "success": true,
  "data": {
    "speech_styles": [
      "简洁直接", "啰嗦详细", "礼貌客气", "尖酸刻薄", "幽默风趣",
      "严肃正式", "温柔体贴", "咄咄逼人", "慢条斯理", "快速急促",
      "诗意文艺", "务实平淡", "夸张生动", "阴阳怪气", "热情奔放",
      "冷淡疏离", "睿智深沉", "天真单纯", "讽刺挖苦", "抱怨连天",
      "命令式", "敷衍了事", "油嘴滑舌", "沉默寡言", "爱打断人"
    ]
  },
  "error": null
}
```

---

### 8.5 获取情节选项配置

**接口地址：** `GET /api/config/plot-options`

**说明：** 获取情节选项配置，按书籍类型和子类型分组。

**查询参数：**

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| book_type | string | 是 | 书籍类型 |
| sub_type | string | 否 | 情节子类型（不传则返回全部） |

**成功响应：**

```json
{
  "success": true,
  "data": {
    "book_type": "adventure",
    "plot_options": {
      "weather": [
        { "name": "晴天", "icon": "☀️", "description": "阳光明媚的好天气" },
        { "name": "彩虹天", "icon": "🌈", "description": "美丽的彩虹" }
      ],
      "terrain": [
        { "name": "森林", "icon": "🌲", "description": "神秘的森林" },
        { "name": "草原", "icon": "🌿", "description": "广阔的草原" }
      ],
      "adventure": [
        { "name": "寻宝", "icon": "🗺️", "description": "寻找隐藏的宝藏" },
        { "name": "探险", "icon": "🧭", "description": "探索未知的地方" }
      ],
      "equipment": [
        { "name": "放大镜", "icon": "🔍", "description": "观察细节的工具" },
        { "name": "指南针", "icon": "🧭", "description": "辨别方向" }
      ]
    }
  },
  "error": null
}
```

---

## 九、错误码汇总

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 400 | 参数验证失败 | 请求参数格式错误 |
| 400 | 邮箱格式不正确 | 邮箱验证失败 |
| 400 | 密码长度必须在6-20个字符之间 | 密码验证失败 |
| 401 | 未登录 | 需要登录才能操作 |
| 403 | 无权限 | 没有操作权限 |
| 404 | 资源不存在 | 请求的资源不存在 |
| 409 | 邮箱已被注册 | 邮箱已存在 |
| 500 | 服务器内部错误 | 服务器异常 |

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-11 | 初始版本 |
