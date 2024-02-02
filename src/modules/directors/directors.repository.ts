import { Inject, Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create.directors.dto';

@Injectable()
export class DirectorsRepository {
  constructor(@Inject('SEQUELIZE') private database: any) {}

  async registerDirector(createDirectorDto: CreateDirectorDto) {
    const { ...directorAttributes } = createDirectorDto;
    const res = await this.database.Directors.create(directorAttributes);
    return res;
  }

  async getAllDirectorsId() {
    return await this.database.Directors.findAll({
      attributes: ['id'],
    });
  }
}
