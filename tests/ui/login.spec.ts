import { test, expect } from "@playwright/test";
import { AdminPage } from "../../pages/AdminPage";
import { LoginPage } from "../../pages/LoginPage";

test("wrong login credentials test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "admin");

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("successful login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "password");

  await expect(page.getByRole("link", { name: "Rooms" })).toBeVisible();
});

test("successful logout test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("admin", "password");
  await adminPage.logout();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});
