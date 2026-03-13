# 卡牌掉落UI与公共图书馆实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现解谜成功后卡牌掉落UI交互和公共图书馆功能

**Architecture:** 前端使用HTML/CSS/JS实现卡牌掉落动画和弹窗交互，后端使用Cloudflare Workers API实现书籍导入功能，数据存储在D1数据库中

**Tech Stack:** HTML, CSS, JavaScript, Cloudflare Workers, D1 Database, Playwright E2E Testing

---

## Task 1: 补充预设书籍卡牌数据

**Files:**
- Modify: `migrations/0002_seed_data.sql`

**Step 1: 在seed文件末尾添加预设书籍卡牌数据**

在文件末尾添加：

```sql
-- ============================================
-- 预设书籍卡牌数据
-- ============================================

-- 小明的奇幻冒险 (preset-adventure-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-adv001-w01', 'preset-adventure-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-adv001-w02', 'preset-adventure-001', 'plot', 'weather', '彩虹天', '🌈', '天气类型卡牌', 0),
('card-preset-adv001-w03', 'preset-adventure-001', 'plot', 'weather', '微风天', '🌬️', '天气类型卡牌', 0),
('card-preset-adv001-w04', 'preset-adventure-001', 'plot', 'weather', '小雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-adv001-t01', 'preset-adventure-001', 'plot', 'terrain', '森林', '🌲', '地形类型卡牌', 0),
('card-preset-adv001-t02', 'preset-adventure-001', 'plot', 'terrain', '小溪', '💧', '地形类型卡牌', 0),
('card-preset-adv001-t03', 'preset-adventure-001', 'plot', 'terrain', '草原', '🌿', '地形类型卡牌', 0),
('card-preset-adv001-t04', 'preset-adventure-001', 'plot', 'terrain', '山洞', '🕳️', '地形类型卡牌', 0),
('card-preset-adv001-a01', 'preset-adventure-001', 'plot', 'adventure', '寻宝', '🗺️', '冒险类型卡牌', 0),
('card-preset-adv001-a02', 'preset-adventure-001', 'plot', 'adventure', '探险', '🧭', '冒险类型卡牌', 0),
('card-preset-adv001-a03', 'preset-adventure-001', 'plot', 'adventure', '帮助朋友', '🤝', '冒险类型卡牌', 0),
('card-preset-adv001-a04', 'preset-adventure-001', 'plot', 'adventure', '发现秘密', '🔮', '冒险类型卡牌', 0),
('card-preset-adv001-e01', 'preset-adventure-001', 'plot', 'equipment', '放大镜', '🔍', '装备类型卡牌', 0),
('card-preset-adv001-e02', 'preset-adventure-001', 'plot', 'equipment', '指南针', '🧭', '装备类型卡牌', 0),
('card-preset-adv001-e03', 'preset-adventure-001', 'plot', 'equipment', '背包', '🎒', '装备类型卡牌', 0),
('card-preset-adv001-e04', 'preset-adventure-001', 'plot', 'equipment', '手电筒', '🔦', '装备类型卡牌', 0);

-- 小勇的丛林探险 (preset-adventure-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-adv002-w01', 'preset-adventure-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-adv002-w02', 'preset-adventure-002', 'plot', 'weather', '白云', '☁️', '天气类型卡牌', 0),
('card-preset-adv002-w03', 'preset-adventure-002', 'plot', 'weather', '彩虹天', '🌈', '天气类型卡牌', 0),
('card-preset-adv002-w04', 'preset-adventure-002', 'plot', 'weather', '小雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-adv002-t01', 'preset-adventure-002', 'plot', 'terrain', '海滩', '🏖️', '地形类型卡牌', 0),
('card-preset-adv002-t02', 'preset-adventure-002', 'plot', 'terrain', '岛屿', '🏝️', '地形类型卡牌', 0),
('card-preset-adv002-t03', 'preset-adventure-002', 'plot', 'terrain', '热带雨林', '🌴', '地形类型卡牌', 0),
('card-preset-adv002-t04', 'preset-adventure-002', 'plot', 'terrain', '雪山', '🏔️', '地形类型卡牌', 0),
('card-preset-adv002-a01', 'preset-adventure-002', 'plot', 'adventure', '探险', '🧭', '冒险类型卡牌', 0),
('card-preset-adv002-a02', 'preset-adventure-002', 'plot', 'adventure', '寻宝', '🗺️', '冒险类型卡牌', 0),
('card-preset-adv002-a03', 'preset-adventure-002', 'plot', 'adventure', '观察动物', '🦋', '冒险类型卡牌', 0),
('card-preset-adv002-a04', 'preset-adventure-002', 'plot', 'adventure', '骑行', '🚴', '冒险类型卡牌', 0),
('card-preset-adv002-e01', 'preset-adventure-002', 'plot', 'equipment', '指南针', '🧭', '装备类型卡牌', 0),
('card-preset-adv002-e02', 'preset-adventure-002', 'plot', 'equipment', '地图', '🗺️', '装备类型卡牌', 0),
('card-preset-adv002-e03', 'preset-adventure-002', 'plot', 'equipment', '相机', '📷', '装备类型卡牌', 0),
('card-preset-adv002-e04', 'preset-adventure-002', 'plot', 'equipment', '背包', '🎒', '装备类型卡牌', 0);

-- 魔法学院传说 (preset-fantasy-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-fan001-w01', 'preset-fantasy-001', 'plot', 'weather', '极光', '🌌', '天气类型卡牌', 0),
('card-preset-fan001-w02', 'preset-fantasy-001', 'plot', 'weather', '元素乱流', '⚡', '天气类型卡牌', 0),
('card-preset-fan001-w03', 'preset-fantasy-001', 'plot', 'weather', '精灵光', '🧚', '天气类型卡牌', 0),
('card-preset-fan001-w04', 'preset-fantasy-001', 'plot', 'weather', '魔法雨', '💧', '天气类型卡牌', 0),
('card-preset-fan001-t01', 'preset-fantasy-001', 'plot', 'terrain', '魔法森林', '🌳', '地形类型卡牌', 0),
('card-preset-fan001-t02', 'preset-fantasy-001', 'plot', 'terrain', '魔法塔', '🗼', '地形类型卡牌', 0),
('card-preset-fan001-t03', 'preset-fantasy-001', 'plot', 'terrain', '精灵村落', '🧚', '地形类型卡牌', 0),
('card-preset-fan001-t04', 'preset-fantasy-001', 'plot', 'terrain', '水晶洞穴', '💎', '地形类型卡牌', 0),
('card-preset-fan001-a01', 'preset-fantasy-001', 'plot', 'adventure', '魔法测试', '📝', '冒险类型卡牌', 0),
('card-preset-fan001-a02', 'preset-fantasy-001', 'plot', 'adventure', '魔法研究', '📚', '冒险类型卡牌', 0),
('card-preset-fan001-a03', 'preset-fantasy-001', 'plot', 'adventure', '精灵结盟', '🧚', '冒险类型卡牌', 0),
('card-preset-fan001-a04', 'preset-fantasy-001', 'plot', 'adventure', '元素觉醒', '🔥', '冒险类型卡牌', 0),
('card-preset-fan001-e01', 'preset-fantasy-001', 'plot', 'equipment', '魔杖', '🪄', '装备类型卡牌', 0),
('card-preset-fan001-e02', 'preset-fantasy-001', 'plot', 'equipment', '法典', '📖', '装备类型卡牌', 0),
('card-preset-fan001-e03', 'preset-fantasy-001', 'plot', 'equipment', '水晶球', '🔮', '装备类型卡牌', 0),
('card-preset-fan001-e04', 'preset-fantasy-001', 'plot', 'equipment', '元素宝石', '💠', '装备类型卡牌', 0);

-- 龙之谷秘闻 (preset-fantasy-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-fan002-w01', 'preset-fantasy-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-fan002-w02', 'preset-fantasy-002', 'plot', 'weather', '元素风暴', '🌪️', '天气类型卡牌', 0),
('card-preset-fan002-w03', 'preset-fantasy-002', 'plot', 'weather', '流星火雨', '☄️', '天气类型卡牌', 0),
('card-preset-fan002-w04', 'preset-fantasy-002', 'plot', 'weather', '灵魂雾', '👻', '天气类型卡牌', 0),
('card-preset-fan002-t01', 'preset-fantasy-002', 'plot', 'terrain', '古代遗迹', '🏛️', '地形类型卡牌', 0),
('card-preset-fan002-t02', 'preset-fantasy-002', 'plot', 'terrain', '矮人矿山', '⛏️', '地形类型卡牌', 0),
('card-preset-fan002-t03', 'preset-fantasy-002', 'plot', 'terrain', '龙之巢', '🐉', '地形类型卡牌', 0),
('card-preset-fan002-t04', 'preset-fantasy-002', 'plot', 'terrain', '亡灵陵园', '💀', '地形类型卡牌', 0),
('card-preset-fan002-a01', 'preset-fantasy-002', 'plot', 'adventure', '寻找神器', '⚔️', '冒险类型卡牌', 0),
('card-preset-fan002-a02', 'preset-fantasy-002', 'plot', 'adventure', '神器锻造', '🔨', '冒险类型卡牌', 0),
('card-preset-fan002-a03', 'preset-fantasy-002', 'plot', 'adventure', '屠龙', '🐉', '冒险类型卡牌', 0),
('card-preset-fan002-a04', 'preset-fantasy-002', 'plot', 'adventure', '灵魂救赎', '👼', '冒险类型卡牌', 0),
('card-preset-fan002-e01', 'preset-fantasy-002', 'plot', 'equipment', '矮人锤', '🔨', '装备类型卡牌', 0),
('card-preset-fan002-e02', 'preset-fantasy-002', 'plot', 'equipment', '精灵弓', '🏹', '装备类型卡牌', 0),
('card-preset-fan002-e03', 'preset-fantasy-002', 'plot', 'equipment', '龙之心脏', '❤️', '装备类型卡牌', 0),
('card-preset-fan002-e04', 'preset-fantasy-002', 'plot', 'equipment', '灵魂石', '💜', '装备类型卡牌', 0);

-- 都市恋曲 (preset-romance-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-rom001-w01', 'preset-romance-001', 'plot', 'weather', '晨光', '🌅', '天气类型卡牌', 0),
('card-preset-rom001-w02', 'preset-romance-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-rom001-w03', 'preset-romance-001', 'plot', 'weather', '夕阳', '🌇', '天气类型卡牌', 0),
('card-preset-rom001-w04', 'preset-romance-001', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-rom001-t01', 'preset-romance-001', 'plot', 'terrain', '地铁站', '🚇', '地形类型卡牌', 0),
('card-preset-rom001-t02', 'preset-romance-001', 'plot', 'terrain', '咖啡厅', '☕', '地形类型卡牌', 0),
('card-preset-rom001-t03', 'preset-romance-001', 'plot', 'terrain', '公园', '🌳', '地形类型卡牌', 0),
('card-preset-rom001-t04', 'preset-romance-001', 'plot', 'terrain', '公司', '🏢', '地形类型卡牌', 0),
('card-preset-rom001-a01', 'preset-romance-001', 'plot', 'adventure', '邂逅', '💫', '冒险类型卡牌', 0),
('card-preset-rom001-a02', 'preset-romance-001', 'plot', 'adventure', '约会', '🌹', '冒险类型卡牌', 0),
('card-preset-rom001-a03', 'preset-romance-001', 'plot', 'adventure', '表白', '💌', '冒险类型卡牌', 0),
('card-preset-rom001-a04', 'preset-romance-001', 'plot', 'adventure', '误会', '😔', '冒险类型卡牌', 0),
('card-preset-rom001-e01', 'preset-romance-001', 'plot', 'equipment', '手机', '📱', '装备类型卡牌', 0),
('card-preset-rom001-e02', 'preset-romance-001', 'plot', 'equipment', '咖啡', '☕', '装备类型卡牌', 0),
('card-preset-rom001-e03', 'preset-romance-001', 'plot', 'equipment', '鲜花', '💐', '装备类型卡牌', 0),
('card-preset-rom001-e04', 'preset-romance-001', 'plot', 'equipment', '雨伞', '☂️', '装备类型卡牌', 0);

-- 咖啡馆的邂逅 (preset-romance-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-rom002-w01', 'preset-romance-002', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-rom002-w02', 'preset-romance-002', 'plot', 'weather', '阴天', '☁️', '天气类型卡牌', 0),
('card-preset-rom002-w03', 'preset-romance-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-rom002-w04', 'preset-romance-002', 'plot', 'weather', '黄昏', '🌆', '天气类型卡牌', 0),
('card-preset-rom002-t01', 'preset-romance-002', 'plot', 'terrain', '咖啡厅', '☕', '地形类型卡牌', 0),
('card-preset-rom002-t02', 'preset-romance-002', 'plot', 'terrain', '画廊', '🖼️', '地形类型卡牌', 0),
('card-preset-rom002-t03', 'preset-romance-002', 'plot', 'terrain', '公园', '🌳', '地形类型卡牌', 0),
('card-preset-rom002-t04', 'preset-romance-002', 'plot', 'terrain', '老街', '🏘️', '地形类型卡牌', 0),
('card-preset-rom002-a01', 'preset-romance-002', 'plot', 'adventure', '邂逅', '💫', '冒险类型卡牌', 0),
('card-preset-rom002-a02', 'preset-romance-002', 'plot', 'adventure', '暧昧', '💗', '冒险类型卡牌', 0),
('card-preset-rom002-a03', 'preset-romance-002', 'plot', 'adventure', '约会', '🌹', '冒险类型卡牌', 0),
('card-preset-rom002-a04', 'preset-romance-002', 'plot', 'adventure', '表白', '💌', '冒险类型卡牌', 0),
('card-preset-rom002-e01', 'preset-romance-002', 'plot', 'equipment', '书本', '📚', '装备类型卡牌', 0),
('card-preset-rom002-e02', 'preset-romance-002', 'plot', 'equipment', '画板', '🎨', '装备类型卡牌', 0),
('card-preset-rom002-e03', 'preset-romance-002', 'plot', 'equipment', '吉他', '🎸', '装备类型卡牌', 0),
('card-preset-rom002-e04', 'preset-romance-002', 'plot', 'equipment', '信纸', '✉️', '装备类型卡牌', 0);

-- 职场风云录 (preset-business-001) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-bus001-w01', 'preset-business-001', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-bus001-w02', 'preset-business-001', 'plot', 'weather', '阴天', '☁️', '天气类型卡牌', 0),
('card-preset-bus001-w03', 'preset-business-001', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-bus001-w04', 'preset-business-001', 'plot', 'weather', '多云', '⛅', '天气类型卡牌', 0),
('card-preset-bus001-t01', 'preset-business-001', 'plot', 'terrain', '办公室', '🏢', '地形类型卡牌', 0),
('card-preset-bus001-t02', 'preset-business-001', 'plot', 'terrain', '会议室', '📋', '地形类型卡牌', 0),
('card-preset-bus001-t03', 'preset-business-001', 'plot', 'terrain', '客户公司', '🏛️', '地形类型卡牌', 0),
('card-preset-bus001-t04', 'preset-business-001', 'plot', 'terrain', '展会', '🎪', '地形类型卡牌', 0),
('card-preset-bus001-a01', 'preset-business-001', 'plot', 'adventure', '项目启动', '🚀', '冒险类型卡牌', 0),
('card-preset-bus001-a02', 'preset-business-001', 'plot', 'adventure', '团队管理', '👥', '冒险类型卡牌', 0),
('card-preset-bus001-a03', 'preset-business-001', 'plot', 'adventure', '谈判', '🤝', '冒险类型卡牌', 0),
('card-preset-bus001-a04', 'preset-business-001', 'plot', 'adventure', '竞标', '📊', '冒险类型卡牌', 0),
('card-preset-bus001-e01', 'preset-business-001', 'plot', 'equipment', '笔记本电脑', '💻', '装备类型卡牌', 0),
('card-preset-bus001-e02', 'preset-business-001', 'plot', 'equipment', '白板', '📋', '装备类型卡牌', 0),
('card-preset-bus001-e03', 'preset-business-001', 'plot', 'equipment', '合同', '📄', '装备类型卡牌', 0),
('card-preset-bus001-e04', 'preset-business-001', 'plot', 'equipment', '名片', '💳', '装备类型卡牌', 0);

-- 创业路上的我们 (preset-business-002) - 16张卡牌
INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES
('card-preset-bus002-w01', 'preset-business-002', 'plot', 'weather', '晴天', '☀️', '天气类型卡牌', 0),
('card-preset-bus002-w02', 'preset-business-002', 'plot', 'weather', '阴天', '☁️', '天气类型卡牌', 0),
('card-preset-bus002-w03', 'preset-business-002', 'plot', 'weather', '雨天', '🌧️', '天气类型卡牌', 0),
('card-preset-bus002-w04', 'preset-business-002', 'plot', 'weather', '多云', '⛅', '天气类型卡牌', 0),
('card-preset-bus002-t01', 'preset-business-002', 'plot', 'terrain', '咖啡馆', '☕', '地形类型卡牌', 0),
('card-preset-bus002-t02', 'preset-business-002', 'plot', 'terrain', '写字楼', '🏬', '地形类型卡牌', 0),
('card-preset-bus002-t03', 'preset-business-002', 'plot', 'terrain', '会议室', '📋', '地形类型卡牌', 0),
('card-preset-bus002-t04', 'preset-business-002', 'plot', 'terrain', '展会', '🎪', '地形类型卡牌', 0),
('card-preset-bus002-a01', 'preset-business-002', 'plot', 'adventure', '项目启动', '🚀', '冒险类型卡牌', 0),
('card-preset-bus002-a02', 'preset-business-002', 'plot', 'adventure', '融资', '💰', '冒险类型卡牌', 0),
('card-preset-bus002-a03', 'preset-business-002', 'plot', 'adventure', '谈判', '🤝', '冒险类型卡牌', 0),
('card-preset-bus002-a04', 'preset-business-002', 'plot', 'adventure', '竞标', '📊', '冒险类型卡牌', 0),
('card-preset-bus002-e01', 'preset-business-002', 'plot', 'equipment', '笔记本电脑', '💻', '装备类型卡牌', 0),
('card-preset-bus002-e02', 'preset-business-002', 'plot', 'equipment', '商业计划书', '📄', '装备类型卡牌', 0),
('card-preset-bus002-e03', 'preset-business-002', 'plot', 'equipment', '合同', '📄', '装备类型卡牌', 0),
('card-preset-bus002-e04', 'preset-business-002', 'plot', 'equipment', '展板', '🖼️', '装备类型卡牌', 0);
```

**Step 2: 验证SQL语法正确**

检查SQL文件语法，确保INSERT语句正确。

---

## Task 2: 创建书籍导入API

**Files:**
- Create: `functions/api/books/[id]/import.js`
- Create: `functions/api/books/[id]/detail.js`

**Step 1: 创建获取预设书籍详情API**

文件: `functions/api/books/[id]/detail.js`

```javascript
import { createSuccessResponse, createErrorResponse } from '../../utils.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const bookId = params.id;

  try {
    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ? AND is_preset = 1'
    ).bind(bookId).first();

    if (!book) {
      return createErrorResponse('预设书籍不存在', 404);
    }

    const [characters, plotCards, chapters] = await Promise.all([
      env.DB.prepare('SELECT * FROM characters WHERE book_id = ?').bind(bookId).all(),
      env.DB.prepare('SELECT * FROM plot_cards WHERE book_id = ?').bind(bookId).all(),
      env.DB.prepare('SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num').bind(bookId).all()
    ]);

    return createSuccessResponse({
      book,
      characters: characters.results,
      plot_cards: plotCards.results,
      chapters: chapters.results
    });
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

**Step 2: 创建导入预设书籍API**

文件: `functions/api/books/[id]/import.js`

```javascript
import { createSuccessResponse, createErrorResponse, generateId } from '../../utils.js';

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const presetBookId = params.id;

  try {
    const body = await request.json();
    const { user_id } = body;

    if (!user_id) {
      return createErrorResponse('缺少用户ID', 400);
    }

    const presetBook = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ? AND is_preset = 1'
    ).bind(presetBookId).first();

    if (!presetBook) {
      return createErrorResponse('预设书籍不存在', 404);
    }

    const newBookId = generateId();
    const idMapping = {
      characters: new Map(),
      cards: new Map(),
      chapters: new Map(),
      puzzles: new Map()
    };

    await env.DB.prepare(
      'INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)'
    ).bind(newBookId, user_id, presetBook.title, presetBook.type).run();

    const characters = await env.DB.prepare(
      'SELECT * FROM characters WHERE book_id = ?'
    ).bind(presetBookId).all();

    for (const char of characters.results) {
      const newCharId = generateId();
      idMapping.characters.set(char.char_id, newCharId);
      await env.DB.prepare(
        'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(newCharId, newBookId, char.name, char.role_type, char.personality, char.speech_style, char.avatar, char.intimacy, char.relationship, char.is_protagonist).run();
    }

    const cards = await env.DB.prepare(
      'SELECT * FROM plot_cards WHERE book_id = ?'
    ).bind(presetBookId).all();

    for (const card of cards.results) {
      const newCardId = generateId();
      idMapping.cards.set(card.card_id, newCardId);
      await env.DB.prepare(
        'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(newCardId, newBookId, card.type, card.sub_type, card.name, card.icon, card.description, card.is_custom).run();
    }

    const chapters = await env.DB.prepare(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num'
    ).bind(presetBookId).all();

    for (const chapter of chapters.results) {
      const newChapterId = generateId();
      idMapping.chapters.set(chapter.chapter_id, newChapterId);

      let selectedCards = {};
      try {
        selectedCards = JSON.parse(chapter.selected_cards || '{}');
      } catch (e) {
        selectedCards = {};
      }

      await env.DB.prepare(
        'INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(newChapterId, newBookId, chapter.title, chapter.content, JSON.stringify(selectedCards), chapter.order_num).run();
    }

    const puzzles = await env.DB.prepare(
      'SELECT * FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)'
    ).bind(presetBookId).all();

    for (const puzzle of puzzles.results) {
      const newPuzzleId = generateId();
      const newChapterId = idMapping.chapters.get(puzzle.chapter_id);
      if (newChapterId) {
        await env.DB.prepare(
          'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, attempts, max_attempts, is_solved) VALUES (?, ?, ?, ?, ?, ?, 0, 3, 0)'
        ).bind(newPuzzleId, newChapterId, puzzle.question, puzzle.answer, puzzle.puzzle_type, puzzle.options).run();
      }
    }

    return createSuccessResponse({
      new_book_id: newBookId,
      message: '导入成功'
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
```

---

## Task 3: 更新API客户端

**Files:**
- Modify: `src/frontend/js/api.js`

**Step 1: 添加导入书籍API方法**

在API对象中添加：

```javascript
async importPresetBook(bookId, userId) {
  return this.request(`/api/books/${bookId}/import`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId })
  });
},

async getPresetBookDetail(bookId) {
  return this.request(`/api/books/${bookId}/detail`);
}
```

---

## Task 4: 实现卡牌掉落UI

**Files:**
- Modify: `src/frontend/chapter.html`
- Modify: `src/frontend/css/style.css`

**Step 1: 添加卡牌掉落弹窗HTML**

在chapter.html的body末尾添加：

```html
<!-- 卡牌奖励弹窗 -->
<div id="cardRewardModal" class="card-reward-modal" style="display: none;">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="card-fly-in">
      <div class="reward-card">
        <div class="card-glow"></div>
        <div class="card-icon" id="rewardCardIcon">☀️</div>
        <div class="card-name" id="rewardCardName">晴天</div>
        <div class="card-type" id="rewardCardType">天气卡牌</div>
      </div>
    </div>
    <div class="reward-message" id="rewardMessage">恭喜获得卡牌！</div>
    <button class="btn-receive" id="btnReceive">收下</button>
    <button class="btn-continue" id="btnContinue" style="display: none;">继续</button>
  </div>
</div>

<!-- 卡牌丢弃选择弹窗 -->
<div id="cardDiscardModal" class="card-discard-modal" style="display: none;">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h3>⚠️ 背包已满</h3>
      <p>该类型卡牌已达上限(8张)，请选择一张丢弃</p>
    </div>
    <div class="cards-grid" id="discardCardsGrid"></div>
    <div class="modal-actions">
      <button class="btn-cancel" id="btnCancelDiscard">取消</button>
      <button class="btn-discard" id="btnConfirmDiscard" disabled>丢弃选中</button>
    </div>
  </div>
</div>
```

**Step 2: 添加卡牌掉落CSS样式**

在style.css中添加：

```css
/* 卡牌奖励弹窗 */
.card-reward-modal,
.card-discard-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-reward-modal .modal-backdrop,
.card-discard-modal .modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.card-reward-modal .modal-content,
.card-discard-modal .modal-content {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.card-fly-in {
  animation: cardFlyIn 0.8s ease-out;
}

@keyframes cardFlyIn {
  0% { 
    opacity: 0; 
    transform: scale(0.1) translateY(-100vh); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2) translateY(0); 
  }
  100% { 
    transform: scale(1) translateY(0); 
  }
}

.reward-card {
  position: relative;
  width: 180px;
  height: 240px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #2a2a4a 0%, #1a1a3a 100%);
  border: 3px solid rgba(255, 215, 0, 0.6);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.card-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 18px;
  animation: glowPulse 1.5s ease-in-out infinite;
  z-index: -1;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.reward-card .card-icon {
  font-size: 64px;
  margin-bottom: 10px;
}

.reward-card .card-name {
  font-size: 24px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 5px;
}

.reward-card .card-type {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.reward-message {
  font-size: 18px;
  color: #fff;
  margin-bottom: 20px;
}

.btn-receive,
.btn-continue {
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
  color: #1a1a2e;
  border: none;
  padding: 12px 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-receive:hover,
.btn-continue:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

/* 卡牌丢弃弹窗 */
.card-discard-modal .modal-content {
  max-width: 600px;
}

.card-discard-modal .modal-header h3 {
  color: #ffd700;
  margin-bottom: 10px;
}

.card-discard-modal .modal-header p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.cards-grid .card-item {
  background: linear-gradient(135deg, #2a2a4a 0%, #1a1a3a 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.cards-grid .card-item:hover {
  border-color: rgba(255, 215, 0, 0.5);
  transform: translateY(-3px);
}

.cards-grid .card-item.selected {
  border-color: #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
  transform: scale(1.05);
}

.cards-grid .card-item .new-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
}

.cards-grid .card-item .card-icon {
  font-size: 32px;
  margin-bottom: 5px;
}

.cards-grid .card-item .card-name {
  font-size: 12px;
  color: #fff;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 30px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-discard {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-discard:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-discard:not(:disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
}

/* 预设书籍提示 */
.preset-notice {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 15px;
  padding: 20px 30px;
  text-align: center;
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.preset-notice p {
  color: #fff;
  margin-bottom: 10px;
}

.preset-notice button {
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
  color: #1a1a2e;
  border: none;
  padding: 10px 25px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
```

**Step 3: 添加卡牌掉落JavaScript逻辑**

在chapter.html的script中添加：

```javascript
let currentReward = null;
let selectedDiscardCard = null;

async function submitAnswer() {
  if (!window.currentPuzzle) {
    return;
  }
  
  let answer;
  const puzzleInput = document.getElementById('puzzleInput');
  
  if (puzzleInput) {
    answer = puzzleInput.value.trim();
    if (!answer) {
      showNotification('请输入答案！', 'warning');
      return;
    }
  } else if (window.selectedOption === null) {
    showNotification('请选择一个答案！', 'warning');
    return;
  } else if (window.currentPuzzle.options && window.currentPuzzle.options[window.selectedOption]) {
    answer = window.currentPuzzle.options[window.selectedOption];
  }
  
  if (!answer) {
    showNotification('请选择或输入答案！', 'warning');
    return;
  }
  
  const userId = getUserId();
  
  try {
    const result = await API.solvePuzzle(window.currentPuzzle.puzzle_id, answer, userId);
    
    if (result.success && result.data.is_correct) {
      if (puzzleInput) {
        puzzleInput.style.borderColor = '#22c55e';
        puzzleInput.style.background = 'rgba(34, 197, 94, 0.2)';
      } else {
        const options = document.querySelectorAll('.puzzle-option');
        options[window.selectedOption]?.classList.add('correct');
      }
      
      setTimeout(() => {
        hidePuzzle();
        
        if (result.data.reward && result.data.reward.card) {
          currentReward = result.data;
          showCardReward(result.data.reward, result.data.card_limit_exceeded);
        } else {
          showNotification(result.data.message || '正确！谜题已解开！', 'success');
        }
      }, 1000);
    } else {
      if (puzzleInput) {
        puzzleInput.style.borderColor = '#dc2626';
        puzzleInput.style.background = 'rgba(220, 38, 38, 0.2)';
      } else {
        const options = document.querySelectorAll('.puzzle-option');
        options[window.selectedOption]?.classList.add('wrong');
      }
      setTimeout(() => {
        if (puzzleInput) {
          puzzleInput.style.borderColor = 'rgba(139, 90, 43, 0.3)';
          puzzleInput.style.background = 'rgba(139, 90, 43, 0.1)';
          puzzleInput.value = '';
        } else {
          document.querySelectorAll('.puzzle-option').forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
          });
          window.selectedOption = null;
        }
        showNotification(result.data.message || '答案错误，请重试！', 'error');
      }, 1500);
    }
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

function showCardReward(reward, limitExceeded) {
  const modal = document.getElementById('cardRewardModal');
  const cardIcon = document.getElementById('rewardCardIcon');
  const cardName = document.getElementById('rewardCardName');
  const cardType = document.getElementById('rewardCardType');
  const message = document.getElementById('rewardMessage');
  const btnReceive = document.getElementById('btnReceive');
  const btnContinue = document.getElementById('btnContinue');
  
  cardIcon.textContent = reward.card.icon;
  cardName.textContent = reward.card.name;
  
  const typeNames = {
    weather: '天气卡牌',
    terrain: '地形卡牌',
    adventure: '冒险卡牌',
    equipment: '装备卡牌'
  };
  cardType.textContent = typeNames[reward.card.sub_type] || '情节卡牌';
  message.textContent = reward.message || '恭喜获得卡牌！';
  
  if (limitExceeded) {
    btnReceive.style.display = 'none';
    btnContinue.style.display = 'inline-block';
  } else {
    btnReceive.style.display = 'inline-block';
    btnContinue.style.display = 'none';
  }
  
  modal.style.display = 'flex';
}

function hideCardReward() {
  document.getElementById('cardRewardModal').style.display = 'none';
}

function showDiscardModal(reward) {
  const modal = document.getElementById('cardDiscardModal');
  const grid = document.getElementById('discardCardsGrid');
  
  selectedDiscardCard = null;
  document.getElementById('btnConfirmDiscard').disabled = true;
  
  let cardsHtml = '';
  
  reward.existing_cards.forEach(card => {
    cardsHtml += `
      <div class="card-item" data-card-id="${card.card_id}" onclick="selectDiscardCard('${card.card_id}')">
        <div class="card-icon">${card.icon}</div>
        <div class="card-name">${card.name}</div>
      </div>
    `;
  });
  
  cardsHtml += `
    <div class="card-item new-card" data-card-id="new" onclick="selectDiscardCard('new')">
      <div class="new-badge">NEW</div>
      <div class="card-icon">${reward.card.icon}</div>
      <div class="card-name">${reward.card.name}</div>
    </div>
  `;
  
  grid.innerHTML = cardsHtml;
  modal.style.display = 'flex';
}

function selectDiscardCard(cardId) {
  selectedDiscardCard = cardId;
  
  document.querySelectorAll('#discardCardsGrid .card-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  document.querySelector(`#discardCardsGrid .card-item[data-card-id="${cardId}"]`).classList.add('selected');
  document.getElementById('btnConfirmDiscard').disabled = false;
}

function hideDiscardModal() {
  document.getElementById('cardDiscardModal').style.display = 'none';
}

async function confirmDiscard() {
  if (!selectedDiscardCard || !currentReward) return;
  
  try {
    if (selectedDiscardCard !== 'new') {
      await API.deletePlotCard(selectedDiscardCard);
    }
    
    if (selectedDiscardCard === 'new') {
      hideDiscardModal();
      hideCardReward();
      showNotification('已放弃新卡牌', 'success');
    } else {
      const bookId = new URLSearchParams(window.location.search).get('book_id') || 
                     window.currentBookId;
      
      await API.addPlotCard(bookId, currentReward.reward.card);
      
      hideDiscardModal();
      hideCardReward();
      showNotification('卡牌已替换！', 'success');
    }
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

document.getElementById('btnReceive')?.addEventListener('click', () => {
  hideCardReward();
});

document.getElementById('btnContinue')?.addEventListener('click', () => {
  hideCardReward();
  if (currentReward && currentReward.reward) {
    showDiscardModal(currentReward.reward);
  }
});

document.getElementById('btnCancelDiscard')?.addEventListener('click', () => {
  hideDiscardModal();
  showCardReward(currentReward.reward, false);
});

document.getElementById('btnConfirmDiscard')?.addEventListener('click', confirmDiscard);

function checkPresetBook() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('id');
  
  if (bookId && bookId.startsWith('preset-')) {
    const puzzleSection = document.querySelector('.puzzle-section');
    if (puzzleSection) {
      puzzleSection.style.display = 'none';
    }
    
    showPresetNotice(bookId);
    return true;
  }
  return false;
}

function showPresetNotice(bookId) {
  const notice = document.createElement('div');
  notice.className = 'preset-notice';
  notice.innerHTML = `
    <p>📖 这是公共图书馆的书籍</p>
    <p>如需解谜和收集卡牌，请先导入到您的书架</p>
    <button onclick="importPresetBook('${bookId}')">导入到我的书架</button>
  `;
  document.body.appendChild(notice);
}

async function importPresetBook(bookId) {
  const userId = getUserId();
  if (!userId) {
    showNotification('请先登录', 'warning');
    window.location.href = 'login.html';
    return;
  }
  
  try {
    const result = await API.importPresetBook(bookId, userId);
    if (result.success) {
      showNotification('导入成功！正在跳转...', 'success');
      setTimeout(() => {
        window.location.href = `book.html?id=${result.data.new_book_id}`;
      }, 1500);
    }
  } catch (error) {
    showNotification(error.message, 'error');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  checkPresetBook();
});
```

---

## Task 5: 创建公共图书馆页面

**Files:**
- Create: `src/frontend/library.html`
- Create: `src/frontend/css/library.css`
- Create: `src/frontend/js/library.js`

**Step 1: 创建library.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>公共图书馆 - StoryBook</title>
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/themes.css">
  <link rel="stylesheet" href="css/responsive.css">
  <link rel="stylesheet" href="css/library.css">
</head>
<body class="theme-fantasy">
  <div class="particles-container" id="particles"></div>
  
  <nav class="navbar">
    <a href="index.html" class="navbar-brand">📚 Ancient Library</a>
    <div class="navbar-nav">
      <a href="index.html" class="navbar-link">🏠 首页</a>
      <a href="bookshelf.html" class="navbar-link">📖 我的书架</a>
    </div>
  </nav>
  
  <div class="library-page">
    <div class="page-header">
      <h1 class="page-title">📚 公共图书馆</h1>
      <p class="page-subtitle">探索古老的故事，将它们带回你的书架</p>
    </div>
    
    <div class="rune-divider">
      <span class="rune">◈</span>
      <span class="rune">✧</span>
      <span class="rune">◈</span>
      <span class="rune">✧</span>
      <span class="rune">◈</span>
    </div>
    
    <div class="filter-tabs">
      <button class="filter-tab active" data-filter="all">✨ 全部</button>
      <button class="filter-tab" data-filter="adventure">🗺️ 冒险</button>
      <button class="filter-tab" data-filter="fantasy">🧙 魔幻</button>
      <button class="filter-tab" data-filter="romance">💕 言情</button>
      <button class="filter-tab" data-filter="business">💼 职场</button>
    </div>
    
    <div class="books-showcase">
      <div class="books-grid" id="booksGrid"></div>
    </div>
    
    <div class="rune-divider">
      <span class="rune">◈</span>
      <span class="rune">✧</span>
      <span class="rune">◈</span>
      <span class="rune">✧</span>
      <span class="rune">◈</span>
    </div>
    
    <div class="library-footer">
      <p>✨ May the stories guide your journey... ✨</p>
    </div>
  </div>
  
  <!-- 书籍详情弹窗 -->
  <div id="bookDetailModal" class="book-detail-modal" style="display: none;">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="hideBookDetail()">❌</button>
      <div class="book-detail-header">
        <div class="book-detail-icon" id="detailIcon">🗺️</div>
        <div class="book-detail-info">
          <h2 class="book-detail-title" id="detailTitle">勇者传说</h2>
          <p class="book-detail-meta">
            <span id="detailType">类型：儿童冒险</span>
            <span id="detailChapters">章节：10章</span>
          </p>
        </div>
      </div>
      <div class="book-detail-section">
        <h3>📖 故事简介</h3>
        <p id="detailDescription">一段精彩的冒险故事...</p>
      </div>
      <div class="book-detail-section">
        <h3>🎭 主要角色</h3>
        <div class="characters-preview" id="detailCharacters"></div>
      </div>
      <div class="book-detail-section">
        <h3>🃏 卡牌预览</h3>
        <div class="cards-preview" id="detailCards"></div>
      </div>
      <div class="book-detail-actions">
        <button class="btn-import" id="btnImport" onclick="importBook()">✨ 导入到我的书架 ✨</button>
      </div>
    </div>
  </div>
  
  <!-- 导入成功弹窗 -->
  <div id="importSuccessModal" class="import-success-modal" style="display: none;">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <div class="success-icon">✨</div>
      <h2>导入成功！</h2>
      <p id="importBookTitle">《勇者传说》已加入你的书架</p>
      <div class="success-actions">
        <button class="btn-goto-shelf" onclick="goToShelf()">前往书架</button>
        <button class="btn-continue-explore" onclick="hideImportSuccess()">继续探索</button>
      </div>
    </div>
  </div>
  
  <script src="js/api.js"></script>
  <script src="js/main.js"></script>
  <script src="js/library.js"></script>
</body>
</html>
```

**Step 2: 创建library.css**

```css
.library-page {
  padding-top: 100px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  padding: 40px 20px;
}

.page-title {
  font-size: 3rem;
  color: #ffd700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.rune-divider {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px;
}

.rune {
  font-size: 1.5rem;
  color: rgba(255, 215, 0, 0.5);
  animation: runeGlow 2s ease-in-out infinite;
}

.rune:nth-child(2) { animation-delay: 0.2s; }
.rune:nth-child(3) { animation-delay: 0.4s; }
.rune:nth-child(4) { animation-delay: 0.6s; }
.rune:nth-child(5) { animation-delay: 0.8s; }

@keyframes runeGlow {
  0%, 100% { opacity: 0.5; text-shadow: none; }
  50% { opacity: 1; text-shadow: 0 0 10px rgba(255, 215, 0, 0.8); }
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  flex-wrap: wrap;
}

.filter-tab {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 25px;
  padding: 10px 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: #ffd700;
  color: #ffd700;
}

.filter-tab.active {
  background: rgba(255, 215, 0, 0.15);
  border-color: #ffd700;
  color: #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.books-showcase {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  justify-items: center;
}

.magic-book-card {
  position: relative;
  width: 180px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.magic-book-card:hover {
  transform: translateY(-10px);
}

.magic-book-card:hover .book-float {
  animation: bookFloat 2s ease-in-out infinite;
}

@keyframes bookFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.book-float {
  position: relative;
  width: 100%;
  height: 250px;
  perspective: 1000px;
}

.book-glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background: radial-gradient(ellipse, var(--glow-color, rgba(255, 165, 0, 0.5)) 0%, transparent 70%);
  filter: blur(5px);
  animation: glowPulse 2s ease-in-out infinite;
}

.book-body {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a4a 0%, #1a1a3a 100%);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.book-type-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.book-cover-icon {
  font-size: 36px;
}

.book-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.book-info {
  text-align: center;
  margin-top: 15px;
}

.book-info h4 {
  font-size: 16px;
  color: #ffd700;
  margin-bottom: 5px;
}

.book-info p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* 类型光晕颜色 */
.magic-book-card[data-type="adventure"] { --glow-color: rgba(255, 165, 0, 0.5); }
.magic-book-card[data-type="fantasy"] { --glow-color: rgba(100, 149, 237, 0.5); }
.magic-book-card[data-type="romance"] { --glow-color: rgba(255, 105, 180, 0.5); }
.magic-book-card[data-type="business"] { --glow-color: rgba(255, 215, 0, 0.5); }

.library-footer {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.5);
}

/* 书籍详情弹窗 */
.book-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-detail-modal .modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.book-detail-modal .modal-content {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
}

.book-detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.book-detail-icon {
  font-size: 48px;
}

.book-detail-title {
  font-size: 24px;
  color: #ffd700;
  margin-bottom: 5px;
}

.book-detail-meta {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.book-detail-meta span {
  margin-right: 15px;
}

.book-detail-section {
  margin-bottom: 20px;
}

.book-detail-section h3 {
  font-size: 16px;
  color: #ffd700;
  margin-bottom: 10px;
}

.book-detail-section p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.characters-preview,
.cards-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.character-chip,
.card-chip {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 5px 12px;
  font-size: 12px;
  color: #fff;
}

.book-detail-actions {
  text-align: center;
  margin-top: 20px;
}

.btn-import {
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
  color: #1a1a2e;
  border: none;
  padding: 15px 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-import:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

/* 导入成功弹窗 */
.import-success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.import-success-modal .modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.import-success-modal .modal-content {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  animation: modalFadeIn 0.3s ease;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 20px;
  animation: successBounce 0.5s ease;
}

@keyframes successBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.import-success-modal h2 {
  color: #ffd700;
  margin-bottom: 10px;
}

.import-success-modal p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.success-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-goto-shelf,
.btn-continue-explore {
  padding: 12px 25px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-goto-shelf {
  background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
  color: #1a1a2e;
  border: none;
}

.btn-continue-explore {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.btn-goto-shelf:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
}

.btn-continue-explore:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
  
  .magic-book-card {
    width: 150px;
  }
  
  .book-float {
    height: 200px;
  }
}
```

**Step 3: 创建library.js**

```javascript
let allPresetBooks = [];
let currentBook = null;

const typeIcons = {
  adventure: '🗺️',
  fantasy: '🧙',
  romance: '💕',
  business: '💼'
};

const typeNames = {
  adventure: '儿童冒险',
  fantasy: '魔幻传说',
  romance: '都市言情',
  business: '职场风云'
};

document.addEventListener('DOMContentLoaded', async function() {
  createParticles(document.getElementById('particles'), 50);
  
  const userId = checkAuth();
  if (!userId) return;
  
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
    showNotification('加载预设书籍失败: ' + error.message, 'error');
  }
}

function renderBooks(books) {
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = '';
  
  books.forEach((book, index) => {
    const card = createBookCard(book, index);
    grid.appendChild(card);
  });
}

function createBookCard(book, index) {
  const div = document.createElement('div');
  div.className = 'magic-book-card';
  div.dataset.type = book.type;
  div.style.animationDelay = `${index * 0.1}s`;
  
  div.innerHTML = `
    <div class="book-float">
      <div class="book-glow"></div>
      <div class="book-body">
        <div class="book-type-icon">${typeIcons[book.type] || '📖'}</div>
        <div class="book-cover-icon">📖</div>
      </div>
      <div class="book-particles"></div>
    </div>
    <div class="book-info">
      <h4>${book.title}</h4>
      <p>${typeNames[book.type] || book.type} | ${book.chapter_count || 0}章节</p>
    </div>
  `;
  
  div.addEventListener('click', () => showBookDetail(book));
  
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
  
  const modal = document.getElementById('bookDetailModal');
  document.getElementById('detailIcon').textContent = typeIcons[book.type] || '📖';
  document.getElementById('detailTitle').textContent = book.title;
  document.getElementById('detailType').textContent = `类型：${typeNames[book.type] || book.type}`;
  document.getElementById('detailChapters').textContent = `章节：${book.chapter_count || 0}章`;
  document.getElementById('detailDescription').textContent = `一段精彩的${typeNames[book.type] || ''}故事等你来探索...`;
  
  try {
    const result = await API.getPresetBookDetail(book.book_id);
    
    if (result.success) {
      const data = result.data;
      
      const charactersHtml = (data.characters || []).slice(0, 4).map(char => 
        `<span class="character-chip">${char.avatar || '👤'} ${char.name}</span>`
      ).join('');
      document.getElementById('detailCharacters').innerHTML = charactersHtml || '<span class="character-chip">暂无角色</span>';
      
      const cardsHtml = (data.plot_cards || []).slice(0, 8).map(card => 
        `<span class="card-chip">${card.icon || '🎭'} ${card.name}</span>`
      ).join('');
      document.getElementById('detailCards').innerHTML = cardsHtml || '<span class="card-chip">暂无卡牌</span>';
    }
  } catch (error) {
    console.error('加载详情失败:', error);
  }
  
  modal.style.display = 'flex';
}

function hideBookDetail() {
  document.getElementById('bookDetailModal').style.display = 'none';
}

async function importBook() {
  if (!currentBook) return;
  
  const userId = getUserId();
  if (!userId) {
    showNotification('请先登录', 'warning');
    return;
  }
  
  try {
    const result = await API.importPresetBook(currentBook.book_id, userId);
    
    if (result.success) {
      hideBookDetail();
      showImportSuccess(currentBook.title, result.data.new_book_id);
    }
  } catch (error) {
    showNotification('导入失败: ' + error.message, 'error');
  }
}

function showImportSuccess(title, newBookId) {
  document.getElementById('importBookTitle').textContent = `《${title}》已加入你的书架`;
  
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

function createParticles(container, count) {
  if (!container || typeof window.createParticles === 'function') {
    window.createParticles(container, count);
  }
}
```

---

## Task 6: 更新API客户端添加新方法

**Files:**
- Modify: `src/frontend/js/api.js`

**Step 1: 添加新API方法**

在API对象中找到合适位置添加：

```javascript
async getPresetBookDetail(bookId) {
  return this.request(`/api/books/${bookId}/detail`);
},

async importPresetBook(bookId, userId) {
  return this.request(`/api/books/${bookId}/import`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId })
  });
},

async addPlotCard(bookId, card) {
  return this.request('/api/plot-cards', {
    method: 'POST',
    body: JSON.stringify({ book_id: bookId, card })
  });
},

async deletePlotCard(cardId) {
  return this.request(`/api/plot-cards/${cardId}`, {
    method: 'DELETE'
  });
}
```

---

## Task 7: 更新导航栏添加公共图书馆入口

**Files:**
- Modify: `src/frontend/index.html`
- Modify: `src/frontend/bookshelf.html`

**Step 1: 在index.html导航栏添加链接**

找到navbar-nav，添加：

```html
<a href="library.html" class="navbar-link">📚 公共图书馆</a>
```

**Step 2: 在bookshelf.html导航栏添加链接**

同样添加公共图书馆链接。

---

## Task 8: 编写E2E测试

**Files:**
- Create: `test/e2e/card-drop.spec.js`
- Create: `test/e2e/library.spec.js`
- Create: `test/e2e/book-import.spec.js`

测试代码已在设计文档中详细说明，按照模板创建测试文件。

---

## Task 9: 运行测试确保全部通过

**Step 1: 启动开发服务器**

```bash
npm run dev
```

**Step 2: 运行E2E测试**

```bash
npx playwright test --project=chromium
```

**Step 3: 确保所有测试通过**

如果有测试失败，修复代码后重新运行。

---

## 文件变更汇总

| 操作 | 文件路径 |
|------|----------|
| 修改 | `migrations/0002_seed_data.sql` |
| 新增 | `functions/api/books/[id]/import.js` |
| 新增 | `functions/api/books/[id]/detail.js` |
| 修改 | `src/frontend/js/api.js` |
| 修改 | `src/frontend/chapter.html` |
| 修改 | `src/frontend/css/style.css` |
| 新增 | `src/frontend/library.html` |
| 新增 | `src/frontend/css/library.css` |
| 新增 | `src/frontend/js/library.js` |
| 修改 | `src/frontend/index.html` |
| 修改 | `src/frontend/bookshelf.html` |
| 新增 | `test/e2e/card-drop.spec.js` |
| 新增 | `test/e2e/library.spec.js` |
| 新增 | `test/e2e/book-import.spec.js` |
