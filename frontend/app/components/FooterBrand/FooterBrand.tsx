'use client';

import { Lang, TRANSLATIONS } from '@/data/translations';

interface FooterBrandProps {
  lang: Lang;
  isRTL: boolean;
}

export default function FooterBrand({ lang, isRTL }: FooterBrandProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-red-650 to-red-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
            <path d="M17.5 3.5A8.5 8.5 0 1 0 20.9 17a10 10 0 1 1-3.4-13.5z" />
          </svg>
        </span>
        <span className="font-black text-white text-sm tracking-tight">
          {lang === 'AR' ? 'الهلال الأحمر التونسي' : 'Croissant-Rouge Tunisien'}
        </span>
      </div>
      <p className="text-xs text-stone-400 leading-relaxed mt-1">{t.footerDesc}</p>

      <div className={`flex gap-3 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {[
          { name: 'Facebook', href: 'https://facebook.com', svg: <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.7c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.9h-1.5c-1.2 0-1.6.7-1.6 1.5v1.8H16l-.4 3h-2.5v7A10 10 0 0 0 22 12z" /> },
          { name: 'Instagram', href: 'https://instagram.com', svg: <path d="M12 2.2c2.7 0 3 0 4.1.06 1 .05 1.6.2 2 .35a4 4 0 0 1 1.5 1 4 4 0 0 1 1 1.5c.15.4.3 1 .35 2 .05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1-.2 1.6-.35 2a4 4 0 0 1-1 1.5 4 4 0 0 1-1.5 1c-.4.15-1 .3-2 .35-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1-.05-1.6-.2-2-.35a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.15-.4-.3-1-.35-2C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1 .2-1.6.35-2a4 4 0 0 1 1-1.5 4 4 0 0 1 1.5-1c.4-.15 1-.3 2-.35C9 2.2 9.3 2.2 12 2.2zm0 1.8c-2.6 0-2.9 0-4 .06-.9.04-1.3.17-1.6.28-.4.16-.7.34-1 .63-.29.3-.47.6-.63 1-.11.3-.24.7-.28 1.6-.05 1.1-.06 1.4-.06 4s0 2.9.06 4c.04.9.17 1.3.28 1.6.16.4.34.7.63 1 .3.29.6.47 1 .63.3.11.7.24 1.6.28 1.1.05 1.4.06 4 .06s2.9 0 4-.06c.9-.04 1.3-.17 1.6-.28.4-.16.7-.34 1-.63.29-.3.47-.6.63-1 .11-.3.24-.7.28-1.6.05-1.1.06-1.4.06-4s0-2.9-.06-4c-.04-.9-.17-1.3-.28-1.6a2.3 2.3 0 0 0-.63-1 2.3 2.3 0 0 0-1-.63c-.3-.11-.7-.24-1.6-.28-1.1-.06-1.4-.06-4-.06zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.7-2.9a1.1 1.1 0 1 1-2.1 0 1.1 1.1 0 0 1 2.1 0z" /> },
          { name: 'Twitter', href: 'https://twitter.com', svg: <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a3.8 3.8 0 0 0-6.6 3.5A11 11 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.1c-.7 0-1.4-.2-2-.5 0 1.9 1.4 3.5 3.2 3.9-.6.1-1.2.2-1.9.1a3.8 3.8 0 0 0 3.6 2.7A10.9 10.9 0 0 1 2 18.1a11 11 0 0 0 6.2 1.8c7.4 0 11.5-6.3 11.5-11.7v-.5c.8-.6 1.5-1.3 2.3-2.2z" /> }
        ].map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-650 hover:border-red-650 hover:text-white transition-colors"
            aria-label={item.name}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              {item.svg}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
