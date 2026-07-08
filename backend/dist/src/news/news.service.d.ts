import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsItemDto, UpdateNewsItemDto } from './dto/news.dto';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        image: string;
        date: string;
        summary: string;
        content: string;
        views: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        image: string;
        date: string;
        summary: string;
        content: string;
        views: number;
    }>;
    create(dto: CreateNewsItemDto): import("@prisma/client").Prisma.Prisma__NewsItemClient<{
        id: string;
        title: string;
        image: string;
        date: string;
        summary: string;
        content: string;
        views: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateNewsItemDto): Promise<{
        id: string;
        title: string;
        image: string;
        date: string;
        summary: string;
        content: string;
        views: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
