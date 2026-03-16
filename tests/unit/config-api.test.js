import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../config/book-types.json', () => ({
  default: {
    types: [
      { type: 'adventure', name: '儿童冒险', theme: 'adventure' },
      { type: 'fantasy', name: '魔幻传说', theme: 'fantasy' },
      { type: 'romance', name: '都市言情', theme: 'romance' },
      { type: 'business', name: '职场风云', theme: 'business' }
    ]
  }
}));

vi.mock('../../config/character-types.json', () => ({
  default: {
    adventure: ['小探险家', '小勇士', '小智者', '小动物', '小魔法师', '小发明家', '小侦探', '小船长'],
    fantasy: ['法师', '战士', '游侠', '牧师', '刺客', '德鲁伊', '术士', '圣骑士', '巫师', '盗贼'],
    romance: ['白领', '学生', '艺术家', '医生', '律师', '记者', '设计师', '程序员', '教师', '创业者'],
    business: ['经理', '专员', '创业者', '顾问', '总监', '助理', '销售', '工程师', '分析师', '主管']
  }
}));

vi.mock('../../config/personality.json', () => ({
  default: {
    personality: ['勇敢', '谨慎', '乐观', '悲观', '冷静', '冲动', '善良', '自私', '幽默', '严肃', '温柔', '暴躁', '好奇', '沉稳', '活泼', '懒惰', '外向', '阴险', '随和', '傲慢', '懦弱', '贪婪', '多疑', '偏执', '冷漠']
  }
}));

vi.mock('../../config/speech-style.json', () => ({
  default: {
    speech_styles: ['正式', '随意', '幽默', '严肃', '温柔', '强硬', '礼貌', '直接', '委婉', '热情', '冷淡', '亲切', '疏离', '活泼', '沉稳', '夸张', '低调', '文雅', '粗犷', '细腻', '简洁', '啰嗦', '深沉', '轻快', '神秘']
  }
}));

vi.mock('../../config/plot-options.json', () => ({
  default: {
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
    }
  }
}));

function createMockContext(params = {}, searchParams = {}) {
  const url = new URL('http://localhost/api/config/test');
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return {
    params,
    request: new Request(url),
    env: {},
    next: () => {}
  };
}

describe('Config API', () => {
  describe('Book Types API', () => {
    it('should return all book types', async () => {
      const { onRequestGet } = await import('../../functions/api/config/book-types');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.types).toBeDefined();
      expect(result.data.types.length).toBe(4);
    });

    it('should return book types with correct structure', async () => {
      const { onRequestGet } = await import('../../functions/api/config/book-types');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      const adventure = result.data.types.find(t => t.type === 'adventure');
      expect(adventure.name).toContain('Adventure');
      expect(adventure.theme).toBe('adventure');
      expect(adventure.type).toBeDefined();
    });

    it('should return correct CORS headers on OPTIONS', async () => {
      const { onRequestOptions } = await import('../../functions/api/config/book-types');
      const response = await onRequestOptions();
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });
  });

  describe('Character Types API', () => {
    it('should return all character types when no book_type specified', async () => {
      const { onRequestGet } = await import('../../functions/api/config/character-types');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.character_types).toBeDefined();
      expect(result.data.character_types.adventure).toBeDefined();
      expect(result.data.character_types.fantasy).toBeDefined();
      expect(result.data.character_types.romance).toBeDefined();
      expect(result.data.character_types.business).toBeDefined();
    });

    it('should return character types for specific book_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/character-types');
      const context = createMockContext({}, { book_type: 'adventure' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.book_type).toBe('adventure');
      expect(result.data.character_types).toBeDefined();
      expect(result.data.character_types.length).toBe(8);
    });

    it('should return error for invalid book_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/character-types');
      const context = createMockContext({}, { book_type: 'invalid' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid');
    });
  });

  describe('Personality API', () => {
    it('should return all personality options', async () => {
      const { onRequestGet } = await import('../../functions/api/config/personality');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.personality).toBeDefined();
      expect(result.data.personality.length).toBe(25);
    });

    it('should include common personality traits', async () => {
      const { onRequestGet } = await import('../../functions/api/config/personality');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.data.personality).toContain('Brave');
      expect(result.data.personality).toContain('Kind');
    });
  });

  describe('Speech Style API', () => {
    it('should return all speech style options', async () => {
      const { onRequestGet } = await import('../../functions/api/config/speech-style');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.speech_styles).toBeDefined();
      expect(result.data.speech_styles.length).toBe(25);
    });

    it('should include common speech styles', async () => {
      const { onRequestGet } = await import('../../functions/api/config/speech-style');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.data.speech_styles).toContain('Humorous');
      expect(result.data.speech_styles).toContain('Gentle');
    });
  });

  describe('Plot Options API', () => {
    it('should return all plot options when no parameters specified', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext();
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.adventure).toBeDefined();
      expect(result.data.fantasy).toBeDefined();
    });

    it('should return plot options for specific book_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext({}, { book_type: 'adventure' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.book_type).toBe('adventure');
      expect(result.data.plot_options.weather).toBeDefined();
      expect(result.data.plot_options.terrain).toBeDefined();
    });

    it('should return plot options for specific book_type and sub_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext({}, { book_type: 'adventure', sub_type: 'weather' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(true);
      expect(result.data.book_type).toBe('adventure');
      expect(result.data.sub_type).toBe('weather');
      expect(result.data.options).toBeDefined();
      expect(result.data.options.length).toBe(20);
    });

    it('should return error for invalid book_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext({}, { book_type: 'invalid' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid');
    });

    it('should return error for invalid sub_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext({}, { book_type: 'adventure', sub_type: 'invalid' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid');
    });

    it('should return plot options with correct structure', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext({}, { book_type: 'adventure', sub_type: 'weather' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      const option = result.data.options[0];
      expect(option.name).toBeDefined();
      expect(option.icon).toBeDefined();
      expect(option.description).toBeDefined();
    });
  });
});
