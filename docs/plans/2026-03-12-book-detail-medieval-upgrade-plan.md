# 书籍详情页中世纪风格升级实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 将 Demo 目录下的书籍详情页升级为中世纪古书风格，包括古典目录表章节目录、统一 3:4 卡牌比例、书页翻动和卡牌抽出动画。

**Architecture:** 修改现有 book.html、CSS 样式和 JavaScript 逻辑，添加新的动画效果和布局样式。

**Tech Stack:** HTML, CSS, JavaScript (原生)

---

## 准备工作

### Task 1: 创建 CSS 动画和样式文件备份

**Files:**
- Modify: `demo/css/animations.css` (添加新动画)
- Modify: `demo/css/components.css` (添加新样式)

---

## 第一部分：添加新动画

### Task 2: 添加书页翻动和卡牌抽出动画

**Files:**
- Modify: `demo/css/animations.css`

**Step 1: 添加书页翻入动画**

```css
@keyframes pageFlipIn {
  0% {
    transform: rotateY(-90deg);
    opacity: 0;
    transform-origin: left center;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
    transform-origin: left center;
  }
}

@keyframes pageFlipOut {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
    transform-origin: left center;
  }
  100% {
    transform: rotateY(90deg);
    opacity: 0;
    transform-origin: left center;
  }
}
```

**Step 2: 添加卡牌抽出动画**

```css
@keyframes cardDraw {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-15px) rotate(-3deg);
  }
}

@keyframes cardDrawReverse {
  0% {
    transform: translateY(-15px) rotate(-3deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}
```

**Step 3: 添加墨水滴脉动动画**

```css
@keyframes inkDropPulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(139, 90, 43, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 15px rgba(139, 90, 43, 0.8);
    transform: scale(1.1);
  }
}
```

**Step 4: 添加动画类**

```css
.animate-page-flip-in {
  animation: pageFlipIn 0.6s ease-out forwards;
}

.animate-page-flip-out {
  animation: pageFlipOut 0.4s ease-in forwards;
}

.animate-card-draw {
  animation: cardDraw 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.animate-ink-pulse {
  animation: inkDropPulse 2s ease-in-out infinite;
}
```

---

## 第二部分：添加组件样式

### Task 3: 添加古典目录表样式

**Files:**
- Modify: `demo/css/components.css` 或 `demo/book.html` 内嵌样式

**Step 1: 添加目录表容器样式**

```css
.chapter-toc {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
}

.chapter-toc-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background: rgba(139, 90, 43, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chapter-toc-item:hover {
  background: rgba(139, 90, 43, 0.15);
}

.chapter-toc-item .chapter-number {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  color: #D4AF37;
  min-width: 80px;
  flex-shrink: 0;
}

.chapter-toc-item .chapter-dots {
  flex: 1;
  border-bottom: 2px dotted rgba(139, 90, 43, 0.4);
  margin: 0 10px;
  height: 1px;
}

.chapter-toc-item .chapter-title {
  font-family: 'Cinzel', serif;
  font-size: 13px;
  color: #2a1810;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
```

**Step 2: 添加章节状态装饰样式**

```css
/* 已读状态 - 金色勾选 */
.chapter-toc-item.read .chapter-status-icon {
  color: #D4AF37;
  font-size: 14px;
  margin-left: 10px;
}

/* 当前状态 - 墨水滴 */
.chapter-toc-item.current {
  background: rgba(139, 90, 43, 0.2);
  border-left: 3px solid #D4AF37;
}

.chapter-toc-item.current .chapter-status-icon {
  color: #8B4513;
  font-size: 16px;
  margin-left: 10px;
  animation: inkDropPulse 2s ease-in-out infinite;
}

/* 锁定状态 - 蜡封印章遮盖 */
.chapter-toc-item.locked {
  opacity: 0.6;
}

.chapter-toc-item.locked .chapter-status-icon {
  color: #8B0000;
  font-size: 14px;
  margin-left: 10px;
}

.chapter-toc-item.locked::after {
  content: '';
  position: absolute;
  top: 0;
  right: 40px;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle at 30% 30%, #C41E3A 0%, #8B0000 50%, #5C0000 100%);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  opacity: 0.7;
}
```

---

### Task 4: 添加统一 3:4 卡牌样式

**Files:**
- Modify: `demo/book.html` 内嵌样式

**Step 1: 更新卡牌基础尺寸**

```css
.hs-card-mini {
  width: 150px;
  height: 200px; /* 3:4 比例 */
  aspect-ratio: 3/4;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%);
  border: 2px solid #FFD700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
}

.hs-card-mini:hover {
  transform: translateY(-15px) rotate(-3deg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.3);
  z-index: 10;
}
```

**Step 2: 更新情节卡牌样式**

```css
.plot-card-mini.hs-card-mini {
  background: linear-gradient(135deg, rgba(80, 20, 20, 0.95) 0%, rgba(60, 10, 10, 0.95) 100%);
  border-color: #8B0000;
}

.plot-card-mini.hs-card-mini:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 0, 0, 0.4);
}
```

**Step 3: 更新卡牌网格布局**

```css
.character-grid-view,
.plot-grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
  padding: 15px 0;
}
```

---

## 第三部分：修改 HTML 结构

### Task 5: 重构章节目录 HTML

**Files:**
- Modify: `demo/book.html:479-490` (左右内容区域)

**Step 1: 更新章节渲染函数**

将原有的 `chapter-list-view` 网格布局改为新的目录表格式：

```javascript
function renderChapterCard(chapter) {
  const statusIcon = {
    'read': '✓',
    'current': '🖋️',
    'locked': '🔒'
  };
  
  return `
    <div class="chapter-toc-item ${chapter.status}" onclick="goToChapter(${chapter.id})">
      <span class="chapter-number">Chapter ${chapter.number}</span>
      <span class="chapter-dots"></span>
      <span class="chapter-title">${chapter.title}</span>
      <span class="chapter-status-icon">${statusIcon[chapter.status]}</span>
    </div>
  `;
}
```

**Step 2: 更新渲染逻辑**

修改 `renderBookPages` 函数中的章节渲染部分：

```javascript
if (currentView === 'chapters') {
  // 左侧显示奇数章节，右侧显示偶数章节
  const chapters = bookData.chapters;
  const leftChapters = chapters.filter((_, i) => i % 2 === 0);
  const rightChapters = chapters.filter((_, i) => i % 2 === 1);
  
  leftContent.innerHTML = `<div class="chapter-toc">${leftChapters.map(ch => renderChapterCard(ch)).join('')}</div>`;
  rightContent.innerHTML = `<div class="chapter-toc">${rightChapters.map(ch => renderChapterCard(ch)).join('')}</div>`;
}
```

---

### Task 6: 添加卡牌详情弹窗

**Files:**
- Modify: `demo/book.html` (添加弹窗 HTML 和样式)

**Step 1: 添加弹窗 HTML 结构**

```html
<div id="cardModal" class="modal-overlay" onclick="closeCardModal(event)">
  <div class="modal-card-content">
    <button class="modal-close-btn" onclick="closeCardModal()">×</button>
    <div class="modal-card-display"></div>
  </div>
</div>
```

**Step 2: 添加弹窗样式**

```css
.modal-card-content {
  position: relative;
  max-width: 400px;
  width: 90%;
  transform: scale(0.9);
  transition: transform 0.4s ease;
}

.modal-overlay.active .modal-card-content {
  transform: scale(1);
}

.modal-close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #f4e4bc;
  font-size: 30px;
  cursor: pointer;
  z-index: 100;
}
```

**Step 3: 添加弹窗 JavaScript 函数**

```javascript
function showCharacterDetail(id) {
  const char = bookData.characters.find(c => c.id === id);
  const modal = document.getElementById('cardModal');
  const content = modal.querySelector('.modal-card-display');
  
  content.innerHTML = `
    <div class="hs-card-mini ${char.role.toLowerCase()}" style="transform: none;">
      <div class="avatar" style="font-size: 64px;">${char.avatar}</div>
      <div class="name" style="color: #FFD700; font-family: 'Cinzel', serif; font-size: 18px; margin-top: 15px;">${char.name}</div>
      <div class="role" style="color: #a0a0a0; font-size: 14px; margin-top: 8px;">${char.role}</div>
    </div>
  `;
  
  modal.classList.add('active');
}

function showPlotDetail(id) {
  const plot = bookData.plots.find(p => p.id === id);
  const modal = document.getElementById('cardModal');
  const content = modal.querySelector('.modal-card-display');
  
  content.innerHTML = `
    <div class="hs-card-mini plot-card-mini">
      <div class="plot-icon" style="font-size: 48px;">${plot.icon}</div>
      <div class="plot-title" style="color: #f4e4bc; font-family: 'Cinzel', serif; font-size: 18px; margin-top: 15px;">${plot.title}</div>
      <div class="plot-desc" style="color: #ccc; font-size: 14px; margin-top: 10px; text-align: center; padding: 0 20px;">${plot.desc}</div>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeCardModal(event) {
  if (!event || event.target.classList.contains('modal-overlay')) {
    document.getElementById('cardModal').classList.remove('active');
  }
}
```

---

## 第四部分：添加交互动画

### Task 7: 添加 Tab 切换翻页动画

**Files:**
- Modify: `demo/book.html` JavaScript 部分

**Step 1: 更新 switchView 函数添加翻页动画**

```javascript
let isAnimating = false;

function switchView(view) {
  if (isAnimating || view === currentView) return;
  isAnimating = true;
  
  const leftPage = document.querySelector('.book-page.left .page-content');
  const rightPage = document.querySelector('.book-page.right .page-content');
  
  // 翻页出去
  leftPage.style.animation = 'pageFlipOut 0.3s ease-in forwards';
  rightPage.style.animation = 'pageFlipOut 0.3s ease-in forwards';
  
  setTimeout(() => {
    // 更新视图
    currentView = view;
    
    document.querySelectorAll('.view-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === view);
    });
    
    renderBookPages();
    
    // 翻页进来
    const newLeftContent = document.getElementById('leftPageContent');
    const newRightContent = document.getElementById('rightPageContent');
    
    newLeftContent.style.animation = 'pageFlipIn 0.5s ease-out forwards';
    newRightContent.style.animation = 'pageFlipIn 0.5s ease-out forwards';
    
    setTimeout(() => {
      isAnimating = false;
      // 清理动画样式
      newLeftContent.style.animation = '';
      newRightContent.style.animation = '';
    }, 500);
    
  }, 300);
}
```

---

### Task 8: 添加卡牌入场动画延迟

**Files:**
- Modify: `demo/book.html` JavaScript 渲染函数

**Step 1: 更新角色和情节卡牌渲染，添加入场动画**

```javascript
function renderCharacterCard(char, index) {
  return `
    <div class="hs-card-mini ${char.role.toLowerCase()}" 
         onclick="showCharacterDetail(${char.id})"
         style="animation: fadeIn 0.5s ease-out ${index * 0.1}s backwards;">
      <div class="avatar" style="font-size: 48px;">${char.avatar}</div>
      <div class="name" style="color: #FFD700; font-family: 'Cinzel', serif; font-size: 14px; margin-top: 10px;">${char.name}</div>
      <div class="role" style="color: #a0a0a0; font-size: 11px; margin-top: 5px;">${char.role}</div>
    </div>
  `;
}

function renderPlotCard(plot, index) {
  return `
    <div class="hs-card-mini plot-card-mini" 
         onclick="showPlotDetail(${plot.id})"
         style="animation: fadeIn 0.5s ease-out ${index * 0.1}s backwards;">
      <div class="plot-icon" style="font-size: 36px;">${plot.icon}</div>
      <div class="plot-title" style="color: #f4e4bc; font-family: 'Cinzel', serif; font-size: 13px; margin-top: 10px;">${plot.title}</div>
      <div class="plot-desc" style="color: #ccc; font-size: 11px; margin-top: 5px;">${plot.desc}</div>
    </div>
  `;
}
```

**Step 2: 更新渲染调用，传入索引**

```javascript
// 在 renderBookPages 函数中
leftContent.innerHTML = `<div class="character-grid-view">${leftChars.map((ch, i) => renderCharacterCard(ch, i)).join('')}</div>`;
rightContent.innerHTML = `<div class="character-grid-view">${rightChars.map((ch, i) => renderCharacterCard(ch, i)).join('')}</div>`;

// 情节同样处理
```

---

## 第五部分：响应式调整

### Task 9: 添加移动端响应式样式

**Files:**
- Modify: `demo/book.html` 内嵌媒体查询

**Step 1: 更新媒体查询**

```css
@media (max-width: 900px) {
  .chapter-toc-item {
    flex-wrap: wrap;
  }
  
  .chapter-toc-item .chapter-dots {
    display: none;
  }
  
  .chapter-toc-item .chapter-title {
    max-width: 100%;
  }
  
  .hs-card-mini {
    width: 120px;
    height: 160px;
  }
  
  .character-grid-view,
  .plot-grid-view {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
```

---

## 验收测试

### Task 10: 验证实现

**验证清单：**

- [ ] 打开 book.html，章节目录显示为古典目录表样式
- [ ] 章节状态有正确的装饰图标（✓、🖋️、🔒）
- [ ] 当前章节有墨水滴脉动动画
- [ ] 锁定章节有半透明遮盖效果
- [ ] 角色卡牌和情节卡牌都是 3:4 比例
- [ ] 切换 Tab 时有书页翻动效果
- [ ] 悬停卡牌时有上浮+旋转效果
- [ ] 点击卡牌显示详情弹窗
- [ ] 移动端布局正常显示

---

## 实施顺序

1. Task 2: 添加 CSS 动画
2. Task 3: 添加目录表样式
3. Task 4: 添加卡牌样式
4. Task 5: 重构章节 HTML
5. Task 6: 添加弹窗
6. Task 7: 添加 Tab 切换动画
7. Task 8: 添加卡牌入场动画
8. Task 9: 响应式调整
9. Task 10: 验收测试
