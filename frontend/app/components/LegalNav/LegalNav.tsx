'use client';

import { Scale } from 'lucide-react';
import { PageId } from '@/types';

interface LegalNavProps {
  pageId: 'conditions' | 'confidentialite' | 'mentions-legales';
  onPageChange: (page: PageId) => void;
  getPageTitle: () => string;
}

export default function LegalNav({ pageId, onPageChange, getPageTitle }: LegalNavProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/50 pb-5">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
          <Scale size={18} />
        </div>
        <h1 className="text-2xl font-black font-display text-stone-900 tracking-tight leading-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
        <button
          onClick={() => onPageChange('conditions')}
          className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider ${
            pageId === 'conditions'
              ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
              : 'bg-white/60 backdrop-blur-md text-stone-500 border-stone-200/60 hover:text-stone-900'
          }`}
        >
          Conditions (CGU)
        </button>
        <button
          onClick={() => onPageChange('confidentialite')}
          className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider ${
            pageId === 'confidentialite'
              ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
              : 'bg-white/60 backdrop-blur-md text-stone-500 border-stone-200/60 hover:text-stone-900'
          }`}
        >
          Confidentialité
        </button>
        <button
          onClick={() => onPageChange('mentions-legales')}
          className={`px-4 py-2 rounded-full border transition-all cursor-pointer font-bold uppercase tracking-wider ${
            pageId === 'mentions-legales'
              ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
              : 'bg-white/60 backdrop-blur-md text-stone-500 border-stone-200/60 hover:text-stone-900'
          }`}
        >
          Mentions Légales
        </button>
      </div>
    </div>
  );
}
