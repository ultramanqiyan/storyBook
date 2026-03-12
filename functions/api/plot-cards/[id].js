import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const cardId = params.id;

  try {
    const card = await env.DB.prepare(
      'SELECT * FROM plot_cards WHERE card_id = ?'
    ).bind(cardId).first();

    if (!card) {
      return createErrorResponse('卡牌不存在', 404);
    }

    return createSuccessResponse(card);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const cardId = params.id;

  try {
    const card = await env.DB.prepare(
      'SELECT * FROM plot_cards WHERE card_id = ?'
    ).bind(cardId).first();

    if (!card) {
      return createErrorResponse('卡牌不存在', 404);
    }

    await env.DB.prepare(
      'DELETE FROM plot_cards WHERE card_id = ?'
    ).bind(cardId).run();

    return createSuccessResponse({
      card_id: cardId,
      deleted: true,
      message: `卡牌【${card.name}】已丢弃`
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
