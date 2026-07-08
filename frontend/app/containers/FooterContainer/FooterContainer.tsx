'use client';

import { PageId } from '@/types';
import { Lang } from '@/data/translations';
import { useFooter } from './useFooter';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import FooterBrand from '@/components/FooterBrand';
import FooterNavLinks from '@/components/FooterNavLinks';
import FooterResources from '@/components/FooterResources';
import FooterNewsletter from '@/components/FooterNewsletter';
import FooterCopyright from '@/components/FooterCopyright';

interface FooterContainerProps {
  lang: Lang;
  onPageChange?: (page: PageId) => void;
}

export default function FooterContainer({ lang, onPageChange }: FooterContainerProps) {
  const { email, setEmail, subscribed, handleSubscribe } = useFooter();
  const router = useRouter();
  const isRTL = lang === 'AR';

  const handleLinkClick = useCallback((pageId: PageId) => {
    if (onPageChange) {
      onPageChange(pageId);
    } else {
      const path = pageId === 'home' ? '/' : `/${pageId}`;
      router.push(path);
    }
  }, [onPageChange, router]);

  return (
    <footer 
      className="relative bg-[#0d0404] text-stone-300 pt-20 pb-10 border-t border-red-950/20 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-0 bg-grid-dots-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-red-700/10 rounded-full filter blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          <FooterBrand lang={lang} isRTL={isRTL} />
          <FooterNavLinks lang={lang} isRTL={isRTL} onLinkClick={handleLinkClick} />
          <FooterResources lang={lang} isRTL={isRTL} onLinkClick={handleLinkClick} />
          <FooterNewsletter 
            lang={lang} 
            isRTL={isRTL} 
            email={email} 
            subscribed={subscribed} 
            onEmailChange={setEmail} 
            onSubmit={handleSubscribe} 
          />
        </div>
        <FooterCopyright lang={lang} isRTL={isRTL} />
      </div>
    </footer>
  );
}
