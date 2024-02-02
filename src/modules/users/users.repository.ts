import { CreateUserDto } from './dto/create.users.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(@Inject('SEQUELIZE') private database: any) {}

  async getAllMembers() {
    return await this.database.Users.findAll();
  }

  async registerMember(createUserDto: CreateUserDto) {
    const { ...userAttributes } = createUserDto;
    return await this.database.Users.create(userAttributes);
  }

  async getUser(email: string) {
    return await this.database.Users.findOne({
      where: {
        email: email,
      },
    });
  }
}
