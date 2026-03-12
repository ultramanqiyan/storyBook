# 添加章节流程修复实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修复"添加章节"功能，使前端与后端API正确对接，实现章节生成功能。

**Architecture:** 修改前端director.html的API调用和参数结构，修改后端chapters.js生成章节标题和内容，采用TDD方式确保功能正确。

**Tech Stack:** 原生JavaScript, Cloudflare Pages Functions, D1数据库

---

## Task 1: 修改后端 - 添加章节生成函数

**Files:**
- Modify: `functions/api/chapters.js`

**Step 1: 添加章节标题生成函数**

在 `chapters.js` 文件顶部，`puzzleTemplates` 定义之后添加：

```javascript
const chapterTitleTemplates = {
  adventure: ['神秘的开端', '森林探险', '山洞探秘', '宝藏发现', '勇士归来', '新的旅程', '神秘信号', '古老遗迹', '最终试炼', '凯旋而归'],
  fantasy: ['魔法觉醒', '龙之巢穴', '精灵森林', '黑暗降临', '光明重现', '元素试炼', '魔法对决', '命运交织', '神器现世', '传奇诞生'],
  romance: ['初遇', '心动', '误会', '和解', '永恒', '重逢', '告白', '约定', '考验', '幸福'],
  business: ['初入职场', '项目启动', '危机处理', '团队合作', '成功突破', '重要决策', '关键谈判', '领导力', '创新思维', '事业巅峰']
};

function generateChapterTitle(bookType, orderNum) {
  const templates = chapterTitleTemplates[bookType] || chapterTitleTemplates.adventure;
  return templates[(orderNum - 1) % templates.length];
}
```

**Step 2: 添加章节内容生成函数**

在 `generateChapterTitle` 函数之后添加：

```javascript
function generateChapterContent(bookType, selectedCardsInfo) {
  const protagonist = selectedCardsInfo.protagonist?.name || '主角';
  const weather = selectedCardsInfo.weather?.name || '晴天';
  const terrain = selectedCardsInfo.terrain?.name || '森林';
  const adventure = selectedCardsInfo.adventure?.name || '探险';
  const equipment = selectedCardsInfo.equipment?.name || '指南针';
  
  const templates = {
    adventure: `${weather}的日子里，${protagonist}来到了${terrain}。这里充满了神秘和未知，${protagonist}拿出${equipment}，开始了${adventure}之旅。周围的景色令人叹为观止，每一步都充满惊喜。在这片神奇的土地上，${protagonist}将会遇到什么样的挑战呢？让我们拭目以待...`,
    fantasy: `在${weather}的笼罩下，${protagonist}踏入了${terrain}。${equipment}在手中闪闪发光，预示着即将到来的${adventure}。空气中弥漫着魔法的气息，每一步都可能触发古老的咒语。${protagonist}深吸一口气，准备迎接命运的挑战...`,
    romance: `${weather}的午后，${protagonist}漫步在${terrain}。手中紧握着${equipment}，心中期待着一场${adventure}。这里的一切都那么美好，仿佛时间都慢了下来。${protagonist}不知道的是，命运的齿轮已经开始转动...`,
    business: `${weather}，${protagonist}来到了${terrain}。今天有一场重要的${adventure}在等待着。${protagonist}整理好${equipment}，深吸一口气，推开了那扇门。新的挑战，新的机遇，一切都将从这里开始...`
  };
  
  return templates[bookType] || templates.adventure;
}
```

**Step 3: 添加获取卡牌信息函数**

在 `generateChapterContent` 函数之后添加：

```javascript
async function getCardInfo(env, cardId, cardType) {
  if (!cardId) return null;
  
  if (cardType === 'character') {
    return await env.DB.prepare(
      'SELECT char_id, name, avatar FROM characters WHERE char_id = ?'
    ).bind(cardId).first();
  } else {
    return await env.DB.prepare(
      'SELECT card_id, name, icon FROM plot_cards WHERE card_id = ?'
    ).bind(cardId).first();
  }
}
```

**Step 4: Commit**

```bash
git add functions/api/chapters.js
git commit -m "feat: add chapter title and content generation functions"
```

---

## Task 2: 修改后端 - 重构POST接口

**Files:**
- Modify: `functions/api/chapters.js`

**Step 1: 重构onRequestPost函数**

将 `onRequestPost` 函数替换为：

```javascript
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { user_id, book_id, selected_cards } = body;
    const { protagonist_id, supporting_ids, weather_id, terrain_id, adventure_id, equipment_id } = selected_cards || {};

    if (!user_id) {
      return createErrorResponse('请先登录');
    }

    if (!book_id) {
      return createErrorResponse('book_id不能为空');
    }

    if (!protagonist_id) {
      return createErrorResponse('必须选择主角');
    }

    if (!weather_id || !terrain_id || !adventure_id || !equipment_id) {
      return createErrorResponse('必须选择天气、地形、冒险类型和装备卡牌');
    }

    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(book_id).first();

    if (!book) {
      return createErrorResponse('书籍不存在');
    }

    if (book.is_preset === 1) {
      return createErrorResponse('预设书籍不能添加章节');
    }

    if (book.user_id !== user_id) {
      return createErrorResponse('没有权限操作此书籍');
    }

    const cardLimitInfo = [];
    const cardTypes = [
      { id: weather_id, type: 'weather' },
      { id: terrain_id, type: 'terrain' },
      { id: adventure_id, type: 'adventure' },
      { id: equipment_id, type: 'equipment' }
    ];

    for (const card of cardTypes) {
      if (card.id) {
        const cardInfo = await env.DB.prepare(
          'SELECT sub_type FROM plot_cards WHERE card_id = ?'
        ).bind(card.id).first();
        
        if (cardInfo) {
          const isAtLimit = await checkCardLimit(env, book_id, cardInfo.sub_type);
          if (isAtLimit) {
            const existingCards = await getCardsByType(env, book_id, cardInfo.sub_type);
            cardLimitInfo.push({
              sub_type: cardInfo.sub_type,
              cards: existingCards
            });
          }
        }
      }
    }

    const maxOrder = await env.DB.prepare(
      'SELECT MAX(order_num) as max_order FROM chapters WHERE book_id = ?'
    ).bind(book_id).first();

    const orderNum = (maxOrder?.max_order || 0) + 1;
    const chapterId = generateId();

    const title = generateChapterTitle(book.type, orderNum);
    
    const selectedCardsInfo = {
      protagonist: await getCardInfo(env, protagonist_id, 'character'),
      weather: await getCardInfo(env, weather_id, 'plot'),
      terrain: await getCardInfo(env, terrain_id, 'plot'),
      adventure: await getCardInfo(env, adventure_id, 'plot'),
      equipment: await getCardInfo(env, equipment_id, 'plot')
    };
    
    const content = generateChapterContent(book.type, selectedCardsInfo);

    const cardsData = {
      protagonist_id,
      supporting_ids: supporting_ids || [],
      weather_id,
      terrain_id,
      adventure_id,
      equipment_id
    };

    await env.DB.prepare(
      'INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(chapterId, book_id, title, content, JSON.stringify(cardsData), orderNum).run();

    const puzzleId = await createPuzzleForChapter(env, chapterId, book.type);

    const updatedIntimacy = [];
    if (protagonist_id && supporting_ids && supporting_ids.length > 0) {
      for (const charId of supporting_ids) {
        const randomChange = Math.floor(Math.random() * 21) - 10;
        await env.DB.prepare(
          'UPDATE characters SET intimacy = MAX(-100, MIN(100, intimacy + ?)) WHERE char_id = ?'
        ).bind(randomChange, charId).run();
        
        const updatedChar = await env.DB.prepare(
          'SELECT char_id, intimacy FROM characters WHERE char_id = ?'
        ).bind(charId).first();
        
        updatedIntimacy.push({
          char_id: updatedChar.char_id,
          intimacy: updatedChar.intimacy
        });
      }
    }

    const puzzle = await env.DB.prepare(
      'SELECT puzzle_id, question, puzzle_type FROM puzzles WHERE puzzle_id = ?'
    ).bind(puzzleId).first();

    return createSuccessResponse({
      chapter: {
        chapter_id: chapterId,
        title: title,
        content: content,
        order_num: orderNum
      },
      puzzle: {
        puzzle_id: puzzle.puzzle_id,
        question: puzzle.question,
        puzzle_type: puzzle.puzzle_type
      },
      updated_intimacy: updatedIntimacy,
      card_limit_warning: cardLimitInfo.length > 0 ? cardLimitInfo : undefined
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}
```

**Step 2: Commit**

```bash
git add functions/api/chapters.js
git commit -m "refactor: update POST /api/chapters to generate title and content"
```

---

## Task 3: 修改前端 - 更新数据结构

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 修改selectedCards数据结构**

找到 `selectedCards` 定义（约第94-100行），替换为：

```javascript
const selectedCards = {
    protagonist: null,
    supporting: [],
    weather: null,
    terrain: null,
    adventure: null,
    equipment: null
};
```

**Step 2: 修改allCards变量定义**

找到 `allCards` 相关变量定义（约第102-107行），添加角色卡牌变量：

```javascript
let allCards = [];
let protagonistCards = [];
let supportingCards = [];
let weatherCards = [];
let terrainCards = [];
let adventureCards = [];
let equipmentCards = [];
```

**Step 3: Commit**

```bash
git add src/frontend/director.html
git commit -m "refactor: update selectedCards data structure for protagonist/supporting"
```

---

## Task 4: 修改前端 - 更新卡牌加载逻辑

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 添加角色卡牌加载函数**

在 `loadCards` 函数之前添加：

```javascript
async function loadCharacters() {
    try {
        const response = await fetch(`/api/books/${bookId}/characters`);
        const result = await response.json();
        
        if (result.success) {
            const characters = result.data?.characters || result.data || [];
            protagonistCards = characters.filter(c => c.is_protagonist === 1 || c.is_protagonist === true);
            supportingCards = characters.filter(c => c.is_protagonist === 0 || c.is_protagonist === false);
        }
    } catch (error) {
        console.error('加载角色失败:', error);
    }
}
```

**Step 2: 修改loadCards函数**

将 `loadCards` 函数替换为：

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
            
            renderCardGrid();
            renderCardFan();
        }
    } catch (error) {
        console.error('加载卡牌失败:', error);
    }
}
```

**Step 3: 修改DOMContentLoaded事件处理**

找到 `DOMContentLoaded` 事件处理（约第277-282行），修改为：

```javascript
document.addEventListener('DOMContentLoaded', async function() {
    createParticles(document.getElementById('particles'), 30);
    await loadCharacters();
    await loadCards();
    
    document.getElementById('navBack').href = `/book?id=${bookId}`;
});
```

**Step 4: Commit**

```bash
git add src/frontend/director.html
git commit -m "feat: add character loading and update plot cards loading"
```

---

## Task 5: 修改前端 - 更新UI选择槽位

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 修改选择槽位HTML**

找到左侧面板的选择列表（约第28-54行），替换为：

```html
<ul class="selected-list">
    <li class="selected-item">
        <span class="slot-icon">👤</span>
        <span class="slot-name">主角</span>
        <span class="slot-value" id="selected-protagonist">未选择</span>
    </li>
    <li class="selected-item">
        <span class="slot-icon">👥</span>
        <span class="slot-name">配角</span>
        <span class="slot-value" id="selected-supporting">未选择</span>
    </li>
    <li class="selected-item">
        <span class="slot-icon">🌤️</span>
        <span class="slot-name">天气</span>
        <span class="slot-value" id="selected-weather">未选择</span>
    </li>
    <li class="selected-item">
        <span class="slot-icon">🏔️</span>
        <span class="slot-name">地形</span>
        <span class="slot-value" id="selected-terrain">未选择</span>
    </li>
    <li class="selected-item">
        <span class="slot-icon">⚔️</span>
        <span class="slot-name">冒险</span>
        <span class="slot-value" id="selected-adventure">未选择</span>
    </li>
    <li class="selected-item">
        <span class="slot-icon">🎒</span>
        <span class="slot-name">装备</span>
        <span class="slot-value" id="selected-equipment">未选择</span>
    </li>
</ul>
```

**Step 2: 修改选择状态计数**

找到选择状态显示（约第69-71行），修改为：

```html
<div class="selection-status">
    已选: <span id="selectedCount">0</span> / 6 项（主角+天气+地形+冒险+装备必选）
</div>
```

**Step 3: Commit**

```bash
git add src/frontend/director.html
git commit -m "refactor: update selection slots for protagonist and supporting"
```

---

## Task 6: 修改前端 - 更新选择和显示逻辑

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 修改renderCardFan函数**

将 `renderCardFan` 函数替换为：

```javascript
function renderCardFan() {
    const fan = document.getElementById('cardFan');
    const categories = ['protagonist', 'supporting', 'weather', 'terrain', 'adventure', 'equipment'];
    const icons = {
        protagonist: '👤',
        supporting: '👥',
        weather: '🌤️',
        terrain: '🏔️',
        adventure: '⚔️',
        equipment: '🎒'
    };
    
    fan.innerHTML = categories.map((category, index) => {
        const angle = (index - 2.5) * 20;
        let displayName = '';
        
        if (category === 'protagonist') {
            displayName = selectedCards.protagonist ? selectedCards.protagonist.name : '主角';
        } else if (category === 'supporting') {
            displayName = selectedCards.supporting.length > 0 
                ? selectedCards.supporting.map(c => c.name).join(', ')
                : '配角';
        } else {
            displayName = selectedCards[category] ? selectedCards[category].name : getCategoryName(category);
        }
        
        const displayIcon = category === 'supporting' 
            ? (selectedCards.supporting.length > 0 ? selectedCards.supporting[0].avatar : icons[category])
            : (selectedCards[category] ? (selectedCards[category].avatar || selectedCards[category].icon) : icons[category]);
        
        return `
            <div class="fan-card" 
                 style="transform: rotate(${angle}deg); left: 50%; top: 50%; margin-left: -40px; margin-top: -55px;"
                 onclick="openCategory('${category}')">
                <div class="card-icon">${displayIcon}</div>
                <div class="card-name">${displayName}</div>
            </div>
        `;
    }).join('');
}
```

**Step 2: 修改getCategoryName函数**

将 `getCategoryName` 函数替换为：

```javascript
function getCategoryName(category) {
    const names = {
        protagonist: '主角',
        supporting: '配角',
        weather: '天气',
        terrain: '地形',
        adventure: '冒险',
        equipment: '装备'
    };
    return names[category] || category;
}
```

**Step 3: 修改updateSelectionDisplay函数**

将 `updateSelectionDisplay` 函数替换为：

```javascript
function updateSelectionDisplay() {
    let count = 0;
    
    if (selectedCards.protagonist) count++;
    if (selectedCards.weather) count++;
    if (selectedCards.terrain) count++;
    if (selectedCards.adventure) count++;
    if (selectedCards.equipment) count++;
    
    document.getElementById('selectedCount').textContent = count;
    
    const requiredSelected = selectedCards.protagonist && selectedCards.weather && 
                             selectedCards.terrain && selectedCards.adventure && selectedCards.equipment;
    document.getElementById('startBtn').disabled = !requiredSelected;
    
    const protagonistEl = document.getElementById('selected-protagonist');
    if (selectedCards.protagonist) {
        protagonistEl.textContent = selectedCards.protagonist.name;
        protagonistEl.style.color = 'var(--color-gold)';
    } else {
        protagonistEl.textContent = '未选择';
        protagonistEl.style.color = 'var(--color-text-muted)';
    }
    
    const supportingEl = document.getElementById('selected-supporting');
    if (selectedCards.supporting.length > 0) {
        supportingEl.textContent = selectedCards.supporting.map(c => c.name).join(', ');
        supportingEl.style.color = 'var(--color-gold)';
    } else {
        supportingEl.textContent = '未选择';
        supportingEl.style.color = 'var(--color-text-muted)';
    }
    
    ['weather', 'terrain', 'adventure', 'equipment'].forEach(category => {
        const element = document.getElementById(`selected-${category}`);
        if (selectedCards[category]) {
            element.textContent = selectedCards[category].name;
            element.style.color = 'var(--color-gold)';
        } else {
            element.textContent = '未选择';
            element.style.color = 'var(--color-text-muted)';
        }
    });
}
```

**Step 4: Commit**

```bash
git add src/frontend/director.html
git commit -m "refactor: update card fan and selection display logic"
```

---

## Task 7: 修改前端 - 更新卡牌选择逻辑

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 修改selectCard函数**

将 `selectCard` 函数替换为：

```javascript
function selectCard(category, card) {
    if (category === 'supporting') {
        const index = selectedCards.supporting.findIndex(c => c.char_id === card.char_id);
        if (index > -1) {
            selectedCards.supporting.splice(index, 1);
        } else if (selectedCards.supporting.length < 3) {
            selectedCards.supporting.push(card);
        } else {
            showNotification('最多选择3个配角', 'error');
            return;
        }
    } else {
        selectedCards[category] = card;
    }
    updateSelectionDisplay();
    renderCardFan();
}
```

**Step 2: 修改renderCardGrid函数**

将 `renderCardGrid` 函数替换为：

```javascript
function renderCardGrid() {
    const grid = document.getElementById('cardGrid');
    
    const displayCards = [
        ...protagonistCards.map(c => ({ ...c, category: 'protagonist' })),
        ...supportingCards.map(c => ({ ...c, category: 'supporting' })),
        ...weatherCards.map(c => ({ ...c, category: 'weather' })),
        ...terrainCards.map(c => ({ ...c, category: 'terrain' })),
        ...adventureCards.map(c => ({ ...c, category: 'adventure' })),
        ...equipmentCards.map(c => ({ ...c, category: 'equipment' }))
    ].slice(0, 8);
    
    grid.innerHTML = displayCards.map(card => `
        <div class="grid-card" onclick="selectCard('${card.category}', ${JSON.stringify(card).replace(/"/g, '&quot;')})">
            <div class="card-icon">${card.avatar || card.icon || '⭐'}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-effect">${getCategoryName(card.category)}</div>
        </div>
    `).join('');
}
```

**Step 3: Commit**

```bash
git add src/frontend/director.html
git commit -m "refactor: update card selection logic for protagonist/supporting"
```

---

## Task 8: 修改前端 - 更新API调用

**Files:**
- Modify: `src/frontend/director.html`

**Step 1: 修改startProduction函数**

将 `startProduction` 函数替换为：

```javascript
async function startProduction() {
    if (!selectedCards.protagonist) {
        showNotification('请选择主角', 'error');
        return;
    }
    if (!selectedCards.weather) {
        showNotification('请选择天气卡牌', 'error');
        return;
    }
    if (!selectedCards.terrain) {
        showNotification('请选择地形卡牌', 'error');
        return;
    }
    if (!selectedCards.adventure) {
        showNotification('请选择冒险类型卡牌', 'error');
        return;
    }
    if (!selectedCards.equipment) {
        showNotification('请选择装备卡牌', 'error');
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
                    protagonist_id: selectedCards.protagonist?.char_id,
                    supporting_ids: selectedCards.supporting.map(c => c.char_id),
                    weather_id: selectedCards.weather?.card_id,
                    terrain_id: selectedCards.terrain?.card_id,
                    adventure_id: selectedCards.adventure?.card_id,
                    equipment_id: selectedCards.equipment?.card_id
                }
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            document.getElementById('loadingOverlay').classList.remove('active');
            showNotification('章节创作成功！', 'success');
            setTimeout(() => {
                window.location.href = `/chapter?id=${result.data.chapter.chapter_id}`;
            }, 1000);
        } else {
            document.getElementById('loadingOverlay').classList.remove('active');
            showNotification(result.error || '创作失败', 'error');
        }
    } catch (error) {
        document.getElementById('loadingOverlay').classList.remove('active');
        showNotification('网络错误', 'error');
    }
}
```

**Step 2: Commit**

```bash
git add src/frontend/director.html
git commit -m "refactor: update API call to use correct endpoint and parameters"
```

---

## Task 9: 验证功能

**Step 1: 启动本地开发服务器**

```bash
npx wrangler pages dev . --port 8788
```

**Step 2: 测试添加章节流程**

1. 打开浏览器访问 `http://localhost:8788`
2. 登录用户
3. 创建或选择一本书籍
4. 点击"添加章节"进入故事导演页
5. 验证：
   - 主角卡牌正确显示
   - 配角卡牌正确显示
   - 情节卡牌正确分类
6. 选择卡牌：
   - 选择主角（必选）
   - 选择配角（可选0-3个）
   - 选择天气/地形/冒险/装备卡牌
7. 点击"开始创作"
8. 验证：
   - 请求发送到正确的API
   - 章节成功创建
   - 跳转到章节页面

**Step 3: 最终Commit**

```bash
git add -A
git commit -m "feat: complete add chapter flow fix"
```

---

## 完成检查清单

- [ ] 后端章节标题生成函数已添加
- [ ] 后端章节内容生成函数已添加
- [ ] 后端POST接口已重构
- [ ] 前端数据结构已更新
- [ ] 前端卡牌加载逻辑已更新
- [ ] 前端UI选择槽位已更新
- [ ] 前端选择显示逻辑已更新
- [ ] 前端卡牌选择逻辑已更新
- [ ] 前端API调用已更新
- [ ] 功能验证通过
