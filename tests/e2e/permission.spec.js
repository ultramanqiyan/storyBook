import { test, expect } from '@playwright/test';
import DatabaseHelper from './helpers/db-helper.js';

test.describe('权限控制', () => {
  let db;
  let testUserId;
  let testBookId;

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

  async function setupBookWithChapter(request, userId = testUserId) {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: userId,
        title: '权限测试书籍',
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
    const bookId = bookData.data.book_id;

    const charsResponse = await request.get(`/api/characters?book_id=${bookId}`);
    const charsData = await charsResponse.json();
    const protagonistId = charsData.data.find(c => c.is_protagonist === 1).char_id;

    const cardsResponse = await request.get(`/api/plot-cards?book_id=${bookId}`);
    const cardsData = await cardsResponse.json();
    const cards = cardsData.data;
    
    const weatherCardId = cards.find(c => c.sub_type === 'weather').card_id;
    const terrainCardId = cards.find(c => c.sub_type === 'terrain').card_id;
    const adventureCardId = cards.find(c => c.sub_type === 'adventure').card_id;
    const equipmentCardId = cards.find(c => c.sub_type === 'equipment').card_id;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: userId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: protagonistId,
          supporting_ids: [],
          weather_id: weatherCardId,
          terrain_id: terrainCardId,
          adventure_id: adventureCardId,
          equipment_id: equipmentCardId
        }
      }
    });
    const chapterData = await chapterResponse.json();
    
    return {
      bookId,
      chapterId: chapterData.data?.chapter?.chapter_id,
      puzzleId: chapterData.data?.puzzle?.puzzle_id
    };
  }

  test('未登录用户访问导演页应跳转登录', async ({ page }) => {
    const bookResponse = await page.request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '导演页权限测试',
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
    const bookId = bookData.data.book_id;

    await page.goto(`/director.html?book_id=${bookId}`);
    await page.waitForTimeout(2000);

    const currentUrl = page.url();
    const isLoginPage = currentUrl.includes('login') || 
                        currentUrl.includes('Login') ||
                        await page.locator('#loginForm, .login-form, form[action*="login"]').count() > 0;
    
    expect(isLoginPage || !currentUrl.includes('director')).toBe(true);
  });

  test('未登录用户解谜成功不应获得卡牌', async ({ page, request }) => {
    const { bookId, chapterId, puzzleId } = await setupBookWithChapter(request);

    const beforeCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    ).length;

    const puzzleResponse = await request.get(`/api/puzzles/${puzzleId}`);
    const puzzleData = await puzzleResponse.json();
    const answer = puzzleData.data?.answer || 'test';

    await page.goto(`/chapter.html?id=${chapterId}`);
    await page.waitForTimeout(2000);

    const answerInput = page.locator('#answerInput, .answer-input, input[type="text"]').first();
    if (await answerInput.count() > 0) {
      await answerInput.fill(answer);
      
      const submitBtn = page.locator('#submitBtn, .submit-btn, button:has-text("提交")').first();
      if (await submitBtn.count() > 0) {
        await submitBtn.click();
        await page.waitForTimeout(2000);
      }
    }

    const afterCount = db.queryAll(
      'SELECT * FROM plot_cards WHERE book_id = ?',
      [bookId]
    ).length;
    
    expect(afterCount).toBe(beforeCount);
  });

  test('用户不能删除他人书籍', async ({ request }) => {
    const otherUserResponse = await request.post('/api/users', {
      data: {
        email: 'other-permission@test.com',
        password: 'password123'
      }
    });
    const otherUserData = await otherUserResponse.json();
    const otherUserId = otherUserData.data?.user_id;

    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '他人书籍删除测试',
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
    const bookId = bookData.data.book_id;

    const deleteResponse = await request.delete(`/api/books/${bookId}`, {
      data: {
        user_id: otherUserId
      }
    });

    const deleteResult = await deleteResponse.json();
    
    const bookStillExists = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookId]
    );
    
    expect(bookStillExists).not.toBeNull();
  });

  test('用户不能修改他人书籍', async ({ request }) => {
    const otherUserResponse = await request.post('/api/users', {
      data: {
        email: 'other-modify@test.com',
        password: 'password123'
      }
    });
    const otherUserData = await otherUserResponse.json();
    const otherUserId = otherUserData.data?.user_id;

    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '他人书籍修改测试',
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
    const bookId = bookData.data.book_id;

    const chapterResponse = await request.post('/api/chapters', {
      data: {
        user_id: otherUserId,
        book_id: bookId,
        selected_cards: {
          protagonist_id: 1,
          weather_id: 1,
          terrain_id: 1,
          adventure_id: 1,
          equipment_id: 1
        }
      }
    });

    const chapterResult = await chapterResponse.json();
    
    expect(chapterResult.success).toBe(false);
  });

  test('用户不能为他人书籍创建自定义卡牌', async ({ request }) => {
    const otherUserResponse = await request.post('/api/users', {
      data: {
        email: 'other-card@test.com',
        password: 'password123'
      }
    });
    const otherUserData = await otherUserResponse.json();
    const otherUserId = otherUserData.data?.user_id;

    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '他人书籍卡牌测试',
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
    const bookId = bookData.data.book_id;

    const cardResponse = await request.post('/api/custom-cards/plot-cards', {
      data: {
        book_id: bookId,
        user_id: otherUserId,
        name: '非法卡牌',
        icon: '🎴',
        description: '测试',
        sub_type: 'weather'
      }
    });

    const cardResult = await cardResponse.json();
    
    expect(cardResult.success).toBe(false);
  });

  test('登录用户可以访问自己的导演页', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '导演页访问测试',
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
    const bookId = bookData.data.book_id;

    await page.addInitScript((userId) => {
      localStorage.setItem('user_id', userId);
    }, testUserId);

    await page.goto(`/director.html?book_id=${bookId}`);
    await page.waitForTimeout(2000);

    const directorContent = page.locator('.director-page, .director-container, #director');
    const hasContent = await directorContent.count() > 0;
    
    expect(hasContent).toBe(true);
  });

  test('登录用户可以删除自己的书籍', async ({ page, request }) => {
    const bookResponse = await request.post('/api/books', {
      data: {
        user_id: testUserId,
        title: '删除权限测试',
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
    const bookId = bookData.data.book_id;

    const deleteResponse = await request.delete(`/api/books/${bookId}`, {
      data: {
        user_id: testUserId
      }
    });

    const deleteResult = await deleteResponse.json();
    expect(deleteResult.success).toBe(true);

    const bookExists = db.query(
      'SELECT * FROM books WHERE book_id = ?',
      [bookId]
    );
    
    expect(bookExists).toBeFalsy();
  });

  test('预设书籍不能被删除', async ({ request }) => {
    const presetBooks = db.queryAll('SELECT * FROM books WHERE is_preset = 1 LIMIT 1');
    
    if (presetBooks.length > 0) {
      const presetBookId = presetBooks[0].book_id;

      const deleteResponse = await request.delete(`/api/books/${presetBookId}`, {
        data: {
          user_id: testUserId
        }
      });

      const deleteResult = await deleteResponse.json();
      
      const bookStillExists = db.query(
        'SELECT * FROM books WHERE book_id = ?',
        [presetBookId]
      );
      
      expect(bookStillExists).not.toBeNull();
    }
  });
});
