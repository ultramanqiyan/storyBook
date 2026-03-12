import { createSuccessResponse, createErrorResponse, generateId } from '../../utils.js';

const CARD_LIMIT_PER_TYPE = 8;

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

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function checkCardLimit(env, bookId, subType) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
  ).bind(bookId, subType).first();
  
  return result.count >= CARD_LIMIT_PER_TYPE;
}

async function getCardCountByType(env, bookId, subType) {
  const result = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM plot_cards WHERE book_id = ? AND sub_type = ?'
  ).bind(bookId, subType).first();
  
  return result.count;
}

async function getCardsByType(env, bookId, subType) {
  const results = await env.DB.prepare(
    'SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ? ORDER BY created_at ASC'
  ).bind(bookId, subType).all();
  
  return results.results;
}

function generateCardDrop(bookType) {
  const options = plotOptions[bookType];
  if (!options) {
    return null;
  }

  const subTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  const randomSubType = getRandomElement(subTypes);
  
  const cardPool = options[randomSubType];
  if (!cardPool || cardPool.length === 0) {
    return null;
  }

  const randomCard = getRandomElement(cardPool);
  
  return {
    card_id: generateId(),
    sub_type: randomSubType,
    name: randomCard,
    icon: cardIcons[randomSubType],
    description: `${randomSubType}类型卡牌`,
    is_custom: 0
  };
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
      return createErrorResponse('谜题不存在', 404);
    }

    if (puzzle.is_solved === 1) {
      return createSuccessResponse({
        is_correct: true,
        is_solved: true,
        message: '谜题已经解开了'
      });
    }

    if (!answer) {
      return createErrorResponse('请提供答案');
    }

    const isCorrect = puzzle.answer.toLowerCase().trim() === answer.toLowerCase().trim();
    const newAttempts = puzzle.attempts + 1;

    if (isCorrect) {
      await env.DB.prepare(
        'UPDATE puzzles SET is_solved = 1, attempts = ? WHERE puzzle_id = ?'
      ).bind(newAttempts, puzzleId).run();

      let reward = null;
      let cardLimitExceeded = false;
      let exceededCards = [];
      let loginRequired = false;
      
      if (!user_id) {
        loginRequired = true;
        return createSuccessResponse({
          is_correct: true,
          is_solved: true,
          attempts: newAttempts,
          message: '恭喜！答案正确！登录后可以获得卡牌奖励哦~',
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
          const droppedCard = generateCardDrop(book.type);
          
          if (droppedCard) {
            const isLimitReached = await checkCardLimit(env, book.book_id, droppedCard.sub_type);
            
            if (isLimitReached) {
              cardLimitExceeded = true;
              exceededCards = await getCardsByType(env, book.book_id, droppedCard.sub_type);
              reward = {
                card: droppedCard,
                sub_type: droppedCard.sub_type,
                current_count: await getCardCountByType(env, book.book_id, droppedCard.sub_type),
                existing_cards: exceededCards,
                message: `恭喜获得卡牌【${droppedCard.name}】！但该类型卡牌已达上限（8张），请选择丢弃一张。`
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
                card: droppedCard,
                message: `恭喜获得卡牌【${droppedCard.name}】！`
              };
            }
          }
        }
      }

      return createSuccessResponse({
        is_correct: true,
        is_solved: true,
        attempts: newAttempts,
        message: '恭喜！答案正确！',
        reward,
        card_limit_exceeded: cardLimitExceeded
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
          message: '答案错误，已达到最大尝试次数'
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
        message: `答案错误，还有 ${puzzle.max_attempts - newAttempts} 次机会`
      });
    }
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export { generateCardDrop };
