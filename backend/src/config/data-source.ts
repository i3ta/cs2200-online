import { DataSource } from "typeorm";
import { config } from "./config";

export const db = new DataSource({
  type: "mariadb",
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName,
});

try {
  db.initialize();
} catch (err: any) {
  console.error("Error initializing db connection:", err);
}
