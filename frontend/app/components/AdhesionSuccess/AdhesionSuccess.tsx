'use client';

import { CheckCircle2 } from 'lucide-react';
import { PageId } from '@/types';

interface AdhesionSuccessProps {
  firstName: string;
  onPageChange: (page: PageId) => void;
  onReset: () => void;
}

export default function AdhesionSuccess({ firstName, onPageChange, onReset }: AdhesionSuccessProps) {
  return (
    <div className="bg-white/60 backdrop-blur-lg p-8 rounded-[2rem] border border-white shadow-sm text-center flex flex-col items-center gap-6 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center pulse-ring">
        <CheckCircle2 size={36} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black font-display text-stone-900">
          Candidature Soumise avec Succès !
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto font-light">
          Merci pour votre engagement, {firstName} ! Notre Secrétariat de Gafsa a bien reçu vos informations. Nous vous contacterons sous 5 à 7 jours pour fixer la date de votre entretien de bienvenue.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <button
          onClick={() => onPageChange('home')}
          className="px-6 py-3.5 bg-stone-950 hover:bg-stone-900 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-full cursor-pointer transition-all"
        >
          Retour à l'Accueil
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3.5 bg-white border border-stone-200 text-stone-700 font-bold font-mono text-xs uppercase tracking-wider rounded-full hover:bg-stone-50 transition-all"
        >
          Déposer une autre candidature
        </button>
      </div>
    </div>
  );
}
