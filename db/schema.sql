CREATE TABLE IF NOT EXISTS rooms (
    room_id SERIAL PRIMARY KEY,
    room_number VARCHAR(100) NOT NULL UNIQUE,
    room_type VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    accessible BOOLEAN NOT NULL,
    features TEXT[]
);

INSERT INTO rooms (room_number, room_type, price, accessible, features) 
VALUES ('101', 'Single', 100, true, ARRAY['TV', 'WiFi', 'Safe'])
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES rooms(room_id),
    guest_name VARCHAR(100) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL
);