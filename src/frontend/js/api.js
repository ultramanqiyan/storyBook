const API_BASE = '';

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    return response.json();
}

function getUserId() {
    return localStorage.getItem('user_id');
}

function setUserId(id) {
    localStorage.setItem('user_id', id);
}

function getUserEmail() {
    return localStorage.getItem('email');
}

function setUserEmail(email) {
    localStorage.setItem('email', email);
}

function clearAuth() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
}

function isLoggedIn() {
    return !!getUserId();
}

function checkAuth() {
    const userId = getUserId();
    if (!userId) {
        window.location.href = 'login.html';
        return null;
    }
    return userId;
}

function logout() {
    clearAuth();
    window.location.href = 'login.html';
}

function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2a4a2a' : type === 'error' ? '#4a1a2a' : '#2a2a4a'};
        color: #FFD700;
        border: 2px solid rgba(255, 215, 0, 0.3);
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const API = {
    async register(email, password) {
        return apiRequest('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password, action: 'register' })
        });
    },

    async login(email, password) {
        return apiRequest('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password, action: 'login' })
        });
    },

    async getUser(userId) {
        return apiRequest(`/api/users?user_id=${userId}`);
    },

    async getBooks(userId) {
        return apiRequest(`/api/books?user_id=${userId}`);
    },

    async getPresetBooks() {
        return apiRequest('/api/books/preset');
    },

    async getBook(bookId) {
        return apiRequest(`/api/books/${bookId}`);
    },

    async createBook(data) {
        return apiRequest('/api/books', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async updateBook(bookId, data) {
        return apiRequest(`/api/books/${bookId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    async deleteBook(bookId) {
        return apiRequest(`/api/books/${bookId}`, {
            method: 'DELETE'
        });
    },

    async getCharacters(bookId) {
        return apiRequest(`/api/characters?book_id=${bookId}`);
    },

    async createCharacter(data) {
        return apiRequest('/api/characters', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async getPlotCards(bookId) {
        return apiRequest(`/api/plot-cards?book_id=${bookId}`);
    },

    async createPlotCard(data) {
        return apiRequest('/api/plot-cards', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async deletePlotCard(cardId) {
        return apiRequest(`/api/plot-cards/${cardId}`, {
            method: 'DELETE'
        });
    },

    async getChapters(bookId) {
        return apiRequest(`/api/chapters?book_id=${bookId}`);
    },

    async getChapter(chapterId) {
        return apiRequest(`/api/chapters/${chapterId}`);
    },

    async getPresetChapter(chapterId) {
        return apiRequest(`/api/preset-chapters/${chapterId}`);
    },

    async getPresetBookChapters(bookId) {
        return apiRequest(`/api/books/${bookId}/chapters`);
    },

    async createChapter(data) {
        return apiRequest('/api/chapters', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async getPuzzle(puzzleId) {
        return apiRequest(`/api/puzzles/${puzzleId}`);
    },

    async solvePuzzle(puzzleId, answer, userId) {
        const body = { answer };
        if (userId) {
            body.user_id = userId;
        }
        return apiRequest(`/api/puzzles/${puzzleId}/solve`, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    async getBookTypes() {
        return apiRequest('/api/config/book-types');
    },

    async getCharacterTypes(bookType) {
        return apiRequest(`/api/config/character-types?book_type=${bookType}`);
    },

    async getPersonality() {
        return apiRequest('/api/config/personality');
    },

    async getSpeechStyle() {
        return apiRequest('/api/config/speech-style');
    },

    async getPlotOptions(bookType, subType) {
        return apiRequest(`/api/config/plot-options?book_type=${bookType}&sub_type=${subType}`);
    },

    async getPresetBookDetail(bookId) {
        return apiRequest(`/api/books/${bookId}/detail`);
    },

    async importPresetBook(bookId, userId) {
        return apiRequest(`/api/books/${bookId}/import`, {
            method: 'POST',
            body: JSON.stringify({ user_id: userId })
        });
    },

    async addPlotCard(bookId, card) {
        return apiRequest('/api/plot-cards', {
            method: 'POST',
            body: JSON.stringify({ book_id: bookId, ...card })
        });
    },

    async getCustomPlotCardIcons(subType) {
        return apiRequest(`/api/custom-cards/plot-cards?sub_type=${subType}`);
    },

    async createCustomPlotCard(data) {
        return apiRequest('/api/custom-cards/plot-cards', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    async getCustomCharacterOptions(bookType) {
        return apiRequest(`/api/custom-cards/characters?type=options&book_type=${bookType}`);
    },

    async getCustomCharacterAvatars() {
        return apiRequest('/api/custom-cards/characters?type=avatars');
    },

    async createCustomCharacter(data) {
        return apiRequest('/api/custom-cards/characters', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

window.apiRequest = apiRequest;
window.getUserId = getUserId;
window.setUserId = setUserId;
window.getUserEmail = getUserEmail;
window.setUserEmail = setUserEmail;
window.clearAuth = clearAuth;
window.isLoggedIn = isLoggedIn;
window.checkAuth = checkAuth;
window.logout = logout;
window.getUrlParam = getUrlParam;
window.showNotification = showNotification;
window.API = API;
