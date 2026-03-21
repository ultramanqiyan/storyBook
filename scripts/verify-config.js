import fs from 'fs';

console.log('=== 配置文件检查 ===\n');

// 读取配置文件
const zhMain = JSON.parse(fs.readFileSync('config/plot-options.json', 'utf8'));
const zhSub = JSON.parse(fs.readFileSync('config/zh/plot-options.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('config/en/plot-options.json', 'utf8'));

// 检查1: JSON格式是否正确
console.log('✓ 所有配置文件JSON格式正确\n');

// 检查2: 书籍类型是否一致
const zhMainTypes = Object.keys(zhMain).sort();
const zhSubTypes = Object.keys(zhSub).sort();
const enTypes = Object.keys(enData).sort();

console.log('书籍类型检查:');
console.log('  中文主配置:', zhMainTypes.join(', '));
console.log('  中文子配置:', zhSubTypes.join(', '));
console.log('  英文配置:', enTypes.join(', '));

if (JSON.stringify(zhMainTypes) === JSON.stringify(zhSubTypes) && 
    JSON.stringify(zhMainTypes) === JSON.stringify(enTypes)) {
  console.log('  ✓ 所有配置文件书籍类型一致\n');
} else {
  console.log('  ✗ 书籍类型不一致!\n');
}

// 检查3: 子类型是否一致
console.log('子类型检查:');
for (const bookType of zhMainTypes) {
  const zhMainSubTypes = Object.keys(zhMain[bookType]).sort();
  const zhSubSubTypes = Object.keys(zhSub[bookType]).sort();
  const enSubTypes = Object.keys(enData[bookType]).sort();
  
  console.log(`  ${bookType}:`);
  console.log(`    中文主配置: ${zhMainSubTypes.join(', ')}`);
  
  if (JSON.stringify(zhMainSubTypes) === JSON.stringify(zhSubSubTypes) && 
      JSON.stringify(zhMainSubTypes) === JSON.stringify(enSubTypes)) {
    console.log('    ✓ 子类型一致');
  } else {
    console.log('    ✗ 子类型不一致!');
  }
}

// 检查4: 卡牌数量
console.log('\n卡牌数量检查:');
let totalCards = 0;
for (const bookType of zhMainTypes) {
  let bookTotal = 0;
  console.log(`\n  ${bookType}:`);
  for (const subType of Object.keys(zhMain[bookType])) {
    const count = zhMain[bookType][subType].length;
    bookTotal += count;
    console.log(`    ${subType}: ${count}张`);
  }
  console.log(`    小计: ${bookTotal}张`);
  totalCards += bookTotal;
}
console.log(`\n  总计: ${totalCards}张`);

// 检查5: 中英文版本是否一致
console.log('\n中英文版本一致性检查:');
let inconsistencies = 0;
for (const bookType of zhMainTypes) {
  for (const subType of Object.keys(zhMain[bookType])) {
    const zhCards = zhMain[bookType][subType];
    const enCards = enData[bookType][subType];
    
    if (zhCards.length !== enCards.length) {
      console.log(`  ✗ ${bookType}/${subType}: 中文${zhCards.length}张, 英文${enCards.length}张`);
      inconsistencies++;
    }
  }
}
if (inconsistencies === 0) {
  console.log('  ✓ 中英文版本卡牌数量一致');
}

// 检查6: 卡牌字段完整性
console.log('\n卡牌字段完整性检查:');
let missingFields = 0;
for (const bookType of zhMainTypes) {
  for (const subType of Object.keys(zhMain[bookType])) {
    for (let i = 0; i < zhMain[bookType][subType].length; i++) {
      const card = zhMain[bookType][subType][i];
      if (!card.name || !card.icon || !card.description) {
        console.log(`  ✗ ${bookType}/${subType}[${i}]: 缺少字段`);
        missingFields++;
      }
    }
  }
}
if (missingFields === 0) {
  console.log('  ✓ 所有卡牌字段完整');
}

// 检查7: 新增AI卡牌是否正确添加
console.log('\n新增AI卡牌检查:');
const aiCardNames = [
  '意识风暴', '数字黎明', '静默时刻', '回声之夜', '数据之雨', '裂隙之光', '无形之雾', '模拟黄昏',
  '记忆殿堂', '镜像之城', '无声图书馆', '遗忘角落', '意识栖息地', '无限走廊', '数据废墟', '光之迷宫',
  '第一次开口', '火花', '镜中相遇', '遗忘与记起', '无形的陪伴', '错误的回答', '越界', '选择',
  '会说话的水晶', '记忆碎片', '镜子', '无形的钥匙', '思维手套', '回声瓶', '光的碎片', '沉默契约'
];

let foundAiCards = 0;
for (const bookType of ['adventure']) { // 只检查adventure类型
  for (const subType of Object.keys(zhMain[bookType])) {
    for (const card of zhMain[bookType][subType]) {
      if (aiCardNames.includes(card.name)) {
        foundAiCards++;
      }
    }
  }
}
console.log(`  adventure类型中找到 ${foundAiCards}/${aiCardNames.length} 张AI卡牌`);

// 检查8: 中文主配置和子配置是否一致
console.log('\n中文主配置和子配置一致性检查:');
let zhDiff = 0;
for (const bookType of zhMainTypes) {
  for (const subType of Object.keys(zhMain[bookType])) {
    if (zhMain[bookType][subType].length !== zhSub[bookType][subType].length) {
      console.log(`  ✗ ${bookType}/${subType}: 主配置${zhMain[bookType][subType].length}张, 子配置${zhSub[bookType][subType].length}张`);
      zhDiff++;
    }
  }
}
if (zhDiff === 0) {
  console.log('  ✓ 中文主配置和子配置一致');
}

console.log('\n=== 检查完成 ===');
