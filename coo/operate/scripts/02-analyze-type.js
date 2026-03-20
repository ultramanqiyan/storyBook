import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');
const LOGS_PATH = path.join(__dirname, '..', 'logs');

function loadConfig() {
  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  return JSON.parse(configContent);
}

function countKeywordMatches(text, keywords) {
  const lowerText = text.toLowerCase();
  let count = 0;
  
  for (const keyword of keywords) {
    const regex = new RegExp(keyword.toLowerCase(), 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  
  return count;
}

function analyzeBookType(bookData, config) {
  const allContent = bookData.chapters.map(ch => ch.content).join(' ');
  const title = bookData.title.toLowerCase();
  const keywords = bookData.keywords.join(' ').toLowerCase();
  
  const combinedText = `${title} ${keywords} ${allContent}`;
  
  const scores = {};
  
  for (const [type, typeConfig] of Object.entries(config.bookTypes)) {
    scores[type] = countKeywordMatches(combinedText, typeConfig.keywords);
  }
  
  let maxType = 'fantasy';
  let maxScore = 0;
  
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxType = type;
    }
  }
  
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? (maxScore / totalScore) : 0;
  
  return {
    type: maxType,
    scores,
    confidence,
    typeName: config.bookTypes[maxType]?.name || maxType,
    typeIcon: config.bookTypes[maxType]?.icon || '📖'
  };
}

function selectPlotCards(bookData, bookType, config) {
  const allContent = bookData.chapters.map(ch => ch.content).join(' ').toLowerCase();
  const keywords = bookData.keywords.map(k => k.toLowerCase());
  
  const plotOptionsPath = path.join(__dirname, '..', '..', '..', 'config', 'plot-options.json');
  
  if (!fs.existsSync(plotOptionsPath)) {
    console.warn('⚠️ plot-options.json not found, using default cards');
    return generateDefaultPlotCards(bookType);
  }
  
  const plotOptions = JSON.parse(fs.readFileSync(plotOptionsPath, 'utf-8'));
  const typeCards = plotOptions[bookType] || plotOptions['adventure'];
  
  const selectedCards = [];
  const cardTypes = ['weather', 'terrain', 'adventure', 'equipment'];
  
  for (const cardType of cardTypes) {
    const cards = typeCards[cardType] || [];
    const scoredCards = cards.map(card => {
      let score = 0;
      
      for (const keyword of keywords) {
        if (card.name.toLowerCase().includes(keyword) || 
            card.description.toLowerCase().includes(keyword)) {
          score += 2;
        }
      }
      
      if (allContent.includes(card.name.toLowerCase())) {
        score += 3;
      }
      
      const descWords = card.description.toLowerCase().split(' ');
      for (const word of descWords) {
        if (word.length > 3 && allContent.includes(word)) {
          score += 1;
        }
      }
      
      return { ...card, score, type: cardType };
    });
    
    scoredCards.sort((a, b) => b.score - a.score);
    
    const topCards = scoredCards.slice(0, 2);
    selectedCards.push(...topCards);
  }
  
  return selectedCards.map((card, index) => ({
    cardId: `card-coo-${bookData.dirName}-${String(index + 1).padStart(2, '0')}`,
    type: 'plot',
    subType: card.type,
    name: card.name,
    icon: card.icon,
    description: card.description,
    isCustom: 0
  }));
}

function generateDefaultPlotCards(bookType) {
  const defaultCards = {
    weather: [
      { name: 'Sunny Day', icon: '☀️', description: 'A bright and clear day' },
      { name: 'Rainy Night', icon: '🌧️', description: 'A dark and stormy night' }
    ],
    terrain: [
      { name: 'City Street', icon: '🏙️', description: 'A busy urban environment' },
      { name: 'Quiet Room', icon: '🏠', description: 'A peaceful indoor space' }
    ],
    adventure: [
      { name: 'Discovery', icon: '🔍', description: 'Finding something new' },
      { name: 'Challenge', icon: '🎯', description: 'Facing a difficult task' }
    ],
    equipment: [
      { name: 'Key Item', icon: '🔑', description: 'An important object' },
      { name: 'Tool', icon: '🔧', description: 'A useful implement' }
    ]
  };
  
  const cards = [];
  let index = 0;
  
  for (const [type, typeCards] of Object.entries(defaultCards)) {
    for (const card of typeCards) {
      cards.push({
        cardId: `card-default-${String(index + 1).padStart(2, '0')}`,
        type: 'plot',
        subType: type,
        name: card.name,
        icon: card.icon,
        description: card.description,
        isCustom: 0
      });
      index++;
    }
  }
  
  return cards;
}

async function main() {
  const args = process.argv.slice(2);
  const config = loadConfig();
  
  let bookDataPath = path.join(LOGS_PATH, 'book-data.json');
  
  if (args.length > 0 && args[0].endsWith('.json')) {
    bookDataPath = args[0];
  }
  
  if (!fs.existsSync(bookDataPath)) {
    console.error('❌ 请先运行 01-read-book.js 生成书籍数据');
    process.exit(1);
  }
  
  console.log('🔍 分析书籍类型...\n');
  
  const booksData = JSON.parse(fs.readFileSync(bookDataPath, 'utf-8'));
  const results = [];
  
  for (const bookData of booksData) {
    console.log(`📖 分析: ${bookData.title}`);
    
    const typeAnalysis = analyzeBookType(bookData, config);
    const plotCards = selectPlotCards(bookData, typeAnalysis.type, config);
    
    console.log(`   类型: ${typeAnalysis.typeName} (${typeAnalysis.type})`);
    console.log(`   图标: ${typeAnalysis.typeIcon}`);
    console.log(`   置信度: ${(typeAnalysis.confidence * 100).toFixed(1)}%`);
    console.log(`   情节卡牌: ${plotCards.length} 张`);
    console.log('');
    
    results.push({
      ...bookData,
      type: typeAnalysis.type,
      typeName: typeAnalysis.typeName,
      typeIcon: typeAnalysis.typeIcon,
      typeAnalysis,
      plotCards
    });
  }
  
  const outputPath = path.join(LOGS_PATH, 'analyzed-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`✅ 完成！分析数据已保存到: ${outputPath}`);
  
  return results;
}

main().catch(console.error);
