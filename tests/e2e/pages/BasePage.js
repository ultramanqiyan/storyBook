export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async waitForNavigation(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }

  async clickElement(selector) {
    await this.page.click(selector);
  }

  async fillInput(selector, value) {
    await this.page.fill(selector, value);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async getLocalStorage(key) {
    return await this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  async setLocalStorage(key, value) {
    await this.page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value });
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }

  async waitForLoadComplete() {
    await this.page.waitForLoadState('networkidle');
  }

  async getElementCount(selector) {
    const elements = await this.page.$$(selector);
    return elements.length;
  }

  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  async isChecked(selector) {
    return await this.page.isChecked(selector);
  }

  async isDisabled(selector) {
    return await this.page.isDisabled(selector);
  }

  async getAttribute(selector, attribute) {
    const element = await this.page.$(selector);
    return element ? await element.getAttribute(attribute) : null;
  }

  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }

  async reload() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  getUrl() {
    return this.page.url();
  }

  async hasText(text) {
    const content = await this.page.content();
    return content.includes(text);
  }
}
