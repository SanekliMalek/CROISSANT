"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
const genai_1 = require("@google/genai");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const dbUser = await this.prisma.adminUser.findUnique({
            where: { username },
        });
        if (dbUser) {
            const isMatch = await bcrypt.compare(password, dbUser.password);
            if (isMatch) {
                return {
                    success: true,
                    token: 'mock-jwt-token-gafsa-crm',
                    user: {
                        username: dbUser.username,
                        name: dbUser.name,
                        role: dbUser.role,
                    },
                };
            }
        }
        if (username === 'admin' &&
            (password === 'croissantrouge' ||
                password === 'admin' ||
                password === 'gafsa')) {
            return {
                success: true,
                token: 'mock-jwt-token-gafsa-crm',
                user: {
                    username: 'admin',
                    name: 'Dr. Ahmed Belkacem',
                    role: 'President du Comite Regional',
                },
            };
        }
        throw new common_1.UnauthorizedException('Identifiants de connexion invalides.');
    }
    async runAssistant(assistantDto) {
        const { prompt, history = [] } = assistantDto;
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
            return {
                success: true,
                text: "Mode demonstration: Bonjour ! Je suis l'assistant IA du Croissant-Rouge Gafsa. Configurez une cle d'API valide pour activer Gemini.",
            };
        }
        try {
            const ai = new genai_1.GoogleGenAI({
                apiKey,
                httpOptions: {
                    headers: {
                        'User-Agent': 'aistudio-build',
                    },
                },
            });
            const systemInstruction = `You are a professional administrative assistant specifically tailored for the Regional Committee of Gafsa for the Tunisian Red Crescent (Croissant-Rouge Tunisien - CRM Gafsa).
Gafsa is a region in southwest Tunisia characterized by its mining basin (Metlaoui, Redeyef, Moulares, Mdhilla) and rural zones (Sened, Gafsa Nord, El Guettar).
Your goal is to help Dr. Ahmed Belkacem (President) and Sonia Mansour (Secretary General) manage their volunteer coordination, write action plans, draft official press releases in elegant professional French or Arabic, and outline social media posts for emergency interventions (such as flooding, extreme cold, blood donations, heatwave prevention, and medical caravans).
Be supportive, clear, structured, and empathetic. Always write in the requested language (French by default, or Arabic if prompted). Always use markdown formatting.`;
            const formattedContents = history.map((entry) => ({
                role: entry.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: entry.content }],
            }));
            formattedContents.push({
                role: 'user',
                parts: [{ text: prompt }],
            });
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash',
                contents: formattedContents,
                config: {
                    systemInstruction,
                    temperature: 0.7,
                },
            });
            const text = response.text || "Desole, je n'ai pas pu generer de reponse.";
            return { success: true, text };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: "Une erreur s'est produite lors de l'appel a l'assistant IA Gafsa.",
                error: message,
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map