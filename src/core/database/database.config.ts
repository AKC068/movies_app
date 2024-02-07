import { Dialect } from "sequelize";
import { dbConfigInterface } from "./dbConfig.interface";

export const databaseConfig: dbConfigInterface = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  dialect: "postgres" as Dialect,
};
