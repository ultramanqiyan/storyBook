import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Books API', () => {
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

  describe('GET /api/books - 获取书籍列表', () => {
    it('应该返回用户的书籍列表（包括预设书籍）', async () => {
      mockDB.all.mockResolvedValueOnce({
        results: [
          { book_id: 'book-1', title: '我的书', is_preset: 0 },
          { book_id: 'preset-1', title: '预设书', is_preset: 1 }
        ]
      });

      const { onRequestGet } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books?user_id=user-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.length).toBe(2);
    });

    it('应该拒绝缺少user_id参数', async () => {
      const { onRequestGet } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('GET /api/books/preset - 获取预设书籍', () => {
    it('应该返回所有预设书籍', async () => {
      mockDB.all.mockResolvedValueOnce({
        results: [
          { book_id: 'preset-adventure-001', title: '小明的奇幻冒险', is_preset: 1 },
          { book_id: 'preset-fantasy-001', title: '魔法学院传说', is_preset: 1 }
        ]
      });

      const { onRequestGet } = await import('../../functions/api/books/preset.js');
      const request = new Request('http://localhost/api/books/preset', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.length).toBe(2);
    });
  });

  describe('POST /api/books - 创建书籍', () => {
    it('应该创建新书籍（包含主角）', async () => {
      mockDB.run.mockResolvedValue({ success: true });

      const { onRequestPost } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: 'user-123', 
          title: '我的新书', 
          type: 'adventure',
          protagonist: {
            name: '小明',
            avatar: '👦'
          }
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.title).toBe('我的新书');
      expect(json.data.protagonist).toBeDefined();
      expect(json.data.protagonist.name).toBe('小明');
    });

    it('应该拒绝无效的书籍类型', async () => {
      const { onRequestPost } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: 'user-123', 
          title: '我的书', 
          type: 'invalid-type',
          protagonist: { name: '小明' }
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });

    it('应该拒绝缺少必填字段', async () => {
      const { onRequestPost } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });

    it('应该拒绝缺少主角信息', async () => {
      const { onRequestPost } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: 'user-123', 
          title: '我的书', 
          type: 'adventure'
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(json.error).toContain('PROTAGONIST_REQUIRED');
    });
  });

  describe('GET /api/books/:id - 获取书籍详情', () => {
    it('应该返回书籍详情（包含角色和章节）', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-123',
        title: '测试书籍',
        type: 'adventure',
        user_id: 'user-123',
        is_preset: 0
      });
      mockDB.all.mockResolvedValueOnce({
        results: [{ char_id: 'char-1', name: '小明' }]
      });
      mockDB.all.mockResolvedValueOnce({
        results: [{ chapter_id: 'chap-1', title: '第一章' }]
      });

      const { onRequestGet } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/book-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'book-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.book_id).toBe('book-123');
      expect(json.data.characters).toBeDefined();
      expect(json.data.chapters).toBeDefined();
    });

    it('应该返回404对于不存在的书籍', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestGet } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/nonexistent', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'nonexistent' } });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/books/:id - 更新书籍', () => {
    it('应该更新书籍标题', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-123',
        title: '旧标题',
        type: 'adventure',
        user_id: 'user-123',
        is_preset: 0
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPut } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/book-123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '新标题' })
      });

      const response = await onRequestPut({ request, env: mockEnv, params: { id: 'book-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });

    it('应该拒绝修改预设书籍', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'preset-123',
        title: '预设书',
        is_preset: 1
      });

      const { onRequestPut } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/preset-123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '新标题' })
      });

      const response = await onRequestPut({ request, env: mockEnv, params: { id: 'preset-123' } });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('DELETE /api/books/:id - 删除书籍', () => {
    it('应该删除书籍及其关联数据', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-123',
        title: '测试书籍',
        user_id: 'user-123',
        is_preset: 0
      });
      mockDB.run.mockResolvedValue({ success: true });

      const { onRequestDelete } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/book-123', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'book-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });

    it('应该拒绝删除预设书籍', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'preset-123',
        is_preset: 1
      });

      const { onRequestDelete } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/preset-123', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'preset-123' } });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });
});
