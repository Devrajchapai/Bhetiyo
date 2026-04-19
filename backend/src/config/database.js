import "dotenv/config";
import { DataSource } from "typeorm";

export const BhetiyoDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZATON,
  logging: true,
  entities: ["./src/entities/*.js"],
  charset: "utf8mb4",
});

const DatabaseConnection = () => {
  BhetiyoDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully 🔎🛢✔️");
    })
    .catch((error) => {
      console.log("Failed to connect database ❌❌❌");
      console.error("error: " + error);
    });
};

export default DatabaseConnection;
