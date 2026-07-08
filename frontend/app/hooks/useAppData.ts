'use client';

import { useState, useEffect, useCallback } from 'react';
import { Activity, HomeHeroSettings, NewsItem, TeamMember } from '@/types';
import { activitiesApi, homeHeroApi, newsApi, teamApi } from '@/services/api';
import { DEFAULT_ACTIVITIES, DEFAULT_NEWS, DEFAULT_TEAM } from '@/data/defaultData';

export function useAppData() {
  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES);
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [homeHero, setHomeHero] = useState<HomeHeroSettings | null>(null);
  const [loading, setLoading] = useState(false);

  // Stable reference — must be wrapped in useCallback so it doesn't
  // get recreated on every render and trigger an infinite re-render loop.
  const fetchData = useCallback(async () => {
    try {
      const [actRes, newsRes, teamRes] = await Promise.all([
        activitiesApi.getAll(),
        newsApi.getAll(),
        teamApi.getAll(),
      ]);
      const heroRes = await homeHeroApi.get().catch(() => null);
      setActivities(actRes);
      setNews(newsRes);
      setTeam(teamRes);
      setHomeHero(heroRes);
    } catch (err) {
      console.warn('Using local default data because the API is unavailable.', err);
    }
  }, []); // no deps — API functions are module-level constants

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { activities, news, team, homeHero, loading, refetch: fetchData };
}
