import { HomeHeroService } from './home-hero.service';
import { UpsertHomeHeroDto } from './dto/home-hero.dto';
export declare class HomeHeroController {
    private readonly homeHeroService;
    constructor(homeHeroService: HomeHeroService);
    findOne(): import("@prisma/client").Prisma.Prisma__HomeHeroSettingClient<{
        id: string;
        title: string;
        description: string;
        image: string;
        location: string;
        badge: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    upsert(dto: UpsertHomeHeroDto): import("@prisma/client").Prisma.Prisma__HomeHeroSettingClient<{
        id: string;
        title: string;
        description: string;
        image: string;
        location: string;
        badge: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
