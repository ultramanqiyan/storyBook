import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateBookPair, BOOK_TYPES } from './validate-single-book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_BOOK_BASE_IDS = Object.keys(BOOK_TYPES).filter(id => !id.endsWith('-zh'));

function generateStaticPages() {
  console.log('\n📚 Generating static pages...');
  try {
    execSync('node scripts/generate-preset-pages.js', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error('Failed to generate static pages:', error.message);
    return false;
  }
}

function runPlaywrightTest(bookId) {
  console.log(`\n🎭 Running Playwright test for ${bookId}...`);
  try {
    execSync(`npx playwright test tests/e2e/ai-book-validation.spec.js -g "${bookId}" --reporter=list`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      timeout: 120000
    });
    return true;
  } catch (error) {
    console.error(`Playwright test failed for ${bookId}`);
    return false;
  }
}

function updateBookType(bookId, newType) {
  console.log(`\n📝 Updating book type for ${bookId} to ${newType}...`);
  try {
    const query = `UPDATE books SET type = '${newType}' WHERE book_id = '${bookId}'`;
    execSync(`npx wrangler d1 execute storybook_database --local --command "${query}"`, {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error(`Failed to update book type: ${error.message}`);
    return false;
  }
}

function printSummary(results) {
  console.log('\n\n' + '='.repeat(70));
  console.log('📋 验证结果总结');
  console.log('='.repeat(70));

  const passed = results.filter(r => r.dbPassed && r.staticPages && r.e2eTest);
  const failed = results.filter(r => !(r.dbPassed && r.staticPages && r.e2eTest));

  console.log('\n✅ 通过的书籍:');
  passed.forEach(r => {
    console.log(`   ${r.baseId} - ${r.enTitle} / ${r.zhTitle}`);
  });

  console.log('\n❌ 失败的书籍:');
  failed.forEach(r => {
    const issues = [];
    if (!r.dbPassed) issues.push('DB验证失败');
    if (!r.staticPages) issues.push('静态页面生成失败');
    if (!r.e2eTest) issues.push('E2E测试失败');
    console.log(`   ${r.baseId} - 问题: ${issues.join(', ')}`);
  });

  console.log(`\n总计: ${passed.length}/${results.length} 通过`);
  console.log('='.repeat(70));

  return failed.length === 0;
}

async function main() {
  const startIndex = parseInt(process.argv[2]) || 0;
  const endIndex = parseInt(process.argv[3]) || AI_BOOK_BASE_IDS.length - 1;
  const skipE2E = process.argv.includes('--skip-e2e');
  const skipPages = process.argv.includes('--skip-pages');

  console.log('🚀 AI系列书籍逐本验证流程');
  console.log(`处理范围: ${startIndex + 1} 到 ${endIndex + 1} (共${AI_BOOK_BASE_IDS.length}本)`);
  if (skipE2E) console.log('⚠️  跳过E2E测试');
  if (skipPages) console.log('⚠️  跳过静态页面生成');

  const results = [];

  for (let i = startIndex; i <= endIndex; i++) {
    const baseId = AI_BOOK_BASE_IDS[i];
    console.log(`\n${'='.repeat(70)}`);
    console.log(`[${i + 1}/${AI_BOOK_BASE_IDS.length}] 处理: ${baseId}`);
    console.log('='.repeat(70));

    const result = {
      baseId,
      dbPassed: false,
      staticPages: false,
      e2eTest: false,
      enTitle: '',
      zhTitle: ''
    };

    // Step 1: 数据库验证
    console.log('\n📊 Step 1: 数据库验证');
    const validationResult = validateBookPair(baseId);
    result.dbPassed = validationResult.bothPassed;
    result.enTitle = validationResult.en?.stats?.title || '';
    result.zhTitle = validationResult.zh?.stats?.title || '';

    if (!validationResult.bothPassed) {
      console.log(`\n⚠️  ${baseId} 数据库验证失败`);
      if (validationResult.en?.errors) {
        console.log('   英文版错误:', validationResult.en.errors.join('; '));
      }
      if (validationResult.zh?.errors) {
        console.log('   中文版错误:', validationResult.zh.errors.join('; '));
      }
      results.push(result);
      continue;
    }

    // 检查类型是否需要更新
    const expectedType = BOOK_TYPES[baseId];
    if (validationResult.en?.stats?.currentType !== expectedType) {
      console.log(`\n📝 更新书籍类型: ${validationResult.en?.stats?.currentType} -> ${expectedType}`);
      updateBookType(baseId, expectedType);
      updateBookType(`${baseId}-zh`, expectedType);
    }

    // Step 2: 生成静态页面
    if (!skipPages) {
      console.log('\n📄 Step 2: 生成静态页面');
      result.staticPages = generateStaticPages();
      if (!result.staticPages) {
        console.log(`\n⚠️  ${baseId} 静态页面生成失败`);
        results.push(result);
        continue;
      }
    } else {
      result.staticPages = true;
    }

    // Step 3: Playwright端到端测试
    if (!skipE2E) {
      console.log('\n🎭 Step 3: Playwright端到端测试');
      result.e2eTest = runPlaywrightTest(baseId);
    } else {
      result.e2eTest = true;
    }

    results.push(result);

    if (result.dbPassed && result.staticPages && result.e2eTest) {
      console.log(`\n✅ ${baseId} 验证完成！`);
    } else {
      console.log(`\n❌ ${baseId} 验证失败`);
    }
  }

  const allPassed = printSummary(results);
  process.exit(allPassed ? 0 : 1);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
