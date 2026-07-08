'use client';

import { motion } from 'motion/react';

interface TeamFilterProps {
  filter: 'all' | 'board' | 'coordination' | 'medical' | 'field';
  setFilter: (filter: 'all' | 'board' | 'coordination' | 'medical' | 'field') => void;
}

export default function TeamFilter({ filter, setFilter }: TeamFilterProps) {
  const tabs = [
    { id: 'all', label: 'Tous' },
    { id: 'board', label: 'Conseil Board' },
    { id: 'coordination', label: 'Coordination' },
    { id: 'medical', label: 'Secteur Médical' },
    { id: 'field', label: 'Intervention' },
  ] as const;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200/20 pb-4">
      <h2 className="text-lg font-black font-display text-stone-900 flex items-center gap-2">
        Annuaire des Membres du Comité
      </h2>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`relative px-3.5 py-2 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider transition-all border cursor-pointer ${
                isActive
                  ? 'text-white border-transparent'
                  : 'bg-white/60 backdrop-blur-md text-stone-500 border-white/60 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTeamTab"
                  className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-md shadow-red-650/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
