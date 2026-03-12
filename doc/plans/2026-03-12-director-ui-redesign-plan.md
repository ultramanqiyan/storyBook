# 故事导演页UI重构实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 将当前Demo的故事导演页UI重构为历史项目的布局逻辑（左右两侧选择卡牌，中间舞台预览），同时保持中世纪复古风格。

**Architecture:** 采用三栏布局，左侧面板放置角色和冒险类型卡牌选择区，右侧面板放置地形、天气、装备卡牌选择区，中间舞台展示8槽位网格预览已选卡牌。所有卡牌选择区使用扇形展开布局。

**Tech Stack:** HTML, CSS, JavaScript (原生), 现有动画库

---

## Task 1: 重构HTML布局结构

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 修改三栏布局的grid配置**

将现有的 `grid-template-columns: 300px 1fr 280px` 改为 `420px 1fr 420px`，使左右面板宽度一致。

```css
.three-column-layout {
  display: grid;
  grid-template-columns: 420px 1fr 420px;
  gap: var(--spacing-lg);
  max-width: 1600px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}
```

**Step 2: 重构左侧面板HTML结构**

将左侧面板从"已选卡牌列表"改为"卡牌选择区"：

```html
<div class="left-panel">
  <div class="card-section">
    <div class="section-header character">👥 角色选择 (主角必选1，配角可选0-3)</div>
    <div class="fan-container" id="characterFan"></div>
  </div>
  <div class="card-section">
    <div class="section-header adventure">🗺️ 冒险类型 (必选1)</div>
    <div class="fan-container" id="adventureFan"></div>
  </div>
</div>
```

**Step 3: 重构右侧面板HTML结构**

将右侧面板从"卡牌收藏网格"改为"卡牌选择区"：

```html
<div class="right-panel">
  <div class="card-section">
    <div class="section-header terrain">🏔️ 地形 (必选1)</div>
    <div class="fan-container" id="terrainFan"></div>
  </div>
  <div class="card-section">
    <div class="section-header weather">🌤️ 天气 (必选1)</div>
    <div class="fan-container" id="weatherFan"></div>
  </div>
  <div class="card-section">
    <div class="section-header equipment">🎒 装备 (可选0-1)</div>
    <div class="fan-container" id="equipmentFan"></div>
  </div>
</div>
```

**Step 4: 重构中间舞台HTML结构**

将中间舞台从"扇形卡牌展示"改为"8槽位网格"：

```html
<div class="center-stage">
  <div class="stage-curtain"></div>
  <div class="stage-area" id="stageArea">
    <div class="spotlight"></div>
    <div class="stage-title">🎭 舞台预览</div>
    <div class="stage-grid">
      <div class="stage-slot required" data-slot="protagonist">
        <span class="slot-label">主角</span>
        <span class="slot-required">(必选)</span>
      </div>
      <div class="stage-slot" data-slot="supporting1">
        <span class="slot-label">配角1</span>
        <span class="slot-optional">(可选)</span>
      </div>
      <div class="stage-slot" data-slot="supporting2">
        <span class="slot-label">配角2</span>
        <span class="slot-optional">(可选)</span>
      </div>
      <div class="stage-slot" data-slot="supporting3">
        <span class="slot-label">配角3</span>
        <span class="slot-optional">(可选)</span>
      </div>
      <div class="stage-slot required" data-slot="adventure">
        <span class="slot-label">冒险类型</span>
        <span class="slot-required">(必选)</span>
      </div>
      <div class="stage-slot required" data-slot="weather">
        <span class="slot-label">天气</span>
        <span class="slot-required">(必选)</span>
      </div>
      <div class="stage-slot required" data-slot="terrain">
        <span class="slot-label">地形</span>
        <span class="slot-required">(必选)</span>
      </div>
      <div class="stage-slot" data-slot="equipment">
        <span class="slot-label">装备</span>
        <span class="slot-optional">(可选)</span>
      </div>
    </div>
  </div>
  
  <div class="action-area">
    <div class="selection-status">
      Selected: <span id="selectedCount">0</span> / 5 required items
    </div>
    <button class="hearthstone-btn" id="startBtn" onclick="startProduction()" disabled>
      🎬 Start Production
    </button>
  </div>
</div>
```

**Step 5: 验证HTML结构**

在浏览器中打开页面，确认布局结构正确显示。

---

## Task 2: 添加扇形卡牌选择区CSS样式

**Files:**
- Modify: `src/frontend/director.html` (style section)

**Step 1: 添加卡牌分区样式**

```css
.card-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.section-header {
  font-family: var(--font-title);
  font-size: 14px;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-xs);
  text-align: center;
}

.section-header.character { background: rgba(147, 112, 219, 0.2); color: #9370DB; }
.section-header.adventure { background: rgba(255, 165, 0, 0.2); color: #FFA500; }
.section-header.terrain { background: rgba(139, 90, 43, 0.2); color: #8B5A2B; }
.section-header.weather { background: rgba(135, 206, 250, 0.2); color: #87CEFA; }
.section-header.equipment { background: rgba(192, 192, 192, 0.2); color: #C0C0C0; }
```

**Step 2: 添加扇形容器样式**

```css
.fan-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 110px;
  position: relative;
  padding-bottom: 5px;
}

.fan-card {
  width: 85px;
  height: 125px;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: bottom center;
  background: linear-gradient(180deg, #2d2d44, #1a1a2e);
  border: 2px solid rgba(255, 215, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.fan-card:hover {
  transform: translateY(-50px) scale(1.25) rotate(0deg) !important;
  z-index: 300 !important;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.3);
}

.fan-card.selected {
  animation: heartbeat 0.8s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4), 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 200 !important;
}

@keyframes heartbeat {
  0%, 100% { transform: rotate(0deg) translateY(-25px) scale(1); }
  15% { transform: rotate(0deg) translateY(-25px) scale(1.08); }
  30% { transform: rotate(0deg) translateY(-25px) scale(1); }
  45% { transform: rotate(0deg) translateY(-25px) scale(1.05); }
  60% { transform: rotate(0deg) translateY(-25px) scale(1); }
}

.fan-card.selected::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 14px;
  background: linear-gradient(45deg, var(--color-gold), transparent, var(--color-gold));
  animation: border-rotate 2s linear infinite;
  z-index: -1;
}

@keyframes border-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.fan-avatar {
  font-size: 28px;
  margin-bottom: 4px;
}

.fan-name {
  font-size: 10px;
  font-family: var(--font-title);
  color: var(--color-gold);
  text-align: center;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.role-tag {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 8px;
  background: rgba(255, 215, 0, 0.3);
  padding: 2px 4px;
  border-radius: 3px;
  color: var(--color-gold);
}
```

**Step 3: 验证CSS样式**

刷新页面，确认扇形卡牌样式正确应用。

---

## Task 3: 添加舞台槽位网格CSS样式

**Files:**
- Modify: `src/frontend/director.html` (style section)

**Step 1: 添加舞台区域样式**

```css
.stage-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 400px;
  padding: var(--spacing-lg);
}

.stage-title {
  font-family: var(--font-title);
  font-size: 18px;
  color: var(--color-gold);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
  width: 100%;
  max-width: 500px;
}

.stage-slot {
  aspect-ratio: 3/4;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
}

.stage-slot.required {
  border-color: rgba(255, 215, 0, 0.4);
  animation: slot-glow 2s ease-in-out infinite;
}

@keyframes slot-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.2); }
  50% { box-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
}

.stage-slot.filled {
  border: none;
  background: linear-gradient(180deg, #2d2d44, #1a1a2e);
  border: 2px solid rgba(255, 215, 0, 0.5);
}

.stage-slot .slot-label {
  font-family: var(--font-title);
  font-size: 12px;
  color: var(--color-text);
}

.stage-slot .slot-required {
  font-size: 10px;
  color: var(--color-gold);
  margin-top: 4px;
}

.stage-slot .slot-optional {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.stage-slot .slot-avatar {
  font-size: 24px;
  margin-bottom: 4px;
}

.stage-slot .slot-name {
  font-size: 10px;
  font-family: var(--font-title);
  color: var(--color-gold);
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stage-area.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
}
```

**Step 2: 验证舞台样式**

刷新页面，确认舞台槽位网格样式正确显示。

---

## Task 4: 重构JavaScript卡牌选择逻辑

**Files:**
- Modify: `src/frontend/director.html` (script section)

**Step 1: 更新数据结构**

```javascript
const selections = {
  protagonist: null,
  supporting: [],
  adventure: null,
  terrain: null,
  weather: null,
  equipment: null
};
```

**Step 2: 添加扇形卡牌创建函数**

```javascript
function createFanCards(container, cards, type, maxSelect) {
  container.innerHTML = '';
  
  const count = cards.length;
  const fanAngle = Math.min(count * 8, 80);
  const startAngle = -fanAngle / 2;
  const angleStep = count > 1 ? fanAngle / (count - 1) : 0;
  
  cards.forEach((card, index) => {
    const div = document.createElement('div');
    const cardType = card.role || type;
    div.className = 'fan-card ' + cardType;
    div.dataset.id = card.id || card.char_id;
    div.dataset.type = card.role || type;
    if (card.effect) div.dataset.effect = card.effect;
    
    const angle = startAngle + angleStep * index;
    const offsetX = (index - (count - 1) / 2) * 22;
    
    div.style.left = '50%';
    div.style.marginLeft = (-42 + offsetX) + 'px';
    div.style.transform = 'rotate(' + angle + 'deg)';
    div.style.zIndex = index;
    
    let roleLabel = '';
    if (card.role === 'protagonist') roleLabel = '<span class="role-tag">主角</span>';
    else if (card.role === 'supporting') roleLabel = '<span class="role-tag">配角</span>';
    
    div.innerHTML = roleLabel + '<div class="fan-avatar">' + (card.avatar || card.icon || '⭐') + '</div><div class="fan-name">' + card.name + '</div>';
    
    const originalAngle = angle;
    
    div.addEventListener('click', function() {
      selectCard(card, card.role || type, maxSelect);
    });
    
    div.addEventListener('mouseleave', function() {
      if (!this.classList.contains('selected')) {
        this.style.transform = 'rotate(' + originalAngle + 'deg)';
      }
    });
    
    container.appendChild(div);
  });
}
```

**Step 3: 添加卡牌选择函数**

```javascript
function selectCard(card, type, maxSelect) {
  const stage = document.getElementById('stageArea');
  stage.classList.add('shake');
  setTimeout(() => stage.classList.remove('shake'), 500);
  
  if (type === 'protagonist') {
    if (selections.protagonist && selections.protagonist.id === card.id) {
      selections.protagonist = null;
      showNotification('Deselected: ' + card.name, 'info');
    } else {
      selections.protagonist = card;
      showNotification('Selected: ' + card.name, 'success');
    }
  } else if (type === 'supporting') {
    const idx = selections.supporting.findIndex(c => c.id === card.id);
    if (idx > -1) {
      selections.supporting.splice(idx, 1);
      showNotification('Deselected: ' + card.name, 'info');
    } else if (selections.supporting.length < 3) {
      selections.supporting.push(card);
      showNotification('Selected: ' + card.name, 'success');
    } else {
      showNotification('Maximum 3 supporting characters', 'error');
      return;
    }
  } else if (type === 'adventure' || type === 'terrain' || type === 'weather' || type === 'equipment') {
    if (selections[type] && selections[type].id === card.id) {
      selections[type] = null;
      showNotification('Deselected: ' + card.name, 'info');
      if (type === 'weather') clearWeatherEffect();
    } else {
      selections[type] = card;
      showNotification('Selected: ' + card.name, 'success');
      if (type === 'weather' && card.effect) {
        triggerWeatherEffect(card.effect);
      }
    }
  }
  
  updateStage();
  updateFanCards();
  updateStartButton();
}
```

**Step 4: 添加舞台更新函数**

```javascript
function updateStage() {
  const slots = {
    protagonist: document.querySelector('[data-slot="protagonist"]'),
    supporting1: document.querySelector('[data-slot="supporting1"]'),
    supporting2: document.querySelector('[data-slot="supporting2"]'),
    supporting3: document.querySelector('[data-slot="supporting3"]'),
    adventure: document.querySelector('[data-slot="adventure"]'),
    weather: document.querySelector('[data-slot="weather"]'),
    terrain: document.querySelector('[data-slot="terrain"]'),
    equipment: document.querySelector('[data-slot="equipment"]')
  };
  
  if (selections.protagonist) {
    slots.protagonist.classList.add('filled');
    slots.protagonist.innerHTML = `
      <div class="slot-avatar">${selections.protagonist.avatar || '👤'}</div>
      <div class="slot-name">${selections.protagonist.name}</div>
    `;
  } else {
    slots.protagonist.classList.remove('filled');
    slots.protagonist.innerHTML = '<span class="slot-label">主角</span><span class="slot-required">(必选)</span>';
  }
  
  for (let i = 0; i < 3; i++) {
    const slot = slots['supporting' + (i + 1)];
    const card = selections.supporting[i];
    if (card) {
      slot.classList.add('filled');
      slot.innerHTML = `
        <div class="slot-avatar">${card.avatar || '👥'}</div>
        <div class="slot-name">${card.name}</div>
      `;
    } else {
      slot.classList.remove('filled');
      slot.innerHTML = '<span class="slot-label">配角' + (i + 1) + '</span><span class="slot-optional">(可选)</span>';
    }
  }
  
  ['adventure', 'weather', 'terrain', 'equipment'].forEach(type => {
    const slot = slots[type];
    const card = selections[type];
    const labels = {
      adventure: '冒险类型',
      weather: '天气',
      terrain: '地形',
      equipment: '装备'
    };
    const isRequired = type !== 'equipment';
    
    if (card) {
      slot.classList.add('filled');
      slot.innerHTML = `
        <div class="slot-avatar">${card.avatar || card.icon || '⭐'}</div>
        <div class="slot-name">${card.name}</div>
      `;
    } else {
      slot.classList.remove('filled');
      slot.innerHTML = `<span class="slot-label">${labels[type]}</span><span class="${isRequired ? 'slot-required' : 'slot-optional'}">(${isRequired ? '必选' : '可选'})</span>`;
    }
  });
}
```

**Step 5: 添加扇形卡牌选中状态更新函数**

```javascript
function updateFanCards() {
  document.querySelectorAll('.fan-card').forEach(card => {
    const id = card.dataset.id;
    const type = card.dataset.type;
    
    let isSelected = false;
    if (type === 'protagonist' && selections.protagonist && selections.protagonist.id === id) {
      isSelected = true;
    } else if (type === 'supporting' && selections.supporting.some(c => c.id === id)) {
      isSelected = true;
    } else if (['adventure', 'terrain', 'weather', 'equipment'].includes(type) && selections[type] && selections[type].id === id) {
      isSelected = true;
    }
    
    if (isSelected) {
      card.classList.add('selected');
      card.style.transform = 'rotate(0deg) translateY(-25px)';
    } else {
      card.classList.remove('selected');
    }
  });
}
```

**Step 6: 添加开始按钮状态更新函数**

```javascript
function updateStartButton() {
  let count = 0;
  if (selections.protagonist) count++;
  if (selections.adventure) count++;
  if (selections.weather) count++;
  if (selections.terrain) count++;
  
  document.getElementById('selectedCount').textContent = count;
  
  const requiredSelected = selections.protagonist && selections.adventure && selections.weather && selections.terrain;
  document.getElementById('startBtn').disabled = !requiredSelected;
}
```

**Step 7: 验证JavaScript逻辑**

刷新页面，测试卡牌选择功能是否正常工作。

---

## Task 5: 重构数据加载和初始化逻辑

**Files:**
- Modify: `src/frontend/director.html` (script section)

**Step 1: 更新loadCards函数**

```javascript
async function loadCards() {
  try {
    const response = await fetch(`/api/plot-cards?book_id=${bookId}`);
    const result = await response.json();
    
    if (result.success) {
      allCards = result.data || [];
      
      weatherCards = allCards.filter(c => c.sub_type === 'weather');
      terrainCards = allCards.filter(c => c.sub_type === 'terrain');
      adventureCards = allCards.filter(c => c.sub_type === 'adventure');
      equipmentCards = allCards.filter(c => c.sub_type === 'equipment');
      
      renderAllFanCards();
    }
  } catch (error) {
    console.error('Load cards failed:', error);
  }
}
```

**Step 2: 添加渲染所有扇形卡牌函数**

```javascript
function renderAllFanCards() {
  const characterCards = [
    ...protagonistCards.map(c => ({ ...c, role: 'protagonist' })),
    ...supportingCards.map(c => ({ ...c, role: 'supporting' }))
  ];
  
  createFanCards(document.getElementById('characterFan'), characterCards, 'character', 4);
  createFanCards(document.getElementById('adventureFan'), 
    adventureCards.map(c => ({ id: c.card_id, name: c.name, avatar: c.icon, effect: c.card_id })), 
    'adventure', 1);
  createFanCards(document.getElementById('terrainFan'), 
    terrainCards.map(c => ({ id: c.card_id, name: c.name, avatar: c.icon })), 
    'terrain', 1);
  createFanCards(document.getElementById('weatherFan'), 
    weatherCards.map(c => ({ id: c.card_id, name: c.name, avatar: c.icon, effect: c.card_id })), 
    'weather', 1);
  createFanCards(document.getElementById('equipmentFan'), 
    equipmentCards.map(c => ({ id: c.card_id, name: c.name, avatar: c.icon })), 
    'equipment', 1);
}
```

**Step 3: 更新DOMContentLoaded事件处理**

```javascript
document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 30);
  await loadCharacters();
  await loadCards();
  
  document.getElementById('navBack').href = `/book?id=${bookId}`;
});
```

**Step 4: 验证数据加载**

刷新页面，确认所有卡牌正确加载并显示在扇形区域。

---

## Task 6: 更新startProduction函数

**Files:**
- Modify: `src/frontend/director.html` (script section)

**Step 1: 更新startProduction函数**

```javascript
async function startProduction() {
  if (!selections.protagonist) {
    showNotification('Please select a protagonist', 'error');
    return;
  }
  if (!selections.adventure) {
    showNotification('Please select an adventure card', 'error');
    return;
  }
  if (!selections.weather) {
    showNotification('Please select a weather card', 'error');
    return;
  }
  if (!selections.terrain) {
    showNotification('Please select a terrain card', 'error');
    return;
  }
  
  document.getElementById('loadingOverlay').classList.add('active');
  
  try {
    const response = await fetch('/api/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        book_id: bookId,
        user_id: localStorage.getItem('userId'),
        selected_cards: {
          protagonist_id: selections.protagonist?.id || selections.protagonist?.char_id,
          supporting_ids: selections.supporting.map(c => c.id || c.char_id),
          adventure_id: selections.adventure?.id,
          weather_id: selections.weather?.id,
          terrain_id: selections.terrain?.id,
          equipment_id: selections.equipment?.id
        }
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      document.getElementById('loadingOverlay').classList.remove('active');
      showNotification('Chapter created successfully!', 'success');
      setTimeout(() => {
        window.location.href = `/chapter?id=${result.data.chapter.chapter_id}`;
      }, 1000);
    } else {
      document.getElementById('loadingOverlay').classList.remove('active');
      showNotification(result.error || 'Creation failed', 'error');
    }
  } catch (error) {
    document.getElementById('loadingOverlay').classList.remove('active');
    showNotification('Network error', 'error');
  }
}
```

**Step 2: 验证startProduction功能**

测试创建章节功能是否正常工作。

---

## Task 7: 添加天气特效功能

**Files:**
- Modify: `src/frontend/director.html` (style and script sections)

**Step 1: 添加天气特效HTML元素**

在 `.stage-area` 内添加天气特效容器：

```html
<div class="stage-area" id="stageArea">
  <div class="spotlight"></div>
  <div class="weather-effects">
    <div class="sun-rays" id="sunRays" style="display: none;"></div>
    <div class="sun-orb" id="sunOrb" style="display: none;"></div>
    <div class="sun-rays-beam" id="sunRaysBeam" style="display: none;"></div>
    <div class="rain" id="rain" style="display: none;"></div>
    <div class="thunder" id="thunder"></div>
    <div class="snow" id="snow" style="display: none;"></div>
    <div class="fog" id="fog" style="display: none;"></div>
    <div class="wind" id="wind" style="display: none;"></div>
    <div class="rainbow" id="rainbow" style="display: none;"></div>
    <div class="starry" id="starry" style="display: none;"></div>
  </div>
  <div class="stage-title">🎭 舞台预览</div>
  <div class="stage-grid">
    <!-- ... -->
  </div>
</div>
```

**Step 2: 添加天气特效CSS样式**

```css
.weather-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.rain-drop {
  position: absolute;
  width: 2px;
  height: 20px;
  background: linear-gradient(180deg, transparent, rgba(174, 194, 224, 0.5));
  animation: rain-fall 0.5s linear infinite;
}

@keyframes rain-fall {
  0% { transform: translateY(-20px); }
  100% { transform: translateY(100vh); }
}

.snowflake {
  position: absolute;
  color: white;
  font-size: 1rem;
  animation: snow-fall 3s linear infinite;
  opacity: 0.8;
}

@keyframes snow-fall {
  0% { transform: translateY(-10px) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
}

.thunder.flash { animation: thunder-flash 0.5s ease-out; }

@keyframes thunder-flash {
  0% { opacity: 0; }
  10% { opacity: 0.8; }
  20% { opacity: 0.2; }
  30% { opacity: 0.9; }
  40% { opacity: 0; }
  100% { opacity: 0; }
}

.wind-particle {
  position: absolute;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: wind-blow 1s linear infinite;
}

@keyframes wind-blow {
  0% { transform: translateX(-100px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100vw); opacity: 0; }
}
```

**Step 3: 添加天气特效触发函数**

```javascript
let currentWeatherEffect = null;

function triggerWeatherEffect(effect) {
  clearWeatherEffect();
  currentWeatherEffect = effect;
  
  if (effect === 'sunny' || effect === 'sun') {
    document.getElementById('sunRays').style.display = 'block';
    document.getElementById('sunOrb').style.display = 'block';
  } else if (effect === 'rainy' || effect === 'rain') {
    const rain = document.getElementById('rain');
    rain.innerHTML = '';
    for (let i = 0; i < 80; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDelay = Math.random() * 0.5 + 's';
      drop.style.animationDuration = (0.4 + Math.random() * 0.3) + 's';
      rain.appendChild(drop);
    }
    rain.style.display = 'block';
  } else if (effect === 'thunder') {
    const thunder = document.getElementById('thunder');
    const rain = document.getElementById('rain');
    rain.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDelay = Math.random() * 0.5 + 's';
      drop.style.animationDuration = (0.3 + Math.random() * 0.3) + 's';
      rain.appendChild(drop);
    }
    rain.style.display = 'block';
    
    function flashThunder() {
      if (currentWeatherEffect !== 'thunder') return;
      thunder.classList.add('flash');
      setTimeout(() => thunder.classList.remove('flash'), 500);
      setTimeout(flashThunder, 2000 + Math.random() * 3000);
    }
    flashThunder();
  } else if (effect === 'snow') {
    const snow = document.getElementById('snow');
    snow.innerHTML = '';
    for (let i = 0; i < 50; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.textContent = '❄';
      flake.style.left = Math.random() * 100 + '%';
      flake.style.animationDelay = Math.random() * 3 + 's';
      flake.style.animationDuration = (2 + Math.random() * 2) + 's';
      flake.style.fontSize = (0.5 + Math.random() * 0.8) + 'rem';
      snow.appendChild(flake);
    }
    snow.style.display = 'block';
  }
}

function clearWeatherEffect() {
  currentWeatherEffect = null;
  document.getElementById('sunRays').style.display = 'none';
  document.getElementById('sunOrb').style.display = 'none';
  document.getElementById('sunRaysBeam').style.display = 'none';
  document.getElementById('rain').style.display = 'none';
  document.getElementById('snow').style.display = 'none';
  document.getElementById('fog').style.display = 'none';
  document.getElementById('wind').style.display = 'none';
  document.getElementById('rainbow').style.display = 'none';
  document.getElementById('starry').style.display = 'none';
}
```

**Step 4: 验证天气特效**

测试选择不同天气卡牌时特效是否正确显示。

---

## Task 8: 更新响应式设计

**Files:**
- Modify: `src/frontend/director.html` (style section)

**Step 1: 更新响应式CSS**

```css
@media (max-width: 1400px) {
  .three-column-layout {
    grid-template-columns: 350px 1fr 350px;
  }
}

@media (max-width: 1200px) {
  .three-column-layout {
    grid-template-columns: 1fr;
  }
  
  .left-panel, .right-panel {
    position: static;
  }
  
  .stage-grid {
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .fan-card {
    width: 70px;
    height: 100px;
  }
  
  .fan-avatar {
    font-size: 22px;
  }
  
  .fan-name {
    font-size: 8px;
  }
  
  .stage-slot {
    min-height: 80px;
  }
  
  .hearthstone-btn {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: 16px;
  }
}
```

**Step 2: 验证响应式设计**

在不同屏幕尺寸下测试页面布局是否正确。

---

## Task 9: 最终验证和测试

**Files:**
- Test: `src/frontend/director.html`

**Step 1: 功能测试清单**

- [ ] 左侧面板显示角色和冒险类型扇形卡牌
- [ ] 右侧面板显示地形、天气、装备扇形卡牌
- [ ] 中间舞台显示8槽位网格
- [ ] 点击扇形卡牌可以选中/取消选中
- [ ] 选中卡牌后舞台槽位正确填充
- [ ] 必选槽位显示金色发光动画
- [ ] 开始按钮在必选项选中后启用
- [ ] 天气特效正确触发
- [ ] 响应式布局在不同屏幕尺寸下正常工作

**Step 2: 提交代码**

```bash
git add src/frontend/director.html doc/design/2026-03-12-director-ui-redesign.md
git commit -m "feat: refactor director page UI to match historical layout with medieval style"
```
