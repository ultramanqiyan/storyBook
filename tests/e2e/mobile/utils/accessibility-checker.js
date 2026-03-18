export class AccessibilityChecker {
  constructor(page, device) {
    this.page = page;
    this.device = device;
    this.issues = [];
  }

  addIssue(category, severity, element, description, wcagCriterion = null) {
    this.issues.push({
      category,
      severity,
      element,
      description,
      wcagCriterion,
      device: this.device,
    });
  }

  async checkImagesHaveAlt() {
    const imagesWithoutAlt = await this.page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images
        .filter(img => !img.alt && !img.getAttribute('aria-label') && !img.getAttribute('aria-labelledby'))
        .map(img => img.src || img.outerHTML.substring(0, 100));
    });
    
    imagesWithoutAlt.forEach((src, index) => {
      this.addIssue('可访问性', 'error', `img:nth(${index})`, 
        `图片缺少alt属性: ${src}`, 'WCAG 2.1 1.1.1');
    });
    
    return imagesWithoutAlt.length === 0;
  }

  async checkFormLabels() {
    const formsWithoutLabels = await this.page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      return inputs
        .filter(input => {
          const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
          const hasAriaLabel = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby');
          const hasPlaceholder = input.placeholder;
          return !hasLabel && !hasAriaLabel && !hasPlaceholder;
        })
        .map(input => input.name || input.id || input.type);
    });
    
    formsWithoutLabels.forEach((name, index) => {
      this.addIssue('可访问性', 'error', `form element: ${name}`,
        `表单元素缺少标签`, 'WCAG 2.1 1.3.1');
    });
    
    return formsWithoutLabels.length === 0;
  }

  async checkFocusVisible() {
    await this.page.keyboard.press('Tab');
    
    const focusVisible = await this.page.evaluate(() => {
      const focused = document.activeElement;
      if (!focused || focused === document.body) return false;
      
      const style = window.getComputedStyle(focused);
      return style.outline !== 'none' || style.boxShadow !== 'none';
    });
    
    if (!focusVisible) {
      this.addIssue('可访问性', 'warning', 'focusable elements',
        '焦点状态不明显', 'WCAG 2.1 2.4.7');
    }
    
    return focusVisible;
  }

  async checkColorContrast() {
    const lowContrastElements = await this.page.evaluate(() => {
      const textElements = Array.from(document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, label'));
      
      function parseColor(colorStr) {
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return null;
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      
      function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }
      
      function getContrastRatio(color1, color2) {
        const c1 = parseColor(color1);
        const c2 = parseColor(color2);
        if (!c1 || !c2) return 21;
        
        const L1 = getLuminance(...c1);
        const L2 = getLuminance(...c2);
        
        const lighter = Math.max(L1, L2);
        const darker = Math.min(L1, L2);
        
        return (lighter + 0.05) / (darker + 0.05);
      }
      
      return textElements
        .filter(el => {
          const style = window.getComputedStyle(el);
          const ratio = getContrastRatio(style.color, style.backgroundColor);
          return ratio < 4.5;
        })
        .slice(0, 10)
        .map(el => el.tagName + (el.className ? '.' + el.className.split(' ').join('.') : ''));
    });
    
    lowContrastElements.forEach(tag => {
      this.addIssue('可访问性', 'warning', tag,
        `对比度不足4.5:1`, 'WCAG 2.1 1.4.3');
    });
    
    return lowContrastElements.length === 0;
  }

  async checkButtonNames() {
    const buttonsWithoutName = await this.page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons
        .filter(btn => {
          const hasText = btn.textContent.trim();
          const hasAriaLabel = btn.getAttribute('aria-label');
          const hasAriaLabelledby = btn.getAttribute('aria-labelledby');
          const hasTitle = btn.title;
          return !hasText && !hasAriaLabel && !hasAriaLabelledby && !hasTitle;
        })
        .map(btn => btn.className || btn.id || 'button');
    });
    
    buttonsWithoutName.forEach(name => {
      this.addIssue('可访问性', 'error', `button: ${name}`,
        `按钮缺少可访问名称`, 'WCAG 2.1 4.1.2');
    });
    
    return buttonsWithoutName.length === 0;
  }

  async checkLinkText() {
    const linksWithVagueText = await this.page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const vagueTexts = ['click here', 'read more', 'more', 'here', '点击这里', '更多'];
      
      return links
        .filter(link => {
          const text = link.textContent.trim().toLowerCase();
          return vagueTexts.includes(text) || text.length < 2;
        })
        .map(link => link.href || link.outerHTML.substring(0, 100));
    });
    
    linksWithVagueText.forEach(href => {
      this.addIssue('可访问性', 'warning', `a: ${href}`,
        `链接文本不够描述性`, 'WCAG 2.1 2.4.4');
    });
    
    return linksWithVagueText.length === 0;
  }

  getIssues() {
    return this.issues;
  }
}
