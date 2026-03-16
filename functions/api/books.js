import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId, getLanguage } from './utils.js';
import { getConfig } from '../_shared/i18n-config.js';

const VALID_BOOK_TYPES = ['adventure', 'fantasy', 'romance', 'business'];

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function initializePlotCards(env, bookId, bookType, lang) {
  const plotOptions = getConfig('plotOptions', lang);
  const options = plotOptions[bookType];
  if (!options) return;

  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const defaultIcons = {
    weather: '🌤️',
    terrain: '🏔️',
    adventure: '🎯',
    equipment: '🎒'
  };
  
  for (const subType of subTypes) {
    const items = options[subType];
    if (!items || items.length === 0) continue;
    
    const selectedItems = getRandomItems(items, 4);
    
    for (const item of selectedItems) {
      const cardId = generateId();
      const itemName = typeof item === 'string' ? item : item.name;
      const itemIcon = typeof item === 'object' && item.icon ? item.icon : defaultIcons[subType];
      const itemDesc = typeof item === 'object' && item.description ? item.description : '';
      
      await env.DB.prepare(
        'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, 0)'
      ).bind(cardId, bookId, 'plot', subType, itemName, itemIcon, itemDesc).run();
    }
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');

  if (!userId) {
    return createErrorResponse('MISSING_USER_ID');
  }

  try {
    const results = await env.DB.prepare(
      'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(userId).all();

    const booksWithStats = await Promise.all(
      (results.results || []).map(async (book) => {
        const chapterCount = await env.DB.prepare(
          'SELECT COUNT(*) as count FROM chapters WHERE book_id = ?'
        ).bind(book.book_id).first();
        
        return {
          ...book,
          chapter_count: chapterCount?.count || 0
        };
      })
    );

    return createSuccessResponse(booksWithStats);
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const lang = getLanguage(context);

  try {
    const body = await request.json();
    const { user_id, title, type, protagonist, supporting_characters } = body;

    if (!user_id || !title || !type) {
      return createErrorResponse('MISSING_REQUIRED_FIELDS');
    }

    if (!VALID_BOOK_TYPES.includes(type)) {
      return createErrorResponse('INVALID_BOOK_TYPE');
    }

    if (!protagonist || !protagonist.name) {
      return createErrorResponse('PROTAGONIST_REQUIRED');
    }

    if (supporting_characters && supporting_characters.length > 3) {
      return createErrorResponse('MAX_THREE_SUPPORTING');
    }

    if (title.length > 50) {
      return createErrorResponse('TITLE_TOO_LONG');
    }

    if (protagonist.name.length > 20) {
      return createErrorResponse('PROTAGONIST_NAME_TOO_LONG');
    }

    if (supporting_characters) {
      for (const companion of supporting_characters) {
        if (companion.name && companion.name.length > 20) {
          return createErrorResponse('SUPPORTING_NAME_TOO_LONG');
        }
      }
    }

    const bookId = generateId();

    await env.DB.prepare(
      'INSERT INTO books (book_id, user_id, title, type, is_preset, language) VALUES (?, ?, ?, ?, 0, ?)'
    ).bind(bookId, user_id, title, type, lang).run();

    const protagonistId = generateId();
    await env.DB.prepare(
      'INSERT INTO characters (char_id, book_id, name, avatar, personality, speech_style, role_type, is_protagonist, intimacy) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)'
    ).bind(
      protagonistId,
      bookId,
      protagonist.name,
      protagonist.avatar || '👤',
      protagonist.personality || '',
      protagonist.speech_style || '',
      protagonist.role_type || ''
    ).run();

    const createdProtagonist = {
      char_id: protagonistId,
      book_id: bookId,
      name: protagonist.name,
      avatar: protagonist.avatar || '👤',
      personality: protagonist.personality || '',
      speech_style: protagonist.speech_style || '',
      role_type: protagonist.role_type || '',
      is_protagonist: 1,
      intimacy: 0
    };

    const createdSupporting = [];
    if (supporting_characters && supporting_characters.length > 0) {
      for (const supporting of supporting_characters) {
        const supportingId = generateId();
        await env.DB.prepare(
          'INSERT INTO characters (char_id, book_id, name, avatar, personality, speech_style, role_type, is_protagonist, intimacy, relationship) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?)'
        ).bind(
          supportingId,
          bookId,
          supporting.name,
          supporting.avatar || '👤',
          supporting.personality || '',
          supporting.speech_style || '',
          supporting.role_type || '',
          supporting.intimacy !== undefined ? supporting.intimacy : 50,
          supporting.relationship || ''
        ).run();

        createdSupporting.push({
          char_id: supportingId,
          book_id: bookId,
          name: supporting.name,
          avatar: supporting.avatar || '👤',
          personality: supporting.personality || '',
          speech_style: supporting.speech_style || '',
          role_type: supporting.role_type || '',
          is_protagonist: 0,
          intimacy: supporting.intimacy !== undefined ? supporting.intimacy : 50,
          relationship: supporting.relationship || ''
        });
      }
    }

    await initializePlotCards(env, bookId, type, lang);

    return createSuccessResponse({
      book_id: bookId,
      user_id,
      title,
      type,
      is_preset: 0,
      language: lang,
      protagonist: createdProtagonist,
      supporting_characters: createdSupporting
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
