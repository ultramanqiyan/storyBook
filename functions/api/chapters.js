import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from './utils.js';

const CARD_LIMIT_PER_TYPE = 8;

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
  
  const templates = {
    adventure: `${weather}的日子里，${protagonist}来到了${terrain}。这里充满了神秘和未知，${protagonist}拿出${equipment}，开始了${adventure}之旅。周围的景色令人叹为观止，每一步都充满惊喜。在这片神奇的土地上，${protagonist}将会遇到什么样的挑战呢？让我们拭目以待...`,
    fantasy: `在${weather}的笼罩下，${protagonist}踏入了${terrain}。${equipment}在手中闪闪发光，预示着即将到来的${adventure}。空气中弥漫着魔法的气息，每一步都可能触发古老的咒语。${protagonist}深吸一口气，准备迎接命运的挑战...`,
    romance: `${weather}的午后，${protagonist}漫步在${terrain}。手中紧握着${equipment}，心中期待着一场${adventure}。这里的一切都那么美好，仿佛时间都慢了下来。${protagonist}不知道的是，命运的齿轮已经开始转动...`,
    business: `${weather}，${protagonist}来到了${terrain}。今天有一场重要的${adventure}在等待着。${protagonist}整理好${equipment}，深吸一口气，推开了那扇门。新的挑战，新的机遇，一切都将从这里开始...`
  };
  
  return templates[bookType] || templates.adventure;
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

    return createSuccessResponse(results.results);
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
      return createErrorResponse('请先登录');
    }

    if (!book_id) {
      return createErrorResponse('book_id不能为空');
    }

    if (!protagonist_id) {
      return createErrorResponse('必须选择主角');
    }

    if (!weather_id || !terrain_id || !adventure_id) {
      return createErrorResponse('必须选择天气、地形和冒险类型卡牌');
    }

    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(book_id).first();

    if (!book) {
      return createErrorResponse('书籍不存在');
    }

    if (book.is_preset === 1) {
      return createErrorResponse('预设书籍不能添加章节');
    }

    if (book.user_id !== user_id) {
      return createErrorResponse('没有权限操作此书籍');
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

    const title = generateChapterTitle(book.type, orderNum);
    
    const selectedCardsInfo = {
      protagonist: await getCardInfo(env, protagonist_id, 'character'),
      weather: await getCardInfo(env, weather_id, 'plot'),
      terrain: await getCardInfo(env, terrain_id, 'plot'),
      adventure: await getCardInfo(env, adventure_id, 'plot'),
      equipment: await getCardInfo(env, equipment_id, 'plot')
    };
    
    const content = generateChapterContent(book.type, selectedCardsInfo);

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

    const puzzleId = await createPuzzleForChapter(env, chapterId, book.type);

    const updatedIntimacy = [];
    if (protagonist_id && supporting_ids && supporting_ids.length > 0) {
      for (const charId of supporting_ids) {
        const randomChange = Math.floor(Math.random() * 21) - 10;
        await env.DB.prepare(
          'UPDATE characters SET intimacy = MAX(-100, MIN(100, intimacy + ?)) WHERE char_id = ?'
        ).bind(randomChange, charId).run();
        
        const updatedChar = await env.DB.prepare(
          'SELECT char_id, intimacy FROM characters WHERE char_id = ?'
        ).bind(charId).first();
        
        if (updatedChar) {
          updatedIntimacy.push({
            char_id: updatedChar.char_id,
            intimacy: updatedChar.intimacy
          });
        }
      }
    }

    const puzzle = await env.DB.prepare(
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
        puzzle_id: puzzle.puzzle_id,
        question: puzzle.question,
        puzzle_type: puzzle.puzzle_type
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
