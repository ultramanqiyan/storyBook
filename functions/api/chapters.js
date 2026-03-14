import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from './utils.js';

const CARD_LIMIT_PER_TYPE = 8;

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

const puzzleTemplates = {
  adventure: [
    { question: '在森林中，你发现了什么？', answer: '宝藏', options: ['宝藏', '怪物', '陷阱', '出口'], type: 'choice' },
    { question: '冒险中最重要的品质是什么？', answer: '勇气', options: ['智慧', '勇气', '力量', '速度'], type: 'choice' },
    { question: '指南针指向哪个方向？', answer: '北', options: ['东', '南', '西', '北'], type: 'choice' }
  ],
  fantasy: [
    { question: '魔法师最常用的咒语是什么？', answer: '魔法', options: ['魔法', '火焰', '冰霜', '雷电'], type: 'choice' },
    { question: '龙最怕什么？', answer: '勇士', options: ['魔法', '勇士', '火焰', '水'], type: 'choice' },
    { question: '精灵住在哪里？', answer: '森林', options: ['森林', '海洋', '沙漠', '火山'], type: 'choice' }
  ],
  romance: [
    { question: '爱情最重要的元素是什么？', answer: '信任', options: ['信任', '激情', '浪漫', '惊喜'], type: 'choice' },
    { question: '约会最浪漫的地方是？', answer: '海边', options: ['海边', '山顶', '餐厅', '电影院'], type: 'choice' },
    { question: '表白时最需要的是什么？', answer: '勇气', options: ['勇气', '礼物', '鲜花', '音乐'], type: 'choice' }
  ],
  business: [
    { question: '商业成功最重要的因素是什么？', answer: '诚信', options: ['诚信', '资金', '人脉', '运气'], type: 'choice' },
    { question: '团队合作的核心是什么？', answer: '沟通', options: ['沟通', '领导', '执行', '计划'], type: 'choice' },
    { question: '创业最需要的是什么？', answer: '创新', options: ['创新', '资金', '团队', '市场'], type: 'choice' }
  ]
};

const chapterTitleTemplates = {
  adventure: ['神秘的开端', '森林探险', '山洞探秘', '宝藏发现', '勇士归来', '新的旅程', '神秘信号', '古老遗迹', '最终试炼', '凯旋而归'],
  fantasy: ['魔法觉醒', '龙之巢穴', '精灵森林', '黑暗降临', '光明重现', '元素试炼', '魔法对决', '命运交织', '神器现世', '传奇诞生'],
  romance: ['初遇', '心动', '误会', '和解', '永恒', '重逢', '告白', '约定', '考验', '幸福'],
  business: ['初入职场', '项目启动', '危机处理', '团队合作', '成功突破', '重要决策', '关键谈判', '领导力', '创新思维', '事业巅峰']
};

function generateChapterTitle(bookType, orderNum) {
  const templates = chapterTitleTemplates[bookType] || chapterTitleTemplates.adventure;
  return templates[(orderNum - 1) % templates.length];
}

function generateChapterContent(bookType, selectedCardsInfo) {
  const protagonist = selectedCardsInfo.protagonist?.name || '主角';
  const weather = selectedCardsInfo.weather?.name || '晴天';
  const terrain = selectedCardsInfo.terrain?.name || '森林';
  const adventure = selectedCardsInfo.adventure?.name || '探险';
  const equipment = selectedCardsInfo.equipment?.name || '指南针';
  const personality = selectedCardsInfo.protagonist?.personality || '勇敢';
  const supporting = selectedCardsInfo.supporting?.name || '';
  
  const templates = {
    adventure: `${weather}的日子里，阳光透过云层洒下金色的光芒，照亮了前方的道路。${protagonist}怀着${personality}的心情，踏上了前往${terrain}的旅程。一路上，风景如画，鸟儿在枝头欢快地歌唱，微风轻拂着脸庞，带来阵阵花香和泥土的芬芳。

${protagonist}拿出${equipment}，仔细观察着周围的环境。这片${terrain}充满了神秘和未知，每一处角落都可能隐藏着惊喜或挑战。远处的山峦起伏，近处的溪流潺潺，构成了一幅美丽的自然画卷。${supporting ? `身旁的${supporting}也在默默观察着一切，两人相视一笑，默契地继续前行。${supporting}的存在让这段旅程变得更加温暖。` : ''}

随着深入${terrain}，${protagonist}开始了${adventure}之旅。脚下的路蜿蜒曲折，通向未知的远方。周围的景色令人叹为观止，高耸的树木遮天蔽日，清澈的溪流潺潺流淌。每一步都充满惊喜，每一刻都值得铭记。偶尔，远处传来野兽的吼声，提醒着这片土地的原始与野性。

在这片神奇的土地上，${protagonist}将会遇到什么样的挑战呢？命运的齿轮已经开始转动，冒险的号角已经吹响。前方的道路虽然充满未知，但${protagonist}的心中充满了勇气和期待。这段旅程，注定会成为一段难忘的回忆...`,
    
    fantasy: `在${weather}的笼罩下，整个世界仿佛被一层神秘的面纱所覆盖，空气中弥漫着古老魔法的气息。${protagonist}踏入了传说中的${terrain}，每一步都可能触发沉睡千年的咒语，每一眼都可能看见不可思议的景象。远处的魔法光芒闪烁，近处的符文在石壁上若隐若现。

${equipment}在手中闪闪发光，散发着微弱的魔法波动，预示着即将到来的${adventure}。${protagonist}${personality}地握紧了手中的法器，感受着其中蕴含的力量，那是一种古老而强大的能量。${supporting ? `${supporting}在身旁轻声说道："小心，这里的魔法很不稳定，我们必须谨慎前行。"${protagonist}点点头，继续谨慎前行，两人之间的默契让这段旅程更加安心。` : ''}

${terrain}深处，奇异的生物在阴影中游荡，古老的符文在石壁上闪烁着神秘的光芒。${protagonist}深吸一口气，准备迎接命运的挑战。传说中，只有真正的勇者才能通过这里的考验，获得无上的力量和智慧。空气中充满了魔法的波动，每一次呼吸都仿佛在吸入魔力。

魔法的旅程才刚刚开始，${protagonist}的传奇正在书写。前方等待着什么样的奇迹与危险？古老的预言正在一步步应验，而${protagonist}正是这预言中的主角。命运的齿轮已经开始转动，没有人能够阻止即将发生的一切...`,
    
    romance: `${weather}的午后，阳光温柔地洒落在大地上，为世界披上了一层金色的光芒。${protagonist}漫步在${terrain}，心中怀着对未来的憧憬和期待。手中紧握着${equipment}，那是承载着回忆的珍贵之物，每一个细节都诉说着过往的故事。这里的一切都那么美好，仿佛时间都慢了下来。

${supporting ? `${supporting}静静地走在${protagonist}身旁，两人的影子在阳光下交织在一起，形成了一幅美丽的画面。空气中弥漫着淡淡的花香，微风轻拂，带来一丝甜蜜的气息。${supporting}的存在让这个下午变得更加特别。` : ''}${protagonist}${personality}地望着远方，心中期待着一场${adventure}，一场可能改变人生的际遇。

${terrain}里，花朵竞相绽放，蝴蝶在花丛中翩翩起舞，为这个美好的下午增添了生机。每一个转角都可能遇见惊喜，每一次回眸都可能发现美好。${protagonist}不知道的是，命运的齿轮已经开始转动，一个美丽的邂逅正在悄然酝酿，等待着最合适的时机绽放。

爱情的种子已经播下，等待着阳光和雨露的滋养。${protagonist}的故事，才刚刚开始书写。在这个充满可能性的世界里，每一天都可能成为改变命运的转折点。而今天，或许就是那个特别的日子...`,
    
    business: `${weather}，城市的天际线在晨光中渐渐清晰，高楼大厦的玻璃幕墙反射着第一缕阳光。${protagonist}来到了${terrain}，今天有一场重要的${adventure}在等待着。整理好${equipment}，${protagonist}${personality}地深吸一口气，推开了那扇门，准备迎接新的挑战。

${terrain}里人来人往，每个人都在为自己的目标而忙碌，空气中弥漫着紧张而兴奋的气息。${supporting ? `${supporting}已经在等候，看到${protagonist}到来，微笑着点了点头。两人握手致意，准备开始今天的挑战。${supporting}的支持让${protagonist}更加有信心。` : ''}这是一个充满机遇的地方，每一个决定都可能影响未来的走向。

${protagonist}环顾四周，目光坚定而专注。新的挑战，新的机遇，一切都将从这里开始。每一次握手都可能改变命运，每一次对话都可能开启新的篇章。在这个竞争激烈的世界里，只有不断进取才能立于不败之地。

职场的风云变幻莫测，但${protagonist}已经准备好迎接一切。成功的大门已经打开，关键在于如何把握机会、展现自我。今天，将是${protagonist}职业生涯中又一个重要的里程碑...`
  };
  
  return templates[bookType] || templates.adventure;
}

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
    weather_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(weather_id).first() : Promise.resolve(null),
    terrain_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(terrain_id).first() : Promise.resolve(null),
    adventure_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(adventure_id).first() : Promise.resolve(null),
    equipment_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(equipment_id).first() : Promise.resolve(null)
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

function mockAIGenerate(aiInput, bookType, orderNum, selectedCardsInfo, supportingName) {
  const title = generateChapterTitle(bookType, orderNum);
  const content = generateChapterContent(bookType, selectedCardsInfo);
  
  const templates = puzzleTemplates[bookType] || puzzleTemplates.adventure;
  const randomPuzzle = templates[Math.floor(Math.random() * templates.length)];
  
  const intimacyChange = Math.floor(Math.random() * 21) - 10;
  
  return {
    title: title,
    content: content,
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

async function getCardInfo(env, cardId, cardType) {
  if (!cardId) return null;
  
  if (cardType === 'character') {
    return await env.DB.prepare(
      'SELECT char_id, name, avatar FROM characters WHERE char_id = ?'
    ).bind(cardId).first();
  } else {
    return await env.DB.prepare(
      'SELECT card_id, name, icon FROM plot_cards WHERE card_id = ?'
    ).bind(cardId).first();
  }
}

async function checkCardLimit(env, bookId, subType) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
  ).bind(bookId, subType).first();
  
  return result.count >= CARD_LIMIT_PER_TYPE;
}

async function getCardsByType(env, bookId, subType) {
  const results = await env.DB.prepare(
    'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ? ORDER BY created_at ASC'
  ).bind(bookId, subType).all();
  
  return results.results;
}

async function createPuzzleForChapter(env, chapterId, bookType) {
  const templates = puzzleTemplates[bookType] || puzzleTemplates.adventure;
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  const puzzleId = generateId();
  const optionsJson = template.options ? JSON.stringify(template.options) : null;
  
  await env.DB.prepare(
    'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, max_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(puzzleId, chapterId, template.question, template.answer, template.type, optionsJson, 3).run();
  
  return puzzleId;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const bookId = url.searchParams.get('book_id');

  if (!bookId) {
    return createErrorResponse('缺少book_id参数');
  }

  try {
    const results = await env.DB.prepare(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num ASC'
    ).bind(bookId).all();

    const chaptersWithPuzzles = await Promise.all(
      (results.results || []).map(async (chapter) => {
        const puzzle = await env.DB.prepare(
          'SELECT puzzle_id FROM puzzles WHERE chapter_id = ?'
        ).bind(chapter.chapter_id).first();
        
        return {
          ...chapter,
          puzzle_id: puzzle?.puzzle_id || null
        };
      })
    );

    return createSuccessResponse(chaptersWithPuzzles);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { user_id, book_id, selected_cards } = body;
    const { protagonist_id, supporting_ids, weather_id, terrain_id, adventure_id, equipment_id } = selected_cards || {};

    if (!user_id) {
      return createErrorResponse('PLEASE_LOGIN');
    }

    if (!book_id) {
      return createErrorResponse('MISSING_BOOK_ID');
    }

    if (!protagonist_id) {
      return createErrorResponse('PROTAGONIST_REQUIRED');
    }

    if (!weather_id || !terrain_id || !adventure_id) {
      return createErrorResponse('REQUIRED_CARDS_MISSING');
    }

    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(book_id).first();

    if (!book) {
      return createErrorResponse('BOOK_NOT_FOUND');
    }

    if (book.is_preset === 1) {
      return createErrorResponse('PRESET_BOOK_NO_CHAPTERS');
    }

    if (book.user_id !== user_id) {
      return createErrorResponse('NO_PERMISSION');
    }

    const cardLimitInfo = [];
    const cardTypes = [
      { id: weather_id, type: 'weather' },
      { id: terrain_id, type: 'terrain' },
      { id: adventure_id, type: 'adventure' },
      { id: equipment_id, type: 'equipment' }
    ];

    for (const card of cardTypes) {
      if (card.id) {
        const cardInfo = await env.DB.prepare(
          'SELECT sub_type FROM plot_cards WHERE card_id = ?'
        ).bind(card.id).first();
        
        if (cardInfo) {
          const isAtLimit = await checkCardLimit(env, book_id, cardInfo.sub_type);
          if (isAtLimit) {
            const existingCards = await getCardsByType(env, book_id, cardInfo.sub_type);
            cardLimitInfo.push({
              sub_type: cardInfo.sub_type,
              cards: existingCards
            });
          }
        }
      }
    }

    const maxOrder = await env.DB.prepare(
      'SELECT MAX(order_num) as max_order FROM chapters WHERE book_id = ?'
    ).bind(book_id).first();

    const orderNum = (maxOrder?.max_order || 0) + 1;
    const chapterId = generateId();

    const aiInput = await buildAIInput(env, book_id, { protagonist_id, supporting_ids, weather_id, terrain_id, adventure_id, equipment_id });

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
      weather_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(weather_id).first() : Promise.resolve(null),
      terrain_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(terrain_id).first() : Promise.resolve(null),
      adventure_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(adventure_id).first() : Promise.resolve(null),
      equipment_id ? env.DB.prepare('SELECT name FROM plot_cards WHERE card_id = ?').bind(equipment_id).first() : Promise.resolve(null)
    ]);
    
    const selectedCardsInfo = {
      protagonist: protagonist,
      supporting: supporting,
      weather: weather,
      terrain: terrain,
      adventure: adventure,
      equipment: equipment
    };
    
    const supportingName = supporting?.name || null;

    const aiResult = mockAIGenerate(aiInput, book.type, orderNum, selectedCardsInfo, supportingName);
    const { title, content, puzzle, intimacy_changes } = aiResult;

    const cardsData = {
      protagonist_id,
      supporting_ids: supporting_ids || [],
      weather_id,
      terrain_id,
      adventure_id,
      equipment_id
    };

    await env.DB.prepare(
      'INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(chapterId, book_id, title, content, JSON.stringify(cardsData), orderNum).run();

    const puzzleId = generateId();
    await env.DB.prepare(
      'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, max_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(puzzleId, chapterId, puzzle.question, puzzle.answer, 'choice', JSON.stringify(puzzle.options), 3).run();

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

    const puzzleResult = await env.DB.prepare(
      'SELECT puzzle_id, question, puzzle_type FROM puzzles WHERE puzzle_id = ?'
    ).bind(puzzleId).first();

    return createSuccessResponse({
      chapter: {
        chapter_id: chapterId,
        title: title,
        content: content,
        order_num: orderNum
      },
      puzzle: {
        puzzle_id: puzzleResult.puzzle_id,
        question: puzzleResult.question,
        puzzle_type: puzzleResult.puzzle_type
      },
      updated_intimacy: updatedIntimacy,
      card_limit_warning: cardLimitInfo.length > 0 ? cardLimitInfo : undefined
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
