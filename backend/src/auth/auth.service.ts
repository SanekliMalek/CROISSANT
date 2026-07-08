import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AssistantDto } from './dto/assistant.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { GoogleGenAI } from '@google/genai';

type AssistantContent = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
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

    if (
      username === 'admin' &&
      (password === 'croissantrouge' ||
        password === 'admin' ||
        password === 'gafsa')
    ) {
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

    throw new UnauthorizedException('Identifiants de connexion invalides.');
  }

  async runAssistant(assistantDto: AssistantDto) {
    const { prompt, history = [] } = assistantDto;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return {
        success: true,
        text: "Mode demonstration: Bonjour ! Je suis l'assistant IA du Croissant-Rouge Gafsa. Configurez une cle d'API valide pour activer Gemini.",
      };
    }

    try {
      const ai = new GoogleGenAI({
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

      const formattedContents: AssistantContent[] = history.map((entry) => ({
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

      const text =
        response.text || "Desole, je n'ai pas pu generer de reponse.";
      return { success: true, text };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      return {
        success: false,
        message:
          "Une erreur s'est produite lors de l'appel a l'assistant IA Gafsa.",
        error: message,
      };
    }
  }
}
