# 需求未实现功能修复计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 修复所有P0和P1优先级的未实现需求，确保核心功能完整可用

**Architecture:** 前端HTML/CSS/JS + Cloudflare Workers API + D1 SQLite数据库 + Playwright E2E测试

**Tech Stack:** HTML5, CSS3, JavaScript, Cloudflare Workers, D1 SQLite, Playwright, better-sqlite3

---

## Task 1: 输入长度验证

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\book-create.html`
- Modify: `d:\trae_job\storyBook\functions\api\books.js`

**Step 1: 在前端添加maxlength属性**

在book-create.html中修改输入框：

```html
<!-- 书籍名称（约第434行） -->
<input type="text" class="form-input" id="storyTitle" placeholder="Enter your story's title..." maxlength="50">

<!-- 主角名称（约第464行） -->
<input type="text" class="form-input" id="protagonistName" placeholder="Enter the hero's name..." maxlength="20">

<!-- 配角名称（约第530行和动态添加的模板中） -->
<input type="text" class="form-input companion-name" placeholder="Companion's name..." maxlength="20">
```

**Step 2: 在API层添加长度验证**

在books.js的onRequestPost函数中添加验证：

```javascript
// 在第434行后添加
if (title.length > 50) {
  return createErrorResponse('书籍名称不能超过50个字符', 400);
}

if (protagonist.name.length > 20) {
  return createErrorResponse('主角名称不能超过20个字符', 400);
}

if (supporting_characters) {
  for (const companion of supporting_characters) {
    if (companion.name && companion.name.length > 20) {
      return createErrorResponse('配角名称不能超过20个字符', 400);
    }
  }
}
```

**Step 3: Commit**

```bash
git add src/frontend/book-create.html functions/api/books.js
git commit -m "feat: add input length validation for book and character names"
```

---

## Task 2: 卡牌丢弃弹窗UI实现

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\chapter.html`
- Create: `d:\trae_job\storyBook\functions\api\plot-cards\discard.js`

**Step 1: 在chapter.html中添加丢弃弹窗HTML**

在现有弹窗基础上完善，添加丢弃卡牌选择弹窗：

```html
<!-- 在现有modal后添加 -->
<div id="cardDiscardModal" class="modal" style="display: none;">
  <div class="modal-content card-discard-content">
    <h2 class="modal-title">卡牌已达上限</h2>
    <p class="modal-message">该类型卡牌已达8张上限，请选择一张丢弃以获得新卡牌：</p>
    <div id="existingCardList" class="discard-card-list"></div>
    <div class="modal-actions">
      <button id="btnCancelDiscard" class="btn btn-secondary">取消</button>
      <button id="btnConfirmDiscard" class="btn btn-primary" disabled>确认丢弃</button>
    </div>
  </div>
</div>
```

**Step 2: 添加丢弃弹窗样式**

```css
.card-discard-content {
  max-width: 600px;
}

.discard-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin: 20px 0;
}

.discard-card-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.discard-card-item:hover {
  border-color: var(--color-gold);
  transform: translateY(-3px);
}

.discard-card-item.selected {
  border-color: var(--color-gold);
  background: rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
}

.discard-card-item .card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.discard-card-item .card-name {
  font-size: 14px;
  color: var(--color-text);
}
```

**Step 3: 添加丢弃弹窗JavaScript逻辑**

```javascript
let selectedDiscardCardId = null;
let pendingNewCard = null;
let pendingSubType = null;

function showCardDiscardModal(existingCards, newCard, subType) {
  const modal = document.getElementById('cardDiscardModal');
  const cardList = document.getElementById('existingCardList');
  
  cardList.innerHTML = '';
  existingCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'discard-card-item';
    cardEl.dataset.cardId = card.card_id;
    cardEl.innerHTML = `
      <div class="card-icon">${card.icon}</div>
      <div class="card-name">${card.name}</div>
    `;
    cardEl.addEventListener('click', () => selectCardForDiscard(cardEl, card.card_id));
    cardList.appendChild(cardEl);
  });
  
  pendingNewCard = newCard;
  pendingSubType = subType;
  selectedDiscardCardId = null;
  document.getElementById('btnConfirmDiscard').disabled = true;
  modal.style.display = 'flex';
}

function selectCardForDiscard(element, cardId) {
  document.querySelectorAll('.discard-card-item').forEach(el => {
    el.classList.remove('selected');
  });
  element.classList.add('selected');
  selectedDiscardCardId = cardId;
  document.getElementById('btnConfirmDiscard').disabled = false;
}

document.getElementById('btnConfirmDiscard').addEventListener('click', async function() {
  if (!selectedDiscardCardId || !pendingNewCard) return;
  
  try {
    const response = await API.discardAndAddCard(currentBookId, selectedDiscardCardId, pendingNewCard);
    
    if (response.success) {
      showNotification('成功获得新卡牌！', 'success');
      document.getElementById('cardDiscardModal').style.display = 'none';
      pendingNewCard = null;
      pendingSubType = null;
    } else {
      showNotification(response.error || '丢弃失败', 'error');
    }
  } catch (error) {
    showNotification('丢弃卡牌失败: ' + error.message, 'error');
  }
});

document.getElementById('btnCancelDiscard').addEventListener('click', function() {
  showNotification('已取消，无法获得新卡牌', 'warning');
  document.getElementById('cardDiscardModal').style.display = 'none';
  pendingNewCard = null;
  pendingSubType = null;
});
```

**Step 4: 创建丢弃卡牌API端点**

创建 `functions/api/plot-cards/discard.js`：

```javascript
import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from '../utils.js';

export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const { book_id, discard_card_id, new_card } = await request.json();
    
    if (!book_id || !discard_card_id || !new_card) {
      return createErrorResponse('缺少必要参数', 400);
    }
    
    await env.DB.prepare(
      'DELETE FROM plot_cards WHERE card_id = ? AND book_id = ?'
    ).bind(discard_card_id, book_id).run();
    
    const cardId = generateId();
    await env.DB.prepare(
      'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      cardId,
      book_id,
      new_card.type || 'plot',
      new_card.sub_type,
      new_card.name,
      new_card.icon,
      new_card.description || '',
      new_card.is_custom || 0
    ).run();
    
    return createSuccessResponse({ 
      success: true, 
      card_id: cardId,
      discarded_card_id: discard_card_id
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

**Step 5: 在api.js中添加丢弃API方法**

```javascript
async discardAndAddCard(bookId, discardCardId, newCard) {
  return apiRequest('/api/plot-cards/discard', {
    method: 'POST',
    body: JSON.stringify({
      book_id: bookId,
      discard_card_id: discardCardId,
      new_card: newCard
    })
  });
}
```

**Step 6: Commit**

```bash
git add src/frontend/chapter.html src/frontend/js/api.js functions/api/plot-cards/discard.js
git commit -m "feat: implement card discard modal UI and API"
```

---

## Task 3: 权限控制修复

**Files:**
- Modify: `d:\trae_job\storyBook\functions\api\chapters.js`
- Modify: `d:\trae_job\storyBook\functions\api\puzzles\[id]\solve.js`

**Step 1: 检查chapters.js中的权限控制**

当前代码已有user_id验证（第297-299行），需要确保前端也传递user_id。

**Step 2: 修复解谜获得卡牌的登录检查**

在 `functions/api/puzzles/[id]/solve.js` 中添加登录检查：

```javascript
// 在解谜成功掉落卡牌前添加登录检查
if (!user_id) {
  return createSuccessResponse({
    success: true,
    correct: true,
    message: '恭喜你答对了！登录后可以获得卡牌奖励',
    attempts: puzzle.attempts + 1,
    max_attempts: puzzle.max_attempts,
    reward: null
  });
}
```

**Step 3: Commit**

```bash
git add functions/api/chapters.js functions/api/puzzles/[id]/solve.js
git commit -m "fix: add login check for card rewards in puzzle solving"
```

---

## Task 4: 预设书籍章节补充

**Files:**
- Modify: `d:\trae_job\storyBook\migrations\0002_seed_data.sql`

**Step 1: 补充预设章节**

为每本预设书籍添加4个章节（当前只有2个，需要补充到16个）：

```sql
-- 预设章节 - 儿童冒险（补充第3、4章）
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-adventure-003', 'preset-adventure-001', '森林的秘密', '小明和小红深入森林，发现了一个隐藏的洞穴。洞穴里闪烁着神秘的光芒，似乎有什么东西在里面等待着他们...', 3),
('chapter-preset-adventure-004', 'preset-adventure-001', '宝藏发现', '经过重重困难，小明终于找到了传说中的宝藏。但真正的宝藏不是金银珠宝，而是一份珍贵的友谊和难忘的回忆...', 4);

-- 预设章节 - 魔幻传说（补充第3、4章）
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-fantasy-003', 'preset-fantasy-001', '元素试炼', '魔法学徒们来到了元素神殿，必须通过火、水、风、土四种元素的考验才能继续前进...', 3),
('chapter-preset-fantasy-004', 'preset-fantasy-001', '魔法觉醒', '在最后的试炼中，学徒们觉醒了真正的魔法力量，成为了正式的魔法师...', 4);

-- 预设章节 - 都市言情（补充第3、4章）
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-romance-003', 'preset-romance-001', '心动的瞬间', '在那个雨后的傍晚，两人在咖啡厅偶遇。窗外的彩虹映照着彼此的脸庞，心跳不由自主地加快...', 3),
('chapter-preset-romance-004', 'preset-romance-001', '幸福的开始', '经历了误会与和解，两人终于坦诚相见。新的故事正在展开，未来充满了无限可能...', 4);

-- 预设章节 - 职场风云（补充第3、4章）
INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES
('chapter-preset-business-003', 'preset-business-001', '关键决策', '公司面临重大抉择，作为项目负责人，必须做出正确的决定。团队的命运掌握在自己手中...', 3),
('chapter-preset-business-004', 'preset-business-001', '事业巅峰', '项目大获成功，团队的努力得到了回报。但这只是新的开始，更大的挑战还在前方...', 4);

-- 为新章节添加谜题
INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES
('puzzle-preset-adventure-003', 'chapter-preset-adventure-003', '洞穴里最可能有什么？', '宝藏', 'choice', '["宝藏","怪物","陷阱","出口"]'),
('puzzle-preset-adventure-004', 'chapter-preset-adventure-004', '真正的宝藏是什么？', '友谊', 'choice', '["金银","友谊","宝石","地图"]'),
('puzzle-preset-fantasy-003', 'chapter-preset-fantasy-003', '四种元素不包括哪个？', '雷', 'choice', '["火","水","雷","土"]'),
('puzzle-preset-fantasy-004', 'chapter-preset-fantasy-004', '魔法师最重要的品质？', '智慧', 'choice', '["力量","智慧","速度","财富"]'),
('puzzle-preset-romance-003', 'chapter-preset-romance-003', '爱情最需要什么？', '真诚', 'choice', '["金钱","真诚","外貌","地位"]'),
('puzzle-preset-romance-004', 'chapter-preset-romance-004', '幸福的秘诀是什么？', '信任', 'choice', '["财富","信任","权力","名声"]'),
('puzzle-preset-business-003', 'chapter-preset-business-003', '决策最重要的是什么？', '数据', 'choice', '["直觉","数据","运气","关系"]'),
('puzzle-preset-business-004', 'chapter-preset-business-004', '成功的关键是什么？', '团队', 'choice', '["运气","团队","资金","时机"]');
```

**Step 2: Commit**

```bash
git add migrations/0002_seed_data.sql
git commit -m "feat: add missing preset chapters and puzzles (from 2 to 4 per book)"
```

---

## Task 5: 自定义卡牌功能实现

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\director.html`
- Create: `d:\trae_job\storyBook\functions\api\plot-cards\custom.js`

**Step 1: 在director.html中添加自定义卡牌按钮**

在每种卡牌类型区域添加"自定义"按钮：

```html
<div class="custom-card-section">
  <button class="btn btn-secondary" onclick="showCustomCardModal('weather')">
    + 自定义天气卡牌
  </button>
</div>
```

**Step 2: 添加自定义卡牌弹窗**

```html
<div id="customCardModal" class="modal" style="display: none;">
  <div class="modal-content">
    <h2 class="modal-title">创建自定义卡牌</h2>
    <div class="form-group">
      <label class="form-label">卡牌名称 *</label>
      <input type="text" class="form-input" id="customCardName" maxlength="20">
    </div>
    <div class="form-group">
      <label class="form-label">卡牌图标 *</label>
      <div class="icon-selector" id="customCardIcons"></div>
    </div>
    <div class="form-group">
      <label class="form-label">卡牌描述</label>
      <textarea class="form-input" id="customCardDesc" maxlength="100"></textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeCustomCardModal()">取消</button>
      <button class="btn btn-primary" onclick="createCustomCard()">创建</button>
    </div>
  </div>
</div>
```

**Step 3: 创建自定义卡牌API端点**

创建 `functions/api/plot-cards/custom.js`：

```javascript
import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from '../utils.js';

const CARD_LIMIT_PER_TYPE = 8;

const ICON_PRESETS = {
  weather: ['☀️', '🌧️', '❄️', '🌈', '⛈️', '🌤️', '🌬️', '🌫️', '🌙', '⭐'],
  terrain: ['🌲', '🏔️', '🏖️', '🏝️', '🏰', '🕳️', '💧', '🌿', '🏜️', '🌾'],
  adventure: ['🗺️', '🧭', '⚔️', '🛡️', '🔮', '💎', '🗝️', '📦', '🎯', '🏆'],
  equipment: ['🗡️', '🏹', '🪄', '🛡️', '📚', '🔮', '💊', '🧪', '🔦', '🧰']
};

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const subType = url.searchParams.get('sub_type');
  
  const icons = ICON_PRESETS[subType] || [];
  return createSuccessResponse({ icons });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const { book_id, sub_type, name, icon, description } = await request.json();
    
    if (!book_id || !sub_type || !name || !icon) {
      return createErrorResponse('缺少必要参数', 400);
    }
    
    const count = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
    ).bind(book_id, sub_type).first();
    
    if (count.count >= CARD_LIMIT_PER_TYPE) {
      return createErrorResponse('该类型卡牌已达上限', 400);
    }
    
    const cardId = generateId();
    await env.DB.prepare(
      'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, 1)'
    ).bind(cardId, book_id, 'plot', sub_type, name, icon, description || '').run();
    
    return createSuccessResponse({
      card_id: cardId,
      book_id,
      sub_type,
      name,
      icon,
      description,
      is_custom: 1
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

**Step 4: Commit**

```bash
git add src/frontend/director.html functions/api/plot-cards/custom.js
git commit -m "feat: implement custom card creation functionality"
```

---

## Task 6: 章节内容优化

**Files:**
- Modify: `d:\trae_job\storyBook\functions\api\chapters.js`

**Step 1: 修改mockAIGenerate函数返回故事内容**

当前mockAIGenerate返回aiInput（AI提示词），应该返回生成的故事内容：

```javascript
function mockAIGenerate(aiInput, bookType, orderNum, selectedCardsInfo, supportingName) {
  const title = generateChapterTitle(bookType, orderNum);
  const content = generateChapterContent(bookType, selectedCardsInfo);
  
  const templates = puzzleTemplates[bookType] || puzzleTemplates.adventure;
  const randomPuzzle = templates[Math.floor(Math.random() * templates.length)];
  
  const intimacyChange = Math.floor(Math.random() * 21) - 10;
  
  return {
    title: title,
    content: content,
    puzzle: {
      question: randomPuzzle.question,
      options: randomPuzzle.options,
      answer: randomPuzzle.answer
    },
    intimacy_changes: supportingName ? [
      { char_name: supportingName, change: intimacyChange }
    ] : []
  };
}
```

**Step 2: 修改onRequestPost传递selectedCardsInfo**

```javascript
// 在调用mockAIGenerate前构建selectedCardsInfo
const selectedCardsInfo = {
  protagonist: protagonist,
  supporting: supporting,
  weather: weather,
  terrain: terrain,
  adventure: adventure,
  equipment: equipment
};

const aiResult = mockAIGenerate(aiInput, book.type, orderNum, selectedCardsInfo, supportingName);
```

**Step 3: Commit**

```bash
git add functions/api/chapters.js
git commit -m "fix: return story content instead of AI input in chapter generation"
```

---

## Task 7: 运行E2E测试验证

**Step 1: 启动开发服务器**

```bash
npm run dev
```

**Step 2: 初始化数据库**

```bash
npm run db:migrate:local
npm run db:seed:local
```

**Step 3: 运行所有E2E测试**

```bash
npm run test:e2e
```

**Step 4: 检查测试结果**

确保所有测试通过，如果有失败则修复。

**Step 5: 运行单元测试**

```bash
npm test
```

---

## 验收标准

- [ ] 输入长度验证已实现（书籍50字符，角色20字符）
- [ ] 卡牌丢弃弹窗UI已实现
- [ ] 权限控制已修复
- [ ] 预设书籍章节已补充到4个
- [ ] 自定义卡牌功能已实现
- [ ] 章节内容返回故事而非AI输入
- [ ] 所有E2E测试通过
