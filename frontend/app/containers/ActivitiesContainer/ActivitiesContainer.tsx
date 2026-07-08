'use client';

import { motion } from 'motion/react';
import { Activity, PageId } from '@/types';
import ShaderBackground from '@/components/ui/shader-background';
import { useActivities } from './useActivities';

import CampaignTabs from '@/components/CampaignTabs';
import ActivityHero from '@/components/ActivityHero';
import MissionReport from '@/components/MissionReport';
import PhotoGallery from '@/components/PhotoGallery';
import FundingSidebar from '@/components/FundingSidebar';

interface ActivitiesContainerProps {
  activities: Activity[];
  selectedActivityId: string;
  onSelectActivity: (id: string) => void;
  onPageChange: (page: PageId) => void;
}

export default function ActivitiesContainer({
  activities,
  selectedActivityId,
  onSelectActivity,
  onPageChange,
}: ActivitiesContainerProps) {
  const { activeActivity, currentGallery } = useActivities(activities, selectedActivityId);

  if (!activeActivity) {
    return (
      <div className="w-full pt-32 text-center text-stone-500 font-mono">
        Chargement des activités...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col pt-24 min-h-screen relative overflow-hidden bg-transparent"
    >
      <ShaderBackground theme="red-crescent" />

      <CampaignTabs 
        activities={activities} 
        activeActivityId={activeActivity.id} 
        onSelectActivity={onSelectActivity} 
      />

      <ActivityHero activity={activeActivity} />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col gap-8"
        >
          <MissionReport details={activeActivity.details} />
          <PhotoGallery gallery={currentGallery} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <FundingSidebar activity={activeActivity} onPageChange={onPageChange} />
        </motion.div>
      </section>
    </motion.div>
  );
}
