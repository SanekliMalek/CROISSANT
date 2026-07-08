'use client';

import { motion, AnimatePresence } from 'motion/react';
import { UserPlus } from 'lucide-react';
import { PageId } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface NavLink {
  id: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  links: NavLink[];
  currentPage: PageId;
  lang: Lang;
  isRTL: boolean;
  onLinkClick: (id: PageId) => void;
  onJoinClick: () => void;
}

export default function MobileDrawer({ isOpen, links, currentPage, lang, isRTL, onLinkClick, onJoinClick }: MobileDrawerProps) {
  const t = TRANSLATIONS[lang];
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute inset-x-4 top-[78px] z-40 p-4 rounded-2xl glass border border-stone-200/50 shadow-xl flex flex-col gap-2.5"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onLinkClick(link.id as PageId)}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider rounded-xl transition-all ${
                currentPage === link.id
                  ? 'bg-red-50 text-red-700 border border-red-100'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              } ${isRTL ? 'text-right' : ''}`}
            >
              {link.label}
            </button>
          ))}

          <hr className="border-stone-200/50 my-1" />

          <button
            onClick={onJoinClick}
            className="w-full px-4 py-3 bg-gradient-to-r from-red-650 to-red-500 text-white text-xs font-bold font-mono uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5"
          >
            <UserPlus size={14} />
            <span>{t.navJoin}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
