import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { Directors } from 'src/modules/directors/directors.entity';
import { Movies } from 'src/modules/movies/movies.entity';
import { Users } from 'src/modules/users/users.entity';

@Injectable()
export class DatabaseService {
  private instance: Sequelize;
  public async connectToDatabase() {
    this.instance = new Sequelize(databaseConfig);
    this.instance.addModels([Users, Movies, Directors]);
    await this.instance.sync();
    return this.instance;
  }
}
