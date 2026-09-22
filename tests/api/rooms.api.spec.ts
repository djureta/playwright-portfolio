import { test, expect } from "@playwright/test";

let token: string;

test.beforeEach(async ({ request }) => {
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
  });
  const body = await loginResponse.json();
  token = body.token;
});

test("GET all rooms", async ({ request }) => {
  const response = await request.get("/api/room");

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.rooms).toBeDefined();
  expect(body.rooms.length).toBeGreaterThan(0);
});

test("POST add room", async ({ request }) => {
  const createRoomResponse = await request.post("/api/room", {
    data: {
      roomName: "111",
      roomPrice: "555",
      type: "Suite",
      accessible: true,
      features: ["WiFi", "TV", "Refresments", "Safe", "Views"],
    },
    headers: {
      Cookie: `token=${token}`,
    },
  });

  expect(createRoomResponse.status()).toBe(200);

  const createBody = await createRoomResponse.json();
  expect(createBody.success).toBe(true);
});

test("PUT update room", async ({ request }) => {
  const getRoomsResponse = await request.get("/api/room");
  const roomsBody = await getRoomsResponse.json();
  const roomId = roomsBody.rooms[0].roomid;

  const updateRoomResponse = await request.put(`/api/room/${roomId}`, {
    data: {
      roomName: roomsBody.rooms[0].roomName,
      roomPrice: "530",
      type: roomsBody.rooms[0].type,
      accessible: roomsBody.rooms[0].accessible,
      features: roomsBody.rooms[0].features,
    },
    headers: {
      Cookie: `token=${token}`,
    },
  });

  expect(updateRoomResponse.status()).toBe(202);
});

test("DELETE room by ID", async ({ request }) => {
  const getAllRooms = await request.get("/api/room");
  const roomsBody = await getAllRooms.json();
  const roomId = roomsBody.rooms[0].roomid;

  const deleteResponse = await request.delete(`/api/room/${roomId}`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  expect(deleteResponse.status()).toBe(202);
});
