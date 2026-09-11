import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test("check availability form is visible", async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto("/");
  await homePage.checkAvailabilityFormIsVisible();
});

test("check redirection to the data entrance after room is selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await page.goto("/");

  await homePage.checkAvailabilityFormIsVisible();
  await homePage.clickBookNow();
});

test("check successful reservation of the room", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto("/");

  await homePage.checkAvailabilityFormIsVisible();
  await homePage.clickBookNow();
  await homePage.reserveTheRoom(
    "TestName",
    "TestName",
    "thisIsATestEmail@test.com",
    "+387111111111"
  );
});

test.afterEach(async ({ request }) => {
  const loginResponse = await request.post("/api/auth/login", {
    data: { username: "admin", password: "password" },
  });
  const { token } = await loginResponse.json();

  for (const roomId of [1, 2, 3]) {
    const response = await request.get(`/api/booking?roomid=${roomId}`, {
      headers: { Cookie: `token=${token}` },
    });
    const body = await response.json();

    if (body.bookings) {
      for (const booking of body.bookings) {
        await request.delete(`/api/booking/${booking.bookingid}`, {
          headers: { Cookie: `token=${token}` },
        });
      }
    }
  }
});
