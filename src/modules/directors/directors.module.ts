import { Module, forwardRef } from "@nestjs/common";
import { DirectorsController } from "./directors.controller";
import { DirectorsRepository } from "./directors.repository";
import { DirectorsService } from "./directors.service";
import { DatabaseModule } from "src/core/database/database.module";
import { MoviesModule } from "../movies/movies.module";

@Module({
  imports: [DatabaseModule, forwardRef(() => MoviesModule)],
  controllers: [DirectorsController],
  providers: [DirectorsRepository, DirectorsService],
  exports: [DirectorsService],
})
export class DirectorsModule {}
