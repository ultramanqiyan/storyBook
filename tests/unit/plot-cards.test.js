import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Plot Cards API', () => {
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

  describe('GET /api/plot-cards - 获取卡牌列表', () => {
    it('应该返回书籍的卡牌列表', async () => {
      mockDB.all.mockResolvedValueOnce({
        results: [
          { card_id: 'card-1', name: '晴天', type: 'plot', sub_type: 'weather' },
          { card_id: 'card-2', name: '森林', type: 'plot', sub_type: 'terrain' }
        ]
      });

      const { onRequestGet } = await import('../../functions/api/plot-cards.js');
      const request = new Request('http://localhost/api/plot-cards?book_id=book-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.length).toBe(2);
    });

    it('应该拒绝缺少book_id参数', async () => {
      const { onRequestGet } = await import('../../functions/api/plot-cards.js');
      const request = new Request('http://localhost/api/plot-cards', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('POST /api/plot-cards - 创建卡牌', () => {
    it('应该创建新卡牌', async () => {
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/plot-cards.js');
      const request = new Request('http://localhost/api/plot-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: 'book-123',
          type: 'plot',
          sub_type: 'weather',
          name: '暴风雨',
          icon: '⛈️',
          description: '狂风暴雨的天气'
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.name).toBe('暴风雨');
    });

    it('应该拒绝缺少必填字段', async () => {
      const { onRequestPost } = await import('../../functions/api/plot-cards.js');
      const request = new Request('http://localhost/api/plot-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('GET /api/plot-cards/:id - 获取卡牌详情', () => {
    it('应该返回卡牌详情', async () => {
      mockDB.first.mockResolvedValueOnce({
        card_id: 'card-123',
        name: '晴天',
        type: 'plot',
        sub_type: 'weather',
        icon: '☀️',
        description: '阳光明媚'
      });

      const { onRequestGet } = await import('../../functions/api/plot-cards/[id].js');
      const request = new Request('http://localhost/api/plot-cards/card-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'card-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.card_id).toBe('card-123');
    });

    it('应该返回404对于不存在的卡牌', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestGet } = await import('../../functions/api/plot-cards/[id].js');
      const request = new Request('http://localhost/api/plot-cards/nonexistent', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'nonexistent' } });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/plot-cards/:id - 删除卡牌', () => {
    it('应该删除卡牌', async () => {
      mockDB.first.mockResolvedValueOnce({
        card_id: 'card-123',
        name: '测试卡牌'
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestDelete } = await import('../../functions/api/plot-cards/[id].js');
      const request = new Request('http://localhost/api/plot-cards/card-123', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'card-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });
  });
});
