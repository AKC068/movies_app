import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { DirectorsModule } from '../directors/directors.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule, DatabaseModule, forwardRef(() => DirectorsModule)],
  providers: [MoviesRepository, MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
