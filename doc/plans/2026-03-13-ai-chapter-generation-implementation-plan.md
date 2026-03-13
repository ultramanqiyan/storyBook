# AI大模型章节生成实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** 实现AI大模型章节生成功能，包括输入构造、Mock返回、数据库更新和端到端测试。

**Architecture:** 后端查询数据库构造AI输入文本，Mock阶段返回构造的输入作为章节内容，解析JSON写入数据库，添加端到端测试验证数据正确性。

**Tech Stack:** Cloudflare Pages Functions, D1 SQLite, Vitest, better-sqlite3

---

## Task 1: 创建AI输入构造函数

**Files:**
- Modify: `functions/api/chapters.js`

**Step 1: 添加系统提示词常量**

在文件顶部添加系统提示词常量：

```javascript
const SYSTEM_PROMPT = `你是互动故事章节生成专家。根据输入信息生成新一章节内容。

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
- 上一章解谜失败：新章节内容偏向挑战，配角亲密度倾向负向变化`;
```

**Step 2: 添加AI输入构造函数**

在 `generateChapterContent` 函数后添加：

```javascript
async function buildAIInput(env, bookId, selectedCards) {
  const { protagonist_id, supporting_ids, weather_id, terrain_id, adventure_id, equipment_id } = selectedCards;
  
  const book = await env.DB.prepare(
    'SELECT title, type FROM books WHERE book_id = ?'
  ).bind(bookId).first();
  
  const protagonist = await env.DB.prepare(
    'SELECT name, role_type, personality, speech_style FROM characters WHERE char_id = ?'
  ).bind(protagonist_id).first();
  
  let supporting = null;
  if (supporting_ids && supporting_ids.length > 0) {
    supporting = await env.DB.prepare(
      'SELECT name, role_type, personality, speech_style, relationship, intimacy FROM characters WHERE char_id = ?'
    ).bind(supporting_ids[0]).first();
  }
  
  const [weather, terrain, adventure, equipment] = await Promise.all([
    weather_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(weather_id).first() : null,
    terrain_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(terrain_id).first() : null,
    adventure_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(adventure_id).first() : null,
    equipment_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(equipment_id).first() : null
  ]);
  
  const recentChapters = await env.DB.prepare(
    'SELECT title FROM chapters WHERE book_id = ? ORDER BY order_num DESC LIMIT 3'
  ).bind(bookId).all();
  const recentTitles = recentChapters.results.map(c => c.title).reverse().join('、');
  
  const lastChapter = await env.DB.prepare(
    'SELECT content FROM chapters WHERE book_id = ? ORDER BY order_num DESC LIMIT 1'
  ).bind(bookId).first();
  
  const lastPuzzle = await env.DB.prepare(`
    SELECT p.question, p.answer, p.is_solved 
    FROM puzzles p 
    JOIN chapters c ON p.chapter_id = c.chapter_id 
    WHERE c.book_id = ? 
    ORDER BY c.order_num DESC LIMIT 1
  `).bind(bookId).first();
  
  let userData = `书籍名称：${book?.title || '未知'}
书籍类型：${book?.type || 'adventure'}

主角：${protagonist?.name || '未知'}
角色类型：${protagonist?.role_type || '未知'}
性格：${protagonist?.personality || '未知'}
说话方式：${protagonist?.speech_style || '未知'}`;
  
  if (supporting) {
    userData += `

配角：${supporting.name || '未知'}
角色类型：${supporting.role_type || '未知'}
性格：${supporting.personality || '未知'}
说话方式：${supporting.speech_style || '未知'}
与主角关系：${supporting.relationship || '未知'}
与主角亲密度：${supporting.intimacy || 0}`;
  }
  
  userData += `

天气：${weather?.name || '未知'}
地形：${terrain?.name || '未知'}
冒险类型：${adventure?.name || '未知'}
装备：${equipment?.name || '未知'}

最近三章标题：${recentTitles || '无'}
最近一章内容：${lastChapter?.content || '无'}
最近一章谜题：${lastPuzzle?.question || '无'}
正确答案：${lastPuzzle?.answer || '无'}
是否解谜成功：${lastPuzzle?.is_solved === 1 ? 'true' : 'false'}`;
  
  return SYSTEM_PROMPT + '\n' + userData;
}
```

**Step 3: 运行测试验证**

Run: `npm run test tests/unit/chapters.test.js`
Expected: PASS

**Step 4: Commit**

```bash
git add functions/api/chapters.js
git commit -m "feat: add AI input builder function for chapter generation"
```

---

## Task 2: 添加Mock AI返回函数

**Files:**
- Modify: `functions/api/chapters.js`

**Step 1: 添加Mock AI函数**

在 `buildAIInput` 函数后添加：

```javascript
function mockAIGenerate(aiInput, bookType, orderNum, supportingName) {
  const title = generateChapterTitle(bookType, orderNum);
  
  const templates = puzzleTemplates[bookType] || puzzleTemplates.adventure;
  const randomPuzzle = templates[Math.floor(Math.random() * templates.length)];
  
  const intimacyChange = Math.floor(Math.random() * 21) - 10;
  
  return {
    title: title,
    content: aiInput,
    puzzle: {
      question: randomPuzzle.question,
      options: randomPuzzle.options,
      answer: randomPuzzle.answer
    },
    intimacy_changes: supportingName ? [
      { char_name: supportingName, change: intimacyChange }
    ] : []
  };
}
```

**Step 2: 运行测试验证**

Run: `npm run test tests/unit/chapters.test.js`
Expected: PASS

**Step 3: Commit**

```bash
git add functions/api/chapters.js
git commit -m "feat: add mock AI generate function"
```

---

## Task 3: 修改创建章节逻辑

**Files:**
- Modify: `functions/api/chapters.js`

**Step 1: 修改 onRequestPost 函数**

找到 `onRequestPost` 函数中创建章节的逻辑，修改为使用新的AI输入构造和Mock返回：

将原来的：
```javascript
const title = generateChapterTitle(book.type, orderNum);
const selectedCardsInfo = {
  protagonist: await getCardInfo(env, protagonist_id, 'character'),
  weather: await getCardInfo(env, weather_id, 'plot'),
  terrain: await getCardInfo(env, terrain_id, 'plot'),
  adventure: await getCardInfo(env, adventure_id, 'plot'),
  equipment: await getCardInfo(env, equipment_id, 'plot')
};
const content = generateChapterContent(book.type, selectedCardsInfo);
```

替换为：
```javascript
const aiInput = await buildAIInput(env, book_id, { protagonist_id, supporting_ids, weather_id, terrain_id, adventure_id, equipment_id });

let supportingName = null;
if (supporting_ids && supporting_ids.length > 0) {
  const supportingChar = await env.DB.prepare(
    'SELECT name FROM characters WHERE char_id = ?'
  ).bind(supporting_ids[0]).first();
  supportingName = supportingChar?.name;
}

const aiResult = mockAIGenerate(aiInput, book.type, orderNum, supportingName);
const { title, content, puzzle, intimacy_changes } = aiResult;
```

**Step 2: 修改谜题创建逻辑**

将原来的：
```javascript
const puzzleId = await createPuzzleForChapter(env, chapterId, book.type);
```

替换为：
```javascript
const puzzleId = generateId();
await env.DB.prepare(
  'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, max_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)'
).bind(puzzleId, chapterId, puzzle.question, puzzle.answer, 'choice', JSON.stringify(puzzle.options), 3).run();
```

**Step 3: 修改亲密度更新逻辑**

将原来的随机更新改为使用AI返回的变化值：
```javascript
const updatedIntimacy = [];
if (intimacy_changes && intimacy_changes.length > 0) {
  for (const change of intimacy_changes) {
    const char = await env.DB.prepare(
      'SELECT char_id FROM characters WHERE name = ? AND book_id = ?'
    ).bind(change.char_name, book_id).first();
    
    if (char) {
      await env.DB.prepare(
        'UPDATE characters SET intimacy = MAX(-100, MIN(100, intimacy + ?)) WHERE char_id = ?'
      ).bind(change.change, char.char_id).run();
      
      const updatedChar = await env.DB.prepare(
        'SELECT char_id, intimacy FROM characters WHERE char_id = ?'
      ).bind(char.char_id).first();
      
      if (updatedChar) {
        updatedIntimacy.push({
          char_id: updatedChar.char_id,
          intimacy: updatedChar.intimacy
        });
      }
    }
  }
}
```

**Step 4: 运行测试验证**

Run: `npm run test tests/unit/chapters.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add functions/api/chapters.js
git commit -m "feat: integrate AI input builder and mock AI into chapter creation"
```

---

## Task 4: 创建端到端测试文件

**Files:**
- Create: `tests/e2e/ai-chapter-generation.test.js`

**Step 1: 创建测试文件**

```javascript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('AI Chapter Generation E2E Tests', () => {
  let db;
  let testUserId;
  let testBookId;
  let testProtagonistId;
  let testSupportingId;
  let testWeatherId;
  let testTerrainId;
  let testAdventureId;
  let testEquipmentId;

  beforeAll(async () => {
    const dbPath = join(__dirname, '../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject/storybook_database.sqlite');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
  });

  afterAll(() => {
    if (db) db.close();
  });

  beforeEach(async () => {
    db.exec('BEGIN TRANSACTION');
    
    const userId = 'test-ai-user-' + Date.now();
    db.prepare('INSERT INTO users (user_id, username, password) VALUES (?, ?, ?)').run(userId, 'testuser', 'testpass');
    testUserId = userId;
    
    const bookId = 'test-ai-book-' + Date.now();
    db.prepare('INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, ?)').run(bookId, testUserId, 'AI测试书籍', 'adventure', 0);
    testBookId = bookId;
    
    const protagonistId = 'test-ai-protagonist-' + Date.now();
    db.prepare('INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
      protagonistId, testBookId, '小明', '小探险家', '勇敢', '简洁直接', '👦', 1
    );
    testProtagonistId = protagonistId;
    
    const supportingId = 'test-ai-supporting-' + Date.now();
    db.prepare('INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, is_protagonist, relationship, intimacy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
      supportingId, testBookId, '小红', '小精灵', '温柔', '可爱俏皮', '🧚', 0, '朋友', 50
    );
    testSupportingId = supportingId;
    
    const weatherId = 'test-ai-weather-' + Date.now();
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon) VALUES (?, ?, ?, ?, ?, ?)').run(
      weatherId, testBookId, 'plot', 'weather', '晴天', '☀️'
    );
    testWeatherId = weatherId;
    
    const terrainId = 'test-ai-terrain-' + Date.now();
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon) VALUES (?, ?, ?, ?, ?, ?)').run(
      terrainId, testBookId, 'plot', 'terrain', '森林', '🌲'
    );
    testTerrainId = terrainId;
    
    const adventureId = 'test-ai-adventure-' + Date.now();
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon) VALUES (?, ?, ?, ?, ?, ?)').run(
      adventureId, testBookId, 'plot', 'adventure', '寻宝', '🗺️'
    );
    testAdventureId = adventureId;
    
    const equipmentId = 'test-ai-equipment-' + Date.now();
    db.prepare('INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon) VALUES (?, ?, ?, ?, ?, ?)').run(
      equipmentId, testBookId, 'plot', 'equipment', '指南针', '🧭'
    );
    testEquipmentId = equipmentId;
  });

  afterEach(() => {
    db.exec('ROLLBACK');
  });

  describe('创建章节 - AI输入构造', () => {
    it('应该正确构造AI输入文本', async () => {
      const { buildAIInput } = await import('../../functions/api/chapters.js');
      
      const mockEnv = {
        DB: {
          prepare: (sql) => ({
            bind: (...args) => ({
              first: async () => {
                if (sql.includes('FROM books')) {
                  return { title: 'AI测试书籍', type: 'adventure' };
                }
                if (sql.includes('is_protagonist') || sql.includes('protagonist')) {
                  return { name: '小明', role_type: '小探险家', personality: '勇敢', speech_style: '简洁直接' };
                }
                if (sql.includes('supporting') || sql.includes('relationship')) {
                  return { name: '小红', role_type: '小精灵', personality: '温柔', speech_style: '可爱俏皮', relationship: '朋友', intimacy: 50 };
                }
                if (sql.includes('plot_cards')) {
                  return { name: '测试卡牌' };
                }
                if (sql.includes('chapters')) {
                  return { results: [] };
                }
                return null;
              },
              all: async () => ({ results: [] })
            })
          })
        }
      };

      const aiInput = await buildAIInput(mockEnv, testBookId, {
        protagonist_id: testProtagonistId,
        supporting_ids: [testSupportingId],
        weather_id: testWeatherId,
        terrain_id: testTerrainId,
        adventure_id: testAdventureId,
        equipment_id: testEquipmentId
      });

      expect(aiInput).toContain('你是互动故事章节生成专家');
      expect(aiInput).toContain('书籍名称：AI测试书籍');
      expect(aiInput).toContain('书籍类型：adventure');
      expect(aiInput).toContain('主角：小明');
      expect(aiInput).toContain('配角：小红');
    });
  });

  describe('创建章节 - Mock AI返回', () => {
    it('应该返回正确格式的Mock AI结果', async () => {
      const { mockAIGenerate } = await import('../../functions/api/chapters.js');
      
      const aiInput = '测试AI输入文本';
      const result = mockAIGenerate(aiInput, 'adventure', 1, '小红');

      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
      expect(result.content).toBe(aiInput);
      expect(result).toHaveProperty('puzzle');
      expect(result.puzzle).toHaveProperty('question');
      expect(result.puzzle).toHaveProperty('options');
      expect(result.puzzle.options).toHaveLength(4);
      expect(result.puzzle).toHaveProperty('answer');
      expect(result).toHaveProperty('intimacy_changes');
      expect(result.intimacy_changes[0].char_name).toBe('小红');
      expect(result.intimacy_changes[0].change).toBeGreaterThanOrEqual(-10);
      expect(result.intimacy_changes[0].change).toBeLessThanOrEqual(10);
    });

    it('没有配角时应该返回空的亲密度变化', async () => {
      const { mockAIGenerate } = await import('../../functions/api/chapters.js');
      
      const aiInput = '测试AI输入文本';
      const result = mockAIGenerate(aiInput, 'adventure', 1, null);

      expect(result.intimacy_changes).toHaveLength(0);
    });
  });

  describe('创建章节 - 数据库写入', () => {
    it('应该正确写入章节数据', async () => {
      const chapterId = 'test-chapter-' + Date.now();
      const title = '测试章节标题';
      const content = '测试章节内容';
      
      db.prepare('INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)').run(
        chapterId, testBookId, title, content, '{}', 1
      );

      const chapter = db.prepare('SELECT * FROM chapters WHERE chapter_id = ?').get(chapterId);
      
      expect(chapter).toBeDefined();
      expect(chapter.title).toBe(title);
      expect(chapter.content).toBe(content);
      expect(chapter.order_num).toBe(1);
    });

    it('应该正确写入谜题数据', async () => {
      const chapterId = 'test-chapter-puzzle-' + Date.now();
      db.prepare('INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)').run(
        chapterId, testBookId, '测试章节', '内容', '{}', 1
      );
      
      const puzzleId = 'test-puzzle-' + Date.now();
      const question = '测试谜题问题';
      const options = ['选项A', '选项B', '选项C', '选项D'];
      const answer = '选项A';
      
      db.prepare('INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, max_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
        puzzleId, chapterId, question, answer, 'choice', JSON.stringify(options), 3
      );

      const puzzle = db.prepare('SELECT * FROM puzzles WHERE puzzle_id = ?').get(puzzleId);
      
      expect(puzzle).toBeDefined();
      expect(puzzle.question).toBe(question);
      expect(puzzle.answer).toBe(answer);
      expect(JSON.parse(puzzle.options)).toEqual(options);
    });

    it('应该正确更新亲密度', async () => {
      const originalIntimacy = db.prepare('SELECT intimacy FROM characters WHERE char_id = ?').get(testSupportingId).intimacy;
      
      const change = 5;
      db.prepare('UPDATE characters SET intimacy = MAX(-100, MIN(100, intimacy + ?)) WHERE char_id = ?').run(change, testSupportingId);
      
      const newIntimacy = db.prepare('SELECT intimacy FROM characters WHERE char_id = ?').get(testSupportingId).intimacy;
      
      expect(newIntimacy).toBe(originalIntimacy + change);
    });
  });

  describe('创建章节 - 完整流程', () => {
    it('应该完成完整的章节创建流程', async () => {
      const chapterId = 'test-full-chapter-' + Date.now();
      const title = '完整测试章节';
      const content = '这是完整的章节内容测试';
      
      db.prepare('INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)').run(
        chapterId, testBookId, title, content, JSON.stringify({
          protagonist_id: testProtagonistId,
          supporting_ids: [testSupportingId],
          weather_id: testWeatherId,
          terrain_id: testTerrainId,
          adventure_id: testAdventureId,
          equipment_id: testEquipmentId
        }), 1
      );
      
      const puzzleId = 'test-full-puzzle-' + Date.now();
      db.prepare('INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, max_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
        puzzleId, chapterId, '完整测试谜题？', '选项A', 'choice', JSON.stringify(['选项A', '选项B', '选项C', '选项D']), 3
      );
      
      const change = 5;
      db.prepare('UPDATE characters SET intimacy = MAX(-100, MIN(100, intimacy + ?)) WHERE char_id = ?').run(change, testSupportingId);

      const chapter = db.prepare('SELECT * FROM chapters WHERE chapter_id = ?').get(chapterId);
      expect(chapter).toBeDefined();
      expect(chapter.title).toBe(title);
      
      const puzzle = db.prepare('SELECT * FROM puzzles WHERE chapter_id = ?').get(chapterId);
      expect(puzzle).toBeDefined();
      expect(puzzle.question).toBe('完整测试谜题？');
      
      const character = db.prepare('SELECT intimacy FROM characters WHERE char_id = ?').get(testSupportingId);
      expect(character.intimacy).toBe(55);
    });
  });
});
