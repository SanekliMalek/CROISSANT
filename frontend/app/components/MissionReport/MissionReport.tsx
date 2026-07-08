'use client';

import { ShieldCheck, FolderHeart } from 'lucide-react';

interface MissionReportProps {
  details: string;
}

export default function MissionReport({ details }: MissionReportProps) {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-6 md:p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-4">
      <h2 className="text-lg font-black font-display text-stone-900 border-b border-white/50 pb-3 flex items-center gap-2">
        <ShieldCheck className="text-red-650" size={20} />
        RAPPORT DE MISSION OPÉRATIONNELLE
      </h2>
      <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line font-light">
        {details}
      </p>
      <div className="bg-red-50/50 border border-red-100 p-4 rounded-2xl text-stone-600 text-xs mt-2 flex gap-3">
        <FolderHeart className="text-red-500 shrink-0 mt-0.5" size={16} />
        <span className="font-light">
          Le Comité Régional de Gafsa garantit que 100% de vos dons à ce projet sont directly alloués à l'achat d'intrants (médicaments, matériel d'aide thermique, denrées de subsistance) de terrain. La logistique humaine est assurée à titre 100% volontaire par nos secouristes.
        </span>
      </div>
    </div>
  );
}
