import { BasePage } from './BasePage.js';

export class DirectorPage extends BasePage {
  constructor(page) {
    super(page);
    this.stageSection = '.stage-section';
    this.startShootingButton = '#start-shooting';
    this.selectionHint = '#selection-hint';
    this.characterCards = '#character-cards';
    this.weatherCards = '#weather-cards';
    this.terrainCards = '#terrain-cards';
    this.adventureCards = '#adventure-cards';
    this.equipmentCards = '#equipment-cards';
    this.selectedCards = '#selected-cards';
    this.cardItem = '.card-item';
    this.selectedCard = '.selected-card';
    this.logoLink = 'a.logo';
  }

  async goto(bookId) {
    await super.goto(`/director?bookId=${bookId}`);
    await this.waitForElement(this.stageSection, 10000);
  }

  async isStageVisible() {
    return await this.isVisible(this.stageSection);
  }

  async isStartShootingButtonVisible() {
    return await this.isVisible(this.startShootingButton);
  }

  async isStartShootingButtonDisabled() {
    return await this.isDisabled(this.startShootingButton);
  }

  async clickStartShooting() {
    await this.clickElement(this.startShootingButton);
  }

  async getSelectionHint() {
    return await this.getText(this.selectionHint);
  }

  async isCharacterCardsVisible() {
    return await this.isVisible(this.characterCards);
  }

  async isWeatherCardsVisible() {
    return await this.isVisible(this.weatherCards);
  }

  async isTerrainCardsVisible() {
    return await this.isVisible(this.terrainCards);
  }

  async isAdventureCardsVisible() {
    return await this.isVisible(this.adventureCards);
  }

  async isEquipmentCardsVisible() {
    return await this.isVisible(this.equipmentCards);
  }

  async getCharacterCardsCount() {
    const cards = await this.page.$$('#character-cards .card-item');
    return cards.length;
  }

  async getWeatherCardsCount() {
    const cards = await this.page.$$('#weather-cards .card-item');
    return cards.length;
  }

  async getTerrainCardsCount() {
    const cards = await this.page.$$('#terrain-cards .card-item');
    return cards.length;
  }

  async getAdventureCardsCount() {
    const cards = await this.page.$$('#adventure-cards .card-item');
    return cards.length;
  }

  async getEquipmentCardsCount() {
    const cards = await this.page.$$('#equipment-cards .card-item');
    return cards.length;
  }

  async selectCard(category, index) {
    const cards = await this.page.$$(`#${category}-cards .card-item`);
    if (cards[index]) {
      await cards[index].click();
    }
  }

  async selectCharacterCard(index) {
    await this.selectCard('character', index);
  }

  async selectWeatherCard(index) {
    await this.selectCard('weather', index);
  }

  async selectTerrainCard(index) {
    await this.selectCard('terrain', index);
  }

  async selectAdventureCard(index) {
    await this.selectCard('adventure', index);
  }

  async selectEquipmentCard(index) {
    await this.selectCard('equipment', index);
  }

  async getSelectedCardsCount() {
    const cards = await this.page.$$('#selected-cards .selected-card');
    return cards.length;
  }

  async deselectCard(index) {
    const cards = await this.page.$$('#selected-cards .selected-card');
    if (cards[index]) {
      await cards[index].click();
    }
  }

  async clickLogo() {
    await this.clickElement(this.logoLink);
  }

  async waitForCardsToLoad() {
    await this.waitForElement('#character-cards .card-item', 10000);
  }

  async getCardName(category, index) {
    const card = await this.page.$(`#${category}-cards .card-item:nth-child(${index + 1}) .card-name`);
    return card ? await card.textContent() : null;
  }

  async hasSelectionComplete() {
    const hint = await this.getSelectionHint();
    return hint.includes('已选择') || hint.includes('完整');
  }

  async getSelectedCardNames() {
    const cards = await this.page.$$('#selected-cards .selected-card');
    const names = [];
    for (const card of cards) {
      const nameEl = await card.$('.card-name');
      if (nameEl) {
        names.push(await nameEl.textContent());
      }
    }
    return names;
  }
}
