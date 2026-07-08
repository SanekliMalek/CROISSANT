import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AdhesionService } from './adhesion.service';
import { CreateAdhesionDto, UpdateAdhesionStatusDto } from './dto/adhesion.dto';

@Controller('adhesion')
export class AdhesionController {
  constructor(private readonly adhesionService: AdhesionService) {}

  @Get()
  findAll() {
    return this.adhesionService.findAll();
  }

  @Post()
  create(@Body() createAdhesionDto: CreateAdhesionDto) {
    return this.adhesionService.create(createAdhesionDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateAdhesionStatusDto,
  ) {
    return this.adhesionService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adhesionService.remove(id);
  }
}
