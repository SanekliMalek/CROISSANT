'use client';

import { useState } from 'react';
import { NewsItem } from '@/types';

export function useHome() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);

  const handleToggleMission = () => setIsMissionExpanded(!isMissionExpanded);

  const handleScrollToActivities = () => {
    const el = document.getElementById('activities-feed');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    selectedNews,
    setSelectedNews,
    isMissionExpanded,
    handleToggleMission,
    handleScrollToActivities
  };
}
