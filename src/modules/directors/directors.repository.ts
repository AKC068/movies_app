import { Inject, Injectable } from "@nestjs/common";
import { CreateDirectorDto } from "./dto/create.directors.dto";

@Injectable()
export class DirectorsRepository {
  constructor(@Inject("SEQUELIZE") private database: any) {}

  async registerDirector(createDirectorDto: CreateDirectorDto) {
    try {
      const { ...directorAttributes } = createDirectorDto;
      const res = await this.database.Directors.create(directorAttributes);
      return res;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting directors in repository! \n Error: ${error}`,
      );
    }
  }

  async getAllDirectorsId() {
    try {
      const getAllDirectorsId = await this.database.Directors.findAll({
        attributes: ["id"],
      });
      return getAllDirectorsId;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all director's id in repository! \n Error: ${error}`,
      );
    }
  }
}
