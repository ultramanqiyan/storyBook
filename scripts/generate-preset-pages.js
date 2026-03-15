import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TYPE_NAMES = {
  zh: { adventure: '冒险', fantasy: '奇幻', romance: '言情', business: '职场' },
  en: { adventure: 'Adventure', fantasy: 'Fantasy', romance: 'Romance', business: 'Business' }
};

const TYPE_ICONS = {
  adventure: '🗺️',
  fantasy: '🧙',
  romance: '💕',
  business: '💼'
};

function parseSingleRowValues(rowStr) {
  const values = [];
  let current = '';
  let inString = false;
  let i = 0;
  
  while (i < rowStr.length) {
    const char = rowStr[i];
    
    if (char === "'" && !inString) {
      inString = true;
      i++;
      continue;
    }
    
    if (char === "'" && inString) {
      if (rowStr[i + 1] === "'") {
        current += "'";
        i += 2;
        continue;
      }
      inString = false;
      i++;
      continue;
    }
    
    if (char === ',' && !inString) {
      values.push(current.trim());
      current = '';
      i++;
      continue;
    }
    
    current += char;
    i++;
  }
  
  if (current.trim()) {
    values.push(current.trim());
  }
  
  return values;
}

function parseInsertStatements(sql, tableName) {
  const results = [];
  
  const regex = new RegExp(
    `INSERT INTO ${tableName}\\s*\\([^)]+\\)\\s*VALUES\\s*`,
    'g'
  );
  
  let match;
  while ((match = regex.exec(sql)) !== null) {
    const startIndex = match.index + match[0].length;
    let endIndex = sql.indexOf(';', startIndex);
    if (endIndex === -1) endIndex = sql.length;
    
    const valuesSection = sql.substring(startIndex, endIndex);
    
    const rowRegex = /\(([^)]+)\)/g;
    let rowMatch;
    while ((rowMatch = rowRegex.exec(valuesSection)) !== null) {
      const values = parseSingleRowValues(rowMatch[1]);
      results.push(values);
    }
  }
  
  return results;
}

function generateBookHTML(book, characters, chapters) {
  const lang = book.language;
  const isZh = lang === 'zh';
  const typeName = TYPE_NAMES[lang][book.type] || book.type;
  const typeIcon = TYPE_ICONS[book.type] || '📖';
  
  const characterSchema = characters.map(c => ({
    '@type': 'Person',
    name: c.name,
    description: `${c.roleType} - ${c.personality}`
  }));
  
  const protagonists = characters.filter(c => c.isProtagonist);
  const otherCharacters = characters.filter(c => !c.isProtagonist);
  
  const halfChapters = Math.ceil(chapters.length / 2);
  const leftChapters = chapters.slice(0, halfChapters);
  const rightChapters = chapters.slice(halfChapters);
  
  const halfChars = Math.ceil(characters.length / 2);
  const leftChars = characters.slice(0, halfChars);
  const rightChars = characters.slice(halfChars);
  
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <title>${book.title} - StoryBook</title>
  <meta name="description" content="${isZh ? book.title + ' - AI互动故事' : book.title + ' - AI Interactive Story'}">
  <meta name="keywords" content="${isZh ? '互动故事, AI故事, ' + book.title + ', ' + typeName : 'interactive story, AI story, ' + book.title + ', ' + typeName}">
  <meta property="og:title" content="${book.title} - StoryBook">
  <meta property="og:description" content="${isZh ? book.title + ' - AI互动故事' : book.title + ' - AI Interactive Story'}">
  <meta property="og:type" content="book">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/themes.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "${book.title}",
    "genre": "${typeName}",
    "inLanguage": "${isZh ? 'zh' : 'en'}",
    "author": { "@type": "Organization", "name": "StoryBook" },
    "character": ${JSON.stringify(characterSchema)},
    "numberOfPages": "${chapters.length}"
  }
  </script>
  <style>
    .book-opening-page {
      height: 100vh;
      padding-top: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 2000px;
      overflow: hidden;
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
    
    .book-spine-title {
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
      background: #f4e4bc;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    }
    
    .book-page.left {
      left: 0;
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .book-page.right {
      right: 0;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
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
    
    .page-content {
      position: relative;
      height: 100%;
      padding: 30px;
      overflow-y: auto;
      color: #2a1810;
      z-index: 1;
    }
    
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
    
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    
    .action-btn {
      padding: 10px 20px;
      background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
      border: 2px solid #D4AF37;
      border-radius: 8px;
      font-family: 'MedievalSharp', cursive;
      font-size: 13px;
      color: #f4e4bc;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }
    
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(139, 69, 19, 0.4);
    }
    
    .chapter-toc {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .chapter-toc-item {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      background: rgba(139, 90, 43, 0.1);
      border: 1px solid rgba(139, 90, 43, 0.2);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      color: #2a1810;
    }
    
    .chapter-toc-item:hover {
      background: rgba(139, 90, 43, 0.2);
      transform: translateX(5px);
    }
    
    .chapter-toc-item .chapter-number {
      font-family: 'MedievalSharp', cursive;
      font-size: 12px;
      color: #8B4513;
      min-width: 60px;
    }
    
    .chapter-toc-item .chapter-dots {
      flex: 1;
      border-bottom: 1px dotted rgba(139, 90, 43, 0.3);
      margin: 0 10px;
    }
    
    .chapter-toc-item .chapter-title {
      font-family: 'Cinzel', serif;
      font-size: 14px;
    }
    
    .character-grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 15px;
      justify-items: center;
      padding: 15px 0;
    }
    
    .hs-card-mini {
      width: 130px;
      height: 170px;
      background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      border: 2px solid #D4AF37;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .hs-card-mini:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
    }
    
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
    }
  </style>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library.html" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf.html" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
    </div>
  </nav>
  
  <div class="book-opening-page">
    <div class="book-container">
      <div class="book-spine">
        <span class="book-spine-title">${book.title}</span>
      </div>
      
      <div class="book-page left">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge left"></div>
        <div class="page-edge bottom"></div>
        <div class="page-content">
          <div class="book-info-header">
            <div class="book-cover-small">
              <span>${typeIcon}</span>
            </div>
            <div class="book-meta-info">
              <span class="type-badge">${typeName}</span>
              <h2>${book.title}</h2>
              <div class="stats">
                <span>📜 ${chapters.length} ${isZh ? '章节' : 'Chapters'}</span>
                <span>👥 ${characters.length} ${isZh ? '角色' : 'Characters'}</span>
              </div>
              <div class="action-buttons">
                ${chapters.length > 0 ? `<a href="../chapters/${chapters[0].chapterId}.html" class="action-btn">${isZh ? '开始阅读' : 'Start Reading'}</a>` : ''}
                <button class="action-btn" onclick="importPresetBook()">${isZh ? '导入书架' : 'Import'}</button>
              </div>
            </div>
          </div>
          
          <div class="view-tabs">
            <button class="view-tab active" onclick="switchView('chapters')">📜 ${isZh ? '章节' : 'Chapters'}</button>
            <button class="view-tab" onclick="switchView('characters')">👥 ${isZh ? '角色' : 'Characters'}</button>
          </div>
          
          <div id="leftPageContent">
            <div class="chapter-toc">
              ${leftChapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => `
                <a href="../chapters/${ch.chapterId}.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${i * 0.1}s backwards;">
                  <span class="chapter-number">${isZh ? '第' : 'Ch. '}${romanNumerals[ch.orderNum - 1] || ch.orderNum}</span>
                  <span class="chapter-dots"></span>
                  <span class="chapter-title">${ch.title}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      
      <div class="book-page right">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge right"></div>
        <div class="page-edge bottom"></div>
        <div class="page-content">
          <div id="rightPageContent">
            <div class="chapter-toc">
              ${rightChapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => `
                <a href="../chapters/${ch.chapterId}.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${(i + halfChapters) * 0.1}s backwards;">
                  <span class="chapter-number">${isZh ? '第' : 'Ch. '}${romanNumerals[ch.orderNum - 1] || ch.orderNum}</span>
                  <span class="chapter-dots"></span>
                  <span class="chapter-title">${ch.title}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="cardModal" class="modal-overlay" onclick="closeCardModal(event)">
    <div class="modal-card-content">
      <button class="modal-close-btn" onclick="closeCardModal()">&times;</button>
      <div class="modal-card-display"></div>
    </div>
  </div>
  
  <script src="../js/api.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
  <script>
    const bookData = {
      bookId: '${book.bookId}',
      title: '${book.title}',
      type: '${book.type}',
      chapters: ${JSON.stringify(chapters.map(ch => ({ chapterId: ch.chapterId, title: ch.title, orderNum: ch.orderNum })))},
      characters: ${JSON.stringify(characters.map(c => ({ charId: c.charId, name: c.name, roleType: c.roleType, personality: c.personality, avatar: c.avatar, isProtagonist: c.isProtagonist })))}
    };
    
    let currentView = 'chapters';
    
    document.addEventListener('DOMContentLoaded', function() {
      document.body.className = 'theme-${book.type}';
      createParticles(document.getElementById('particles'), 30);
    });
    
    function switchView(view) {
      if (view === currentView) return;
      currentView = view;
      
      document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase().includes(view.slice(0, 4)));
      });
      
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      
      if (view === 'chapters') {
        renderChapters();
      } else if (view === 'characters') {
        renderCharacters();
      }
    }
    
    function renderChapters() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const chapters = bookData.chapters.sort((a, b) => a.orderNum - b.orderNum);
      const half = Math.ceil(chapters.length / 2);
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      const isZh = '${lang}' === 'zh';
      
      leftContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(0, half).map((ch, i) => 
        '<a href="../chapters/' + ch.chapterId + '.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
          '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
          '<span class="chapter-dots"></span>' +
          '<span class="chapter-title">' + ch.title + '</span>' +
        '</a>'
      ).join('') + '</div>';
      
      rightContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(half).map((ch, i) => 
        '<a href="../chapters/' + ch.chapterId + '.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + ((i + half) * 0.1) + 's backwards;">' +
          '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
          '<span class="chapter-dots"></span>' +
          '<span class="chapter-title">' + ch.title + '</span>' +
        '</a>'
      ).join('') + '</div>';
    }
    
    function renderCharacters() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const characters = bookData.characters;
      const half = Math.ceil(characters.length / 2);
      
      leftContent.innerHTML = '<div class="character-grid-view">' + characters.slice(0, half).map((c, i) => 
        '<div class="hs-card-mini" onclick="showCharacterDetail(' + i + ')" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
          '<div style="font-size: 48px;">' + (c.avatar || '👤') + '</div>' +
          '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 14px; margin-top: 10px;">' + c.name + '</div>' +
          '<div style="color: #a0a0a0; font-size: 11px; margin-top: 5px;">' + c.roleType + '</div>' +
        '</div>'
      ).join('') + '</div>';
      
      rightContent.innerHTML = '<div class="character-grid-view">' + characters.slice(half).map((c, i) => 
        '<div class="hs-card-mini" onclick="showCharacterDetail(' + (i + half) + ')" style="animation: fadeIn 0.5s ease-out ' + ((i + half) * 0.1) + 's backwards;">' +
          '<div style="font-size: 48px;">' + (c.avatar || '👤') + '</div>' +
          '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 14px; margin-top: 10px;">' + c.name + '</div>' +
          '<div style="color: #a0a0a0; font-size: 11px; margin-top: 5px;">' + c.roleType + '</div>' +
        '</div>'
      ).join('') + '</div>';
    }
    
    function showCharacterDetail(index) {
      const char = bookData.characters[index];
      const modal = document.getElementById('cardModal');
      const content = modal.querySelector('.modal-card-display');
      
      content.innerHTML = 
        '<div class="hs-card-mini" style="transform: none; margin: 0 auto;">' +
          '<div style="font-size: 64px;">' + (char.avatar || '👤') + '</div>' +
          '<div style="color: #FFD700; font-family: Cinzel, serif; font-size: 18px; margin-top: 15px;">' + char.name + '</div>' +
          '<div style="color: #a0a0a0; font-size: 14px; margin-top: 8px;">' + char.roleType + '</div>' +
          (char.personality ? '<div style="color: #ccc; font-size: 12px; margin-top: 10px; padding: 0 20px;">' + char.personality + '</div>' : '') +
        '</div>';
      
      modal.classList.add('active');
    }
    
    function closeCardModal(event) {
      if (!event || event.target.classList.contains('modal-overlay')) {
        document.getElementById('cardModal').classList.remove('active');
      }
    }
    
    async function importPresetBook() {
      const btn = event.target;
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        alert('${isZh ? '请先登录' : 'Please login first'}');
        window.location.href = '../login.html?redirect=' + encodeURIComponent(window.location.href);
        return;
      }
      
      btn.disabled = true;
      btn.textContent = '${isZh ? '导入中...' : 'Importing...'}';
      
      try {
        const response = await fetch('/api/books/' + bookData.bookId + '/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        });
        
        if (response.ok) {
          const result = await response.json();
          btn.textContent = '${isZh ? '导入成功！' : 'Import Success!'}';
          setTimeout(() => {
            window.location.href = '../book.html?id=' + result.data.new_book_id;
          }, 1000);
        } else {
          throw new Error('Import failed');
        }
      } catch (error) {
        btn.textContent = '${isZh ? '导入失败' : 'Import Failed'}';
        btn.disabled = false;
        setTimeout(() => {
          btn.textContent = '${isZh ? '导入书架' : 'Import'}';
        }, 2000);
      }
    }
  </script>
</body>
</html>`;
}

function formatChapterContent(content, isZh) {
  if (!content) {
    return { leftContent: '<p>No content available</p>', rightContent: '' };
  }
  
  const paragraphs = content.split(/\n\n|\n/).filter(p => p.trim());
  
  if (paragraphs.length === 0) {
    return { leftContent: '<p>No content available</p>', rightContent: '' };
  }
  
  const halfIndex = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, halfIndex);
  const rightParagraphs = paragraphs.slice(halfIndex);
  
  let leftContent = '';
  leftParagraphs.forEach((p, index) => {
    if (index === 0) {
      leftContent += `<p><span class="drop-cap">${p.charAt(0)}</span>${formatParagraph(p.slice(1), isZh)}</p>\n`;
    } else {
      leftContent += `<p>${formatParagraph(p, isZh)}</p>\n`;
    }
  });
  
  let rightContent = '';
  rightParagraphs.forEach(p => {
    rightContent += `<p>${formatParagraph(p, isZh)}</p>\n`;
  });
  
  return { leftContent, rightContent };
}

function formatParagraph(text, isZh) {
  let formatted = text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  const dialoguePattern = /^([^:]+):\s*"([^"]+)"$/;
  const match = formatted.match(dialoguePattern);
  
  if (match) {
    return `<div class="dialogue-block"><div class="speaker">${match[1]}:</div><div class="speech">"${match[2]}"</div></div>`;
  }
  
  return formatted;
}

function generateChapterHTML(book, chapter, prevChapter, nextChapter, characters, totalChapters) {
  const lang = book.language;
  const isZh = lang === 'zh';
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const orderNum = chapter.orderNum;
  
  const formattedContent = formatChapterContent(chapter.content, isZh);
  const leftContent = formattedContent.leftContent;
  const rightContent = formattedContent.rightContent;
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isZh ? '第' : 'Chapter '}${romanNumerals[orderNum - 1] || orderNum}: ${chapter.title} - ${book.title} - StoryBook</title>
  <meta name="description" content="${isZh ? '阅读' : 'Read'} ${chapter.title} - ${book.title}">
  <meta name="keywords" content="${isZh ? '互动故事, AI故事, ' + book.title + ', ' + chapter.title : 'interactive story, AI story, ' + book.title + ', ' + chapter.title}">
  <meta property="og:title" content="${chapter.title} - ${book.title}">
  <meta property="og:description" content="${isZh ? '阅读' : 'Read'} ${chapter.title}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="${isZh ? 'zh_CN' : 'en_US'}">
  <link rel="stylesheet" href="../css/variables.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/animations.css">
  <link rel="stylesheet" href="../css/components.css">
  <link rel="stylesheet" href="../css/themes.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Chapter",
    "name": "${chapter.title}",
    "isPartOf": {
      "@type": "Book",
      "name": "${book.title}",
      "genre": "${TYPE_NAMES[lang][book.type] || book.type}"
    },
    "position": ${orderNum},
    "inLanguage": "${isZh ? 'zh' : 'en'}"
  }
  </script>
  <style>
    .book-reader-page {
      height: 100vh;
      padding-top: 80px;
      display: flex;
      justify-content: center;
      perspective: 2000px;
      overflow: hidden;
    }
    
    .reading-book-container {
      position: relative;
      width: 95%;
      max-width: 1400px;
      height: calc(100vh - 160px);
      min-height: 500px;
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
    
    .reading-page {
      position: absolute;
      width: calc(50% - 35px);
      height: 100%;
      background: #f4e4bc;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
    }
    
    .reading-page.left {
      left: 0;
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .reading-page.right {
      right: 0;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    
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
    
    .reading-content {
      position: relative;
      height: 100%;
      padding: 40px 35px;
      overflow: hidden;
      color: #1a1008;
      z-index: 1;
    }
    
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
      text-decoration: none;
    }
    
    .scroll-nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 5px 0 #654321,
        0 8px 15px rgba(0, 0, 0, 0.3);
    }
    
    .nav-info {
      color: #a0a0a0;
      font-family: 'Cinzel', serif;
    }
    
    .nav-info a {
      color: #FFD700;
      text-decoration: none;
    }
    
    .nav-info a:hover {
      text-decoration: underline;
    }
    
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
  </style>
</head>
<body class="theme-${book.type}">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="../index.html" class="navbar-brand">StoryBook</a>
    <div class="navbar-nav">
      <a href="../index.html" class="navbar-link">${isZh ? '首页' : 'Home'}</a>
      <a href="../library.html" class="navbar-link">${isZh ? '图书馆' : 'Library'}</a>
      <a href="../bookshelf.html" class="navbar-link">${isZh ? '我的书架' : 'My Books'}</a>
    </div>
  </nav>
  
  <div class="book-reader-page">
    <div class="reading-book-container">
      <div class="reading-spine"></div>
      
      <div class="reading-page left">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge left"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          <div class="manuscript-title">
            <div class="chapter-num">${isZh ? '第' : 'CHAPTER '}${romanNumerals[orderNum - 1] || orderNum}</div>
            <div class="chapter-name">${chapter.title}</div>
          </div>
          <div class="manuscript-text">
            ${leftContent}
          </div>
        </div>
      </div>
      
      <div class="reading-page right">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge right"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          <div class="manuscript-text">
            ${rightContent}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="reading-nav-bar">
    ${prevChapter 
      ? `<a href="${prevChapter.chapterId}.html" class="scroll-nav-btn">← ${isZh ? '上一章' : 'Previous'}</a>`
      : `<a href="../books/${book.bookId}.html" class="scroll-nav-btn">← ${isZh ? '目录' : 'Contents'}</a>`
    }
    <div class="nav-info">
      <a href="../books/${book.bookId}.html">${book.title}</a>
      <span style="margin: 0 10px;">|</span>
      ${isZh ? '第' : 'Chapter '}${orderNum} ${isZh ? '章' : ''} ${isZh ? '' : 'of '}${totalChapters || '?'}
    </div>
    ${nextChapter 
      ? `<a href="${nextChapter.chapterId}.html" class="scroll-nav-btn">${isZh ? '下一章' : 'Next'} →</a>`
      : `<span class="scroll-nav-btn" style="opacity: 0.5; cursor: default;">${isZh ? '已完结' : 'The End'}</span>`
    }
  </div>
  
  <script src="../js/main.js"></script>
  <script src="../js/theme.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.body.className = 'theme-${book.type}';
      if (typeof createParticles === 'function') {
        createParticles(document.getElementById('particles'), 20);
      }
    });
  </script>
</body>
</html>`;
}

function main() {
  const sqlPath = path.join(__dirname, '../migrations/0002_seed_data.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  const booksRaw = parseInsertStatements(sql, 'books');
  const charactersRaw = parseInsertStatements(sql, 'characters');
  const chaptersRaw = parseInsertStatements(sql, 'chapters');
  
  console.log(`解析到 ${booksRaw.length} 本书籍`);
  console.log(`解析到 ${charactersRaw.length} 个角色`);
  console.log(`解析到 ${chaptersRaw.length} 个章节`);
  
  const books = booksRaw.map(b => ({
    bookId: b[0],
    userId: b[1],
    title: b[2],
    type: b[3],
    isPreset: b[4],
    language: b[5]
  }));
  
  const characters = charactersRaw.map(c => ({
    charId: c[0],
    bookId: c[1],
    name: c[2],
    roleType: c[3],
    personality: c[4],
    speechStyle: c[5],
    avatar: c[6],
    intimacy: c[7],
    relationship: c[8],
    isProtagonist: c[9] === '1' || c[9] === 1
  }));
  
  const chapters = chaptersRaw.map(ch => ({
    chapterId: ch[0],
    bookId: ch[1],
    title: ch[2],
    content: ch[3],
    selectedCards: ch[4],
    orderNum: parseInt(ch[5], 10)
  }));
  
  const booksOutputDir = path.join(__dirname, '../src/frontend/books');
  if (!fs.existsSync(booksOutputDir)) {
    fs.mkdirSync(booksOutputDir, { recursive: true });
  }
  
  let bookCount = 0;
  books.forEach(book => {
    const bookCharacters = characters.filter(c => c.bookId === book.bookId);
    const bookChapters = chapters.filter(ch => ch.bookId === book.bookId);
    
    const html = generateBookHTML(book, bookCharacters, bookChapters);
    const filename = `${book.bookId}.html`;
    
    fs.writeFileSync(path.join(booksOutputDir, filename), html);
    console.log(`✓ 生成书籍: ${filename} (${bookCharacters.length} 角色, ${bookChapters.length} 章节)`);
    bookCount++;
  });
  
  const chaptersOutputDir = path.join(__dirname, '../src/frontend/chapters');
  if (!fs.existsSync(chaptersOutputDir)) {
    fs.mkdirSync(chaptersOutputDir, { recursive: true });
  }
  
  let chapterCount = 0;
  books.forEach(book => {
    const bookCharacters = characters.filter(c => c.bookId === book.bookId);
    const bookChapters = chapters
      .filter(ch => ch.bookId === book.bookId)
      .sort((a, b) => a.orderNum - b.orderNum);
    
    bookChapters.forEach((chapter, index) => {
      const prevChapter = index > 0 ? bookChapters[index - 1] : null;
      const nextChapter = index < bookChapters.length - 1 ? bookChapters[index + 1] : null;
      
      const html = generateChapterHTML(book, chapter, prevChapter, nextChapter, bookCharacters, bookChapters.length);
      const filename = `${chapter.chapterId}.html`;
      
      fs.writeFileSync(path.join(chaptersOutputDir, filename), html);
      console.log(`✓ 生成章节: ${filename}`);
      chapterCount++;
    });
  });
  
  console.log(`\n完成！共生成 ${bookCount} 个书籍页面, ${chapterCount} 个章节页面`);
  console.log(`书籍输出目录: ${booksOutputDir}`);
  console.log(`章节输出目录: ${chaptersOutputDir}`);
}

main();
