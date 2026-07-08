"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserCheck, CalendarDays, BookOpen, ShieldAlert, ChevronRight } from 'lucide-react';

interface RoadmapStep {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: any;
  duration: string;
  color: string;
}

export default function ProcessPath() {
  const [activeStep, setActiveStep] = useState(1);

  const steps: RoadmapStep[] = [
    {
      id: 1,
      title: "1. Formulaire d'Adhésion",
      shortDesc: "Soumission des motivations en ligne",
      longDesc: "Remplissez notre formulaire en spécifiant vos domaines d'intérêt (secourisme, aide sociale, communication, soutien psychologique) et vos créneaux préférés.",
      icon: UserCheck,
      duration: "En ligne • 5 min",
      color: "from-red-500 to-red-700"
    },
    {
      id: 2,
      title: "2. Entretien de Bienvenue",
      shortDesc: "Premier contact avec le Comité Régional",
      longDesc: "Rencontrez notre équipe de coordination à Gafsa pour échanger sur vos motivations, définir vos objectifs et fixer vos créneaux d'engagement volontaire.",
      icon: CalendarDays,
      duration: "Sous 5 à 7 jours",
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 3,
      title: "3. Formation Initiale",
      shortDesc: "Principes & Gestes qui Sauvent",
      longDesc: "Bénéficiez d'un cursus de formation aux Principes Fondamentaux du Croissant-Rouge et d'une initiation certifiée aux Premiers Secours d'Urgence de niveau 1.",
      icon: BookOpen,
      duration: "1 Week-end",
      color: "from-orange-500 to-orange-700"
    },
    {
      id: 4,
      title: "4. Action sur le Terrain",
      shortDesc: "Intégration d'une Équipe Active",
      longDesc: "Rejoignez une équipe d'intervention sous le parrainage d'un secouriste expérimenté à Gafsa, Metlaoui ou Redeyef pour vos premières campagnes d'aide.",
      icon: ShieldAlert,
      duration: "Immédial • Terrain",
      color: "from-red-600 to-red-800"
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-stone-200 z-0">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-700 ease-out"
            style={{ width: `${((activeStep - 1) / 3) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const StepIcon = step.icon;
          const isSelected = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`z-10 flex flex-col items-center p-4 rounded-xl transition-all duration-300 relative text-center focus:outline-none ${
                isSelected
                  ? 'bg-white shadow-lg border border-red-100 scale-102 glow-red'
                  : 'bg-stone-50/70 border border-stone-200/50 hover:bg-white/90'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isSelected
                    ? 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-md scale-110'
                    : isCompleted
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-stone-100 text-stone-400'
                }`}
              >
                <StepIcon size={24} />
              </div>

              <span className={`text-xs font-bold font-mono uppercase tracking-wider mt-3 ${
                isSelected ? 'text-red-600' : 'text-stone-400'
              }`}>
                Étape {step.id}
              </span>
              <h4 className={`text-sm font-bold font-display mt-1 ${
                isSelected ? 'text-stone-900' : 'text-stone-600'
              }`}>
                {step.title.split('. ')[1]}
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                {step.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      <div className="glass p-6 rounded-2xl relative overflow-hidden border-stone-200/60 shadow-sm mt-2">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full filter blur-xl -mr-10 -mt-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 text-xs font-bold font-mono rounded-full uppercase tracking-widest">
                {steps[activeStep - 1].duration}
              </span>
            </div>

            <h3 className="text-xl font-bold font-display text-stone-900 flex items-center gap-2">
              {steps[activeStep - 1].title}
              <ChevronRight size={18} className="text-stone-400" />
              <span className="text-base font-normal text-stone-500">
                {steps[activeStep - 1].shortDesc}
              </span>
            </h3>

            <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
              {steps[activeStep - 1].longDesc}
            </p>

            <div className="flex gap-2 mt-2 items-center text-xs text-red-600 font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-red-600 pulse-ring" />
              Mobilisation active pour ce secteur d'activité à Gafsa
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
