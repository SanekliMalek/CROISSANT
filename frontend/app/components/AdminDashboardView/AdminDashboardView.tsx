'use client';

import { FormEvent, type ChangeEvent } from 'react';
import { Users, Activity as ActivityIcon, Award, Sparkles, Send, Newspaper } from 'lucide-react';
import { Adhesion, Activity, HomeHeroSettings, NewsItem, TeamMember } from '@/types';

interface AdminDashboardViewProps {
  adhesions: Adhesion[];
  activities: Activity[];
  news: NewsItem[];
  team: TeamMember[];
  homeHero: HomeHeroSettings | null;
  setHomeHero: (hero: HomeHeroSettings) => void;
  onUploadImage: (file: File) => Promise<string>;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  aiHistory: { role: 'user' | 'assistant'; content: string }[];
  aiLoading: boolean;
  handleSendAiPrompt: (e?: FormEvent, presetPrompt?: string) => void;
  handleSaveHomeHero: (e: FormEvent) => void;
}

const DEFAULT_HOME_HERO: HomeHeroSettings = {
  id: 'hero',
  badge: 'Établi à Gafsa',
  title: 'Mission Hiver Solidaire',
  location: 'Djebel el Ank, Gafsa',
  description:
    "Chaque hiver, l'Opération Chaleur Hivernale à Djebel el Ank apporte chaleur et réconfort aux familles isolées des montagnes de Gafsa. Grâce à votre générosité, nous distribuons des couvertures épaisses, des vêtements chauds, des chauffages et du matériel d'isolation thermique pour affronter les températures extrêmes.",
  image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=80',
};

export default function AdminDashboardView({
  adhesions,
  activities,
  news,
  team,
  homeHero,
  setHomeHero,
  onUploadImage,
  aiPrompt,
  setAiPrompt,
  aiHistory,
  aiLoading,
  handleSendAiPrompt,
  handleSaveHomeHero,
}: AdminDashboardViewProps) {
  const heroDraft = homeHero ?? DEFAULT_HOME_HERO;

  const handleHeroUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const url = await onUploadImage(file);
      setHomeHero({ ...heroDraft, image: url });
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="glass-dark p-5 rounded-2xl border-stone-800/80 shadow-md flex items-center gap-4">
          <div className="p-3 bg-amber-950/50 border border-amber-900/50 text-amber-500 rounded-xl">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">Candidatures Volontaires</span>
            <h3 className="text-2xl font-black font-mono text-white mt-0.5">
              {adhesions.filter((a) => a.status === 'pending').length} en attente
            </h3>
          </div>
        </div>

        <div className="glass-dark p-5 rounded-2xl border-stone-800/80 shadow-md flex items-center gap-4">
          <div className="p-3 bg-red-950/50 border border-red-900/50 text-red-500 rounded-xl">
            <ActivityIcon size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">Campagnes Actives</span>
            <h3 className="text-2xl font-black font-mono text-white mt-0.5">
              {activities.filter((a) => a.status === 'active').length} chantiers en cours
            </h3>
          </div>
        </div>

        <div className="glass-dark p-5 rounded-2xl border-stone-800/80 shadow-md flex items-center gap-4">
          <div className="p-3 bg-blue-950/50 border border-blue-900/50 text-blue-500 rounded-xl">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">Annuaire Directoire</span>
            <h3 className="text-2xl font-black font-mono text-white mt-0.5">
              {team.length} fiches actives
            </h3>
          </div>
        </div>

        <div className="glass-dark p-5 rounded-2xl border-stone-800/80 shadow-md flex items-center gap-4">
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/50 text-emerald-500 rounded-xl">
            <Newspaper size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">Actualites</span>
            <h3 className="text-2xl font-black font-mono text-white mt-0.5">
              {news.length} articles publies
            </h3>
          </div>
        </div>

        <div className="bg-stone-900/50 p-5 rounded-2xl border border-stone-800 flex flex-col gap-2.5">
          <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-red-500">CONSEIL DE PILOTAGE GAFSA</h4>
          <p className="text-stone-400 text-[11px] leading-relaxed">
            Le bassin minier (Metlaoui, Redeyef, Moulares) est actuellement notre pole d'action le plus critique en raison des risques accrus de crues d'oueds et d'accidents du travail. Assurez-vous d'affecter en priorité les nouveaux candidats formés aux équipes de secourisme de ces zones.
          </p>
        </div>

        <form onSubmit={handleSaveHomeHero} className="bg-stone-900/50 p-5 rounded-2xl border border-stone-800 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest text-red-500">BANDEAU D'ACCUEIL</h4>
            <span className="text-[9px] font-mono text-stone-500 uppercase">Modifiable par l'admin</span>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-stone-500 uppercase">Badge</span>
            <input
              type="text"
              value={heroDraft.badge}
              onChange={(e) => setHomeHero({ ...heroDraft, badge: e.target.value })}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-stone-500 uppercase">Titre</span>
            <input
              type="text"
              value={heroDraft.title}
              onChange={(e) => setHomeHero({ ...heroDraft, title: e.target.value })}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-stone-500 uppercase">Lieu</span>
            <input
              type="text"
              value={heroDraft.location}
              onChange={(e) => setHomeHero({ ...heroDraft, location: e.target.value })}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-stone-500 uppercase">Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleHeroUpload}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-stone-500 uppercase">URL de l'image</span>
            <input
              type="text"
              value={heroDraft.image}
              onChange={(e) => setHomeHero({ ...heroDraft, image: e.target.value })}
              placeholder="https://... ou lien direct vers l'image"
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[9px] font-mono text-stone-500 uppercase">Description</span>
            <textarea
              value={heroDraft.description}
              onChange={(e) => setHomeHero({ ...heroDraft, description: e.target.value })}
              rows={4}
              className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-red-500"
            />
          </label>

          <button
            type="submit"
            className="mt-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold font-mono uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
          >
            Sauvegarder le bandeau
          </button>
        </form>
      </div>

      <div className="lg:col-span-8 glass-dark p-6 rounded-3xl border-stone-800/80 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-stone-900 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-red-500 animate-pulse" />
            <h2 className="text-sm font-black font-display text-white tracking-wide uppercase">
              ASSISTANT IA - COMITÉ RÉGIONAL GAFSA
            </h2>
          </div>
          <span className="px-2.5 py-1 bg-red-950/40 border border-red-900 text-red-400 text-[9px] font-bold font-mono rounded-full uppercase tracking-wider">
            Modèle Gemini 3.5 Active
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSendAiPrompt(undefined, "Rédiger un appel d'urgence suite aux inondations à Metlaoui")}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-[10px] font-bold font-mono text-stone-300 hover:text-white cursor-pointer"
          >
            📍 Inondation Metlaoui
          </button>
          <button
            onClick={() => handleSendAiPrompt(undefined, "Écrire une publication Facebook pour mobiliser des dons pour la Caravane de Sened")}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-[10px] font-bold font-mono text-stone-300 hover:text-white cursor-pointer"
          >
            📣 Caravane Sened
          </button>
          <button
            onClick={() => handleSendAiPrompt(undefined, "Rédiger une convocation professionnelle par email pour notre réunion de coordination")}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg text-[10px] font-bold font-mono text-stone-300 hover:text-white cursor-pointer"
          >
            ✉️ Convocation Bureau Gafsa
          </button>
        </div>

        <div className="h-[280px] overflow-y-auto flex flex-col gap-3 p-4 bg-stone-950/60 border border-stone-900 rounded-2xl scrollbar-none font-normal">
          {aiHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <span className="text-[9px] font-mono text-stone-500 uppercase">
                {msg.role === 'user' ? 'Dr. Belkacem' : 'Assistant Gafsa'}
              </span>
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-red-650 text-white rounded-tr-none'
                    : 'bg-stone-900 text-stone-200 border border-stone-800 rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {aiLoading && (
            <div className="self-start flex items-center gap-1 text-[10px] text-stone-500 font-mono italic animate-pulse">
              <span>L'IA rédige votre document opérationnel...</span>
            </div>
          )}
        </div>

        <form onSubmit={(e) => handleSendAiPrompt(e)} className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Posez une question, demandez la rédaction d'un rapport..."
            className="flex-1 px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            disabled={aiLoading}
            className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md shadow-red-500/10 cursor-pointer hover:scale-103 transition-all flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
