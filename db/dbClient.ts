import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const createPool = () =>
  new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "testdb",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
  });

export const db = {
  query: (text: string, params?: unknown[]) => createPool().query(text, params),
  end: async () => {},
};
