import { Body, Controller, Get, Put } from '@nestjs/common';
import { HomeHeroService } from './home-hero.service';
import { UpsertHomeHeroDto } from './dto/home-hero.dto';

@Controller('home-hero')
export class HomeHeroController {
  constructor(private readonly homeHeroService: HomeHeroService) {}

  @Get()
  findOne() {
    return this.homeHeroService.findOne();
  }

  @Put()
  upsert(@Body() dto: UpsertHomeHeroDto) {
    return this.homeHeroService.upsert(dto);
  }
}
