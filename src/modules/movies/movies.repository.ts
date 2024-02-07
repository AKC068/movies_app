import { Inject, Injectable } from "@nestjs/common";
import { CreateMoviesDto } from "./dto/create.movies.dto";

@Injectable()
export class MoviesRepository {
  constructor(@Inject("SEQUELIZE") private database: any) {}

  async getAllMovies(id: string) {
    try {
      const getAllMovies = await this.database.Movies.findAll({
        where: {
          userId: id,
        },
      });
      return getAllMovies;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all movies in repository! \n Error: ${error}`,
      );
    }
  }

  async registerMovie(createMoviesDto: CreateMoviesDto) {
    try {
      const { ...moviesAttributes } = createMoviesDto;
      const registerMovie = await this.database.Movies.create(moviesAttributes);
      return registerMovie;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting movies in repository! \n Error: ${error}`,
      );
    }
  }

  async deleteMovieById(id: string) {
    try {
      const deleteMovieById = await this.database.Movies.destroy({
        where: {
          id: id,
        },
      });
      return deleteMovieById;
    } catch (error) {
      throw new Error(
        `Something went wrong while deleting movies in repository! \n Error: ${error}`,
      );
    }
  }

  async editMovieInfoById() {}

  async getMoviesInfoByDirectorsId(directorId: string) {
    try {
      const getMoviesInfoByDirectorsId = await this.database.Movies.findOne({
        where: {
          directorId: directorId,
        },
      });
      return getMoviesInfoByDirectorsId;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching movies by director's id in repository! \n Error: ${error}`,
      );
    }
  }

  async getMoviesFromId(moviesIdFromWishList: Array<string>) {
    try {
      const getMoviesFromId = await this.database.Movies.findAll({
        attributes: {
          exclude: ["userId"],
        },
        where: {
          id: moviesIdFromWishList,
        },
      });
      return getMoviesFromId;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting movies using movieId from wishlist in repository! \n Error: ${error}`,
      );
    }
  }
}
