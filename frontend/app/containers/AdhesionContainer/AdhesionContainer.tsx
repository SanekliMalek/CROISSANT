'use client';

import { PageId } from '@/types';
import { motion } from 'motion/react';
import ShaderBackground from '@/components/ui/shader-background';
import ProcessPath from '@/components/ProcessPath';

import { useAdhesion } from './useAdhesion';
import AdhesionHeader from '@/components/AdhesionHeader';
import AdhesionSuccess from '@/components/AdhesionSuccess';
import AdhesionForm from '@/components/AdhesionForm';

interface AdhesionContainerProps {
  onPageChange: (page: PageId) => void;
}

export default function AdhesionContainer({ onPageChange }: AdhesionContainerProps) {
  const {
    activeItem,
    setActiveItem,
    itemRefs,
    formData,
    setFormData,
    loading,
    success,
    error,
    interestOptions,
    slotOptions,
    cities,
    isSection1Complete,
    isSection2Complete,
    isSection3Complete,
    handleInterestToggle,
    handleSlotToggle,
    handleSubmit,
    handleReset
  } = useAdhesion();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col pt-24 min-h-screen relative overflow-hidden bg-transparent"
    >
      <ShaderBackground theme="red-crescent" />

      <AdhesionHeader />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        <div className="lg:col-span-8">
          {success ? (
            <AdhesionSuccess 
              firstName={formData.firstName} 
              onPageChange={onPageChange} 
              onReset={handleReset} 
            />
          ) : (
            <AdhesionForm 
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              itemRefs={itemRefs}
              formData={formData}
              setFormData={setFormData}
              isSection1Complete={isSection1Complete}
              isSection2Complete={isSection2Complete}
              isSection3Complete={isSection3Complete}
              cities={cities}
              interestOptions={interestOptions}
              slotOptions={slotOptions}
              handleInterestToggle={handleInterestToggle}
              handleSlotToggle={handleSlotToggle}
              handleSubmit={handleSubmit}
              error={error}
              loading={loading}
            />
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-12 mt-4"
        >
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-black font-mono uppercase tracking-[0.15em] text-stone-500">
              LE PROCESSUS DE RECRUTEMENT AU CROISSANT-ROUGE DE GAFSA
            </h3>
            <ProcessPath />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
