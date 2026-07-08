'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown } from 'lucide-react';
import { Lang } from '@/data/translations';
import { useLangSwitcher } from './useLangSwitcher';

interface LangSwitcherProps {
  lang: Lang;
  isRTL: boolean;
  onLangChange: (lang: Lang) => void;
}

export default function LangSwitcher({ lang, isRTL, onLangChange }: LangSwitcherProps) {
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useLangSwitcher(langMenuRef);

  return (
    <div className="relative" ref={langMenuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-300/60 bg-white/50 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-red-600/50 hover:bg-white transition-colors cursor-pointer"
      >
        <Globe size={13} className="text-red-600" />
        <span>{lang}</span>
        <ChevronDown size={11} className={`text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute mt-2 w-36 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl overflow-hidden py-1 text-xs font-mono font-bold ${
              isRTL ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
            }`}
          >
            {([
              { id: 'FR', label: 'Français' },
              { id: 'EN', label: 'English' },
              { id: 'AR', label: 'العربية' },
            ] as { id: Lang; label: string }[]).map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onLangChange(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 flex items-center justify-between hover:bg-red-50/70 transition-colors cursor-pointer ${
                  lang === opt.id ? 'text-red-700 font-black' : 'text-stone-600'
                } ${isRTL ? 'text-right flex-row-reverse' : ''}`}
              >
                <span>{opt.label}</span>
                {lang === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
