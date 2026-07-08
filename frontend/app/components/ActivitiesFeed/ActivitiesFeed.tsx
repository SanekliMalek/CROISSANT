'use client';

import { Award, ArrowRight } from 'lucide-react';
import { PageId, Activity } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface ActivitiesFeedProps {
  lang: Lang;
  isRTL: boolean;
  activities: Activity[];
  onPageChange: (page: PageId) => void;
  onSelectActivity: (id: string) => void;
}

export default function ActivitiesFeed({
  lang,
  isRTL,
  activities,
  onPageChange,
  onSelectActivity,
}: ActivitiesFeedProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="activities-feed" className="max-w-7xl mx-auto px-6 md:px-8 py-16 flex flex-col gap-8 w-full border-t border-stone-200/40">
      <div className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className="flex flex-col gap-1.5">
          <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-1.5 font-mono">
            <Award size={12} />
            {t.actBadge}
          </span>
          <h2 className="text-3xl font-black font-display tracking-tight text-stone-900">
            {t.actTitle}
          </h2>
        </div>
        <button
          onClick={() => onPageChange('activities')}
          className="text-xs font-bold font-mono uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 bg-white border border-stone-200 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          {t.actViewAll}
          <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
        </button>
      </div>

      {activities.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 mt-4">
          <div
            onClick={() => {
              onSelectActivity(activities[0].id);
              onPageChange('activities');
            }}
            className="col-span-12 lg:col-span-8 group relative rounded-[2rem] overflow-hidden shadow-lg border border-stone-200/60 bg-stone-900 h-[420px] cursor-pointer"
          >
            <img
              src={activities[0].image}
              alt={activities[0].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <div className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} flex gap-2`}>
              <span className="px-3 py-1 rounded-full bg-white/90 text-red-700 text-[10px] font-black font-mono uppercase tracking-wide">
                {activities[0].category}
              </span>
            </div>

            <div className={`absolute bottom-0 inset-x-0 p-8 flex flex-col gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-white/60 text-[10px] font-mono uppercase tracking-wider">
                {activities[0].location} · {activities[0].date}
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display leading-tight">
                {activities[0].title}
              </h3>
              <p className="text-white/70 text-xs mt-1 leading-relaxed max-w-xl line-clamp-2 font-light">
                {activities[0].description}
              </p>

              <div className="mt-4 max-w-md pt-4 border-t border-white/20 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] text-white/80 font-mono font-bold">
                  <span>{lang === 'AR' ? 'التقدم' : 'Objectif atteint'}</span>
                  <span>{Math.round((activities[0].raisedAmount / (activities[0].targetAmount || 1)) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                    style={{ width: `${Math.min(100, (activities[0].raisedAmount / (activities[0].targetAmount || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {activities.slice(1, 3).map((act) => (
              <div
                key={act.id}
                onClick={() => {
                  onSelectActivity(act.id);
                  onPageChange('activities');
                }}
                className="group relative rounded-3xl overflow-hidden shadow-md border border-stone-200 bg-stone-900 h-[197px] cursor-pointer flex-1"
              >
                <img
                  src={act.image}
                  alt={act.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-2.5 py-1 rounded-full bg-white/95 text-red-700 text-[9px] font-black font-mono uppercase`}>
                  {act.category}
                </span>

                <div className={`absolute bottom-0 inset-x-0 p-5 flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="text-[9px] font-mono text-white/50 mb-0.5">{act.location}</span>
                  <h4 className="text-white font-black text-sm leading-tight font-display line-clamp-1">
                    {act.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-xs text-stone-400 font-mono py-12">Aucune activité trouvée</p>
      )}
    </section>
  );
}
