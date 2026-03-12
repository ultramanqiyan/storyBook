import { BasePage } from './BasePage.js';

export class BookCreatePage extends BasePage {
  constructor(page) {
    super(page);
    this.progressBar = '.progress-bar';
    this.progressSteps = '.progress-step';
    this.step1 = '#step1';
    this.step2 = '#step2';
    this.step3 = '#step3';
    this.step4 = '#step4';
    this.bookTitleInput = '#bookTitle';
    this.bookTypeSelect = '#bookType';
    this.protagonistNameInput = '#protagonistName';
    this.protagonistTypeSelect = '#protagonistType';
    this.protagonistPersonalitySelect = '#protagonistPersonality';
    this.protagonistSpeechStyleSelect = '#protagonistSpeechStyle';
    this.addCharacterButton = '.btn-add-character';
    this.supportingCharacters = '.supporting-character';
    this.backLink = 'a.back-link';
    this.viewBookButton = '#view-book-btn';
    this.returnBookshelfLink = 'a:has-text("返回书架")';
    this.successMessage = '.success-message';
  }

  async goto() {
    await super.goto('/book-create.html');
    await this.waitForLoadComplete();
  }

  async getStepCount() {
    const steps = await this.page.$$(this.progressSteps);
    return steps.length;
  }

  async isStepActive(stepNumber) {
    const step = await this.page.$(`.progress-step:nth-child(${stepNumber})`);
    if (!step) return false;
    const className = await step.getAttribute('class');
    return className?.includes('active') || false;
  }

  async fillBookTitle(title) {
    await this.fillInput(this.bookTitleInput, title);
  }

  async selectBookType(type) {
    await this.selectOption(this.bookTypeSelect, type);
  }

  async fillProtagonistName(name) {
    await this.fillInput(this.protagonistNameInput, name);
  }

  async selectProtagonistType(roleType) {
    await this.selectOption(this.protagonistTypeSelect, roleType);
  }

  async selectProtagonistPersonality(personality) {
    await this.selectOption(this.protagonistPersonalitySelect, personality);
  }

  async selectProtagonistSpeechStyle(style) {
    await this.selectOption(this.protagonistSpeechStyleSelect, style);
  }

  async clickNextStep() {
    const activeStep = await this.page.$('[id^="step"].active');
    if (activeStep) {
      const nextButton = await activeStep.$('button:has-text("下一步")');
      if (nextButton) {
        await nextButton.click();
      }
    }
  }

  async clickPreviousStep() {
    const activeStep = await this.page.$('[id^="step"].active');
    if (activeStep) {
      const prevButton = await activeStep.$('button:has-text("上一步")');
      if (prevButton) {
        await prevButton.click();
      }
    }
  }

  async addSupportingCharacter() {
    await this.clickElement(this.addCharacterButton);
  }

  async getSupportingCharacterCount() {
    const chars = await this.page.$$(this.supportingCharacters);
    return chars.length;
  }

  async fillSupportingCharacter(index, data) {
    const char = await this.page.$(`.supporting-character:nth-child(${index + 1})`);
    if (char) {
      if (data.name) {
        const nameInput = await char.$('[name^="supporting"][name$="name"]');
        if (nameInput) await nameInput.fill(data.name);
      }
      if (data.roleType) {
        const roleSelect = await char.$('[name^="supporting"][name$="role_type"]');
        if (roleSelect) await roleSelect.selectOption(data.roleType);
      }
    }
  }

  async removeSupportingCharacter(index) {
    const removeButtons = await this.page.$$('.remove-character');
    if (removeButtons[index]) {
      await removeButtons[index].click();
    }
  }

  async isAddCharacterButtonDisabled() {
    return await this.isDisabled(this.addCharacterButton);
  }

  async clickBackLink() {
    await this.clickElement(this.backLink);
  }

  async clickViewBook() {
    await this.clickElement(this.viewBookButton);
  }

  async clickReturnBookshelf() {
    await this.clickElement(this.returnBookshelfLink);
  }

  async getSuccessMessage() {
    return await this.getText(this.successMessage);
  }

  async isStep1Visible() {
    return await this.isVisible(this.step1);
  }

  async isStep2Visible() {
    return await this.isVisible(this.step2);
  }

  async isStep3Visible() {
    return await this.isVisible(this.step3);
  }

  async isStep4Visible() {
    return await this.isVisible(this.step4);
  }

  async waitForStep(stepNumber) {
    await this.page.waitForFunction((step) => {
      const stepEl = document.querySelector(`#step${step}`);
      return stepEl && stepEl.classList.contains('active');
    }, stepNumber, { timeout: 15000 });
  }

  async completeFullFlow(bookData) {
    await this.fillBookTitle(bookData.title);
    await this.waitForTimeout(500);
    await this.selectBookType(bookData.type);
    await this.clickNextStep();
    
    await this.waitForStep(2);
    await this.fillProtagonistName(bookData.protagonistName || '主角');
    await this.clickNextStep();
    
    await this.waitForStep(3);
    if (bookData.supportingCharacters) {
      for (let i = 0; i < bookData.supportingCharacters.length; i++) {
        if (i > 0) await this.addSupportingCharacter();
        await this.fillSupportingCharacter(i, bookData.supportingCharacters[i]);
      }
    }
    await this.clickNextStep();
    
    await this.waitForStep(4);
  }
}
