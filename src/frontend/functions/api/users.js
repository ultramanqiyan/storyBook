import bcrypt from 'bcryptjs';
import { createSuccessResponse, createErrorResponse, createOptionsResponse, generateId, validateEmail, validatePassword } from './utils.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return createErrorResponse('邮箱和密码不能为空');
    }

    if (!validateEmail(email)) {
      return createErrorResponse('邮箱格式不正确');
    }

    if (!validatePassword(password)) {
      return createErrorResponse('密码长度必须在6-20个字符之间');
    }

    const existingUser = await env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    let isNewUser = false;
    let user = existingUser;

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = generateId();

      await env.DB.prepare(
        'INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)'
      ).bind(userId, email, hashedPassword).run();

      user = { user_id: userId, email, created_at: new Date().toISOString() };
      isNewUser = true;
    } else {
      const isValid = await bcrypt.compare(password, existingUser.password);
      if (!isValid) {
        return createErrorResponse('密码错误');
      }
    }

    return createSuccessResponse({
      user_id: user.user_id,
      email: user.email,
      is_new_user: isNewUser,
      created_at: user.created_at
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const userId = url.searchParams.get('user_id');

  if (!userId) {
    return createErrorResponse('缺少user_id参数');
  }

  try {
    const user = await env.DB.prepare(
      'SELECT user_id, email, created_at FROM users WHERE user_id = ?'
    ).bind(userId).first();

    if (!user) {
      return createErrorResponse('用户不存在', 404);
    }

    const bookCount = await env.DB.prepare(
      'SELECT COUNT(*) as count FROM books WHERE user_id = ?'
    ).bind(userId).first();

    return createSuccessResponse({
      user_id: user.user_id,
      email: user.email,
      book_count: bookCount?.count || 0,
      created_at: user.created_at
    });
  } catch (error) {
    return createErrorResponse(error.message, 500);
  }
}

export async function onRequestOptions() {
  return createOptionsResponse();
}
