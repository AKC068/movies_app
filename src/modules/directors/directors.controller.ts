import { DirectorsService } from './directors.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create.directors.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  async registerDirector(@Body() createDirectorDto: CreateDirectorDto) {
    return await this.directorsService.registerDirector(createDirectorDto);
  }

  @Get()
  async getAllDirectorsId() {
    return await this.directorsService.getAllDirectorsId();
  }
}
