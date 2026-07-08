'use client';

import { motion } from 'motion/react';
import { MapPin, Calendar } from 'lucide-react';
import { Activity } from '@/types';

interface ActivityHeroProps {
  activity: Activity;
}

export default function ActivityHero({ activity }: ActivityHeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-6 w-full relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(220, 38, 38, 0.12)' }}
        className="relative h-[250px] md:h-[380px] rounded-[2rem] overflow-hidden shadow-2xl group border border-white transition-all duration-300"
      >
        <img
          src={activity.image}
          alt={activity.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex items-end p-6 md:p-10">
          <div className="flex flex-col gap-2.5 text-white max-w-3xl">
            <span className="px-3 py-1 bg-red-600 border border-red-500 text-white text-[10px] font-black tracking-widest rounded-full uppercase w-fit pulse-ring">
              {activity.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white leading-tight">
              {activity.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1 text-[11px] font-mono text-stone-300">
              <span className="flex items-center gap-1 uppercase font-bold">
                <MapPin size={12} className="text-red-500" />
                {activity.location}
              </span>
              <span className="flex items-center gap-1 uppercase font-bold">
                <Calendar size={12} className="text-red-500" />
                Déploiement : {activity.date}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
