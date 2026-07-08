import { AdhesionService } from './adhesion.service';
import { CreateAdhesionDto, UpdateAdhesionStatusDto } from './dto/adhesion.dto';
export declare class AdhesionController {
    private readonly adhesionService;
    constructor(adhesionService: AdhesionService);
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
    create(createAdhesionDto: CreateAdhesionDto): import("@prisma/client").Prisma.Prisma__AdhesionClient<{
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
    updateStatus(id: string, updateStatusDto: UpdateAdhesionStatusDto): Promise<{
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
}
