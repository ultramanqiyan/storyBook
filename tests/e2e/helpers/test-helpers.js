import { expect } from '@playwright/test';

export function generateTestEmail() {
  return `test_${Date.now()}_${Math.random().toString(36).substring(7)}@example.com`;
}

export function generateTestId() {
  return `id_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

export async function registerUser(page, email, password) {
  await page.goto('/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/bookshelf/, { timeout: 10000 });
  const userId = await page.evaluate(() => localStorage.getItem('userId'));
  return userId;
}

export async function loginUser(page, email, password) {
  await page.goto('/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/bookshelf/, { timeout: 10000 });
}

export async function logoutUser(page) {
  await page.evaluate(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  });
}

export async function createBook(page, userId, title, type) {
  const response = await page.request.post('/api/books', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      user_id: userId,
      title: title,
      type: type,
      protagonist: {
        name: '测试主角',
        role_type: '探险家',
        personality: '勇敢',
        speech_style: '简洁直接',
        avatar: '👦'
      },
      supporting_characters: []
    }
  });
  const result = await response.json();
  return result.data?.book_id;
}

export async function deleteBook(page, bookId, userId) {
  await page.request.delete(`/api/books/${bookId}`, {
    headers: { 'Content-Type': 'application/json' },
    data: { user_id: userId }
  });
}

export async function waitForApiSuccess(page, urlPattern) {
  const response = await page.waitForResponse(resp => 
    resp.url().includes(urlPattern) && resp.status() === 200
  );
  return response.json();
}

export async function getDbRecord(env, table, id) {
  return await env.DB.prepare(`SELECT * FROM ${table} WHERE ${table.slice(0, -1)}_id = ?`)
    .bind(id).first();
}

export async function clearTestData(page, userId) {
  const booksResponse = await page.request.get(`/api/books?user_id=${userId}`);
  const booksData = await booksResponse.json();
  
  if (booksData.success && booksData.data) {
    for (const book of booksData.data) {
      if (!book.book_id.startsWith('preset-')) {
        await page.request.delete(`/api/books/${book.book_id}`, {
          headers: { 'Content-Type': 'application/json' },
          data: { user_id: userId }
        });
      }
    }
  }
}

export async function waitForLoadingComplete(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
  await page.waitForLoadState('networkidle');
}

export async function takeErrorScreenshot(page, testName) {
  const timestamp = Date.now();
  await page.screenshot({ path: `test-results/errors/${testName}_${timestamp}.png` });
}

export function expectValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(emailRegex.test(email)).toBe(true);
}

export function expectValidPassword(password) {
  expect(password.length).toBeGreaterThanOrEqual(6);
}
