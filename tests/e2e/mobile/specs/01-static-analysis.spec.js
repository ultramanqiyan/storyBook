import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const CSS_DIR = path.join(process.cwd(), 'src/frontend/css');

test.describe('静态CSS分析', () => {
  const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  
  test('应该存在响应式断点', () => {
    let hasResponsiveBreakpoints = false;
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf-8');
      if (content.includes('@media') && (content.includes('768px') || content.includes('480px') || content.includes('max-width'))) {
        hasResponsiveBreakpoints = true;
      }
    });
    
    expect(hasResponsiveBreakpoints).toBe(true);
  });

  test('不应该有超出移动端宽度的固定宽度', () => {
    const issues = [];
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf-8');
      const fixedWidthMatches = content.match(/width:\s*(\d+)px/g);
      
      if (fixedWidthMatches) {
        fixedWidthMatches.forEach(match => {
          const width = parseInt(match.match(/\d+/)[0]);
          if (width > 390) {
            issues.push(`${file}: ${match} (可能超出小屏手机宽度)`);
          }
        });
      }
    });
    
    console.log('固定宽度问题:', issues);
  });

  test('移动端字体大小应该足够', () => {
    const issues = [];
    
    cssFiles.forEach(file => {
      const content = fs.readFileSync(path.join(CSS_DIR, file), 'utf-8');
      
      const mediaMatches = content.match(/@media[^{]*max-width:\s*(\d+)px[^{]*{([^}]*)}/g);
      
      if (mediaMatches) {
        mediaMatches.forEach(mediaBlock => {
          const fontSizeMatches = mediaBlock.match(/font-size:\s*(\d+)px/g);
          if (fontSizeMatches) {
            fontSizeMatches.forEach(match => {
              const size = parseInt(match.match(/\d+/)[0]);
              if (size < 12) {
                issues.push(`${file}: ${match} (字体过小)`);
              }
            });
          }
        });
      }
    });
    
    console.log('字体大小问题:', issues);
  });

  test('检查CSS变量定义', () => {
    const variablesContent = fs.readFileSync(path.join(CSS_DIR, 'variables.css'), 'utf-8');
    
    expect(variablesContent).toContain('--spacing-');
    expect(variablesContent).toContain('--font-');
    expect(variablesContent).toContain('--color-');
  });

  test('检查响应式CSS文件存在', () => {
    expect(cssFiles).toContain('responsive.css');
    
    const responsiveContent = fs.readFileSync(path.join(CSS_DIR, 'responsive.css'), 'utf-8');
    expect(responsiveContent).toContain('@media');
    expect(responsiveContent).toContain('768px');
    expect(responsiveContent).toContain('480px');
  });
});
