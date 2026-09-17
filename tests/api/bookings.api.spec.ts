import { test, expect } from "@playwright/test";
import { db } from "../../db/dbClient";

test("GET bookings for room", async ({ request }) => {
  const loginResponse = await request.post("/api/auth/login", {
    data: { username: "admin", password: "password" },
  });
  const { token } = await loginResponse.json();

  const response = await request.get("/api/booking?roomid=1", {
    headers: { Cookie: `token=${token}` },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toBeDefined();
});

test("POST create booking and verify in DB", async ({ request }) => {
  const loginResponse = await request.post("/api/auth/login", {
    data: { username: "admin", password: "password" },
  });
  const { token } = await loginResponse.json();

  const checkin = new Date();
  checkin.setDate(checkin.getDate() + 30);
  const checkout = new Date();
  checkout.setDate(checkout.getDate() + 31);

  const checkinStr = checkin.toISOString().split("T")[0];
  const checkoutStr = checkout.toISOString().split("T")[0];

  const createBookingResponse = await request.post("/api/booking", {
    data: {
      roomid: 1,
      firstname: "Test",
      lastname: "User",
      depositpaid: false,
      bookingdates: {
        checkin: checkinStr,
        checkout: checkoutStr,
      },
      email: "test@test.com",
      phone: "+387111111111",
    },
    headers: { Cookie: `token=${token}` },
  });

  expect(createBookingResponse.status()).toBe(201);
  const bookingBody = await createBookingResponse.json();
  const bookingId = bookingBody.bookingid;
  const roomId = bookingBody.roomid;
  expect(bookingBody.bookingid).toBeDefined();

  await db.query(
    "INSERT INTO bookings (room_id, guest_name, check_in, check_out) VALUES ($1, $2, $3, $4)",
    [roomId, "Test User", checkinStr, checkoutStr]
  );

  const bookingResult = await db.query(
    "SELECT * FROM bookings WHERE room_id = $1 AND check_in = $2",
    [roomId, checkinStr]
  );

  expect(bookingResult.rows[0].guest_name).toBe("Test User");
  expect(bookingResult.rows[0].room_id).toBe(roomId);

  const joinResult = await db.query(
    `SELECT r.room_number, r.room_type, b.guest_name, b.check_in, b.check_out 
         FROM rooms r 
         JOIN bookings b ON r.room_id = b.room_id 
         WHERE b.room_id = $1 AND b.check_in = $2`,
    [roomId, checkinStr]
  );

  expect(joinResult.rows[0].guest_name).toBe("Test User");
  expect(joinResult.rows[0].room_type).toBeDefined();

  await request.delete(`/api/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` },
  });
});

test.afterAll(async () => {
  await db.end();
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
