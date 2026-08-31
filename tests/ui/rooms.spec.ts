import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { RoomsPage } from "../../pages/RoomsPage";

test("rooms table is visible", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const roomsPage = new RoomsPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "password");

  await roomsPage.tableIsVisible();
});

test("create room", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const roomsPage = new RoomsPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "password");

  await roomsPage.createRoom({
    roomNumber: "104",
    type: "Single",
    accessibility: "false",
    price: "100",
    amenities: {
      wifi: true,
      tv: true,
    },
  });

  await expect(page.getByText("104")).toBeVisible();
});

test("delete room", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const roomsPage = new RoomsPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "password");

  await roomsPage.deleteRoom("104");

  await expect(page.getByText("104")).not.toBeVisible();
});
