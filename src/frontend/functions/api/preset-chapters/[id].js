import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

export async function onRequestGet(context) {
  const { params, env } = context;
  const chapterId = params.id;

  try {
    const chapter = await env.DB.prepare(
      'SELECT * FROM chapters WHERE chapter_id = ?'
    ).bind(chapterId).first();

    if (!chapter) {
      return createErrorResponse('Chapter not found', 404);
    }

    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ? AND is_preset = 1'
    ).bind(chapter.book_id).first();

    if (!book) {
      return createErrorResponse('Not a preset book', 404);
    }

    const characters = await env.DB.prepare(
      'SELECT * FROM characters WHERE book_id = ?'
    ).bind(chapter.book_id).all();

    const plotCards = await env.DB.prepare(
      'SELECT * FROM plot_cards WHERE book_id = ?'
    ).bind(chapter.book_id).all();

    const puzzle = await env.DB.prepare(
      'SELECT * FROM puzzles WHERE chapter_id = ?'
    ).bind(chapterId).first();

    const totalChapters = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM chapters WHERE book_id = ?'
    ).bind(chapter.book_id).first();

    return createSuccessResponse({
      ...chapter,
      characters: characters.results || [],
      plot_cards: plotCards.results || [],
      puzzle: puzzle,
      total_chapters: totalChapters.count,
      is_preset: true
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
