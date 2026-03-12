import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile } from 'fs/promises';

vi.mock('fs/promises', () => ({
  readFile: vi.fn()
}));

const mockPlotOptions = {
  adventure: {
    weather: [
      { name: '晴天', icon: '☀️', description: '阳光明媚的好天气' },
      { name: '彩虹天', icon: '🌈', description: '美丽的彩虹' }
    ],
    terrain: [
      { name: '森林', icon: '🌲', description: '神秘的森林' },
      { name: '草原', icon: '🌿', description: '广阔的草原' }
    ],
    adventure: [
      { name: '寻宝', icon: '🗺️', description: '寻找隐藏的宝藏' },
      { name: '探险', icon: '🧭', description: '探索未知的地方' }
    ],
    equipment: [
      { name: '放大镜', icon: '🔍', description: '观察细节的工具' },
      { name: '指南针', icon: '🧭', description: '辨别方向' }
    ]
  }
};

describe('Card Drop System', () => {
  let mockEnv;
  let mockDB;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDB = {
      prepare: vi.fn(() => mockDB),
      bind: vi.fn(() => mockDB),
      first: vi.fn(),
      all: vi.fn(),
      run: vi.fn()
    };
    mockEnv = { DB: mockDB };
  });

  describe('POST /api/puzzles/:id/solve - 解谜成功后掉落卡牌', () => {
    it('解谜成功应该返回正确响应', async () => {
      readFile.mockResolvedValue(JSON.stringify(mockPlotOptions));
      
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-1',
        chapter_id: 'chapter-1',
        answer: '答案',
        is_solved: 0,
        attempts: 0,
        max_attempts: 3
      });
      mockDB.run.mockResolvedValue({ success: true });
      mockDB.first.mockResolvedValueOnce({
        chapter_id: 'chapter-1',
        book_id: 'book-1'
      });
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-1',
        type: 'adventure'
      });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-1/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-1' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_correct).toBe(true);
    });

    it('解谜成功应该掉落卡牌奖励', async () => {
      readFile.mockResolvedValue(JSON.stringify(mockPlotOptions));
      
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-1',
        chapter_id: 'chapter-1',
        answer: '答案',
        is_solved: 0,
        attempts: 0,
        max_attempts: 3
      });
      mockDB.run.mockResolvedValue({ success: true });
      mockDB.first.mockResolvedValueOnce({
        chapter_id: 'chapter-1',
        book_id: 'book-1'
      });
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-1',
        type: 'adventure'
      });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-1/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-1' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.reward).toBeDefined();
      expect(json.data.reward.card).toBeDefined();
      expect(['weather', 'terrain', 'adventure', 'equipment']).toContain(json.data.reward.card.sub_type);
    });

    it('已解开的谜题不应该再掉落卡牌', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-1',
        chapter_id: 'chapter-1',
        answer: '答案',
        is_solved: 1,
        attempts: 1,
        max_attempts: 3
      });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-1/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-1' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_solved).toBe(true);
      expect(json.data.reward).toBeUndefined();
    });

    it('解谜失败不应该掉落卡牌', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-1',
        chapter_id: 'chapter-1',
        answer: '正确答案',
        is_solved: 0,
        attempts: 0,
        max_attempts: 3
      });
      mockDB.run.mockResolvedValue({ success: true });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-1/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '错误答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-1' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_correct).toBe(false);
      expect(json.data.reward).toBeUndefined();
    });

    it('掉落的卡牌应该有正确的结构', async () => {
      readFile.mockResolvedValue(JSON.stringify(mockPlotOptions));
      
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-1',
        chapter_id: 'chapter-1',
        answer: '答案',
        is_solved: 0,
        attempts: 0,
        max_attempts: 3
      });
      mockDB.run.mockResolvedValue({ success: true });
      mockDB.first.mockResolvedValueOnce({
        chapter_id: 'chapter-1',
        book_id: 'book-1'
      });
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-1',
        type: 'adventure'
      });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-1/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-1' } });
      const json = await response.json();

      if (json.data.reward && json.data.reward.card) {
        const card = json.data.reward.card;
        expect(card.card_id).toBeDefined();
        expect(card.sub_type).toBeDefined();
        expect(card.name).toBeDefined();
        expect(card.icon).toBeDefined();
        expect(card.description).toBeDefined();
      }
    });
  });

  describe('generateCardDrop function', () => {
    it('应该生成有效的卡牌', async () => {
      readFile.mockResolvedValue(JSON.stringify(mockPlotOptions));
      
      const { generateCardDrop } = await import('../../functions/api/puzzles/[id]/solve.js');
      const card = await generateCardDrop('adventure');

      expect(card).toBeDefined();
      expect(card.card_id).toBeDefined();
      expect(card.card_id).toMatch(/^id-/);
      expect(['weather', 'terrain', 'adventure', 'equipment']).toContain(card.sub_type);
    });

    it('无效书籍类型应该返回null', async () => {
      readFile.mockResolvedValue(JSON.stringify(mockPlotOptions));
      
      const { generateCardDrop } = await import('../../functions/api/puzzles/[id]/solve.js');
      const card = await generateCardDrop('invalid_type');

      expect(card).toBeNull();
    });
  });
});
