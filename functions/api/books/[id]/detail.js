import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../../utils.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const bookId = params.id;

  try {
    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ? AND is_preset = 1'
    ).bind(bookId).first();

    if (!book) {
      return createErrorResponse('预设书籍不存在', 404);
    }

    const baseBookId = bookId.replace(/-en$|-zh$/, '');

    const [characters, plotCards, chapters] = await Promise.all([
      env.DB.prepare('SELECT * FROM characters WHERE book_id = ?').bind(bookId).all(),
      env.DB.prepare('SELECT * FROM plot_cards WHERE book_id = ?').bind(baseBookId).all(),
      env.DB.prepare('SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num').bind(bookId).all()
    ]);

    return createSuccessResponse({
      book,
      characters: characters.results,
      plot_cards: plotCards.results,
      chapters: chapters.results
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
