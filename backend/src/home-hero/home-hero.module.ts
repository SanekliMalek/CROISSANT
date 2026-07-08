import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HomeHeroController } from './home-hero.controller';
import { HomeHeroService } from './home-hero.service';

@Module({
  imports: [PrismaModule],
  controllers: [HomeHeroController],
  providers: [HomeHeroService],
  exports: [HomeHeroService],
})
export class HomeHeroModule {}
