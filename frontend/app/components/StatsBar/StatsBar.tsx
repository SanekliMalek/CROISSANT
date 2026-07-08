'use client';

import { Lang, TRANSLATIONS } from '@/data/translations';

interface StatsBarProps {
  lang: Lang;
}

export default function StatsBar({ lang }: StatsBarProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative bg-gradient-to-r from-red-950 via-red-900 to-red-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg-dark opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
        <div className="flex flex-col items-center">
          <p className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">{t.stats1Val}</p>
          <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.18em] text-red-200/70">{t.stats1Label}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">{t.stats2Val}</p>
          <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.18em] text-red-200/70">{t.stats2Label}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">{t.stats3Val}</p>
          <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.18em] text-red-200/70">{t.stats3Label}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">{t.stats4Val}</p>
          <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.18em] text-red-200/70">{t.stats4Label}</p>
        </div>
      </div>
    </section>
  );
}
