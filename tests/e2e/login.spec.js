import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('登录流程', () => {
  let db;

  test.beforeAll(async () => {
    db = new DatabaseHelper();
    db.connect();
    db.resetDatabase();
  });

  test.afterAll(async () => {
    if (db) {
      db.close();
    }
  });

  test('新用户登录应自动注册并跳转到书架页面', async ({ page }) => {
    const testEmail = `newuser_${Date.now()}@test.com`;
    const testPassword = 'testpass123';

    await page.goto('/login.html');

    await expect(page.locator('.login-title').first()).toContainText('Begin');

    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);

    await page.click('.wax-seal-btn');

    await expect(page).toHaveURL(/bookshelf/, { timeout: 10000 });

    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    expect(userId).toBeDefined();
    expect(userId).toMatch(/^id-/);

    const email = await page.evaluate(() => localStorage.getItem('email'));
    expect(email).toBe(testEmail);

    const user = db.query(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );
    expect(user).toBeDefined();
    expect(user.email).toBe(testEmail);
    expect(user.user_id).toBe(userId);
  });

  test('空邮箱应显示错误提示', async ({ page }) => {
    await page.goto('/login.html');

    await page.fill('#password', 'testpass123');

    await page.click('.wax-seal-btn');

    await page.waitForTimeout(1000);

    await expect(page).not.toHaveURL(/bookshelf/);
  });

  test('空密码应显示错误提示', async ({ page }) => {
    await page.goto('/login.html');

    await page.fill('#email', 'test@test.com');

    await page.click('.wax-seal-btn');

    await page.waitForTimeout(1000);

    await expect(page).not.toHaveURL(/bookshelf/);
  });

  test('登录API应返回正确的用户数据', async ({ request }) => {
    const testEmail = `api_test_${Date.now()}@test.com`;
    const testPassword = 'testpass123';

    const response = await request.post('/api/users', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.user_id).toBeDefined();
    expect(data.data.email).toBe(testEmail);
    expect(data.data.is_new_user).toBe(true);

    const user = db.query(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );
    expect(user).toBeDefined();
  });

  test('已注册用户再次登录应返回is_new_user为false', async ({ request }) => {
    const testEmail = `existing_${Date.now()}@test.com`;
    const testPassword = 'testpass123';

    await request.post('/api/users', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const response = await request.post('/api/users', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.is_new_user).toBe(false);
  });

  test('无效邮箱格式应被拒绝', async ({ page }) => {
    await page.goto('/login.html');

    await page.fill('#email', 'invalid-email');
    await page.fill('#password', 'testpass123');

    await page.click('.wax-seal-btn');

    await page.waitForTimeout(1000);

    await expect(page).not.toHaveURL(/bookshelf/);
  });

  test('登录页面应正确显示所有元素', async ({ page }) => {
    await page.goto('/login.html');

    await expect(page.locator('.login-title').first()).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('.wax-seal-btn').first()).toBeVisible();
  });

  test('登录成功后localStorage应存储用户信息', async ({ page }) => {
    const testEmail = `storage_${Date.now()}@test.com`;
    const testPassword = 'testpass123';

    await page.goto('/login.html');

    await page.fill('#email', testEmail);
    await page.fill('#password', testPassword);

    await page.click('.wax-seal-btn');

    await expect(page).toHaveURL(/bookshelf/, { timeout: 10000 });

    const userId = await page.evaluate(() => localStorage.getItem('user_id'));
    const email = await page.evaluate(() => localStorage.getItem('email'));

    expect(userId).toBeDefined();
    expect(email).toBe(testEmail);
  });

  test('数据库中用户记录应正确创建', async ({ request }) => {
    const testEmail = `db_test_${Date.now()}@test.com`;
    const testPassword = 'testpass123';

    await request.post('/api/users', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const user = db.query(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );

    expect(user).toBeDefined();
    expect(user.email).toBe(testEmail);
    expect(user.user_id).toMatch(/^id-/);
    expect(user.created_at).toBeDefined();
  });

  test('多个用户可以正常注册', async ({ request }) => {
    const users = [];
    for (let i = 0; i < 3; i++) {
      const testEmail = `multi_user_${i}_${Date.now()}@test.com`;
      const response = await request.post('/api/users', {
        data: {
          email: testEmail,
          password: 'testpass123'
        }
      });
      const data = await response.json();
      expect(data.success).toBe(true);
      users.push(data.data.user_id);
    }

    expect(new Set(users).size).toBe(3);
  });

  test('登录API响应时间应合理', async ({ request }) => {
    const testEmail = `perf_${Date.now()}@test.com`;
    
    const startTime = Date.now();
    await request.post('/api/users', {
      data: {
        email: testEmail,
        password: 'testpass123'
      }
    });
    const endTime = Date.now();

    expect(endTime - startTime).toBeLessThan(5000);
  });

  test('密码字段应为密码类型', async ({ page }) => {
    await page.goto('/login.html');

    const passwordInput = page.locator('#password');
    const type = await passwordInput.getAttribute('type');
    expect(type).toBe('password');
  });

  test('邮箱字段应为邮箱类型', async ({ page }) => {
    await page.goto('/login.html');

    const emailInput = page.locator('#email');
    const type = await emailInput.getAttribute('type');
    expect(type).toBe('email');
  });

  test('登录页面标题应正确', async ({ page }) => {
    await page.goto('/login.html');

    const title = await page.title();
    expect(title).toContain('Story');
  });
});
