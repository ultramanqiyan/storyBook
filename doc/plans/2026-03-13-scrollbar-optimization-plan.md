# 滚动条优化实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 优化网站滚动条样式，使其融入中世纪主题，提升用户沉浸式阅读体验。

**Architecture:** 通过自定义 CSS 滚动条样式（`::-webkit-scrollbar`），为书籍页面和阅读页面创建符合中世纪风格的滚动条。同时提供隐藏滚动条的选项，实现无视觉干扰的沉浸阅读体验。

**Tech Stack:** CSS3 (webkit scrollbar), vanilla JavaScript

---

## 优化目标

| 优先级 | 位置 | 优化方案 |
|--------|------|----------|
| 🔴 高 | 书籍页面 `.page-content` | 中世纪风格自定义滚动条 |
| 🔴 高 | 阅读页面 `.reading-content` | 隐藏滚动条但保留功能 |
| 🟡 中 | 侧边栏 `.sidebar-content` | 按需显示滚动条 |

---

## Task 1: 创建滚动条样式组件

**Files:**
- Create: `src/frontend/css/scrollbar.css`

**Step 1: 创建滚动条样式文件**

创建 `src/frontend/css/scrollbar.css`，包含以下内容：

```css
/* ========================================
   滚动条样式 - 中世纪主题
   ======================================== */

/* 全局滚动条基础样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: #8B4513 rgba(139, 90, 43, 0.1);
}

/* ========================================
   中世纪风格滚动条 - 用于书籍页面
   ======================================== */
.medieval-scrollbar::-webkit-scrollbar {
  width: 14px;
}

.medieval-scrollbar::-webkit-scrollbar-track {
  background: linear-gradient(180deg, 
    rgba(139, 90, 43, 0.05) 0%, 
    rgba(139, 90, 43, 0.15) 50%,
    rgba(139, 90, 43, 0.05) 100%);
  border-radius: 7px;
  border: 1px solid rgba(139, 90, 43, 0.2);
  margin: 4px;
}

.medieval-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, 
    #8B4513 0%, 
    #654321 50%, 
    #8B4513 100%);
  border-radius: 7px;
  border: 2px solid #f4e4bc;
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.2);
}

.medieval-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, 
    #A0522D 0%, 
    #8B4513 50%, 
    #A0522D 100%);
}

.medieval-scrollbar::-webkit-scrollbar-thumb:active {
  background: linear-gradient(180deg, 
    #654321 0%, 
    #4a3728 50%, 
    #654321 100%);
}

.medieval-scrollbar::-webkit-scrollbar-corner {
  background: rgba(139, 90, 43, 0.1);
}

/* ========================================
   隐藏滚动条 - 用于沉浸式阅读
   ======================================== */
.hidden-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hidden-scrollbar::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* ========================================
   按需显示滚动条 - 用于侧边栏
   ======================================== */
.auto-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s ease;
}

.auto-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.auto-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.auto-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.auto-scrollbar:hover {
  scrollbar-color: rgba(139, 90, 43, 0.5) rgba(139, 90, 43, 0.1);
}

.auto-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(139, 90, 43, 0.5);
}

.auto-scrollbar:hover::-webkit-scrollbar-track {
  background: rgba(139, 90, 43, 0.1);
}

/* ========================================
   金色主题滚动条 - 用于深色背景
   ======================================== */
.gold-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.gold-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.gold-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, 
    #FFD700 0%, 
    #B8860B 50%, 
    #FFD700 100%);
  border-radius: 5px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.gold-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, 
    #FFA500 0%, 
    #FFD700 50%, 
    #FFA500 100%);
}

/* ========================================
   滚动指示器 - 可选的滚动进度提示
   ======================================== */
.scroll-indicator {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60px;
  background: rgba(139, 90, 43, 0.2);
  border-radius: 2px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scroll-indicator.visible {
  opacity: 1;
}

.scroll-indicator::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(180deg, #8B4513, transparent);
  border-radius: 2px;
}
```

**Step 2: 验证文件创建成功**

确认文件 `src/frontend/css/scrollbar.css` 已创建。

---

## Task 2: 在 HTML 页面中引入滚动条样式

**Files:**
- Modify: `src/frontend/book.html`
- Modify: `src/frontend/chapter.html`

**Step 1: 修改 book.html - 添加样式引用**

在 `book.html` 的 `<head>` 部分，在现有样式表后添加：

```html
<link rel="stylesheet" href="css/scrollbar.css">
```

位置：在第12行 `<link rel="stylesheet" href="css/responsive.css">` 之后。

**Step 2: 修改 book.html - 为页面内容添加滚动条类**

将 `.page-content` 元素添加 `medieval-scrollbar` 类。

找到第409行附近的代码：
```html
<div class="page-content">
```

修改为：
```html
<div class="page-content medieval-scrollbar">
```

同样修改右侧页面（第444行附近）：
```html
<div class="page-content medieval-scrollbar">
```

**Step 3: 修改 chapter.html - 添加样式引用**

在 `chapter.html` 的 `<head>` 部分，在现有样式表后添加：

```html
<link rel="stylesheet" href="css/scrollbar.css">
```

位置：在第12行 `<link rel="stylesheet" href="css/responsive.css">` 之后。

**Step 4: 修改 chapter.html - 为阅读内容添加隐藏滚动条类**

将 `.reading-content` 元素添加 `hidden-scrollbar` 类。

找到第676行附近的代码：
```html
<div class="reading-content">
```

修改为：
```html
<div class="reading-content hidden-scrollbar">
```

同样修改右侧页面（第701行附近）。

**Step 5: 修改 chapter.html - 为侧边栏添加按需显示滚动条类**

将 `.sidebar-content` 元素添加 `auto-scrollbar` 类。

找到第735行附近的代码：
```html
<div class="sidebar-content">
```

修改为：
```html
<div class="sidebar-content auto-scrollbar">
```

---

## Task 3: 更新 theme-medieval.css 中的滚动条样式

**Files:**
- Modify: `src/frontend/css/theme-medieval.css`

**Step 1: 在 theme-medieval.css 末尾添加滚动条样式引用**

在文件末尾添加以下注释和样式引用：

```css
/* ========================================
   滚动条样式增强
   注意：具体的滚动条样式定义在 scrollbar.css 中
   这里只做类名映射
   ======================================== */

/* 页面内容区域使用中世纪风格滚动条 */
.page-content {
  scrollbar-width: thin;
  scrollbar-color: #8B4513 rgba(139, 90, 43, 0.1);
}

/* 阅读内容区域隐藏滚动条 */
.reading-content {
  scrollbar-width: none;
}

/* 侧边栏内容区域按需显示滚动条 */
.sidebar-content {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s ease;
}

.sidebar-content:hover {
  scrollbar-color: rgba(139, 90, 43, 0.5) rgba(139, 90, 43, 0.1);
}
```

位置：在文件最后（约第1471行之后）。

---

## Task 4: 验证优化效果

**Files:**
- 无需修改文件

**Step 1: 启动本地开发服务器**

运行开发脚本启动本地服务器。

**Step 2: 验证书籍页面滚动条**

1. 打开浏览器访问书籍详情页 (book.html)
2. 检查左右两页内容区域的滚动条是否显示为中世纪风格
3. 确认滚动条颜色为棕色系，与羊皮纸背景协调
4. 测试滚动条悬停效果

**Step 3: 验证阅读页面滚动条**

1. 打开浏览器访问章节阅读页 (chapter.html)
2. 检查阅读内容区域是否没有可见滚动条
3. 确认页面仍然可以正常滚动
4. 测试鼠标滚轮和触摸板滚动

**Step 4: 验证侧边栏滚动条**

1. 在章节阅读页，展开右侧侧边栏
2. 确认默认状态下滚动条不可见
3. 鼠标悬停在侧边栏时，滚动条淡入显示
4. 移开鼠标后，滚动条淡出隐藏

**Step 5: 跨浏览器测试**

在以下浏览器中测试滚动条效果：
- Chrome (推荐)
- Edge
- Firefox (注意：Firefox 使用 scrollbar-width 和 scrollbar-color)
- Safari (注意：Safari 对自定义滚动条支持有限)

---

## Task 5: 提交更改

**Files:**
- 无需修改文件

**Step 1: 查看更改**

```bash
git status
git diff
```

**Step 2: 添加文件到暂存区**

```bash
git add src/frontend/css/scrollbar.css
git add src/frontend/book.html
git add src/frontend/chapter.html
git add src/frontend/css/theme-medieval.css
```

**Step 3: 提交更改**

```bash
git commit -m "feat(ui): add medieval-style scrollbar for immersive reading experience

- Create scrollbar.css with medieval, hidden, and auto scrollbar styles
- Apply medieval-scrollbar to book page content areas
- Apply hidden-scrollbar to chapter reading content for distraction-free reading
- Apply auto-scrollbar to sidebar for on-demand visibility
- Update theme-medieval.css with scrollbar color mappings"
```

---

## 文件变更摘要

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/frontend/css/scrollbar.css` | 新建 | 滚动条样式组件 |
| `src/frontend/book.html` | 修改 | 引入样式 + 添加类名 |
| `src/frontend/chapter.html` | 修改 | 引入样式 + 添加类名 |
| `src/frontend/css/theme-medieval.css` | 修改 | 添加滚动条颜色映射 |

---

## 浏览器兼容性说明

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| `::-webkit-scrollbar` | ✅ | ❌ | ⚠️ 部分 | ✅ |
| `scrollbar-width` | ✅ | ✅ | ❌ | ✅ |
| `scrollbar-color` | ✅ | ✅ | ❌ | ✅ |

**注意**: 
- Firefox 不支持 `::-webkit-scrollbar`，但支持 `scrollbar-width` 和 `scrollbar-color`
- Safari 对自定义滚动条支持有限，建议使用 `scrollbar-width: none` 隐藏滚动条
- 计划中已包含 Firefox 兼容性处理

---

## 预期效果

### 优化前
- 书籍页面：默认浏览器滚动条，与中世纪主题不协调
- 阅读页面：滚动条分散阅读注意力
- 侧边栏：滚动条始终可见，占用空间

### 优化后
- 书籍页面：棕色系中世纪风格滚动条，融入羊皮纸背景
- 阅读页面：无可见滚动条，沉浸式阅读体验
- 侧边栏：悬停时才显示滚动条，节省空间
