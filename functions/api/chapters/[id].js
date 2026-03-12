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

    const puzzle = await env.DB.prepare(
      'SELECT puzzle_id, question, puzzle_type, options FROM puzzles WHERE chapter_id = ?'
    ).bind(chapterId).first();

    const characters = await env.DB.prepare(
      'SELECT char_id, name, avatar, role_type, personality FROM characters WHERE book_id = ? ORDER BY is_protagonist DESC'
    ).bind(chapter.book_id).all();

    const selectedCards = chapter.selected_cards ? JSON.parse(chapter.selected_cards) : null;
    let plotCards = [];
    if (selectedCards) {
      const cardIds = [
        selectedCards.weather_id,
        selectedCards.terrain_id,
        selectedCards.adventure_id,
        selectedCards.equipment_id
      ].filter(id => id);

      if (cardIds.length > 0) {
        const placeholders = cardIds.map(() => '?').join(',');
        const plotResults = await env.DB.prepare(
          `SELECT card_id, name, icon, description, sub_type FROM plot_cards WHERE card_id IN (${placeholders})`
        ).bind(...cardIds).all();
        plotCards = plotResults.results || [];
      }
    }

    const totalChapters = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM chapters WHERE book_id = ?'
    ).bind(chapter.book_id).first();

    const allChapters = await env.DB.prepare(
      'SELECT chapter_id, order_num FROM chapters WHERE book_id = ? ORDER BY order_num ASC'
    ).bind(chapter.book_id).all();

    let prevChapterId = null;
    let nextChapterId = null;
    const chapters = allChapters.results || [];
    const currentIndex = chapters.findIndex(c => c.chapter_id === chapterId);
    if (currentIndex > 0) {
      prevChapterId = chapters[currentIndex - 1].chapter_id;
    }
    if (currentIndex < chapters.length - 1) {
      nextChapterId = chapters[currentIndex + 1].chapter_id;
    }

    return createSuccessResponse({
      ...chapter,
      puzzle_id: puzzle?.puzzle_id || null,
      puzzle: puzzle ? {
        ...puzzle,
        options: puzzle.options ? JSON.parse(puzzle.options) : null
      } : null,
      characters: characters.results || [],
      plot_cards: plotCards,
      total_chapters: totalChapters?.count || 0,
      prev_chapter_id: prevChapterId,
      next_chapter_id: nextChapterId
    });
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
