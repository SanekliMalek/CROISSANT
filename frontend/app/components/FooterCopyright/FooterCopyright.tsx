'use client';

import { Lang, TRANSLATIONS } from '@/data/translations';

interface FooterCopyrightProps {
  lang: Lang;
  isRTL: boolean;
}

export default function FooterCopyright({ lang, isRTL }: FooterCopyrightProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-stone-500 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
      <p className="text-center sm:text-left">
        {t.footerCopyright}
      </p>
      <p className="font-mono text-[10px] text-stone-600">
        هلال الأحمر التونسي — لجنة ولاية قفصة
      </p>
    </div>
  );
}
