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
      'SELECT * FROM characters WHERE book_id = ? ORDER BY is_protagonist DESC, created_at ASC'
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
    const { book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist } = body;

    if (!book_id || !name || !role_type || !personality || !speech_style || !avatar) {
      return createErrorResponse('book_id、名称、角色类型、性格、说话风格和头像不能为空');
    }

    const charId = generateId();

    await env.DB.prepare(
      'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      charId, book_id, name, role_type, personality, speech_style, avatar, 
      intimacy || null, relationship || null, is_protagonist ? 1 : 0
    ).run();

    return createSuccessResponse({
      char_id: charId,
      book_id,
      name,
      role_type,
      personality,
      speech_style,
      avatar,
      intimacy: intimacy || null,
      relationship: relationship || null,
      is_protagonist: is_protagonist ? 1 : 0
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
