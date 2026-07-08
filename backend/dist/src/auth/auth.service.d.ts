import { LoginDto } from './dto/login.dto';
import { AssistantDto } from './dto/assistant.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        token: string;
        user: {
            username: string;
            name: string;
            role: string;
        };
    }>;
    runAssistant(assistantDto: AssistantDto): Promise<{
        success: boolean;
        text: string;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        text?: undefined;
    }>;
}
