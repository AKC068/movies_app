import { CreateWishlistDto } from './dto/create.wishlist.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class WishlistRepository {
  constructor(@Inject('SEQUELIZE') private readonly database: any) {}

  async saveMoviesToWishlist(createWishlistDto: CreateWishlistDto[]) {
    try {
      const res = await this.database.Wishlist.bulkCreate(createWishlistDto);
      return res;
    } catch (error) {
      throw new Error(
        `Something went wrong while saving wishlist in repository! \n Error: ${error}`,
      );
    }
  }

  async getMoviesIdFromWishList(userId: string) {
    try {
      const getMoviesFromWishList = await this.database.Wishlist.findAll({
        attributes: ['movieId'],
        where: {
          userId: userId,
        },
      });
      return getMoviesFromWishList;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting moviesId from wishlist in repository! \n Error: ${error}`,
      );
    }
  }
}
