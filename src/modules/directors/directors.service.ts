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
    return await this.directorRepository.registerDirector(createDirectorDto);
  }

  async getAllDirectorsId() {
    return await this.directorRepository.getAllDirectorsId();
  }

  // getLatestMoviesByDirectorId() gives call to DirectorsRepository to get all the director's id as an array.

  async getLatestMoviesByDirectorId(directorId: string) {
    console.log('calling directors services \n');
    const directorIdArray = await this.getAllDirectorsId();

    console.log(`directorIdArray: ${typeof directorIdArray} \n`);

    // we are checking it with the params passed that is that directorId is there in database or not.
    const director = directorIdArray.filter(
      (director) => director.id === directorId,
    );

    console.log(`dId: ${director} \n`);

    if (director[0].id !== undefined)
      // if yes then we are calling MoviesService and calling a fn getMoviesInfoByDirectorsId().
      return await this.moviesService.getMoviesInfoByDirectorsId(
        director[0].id,
      );
    else return `No Director found with the given ${directorId}`;
  }
}
