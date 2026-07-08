'use client';

import { PageId } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface CtaBoardProps {
  lang: Lang;
  isRTL: boolean;
  onPageChange: (page: PageId) => void;
}

export default function CtaBoard({ lang, isRTL, onPageChange }: CtaBoardProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative mx-6 sm:mx-8 mb-24 rounded-[2.5rem] overflow-hidden bg-[#170606] text-white border border-red-950/20">
      <div className="absolute inset-0 grid-bg-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-32 -left-10 w-96 h-96 bg-red-600/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-400/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 items-center">
        <div className={`p-8 sm:p-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-300 font-bold mb-4">
            {t.ctaBadge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight font-display">
            {t.ctaTitle}{' '}
            <span className="gradient-text">{t.ctaTitleAccent}</span>
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-5 leading-relaxed max-w-md font-light">
            {t.ctaDesc}
          </p>

          <div className={`mt-8 flex flex-wrap gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
            <button
              onClick={() => {
                alert(
                  lang === 'AR'
                    ? "لتقديم تبرع، يرجى الاتصال مباشرة بكتابة المكتب الجهوي بقفصة على الرقم التالي: 101 225 76 216+ أو عبر البريد الإلكتروني: contact@croissantrouge-gafsa.org.tn. سنكون سعداء بتزويدكم بالرمز البنكي الرسمي (RIB) للجنة."
                    : "Pour effectuer un don, veuillez contacter directement le Secrétariat du Bureau Régional de Gafsa au +216 76 225 101, ou par e-mail à contact@croissantrouge-gafsa.org.tn. Nous serons ravis de vous transmettre les coordonnées bancaires officielles (RIB) du Comité."
                );
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-stone-950 font-black px-7 py-3.5 rounded-full shadow-lg shadow-amber-900/10 hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              {t.ctaBtnDonate}
            </button>
            <button
              onClick={() => onPageChange('adhesion')}
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              {t.ctaBtnVolunteer}
            </button>
          </div>
        </div>

        <div className="relative h-64 lg:h-full min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1000&q=80"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            alt="Bénévoles solidaires"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170606] via-[#170606]/40 to-transparent lg:bg-gradient-to-r lg:from-[#170606] lg:to-transparent"></div>
        </div>
      </div>

      <div className="relative flex items-center justify-center gap-4 pb-10">
        <span className="h-px w-16 bg-white/10"></span>
        <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-300 fill-current">
            <path d="M17.5 3.5A8.5 8.5 0 1 0 20.9 17a10 10 0 1 1-3.4-13.5z" />
          </svg>
        </span>
        <span className="h-px w-16 bg-white/10"></span>
      </div>
    </section>
  );
}
