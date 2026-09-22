import { test, expect } from "@playwright/test";
import { AdminPage } from "../../pages/AdminPage";
import { LoginPage } from "../../pages/LoginPage";

test("unsuccessful login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateTo("/admin");
  await loginPage.login("wrongusername", "wrongpassword");

  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test.describe("authenticated tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo("/admin");
    await loginPage.login(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );
    await page.waitForURL("**/admin");
  });

  test("successful login test", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Rooms" })).toBeVisible();
  });

  test("successful logout test", async ({ page }) => {
    const adminPage = new AdminPage(page);
    await adminPage.logout();
    await page.waitForURL("**/admin");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
