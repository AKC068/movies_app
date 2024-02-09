import { MoviesService } from "./../movies/movies.service";
import { CreateWishlistDto } from "./dto/create.wishlist.dto";
import { RedisService } from "../redis/redis.service";
import { Inject, Injectable } from "@nestjs/common";
import { WishlistRepository } from "./wishlist.repository";

@Injectable()
export class WishlistService {
  constructor(
    private readonly wishlistRepository: WishlistRepository,
    @Inject("REDIS") private readonly redisService: RedisService,
    private readonly moviesService: MoviesService,
  ) {}

  async saveMoviesToWishlist(createWishlistDto: CreateWishlistDto) {
    try {
      const saveMoviesToWishlist =
        this.wishlistRepository.saveMoviesToWishlist(createWishlistDto);
      return saveMoviesToWishlist;
    } catch (error) {
      throw new Error(
        `Something went wrong while saving wishlist in services! \n Error: ${error}`,
      );
    }
  }

  async getMoviesIdFromWishlist(userId: string) {
    try {
      let getMoviesFromId = [];
      let cachedMoviesForWishlist = "";
      const isThere = await this.redisService.checkForTheKey(
        `MOVIES_WISHLIST_USER_${userId}`,
      );

      console.log(`isThere Movies in wishlist cache: ${isThere}`);

      if (!isThere) {
        const moviesIdFromWishList =
          await this.wishlistRepository.getMoviesIdFromWishList(userId);

        if (moviesIdFromWishList.length === 0)
          return `No movies are there in your wishlist`;

        getMoviesFromId =
          await this.moviesService.getMoviesFromId(moviesIdFromWishList);

        const dataAsStringGetMoviesForWishlist =
          JSON.stringify(getMoviesFromId);
        const redisStatusOfGetMoviesForWishlist =
          await this.redisService.setItems(
            `MOVIES_WISHLIST_USER_${userId}`,
            dataAsStringGetMoviesForWishlist,
            100,
          );
        console.log(
          `redisStatusOfGetMoviesForWishlist: ${redisStatusOfGetMoviesForWishlist}`,
        );
      } else {
        cachedMoviesForWishlist = await this.redisService.getItems(
          `MOVIES_WISHLIST_USER_${userId}`,
        );
        const jsonDataForMoviesIdFromWishList = JSON.parse(
          cachedMoviesForWishlist,
        );
        console.log(`Getting data from cache \n`);
        getMoviesFromId = jsonDataForMoviesIdFromWishList;
      }

      return getMoviesFromId;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting moviesId from wishlist in service! \n Error: ${error}`,
      );
    }
  }

  async removeMoviesIdFromWishlist(userId: string, movieId: string) {
    try {
      const getConfirmation =
        await this.wishlistRepository.removeMoviesIdFromWishlist(
          userId,
          movieId,
        );

      console.log(
        `This movie has been removed from the Wishlist. getConfirmation: ${getConfirmation}`,
      );

      const moviesIdFromWishList =
        await this.wishlistRepository.getMoviesIdFromWishList(userId);

      if (moviesIdFromWishList.length === 0)
        return `No movies are there in your wishlist`;

      const getMoviesFromId =
        await this.moviesService.getMoviesFromId(moviesIdFromWishList);
      const dataAsStringGetMoviesForWishlist = JSON.stringify(getMoviesFromId);
      const setMoviesInCacheAfterUpdatingWishlist =
        await this.redisService.setItems(
          `MOVIES_WISHLIST_USER_${userId}`,
          dataAsStringGetMoviesForWishlist,
          100,
        );
      console.log(
        `setMoviesInCacheAfterUpdatingWishlist: ${setMoviesInCacheAfterUpdatingWishlist}`,
      );

      return getConfirmation;
    } catch (error) {
      throw new Error(
        `Something went wrong while removing moviesId from wishlist in service! \n Error: ${error}`,
      );
    }
  }
}
