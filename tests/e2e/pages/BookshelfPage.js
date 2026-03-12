import { BasePage } from './BasePage.js';

export class BookshelfPage extends BasePage {
  constructor(page) {
    super(page);
    this.userEmail = '#userEmail';
    this.myBooksSection = '#myBooks';
    this.presetBooksSection = '#presetBooks';
    this.createBookButton = 'button:has-text("新建书籍")';
    this.createBookModal = '#createBookModal';
    this.bookTitleInput = '#bookTitle';
    this.bookTypeSelect = '#bookType';
    this.modalSubmitButton = '#createBookForm button[type="submit"]';
    this.modalCancelButton = 'button:has-text("取消")';
    this.logoutButton = 'button:has-text("退出")';
    this.logoLink = 'a.logo';
    this.pageTitle = 'h2';
  }

  async goto() {
    await super.goto('/bookshelf');
  }

  async getUserEmail() {
    return await this.getText(this.userEmail);
  }

  async getMyBooks() {
    const books = await this.page.$$('#myBooks .book-card');
    return books.length;
  }

  async getPresetBooks() {
    const books = await this.page.$$('#presetBooks .book-card');
    return books.length;
  }

  async clickCreateBook() {
    await this.clickElement(this.createBookButton);
    await this.waitForElement(this.createBookModal);
  }

  async fillBookTitle(title) {
    await this.fillInput(this.bookTitleInput, title);
  }

  async selectBookType(type) {
    await this.selectOption(this.bookTypeSelect, type);
  }

  async submitCreateBook() {
    await this.clickElement(this.modalSubmitButton);
  }

  async cancelCreateBook() {
    await this.clickElement(this.modalCancelButton);
  }

  async createBook(title, type) {
    await this.clickCreateBook();
    await this.fillBookTitle(title);
    await this.selectBookType(type);
    await this.submitCreateBook();
    await this.waitForTimeout(500);
  }

  async logout() {
    await this.clickElement(this.logoutButton);
  }

  async clickBookByIndex(index) {
    const books = await this.page.$$('#myBooks .book-card');
    if (books[index]) {
      await books[index].click();
    }
  }

  async clickPresetBookByIndex(index) {
    const books = await this.page.$$('#presetBooks .book-card');
    if (books[index]) {
      await books[index].click();
    }
  }

  async isModalVisible() {
    return await this.isVisible(this.createBookModal);
  }

  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  async clickLogo() {
    await this.clickElement(this.logoLink);
  }

  async getBookTitles() {
    const books = await this.page.$$('#myBooks .book-card h3');
    const titles = [];
    for (const book of books) {
      titles.push(await book.textContent());
    }
    return titles;
  }

  async hasNoBooks() {
    const text = await this.getText(this.myBooksSection);
    return text.includes('暂无');
  }

  async deleteBookByIndex(index) {
    const deleteButtons = await this.page.$$('#myBooks .delete-btn');
    if (deleteButtons[index]) {
      await deleteButtons[index].click();
    }
  }
}
