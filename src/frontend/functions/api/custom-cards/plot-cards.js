import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from '../utils.js';

const CARD_LIMIT_PER_TYPE = 8;

const plotIcons = {
  weather: ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌪️', '🌈', '❄️', '🌫️', '🌬️', '🌙', '⭐', '🌟', '💫', '✨', '🔥', '💧', '🌊', '❄️', '🌨️'],
  terrain: ['🏔️', '⛰️', '🌋', '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🌳', '🌲', '🌴', '🍂', '🍃', '🌾', '🌿', '🍀', '🌸', '🌺', '🌻', '🌹'],
  adventure: ['🗺️', '🧭', '⚔️', '🛡️', '🏹', '🎯', '🎲', '🎰', '🧩', '🔮', '📿', '🧿', '🏺', '⚱️', '🗝️', '🚪', '🪜', '⚓', '🪝', '⛏️'],
  equipment: ['🎒', '📦', '🧰', '🧳', '💼', '🔦', '💡', '🕯️', '🪔', '📱', '📷', '📹', '🔭', '🔬', '🩺', '💊', '💉', '🩹', '🧬', '🔭']
};

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const subType = url.searchParams.get('sub_type');

  if (subType && plotIcons[subType]) {
    return createSuccessResponse({
      sub_type: subType,
      icons: plotIcons[subType]
    });
  }

  return createSuccessResponse({
    icons: plotIcons
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { book_id, sub_type, name, icon, description, user_id } = body;

    if (!book_id || !sub_type || !name || !icon) {
      return createErrorResponse('缺少必填字段');
    }

    if (!['weather', 'terrain', 'adventure', 'equipment'].includes(sub_type)) {
      return createErrorResponse('无效的卡牌子类型');
    }

    if (name.length < 1 || name.length > 20) {
      return createErrorResponse('卡牌名称长度必须在1-20字符之间');
    }

    if (description && description.length > 100) {
      return createErrorResponse('卡牌描述长度不能超过100字符');
    }

    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(book_id).first();

    if (!book) {
      return createErrorResponse('书籍不存在');
    }

    if (book.user_id !== user_id && book.is_preset !== 1) {
      return createErrorResponse('无权限操作此书籍');
    }

    const countResult = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
    ).bind(book_id, sub_type).first();

    if (countResult.count >= CARD_LIMIT_PER_TYPE) {
      const existingCards = await env.DB.prepare(
        'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ? ORDER BY created_at ASC'
      ).bind(book_id, sub_type).all();

      return createSuccessResponse({
        success: false,
        limit_exceeded: true,
        message: `该类型卡牌已达上限（${CARD_LIMIT_PER_TYPE}张）`,
        current_count: countResult.count,
        existing_cards: existingCards.results
      });
    }

    const cardId = generateId();
    
    await env.DB.prepare(
      'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(cardId, book_id, 'plot', sub_type, name, icon, description || '', 1).run();

    return createSuccessResponse({
      success: true,
      card: {
        card_id: cardId,
        book_id: book_id,
        type: 'plot',
        sub_type: sub_type,
        name: name,
        icon: icon,
        description: description || '',
        is_custom: 1
      },
      message: '自定义情节卡牌创建成功'
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
