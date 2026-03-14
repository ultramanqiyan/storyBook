# 需求实现与端到端测试计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现所有未完成的需求，并编写端到端测试用例覆盖，所有测试必须通过

**Architecture:** 前端HTML/CSS/JS + Cloudflare Workers API + D1 SQLite数据库 + Playwright E2E测试

**Tech Stack:** HTML5, CSS3, JavaScript, Cloudflare Workers, D1 SQLite, Playwright, better-sqlite3

---

## Task 1: 添加主角属性选择（性格/说话方式/角色类型）

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\book-create.html`
- Modify: `d:\trae_job\storyBook\functions\api\books.js`

**Step 1: 在book-create.html中添加主角属性选择下拉框**

在主角信息区域（约第463行后）添加性格、说话方式、角色类型选择：

```html
<!-- 在 protagonistBackground 输入框后添加 -->

<div class="form-group">
  <label class="form-label">性格 *</label>
  <select class="form-select" id="protagonistPersonality" required>
    <option value="">选择性格...</option>
    <option value="勇敢">勇敢</option>
    <option value="聪明">聪明</option>
    <option value="温柔">温柔</option>
    <option value="活泼">活泼</option>
    <option value="冷静">冷静</option>
    <option value="乐观">乐观</option>
    <option value="善良">善良</option>
    <option value="严肃">严肃</option>
  </select>
</div>

<div class="form-group">
  <label class="form-label">说话方式 *</label>
  <select class="form-select" id="protagonistSpeechStyle" required>
    <option value="">选择说话方式...</option>
    <option value="简洁直接">简洁直接</option>
    <option value="幽默风趣">幽默风趣</option>
    <option value="温柔体贴">温柔体贴</option>
    <option value="严肃正式">严肃正式</option>
    <option value="活泼热情">活泼热情</option>
    <option value="礼貌客气">礼貌客气</option>
    <option value="深沉">深沉</option>
    <option value="诗意文艺">诗意文艺</option>
  </select>
</div>

<div class="form-group">
  <label class="form-label">角色类型 *</label>
  <select class="form-select" id="protagonistRoleType" required>
    <option value="">选择角色类型...</option>
  </select>
</div>
```

**Step 2: 添加角色类型根据书籍类型动态加载逻辑**

在book-create.html的script部分添加：

```javascript
// 角色类型映射（根据书籍类型）
const roleTypesByBookType = {
  adventure: ['小探险家', '小勇士', '冒险者', '旅行者'],
  fantasy: ['魔法学徒', '战士', '游侠', '法师', '牧师'],
  romance: ['白领', '学生', '艺术家', '设计师'],
  business: ['经理', '创业者', '顾问', '助理']
};

// 当书籍类型改变时更新角色类型选项
document.getElementById('bookType').addEventListener('change', function() {
  const roleTypeSelect = document.getElementById('protagonistRoleType');
  const bookType = this.value;
  
  roleTypeSelect.innerHTML = '<option value="">选择角色类型...</option>';
  
  if (bookType && roleTypesByBookType[bookType]) {
    roleTypesByBookType[bookType].forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      roleTypeSelect.appendChild(option);
    });
  }
});
```

**Step 3: 修改表单提交逻辑，收集主角属性**

在createBook函数中修改主角数据收集：

```javascript
const protagonist = {
  name: document.getElementById('protagonistName').value.trim(),
  avatar: selectedProtagonistAvatar,
  background: document.getElementById('protagonistBackground').value.trim(),
  personality: document.getElementById('protagonistPersonality').value,
  speech_style: document.getElementById('protagonistSpeechStyle').value,
  role_type: document.getElementById('protagonistRoleType').value
};

// 验证必填字段
if (!protagonist.name) {
  showToast('请输入主角名称', 'error');
  return;
}
if (!protagonist.personality) {
  showToast('请选择主角性格', 'error');
  return;
}
if (!protagonist.speech_style) {
  showToast('请选择主角说话方式', 'error');
  return;
}
if (!protagonist.role_type) {
  showToast('请选择主角角色类型', 'error');
  return;
}
```

**Step 4: 修改API books.js接收主角属性**

在books.js的创建书籍逻辑中，确保接收并保存主角属性：

```javascript
// 在创建主角卡牌时
await env.DB.prepare(
  'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL, 1)'
).bind(
  generateId(),
  bookId,
  protagonist.name,
  protagonist.role_type,
  protagonist.personality,
  protagonist.speech_style,
  protagonist.avatar
).run();
```

**Step 5: Commit**

```bash
git add src/frontend/book-create.html functions/api/books.js
git commit -m "feat: add protagonist personality/speech_style/role_type selection"
```

---

## Task 2: 添加配角属性选择（性格/说话方式/角色类型/关系）

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\book-create.html`
- Modify: `d:\trae_job\storyBook\functions\api\books.js`

**Step 1: 在book-create.html中添加配角属性选择下拉框**

在配角信息区域添加：

```html
<!-- 在每个配角卡片的亲密度选择后添加 -->

<div class="form-group">
  <label class="form-label">性格 *</label>
  <select class="form-select companion-personality" required>
    <option value="">选择性格...</option>
    <option value="勇敢">勇敢</option>
    <option value="聪明">聪明</option>
    <option value="温柔">温柔</option>
    <option value="活泼">活泼</option>
    <option value="冷静">冷静</option>
    <option value="乐观">乐观</option>
    <option value="善良">善良</option>
    <option value="严肃">严肃</option>
    <option value="睿智">睿智</option>
    <option value="幽默">幽默</option>
  </select>
</div>

<div class="form-group">
  <label class="form-label">说话方式 *</label>
  <select class="form-select companion-speech-style" required>
    <option value="">选择说话方式...</option>
    <option value="简洁直接">简洁直接</option>
    <option value="幽默风趣">幽默风趣</option>
    <option value="温柔体贴">温柔体贴</option>
    <option value="严肃正式">严肃正式</option>
    <option value="活泼热情">活泼热情</option>
    <option value="礼貌客气">礼貌客气</option>
    <option value="深沉">深沉</option>
    <option value="诗意文艺">诗意文艺</option>
    <option value="温和">温和</option>
  </select>
</div>

<div class="form-group">
  <label class="form-label">角色类型 *</label>
  <select class="form-select companion-role-type" required>
    <option value="">选择角色类型...</option>
  </select>
</div>

<div class="form-group">
  <label class="form-label">与主角关系</label>
  <select class="form-select companion-relationship">
    <option value="">选择关系...</option>
    <option value="朋友">朋友</option>
    <option value="恋人">恋人</option>
    <option value="导师">导师</option>
    <option value="竞争对手">竞争对手</option>
    <option value="同事">同事</option>
    <option value="合作伙伴">合作伙伴</option>
    <option value="家人">家人</option>
    <option value="陌生人">陌生人</option>
  </select>
</div>
```

**Step 2: 添加配角角色类型动态加载逻辑**

```javascript
// 当书籍类型改变时，同时更新配角角色类型选项
function updateCompanionRoleTypes(bookType) {
  const roleTypeSelects = document.querySelectorAll('.companion-role-type');
  const roleTypes = roleTypesByBookType[bookType] || [];
  
  roleTypeSelects.forEach(select => {
    select.innerHTML = '<option value="">选择角色类型...</option>';
    roleTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      select.appendChild(option);
    });
  });
}

// 在书籍类型改变时调用
document.getElementById('bookType').addEventListener('change', function() {
  updateProtagonistRoleTypes(this.value);
  updateCompanionRoleTypes(this.value);
});
```

**Step 3: 修改配角数据收集逻辑**

```javascript
const companions = [];
document.querySelectorAll('.companion-card').forEach(card => {
  const name = card.querySelector('.companion-name').value.trim();
  if (name) {
    const intimacy = card.querySelector('.companion-intimacy').value;
    const personality = card.querySelector('.companion-personality').value;
    const speechStyle = card.querySelector('.companion-speech-style').value;
    const roleType = card.querySelector('.companion-role-type').value;
    const relationship = card.querySelector('.companion-relationship').value;
    
    // 验证必填字段
    if (!personality) {
      showToast('请选择配角性格', 'error');
      return;
    }
    if (!speechStyle) {
      showToast('请选择配角说话方式', 'error');
      return;
    }
    if (!roleType) {
      showToast('请选择配角角色类型', 'error');
      return;
    }
    
    companions.push({
      name,
      avatar: card.querySelector('.companion-avatar.selected')?.dataset.avatar || '👤',
      intimacy: intimacy ? parseInt(intimacy) : 50,
      personality,
      speech_style: speechStyle,
      role_type: roleType,
      relationship: relationship || null
    });
  }
});
```

**Step 4: 修改API books.js接收配角属性**

```javascript
// 创建配角卡牌时
for (const companion of companions) {
  await env.DB.prepare(
    'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)'
  ).bind(
    generateId(),
    bookId,
    companion.name,
    companion.role_type,
    companion.personality,
    companion.speech_style,
    companion.avatar,
    companion.intimacy,
    companion.relationship
  ).run();
}
```

**Step 5: Commit**

```bash
git add src/frontend/book-create.html functions/api/books.js
git commit -m "feat: add companion personality/speech_style/role_type/relationship selection"
```

---

## Task 3: 添加输入长度验证

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\book-create.html`
- Modify: `d:\trae_job\storyBook\functions\api\books.js`

**Step 1: 在前端添加maxlength属性**

```html
<!-- 书籍名称 -->
<input type="text" class="form-input" id="storyTitle" placeholder="Enter your story's title..." maxlength="50">

<!-- 主角名称 -->
<input type="text" class="form-input" id="protagonistName" placeholder="Enter the hero's name..." maxlength="20">

<!-- 配角名称 -->
<input type="text" class="form-input companion-name" placeholder="Enter companion name..." maxlength="20">
```

**Step 2: 添加前端实时验证提示**

```javascript
// 书籍名称验证
document.getElementById('storyTitle').addEventListener('input', function() {
  const remaining = 50 - this.value.length;
  const hint = this.parentElement.querySelector('.char-hint');
  if (remaining <= 10) {
    hint.textContent = `还可输入${remaining}字符`;
    hint.style.color = remaining <= 0 ? 'red' : 'orange';
  } else {
    hint.textContent = '';
  }
});

// 主角名称验证
document.getElementById('protagonistName').addEventListener('input', function() {
  const remaining = 20 - this.value.length;
  if (remaining <= 0) {
    showToast('主角名称不能超过20个字符', 'error');
    this.value = this.value.substring(0, 20);
  }
});
```

**Step 3: 在API层添加验证**

```javascript
// books.js 创建书籍时
if (title.length > 50) {
  return new Response(JSON.stringify({ error: '书籍名称不能超过50个字符' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
}

if (protagonist.name.length > 20) {
  return new Response(JSON.stringify({ error: '主角名称不能超过20个字符' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
}

for (const companion of companions) {
  if (companion.name.length > 20) {
    return new Response(JSON.stringify({ error: '配角名称不能超过20个字符' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

**Step 4: Commit**

```bash
git add src/frontend/book-create.html functions/api/books.js
git commit -m "feat: add input length validation for book and character names"
```

---

## Task 4: 完善卡牌丢弃弹窗功能

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\chapter.html`

**Step 1: 检查现有弹窗HTML**

现有弹窗HTML已存在于chapter.html中，需要完善JavaScript逻辑。

**Step 2: 添加弹窗显示逻辑**

```javascript
// 当解谜成功且需要丢弃卡牌时
function showCardDiscardModal(existingCards, newCard, subType) {
  const modal = document.getElementById('cardDiscardModal');
  const cardList = document.getElementById('existingCardList');
  
  // 清空并填充卡牌列表
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
  
  // 保存新卡牌信息
  modal.dataset.newCard = JSON.stringify(newCard);
  modal.dataset.subType = subType;
  
  // 显示弹窗
  modal.style.display = 'flex';
}

let selectedDiscardCardId = null;

function selectCardForDiscard(element, cardId) {
  // 移除其他选中状态
  document.querySelectorAll('.discard-card-item').forEach(el => {
    el.classList.remove('selected');
  });
  
  // 添加选中状态
  element.classList.add('selected');
  selectedDiscardCardId = cardId;
  
  // 启用丢弃按钮
  document.getElementById('btnConfirmDiscard').disabled = false;
}
```

**Step 3: 添加丢弃确认逻辑**

```javascript
document.getElementById('btnConfirmDiscard').addEventListener('click', async function() {
  if (!selectedDiscardCardId) {
    showToast('请选择要丢弃的卡牌', 'error');
    return;
  }
  
  const modal = document.getElementById('cardDiscardModal');
  const newCard = JSON.parse(modal.dataset.newCard);
  const subType = modal.dataset.subType;
  
  try {
    // 调用API丢弃卡牌并获得新卡牌
    const response = await api.discardAndAddCard(currentBookId, selectedDiscardCardId, newCard);
    
    if (response.success) {
      showToast('成功获得新卡牌！', 'success');
      modal.style.display = 'none';
      // 刷新卡牌列表
      loadPlotCards();
    }
  } catch (error) {
    showToast('丢弃卡牌失败', 'error');
  }
});

// 取消按钮
document.getElementById('btnCancelDiscard').addEventListener('click', function() {
  showToast('已取消，无法获得新卡牌', 'warning');
  document.getElementById('cardDiscardModal').style.display = 'none';
});
```

**Step 4: 添加丢弃卡牌API**

在api.js中添加：

```javascript
async discardAndAddCard(bookId, discardCardId, newCard) {
  return apiRequest(`/api/plot-cards/discard`, {
    method: 'POST',
    body: JSON.stringify({
      book_id: bookId,
      discard_card_id: discardCardId,
      new_card: newCard
    })
  });
}
```

**Step 5: 创建丢弃卡牌API端点**

创建文件 `functions/api/plot-cards/discard.js`：

```javascript
export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const { book_id, discard_card_id, new_card } = await request.json();
    
    // 删除旧卡牌
    await env.DB.prepare(
      'DELETE FROM plot_cards WHERE card_id = ? AND book_id = ?'
    ).bind(discard_card_id, book_id).run();
    
    // 添加新卡牌
    const cardId = 'card-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    await env.DB.prepare(
      'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      cardId,
      book_id,
      new_card.type,
      new_card.sub_type,
      new_card.name,
      new_card.icon,
      new_card.description || '',
      new_card.is_custom || 0
    ).run();
    
    return new Response(JSON.stringify({ success: true, card_id: cardId }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

**Step 6: Commit**

```bash
git add src/frontend/chapter.html src/frontend/js/api.js functions/api/plot-cards/discard.js
git commit -m "feat: complete card discard modal functionality"
```

---

## Task 5: 优化章节内容长度

**Files:**
- Modify: `d:\trae_job\storyBook\functions\api\chapters.js`

**Step 1: 扩展章节内容模板**

```javascript
// 在chapters.js中扩展内容模板
const contentTemplates = {
  adventure: {
    weather: {
      '晴天': '阳光明媚的日子里，天空湛蓝如洗，白云悠悠飘过。',
      '彩虹天': '雨后的天空出现了一道美丽的彩虹，七彩的光芒照耀着大地。',
      '微风天': '轻柔的微风吹过，带来了花草的芬芳，让人心旷神怡。',
      '小雨天': '淅淅沥沥的小雨从天而降，雨滴落在叶子上发出悦耳的声音。',
      '星空夜': '夜幕降临，繁星点点，银河横跨天际，美得让人陶醉。'
    },
    terrain: {
      '森林': '茂密的森林里，参天大树遮天蔽日，阳光透过树叶洒下斑驳的光影。鸟儿在枝头欢快地歌唱，小动物们在草丛中穿梭。',
      '小溪': '清澈的小溪蜿蜒流淌，溪水在阳光下闪闪发光。偶尔能看到小鱼在水中游来游去，溪边的鹅卵石光滑圆润。',
      '草原': '广阔的草原一望无际，绿色的草浪随风起伏。五颜六色的野花点缀其中，蝴蝶在花丛中翩翩起舞。',
      '山洞': '幽深的山洞里一片漆黑，只有洞口透进来一丝微弱的光。洞壁上挂着水珠，滴答滴答地落在地上。'
    },
    adventure: {
      '寻宝': '传说中这里藏着一件珍贵的宝物，无数冒险者曾来寻找，但都无功而返。今天，主角决定挑战这个谜题，寻找那失落的宝藏。',
      '探险': '未知的领域总是充满了神秘和危险，但也蕴含着无限的机遇。主角踏上了探险的旅程，准备迎接一切挑战。',
      '帮助朋友': '朋友遇到了困难，需要主角的帮助。这是一次考验友谊的机会，也是展现勇气的时刻。',
      '发现秘密': '一个隐藏已久的秘密即将被揭开，这个发现可能会改变一切。主角小心翼翼地探索着，生怕错过任何线索。'
    },
    equipment: {
      '放大镜': '手中的放大镜帮助主角观察到了许多肉眼难以发现的细节，每一个微小的线索都可能成为解开谜题的关键。',
      '指南针': '指南针的指针稳定地指向北方，在这陌生的环境中，它是主角最可靠的向导。',
      '背包': '背包里装着各种必需品，这些装备将在关键时刻派上用场。',
      '手电筒': '手电筒的光束划破黑暗，照亮了前方的道路，让主角能够看清周围的一切。'
    }
  },
  // 其他类型的模板...
};

function generateChapterContent(aiInput, bookType) {
  const cards = JSON.parse(aiInput);
  const templates = contentTemplates[bookType] || contentTemplates.adventure;
  
  let content = '';
  
  // 天气描述（约50字）
  if (cards.weather && templates.weather[cards.weather.name]) {
    content += templates.weather[cards.weather.name] + ' ';
  }
  
  // 地形描述（约60字）
  if (cards.terrain && templates.terrain[cards.terrain.name]) {
    content += templates.terrain[cards.terrain.name] + ' ';
  }
  
  // 冒险描述（约80字）
  if (cards.adventure && templates.adventure[cards.adventure.name]) {
    content += templates.adventure[cards.adventure.name] + ' ';
  }
  
  // 装备描述（约60字）
  if (cards.equipment && templates.equipment[cards.equipment.name]) {
    content += templates.equipment[cards.equipment.name] + ' ';
  }
  
  // 添加过渡和结尾（约50字）
  content += '主角深吸一口气，继续向前走去。未知的旅程还在继续，更多的冒险正在等待着。';
  
  return content;
}
```

**Step 2: 为所有书籍类型添加完整模板**

为fantasy、romance、business类型添加类似的详细模板。

**Step 3: Commit**

```bash
git add functions/api/chapters.js
git commit -m "feat: expand chapter content templates to ~300 characters"
```

---

## Task 6: 编写端到端测试用例 - 主角属性选择

**Files:**
- Create: `d:\trae_job\storyBook\tests\e2e\protagonist-attributes.spec.js`

**Step 1: 编写测试用例**

```javascript
import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';

test.describe('主角属性选择测试', () => {
  let db;
  
  test.beforeAll(async () => {
    // 连接到本地D1数据库
    const dbPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'db.sqlite');
    db = new Database(dbPath);
  });
  
  test.afterAll(async () => {
    if (db) db.close();
  });
  
  test('创建书籍时必须选择主角性格', async ({ page }) => {
    await page.goto('/book-create.html');
    
    // 填写书籍信息
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#bookType', 'adventure');
    
    // 填写主角信息（不选择性格）
    await page.fill('#protagonistName', '测试主角');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    
    // 点击创建
    await page.click('#btnCreateBook');
    
    // 应该显示错误提示
    await expect(page.locator('.toast.error')).toBeVisible();
    await expect(page.locator('.toast.error')).toContainText('请选择主角性格');
  });
  
  test('创建书籍时必须选择主角说话方式', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', '测试主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistRoleType', '小探险家');
    
    await page.click('#btnCreateBook');
    
    await expect(page.locator('.toast.error')).toBeVisible();
    await expect(page.locator('.toast.error')).toContainText('请选择主角说话方式');
  });
  
  test('创建书籍时必须选择主角角色类型', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', '测试主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    
    await page.click('#btnCreateBook');
    
    await expect(page.locator('.toast.error')).toBeVisible();
    await expect(page.locator('.toast.error')).toContainText('请选择主角角色类型');
  });
  
  test('成功创建书籍并验证数据库中的主角属性', async ({ page }) => {
    await page.goto('/book-create.html');
    
    const bookTitle = 'E2E测试书籍-' + Date.now();
    
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', '测试勇者');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    
    await page.click('#btnCreateBook');
    
    // 等待跳转到书架页面
    await page.waitForURL('**/bookshelf.html');
    
    // 验证数据库中的数据
    const book = db.prepare('SELECT * FROM books WHERE title = ?').get(bookTitle);
    expect(book).toBeTruthy();
    
    const protagonist = db.prepare('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1').get(book.book_id);
    expect(protagonist).toBeTruthy();
    expect(protagonist.name).toBe('测试勇者');
    expect(protagonist.personality).toBe('勇敢');
    expect(protagonist.speech_style).toBe('简洁直接');
    expect(protagonist.role_type).toBe('小探险家');
    
    // 清理测试数据
    db.prepare('DELETE FROM characters WHERE book_id = ?').run(book.book_id);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(book.book_id);
  });
  
  test('角色类型根据书籍类型动态变化', async ({ page }) => {
    await page.goto('/book-create.html');
    
    // 选择冒险类型
    await page.selectOption('#bookType', 'adventure');
    const adventureOptions = await page.locator('#protagonistRoleType option').allTextContents();
    expect(adventureOptions).toContain('小探险家');
    expect(adventureOptions).not.toContain('魔法学徒');
    
    // 选择魔幻类型
    await page.selectOption('#bookType', 'fantasy');
    const fantasyOptions = await page.locator('#protagonistRoleType option').allTextContents();
    expect(fantasyOptions).toContain('魔法学徒');
    expect(fantasyOptions).not.toContain('小探险家');
  });
});
```

**Step 2: 运行测试验证**

```bash
npx playwright test tests/e2e/protagonist-attributes.spec.js
```

**Step 3: Commit**

```bash
git add tests/e2e/protagonist-attributes.spec.js
git commit -m "test: add e2e tests for protagonist attributes selection"
```

---

## Task 7: 编写端到端测试用例 - 配角属性选择

**Files:**
- Create: `d:\trae_job\storyBook\tests\e2e\companion-attributes.spec.js`

**Step 1: 编写测试用例**

```javascript
import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';

test.describe('配角属性选择测试', () => {
  let db;
  
  test.beforeAll(async () => {
    const dbPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'db.sqlite');
    db = new Database(dbPath);
  });
  
  test.afterAll(async () => {
    if (db) db.close();
  });
  
  test('创建书籍时必须选择配角性格', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.fill('#storyTitle', '测试书籍');
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    
    // 添加配角
    await page.click('#btnAddCompanion');
    await page.fill('.companion-name', '配角1');
    await page.selectOption('.companion-intimacy', '50');
    // 不选择性格
    
    await page.click('#btnCreateBook');
    
    await expect(page.locator('.toast.error')).toBeVisible();
    await expect(page.locator('.toast.error')).toContainText('请选择配角性格');
  });
  
  test('成功创建书籍并验证数据库中的配角属性', async ({ page }) => {
    await page.goto('/book-create.html');
    
    const bookTitle = 'E2E配角测试-' + Date.now();
    
    await page.fill('#storyTitle', bookTitle);
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    
    // 添加配角
    await page.click('#btnAddCompanion');
    await page.fill('.companion-name', '测试配角');
    await page.selectOption('.companion-intimacy', '60');
    await page.selectOption('.companion-personality', '聪明');
    await page.selectOption('.companion-speech-style', '幽默风趣');
    await page.selectOption('.companion-role-type', '小智者');
    await page.selectOption('.companion-relationship', '朋友');
    
    await page.click('#btnCreateBook');
    await page.waitForURL('**/bookshelf.html');
    
    // 验证数据库
    const book = db.prepare('SELECT * FROM books WHERE title = ?').get(bookTitle);
    expect(book).toBeTruthy();
    
    const companion = db.prepare('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0').get(book.book_id);
    expect(companion).toBeTruthy();
    expect(companion.name).toBe('测试配角');
    expect(companion.personality).toBe('聪明');
    expect(companion.speech_style).toBe('幽默风趣');
    expect(companion.role_type).toBe('小智者');
    expect(companion.intimacy).toBe(60);
    expect(companion.relationship).toBe('朋友');
    
    // 清理
    db.prepare('DELETE FROM characters WHERE book_id = ?').run(book.book_id);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(book.book_id);
  });
});
```

**Step 2: 运行测试**

```bash
npx playwright test tests/e2e/companion-attributes.spec.js
```

**Step 3: Commit**

```bash
git add tests/e2e/companion-attributes.spec.js
git commit -m "test: add e2e tests for companion attributes selection"
```

---

## Task 8: 编写端到端测试用例 - 输入长度验证

**Files:**
- Create: `d:\trae_job\storyBook\tests\e2e\input-validation.spec.js`

**Step 1: 编写测试用例**

```javascript
import { test, expect } from '@playwright/test';

test.describe('输入长度验证测试', () => {
  test('书籍名称不能超过50个字符', async ({ page }) => {
    await page.goto('/book-create.html');
    
    const longTitle = '这是一个非常非常非常非常非常非常非常非常非常非常长的书名';
    await page.fill('#storyTitle', longTitle);
    
    // 验证输入被截断
    const inputValue = await page.inputValue('#storyTitle');
    expect(inputValue.length).toBeLessThanOrEqual(50);
  });
  
  test('主角名称不能超过20个字符', async ({ page }) => {
    await page.goto('/book-create.html');
    
    const longName = '这是一个非常非常长的主角名字';
    await page.fill('#protagonistName', longName);
    
    const inputValue = await page.inputValue('#protagonistName');
    expect(inputValue.length).toBeLessThanOrEqual(20);
  });
  
  test('配角名称不能超过20个字符', async ({ page }) => {
    await page.goto('/book-create.html');
    
    await page.click('#btnAddCompanion');
    
    const longName = '这是一个非常非常长的配角名字';
    await page.fill('.companion-name', longName);
    
    const inputValue = await page.inputValue('.companion-name');
    expect(inputValue.length).toBeLessThanOrEqual(20);
  });
  
  test('API层验证书籍名称长度', async ({ page }) => {
    await page.goto('/book-create.html');
    
    // 尝试通过修改DOM绕过前端验证
    await page.evaluate(() => {
      const input = document.getElementById('storyTitle');
      input.removeAttribute('maxlength');
    });
    
    const longTitle = 'A'.repeat(60);
    await page.fill('#storyTitle', longTitle);
    await page.selectOption('#bookType', 'adventure');
    await page.fill('#protagonistName', '主角');
    await page.selectOption('#protagonistPersonality', '勇敢');
    await page.selectOption('#protagonistSpeechStyle', '简洁直接');
    await page.selectOption('#protagonistRoleType', '小探险家');
    
    await page.click('#btnCreateBook');
    
    // 应该显示API错误
    await expect(page.locator('.toast.error')).toBeVisible();
  });
});
```

**Step 2: 运行测试**

```bash
npx playwright test tests/e2e/input-validation.spec.js
```

**Step 3: Commit**

```bash
git add tests/e2e/input-validation.spec.js
git commit -m "test: add e2e tests for input length validation"
```

---

## Task 9: 编写端到端测试用例 - 卡牌丢弃弹窗

**Files:**
- Create: `d:\trae_job\storyBook\tests\e2e\card-discard.spec.js`

**Step 1: 编写测试用例**

```javascript
import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';

test.describe('卡牌丢弃弹窗测试', () => {
  let db;
  
  test.beforeAll(async () => {
    const dbPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'db.sqlite');
    db = new Database(dbPath);
  });
  
  test.afterAll(async () => {
    if (db) db.close();
  });
  
  test('当卡牌达到上限时显示丢弃弹窗', async ({ page }) => {
    // 创建测试书籍并添加8张天气卡牌
    const bookId = 'test-book-' + Date.now();
    db.prepare('INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)').run(bookId, 'test-user', '测试书籍', 'adventure');
    
    for (let i = 0; i < 8; i++) {
      db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run(
        `card-${i}`, bookId, 'plot', 'weather', `天气${i}`, '☀️'
      );
    }
    
    // 创建章节和谜题
    const chapterId = 'chapter-' + Date.now();
    db.prepare('INSERT INTO chapters (chapter_id, book_id, title, content, order_num) VALUES (?, ?, ?, ?, 1)').run(chapterId, bookId, '测试章节', '内容');
    
    const puzzleId = 'puzzle-' + Date.now();
    db.prepare('INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options) VALUES (?, ?, ?, ?, ?, ?)').run(
      puzzleId, chapterId, '测试问题', 'A', 'choice', '["A","B","C","D"]'
    );
    
    // 访问章节页面
    await page.goto(`/chapter.html?id=${chapterId}`);
    
    // 解谜
    await page.click('text=A');
    await page.click('#btnSubmit');
    
    // 应该显示丢弃弹窗
    await expect(page.locator('#cardDiscardModal')).toBeVisible();
    
    // 清理
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM puzzles WHERE chapter_id = ?').run(chapterId);
    db.prepare('DELETE FROM chapters WHERE chapter_id = ?').run(chapterId);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(bookId);
  });
  
  test('选择卡牌后可以丢弃并获得新卡牌', async ({ page }) => {
    // 类似上面的设置...
    // 选择要丢弃的卡牌
    await page.click('.discard-card-item:first-child');
    
    // 确认丢弃
    await page.click('#btnConfirmDiscard');
    
    // 验证成功提示
    await expect(page.locator('.toast.success')).toBeVisible();
    
    // 验证弹窗关闭
    await expect(page.locator('#cardDiscardModal')).not.toBeVisible();
  });
  
  test('取消丢弃后无法获得新卡牌', async ({ page }) => {
    // 设置...
    await page.click('#btnCancelDiscard');
    
    await expect(page.locator('.toast.warning')).toBeVisible();
    await expect(page.locator('#cardDiscardModal')).not.toBeVisible();
  });
});
```

**Step 2: 运行测试**

```bash
npx playwright test tests/e2e/card-discard.spec.js
```

**Step 3: Commit**

```bash
git add tests/e2e/card-discard.spec.js
git commit -m "test: add e2e tests for card discard modal"
```

---

## Task 10: 编写端到端测试用例 - 章节内容长度

**Files:**
- Create: `d:\trae_job\storyBook\tests\e2e\chapter-content.spec.js`

**Step 1: 编写测试用例**

```javascript
import { test, expect } from '@playwright/test';
import Database from 'better-sqlite3';
import path from 'path';

test.describe('章节内容长度测试', () => {
  let db;
  
  test.beforeAll(async () => {
    const dbPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'db.sqlite');
    db = new Database(dbPath);
  });
  
  test.afterAll(async () => {
    if (db) db.close();
  });
  
  test('新生成的章节内容长度约为300字', async ({ page }) => {
    // 创建测试书籍
    const bookId = 'test-book-' + Date.now();
    db.prepare('INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)').run(bookId, 'test-user', '测试书籍', 'adventure');
    
    // 添加卡牌
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-w', bookId, 'plot', 'weather', '晴天', '☀️');
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-t', bookId, 'plot', 'terrain', '森林', '🌲');
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-a', bookId, 'plot', 'adventure', '寻宝', '🗺️');
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, is_custom) VALUES (?, ?, ?, ?, ?, ?, 0)').run('card-e', bookId, 'plot', 'equipment', '放大镜', '🔍');
    
    // 访问导演页面
    await page.goto(`/director.html?bookId=${bookId}`);
    
    // 选择卡牌
    await page.click('[data-card-type="weather"]:first-child');
    await page.click('[data-card-type="terrain"]:first-child');
    await page.click('[data-card-type="adventure"]:first-child');
    await page.click('[data-card-type="equipment"]:first-child');
    
    // 生成章节
    await page.click('#btnGenerateChapter');
    
    // 等待章节生成
    await page.waitForSelector('.chapter-content');
    
    // 验证数据库中的章节内容长度
    const chapter = db.prepare('SELECT * FROM chapters WHERE book_id = ? ORDER BY created_at DESC LIMIT 1').get(bookId);
    expect(chapter).toBeTruthy();
    expect(chapter.content.length).toBeGreaterThanOrEqual(250);
    expect(chapter.content.length).toBeLessThanOrEqual(400);
    
    // 清理
    db.prepare('DELETE FROM plot_cards WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM chapters WHERE book_id = ?').run(bookId);
    db.prepare('DELETE FROM books WHERE book_id = ?').run(bookId);
  });
});
```

**Step 2: 运行测试**

```bash
npx playwright test tests/e2e/chapter-content.spec.js
```

**Step 3: Commit**

```bash
git add tests/e2e/chapter-content.spec.js
git commit -m "test: add e2e tests for chapter content length"
```

---

## Task 11: 运行所有测试并确保通过

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

**Step 6: 最终提交**

```bash
git add .
git commit -m "test: all e2e tests passing"
```

---

## 验收标准

- [ ] 主角属性选择（性格/说话方式/角色类型）已实现
- [ ] 配角属性选择（性格/说话方式/角色类型/关系）已实现
- [ ] 输入长度验证已实现（书籍50字符，角色20字符）
- [ ] 卡牌丢弃弹窗功能完善
- [ ] 章节内容长度优化到约300字
- [ ] 所有E2E测试用例编写完成
- [ ] 所有测试用例通过
- [ ] 数据库验证正确
