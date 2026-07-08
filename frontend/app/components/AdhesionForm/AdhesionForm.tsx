'use client';

import { FormEvent } from 'react';
import { User, HeartHandshake, Calendar, AlertTriangle, Send } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { FormData } from '@/containers/AdhesionContainer/useAdhesion';

interface AdhesionFormProps {
  activeItem: string | undefined;
  setActiveItem: (item: string | undefined) => void;
  itemRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isSection1Complete: boolean;
  isSection2Complete: boolean;
  isSection3Complete: boolean;
  cities: string[];
  interestOptions: string[];
  slotOptions: string[];
  handleInterestToggle: (interest: string) => void;
  handleSlotToggle: (slot: string) => void;
  handleSubmit: (e: FormEvent) => void;
  error: string | null;
  loading: boolean;
}

export default function AdhesionForm({
  activeItem,
  setActiveItem,
  itemRefs,
  formData,
  setFormData,
  isSection1Complete,
  isSection2Complete,
  isSection3Complete,
  cities,
  interestOptions,
  slotOptions,
  handleInterestToggle,
  handleSlotToggle,
  handleSubmit,
  error,
  loading,
}: AdhesionFormProps) {
  return (
    <form onSubmit={handleSubmit} className="saas-card p-6 md:p-8 rounded-[2rem] border flex flex-col gap-8">
      <Accordion
        type="single"
        collapsible
        value={activeItem}
        onValueChange={setActiveItem}
        className="w-full flex flex-col gap-4"
      >
        <AccordionItem
          value="1"
          ref={(el) => { itemRefs.current['1'] = el; }}
          className="border border-stone-200/50 rounded-2xl overflow-hidden bg-white/40"
        >
          <AccordionTrigger className="hover:no-underline py-4 px-5 hover:bg-stone-100/30 transition-all">
            <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider text-stone-900">
              <User className="size-4 stroke-2 text-red-600" />
              <span>1. Identité Personnelle</span>
              {isSection1Complete ? (
                <span className="ml-3 text-[9px] text-green-600 font-black font-mono uppercase tracking-widest bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">✓ Complété</span>
              ) : (
                <span className="ml-3 text-[9px] text-stone-400 font-bold font-mono uppercase tracking-widest bg-stone-100/80 border border-stone-200/60 px-2 py-0.5 rounded-full">Requis</span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-5 px-5 pb-6 border-t border-stone-100 bg-white/10 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Nom *</label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Ex: Mansouri"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Prénom *</label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Ex: Mohamed"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Adresse Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: m.mansouri@gmail.com"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Téléphone (Tunisie) *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ex: +216 98 123 456"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Date de Naissance *</label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Ville de Résidence *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs text-stone-900 shadow-xs focus-visible:border-red-650 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-650/40 font-medium transition-all"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold font-mono text-stone-500 uppercase">Profession / Études *</label>
                <Input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  placeholder="Ex: Étudiant en biologie"
                  required
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="2"
          ref={(el) => { itemRefs.current['2'] = el; }}
          className="border border-stone-200/50 rounded-2xl overflow-hidden bg-white/40"
        >
          <AccordionTrigger className="hover:no-underline py-4 px-5 hover:bg-stone-100/30 transition-all">
            <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider text-stone-900">
              <HeartHandshake className="size-4 stroke-2 text-red-600" />
              <span>2. Domaines d'Intérêt</span>
              {isSection2Complete ? (
                <span className="ml-3 text-[9px] text-green-600 font-black font-mono uppercase tracking-widest bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">✓ {formData.interests.length} Sélectionné(s)</span>
              ) : (
                <span className="ml-3 text-[9px] text-stone-400 font-bold font-mono uppercase tracking-widest bg-stone-100/80 border border-stone-200/60 px-2 py-0.5 rounded-full">Requis</span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-5 px-5 pb-6 border-t border-stone-100 bg-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interestOptions.map((option) => {
                const isChecked = formData.interests.includes(option);
                return (
                  <button
                    type="button"
                    key={option}
                    onClick={() => handleInterestToggle(option)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-red-50/50 border-red-200 text-red-850 font-bold shadow-xs'
                        : 'bg-white/60 border border-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center text-white text-[10px] shrink-0 ${
                      isChecked ? 'bg-red-650 border-red-650' : 'bg-white border-stone-350'
                    }`}>
                      {isChecked && '✓'}
                    </div>
                    <span className="text-xs">{option}</span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="3"
          ref={(el) => { itemRefs.current['3'] = el; }}
          className="border border-stone-200/50 rounded-2xl overflow-hidden bg-white/40"
        >
          <AccordionTrigger className="hover:no-underline py-4 px-5 hover:bg-stone-100/30 transition-all">
            <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider text-stone-900">
              <Calendar className="size-4 stroke-2 text-red-600" />
              <span>3. Créneaux pour l'Entretien</span>
              {isSection3Complete ? (
                <span className="ml-3 text-[9px] text-green-600 font-black font-mono uppercase tracking-widest bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">✓ {formData.preferredSlots.length} Sélectionné(s)</span>
              ) : (
                <span className="ml-3 text-[9px] text-stone-400 font-bold font-mono uppercase tracking-widest bg-stone-100/80 border border-stone-200/60 px-2 py-0.5 rounded-full">Requis</span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-5 px-5 pb-6 border-t border-stone-100 bg-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {slotOptions.map((slot) => {
                const isChecked = formData.preferredSlots.includes(slot);
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => handleSlotToggle(slot)}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-red-50/50 border-red-200 text-red-855 font-bold shadow-xs'
                        : 'bg-white/60 border border-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center text-white text-[10px] shrink-0 ${
                      isChecked ? 'bg-red-650 border-red-650' : 'bg-white border-stone-350'
                    }`}>
                      {isChecked && '✓'}
                    </div>
                    <span className="text-xs">{slot.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {error && (
        <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl text-red-750 text-xs flex items-center gap-2 font-medium">
          <AlertTriangle size={16} className="shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4.5 bg-gradient-to-r from-red-650 to-red-550 hover:from-red-700 hover:to-red-600 text-white font-black font-mono uppercase tracking-widest text-xs rounded-full shadow-lg shadow-red-650/15 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <span>Transmission de votre dossier en cours...</span>
        ) : (
          <>
            <Send size={14} />
            Soumettre mon dossier d'Adhésion au Comité de Gafsa
          </>
        )}
      </button>
    </form>
  );
}
