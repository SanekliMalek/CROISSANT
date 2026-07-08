import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  private normalizeGallery(gallery: unknown, fallbackImage: string) {
    if (Array.isArray(gallery)) {
      const cleaned = gallery.filter(
        (item): item is string =>
          typeof item === 'string' && item.trim().length > 0,
      );
      return cleaned.length > 0 ? cleaned : [fallbackImage];
    }

    return [fallbackImage];
  }

  private normalizeActivity<T extends { gallery?: unknown; image: string }>(
    activity: T,
  ) {
    return {
      ...activity,
      gallery: this.normalizeGallery(activity.gallery, activity.image),
    };
  }

  findAll() {
    return this.prisma.activity
      .findMany()
      .then((activities) =>
        activities.map((activity) => this.normalizeActivity(activity)),
      );
  }

  async findOne(id: string) {
    const activity = await this.prisma.activity.findUnique({ where: { id } });
    if (!activity) throw new NotFoundException(`ActivitÃ© introuvable`);
    return this.normalizeActivity(activity);
  }

  create(dto: CreateActivityDto) {
    const data = {
      ...dto,
      gallery: this.normalizeGallery(dto.gallery, dto.image),
    };

    return this.prisma.activity
      .create({ data })
      .then((activity) => this.normalizeActivity(activity));
  }

  async update(id: string, dto: UpdateActivityDto) {
    const existing = await this.findOne(id);
    const nextImage = dto.image ?? existing.image;
    const nextGallery =
      dto.gallery !== undefined
        ? this.normalizeGallery(dto.gallery, nextImage)
        : this.normalizeGallery(existing.gallery, nextImage);

    return this.prisma.activity
      .update({
        where: { id },
        data: {
          ...dto,
          gallery: nextGallery,
        },
      })
      .then((activity) => this.normalizeActivity(activity));
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.activity.delete({ where: { id } });
    return { success: true, message: 'ActivitÃ© supprimÃ©e' };
  }
}
