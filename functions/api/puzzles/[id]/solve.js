import { createSuccessResponse, createErrorResponse, generateId } from '../../utils.js';

const CARD_LIMIT_PER_TYPE = 8;
const CHARACTER_LIMIT = 8;
const CUSTOM_DROP_CHANCE = 0.30;
const CHARACTER_DROP_RATIO = 0.40;

const plotOptions = {
  adventure: {
    weather: ['晴天', '阴天', '小雨', '大雨', '雷雨', '大风', '雾天', '雪天', '沙尘暴', '彩虹', '朝霞', '晚霞', '星空', '月夜', '烈日', '微风', '暴雨', '冰雹', '龙卷风', '台风'],
    terrain: ['森林', '山脉', '河流', '湖泊', '沙漠', '草原', '峡谷', '洞穴', '瀑布', '冰川', '火山', '海滩', '沼泽', '高原', '盆地', '丘陵', '平原', '岛屿', '暗礁', '悬崖'],
    adventure: ['寻宝', '探险', '救援', '解谜', '追逐', '生存', '发现', '挑战', '比赛', '旅行', '考古', '观察', '收集', '建造', '训练', '竞技', '狩猎', '钓鱼', '摄影', '记录'],
    equipment: ['地图', '指南针', '绳索', '手电筒', '望远镜', '背包', '水壶', '急救包', '帐篷', '睡袋', '刀具', '火柴', '食物', '雨衣', '登山鞋', '帽子', '太阳镜', '防晒霜', '驱虫剂', '相机']
  },
  fantasy: {
    weather: ['魔法风暴', '星光雨', '彩虹云', '月光雾', '火焰雨', '冰霜雪', '雷电云', '水晶雨', '暗影雾', '圣光普照', '龙息风', '精灵之雨', '魔力波动', '时空裂隙', '元素风暴', '魔法极光', '咒语回响', '魔法涟漪', '能量涌动', '法力潮汐'],
    terrain: ['魔法森林', '龙之谷', '精灵王国', '矮人矿坑', '巫师塔', '魔法学院', '神秘岛屿', '地下城', '仙境', '魔幻山脉', '水晶洞穴', '魔法湖泊', '幻境森林', '龙巢', '魔法花园', '神秘遗迹', '魔法沼泽', '幻影城堡', '魔法平原', '元素圣地'],
    adventure: ['魔法试炼', '龙之挑战', '精灵任务', '巫师对决', '魔法收集', '神秘探索', '魔法解谜', '元素召唤', '咒语学习', '魔法比赛', '龙骑士训练', '精灵舞蹈', '魔法炼金', '咒语创造', '魔法防御', '神秘预言', '魔法传送', '元素融合', '魔法契约', '命运抉择'],
    equipment: ['魔法杖', '魔法书', '魔法宝石', '魔法斗篷', '魔法戒指', '魔法药水', '魔法卷轴', '魔法水晶', '魔法护符', '魔法盾牌', '魔法剑', '魔法弓', '魔法飞毯', '魔法灯笼', '魔法罗盘', '魔法沙漏', '魔法镜子', '魔法钥匙', '魔法羽毛笔', '魔法墨水']
  },
  romance: {
    weather: ['阳光明媚', '细雨绵绵', '微风轻拂', '晚霞满天', '星光璀璨', '月色朦胧', '春暖花开', '秋高气爽', '冬日暖阳', '夏日清风', '彩虹初现', '晨曦微露', '夕阳西下', '烟雨朦胧', '晴空万里', '云淡风轻', '春雨如丝', '秋风送爽', '冬日飘雪', '夏日炎炎'],
    terrain: ['咖啡馆', '书店', '公园', '海滩', '山顶', '古镇', '艺术馆', '音乐厅', '花园', '湖畔', '城市街道', '乡村小路', '屋顶花园', '图书馆', '电影院', '餐厅', '酒吧', '健身房', '瑜伽馆', '温泉'],
    adventure: ['偶遇', '约会', '告白', '旅行', '庆祝', '惊喜', '回忆', '成长', '梦想', '挑战', '误会', '和解', '重逢', '离别', '相聚', '陪伴', '理解', '支持', '鼓励', '守护'],
    equipment: ['鲜花', '礼物', '情书', '照片', '纪念品', '日记本', '音乐盒', '项链', '戒指', '手表', '香水', '巧克力', '蛋糕', '红酒', '蜡烛', '气球', '彩带', '贺卡', '相册', '视频']
  },
  business: {
    weather: ['市场繁荣', '经济低迷', '政策利好', '行业变革', '技术革新', '竞争激烈', '合作共赢', '投资热潮', '风险预警', '机遇降临', '市场波动', '政策调整', '行业洗牌', '技术突破', '竞争升级', '合作深化', '投资回报', '风险控制', '机遇把握', '趋势预测'],
    terrain: ['办公室', '会议室', '商务中心', '创业园区', '投资机构', '行业展会', '商务酒店', '高尔夫球场', '私人会所', '商务餐厅', '联合办公', '孵化器', '加速器', '产业园区', '商务大厦', '金融中心', '科技园区', '创新中心', '商务学院', '企业总部'],
    adventure: ['项目启动', '商务谈判', '团队建设', '市场拓展', '产品发布', '融资路演', '战略规划', '危机处理', '人才招聘', '业绩突破', '品牌推广', '客户开发', '合作洽谈', '投资决策', '风险管控', '创新研发', '流程优化', '成本控制', '质量管理', '绩效提升'],
    equipment: ['笔记本电脑', '投影仪', '白板', '名片', '文件夹', '签字笔', '会议记录本', '商务手机', '平板电脑', '打印机', '扫描仪', '碎纸机', '保险箱', '档案柜', '办公桌椅', '会议桌', '茶水间', '休息区', '前台', '接待区']
  }
};

const cardIcons = {
  weather: '☀️',
  terrain: '🏔️',
  adventure: '🗺️',
  equipment: '🎒'
};

const avatarEmojis = [
  '👦', '👧', '👨', '👩', '👴', '👵', '🧑', '👱', '👨‍🦰', '👩‍🦰',
  '👨‍🦱', '👩‍🦱', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲', '🧔', '🧓', '🧑‍🦰', '🧑‍🦱'
];

const characterTypes = {
  adventure: ['探险家', '向导', '船长', '考古学家', '摄影师', '动物学家', '植物学家', '地质学家'],
  fantasy: ['魔法师', '骑士', '精灵', '矮人', '龙骑士', '巫师', '游侠', '吟游诗人'],
  romance: ['企业家', '医生', '律师', '艺术家', '作家', '设计师', '建筑师', '音乐家'],
  business: ['CEO', '经理', '创业者', '投资人', '顾问', '分析师', '工程师', '设计师']
};

const personalities = ['勇敢', '谨慎', '乐观', '悲观', '幽默', '严肃', '热情', '冷漠', '聪明', '单纯', '善良', '狡猾', '忠诚', '叛逆', '温柔', '坚强'];

const speechStyles = ['简洁直接', '幽默风趣', '文雅礼貌', '粗犷豪放', '温柔细腻', '神秘莫测', '活泼开朗', '沉稳内敛'];

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

function generateCardDrop(bookType) {
  const options = plotOptions[bookType];
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
    name: randomCard,
    icon: cardIcons[selectedSubType],
    description: `${selectedSubType}类型卡牌`,
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

function generateCustomCharacterDrop(bookType) {
  const types = characterTypes[bookType] || characterTypes.adventure;
  
  return {
    char_id: generateId(),
    avatar: getRandomElement(avatarEmojis),
    role_type: getRandomElement(types),
    personality: getRandomElement(personalities),
    speech_style: getRandomElement(speechStyles),
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
            const isCharLimitReached = await checkCharacterLimit(env, book.book_id);
            
            if (isCharLimitReached) {
              characterLimitExceeded = true;
              const existingChars = await getCharacters(env, book.book_id);
              const customChar = generateCustomCharacterDrop(book.type);
              
              reward = {
                type: 'custom_character',
                character: customChar,
                current_count: await getCharacterCount(env, book.book_id),
                existing_characters: existingChars,
                message: 'CHARACTER_LIMIT_REACHED'
              };
            } else {
              const customChar = generateCustomCharacterDrop(book.type);
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
            const droppedCard = generateCardDrop(book.type);
            
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
