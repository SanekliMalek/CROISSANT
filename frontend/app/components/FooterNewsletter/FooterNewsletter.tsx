'use client';

import { Send, Check } from 'lucide-react';
import { FormEvent } from 'react';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface FooterNewsletterProps {
  lang: Lang;
  isRTL: boolean;
  email: string;
  subscribed: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function FooterNewsletter({ lang, isRTL, email, subscribed, onEmailChange, onSubmit }: FooterNewsletterProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">
        {t.footerColNewsletter}
      </p>
      <p className="text-xs text-stone-400 leading-relaxed">
        {t.footerNewsletterDesc}
      </p>

      <form onSubmit={onSubmit} className="flex gap-2 relative mt-2">
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={t.footerNewsletterPlaceholder}
          className={`flex-1 min-w-0 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-red-650 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
          required
          disabled={subscribed}
        />
        <button
          type="submit"
          className="shrink-0 w-10 h-10 rounded-full bg-red-650 hover:bg-red-600 flex items-center justify-center transition-colors cursor-pointer text-white"
          disabled={subscribed}
        >
          {subscribed ? <Check size={15} className="text-white animate-bounce" /> : <Send size={15} />}
        </button>
      </form>
      {subscribed && (
        <p className="text-[10px] text-green-400 font-mono mt-1 font-bold">
          {lang === 'AR' ? 'تم الاشتراك بنجاح!' : 'Inscription réussie !'}
        </p>
      )}
    </div>
  );
}
