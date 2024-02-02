import { Inject, Injectable } from '@nestjs/common';
import { CreateMoviesDto } from './dto/create.movies.dto';

@Injectable()
export class MoviesRepository {
  constructor(@Inject('SEQUELIZE') private database: any) {}

  async getAllMovies(id: string) {
    return await this.database.Movies.findAll({
      where: {
        usersId: id,
      },
    });
  }

  async registerMovie(createMoviesDto: CreateMoviesDto) {
    const { ...moviesAttributes } = createMoviesDto;
    return await this.database.Movies.create(moviesAttributes);
  }

  async deleteMovieById(id: string) {
    return await this.database.Movies.destroy({
      where: {
        id: id,
      },
    });
  }

  async editMovieInfoById() {}

  async getMoviesInfoByDirectorsId(directorId: string) {
    return await this.database.Movies.findOne({
      where: {
        directorId: directorId,
      },
    });
  }
}
