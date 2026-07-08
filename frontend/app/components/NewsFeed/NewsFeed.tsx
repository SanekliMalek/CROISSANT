'use client';

import { ArrowRight } from 'lucide-react';
import { PageId, NewsItem } from '@/types';
import { Lang, TRANSLATIONS } from '@/data/translations';

interface NewsFeedProps {
  lang: Lang;
  isRTL: boolean;
  news: NewsItem[];
  onPageChange: (page: PageId) => void;
  onSelectNews: (news: NewsItem) => void;
}

export default function NewsFeed({
  lang,
  isRTL,
  news,
  onPageChange,
  onSelectNews,
}: NewsFeedProps) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="news-feed" className="max-w-5xl mx-auto px-6 md:px-8 py-16 w-full">
      <div className={`flex items-end justify-between mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <p className="text-red-700 font-mono font-black text-[10px] uppercase tracking-[0.2em] mb-2">{t.actBadge}</p>
          <h2 className="text-3xl font-black font-display tracking-tight text-stone-950">{t.newsTitle}</h2>
        </div>
        <button
          onClick={() => onPageChange('activities')}
          className="text-stone-500 hover:text-red-700 transition-colors text-xs font-mono font-black uppercase tracking-wider cursor-pointer"
        >
          {t.newsViewAll} →
        </button>
      </div>

      <div className="divide-y divide-stone-200">
        {news.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectNews(item)}
            className={`group flex items-center justify-between gap-8 py-8 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-mono text-[10px] font-bold text-stone-400">{item.date}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-650 text-[9px] font-black font-mono uppercase tracking-wide border border-red-100">
                  {t.actualiteLocale}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-red-650 transition-colors font-display leading-snug">
                {item.title}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed line-clamp-2 font-light">
                {item.summary}
              </p>
            </div>
            <span className="shrink-0 w-8 h-8 rounded-full bg-stone-100 group-hover:bg-red-50 text-stone-400 group-hover:text-red-600 flex items-center justify-center transition-all">
              <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
