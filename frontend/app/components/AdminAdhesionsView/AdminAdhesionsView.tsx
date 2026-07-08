'use client';

import { Check, X, Trash2 } from 'lucide-react';
import { Adhesion } from '@/types';

interface AdminAdhesionsViewProps {
  adhesions: Adhesion[];
  handleAdhesionStatus: (id: string, status: 'approved' | 'rejected') => void;
  handleDeleteAdhesion: (id: string) => void;
}

export default function AdminAdhesionsView({ adhesions, handleAdhesionStatus, handleDeleteAdhesion }: AdminAdhesionsViewProps) {
  return (
    <div className="glass-dark p-6 rounded-3xl border-stone-800/80 shadow-md flex flex-col gap-4 overflow-hidden">
      <h2 className="text-base font-black font-display text-white">
        CANDIDATURES VOLONTAIRES ENREGISTRÉES (TUNISIE INPDP COHÉSION)
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-stone-900 text-stone-500">
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Candidat</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Ville</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Spécialité / Métier</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Intérêts</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Créneaux d'entretien</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Statut</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-900 text-stone-300">
            {adhesions.map((adh) => (
              <tr key={adh.id} className="hover:bg-stone-900/30">
                <td className="py-3.5 px-4 font-semibold">
                  <div className="flex flex-col">
                    <span className="text-white font-bold font-display">{adh.lastName} {adh.firstName}</span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{adh.email} • {adh.phone}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-semibold">{adh.city}</td>
                <td className="py-3.5 px-4">{adh.profession}</td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {adh.interests.map((i, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 bg-stone-900 border border-stone-800 text-stone-400 text-[9px] rounded-md">
                        {i}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-stone-400">{adh.preferredSlots.join(', ')}</td>
                <td className="py-3.5 px-4 font-semibold">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                    adh.status === 'approved' 
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/40' 
                      : adh.status === 'rejected'
                        ? 'bg-red-950/60 text-red-400 border border-red-900/40'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-900/40'
                  }`}>
                    {adh.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {adh.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAdhesionStatus(adh.id, 'approved')}
                          className="p-1.5 bg-emerald-950/80 border border-emerald-900/50 text-emerald-400 rounded-lg hover:bg-emerald-900 cursor-pointer"
                          title="Approuver"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          onClick={() => handleAdhesionStatus(adh.id, 'rejected')}
                          className="p-1.5 bg-red-950/80 border border-red-900/50 text-red-400 rounded-lg hover:bg-red-900 cursor-pointer"
                          title="Rejeter"
                        >
                          <X size={12} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteAdhesion(adh.id)}
                      className="p-1.5 bg-stone-850 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white rounded-lg cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {adhesions.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-stone-500">Aucune candidature de bénévole disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
