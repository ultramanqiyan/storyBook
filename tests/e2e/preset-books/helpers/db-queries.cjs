const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject', 'acc37b41506e55d59117c2fbd31b6e6f179816bedc9c3eee10abef26dc7764e6.sqlite');

let db = null;

function getDb() {
  if (!db) {
    db = new Database(dbPath);
  }
  return db;
}

function getPresetBooks() {
  return getDb().prepare('SELECT book_id, title, type, language FROM books WHERE is_preset = 1 ORDER BY book_id').all();
}

function getCharacters(bookId) {
  return getDb().prepare('SELECT char_id, name, avatar, is_protagonist FROM characters WHERE book_id = ?').all(bookId);
}

function getPlotCards(bookId) {
  return getDb().prepare('SELECT card_id, name, icon, sub_type, description FROM plot_cards WHERE book_id = ?').all(bookId);
}

function getChapters(bookId) {
  return getDb().prepare('SELECT chapter_id, title, order_num, content FROM chapters WHERE book_id = ? ORDER BY order_num').all(bookId);
}

function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getPresetBooks, getCharacters, getPlotCards, getChapters, closeDb };
