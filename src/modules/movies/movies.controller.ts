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
  async getAllMovies(@Req() req: any) {
    console.log(req.user);
    return await this.moviesServices.getAllMovies(req.user.id);
  }

  @Post()
  async registerMovie(@Body() createMoviesDto: CreateMoviesDto) {
    const movieCreated =
      await this.moviesServices.registerMovie(createMoviesDto);
    return movieCreated;
  }

  @Delete(':id')
  async deleteMovieById(@Param('id') id: string) {
    console.log(`movie id ${id}`);
    return await this.moviesServices.deleteMovieById(id);
  }

  // getLatestMoviesByDirectorId() function is invoked when this API get hits

  @Get(':directorId')
  async getLatestMoviesByDirectorId(@Param('directorId') directorId: string) {
    console.log(`\n director id: ${directorId}`);
    return await this.moviesServices.getLatestMoviesByDirectorId(directorId);
  }
}
