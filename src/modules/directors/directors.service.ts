import { CreateDirectorDto } from './dto/create.directors.dto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DirectorsRepository } from './directors.repository';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class DirectorsService {
  constructor(
    private readonly directorRepository: DirectorsRepository,
    @Inject(forwardRef(() => MoviesService))
    private readonly moviesService: MoviesService,
  ) {}

  async registerDirector(createDirectorDto: CreateDirectorDto) {
    try {
      const registerDirector =
        await this.directorRepository.registerDirector(createDirectorDto);
      return registerDirector;
    } catch (error) {
      throw new Error(
        `Something went wrong while registering the director! \n Error: ${error}`,
      );
    }
  }

  async getAllDirectorsId() {
    try {
      const directorIds = await this.directorRepository.getAllDirectorsId();
      if (Object.keys(directorIds).length === 0)
        return `No director registered`;
      return directorIds;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all director's Id! \n Error: ${error}`,
      );
    }
  }

  // getLatestMoviesByDirectorId() gives call to DirectorsRepository to get all the director's id as an array.

  async getLatestMoviesByDirectorId(directorId: string) {
    try {
      console.log('calling directors services \n');
      const directorIdArray = await this.getAllDirectorsId();

      console.log(`directorIdArray: ${typeof directorIdArray} \n`);

      // we are checking it with the params passed that is that directorId is there in database or not.
      const director = directorIdArray.filter(
        (director: any) => director.id === directorId,
      );

      console.log(`dId: ${director} \n`);

      if (director[0].id !== undefined) {
        // if yes then we are calling MoviesService and calling a fn getMoviesInfoByDirectorsId().
        const directorIdFromDb =
          await this.moviesService.getMoviesInfoByDirectorsId(director[0].id);
        return directorIdFromDb;
      } else return `No Director found with the given ${directorId}`;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching a latest movie associated with a director in director service! \n Error: ${error}`,
      );
    }
  }
}
