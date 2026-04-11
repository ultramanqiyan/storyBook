import { createSuccessResponse, createErrorResponse, createOptionsResponse } from '../utils.js';

export async function onRequestGet(context) {
  const { env, params } = context;
  const charId = params.id;

  try {
    const char = await env.DB.prepare(
      'SELECT * FROM characters WHERE char_id = ?'
    ).bind(charId).first();

    if (!char) {
      return createErrorResponse('角色不存在', 404);
    }

    return createSuccessResponse(char);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const charId = params.id;

  try {
    const existingChar = await env.DB.prepare(
      'SELECT * FROM characters WHERE char_id = ?'
    ).bind(charId).first();

    if (!existingChar) {
      return createErrorResponse('角色不存在', 404);
    }

    const body = await request.json();
    const { name, role_type, personality, speech_style, avatar, intimacy, relationship, is_protagonist } = body;

    const updates = [];
    const values = [];

    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (role_type !== undefined) {
      updates.push('role_type = ?');
      values.push(role_type);
    }
    if (personality !== undefined) {
      updates.push('personality = ?');
      values.push(personality);
    }
    if (speech_style !== undefined) {
      updates.push('speech_style = ?');
      values.push(speech_style);
    }
    if (avatar !== undefined) {
      updates.push('avatar = ?');
      values.push(avatar);
    }
    if (intimacy !== undefined) {
      updates.push('intimacy = ?');
      values.push(intimacy);
    }
    if (relationship !== undefined) {
      updates.push('relationship = ?');
      values.push(relationship);
    }
    if (is_protagonist !== undefined) {
      updates.push('is_protagonist = ?');
      values.push(is_protagonist ? 1 : 0);
    }

    if (updates.length === 0) {
      return createErrorResponse('没有要更新的内容');
    }

    updates.push('updated_at = datetime("now")');
    values.push(charId);

    await env.DB.prepare(
      `UPDATE characters SET ${updates.join(', ')} WHERE char_id = ?`
    ).bind(...values).run();

    return createSuccessResponse({ char_id: charId });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestDelete(context) {
  const { env, params } = context;
  const charId = params.id;

  try {
    const char = await env.DB.prepare(
      'SELECT * FROM characters WHERE char_id = ?'
    ).bind(charId).first();

    if (!char) {
      return createErrorResponse('角色不存在', 404);
    }

    await env.DB.prepare(
      'DELETE FROM characters WHERE char_id = ?'
    ).bind(charId).run();

    return createSuccessResponse({ char_id: charId });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
