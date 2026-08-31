import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    await this.page.goto(path, { waitUntil: "load" });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
