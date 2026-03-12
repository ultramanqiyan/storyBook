import { createSuccessResponse, createErrorResponse } from '../utils.js';

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const results = await env.DB.prepare(
      'SELECT * FROM books WHERE is_preset = 1 ORDER BY created_at DESC'
    ).all();

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
