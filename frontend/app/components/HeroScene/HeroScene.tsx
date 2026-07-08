"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  baseY: number;
  radius: number;
  color: string;
  speed: number;
  offset: number;
  pulseSpeed: number;
}

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let orbs: Orb[] = [];
    let stars: Star[] = [];
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const container = canvas.parentElement;
      width = container?.clientWidth || window.innerWidth;
      height = container?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.min(180, Math.floor((width * height) / 8000));
      for (let i = 0; i < count; i++) {
        const baseAlpha = Math.random() * 0.4 + 0.1;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.5 + 0.5,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    const orbColors = ['#fbbf24', '#f97316', '#fb7185', '#b91c1c'];
    orbs = [];
    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: 0,
        y: 0,
        baseY: 0,
        radius: Math.random() * 8 + 4,
        color: orbColors[i % orbColors.length],
        speed: 0.001 + Math.random() * 0.002,
        offset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.targetX = (x - width / 2) * 0.08;
      mouseRef.current.targetY = (y - height / 2) * 0.08;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const bgGrad = ctx.createRadialGradient(
        width / 2 + mouse.x * 2, height / 2 + mouse.y * 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, 'rgba(255, 250, 248, 0.95)');
      bgGrad.addColorStop(0.5, 'rgba(254, 243, 238, 0.9)');
      bgGrad.addColorStop(1, 'rgba(253, 232, 222, 0.85)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
        star.alpha = star.baseAlpha + Math.sin(time * 0.02 + star.x) * 0.1;
        ctx.fillStyle = `rgba(185, 28, 28, ${Math.max(0.05, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      const isMobile = width < 1024;
      const centerX = width / 2 + mouse.x * 1.5;
      const centerY = height / 2 + mouse.y * 1.5;

      orbs.forEach((orb, i) => {
        const angle = (i / 8) * Math.PI * 2 + time * 0.003;
        const radiusX = isMobile ? 120 : 180;
        const radiusY = isMobile ? 60 : 90;
        orb.x = centerX + Math.cos(angle) * radiusX;
        orb.y = centerY + Math.sin(angle) * radiusY + Math.sin(time * orb.speed + orb.offset) * 20;
        const currentRadius = orb.radius * (1 + Math.sin(time * orb.pulseSpeed) * 0.15);
        ctx.shadowBlur = 15;
        ctx.shadowColor = orb.color;
        ctx.fillStyle = orb.color + 'aa';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, isMobile ? 150 : 220, isMobile ? 50 : 70, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, isMobile ? 190 : 270, isMobile ? 70 : 95, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="hero-scene-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
