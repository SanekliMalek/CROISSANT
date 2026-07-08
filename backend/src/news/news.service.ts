import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsItemDto, UpdateNewsItemDto } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.newsItem.findMany({ orderBy: { date: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.newsItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Article introuvable');
    return item;
  }

  create(dto: CreateNewsItemDto) {
    return this.prisma.newsItem.create({ data: { ...dto, views: 0 } });
  }

  async update(id: string, dto: UpdateNewsItemDto) {
    await this.findOne(id);
    return this.prisma.newsItem.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.newsItem.delete({ where: { id } });
    return { success: true, message: 'Article supprimé' };
  }
}
