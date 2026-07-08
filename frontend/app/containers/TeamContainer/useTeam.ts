'use client';

import { useState } from 'react';
import { TeamMember } from '@/types';

export function useTeam(team: TeamMember[]) {
  const [filter, setFilter] = useState<'all' | 'board' | 'coordination' | 'medical' | 'field'>('all');

  const filteredTeam = filter === 'all' 
    ? team 
    : team.filter((m) => m.category === filter);

  return { filter, setFilter, filteredTeam };
}
