import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsItemDto, UpdateNewsItemDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Post()
  create(@Body() createNewsItemDto: CreateNewsItemDto) {
    return this.newsService.create(createNewsItemDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsItemDto: UpdateNewsItemDto,
  ) {
    return this.newsService.update(id, updateNewsItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
