'use client';

import { Activity, HomeHeroSettings, NewsItem, PageId } from '@/types';
import { Lang } from '@/data/translations';
import { useHome } from './useHome';

import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import MissionPillars from '@/components/MissionPillars';
import ActivitiesFeed from '@/components/ActivitiesFeed';
import NewsFeed from '@/components/NewsFeed';
import CtaBoard from '@/components/CtaBoard';
import NewsModal from '@/components/NewsModal';

interface HomeContainerProps {
  activities: Activity[];
  news: NewsItem[];
  hero?: HomeHeroSettings | null;
  onPageChange: (page: PageId) => void;
  onSelectActivity: (activityId: string) => void;
  lang: Lang;
}

export default function HomeContainer({ activities, news, hero, onPageChange, onSelectActivity, lang }: HomeContainerProps) {
  const {
    selectedNews,
    setSelectedNews,
    isMissionExpanded,
    handleToggleMission,
    handleScrollToActivities
  } = useHome();

  const isRTL = lang === 'AR';

  const displayedActivities = activities.slice(0, 3);
  const displayedNews = news.slice(0, 3);

  return (
    <div className="w-full flex flex-col min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <HeroSection 
        lang={lang} 
        isRTL={isRTL} 
        isMissionExpanded={isMissionExpanded} 
        onToggleMission={handleToggleMission} 
        onPageChange={onPageChange} 
        onScrollToActivities={handleScrollToActivities} 
        hero={hero}
      />
      <StatsBar lang={lang} />
      <MissionPillars lang={lang} />
      <ActivitiesFeed 
        lang={lang} 
        isRTL={isRTL} 
        activities={displayedActivities} 
        onPageChange={onPageChange} 
        onSelectActivity={onSelectActivity} 
      />
      <NewsFeed 
        lang={lang} 
        isRTL={isRTL} 
        news={displayedNews} 
        onPageChange={onPageChange} 
        onSelectNews={setSelectedNews} 
      />
      <CtaBoard lang={lang} isRTL={isRTL} onPageChange={onPageChange} />
      <NewsModal lang={lang} isRTL={isRTL} selectedNews={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
}
