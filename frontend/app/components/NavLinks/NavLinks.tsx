'use client';

import { motion } from 'motion/react';
import { PageId } from '@/types';

interface NavLink {
  id: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
  currentPage: PageId;
  isRTL: boolean;
  onLinkClick: (id: PageId) => void;
}

export default function NavLinks({ links, currentPage, isRTL, onLinkClick }: NavLinksProps) {
  return (
    <div className={`hidden md:flex items-center gap-1.5 relative z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {links.map((link) => {
        const isActive = currentPage === link.id;
        return (
          <button
            key={link.id}
            onClick={() => onLinkClick(link.id as PageId)}
            className={`relative px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
              isActive
                ? 'text-red-700'
                : 'text-stone-500 hover:text-stone-950 hover:bg-stone-100/40'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeNavbarTab"
                className="absolute inset-0 bg-red-50/80 border border-red-100/60 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </button>
        );
      })}
    </div>
  );
}
