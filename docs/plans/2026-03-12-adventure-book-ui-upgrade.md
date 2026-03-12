# Adventure风格UI升级实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 将Adventure风格的书籍详情页和章节阅读页升级为书本展开式UI，包含3D翻页动画、羊皮纸视觉效果、角色/情节卡牌侧边栏等功能。

**Architecture:** 采用纯CSS+JavaScript实现3D翻页效果和羊皮纸纹理，侧边栏使用可折叠设计，正文角色名高亮联动侧边栏。

**Tech Stack:** HTML5, CSS3 (3D transforms, animations), JavaScript (ES6), Google Fonts

---

## Task 1: 创建书籍详情页 - 书本展开式布局

**Files:**
- Modify: `demo/book.html`

**Step 1: 创建书本展开式HTML结构**

将现有的三栏布局替换为书本展开式布局：

```html
<!-- 在 <style> 标签后添加新的样式 -->
<style>
  /* 书本展开式布局 */
  .book-opening-page {
    min-height: 100vh;
    padding-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 2000px;
  }
  
  .book-container {
    position: relative;
    width: 90%;
    max-width: 1200px;
    height: 80vh;
    min-height: 600px;
    display: flex;
    justify-content: center;
  }
  
  .book-spine {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 100%;
    background: linear-gradient(90deg, 
      #2a1a0a 0%, 
      #4a3a2a 20%, 
      #3a2a1a 50%, 
      #4a3a2a 80%, 
      #2a1a0a 100%);
    border-radius: 5px;
    z-index: 10;
    box-shadow: 
      0 0 20px rgba(0, 0, 0, 0.5),
      inset 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .book-spine::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 80%;
    background: linear-gradient(180deg, 
      #8B4513 0%, 
      #A0522D 50%, 
      #8B4513 100%);
    border-radius: 2px;
  }
  
  .book-spine::after {
    content: attr(data-book-title);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    white-space: nowrap;
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    color: #D4AF37;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    letter-spacing: 2px;
  }
  
  .book-page {
    position: absolute;
    width: calc(50% - 30px);
    height: 100%;
    background: var(--color-parchment);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
  
  .book-page.left {
    left: 0;
    transform-origin: right center;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .book-page.right {
    right: 0;
    transform-origin: left center;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  /* 羊皮纸纹理 */
  .parchment-texture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(ellipse at top left, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(139, 90, 43, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at center, transparent 0%, rgba(139, 90, 43, 0.05) 100%);
    pointer-events: none;
  }
  
  /* 边缘磨损效果 */
  .page-edge {
    position: absolute;
    pointer-events: none;
  }
  
  .page-edge.top {
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(180deg, 
      rgba(80, 40, 20, 0.3) 0%, 
      transparent 100%);
  }
  
  .page-edge.bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(0deg, 
      rgba(80, 40, 20, 0.3) 0%, 
      transparent 100%);
  }
  
  .page-edge.left {
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(90deg, 
      rgba(80, 40, 20, 0.3) 0%, 
      transparent 100%);
  }
  
  .page-edge.right {
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(270deg, 
      rgba(80, 40, 20, 0.3) 0%, 
      transparent 100%);
  }
  
  /* 页面内容区域 */
  .page-content {
    position: relative;
    height: 100%;
    padding: 30px;
    overflow-y: auto;
    color: #2a1810;
    z-index: 1;
  }
  
  /* 视图切换按钮 */
  .view-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid rgba(139, 90, 43, 0.3);
  }
  
  .view-tab {
    padding: 8px 20px;
    background: rgba(139, 90, 43, 0.1);
    border: 2px solid rgba(139, 90, 43, 0.3);
    border-radius: 8px;
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    color: #4a3a2a;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .view-tab:hover {
    background: rgba(139, 90, 43, 0.2);
    border-color: #8B4513;
  }
  
  .view-tab.active {
    background: rgba(139, 90, 43, 0.3);
    border-color: #8B4513;
    color: #2a1810;
  }
  
  /* 章节列表样式 */
  .chapter-list-view {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .chapter-card {
    padding: 15px;
    background: rgba(139, 90, 43, 0.1);
    border: 1px solid rgba(139, 90, 43, 0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .chapter-card:hover {
    background: rgba(139, 90, 43, 0.2);
    transform: translateY(-2px);
  }
  
  .chapter-card .chapter-number {
    font-family: 'MedievalSharp', cursive;
    font-size: 12px;
    color: #8B4513;
    margin-bottom: 5px;
  }
  
  .chapter-card .chapter-title {
    font-family: 'Cinzel', serif;
    font-size: 14px;
    color: #2a1810;
  }
  
  .chapter-card .chapter-status {
    font-size: 11px;
    color: #6a4a2a;
    margin-top: 5px;
  }
  
  /* 角色卡牌网格 */
  .character-grid-view {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-items: center;
  }
  
  .character-card-mini {
    width: 140px;
    padding: 15px;
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%);
    border: 2px solid #FFD700;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .character-card-mini:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }
  
  .character-card-mini .avatar {
    font-size: 40px;
    margin-bottom: 10px;
  }
  
  .character-card-mini .name {
    font-family: 'Cinzel', serif;
    font-size: 12px;
    color: #FFD700;
  }
  
  .character-card-mini .role {
    font-size: 10px;
    color: #a0a0a0;
    margin-top: 5px;
  }
  
  /* 情节卡牌网格 */
  .plot-grid-view {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .plot-card-mini {
    padding: 15px;
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.2) 0%, rgba(80, 0, 0, 0.2) 100%);
    border: 1px solid rgba(139, 0, 0, 0.3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .plot-card-mini:hover {
    transform: translateY(-3px);
    border-color: #8B0000;
  }
  
  .plot-card-mini .plot-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .plot-card-mini .plot-title {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: #2a1810;
  }
  
  .plot-card-mini .plot-desc {
    font-size: 11px;
    color: #4a3a2a;
    margin-top: 5px;
  }
  
  /* 书本信息头部 */
  .book-info-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background: rgba(139, 90, 43, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .book-cover-small {
    width: 80px;
    height: 110px;
    background: linear-gradient(135deg, #2a4a2a 0%, #1a2a1a 100%);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .book-cover-small span {
    font-size: 36px;
  }
  
  .book-meta-info h2 {
    font-family: 'MedievalSharp', cursive;
    font-size: 20px;
    color: #2a1810;
    margin-bottom: 5px;
  }
  
  .book-meta-info .type-badge {
    display: inline-block;
    padding: 3px 10px;
    background: #8B4513;
    color: #f4e4bc;
    border-radius: 4px;
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  
  .book-meta-info .stats {
    display: flex;
    gap: 15px;
    font-size: 12px;
    color: #4a3a2a;
  }
  
  /* 响应式 */
  @media (max-width: 900px) {
    .book-container {
      width: 95%;
      height: auto;
      min-height: auto;
      flex-direction: column;
    }
    
    .book-spine {
      display: none;
    }
    
    .book-page {
      position: relative;
      width: 100%;
      height: auto;
      min-height: 400px;
      margin-bottom: 20px;
    }
    
    .book-page.left,
    .book-page.right {
      border-radius: 8px;
    }
    
    .chapter-list-view,
    .character-grid-view,
    .plot-grid-view {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 2: 替换HTML主体结构**

将 `<div class="book-detail-page">` 及其内容替换为：

```html
<div class="book-opening-page">
  <div class="book-container">
    <div class="book-spine" data-book-title="The Lost Kingdom"></div>
    
    <!-- 左页 -->
    <div class="book-page left">
      <div class="parchment-texture"></div>
      <div class="page-edge top"></div>
      <div class="page-edge left"></div>
      <div class="page-edge bottom"></div>
      <div class="page-content">
        <div class="book-info-header">
          <div class="book-cover-small">
            <span>🗺️</span>
          </div>
          <div class="book-meta-info">
            <span class="type-badge">Adventure</span>
            <h2>The Lost Kingdom</h2>
            <div class="stats">
              <span>📜 20 Chapters</span>
              <span>👥 5 Characters</span>
              <span>📖 15% Progress</span>
            </div>
          </div>
        </div>
        
        <div class="view-tabs">
          <button class="view-tab active" data-view="chapters" onclick="switchView('chapters')">📜 Chapters</button>
          <button class="view-tab" data-view="characters" onclick="switchView('characters')">👥 Characters</button>
          <button class="view-tab" data-view="plots" onclick="switchView('plots')">🎭 Plots</button>
        </div>
        
        <div id="leftPageContent">
          <!-- 默认显示章节列表 -->
        </div>
      </div>
    </div>
    
    <!-- 右页 -->
    <div class="book-page right">
      <div class="parchment-texture"></div>
      <div class="page-edge top"></div>
      <div class="page-edge right"></div>
      <div class="page-edge bottom"></div>
      <div class="page-content">
        <div id="rightPageContent">
          <!-- 右页内容 -->
        </div>
      </div>
    </div>
  </div>
</div>
```

**Step 3: 添加JavaScript视图切换逻辑**

在 `<script>` 标签内添加：

```javascript
const bookData = {
  chapters: [
    { id: 1, number: 'I', title: 'The Beginning', status: 'read' },
    { id: 2, number: 'II', title: 'The Journey Begins', status: 'read' },
    { id: 3, number: 'III', title: 'The Mountain Pass', status: 'current' },
    { id: 4, number: 'IV', title: "The Dragon's Lair", status: 'locked' },
    { id: 5, number: 'V', title: 'The Hidden Treasure', status: 'locked' },
    { id: 6, number: 'VI', title: 'The Final Battle', status: 'locked' },
    { id: 7, number: 'VII', title: 'Victory and Peace', status: 'locked' },
    { id: 8, number: 'VIII', title: 'A New Beginning', status: 'locked' }
  ],
  characters: [
    { id: 1, avatar: '🧙‍♂️', name: 'Sir Galahad', role: 'Protagonist' },
    { id: 2, avatar: '👸', name: 'Lady Elara', role: 'Supporter' },
    { id: 3, avatar: '⚔️', name: 'Dark Knight', role: 'Antagonist' },
    { id: 4, avatar: '👴', name: 'Village Elder', role: 'NPC' },
    { id: 5, avatar: '🐉', name: 'Ancient Dragon', role: 'Boss' }
  ],
  plots: [
    { id: 1, icon: '🗡️', title: 'The Call to Adventure', desc: 'Galahad receives his quest' },
    { id: 2, icon: '🏔️', title: 'Mountain Crossing', desc: 'The treacherous journey' },
    { id: 3, icon: '🐉', title: 'Dragon Encounter', desc: 'Face the ancient beast' },
    { id: 4, icon: '💎', title: 'Hidden Treasure', desc: 'Discover the kingdom\'s secret' },
    { id: 5, icon: '⚔️', title: 'Final Confrontation', desc: 'Battle for the kingdom' },
    { id: 6, icon: '👑', title: 'Restoration', desc: 'The kingdom reborn' }
  ]
};

let currentView = 'chapters';

function switchView(view) {
  currentView = view;
  
  document.querySelectorAll('.view-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === view);
  });
  
  renderBookPages();
}

function renderBookPages() {
  const leftContent = document.getElementById('leftPageContent');
  const rightContent = document.getElementById('rightPageContent');
  
  if (currentView === 'chapters') {
    const half = Math.ceil(bookData.chapters.length / 2);
    const leftChapters = bookData.chapters.slice(0, half);
    const rightChapters = bookData.chapters.slice(half);
    
    leftContent.innerHTML = `
      <div class="chapter-list-view">
        ${leftChapters.map(ch => renderChapterCard(ch)).join('')}
      </div>
    `;
    
    rightContent.innerHTML = `
      <div class="chapter-list-view">
        ${rightChapters.map(ch => renderChapterCard(ch)).join('')}
      </div>
    `;
  } else if (currentView === 'characters') {
    const half = Math.ceil(bookData.characters.length / 2);
    const leftChars = bookData.characters.slice(0, half);
    const rightChars = bookData.characters.slice(half);
    
    leftContent.innerHTML = `
      <div class="character-grid-view">
        ${leftChars.map(ch => renderCharacterCard(ch)).join('')}
      </div>
    `;
    
    rightContent.innerHTML = `
      <div class="character-grid-view">
        ${rightChars.map(ch => renderCharacterCard(ch)).join('')}
      </div>
    `;
  } else if (currentView === 'plots') {
    const half = Math.ceil(bookData.plots.length / 2);
    const leftPlots = bookData.plots.slice(0, half);
    const rightPlots = bookData.plots.slice(half);
    
    leftContent.innerHTML = `
      <div class="plot-grid-view">
        ${leftPlots.map(p => renderPlotCard(p)).join('')}
      </div>
    `;
    
    rightContent.innerHTML = `
      <div class="plot-grid-view">
        ${rightPlots.map(p => renderPlotCard(p)).join('')}
      </div>
    `;
  }
}

function renderChapterCard(chapter) {
  const statusIcon = {
    'read': '✓ Read',
    'current': '📖 Current',
    'locked': '🔒 Locked'
  };
  
  return `
    <div class="chapter-card ${chapter.status}" onclick="goToChapter(${chapter.id})">
      <div class="chapter-number">Chapter ${chapter.number}</div>
      <div class="chapter-title">${chapter.title}</div>
      <div class="chapter-status">${statusIcon[chapter.status]}</div>
    </div>
  `;
}

function renderCharacterCard(char) {
  return `
    <div class="character-card-mini" onclick="showCharacterDetail(${char.id})">
      <div class="avatar">${char.avatar}</div>
      <div class="name">${char.name}</div>
      <div class="role">${char.role}</div>
    </div>
  `;
}

function renderPlotCard(plot) {
  return `
    <div class="plot-card-mini" onclick="showPlotDetail(${plot.id})">
      <div class="plot-icon">${plot.icon}</div>
      <div class="plot-title">${plot.title}</div>
      <div class="plot-desc">${plot.desc}</div>
    </div>
  `;
}

function goToChapter(id) {
  window.location.href = `chapter.html?id=${id}`;
}

function showCharacterDetail(id) {
  const char = bookData.characters.find(c => c.id === id);
  showNotification(`Viewing: ${char.name}`, 'info');
}

function showPlotDetail(id) {
  const plot = bookData.plots.find(p => p.id === id);
  showNotification(`Viewing: ${plot.title}`, 'info');
}

document.addEventListener('DOMContentLoaded', function() {
  createParticles(document.getElementById('particles'), 30);
  renderBookPages();
});
```

**Step 4: 验证页面加载**

打开 `demo/book.html` 确认书本展开式布局正确显示。

---

## Task 2: 创建章节阅读页 - 双页书本布局

**Files:**
- Modify: `demo/chapter.html`

**Step 1: 添加双页书本布局样式**

在现有 `<style>` 标签内添加：

```css
  /* 双页书本阅读布局 */
  .book-reader-page {
    min-height: 100vh;
    padding-top: 80px;
    padding-bottom: 80px;
    display: flex;
    justify-content: center;
    perspective: 2000px;
  }
  
  .reading-book-container {
    position: relative;
    width: 95%;
    max-width: 1400px;
    height: calc(100vh - 200px);
    min-height: 600px;
    display: flex;
    justify-content: center;
  }
  
  .reading-spine {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 100%;
    background: linear-gradient(90deg, 
      #1a0a00 0%, 
      #3a2a1a 15%, 
      #2a1a0a 50%, 
      #3a2a1a 85%, 
      #1a0a00 100%);
    border-radius: 5px;
    z-index: 10;
    box-shadow: 
      0 0 30px rgba(0, 0, 0, 0.6),
      inset 0 0 15px rgba(0, 0, 0, 0.4);
  }
  
  .reading-spine::before {
    content: '';
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 90%;
    background: linear-gradient(180deg, 
      #654321 0%, 
      #8B4513 30%,
      #A0522D 50%,
      #8B4513 70%,
      #654321 100%);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  }
  
  .reading-spine::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 100%;
    background: repeating-linear-gradient(
      180deg,
      transparent 0px,
      transparent 8px,
      rgba(0, 0, 0, 0.1) 8px,
      rgba(0, 0, 0, 0.1) 10px
    );
  }
  
  .reading-page {
    position: absolute;
    width: calc(50% - 35px);
    height: 100%;
    background: #f4e4bc;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  }
  
  .reading-page.left {
    left: 0;
    border-radius: 8px 0 0 8px;
  }
  
  .reading-page.right {
    right: 0;
    border-radius: 0 8px 8px 0;
  }
  
  /* 羊皮纸纹理增强 */
  .parchment-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
      radial-gradient(ellipse at top left, rgba(139, 90, 43, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(139, 90, 43, 0.12) 0%, transparent 50%);
    pointer-events: none;
  }
  
  /* 页面边缘磨损 */
  .page-wear {
    position: absolute;
    pointer-events: none;
  }
  
  .page-wear.corner-tl {
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 0 0, transparent 30px, rgba(60, 30, 15, 0.4) 100%);
  }
  
  .page-wear.corner-tr {
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 100% 0, transparent 30px, rgba(60, 30, 15, 0.4) 100%);
  }
  
  .page-wear.corner-bl {
    bottom: 0;
    left: 0;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 0 100%, transparent 30px, rgba(60, 30, 15, 0.4) 100%);
  }
  
  .page-wear.corner-br {
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 100% 100%, transparent 30px, rgba(60, 30, 15, 0.4) 100%);
  }
  
  /* 阅读内容区域 */
  .reading-content {
    position: relative;
    height: 100%;
    padding: 40px 35px;
    overflow-y: auto;
    color: #1a1008;
    z-index: 1;
  }
  
  /* 中世纪手稿风格 */
  .manuscript-title {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid rgba(139, 90, 43, 0.4);
  }
  
  .manuscript-title .chapter-num {
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    color: #8B4513;
    letter-spacing: 4px;
    margin-bottom: 8px;
  }
  
  .manuscript-title .chapter-name {
    font-family: 'MedievalSharp', cursive;
    font-size: 28px;
    color: #2a1810;
    text-shadow: 1px 1px 0 rgba(139, 90, 43, 0.2);
  }
  
  .manuscript-title::before,
  .manuscript-title::after {
    content: '❧';
    display: block;
    font-size: 24px;
    color: #8B4513;
    opacity: 0.7;
  }
  
  .manuscript-title::after {
    margin-top: 10px;
  }
  
  .manuscript-text {
    font-family: 'Spectral', serif;
    font-size: 18px;
    line-height: 1.9;
    color: #1a1008;
  }
  
  .manuscript-text p {
    margin-bottom: 20px;
    text-align: justify;
  }
  
  /* 首字母装饰 */
  .drop-cap {
    font-family: 'Pirata One', cursive;
    font-size: 4.5em;
    float: left;
    line-height: 0.8;
    padding-right: 12px;
    padding-top: 8px;
    color: #8B4513;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  /* 对话样式 */
  .dialogue-block {
    margin: 25px 0;
    padding: 15px 20px;
    background: rgba(139, 90, 43, 0.08);
    border-left: 4px solid #8B4513;
    border-radius: 0 8px 8px 0;
  }
  
  .dialogue-block .speaker {
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    color: #8B4513;
    margin-bottom: 8px;
  }
  
  .dialogue-block .speech {
    font-style: italic;
    color: #2a1810;
  }
  
  /* 角色名高亮 */
  .character-highlight {
    color: #8B4513;
    font-weight: 600;
    cursor: pointer;
    border-bottom: 1px dotted #8B4513;
    transition: all 0.3s ease;
  }
  
  .character-highlight:hover {
    color: #5C4033;
    background: rgba(139, 90, 43, 0.15);
  }
  
  /* 分隔装饰 */
  .section-divider {
    text-align: center;
    margin: 30px 0;
    color: #8B4513;
    font-size: 20px;
    letter-spacing: 10px;
  }
  
  .section-divider::before {
    content: '═══';
  }
  
  /* 进度指示器 */
  .progress-corner {
    position: absolute;
    top: 15px;
    right: 20px;
    font-family: 'Spectral', serif;
    font-size: 12px;
    color: #8B4513;
    opacity: 0.7;
  }
  
  /* 卷轴导航按钮 */
  .scroll-nav-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 25px;
    background: linear-gradient(180deg, #f4e4bc 0%, #d4c4a0 100%);
    border: 2px solid #8B4513;
    border-radius: 8px;
    font-family: 'MedievalSharp', cursive;
    font-size: 14px;
    color: #2a1810;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
      0 3px 0 #654321,
      0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  .scroll-nav-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 5px 0 #654321,
      0 8px 15px rgba(0, 0, 0, 0.3);
  }
  
  .scroll-nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* 底部导航栏 */
  .reading-nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(15, 15, 35, 0.95) 0%, rgba(10, 10, 25, 0.98) 100%);
    backdrop-filter: blur(10px);
    border-top: 2px solid rgba(255, 215, 0, 0.3);
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
  }
  
  /* 响应式 */
  @media (max-width: 1000px) {
    .reading-book-container {
      width: 100%;
      height: auto;
      min-height: auto;
    }
    
    .reading-spine {
      display: none;
    }
    
    .reading-page {
      position: relative;
      width: 100%;
      min-height: 500px;
      margin-bottom: 20px;
      border-radius: 8px;
    }
  }
  
  @media (max-width: 600px) {
    .reading-content {
      padding: 25px 20px;
    }
    
    .manuscript-text {
      font-size: 16px;
    }
    
    .drop-cap {
      font-size: 3.5em;
    }
  }
```

**Step 2: 添加侧边栏样式**

```css
  /* 角色/情节侧边栏 */
  .cards-sidebar {
    position: fixed;
    right: 0;
    top: 80px;
    bottom: 60px;
    width: 280px;
    background: rgba(15, 15, 35, 0.98);
    border-left: 2px solid rgba(255, 215, 0, 0.3);
    transform: translateX(calc(100% - 40px));
    transition: transform 0.4s ease;
    z-index: 90;
    display: flex;
    flex-direction: column;
  }
  
  .cards-sidebar.expanded {
    transform: translateX(0);
  }
  
  .sidebar-toggle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
    width: 40px;
    height: 80px;
    background: rgba(15, 15, 35, 0.98);
    border: 2px solid rgba(255, 215, 0, 0.3);
    border-right: none;
    border-radius: 8px 0 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FFD700;
    font-size: 18px;
    transition: all 0.3s ease;
  }
  
  .sidebar-toggle:hover {
    background: rgba(255, 215, 0, 0.1);
  }
  
  .sidebar-toggle::before {
    content: '◀';
    transition: transform 0.3s ease;
  }
  
  .cards-sidebar.expanded .sidebar-toggle::before {
    content: '▶';
  }
  
  .sidebar-tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  }
  
  .sidebar-tab {
    flex: 1;
    padding: 12px;
    background: transparent;
    border: none;
    color: #a0a0a0;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
  }
  
  .sidebar-tab:hover {
    color: #FFD700;
  }
  
  .sidebar-tab.active {
    color: #FFD700;
    border-bottom-color: #FFD700;
    background: rgba(255, 215, 0, 0.05);
  }
  
  .sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
  }
  
  .sidebar-card-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .sidebar-card {
    padding: 12px;
    background: rgba(255, 215, 0, 0.05);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .sidebar-card:hover {
    background: rgba(255, 215, 0, 0.1);
    border-color: #FFD700;
  }
  
  .sidebar-card .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .sidebar-card .card-avatar {
    font-size: 24px;
  }
  
  .sidebar-card .card-name {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: #FFD700;
  }
  
  .sidebar-card .card-role {
    font-size: 11px;
    color: #a0a0a0;
    margin-top: 2px;
  }
  
  /* 侧边栏展开详情 */
  .sidebar-detail {
    display: none;
    padding: 15px;
    background: rgba(255, 215, 0, 0.08);
    border-radius: 8px;
    margin-top: 10px;
  }
  
  .sidebar-card.expanded .sidebar-detail {
    display: block;
  }
  
  .sidebar-detail .detail-desc {
    font-size: 12px;
    color: #d0d0d0;
    line-height: 1.6;
    margin-bottom: 10px;
  }
  
  .sidebar-detail .detail-chapters {
    font-size: 11px;
    color: #a0a0a0;
  }
  
  @media (max-width: 1200px) {
    .cards-sidebar {
      display: none;
    }
  }
```

**Step 3: 替换HTML主体结构**

将 `<div class="reading-page">` 及其内容替换为：

```html
<div class="book-reader-page">
  <div class="reading-book-container">
    <div class="reading-spine"></div>
    
    <!-- 左页 -->
    <div class="reading-page left" id="leftPage">
      <div class="parchment-bg"></div>
      <div class="page-wear corner-tl"></div>
      <div class="page-wear corner-bl"></div>
      <div class="progress-corner">📖 35%</div>
      <div class="reading-content">
        <div class="manuscript-title">
          <div class="chapter-num">CHAPTER III</div>
          <div class="chapter-name">The Mountain Pass</div>
        </div>
        
        <div class="manuscript-text">
          <p><span class="drop-cap">T</span>he path to the Dragon's lair led through treacherous mountain passes, where the wind howled like lost souls and the ground trembled with each step. <span class="character-highlight" data-character="1">Sir Galahad</span> tightened his grip on the ancient sword, its golden hilt warm against his palm.</p>
          
          <p>We must be careful," warned <span class="character-highlight" data-character="2">Lady Elara</span>, her eyes scanning the rocky terrain. "These mountains are home to creatures far older than the Dragon itself."</p>
          
          <div class="dialogue-block">
            <div class="speaker">Lady Elara:</div>
            <div class="speech">"The ancient texts speak of guardians that protect these peaks. They are neither friend nor foe, but test all who dare to pass."</div>
          </div>
          
          <p>Galahad nodded, his breath visible in the thin mountain air. Below them, the valley stretched out like a patchwork quilt of forests and rivers, the kingdom they had sworn to protect.</p>
        </div>
      </div>
    </div>
    
    <!-- 右页 -->
    <div class="reading-page right" id="rightPage">
      <div class="parchment-bg"></div>
      <div class="page-wear corner-tr"></div>
      <div class="page-wear corner-br"></div>
      <div class="reading-content">
        <div class="manuscript-text">
          <p>As they rounded a narrow bend, the ground suddenly shook. From the shadows emerged a figure in obsidian armor, his blade gleaming with an otherworldly darkness.</p>
          
          <div class="dialogue-block">
            <div class="speaker">Dark Knight:</div>
            <div class="speech">"Turn back, young one. None shall pass while I draw breath. The Dragon's secrets are not meant for mortal eyes."</div>
          </div>
          
          <div class="section-divider"></div>
          
          <p>The <span class="character-highlight" data-character="3">Dark Knight</span>'s challenge hung in the air like a curse. Galahad knew that violence alone would not win this day - he would need wisdom as sharp as his blade.</p>
          
          <p>The ancient <span class="character-highlight" data-character="4">Village Elder</span> had spoken of this guardian, the eternal sentinel who tested the hearts of those who sought the Dragon's treasure.</p>
          
          <div class="puzzle-trigger">
            <button class="scroll-nav-btn" onclick="showPuzzle()">
              🧩 Solve the Guardian's Riddle
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 角色/情节侧边栏 -->
<div class="cards-sidebar" id="cardsSidebar">
  <div class="sidebar-toggle" onclick="toggleSidebar()"></div>
  
  <div class="sidebar-tabs">
    <button class="sidebar-tab active" data-tab="characters" onclick="switchSidebarTab('characters')">👤 角色</button>
    <button class="sidebar-tab" data-tab="plots" onclick="switchSidebarTab('plots')">📜 情节</button>
  </div>
  
  <div class="sidebar-content">
    <div id="sidebarCharacters" class="sidebar-card-list">
      <!-- 角色列表由JS渲染 -->
    </div>
    <div id="sidebarPlots" class="sidebar-card-list" style="display: none;">
      <!-- 情节列表由JS渲染 -->
    </div>
  </div>
</div>

<!-- 底部导航 -->
<div class="reading-nav-bar">
  <button class="scroll-nav-btn" onclick="prevChapter()">
    ← Previous
  </button>
  <div style="color: #a0a0a0; font-family: 'Cinzel', serif;">
    Chapter 3 of 20
  </div>
  <button class="scroll-nav-btn" onclick="nextChapter()">
    Next →
  </button>
</div>
```

**Step 4: 添加侧边栏JavaScript逻辑**

```javascript
const chapterCharacters = [
  { id: 1, avatar: '🧙‍♂️', name: 'Sir Galahad', role: 'Protagonist', desc: 'A brave knight on a quest to save the kingdom.', chapters: '1, 2, 3, 4, 5' },
  { id: 2, avatar: '👸', name: 'Lady Elara', role: 'Supporter', desc: 'A wise sorceress who guides the hero.', chapters: '1, 2, 3, 5' },
  { id: 3, avatar: '⚔️', name: 'Dark Knight', role: 'Antagonist', desc: 'The mysterious guardian of the mountain pass.', chapters: '3, 4' },
  { id: 4, avatar: '👴', name: 'Village Elder', role: 'NPC', desc: 'An ancient sage who knows the old legends.', chapters: '1, 3' }
];

const chapterPlots = [
  { id: 1, icon: '🏔️', title: 'Mountain Crossing', desc: 'The treacherous journey through the peaks.' },
  { id: 2, icon: '⚔️', title: 'Guardian Encounter', desc: 'Face the Dark Knight\'s challenge.' },
  { id: 3, icon: '🧩', title: 'Riddle of Wisdom', desc: 'Prove your worth through intellect.' }
];

function toggleSidebar() {
  document.getElementById('cardsSidebar').classList.toggle('expanded');
}

function switchSidebarTab(tab) {
  document.querySelectorAll('.sidebar-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  
  document.getElementById('sidebarCharacters').style.display = tab === 'characters' ? 'flex' : 'none';
  document.getElementById('sidebarPlots').style.display = tab === 'plots' ? 'flex' : 'none';
}

function renderSidebarCards() {
  const charList = document.getElementById('sidebarCharacters');
  const plotList = document.getElementById('sidebarPlots');
  
  charList.innerHTML = chapterCharacters.map(char => `
    <div class="sidebar-card" onclick="toggleCardDetail(this)" data-id="${char.id}">
      <div class="card-header">
        <span class="card-avatar">${char.avatar}</span>
        <div>
          <div class="card-name">${char.name}</div>
          <div class="card-role">${char.role}</div>
        </div>
      </div>
      <div class="sidebar-detail">
        <div class="detail-desc">${char.desc}</div>
        <div class="detail-chapters">Appears in: Chapter ${char.chapters}</div>
      </div>
    </div>
  `).join('');
  
  plotList.innerHTML = chapterPlots.map(plot => `
    <div class="sidebar-card" onclick="toggleCardDetail(this)" data-id="${plot.id}">
      <div class="card-header">
        <span class="card-avatar">${plot.icon}</span>
        <div>
          <div class="card-name">${plot.title}</div>
          <div class="card-role">${plot.desc}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleCardDetail(card) {
  card.classList.toggle('expanded');
}

function initCharacterHighlights() {
  document.querySelectorAll('.character-highlight').forEach(el => {
    el.addEventListener('click', function() {
      const charId = this.dataset.character;
      const sidebar = document.getElementById('cardsSidebar');
      sidebar.classList.add('expanded');
      switchSidebarTab('characters');
      
      const card = sidebar.querySelector(`.sidebar-card[data-id="${charId}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('expanded');
        card.style.animation = 'pulse 0.5s ease';
        setTimeout(() => card.style.animation = '', 500);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  createParticles(document.getElementById('particles'), 20);
  renderSidebarCards();
  initCharacterHighlights();
});
```

**Step 5: 验证页面加载**

打开 `demo/chapter.html` 确认双页书本布局和侧边栏功能正常。

---

## Task 3: 添加Google Fonts字体

**Files:**
- Modify: `demo/css/variables.css`

**Step 1: 添加字体导入**

在 `variables.css` 文件顶部添加：

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=MedievalSharp&family=Spectral:ital,wght@0,400;0,600;1,400&family=Pirata+One&family=Dancing+Script:wght@400;600&display=swap');
```

**Step 2: 更新主题字体变量**

在 `.theme-adventure` 类中更新字体变量：

```css
--font-title: 'MedievalSharp', cursive;
--font-body: 'Spectral', serif;
--font-display: 'Cinzel Decorative', cursive;
--font-dropcap: 'Pirata One', cursive;
--font-dialogue: 'Dancing Script', cursive;
```

---

## Task 4: 启动服务器测试

**Step 1: 启动本地服务器**

Run: `cd d:\trae_job\storyBook\demo && python -m http.server 8080`

Expected: Server running on http://localhost:8080

**Step 2: 验证所有页面**

- 打开 http://localhost:8080/book.html 验证书本展开式布局
- 打开 http://localhost:8080/chapter.html 验证双页阅读布局和侧边栏

---

## 完成检查清单

- [ ] 书籍详情页：书本展开式布局
- [ ] 书籍详情页：羊皮纸纹理和边缘磨损效果
- [ ] 书籍详情页：视图切换（目录/角色/情节）
- [ ] 章节阅读页：双页书本布局
- [ ] 章节阅读页：中世纪手稿风格排版
- [ ] 章节阅读页：首字母装饰
- [ ] 章节阅读页：角色/情节侧边栏
- [ ] 章节阅读页：角色名高亮联动
- [ ] 章节阅读页：卷轴导航按钮
- [ ] 响应式布局适配
