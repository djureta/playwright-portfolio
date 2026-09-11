import { BasePage } from "../helpers/BasePage";
import { expect, Locator, Page } from "@playwright/test";

export class HomePage extends BasePage {
  readonly checkAvailablityAndBookStayHeader: Locator;
  readonly checkInDatePicker: Locator;
  readonly checkOutDatePicker: Locator;
  readonly checkAvailabilityButton: Locator;
  readonly ourRooms: Locator;
  readonly bookNowButton: Locator;
  readonly bookThisRoomHeading: Locator;
  readonly reserveRoomButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly bookingConfirmedHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.checkAvailablityAndBookStayHeader = this.page.getByRole("heading", {
      name: "Check Availability & Book",
    });
    this.checkInDatePicker = this.page.getByRole("textbox").first();
    this.checkOutDatePicker = this.page.getByRole("textbox").nth(1);
    this.checkAvailabilityButton = this.page.getByRole("button", {
      name: "Check Availability",
    });
    this.ourRooms = this.page.getByRole("heading", { name: "Our Rooms" });
    this.bookNowButton = this.page
      .getByRole("link", {
        name: "Book now",
        exact: true,
      })
      .first();
    this.bookThisRoomHeading = this.page.getByRole("heading", {
      name: "Book This Room",
    });
    this.reserveRoomButton = this.page.getByRole("button", {
      name: "Reserve Now",
    });
    this.firstNameInput = this.page.getByRole("textbox", { name: "Firstname" });
    this.lastNameInput = this.page.getByRole("textbox", { name: "Lastname" });
    this.emailInput = this.page.getByRole("textbox", { name: "Email" });
    this.phoneNumberInput = this.page.getByRole("textbox", { name: "Phone" });
    this.bookingConfirmedHeading = this.page.getByRole("heading", {
      name: "Booking Confirmed",
    });
  }

  async checkAvailabilityFormIsVisible() {
    await this.checkAvailabilityButton.scrollIntoViewIfNeeded();
    await expect(this.checkAvailabilityButton).toBeVisible();
  }

  async checkAvailability() {
    await this.checkAvailabilityButton.scrollIntoViewIfNeeded();
    await this.checkAvailabilityButton.click();
    await expect(this.ourRooms).toBeVisible();
  }

  async clickBookNow() {
    await this.bookNowButton.scrollIntoViewIfNeeded();
    await this.bookNowButton.click();
    await expect(this.bookThisRoomHeading).toBeVisible();
  }

  async reserveTheRoom(
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string
  ) {
    await this.reserveRoomButton.scrollIntoViewIfNeeded();
    await this.reserveRoomButton.click();
    await expect(this.firstNameInput).toBeVisible();

    await this.firstNameInput.fill(firstname);
    await this.lastNameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phoneNumber);

    await this.reserveRoomButton.click();
    await expect(this.bookingConfirmedHeading).toBeVisible();
  }
}
