'use client';

import { ChevronRight } from 'lucide-react';
import { PageId } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface FooterNavLinksProps {
  lang: Lang;
  isRTL: boolean;
  onLinkClick: (id: PageId) => void;
}

export default function FooterNavLinks({ lang, isRTL, onLinkClick }: FooterNavLinksProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">
        {t.footerColLinks}
      </p>
      <ul className="space-y-3 text-xs font-medium">
        {[
          { id: 'home', label: t.navHome },
          { id: 'activities', label: t.navActivities },
          { id: 'team', label: t.navTeam },
          { id: 'adhesion', label: t.navAdhesion },
        ].map((link) => (
          <li key={link.id}>
            <button
              onClick={() => onLinkClick(link.id as PageId)}
              className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-stone-400 focus:outline-none ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ChevronRight size={12} className="text-red-500" />
              <span>{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
