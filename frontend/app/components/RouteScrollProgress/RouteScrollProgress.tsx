'use client';

import { motion, MotionValue } from 'motion/react';

interface RouteScrollProgressProps {
  scaleX: MotionValue<number>;
}

export default function RouteScrollProgress({ scaleX }: RouteScrollProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-650 via-red-500 to-amber-500 origin-left z-[9999] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
