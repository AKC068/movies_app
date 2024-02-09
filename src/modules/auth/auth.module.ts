import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { RedisModule } from "../redis/redis.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./auth.local.strategy";
import { SessionSerializer } from "./session.serializer";

@Module({
  imports: [
    RedisModule,
    UsersModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
