import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Puzzles API', () => {
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

  describe('GET /api/puzzles/:id - 获取谜题详情', () => {
    it('应该返回谜题详情', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-123',
        chapter_id: 'chapter-123',
        question: '什么东西越洗越脏？',
        answer: '水',
        puzzle_type: 'text',
        attempts: 0,
        is_solved: 0
      });

      const { onRequestGet } = await import('../../functions/api/puzzles/[id].js');
      const request = new Request('http://localhost/api/puzzles/puzzle-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'puzzle-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.puzzle_id).toBe('puzzle-123');
    });

    it('应该返回404对于不存在的谜题', async () => {
      mockDB.first.mockResolvedValueOnce(null);

      const { onRequestGet } = await import('../../functions/api/puzzles/[id].js');
      const request = new Request('http://localhost/api/puzzles/nonexistent', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'nonexistent' } });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/puzzles - 创建谜题', () => {
    it('应该创建新谜题', async () => {
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/puzzles.js');
      const request = new Request('http://localhost/api/puzzles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: 'chapter-123',
          question: '新谜题？',
          answer: '答案',
          puzzle_type: 'text'
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.question).toBe('新谜题？');
    });

    it('应该拒绝缺少必填字段', async () => {
      const { onRequestPost } = await import('../../functions/api/puzzles.js');
      const request = new Request('http://localhost/api/puzzles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
    });
  });

  describe('POST /api/puzzles/:id/solve - 解谜', () => {
    it('应该正确解答谜题', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-123',
        answer: '水',
        attempts: 0,
        max_attempts: 3,
        is_solved: 0
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-123/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '水' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_correct).toBe(true);
    });

    it('应该拒绝错误答案', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-123',
        answer: '水',
        attempts: 0,
        max_attempts: 3,
        is_solved: 0
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-123/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '错误答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_correct).toBe(false);
    });

    it('应该拒绝超过最大尝试次数', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-123',
        answer: '水',
        attempts: 3,
        max_attempts: 3,
        is_solved: 0
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestPost } = await import('../../functions/api/puzzles/[id]/solve.js');
      const request = new Request('http://localhost/api/puzzles/puzzle-123/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: '错误答案' })
      });

      const response = await onRequestPost({ request, env: mockEnv, params: { id: 'puzzle-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.is_correct).toBe(false);
      expect(json.data.message).toBe('WRONG_ANSWER_MAX_ATTEMPTS');
    });
  });

  describe('DELETE /api/puzzles/:id - 删除谜题', () => {
    it('应该删除谜题', async () => {
      mockDB.first.mockResolvedValueOnce({
        puzzle_id: 'puzzle-123',
        question: '测试谜题'
      });
      mockDB.run.mockResolvedValueOnce({ success: true });

      const { onRequestDelete } = await import('../../functions/api/puzzles/[id].js');
      const request = new Request('http://localhost/api/puzzles/puzzle-123', {
        method: 'DELETE'
      });

      const response = await onRequestDelete({ request, env: mockEnv, params: { id: 'puzzle-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
    });
  });
});
