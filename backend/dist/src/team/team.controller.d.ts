import { TeamService } from './team.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team.dto';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        role: string;
        category: string;
        email: string | null;
        phone: string | null;
        avatar: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        role: string;
        category: string;
        email: string | null;
        phone: string | null;
        avatar: string;
    }>;
    create(createTeamMemberDto: CreateTeamMemberDto): import("@prisma/client").Prisma.Prisma__TeamMemberClient<{
        id: string;
        name: string;
        role: string;
        category: string;
        email: string | null;
        phone: string | null;
        avatar: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateTeamMemberDto: UpdateTeamMemberDto): Promise<{
        id: string;
        name: string;
        role: string;
        category: string;
        email: string | null;
        phone: string | null;
        avatar: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
