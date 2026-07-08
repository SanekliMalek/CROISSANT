"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

export default function ImpactGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0.4, y: 0.6 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let autoSpinAngleY = 0.002;
    let autoSpinAngleX = 0.0005;

    const latGafsa = 34.42 * (Math.PI / 180);
    const lonGafsa = 8.78 * (Math.PI / 180);

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 320;
      canvas.height = canvas.parentElement?.clientHeight || 320;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01,
      }));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let pulseRadius = 5;
    let pulseGrow = true;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const size = Math.min(width, height) * 0.85;
      const radius = size / 2;
      const cx = width / 2;
      const cy = height / 2;

      let currentRotX = rotation.x;
      let currentRotY = rotation.y;
      if (!isDragging.current) {
        currentRotY += autoSpinAngleY;
        currentRotX += autoSpinAngleX;
        setRotation({ x: currentRotX, y: currentRotY });
      }

      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.1);
      glowGrad.addColorStop(0, 'rgba(185, 28, 28, 0.05)');
      glowGrad.addColorStop(0.8, 'rgba(185, 28, 28, 0.02)');
      glowGrad.addColorStop(1, 'rgba(185, 28, 28, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      const project = (lat: number, lon: number) => {
        const x3d = Math.cos(lat) * Math.sin(lon);
        const y3d = Math.sin(lat);
        const z3d = Math.cos(lat) * Math.cos(lon);

        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const yRot1 = y3d * cosX - z3d * sinX;
        const zRot1 = y3d * sinX + z3d * cosX;

        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const xRot2 = x3d * cosY + zRot1 * sinY;
        const zRot2 = -x3d * sinY + zRot1 * cosY;

        return {
          x: cx + xRot2 * radius,
          y: cy - yRot1 * radius,
          z: zRot2,
        };
      };

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(28, 25, 23, 0.08)';

      const steps = 12;
      for (let i = -steps / 2; i <= steps / 2; i++) {
        const lat = (i * Math.PI) / (steps + 1);
        ctx.beginPath();
        for (let j = 0; j <= 36; j++) {
          const lon = (j * 10 * Math.PI) / 180;
          const pt = project(lat, lon);
          if (pt.z >= -0.1) {
            if (j === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();

        const lon = (i * Math.PI) / (steps / 2);
        ctx.beginPath();
        for (let j = -18; j <= 18; j++) {
          const latVal = (j * 5 * Math.PI) / 180;
          const pt = project(latVal, lon);
          if (pt.z >= -0.1) {
            if (j === -18) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(185, 28, 28, 0.25)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      const cities = [
        { name: 'Tunis', lat: 36.8 * (Math.PI / 180), lon: 10.18 * (Math.PI / 180) },
        { name: 'Gafsa', lat: latGafsa, lon: lonGafsa, isPrimary: true },
        { name: 'Geneva', lat: 46.2 * (Math.PI / 180), lon: 6.14 * (Math.PI / 180) },
        { name: 'Cairo', lat: 30.04 * (Math.PI / 180), lon: 31.23 * (Math.PI / 180) },
        { name: 'Nairobi', lat: -1.29 * (Math.PI / 180), lon: 36.82 * (Math.PI / 180) },
        { name: 'Tokyo', lat: 35.67 * (Math.PI / 180), lon: 139.65 * (Math.PI / 180) },
        { name: 'Rio de Janeiro', lat: -22.9 * (Math.PI / 180), lon: -43.17 * (Math.PI / 180) }
      ];

      if (pulseGrow) {
        pulseRadius += 0.25;
        if (pulseRadius > 14) pulseGrow = false;
      } else {
        pulseRadius -= 0.25;
        if (pulseRadius < 5) pulseGrow = true;
      }

      cities.forEach((c) => {
        const pt = project(c.lat, c.lon);
        if (pt.z > 0) {
          if (c.isPrimary) {
            ctx.fillStyle = 'rgba(185, 28, 28, 0.12)';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseRadius * 1.8, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(185, 28, 28, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pulseRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#b91c1c';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1c1917';
            ctx.font = 'bold 9px var(--font-mono)';
            ctx.fillText('GAFSA (COMITÉ)', pt.x + 8, pt.y + 3);
          } else {
            ctx.fillStyle = 'rgba(185, 28, 28, 0.4)';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotation]);

  return (
    <div className="w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
      <div className="absolute bottom-1 text-[10px] font-mono tracking-wider text-stone-400 select-none">
        ← GLISSER POUR TOURNER LE GLOBE 3D →
      </div>
    </div>
  );
}
