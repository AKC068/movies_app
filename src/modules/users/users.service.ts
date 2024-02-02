import { CreateUserDto } from './dto/create.users.dto';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllMembers() {
    return await this.userRepository.getAllMembers();
  }

  async registerMember(createUserDto: CreateUserDto) {
    return await this.userRepository.registerMember(createUserDto);
  }

  async getUser(email: string) {
    return await this.userRepository.getUser(email);
  }
}
