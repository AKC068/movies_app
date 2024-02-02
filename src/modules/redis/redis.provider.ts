import { RedisService } from './redis.service';

export const RedisProvider = [
  {
    provide: 'REDIS',
    useFactory: async () => {
      const cacheService = new RedisService();
      cacheService.buildConnection();
      return cacheService;
    },
  },
];
