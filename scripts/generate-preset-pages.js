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
    `INSERT\\s+(OR\\s+\\w+\\s+)?INTO\\s+${tableName}\\s*\\([^)]+\\)\\s*VALUES\\s*`,
    'gi'
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

function generateBookHTML(book, characters, chapters, plotCards) {
  const lang = book.language || 'en';
  const isZh = lang === 'zh';
  const typeName = (TYPE_NAMES[lang] && TYPE_NAMES[lang][book.type]) || book.type;
  const typeIcon = TYPE_ICONS[book.type] || '📖';
  
  const bookPlotCards = plotCards.filter(p => p.bookId === book.bookId);
  
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
    
    .plot-grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
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
            <button class="view-tab" onclick="switchView('plotcards')">🃏 ${isZh ? '情节卡牌' : 'Plot Cards'}</button>
          </div>
          
          <div id="leftPageContent">
            <div class="chapter-toc">
              ${leftChapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => {
                const idx = Math.floor((ch.orderNum - 1) / 2) * 2;
                const pageChapterId = chapters[idx] ? chapters[idx].chapterId : ch.chapterId;
                return `<a href="../chapters/${pageChapterId}.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${i * 0.1}s backwards;">
                  <span class="chapter-number">${isZh ? '第' : 'Ch. '}${romanNumerals[ch.orderNum - 1] || ch.orderNum}</span>
                  <span class="chapter-dots"></span>
                  <span class="chapter-title">${ch.title}</span>
                </a>`;
              }).join('')}
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
              ${rightChapters.sort((a, b) => a.orderNum - b.orderNum).map((ch, i) => {
                const idx = Math.floor((ch.orderNum - 1) / 2) * 2;
                const pageChapterId = chapters[idx] ? chapters[idx].chapterId : ch.chapterId;
                return `<a href="../chapters/${pageChapterId}.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ${(i + halfChapters) * 0.1}s backwards;">
                  <span class="chapter-number">${isZh ? '第' : 'Ch. '}${romanNumerals[ch.orderNum - 1] || ch.orderNum}</span>
                  <span class="chapter-dots"></span>
                  <span class="chapter-title">${ch.title}</span>
                </a>`;
              }).join('')}
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
      characters: ${JSON.stringify(characters.map(c => ({ charId: c.charId, name: c.name, roleType: c.roleType, personality: c.personality, avatar: c.avatar, isProtagonist: c.isProtagonist })))},
      plotCards: ${JSON.stringify(bookPlotCards.map(p => ({ card_id: p.cardId, sub_type: p.sub_type, name: p.name, icon: p.icon, description: p.description })))}
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
        tab.classList.remove('active');
      });
      event.target.classList.add('active');
      
      if (view === 'chapters') {
        renderChapters();
      } else if (view === 'characters') {
        renderCharacters();
      } else if (view === 'plotcards') {
        renderPlotCards();
      }
    }
    
    function renderChapters() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const chapters = bookData.chapters.sort((a, b) => a.orderNum - b.orderNum);
      const half = Math.ceil(chapters.length / 2);
      const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      const isZh = '${lang}' === 'zh';
      
      function getPageChapterId(chapterOrder) {
        const pageIndex = Math.floor((chapterOrder - 1) / 2);
        return chapters[pageIndex * 2].chapterId;
      }
      
      leftContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(0, half).map((ch, i) => 
        '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + (i * 0.1) + 's backwards;">' +
          '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
          '<span class="chapter-dots"></span>' +
          '<span class="chapter-title">' + ch.title + '</span>' +
        '</a>'
      ).join('') + '</div>';
      
      rightContent.innerHTML = '<div class="chapter-toc">' + chapters.slice(half).map((ch, i) => 
        '<a href="../chapters/' + getPageChapterId(ch.orderNum) + '.html" class="chapter-toc-item" style="animation: fadeIn 0.5s ease-out ' + ((i + half) * 0.1) + 's backwards;">' +
          '<span class="chapter-number">' + (isZh ? '第' : 'Ch. ') + (romanNumerals[ch.orderNum - 1] || ch.orderNum) + '</span>' +
          '<span class="chapter-dots"></span>' +
          '<span class="chapter-title">' + ch.title + '</span>' +
        '</a>'
      ).join('') + '</div>';
    }
    
    function renderPlotCards() {
      const leftContent = document.getElementById('leftPageContent');
      const rightContent = document.getElementById('rightPageContent');
      const allCards = bookData.plotCards || [];
      
      const validSubTypes = ['weather', 'terrain', 'adventure', 'equipment'];
      const cards = allCards.filter(c => validSubTypes.includes(c.sub_type));
      
      const half = Math.ceil(cards.length / 2);
      const leftCards = cards.slice(0, half);
      const rightCards = cards.slice(half);
      
      function renderPlotCard(card, index) {
        return '<div class="hs-card-mini plot-card" onclick="showPlotCardDetail(\\'' + card.cardId + '\\')" style="animation: fadeIn 0.5s ease-out ' + (index * 0.1) + 's backwards;">' +
          '<div style="font-size: 36px;">' + (card.icon || '🎭') + '</div>' +
          '<div style="color: #f4e4bc; font-family: Cinzel, serif; font-size: 13px; margin-top: 10px; text-align: center;">' + card.name + '</div>' +
          '<div style="color: #ccc; font-size: 11px; margin-top: 5px; text-align: center; padding: 0 10px;">' + (card.description || '') + '</div>' +
        '</div>';
      }
      
      leftContent.innerHTML = '<div class="plot-grid-view">' + leftCards.map((card, i) => renderPlotCard(card, i)).join('') + '</div>';
      rightContent.innerHTML = '<div class="plot-grid-view">' + rightCards.map((card, i) => renderPlotCard(card, i + half)).join('') + '</div>';
    }
    
    function showPlotCardDetail(cardId) {
      const card = bookData.plotCards.find(c => c.cardId === cardId);
      if (!card) return;
      
      const modal = document.getElementById('cardModal');
      const content = modal.querySelector('.modal-card-display');
      
      content.innerHTML = 
        '<div class="hs-card-mini plot-card" style="transform: none; margin: 0 auto;">' +
          '<div style="font-size: 48px;">' + (card.icon || '🎭') + '</div>' +
          '<div style="color: #f4e4bc; font-family: Cinzel, serif; font-size: 18px; margin-top: 15px;">' + card.name + '</div>' +
          '<div style="color: #a0a0a0; font-size: 12px; margin-top: 8px;">' + card.sub_type + '</div>' +
          '<div style="color: #ccc; font-size: 13px; margin-top: 10px; padding: 0 20px; line-height: 1.5;">' + (card.description || '') + '</div>' +
        '</div>';
      
      modal.classList.add('active');
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

function formatSingleChapterContent(chapter, isZh, romanNumerals) {
  if (!chapter) {
    return `<p class="empty-page" style="text-align: center; color: rgba(139, 90, 43, 0.5); font-style: italic; margin-top: 100px;">${isZh ? '— 本章完 —' : '— End of Chapter —'}</p>`;
  }
  
  const content = chapter.content || '';
  const paragraphs = content.split(/\n\n|\n/).filter(p => p.trim());
  
  let html = `<div class="manuscript-title">
    <div class="chapter-num">${isZh ? '第' : 'CHAPTER '}${romanNumerals[chapter.orderNum - 1] || chapter.orderNum}</div>
    <div class="chapter-name">${chapter.title}</div>
  </div>
  <div class="manuscript-text">`;
  
  paragraphs.forEach((p, i) => {
    if (i === 0) {
      html += `<p><span class="drop-cap">${p.charAt(0)}</span>${formatParagraph(p.slice(1), isZh)}</p>\n`;
    } else {
      html += `<p>${formatParagraph(p, isZh)}</p>\n`;
    }
  });
  
  html += '</div>';
  return html;
}

function formatChapterContent(content, isZh) {
  if (!content) {
    return { leftContent: '<p>No content available</p>', rightContent: '' };
  }
  
  const CHARS_PER_PAGE = 800;
  const paragraphs = content.split(/\n\n|\n/).filter(p => p.trim());
  
  if (paragraphs.length === 0) {
    return { leftContent: '<p>No content available</p>', rightContent: '' };
  }
  
  let leftContent = '';
  let rightContent = '';
  let currentChars = 0;
  let isLeftPage = true;
  let isFirstParagraph = true;
  
  for (const p of paragraphs) {
    if (isLeftPage && currentChars + p.length > CHARS_PER_PAGE) {
      isLeftPage = false;
      currentChars = 0;
    }
    
    if (isLeftPage) {
      if (isFirstParagraph) {
        leftContent += `<p><span class="drop-cap">${p.charAt(0)}</span>${formatParagraph(p.slice(1), isZh)}</p>\n`;
        isFirstParagraph = false;
      } else {
        leftContent += `<p>${formatParagraph(p, isZh)}</p>\n`;
      }
      currentChars += p.length;
    } else {
      rightContent += `<p>${formatParagraph(p, isZh)}</p>\n`;
      currentChars += p.length;
    }
  }
  
  return { leftContent, rightContent };
}

function formatNextChapterContent(nextChapter, isZh, romanNumerals) {
  if (!nextChapter) {
    return `<p class="empty-page" style="text-align: center; color: rgba(139, 90, 43, 0.5); font-style: italic; margin-top: 100px;">${isZh ? '— 本章完 —' : '— End of Chapter —'}</p>`;
  }
  
  const previewContent = nextChapter.content ? nextChapter.content.split(/\n\n|\n/).filter(p => p.trim()).slice(0, 2).join('\n\n') : '';
  const truncatedContent = previewContent.length > 400 ? previewContent.substring(0, 400) + '...' : previewContent;
  
  let content = `<div class="manuscript-title">
    <div class="chapter-num">${isZh ? '第' : 'CHAPTER '}${romanNumerals[nextChapter.orderNum - 1] || nextChapter.orderNum}</div>
    <div class="chapter-name">${nextChapter.title}</div>
  </div>
  <div class="manuscript-text">
    ${truncatedContent ? `<p><span class="drop-cap">${truncatedContent.charAt(0)}</span>${formatParagraph(truncatedContent.slice(1), isZh)}</p>` : ''}
  </div>`;
  
  return content;
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

function generateChapterHTML(book, leftChapter, rightChapter, prevPageFirstChapter, nextPageFirstChapter, characters, totalChapters, currentPage, totalPages) {
  const lang = book.language || 'en';
  const isZh = lang === 'zh';
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  
  const leftContent = formatSingleChapterContent(leftChapter, isZh, romanNumerals);
  const rightContent = rightChapter 
    ? formatSingleChapterContent(rightChapter, isZh, romanNumerals)
    : `<div class="manuscript-text"><p class="empty-page" style="text-align: center; color: rgba(139, 90, 43, 0.5); font-style: italic; margin-top: 100px;">${isZh ? '— 全书完 —' : '— The End —'}</p></div>`;
  
  const prevUrl = prevPageFirstChapter 
    ? `${prevPageFirstChapter.chapterId}.html`
    : `../books/${book.bookId}.html`;
  const prevLabel = prevPageFirstChapter 
    ? (isZh ? '上一页' : 'Previous')
    : (isZh ? '目录' : 'Contents');
  
  const nextUrl = nextPageFirstChapter 
    ? `${nextPageFirstChapter.chapterId}.html`
    : null;
  const nextLabel = isZh ? '下一页' : 'Next';
  
  return `<!DOCTYPE html>
<html lang="${isZh ? 'zh' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isZh ? '第' : 'Chapter '}${romanNumerals[leftChapter.orderNum - 1] || leftChapter.orderNum}${rightChapter ? (isZh ? '、' : ' & ') + (romanNumerals[rightChapter.orderNum - 1] || rightChapter.orderNum) : ''}: ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title} - StoryBook</title>
  <meta name="description" content="${isZh ? '阅读' : 'Read'} ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title}">
  <meta name="keywords" content="${isZh ? '互动故事, AI故事, ' + book.title + ', ' + leftChapter.title : 'interactive story, AI story, ' + book.title + ', ' + leftChapter.title}">
  <meta property="og:title" content="${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''} - ${book.title}">
  <meta property="og:description" content="${isZh ? '阅读' : 'Read'} ${leftChapter.title}${rightChapter ? ' / ' + rightChapter.title : ''}">
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
    "name": "${leftChapter.title}",
    "isPartOf": {
      "@type": "Book",
      "name": "${book.title}",
      "genre": "${TYPE_NAMES[lang][book.type] || book.type}"
    },
    "position": ${leftChapter.orderNum},
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
      overflow-y: auto;
      overflow-x: hidden;
      color: #1a1008;
      z-index: 1;
      scroll-behavior: smooth;
    }
    
    .reading-content::-webkit-scrollbar {
      width: 10px;
    }
    
    .reading-content::-webkit-scrollbar-track {
      background: rgba(139, 90, 43, 0.12);
      border-radius: 5px;
      border: 1px solid rgba(139, 90, 43, 0.15);
      margin: 10px 0;
    }
    
    .reading-content::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
      border-radius: 5px;
      border: 2px solid rgba(244, 228, 188, 0.4);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    
    .reading-content::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #A0522D 0%, #8B4513 100%);
    }
    
    .reading-content::-webkit-scrollbar-corner {
      background: transparent;
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
          ${leftContent}
        </div>
      </div>
      
      <div class="reading-page right">
        <div class="parchment-texture"></div>
        <div class="page-edge top"></div>
        <div class="page-edge right"></div>
        <div class="page-edge bottom"></div>
        <div class="reading-content">
          ${rightContent}
        </div>
      </div>
    </div>
  </div>
  
  <div class="reading-nav-bar">
    <a href="${prevUrl}" class="scroll-nav-btn">← ${prevLabel}</a>
    <div class="nav-info">
      <a href="../books/${book.bookId}.html">${book.title}</a>
      <span style="margin: 0 10px;">|</span>
      ${isZh ? '第' : 'Page '}${currentPage} ${isZh ? '页' : ''} ${isZh ? '' : 'of '}${totalPages}
    </div>
    ${nextUrl 
      ? `<a href="${nextUrl}" class="scroll-nav-btn">${nextLabel} →</a>`
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
  const sqlPaths = [
    path.join(__dirname, '../migrations/0002_seed_data.sql'),
    path.join(__dirname, '../migrations/0010_fix_plot_cards_fields.sql'),
    path.join(__dirname, '../migrations/0011_new_preset_books.sql'),
    path.join(__dirname, '../migrations/0012_fix_seed_plot_cards_part1.sql'),
    path.join(__dirname, '../migrations/0012_fix_seed_plot_cards_part2.sql'),
    path.join(__dirname, '../migrations/0012_fix_seed_plot_cards_part3.sql'),
    path.join(__dirname, '../migrations/0013_supplement_new_books_plot_cards.sql'),
    path.join(__dirname, '../migrations/0016_new_preset_books_006.sql'),
    path.join(__dirname, '../migrations/0017_new_preset_books_006_chapters.sql'),
    path.join(__dirname, '../migrations/0020_ai_series_01_en_books.sql'),
    path.join(__dirname, '../migrations/0021_ai_series_01_en_characters.sql'),
    path.join(__dirname, '../migrations/0022_ai_series_01_en_plot_cards.sql'),
    path.join(__dirname, '../migrations/0023_ai_series_01_en_chapters_part1.sql'),
    path.join(__dirname, '../migrations/0024_ai_series_01_en_chapters_part2.sql'),
    path.join(__dirname, '../migrations/0030_ai_series_01_zh_books.sql'),
    path.join(__dirname, '../migrations/0031_ai_series_01_zh_characters.sql'),
    path.join(__dirname, '../migrations/0032_ai_series_01_zh_plot_cards.sql'),
    path.join(__dirname, '../migrations/0033_ai_series_01_zh_chapters_part1.sql'),
    path.join(__dirname, '../migrations/0034_ai_series_01_zh_chapters_part2.sql'),
    path.join(__dirname, '../migrations/0040_ai_series_01_02_en_books.sql'),
    path.join(__dirname, '../migrations/0041_ai_series_01_02_en_characters.sql'),
    path.join(__dirname, '../migrations/0042_ai_series_01_02_en_plot_cards.sql'),
    path.join(__dirname, '../migrations/0043_ai_series_01_02_en_chapters_part1.sql'),
    path.join(__dirname, '../migrations/0044_ai_series_01_02_en_chapters_part2.sql'),
    path.join(__dirname, '../migrations/0050_ai_series_01_02_zh_books.sql'),
    path.join(__dirname, '../migrations/0051_ai_series_01_02_zh_characters.sql'),
    path.join(__dirname, '../migrations/0052_ai_series_01_02_zh_plot_cards.sql'),
    path.join(__dirname, '../migrations/0053_ai_series_01_02_zh_chapters_part1.sql'),
    path.join(__dirname, '../migrations/0060_ai_series_01_03_en_books.sql'),
    path.join(__dirname, '../migrations/0061_ai_series_01_03_en_characters.sql'),
    path.join(__dirname, '../migrations/0062_ai_series_01_03_en_plot_cards.sql'),
    path.join(__dirname, '../migrations/0063_ai_series_01_03_en_chapters.sql'),
    path.join(__dirname, '../migrations/0070_ai_series_01_03_zh_books.sql'),
    path.join(__dirname, '../migrations/0071_ai_series_01_03_zh_characters.sql'),
    path.join(__dirname, '../migrations/0072_ai_series_01_03_zh_plot_cards.sql'),
    path.join(__dirname, '../migrations/0073_ai_series_01_03_zh_chapters.sql'),
    path.join(__dirname, '../migrations/0080_ai_series_01_04_en_books.sql'),
    path.join(__dirname, '../migrations/0081_ai_series_01_04_en_characters.sql'),
    path.join(__dirname, '../migrations/0082_ai_series_01_04_en_plot_cards.sql'),
    path.join(__dirname, '../migrations/0083_ai_series_01_04_en_chapters_part1.sql'),
    path.join(__dirname, '../migrations/0090_all_ai_books_batch1.sql'),
    path.join(__dirname, '../migrations/0220_ai_series_03_all_books.sql'),
    path.join(__dirname, '../migrations/0230_ai_series_04_all_books.sql'),
    path.join(__dirname, '../migrations/0240_ai_series_05_all_books.sql'),
    path.join(__dirname, '../migrations/0250_all_ai_books_characters.sql'),
    path.join(__dirname, '../migrations/0260_all_ai_books_plot_cards.sql'),
    path.join(__dirname, '../migrations/0270_all_ai_books_chapters.sql'),
    path.join(__dirname, '../migrations/0290_complete_all_missing_chapters.sql'),
    path.join(__dirname, '../migrations/0291_complete_series_3_4_5_chapters.sql'),
    path.join(__dirname, '../migrations/0292_complete_remaining_chapters.sql'),
    path.join(__dirname, '../migrations/0410_preset_ai_005_complete.sql'),
    path.join(__dirname, '../migrations/0411_preset_ai_005_zh_complete.sql'),
    path.join(__dirname, '../migrations/0412_preset_ai_006_complete.sql'),
    path.join(__dirname, '../migrations/0413_preset_ai_006_zh_complete.sql'),
    path.join(__dirname, '../migrations/0414_preset_ai_007_complete.sql'),
    path.join(__dirname, '../migrations/0415_preset_ai_007_zh_complete.sql'),
    path.join(__dirname, '../migrations/0416_preset_ai_008_complete.sql'),
    path.join(__dirname, '../migrations/0416_preset_ai_008_zh_complete.sql'),
    path.join(__dirname, '../migrations/0417_preset_ai_009_complete.sql'),
    path.join(__dirname, '../migrations/0418_preset_ai_010_complete.sql'),
    path.join(__dirname, '../migrations/0419_preset_ai_010_zh_complete.sql'),
    path.join(__dirname, '../migrations/0420_preset_ai_011_complete.sql'),
    path.join(__dirname, '../migrations/0421_preset_ai_012_complete.sql'),
    path.join(__dirname, '../migrations/0422_preset_ai_013_complete.sql'),
    path.join(__dirname, '../migrations/0423_preset_ai_014_015_complete.sql'),
    path.join(__dirname, '../migrations/0424_preset_ai_016_to_023_complete.sql'),
    path.join(__dirname, '../migrations/0425_missing_chapters.sql'),
    path.join(__dirname, '../migrations/0430_add_preset_ai_001_chapters.sql'),
    path.join(__dirname, '../migrations/0435_final_fix_preset_ai_001_zh.sql')
  ];
  
  let allBooksRaw = [];
  let allCharactersRaw = [];
  let allChaptersRaw = [];
  let allPlotCardsRaw = [];
  
  for (const sqlPath of sqlPaths) {
    if (fs.existsSync(sqlPath)) {
      const sql = fs.readFileSync(sqlPath, 'utf8');
      
      const booksRaw = parseInsertStatements(sql, 'books');
      const charactersRaw = parseInsertStatements(sql, 'characters');
      const chaptersRaw = parseInsertStatements(sql, 'chapters');
      const plotCardsRaw = parseInsertStatements(sql, 'plot_cards');
      
      allBooksRaw = allBooksRaw.concat(booksRaw);
      allCharactersRaw = allCharactersRaw.concat(charactersRaw);
      allChaptersRaw = allChaptersRaw.concat(chaptersRaw);
      allPlotCardsRaw = allPlotCardsRaw.concat(plotCardsRaw);
      
      console.log(`从 ${path.basename(sqlPath)} 解析到 ${booksRaw.length} 本书籍, ${charactersRaw.length} 个角色, ${chaptersRaw.length} 个章节, ${plotCardsRaw.length} 个情节卡牌`);
    }
  }
  
  console.log(`总计: ${allBooksRaw.length} 本书籍, ${allCharactersRaw.length} 个角色, ${allChaptersRaw.length} 个章节, ${allPlotCardsRaw.length} 个情节卡牌`);
  
  const books = allBooksRaw.map(b => ({
    bookId: b[0],
    userId: b[1],
    title: b[2],
    type: b[3],
    isPreset: b[4],
    language: b[5]
  }));
  
  const characters = allCharactersRaw.map(c => ({
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
  
  const plotCardsRaw = allPlotCardsRaw.map(p => ({
    cardId: p[0],
    bookId: p[1],
    type: p[2],
    sub_type: p[3],
    name: p[4],
    icon: p[5],
    description: p[6]
  }));
  
  const validSubTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const seenCardIds = new Set();
  const seenContent = new Set();
  const uniquePlotCards = [];
  
  for (const card of plotCardsRaw) {
    if (!validSubTypes.includes(card.sub_type)) {
      continue;
    }
    if (seenCardIds.has(card.cardId)) {
      continue;
    }
    const contentKey = `${card.bookId}-${card.sub_type}-${card.name}`;
    if (seenContent.has(contentKey)) {
      continue;
    }
    seenCardIds.add(card.cardId);
    seenContent.add(contentKey);
    uniquePlotCards.push(card);
  }
  
  console.log(`去重后保留 ${uniquePlotCards.length} 个情节卡牌`);
  
  const chaptersRaw = allChaptersRaw.map(ch => ({
    chapterId: ch[0],
    bookId: ch[1],
    title: ch[2],
    content: ch[3],
    selectedCards: ch[4],
    orderNum: parseInt(ch[5], 10)
  }));
  
  const uniqueChapters = [];
  const seenChapterIds = new Set();
  for (const ch of chaptersRaw) {
    if (!seenChapterIds.has(ch.chapterId)) {
      seenChapterIds.add(ch.chapterId);
      uniqueChapters.push(ch);
    }
  }
  console.log(`去重后保留 ${uniqueChapters.length} 个章节`);
  
  const booksOutputDir = path.join(__dirname, '../src/frontend/books');
  if (!fs.existsSync(booksOutputDir)) {
    fs.mkdirSync(booksOutputDir, { recursive: true });
  }
  
  let bookCount = 0;
  books.forEach(book => {
    const bookCharacters = characters.filter(c => c.bookId === book.bookId);
    const bookChapters = uniqueChapters.filter(ch => ch.bookId === book.bookId);
    
    const html = generateBookHTML(book, bookCharacters, bookChapters, uniquePlotCards);
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
    
    const totalPages = Math.ceil(bookChapters.length / 2);
    
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const leftIndex = pageIndex * 2;
      const rightIndex = leftIndex + 1;
      
      const leftChapter = bookChapters[leftIndex];
      const rightChapter = rightIndex < bookChapters.length ? bookChapters[rightIndex] : null;
      
      const prevPageFirstChapter = pageIndex > 0 ? bookChapters[(pageIndex - 1) * 2] : null;
      const nextPageFirstChapter = pageIndex < totalPages - 1 ? bookChapters[(pageIndex + 1) * 2] : null;
      
      const currentPage = pageIndex + 1;
      
      const html = generateChapterHTML(book, leftChapter, rightChapter, prevPageFirstChapter, nextPageFirstChapter, bookCharacters, bookChapters.length, currentPage, totalPages);
      const filename = `${leftChapter.chapterId}.html`;
      
      fs.writeFileSync(path.join(chaptersOutputDir, filename), html);
      console.log(`✓ 生成章节页: ${filename} (第${leftChapter.orderNum}章${rightChapter ? ` + 第${rightChapter.orderNum}章` : ''})`);
      chapterCount++;
    }
  });
  
  console.log(`\n完成！共生成 ${bookCount} 个书籍页面, ${chapterCount} 个章节页面`);
  console.log(`书籍输出目录: ${booksOutputDir}`);
  console.log(`章节输出目录: ${chaptersOutputDir}`);
}

main();
