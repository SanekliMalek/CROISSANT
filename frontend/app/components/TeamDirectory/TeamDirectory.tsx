'use client';

import { motion } from 'motion/react';
import { Mail, Phone, Users, ShieldAlert, Award, Stethoscope, Briefcase } from 'lucide-react';
import { TeamMember } from '@/types';

interface TeamDirectoryProps {
  filteredTeam: TeamMember[];
}

export default function TeamDirectory({ filteredTeam }: TeamDirectoryProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'board': return <Award size={14} className="text-red-500" />;
      case 'coordination': return <Briefcase size={14} className="text-amber-500" />;
      case 'medical': return <Stethoscope size={14} className="text-sky-500" />;
      case 'field': return <ShieldAlert size={14} className="text-red-600" />;
      default: return <Users size={14} className="text-stone-500" />;
    }
  };

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08 }
        }
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {filteredTeam.map((member) => (
        <motion.div
          layout
          key={member.id}
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
          }}
          whileHover={{ y: -6, scale: 1.015 }}
          className="saas-card p-6 rounded-[2rem] border bg-white/60 hover:bg-white/90 border-stone-200/50 hover:border-red-500/20 transition-all duration-300 flex flex-col gap-4 group relative overflow-hidden shadow-xs hover:shadow-lg hover:shadow-red-500/5"
        >
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/85 px-2.5 py-1 rounded-full border border-white/50 z-10">
            {getCategoryIcon(member.category)}
            <span className="text-[9px] font-black font-mono uppercase text-stone-500">
              {member.category}
            </span>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-150 ring-4 ring-white shrink-0 shadow-inner">
              <img
                src={member.avatar}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-bold font-display text-stone-900 group-hover:text-red-650 transition-colors">
                {member.name}
              </h3>
              <p className="text-stone-500 text-[11px] font-mono uppercase tracking-wide font-bold">
                {member.role}
              </p>
            </div>
          </div>

          {(member.email || member.phone) && (
            <div className="mt-auto pt-3.5 border-t border-stone-200/40 flex flex-col gap-2 font-mono text-[10px] text-stone-400 relative z-10">
              {member.email && (
                <div className="flex items-center gap-1.5 truncate">
                  <Mail size={12} className="text-stone-400 group-hover:text-red-500 transition-colors" />
                  <a href={`mailto:${member.email}`} className="hover:text-red-500 transition-colors truncate font-bold text-stone-600">
                    {member.email}
                  </a>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-stone-400 group-hover:text-red-500 transition-colors" />
                  <a href={`tel:${member.phone}`} className="hover:text-red-500 transition-colors font-bold text-stone-600">
                    {member.phone}
                  </a>
                </div>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
