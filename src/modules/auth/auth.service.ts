// import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
// import { extractTokenFromHeader } from './auth.utils';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('REDIS') private redisService: RedisService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const user = await this.usersService.getUser(email);

      if (user?.password !== password)
        return {
          message: `Enter correct password`,
        };

      if (user?.id) {
        const uId = user.id;
        const getAccessToken = await this.getJwtToken(
          `ACCESS_TOKEN_USER_${uId}`,
        );
        console.log(`\ngetAccessToken: ${getAccessToken}\n`);

        if (getAccessToken !== null)
          return {
            message: `${user.name}, you already have a session running!`,
          };
        else {
          const payload = { id: user.id, email: user.email };
          const access_token = await this.jwtService.signAsync(payload, {
            secret: 'movie_app',
          });
          const settingToken = await this.setJwtToken(
            `ACCESS_TOKEN_USER_${uId}`,
            access_token,
          );
          console.log(`Welcome! ${user?.name}\n`);
          console.log(settingToken, '\n');
          return {
            access_token: access_token,
          };
        }
      }
    } catch (error) {
      throw new Error(
        `Something went wrong while signing in the user! \n Error: ${error}`,
      );
    }
  }

  async clearRedisCache(id: string) {
    try {
      console.log(`ACCESS_TOKEN_USER_${id}`);

      const removeToken = await this.delJwtToken(`ACCESS_TOKEN_USER_${id}`);
      const removeMovieAssociatedWithUser = await this.delJwtToken(
        `MOVIES_USER_${id}`,
      );

      return {
        removeToken: removeToken,
        removeMovieAssociatedWithUser: removeMovieAssociatedWithUser,
      };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async setJwtToken(key: string, value: string) {
    try {
      const jwtTokenSetStatus = await this.redisService.setItems(
        key,
        value,
        100,
      );
      return `jwtTokenSetStatus: ${jwtTokenSetStatus}`;
    } catch (error) {
      throw new Error(
        `Something went wrong while setting token! \n Error: ${error}`,
      );
    }
  }

  async getJwtToken(key: string) {
    try {
      const jwtTokenGet = await this.redisService.getItems(key);
      return jwtTokenGet;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting token! \n Error: ${error}`,
      );
    }
  }

  async delJwtToken(key: string) {
    try {
      const deleteToken = await this.redisService.deleteItems(key);
      return `deleteToken: ${deleteToken}`;
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting token! \n Error: ${error}`,
      );
    }
  }
}
