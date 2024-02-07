import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create.users.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  async getAllMembers() {
    try {
      const users = await this.userServices.getAllMembers();
      console.log(typeof users[0].id);
      return users;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all users in controller! \n Error: ${error}`,
      );
    }
  }

  @Post()
  async registerMember(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.userServices.registerMember(createUserDto);
      return userCreated;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting all users in controller! \n Error: ${error}`,
      );
    }
  }

  @Get(":id")
  async getMemberById() {}

  @Delete(":id")
  async deleteMemberById() {}

  @Put(":id")
  async updateMemberInfo() {}
}
