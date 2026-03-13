import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from '../../utils.js';

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const presetBookId = params.id;

  try {
    const body = await request.json();
    const { user_id } = body;

    if (!user_id) {
      return createErrorResponse('缺少用户ID', 400);
    }

    const presetBook = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ? AND is_preset = 1'
    ).bind(presetBookId).first();

    if (!presetBook) {
      return createErrorResponse('预设书籍不存在', 404);
    }

    const newBookId = generateId();
    const idMapping = {
      characters: new Map(),
      cards: new Map(),
      chapters: new Map(),
      puzzles: new Map()
    };

    await env.DB.prepare(
      'INSERT INTO books (book_id, user_id, title, type, is_preset) VALUES (?, ?, ?, ?, 0)'
    ).bind(newBookId, user_id, presetBook.title, presetBook.type).run();

    const characters = await env.DB.prepare(
      'SELECT * FROM characters WHERE book_id = ?'
    ).bind(presetBookId).all();

    for (const char of characters.results) {
      const newCharId = generateId();
      idMapping.characters.set(char.char_id, newCharId);
      await env.DB.prepare(
        'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(newCharId, newBookId, char.name, char.role_type, char.personality, char.speech_style, char.avatar, char.intimacy, char.relationship, char.is_protagonist).run();
    }

    const cards = await env.DB.prepare(
      'SELECT * FROM plot_cards WHERE book_id = ?'
    ).bind(presetBookId).all();

    for (const card of cards.results) {
      const newCardId = generateId();
      idMapping.cards.set(card.card_id, newCardId);
      await env.DB.prepare(
        'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(newCardId, newBookId, card.type, card.sub_type, card.name, card.icon, card.description, card.is_custom).run();
    }

    const chapters = await env.DB.prepare(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num'
    ).bind(presetBookId).all();

    for (const chapter of chapters.results) {
      const newChapterId = generateId();
      idMapping.chapters.set(chapter.chapter_id, newChapterId);

      let selectedCards = {};
      try {
        selectedCards = JSON.parse(chapter.selected_cards || '{}');
      } catch (e) {
        selectedCards = {};
      }

      await env.DB.prepare(
        'INSERT INTO chapters (chapter_id, book_id, title, content, selected_cards, order_num) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(newChapterId, newBookId, chapter.title, chapter.content, JSON.stringify(selectedCards), chapter.order_num).run();
    }

    const puzzles = await env.DB.prepare(
      'SELECT * FROM puzzles WHERE chapter_id IN (SELECT chapter_id FROM chapters WHERE book_id = ?)'
    ).bind(presetBookId).all();

    for (const puzzle of puzzles.results) {
      const newPuzzleId = generateId();
      const newChapterId = idMapping.chapters.get(puzzle.chapter_id);
      if (newChapterId) {
        await env.DB.prepare(
          'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, attempts, max_attempts, is_solved) VALUES (?, ?, ?, ?, ?, ?, 0, 3, 0)'
        ).bind(newPuzzleId, newChapterId, puzzle.question, puzzle.answer, puzzle.puzzle_type, puzzle.options).run();
      }
    }

    return createSuccessResponse({
      new_book_id: newBookId,
      message: '导入成功'
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
