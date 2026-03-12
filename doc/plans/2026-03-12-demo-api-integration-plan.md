# Demo页面API集成实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 将demo页面的UI复制到src/frontend目录，并将假数据替换为真实API调用

**Architecture:** 采用渐进式迁移策略，按用户流程顺序逐个页面迁移。每个页面保持单文件HTML结构，内联样式和脚本，通过API调用获取真实数据。

**Tech Stack:** HTML5, CSS3, JavaScript ES6+, Cloudflare Functions API, localStorage认证

---

## 前置条件

- Cloudflare Functions API已实现（functions/api/目录）
- D1数据库已配置
- wrangler.toml已配置

---

## Task 1: 创建通用API工具模块

**Files:**
- Modify: `src/frontend/js/api.js`

**Step 1: 读取现有api.js文件**

Run: `cat src/frontend/js/api.js`
Expected: 显示现有API封装代码

**Step 2: 更新api.js添加完整的API封装**

```javascript
const API_BASE = '/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  return data.data;
}

const UserAPI = {
  login: (email, password) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  getUser: (userId) => apiRequest(`/users?user_id=${userId}`)
};

const BookAPI = {
  getUserBooks: (userId) => apiRequest(`/books?user_id=${userId}`),
  getPresetBooks: () => apiRequest('/books/preset'),
  getBook: (bookId) => apiRequest(`/books/${bookId}`),
  createBook: (data) => apiRequest('/books', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateBook: (bookId, data) => apiRequest(`/books/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteBook: (bookId) => apiRequest(`/books/${bookId}`, {
    method: 'DELETE'
  })
};

const CharacterAPI = {
  getCharacters: (bookId) => apiRequest(`/characters?book_id=${bookId}`),
  createCharacter: (data) => apiRequest('/characters', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

const PlotCardAPI = {
  getCards: (bookId) => apiRequest(`/plot-cards?book_id=${bookId}`),
  createCard: (data) => apiRequest('/plot-cards', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteCard: (cardId) => apiRequest(`/plot-cards/${cardId}`, {
    method: 'DELETE'
  })
};

const ChapterAPI = {
  getChapters: (bookId) => apiRequest(`/chapters?book_id=${bookId}`),
  getChapter: (chapterId) => apiRequest(`/chapters/${chapterId}`),
  createChapter: (data) => apiRequest('/chapters', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

const PuzzleAPI = {
  getPuzzle: (puzzleId) => apiRequest(`/puzzles/${puzzleId}`),
  solvePuzzle: (puzzleId, answer) => apiRequest(`/puzzles/${puzzleId}/solve`, {
    method: 'POST',
    body: JSON.stringify({ answer })
  })
};

const ConfigAPI = {
  getBookTypes: () => apiRequest('/config/book-types'),
  getCharacterTypes: (bookType) => apiRequest(`/config/character-types?book_type=${bookType}`),
  getPersonality: () => apiRequest('/config/personality'),
  getSpeechStyle: () => apiRequest('/config/speech-style'),
  getPlotOptions: (bookType, subType) => apiRequest(`/config/plot-options?book_type=${bookType}&sub_type=${subType}`)
};

function checkAuth() {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    window.location.href = 'login.html';
    return null;
  }
  return userId;
}

function logout() {
  localStorage.removeItem('user_id');
  localStorage.removeItem('email');
  window.location.href = 'login.html';
}

function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
```

**Step 3: 验证文件语法**

Run: `node --check src/frontend/js/api.js`
Expected: 无错误输出

**Step 4: 提交更改**

```bash
git add src/frontend/js/api.js
git commit -m "feat: add complete API wrapper module"
```

---

## Task 2: 迁移Login页面

**Files:**
- Create: `src/frontend/login.html`

**Step 1: 复制demo/login.html到src/frontend**

Run: `cp demo/login.html src/frontend/login.html`
Expected: 文件复制成功

**Step 2: 修改login.html添加API调用**

找到内联脚本部分，替换handleLogin函数：

```javascript
async function handleLogin() {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;
  
  if (!email || !password) {
    showNotification('Please enter email and password', 'error');
    return;
  }
  
  const btn = document.querySelector('.wax-seal');
  btn.style.animation = 'waxSealPress 0.3s ease';
  
  try {
    const result = await UserAPI.login(email, password);
    localStorage.setItem('user_id', result.user_id);
    localStorage.setItem('email', result.email);
    
    showNotification(result.is_new_user ? 'Welcome, new traveler!' : 'Welcome back!', 'success');
    
    setTimeout(() => {
      window.location.href = 'bookshelf.html';
    }, 500);
  } catch (error) {
    showNotification(error.message, 'error');
  }
}
```

**Step 3: 更新脚本引用**

在`</body>`标签前添加：

```html
<script src="js/api.js"></script>
```

**Step 4: 测试登录功能**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 本地服务器启动，可以访问http://localhost:8788/login.html

**Step 5: 提交更改**

```bash
git add src/frontend/login.html
git commit -m "feat: migrate login page with API integration"
```

---

## Task 3: 迁移Bookshelf页面

**Files:**
- Create: `src/frontend/bookshelf.html`

**Step 1: 复制demo/bookshelf.html到src/frontend**

Run: `cp demo/bookshelf.html src/frontend/bookshelf.html`
Expected: 文件复制成功

**Step 2: 修改bookshelf.html添加API调用**

替换内联脚本中的数据加载部分：

```javascript
let allBooks = [];
let allPresetBooks = [];

document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 30);
  
  const userId = checkAuth();
  if (!userId) return;
  
  await loadBooks(userId);
  initFilterTabs();
});

async function loadBooks(userId) {
  try {
    const [userBooks, presetBooks] = await Promise.all([
      BookAPI.getUserBooks(userId),
      BookAPI.getPresetBooks()
    ]);
    
    allBooks = userBooks;
    allPresetBooks = presetBooks;
    
    renderMyBooks(userBooks);
    renderPresetBooks(presetBooks);
  } catch (error) {
    showNotification('Failed to load books: ' + error.message, 'error');
  }
}

function renderMyBooks(books) {
  const container = document.getElementById('myBooks');
  const addCard = container.querySelector('.book-item');
  
  books.forEach(book => {
    const bookEl = createBookElement(book);
    container.insertBefore(bookEl, addCard);
  });
}

function renderPresetBooks(books) {
  const container = document.getElementById('presetBooks');
  container.innerHTML = '';
  
  books.forEach(book => {
    const bookEl = createBookElement(book);
    container.appendChild(bookEl);
  });
}

function createBookElement(book) {
  const typeIcons = {
    adventure: '🗺️',
    fantasy: '🧙',
    romance: '💕',
    business: '💼'
  };
  
  const colors = {
    adventure: 'linear-gradient(135deg, #2a4a2a 0%, #1a2a1a 100%)',
    fantasy: 'linear-gradient(135deg, #2a1a4a 0%, #1a0a2e 100%)',
    romance: 'linear-gradient(135deg, #4a1a2a 0%, #2a0a1e 100%)',
    business: 'linear-gradient(135deg, #1a2a3a 0%, #0a1a2e 100%)'
  };
  
  const div = document.createElement('div');
  div.className = 'book-item';
  div.dataset.type = book.type;
  div.innerHTML = `
    <div class="book-3d" onclick="window.location.href='book.html?id=${book.book_id}'">
      <div class="book-cover" style="background: ${colors[book.type] || colors.adventure}">
        <span style="font-size: 48px;">${typeIcons[book.type] || '📖'}</span>
      </div>
      <div class="book-spine"></div>
      <div class="book-pages"></div>
      <div class="book-title">${book.title}</div>
      <div class="book-tag">${book.type}</div>
    </div>
    <div class="book-info">
      <h4>${book.title}</h4>
      <p>${book.chapter_count || 0} chapters</p>
      <div class="book-progress">
        <div class="book-progress-bar" style="width: ${book.progress || 0}%"></div>
      </div>
    </div>
  `;
  return div;
}
```

**Step 3: 更新用户信息显示**

```javascript
function updateUserInfo() {
  const email = localStorage.getItem('email');
  const userAvatar = document.querySelector('.user-avatar');
  const userName = document.querySelector('.user-name');
  
  if (email) {
    userName.textContent = email.split('@')[0];
  }
}
```

**Step 4: 添加登出功能**

```javascript
function handleLogout() {
  logout();
}
```

**Step 5: 更新脚本引用**

```html
<script src="js/api.js"></script>
```

**Step 6: 测试书架页面**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 登录后可以查看用户书籍和预设书籍

**Step 7: 提交更改**

```bash
git add src/frontend/bookshelf.html
git commit -m "feat: migrate bookshelf page with API integration"
```

---

## Task 4: 迁移Book详情页面

**Files:**
- Create: `src/frontend/book.html`

**Step 1: 复制demo/book.html到src/frontend**

Run: `cp demo/book.html src/frontend/book.html`
Expected: 文件复制成功

**Step 2: 修改book.html添加API调用**

```javascript
let currentBook = null;
let currentView = 'chapters';

document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 30);
  
  const userId = checkAuth();
  if (!userId) return;
  
  const bookId = getUrlParam('id');
  if (!bookId) {
    window.location.href = 'bookshelf.html';
    return;
  }
  
  await loadBook(bookId);
});

async function loadBook(bookId) {
  try {
    const book = await BookAPI.getBook(bookId);
    currentBook = book;
    
    renderBookHeader(book);
    renderBookPages();
  } catch (error) {
    showNotification('Failed to load book: ' + error.message, 'error');
  }
}

function renderBookHeader(book) {
  const typeIcons = {
    adventure: '🗺️',
    fantasy: '🧙',
    romance: '💕',
    business: '💼'
  };
  
  document.querySelector('.book-cover-small span').textContent = typeIcons[book.type] || '📖';
  document.querySelector('.book-meta-info h2').textContent = book.title;
  document.querySelector('.type-badge').textContent = book.type;
  document.querySelector('.stats').innerHTML = `
    <span>📜 ${book.chapters?.length || 0} Chapters</span>
    <span>👥 ${book.characters?.length || 0} Characters</span>
    <span>📖 ${book.progress || 0}% Progress</span>
  `;
}

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
    const chapters = currentBook.chapters || [];
    const half = Math.ceil(chapters.length / 2);
    
    leftContent.innerHTML = `<div class="chapter-list-view">${chapters.slice(0, half).map(ch => renderChapterCard(ch)).join('')}</div>`;
    rightContent.innerHTML = `<div class="chapter-list-view">${chapters.slice(half).map(ch => renderChapterCard(ch)).join('')}</div>`;
  } else if (currentView === 'characters') {
    const characters = currentBook.characters || [];
    const half = Math.ceil(characters.length / 2);
    
    leftContent.innerHTML = `<div class="character-grid-view">${characters.slice(0, half).map(ch => renderCharacterCard(ch)).join('')}</div>`;
    rightContent.innerHTML = `<div class="character-grid-view">${characters.slice(half).map(ch => renderCharacterCard(ch)).join('')}</div>`;
  } else if (currentView === 'plots') {
    renderPlotCards();
  }
}

async function renderPlotCards() {
  const leftContent = document.getElementById('leftPageContent');
  const rightContent = document.getElementById('rightPageContent');
  
  try {
    const cards = await PlotCardAPI.getCards(currentBook.book_id);
    const half = Math.ceil(cards.length / 2);
    
    leftContent.innerHTML = `<div class="plot-grid-view">${cards.slice(0, half).map(p => renderPlotCard(p)).join('')}</div>`;
    rightContent.innerHTML = `<div class="plot-grid-view">${cards.slice(half).map(p => renderPlotCard(p)).join('')}</div>`;
  } catch (error) {
    leftContent.innerHTML = '<p>Failed to load plot cards</p>';
  }
}

function renderChapterCard(chapter) {
  const statusIcon = {
    'read': '✓ Read',
    'current': '📖 Current',
    'locked': '🔒 Locked'
  };
  
  return `
    <div class="chapter-card ${chapter.status || 'locked'}" onclick="goToChapter('${chapter.chapter_id}')">
      <div class="chapter-number">Chapter ${chapter.order_num}</div>
      <div class="chapter-title">${chapter.title}</div>
      <div class="chapter-status">${statusIcon[chapter.status] || '🔒 Locked'}</div>
    </div>
  `;
}

function renderCharacterCard(char) {
  return `
    <div class="character-card-mini" onclick="showCharacterDetail('${char.char_id}')">
      <div class="avatar">${char.avatar || '👤'}</div>
      <div class="name">${char.name}</div>
      <div class="role">${char.role_type || 'Character'}</div>
    </div>
  `;
}

function renderPlotCard(plot) {
  return `
    <div class="plot-card-mini">
      <div class="plot-icon">${plot.icon || '🎭'}</div>
      <div class="plot-title">${plot.name}</div>
      <div class="plot-desc">${plot.description || ''}</div>
    </div>
  `;
}

function goToChapter(chapterId) {
  if (chapterId) {
    window.location.href = `chapter.html?id=${chapterId}`;
  }
}

function showCharacterDetail(charId) {
  const char = currentBook.characters?.find(c => c.char_id === charId);
  if (char) {
    showNotification(`Viewing: ${char.name}`, 'info');
  }
}
```

**Step 3: 更新脚本引用**

```html
<script src="js/api.js"></script>
```

**Step 4: 测试书籍详情页面**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 可以查看书籍详情、章节列表、角色列表

**Step 5: 提交更改**

```bash
git add src/frontend/book.html
git commit -m "feat: migrate book detail page with API integration"
```

---

## Task 5: 迁移Chapter阅读页面

**Files:**
- Create: `src/frontend/chapter.html`

**Step 1: 复制demo/chapter.html到src/frontend**

Run: `cp demo/chapter.html src/frontend/chapter.html`
Expected: 文件复制成功

**Step 2: 修改chapter.html添加API调用**

```javascript
let currentChapter = null;
let currentPuzzle = null;
let selectedOption = null;

document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 20);
  
  const userId = checkAuth();
  if (!userId) return;
  
  const chapterId = getUrlParam('id');
  if (!chapterId) {
    window.location.href = 'bookshelf.html';
    return;
  }
  
  await loadChapter(chapterId);
});

async function loadChapter(chapterId) {
  try {
    const chapter = await ChapterAPI.getChapter(chapterId);
    currentChapter = chapter;
    
    renderChapter(chapter);
    renderSidebarCards(chapter);
    
    if (chapter.puzzle_id) {
      await loadPuzzle(chapter.puzzle_id);
    }
  } catch (error) {
    showNotification('Failed to load chapter: ' + error.message, 'error');
  }
}

function renderChapter(chapter) {
  document.querySelector('.chapter-num').textContent = `CHAPTER ${chapter.order_num}`;
  document.querySelector('.chapter-name').textContent = chapter.title;
  
  const manuscriptText = document.querySelector('.manuscript-text');
  manuscriptText.innerHTML = formatChapterContent(chapter.content);
}

function formatChapterContent(content) {
  if (!content) return '<p>No content available</p>';
  
  const paragraphs = content.split('\n\n');
  let html = '';
  
  paragraphs.forEach((p, index) => {
    if (index === 0) {
      html += `<p><span class="drop-cap">${p.charAt(0)}</span>${p.slice(1)}</p>`;
    } else {
      html += `<p>${p}</p>`;
    }
  });
  
  return html;
}

async function loadPuzzle(puzzleId) {
  try {
    const puzzle = await PuzzleAPI.getPuzzle(puzzleId);
    currentPuzzle = puzzle;
  } catch (error) {
    console.error('Failed to load puzzle:', error);
  }
}

function showPuzzle() {
  if (!currentPuzzle) return;
  
  const overlay = document.getElementById('puzzleOverlay');
  const content = overlay.querySelector('.puzzle-content');
  
  content.querySelector('.puzzle-question').textContent = currentPuzzle.question;
  
  const optionsContainer = content.querySelector('.puzzle-options');
  optionsContainer.innerHTML = currentPuzzle.options?.map((opt, index) => `
    <div class="puzzle-option" onclick="selectOption(this, ${index})">${opt}</div>
  `).join('') || '<div class="puzzle-option" onclick="selectOption(this, 0)">Type your answer</div>';
  
  overlay.classList.add('active');
}

async function submitAnswer() {
  if (selectedOption === null) {
    showNotification('Please select an answer!', 'warning');
    return;
  }
  
  try {
    const result = await PuzzleAPI.solvePuzzle(currentPuzzle.puzzle_id, selectedOption);
    
    if (result.correct) {
      document.querySelectorAll('.puzzle-option')[selectedOption].classList.add('correct');
      setTimeout(() => {
        hidePuzzle();
        showNotification('Correct! The path is clear.', 'success');
      }, 1000);
    } else {
      document.querySelectorAll('.puzzle-option')[selectedOption].classList.add('wrong');
      showNotification('Incorrect. Try again!', 'error');
      setTimeout(() => {
        document.querySelectorAll('.puzzle-option').forEach(opt => {
          opt.classList.remove('selected', 'correct', 'wrong');
        });
        selectedOption = null;
      }, 1500);
    }
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

function prevChapter() {
  if (currentChapter?.prev_chapter_id) {
    window.location.href = `chapter.html?id=${currentChapter.prev_chapter_id}`;
  } else {
    showNotification('This is the first chapter', 'info');
  }
}

function nextChapter() {
  if (currentChapter?.next_chapter_id) {
    window.location.href = `chapter.html?id=${currentChapter.next_chapter_id}`;
  } else {
    showNotification('This is the last chapter', 'info');
  }
}
```

**Step 3: 更新脚本引用**

```html
<script src="js/api.js"></script>
```

**Step 4: 测试章节阅读页面**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 可以阅读章节内容，解答谜题

**Step 5: 提交更改**

```bash
git add src/frontend/chapter.html
git commit -m "feat: migrate chapter reading page with API integration"
```

---

## Task 6: 迁移Book-Create页面

**Files:**
- Create: `src/frontend/book-create.html`

**Step 1: 复制demo/book-create.html到src/frontend**

Run: `cp demo/book-create.html src/frontend/book-create.html`
Expected: 文件复制成功

**Step 2: 修改book-create.html添加API调用**

```javascript
let currentStep = 1;
let companionCount = 1;
let selectedProtagonistAvatar = null;
const selectedCompanionAvatars = {};
let bookTypes = [];

document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 30);
  
  const userId = checkAuth();
  if (!userId) return;
  
  await loadConfig();
});

async function loadConfig() {
  try {
    bookTypes = await ConfigAPI.getBookTypes();
    renderBookTypes();
    renderAvatarSelectors();
  } catch (error) {
    showNotification('Failed to load configuration', 'error');
  }
}

function renderBookTypes() {
  const select = document.getElementById('storyGenre');
  select.innerHTML = '<option value="">Select a genre...</option>' +
    bookTypes.map(type => `<option value="${type}">${type}</option>`).join('');
}

async function createStory() {
  const userId = localStorage.getItem('user_id');
  const title = document.getElementById('storyTitle').value;
  const type = document.getElementById('storyGenre').value;
  
  if (!title || !type) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  const protagonistName = document.getElementById('protagonistName').value;
  if (!protagonistName) {
    showNotification('Please enter protagonist name', 'error');
    return;
  }
  
  const protagonist = {
    name: protagonistName,
    avatar: selectedProtagonistAvatar || '👤',
    personality: document.getElementById('protagonistBackground').value || '',
    speech_style: '',
    role_type: 'protagonist'
  };
  
  const supportingCharacters = [];
  for (let i = 1; i <= companionCount; i++) {
    const nameInput = document.querySelector(`#companion${i} input`);
    if (nameInput?.value) {
      supportingCharacters.push({
        name: nameInput.value,
        avatar: selectedCompanionAvatars[`companion${i}`] || '👤',
        personality: '',
        speech_style: '',
        role_type: 'supporting',
        intimacy: 50,
        relationship: ''
      });
    }
  }
  
  showNotification('Creating your story...', 'info');
  
  try {
    const result = await BookAPI.createBook({
      user_id: userId,
      title,
      type,
      protagonist,
      supporting_characters: supportingCharacters
    });
    
    showNotification('Story created successfully!', 'success');
    nextStep();
  } catch (error) {
    showNotification('Failed to create story: ' + error.message, 'error');
  }
}
```

**Step 3: 更新脚本引用**

```html
<script src="js/api.js"></script>
```

**Step 4: 测试创建书籍页面**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 可以创建新书籍

**Step 5: 提交更改**

```bash
git add src/frontend/book-create.html
git commit -m "feat: migrate book create page with API integration"
```

---

## Task 7: 迁移Director页面

**Files:**
- Create: `src/frontend/director.html`

**Step 1: 复制demo/director.html到src/frontend**

Run: `cp demo/director.html src/frontend/director.html`
Expected: 文件复制成功

**Step 2: 修改director.html添加API调用**

```javascript
const selections = {
  protagonist: null,
  supporting: [],
  adventure: null,
  terrain: null,
  weather: null,
  equipment: null
};

let characters = [];
let plotCards = [];
let currentBook = null;

document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 30);
  
  const userId = checkAuth();
  if (!userId) return;
  
  const bookId = getUrlParam('book_id');
  if (!bookId) {
    window.location.href = 'bookshelf.html';
    return;
  }
  
  await loadDirectorData(bookId);
});

async function loadDirectorData(bookId) {
  try {
    const [book, chars, cards] = await Promise.all([
      BookAPI.getBook(bookId),
      CharacterAPI.getCharacters(bookId),
      PlotCardAPI.getCards(bookId)
    ]);
    
    currentBook = book;
    characters = chars;
    plotCards = cards;
    
    renderAllFanCards();
  } catch (error) {
    showNotification('Failed to load director data: ' + error.message, 'error');
  }
}

function renderAllFanCards() {
  const protagonistCards = characters.filter(c => c.is_protagonist === 1);
  const supportingCards = characters.filter(c => c.is_protagonist === 0);
  
  createFanCards(document.getElementById('characterFan'), 
    [...protagonistCards.map(c => ({...c, role: 'protagonist'})), 
     ...supportingCards.map(c => ({...c, role: 'supporting'}))], 
    'character', 4);
  
  const adventureCards = plotCards.filter(c => c.sub_type === 'adventure');
  const terrainCards = plotCards.filter(c => c.sub_type === 'terrain');
  const weatherCards = plotCards.filter(c => c.sub_type === 'weather');
  const equipmentCards = plotCards.filter(c => c.sub_type === 'equipment');
  
  createFanCards(document.getElementById('adventureFan'), 
    adventureCards.map(c => ({id: c.card_id, name: c.name, avatar: c.icon})), 
    'adventure', 1);
  
  createFanCards(document.getElementById('terrainFan'), 
    terrainCards.map(c => ({id: c.card_id, name: c.name, avatar: c.icon})), 
    'terrain', 1);
  
  createFanCards(document.getElementById('weatherFan'), 
    weatherCards.map(c => ({id: c.card_id, name: c.name, avatar: c.icon})), 
    'weather', 1);
  
  createFanCards(document.getElementById('equipmentFan'), 
    equipmentCards.map(c => ({id: c.card_id, name: c.name, avatar: c.icon})), 
    'equipment', 1);
}

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
  
  const userId = localStorage.getItem('user_id');
  
  document.getElementById('loadingOverlay').classList.add('active');
  
  try {
    const result = await ChapterAPI.createChapter({
      user_id: userId,
      book_id: currentBook.book_id,
      selected_cards: {
        protagonist_id: selections.protagonist.char_id || selections.protagonist.id,
        supporting_ids: selections.supporting.map(c => c.char_id || c.id),
        weather_id: selections.weather.id,
        terrain_id: selections.terrain.id,
        adventure_id: selections.adventure.id,
        equipment_id: selections.equipment?.id
      }
    });
    
    document.getElementById('loadingOverlay').classList.remove('active');
    showNotification('Chapter created successfully!', 'success');
    
    setTimeout(() => {
      window.location.href = `chapter.html?id=${result.chapter.chapter_id}`;
    }, 1000);
  } catch (error) {
    document.getElementById('loadingOverlay').classList.remove('active');
    showNotification('Failed to create chapter: ' + error.message, 'error');
  }
}
```

**Step 3: 更新脚本引用**

```html
<script src="js/api.js"></script>
```

**Step 4: 测试导演页面**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 可以选择卡牌并创建章节

**Step 5: 提交更改**

```bash
git add src/frontend/director.html
git commit -m "feat: migrate director page with API integration"
```

---

## Task 8: 迁移Index首页

**Files:**
- Create: `src/frontend/index.html`

**Step 1: 复制demo/index.html到src/frontend**

Run: `cp demo/index.html src/frontend/index.html`
Expected: 文件复制成功

**Step 2: 修改index.html添加认证检查**

```javascript
document.addEventListener('DOMContentLoaded', function() {
  createParticles(document.getElementById('particles'), 50);
  
  const userId = localStorage.getItem('user_id');
  if (userId) {
    window.location.href = 'bookshelf.html';
  }
});
```

**Step 3: 更新脚本引用**

```html
<script src="js/api.js"></script>
```

**Step 4: 测试首页**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 已登录用户自动跳转到书架

**Step 5: 提交更改**

```bash
git add src/frontend/index.html
git commit -m "feat: migrate index page with auth check"
```

---

## Task 9: 复制CSS文件

**Files:**
- Copy: `demo/css/*` to `src/frontend/css/`

**Step 1: 创建CSS目录**

Run: `mkdir -p src/frontend/css`
Expected: 目录创建成功

**Step 2: 复制CSS文件**

Run: `cp demo/css/* src/frontend/css/`
Expected: 所有CSS文件复制成功

**Step 3: 提交更改**

```bash
git add src/frontend/css/
git commit -m "feat: copy CSS files from demo"
```

---

## Task 10: 复制JS文件

**Files:**
- Copy: `demo/js/main.js` to `src/frontend/js/main.js`
- Copy: `demo/js/theme.js` to `src/frontend/js/theme.js`

**Step 1: 复制JS文件**

Run: `cp demo/js/main.js src/frontend/js/ && cp demo/js/theme.js src/frontend/js/`
Expected: JS文件复制成功

**Step 2: 提交更改**

```bash
git add src/frontend/js/main.js src/frontend/js/theme.js
git commit -m "feat: copy JS utility files from demo"
```

---

## Task 11: 最终测试

**Step 1: 启动本地开发服务器**

Run: `npx wrangler pages dev src/frontend --compatibility-date=2024-01-01`
Expected: 服务器启动成功

**Step 2: 测试完整用户流程**

1. 访问 http://localhost:8788
2. 点击登录，输入邮箱和密码
3. 查看书架页面
4. 点击书籍查看详情
5. 点击章节阅读
6. 创建新书籍
7. 使用导演创建章节

**Step 3: 验证API调用**

检查浏览器开发者工具的Network面板，确认所有API调用正常。

**Step 4: 最终提交**

```bash
git add -A
git commit -m "feat: complete demo to src/frontend migration with API integration"
```

---

## 验收标准

- [ ] 所有7个页面已迁移到src/frontend
- [ ] 所有页面使用真实API调用
- [ ] 用户认证流程正常
- [ ] 书籍CRUD功能正常
- [ ] 章节创建和阅读功能正常
- [ ] 谜题解答功能正常
- [ ] 无控制台错误
