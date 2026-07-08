import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/activity.dto';
export declare class ActivitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    private normalizeGallery;
    private normalizeActivity;
    findAll(): Promise<({
        id: string;
        title: string;
        description: string;
        category: string;
        image: string;
        gallery: import("@prisma/client/runtime/client").JsonValue | null;
        date: string;
        location: string;
        targetAmount: number;
        raisedAmount: number;
        beneficiaries: number;
        status: string;
        details: string;
    } & {
        gallery: string[];
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        category: string;
        image: string;
        gallery: import("@prisma/client/runtime/client").JsonValue | null;
        date: string;
        location: string;
        targetAmount: number;
        raisedAmount: number;
        beneficiaries: number;
        status: string;
        details: string;
    } & {
        gallery: string[];
    }>;
    create(dto: CreateActivityDto): Promise<{
        id: string;
        title: string;
        description: string;
        category: string;
        image: string;
        gallery: import("@prisma/client/runtime/client").JsonValue | null;
        date: string;
        location: string;
        targetAmount: number;
        raisedAmount: number;
        beneficiaries: number;
        status: string;
        details: string;
    } & {
        gallery: string[];
    }>;
    update(id: string, dto: UpdateActivityDto): Promise<{
        id: string;
        title: string;
        description: string;
        category: string;
        image: string;
        gallery: import("@prisma/client/runtime/client").JsonValue | null;
        date: string;
        location: string;
        targetAmount: number;
        raisedAmount: number;
        beneficiaries: number;
        status: string;
        details: string;
    } & {
        gallery: string[];
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
