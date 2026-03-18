export async function loginUser(page) {
  const uniqueEmail = `mobile_${Date.now()}@test.com`;
  const password = 'testpass123';
  
  await page.goto('/login.html');
  await page.waitForLoadState('domcontentloaded');
  
  await page.fill('#email', uniqueEmail);
  await page.fill('#password', password);
  
  await page.click('.wax-seal-btn');
  
  await page.waitForURL(/bookshelf/, { timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
  
  return uniqueEmail;
}

export async function waitForPageReady(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
}

export async function takeScreenshot(page, name, device) {
  const screenshotPath = `tests/e2e/mobile/reports/screenshots/${device}/${name}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

export async function checkElementVisible(page, selector) {
  try {
    const element = page.locator(selector);
    return await element.isVisible();
  } catch {
    return false;
  }
}

export async function checkElementNotOccluded(page, selector) {
  try {
    const element = page.locator(selector);
    const box = await element.boundingBox();
    if (!box) return { isOccluded: true, reason: 'Element not found' };
    
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    
    const topElement = await page.locator(`:visible`).evaluateHandle((_, point) => {
      return document.elementFromPoint(point.x, point.y);
    }, { x: centerX, y: centerY });
    
    const isSame = await element.evaluate((el, topEl) => el === topEl || el.contains(topEl), topElement);
    
    return { isOccluded: !isSame, reason: isSame ? null : 'Element is occluded' };
  } catch (error) {
    return { isOccluded: true, reason: error.message };
  }
}

export async function getElementFontSize(page, selector) {
  return await page.locator(selector).evaluate((el) => {
    const style = window.getComputedStyle(el);
    return parseFloat(style.fontSize);
  });
}

export async function getElementSize(page, selector) {
  const box = await page.locator(selector).boundingBox();
  return box ? { width: box.width, height: box.height } : null;
}

export async function checkTouchTargetSize(page, selector, minSize = 44) {
  const size = await getElementSize(page, selector);
  if (!size) return { isValid: false, reason: 'Element not found' };
  
  const isValid = size.width >= minSize && size.height >= minSize;
  return {
    isValid,
    width: size.width,
    height: size.height,
    reason: isValid ? null : `Size ${size.width}x${size.height} is smaller than ${minSize}px`
  };
}

export async function checkHorizontalScroll(page) {
  return await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

export async function checkContrastRatio(page, selector) {
  return await page.locator(selector).evaluate((el) => {
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
    
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return ratio;
  });
}

export function getDeviceName(projectName) {
  const deviceNames = {
    'medium-phone': 'iPhone 12 (390px)',
    'large-phone': 'iPhone 12 Pro Max (428px)',
    'tablet': 'iPad Mini (768px)'
  };
  return deviceNames[projectName] || projectName;
}
