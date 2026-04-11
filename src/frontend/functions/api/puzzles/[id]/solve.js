import { createSuccessResponse, createErrorResponse, generateId } from '../../utils.js';
import { i18nConfig } from '../../../_shared/i18n-config.js';

const CARD_LIMIT_PER_TYPE = 8;
const CHARACTER_LIMIT = 8;
const CUSTOM_DROP_CHANCE = 0.30;
const CHARACTER_DROP_RATIO = 0.40;

const avatarEmojis = [
  '👦', '👧', '👨', '👩', '👴', '👵', '🧑', '👱', '👨‍🦰', '👩‍🦰',
  '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲', '🧔', '🧓', '🧑‍🦰', '🧑‍🦱'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function checkCardLimit(env, bookId, subType) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
  ).bind(bookId, subType).first();
  
  return result.count >= CARD_LIMIT_PER_TYPE;
}

async function checkCharacterLimit(env, bookId) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM characters WHERE book_id = ?'
  ).bind(bookId).first();
  
  return result.count >= CHARACTER_LIMIT;
}

async function getCardCountByType(env, bookId, subType) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
  ).bind(bookId, subType).first();
  
  return result.count;
}

async function getCharacterCount(env, bookId) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM characters WHERE book_id = ?'
  ).bind(bookId).first();
  
  return result.count;
}

async function getCardsByType(env, bookId, subType) {
  const results = await env.DB.prepare(
    'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ? ORDER BY created_at ASC'
  ).bind(bookId, subType).all();
  
  return results.results;
}

async function getCharacters(env, bookId) {
  const results = await env.DB.prepare(
    'SELECT * FROM characters WHERE book_id = ? ORDER BY created_at ASC'
  ).bind(bookId).all();
  
  return results.results;
}

function generateCardDrop(bookType, language = 'zh') {
  const langOptions = i18nConfig.plotOptions[language];
  if (!langOptions) {
    return null;
  }
  
  const options = langOptions[bookType];
  if (!options) {
    return null;
  }

  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const subTypeWeights = [2, 2, 3, 3];
  
  const totalWeight = subTypeWeights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  let selectedSubType = 'adventure';
  
  for (let i = 0; i < subTypes.length; i++) {
    random -= subTypeWeights[i];
    if (random <= 0) {
      selectedSubType = subTypes[i];
      break;
    }
  }
  
  const cardPool = options[selectedSubType];
  if (!cardPool || cardPool.length === 0) {
    return null;
  }

  const randomCard = getRandomElement(cardPool);
  
  return {
    card_id: generateId(),
    sub_type: selectedSubType,
    name: randomCard.name,
    icon: randomCard.icon,
    description: randomCard.description,
    is_custom: 0
  };
}

function generateCustomPlotCardDrop() {
  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const randomSubType = getRandomElement(subTypes);
  
  const icons = {
    weather: ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌪️', '🌈', '❄️', '🌫️', '🌬️'],
    terrain: ['🏔️', '⛰️', '🌋', '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🌳', '🌲'],
    adventure: ['🗺️', '🧭', '⚔️', '🛡️', '🏹', '🎯', '🎲', '🎰', '🧩', '🔮'],
    equipment: ['🎒', '📦', '🧰', '🧳', '💼', '🔦', '💡', '🕯️', '🪔', '📱']
  };

  return {
    card_id: generateId(),
    sub_type: randomSubType,
    name: '',
    icon: getRandomElement(icons[randomSubType]),
    description: '',
    is_custom: 1,
    card_type: 'custom_plot'
  };
}

function generateCustomCharacterDrop(bookType, language = 'zh') {
  const types = i18nConfig.characterTypes[language]?.[bookType] || i18nConfig.characterTypes.zh[bookType] || i18nConfig.characterTypes.zh.adventure;
  const personalities = i18nConfig.personality[language] || i18nConfig.personality.zh;
  const styles = i18nConfig.speechStyles[language] || i18nConfig.speechStyles.zh;
  
  return {
    char_id: generateId(),
    avatar: getRandomElement(avatarEmojis),
    role_type: getRandomElement(types),
    personality: getRandomElement(personalities),
    speech_style: getRandomElement(styles),
    intimacy: 0,
    is_custom: 1,
    card_type: 'custom_character'
  };
}

function determineRewardType() {
  const random = Math.random();
  
  if (random < CUSTOM_DROP_CHANCE * CHARACTER_DROP_RATIO) {
    return 'custom_character';
  } else if (random < CUSTOM_DROP_CHANCE) {
    return 'custom_plot';
  }
  
  return 'preset_plot';
}

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const puzzleId = params.id;

  try {
    const body = await request.json();
    const { answer, user_id } = body;

    const puzzle = await env.DB.prepare(
      'SELECT * FROM puzzles WHERE puzzle_id = ?'
    ).bind(puzzleId).first();

    if (!puzzle) {
      return createErrorResponse('PUZZLE_NOT_FOUND', 404);
    }

    if (puzzle.is_solved === 1) {
      return createSuccessResponse({
        is_correct: true,
        is_solved: true,
        message: 'PUZZLE_ALREADY_SOLVED'
      });
    }

    if (!answer) {
      return createErrorResponse('PLEASE_PROVIDE_ANSWER');
    }

    const isCorrect = puzzle.answer.toLowerCase().trim() === answer.toLowerCase().trim();
    const newAttempts = puzzle.attempts + 1;

    if (isCorrect) {
      await env.DB.prepare(
        'UPDATE puzzles SET is_solved = 1, attempts = ? WHERE puzzle_id = ?'
      ).bind(newAttempts, puzzleId).run();

      let reward = null;
      let cardLimitExceeded = false;
      let characterLimitExceeded = false;
      
      if (!user_id) {
        return createSuccessResponse({
          is_correct: true,
          is_solved: true,
          attempts: newAttempts,
          message: 'CORRECT_LOGIN_FOR_REWARD',
          login_required: true,
          reward: null
        });
      }
      
      const chapter = await env.DB.prepare(
        'SELECT * FROM chapters WHERE chapter_id = ?'
      ).bind(puzzle.chapter_id).first();

      if (chapter) {
        const book = await env.DB.prepare(
          'SELECT * FROM books WHERE book_id = ?'
        ).bind(chapter.book_id).first();

        if (book) {
          const rewardType = determineRewardType();
          
          if (rewardType === 'custom_character') {
            const bookLanguage = book.language || 'zh';
            const isCharLimitReached = await checkCharacterLimit(env, book.book_id);
            
            if (isCharLimitReached) {
              characterLimitExceeded = true;
              const existingChars = await getCharacters(env, book.book_id);
              const customChar = generateCustomCharacterDrop(book.type, bookLanguage);
              
              reward = {
                type: 'custom_character',
                character: customChar,
                current_count: await getCharacterCount(env, book.book_id),
                existing_characters: existingChars,
                message: 'CHARACTER_LIMIT_REACHED'
              };
            } else {
              const customChar = generateCustomCharacterDrop(book.type, bookLanguage);
              reward = {
                type: 'custom_character',
                character: customChar,
                message: 'CUSTOM_CHARACTER_TRIGGERED'
              };
            }
          } else if (rewardType === 'custom_plot') {
            const customCard = generateCustomPlotCardDrop();
            const isLimitReached = await checkCardLimit(env, book.book_id, customCard.sub_type);
            
            if (isLimitReached) {
              cardLimitExceeded = true;
              const existingCards = await getCardsByType(env, book.book_id, customCard.sub_type);
              
              reward = {
                type: 'custom_plot',
                card: customCard,
                sub_type: customCard.sub_type,
                current_count: await getCardCountByType(env, book.book_id, customCard.sub_type),
                existing_cards: existingCards,
                message: 'CARD_LIMIT_REACHED'
              };
            } else {
              reward = {
                type: 'custom_plot',
                card: customCard,
                message: 'CUSTOM_PLOT_TRIGGERED'
              };
            }
          } else {
            const bookLanguage = book.language || 'zh';
            const droppedCard = generateCardDrop(book.type, bookLanguage);
            
            if (droppedCard) {
              const isLimitReached = await checkCardLimit(env, book.book_id, droppedCard.sub_type);
              
              if (isLimitReached) {
                cardLimitExceeded = true;
                const existingCards = await getCardsByType(env, book.book_id, droppedCard.sub_type);
                
                reward = {
                  type: 'preset_plot',
                  card: droppedCard,
                  sub_type: droppedCard.sub_type,
                  current_count: await getCardCountByType(env, book.book_id, droppedCard.sub_type),
                  existing_cards: existingCards,
                  message: 'CARD_LIMIT_REACHED',
                  card_name: droppedCard.name
                };
              } else {
                await env.DB.prepare(
                  'INSERT INTO plot_cards (card_id, book_id, type, sub_type, name, icon, description, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
                ).bind(
                  droppedCard.card_id,
                  book.book_id,
                  'plot',
                  droppedCard.sub_type,
                  droppedCard.name,
                  droppedCard.icon,
                  droppedCard.description,
                  droppedCard.is_custom
                ).run();

                reward = {
                  type: 'preset_plot',
                  card: droppedCard,
                  message: 'CARD_REWARD',
                  card_name: droppedCard.name
                };
              }
            }
          }
        }
      }

      return createSuccessResponse({
        is_correct: true,
        is_solved: true,
        attempts: newAttempts,
        message: 'CORRECT_ANSWER',
        reward,
        card_limit_exceeded: cardLimitExceeded,
        character_limit_exceeded: characterLimitExceeded
      });
    } else {
      if (newAttempts >= puzzle.max_attempts) {
        await env.DB.prepare(
          'UPDATE puzzles SET attempts = ? WHERE puzzle_id = ?'
        ).bind(newAttempts, puzzleId).run();

        return createSuccessResponse({
          is_correct: false,
          is_solved: false,
          attempts: newAttempts,
          max_attempts: puzzle.max_attempts,
          message: 'WRONG_ANSWER_MAX_ATTEMPTS'
        });
      }

      await env.DB.prepare(
        'UPDATE puzzles SET attempts = ? WHERE puzzle_id = ?'
      ).bind(newAttempts, puzzleId).run();

      return createSuccessResponse({
        is_correct: false,
        is_solved: false,
        attempts: newAttempts,
        max_attempts: puzzle.max_attempts,
        remaining_attempts: puzzle.max_attempts - newAttempts,
        message: 'WRONG_ANSWER_RETRY',
        remaining: puzzle.max_attempts - newAttempts
      });
    }
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export { generateCardDrop };
