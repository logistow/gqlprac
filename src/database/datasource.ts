import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  entities: [],
  logging: false,
  synchronize: true,
});
