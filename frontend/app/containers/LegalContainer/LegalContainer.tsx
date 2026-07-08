'use client';

import { PageId } from '@/types';
import { motion } from 'motion/react';
import { useLegal } from './useLegal';

import LegalNav from '@/components/LegalNav';
import LegalContent from '@/components/LegalContent';

interface LegalContainerProps {
  pageId: 'conditions' | 'confidentialite' | 'mentions-legales';
  onPageChange: (page: PageId) => void;
}

export default function LegalContainer({ pageId, onPageChange }: LegalContainerProps) {
  const { getPageTitle } = useLegal(pageId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col pt-24 min-h-screen relative overflow-hidden"
    >
      <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-stone-300/20 rounded-full blur-[96px] z-0" />
      <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-red-500/5 rounded-full blur-[86px] z-0" />

      <section className="max-w-4xl mx-auto px-6 py-12 w-full flex flex-col gap-6 relative z-10">
        <LegalNav 
          pageId={pageId} 
          onPageChange={onPageChange} 
          getPageTitle={getPageTitle} 
        />
        <LegalContent pageId={pageId} />
      </section>
    </motion.div>
  );
}
