import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Characters API', () => {
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

  describe('GET /api/characters - 获取角色列表', () => {
    it('应该返回书籍的角色列表', async () => {
      mockDB.all.mockResolvedValueOnce({
        results: [
          { char_id: 'char-1', name: '小明', is_protagonist: 1 },
          { char_id: 'char-2', name: '小红', is_protagonist: 0 }
        ]
      });

      const { onRequestGet } = await import('../../functions/api/characters.js');
      const request = new Request('http://localhost/api/characters?book_id=book-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.length).toBe(2);
    });

    it('应该拒绝缺少book_id参数', async () => {
      const { onRequestGet } = await import('../../functions/api/characters.js');
      const request = new Request('http://localhost/api/characters', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('POST /api/characters - 创建角色', () => {
    it('应该创建新角色', async () => {
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/characters.js');
      const request = new Request('http://localhost/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: 'book-123',
          name: '新角色',
          role_type: '主角',
          personality: '勇敢',
          speech_style: '直接',
          avatar: '👦'
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.name).toBe('新角色');
    });

    it('应该拒绝缺少必填字段', async () => {
      const { onRequestPost } = await import('../../functions/api/characters.js');
      const request = new Request('http://localhost/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('GET /api/characters/:id - 获取角色详情', () => {
    it('应该返回角色详情', async () => {
      mockDB.first.mockResolvedValueOnce({
        char_id: 'char-123',
        name: '小明',
        role_type: '主角',
        personality: '勇敢',
        speech_style: '直接',
        avatar: '👦',
        is_protagonist: 1
      });

      const { onRequestGet } = await import('../../functions/api/characters/[id].js');
      const request = new Request('http://localhost/api/characters/char-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'char-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.char_id).toBe('char-123');
    });

    it('应该返回404对于不存在的角色', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestGet } = await import('../../functions/api/characters/[id].js');
      const request = new Request('http://localhost/api/characters/nonexistent', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'nonexistent' } });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/characters/:id - 更新角色', () => {
    it('应该更新角色信息', async () => {
      mockDB.first.mockResolvedValueOnce({
        char_id: 'char-123',
        name: '旧名字'
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPut } = await import('../../functions/api/characters/[id].js');
      const request = new Request('http://localhost/api/characters/char-123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '新名字' })
      });

      const response = await onRequestPut({ request, env: mockEnv, params: { id: 'char-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });
  });

  describe('DELETE /api/characters/:id - 删除角色', () => {
    it('应该删除角色', async () => {
      mockDB.first.mockResolvedValueOnce({
        char_id: 'char-123',
        name: '测试角色'
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestDelete } = await import('../../functions/api/characters/[id].js');
      const request = new Request('http://localhost/api/characters/char-123', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'char-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });
  });
});
