// Batch fix all remaining books (011-023)
const { execSync } from 'child_process';

const books = [
  'preset-ai-011', 'preset-ai-012', 'preset-ai-013', 'preset-ai-014',
  'preset-ai-015', 'preset-ai-016', 'preset-ai-017', 'preset-ai-018',
  'preset-ai-019', 'preset-ai-020', 'preset-ai-021', 'preset-ai-022', 'preset-ai-023'
];

// For each book, generate and execute migration
books.forEach(bookId => {
  console.log(`Processing ${bookId}...`);
  
  // Generate static pages
  try {
    execSync(`node scripts/generate-from-db.js ${bookId}`, { stdio: 'inherit' });
    console.log(`Generated static pages for ${bookId}`);
  } catch (error) {
    console.error(`Error processing ${bookId}:`, error.message);
  }
});

console.log('Batch processing complete!');
