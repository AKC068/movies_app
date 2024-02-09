import { RedisService } from "../redis/redis.service";
import { UsersService } from "../users/users.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject("REDIS") private readonly redisService: RedisService,
  ) {}

  async logIn(username: string, password: string) {
    try {
      const user = await this.usersService.getUser(username);

      if (user?.password !== password)
        throw new UnauthorizedException(`Incorrect email or password`);

      return {
        userId: user.id,
        userName: user.name,
      };
    } catch (error) {
      throw new Error(
        `Something went wrong while signing in the user! \n Error: ${error}`,
      );
    }
  }

  // async signIn(email: string, password: string) {
  //   try {
  //     const user = await this.usersService.getUser(email);

  //     if (user?.password !== password)
  //       return {
  //         message: `Enter correct password`,
  //       };

  //     if (user?.id) {
  //       const uId = user.id;
  //       const getAccessToken = await this.getJwtToken(
  //         `ACCESS_TOKEN_USER_${uId}`,
  //       );
  //       console.log(`\ngetAccessToken: ${getAccessToken}\n`);

  //       if (getAccessToken !== null)
  //         return {
  //           message: `${user.name}, you already have a session running!`,
  //         };
  //       else {
  //         const payload = { id: user.id, email: user.email };
  //         const access_token = await this.jwtService.signAsync(payload, {
  //           secret: "movie_app",
  //         });
  //         const settingToken = await this.setJwtToken(
  //           `ACCESS_TOKEN_USER_${uId}`,
  //           access_token,
  //         );
  //         console.log(`Welcome! ${user?.name}\n`);
  //         console.log(settingToken, "\n");
  //         return {
  //           access_token: access_token,
  //         };
  //       }
  //     }
  //   } catch (error) {
  //     throw new Error(
  //       `Something went wrong while signing in the user! \n Error: ${error}`,
  //     );
  //   }
  // }

  async clearRedisCache(id: string) {
    try {
      console.log(`id: ${id}`);

      const movieAssociatedWithUserExists =
        await this.redisService.checkForTheKey(`MOVIES_USER_${id}`);
      const wishlistAssociatedWithUserExists =
        await this.redisService.checkForTheKey(`MOVIES_WISHLIST_USER_${id}`);

      let clearMovieAssociatedWithUser: string | number =
        `nothing in cache as movie`;
      let clearWishlistAssociatedWithUser: string | number =
        `nothing in cache as wishlist`;

      if (movieAssociatedWithUserExists)
        clearMovieAssociatedWithUser = await this.redisService.deleteItems(
          `MOVIES_USER_${id}`,
        );

      if (wishlistAssociatedWithUserExists)
        clearWishlistAssociatedWithUser = await this.redisService.deleteItems(
          `MOVIES_WISHLIST_USER_${id}`,
        );

      return {
        clearMovieAssociatedWithUser: clearMovieAssociatedWithUser,
        clearWishlistAssociatedWithUser: clearWishlistAssociatedWithUser,
      };
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // async setJwtToken(key: string, value: string) {
  //   try {
  //     const jwtTokenSetStatus = await this.redisService.setItems(
  //       key,
  //       value,
  //       100,
  //     );
  //     return `jwtTokenSetStatus: ${jwtTokenSetStatus}`;
  //   } catch (error) {
  //     throw new Error(
  //       `Something went wrong while setting token! \n Error: ${error}`,
  //     );
  //   }
  // }

  // async getJwtToken(key: string) {
  //   try {
  //     const jwtTokenGet = await this.redisService.getItems(key);
  //     return jwtTokenGet;
  //   } catch (error) {
  //     throw new Error(
  //       `Something went wrong while getting token! \n Error: ${error}`,
  //     );
  //   }
  // }

  // async delJwtToken(key: string) {
  //   try {
  //     const deleteToken = await this.redisService.deleteItems(key);
  //     return `deleteToken: ${deleteToken}`;
  //   } catch (error) {
  //     throw new Error(
  //       `Something went wrong while deleting token! \n Error: ${error}`,
  //     );
  //   }
  // }
}
