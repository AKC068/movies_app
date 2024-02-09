import { DatabaseService } from "./database.service";

export const DatabaseProvider = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new DatabaseService();
      const database = await sequelize.connectToDatabase();
      return database.models;
    },
  },
];
