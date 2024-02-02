import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisProvider } from './redis.provider';

@Module({
  imports: [],
  providers: [...RedisProvider, RedisService],
  exports: [RedisService, ...RedisProvider],
})
export class RedisModule {}
