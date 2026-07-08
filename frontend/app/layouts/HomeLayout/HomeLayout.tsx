'use client';

import { motion } from 'motion/react';
import FooterContainer from '@/containers/FooterContainer';
import HomeContainer from '@/containers/HomeContainer';
import NavbarContainer from '@/containers/NavbarContainer';
import RouteLoading from '@/components/RouteLoading';
import RouteScrollProgress from '@/components/RouteScrollProgress';
import { useRouteLayout } from '@/layouts/useRouteLayout';

export default function HomeLayout() {
  const layout = useRouteLayout('home');

  if (layout.loading) {
    return <RouteLoading />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col antialiased transition-colors duration-500">
      <RouteScrollProgress scaleX={layout.scaleX} />
      <NavbarContainer
        currentPage="home"
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
          <HomeContainer
            activities={layout.activities}
            news={layout.news}
            hero={layout.homeHero}
            onPageChange={layout.handlePageChange}
            onSelectActivity={layout.handleSelectActivityAndOpen}
            lang={layout.lang}
          />
        </motion.div>
      </main>
      <FooterContainer onPageChange={layout.handlePageChange} lang={layout.lang} />
    </div>
  );
}
