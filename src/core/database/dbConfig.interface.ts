import { Dialect } from "sequelize";

export interface dbConfigInterface {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  dialect?: Dialect;
}
