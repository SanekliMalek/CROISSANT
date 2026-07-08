"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface AnoAIProps {
  theme: 'brand' | 'original';
  speed?: number;
  complexity?: number;
}

export default function AnoAI({ theme, speed = 1.0, complexity = 4.0 }: AnoAIProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      t += 0.015 * speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (theme === 'brand') {
        ctx.fillStyle = '#0f0505';
      } else {
        ctx.fillStyle = '#020d12';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const layers = 5;
      const numLines = Math.floor(complexity * 8);

      for (let layer = 0; layer < layers; layer++) {
        const frequency = 0.003 + (layer * 0.002);
        const amplitude = 35 + (layer * 12);
        const phaseShift = layer * Math.PI / 4;

        ctx.beginPath();
        
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (theme === 'brand') {
          if (layer % 3 === 0) {
            grad.addColorStop(0, 'rgba(185, 28, 28, 0.25)');
            grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
          } else if (layer % 3 === 1) {
            grad.addColorStop(0, 'rgba(245, 158, 11, 0.2)');
            grad.addColorStop(1, 'rgba(185, 28, 28, 0)');
          } else {
            grad.addColorStop(0, 'rgba(220, 38, 38, 0.15)');
            grad.addColorStop(1, 'rgba(245, 158, 11, 0.05)');
          }
        } else {
          if (layer % 3 === 0) {
            grad.addColorStop(0, 'rgba(14, 165, 233, 0.28)');
            grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          } else if (layer % 3 === 1) {
            grad.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
            grad.addColorStop(1, 'rgba(14, 165, 233, 0)');
          } else {
            grad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
            grad.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
          }
        }

        ctx.fillStyle = grad;

        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 15) {
          const wave1 = Math.sin(x * frequency + t + phaseShift) * amplitude;
          const wave2 = Math.cos(x * 0.001 - t * 0.5 + phaseShift) * (amplitude * 0.4);
          const y = (canvas.height * 0.5) + wave1 + wave2 + (layer * 22) - 40;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      ctx.strokeStyle = theme === 'brand' ? 'rgba(185, 28, 28, 0.04)' : 'rgba(14, 165, 233, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, speed, complexity]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
        <span className="px-3 py-1 bg-black/40 text-[9px] font-mono uppercase tracking-widest text-stone-300 rounded-full border border-white/5 backdrop-blur-md">
          Fluide Mathématique de l'Onde • {theme === 'brand' ? 'CRIMSON BRAND' : 'CYAN ORIGINAL'}
        </span>
      </div>
    </div>
  );
}
