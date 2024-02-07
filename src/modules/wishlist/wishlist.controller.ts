import { AuthGuard } from '../auth/auth.guard';
import { CreateWishlistDto } from './dto/create.wishlist.dto';
import { WishlistService } from './wishlist.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(AuthGuard)
  @Post()
  async saveMoviesToWishlist(
    @Body() createWishlistDto: CreateWishlistDto[],
    @Req() req: any,
  ): Promise<any> {
    try {
      console.log(req.user);
      const allAttributes = createWishlistDto.map((prop) => {
        console.log(prop);
        return { ...prop, userId: req.user.id };
      });
      console.log(allAttributes);
      const saveMoviesToWishlist =
        this.wishlistService.saveMoviesToWishlist(allAttributes);
      return saveMoviesToWishlist;
    } catch (error) {
      throw new Error(
        `Something went wrong while saving wishlist in controller! \n Error: ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getMoviesIdFromWishlist(@Req() req: any): Promise<any> {
    try {
      console.log(req.user);
      const getMoviesIdFromWishList =
        await this.wishlistService.getMoviesIdFromWishlist(req.user.id);
      return getMoviesIdFromWishList;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting moviesId from wishlist in controller! \n Error: ${error}`,
      );
    }
  }
}
