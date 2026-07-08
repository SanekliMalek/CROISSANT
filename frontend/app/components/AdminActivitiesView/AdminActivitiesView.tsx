'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Activity } from '@/types';

interface AdminActivitiesViewProps {
  activities: Activity[];
  onAddActivity: () => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
}

export default function AdminActivitiesView({
  activities,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}: AdminActivitiesViewProps) {
  return (
    <div className="glass-dark p-6 rounded-3xl border-stone-800/80 shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-black font-display text-white">
          GESTIONNAIRE DES CAMPAGNES D'ACTION
        </h2>
        <button
          onClick={onAddActivity}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold font-mono uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <Plus size={14} />
          Ajouter une Campagne
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800 flex gap-4 items-center"
          >
            <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900">
              <img
                src={activity.image}
                alt={activity.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-mono text-red-500 uppercase font-semibold">
                {activity.category} - {activity.location}
              </span>
              <h3 className="text-sm font-bold font-display text-white truncate">{activity.title}</h3>
              <p className="text-[10px] font-mono text-stone-500 mt-0.5">
                Budget Target: {activity.targetAmount.toLocaleString()} TND - Benefs: {activity.beneficiaries}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onEditActivity(activity)}
                className="p-2 bg-stone-800 hover:bg-stone-750 text-stone-300 rounded-lg border border-stone-700 cursor-pointer"
                title="Modifier"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => onDeleteActivity(activity.id)}
                className="p-2 bg-red-950/50 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-900/40 cursor-pointer"
                title="Supprimer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
