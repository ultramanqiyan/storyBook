/**
 * 检查所有章节内容的测试脚本
 */

import http from 'http';

const BASE_URL = 'http://127.0.0.1:8788';
const BOOK_ID = 'preset-coo-the-unconditional';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function checkChapter(index) {
  const chapterId = `chapter-coo-the-unconditional-${String(index).padStart(2, '0')}`;
  const url = `${BASE_URL}/chapters/${chapterId}`;
  
  try {
    const response = await fetchPage(url);
    
    if (response.statusCode !== 200) {
      log(`❌ Chapter ${index}: HTTP ${response.statusCode}`, 'red');
      return false;
    }
    
    // 检查章节标题
    const titleMatch = response.body.match(/<div class="chapter-num">(.*?)<\/div>/);
    const chapterNum = titleMatch ? titleMatch[1] : 'NOT FOUND';
    
    // 检查是否有内容
    const hasContent = response.body.includes('manuscript-text');
    const contentLength = response.body.length;
    
    // 检查阅读内容区域
    const contentMatch = response.body.match(/<div class="manuscript-text">(.*?)<\/div>/s);
    const content = contentMatch ? contentMatch[1] : '';
    const paragraphCount = (content.match(/<p/g) || []).length;
    
    // 检查导航链接
    const hasNavbar = response.body.includes('href="../index"');
    const hasBookLink = response.body.includes(`href="../books/${BOOK_ID}"`);
    
    // 检查分页链接
    const hasPrev = response.body.includes('scroll-nav-btn');
    const hasNext = response.body.includes('Next') || response.body.includes('The End');
    
    log(`✅ Chapter ${index}:`, 'green');
    log(`   标题：${chapterNum}`, 'blue');
    log(`   段落数：${paragraphCount}`, 'blue');
    log(`   内容长度：${contentLength} chars`, 'blue');
    log(`   导航：${hasNavbar ? '✓' : '✗'} 书籍链接：${hasBookLink ? '✓' : '✗'}`, 'blue');
    log(`   上一页：${hasPrev ? '✓' : '✗'} 下一页：${hasNext ? '✓' : '✗'}`, 'blue');
    
    return true;
  } catch (error) {
    log(`❌ Chapter ${index}: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('\n╔════════════════════════════════════════════╗', 'cyan');
  log('║   检查所有章节内容                           ║', 'cyan');
  log('╚════════════════════════════════════════════╝\n', 'cyan');
  
  const chapters = [];
  for (let i = 1; i <= 10; i++) {
    chapters.push(i);
  }
  
  let passed = 0;
  let failed = 0;
  
  for (const index of chapters) {
    const success = await checkChapter(index);
    if (success) passed++;
    else failed++;
    
    log('');
  }
  
  log('╔════════════════════════════════════════════╗', 'cyan');
  log('║           检查总结                          ║', 'cyan');
  log('╚════════════════════════════════════════════╝\n', 'cyan');
  
  log(`总章节数：${chapters.length}`, 'blue');
  log(`成功：${passed}`, passed === chapters.length ? 'green' : 'yellow');
  log(`失败：${failed}`, failed === 0 ? 'green' : 'red');
  
  if (passed === chapters.length) {
    log('\n🎉 所有章节都符合预期！', 'green');
  } else {
    log('\n⚠️  部分章节有问题，请检查上面的详细结果', 'red');
  }
}

main().catch(console.error);
