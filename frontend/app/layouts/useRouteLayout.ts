'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useScroll, useSpring } from 'motion/react';
import { Lang } from '@/data/translations';
import { PageId } from '@/types';
import { useAppData } from '@/hooks/useAppData';

const pageRoutes: Partial<Record<PageId, string>> = {
  home: '/',
  activities: '/activities',
  adhesion: '/adhesion',
  team: '/team',
  conditions: '/conditions',
  confidentialite: '/confidentialite',
  'mentions-legales': '/mentions-legales',
  'admin-login': '/admin',
  'admin-dashboard': '/admin',
  'admin-adhesions': '/admin',
  'admin-activities': '/admin',
  'admin-team': '/admin',
};

export function useRouteLayout(currentPage: PageId) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('FR');
  const [selectedActivityId, setSelectedActivityIdState] = useState('act-1');
  const appData = useAppData();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const storedActivityId = sessionStorage.getItem('crm-selected-activity-id');
    if (storedActivityId) {
      setSelectedActivityIdState(storedActivityId);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = useCallback((page: PageId) => {
    if (!page.startsWith('admin-') && window.location.hash.startsWith('#admin')) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    router.push(pageRoutes[page] ?? '/');
  }, [router]);

  const setSelectedActivityId = useCallback((activityId: string) => {
    sessionStorage.setItem('crm-selected-activity-id', activityId);
    setSelectedActivityIdState(activityId);
  }, []);

  const handleSelectActivityAndOpen = useCallback((activityId: string) => {
    setSelectedActivityId(activityId);
    router.push('/activities');
  }, [router, setSelectedActivityId]);

  return {
    ...appData,
    lang,
    setLang,
    selectedActivityId,
    setSelectedActivityId,
    handleSelectActivityAndOpen,
    handlePageChange,
    scaleX,
  };
}
