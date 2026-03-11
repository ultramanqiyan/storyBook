# 乐高故事书项目设计经验总结

## 一、技术框架

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Pages                          │
│  ┌─────────────────┐    ┌─────────────────────────────────┐ │
│  │   静态资源托管    │    │      Pages Functions (API)      │ │
│  │  HTML/CSS/JS    │◄──►│  functions/api/*.js             │ │
│  │  assets/        │    │  - users.js                     │ │
│  │  css/           │    │  - characters.js                │ │
│  │  js/            │    │  - books.js                     │ │
│  └─────────────────┘    │  - chapters.js                  │ │
│                         │  - puzzle.js                    │ │
│                         │  - generate.js (AI图片生成)      │ │
│                         │  - speech.js (语音识别)          │ │
│                         └──────────────┬──────────────────┘ │
│                                        │                     │
│                         ┌──────────────▼──────────────────┐ │
│                         │      Cloudflare D1 (SQLite)     │ │
│                         │  - users                        │ │
│                         │  - characters                   │ │
│                         │  - books                        │ │
│                         │  - chapters                     │ │
│                         │  - puzzles                      │ │
│                         │  - book_characters              │ │
│                         │  - puzzle_records               │ │
│                         │  - shares                       │ │
│                         └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │    外部AI服务        │
         │  - 豆包API (故事生成) │
         │  - 豆包API (图片生成) │
         │  - SiliconFlow (语音)│
         └─────────────────────┘
```

### 1.2 技术选型

| 层级 | 技术选择 | 选择理由 |
|------|----------|----------|
| 前端框架 | 原生HTML/CSS/JS | 简单直接、无构建依赖、适合小型项目 |
| 托管平台 | Cloudflare Pages | 免费额度充足、全球CDN、部署简单 |
| 后端API | Pages Functions | 无服务器架构、与Pages无缝集成 |
| 数据库 | Cloudflare D1 | 边缘SQLite、免费额度、与Functions原生集成 |
| AI服务 | 豆包API | 中文能力强、价格低、响应快 |
| 语音服务 | SiliconFlow | SenseVoice模型、中文识别准确 |
| 测试框架 | Vitest | 快速、与Wrangler集成好 |
| E2E测试 | Playwright | 跨浏览器、功能强大 |

### 1.3 项目目录结构

```
lego-story-book/
├── functions/              # Pages Functions API
│   └── api/
│       ├── users.js        # 用户管理
│       ├── characters.js   # 人仔管理
│       ├── books.js        # 书籍管理
│       ├── chapters.js     # 章节管理
│       ├── book-characters.js  # 书籍角色
│       ├── puzzle.js       # 谜题系统
│       ├── share.js        # 分享功能
│       ├── generate.js     # AI图片生成
│       ├── speech.js       # 语音识别
│       └── utils.js        # 公共工具函数
├── css/
│   ├── styles.css          # 主样式
│   └── animations.css      # 动画效果库
├── js/
│   ├── main.js             # 主逻辑
│   └── animations.js       # 动画初始化
├── assets/                 # 静态资源
├── migrations/             # 数据库迁移脚本
├── tests/                  # 测试文件
├── wrangler.toml           # Cloudflare配置
├── package.json
└── vitest.config.js
```

---

## 二、页面设计

### 2.1 页面清单

| 页面 | 文件 | 功能描述 |
|------|------|----------|
| 登录页 | index.html | 用户名输入、无密码登录 |
| 角色选择页 | character.html | 选择预设人仔、自定义人仔名称 |
| 书架页 | bookshelf.html | 显示用户的书籍列表、创建新书 |
| 书籍详情页 | book.html | 章节列表、角色管理、阅读入口 |
| 阅读页 | reader.html | 章节内容展示、谜题触发 |
| 谜题页 | puzzle.html | 三种谜题类型、答题交互 |
| 结局页 | ending.html | 故事结局展示、分享功能 |
| 分享页 | share.html | 分享链接、故事预览 |

### 2.2 页面流程

```
登录 → 角色选择 → 书架 → 书籍详情 → 阅读 → 谜题 → 阅读 → ... → 结局 → 分享
                          ↑_______________|
```

### 2.3 响应式设计断点

| 断点 | 宽度范围 | 布局特点 |
|------|----------|----------|
| 移动端 | <768px | 单列布局、底部导航 |
| 平板 | 768-1024px | 双列布局、侧边栏 |
| 桌面 | >1024px | 多列布局、固定侧边栏 |

---

## 三、动画效果库

### 3.1 CSS动画分类

| 类别 | 动画名称 | 应用场景 |
|------|----------|----------|
| 入场动画 | fadeIn, slideInUp, slideInLeft, slideInRight | 页面元素入场 |
| 退出动画 | fadeOut, slideOutDown | 元素消失 |
| 强调动画 | pulse, bounce, shake | 按钮点击、提示 |
| 3D效果 | cardFlip3D, cardStack | 人仔卡片翻转 |
| 粒子效果 | particles, confetti | 庆祝、成功提示 |
| 霓虹效果 | neonGlow, textNeon | 标题、重要元素 |
| 渐变效果 | rainbowGradient, shimmer | 背景、加载状态 |
| 悬停效果 | hoverLift, hoverGlow | 卡片、按钮交互 |
| 加载动画 | spinner, dots, progressBar | 异步操作等待 |
| 滚动动画 | parallax, scrollReveal | 页面滚动效果 |

### 3.2 关键动画实现

#### 3D卡片翻转（三国杀风格）

```css
.card-stack {
  perspective: 1000px;
}

.card-stack .card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-stack .card:hover {
  transform: rotateY(180deg) translateY(-20px) scale(1.05);
}
```

#### 霓虹发光效果

```css
.neon-glow {
  text-shadow: 
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #FFD700,
    0 0 40px #FFD700;
  animation: neon-pulse 1.5s ease-in-out infinite alternate;
}
```

#### 滚动触发动画

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### 3.3 动画性能优化

| 优化措施 | 说明 |
|----------|------|
| 使用transform代替top/left | 触发GPU加速 |
| 使用will-change预告知 | 浏览器提前优化 |
| 避免同时动画过多元素 | 减少重绘开销 |
| 移动端减少动画 | 节省电量、提升性能 |
| 使用requestAnimationFrame | JS动画帧同步 |

---

## 四、设计规范

### 4.1 色彩系统

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 主色 | #FFD700 | 乐高黄 |
| 辅助色 | #FF6B6B | 活力橙 |
| 强调色 | #4ECDC4 | 青绿色 |
| 背景色 | #F7F7F7 | 浅灰 |
| 文字色 | #333333 | 深灰 |
| 成功色 | #28A745 | 绿色 |
| 错误色 | #DC3545 | 红色 |

### 4.2 字体规范

| 用途 | 字体 | 大小 |
|------|------|------|
| 标题 | Nunito Bold | 24-36px |
| 正文 | Nunito Regular | 16px |
| 小字 | Nunito Light | 12-14px |

### 4.3 间距规范

| 级别 | 值 | 应用场景 |
|------|-----|----------|
| xs | 4px | 紧凑元素间距 |
| sm | 8px | 相关元素间距 |
| md | 16px | 模块内间距 |
| lg | 24px | 模块间间距 |
| xl | 32px | 区块间间距 |

---

## 五、最佳实践

### 5.1 前端开发

1. **模块化CSS**: 按功能分离样式文件
2. **CSS变量**: 统一管理颜色、间距
3. **语义化HTML**: 提升可访问性
4. **渐进增强**: 基础功能优先，高级特性可选

### 5.2 API开发

1. **统一响应格式**: `{ success, data, error }`
2. **错误处理**: 捕获所有异常，返回友好提示
3. **CORS处理**: 统一处理跨域请求
4. **参数验证**: 验证必填字段和格式

### 5.3 性能优化

1. **静态资源CDN**: Cloudflare自动处理
2. **图片懒加载**: 使用loading="lazy"
3. **代码分割**: 按页面分离JS文件
4. **缓存策略**: 合理设置缓存头
