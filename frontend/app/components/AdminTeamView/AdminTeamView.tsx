'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react';
import { TeamMember } from '@/types';

interface AdminTeamViewProps {
  team: TeamMember[];
  onAddMember: () => void;
  onEditMember: (member: TeamMember) => void;
  onDeleteMember: (id: string) => void;
}

export default function AdminTeamView({
  team,
  onAddMember,
  onEditMember,
  onDeleteMember,
}: AdminTeamViewProps) {
  return (
    <div className="glass-dark p-6 rounded-3xl border-stone-800/80 shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-black font-display text-white">
          GESTIONNAIRE DES FICHES DE L'ANNUAIRE INTERNE
        </h2>
        <button
          onClick={onAddMember}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold font-mono uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <Plus size={14} />
          Ajouter un Membre
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800 flex gap-3.5 items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={member.avatar}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-white font-display truncate">{member.name}</h3>
                <p className="text-[9px] font-mono uppercase text-stone-500 truncate">{member.role}</p>
                <span className="text-[9px] px-1.5 py-0.5 bg-stone-950 text-stone-400 font-mono rounded-md border border-stone-800 uppercase mt-1 block w-fit">
                  {member.category}
                </span>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => onEditMember(member)}
                className="p-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg border border-stone-700 cursor-pointer"
                title="Modifier"
              >
                <Edit2 size={11} />
              </button>
              <button
                onClick={() => onDeleteMember(member.id)}
                className="p-1.5 bg-red-950/50 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-900/40 cursor-pointer"
                title="Supprimer"
              >
                <Trash2 size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
