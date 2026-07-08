import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { AdhesionModule } from './adhesion/adhesion.module';
import { TeamModule } from './team/team.module';
import { NewsModule } from './news/news.module';
import { HomeHeroModule } from './home-hero/home-hero.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    ActivitiesModule,
    AdhesionModule,
    TeamModule,
    NewsModule,
    HomeHeroModule,
    MediaModule,
  ],
})
export class AppModule {}
