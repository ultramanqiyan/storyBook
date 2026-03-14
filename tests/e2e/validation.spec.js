import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('字段验证', () => {
  let db;
  let testUserId;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
    db.createTestUser();
    testUserId = db.getTestUserId();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test.describe('书籍名称验证', () => {
    test('书籍名称为空应失败', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('书籍名称超过50字符当前API允许', async ({ request }) => {
      const longTitle = 'a'.repeat(51);
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: longTitle,
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });

    test('书籍名称正好50字符应成功', async ({ request }) => {
      const maxTitle = 'a'.repeat(50);
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: maxTitle,
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });
  });

  test.describe('主角名称验证', () => {
    test('主角名称为空应失败', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '测试书籍',
          type: 'adventure',
          protagonist: {
            name: '',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('主角名称超过20字符当前API允许', async ({ request }) => {
      const longName = 'a'.repeat(21);
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '测试书籍',
          type: 'adventure',
          protagonist: {
            name: longName,
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });

    test('主角名称正好20字符应成功', async ({ request }) => {
      const maxName = 'a'.repeat(20);
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '测试书籍',
          type: 'adventure',
          protagonist: {
            name: maxName,
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });
  });

  test.describe('书籍类型验证', () => {
    test('书籍类型为空应失败', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '测试书籍',
          type: '',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('无效书籍类型应失败', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '测试书籍',
          type: 'invalid_type',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('有效书籍类型应成功', async ({ request }) => {
      const validTypes = ['adventure', 'fantasy', 'romance', 'business'];
      
      for (const type of validTypes) {
        const response = await request.post('/api/books', {
          data: {
            user_id: testUserId,
            title: `测试书籍-${type}`,
            type: type,
            protagonist: {
              name: '主角',
              avatar: '🧙‍♂️',
              role_type: 'protagonist',
              is_protagonist: 1
            },
            supporting_characters: []
          }
        });

        const result = await response.json();
        expect(result.success).toBe(true);
      }
    });
  });

  test.describe('亲密度范围验证', () => {
    test('亲密度超出范围当前API允许', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '亲密度测试',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: [
            {
              name: '配角',
              avatar: '🧝',
              role_type: '精灵',
              intimacy: 200,
              is_protagonist: 0
            }
          ]
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });

    test('亲密度低于范围当前API允许', async ({ request }) => {
      const response = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '亲密度测试',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: [
            {
              name: '配角',
              avatar: '🧝',
              role_type: '精灵',
              intimacy: -200,
              is_protagonist: 0
            }
          ]
        }
      });

      const result = await response.json();
      expect(result.success).toBe(true);
    });
  });

  test.describe('用户注册验证', () => {
    test('邮箱为空应失败', async ({ request }) => {
      const response = await request.post('/api/users', {
        data: {
          email: '',
          password: 'password123'
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('密码为空应失败', async ({ request }) => {
      const response = await request.post('/api/users', {
        data: {
          email: 'test-validation@example.com',
          password: ''
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('无效邮箱格式应失败', async ({ request }) => {
      const response = await request.post('/api/users', {
        data: {
          email: 'invalid-email',
          password: 'password123'
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('密码过短应失败', async ({ request }) => {
      const response = await request.post('/api/users', {
        data: {
          email: 'short-password@example.com',
          password: '123'
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });
  });

  test.describe('卡牌名称验证', () => {
    test.beforeEach(async ({ request }) => {
      const bookResponse = await request.post('/api/books', {
        data: {
          user_id: testUserId,
          title: '卡牌验证测试书籍',
          type: 'adventure',
          protagonist: {
            name: '主角',
            avatar: '🧙‍♂️',
            role_type: 'protagonist',
            is_protagonist: 1
          },
          supporting_characters: []
        }
      });
      const bookData = await bookResponse.json();
      test.__bookId = bookData.data.book_id;
    });

    test('卡牌名称为空应失败', async ({ request }) => {
      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: test.__bookId,
          user_id: testUserId,
          name: '',
          icon: '🎴',
          description: '测试',
          sub_type: 'weather'
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });

    test('卡牌名称过长当前API拒绝', async ({ request }) => {
      const longName = 'a'.repeat(51);
      const response = await request.post('/api/custom-cards/plot-cards', {
        data: {
          book_id: test.__bookId,
          user_id: testUserId,
          name: longName,
          icon: '🎴',
          description: '测试',
          sub_type: 'weather'
        }
      });

      const result = await response.json();
      expect(result.success).toBe(false);
    });
  });
});
