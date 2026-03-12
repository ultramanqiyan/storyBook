import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

const VALID_BOOK_TYPES = ['adventure', 'fantasy', 'romance', 'business'];

export async function onRequestGet(context) {
  const { env, params } = context;
  const bookId = params.id;

  try {
    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(bookId).first();

    if (!book) {
      return createErrorResponse('书籍不存在', 404);
    }

    const characters = await env.DB.prepare(
      'SELECT * FROM characters WHERE book_id = ? ORDER BY is_protagonist DESC'
    ).bind(bookId).all();

    const chapters = await env.DB.prepare(
      'SELECT c.*, p.is_solved FROM chapters c LEFT JOIN puzzles p ON c.chapter_id = p.chapter_id WHERE c.book_id = ? ORDER BY c.order_num ASC'
    ).bind(bookId).all();

    const chaptersWithStatus = (chapters.results || []).map((chapter, index) => {
      return {
        ...chapter,
        status: 'read'
      };
    });

    return createSuccessResponse({
      ...book,
      characters: characters.results,
      chapters: chaptersWithStatus
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const bookId = params.id;

  try {
    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(bookId).first();

    if (!book) {
      return createErrorResponse('书籍不存在', 404);
    }

    if (book.is_preset === 1) {
      return createErrorResponse('预设书籍不能修改');
    }

    const body = await request.json();
    const { title, type } = body;

    if (!title && !type) {
      return createErrorResponse('没有要更新的内容');
    }

    const updates = [];
    const values = [];

    if (title) {
      updates.push('title = ?');
      values.push(title);
    }

    if (type) {
      if (!VALID_BOOK_TYPES.includes(type)) {
        return createErrorResponse('无效的书籍类型');
      }
      updates.push('type = ?');
      values.push(type);
    }

    updates.push('updated_at = datetime("now")');
    values.push(bookId);

    await env.DB.prepare(
      `UPDATE books SET ${updates.join(', ')} WHERE book_id = ?`
    ).bind(...values).run();

    return createSuccessResponse({
      book_id: bookId,
      title: title || book.title,
      type: type || book.type
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const bookId = params.id;

  try {
    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(bookId).first();

    if (!book) {
      return createErrorResponse('书籍不存在', 404);
    }

    if (book.is_preset === 1) {
      return createErrorResponse('预设书籍不能删除');
    }

    await env.DB.prepare(
      'DELETE FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)'
    ).bind(bookId).run();

    await env.DB.prepare(
      'DELETE FROM chapters WHERE book_id = ?'
    ).bind(bookId).run();

    await env.DB.prepare(
      'DELETE FROM characters WHERE book_id = ?'
    ).bind(bookId).run();

    await env.DB.prepare(
      'DELETE FROM plot_cards WHERE book_id = ?'
    ).bind(bookId).run();

    await env.DB.prepare(
      'DELETE FROM books WHERE book_id = ?'
    ).bind(bookId).run();

    return createSuccessResponse({ book_id: bookId });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
