"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  trailColor?: string;
}

export default function ProgressRing({
  percentage,
  size = 140,
  strokeWidth = 10,
  primaryColor = 'stroke-red-600',
  trailColor = 'stroke-stone-100',
}: ProgressRingProps) {
  const [offset, setOffset] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const boundedPct = Math.min(100, Math.max(0, percentage));
    const progressOffset = circumference - (boundedPct / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className={`${trailColor}`}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={`${primaryColor}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold font-mono tracking-tight text-stone-900">
          {Math.round(percentage)}%
        </span>
        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-semibold mt-0.5">
          FINANCÉ
        </span>
      </div>
    </div>
  );
}
