import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId } from '../utils.js';

const CHARACTER_LIMIT = 8;

const avatarEmojis = [
  '👦', '👧', '👨', '👩', '👴', '👵', '🧑', '👱', '👨‍🦰', '👩‍🦰',
  '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲', '🧔', '🧓', '🧑‍🦰', '🧑‍🦱',
  '🧑‍🦳', '🧑‍🦲', '🦸', '🦸‍♀️', '🦹', '🦹‍♀️', '🧙', '🧙‍♀️', '🧚', '🧚‍♀️',
  '🧛', '🧛‍♀️', '🧜', '🧜‍♀️', '🧝', '🧝‍♀️', '🥷', '👼', '🕵️', '💂'
];

const characterTypes = {
  adventure: ['探险家', '向导', '船长', '考古学家', '摄影师', '动物学家', '植物学家', '地质学家'],
  fantasy: ['魔法师', '骑士', '精灵', '矮人', '龙骑士', '巫师', '游侠', '吟游诗人'],
  romance: ['企业家', '医生', '律师', '艺术家', '作家', '设计师', '建筑师', '音乐家'],
  business: ['CEO', '经理', '创业者', '投资人', '顾问', '分析师', '工程师', '设计师']
};

const personalities = ['勇敢', '谨慎', '乐观', '悲观', '幽默', '严肃', '热情', '冷漠', '聪明', '单纯', '善良', '狡猾', '忠诚', '叛逆', '温柔', '坚强'];

const speechStyles = ['简洁直接', '幽默风趣', '文雅礼貌', '粗犷豪放', '温柔细腻', '神秘莫测', '活泼开朗', '沉稳内敛'];

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  if (type === 'avatars') {
    return createSuccessResponse({
      avatars: avatarEmojis
    });
  }

  if (type === 'options') {
    const bookType = url.searchParams.get('book_type');
    return createSuccessResponse({
      character_types: bookType ? (characterTypes[bookType] || []) : characterTypes,
      personalities: personalities,
      speech_styles: speechStyles
    });
  }

  return createSuccessResponse({
    avatars: avatarEmojis,
    character_types: characterTypes,
    personalities: personalities,
    speech_styles: speechStyles
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { book_id, name, avatar, role_type, personality, speech_style, intimacy, user_id } = body;

    if (!book_id || !name || !avatar || !role_type || !personality || !speech_style) {
      return createErrorResponse('缺少必填字段');
    }

    if (name.length < 1 || name.length > 20) {
      return createErrorResponse('角色名称长度必须在1-20字符之间');
    }

    const book = await env.DB.prepare(
      'SELECT * FROM books WHERE book_id = ?'
    ).bind(book_id).first();

    if (!book) {
      return createErrorResponse('书籍不存在');
    }

    if (book.user_id !== user_id && book.is_preset !== 1) {
      return createErrorResponse('无权限操作此书籍');
    }

    const countResult = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM characters WHERE book_id = ?'
    ).bind(book_id).first();

    if (countResult.count >= CHARACTER_LIMIT) {
      const existingChars = await env.DB.prepare(
        'SELECT * FROM characters WHERE book_id = ? ORDER BY created_at ASC'
      ).bind(book_id).all();

      return createSuccessResponse({
        success: false,
        limit_exceeded: true,
        message: `角色卡牌已达上限（${CHARACTER_LIMIT}张）`,
        current_count: countResult.count,
        existing_characters: existingChars.results
      });
    }

    const charId = generateId();
    const intimacyValue = intimacy || 0;

    await env.DB.prepare(
      'INSERT INTO characters (char_id, book_id, name, role_type, personality, speech_style, avatar, intimacy, is_protagonist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(charId, book_id, name, role_type, personality, speech_style, avatar, intimacyValue, 0).run();

    return createSuccessResponse({
      success: true,
      character: {
        char_id: charId,
        book_id: book_id,
        name: name,
        role_type: role_type,
        personality: personality,
        speech_style: speech_style,
        avatar: avatar,
        intimacy: intimacyValue,
        is_protagonist: 0,
        is_custom: 1
      },
      message: '自定义角色卡牌创建成功'
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
