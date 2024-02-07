import { RedisService } from "./redis.service";

export const RedisProvider = [
  {
    provide: "REDIS",
    useFactory: async () => {
      try {
        const cacheService = new RedisService();
        cacheService.buildConnection();
        return cacheService;
      } catch (error) {
        throw new Error(
          `Something went wrong while building connection with redis! \n Error: ${error}`,
        );
      }
    },
  },
];
