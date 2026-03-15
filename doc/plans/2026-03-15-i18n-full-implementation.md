# 国际化(i18n)完整改造实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现完整的中英文国际化支持，包括 API 数据、预设书籍过滤、AI 提示词多语言

**Architecture:** 
- 前端 API 请求自动附加 `lang` 参数
- 后端通过共享配置模块返回对应语言数据
- 数据库添加 `language` 字段过滤预设书籍
- AI 提示词支持多语言模板

**Tech Stack:** Cloudflare Pages Functions, D1 Database, ES Modules

---

## Phase 1: 数据库层改造

### Task 1.1: 修改数据库初始化 Schema

**Files:**
- Modify: `migrations/0001_init.sql:11-19`

**Step 1: 在 books 表添加 language 字段**

```sql
-- 创建书籍表
CREATE TABLE IF NOT EXISTS books (
    book_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    is_preset INTEGER NOT NULL DEFAULT 0,
    language TEXT NOT NULL DEFAULT 'zh',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

**Step 2: 添加 language 索引**

在索引部分添加：
```sql
CREATE INDEX IF NOT EXISTS idx_books_language ON books(language);
```

---

### Task 1.2: 修改种子数据 - 预设书籍

**Files:**
- Modify: `migrations/0002_seed_data.sql:6-30`

**Step 1: 修改预设书籍 INSERT 语句**

```sql
-- 预设书籍
INSERT INTO books (book_id, user_id, title, type, is_preset, language) VALUES
-- 儿童冒险 - 中文版
('preset-adventure-001', 'system', '星空探险家', 'adventure', 1, 'zh'),
('preset-adventure-002', 'system', '深海探险队', 'adventure', 1, 'zh'),
-- 儿童冒险 - 英文版
('preset-adventure-001-en', 'system', 'Stargazer''s Quest', 'adventure', 1, 'en'),
('preset-adventure-002-en', 'system', 'The Deep Sea Explorers', 'adventure', 1, 'en'),
-- 魔幻传说 - 中文版
('preset-fantasy-001', 'system', 'AI魔法学院', 'fantasy', 1, 'zh'),
('preset-fantasy-002', 'system', '平行世界的我', 'fantasy', 1, 'zh'),
-- 魔幻传说 - 英文版
('preset-fantasy-001-en', 'system', 'The Academy of Smart Magic', 'fantasy', 1, 'en'),
('preset-fantasy-002-en', 'system', 'The Other Me', 'fantasy', 1, 'en'),
-- 都市言情 - 中文版
('preset-romance-001', 'system', '代码恋人', 'romance', 1, 'zh'),
('preset-romance-002', 'system', '算法姻缘', 'romance', 1, 'zh'),
-- 都市言情 - 英文版
('preset-romance-001-en', 'system', 'Love in the Code', 'romance', 1, 'en'),
('preset-romance-002-en', 'system', 'Algorithm of Love', 'romance', 1, 'en'),
-- 职场风云 - 中文版
('preset-business-001', 'system', '周报战争', 'business', 1, 'zh'),
('preset-business-002', 'system', '副业狂想曲', 'business', 1, 'zh'),
-- 职场风云 - 英文版
('preset-business-001-en', 'system', 'The Weekly Report Wars', 'business', 1, 'en'),
('preset-business-002-en', 'system', 'The Side Hustle Symphony', 'business', 1, 'en');
```

---

## Phase 2: 后端基础设施

### Task 2.1: 创建共享 i18n 配置模块

**Files:**
- Create: `functions/_shared/i18n-config.js`

**Step 1: 创建配置文件**

```javascript
export const i18nConfig = {
  bookTypes: {
    en: {
      types: [
        { type: 'adventure', name: "Children's Adventure", theme: 'adventure' },
        { type: 'fantasy', name: 'Fantasy Legend', theme: 'fantasy' },
        { type: 'romance', name: 'Urban Romance', theme: 'romance' },
        { type: 'business', name: 'Corporate Drama', theme: 'business' }
      ]
    },
    zh: {
      types: [
        { type: 'adventure', name: '儿童冒险', theme: 'adventure' },
        { type: 'fantasy', name: '魔幻传说', theme: 'fantasy' },
        { type: 'romance', name: '都市言情', theme: 'romance' },
        { type: 'business', name: '职场风云', theme: 'business' }
      ]
    }
  },

  personality: {
    en: [
      'Brave', 'Kind', 'Smart', 'Humorous', 'Calm', 'Passionate', 'Introverted', 'Extroverted',
      'Detail-oriented', 'Decisive', 'Gentle', 'Strong', 'Witty', 'Honest', 'Loyal',
      'Optimistic', 'Pessimistic', 'Independent', 'Dependent', 'Curious', 'Cautious', 'Bold',
      'Shy', 'Confident', 'Humble'
    ],
    zh: [
      '勇敢', '善良', '聪明', '幽默', '冷静', '热情', '内向', '外向',
      '细心', '果断', '温柔', '坚强', '机智', '诚实', '忠诚',
      '乐观', '悲观', '独立', '依赖', '好奇', '谨慎', '大胆',
      '害羞', '自信', '谦虚'
    ]
  },

  speechStyles: {
    en: [
      'Formal', 'Casual', 'Humorous', 'Serious', 'Gentle', 'Forceful', 'Polite', 'Direct',
      'Diplomatic', 'Enthusiastic', 'Cold', 'Friendly', 'Distant', 'Lively', 'Steady',
      'Exaggerated', 'Understated', 'Elegant', 'Rough', 'Delicate', 'Concise', 'Verbose',
      'Deep', 'Light-hearted', 'Mysterious'
    ],
    zh: [
      '正式', '随意', '幽默', '严肃', '温柔', '强硬', '礼貌', '直接',
      '委婉', '热情', '冷淡', '亲切', '疏离', '活泼', '沉稳',
      '夸张', '低调', '文雅', '粗犷', '细腻', '简洁', '啰嗦',
      '深沉', '轻快', '神秘'
    ]
  },

  characterTypes: {
    en: {
      adventure: ['Explorer', 'Guide', 'Captain', 'Archaeologist', 'Photographer', 'Zoologist', 'Botanist', 'Geologist'],
      fantasy: ['Wizard', 'Knight', 'Elf', 'Dwarf', 'Dragon Rider', 'Sorcerer', 'Ranger', 'Bard'],
      romance: ['Entrepreneur', 'Doctor', 'Lawyer', 'Artist', 'Writer', 'Designer', 'Architect', 'Musician'],
      business: ['CEO', 'Manager', 'Entrepreneur', 'Investor', 'Consultant', 'Analyst', 'Engineer', 'Designer']
    },
    zh: {
      adventure: ['探险家', '向导', '船长', '考古学家', '摄影师', '动物学家', '植物学家', '地质学家'],
      fantasy: ['魔法师', '骑士', '精灵', '矮人', '龙骑士', '巫师', '游侠', '吟游诗人'],
      romance: ['企业家', '医生', '律师', '艺术家', '作家', '设计师', '建筑师', '音乐家'],
      business: ['CEO', '经理', '创业者', '投资人', '顾问', '分析师', '工程师', '设计师']
    }
  },

  plotOptions: {
    en: {
      adventure: {
        weather: ['Sunny', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Thunderstorm', 'Windy', 'Foggy', 'Snowy', 'Sandstorm', 'Rainbow', 'Dawn', 'Sunset', 'Starry Night', 'Moonlit', 'Scorching Sun', 'Breeze', 'Downpour', 'Hail', 'Tornado', 'Typhoon'],
        terrain: ['Forest', 'Mountain', 'River', 'Lake', 'Desert', 'Grassland', 'Canyon', 'Cave', 'Waterfall', 'Glacier', 'Volcano', 'Beach', 'Swamp', 'Plateau', 'Basin', 'Hills', 'Plains', 'Island', 'Reef', 'Cliff'],
        adventure: ['Treasure Hunt', 'Exploration', 'Rescue', 'Puzzle', 'Chase', 'Survival', 'Discovery', 'Challenge', 'Competition', 'Travel', 'Archaeology', 'Observation', 'Collection', 'Building', 'Training', 'Sports', 'Hunting', 'Fishing', 'Photography', 'Recording'],
        equipment: ['Map', 'Compass', 'Rope', 'Flashlight', 'Telescope', 'Backpack', 'Canteen', 'First Aid Kit', 'Tent', 'Sleeping Bag', 'Knife', 'Matches', 'Food', 'Raincoat', 'Hiking Boots', 'Hat', 'Sunglasses', 'Sunscreen', 'Insect Repellent', 'Camera']
      },
      fantasy: {
        weather: ['Magic Storm', 'Star Rain', 'Rainbow Clouds', 'Moon Mist', 'Fire Rain', 'Frost Snow', 'Thunder Clouds', 'Crystal Rain', 'Shadow Fog', 'Holy Light', 'Dragon Breath Wind', 'Elf Rain', 'Magic Surge', 'Time Rift', 'Elemental Storm', 'Magic Aurora', 'Spell Echo', 'Magic Ripple', 'Energy Wave', 'Mana Tide'],
        terrain: ['Magic Forest', 'Dragon Valley', 'Elf Kingdom', 'Dwarf Mine', 'Wizard Tower', 'Magic Academy', 'Mysterious Island', 'Dungeon', 'Wonderland', 'Magic Mountains', 'Crystal Cave', 'Magic Lake', 'Illusion Forest', 'Dragon Nest', 'Magic Garden', 'Ancient Ruins', 'Magic Swamp', 'Phantom Castle', 'Magic Plains', 'Elemental Shrine'],
        adventure: ['Magic Trial', 'Dragon Challenge', 'Elf Quest', 'Wizard Duel', 'Magic Collection', 'Mystery Exploration', 'Magic Puzzle', 'Element Summoning', 'Spell Learning', 'Magic Contest', 'Dragon Rider Training', 'Elf Dance', 'Magic Alchemy', 'Spell Creation', 'Magic Defense', 'Mystic Prophecy', 'Magic Portal', 'Element Fusion', 'Magic Contract', 'Fate Choice'],
        equipment: ['Magic Wand', 'Spellbook', 'Magic Gem', 'Magic Cloak', 'Magic Ring', 'Magic Potion', 'Magic Scroll', 'Magic Crystal', 'Magic Amulet', 'Magic Shield', 'Magic Sword', 'Magic Bow', 'Flying Carpet', 'Magic Lantern', 'Magic Compass', 'Magic Hourglass', 'Magic Mirror', 'Magic Key', 'Magic Quill', 'Magic Ink']
      },
      romance: {
        weather: ['Bright Sunshine', 'Gentle Rain', 'Soft Breeze', 'Golden Sunset', 'Starry Night', 'Moonlit', 'Spring Bloom', 'Autumn Breeze', 'Winter Sun', 'Summer Wind', 'Rainbow', 'Morning Light', 'Evening Glow', 'Misty Rain', 'Clear Sky', 'Light Clouds', 'Spring Drizzle', 'Autumn Wind', 'Winter Snow', 'Summer Heat'],
        terrain: ['Café', 'Bookstore', 'Park', 'Beach', 'Mountain Top', 'Ancient Town', 'Art Gallery', 'Concert Hall', 'Garden', 'Lakeside', 'City Streets', 'Country Road', 'Rooftop Garden', 'Library', 'Cinema', 'Restaurant', 'Bar', 'Gym', 'Yoga Studio', 'Hot Spring'],
        adventure: ['Chance Meeting', 'Date', 'Confession', 'Travel', 'Celebration', 'Surprise', 'Memory', 'Growth', 'Dream', 'Challenge', 'Misunderstanding', 'Reconciliation', 'Reunion', 'Farewell', 'Gathering', 'Company', 'Understanding', 'Support', 'Encouragement', 'Protection'],
        equipment: ['Flowers', 'Gift', 'Love Letter', 'Photo', 'Souvenir', 'Diary', 'Music Box', 'Necklace', 'Ring', 'Watch', 'Perfume', 'Chocolate', 'Cake', 'Wine', 'Candle', 'Balloon', 'Ribbon', 'Card', 'Album', 'Video']
      },
      business: {
        weather: ['Market Boom', 'Economic Downturn', 'Policy Boost', 'Industry Shift', 'Tech Innovation', 'Fierce Competition', 'Win-Win Cooperation', 'Investment Wave', 'Risk Alert', 'Opportunity', 'Market Volatility', 'Policy Change', 'Industry Reshuffle', 'Tech Breakthrough', 'Competition Upgrade', 'Deep Cooperation', 'Investment Return', 'Risk Control', 'Opportunity Seize', 'Trend Forecast'],
        terrain: ['Office', 'Meeting Room', 'Business Center', 'Startup Park', 'Investment Firm', 'Industry Expo', 'Business Hotel', 'Golf Course', 'Private Club', 'Business Restaurant', 'Co-working Space', 'Incubator', 'Accelerator', 'Industrial Park', 'Business Tower', 'Financial Center', 'Tech Park', 'Innovation Center', 'Business School', 'Headquarters'],
        adventure: ['Project Launch', 'Negotiation', 'Team Building', 'Market Expansion', 'Product Launch', 'Fundraising Pitch', 'Strategic Planning', 'Crisis Management', 'Recruitment', 'Performance Breakthrough', 'Brand Promotion', 'Client Development', 'Partnership', 'Investment Decision', 'Risk Management', 'R&D Innovation', 'Process Optimization', 'Cost Control', 'Quality Management', 'Performance Improvement'],
        equipment: ['Laptop', 'Projector', 'Whiteboard', 'Business Card', 'Folder', 'Pen', 'Meeting Notes', 'Business Phone', 'Tablet', 'Printer', 'Scanner', 'Shredder', 'Safe', 'File Cabinet', 'Desk & Chair', 'Meeting Table', 'Pantry', 'Rest Area', 'Reception', 'Front Desk']
      }
    },
    zh: {
      adventure: {
        weather: ['晴天', '阴天', '小雨', '大雨', '雷雨', '大风', '雾天', '雪天', '沙尘暴', '彩虹', '朝霞', '晚霞', '星空', '月夜', '烈日', '微风', '暴雨', '冰雹', '龙卷风', '台风'],
        terrain: ['森林', '山脉', '河流', '湖泊', '沙漠', '草原', '峡谷', '洞穴', '瀑布', '冰川', '火山', '海滩', '沼泽', '高原', '盆地', '丘陵', '平原', '岛屿', '暗礁', '悬崖'],
        adventure: ['寻宝', '探险', '救援', '解谜', '追逐', '生存', '发现', '挑战', '比赛', '旅行', '考古', '观察', '收集', '建造', '训练', '竞技', '狩猎', '钓鱼', '摄影', '记录'],
        equipment: ['地图', '指南针', '绳索', '手电筒', '望远镜', '背包', '水壶', '急救包', '帐篷', '睡袋', '刀具', '火柴', '食物', '雨衣', '登山鞋', '帽子', '太阳镜', '防晒霜', '驱虫剂', '相机']
      },
      fantasy: {
        weather: ['魔法风暴', '星光雨', '彩虹云', '月光雾', '火焰雨', '冰霜雪', '雷电云', '水晶雨', '暗影雾', '圣光普照', '龙息风', '精灵之雨', '魔力波动', '时空裂隙', '元素风暴', '魔法极光', '咒语回响', '魔法涟漪', '能量涌动', '法力潮汐'],
        terrain: ['魔法森林', '龙之谷', '精灵王国', '矮人矿坑', '巫师塔', '魔法学院', '神秘岛屿', '地下城', '仙境', '魔幻山脉', '水晶洞穴', '魔法湖泊', '幻境森林', '龙巢', '魔法花园', '神秘遗迹', '魔法沼泽', '幻影城堡', '魔法平原', '元素圣地'],
        adventure: ['魔法试炼', '龙之挑战', '精灵任务', '巫师对决', '魔法收集', '神秘探索', '魔法解谜', '元素召唤', '咒语学习', '魔法比赛', '龙骑士训练', '精灵舞蹈', '魔法炼金', '咒语创造', '魔法防御', '神秘预言', '魔法传送', '元素融合', '魔法契约', '命运抉择'],
        equipment: ['魔法杖', '魔法书', '魔法宝石', '魔法斗篷', '魔法戒指', '魔法药水', '魔法卷轴', '魔法水晶', '魔法护符', '魔法盾牌', '魔法剑', '魔法弓', '魔法飞毯', '魔法灯笼', '魔法罗盘', '魔法沙漏', '魔法镜子', '魔法钥匙', '魔法羽毛笔', '魔法墨水']
      },
      romance: {
        weather: ['阳光明媚', '细雨绵绵', '微风轻拂', '晚霞满天', '星光璀璨', '月色朦胧', '春暖花开', '秋高气爽', '冬日暖阳', '夏日清风', '彩虹初现', '晨曦微露', '夕阳西下', '烟雨朦胧', '晴空万里', '云淡风轻', '春雨如丝', '秋风送爽', '冬日飘雪', '夏日炎炎'],
        terrain: ['咖啡馆', '书店', '公园', '海滩', '山顶', '古镇', '艺术馆', '音乐厅', '花园', '湖畔', '城市街道', '乡村小路', '屋顶花园', '图书馆', '电影院', '餐厅', '酒吧', '健身房', '瑜伽馆', '温泉'],
        adventure: ['偶遇', '约会', '告白', '旅行', '庆祝', '惊喜', '回忆', '成长', '梦想', '挑战', '误会', '和解', '重逢', '离别', '相聚', '陪伴', '理解', '支持', '鼓励', '守护'],
        equipment: ['鲜花', '礼物', '情书', '照片', '纪念品', '日记本', '音乐盒', '项链', '戒指', '手表', '香水', '巧克力', '蛋糕', '红酒', '蜡烛', '气球', '彩带', '贺卡', '相册', '视频']
      },
      business: {
        weather: ['市场繁荣', '经济低迷', '政策利好', '行业变革', '技术革新', '竞争激烈', '合作共赢', '投资热潮', '风险预警', '机遇降临', '市场波动', '政策调整', '行业洗牌', '技术突破', '竞争升级', '合作深化', '投资回报', '风险控制', '机遇把握', '趋势预测'],
        terrain: ['办公室', '会议室', '商务中心', '创业园区', '投资机构', '行业展会', '商务酒店', '高尔夫球场', '私人会所', '商务餐厅', '联合办公', '孵化器', '加速器', '产业园区', '商务大厦', '金融中心', '科技园区', '创新中心', '商务学院', '企业总部'],
        adventure: ['项目启动', '商务谈判', '团队建设', '市场拓展', '产品发布', '融资路演', '战略规划', '危机处理', '人才招聘', '业绩突破', '品牌推广', '客户开发', '合作洽谈', '投资决策', '风险管控', '创新研发', '流程优化', '成本控制', '质量管理', '绩效提升'],
        equipment: ['笔记本电脑', '投影仪', '白板', '名片', '文件夹', '签字笔', '会议记录本', '商务手机', '平板电脑', '打印机', '扫描仪', '碎纸机', '保险箱', '档案柜', '办公桌椅', '会议桌', '茶水间', '休息区', '前台', '接待区']
      }
    }
  }
};

export function getLanguage(context) {
  const { request } = context;
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang');
  return (lang === 'zh' || lang === 'en') ? lang : 'en';
}

export function getConfig(key, lang) {
  const config = i18nConfig[key];
  if (!config) return null;
  
  if (config[lang]) {
    return config[lang];
  }
  return config.en || config;
}
```

---

### Task 2.2: 创建 AI 提示词多语言模块

**Files:**
- Create: `functions/_shared/i18n-prompts.js`

**Step 1: 创建提示词文件**

```javascript
export const prompts = {
  chapterGeneration: {
    en: `You are an interactive story chapter generation expert. Generate a new chapter based on the input.

## Output Format (JSON only, no other text)
{
  "title": "Chapter Title",
  "content": "Chapter content about 300 words",
  "puzzle": {
    "question": "Puzzle question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct answer"
  },
  "intimacy_changes": [
    { "char_name": "Character name", "change": 5 }
  ]
}

## Creative Points
- Style matches the book type
- Character behavior fits personality
- Connect with previous chapter, use card elements
- Puzzle is relevant and moderately difficult
- Intimacy changes range from -10 to +10, with causal relationship

## Puzzle Impact
- Previous puzzle solved: New chapter content tends to be positive, companion intimacy tends to increase
- Previous puzzle failed: New chapter content tends to be challenging, companion intimacy tends to decrease`,

    zh: `你是互动故事章节生成专家。根据输入信息生成新一章节内容。

## 输出格式（仅JSON，无其他文字）
{
  "title": "章节标题",
  "content": "章节内容约300字",
  "puzzle": {
    "question": "谜题问题",
    "options": ["选项A", "选项B", "选项C", "选项D"],
    "answer": "正确答案"
  },
  "intimacy_changes": [
    { "char_name": "角色名字", "change": 5 }
  ]
}

## 创作要点
- 风格匹配书籍类型
- 角色行为符合性格
- 承接上章，使用卡牌元素
- 谜题相关且难度适中
- 亲密度变化-10到+10，有因果关系

## 解谜影响
- 上一章解谜成功：新章节内容偏向积极，配角亲密度倾向正向变化
- 上一章解谜失败：新章节内容偏向挑战，配角亲密度倾向负向变化`
  }
};

export function getPrompt(key, lang) {
  const prompt = prompts[key];
  if (!prompt) return null;
  return prompt[lang] || prompt.en;
}
```

---

### Task 2.3: 更新 utils.js 添加 getLanguage

**Files:**
- Modify: `functions/api/utils.js`

**Step 1: 添加 getLanguage 函数**

在文件末尾添加：

```javascript
export function getLanguage(context) {
  const { request } = context;
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang');
  return (lang === 'zh' || lang === 'en') ? lang : 'en';
}
```

---

## Phase 3: 配置 API 改造

### Task 3.1: 改造 book-types API

**Files:**
- Modify: `functions/api/config/book-types.js`

**Step 1: 重写使用 i18n 配置**

```javascript
import { createSuccessResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const lang = getLanguage(context);
  const data = getConfig('bookTypes', lang);
  return createSuccessResponse(data);
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

---

### Task 3.2: 改造 personality API

**Files:**
- Modify: `functions/api/config/personality.js`

**Step 1: 重写使用 i18n 配置**

```javascript
import { createSuccessResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const lang = getLanguage(context);
  const data = getConfig('personality', lang);
  return createSuccessResponse({
    personality: data
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

---

### Task 3.3: 改造 speech-style API

**Files:**
- Modify: `functions/api/config/speech-style.js`

**Step 1: 重写使用 i18n 配置**

```javascript
import { createSuccessResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const lang = getLanguage(context);
  const data = getConfig('speechStyles', lang);
  return createSuccessResponse({
    speech_styles: data
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

---

### Task 3.4: 改造 character-types API

**Files:**
- Modify: `functions/api/config/character-types.js`

**Step 1: 重写使用 i18n 配置**

```javascript
import { createSuccessResponse, createErrorResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bookType = url.searchParams.get('book_type');
  const lang = getLanguage(context);
  const characterTypes = getConfig('characterTypes', lang);

  if (bookType && characterTypes[bookType]) {
    return createSuccessResponse({
      book_type: bookType,
      character_types: characterTypes[bookType]
    });
  } else if (bookType) {
    return createErrorResponse('Invalid book type');
  }

  return createSuccessResponse({
    character_types: characterTypes
  });
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

---

### Task 3.5: 改造 plot-options API

**Files:**
- Modify: `functions/api/config/plot-options.js`

**Step 1: 重写使用 i18n 配置**

```javascript
import { createSuccessResponse, createErrorResponse, createOptionsResponse, getLanguage } from '../utils.js';
import { getConfig } from '../../_shared/i18n-config.js';

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bookType = url.searchParams.get('book_type');
  const subType = url.searchParams.get('sub_type');
  const lang = getLanguage(context);
  const plotOptions = getConfig('plotOptions', lang);

  if (bookType) {
    const options = plotOptions[bookType];
    if (!options) {
      return createErrorResponse('Invalid book type');
    }
    
    if (subType) {
      const subOptions = options[subType];
      if (!subOptions) {
        return createErrorResponse('Invalid plot sub type');
      }
      return createSuccessResponse({
        book_type: bookType,
        sub_type: subType,
        options: subOptions
      });
    }
    
    return createSuccessResponse({
      book_type: bookType,
      plot_options: options
    });
  }
  
  return createSuccessResponse(plotOptions);
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
```

---

## Phase 4: 预设书籍过滤

### Task 4.1: 改造预设书籍列表 API

**Files:**
- Modify: `functions/api/books/preset.js`

**Step 1: 添加语言过滤**

```javascript
import { createSuccessResponse, createErrorResponse, getLanguage } from '../utils.js';

export async function onRequestGet(context) {
  const { env } = context;
  const lang = getLanguage(context);

  try {
    const results = await env.DB.prepare(
      'SELECT * FROM books WHERE is_preset = 1 AND language = ? ORDER BY created_at DESC'
    ).bind(lang).all();

    return createSuccessResponse(results.results);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
```

---

## Phase 5: 前端 API 改造

### Task 5.1: 改造前端 api.js

**Files:**
- Modify: `src/frontend/js/api.js:3-13`

**Step 1: 修改 apiRequest 函数添加语言参数**

```javascript
const API_BASE = '';

async function apiRequest(endpoint, options = {}) {
    const lang = localStorage.getItem('storybook-language') || 'en';
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${API_BASE}${endpoint}${separator}lang=${lang}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    return response.json();
}
```

---

## Phase 6: AI 提示词改造

### Task 6.1: 改造章节生成 API

**Files:**
- Modify: `functions/api/chapters.js`

**Step 1: 导入 i18n 提示词模块**

在文件开头添加导入：
```javascript
import { getPrompt } from '../_shared/i18n-prompts.js';
import { getLanguage } from './utils.js';
```

**Step 2: 修改 SYSTEM_PROMPT 使用动态获取**

将硬编码的 SYSTEM_PROMPT 改为：
```javascript
// 删除硬编码的 SYSTEM_PROMPT 常量
// 在 onRequestPost 函数中动态获取：
const lang = getLanguage(context);
const SYSTEM_PROMPT = getPrompt('chapterGeneration', lang);
```

---

## Phase 7: 测试验证

### Task 7.1: 运行本地开发服务器测试

**Step 1: 启动开发服务器**

```bash
wrangler pages dev src/frontend --compatibility-flag nodejs_compat --port 8788
```

**Step 2: 测试配置 API**

```bash
# 测试英文配置
curl "http://localhost:8788/api/config/book-types?lang=en"
curl "http://localhost:8788/api/config/personality?lang=en"
curl "http://localhost:8788/api/config/character-types?book_type=adventure&lang=en"

# 测试中文配置
curl "http://localhost:8788/api/config/book-types?lang=zh"
curl "http://localhost:8788/api/config/personality?lang=zh"
curl "http://localhost:8788/api/config/character-types?book_type=adventure&lang=zh"
```

**Step 3: 测试预设书籍过滤**

```bash
curl "http://localhost:8788/api/books/preset?lang=en"
curl "http://localhost:8788/api/books/preset?lang=zh"
```

---

### Task 7.2: 运行 E2E 测试

**Step 1: 运行现有 E2E 测试**

```bash
npx playwright test tests/e2e/i18n.spec.js
```

**Step 2: 检查测试结果**

确保所有测试通过，如有失败需要修复。

---

### Task 7.3: 手动端到端测试

**Step 1: 测试前端语言切换**

1. 打开首页，切换到中文
2. 验证导航栏、按钮等文本变为中文
3. 验证创建书籍页面，下拉选项显示中文
4. 验证预设书籍只显示中文版本

**Step 2: 测试英文模式**

1. 切换到英文
2. 验证所有文本变为英文
3. 验证预设书籍只显示英文版本

**Step 3: 测试语言持久化**

1. 切换语言后刷新页面
2. 验证语言设置保持不变

---

## Phase 8: 清理冗余文件

### Task 8.1: 删除不再使用的 config 目录

**Files:**
- Delete: `config/en/` 目录
- Delete: `config/zh/` 目录
- Delete: `config/*.json` 文件

**注意**: 这些文件现在已被 `functions/_shared/i18n-config.js` 替代，不再需要。

---

## 文件变更汇总

| 操作 | 文件路径 |
|------|----------|
| Modify | `migrations/0001_init.sql` |
| Modify | `migrations/0002_seed_data.sql` |
| Create | `functions/_shared/i18n-config.js` |
| Create | `functions/_shared/i18n-prompts.js` |
| Modify | `functions/api/utils.js` |
| Modify | `functions/api/config/book-types.js` |
| Modify | `functions/api/config/personality.js` |
| Modify | `functions/api/config/speech-style.js` |
| Modify | `functions/api/config/character-types.js` |
| Modify | `functions/api/config/plot-options.js` |
| Modify | `functions/api/books/preset.js` |
| Modify | `src/frontend/js/api.js` |
| Modify | `functions/api/chapters.js` |
| Delete | `config/` 目录（可选） |
