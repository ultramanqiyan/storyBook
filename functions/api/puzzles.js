import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from './utils.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const chapterId = url.searchParams.get('chapter_id');

  if (!chapterId) {
    return createErrorResponse('缺少chapter_id参数');
  }

  try {
    const results = await env.DB.prepare(
      'SELECT * FROM puzzles WHERE chapter_id = ? ORDER BY created_at ASC'
    ).bind(chapterId).all();

    return createSuccessResponse(results.results);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { chapter_id, question, answer, puzzle_type, options, max_attempts } = body;

    if (!chapter_id || !question || !answer || !puzzle_type) {
      return createErrorResponse('chapter_id、问题、答案和谜题类型不能为空');
    }

    const validTypes = ['text', 'choice'];
    if (!validTypes.includes(puzzle_type)) {
      return createErrorResponse('无效的谜题类型，有效类型：text, choice');
    }

    const puzzleId = generateId();

    await env.DB.prepare(
      'INSERT INTO puzzles (puzzle_id, chapter_id, question, answer, puzzle_type, options, max_attempts) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(puzzleId, chapter_id, question, answer, puzzle_type, options ? JSON.stringify(options) : null, max_attempts || 3).run();

    return createSuccessResponse({
      puzzle_id: puzzleId,
      chapter_id,
      question,
      answer,
      puzzle_type,
      options: options || null,
      max_attempts: max_attempts || 3
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
