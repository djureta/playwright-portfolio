import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../helpers/BasePage";
import { RoomDetails } from "../utils/types";

export class RoomsPage extends BasePage {
  readonly roomsTable: Locator;
  readonly roomNumberInput: Locator;
  readonly roomTypeDropdown: Locator;
  readonly roomAccessibility: Locator;
  readonly roomPriceInput: Locator;
  readonly wifiCheckbox: Locator;
  readonly refreshmentsCheckbox: Locator;
  readonly tvCheckbox: Locator;
  readonly safeCheckbox: Locator;
  readonly radioCheckbox: Locator;
  readonly viewsCheckbox: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    super(page);

    this.roomsTable = this.page.getByText("Room #");
    this.roomNumberInput = this.page.getByTestId("roomName");
    this.roomTypeDropdown = this.page.locator("#type");
    this.roomAccessibility = this.page.locator("#accessible");
    this.roomPriceInput = this.page.locator("#roomPrice");
    this.wifiCheckbox = this.page.getByRole("checkbox", { name: "WiFi" });
    this.refreshmentsCheckbox = this.page.getByRole("checkbox", {
      name: "Refreshments",
    });
    this.tvCheckbox = this.page.getByRole("checkbox", { name: "TV" });
    this.safeCheckbox = this.page.getByRole("checkbox", { name: "Safe" });
    this.radioCheckbox = this.page.getByRole("checkbox", { name: "Radio" });
    this.viewsCheckbox = this.page.getByRole("checkbox", { name: "Views" });
    this.createButton = this.page.getByRole("button", { name: "Create" });
  }

  async tableIsVisible() {
    await expect(this.roomsTable).toBeVisible();
  }

  async createRoom(details: RoomDetails) {
    await this.roomNumberInput.fill(details.roomNumber);
    await this.roomTypeDropdown.selectOption(details.type);
    await this.roomAccessibility.selectOption(details.accessibility);
    await this.roomPriceInput.fill(details.price);

    if (details.amenities?.wifi) await this.wifiCheckbox.check();
    if (details.amenities?.tv) await this.tvCheckbox.check();
    if (details.amenities?.radio) await this.radioCheckbox.check();
    if (details.amenities?.refreshments)
      await this.refreshmentsCheckbox.check();
    if (details.amenities?.safe) await this.safeCheckbox.check();
    if (details.amenities?.views) await this.viewsCheckbox.check();

    await this.createButton.click();
  }

  async deleteRoom(roomNumber: string) {
    await this.page
      .getByTestId("roomlisting")
      .filter({ hasText: roomNumber })
      .locator(".roomDelete")
      .click();
  }
}
