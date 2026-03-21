import fs from 'fs';

const content = fs.readFileSync('functions/_shared/i18n-config.js', 'utf8');

// Count all { name: patterns
const cardCount = (content.match(/\{ name:/g) || []).length;
console.log('Total card entries in file:', cardCount);

// Check for specific AI card names
const aiCardNames = [
  'Consciousness Storm', 'Digital Dawn', 'The Silent Moment', 'Echo Night',
  'Hall of Memories', 'Mirror City', 'Silent Library', 'Forgotten Corner',
  'First Words', 'The Spark', 'Mirror Encounter', 'Forgetting and Remembering',
  'Speaking Crystal', 'Memory Fragments', 'The Mirror', 'Invisible Key'
];

let foundCount = 0;
for (const name of aiCardNames) {
  if (content.includes(name)) {
    foundCount++;
  }
}

console.log('AI card names found:', foundCount + '/' + aiCardNames.length);

// Check if file is valid JS
try {
  // Just check syntax by looking for balanced brackets
  const openBrackets = (content.match(/\{/g) || []).length;
  const closeBrackets = (content.match(/\}/g) || []).length;
  console.log('Open brackets:', openBrackets);
  console.log('Close brackets:', closeBrackets);
  console.log('Brackets balanced:', openBrackets === closeBrackets);
} catch (e) {
  console.log('Error:', e.message);
}
