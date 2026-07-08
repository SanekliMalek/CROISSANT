'use client';

import { ArrowRight, MapPin, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, HomeHeroSettings } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';
import HeroScene from '@/components/HeroScene';

interface HeroSectionProps {
  lang: Lang;
  isRTL: boolean;
  isMissionExpanded: boolean;
  onToggleMission: () => void;
  onPageChange: (page: PageId) => void;
  onScrollToActivities: () => void;
  hero?: HomeHeroSettings | null;
}

export default function HeroSection({
  lang,
  isRTL,
  isMissionExpanded,
  onToggleMission,
  onPageChange,
  onScrollToActivities,
  hero,
}: HeroSectionProps) {
  const t = TRANSLATIONS[lang];
  const heroBadge = hero?.badge || t.establishedBadge;
  const heroTitle = hero?.title || t.missionSolitaire;
  const heroLocation = hero?.location || t.missionLocation;
  const heroDescription = hero?.description || t.missionDescription;
  const heroImage =
    hero?.image || 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=900&q=80';

  return (
    <section id="hero" className="relative min-h-[95vh] lg:min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 pointer-events-none grid-bg z-0 opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col ${isRTL ? 'lg:items-start text-right' : 'lg:items-start text-left'}`}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass text-[10px] font-mono uppercase tracking-[0.15em] text-red-600 font-bold border border-red-200/50 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-650 animate-ping"></span>
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-stone-950 font-display">
            {t.heroTitle}{' '}
            <span className="gradient-text block mt-1">{t.heroTitleAccent}</span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-stone-600 max-w-md leading-relaxed font-light">
            {t.heroDesc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 w-full justify-start">
            <button
              onClick={() => onPageChange('adhesion')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-650 to-red-500 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-red-900/15 hover:shadow-red-900/30 hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              {t.heroBtnJoin}
              <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
            </button>

            <button
              onClick={onScrollToActivities}
              className="inline-flex items-center gap-2 border border-stone-300 text-stone-800 font-semibold px-7 py-3.5 rounded-full bg-white/40 hover:border-red-600 hover:text-red-600 transition-colors text-xs cursor-pointer font-mono uppercase tracking-wider"
            >
              {t.heroBtnImpact}
            </button>
          </div>

          <div className="mt-14 flex items-center gap-8 border-t border-stone-200/50 pt-8 w-full max-w-md">
            <div>
              <p className="text-3xl font-black text-red-650 font-display">{t.heroMetric1Val}</p>
              <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider mt-1">{t.heroMetric1Label}</p>
            </div>
            <div className="h-10 w-px bg-stone-200"></div>
            <div>
              <p className="text-3xl font-black text-red-650 font-display">{t.heroMetric2Val}</p>
              <p className="text-[10px] text-stone-500 font-mono uppercase tracking-wider mt-1">{t.heroMetric2Label}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm group">
            <div className="absolute -inset-1.5 bg-gradient-to-br from-red-600 to-amber-500 rounded-[2.2rem] opacity-25 blur-lg group-hover:opacity-40 transition duration-500"></div>
            <div
              onClick={onToggleMission}
              className="relative rounded-[2.2rem] overflow-hidden shadow-2xl border border-white/40 bg-stone-100 card-3d cursor-pointer select-none"
            >
              <img
                src={heroImage}
                alt={heroTitle}
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-red-900/10 to-transparent"></div>

              <AnimatePresence>
                {isMissionExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0 bg-red-950/95 p-6 sm:p-8 flex flex-col justify-between z-20 text-white"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider text-red-200">{heroBadge}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleMission();
                          }}
                          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <h4 className="text-lg font-black font-display tracking-tight text-white mb-2">{heroTitle}</h4>
                      <p className="text-xs text-red-200/90 font-mono flex items-center gap-1.5 mb-4">
                        <MapPin size={12} />
                        {heroLocation}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed text-stone-200">
                        {heroDescription}
                      </p>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPageChange('adhesion');
                        }}
                        className="bg-white text-red-950 font-bold px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        {t.heroBtnJoin}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl px-5 py-4 flex items-center justify-between transition-colors duration-300 group-hover:bg-white/80">
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs font-black text-stone-900 font-display">{heroTitle}</p>
                  <p className="text-[10px] text-stone-500 font-mono font-bold mt-0.5">{heroLocation}</p>
                </div>
                <motion.span
                  animate={{ rotate: isMissionExpanded ? 45 : 0 }}
                  className="w-8 h-8 rounded-full bg-red-650 flex items-center justify-center text-white shrink-0 shadow-sm"
                >
                  <ArrowUpRight size={15} />
                </motion.span>
              </div>
            </div>

            <div className="absolute -top-4 -left-6 glass rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2 rotate-[-3deg] border border-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-mono font-black uppercase tracking-wider text-stone-800">{heroBadge}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
