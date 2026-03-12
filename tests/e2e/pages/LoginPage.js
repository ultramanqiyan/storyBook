import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.submitButton = 'button[type="submit"]';
    this.messageElement = '#message';
    this.form = '#loginForm';
    this.logoLink = 'a.logo';
  }

  async goto() {
    await super.goto('/login');
    await this.waitForElement(this.form);
  }

  async fillEmail(email) {
    await this.fillInput(this.emailInput, email);
  }

  async fillPassword(password) {
    await this.fillInput(this.passwordInput, password);
  }

  async submit() {
    await this.clickElement(this.submitButton);
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async getMessage() {
    await this.waitForElement(this.messageElement);
    return await this.getText(this.messageElement);
  }

  async getMessageClass() {
    await this.waitForElement(this.messageElement);
    const element = await this.page.$(this.messageElement);
    return await element.getAttribute('class');
  }

  async isSubmitButtonDisabled() {
    return await this.isDisabled(this.submitButton);
  }

  async clickLogo() {
    await this.clickElement(this.logoLink);
  }

  async isFormVisible() {
    return await this.isVisible(this.form);
  }

  async getEmailValue() {
    return await this.page.inputValue(this.emailInput);
  }

  async getPasswordValue() {
    return await this.page.inputValue(this.passwordInput);
  }

  async clearForm() {
    await this.page.fill(this.emailInput, '');
    await this.page.fill(this.passwordInput, '');
  }

  async registerNewUser(email, password) {
    await this.login(email, password);
    await this.waitForNavigation(/bookshelf/);
    const userId = await this.getLocalStorage('userId');
    const storedEmail = await this.getLocalStorage('userEmail');
    return { userId, email: storedEmail };
  }

  async loginExistingUser(email, password) {
    await this.login(email, password);
    await this.waitForNavigation(/bookshelf/);
    return await this.getLocalStorage('userId');
  }
}
