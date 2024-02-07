import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { DirectorsModule } from "./modules/directors/directors.module";
import { AuthModule } from "./modules/auth/auth.module";
import { WishlistModule } from "./modules/wishlist/wishlist.module";
import { RedisModule } from "./modules/redis/redis.module";

@Module({
  imports: [
    UsersModule,
    MoviesModule,
    DirectorsModule,
    AuthModule,
    WishlistModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
