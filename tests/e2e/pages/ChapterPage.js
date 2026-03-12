import { BasePage } from './BasePage.js';

export class ChapterPage extends BasePage {
  constructor(page) {
    super(page);
    this.chapterContent = '.chapter-content';
    this.storyText = '.story-text';
    this.chapterNav = '.chapter-nav';
    this.puzzleSection = '#puzzleSection';
    this.puzzleQuestion = '#puzzleQuestion';
    this.puzzleAnswerInput = '#puzzleAnswer';
    this.submitAnswerButton = '#submitAnswer';
    this.puzzleResult = '#puzzleResult';
    this.attemptsIndicator = '#attemptsIndicator';
    this.cardDropAnimation = '#cardDropAnimation';
    this.droppedCard = '#droppedCard';
    this.collectCardButton = '#collectCard';
    this.logoLink = 'a.logo';
    this.tocLink = 'a:has-text("目录")';
    this.nextChapterLink = 'a:has-text("下一章")';
    this.prevChapterLink = 'a:has-text("上一章")';
  }

  async goto(chapterId) {
    await super.goto(`/chapter?id=${chapterId}`);
    await this.waitForElement(this.chapterContent, 10000);
  }

  async isChapterContentVisible() {
    return await this.isVisible(this.chapterContent);
  }

  async isStoryTextVisible() {
    return await this.isVisible(this.storyText);
  }

  async isChapterNavVisible() {
    return await this.isVisible(this.chapterNav);
  }

  async isPuzzleSectionVisible() {
    return await this.isVisible(this.puzzleSection);
  }

  async getPuzzleQuestion() {
    return await this.getText(this.puzzleQuestion);
  }

  async fillPuzzleAnswer(answer) {
    await this.fillInput(this.puzzleAnswerInput, answer);
  }

  async submitPuzzleAnswer() {
    await this.clickElement(this.submitAnswerButton);
  }

  async solvePuzzle(answer) {
    await this.fillPuzzleAnswer(answer);
    await this.submitPuzzleAnswer();
  }

  async getPuzzleResult() {
    return await this.getText(this.puzzleResult);
  }

  async getAttemptsIndicator() {
    return await this.getText(this.attemptsIndicator);
  }

  async isCardDropAnimationVisible() {
    return await this.isVisible(this.cardDropAnimation);
  }

  async getDroppedCardName() {
    return await this.getText(this.droppedCard);
  }

  async clickCollectCard() {
    await this.clickElement(this.collectCardButton);
  }

  async clickLogo() {
    await this.clickElement(this.logoLink);
  }

  async clickToc() {
    await this.clickElement(this.tocLink);
  }

  async clickNextChapter() {
    const nextBtn = await this.page.$(this.nextChapterLink);
    if (nextBtn && await nextBtn.isVisible()) {
      await nextBtn.click();
    }
  }

  async clickPrevChapter() {
    const prevBtn = await this.page.$(this.prevChapterLink);
    if (prevBtn && await prevBtn.isVisible()) {
      await prevBtn.click();
    }
  }

  async hasNextChapter() {
    const nextBtn = await this.page.$(this.nextChapterLink);
    return nextBtn ? await nextBtn.isVisible() : false;
  }

  async hasPrevChapter() {
    const prevBtn = await this.page.$(this.prevChapterLink);
    return prevBtn ? await prevBtn.isVisible() : false;
  }

  async waitForPuzzle() {
    await this.waitForElement(this.puzzleSection, 5000);
  }

  async waitForCardDrop() {
    await this.waitForElement(this.cardDropAnimation, 5000);
  }

  async getRemainingAttempts() {
    const text = await this.getAttemptsIndicator();
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async isPuzzleSolved() {
    const result = await this.getPuzzleResult();
    return result.includes('正确') || result.includes('成功');
  }
}
