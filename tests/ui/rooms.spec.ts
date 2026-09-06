import { test, expect } from "@playwright/test";
import { db } from "../../db/dbClient";
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
    accessibility: "true",
    price: "100",
    amenities: {
      wifi: true,
      tv: true,
    },
  });

  await expect(page.getByText("104")).toBeVisible();

  await db.query(
    "INSERT INTO rooms (room_number, room_type, price, accessible, features) VALUES ($1, $2, $3, $4, $5)",
    ["104", "Single", 100, true, ["WiFi", "TV"]]
  );

  const result = await db.query("SELECT * FROM rooms WHERE room_number = $1", [
    "104",
  ]);

  expect(result.rows[0].room_number).toBe("104");
  expect(result.rows[0].room_type).toBe("Single");
  expect(result.rows[0].price).toBe(100);
});

test("delete room", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const roomsPage = new RoomsPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "password");

  await roomsPage.deleteRoom("104");

  await expect(page.getByText("104")).not.toBeVisible();
});

test.afterAll(async () => {
  await db.end();
});
