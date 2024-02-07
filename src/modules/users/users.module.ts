import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserRepository } from "./users.repository";
import { DatabaseModule } from "src/core/database/database.module";
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
