'use client';

import { Shield, LogOut } from 'lucide-react';
import { PageId } from '@/types';

interface AdminHeaderProps {
  onPageChange: (page: PageId) => void;
  handleLogout: () => void;
}

export default function AdminHeader({ onPageChange, handleLogout }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-900 pb-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-red-950/40 border border-red-900 rounded-xl text-red-500 shadow-md">
          <Shield size={20} />
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-bold">
            Espace de Pilotage Régional de Gafsa
          </span>
          <h1 className="text-xl md:text-2xl font-black font-display text-white">
            Directoire CRM Gafsa
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => onPageChange('home')}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 text-[11px] font-bold font-mono uppercase tracking-wider rounded-xl border border-stone-800 cursor-pointer transition-all"
        >
          Voir le Site Public
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-950/40 hover:bg-red-900/35 text-red-400 text-[11px] font-bold font-mono uppercase tracking-wider rounded-xl border border-red-900/50 flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <LogOut size={12} />
          Déconnexion
        </button>
      </div>
    </div>
  );
}
