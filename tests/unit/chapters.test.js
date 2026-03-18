import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Chapters API', () => {
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

  describe('GET /api/chapters - 获取章节列表', () => {
    it('应该返回书籍的章节列表', async () => {
      mockDB.all.mockResolvedValueOnce({
        results: [
          { chapter_id: 'chapter-1', title: '第一章', order_num: 1 },
          { chapter_id: 'chapter-2', title: '第二章', order_num: 2 }
        ]
      });

      const { onRequestGet } = await import('../../functions/api/chapters.js');
      const request = new Request('http://localhost/api/chapters?book_id=book-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.length).toBe(2);
    });

    it('应该拒绝缺少book_id参数', async () => {
      const { onRequestGet } = await import('../../functions/api/chapters.js');
      const request = new Request('http://localhost/api/chapters', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('POST /api/chapters - 创建章节', () => {
    it('应该验证必填字段', async () => {
      const { onRequestPost } = await import('../../functions/api/chapters.js');
      
      const request1 = new Request('http://localhost/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const response1 = await onRequestPost({ request: request1, env: mockEnv });
      const json1 = await response1.json();
      expect(json1.success).toBe(false);
    });

    it('应该验证user_id', async () => {
      const { onRequestPost } = await import('../../functions/api/chapters.js');
      const request = new Request('http://localhost/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: 'book-123',
          selected_cards: {
            protagonist_id: 'char-1',
            weather_id: 'card-1',
            terrain_id: 'card-2',
            adventure_id: 'card-3'
          }
        })
      });
      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.error).toBe('PLEASE_LOGIN');
    });

    it('应该验证book_id', async () => {
      const { onRequestPost } = await import('../../functions/api/chapters.js');
      const request = new Request('http://localhost/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user-123',
          selected_cards: {
            protagonist_id: 'char-1',
            weather_id: 'card-1',
            terrain_id: 'card-2',
            adventure_id: 'card-3'
          }
        })
      });
      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.error).toBe('MISSING_BOOK_ID');
    });

    it('应该验证selected_cards', async () => {
      const { onRequestPost } = await import('../../functions/api/chapters.js');
      const request = new Request('http://localhost/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user-123',
          book_id: 'book-123'
        })
      });
      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.error).toBe('PROTAGONIST_REQUIRED');
    });
  });

  describe('GET /api/chapters/:id - 获取章节详情', () => {
    it('应该返回章节详情', async () => {
      mockDB.first.mockResolvedValueOnce({
        chapter_id: 'chapter-123',
        title: '测试章节',
        content: '章节内容',
        order_num: 1,
        book_id: 'book-123',
        selected_cards: null
      });
      mockDB.first.mockResolvedValueOnce(null);
      mockDB.all.mockResolvedValueOnce({ results: [] });
      mockDB.first.mockResolvedValueOnce({ count: 1 });
      mockDB.all.mockResolvedValueOnce({ results: [{ chapter_id: 'chapter-123', order_num: 1 }] });

      const { onRequestGet } = await import('../../functions/api/chapters/[id].js');
      const request = new Request('http://localhost/api/chapters/chapter-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'chapter-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.chapter_id).toBe('chapter-123');
    });

    it('应该返回404对于不存在的章节', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestGet } = await import('../../functions/api/chapters/[id].js');
      const request = new Request('http://localhost/api/chapters/nonexistent', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'nonexistent' } });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/chapters/:id - 更新章节', () => {
    it('应该更新章节内容', async () => {
      mockDB.first.mockResolvedValueOnce({
        chapter_id: 'chapter-123',
        title: '旧标题'
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPut } = await import('../../functions/api/chapters/[id].js');
      const request = new Request('http://localhost/api/chapters/chapter-123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '新标题', content: '新内容' })
      });

      const response = await onRequestPut({ request, env: mockEnv, params: { id: 'chapter-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });
  });

  describe('DELETE /api/chapters/:id - 删除章节', () => {
    it('应该删除章节及关联谜题', async () => {
      mockDB.first.mockResolvedValueOnce({
        chapter_id: 'chapter-123',
        title: '测试章节'
      });
      mockDB.run.mockResolvedValue({ success: true });

      const { onRequestDelete } = await import('../../functions/api/chapters/[id].js');
      const request = new Request('http://localhost/api/chapters/chapter-123', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'chapter-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });
  });
});
