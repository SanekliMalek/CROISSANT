import { AuthService } from './auth.service';
import { AssistantDto } from './dto/assistant.dto';
export declare class AdminController {
    private readonly authService;
    constructor(authService: AuthService);
    assistant(assistantDto: AssistantDto): Promise<{
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
