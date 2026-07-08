import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertHomeHeroDto } from './dto/home-hero.dto';

const HOME_HERO_ID = 'hero';

@Injectable()
export class HomeHeroService {
  constructor(private prisma: PrismaService) {}

  findOne() {
    return this.prisma.homeHeroSetting.findUnique({
      where: { id: HOME_HERO_ID },
    });
  }

  upsert(dto: UpsertHomeHeroDto) {
    return this.prisma.homeHeroSetting.upsert({
      where: { id: HOME_HERO_ID },
      create: {
        id: HOME_HERO_ID,
        ...dto,
      },
      update: dto,
    });
  }
}
