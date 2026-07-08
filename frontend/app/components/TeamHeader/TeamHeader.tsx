'use client';

import { Users } from 'lucide-react';

export default function TeamHeader() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-6 w-full flex flex-col gap-4 z-10">
      <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-md w-fit">
        ORGANISATION & GOUVERNANCE RÉGIONALE
      </div>
      <h1 className="text-4xl md:text-5xl font-black font-display tracking-tight text-stone-900 leading-[1.05] max-w-3xl">
        Nos Volontaires au Service de <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-red-500 to-amber-500">l'Humanité</span>
      </h1>
      <p className="text-lg text-stone-500 max-w-3xl leading-relaxed font-light italic">
        Découvrez le Conseil d'Administration du Comité Régional de Gafsa, notre équipe permanente de coordination, et notre formidable bassin de volontaires médicaux et d'intervention rapide.
      </p>
      <div className="flex items-center gap-3 text-xs text-stone-500 font-mono mt-1 bg-white/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white w-fit shadow-xs">
        <Users className="text-red-650 animate-pulse" size={16} />
        <span className="font-bold">Plus de 350+ secouristes formés mobilisables dans le gouvernorat.</span>
      </div>
    </section>
  );
}
