/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Set up data directories
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ADHESIONS_FILE = path.join(DATA_DIR, 'adhesions.json');
const ACTIVITIES_FILE = path.join(DATA_DIR, 'activities.json');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');

// We will lazily load seed data to populate files if they do not exist
import { DEFAULT_ACTIVITIES, DEFAULT_TEAM, DEFAULT_NEWS, DEFAULT_ADHESIONS } from './src/data/defaultData.js';

function readJsonFile<T>(filePath: string, defaultData: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return defaultData;
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing to file ${filePath}:`, err);
  }
}

// REST API Routes

// Authenticate Admin
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Support standard admin credentials
  if (username === 'admin' && (password === 'croissantrouge' || password === 'admin' || password === 'gafsa')) {
    return res.json({
      success: true,
      token: 'mock-jwt-token-gafsa-crm',
      user: {
        username: 'admin',
        name: 'Dr. Ahmed Belkacem',
        role: 'Président du Comité Régional'
      }
    });
  }
  return res.status(401).json({ success: false, message: 'Identifiants invalides' });
});

// Adhesions (Volunteer Sign-ups)
app.get('/api/adhesion', (req, res) => {
  const list = readJsonFile(ADHESIONS_FILE, DEFAULT_ADHESIONS);
  res.json(list);
});

app.post('/api/adhesion', (req, res) => {
  const list = readJsonFile(ADHESIONS_FILE, DEFAULT_ADHESIONS);
  const newAdhesion = {
    id: `adh-${Date.now()}`,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  list.unshift(newAdhesion);
  writeJsonFile(ADHESIONS_FILE, list);
  res.status(201).json({ success: true, data: newAdhesion });
});

app.patch('/api/adhesion/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const list = readJsonFile(ADHESIONS_FILE, DEFAULT_ADHESIONS);
  const index = list.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    list[index].status = status;
    writeJsonFile(ADHESIONS_FILE, list);
    return res.json({ success: true, data: list[index] });
  }
  res.status(404).json({ success: false, message: 'Candidature introuvable' });
});

app.delete('/api/adhesion/:id', (req, res) => {
  const { id } = req.params;
  let list = readJsonFile(ADHESIONS_FILE, DEFAULT_ADHESIONS);
  const initialLength = list.length;
  list = list.filter((item: any) => item.id !== id);
  if (list.length < initialLength) {
    writeJsonFile(ADHESIONS_FILE, list);
    return res.json({ success: true, message: 'Candidature supprimée' });
  }
  res.status(404).json({ success: false, message: 'Candidature introuvable' });
});

// Activities CRUD
app.get('/api/activities', (req, res) => {
  const list = readJsonFile(ACTIVITIES_FILE, DEFAULT_ACTIVITIES);
  res.json(list);
});

app.post('/api/activities', (req, res) => {
  const list = readJsonFile(ACTIVITIES_FILE, DEFAULT_ACTIVITIES);
  const newActivity = {
    id: `act-${Date.now()}`,
    ...req.body,
    raisedAmount: Number(req.body.raisedAmount || 0),
    targetAmount: Number(req.body.targetAmount || 0),
    beneficiaries: Number(req.body.beneficiaries || 0),
  };
  list.unshift(newActivity);
  writeJsonFile(ACTIVITIES_FILE, list);
  res.status(201).json(newActivity);
});

app.put('/api/activities/:id', (req, res) => {
  const { id } = req.params;
  const list = readJsonFile(ACTIVITIES_FILE, DEFAULT_ACTIVITIES);
  const index = list.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    list[index] = {
      ...list[index],
      ...req.body,
      id, // keep original ID
      raisedAmount: Number(req.body.raisedAmount || list[index].raisedAmount),
      targetAmount: Number(req.body.targetAmount || list[index].targetAmount),
      beneficiaries: Number(req.body.beneficiaries || list[index].beneficiaries),
    };
    writeJsonFile(ACTIVITIES_FILE, list);
    return res.json(list[index]);
  }
  res.status(404).json({ message: 'Activité introuvable' });
});

app.delete('/api/activities/:id', (req, res) => {
  const { id } = req.params;
  let list = readJsonFile(ACTIVITIES_FILE, DEFAULT_ACTIVITIES);
  const initialLength = list.length;
  list = list.filter((item: any) => item.id !== id);
  if (list.length < initialLength) {
    writeJsonFile(ACTIVITIES_FILE, list);
    return res.json({ success: true, message: 'Activité supprimée' });
  }
  res.status(404).json({ message: 'Activité introuvable' });
});

// Team Members CRUD
app.get('/api/team', (req, res) => {
  const list = readJsonFile(TEAM_FILE, DEFAULT_TEAM);
  res.json(list);
});

app.post('/api/team', (req, res) => {
  const list = readJsonFile(TEAM_FILE, DEFAULT_TEAM);
  const newMember = {
    id: `tm-${Date.now()}`,
    ...req.body
  };
  list.push(newMember);
  writeJsonFile(TEAM_FILE, list);
  res.status(201).json(newMember);
});

app.put('/api/team/:id', (req, res) => {
  const { id } = req.params;
  const list = readJsonFile(TEAM_FILE, DEFAULT_TEAM);
  const index = list.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    list[index] = {
      ...list[index],
      ...req.body,
      id
    };
    writeJsonFile(TEAM_FILE, list);
    return res.json(list[index]);
  }
  res.status(404).json({ message: 'Membre introuvable' });
});

app.delete('/api/team/:id', (req, res) => {
  const { id } = req.params;
  let list = readJsonFile(TEAM_FILE, DEFAULT_TEAM);
  const initialLength = list.length;
  list = list.filter((item: any) => item.id !== id);
  if (list.length < initialLength) {
    writeJsonFile(TEAM_FILE, list);
    return res.json({ success: true, message: 'Membre supprimé' });
  }
  res.status(404).json({ message: 'Membre introuvable' });
});

// News CRUD
app.get('/api/news', (req, res) => {
  const list = readJsonFile(NEWS_FILE, DEFAULT_NEWS);
  res.json(list);
});

app.post('/api/news', (req, res) => {
  const list = readJsonFile(NEWS_FILE, DEFAULT_NEWS);
  const newNews = {
    id: `news-${Date.now()}`,
    ...req.body,
    views: 0
  };
  list.unshift(newNews);
  writeJsonFile(NEWS_FILE, list);
  res.status(201).json(newNews);
});

// Server-side Gemini AI Assistant for Regional Administrators
app.post('/api/admin/assistant', async (req, res) => {
  const { prompt, history = [] } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
    return res.json({
      success: true,
      text: "🤖 **[Mode Démonstration]** Bonjour ! Je suis l'assistant IA du Croissant-Rouge Gafsa. Pour activer mes réponses complètes générées par Gemini, veuillez configurer une clé d'API valide dans le menu **Settings > Secrets**. \n\nVoici ce que je peux faire pour vous :\n1. Rédiger des appels aux dons et de mobilisation de bénévoles.\n2. Synthétiser des rapports d'intervention pour Redeyef, Metlaoui, ou Gafsa.\n3. Écrire des publications pour les réseaux sociaux (Facebook, etc.).\n\n**Exemple de suggestion rédigée (simulée) :**\n*Appel d'urgence - Vague de Froid à Sened*\n\"Le Comité Régional de Gafsa du Croissant-Rouge Tunisien lance un appel pressant à la solidarité pour soutenir nos concitoyens de Sened. Rejoignez-nous pour empaqueter les kits d'aide thermique ce samedi dès 9h au bureau régional de Gafsa.\""
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Provide rich administrative context about the Gafsa region and CRM committee
    const systemInstruction = `You are a professional administrative assistant specifically tailored for the Regional Committee of Gafsa for the Tunisian Red Crescent (Croissant-Rouge Tunisien - CRM Gafsa).
Gafsa is a region in southwest Tunisia characterized by its mining basin (Metlaoui, Redeyef, Moulares, Mdhilla) and rural zones (Sened, Gafsa Nord, El Guettar).
Your goal is to help Dr. Ahmed Belkacem (President) and Sonia Mansour (Secretary General) manage their volunteer coordination, write action plans, draft official press releases in elegant professional French or Arabic, and outline social media posts for emergency interventions (such as flooding, extreme cold, blood donations, heatwave prevention, and medical caravans).
Be supportive, clear, structured, and empathetic. Always write in the requested language (French by default, or Arabic if prompted). Always use markdown formatting.`;

    const formattedContents = history.map((h: any) => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));

    formattedContents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const text = response.text || "Désolé, je n'ai pas pu générer de réponse.";
    res.json({ success: true, text });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    res.status(500).json({
      success: false,
      message: "Une erreur s'est produite lors de l'appel à l'assistant IA Gafsa.",
      error: error.message
    });
  }
});

// Setup Vite Dev Server / Static files serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Croissant-Rouge Gafsa Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
