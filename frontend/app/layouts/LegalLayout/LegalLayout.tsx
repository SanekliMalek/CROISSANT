'use client';

import { motion } from 'motion/react';
import FooterContainer from '@/containers/FooterContainer';
import LegalContainer from '@/containers/LegalContainer';
import NavbarContainer from '@/containers/NavbarContainer';
import RouteLoading from '@/components/RouteLoading';
import RouteScrollProgress from '@/components/RouteScrollProgress';
import { useRouteLayout } from '@/layouts/useRouteLayout';
import { PageId } from '@/types';

interface LegalLayoutProps {
  pageId: Extract<PageId, 'conditions' | 'confidentialite' | 'mentions-legales'>;
}

export default function LegalLayout({ pageId }: LegalLayoutProps) {
  const layout = useRouteLayout(pageId);

  if (layout.loading) {
    return <RouteLoading />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col antialiased transition-colors duration-500">
      <RouteScrollProgress scaleX={layout.scaleX} />
      <NavbarContainer
        currentPage={pageId}
        onPageChange={layout.handlePageChange}
        lang={layout.lang}
        onLangChange={layout.setLang}
      />
      <main className="flex-grow overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <LegalContainer
            pageId={pageId}
            onPageChange={layout.handlePageChange}
          />
        </motion.div>
      </main>
      <FooterContainer onPageChange={layout.handlePageChange} lang={layout.lang} />
    </div>
  );
}
