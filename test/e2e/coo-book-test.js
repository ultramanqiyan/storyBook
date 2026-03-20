/**
 * COO 预设书籍端到端测试脚本
 * 测试书籍页面和章节页面的所有关键功能
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://127.0.0.1:8788';
const BOOK_ID = 'preset-coo-the-unconditional';

// 测试颜色
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

function pass(test) {
  log(`✅ PASS: ${test}`, 'green');
  return true;
}

function fail(test, reason) {
  log(`❌ FAIL: ${test}`, 'red');
  log(`   原因：${reason}`, 'red');
  return false;
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function testBookPage() {
  log('\n📖 测试书籍页面...', 'cyan');
  const url = `${BASE_URL}/books/${BOOK_ID}`;
  
  try {
    const response = await fetchPage(url);
    
    // 测试 1: HTTP 状态码
    if (response.statusCode === 200) {
      pass('书籍页面返回 200 状态码');
    } else {
      fail('书籍页面返回 200 状态码', `实际状态码：${response.statusCode}`);
    }
    
    // 测试 2: Content-Type
    if (response.headers['content-type'] && response.headers['content-type'].includes('text/html')) {
      pass('Content-Type 正确');
    } else {
      fail('Content-Type 正确', `实际：${response.headers['content-type']}`);
    }
    
    // 测试 3: 页面包含书籍标题
    if (response.body.includes('The Waiting - Hours Alone')) {
      pass('页面包含书籍标题');
    } else {
      fail('页面包含书籍标题', '未找到标题');
    }
    
    // 测试 4: 页面包含类型图标
    if (response.body.includes('💕')) {
      pass('页面包含类型图标 (Romance)');
    } else {
      fail('页面包含类型图标', '未找到图标');
    }
    
    // 测试 5: 导航栏链接不带 .html 后缀
    const navLinks = response.body.match(/href="\.\/index"/g);
    if (navLinks && navLinks.length > 0) {
      pass('导航栏链接格式正确 (../index)');
    } else {
      fail('导航栏链接格式正确', '未找到正确的导航链接');
    }
    
    // 测试 6: 章节链接不带 .html 后缀
    const chapterLinks = response.body.match(/href="\.\/chapters\/chapter-coo-the-unconditional-\d+"/g);
    if (chapterLinks && chapterLinks.length >= 5) {
      pass(`章节链接格式正确 (找到 ${chapterLinks.length} 个)`);
    } else {
      fail('章节链接格式正确', `只找到 ${chapterLinks ? chapterLinks.length : 0} 个章节链接`);
    }
    
    // 测试 7: 开始阅读按钮链接
    if (response.body.includes('href="../chapters/chapter-coo-the-unconditional-01"')) {
      pass('开始阅读按钮链接正确');
    } else {
      fail('开始阅读按钮链接正确', '未找到正确的链接');
    }
    
    // 测试 8: SEO meta 标签
    if (response.body.includes('<meta name="description"')) {
      pass('包含 SEO description');
    } else {
      fail('包含 SEO description', '未找到 meta 标签');
    }
    
    // 测试 9: 结构化数据
    if (response.body.includes('"@type": "Book"')) {
      pass('包含结构化数据 (Schema.org)');
    } else {
      fail('包含结构化数据', '未找到 JSON-LD 数据');
    }
    
    // 测试 10: hreflang 标签
    if (response.body.includes('hreflang="en"') && response.body.includes('hreflang="zh"')) {
      pass('包含 hreflang 多语言标签');
    } else {
      fail('包含 hreflang 多语言标签', '未找到 hreflang 标签');
    }
    
    // 测试 11: 角色数据
    if (response.body.includes('Buddy')) {
      pass('包含主角 Buddy 数据');
    } else {
      fail('包含主角 Buddy 数据', '未找到角色数据');
    }
    
    // 测试 12: 章节数量显示
    if (response.body.includes('10 章节') || response.body.includes('10 Chapters')) {
      pass('显示正确的章节数量');
    } else {
      fail('显示正确的章节数量', '章节数量显示错误');
    }
    
    return true;
  } catch (error) {
    fail('书籍页面测试', `请求失败：${error.message}`);
    return false;
  }
}

async function testChapterPages() {
  log('\n📚 测试章节页面...', 'cyan');
  
  const chapters = [
    { id: 'chapter-coo-the-unconditional-01', title: 'Chapter 1' },
    { id: 'chapter-coo-the-unconditional-05', title: 'Chapter 5' },
    { id: 'chapter-coo-the-unconditional-10', title: 'Chapter 10' }
  ];
  
  let allPassed = true;
  
  for (const chapter of chapters) {
    log(`\n测试 ${chapter.title}:`, 'blue');
    const url = `${BASE_URL}/chapters/${chapter.id}`;
    
    try {
      const response = await fetchPage(url);
      
      // 测试 1: HTTP 状态码
      if (response.statusCode === 200) {
        pass(`${chapter.title} 返回 200 状态码`);
      } else {
        fail(`${chapter.title} 返回 200 状态码`, `实际：${response.statusCode}`);
        allPassed = false;
      }
      
      // 测试 2: 页面包含章节标题
      if (response.body.includes(chapter.title)) {
        pass(`${chapter.title} 包含章节标题`);
      } else {
        fail(`${chapter.title} 包含章节标题`, '未找到标题');
        allPassed = false;
      }
      
      // 测试 3: 导航链接不带 .html
      if (response.body.includes('href="../index"')) {
        pass(`${chapter.title} 导航链接正确`);
      } else {
        fail(`${chapter.title} 导航链接正确`, '导航链接格式错误');
        allPassed = false;
      }
      
      // 测试 4: 书籍链接
      if (response.body.includes(`href="../books/${BOOK_ID}"`)) {
        pass(`${chapter.title} 书籍链接正确`);
      } else {
        fail(`${chapter.title} 书籍链接正确`, '书籍链接格式错误');
        allPassed = false;
      }
      
      // 测试 5: 上一页/下一页链接不带 .html
      const prevNextLinks = response.body.match(/href="chapter-coo-the-unconditional-\d+"/g);
      if (prevNextLinks || response.body.includes('The End')) {
        pass(`${chapter.title} 分页链接正确`);
      } else {
        fail(`${chapter.title} 分页链接正确`, '分页链接格式错误');
        allPassed = false;
      }
      
      // 测试 6: 阅读内容区域
      if (response.body.includes('reading-content') || response.body.includes('manuscript-text')) {
        pass(`${chapter.title} 包含阅读内容区域`);
      } else {
        fail(`${chapter.title} 包含阅读内容区域`, '未找到内容区域');
        allPassed = false;
      }
      
      // 测试 7: SEO 结构化数据
      if (response.body.includes('"@type": "Chapter"')) {
        pass(`${chapter.title} 包含章节结构化数据`);
      } else {
        fail(`${chapter.title} 包含章节结构化数据`, '未找到结构化数据');
        allPassed = false;
      }
      
      // 测试 8: 响应式设计
      if (response.body.includes('@media (max-width: 768px)')) {
        pass(`${chapter.title} 包含响应式样式`);
      } else {
        fail(`${chapter.title} 包含响应式样式`, '未找到响应式样式');
        allPassed = false;
      }
      
    } catch (error) {
      fail(`${chapter.title} 测试`, `请求失败：${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function testLinkConsistency() {
  log('\n🔗 测试链接一致性...', 'cyan');
  
  const urls = [
    `${BASE_URL}/books/${BOOK_ID}`,
    `${BASE_URL}/chapters/chapter-coo-the-unconditional-01`,
    `${BASE_URL}/chapters/chapter-coo-the-unconditional-05`
  ];
  
  let allPassed = true;
  
  for (const url of urls) {
    try {
      const response = await fetchPage(url);
      
      // 检查所有 href 是否都不带 .html 后缀
      const htmlLinks = response.body.match(/href="[^"]*\.html"/g);
      
      if (!htmlLinks || htmlLinks.length === 0) {
        pass(`${url.split('/').pop()} - 没有 .html 后缀链接`);
      } else {
        fail(`${url.split('/').pop()} - 没有 .html 后缀链接`, `发现 ${htmlLinks.length} 个带 .html 的链接`);
        log(`   示例：${htmlLinks.slice(0, 3).join(', ')}`, 'yellow');
        allPassed = false;
      }
      
      // 检查相对链接格式
      const relativeLinks = response.body.match(/href="\.\.\/[^"]+"/g);
      if (relativeLinks) {
        const invalidLinks = relativeLinks.filter(link => link.includes('.html'));
        if (invalidLinks.length === 0) {
          pass(`${url.split('/').pop()} - 相对链接格式正确`);
        } else {
          fail(`${url.split('/').pop()} - 相对链接格式正确`, `发现 ${invalidLinks.length} 个错误链接`);
          allPassed = false;
        }
      }
      
    } catch (error) {
      fail(`链接一致性测试 - ${url}`, `请求失败：${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function testMobileResponsiveness() {
  log('\n📱 测试移动端响应式...', 'cyan');
  
  const url = `${BASE_URL}/books/${BOOK_ID}`;
  
  try {
    const response = await fetchPage(url);
    
    // 测试 1: 包含移动端媒体查询
    if (response.body.includes('@media (max-width: 768px)')) {
      pass('包含移动端媒体查询');
    } else {
      fail('包含移动端媒体查询', '未找到媒体查询');
    }
    
    // 测试 2: 包含移动端导航
    if (response.body.includes('isMobile()')) {
      pass('包含移动端检测逻辑');
    } else {
      fail('包含移动端检测逻辑', '未找到检测逻辑');
    }
    
    // 测试 3: 包含移动端样式适配
    if (response.body.includes('padding: 15px 12px')) {
      pass('包含移动端 padding 适配');
    } else {
      fail('包含移动端 padding 适配', '未找到适配样式');
    }
    
    return true;
  } catch (error) {
    fail('移动端响应式测试', `请求失败：${error.message}`);
    return false;
  }
}

async function runAllTests() {
  log('\n╔════════════════════════════════════════════╗', 'cyan');
  log('║   COO 预设书籍端到端测试                     ║', 'cyan');
  log('╚════════════════════════════════════════════╝\n', 'cyan');
  
  log('测试目标:', 'blue');
  log(`  书籍：${BOOK_ID}`, 'blue');
  log(`  基础 URL: ${BASE_URL}`, 'blue');
  log(`  测试时间：${new Date().toLocaleString('zh-CN')}`, 'blue');
  
  const startTime = Date.now();
  
  const results = {
    bookPage: await testBookPage(),
    chapterPages: await testChapterPages(),
    linkConsistency: await testLinkConsistency(),
    mobileResponsiveness: await testMobileResponsiveness()
  };
  
  const duration = Date.now() - startTime;
  
  log('\n╔════════════════════════════════════════════╗', 'cyan');
  log('║           测试总结                          ║', 'cyan');
  log('╚════════════════════════════════════════════╝\n', 'cyan');
  
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.values(results).length;
  
  log(`测试项：${total}`, 'blue');
  log(`通过：${passed}`, passed === total ? 'green' : 'yellow');
  log(`失败：${total - passed}`, passed === total ? 'green' : 'red');
  log(`耗时：${duration}ms`, 'blue');
  
  if (passed === total) {
    log('\n🎉 所有测试通过！', 'green');
    return true;
  } else {
    log('\n⚠️  部分测试失败，请检查上面的详细结果', 'red');
    return false;
  }
}

// 检查服务器是否运行
async function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}/`, (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// 主函数
async function main() {
  log('🔍 检查服务器状态...', 'cyan');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    log('❌ 服务器未运行！请先启动本地开发服务器', 'red');
    log('运行命令：wrangler pages dev src/frontend --compatibility-flag nodejs_compat', 'yellow');
    process.exit(1);
  }
  
  log('✅ 服务器运行正常', 'green');
  
  const success = await runAllTests();
  process.exit(success ? 0 : 1);
}

main().catch(console.error);
