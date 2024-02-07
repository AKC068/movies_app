import { Module } from "@nestjs/common";
import { DatabaseProvider } from "./database.providers";
import { DatabaseService } from "./database.service";

@Module({
  imports: [],
  providers: [...DatabaseProvider, DatabaseService],
  exports: [...DatabaseProvider, DatabaseService],
})
export class DatabaseModule {}
