'use client';

import { UserPlus } from 'lucide-react';
import { PageId } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface JoinButtonProps {
  lang: Lang;
  onClick: () => void;
}

export default function JoinButton({ lang, onClick }: JoinButtonProps) {
  const t = TRANSLATIONS[lang];
  return (
    <button
      onClick={onClick}
      className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-red-650 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-xs font-bold font-mono uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-red-900/10 hover:shadow-lg hover:shadow-red-900/20 transition-all hover:-translate-y-0.5 cursor-pointer"
    >
      <UserPlus size={13} />
      <span>{t.navAdhesion}</span>
    </button>
  );
}
