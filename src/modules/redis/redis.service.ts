import { Redis } from "ioredis";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RedisService {
  private connection: Redis;

  public async buildConnection() {
    this.connection = new Redis();
  }

  public async checkForTheKey(key: string) {
    try {
      const getConfirmationForKey = await this.connection.exists(key);
      return getConfirmationForKey;
    } catch (error) {
      throw new Error(
        `Something went wrong while checking for key in redis service! \n Error: ${error}`,
      );
    }
  }

  public async getItems(key: string) {
    try {
      const getItems = await this.connection.get(key);
      return getItems;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting from redis service! \n Error: ${error}`,
      );
    }
  }

  public async setItems(key: string, value: string, ttl?: number) {
    try {
      const setItems = await this.connection.set(key, value, "EX", ttl);
      return setItems;
    } catch (error) {
      throw new Error(
        `Something went wrong while setting in redis service! \n Error: ${error}`,
      );
    }
  }

  public async deleteItems(key: string) {
    try {
      const deleteItems = await this.connection.del(key);
      return deleteItems;
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting in redis service! \n Error: ${error}`,
      );
    }
  }
}
