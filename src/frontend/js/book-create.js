const BookCreatePage = {
    currentStep: 1,
    totalSteps: 4,
    bookTypes: [],
    characterTypes: [],
    personalityOptions: [],
    speechStyleOptions: [],
    supportingCount: 1,
    createdBookId: null,
    avatarOptions: ['👦', '👧', '🧑', '👨', '👩', '🧔', '👴', '👵', '🧓', '👶', '🧒', '👼', '🦸', '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞', '🤴', '👸', '🤵', '👰'],

    async init() {
        await this.loadConfig();
        this.populateSelects();
        this.setupAvatarOptions();
        this.updateProgressBar();
    },

    async loadConfig() {
        try {
            const [bookTypesRes, personalityRes, speechStyleRes] = await Promise.all([
                API.getBookTypes(),
                API.getPersonality(),
                API.getSpeechStyle()
            ]);

            if (bookTypesRes.success) this.bookTypes = bookTypesRes.data.types;
            if (personalityRes.success) this.personalityOptions = personalityRes.data.personality;
            if (speechStyleRes.success) this.speechStyleOptions = speechStyleRes.data.speech_styles;
        } catch (error) {
            console.error('加载配置失败:', error);
        }
    },

    async loadCharacterTypes(bookType) {
        try {
            const response = await API.getCharacterTypes(bookType);
            if (response.success) {
                this.characterTypes = response.data.character_types;
                this.updateCharacterTypeSelects();
            }
        } catch (error) {
            console.error('加载角色类型失败:', error);
        }
    },

    populateSelects() {
        const bookTypeSelect = document.getElementById('bookType');
        bookTypeSelect.innerHTML = '<option value="">请选择类型</option>';
        this.bookTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.type;
            option.textContent = type.name;
            bookTypeSelect.appendChild(option);
        });

        bookTypeSelect.addEventListener('change', (e) => {
            this.loadCharacterTypes(e.target.value);
        });

        const personalitySelect = document.getElementById('protagonistPersonality');
        personalitySelect.innerHTML = '<option value="">请选择</option>';
        this.personalityOptions.forEach(p => {
            const option = document.createElement('option');
            option.value = p;
            option.textContent = p;
            personalitySelect.appendChild(option);
        });

        const speechStyleSelect = document.getElementById('protagonistSpeechStyle');
        speechStyleSelect.innerHTML = '<option value="">请选择</option>';
        this.speechStyleOptions.forEach(s => {
            const option = document.createElement('option');
            option.value = s;
            option.textContent = s;
            speechStyleSelect.appendChild(option);
        });

        this.updateSupportingSelects();
    },

    updateCharacterTypeSelects() {
        const protagonistTypeSelect = document.getElementById('protagonistType');
        protagonistTypeSelect.innerHTML = '<option value="">请选择</option>';
        this.characterTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            protagonistTypeSelect.appendChild(option);
        });

        document.querySelectorAll('.supporting-type-select').forEach(select => {
            select.innerHTML = '<option value="">请选择</option>';
            this.characterTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = type;
                select.appendChild(option);
            });
        });
    },

    updateSupportingSelects() {
        document.querySelectorAll('.personality-select').forEach(select => {
            select.innerHTML = '<option value="">请选择</option>';
            this.personalityOptions.forEach(p => {
                const option = document.createElement('option');
                option.value = p;
                option.textContent = p;
                select.appendChild(option);
            });
        });

        document.querySelectorAll('.speech-style-select').forEach(select => {
            select.innerHTML = '<option value="">请选择</option>';
            this.speechStyleOptions.forEach(s => {
                const option = document.createElement('option');
                option.value = s;
                option.textContent = s;
                select.appendChild(option);
            });
        });
    },

    setupAvatarOptions() {
        const container = document.getElementById('protagonistAvatarOptions');
        container.innerHTML = '';
        
        this.avatarOptions.slice(0, 12).forEach(avatar => {
            const option = document.createElement('div');
            option.className = 'avatar-option';
            option.textContent = avatar;
            option.addEventListener('click', () => {
                document.getElementById('protagonistAvatar').value = avatar;
                container.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
            container.appendChild(option);
        });
    },

    updateProgressBar() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');
            if (stepNum < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNum === this.currentStep) {
                step.classList.add('active');
            }
        });

        document.querySelectorAll('.form-step').forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            }
        });
    },

    validateStep(step) {
        switch (step) {
            case 1:
                const title = document.getElementById('storyTitle').value.trim();
                const type = document.getElementById('storyGenre').value;
                if (!title) {
                    alert('请输入书籍标题');
                    return false;
                }
                if (!type) {
                    alert('请选择书籍类型');
                    return false;
                }
                return true;

            case 2:
                const protagonistName = document.getElementById('protagonistName').value.trim();
                if (!protagonistName) {
                    alert('请输入主角名称');
                    return false;
                }
                return true;

            case 3:
                return true;

            default:
                return true;
        }
    },

    nextStep() {
        if (!this.validateStep(this.currentStep)) {
            return;
        }

        if (this.currentStep === 3) {
            this.createBook();
            return;
        }

        this.currentStep++;
        this.updateProgressBar();
    },

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateProgressBar();
        }
    },

    addSupportingCharacter() {
        if (this.supportingCount >= 3) {
            return;
        }

        this.supportingCount++;
        const container = document.getElementById('supporting-characters');
        const newChar = document.createElement('div');
        newChar.className = 'supporting-character';
        newChar.dataset.index = this.supportingCount - 1;
        
        newChar.innerHTML = `
            <h3>配角 ${this.supportingCount}</h3>
            <div class="form-group">
                <label>名称</label>
                <input type="text" name="supporting_${this.supportingCount - 1}_name" placeholder="配角名称">
                <input type="hidden" name="supporting_${this.supportingCount - 1}_avatar" value="👤">
            </div>
            <div class="form-group">
                <label>选择头像</label>
                <div class="avatar-selector" id="supporting_${this.supportingCount - 1}_avatar_options"></div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>角色类型</label>
                    <select name="supporting_${this.supportingCount - 1}_type" class="supporting-type-select"></select>
                </div>
                <div class="form-group">
                    <label>性格</label>
                    <select name="supporting_${this.supportingCount - 1}_personality" class="personality-select"></select>
                </div>
            </div>
            <div class="form-group">
                <label>说话方式</label>
                <select name="supporting_${this.supportingCount - 1}_speech_style" class="speech-style-select"></select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>与主角亲密度 <span class="required">*</span></label>
                    <select name="supporting_${this.supportingCount - 1}_intimacy" class="intimacy-select" required>
                        <option value="">请选择</option>
                        <option value="-50">敌对</option>
                        <option value="0" selected>中立</option>
                        <option value="50">友好</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>与主角关系</label>
                    <select name="supporting_${this.supportingCount - 1}_relationship" class="relationship-select">
                        <option value="">请选择</option>
                        <option value="朋友">朋友</option>
                        <option value="家人">家人</option>
                        <option value="同事">同事</option>
                        <option value="同学">同学</option>
                        <option value="邻居">邻居</option>
                        <option value="对手">对手</option>
                        <option value="陌生人">陌生人</option>
                    </select>
                </div>
            </div>
        `;

        container.appendChild(newChar);
        this.updateCharacterTypeSelects();
        this.updateSupportingSelects();
        this.setupSupportingAvatarOptions(this.supportingCount - 1);

        if (this.supportingCount >= 3) {
            document.getElementById('add-character-btn').disabled = true;
        }
    },

    setupSupportingAvatarOptions(index) {
        const container = document.getElementById(`supporting_${index}_avatar_options`);
        if (!container) return;
        
        container.innerHTML = '';
        this.avatarOptions.slice(0, 12).forEach(avatar => {
            const option = document.createElement('div');
            option.className = 'avatar-option';
            option.textContent = avatar;
            option.addEventListener('click', () => {
                document.querySelector(`[name="supporting_${index}_avatar"]`).value = avatar;
                container.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
            container.appendChild(option);
        });
    },

    async createBook() {
        const userId = getUserId();
        if (!userId) {
            alert('请先登录');
            window.location.href = '/login';
            return;
        }

        const bookData = {
            user_id: userId,
            title: document.getElementById('storyTitle').value.trim(),
            type: document.getElementById('storyGenre').value,
            protagonist: {
                name: document.getElementById('protagonistName').value.trim(),
                avatar: this.selectedProtagonistAvatar,
                role_type: document.getElementById('protagonistType').value,
                personality: document.getElementById('protagonistPersonality').value,
                speech_style: document.getElementById('protagonistSpeechStyle').value
            },
            supporting_characters: this.getSupportingCharacters()
        };

        try {
            const response = await API.createBook(bookData);
            
            if (response.success) {
                this.createdBookId = response.data.book_id;
                this.showSuccess(response.data);
            } else {
                alert('创建失败: ' + response.error);
            }
        } catch (error) {
            console.error('创建书籍失败:', error);
            alert('创建书籍失败: ' + error.message);
        }
    },

    getSupportingCharacters() {
        const characters = [];
        for (let i = 0; i < this.supportingCount; i++) {
            const name = document.querySelector(`[name="supporting_${i}_name"]`)?.value?.trim();
            if (name) {
                const intimacyValue = document.querySelector(`[name="supporting_${i}_intimacy"]`)?.value;
                characters.push({
                    name: name,
                    avatar: document.querySelector(`[name="supporting_${i}_avatar"]`)?.value || '👤',
                    role_type: document.querySelector(`[name="supporting_${i}_type"]`)?.value || '',
                    personality: document.querySelector(`[name="supporting_${i}_personality"]`)?.value || '',
                    speech_style: document.querySelector(`[name="supporting_${i}_speech_style"]`)?.value || '',
                    intimacy: intimacyValue ? parseInt(intimacyValue) : 0,
                    relationship: document.querySelector(`[name="supporting_${i}_relationship"]`)?.value || ''
                });
            }
        }
        return characters;
    },

    showSuccess(data) {
        this.currentStep = 4;
        this.updateProgressBar();

        const preview = document.getElementById('book-preview');
        const bookType = this.bookTypes.find(t => t.type === data.type);
        
        preview.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>类型:</strong> ${bookType ? bookType.name : data.type}</p>
            <p><strong>主角:</strong> ${data.protagonist.avatar} ${data.protagonist.name}</p>
            ${data.supporting_characters.length > 0 ? 
                `<p><strong>配角:</strong> ${data.supporting_characters.map(c => `${c.avatar} ${c.name}`).join(', ')}</p>` : ''}
        `;

        document.getElementById('view-book-btn').href = `/book.html?id=${data.book_id}`;
    }
};

document.addEventListener('DOMContentLoaded', () => BookCreatePage.init());
