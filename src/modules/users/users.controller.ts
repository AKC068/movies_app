import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  async getAllMembers() {
    const users = await this.userServices.getAllMembers();
    console.log(typeof users[0].id);

    return users;
  }

  @Post()
  async registerMember(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.userServices.registerMember(createUserDto);
    return userCreated;
  }

  @Get(':id')
  async getMemberById() {}

  @Delete(':id')
  async deleteMemberById() {}

  @Put(':id')
  async updateMemberInfo() {}
}
