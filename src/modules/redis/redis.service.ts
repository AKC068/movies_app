import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private connection: Redis;

  public async buildConnection() {
    this.connection = new Redis();
    // return this.connection;
  }

  public async getItems(key: string) {
    const getItems = await this.connection.get(key);
    return getItems;
  }

  public async setItems(key: string, value: string) {
    const setItems = await this.connection.set(key, value, 'EX', 1000);
    return setItems;
  }
}
