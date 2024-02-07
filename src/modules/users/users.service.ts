import { CreateUserDto } from "./dto/create.users.dto";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllMembers() {
    try {
      const getAllMembers = await this.userRepository.getAllMembers();
      return getAllMembers;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all users in services! \n Error: ${error}`,
      );
    }
  }

  async registerMember(createUserDto: CreateUserDto) {
    try {
      const registerMember =
        await this.userRepository.registerMember(createUserDto);
      return registerMember;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting users in services! \n Error: ${error}`,
      );
    }
  }

  async getUser(email: string) {
    try {
      const getUser = await this.userRepository.getUser(email);
      return getUser;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching a user in services! \n Error: ${error}`,
      );
    }
  }
}
