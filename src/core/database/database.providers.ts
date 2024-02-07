import { DatabaseService } from "./database.service";

export const DatabaseProvider = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      try {
        const sequelize = new DatabaseService();
        const database = await sequelize.connectToDatabase();
        return database.models;
      } catch (error) {
        throw new Error(
          `Something went wrong while connecting to database! \n Error: ${error}`,
        );
      }
    },
  },
];
