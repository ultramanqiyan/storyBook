import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from './utils.js';

const VALID_BOOK_TYPES = ['adventure', 'fantasy', 'romance', 'business'];

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');

  if (!userId) {
    return createErrorResponse('缺少user_id参数');
  }

  try {
    const results = await env.DB.prepare(
      'SELECT * FROM books WHERE user_id = ? OR is_preset = 1 ORDER BY created_at DESC'
    ).bind(userId).all();

    return createSuccessResponse(results.results);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { user_id, title, type, protagonist, supporting_characters } = body;

    if (!user_id || !title || !type) {
      return createErrorResponse('user_id、标题和类型不能为空');
    }

    if (!VALID_BOOK_TYPES.includes(type)) {
      return createErrorResponse('无效的书籍类型，有效类型：adventure, fantasy, romance, business');
    }

    if (!protagonist || !protagonist.name) {
      return createErrorResponse('主角信息不能为空');
    }

    if (supporting_characters && supporting_characters.length > 3) {
      return createErrorResponse('配角最多3个');
    }

    const bookId = generateId();

    await env.DB.prepare(
      'INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)'
    ).bind(bookId, user_id, title, type).run();

    const protagonistId = generateId();
    await env.DB.prepare(
      'INSERT INTO characters (char_id, book_id, name, avatar, personality, speech_style, role_type, is_protagonist, intimacy) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)'
    ).bind(
      protagonistId,
      bookId,
      protagonist.name,
      protagonist.avatar || '👤',
      protagonist.personality || '',
      protagonist.speech_style || '',
      protagonist.role_type || ''
    ).run();

    const createdProtagonist = {
      char_id: protagonistId,
      book_id: bookId,
      name: protagonist.name,
      avatar: protagonist.avatar || '👤',
      personality: protagonist.personality || '',
      speech_style: protagonist.speech_style || '',
      role_type: protagonist.role_type || '',
      is_protagonist: 1,
      intimacy: 0
    };

    const createdSupporting = [];
    if (supporting_characters && supporting_characters.length > 0) {
      for (const supporting of supporting_characters) {
        const supportingId = generateId();
        await env.DB.prepare(
          'INSERT INTO characters (char_id, book_id, name, avatar, personality, speech_style, role_type, is_protagonist, intimacy) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 50)'
        ).bind(
          supportingId,
          bookId,
          supporting.name,
          supporting.avatar || '👤',
          supporting.personality || '',
          supporting.speech_style || '',
          supporting.role_type || ''
        ).run();

        createdSupporting.push({
          char_id: supportingId,
          book_id: bookId,
          name: supporting.name,
          avatar: supporting.avatar || '👤',
          personality: supporting.personality || '',
          speech_style: supporting.speech_style || '',
          role_type: supporting.role_type || '',
          is_protagonist: 0,
          intimacy: 50
        });
      }
    }

    return createSuccessResponse({
      book_id: bookId,
      user_id,
      title,
      type,
      is_preset: 0,
      protagonist: createdProtagonist,
      supporting_characters: createdSupporting
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
