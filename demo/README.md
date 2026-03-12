# StoryBook UI Demo

中世纪复古奇幻风格的交互式故事创作平台 UI Demo

## 🎨 四种风格主题

| 风格 | 名称 | 主色调 | 描述 |
|------|------|--------|------|
| Adventure | 中世纪魔幻 | 金色 #FFD700 | 暗色背景 + 金色粒子 + 炉石卡牌 |
| Fantasy | 童话奇幻 | 魔法紫 #9B59B6 | 柔和色彩 + 星星闪烁 + 魔法书页 |
| Romance | 现代都市言情 | 玫瑰粉 #FF6B9D | 粉紫色调 + 心形粒子 + 玻璃态卡片 |
| Business | 经典绅士英伦 | 复古金 #C9A962 | 深棕/墨绿 + 复古优雅 + 名片风格 |

## 🌐 语言支持

- **English (EN)** - 英语
- **中文 (ZH)** - 中文

## 预览

打开 `index.html` 即可预览首页。

## 页面列表

| 页面 | 文件 | 描述 |
|------|------|------|
| 首页 | `index.html` | 产品介绍、特性展示、预设故事书架 |
| 登录页 | `login.html` | 古典书卷风格登录表单 |
| 书架页 | `bookshelf.html` | 用户的书籍库，3D书册展示 |
| 书籍详情页 | `book.html` | 三栏布局：章节列表、内容区、角色面板 |
| 章节阅读页 | `chapter.html` | 羊皮纸风格阅读区、卷轴谜题弹出 |
| 故事导演页 | `director.html` | 3D舞台、卡牌选择抽屉、戏剧按钮 |
| 创建书籍页 | `book-create.html` | 书页翻动进度、羊皮纸表单 |

## 风格切换

页面右侧有一个浮动面板，点击 🎨 图标展开：

1. **选择风格** - 点击四种风格卡片切换
2. **切换语言** - 点击 EN/中文 按钮切换

风格和语言选择会自动保存到浏览器本地存储。

## 设计特点

### 核心风格
- **中世纪复古奇幻风格**
- 暗色游戏主题 + 金色强调色
- 炉石传说式卡牌设计
- 古典羊皮纸/卷轴元素

### 视觉元素
- 渐变背景 + 粒子动画
- 3D书册效果（有厚度感）
- 卷轴展开动画
- 蜡封按钮
- 炉石风格卡牌

### 动画效果
- 入场动画（fadeIn, slideUp）
- 卡牌悬停上浮 + 光晕
- 书籍抽出效果
- 卷轴展开/收起
- 书页翻动

## 文件结构

```
demo/
├── index.html          # 首页
├── login.html          # 登录页
├── bookshelf.html      # 书架页
├── book.html           # 书籍详情页
├── chapter.html        # 章节阅读页
├── director.html       # 故事导演页
├── book-create.html    # 创建书籍页
├── css/
│   ├── variables.css   # CSS变量（颜色、字体、间距）
│   ├── main.css        # 主样式
│   ├── animations.css  # 动画库
│   ├── components.css  # 组件样式
│   ├── themes.css      # 四种风格主题
│   └── responsive.css  # 响应式样式
├── js/
│   ├── main.js         # 主脚本
│   ├── mock-data.js    # 假数据
│   └── theme.js        # 主题和语言切换
└── README.md           # 说明文档
```

## 技术栈

- **HTML5** - 语义化标签
- **CSS3** - Flexbox、Grid、动画、变量
- **JavaScript** - 原生ES6+
- **Google Fonts** - Cinzel、Crimson Text、Inter

## 响应式设计

| 断点 | 宽度范围 | 布局 |
|------|----------|------|
| 桌面 | >1024px | 完整布局 |
| 平板 | 768-1024px | 双列布局 |
| 移动端 | <768px | 单列布局 |

## 可访问性

- 支持 `prefers-reduced-motion` 减少动画
- 键盘导航友好
- 焦点状态清晰可见

## 设计文档

详细设计文档请查看：`doc/design/2026-03-12-medieval-ui-design.md`
