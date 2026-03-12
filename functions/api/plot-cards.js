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
      'SELECT * FROM plot_cards WHERE book_id = ? ORDER BY type, sub_type, created_at ASC'
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
    const { book_id, type, sub_type, name, icon, description, is_custom } = body;

    if (!book_id || !type || !sub_type || !name || !icon) {
      return createErrorResponse('book_id、类型、子类型、名称和图标不能为空');
    }

    const cardId = generateId();

    await env.DB.prepare(
      'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(cardId, book_id, type, sub_type, name, icon, description || null, is_custom ? 1 : 0).run();

    return createSuccessResponse({
      card_id: cardId,
      book_id,
      type,
      sub_type,
      name,
      icon,
      description: description || null,
      is_custom: is_custom ? 1 : 0
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
