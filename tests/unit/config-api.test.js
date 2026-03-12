import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../config/book-types.json', () => ({
  default: {
    types: [
      { type: 'adventure', name: '儿童冒险', theme_color: '#FFD700', bg_style: '卡通插画' },
      { type: 'fantasy', name: '魔幻传说', theme_color: '#6B21A8', bg_style: '星空/魔法纹理' },
      { type: 'romance', name: '都市言情', theme_color: '#F48FB1', bg_style: '柔和渐变' },
      { type: 'business', name: '职场风云', theme_color: '#1E3A8A', bg_style: '几何图案' }
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
    speech_styles: ['简洁直接', '啰嗦详细', '礼貌客气', '尖酸刻薄', '幽默风趣', '严肃正式', '温柔体贴', '咄咄逼人', '慢条斯理', '快速急促', '诗意文艺', '务实平淡', '夸张生动', '阴阳怪气', '热情奔放', '冷淡疏离', '睿智深沉', '天真单纯', '讽刺挖苦', '抱怨连天', '命令式', '敷衍了事', '油嘴滑舌', '沉默寡言', '爱打断人']
  }
}));

vi.mock('../../config/plot-options.json', () => ({
  default: {
    adventure: {
      weather: Array(20).fill(null).map((_, i) => ({ name: `天气${i+1}`, icon: '☀️', description: `描述${i+1}` })),
      terrain: Array(20).fill(null).map((_, i) => ({ name: `地形${i+1}`, icon: '🌲', description: `描述${i+1}` })),
      adventure: Array(20).fill(null).map((_, i) => ({ name: `冒险${i+1}`, icon: '🗺️', description: `描述${i+1}` })),
      equipment: Array(20).fill(null).map((_, i) => ({ name: `装备${i+1}`, icon: '🔍', description: `描述${i+1}` }))
    },
    fantasy: {
      weather: Array(20).fill(null).map((_, i) => ({ name: `天气${i+1}`, icon: '⚡', description: `描述${i+1}` })),
      terrain: Array(20).fill(null).map((_, i) => ({ name: `地形${i+1}`, icon: '🏰', description: `描述${i+1}` })),
      adventure: Array(20).fill(null).map((_, i) => ({ name: `冒险${i+1}`, icon: '⚔️', description: `描述${i+1}` })),
      equipment: Array(20).fill(null).map((_, i) => ({ name: `装备${i+1}`, icon: '🪄', description: `描述${i+1}` }))
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
      expect(adventure.name).toBe('儿童冒险');
      expect(adventure.theme_color).toBe('#FFD700');
      expect(adventure.bg_style).toBeDefined();
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
      expect(result.data.adventure).toBeDefined();
      expect(result.data.fantasy).toBeDefined();
      expect(result.data.romance).toBeDefined();
      expect(result.data.business).toBeDefined();
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
      expect(result.error).toContain('无效');
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
      
      expect(result.data.personality).toContain('勇敢');
      expect(result.data.personality).toContain('善良');
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
      
      expect(result.data.speech_styles).toContain('简洁直接');
      expect(result.data.speech_styles).toContain('幽默风趣');
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
      expect(result.error).toContain('无效');
    });

    it('should return error for invalid sub_type', async () => {
      const { onRequestGet } = await import('../../functions/api/config/plot-options');
      const context = createMockContext({}, { book_type: 'adventure', sub_type: 'invalid' });
      const response = await onRequestGet(context);
      const result = await response.json();
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('无效');
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
