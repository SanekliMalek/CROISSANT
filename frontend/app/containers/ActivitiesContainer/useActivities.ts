'use client';

import { Activity } from '@/types';

export function useActivities(activities: Activity[], selectedActivityId: string) {
  const activeActivity = activities.find((item) => item.id === selectedActivityId) || activities[0];
  const currentGallery = activeActivity ? activeActivity.gallery || [activeActivity.image] : [];

  return { activeActivity, currentGallery };
}
