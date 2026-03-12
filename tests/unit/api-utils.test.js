import { describe, it, expect } from 'vitest';

describe('API Utils', () => {
  describe('createSuccessResponse', () => {
    it('应该创建正确格式的成功响应', async () => {
      const { createSuccessResponse } = await import('../../functions/api/utils.js');
      const data = { id: '123', name: 'test' };
      const response = createSuccessResponse(data);
      const json = await response.json();
      
      expect(json.success).toBe(true);
      expect(json.data).toEqual(data);
      expect(json.error).toBeNull();
    });

    it('应该设置正确的Content-Type头', async () => {
      const { createSuccessResponse } = await import('../../functions/api/utils.js');
      const response = createSuccessResponse({});
      
      expect(response.headers.get('Content-Type')).toBe('application/json');
    });

    it('应该设置CORS头', async () => {
      const { createSuccessResponse } = await import('../../functions/api/utils.js');
      const response = createSuccessResponse({});
      
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });
  });

  describe('createErrorResponse', () => {
    it('应该创建正确格式的错误响应', async () => {
      const { createErrorResponse } = await import('../../functions/api/utils.js');
      const response = createErrorResponse('Test error', 400);
      const json = await response.json();
      
      expect(json.success).toBe(false);
      expect(json.data).toBeNull();
      expect(json.error).toBe('Test error');
      expect(response.status).toBe(400);
    });

    it('应该默认状态码为400', async () => {
      const { createErrorResponse } = await import('../../functions/api/utils.js');
      const response = createErrorResponse('Error');
      
      expect(response.status).toBe(400);
    });
  });

  describe('generateId', () => {
    it('应该生成唯一ID', async () => {
      const { generateId } = await import('../../functions/api/utils.js');
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).not.toBe(id2);
    });

    it('应该生成以"id-"开头的ID', async () => {
      const { generateId } = await import('../../functions/api/utils.js');
      const id = generateId();
      
      expect(id.startsWith('id-')).toBe(true);
    });

    it('应该生成足够长度的ID', async () => {
      const { generateId } = await import('../../functions/api/utils.js');
      const id = generateId();
      
      expect(id.length).toBeGreaterThan(10);
    });
  });

  describe('validateEmail', () => {
    it('应该正确验证有效邮箱', async () => {
      const { validateEmail } = await import('../../functions/api/utils.js');
      
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co')).toBe(true);
      expect(validateEmail('test123@test.org')).toBe(true);
    });
    
    it('应该正确验证无效邮箱', async () => {
      const { validateEmail } = await import('../../functions/api/utils.js');
      
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('应该正确验证有效密码', async () => {
      const { validatePassword } = await import('../../functions/api/utils.js');
      
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('12345678901234567890')).toBe(true);
    });
    
    it('应该正确验证无效密码', async () => {
      const { validatePassword } = await import('../../functions/api/utils.js');
      
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
      expect(validatePassword(null)).toBe(false);
      expect(validatePassword(undefined)).toBe(false);
    });
  });

  describe('createOptionsResponse', () => {
    it('应该创建204响应', async () => {
      const { createOptionsResponse } = await import('../../functions/api/utils.js');
      const response = createOptionsResponse();
      
      expect(response.status).toBe(204);
    });

    it('应该设置正确的CORS头', async () => {
      const { createOptionsResponse } = await import('../../functions/api/utils.js');
      const response = createOptionsResponse();
      
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Access-Control-Allow-Methods')).toContain('GET');
      expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
    });
  });
});
