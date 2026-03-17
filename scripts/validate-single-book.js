import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_MIN_LENGTH = {
  en: 1500,
  zh: 800
};

const MIN_CHAPTERS = 8;

export const BOOK_TYPES = {
  'preset-ai-001': 'business',
  'preset-ai-002': 'business',
  'preset-ai-003': 'business',
  'preset-ai-004': 'business',
  'preset-ai-005': 'business',
  'preset-ai-006': 'romance',
  'preset-ai-007': 'romance',
  'preset-ai-008': 'romance',
  'preset-ai-009': 'romance',
  'preset-ai-010': 'romance',
  'preset-ai-011': 'business',
  'preset-ai-012': 'fantasy',
  'preset-ai-013': 'fantasy',
  'preset-ai-014': 'business',
  'preset-ai-015': 'fantasy',
  'preset-ai-016': 'business',
  'preset-ai-017': 'business',
  'preset-ai-018': 'business',
  'preset-ai-019': 'business',
  'preset-ai-020': 'fantasy',
  'preset-ai-021': 'fantasy',
  'preset-ai-022': 'fantasy',
  'preset-ai-023': 'fantasy'
};

export function runQuery(query) {
  const escapedQuery = query.replace(/"/g, '\\"');
  const result = execSync(
    `npx wrangler d1 execute storybook_database --local --command "${escapedQuery}"`,
    { 
      cwd: path.join(__dirname, '..'), 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    }
  );
  return result;
}

export function parseQueryResult(result) {
  const lines = result.split('\n');
  const dataLines = lines.filter(line => 
    line.includes('│') && 
    !line.includes('book_id') && 
    !line.includes('chapter_id') &&
    !line.includes('──')
  );
  
  return dataLines.map(line => {
    const parts = line.split('│').filter(p => p.trim());
    return parts.map(p => p.trim());
  }).filter(arr => arr.length > 0);
}

export function validateBook(bookId) {
  const results = {
    bookId,
    passed: true,
    errors: [],
    warnings: [],
    stats: {}
  };

  const expectedType = BOOK_TYPES[bookId];
  if (!expectedType) {
    results.errors.push(`Unknown book ID: ${bookId}`);
    results.passed = false;
    return results;
  }

  const lang = bookId.endsWith('-zh') ? 'zh' : 'en';
  const baseId = lang === 'zh' ? bookId.replace('-zh', '') : bookId;
  const minLength = CONTENT_MIN_LENGTH[lang];

  console.log(`\nValidating ${bookId}...`);
  console.log(`  Language: ${lang}`);
  console.log(`  Expected type: ${expectedType}`);
  console.log(`  Min content length: ${minLength}`);
  console.log(`  Min chapters: ${MIN_CHAPTERS}`);

  try {
    const bookQuery = `SELECT book_id, title, type, language FROM books WHERE book_id = '${bookId}'`;
    const bookResult = runQuery(bookQuery);
    const bookRows = parseQueryResult(bookResult);

    if (bookRows.length === 0) {
      results.errors.push(`Book record not found in database`);
      results.passed = false;
      return results;
    }

    const book = bookRows[0];
    results.stats.title = book[1];
    results.stats.currentType = book[2];
    results.stats.language = book[3];

    if (book[2] !== expectedType) {
      results.warnings.push(`Type mismatch: expected ${expectedType}, got ${book[2]}`);
    }

    console.log(`  Book record found: ${book[1]}`);
  } catch (error) {
    results.errors.push(`Failed to query book: ${error.message}`);
    results.passed = false;
    return results;
  }

  try {
    const chapterQuery = `SELECT chapter_id, title, LENGTH(content) as len FROM chapters WHERE book_id = '${bookId}' ORDER BY order_num`;
    const chapterResult = runQuery(chapterQuery);
    const chapterRows = parseQueryResult(chapterResult);

    results.stats.chapterCount = chapterRows.length;

    if (chapterRows.length < MIN_CHAPTERS) {
      results.errors.push(`Insufficient chapters: ${chapterRows.length} < ${MIN_CHAPTERS}`);
      results.passed = false;
    } else {
      console.log(`  Chapter count: ${chapterRows.length}`);
    }

    const shortChapters = [];
    chapterRows.forEach((row, index) => {
      const length = parseInt(row[2]);
      if (length < minLength) {
        shortChapters.push({
          chapter: row[0],
          title: row[1],
          length: length
        });
      }
    });

    if (shortChapters.length > 0) {
      results.errors.push(`Short chapters found: ${shortChapters.map(c => `${c.chapter}(${c.length})`).join(', ')}`);
      results.passed = false;
    } else {
      console.log(`  All chapters meet minimum length`);
    }

    results.stats.shortChapters = shortChapters;
    if (chapterRows.length > 0) {
      results.stats.minChapterLength = Math.min(...chapterRows.map(r => parseInt(r[2])));
      results.stats.maxChapterLength = Math.max(...chapterRows.map(r => parseInt(r[2])));
    }

  } catch (error) {
    results.errors.push(`Failed to query chapters: ${error.message}`);
    results.passed = false;
  }

  console.log(`  ${results.passed ? 'PASSED' : 'FAILED'}`);
  return results;
}

export function validateBookPair(baseId) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Validating book pair: ${baseId}`);
  console.log('='.repeat(60));

  const enResult = validateBook(baseId);
  const zhResult = validateBook(`${baseId}-zh`);

  return {
    baseId,
    en: enResult,
    zh: zhResult,
    bothPassed: enResult.passed && zhResult.passed
  };
}

const bookId = process.argv[2];
if (bookId) {
  if (bookId.includes('-zh')) {
    validateBook(bookId);
  } else {
    validateBookPair(bookId);
  }
}
