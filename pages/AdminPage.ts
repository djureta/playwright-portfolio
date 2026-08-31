import { Locator, Page } from "@playwright/test";
import { BasePage } from "../helpers/BasePage";

export class AdminPage extends BasePage {
  readonly logoutButton: Locator;
  readonly roomsButton: Locator;

  constructor(page: Page) {
    super(page);

    this.logoutButton = this.page.getByRole("button", { name: "Logout" });
    this.roomsButton = this.page.getByRole("link", { name: "Rooms" });
  }

  async logout() {
    await this.logoutButton.click;
  }

  async navigateToRooms() {
    await this.roomsButton.click();
  }
}
