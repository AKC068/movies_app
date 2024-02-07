import { CreateMoviesDto } from "./dto/create.movies.dto";
import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MoviesRepository } from "./movies.repository";
import { DirectorsService } from "../directors/directors.service";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    @Inject(forwardRef(() => DirectorsService))
    private readonly directorService: DirectorsService,
    @Inject("REDIS") private redisService: RedisService,
  ) {}

  async getAllMovies(id: string) {
    try {
      let count = parseInt(
        await this.redisService.getItems(`COUNT_USER_${id}`),
      );
      console.log(`count: ${count}`);

      let moviesAssociatedWithAUser = [];
      if (!count) {
        count = 0;
        moviesAssociatedWithAUser =
          await this.moviesRepository.getAllMovies(id);

        if (moviesAssociatedWithAUser.length === 0)
          return `No movies associated with this user.`;
        const dataAsString = JSON.stringify(moviesAssociatedWithAUser);
        const redisStatusOfMovies = await this.redisService.setItems(
          `MOVIES_USER_${id}`,
          dataAsString,
          100,
        );
        console.log(`redisStatusOfMovies: ${redisStatusOfMovies}`);

        count++;
        const redisStatusOfCount = await this.redisService.setItems(
          `COUNT_USER_${id}`,
          `${count}`,
          100,
        );
        console.log(`redisStatusOfCount: ${redisStatusOfCount}`);
      } else {
        const cachedData = await this.redisService.getItems(
          `MOVIES_USER_${id}`,
        );

        const jsonData = JSON.parse(cachedData);
        console.log(`Getting data from cache \n`);
        moviesAssociatedWithAUser = jsonData;
      }

      return moviesAssociatedWithAUser;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all movies in services! \n Error: ${error}`,
      );
    }
  }

  async registerMovie(createMoviesDto: CreateMoviesDto) {
    try {
      const postMovies =
        await this.moviesRepository.registerMovie(createMoviesDto);
      return postMovies;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting movies in services! \n Error: ${error}`,
      );
    }
  }

  async deleteMovieById(id: string) {
    try {
      const deleteMovieById = await this.moviesRepository.deleteMovieById(id);
      return deleteMovieById;
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting movies in services! \n Error: ${error}`,
      );
    }
  }

  // getMoviesInfoByDirectorsId() fn gives call to MoviesRepository to get movies associated with that id.

  async getMoviesInfoByDirectorsId(directorId: string) {
    try {
      console.log("calling movies services \n");
      const movies =
        await this.moviesRepository.getMoviesInfoByDirectorsId(directorId);

      console.log(`movies: ${typeof Object.keys(movies).length}`);

      if (Object.keys(movies).length === 0)
        console.log(`No movies associated with this ${directorId}`);
      else return movies;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching movies associated with a director in services! \n Error: ${error}`,
      );
    }
  }

  // getLatestMoviesByDirectorId() fn gives call to DirectorsService where getLatestMoviesByDirectorId() is getting called

  async getLatestMoviesByDirectorId(directorId: string) {
    try {
      const latestMovies =
        await this.directorService.getLatestMoviesByDirectorId(directorId);
      if (Object.keys(latestMovies).length === 0)
        console.log(`No movies associated with this ${directorId}`);
      return latestMovies;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching a latest movie associated with a director in services! \n Error: ${error}`,
      );
    }
  }

  async getMoviesFromId(moviesIdFromWishList: Array<any>) {
    try {
      const moviesIdArrayValue = moviesIdFromWishList.map(
        (movieIdArrayObject) => movieIdArrayObject.movieId,
      );
      const getMoviesFromId =
        await this.moviesRepository.getMoviesFromId(moviesIdArrayValue);
      return getMoviesFromId;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting moviesId from wishlist in service! \n Error: ${error}`,
      );
    }
  }
}
