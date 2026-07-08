import { Module } from '@nestjs/common';
import { AdhesionController } from './adhesion.controller';
import { AdhesionService } from './adhesion.service';

@Module({
  controllers: [AdhesionController],
  providers: [AdhesionService],
})
export class AdhesionModule {}
