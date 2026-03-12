import { BasePage } from './BasePage.js';

export class BookDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.bookDetail = '#bookDetail';
    this.tabButtons = '.tab-btn';
    this.chaptersTab = '.tab-btn:has-text("章节")';
    this.charactersTab = '.tab-btn:has-text("角色")';
    this.cardsTab = '.tab-btn:has-text("卡牌")';
    this.chaptersList = '#chaptersList';
    this.charactersList = '#charactersList';
    this.cardsList = '#cardsList';
    this.addChapterButton = '#addChapterBtn';
    this.addCharButton = '#addCharBtn';
    this.addCardButton = '#addCardBtn';
    this.chapterItem = '.chapter-item';
    this.characterItem = '.character-item';
    this.cardItem = '.card-item';
    this.logoLink = 'a.logo';
    this.bookTitle = '#bookDetail h2';
    this.bookType = '#bookDetail .book-type';
  }

  async goto(bookId) {
    await super.goto(`/book?id=${bookId}`);
    await this.waitForLoadComplete();
  }

  async isBookDetailVisible() {
    return await this.isVisible(this.bookDetail);
  }

  async getTabCount() {
    const tabs = await this.page.$$(this.tabButtons);
    return tabs.length;
  }

  async clickChaptersTab() {
    await this.clickElement(this.chaptersTab);
    await this.waitForTimeout(300);
  }

  async clickCharactersTab() {
    await this.clickElement(this.charactersTab);
    await this.waitForTimeout(300);
  }

  async clickCardsTab() {
    await this.clickElement(this.cardsTab);
    await this.waitForTimeout(300);
  }

  async isChaptersListVisible() {
    return await this.isVisible(this.chaptersList);
  }

  async isCharactersListVisible() {
    return await this.isVisible(this.charactersList);
  }

  async isCardsListVisible() {
    return await this.isVisible(this.cardsList);
  }

  async getChaptersCount() {
    const chapters = await this.page.$$(this.chapterItem);
    return chapters.length;
  }

  async getCharactersCount() {
    const characters = await this.page.$$(this.characterItem);
    return characters.length;
  }

  async getCardsCount() {
    const cards = await this.page.$$(this.cardItem);
    return cards.length;
  }

  async clickChapter(index) {
    const chapters = await this.page.$$(this.chapterItem);
    if (chapters[index]) {
      await chapters[index].click();
    }
  }

  async isAddChapterButtonVisible() {
    return await this.isVisible(this.addChapterButton);
  }

  async isAddCharButtonVisible() {
    return await this.isVisible(this.addCharButton);
  }

  async isAddCardButtonVisible() {
    return await this.isVisible(this.addCardButton);
  }

  async clickLogo() {
    await this.clickElement(this.logoLink);
  }

  async getBookTitle() {
    return await this.getText(this.bookTitle);
  }

  async getBookType() {
    return await this.getText(this.bookType);
  }

  async waitForContent() {
    await this.waitForElement(this.bookDetail, 10000);
  }

  async clickAddChapter() {
    await this.clickElement(this.addChapterButton);
  }

  async clickAddCharacter() {
    await this.clickElement(this.addCharButton);
  }

  async clickAddCard() {
    await this.clickElement(this.addCardButton);
  }
}
