import { AuthGuard } from "../auth/auth.guard";
import { CreateWishlistDto } from "./dto/create.wishlist.dto";
import { WishlistService } from "./wishlist.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(AuthGuard)
  @Post()
  async saveMoviesToWishlist(
    @Body() createWishlistDto: CreateWishlistDto,
    @Req() req: any,
  ): Promise<any> {
    try {
      console.log(req.user);
      const allAttributes = { ...createWishlistDto, userId: req.user.id };
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

  @UseGuards(AuthGuard)
  @Delete(":id")
  async removeMoviesIdFromWishlist(
    @Req() req: any,
    @Param("id") movieId: string,
  ) {
    try {
      const getConfirmation =
        await this.wishlistService.removeMoviesIdFromWishlist(
          req.user.id,
          movieId,
        );
      return getConfirmation;
    } catch (error) {
      throw new Error(
        `Something went wrong while removing moviesId from wishlist in controller! \n Error: ${error}`,
      );
    }
  }
}
