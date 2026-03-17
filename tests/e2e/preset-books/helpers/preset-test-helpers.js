import fs from 'fs';
import path from 'path';

export function getStaticBookPath(bookId) {
  return path.join(process.cwd(), 'src', 'frontend', 'books', `${bookId}.html`);
}

export function getStaticChapterPath(bookId, chapterNum) {
  const chapterFiles = fs.readdirSync(path.join(process.cwd(), 'src', 'frontend', 'chapters'))
    .filter(f => f.includes(bookId.replace('preset-', '')));
  return chapterFiles;
}

export function staticBookExists(bookId) {
  const filePath = getStaticBookPath(bookId);
  return fs.existsSync(filePath);
}

export function loadPlotConfig() {
  const enConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', 'en', 'plot-options.json'), 'utf-8'));
  const zhConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', 'zh', 'plot-options.json'), 'utf-8'));
  return { en: enConfig, zh: zhConfig };
}

export function findCardInConfig(cardName, cardIcon, bookType, language, config) {
  const langConfig = language === 'en' ? config.en : config.zh;
  const typeConfig = langConfig[bookType];
  if (!typeConfig) return { found: false, iconMatch: false };
  
  for (const subType of ['weather', 'terrain', 'adventure', 'equipment']) {
    const cards = typeConfig[subType] || [];
    const found = cards.find(c => c.name === cardName);
    if (found) {
      return {
        found: true,
        iconMatch: found.icon === cardIcon,
        expectedIcon: found.icon,
        actualIcon: cardIcon,
        subType
      };
    }
  }
  return { found: false, iconMatch: false };
}

export function getBookTypeLabel(type, language) {
  const labels = {
    en: { adventure: 'Adventure', fantasy: 'Fantasy', romance: 'Romance', business: 'Business' },
    zh: { adventure: '冒险', fantasy: '魔幻', romance: '言情', business: '职场' }
  };
  return labels[language]?.adventure || type;
}
