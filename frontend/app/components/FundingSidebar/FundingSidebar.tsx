'use client';

import { motion } from 'motion/react';
import { MapPin, Users, Target, HeartHandshake } from 'lucide-react';
import ProgressRing from '@/components/ProgressRing';
import { Activity, PageId } from '@/types';

interface FundingSidebarProps {
  activity: Activity;
  onPageChange: (page: PageId) => void;
}

export default function FundingSidebar({ activity, onPageChange }: FundingSidebarProps) {
  const progressPct = activity.targetAmount > 0
    ? (activity.raisedAmount / activity.targetAmount) * 100
    : 0;

  const isCompleted = activity.status === 'completed';

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)' }}
        className="saas-card p-6 rounded-[2rem] border flex flex-col items-center text-center gap-5 transition-all duration-300"
      >
        <h3 className="text-[10px] font-black font-mono tracking-[0.15em] text-red-650 uppercase">
          RELEVÉ Budgétaire
        </h3>

        <ProgressRing percentage={progressPct} />

        <div className="w-full flex flex-col gap-3.5 pt-3 border-t border-stone-100 text-left font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 font-bold">Target Budget</span>
            <span className="font-bold text-stone-900">{activity.targetAmount.toLocaleString()} TND</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 font-bold">Total Collecté</span>
            <span className="font-bold text-red-650">{activity.raisedAmount.toLocaleString()} TND</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 font-bold">Statut Financier</span>
            <span className={`px-2 py-0.5 text-[9px] font-black rounded-full ${isCompleted
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700 font-bold pulse-dot'
              }`}>
              {isCompleted ? 'Bouclé' : 'Soutien Requis'}
            </span>
          </div>
        </div>

        {!isCompleted && (
          <button
            onClick={() => onPageChange('adhesion')}
            className="w-full py-3.5 bg-gradient-to-r from-red-650 to-red-550 hover:from-red-700 hover:to-red-600 text-white font-bold font-mono text-xs uppercase tracking-wider rounded-full transition-all shadow-lg shadow-red-600/10 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 duration-300 btn-shine"
          >
            Soutenir en tant que Volontaire
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)' }}
        className="saas-card p-6 rounded-[2rem] border flex flex-col gap-4 transition-all duration-300"
      >
        <h3 className="text-[10px] font-black font-mono tracking-[0.15em] text-stone-800 uppercase border-b border-stone-200/60 pb-2">
          FICHE TECHNIQUE OPÉRATIONNELLE
        </h3>

        <ul className="flex flex-col gap-4 text-xs font-mono">
          <li className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl text-stone-600 shadow-xs border border-stone-150">
              <MapPin size={14} />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-black">Secteur Gafsa</span>
              <p className="font-bold text-stone-900 mt-0.5">{activity.location}</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl text-stone-600 shadow-xs border border-stone-150">
              <Users size={14} />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-black">Cible Bénéficiaires</span>
              <p className="font-bold text-stone-900 mt-0.5">{activity.beneficiaries.toLocaleString()} familles</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl text-stone-600 shadow-xs border border-stone-150">
              <Target size={14} />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-black">Dispositif Mobilisé</span>
              <p className="font-bold text-stone-900 mt-0.5">Véhicules, Secouristes, Kits</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl text-stone-600 shadow-xs border border-stone-150">
              <HeartHandshake size={14} />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-black">Direction du Projet</span>
              <p className="font-bold text-stone-900 mt-0.5">Comité Gafsa • Volontaires</p>
            </div>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
