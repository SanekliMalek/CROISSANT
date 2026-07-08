'use client';

import { TeamMember } from '@/types';
import { motion } from 'motion/react';
import ShaderBackground from '@/components/ui/shader-background';
import { useTeam } from './useTeam';

import TeamHeader from '@/components/TeamHeader';
import TeamFilter from '@/components/TeamFilter';
import TeamDirectory from '@/components/TeamDirectory';

interface TeamContainerProps {
  team: TeamMember[];
}

export default function TeamContainer({ team }: TeamContainerProps) {
  const { filter, setFilter, filteredTeam } = useTeam(team);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col pt-24 min-h-screen relative overflow-hidden bg-transparent"
    >
      <ShaderBackground theme="red-crescent" />

      <TeamHeader />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-10 w-full flex flex-col gap-8 relative z-10">
        <TeamFilter filter={filter} setFilter={setFilter} />
        <TeamDirectory filteredTeam={filteredTeam} />
      </section>
    </motion.div>
  );
}
