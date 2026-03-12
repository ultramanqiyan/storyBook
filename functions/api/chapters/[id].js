import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const chapterId = params.id;

  try {
    const chapter = await env.DB.prepare(
      'SELECT * FROM chapters WHERE chapter_id = ?'
    ).bind(chapterId).first();

    if (!chapter) {
      return createErrorResponse('章节不存在', 404);
    }

    return createSuccessResponse(chapter);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const chapterId = params.id;

  try {
    const existingChapter = await env.DB.prepare(
      'SELECT * FROM chapters WHERE chapter_id = ?'
    ).bind(chapterId).first();

    if (!existingChapter) {
      return createErrorResponse('章节不存在', 404);
    }

    const body = await request.json();
    const { title, content, selected_cards, order_num } = body;

    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (content !== undefined) {
      updates.push('content = ?');
      values.push(content);
    }
    if (selected_cards !== undefined) {
      updates.push('selected_cards = ?');
      values.push(selected_cards ? JSON.stringify(selected_cards) : null);
    }
    if (order_num !== undefined) {
      updates.push('order_num = ?');
      values.push(order_num);
    }

    if (updates.length === 0) {
      return createErrorResponse('没有要更新的内容');
    }

    values.push(chapterId);

    await env.DB.prepare(
      `UPDATE chapters SET ${updates.join(', ')} WHERE chapter_id = ?`
    ).bind(...values).run();

    return createSuccessResponse({ chapter_id: chapterId });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const chapterId = params.id;

  try {
    const chapter = await env.DB.prepare(
      'SELECT * FROM chapters WHERE chapter_id = ?'
    ).bind(chapterId).first();

    if (!chapter) {
      return createErrorResponse('章节不存在', 404);
    }

    await env.DB.prepare(
      'DELETE FROM puzzles WHERE chapter_id = ?'
    ).bind(chapterId).run();

    await env.DB.prepare(
      'DELETE FROM chapters WHERE chapter_id = ?'
    ).bind(chapterId).run();

    return createSuccessResponse({ chapter_id: chapterId });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
