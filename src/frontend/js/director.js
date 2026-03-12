const DirectorPage = {
    bookId: null,
    bookType: null,
    characters: [],
    plotCards: [],
    selectedCharacter: null,
    selectedCards: {
        weather: null,
        terrain: null,
        adventure: null,
        equipment: null
    },

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.bookId = urlParams.get('bookId');
        
        if (!this.bookId) {
            alert('缺少书籍ID');
            window.location.href = '/bookshelf.html';
            return;
        }

        await this.loadBookInfo();
        await this.loadCharacters();
        await this.loadPlotCards();
        this.bindEvents();
        this.updateUI();
    },

    async loadBookInfo() {
        try {
            const response = await API.getBook(this.bookId);
            if (response.success) {
                this.bookType = response.data.type;
                document.title = `故事导演 - ${response.data.title}`;
            }
        } catch (error) {
            console.error('加载书籍信息失败:', error);
        }
    },

    async loadCharacters() {
        try {
            const response = await API.getCharacters(this.bookId);
            if (response.success) {
                this.characters = response.data;
            }
        } catch (error) {
            console.error('加载角色失败:', error);
        }
    },

    async loadPlotCards() {
        try {
            const response = await API.getPlotCards(this.bookId);
            if (response.success) {
                this.plotCards = response.data;
            }
        } catch (error) {
            console.error('加载卡牌失败:', error);
        }
    },

    bindEvents() {
        document.getElementById('start-shooting').addEventListener('click', () => this.startShooting());
    },

    renderCharacters() {
        const container = document.getElementById('character-cards');
        container.innerHTML = '';

        this.characters.forEach(char => {
            const card = document.createElement('div');
            card.className = `character-card ${char.is_protagonist ? 'protagonist' : ''}`;
            card.dataset.id = char.char_id;
            
            card.innerHTML = `
                ${char.is_protagonist ? '<span class="protagonist-badge">主角</span>' : ''}
                ${!char.is_protagonist ? `<span class="intimacy-badge">${this.getIntimacyText(char.intimacy)}</span>` : ''}
                <div class="avatar">${char.avatar || '👤'}</div>
                <div class="char-name">${char.name}</div>
                <div class="char-type">${char.role_type || ''}</div>
            `;

            card.addEventListener('click', () => this.selectCharacter(char, card));
            container.appendChild(card);
        });
    },

    renderPlotCards() {
        const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
        
        subTypes.forEach(subType => {
            const container = document.getElementById(`${subType}-cards`);
            container.innerHTML = '';

            const cards = this.plotCards.filter(c => c.sub_type === subType);
            cards.forEach(card => {
                const cardEl = document.createElement('div');
                cardEl.className = 'plot-card';
                cardEl.dataset.id = card.card_id;
                cardEl.dataset.subType = subType;
                
                cardEl.innerHTML = `
                    <div class="card-icon">${card.icon || '🃏'}</div>
                    <div class="card-name">${card.name}</div>
                `;

                cardEl.addEventListener('click', () => this.selectPlotCard(card, cardEl, subType));
                container.appendChild(cardEl);
            });
        });
    },

    selectCharacter(char, cardEl) {
        document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
        cardEl.classList.add('selected');
        this.selectedCharacter = char;
        this.updateStage();
        this.checkSelection();
    },

    selectPlotCard(card, cardEl, subType) {
        const container = document.getElementById(`${subType}-cards`);
        container.querySelectorAll('.plot-card').forEach(c => c.classList.remove('selected'));
        cardEl.classList.add('selected');
        this.selectedCards[subType] = card;
        this.updateStage();
        this.checkSelection();
    },

    updateStage() {
        const stage = document.getElementById('stage');
        stage.innerHTML = '';

        if (this.selectedCharacter) {
            const charCard = document.createElement('div');
            charCard.className = 'stage-card';
            charCard.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
            charCard.innerHTML = `
                <div class="icon">${this.selectedCharacter.avatar || '👤'}</div>
                <div class="name">${this.selectedCharacter.name}</div>
            `;
            stage.appendChild(charCard);
        }

        Object.entries(this.selectedCards).forEach(([subType, card]) => {
            if (card) {
                const cardEl = document.createElement('div');
                cardEl.className = 'stage-card';
                cardEl.style.background = this.getCardColor(subType);
                cardEl.innerHTML = `
                    <div class="icon">${card.icon || '🃏'}</div>
                    <div class="name">${card.name}</div>
                `;
                stage.appendChild(cardEl);
            }
        });

        if (!this.selectedCharacter && !Object.values(this.selectedCards).some(c => c)) {
            stage.innerHTML = '<div class="stage-placeholder">选择角色和卡牌来布置舞台</div>';
        }
    },

    getCardColor(subType) {
        const colors = {
            weather: 'linear-gradient(135deg, #87CEEB 0%, #4A90D9 100%)',
            terrain: 'linear-gradient(135deg, #90EE90 0%, #228B22 100%)',
            adventure: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
            equipment: 'linear-gradient(135deg, #DEB887 0%, #8B4513 100%)'
        };
        return colors[subType] || 'linear-gradient(135deg, #f0f0f0 0%, #ddd 100%)';
    },

    getIntimacyText(intimacy) {
        if (intimacy >= 50) return '友好';
        if (intimacy >= 0) return '中立';
        return '敌对';
    },

    checkSelection() {
        const hasCharacter = !!this.selectedCharacter;
        const hasAllCards = Object.values(this.selectedCards).every(c => c !== null);
        const canStart = hasCharacter && hasAllCards;

        document.getElementById('start-shooting').disabled = !canStart;
        
        const hint = document.getElementById('selection-hint');
        if (canStart) {
            hint.textContent = '准备就绪，点击开始拍摄！';
            hint.style.color = '#6B21A8';
        } else {
            const missing = [];
            if (!hasCharacter) missing.push('主角');
            if (!this.selectedCards.weather) missing.push('天气卡牌');
            if (!this.selectedCards.terrain) missing.push('地形卡牌');
            if (!this.selectedCards.adventure) missing.push('冒险卡牌');
            if (!this.selectedCards.equipment) missing.push('装备卡牌');
            hint.textContent = `还需选择：${missing.join('、')}`;
            hint.style.color = '#666';
        }
    },

    updateUI() {
        this.renderCharacters();
        this.renderPlotCards();
        this.checkSelection();
    },

    async startShooting() {
        if (!this.selectedCharacter || !Object.values(this.selectedCards).every(c => c)) {
            return;
        }

        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.classList.remove('hidden');

        try {
            const chapterData = {
                book_id: this.bookId,
                title: `第${await this.getNextChapterNumber()}章`,
                content: this.generateChapterContent(),
                weather_card: this.selectedCards.weather.card_id,
                terrain_card: this.selectedCards.terrain.card_id,
                adventure_card: this.selectedCards.adventure.card_id,
                equipment_card: this.selectedCards.equipment.card_id,
                protagonist_id: this.selectedCharacter.char_id
            };

            const response = await API.createChapter(chapterData);
            
            if (response.success) {
                window.location.href = `/book.html?id=${this.bookId}`;
            } else {
                throw new Error(response.error || '创建章节失败');
            }
        } catch (error) {
            console.error('创建章节失败:', error);
            alert('创建章节失败: ' + error.message);
            loadingOverlay.classList.add('hidden');
        }
    },

    async getNextChapterNumber() {
        try {
            const response = await API.getChapters(this.bookId);
            if (response.success && response.data.length > 0) {
                return response.data.length + 1;
            }
        } catch (error) {
            console.error('获取章节数量失败:', error);
        }
        return 1;
    },

    generateChapterContent() {
        const char = this.selectedCharacter;
        const weather = this.selectedCards.weather;
        const terrain = this.selectedCards.terrain;
        const adventure = this.selectedCards.adventure;
        const equipment = this.selectedCards.equipment;

        return `${char.name}在${weather.name}的日子里，来到了${terrain.name}。` +
               `带着${equipment.name}，开始了${adventure.name}的冒险...`;
    }
};

document.addEventListener('DOMContentLoaded', () => DirectorPage.init());
