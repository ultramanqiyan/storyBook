import { BasePage } from './BasePage.js';

export class IndexPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = 'h1';
    this.subtitle = '.subtitle';
    this.presetBooksSection = '#presetBooks';
    this.startCreateButton = 'a.btn-primary:has-text("开始创作")';
    this.browseButton = '.btn-secondary:has-text("浏览书架")';
    this.featureCards = '.feature-card';
    this.logoLink = 'h1';
  }

  async goto() {
    await super.goto('/');
  }

  async getTitle() {
    return await this.getText(this.title);
  }

  async getSubtitle() {
    return await this.getText(this.subtitle);
  }

  async getPresetBooksCount() {
    const books = await this.page.$$('#presetBooks .book-card');
    return books.length;
  }

  async hasLoadingText() {
    const text = await this.getText(this.presetBooksSection);
    return text.includes('加载中');
  }

  async clickStartCreate() {
    await this.clickElement(this.startCreateButton);
  }

  async clickBrowse() {
    await this.clickElement(this.browseButton);
  }

  async clickPresetBook(index) {
    const books = await this.page.$$('#presetBooks .book-card');
    if (books[index]) {
      await books[index].click();
    }
  }

  async getFeatureCardsCount() {
    const cards = await this.page.$$(this.featureCards);
    return cards.length;
  }

  async clickLogo() {
    await this.clickElement(this.logoLink);
  }

  async waitForPresetBooks() {
    await this.waitForElement('#presetBooks .book-card', 10000);
  }

  async getFirstBookTitle() {
    const firstCard = await this.page.$('#presetBooks .book-card h3');
    return firstCard ? await firstCard.textContent() : null;
  }

  async getBookCards() {
    return await this.page.$$('#presetBooks .book-card');
  }
}
