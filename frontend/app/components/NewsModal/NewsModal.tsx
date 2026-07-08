'use client';

import { X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface NewsModalProps {
  lang: Lang;
  isRTL: boolean;
  selectedNews: NewsItem | null;
  onClose: () => void;
}

export default function NewsModal({
  lang,
  isRTL,
  selectedNews,
  onClose,
}: NewsModalProps) {
  const t = TRANSLATIONS[lang];

  return (
    <AnimatePresence>
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative bg-white rounded-[2.5rem] overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-100 z-10"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <button
              onClick={onClose}
              className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} z-20 p-2.5 rounded-full bg-stone-950/20 hover:bg-stone-950/35 text-white transition-colors cursor-pointer`}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto w-full flex-grow scrollbar-thin">
              <div className="relative h-64 md:h-80 w-full bg-stone-100 overflow-hidden">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                <div className={`absolute bottom-6 inset-x-6 flex items-center justify-between gap-3 text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="px-3 py-1 bg-red-600 border border-red-500 text-[9px] font-black uppercase tracking-widest rounded-full font-mono">
                    {t.actualiteLocale}
                  </span>
                  <span className="text-xs font-mono font-bold drop-shadow-sm">
                    {selectedNews.date}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-5">
                <div className={`flex items-center gap-3 text-[10px] text-stone-400 font-mono font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {selectedNews.views} {t.lectures}
                  </span>
                  <span>•</span>
                  <span>{lang === 'AR' ? 'اللجنة الجهوية للهلال الأحمر بقفصة' : 'Comité Régional de Gafsa'}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-black font-display text-stone-900 leading-tight">
                  {selectedNews.title}
                </h2>

                <div className={`w-12 h-1 bg-red-500 rounded-full ${isRTL ? 'self-start' : 'self-start'}`} />

                <p className={`text-stone-600 text-xs sm:text-sm font-semibold italic pl-4 leading-relaxed ${isRTL ? 'border-r-4 border-l-0 border-red-250 pr-4 pl-0' : 'border-l-4 border-red-200'}`}>
                  {selectedNews.summary}
                </p>

                <div className="text-stone-700 text-xs sm:text-sm leading-relaxed font-light space-y-4 whitespace-pre-line">
                  {selectedNews.content}
                </div>
              </div>
            </div>

            <div className={`p-4 md:p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider">
                {lang === 'AR' ? '© 2026 الهلال الأحمر بقفصة' : '© 2026 Croissant-Rouge Gafsa'}
              </span>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                {t.closeModal}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
