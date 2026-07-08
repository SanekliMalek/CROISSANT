'use client';

import { PageId } from '@/types';
import { Lang } from '@/data/translations';

interface NavLogoProps {
  lang: Lang;
  onClick: () => void;
}

export default function NavLogo({ lang, onClick }: NavLogoProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
    >
      <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-red-650 to-red-500 flex items-center justify-center shadow-lg shadow-red-900/20 group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
          <path d="M17.5 3.5A8.5 8.5 0 1 0 20.9 17a10 10 0 1 1-3.4-13.5z"/>
        </svg>
        <span className="absolute -inset-1 rounded-full border border-red-400/40 animate-ping"></span>
      </span>
      <span className="leading-none block">
        <span className="block font-black text-xs tracking-tight text-stone-900 uppercase">
          {lang === 'AR' ? 'الهلال الأحمر' : 'Croissant-Rouge'}
        </span>
        <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-red-600 font-bold mt-1">
          {lang === 'AR' ? 'لجنة ولاية قفصة' : 'Comité de Gafsa'}
        </span>
      </span>
    </button>
  );
}
