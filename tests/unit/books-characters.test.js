import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Books API with Characters', () => {
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

  describe('POST /api/books - 创建书籍并创建角色', () => {
    it('应该创建书籍时创建主角', async () => {
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
            avatar: '👦',
            personality: '勇敢',
            speech_style: '简洁直接',
            role_type: '小探险家'
          }
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.book_id).toBeDefined();
      expect(json.data.protagonist).toBeDefined();
      expect(json.data.protagonist.name).toBe('小明');
      expect(json.data.protagonist.is_protagonist).toBe(1);
    });

    it('应该创建书籍时创建配角', async () => {
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
            avatar: '👦',
            personality: '勇敢',
            speech_style: '简洁直接',
            character_type: '小探险家'
          },
          supporting_characters: [
            {
              name: '小红',
              avatar: '👧',
              personality: '善良',
              speech_style: '温柔体贴',
              character_type: '小智者'
            },
            {
              name: '小刚',
              avatar: '🧑',
              personality: '幽默',
              speech_style: '幽默风趣',
              character_type: '小勇士'
            }
          ]
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.supporting_characters).toBeDefined();
      expect(json.data.supporting_characters.length).toBe(2);
    });

    it('应该限制配角最多3个', async () => {
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
          },
          supporting_characters: [
            { name: '小红' },
            { name: '小刚' },
            { name: '小华' },
            { name: '小李' }
          ]
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(json.error).toContain('配角最多3个');
    });

    it('应该拒绝缺少主角信息', async () => {
      const { onRequestPost } = await import('../../functions/api/books.js');
      const request = new Request('http://localhost/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: 'user-123', 
          title: '我的新书', 
          type: 'adventure'
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(false);
      expect(json.error).toContain('主角');
    });

    it('应该为主角设置初始亲密度为0', async () => {
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
      expect(json.data.protagonist.intimacy).toBe(0);
    });

    it('应该为配角设置初始亲密度为50', async () => {
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
          },
          supporting_characters: [
            { name: '小红', avatar: '👧' }
          ]
        })
      });

      const response = await onRequestPost({ request, env: mockEnv });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.supporting_characters[0].intimacy).toBe(50);
    });
  });

  describe('GET /api/books/:id - 获取书籍详情（包含角色列表）', () => {
    it('应该返回书籍详情包含角色列表', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-123',
        title: '测试书籍',
        type: 'adventure',
        user_id: 'user-123',
        is_preset: 0
      });
      mockDB.all.mockResolvedValueOnce({
        results: [
          { char_id: 'char-1', name: '小明', is_protagonist: 1 },
          { char_id: 'char-2', name: '小红', is_protagonist: 0 }
        ]
      });
      mockDB.all.mockResolvedValueOnce({ results: [] });

      const { onRequestGet } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/book-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'book-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.characters).toBeDefined();
      expect(json.data.characters.length).toBe(2);
    });

    it('应该返回书籍详情包含章节列表', async () => {
      mockDB.first.mockResolvedValueOnce({
        book_id: 'book-123',
        title: '测试书籍',
        type: 'adventure',
        user_id: 'user-123',
        is_preset: 0
      });
      mockDB.all.mockResolvedValueOnce({ results: [] });
      mockDB.all.mockResolvedValueOnce({
        results: [
          { chapter_id: 'chap-1', title: '第一章', order_num: 1 },
          { chapter_id: 'chap-2', title: '第二章', order_num: 2 }
        ]
      });

      const { onRequestGet } = await import('../../functions/api/books/[id].js');
      const request = new Request('http://localhost/api/books/book-123', {
        method: 'GET'
      });

      const response = await onRequestGet({ request, env: mockEnv, params: { id: 'book-123' } });
      const json = await response.json();

      expect(json.success).toBe(true);
      expect(json.data.chapters).toBeDefined();
      expect(json.data.chapters.length).toBe(2);
    });
  });
});
