import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(() => Promise.resolve('$2a$10$hashed-password')),
    compare: vi.fn(() => Promise.resolve(true))
  }
}));

describe('Users API', () => {
  let mockEnv;
  let mockDB;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDB = {
      prepare: vi.fn(() => mockDB),
      bind: vi.fn(() => mockDB),
      first: vi.fn(),
      run: vi.fn()
    };
    mockEnv = { DB: mockDB };
  });

  describe('POST /api/users - 注册/登录', () => {
    it('应该创建新用户', async () => {
      mockDB.first.mockResolvedValueOnce(null);
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: '123456' })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.email).toBe('test@example.com');
      expect(json.data.is_new_user).toBe(true);
    });

    it('应该登录已有用户', async () => {
      mockDB.first.mockResolvedValueOnce({
        user_id: 'existing-user-123',
        email: 'test@example.com',
        password: '$2a$10$test-hashed-password',
        created_at: '2026-03-11T00:00:00Z'
      });

      const { onRequestPost } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: '123456' })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_new_user).toBe(false);
    });

    it('应该拒绝无效邮箱格式', async () => {
      const { onRequestPost } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'invalid-email', password: '123456' })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(json.error).toContain('邮箱');
    });

    it('应该拒绝密码长度不足', async () => {
      const { onRequestPost } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: '12345' })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(json.error).toContain('密码');
    });

    it('应该拒绝空邮箱和密码', async () => {
      const { onRequestPost } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('GET /api/users - 获取用户信息', () => {
    it('应该返回用户信息', async () => {
      mockDB.first.mockResolvedValueOnce({
        user_id: 'user-123',
        email: 'test@example.com',
        created_at: '2026-03-11T00:00:00Z'
      });
      mockDB.first.mockResolvedValueOnce({ count: 5 });

      const { onRequestGet } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users?user_id=user-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.user_id).toBe('user-123');
      expect(json.data.email).toBe('test@example.com');
    });

    it('应该拒绝缺少user_id参数', async () => {
      const { onRequestGet } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });

    it('应该返回404对于不存在的用户', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestGet } = await import('../../functions/api/users.js');
      const request = new Request('http://localhost/api/users?user_id=nonexistent', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('OPTIONS /api/users', () => {
    it('应该返回CORS头', async () => {
      const { onRequestOptions } = await import('../../functions/api/users.js');
      const response = await onRequestOptions();

      expect(response.status).toBe(204);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });
  });
});
