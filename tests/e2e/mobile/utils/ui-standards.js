export const UI_STANDARDS = {
  MIN_FONT_SIZE: 14,
  MIN_TITLE_FONT_SIZE: 18,
  MIN_TOUCH_TARGET: 44,
  MIN_CONTRAST_RATIO: 4.5,
  MIN_LINE_HEIGHT: 1.5,
  MAX_LINE_HEIGHT: 1.8,
};

export class UIChecker {
  constructor(page, device) {
    this.page = page;
    this.device = device;
    this.issues = [];
  }

  addIssue(category, severity, element, description, screenshot = null) {
    this.issues.push({
      category,
      severity,
      element,
      description,
      screenshot,
      device: this.device,
    });
  }

  async checkFontSize(selector, minSize = UI_STANDARDS.MIN_FONT_SIZE) {
    try {
      const fontSize = await this.page.locator(selector).evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });
      
      if (fontSize < minSize) {
        this.addIssue('可读性', 'warning', selector, 
          `字体大小 ${fontSize}px 小于最小标准 ${minSize}px`);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkTouchTarget(selector, minSize = UI_STANDARDS.MIN_TOUCH_TARGET) {
    try {
      const box = await this.page.locator(selector).boundingBox();
      if (!box) return false;
      
      if (box.width < minSize || box.height < minSize) {
        this.addIssue('交互', 'warning', selector,
          `触摸目标 ${Math.round(box.width)}x${Math.round(box.height)}px 小于最小标准 ${minSize}px`);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkContrast(selector, minRatio = UI_STANDARDS.MIN_CONTRAST_RATIO) {
    try {
      const ratio = await this.page.locator(selector).evaluate((el) => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        
        function parseColor(colorStr) {
          const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (!match) return [0, 0, 0];
          return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        }
        
        function getLuminance(r, g, b) {
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }
        
        const [r1, g1, b1] = parseColor(color);
        const [r2, g2, b2] = parseColor(bgColor);
        
        const L1 = getLuminance(r1, g1, b1);
        const L2 = getLuminance(r2, g2, b2);
        
        const lighter = Math.max(L1, L2);
        const darker = Math.min(L1, L2);
        
        return (lighter + 0.05) / (darker + 0.05);
      });
      
      if (ratio < minRatio) {
        this.addIssue('可读性', 'warning', selector,
          `对比度 ${ratio.toFixed(2)}:1 小于最小标准 ${minRatio}:1`);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkElementInViewport(selector) {
    try {
      const isInViewport = await this.page.locator(selector).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      });
      
      if (!isInViewport) {
        this.addIssue('布局', 'info', selector, '元素不在当前视口内');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkElementOcclusion(selector) {
    try {
      const isOccluded = await this.page.locator(selector).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const topElement = document.elementFromPoint(centerX, centerY);
        return !(el === topElement || el.contains(topElement));
      });
      
      if (isOccluded) {
        this.addIssue('布局', 'error', selector, '元素被其他元素遮挡');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async checkHorizontalScroll() {
    const hasHorizontalScroll = await this.page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    if (hasHorizontalScroll) {
      this.addIssue('布局', 'error', 'body', '页面存在横向滚动');
      return false;
    }
    return true;
  }

  async checkTextOverflow(selector) {
    try {
      const hasOverflow = await this.page.locator(selector).evaluate((el) => {
        return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      });
      
      if (hasOverflow) {
        this.addIssue('布局', 'warning', selector, '文本溢出容器');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  getIssues() {
    return this.issues;
  }

  getIssueCount() {
    return this.issues.length;
  }

  getIssuesBySeverity(severity) {
    return this.issues.filter(i => i.severity === severity);
  }
}
