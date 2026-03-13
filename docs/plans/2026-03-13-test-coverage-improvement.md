# 测试覆盖改进实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 补充缺失的E2E测试用例，确保P0核心功能测试覆盖率达到100%，P1重要功能测试覆盖率达到80%以上

**Architecture:** 使用Playwright E2E测试框架，遵循Page Object Pattern模式，每个测试文件独立管理测试数据和数据库状态，测试同时验证UI和数据库

**Tech Stack:** Playwright, Vitest, Cloudflare D1 (SQLite), Page Object Pattern

---

## 前置条件

- 项目已配置Playwright测试环境
- 测试辅助文件已存在：`tests/e2e/helpers/db-helper.js`
- 页面对象文件已存在于 `tests/e2e/pages/` 目录

---

## 第一阶段：P0核心功能测试（高优先级）

### Task 1: 创建卡牌上限检查测试文件

**Files:**
- Create: `tests/e2e/card-limit.spec.js`
- Reference: `tests/e2e/card-drop.spec.js` (参考现有测试结构)

**Step 1: 创建测试文件基础结构**

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('卡牌上限检查功能', () => {
  let db;
  let testUserId;
  let testBookId;
  let testChapterId;
  let testPuzzleId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  // 测试用例将在后续步骤添加
});
```

**Step 2: 添加天气卡牌上限测试**

```javascript
  test('天气卡牌达到8张时触发上限处理弹窗', async ({ page, request }) => {
    // 创建书籍并获取8张天气卡牌
    await setupBookWithMaxCards(request, 'weather');
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    // 解谜成功触发掉落
    await triggerPuzzleSuccess(page, request);
    
    // 验证上限弹窗显示
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    await expect(limitModal).toContainText('天气卡牌已满');
  });
```

**Step 3: 添加丢弃旧卡牌测试**

```javascript
  test('选择丢弃旧卡牌后获得新卡牌', async ({ page, request }) => {
    await setupBookWithMaxCards(request, 'weather');
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await triggerPuzzleSuccess(page, request);
    
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    
    // 选择第一张卡牌丢弃
    const firstCard = limitModal.locator('.existing-card, .card-item').first();
    await firstCard.click();
    
    // 确认丢弃
    const confirmBtn = limitModal.locator('button:has-text("确认"), .btn-confirm');
    await confirmBtn.click();
    
    // 验证弹窗关闭
    await expect(limitModal).not.toBeVisible();
    
    // 验证数据库：卡牌数量仍为8
    const weatherCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [testBookId, 'weather']
    );
    expect(weatherCount.count).toBe(8);
  });
```

**Step 4: 添加放弃新卡牌测试**

```javascript
  test('选择放弃新卡牌后卡牌数量不变', async ({ page, request }) => {
    await setupBookWithMaxCards(request, 'weather');
    
    const beforeCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [testBookId, 'weather']
    ).count;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await triggerPuzzleSuccess(page, request);
    
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    
    // 点击放弃按钮
    const abandonBtn = limitModal.locator('button:has-text("放弃"), .btn-abandon');
    await abandonBtn.click();
    
    // 验证弹窗关闭
    await expect(limitModal).not.toBeVisible();
    
    // 验证数据库：卡牌数量不变
    const afterCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?',
      [testBookId, 'weather']
    ).count;
    expect(afterCount).toBe(beforeCount);
  });
```

**Step 5: 添加地形卡牌上限测试**

```javascript
  test('地形卡牌达到8张时触发上限处理', async ({ page, request }) => {
    await setupBookWithMaxCards(request, 'terrain');
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await triggerPuzzleSuccess(page, request);
    
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    await expect(limitModal).toContainText('地形');
  });
```

**Step 6: 添加冒险类型卡牌上限测试**

```javascript
  test('冒险类型卡牌达到8张时触发上限处理', async ({ page, request }) => {
    await setupBookWithMaxCards(request, 'adventure');
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await triggerPuzzleSuccess(page, request);
    
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    await expect(limitModal).toContainText('冒险');
  });
```

**Step 7: 添加装备卡牌上限测试**

```javascript
  test('装备卡牌达到8张时触发上限处理', async ({ page, request }) => {
    await setupBookWithMaxCards(request, 'equipment');
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await triggerPuzzleSuccess(page, request);
    
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    await expect(limitModal).toContainText('装备');
  });
```

**Step 8: 添加角色卡牌上限测试**

```javascript
  test('角色卡牌达到8张时无法创建新角色', async ({ page, request }) => {
    // 创建书籍并添加7个配角（主角+7配角=8）
    await setupBookWithMaxCharacters(request);
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    // 尝试创建自定义角色
    const response = await request.post('/api/custom-cards/characters', {
      data: {
        book_id: testBookId,
        name: '超限角色',
        avatar: '🧝',
        role_type: '精灵',
        personality: '勇敢',
        speech_style: '简洁直接',
        intimacy: 0,
        user_id: testUserId
      }
    });

    const result = await response.json();
    expect(result.success).toBe(true);
    expect(result.data.limit_exceeded).toBe(true);
  });
```

**Step 9: 添加上限弹窗显示所有卡牌测试**

```javascript
  test('上限弹窗显示当前所有8张卡牌', async ({ page, request }) => {
    await setupBookWithMaxCards(request, 'weather');
    
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await triggerPuzzleSuccess(page, request);
    
    const limitModal = page.locator('#cardLimitModal, .card-limit-modal');
    await expect(limitModal).toBeVisible();
    
    // 验证显示8张卡牌
    const cardItems = limitModal.locator('.existing-card, .card-item');
    const count = await cardItems.count();
    expect(count).toBe(8);
  });
```

**Step 10: 运行测试验证**

Run: `npx playwright test tests/e2e/card-limit.spec.js --reporter=list`
Expected: 所有测试按预期运行（可能因功能未实现而失败）

**Step 11: Commit**

```bash
git add tests/e2e/card-limit.spec.js
git commit -m "test: add card limit check E2E tests (P0)"
```

---

### Task 2: 实现前端卡牌上限检查功能

**Files:**
- Modify: `src/frontend/js/chapter.js` (章节阅读页添加上限检查)
- Modify: `src/frontend/js/director.js` (导演页添加上限检查)
- Create: `src/frontend/js/card-limit-modal.js` (上限弹窗组件)

**Step 1: 创建卡牌上限弹窗组件**

在 `src/frontend/js/card-limit-modal.js` 中：

```javascript
export class CardLimitModal {
  constructor() {
    this.modal = null;
    this.selectedCardId = null;
    this.newCard = null;
    this.onConfirm = null;
    this.onAbandon = null;
  }

  show(existingCards, newCard, cardType, onConfirm, onAbandon) {
    this.newCard = newCard;
    this.onConfirm = onConfirm;
    this.onAbandon = onAbandon;
    
    const typeNames = {
      weather: '天气',
      terrain: '地形',
      adventure: '冒险类型',
      equipment: '装备'
    };

    const modalHtml = `
      <div id="cardLimitModal" class="card-limit-modal active">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <h2 class="modal-title">⚠️ ${typeNames[cardType]}卡牌已满！</h2>
          <p class="modal-desc">您的${typeNames[cardType]}卡牌已达到上限(8张)，请选择丢弃一张旧卡牌或放弃新卡牌。</p>
          
          <div class="existing-cards-section">
            <h3>当前${typeNames[cardType]}卡牌 (8张)</h3>
            <div class="existing-cards-grid">
              ${existingCards.map(card => `
                <div class="card-item" data-card-id="${card.card_id}">
                  <span class="card-icon">${card.icon}</span>
                  <span class="card-name">${card.name}</span>
                  <button class="btn-discard">丢弃</button>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="new-card-section">
            <h3>🎉 新获得的卡牌</h3>
            <div class="new-card-display">
              <span class="card-icon">${newCard.icon}</span>
              <span class="card-name">${newCard.name}</span>
              <p class="card-desc">${newCard.description || ''}</p>
            </div>
          </div>
          
          <div class="modal-actions">
            <button class="btn-abandon">❌ 放弃新卡牌，不获得</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.modal = document.getElementById('cardLimitModal');
    this.bindEvents();
  }

  bindEvents() {
    this.modal.querySelectorAll('.btn-discard').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cardItem = e.target.closest('.card-item');
        this.selectedCardId = cardItem.dataset.cardId;
        this.handleDiscard();
      });
    });

    this.modal.querySelector('.btn-abandon').addEventListener('click', () => {
      this.handleAbandon();
    });
  }

  async handleDiscard() {
    if (!this.selectedCardId) return;
    
    try {
      const response = await fetch(`/api/plot-cards/${this.selectedCardId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        this.close();
        if (this.onConfirm) {
          this.onConfirm(this.newCard);
        }
      }
    } catch (error) {
      console.error('Discard card failed:', error);
    }
  }

  handleAbandon() {
    this.close();
    if (this.onAbandon) {
      this.onAbandon();
    }
  }

  close() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}
```

**Step 2: 在章节阅读页集成上限检查**

在 `src/frontend/js/chapter.js` 的解谜成功回调中添加：

```javascript
import { CardLimitModal } from './card-limit-modal.js';

// 在解谜成功后
async function handlePuzzleSuccess(result) {
  if (result.data.reward) {
    const reward = result.data.reward;
    
    // 检查是否需要处理上限
    if (result.data.limit_exceeded) {
      const modal = new CardLimitModal();
      modal.show(
        result.data.existing_cards,
        reward,
        reward.sub_type,
        (newCard) => {
          // 确认丢弃后，添加新卡牌
          addNewCard(newCard);
          showSuccessAnimation(newCard);
        },
        () => {
          // 放弃新卡牌
          showAbandonMessage();
        }
      );
    } else {
      // 直接获得卡牌
      addNewCard(reward);
      showSuccessAnimation(reward);
    }
  }
}
```

**Step 3: 在导演页添加上限检查**

在 `src/frontend/js/director.js` 的页面加载时添加：

```javascript
async function checkCardLimits(bookId) {
  const response = await fetch(`/api/plot-cards?book_id=${bookId}`);
  const result = await response.json();
  
  if (!result.success) return { canProceed: true };
  
  const limits = {
    weather: { count: 0, max: 8 },
    terrain: { count: 0, max: 8 },
    adventure: { count: 0, max: 8 },
    equipment: { count: 0, max: 8 }
  };
  
  result.data.forEach(card => {
    if (limits[card.sub_type]) {
      limits[card.sub_type].count++;
    }
  });
  
  const exceededTypes = Object.entries(limits)
    .filter(([_, info]) => info.count >= info.max)
    .map(([type, _]) => type);
  
  return {
    canProceed: exceededTypes.length === 0,
    exceededTypes,
    limits
  };
}

// 页面加载时检查
async function initDirectorPage() {
  const bookId = getBookIdFromUrl();
  const limitCheck = await checkCardLimits(bookId);
  
  if (!limitCheck.canProceed) {
    showLimitWarning(limitCheck.exceededTypes);
  }
}
```

**Step 4: 添加上限弹窗样式**

在 `src/frontend/css/components.css` 中添加：

```css
.card-limit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: none;
}

.card-limit-modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-limit-modal .modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.card-limit-modal .modal-content {
  position: relative;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 24px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.card-limit-modal .existing-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 16px 0;
}

.card-limit-modal .card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.card-limit-modal .card-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-limit-modal .btn-discard {
  margin-top: 8px;
  padding: 4px 12px;
  background: var(--danger-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.card-limit-modal .new-card-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  animation: pulse 2s infinite;
}

.card-limit-modal .btn-abandon {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px solid var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

**Step 5: 运行测试验证**

Run: `npx playwright test tests/e2e/card-limit.spec.js --reporter=list`
Expected: 测试应通过

**Step 6: Commit**

```bash
git add src/frontend/js/card-limit-modal.js src/frontend/js/chapter.js src/frontend/js/director.js src/frontend/css/components.css
git commit -m "feat: implement card limit check modal and integration"
```

---

### Task 3: 实现后端卡牌上限检查API

**Files:**
- Modify: `functions/api/puzzles/[id]/solve.js` (解谜成功时检查上限)
- Modify: `functions/api/chapters.js` (创建章节时检查上限)

**Step 1: 在解谜API中添加上限检查**

在 `functions/api/puzzles/[id]/solve.js` 中：

```javascript
// 在返回奖励前检查上限
async function checkCardLimit(env, bookId, subType) {
  const result = await env.DB.prepare(`
    SELECT COUNT(*) as count 
    FROM plot_cards 
    WHERE book_id = ? AND sub_type = ?
  `).bind(bookId, subType).first();
  
  return result.count >= 8;
}

// 修改解谜成功逻辑
if (isCorrect) {
  // 随机选择卡牌类型
  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const randomType = subTypes[Math.floor(Math.random() * subTypes.length)];
  
  // 检查上限
  const limitExceeded = await checkCardLimit(env, bookId, randomType);
  
  if (limitExceeded) {
    // 获取现有卡牌
    const existingCards = await env.DB.prepare(`
      SELECT * FROM plot_cards 
      WHERE book_id = ? AND sub_type = ?
    `).bind(bookId, randomType).all();
    
    return {
      success: true,
      data: {
        is_correct: true,
        reward: generateRandomCard(randomType),
        limit_exceeded: true,
        existing_cards: existingCards.results
      }
    };
  }
  
  // 正常获得卡牌
  const newCard = await createNewCard(env, bookId, randomType);
  
  return {
    success: true,
    data: {
      is_correct: true,
      reward: newCard,
      limit_exceeded: false
    }
  };
}
```

**Step 2: 在章节创建API中添加上限检查**

在 `functions/api/chapters.js` 中：

```javascript
// 创建章节前检查卡牌上限
async function checkAllCardLimits(env, bookId) {
  const limits = await env.DB.prepare(`
    SELECT sub_type, COUNT(*) as count 
    FROM plot_cards 
    WHERE book_id = ? 
    GROUP BY sub_type
  `).bind(bookId).all();
  
  const exceededTypes = limits.results
    .filter(row => row.count >= 8)
    .map(row => row.sub_type);
  
  return exceededTypes;
}

// 在onRequestPost开头添加
export async function onRequestPost(context) {
  const { request, env } = context;
  const data = await request.json();
  
  // 检查卡牌上限
  const exceededTypes = await checkAllCardLimits(env, data.book_id);
  if (exceededTypes.length > 0) {
    return {
      success: false,
      error: `以下类型卡牌已达上限: ${exceededTypes.join(', ')}`,
      limit_exceeded: true,
      exceeded_types: exceededTypes
    };
  }
  
  // 继续正常的章节创建逻辑...
}
```

**Step 3: 运行测试验证**

Run: `npx playwright test tests/e2e/card-limit.spec.js --reporter=list`
Expected: 所有测试通过

**Step 4: Commit**

```bash
git add functions/api/puzzles/[id]/solve.js functions/api/chapters.js
git commit -m "feat: add card limit check in puzzle solve and chapter create APIs"
```

---

### Task 4: 实现书籍删除功能

**Files:**
- Modify: `src/frontend/bookshelf.html` (添加删除按钮)
- Modify: `src/frontend/js/bookshelf.js` (添加删除逻辑)

**Step 1: 在书架HTML添加删除按钮**

在 `src/frontend/bookshelf.html` 的书籍卡片模板中：

```html
<div class="book-actions">
  <button class="btn-delete" data-book-id="${book.book_id}" style="display: ${book.is_preset ? 'none' : 'block'}">
    🗑️ 删除
  </button>
</div>
```

**Step 2: 添加删除确认弹窗HTML**

```html
<div id="deleteConfirmModal" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <h2>确认删除</h2>
    <p>确定要删除书籍《<span id="deleteBookTitle"></span>》吗？</p>
    <p class="warning">⚠️ 删除后数据不可恢复！</p>
    <div class="modal-actions">
      <button class="btn-cancel">取消</button>
      <button class="btn-confirm-delete">确认删除</button>
    </div>
  </div>
</div>
```

**Step 3: 添加删除逻辑JavaScript**

在 `src/frontend/js/bookshelf.js` 中：

```javascript
let bookToDelete = null;

// 绑定删除按钮事件
document.querySelectorAll('.btn-delete').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const bookId = btn.dataset.bookId;
    const bookTitle = btn.closest('.book-item').querySelector('.book-title').textContent;
    
    bookToDelete = bookId;
    document.getElementById('deleteBookTitle').textContent = bookTitle;
    document.getElementById('deleteConfirmModal').classList.add('active');
  });
});

// 取消删除
document.querySelector('.btn-cancel').addEventListener('click', () => {
  document.getElementById('deleteConfirmModal').classList.remove('active');
  bookToDelete = null;
});

// 确认删除
document.querySelector('.btn-confirm-delete').addEventListener('click', async () => {
  if (!bookToDelete) return;
  
  try {
    const response = await fetch(`/api/books/${bookToDelete}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    
    if (result.success) {
      // 移除书籍卡片
      const bookItem = document.querySelector(`.book-item[data-book-id="${bookToDelete}"]`);
      if (bookItem) {
        bookItem.remove();
      }
      
      // 显示成功提示
      showToast('书籍已删除');
      
      // 检查是否还有书籍
      checkEmptyState();
    } else {
      showToast('删除失败: ' + result.error, 'error');
    }
  } catch (error) {
    showToast('删除失败', 'error');
  } finally {
    document.getElementById('deleteConfirmModal').classList.remove('active');
    bookToDelete = null;
  }
});

function checkEmptyState() {
  const books = document.querySelectorAll('.book-item');
  const emptyState = document.querySelector('.empty-shelf, .no-books');
  
  if (books.length === 0) {
    if (!emptyState) {
      const container = document.querySelector('.books-container');
      container.innerHTML = '<div class="empty-shelf"><p>暂无书籍，点击"创建新书"开始创作</p></div>';
    }
  }
}
```

**Step 4: 运行测试验证**

Run: `npx playwright test tests/e2e/bookshelf.spec.js --reporter=list`
Expected: 删除相关测试通过

**Step 5: Commit**

```bash
git add src/frontend/bookshelf.html src/frontend/js/bookshelf.js
git commit -m "feat: add book delete functionality with confirmation modal"
```

---

### Task 5: 创建书籍删除功能测试

**Files:**
- Modify: `tests/e2e/bookshelf.spec.js` (添加删除测试)

**Step 1: 添加删除按钮显示测试**

```javascript
test('用户书籍应显示删除按钮', async ({ page, request }) => {
  await request.post('/api/books', {
    data: {
      user_id: testUserId,
      title: '可删除书籍',
      type: 'adventure',
      protagonist: {
        name: '主角',
        avatar: '🧙‍♂️',
        role_type: 'protagonist',
        is_protagonist: 1
      },
      supporting_characters: []
    }
  });

  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/bookshelf.html');
  await page.waitForTimeout(1000);

  const deleteBtn = page.locator('.btn-delete').first();
  await expect(deleteBtn).toBeVisible();
});
```

**Step 2: 添加预设书籍不显示删除按钮测试**

```javascript
test('预设书籍不应显示删除按钮', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/bookshelf.html');
  await page.waitForTimeout(1000);

  // 检查预设书籍没有删除按钮
  const presetBook = page.locator('.book-item.is-preset, .book-item[data-is-preset="1"]').first();
  if (await presetBook.count() > 0) {
    const deleteBtn = presetBook.locator('.btn-delete');
    await expect(deleteBtn).not.toBeVisible();
  }
});
```

**Step 3: 添加删除确认弹窗测试**

```javascript
test('点击删除应显示确认弹窗', async ({ page, request }) => {
  const response = await request.post('/api/books', {
    data: {
      user_id: testUserId,
      title: '删除测试书籍',
      type: 'adventure',
      protagonist: {
        name: '主角',
        avatar: '🧙‍♂️',
        role_type: 'protagonist',
        is_protagonist: 1
      },
      supporting_characters: []
    }
  });

  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/bookshelf.html');
  await page.waitForTimeout(1000);

  const deleteBtn = page.locator('.btn-delete').first();
  await deleteBtn.click();

  const confirmModal = page.locator('#deleteConfirmModal.active');
  await expect(confirmModal).toBeVisible();
  await expect(confirmModal).toContainText('确认删除');
});
```

**Step 4: 添加确认删除测试**

```javascript
test('确认删除后书籍应从列表移除', async ({ page, request }) => {
  await request.post('/api/books', {
    data: {
      user_id: testUserId,
      title: '待删除书籍',
      type: 'adventure',
      protagonist: {
        name: '主角',
        avatar: '🧙‍♂️',
        role_type: 'protagonist',
        is_protagonist: 1
      },
      supporting_characters: []
    }
  });

  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/bookshelf.html');
  await page.waitForTimeout(1000);

  const beforeCount = await page.locator('.book-item').count();

  const deleteBtn = page.locator('.btn-delete').first();
  await deleteBtn.click();

  const confirmBtn = page.locator('.btn-confirm-delete');
  await confirmBtn.click();

  await page.waitForTimeout(1000);

  const afterCount = await page.locator('.book-item').count();
  expect(afterCount).toBe(beforeCount - 1);
});
```

**Step 5: 添加级联删除验证测试**

```javascript
test('删除书籍应级联删除关联数据', async ({ request }) => {
  // 创建完整书籍
  const bookResponse = await request.post('/api/books', {
    data: {
      user_id: testUserId,
      title: '级联删除测试',
      type: 'adventure',
      protagonist: {
        name: '主角',
        avatar: '🧙‍♂️',
        role_type: 'protagonist',
        is_protagonist: 1
      },
      supporting_characters: []
    }
  });
  const bookData = await bookResponse.json();
  const bookId = bookData.data.book_id;

  // 创建章节
  const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
  const charsData = await charsResponse.json();
  const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

  const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
  const cardsData = await cardsResponse.json();
  const cards = cardsData.data;

  await request.post('/api/chapters', {
    data: {
      user_id: testUserId,
      book_id: bookId,
      selected_cards: {
        protagonist_id: protagonistId,
        weather_id: cards.find(c => c.sub_type === 'weather').card_id,
        terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
        adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
        equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
      }
    }
  });

  // 删除书籍
  await request.delete(`/api/books/${bookId}`);

  // 验证级联删除
  const dbChars = db.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
  const dbCards = db.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
  const dbChapters = db.queryAll('SELECT * FROM chapters WHERE book_id = ?', [bookId]);
  const dbPuzzles = db.queryAll('SELECT * FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)', [bookId]);

  expect(dbChars.length).toBe(0);
  expect(dbCards.length).toBe(0);
  expect(dbChapters.length).toBe(0);
  expect(dbPuzzles.length).toBe(0);
});
```

**Step 6: 运行测试验证**

Run: `npx playwright test tests/e2e/bookshelf.spec.js --reporter=list`
Expected: 所有删除测试通过

**Step 7: Commit**

```bash
git add tests/e2e/bookshelf.spec.js
git commit -m "test: add book delete functionality E2E tests"
```

---

### Task 6: 实现配角亲密度选择UI

**Files:**
- Modify: `src/frontend/book-create.html` (添加亲密度选择)
- Modify: `src/frontend/js/book-create.js` (添加亲密度逻辑)

**Step 1: 在配角表单中添加亲密度选择**

在 `src/frontend/book-create.html` 的配角表单部分：

```html
<div class="form-group">
  <label>与主角关系</label>
  <div class="intimacy-options">
    <button type="button" class="intimacy-option" data-value="-50">
      <span class="intimacy-icon">😠</span>
      <span class="intimacy-label">敌对</span>
    </button>
    <button type="button" class="intimacy-option" data-value="0">
      <span class="intimacy-icon">😐</span>
      <span class="intimacy-label">中立</span>
    </button>
    <button type="button" class="intimacy-option" data-value="50">
      <span class="intimacy-icon">😊</span>
      <span class="intimacy-label">友好</span>
    </button>
  </div>
  <input type="hidden" id="supportingIntimacy" name="intimacy" value="0">
</div>
```

**Step 2: 添加亲密度选择逻辑**

在 `src/frontend/js/book-create.js` 中：

```javascript
// 绑定亲密度选择事件
document.querySelectorAll('.intimacy-option').forEach(option => {
  option.addEventListener('click', () => {
    // 移除其他选中状态
    option.parentElement.querySelectorAll('.intimacy-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    
    // 设置当前选中
    option.classList.add('selected');
    
    // 更新隐藏字段
    const intimacyValue = option.dataset.value;
    document.getElementById('supportingIntimacy').value = intimacyValue;
  });
});

// 收集配角数据时包含亲密度
function collectSupportingCharacters() {
  const characters = [];
  document.querySelectorAll('.supporting-character-card').forEach(card => {
    const intimacy = card.querySelector('#supportingIntimacy')?.value || 0;
    characters.push({
      name: card.querySelector('.char-name').value,
      avatar: card.querySelector('.avatar-option.selected')?.dataset.avatar,
      role_type: card.querySelector('.role-type').value,
      personality: card.querySelector('.personality').value,
      speech_style: card.querySelector('.speech-style').value,
      intimacy: parseInt(intimacy),
      is_protagonist: 0
    });
  });
  return characters;
}
```

**Step 3: 添加亲密度样式**

```css
.intimacy-options {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.intimacy-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.intimacy-option:hover {
  border-color: var(--primary-color);
}

.intimacy-option.selected {
  border-color: var(--primary-color);
  background: var(--primary-color-light);
}

.intimacy-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.intimacy-label {
  font-size: 14px;
  color: var(--text-secondary);
}
```

**Step 4: 运行测试验证**

Run: `npx playwright test tests/e2e/book-create.spec.js --reporter=list`
Expected: 亲密度相关测试通过

**Step 5: Commit**

```bash
git add src/frontend/book-create.html src/frontend/js/book-create.js src/frontend/css/book-create.css
git commit -m "feat: add intimacy selection UI for supporting characters"
```

---

### Task 7: 创建亲密度系统测试

**Files:**
- Create: `tests/e2e/intimacy.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('亲密度系统', () => {
  let db;
  let testUserId;
  let testBookId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('配角创建时可选择亲密度', async ({ page }) => {
    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto('/book-create.html');

    // 填写基本信息
    await page.fill('#storyTitle', '亲密度测试书籍');
    await page.selectOption('#storyGenre', 'adventure');
    await page.click('#step1 .btn-next');

    // 填写主角
    await page.fill('#protagonistName', '主角');
    await page.locator('#protagonistAvatars .avatar-option').first().click();
    await page.click('#step2 .btn-next');

    // 添加配角
    await page.click('.btn-add-supporting');
    await page.fill('.supporting-character-card .char-name', '配角');
    await page.locator('.supporting-character-card .avatar-option').first().click();

    // 选择亲密度为"敌对"
    await page.locator('.intimacy-option[data-value="-50"]').click();
    
    // 验证选中状态
    await expect(page.locator('.intimacy-option[data-value="-50"]')).toHaveClass(/selected/);
  });

  test('亲密度显示为三档', async ({ page, request }) => {
    // 创建带亲密度的配角
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '亲密度显示测试',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: '敌对角色',
            avatar: '😈',
            role_type: '反派',
            personality: '阴险',
            speech_style: '阴阳怪气',
            intimacy: -50,
            is_protagonist: 0
          },
          {
            name: '中立角色',
            avatar: '😐',
            role_type: '路人',
            personality: '随和',
            speech_style: '简洁直接',
            intimacy: 0,
            is_protagonist: 0
          },
          {
            name: '友好角色',
            avatar: '😊',
            role_type: '朋友',
            personality: '善良',
            speech_style: '温柔体贴',
            intimacy: 50,
            is_protagonist: 0
          }
        ]
      }
    });
    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/book.html?id=${testBookId}`);

    // 切换到角色视图
    await page.click('.view-tab[data-view="characters"]');

    // 验证亲密度显示
    const enemyCard = page.locator('.character-card:has-text("敌对角色")');
    await expect(enemyCard.locator('.intimacy-badge')).toContainText('敌对');

    const neutralCard = page.locator('.character-card:has-text("中立角色")');
    await expect(neutralCard.locator('.intimacy-badge')).toContainText('中立');

    const friendlyCard = page.locator('.character-card:has-text("友好角色")');
    await expect(friendlyCard.locator('.intimacy-badge')).toContainText('友好');
  });

  test('章节生成后更新配角亲密度', async ({ request }) => {
    // 创建书籍
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '亲密度更新测试',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: [
          {
            name: '测试配角',
            avatar: '🧝',
            role_type: '精灵',
            personality: '勇敢',
            speech_style: '简洁直接',
            intimacy: 50,
            is_protagonist: 0
          }
        ]
      }
    });
    const bookData = await bookResponse.json();
    const bookId = bookData.data.book_id;

    // 获取初始亲密度
    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const supportingChar = charsData.data.find(c => c.is_protagonist === 0);
    const initialIntimacy = supportingChar.intimacy;

    // 创建章节
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;
    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonistId,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });

    // 验证亲密度可能已更新
    const updatedCharsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const updatedCharsData = await updatedCharsResponse.json();
    const updatedChar = updatedCharsData.data.find(c => c.char_id === supportingChar.char_id);

    // 亲密度应该在-100到+100范围内
    expect(updatedChar.intimacy).toBeGreaterThanOrEqual(-100);
    expect(updatedChar.intimacy).toBeLessThanOrEqual(100);
  });

  test('亲密度数值范围验证', async ({ request }) => {
    // 测试边界值
    const intimacies = [-100, -50, 0, 50, 100];
    
    for (const intimacy of intimacies) {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `亲密度${intimacy}测试`,
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: [
            {
              name: `亲密度${intimacy}角色`,
              avatar: '🧝',
              role_type: '精灵',
              personality: '勇敢',
              speech_style: '简洁直接',
              intimacy: intimacy,
              is_protagonist: 0
            }
          ]
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    }
  });
});
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/intimacy.spec.js --reporter=list`
Expected: 所有亲密度测试通过

**Step 3: Commit**

```bash
git add tests/e2e/intimacy.spec.js
git commit -m "test: add intimacy system E2E tests"
```

---

### Task 8: 修复亲密度显示档位

**Files:**
- Modify: `src/frontend/js/utils.js` 或相关文件中的亲密度显示函数

**Step 1: 修改亲密度显示函数**

找到并修改 `getIntimacyText` 或类似函数：

```javascript
function getIntimacyText(intimacy) {
  if (intimacy <= -30) {
    return '敌对';
  } else if (intimacy >= 30) {
    return '友好';
  } else {
    return '中立';
  }
}

function getIntimacyClass(intimacy) {
  if (intimacy <= -30) {
    return 'hostile';
  } else if (intimacy >= 30) {
    return 'friendly';
  } else {
    return 'neutral';
  }
}

function getIntimacyIcon(intimacy) {
  if (intimacy <= -30) {
    return '😠';
  } else if (intimacy >= 30) {
    return '😊';
  } else {
    return '😐';
  }
}
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/intimacy.spec.js --reporter=list`
Expected: 亲密度显示测试通过

**Step 3: Commit**

```bash
git add src/frontend/js/utils.js
git commit -m "fix: change intimacy display to three levels (hostile/neutral/friendly)"
```

---

### Task 9: 创建权限控制测试

**Files:**
- Create: `tests/e2e/permission.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('权限控制', () => {
  let db;
  let testUserId;
  let testBookId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('未登录用户解谜成功应提示登录', async ({ page, request }) => {
    // 创建书籍和章节
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '权限测试书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    // 创建章节
    const charsResponse = await request.get(`/api/characters?book_id=${testBookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${testBookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: testBookId,
        selected_cards: {
          protagonist_id: protagonistId,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });
    const chapterData = await chapterResponse.json();
    const chapterId = chapterData.data.chapter.chapter_id;
    const puzzleId = chapterData.data.puzzle.puzzle_id;

    // 获取谜题答案
    const puzzleResponse = await request.get(`/api/puzzles/${puzzleId}`);
    const puzzleData = await puzzleResponse.json();
    const answer = puzzleData.data.answer;

    // 不登录直接访问章节页
    await page.goto(`/chapter.html?id=${chapterId}`);

    // 提交正确答案
    const answerInput = page.locator('#puzzleAnswer, .puzzle-input');
    await answerInput.fill(answer);
    
    const submitBtn = page.locator('.btn-submit, button:has-text("提交")');
    await submitBtn.click();

    // 验证提示登录
    const loginPrompt = page.locator('.login-prompt, .toast:has-text("登录")');
    await expect(loginPrompt).toBeVisible();
  });

  test('未登录用户不能获得卡牌', async ({ request }) => {
    // 创建书籍和章节
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '卡牌权限测试',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await bookResponse.json();
    const bookId = bookData.data.book_id;

    // 创建章节
    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: testUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonistId,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });
    const chapterData = await chapterResponse.json();
    const puzzleId = chapterData.data.puzzle.puzzle_id;

    // 获取谜题答案
    const puzzleResponse = await request.get(`/api/puzzles/${puzzleId}`);
    const puzzleData = await puzzleResponse.json();
    const answer = puzzleData.data.answer;

    // 记录解谜前的卡牌数量
    const beforeCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?',
      [bookId]
    ).count;

    // 不提供user_id提交答案
    const solveResponse = await request.post(`/api/puzzles/${puzzleId}/solve`, {
      data: {
        answer: answer
        // 不提供 user_id
      }
    });

    const solveResult = await solveResponse.json();
    
    // 验证不获得卡牌
    const afterCount = db.query(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ?',
      [bookId]
    ).count;
    
    expect(afterCount).toBe(beforeCount);
  });

  test('添加章节时验证用户权限', async ({ page, request }) => {
    // 创建书籍
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '章节权限测试',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await bookResponse.json();
    testBookId = bookData.data.book_id;

    // 不登录访问导演页
    await page.goto(`/director.html?book_id=${testBookId}`);

    // 应该跳转到登录页
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  test('用户不能操作他人书籍', async ({ request }) => {
    // 创建另一个用户
    const otherUserResponse = await request.post('/api/users', {
      data: {
        email: 'other@example.com',
        password: 'password123'
      }
    });
    const otherUserData = await otherUserResponse.json();
    const otherUserId = otherUserData.data.user_id;

    // 用原用户创建书籍
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '原用户书籍',
        type: 'adventure',
        protagonist: {
          name: '主角',
          avatar: '🧙‍♂️',
          role_type: 'protagonist',
          is_protagonist: 1
        },
        supporting_characters: []
      }
    });
    const bookData = await bookResponse.json();
    const bookId = bookData.data.book_id;

    // 尝试用其他用户创建章节
    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: otherUserId,  // 使用其他用户ID
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonistId,
          weather_id: cards.find(c => c.sub_type === 'weather').card_id,
          terrain_id: cards.find(c => c.sub_type === 'terrain').card_id,
          adventure_id: cards.find(c => c.sub_type === 'adventure').card_id,
          equipment_id: cards.find(c => c.sub_type === 'equipment').card_id
        }
      }
    });

    const chapterResult = await chapterResponse.json();
    expect(chapterResult.success).toBe(false);
    expect(chapterResult.error).toContain('权限');
  });
});
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/permission.spec.js --reporter=list`
Expected: 所有权限测试通过

**Step 3: Commit**

```bash
git add tests/e2e/permission.spec.js
git commit -m "test: add permission control E2E tests"
```

---

## 第二阶段：P1重要功能测试（中优先级）

### Task 10: 创建字段验证测试

**Files:**
- Modify: `tests/e2e/book-create.spec.js`

**Step 1: 添加书籍名称长度验证测试**

```javascript
test('书籍名称超过50字符应显示错误', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/book-create.html');

  const longTitle = 'a'.repeat(51);
  await page.fill('#storyTitle', longTitle);
  await page.selectOption('#storyGenre', 'adventure');
  await page.click('#step1 .btn-next');

  const errorMsg = page.locator('.error-message, .validation-error');
  await expect(errorMsg).toContainText('50');
});

test('书籍名称正好50字符应通过验证', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/book-create.html');

  const maxTitle = 'a'.repeat(50);
  await page.fill('#storyTitle', maxTitle);
  await page.selectOption('#storyGenre', 'adventure');
  await page.click('#step1 .btn-next');

  // 应该进入步骤2
  await expect(page.locator('#step2.active')).toBeVisible();
});
```

**Step 2: 添加主角名称长度验证测试**

```javascript
test('主角名称超过20字符应显示错误', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/book-create.html');

  await page.fill('#storyTitle', '测试书籍');
  await page.selectOption('#storyGenre', 'adventure');
  await page.click('#step1 .btn-next');

  const longName = 'a'.repeat(21);
  await page.fill('#protagonistName', longName);
  await page.locator('#protagonistAvatars .avatar-option').first().click();
  await page.click('#step2 .btn-next');

  const errorMsg = page.locator('.error-message, .validation-error');
  await expect(errorMsg).toContainText('20');
});
```

**Step 3: 添加必填字段验证测试**

```javascript
test('主角性格必选验证', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/book-create.html');

  await page.fill('#storyTitle', '测试书籍');
  await page.selectOption('#storyGenre', 'adventure');
  await page.click('#step1 .btn-next');

  await page.fill('#protagonistName', '主角');
  await page.locator('#protagonistAvatars .avatar-option').first().click();
  // 不选择性格
  await page.click('#step2 .btn-next');

  const errorMsg = page.locator('.error-message, .validation-error');
  await expect(errorMsg).toBeVisible();
});

test('主角说话方式必选验证', async ({ page }) => {
  await page.addInitScript((userId) => {
    localStorage.setItem('user_id', userId);
  }, testUserId);

  await page.goto('/book-create.html');

  await page.fill('#storyTitle', '测试书籍');
  await page.selectOption('#storyGenre', 'adventure');
  await page.click('#step1 .btn-next');

  await page.fill('#protagonistName', '主角');
  await page.locator('#protagonistAvatars .avatar-option').first().click();
  await page.selectOption('#protagonistPersonality', '勇敢');
  // 不选择说话方式
  await page.click('#step2 .btn-next');

  const errorMsg = page.locator('.error-message, .validation-error');
  await expect(errorMsg).toBeVisible();
});
```

**Step 4: 运行测试验证**

Run: `npx playwright test tests/e2e/book-create.spec.js --reporter=list`
Expected: 字段验证测试通过

**Step 5: Commit**

```bash
git add tests/e2e/book-create.spec.js
git commit -m "test: add field validation E2E tests"
```

---

### Task 11: 创建预设数据验证测试

**Files:**
- Create: `tests/e2e/preset-data.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('预设数据验证', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.execSqlFile('migrations/0002_seed_data.sql');
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('应有4本预设书籍', async () => {
    const presetBooks = db.queryAll(
      'SELECT * FROM books WHERE is_preset = 1'
    );
    expect(presetBooks.length).toBe(4);
  });

  test('每本预设书籍应有4个章节', async () => {
    const presetBooks = db.queryAll(
      'SELECT book_id FROM books WHERE is_preset = 1'
    );

    for (const book of presetBooks) {
      const chapters = db.queryAll(
        'SELECT * FROM chapters WHERE book_id = ?',
        [book.book_id]
      );
      expect(chapters.length).toBe(4);
    }
  });

  test('每个预设章节字数应在280-320之间', async () => {
    const presetChapters = db.queryAll(`
      SELECT c.* FROM chapters c
      JOIN books b ON c.book_id = b.book_id
      WHERE b.is_preset = 1
    `);

    for (const chapter of presetChapters) {
      const wordCount = chapter.content.length;
      expect(wordCount).toBeGreaterThanOrEqual(280);
      expect(wordCount).toBeLessThanOrEqual(320);
    }
  });

  test('每种书籍类型应有正确的角色类型预设', async ({ request }) => {
    const types = ['adventure', 'fantasy', 'romance', 'business'];
    
    for (const type of types) {
      const response = await request.get(`/api/config/character-types?book_type=${type}`);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    }
  });

  test('应有25种性格预设', async ({ request }) => {
    const response = await request.get('/api/config/personality');
    const result = await response.json();
    
    expect(result.success).toBe(true);
    expect(result.data.length).toBe(25);
  });

  test('应有25种说话方式预设', async ({ request }) => {
    const response = await request.get('/api/config/speech-style');
    const result = await response.json();
    
    expect(result.success).toBe(true);
    expect(result.data.length).toBe(25);
  });
});
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/preset-data.spec.js --reporter=list`
Expected: 预设数据验证测试通过

**Step 3: Commit**

```bash
git add tests/e2e/preset-data.spec.js
git commit -m "test: add preset data validation E2E tests"
```

---

## 第三阶段：P2优化功能测试（低优先级）

### Task 12: 创建UI风格测试

**Files:**
- Create: `tests/e2e/theme.spec.js`

**Step 1: 创建测试文件**

```javascript
import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('UI风格差异化', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  const bookTypes = [
    { type: 'adventure', name: '儿童冒险', primaryColor: 'rgb(255, 193, 7)' },
    { type: 'fantasy', name: '魔幻传说', primaryColor: 'rgb(156, 39, 176)' },
    { type: 'romance', name: '都市言情', primaryColor: 'rgb(233, 30, 99)' },
    { type: 'business', name: '职场风云', primaryColor: 'rgb(96, 125, 139)' }
  ];

  for (const { type, name, primaryColor } of bookTypes) {
    test(`${name}风格应正确应用`, async ({ page, request }) => {
      // 创建书籍
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: `${name}测试书籍`,
          type: type,
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      const data = await response.json();
      const bookId = data.data.book_id;

      await page.addInitScript((userId) => {
        localStorage.setItem('user_id', userId);
      }, testUserId);

      // 访问书籍详情页
      await page.goto(`/book.html?id=${bookId}`);

      // 检查主题CSS是否加载
      const themeLink = page.locator(`link[href*="theme-${type}"]`);
      const themeLoaded = await themeLink.count() > 0 || 
        await page.locator('body').evaluate((el, expectedType) => {
          return el.classList.contains(`theme-${expectedType}`) ||
                 document.querySelector(`link[href*="theme-${expectedType}"]`) !== null;
        }, type);

      expect(themeLoaded).toBe(true);
    });
  }
});
```

**Step 2: 运行测试验证**

Run: `npx playwright test tests/e2e/theme.spec.js --reporter=list`
Expected: UI风格测试通过

**Step 3: Commit**

```bash
git add tests/e2e/theme.spec.js
git commit -m "test: add UI theme differentiation E2E tests"
```

---

### Task 13: 运行所有测试验证

**Step 1: 运行所有E2E测试**

Run: `npx playwright test --reporter=list`
Expected: 所有测试通过

**Step 2: 生成测试覆盖率报告**

Run: `npx playwright test --reporter=html`
Expected: 生成HTML报告

**Step 3: 验证测试覆盖率**

检查测试覆盖率是否达到目标：
- P0核心功能：100%
- P1重要功能：80%+

---

## 任务完成清单

### P0核心功能（必须完成）
- [ ] Task 1: 创建卡牌上限检查测试文件
- [ ] Task 2: 实现前端卡牌上限检查功能
- [ ] Task 3: 实现后端卡牌上限检查API
- [ ] Task 4: 实现书籍删除功能
- [ ] Task 5: 创建书籍删除功能测试
- [ ] Task 6: 实现配角亲密度选择UI
- [ ] Task 7: 创建亲密度系统测试
- [ ] Task 8: 修复亲密度显示档位
- [ ] Task 9: 创建权限控制测试

### P1重要功能（应该完成）
- [ ] Task 10: 创建字段验证测试
- [ ] Task 11: 创建预设数据验证测试

### P2优化功能（可选完成）
- [ ] Task 12: 创建UI风格测试
- [ ] Task 13: 运行所有测试验证

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-13 | 初始版本，包含13个任务 |
