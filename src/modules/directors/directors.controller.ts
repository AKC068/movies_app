import { DirectorsService } from './directors.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create.directors.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  async registerDirector(@Body() createDirectorDto: CreateDirectorDto) {
    try {
      const registerDirector =
        await this.directorsService.registerDirector(createDirectorDto);
      return registerDirector;
    } catch (error) {
      throw new Error(
        `Something went wrong while posting a director in controller! \n Error: ${error}`,
      );
    }
  }

  @Get()
  async getAllDirectorsId() {
    try {
      const getAllDirectorsId = await this.directorsService.getAllDirectorsId();
      return getAllDirectorsId;
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching all director's id in controller! \n Error: ${error}`,
      );
    }
  }
}
