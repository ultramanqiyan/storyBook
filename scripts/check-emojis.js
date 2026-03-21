import fs from 'fs';
const data = JSON.parse(fs.readFileSync('config/plot-options.json', 'utf8'));

const allEmojis = [];
const emojiSet = new Set();

for (const bookType of Object.keys(data)) {
  for (const subType of Object.keys(data[bookType])) {
    for (const card of data[bookType][subType]) {
      allEmojis.push({emoji: card.icon, name: card.name, bookType, subType});
      emojiSet.add(card.icon);
    }
  }
}

console.log('Total cards:', allEmojis.length);
console.log('Unique emojis:', emojiSet.size);
console.log('');
console.log('All unique emojis:');
console.log([...emojiSet].join(' '));
console.log('');

// Find duplicates
const emojiCounts = {};
allEmojis.forEach(item => {
  emojiCounts[item.emoji] = (emojiCounts[item.emoji] || 0) + 1;
});

const duplicates = Object.entries(emojiCounts).filter(([emoji, count]) => count > 1);
if (duplicates.length > 0) {
  console.log('\nDuplicate emojis found:');
  duplicates.forEach(([emoji, count]) => {
    console.log(emoji + ': ' + count + ' times');
    allEmojis.filter(item => item.emoji === emoji).forEach(item => {
      console.log('  - ' + item.name + ' (' + item.bookType + '/' + item.subType + ')');
    });
  });
} else {
  console.log('No duplicate emojis found within existing cards.');
}
