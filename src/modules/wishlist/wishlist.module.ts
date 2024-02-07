import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { DatabaseModule } from 'src/core/database/database.module';
import { WishlistController } from './wishlist.controller';
import { RedisModule } from '../redis/redis.module';
import { WishlistRepository } from './wishlist.repository';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [AuthModule, DatabaseModule, RedisModule, MoviesModule],
  providers: [WishlistService, WishlistRepository],
  controllers: [WishlistController],
  exports: [WishlistService],
})
export class WishlistModule {}
