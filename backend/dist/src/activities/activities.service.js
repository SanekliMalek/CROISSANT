"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ActivitiesService = class ActivitiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    normalizeGallery(gallery, fallbackImage) {
        if (Array.isArray(gallery)) {
            const cleaned = gallery.filter((item) => typeof item === 'string' && item.trim().length > 0);
            return cleaned.length > 0 ? cleaned : [fallbackImage];
        }
        return [fallbackImage];
    }
    normalizeActivity(activity) {
        return {
            ...activity,
            gallery: this.normalizeGallery(activity.gallery, activity.image),
        };
    }
    findAll() {
        return this.prisma.activity
            .findMany()
            .then((activities) => activities.map((activity) => this.normalizeActivity(activity)));
    }
    async findOne(id) {
        const activity = await this.prisma.activity.findUnique({ where: { id } });
        if (!activity)
            throw new common_1.NotFoundException(`ActivitÃ© introuvable`);
        return this.normalizeActivity(activity);
    }
    create(dto) {
        const data = {
            ...dto,
            gallery: this.normalizeGallery(dto.gallery, dto.image),
        };
        return this.prisma.activity
            .create({ data })
            .then((activity) => this.normalizeActivity(activity));
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        const nextImage = dto.image ?? existing.image;
        const nextGallery = dto.gallery !== undefined
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
    async remove(id) {
        await this.findOne(id);
        await this.prisma.activity.delete({ where: { id } });
        return { success: true, message: 'ActivitÃ© supprimÃ©e' };
    }
};
exports.ActivitiesService = ActivitiesService;
exports.ActivitiesService = ActivitiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActivitiesService);
//# sourceMappingURL=activities.service.js.map