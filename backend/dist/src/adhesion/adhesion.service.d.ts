import { PrismaService } from '../prisma/prisma.service';
import { CreateAdhesionDto, UpdateAdhesionStatusDto } from './dto/adhesion.dto';
export declare class AdhesionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        status: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        birthDate: string;
        city: string;
        profession: string;
        interests: import("@prisma/client/runtime/client").JsonValue;
        preferredSlots: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        status: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        birthDate: string;
        city: string;
        profession: string;
        interests: import("@prisma/client/runtime/client").JsonValue;
        preferredSlots: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }>;
    create(dto: CreateAdhesionDto): import("@prisma/client").Prisma.Prisma__AdhesionClient<{
        id: string;
        status: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        birthDate: string;
        city: string;
        profession: string;
        interests: import("@prisma/client/runtime/client").JsonValue;
        preferredSlots: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: string, dto: UpdateAdhesionStatusDto): Promise<{
        id: string;
        status: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        birthDate: string;
        city: string;
        profession: string;
        interests: import("@prisma/client/runtime/client").JsonValue;
        preferredSlots: import("@prisma/client/runtime/client").JsonValue;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private getMailer;
    private sendApprovalEmail;
}
