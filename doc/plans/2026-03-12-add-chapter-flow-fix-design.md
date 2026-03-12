# 添加章节流程修复设计文档

## 文档信息

| 项目 | 内容 |
|------|------|
| 项目名称 | 卡牌互动小说书籍网站 |
| 版本 | V1.0 |
| 创建日期 | 2026-03-12 |
| 文档类型 | 设计文档 |

---

## 一、问题背景

### 1.1 问题描述

"添加章节"功能的现有实现与文档记录的流程存在显著差异，导致功能无法正常工作。

### 1.2 主要差异

| 对比项 | 文档设计 | 现有实现 | 问题 |
|--------|----------|----------|------|
| API接口路径 | `POST /api/chapters` | `POST /api/generate-chapter` | 接口不存在 |
| 请求参数结构 | `selected_cards` 对象 | `card_ids` 数组 | 结构不匹配 |
| 主角选择 | 必须选择主角 | 可选 | 必填校验缺失 |
| 配角选择 | `supporting_ids` 数组 | 未实现 | 功能缺失 |
| 章节标题 | AI生成返回 | 需要前端传入 | 职责不清 |
| 章节内容 | AI生成返回 | 需要前端传入 | 职责不清 |

---

## 二、解决方案

### 2.1 方案选择

选择**方案A：修改前端适配后端**，原因：
1. 文档设计更合理（职责分离）
2. 后端已有基础实现，改动较小
3. 符合API文档规范

### 2.2 修改范围

| 文件 | 修改内容 |
|------|----------|
| `src/frontend/director.html` | 修改API调用、参数结构、卡牌选择逻辑 |
| `functions/api/chapters.js` | 修改接口逻辑，生成章节标题和内容 |

---

## 三、详细设计

### 3.1 前端修改

#### 3.1.1 数据结构修改

**修改前：**
```javascript
const selectedCards = {
    character: null,
    weather: null,
    terrain: null,
    adventure: null,
    equipment: null
};
```

**修改后：**
```javascript
const selectedCards = {
    protagonist: null,      // 主角（必选1个）
    supporting: [],         // 配角（可选0-3个）
    weather: null,          // 天气卡牌
    terrain: null,          // 地形卡牌
    adventure: null,        // 冒险类型卡牌
    equipment: null         // 装备卡牌
};
```

#### 3.1.2 卡牌加载修改

需要分别加载：
- 角色卡牌（区分主角和配角）
- 情节卡牌（天气/地形/冒险/装备）

调用接口：
- `GET /api/books/{book_id}/characters` - 获取角色卡牌
- `GET /api/plot-cards?book_id={book_id}` - 获取情节卡牌

#### 3.1.3 API调用修改

**修改前：**
```javascript
const response = await fetch('/api/generate-chapter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        book_id: bookId,
        card_ids: selectedIds
    })
});
```

**修改后：**
```javascript
const response = await fetch('/api/chapters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        book_id: bookId,
        user_id: localStorage.getItem('userId'),
        selected_cards: {
            protagonist_id: selectedCards.protagonist?.char_id,
            supporting_ids: selectedCards.supporting.map(c => c.char_id),
            weather_id: selectedCards.weather?.card_id,
            terrain_id: selectedCards.terrain?.card_id,
            adventure_id: selectedCards.adventure?.card_id,
            equipment_id: selectedCards.equipment?.card_id
        }
    })
});
```

#### 3.1.4 选择校验

```javascript
function validateSelection() {
    if (!selectedCards.protagonist) {
        showNotification('请选择主角', 'error');
        return false;
    }
    if (!selectedCards.weather) {
        showNotification('请选择天气卡牌', 'error');
        return false;
    }
    if (!selectedCards.terrain) {
        showNotification('请选择地形卡牌', 'error');
        return false;
    }
    if (!selectedCards.adventure) {
        showNotification('请选择冒险类型卡牌', 'error');
        return false;
    }
    if (!selectedCards.equipment) {
        showNotification('请选择装备卡牌', 'error');
        return false;
    }
    return true;
}
```

### 3.2 后端修改

#### 3.2.1 接口参数修改

**修改前：**
```javascript
const { user_id, book_id, title, content, selected_cards, 
        weather_card, terrain_card, adventure_card, 
        equipment_card, protagonist_id } = body;
```

**修改后：**
```javascript
const { user_id, book_id, selected_cards } = body;
const { protagonist_id, supporting_ids, weather_id, 
        terrain_id, adventure_id, equipment_id } = selected_cards || {};
```

#### 3.2.2 章节标题生成

```javascript
function generateChapterTitle(bookType, orderNum) {
    const titleTemplates = {
        adventure: ['神秘的开端', '森林探险', '山洞探秘', '宝藏发现', '勇士归来'],
        fantasy: ['魔法觉醒', '龙之巢穴', '精灵森林', '黑暗降临', '光明重现'],
        romance: ['初遇', '心动', '误会', '和解', '永恒'],
        business: ['初入职场', '项目启动', '危机处理', '团队合作', '成功突破']
    };
    
    const templates = titleTemplates[bookType] || titleTemplates.adventure;
    return templates[orderNum % templates.length];
}
```

#### 3.2.3 章节内容生成（假数据）

```javascript
function generateChapterContent(bookType, selectedCards) {
    const protagonist = selectedCards.protagonist?.name || '主角';
    const weather = selectedCards.weather?.name || '晴天';
    const terrain = selectedCards.terrain?.name || '森林';
    const adventure = selectedCards.adventure?.name || '探险';
    const equipment = selectedCards.equipment?.name || '指南针';
    
    return `${weather}的日子里，${protagonist}来到了${terrain}。这里充满了神秘和未知，${protagonist}拿出${equipment}，开始了${adventure}之旅。周围的景色令人叹为观止，每一步都充满惊喜。在这片神奇的土地上，${protagonist}将会遇到什么样的挑战呢？让我们拭目以待...`;
}
```

#### 3.2.4 响应格式修改

```javascript
return createSuccessResponse({
    chapter: {
        chapter_id: chapterId,
        title: title,
        content: content,
        order_num: orderNum
    },
    puzzle: {
        puzzle_id: puzzleId,
        question: puzzleTemplate.question,
        puzzle_type: puzzleTemplate.type
    },
    updated_intimacy: updatedIntimacy
});
```

---

## 四、UI修改

### 4.1 选择槽位修改

**修改前：**
```html
<li class="selected-item">
    <span class="slot-icon">👤</span>
    <span class="slot-name">角色</span>
    <span class="slot-value" id="selected-character">未选择</span>
</li>
```

**修改后：**
```html
<li class="selected-item">
    <span class="slot-icon">👤</span>
    <span class="slot-name">主角</span>
    <span class="slot-value" id="selected-protagonist">未选择</span>
</li>
<li class="selected-item">
    <span class="slot-icon">👥</span>
    <span class="slot-name">配角</span>
    <span class="slot-value" id="selected-supporting">未选择</span>
</li>
```

### 4.2 卡牌库分类

需要将卡牌库分为多个分类标签页：
- 主角（显示主角卡牌）
- 配角（显示配角卡牌）
- 天气
- 地形
- 冒险
- 装备

---

## 五、测试要点

### 5.1 功能测试

| 测试项 | 预期结果 |
|--------|----------|
| 不选主角点击创作 | 提示"请选择主角" |
| 不选天气点击创作 | 提示"请选择天气卡牌" |
| 全部选择后点击创作 | 成功创建章节 |
| 创建成功后 | 跳转到章节页面 |
| 配角选择 | 可选择0-3个 |

### 5.2 接口测试

| 测试项 | 预期结果 |
|--------|----------|
| POST /api/chapters | 返回章节和谜题信息 |
| 参数校验 | 缺少必填参数返回错误 |
| 权限校验 | 非所有者返回权限错误 |

---

## 六、实施计划

1. 修改后端 `functions/api/chapters.js`
   - 修改参数解析
   - 添加章节标题生成
   - 添加章节内容生成
   - 修改响应格式

2. 修改前端 `src/frontend/director.html`
   - 修改数据结构
   - 修改卡牌加载逻辑
   - 修改UI布局
   - 修改API调用
   - 添加选择校验

3. 测试验证
   - 单元测试
   - 集成测试
   - E2E测试

---

## 文档历史

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| V1.0 | 2026-03-12 | 初始版本 |
