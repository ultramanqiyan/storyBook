import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const puzzleId = params.id;

  try {
    const puzzle = await env.DB.prepare(
      'SELECT puzzle_id, chapter_id, question, answer, puzzle_type, options, attempts, max_attempts, is_solved FROM puzzles WHERE puzzle_id = ?'
    ).bind(puzzleId).first();

    if (!puzzle) {
      return createErrorResponse('谜题不存在', 404);
    }

    return createSuccessResponse({
      ...puzzle,
      options: puzzle.options ? JSON.parse(puzzle.options) : null
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const puzzleId = params.id;

  try {
    const puzzle = await env.DB.prepare(
      'SELECT * FROM puzzles WHERE puzzle_id = ?'
    ).bind(puzzleId).first();

    if (!puzzle) {
      return createErrorResponse('谜题不存在', 404);
    }

    await env.DB.prepare(
      'DELETE FROM puzzles WHERE puzzle_id = ?'
    ).bind(puzzleId).run();

    return createSuccessResponse({ puzzle_id: puzzleId });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
