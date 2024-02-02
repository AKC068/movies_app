import { CreateMoviesDto } from './dto/create.movies.dto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { DirectorsService } from '../directors/directors.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    @Inject(forwardRef(() => DirectorsService))
    private readonly directorService: DirectorsService,
    @Inject('REDIS') private redisService: RedisService,
  ) {}

  async getAllMovies(id: string) {
    let count = parseInt(await this.redisService.getItems('count'));
    let moviesAssociatedWithAUser = [];
    if (!count) {
      count = 0;
      moviesAssociatedWithAUser = await this.moviesRepository.getAllMovies(id);
      const dataAsString = JSON.stringify(moviesAssociatedWithAUser);
      const redisStatusOfMovies = await this.redisService.setItems(
        'movies',
        dataAsString,
      );
      console.log(`redisStatusOfMovies: ${redisStatusOfMovies}`);
    } else {
      const cachedData = await this.redisService.getItems('movies');
      const jsonData = JSON.parse(cachedData);
      console.log(`Getting data from cache \n`);
      return jsonData;
    }
    count++;
    const redisStatusOfCount = await this.redisService.setItems(
      'count',
      `${count}`,
    );
    console.log(`redisStatusOfCount: ${redisStatusOfCount}`);

    return moviesAssociatedWithAUser;
  }

  async registerMovie(createMoviesDto: CreateMoviesDto) {
    return await this.moviesRepository.registerMovie(createMoviesDto);
  }

  async deleteMovieById(id: string) {
    return await this.moviesRepository.deleteMovieById(id);
  }

  // getMoviesInfoByDirectorsId() fn gives call to MoviesRepository to get movies associated with that id.

  async getMoviesInfoByDirectorsId(directorId: string) {
    console.log('calling movies services \n');
    const movies =
      await this.moviesRepository.getMoviesInfoByDirectorsId(directorId);

    console.log(`movies: ${typeof Object.keys(movies).length}`);

    if (Object.keys(movies).length === 0)
      return `No movies associated with this ${directorId}`;
    else return movies;
  }

  // getLatestMoviesByDirectorId() fn gives call to DirectorsService where getLatestMoviesByDirectorId() is getting called

  async getLatestMoviesByDirectorId(directorId: string) {
    return await this.directorService.getLatestMoviesByDirectorId(directorId);
  }
}
