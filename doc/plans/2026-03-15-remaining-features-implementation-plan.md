# 剩余功能实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现剩余未完成的功能：卡牌丢弃弹窗UI、章节内容长度优化、卡牌掉落概率权重、配角关系自定义输入

**Architecture:** 
- 前端修改：`chapter.html`（丢弃弹窗）、`book-create.html`（关系自定义）
- 后端修改：`chapters.js`（内容长度）、`puzzles/[id]/solve.js`（概率权重）

**Tech Stack:** Cloudflare Pages Functions, Vanilla JavaScript, CSS

---

## Task 1: 卡牌丢弃弹窗UI

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\chapter.html`
- Modify: `d:\trae_job\storyBook\src\frontend\css/custom-card.css`

**Step 1: 添加丢弃弹窗HTML结构**

在 `chapter.html` 的 `puzzle-overlay` 之后添加：

```html
<div class="discard-overlay" id="discardOverlay">
  <div class="discard-modal">
    <div class="discard-header">
      <h3>🎴 卡牌上限已满</h3>
      <p id="discardMessage">请选择一张卡牌丢弃：</p>
    </div>
    <div class="discard-cards" id="discardCards"></div>
    <div class="discard-actions">
      <button class="discard-btn cancel" onclick="closeDiscardModal()">取消</button>
      <button class="discard-btn confirm" id="confirmDiscardBtn" onclick="confirmDiscard()" disabled>确认丢弃</button>
    </div>
  </div>
</div>
```

**Step 2: 添加丢弃弹窗CSS样式**

在 `css/custom-card.css` 中添加：

```css
.discard-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.discard-overlay.active {
  opacity: 1;
  visibility: visible;
}

.discard-modal {
  background: linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 16px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.discard-header {
  text-align: center;
  margin-bottom: 20px;
}

.discard-header h3 {
  font-family: var(--font-title);
  font-size: 24px;
  color: var(--color-gold);
  margin-bottom: 10px;
}

.discard-header p {
  color: var(--color-text-muted);
  font-size: 14px;
}

.discard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.discard-card {
  background: linear-gradient(180deg, #3a3a5a 0%, #2a2a4a 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.discard-card:hover {
  border-color: var(--color-gold);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
}

.discard-card.selected {
  border-color: #ff4444;
  background: linear-gradient(180deg, #4a2a2a 0%, #3a1a1a 100%);
  box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
}

.discard-card .card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.discard-card .card-name {
  font-family: var(--font-title);
  font-size: 12px;
  color: var(--color-gold);
  word-break: break-word;
}

.discard-card .card-type {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.discard-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.discard-btn {
  padding: 12px 30px;
  border-radius: 8px;
  font-family: var(--font-title);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.discard-btn.cancel {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: var(--color-text);
}

.discard-btn.cancel:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

.discard-btn.confirm {
  background: linear-gradient(180deg, #ff4444 0%, #cc0000 100%);
  border: 2px solid #ff6666;
  color: white;
}

.discard-btn.confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 68, 68, 0.3);
}

.discard-btn.confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Step 3: 添加丢弃弹窗JavaScript逻辑**

在 `chapter.html` 的 `<script>` 标签内添加：

```javascript
let pendingReward = null;
let selectedDiscardCard = null;

function showDiscardModal(reward) {
  pendingReward = reward;
  selectedDiscardCard = null;
  
  const overlay = document.getElementById('discardOverlay');
  const cardsContainer = document.getElementById('discardCards');
  const messageEl = document.getElementById('discardMessage');
  const confirmBtn = document.getElementById('confirmDiscardBtn');
  
  const cards = reward.existing_cards || reward.existing_characters || [];
  const isCharacter = reward.type === 'custom_character';
  
  messageEl.textContent = isCharacter 
    ? '角色卡牌已达上限（8张），请选择一张丢弃：'
    : `该类型卡牌已达上限（8张），请选择一张丢弃：`;
  
  cardsContainer.innerHTML = cards.map(card => `
    <div class="discard-card" data-id="${card.card_id || card.char_id}" data-type="${isCharacter ? 'character' : 'plot'}">
      <div class="card-icon">${card.icon || card.avatar || '⭐'}</div>
      <div class="card-name">${card.name}</div>
      <div class="card-type">${isCharacter ? '角色' : (card.sub_type || '情节')}</div>
    </div>
  `).join('');
  
  cardsContainer.querySelectorAll('.discard-card').forEach(cardEl => {
    cardEl.addEventListener('click', function() {
      cardsContainer.querySelectorAll('.discard-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      selectedDiscardCard = {
        id: this.dataset.id,
        type: this.dataset.type
      };
      confirmBtn.disabled = false;
    });
  });
  
  confirmBtn.disabled = true;
  overlay.classList.add('active');
}

function closeDiscardModal() {
  document.getElementById('discardOverlay').classList.remove('active');
  pendingReward = null;
  selectedDiscardCard = null;
}

async function confirmDiscard() {
  if (!selectedDiscardCard || !pendingReward) return;
  
  const confirmBtn = document.getElementById('confirmDiscardBtn');
  confirmBtn.disabled = true;
  confirmBtn.textContent = '处理中...';
  
  try {
    if (selectedDiscardCard.type === 'character') {
      await API.deleteCharacter(selectedDiscardCard.id);
    } else {
      await API.deletePlotCard(selectedDiscardCard.id);
    }
    
    if (pendingReward.type === 'custom_character' && pendingReward.character) {
      const result = await API.createCustomCharacter({
        book_id: currentChapter.book_id,
        name: pendingReward.character.name || '新角色',
        avatar: pendingReward.character.avatar,
        role_type: pendingReward.character.role_type,
        personality: pendingReward.character.personality,
        speech_style: pendingReward.character.speech_style,
        user_id: getUserId()
      });
      if (result.success) {
        showNotification('角色卡牌创建成功！', 'success');
      }
    } else if (pendingReward.card) {
      const result = await API.createCustomPlotCard({
        book_id: currentChapter.book_id,
        sub_type: pendingReward.sub_type || pendingReward.card.sub_type,
        name: pendingReward.card.name || '新卡牌',
        icon: pendingReward.card.icon,
        description: pendingReward.card.description || '',
        user_id: getUserId()
      });
      if (result.success) {
        showNotification('情节卡牌创建成功！', 'success');
      }
    }
    
    closeDiscardModal();
    showRewardAnimation(pendingReward);
  } catch (error) {
    showNotification('操作失败：' + error.message, 'error');
    confirmBtn.disabled = false;
    confirmBtn.textContent = '确认丢弃';
  }
}
```

**Step 4: 修改解谜成功处理逻辑**

找到 `submitPuzzle` 函数中的成功处理部分，修改为：

```javascript
if (result.is_correct && result.reward) {
  if (result.card_limit_exceeded || result.character_limit_exceeded) {
    showDiscardModal(result.reward);
  } else {
    showRewardAnimation(result.reward);
  }
}
```

**Step 5: 验证**

运行本地开发服务器，测试解谜成功后卡牌上限时的弹窗显示。

---

## Task 2: 章节内容长度优化

**Files:**
- Modify: `d:\trae_job\storyBook\functions\api\chapters.js:67-111`

**Step 1: 扩充章节内容模板**

将 `generateChapterContent` 函数中的模板从约150字扩展到约300字：

```javascript
function generateChapterContent(bookType, selectedCardsInfo) {
  const protagonist = selectedCardsInfo.protagonist?.name || '主角';
  const weather = selectedCardsInfo.weather?.name || '晴天';
  const terrain = selectedCardsInfo.terrain?.name || '森林';
  const adventure = selectedCardsInfo.adventure?.name || '探险';
  const equipment = selectedCardsInfo.equipment?.name || '指南针';
  const personality = selectedCardsInfo.protagonist?.personality || '勇敢';
  const supporting = selectedCardsInfo.supporting?.name || '';
  
  const templates = {
    adventure: `${weather}的日子里，阳光透过云层洒下金色的光芒，照亮了前方的道路。${protagonist}怀着${personality}的心情，踏上了前往${terrain}的旅程。一路上，风景如画，鸟儿在枝头欢快地歌唱，微风轻拂着脸庞，带来阵阵花香和泥土的芬芳。

${protagonist}拿出${equipment}，仔细观察着周围的环境。这片${terrain}充满了神秘和未知，每一处角落都可能隐藏着惊喜或挑战。远处的山峦起伏，近处的溪流潺潺，构成了一幅美丽的自然画卷。${supporting ? `身旁的${supporting}也在默默观察着一切，两人相视一笑，默契地继续前行。${supporting}的存在让这段旅程变得更加温暖。` : ''}

随着深入${terrain}，${protagonist}开始了${adventure}之旅。脚下的路蜿蜒曲折，通向未知的远方。周围的景色令人叹为观止，高耸的树木遮天蔽日，清澈的溪流潺潺流淌。每一步都充满惊喜，每一刻都值得铭记。偶尔，远处传来野兽的吼声，提醒着这片土地的原始与野性。

在这片神奇的土地上，${protagonist}将会遇到什么样的挑战呢？命运的齿轮已经开始转动，冒险的号角已经吹响。前方的道路虽然充满未知，但${protagonist}的心中充满了勇气和期待。这段旅程，注定会成为一段难忘的回忆...`,
    
    fantasy: `在${weather}的笼罩下，整个世界仿佛被一层神秘的面纱所覆盖，空气中弥漫着古老魔法的气息。${protagonist}踏入了传说中的${terrain}，每一步都可能触发沉睡千年的咒语，每一眼都可能看见不可思议的景象。远处的魔法光芒闪烁，近处的符文在石壁上若隐若现。

${equipment}在手中闪闪发光，散发着微弱的魔法波动，预示着即将到来的${adventure}。${protagonist}${personality}地握紧了手中的法器，感受着其中蕴含的力量，那是一种古老而强大的能量。${supporting ? `${supporting}在身旁轻声说道："小心，这里的魔法很不稳定，我们必须谨慎前行。"${protagonist}点点头，继续谨慎前行，两人之间的默契让这段旅程更加安心。` : ''}

${terrain}深处，奇异的生物在阴影中游荡，古老的符文在石壁上闪烁着神秘的光芒。${protagonist}深吸一口气，准备迎接命运的挑战。传说中，只有真正的勇者才能通过这里的考验，获得无上的力量和智慧。空气中充满了魔法的波动，每一次呼吸都仿佛在吸入魔力。

魔法的旅程才刚刚开始，${protagonist}的传奇正在书写。前方等待着什么样的奇迹与危险？古老的预言正在一步步应验，而${protagonist}正是这预言中的主角。命运的齿轮已经开始转动，没有人能够阻止即将发生的一切...`,
    
    romance: `${weather}的午后，阳光温柔地洒落在大地上，为世界披上了一层金色的光芒。${protagonist}漫步在${terrain}，心中怀着对未来的憧憬和期待。手中紧握着${equipment}，那是承载着回忆的珍贵之物，每一个细节都诉说着过往的故事。这里的一切都那么美好，仿佛时间都慢了下来。

${supporting ? `${supporting}静静地走在${protagonist}身旁，两人的影子在阳光下交织在一起，形成了一幅美丽的画面。空气中弥漫着淡淡的花香，微风轻拂，带来一丝甜蜜的气息。${supporting}的存在让这个下午变得更加特别。` : ''}${protagonist}${personality}地望着远方，心中期待着一场${adventure}，一场可能改变人生的际遇。

${terrain}里，花朵竞相绽放，蝴蝶在花丛中翩翩起舞，为这个美好的下午增添了生机。每一个转角都可能遇见惊喜，每一次回眸都可能发现美好。${protagonist}不知道的是，命运的齿轮已经开始转动，一个美丽的邂逅正在悄然酝酿，等待着最合适的时机绽放。

爱情的种子已经播下，等待着阳光和雨露的滋养。${protagonist}的故事，才刚刚开始书写。在这个充满可能性的世界里，每一天都可能成为改变命运的转折点。而今天，或许就是那个特别的日子...`,
    
    business: `${weather}，城市的天际线在晨光中渐渐清晰，高楼大厦的玻璃幕墙反射着第一缕阳光。${protagonist}来到了${terrain}，今天有一场重要的${adventure}在等待着。整理好${equipment}，${protagonist}${personality}地深吸一口气，推开了那扇门，准备迎接新的挑战。

${terrain}里人来人往，每个人都在为自己的目标而忙碌，空气中弥漫着紧张而兴奋的气息。${supporting ? `${supporting}已经在等候，看到${protagonist}到来，微笑着点了点头。两人握手致意，准备开始今天的挑战。${supporting}的支持让${protagonist}更加有信心。` : ''}这是一个充满机遇的地方，每一个决定都可能影响未来的走向。

${protagonist}环顾四周，目光坚定而专注。新的挑战，新的机遇，一切都将从这里开始。每一次握手都可能改变命运，每一次对话都可能开启新的篇章。在这个竞争激烈的世界里，只有不断进取才能立于不败之地。

职场的风云变幻莫测，但${protagonist}已经准备好迎接一切。成功的大门已经打开，关键在于如何把握机会、展现自我。今天，将是${protagonist}职业生涯中又一个重要的里程碑...`
  };
  
  return templates[bookType] || templates.adventure;
}
```

**Step 2: 验证**

运行本地开发服务器，创建新章节，检查生成的内容长度是否达到约300字。

---

## Task 3: 卡牌掉落概率权重

**Files:**
- Modify: `d:\trae_job\storyBook\functions\api\puzzles\[id]\solve.js:110-134`

**Step 1: 修改卡牌掉落逻辑**

将 `generateCardDrop` 函数修改为带权重的版本：

```javascript
function generateCardDrop(bookType) {
  const options = plotOptions[bookType];
  if (!options) {
    return null;
  }

  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const subTypeWeights = [2, 2, 3, 3];
  
  const totalWeight = subTypeWeights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  let selectedSubType = 'adventure';
  
  for (let i = 0; i < subTypes.length; i++) {
    random -= subTypeWeights[i];
    if (random <= 0) {
      selectedSubType = subTypes[i];
      break;
    }
  }
  
  const cardPool = options[selectedSubType];
  if (!cardPool || cardPool.length === 0) {
    return null;
  }

  const randomCard = getRandomElement(cardPool);
  
  return {
    card_id: generateId(),
    sub_type: selectedSubType,
    name: randomCard,
    icon: cardIcons[selectedSubType],
    description: `${selectedSubType}类型卡牌`,
    is_custom: 0
  };
}
```

**Step 2: 验证**

运行测试，验证卡牌掉落概率分布是否合理。

---

## Task 4: 配角关系自定义输入

**Files:**
- Modify: `d:\trae_job\storyBook\src\frontend\book-create.html`

**Step 1: 添加自定义关系选项**

找到 `companion-relationship` 的 `<select>` 元素，添加自定义选项：

```html
<select class="form-select companion-relationship">
  <option value="">Select relationship...</option>
  <option value="friend">Friend</option>
  <option value="family">Family</option>
  <option value="mentor">Mentor</option>
  <option value="rival">Rival</option>
  <option value="love_interest">Love Interest</option>
  <option value="colleague">Colleague</option>
  <option value="neighbor">Neighbor</option>
  <option value="custom">Custom...</option>
</select>
```

**Step 2: 添加自定义输入框**

在每个 `companion-relationship` 后面添加隐藏的自定义输入框：

```html
<input type="text" class="form-input custom-relationship-input" placeholder="Enter custom relationship..." style="display: none; margin-top: 8px;" maxlength="20">
```

**Step 3: 添加JavaScript事件处理**

在现有的JavaScript中添加：

```javascript
document.querySelectorAll('.companion-relationship').forEach(select => {
  select.addEventListener('change', function() {
    const customInput = this.parentElement.querySelector('.custom-relationship-input');
    if (this.value === 'custom') {
      customInput.style.display = 'block';
      customInput.focus();
    } else {
      customInput.style.display = 'none';
      customInput.value = '';
    }
  });
});
```

**Step 4: 修改表单提交逻辑**

找到收集 `relationship` 的代码，修改为：

```javascript
const relationshipSelect = companionSection.querySelector('.companion-relationship');
const customRelationshipInput = companionSection.querySelector('.custom-relationship-input');
let relationship = relationshipSelect ? relationshipSelect.value : '';
if (relationship === 'custom' && customRelationshipInput) {
  relationship = customRelationshipInput.value.trim() || 'Friend';
}
```

**Step 5: 验证**

运行本地开发服务器，测试创建书籍时选择自定义关系并输入自定义值。

---

## Task 5: 运行测试验证

**Step 1: 运行E2E测试**

```bash
npx playwright test --reporter=list
```

**Step 2: 检查测试结果**

确保所有核心功能测试通过，如有失败则修复。

**Step 3: 手动测试关键流程**

1. 创建书籍 → 添加章节 → 解谜成功 → 验证卡牌掉落
2. 触发卡牌上限 → 验证丢弃弹窗
3. 创建书籍时选择自定义关系

---

## 完成标准

- [ ] 卡牌丢弃弹窗UI正常显示和工作
- [ ] 章节内容长度达到约300字
- [ ] 卡牌掉落概率权重生效（装备/冒险概率更高）
- [ ] 配角关系支持自定义输入
- [ ] E2E测试全部通过
