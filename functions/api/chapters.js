import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from './utils.js';

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
    const { book_id, title, content, selected_cards, weather_card, terrain_card, adventure_card, equipment_card, protagonist_id } = body;

    if (!book_id || !title) {
      return createErrorResponse('book_id和标题不能为空');
    }

    const maxOrder = await env.DB.prepare(
      'SELECT MAX(order_num) as max_order FROM chapters WHERE book_id = ?'
    ).bind(book_id).first();

    const orderNum = (maxOrder?.max_order || 0) + 1;
    const chapterId = generateId();

    const cardsData = {
      weather_card,
      terrain_card,
      adventure_card,
      equipment_card,
      protagonist_id
    };

    await env.DB.prepare(
      'INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(chapterId, book_id, title, content || '', JSON.stringify(cardsData), orderNum).run();

    if (protagonist_id) {
      const supportingChars = await env.DB.prepare(
        'SELECT char_id FROM characters WHERE book_id = ? AND is_protagonist = 0'
      ).bind(book_id).all();

      for (const char of supportingChars.results) {
        const randomChange = Math.floor(Math.random() * 21) - 10;
        await env.DB.prepare(
          'UPDATE characters SET intimacy = MAX(-100, MIN(100, intimacy + ?)) WHERE char_id = ?'
        ).bind(randomChange, char.char_id).run();
      }
    }

    return createSuccessResponse({
      chapter_id: chapterId,
      book_id,
      title,
      content,
      selected_cards: cardsData,
      order_num: orderNum
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
