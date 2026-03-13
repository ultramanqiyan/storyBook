let allPresetBooks = [];
let currentBook = null;

const typeIcons = {
  adventure: '🗺️',
  fantasy: '🧙',
  romance: '💕',
  business: '💼'
};

const typeNames = {
  adventure: 'Adventure',
  fantasy: 'Fantasy',
  romance: 'Romance',
  business: 'Business'
};

const typeColors = {
  adventure: 'linear-gradient(135deg, #2a1a0a 0%, #1a0a00 100%)',
  fantasy: 'linear-gradient(135deg, #2a1a4a 0%, #1a0a2e 100%)',
  romance: 'linear-gradient(135deg, #4a1a2a 0%, #2a0a1e 100%)',
  business: 'linear-gradient(135deg, #1a2a3a 0%, #0a1a2e 100%)'
};

document.addEventListener('DOMContentLoaded', async function() {
  if (typeof createParticles === 'function') {
    createParticles(document.getElementById('particles'), 50);
  }
  
  const userId = localStorage.getItem('user_id');
  
  await loadPresetBooks();
  initFilterTabs();
});

async function loadPresetBooks() {
  try {
    const result = await API.getPresetBooks();
    
    if (result.success) {
      allPresetBooks = result.data || [];
      renderBooks(allPresetBooks);
    }
  } catch (error) {
    showNotification('Failed to load preset books: ' + error.message, 'error');
  }
}

function renderBooks(books) {
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = '';
  
  if (!books || books.length === 0) {
    grid.innerHTML = `
      <div class="empty-library">
        <div class="empty-icon">📚</div>
        <h3 class="empty-title">The Library is Empty</h3>
        <p class="empty-message">No preset stories are available yet. Please check back later or contact the administrator.</p>
        <p class="empty-hint">If you are the developer, please run: <code>npx wrangler d1 execute storybook_database --local --file=./migrations/0002_seed_data.sql</code></p>
      </div>
    `;
    return;
  }
  
  books.forEach((book, index) => {
    const card = createBookCard(book, index);
    grid.appendChild(card);
  });
}

function createBookCard(book, index) {
  const div = document.createElement('div');
  div.className = 'book-item';
  div.dataset.type = book.type;
  div.style.animationDelay = `${index * 0.1}s`;
  
  const chapterCount = book.chapter_count || 0;
  
  div.innerHTML = `
    <div class="book-3d" onclick="window.location.href='book.html?id=${book.book_id}&is_preset=1'">
      <div class="book-cover" style="background: ${typeColors[book.type] || typeColors.adventure};">
        <span style="font-size: 48px;">${typeIcons[book.type] || '📖'}</span>
      </div>
      <div class="book-spine"></div>
      <div class="book-pages"></div>
      <div class="book-title">${book.title}</div>
      <div class="book-tag">${typeNames[book.type] || book.type}</div>
    </div>
    <div class="book-info">
      <h4>${book.title}</h4>
      <p>${chapterCount} chapters</p>
    </div>
  `;
  
  return div;
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      if (filter === 'all') {
        renderBooks(allPresetBooks);
      } else {
        const filtered = allPresetBooks.filter(book => book.type === filter);
        renderBooks(filtered);
      }
    });
  });
}

async function showBookDetail(book) {
  currentBook = book;
  
  window.location.href = `book.html?id=${book.book_id}&is_preset=1`;
}

function hideBookDetail() {
  document.getElementById('bookDetailModal').style.display = 'none';
}

async function importBook() {
  if (!currentBook) return;
  
  const userId = getUserId();
  if (!userId) {
    showNotification('Please login first', 'warning');
    return;
  }
  
  try {
    const result = await API.importPresetBook(currentBook.book_id, userId);
    
    if (result.success) {
      hideBookDetail();
      showImportSuccess(currentBook.title, result.data.new_book_id);
    }
  } catch (error) {
    showNotification('Import failed: ' + error.message, 'error');
  }
}

function showImportSuccess(title, newBookId) {
  document.getElementById('importBookTitle').textContent = `"${title}" has been added to your bookshelf`;
  
  const modal = document.getElementById('importSuccessModal');
  modal.dataset.bookId = newBookId;
  modal.style.display = 'flex';
}

function hideImportSuccess() {
  document.getElementById('importSuccessModal').style.display = 'none';
}

function goToShelf() {
  window.location.href = 'bookshelf.html';
}

function checkAuth() {
  const userId = localStorage.getItem('user_id');
  if (!userId) {
    window.location.href = 'login.html';
    return null;
  }
  return userId;
}

function getUserId() {
  return localStorage.getItem('user_id');
}

function showNotification(message, type = 'info') {
  if (typeof window.showNotification === 'function') {
    window.showNotification(message, type);
  } else {
    alert(message);
  }
}
