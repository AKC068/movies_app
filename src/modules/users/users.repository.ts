import { CreateUserDto } from "./dto/create.users.dto";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
  constructor(@Inject("SEQUELIZE") private database: any) {}

  async getAllMembers() {
    try {
      const getAllMembers = await this.database.Users.findAll();
      return getAllMembers;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all users in repository! \n Error: ${error}`,
      );
    }
  }

  async registerMember(createUserDto: CreateUserDto) {
    try {
      const { ...userAttributes } = createUserDto;
      const registerMember = await this.database.Users.create(userAttributes);
      return registerMember;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting users in repository! \n Error: ${error}`,
      );
    }
  }

  async getUser(username: string) {
    try {
      const getUser = await this.database.Users.findOne({
        where: {
          email: username,
        },
      });
      return getUser;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching user in repository! \n Error: ${error}`,
      );
    }
  }
}
