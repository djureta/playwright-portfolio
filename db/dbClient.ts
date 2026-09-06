import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "testdb",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "password",
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });

export const db = {
  query: (text: string, params?: unknown[]) => pool.query(text, params),
  end: () => pool.end(),
};
