import { createSuccessResponse, createErrorResponse, getLanguage } from '../utils.js';

export async function onRequestGet(context) {
  const { env } = context;
  const lang = getLanguage(context);

  try {
    const results = await env.DB.prepare(`
      SELECT b.*, 
        (SELECT COUNT(*) FROM chapters WHERE book_id = b.book_id) as chapter_count
      FROM books b 
      WHERE b.is_preset = 1 AND b.language = ? 
      ORDER BY b.created_at DESC
    `).bind(lang).all();

    return createSuccessResponse(results.results);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
