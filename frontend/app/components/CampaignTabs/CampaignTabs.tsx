'use client';

import { motion } from 'motion/react';
import { Activity } from '@/types';

interface CampaignTabsProps {
  activities: Activity[];
  activeActivityId: string;
  onSelectActivity: (id: string) => void;
}

export default function CampaignTabs({
  activities,
  activeActivityId,
  onSelectActivity,
}: CampaignTabsProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 pt-6 w-full flex flex-col gap-4 relative z-10">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {activities.map((item) => {
          const isSelected = item.id === activeActivityId;
          return (
            <button
              key={item.id}
              onClick={() => onSelectActivity(item.id)}
              className={`relative px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider shrink-0 transition-all border cursor-pointer ${
                isSelected
                  ? 'text-white border-transparent'
                  : 'bg-white/60 backdrop-blur-md text-stone-500 border-white/60 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="activeCampaignTab"
                  className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-md shadow-red-650/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{item.title.split(' - ')[0]}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
