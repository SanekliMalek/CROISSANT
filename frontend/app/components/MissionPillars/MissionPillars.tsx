'use client';

import { Shield, HeartHandshake, BookOpen } from 'lucide-react';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface MissionPillarsProps {
  lang: Lang;
}

export default function MissionPillars({ lang }: MissionPillarsProps) {
  const t = TRANSLATIONS[lang];

  const missions = [
    {
      title: t.mission1Title,
      desc: t.mission1Desc,
      icon: Shield
    },
    {
      title: t.mission2Title,
      desc: t.mission2Desc,
      icon: HeartHandshake
    },
    {
      title: t.mission3Title,
      desc: t.mission3Desc,
      icon: BookOpen
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 w-full">
      <div className="flex flex-col items-center text-center">
        <span className="text-red-700 font-mono font-black text-[10px] uppercase tracking-[0.2em] mb-3">
          {lang === 'AR' ? 'مهامنا الرئيسية' : 'NOS MISSIONS FONDAMENTALES'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-stone-900">
          {t.missionTitle}
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm font-light max-w-lg mt-2">
          {t.missionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto relative z-10">
        {missions.map((mission, idx) => {
          const Icon = mission.icon;
          return (
            <div
              key={idx}
              className="saas-card p-6 rounded-2xl border border-stone-200 bg-white/50 backdrop-blur-sm flex flex-col gap-3 group hover:border-red-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <Icon size={18} />
              </div>
              <h4 className="text-sm font-bold text-stone-900 font-display">
                {mission.title}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                {mission.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
