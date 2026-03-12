# Demo页面API集成设计文档

## 概述

将demo目录下的页面UI复制到src/frontend目录，并将假数据替换为真实API调用。

## 技术选择

- **代码组织**：单文件HTML（与demo一致）
- **用户认证**：localStorage存储user_id
- **后端API**：Cloudflare Functions（已实现）

## 迁移策略

**渐进式迁移**：按用户流程顺序逐个页面迁移，每个页面完成后验证。

## 迁移顺序

```
Login → Bookshelf → Book → Chapter → Book-Create → Director → Index
```

## 各页面API集成详情

### 1. Login页面

**文件**：`src/frontend/login.html`

**API调用**：
| 操作 | API | 方法 | 参数 |
|------|-----|------|------|
| 登录/注册 | /api/users | POST | email, password |

**响应数据**：
```json
{
  "success": true,
  "data": {
    "user_id": "id-xxx",
    "email": "user@example.com",
    "is_new_user": true
  }
}
```

**实现要点**：
- 调用POST /api/users进行登录/注册
- 将user_id和email存储到localStorage
- 登录成功后跳转到bookshelf.html

---

### 2. Bookshelf页面

**文件**：`src/frontend/bookshelf.html`

**API调用**：
| 操作 | API | 方法 | 参数 |
|------|-----|------|------|
| 获取用户书籍 | /api/books | GET | user_id |
| 获取预设书籍 | /api/books/preset | GET | - |

**响应数据**：
```json
{
  "success": true,
  "data": [
    {
      "book_id": "id-xxx",
      "title": "The Dragon's Quest",
      "type": "adventure",
      "is_preset": 0,
      "created_at": "2024-01-01"
    }
  ]
}
```

**实现要点**：
- 页面加载时检查用户认证状态
- 并行获取用户书籍和预设书籍
- 支持按类型筛选书籍
- 点击书籍跳转到book.html?id={bookId}

---

### 3. Book详情页面

**文件**：`src/frontend/book.html`

**API调用**：
| 操作 | API | 方法 | 参数 |
|------|-----|------|------|
| 获取书籍详情 | /api/books/{id} | GET | - |
| 获取情节卡牌 | /api/plot-cards | GET | book_id |

**响应数据**：
```json
{
  "success": true,
  "data": {
    "book_id": "id-xxx",
    "title": "The Lost Kingdom",
    "type": "adventure",
    "characters": [...],
    "chapters": [...]
  }
}
```

**实现要点**：
- 从URL参数获取bookId
- 获取书籍详情（包含角色和章节）
- 获取情节卡牌用于显示
- 支持切换章节/角色/情节视图
- 提供继续阅读和导演新章节按钮

---

### 4. Chapter阅读页面

**文件**：`src/frontend/chapter.html`

**API调用**：
| 操作 | API | 方法 | 参数 |
|------|-----|------|------|
| 获取章节详情 | /api/chapters/{id} | GET | - |
| 获取谜题 | /api/puzzles/{id} | GET | - |
| 提交谜题答案 | /api/puzzles/{id}/solve | POST | answer |

**响应数据**：
```json
{
  "success": true,
  "data": {
    "chapter_id": "id-xxx",
    "title": "The Mountain Pass",
    "content": "...",
    "order_num": 3,
    "selected_cards": {...}
  }
}
```

**实现要点**：
- 从URL参数获取chapterId
- 获取章节内容和关联的角色信息
- 如果有谜题，显示谜题弹窗
- 提交谜题答案后显示结果
- 支持上一章/下一章导航

---

### 5. Book-Create页面

**文件**：`src/frontend/book-create.html`

**API调用**：
| 操作 | API | 方法 | 参数 |
|------|-----|------|------|
| 获取书籍类型 | /api/config/book-types | GET | - |
| 获取角色类型 | /api/config/character-types | GET | book_type |
| 获取性格选项 | /api/config/personality | GET | - |
| 获取说话风格 | /api/config/speech-style | GET | - |
| 创建书籍 | /api/books | POST | user_id, title, type, protagonist, supporting_characters |

**请求体示例**：
```json
{
  "user_id": "id-xxx",
  "title": "My Story",
  "type": "adventure",
  "protagonist": {
    "name": "Hero",
    "avatar": "🧙‍♂️",
    "personality": "brave",
    "speech_style": "formal",
    "role_type": "knight"
  },
  "supporting_characters": [
    {
      "name": "Guide",
      "avatar": "👸",
      "personality": "wise",
      "speech_style": "mystical",
      "role_type": "mage",
      "intimacy": 50,
      "relationship": "mentor"
    }
  ]
}
```

**实现要点**：
- 多步骤表单：基本信息 → 主角 → 配角 → 完成
- 根据书籍类型动态加载角色类型选项
- 支持添加最多3个配角
- 创建成功后跳转到book.html?id={bookId}

---

### 6. Director页面

**文件**：`src/frontend/director.html`

**API调用**：
| 操作 | API | 方法 | 参数 |
|------|-----|------|------|
| 获取角色 | /api/characters | GET | book_id |
| 获取情节卡牌 | /api/plot-cards | GET | book_id |
| 获取情节选项 | /api/config/plot-options | GET | book_type, sub_type |
| 创建章节 | /api/chapters | POST | user_id, book_id, selected_cards |

**请求体示例**：
```json
{
  "user_id": "id-xxx",
  "book_id": "id-xxx",
  "selected_cards": {
    "protagonist_id": "char-xxx",
    "supporting_ids": ["char-xxx", "char-xxx"],
    "weather_id": "card-xxx",
    "terrain_id": "card-xxx",
    "adventure_id": "card-xxx",
    "equipment_id": "card-xxx"
  }
}
```

**实现要点**：
- 从URL参数获取bookId
- 获取角色和情节卡牌用于选择
- 卡牌扇形布局展示
- 必须选择：主角、天气、地形、冒险类型
- 可选：配角（最多3个）、装备
- 创建成功后跳转到chapter.html?id={chapterId}

---

### 7. Index首页

**文件**：`src/frontend/index.html`

**API调用**：无

**实现要点**：
- 静态展示页面
- 检查登录状态，已登录则跳转到bookshelf.html

---

## 通用API工具函数

**文件**：`src/frontend/js/api.js`

```javascript
const API_BASE = '/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  return data.data;
}

const UserAPI = {
  login: (email, password) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  getUser: (userId) => apiRequest(`/users?user_id=${userId}`)
};

const BookAPI = {
  getUserBooks: (userId) => apiRequest(`/books?user_id=${userId}`),
  getPresetBooks: () => apiRequest('/books/preset'),
  getBook: (bookId) => apiRequest(`/books/${bookId}`),
  createBook: (data) => apiRequest('/books', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateBook: (bookId, data) => apiRequest(`/books/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteBook: (bookId) => apiRequest(`/books/${bookId}`, {
    method: 'DELETE'
  })
};

const CharacterAPI = {
  getCharacters: (bookId) => apiRequest(`/characters?book_id=${bookId}`),
  createCharacter: (data) => apiRequest('/characters', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

const PlotCardAPI = {
  getCards: (bookId) => apiRequest(`/plot-cards?book_id=${bookId}`),
  createCard: (data) => apiRequest('/plot-cards', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteCard: (cardId) => apiRequest(`/plot-cards/${cardId}`, {
    method: 'DELETE'
  })
};

const ChapterAPI = {
  getChapters: (bookId) => apiRequest(`/chapters?book_id=${bookId}`),
  getChapter: (chapterId) => apiRequest(`/chapters/${chapterId}`),
  createChapter: (data) => apiRequest('/chapters', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

const PuzzleAPI = {
  getPuzzle: (puzzleId) => apiRequest(`/puzzles/${puzzleId}`),
  solvePuzzle: (puzzleId, answer) => apiRequest(`/puzzles/${puzzleId}/solve`, {
    method: 'POST',
    body: JSON.stringify({ answer })
  })
};

const ConfigAPI = {
  getBookTypes: () => apiRequest('/config/book-types'),
  getCharacterTypes: (bookType) => apiRequest(`/config/character-types?book_type=${bookType}`),
  getPersonality: () => apiRequest('/config/personality'),
  getSpeechStyle: () => apiRequest('/config/speech-style'),
  getPlotOptions: (bookType, subType) => apiRequest(`/config/plot-options?book_type=${bookType}&sub_type=${subType}`)
};
```

---

## 认证中间件

```javascript
function checkAuth() {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    window.location.href = 'login.html';
    return null;
  }
  return userId;
}

function logout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem('email');
  window.location.href = 'login.html';
}

function getAuthHeaders() {
  const userId = localStorage.getItem('user_id');
  return {
    'Content-Type': 'application/json',
    'X-User-Id': userId
  };
}
```

---

## 文件结构

```
src/frontend/
├── index.html          # 首页
├── login.html          # 登录页
├── bookshelf.html      # 书架页
├── book.html           # 书籍详情页
├── chapter.html        # 章节阅读页
├── book-create.html    # 创建书籍页
├── director.html       # 导演页
├── css/
│   ├── variables.css   # CSS变量
│   ├── main.css        # 主样式
│   ├── animations.css  # 动画样式
│   ├── components.css  # 组件样式
│   ├── themes.css      # 主题样式
│   └── responsive.css  # 响应式样式
└── js/
    ├── api.js          # API工具函数
    ├── main.js         # 主逻辑
    └── theme.js        # 主题切换
```

---

## 注意事项

1. **错误处理**：所有API调用需要处理错误情况，显示友好的错误提示
2. **加载状态**：API调用期间显示加载状态，提升用户体验
3. **数据验证**：表单提交前验证数据完整性
4. **URL参数**：使用URL参数传递bookId、chapterId等
5. **页面跳转**：使用相对路径进行页面跳转

---

## 创建时间

2026-03-12
