import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const TEST_USER_ID = 'test-user-001';
const TEST_USER_EMAIL = 'test@example.com';
const TEST_USER_PASSWORD = 'testpassword123';

class DatabaseHelper {
  constructor() {
    this.db = null;
    this.dbPath = null;
  }

  findDatabasePath() {
    const wranglerPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1');
    
    if (!fs.existsSync(wranglerPath)) {
      return null;
    }

    const miniflarePath = path.join(wranglerPath, 'miniflare-D1DatabaseObject');
    
    if (!fs.existsSync(miniflarePath)) {
      return null;
    }

    const files = fs.readdirSync(miniflarePath);
    const sqliteFiles = files.filter(f => f.endsWith('.sqlite'));
    
    if (sqliteFiles.length === 0) {
      return null;
    }

    const filesWithStats = sqliteFiles.map(f => ({
      name: f,
      path: path.join(miniflarePath, f),
      mtime: fs.statSync(path.join(miniflarePath, f)).mtime.getTime()
    }));

    filesWithStats.sort((a, b) => b.mtime - a.mtime);
    
    return filesWithStats[0].path;
  }

  connect() {
    this.dbPath = this.findDatabasePath();
    if (!this.dbPath) {
      throw new Error('Database file not found. Make sure wrangler dev is running.');
    }
    this.db = new Database(this.dbPath);
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  resetDatabase() {
    this.execSqlFile(path.join(process.cwd(), 'migrations', '0001_init.sql'));
  }

  execSqlFile(filePath) {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = sql.split(';').filter(s => s.trim());
    for (const statement of statements) {
      try {
        this.db.exec(statement);
      } catch (e) {
        if (!e.message.includes('already exists')) {
          throw e;
        }
      }
    }
  }

  createTestUser() {
    const hashedPassword = bcrypt.hashSync(TEST_USER_PASSWORD, 10);
    
    this.db.prepare(
      'INSERT OR REPLACE INTO users (user_id, email, password) VALUES (?, ?, ?)'
    ).run(TEST_USER_ID, TEST_USER_EMAIL, hashedPassword);
  }

  getTestUserId() {
    return TEST_USER_ID;
  }

  query(sql, params = []) {
    return this.db.prepare(sql).get(...params);
  }

  queryAll(sql, params = []) {
    return this.db.prepare(sql).all(...params);
  }

  run(sql, params = []) {
    return this.db.prepare(sql).run(...params);
  }

  getBookById(bookId) {
    return this.query('SELECT * FROM books WHERE book_id = ?', [bookId]);
  }

  getBooksByTitle(title) {
    return this.queryAll('SELECT * FROM books WHERE title = ?', [title]);
  }

  getCharactersByBookId(bookId) {
    return this.queryAll('SELECT * FROM characters WHERE book_id = ?', [bookId]);
  }

  getProtagonistByBookId(bookId) {
    return this.query('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 1', [bookId]);
  }

  getSupportingByBookId(bookId) {
    return this.queryAll('SELECT * FROM characters WHERE book_id = ? AND is_protagonist = 0', [bookId]);
  }

  getPlotCardsByBookId(bookId) {
    return this.queryAll('SELECT * FROM plot_cards WHERE book_id = ?', [bookId]);
  }

  getPlotCardsBySubType(bookId, subType) {
    return this.queryAll('SELECT * FROM plot_cards WHERE book_id = ? AND sub_type = ?', [bookId, subType]);
  }

  getChaptersByBookId(bookId) {
    return this.queryAll('SELECT * FROM chapters WHERE book_id = ? ORDER BY order_num', [bookId]);
  }

  getPuzzlesByChapterId(chapterId) {
    return this.queryAll('SELECT * FROM puzzles WHERE chapter_id = ?', [chapterId]);
  }

  countBooks() {
    const result = this.query('SELECT COUNT(*) as count FROM books');
    return result ? result.count : 0;
  }

  countCharacters() {
    const result = this.query('SELECT COUNT(*) as count FROM characters');
    return result ? result.count : 0;
  }

  countChapters() {
    const result = this.query('SELECT COUNT(*) as count FROM chapters');
    return result ? result.count : 0;
  }

  countPuzzles() {
    const result = this.query('SELECT COUNT(*) as count FROM puzzles');
    return result ? result.count : 0;
  }
}

export default DatabaseHelper;
