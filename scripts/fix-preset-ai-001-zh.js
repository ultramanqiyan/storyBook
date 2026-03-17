import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chapter6 = `集体的发展速度超出了所有人的预期。最初只是一个小小的支持团体，现在已经成为一场运动。莎拉发现自己处于中心位置，不是出于选择，而是出于必要。人们向她寻求指导，寻求希望，寻求在这个似乎决心取代他们的世界中前进的道路。每周三晚上，他们在一个改建的教堂地下室聚会。那里曾经举办过匿名戒酒会会议和社区戏剧制作，现在成了被AI取代的创作者们的避风港。记者、作家、设计师、编辑，他们都因为算法的决定而失去了工作，现在正在寻找新的方向。房间里弥漫着咖啡的香气和一种共同的使命感。我们需要有策略，不能只是怀旧地对抗技术。我们需要展示人类创造力不仅与AI内容不同，而且更好。不仅更有灵魂，而且更有价值。莎拉站在房间前方，看着这些曾经被系统抛弃的人们，心中涌起一种责任感。小组讨论了各种方法。一些人希望游说制定保护人类工人的法规。另一些人希望建立重视人类创作者的替代平台。他们决定采取多管齐下的方法：创建认证系统、建立平台、游说透明度法律。这是一个雄心勃勃的计划，但莎拉第一次感到了希望。她看着房间里的人们，知道他们正在共同建立一些重要的东西。这个集体将成为改变行业的力量。他们不再是受害者，而是变革者。每个人都有自己的故事，每个人都曾被算法判定为多余，但现在他们团结在一起，准备证明人类的价值不可替代。这场运动才刚刚开始，但莎拉知道它将改变一切。`;

const chapter7 = `六个月后，人类内容倡议启动了。认证系统简单而有效：完全由人类创作的内容可以携带HCI印章。名为真实的平台将认证创作者与愿意为人类作品支付溢价的受众联系起来。这个平台很快吸引了数万名用户，证明了市场上对人类创作内容的渴望。反响超出了预期。读者们原来确实想要人类的故事。他们想知道有一个人曾为一个句子而挣扎，曾为自己的笑话而笑，曾在写情感场景时哭泣。他们想要的是连接，而不仅仅是内容。这种连接是AI无法复制的。这不仅仅是关于质量，这是关于真实性。当读者知道一个真实的人经历了某种情感，并将那种情感转化为文字时，连接就更深了。AI可以模拟情感，但它不能真正感受。读者知道区别。市场开始分化，人类创作的内容获得了更高的价值。主要出版物开始采用认证。广告商为人类创作的广告支付更多费用。一个小而重要的市场转变开始出现。这不是关于复仇，这是关于证明人类很重要。我们的创造力、我们的挣扎、我们的不完美是有价值的。莎拉看着这一切发生，知道他们的努力正在改变世界。每一次认证的使用，每一次人类创作者被重视，都是对他们信念的肯定。他们证明了即使在AI时代，人类创造力仍然有独特的价值。`;

const chapter8 = `在失去工作一年后，陈莎拉收到了Nexus Media的工作邀请。不是她原来的工作，而是新的职位：人类内容战略总监。公司希望将人类创作者重新整合到他们的工作流程中，找到AI效率和人类创造力之间的平衡。这个邀请让她感到意外，但也证明了她的理念正在被接受。讽刺意味我并不陌生，莎拉在面试时告诉董事会。你们解雇我是因为AI可以做我的工作。现在你们想要我回来，因为它做得不够好。董事会成员们沉默了，他们知道这是事实。我们犯了一个错误，CEO承认。我们优化了错误的指标。我们衡量成本和速度，而我们应该衡量连接和价值。这是一个艰难的承认，但也是必要的。莎拉接受了这份工作，但按照她自己的条件。她坚持要求在董事会中有一个席位，要求AI使用的透明度，要求对人类创作者的公平补偿。这个模式奏效了。Nexus Media以其混合方法而闻名：AI处理研究和初稿，人类提供创造力和情感深度。内容比任何一方单独制作都要好。在她被解雇的周年纪念日，莎拉为大西洋月刊写了一篇文章。标题是：我被AI取代。然后我被雇来修复它。这篇文章疯传，引发了关于人工智能时代工作未来的全国性讨论。我学到的教训是技术不是命运。它是一个选择。我们可以选择用AI取代人类，或者选择用它来增强他们。我们可以优化效率，或者优化意义。机器不做这些选择。我们做。一些人称她为最后的作家，但她已经变成了完全不同的东西：新一代专业人士中的第一个，一个可以与机器合作而不变成机器的人。她的故事不是结束，而是一个新的开始。`;

console.log('Chapter 6 length:', chapter6.length);
console.log('Chapter 7 length:', chapter7.length);
console.log('Chapter 8 length:', chapter8.length);

const chapters = [
  { chapter_id: 'chapter-ai001-06-zh', book_id: 'preset-ai-001-zh', order_num: 6, title: '抵抗', content: chapter6 },
  { chapter_id: 'chapter-ai001-07-zh', book_id: 'preset-ai-001-zh', order_num: 7, title: '突破', content: chapter7 },
  { chapter_id: 'chapter-ai001-08-zh', book_id: 'preset-ai-001-zh', order_num: 8, title: '新篇章', content: chapter8 }
];

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

console.log('Updating preset-ai-001-zh chapters...');

// Delete existing chapters
execSync(`npx wrangler d1 execute storybook_database --local --command "DELETE FROM chapters WHERE chapter_id IN ('chapter-ai001-06-zh', 'chapter-ai001-07-zh', 'chapter-ai001-08-zh')"`, {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit'
});

// Insert new chapters one by one
for (const chapter of chapters) {
  const escapedContent = escapeSql(chapter.content);
  const escapedTitle = escapeSql(chapter.title);
  const query = `INSERT INTO chapters (chapter_id, book_id, order_num, title, content) VALUES ('${chapter.chapter_id}', '${chapter.book_id}', ${chapter.order_num}, '${escapedTitle}', '${escapedContent}')`;
  
  const tempFile = path.join(__dirname, '..', 'temp_query.sql');
  fs.writeFileSync(tempFile, '\ufeff' + query, 'utf8');
  
  console.log(`Inserting ${chapter.chapter_id}...`);
  
  try {
    execSync(`npx wrangler d1 execute storybook_database --local --file temp_query.sql`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    console.log(`Inserted ${chapter.chapter_id} successfully`);
  } catch (error) {
    console.error(`Failed to insert ${chapter.chapter_id}:`, error.message);
  }
}

console.log('Done!');
