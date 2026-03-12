import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Card Limit and Discard', () => {
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

  describe('DELETE /api/plot-cards/:id - 丢弃卡牌', () => {
    it('应该成功丢弃卡牌', async () => {
      mockDB.first.mockResolvedValueOnce({
        card_id: 'card-1',
        book_id: 'book-1',
        name: '晴天',
        sub_type: 'weather'
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestDelete } = await import('../../functions/api/plot-cards/[id].js');
      const request = new Request('http://localhost/api/plot-cards/card-1', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'card-1' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.card_id).toBe('card-1');
    });

    it('丢弃不存在的卡牌应该返回404', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestDelete } = await import('../../functions/api/plot-cards/[id].js');
      const request = new Request('http://localhost/api/plot-cards/nonexistent', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'nonexistent' } });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });
});
