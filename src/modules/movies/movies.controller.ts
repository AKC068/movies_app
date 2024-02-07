import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateMoviesDto } from './dto/create.movies.dto';
import { MoviesService } from './movies.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServices: MoviesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllMovies(@Req() req: any): Promise<any> {
    try {
      console.log(req.user);
      const getAllMovies = await this.moviesServices.getAllMovies(req.user.id);
      return getAllMovies;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all movies in controller! \n Error: ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async registerMovie(
    @Body() createMoviesDto: CreateMoviesDto,
    @Req() req: any,
  ) {
    try {
      console.log(req.user);
      const allAttributes = { ...createMoviesDto, userId: req.user.id };
      console.log('All attributes:', allAttributes);
      const movieCreated =
        await this.moviesServices.registerMovie(allAttributes);
      return movieCreated;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting movies in controller! \n Error: ${error}`,
      );
    }
  }

  @Delete(':id')
  async deleteMovieById(@Param('id') id: string) {
    try {
      console.log(`movie id ${id}`);
      const deleteMovieById = await this.moviesServices.deleteMovieById(id);
      return deleteMovieById;
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting movies in controller! \n Error: ${error}`,
      );
    }
  }

  // getLatestMoviesByDirectorId() function is invoked when this API get hits

  @Get(':directorId')
  async getLatestMoviesByDirectorId(
    @Param('directorId') directorId: string,
  ): Promise<any> {
    try {
      console.log(`\n director id: ${directorId}`);
      const getLatestMoviesByDirectorId =
        await this.moviesServices.getLatestMoviesByDirectorId(directorId);
      return getLatestMoviesByDirectorId;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching latest movie in controller! \n Error: ${error}`,
      );
    }
  }
}
