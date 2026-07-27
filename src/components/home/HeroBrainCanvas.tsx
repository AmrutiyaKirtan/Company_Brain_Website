'use client';

import React, { useEffect, useRef } from 'react';

interface HeroBrainCanvasProps {
  className?: string;
}

const LABELS = [
  'Slack',
  'GitHub',
  'Notion',
  'Docs',
  'Sheets',
  'Drive',
  'Discord',
  'Linear',
  'Outlook',
  'Teams',
];

interface Particle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  progress: number;
  isLabel: boolean;
  labelStr: string;
  wobblePhaseX: number;
  wobblePhaseY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  pushX: number;
  pushY: number;
}

interface Emitter {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bornAt: number;
  lifeTime: number;
}

const BRAIN_SVG_PATH_D =
  'M12 18V5 M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4 M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5 M17.997 5.125a4 4 0 0 1 2.526 5.77 M18 18a4 4 0 0 0 2-7.464 M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517 M6 18a4 4 0 0 1-2-7.464 M6.003 5.125a4 4 0 0 0-2.526 5.77';

export default function HeroBrainCanvas({ className = '' }: HeroBrainCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles: Particle[] = [];
    let emitters: Emitter[] = [];
    let lastEmitterTime = 0;
    let emitterIdSeq = 0;

    let pointer = { x: -9999, y: -9999, active: false };

    let animationFrameId = 0;
    let startTime = performance.now();
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const brainPath = new Path2D(BRAIN_SVG_PATH_D);

    const buildParticles = () => {
      if (width === 0 || height === 0) return;

      const scaleFactor = Math.min(width, 900) / 900;
      const baseSize = 320 * scaleFactor;
      
      const offscreen = document.createElement('canvas');
      const offSize = Math.floor(baseSize);
      offscreen.width = offSize;
      offscreen.height = offSize;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // Draw brain icon scaled to viewBox 24x24 onto offscreen canvas
      offCtx.save();
      offCtx.scale(offSize / 24, offSize / 24);
      offCtx.fillStyle = '#ffffff';
      offCtx.strokeStyle = '#ffffff';
      offCtx.lineWidth = 1.8;
      offCtx.lineCap = 'round';
      offCtx.lineJoin = 'round';
      offCtx.fill(brainPath);
      offCtx.stroke(brainPath);
      offCtx.restore();

      const imgData = offCtx.getImageData(0, 0, offSize, offSize);
      const data = imgData.data;

      const newParticles: Particle[] = [];
      const stride = Math.max(9, Math.floor(offSize / 40));
      
      const offsetX = width / 2 - offSize / 2;
      const offsetY = height * 0.46 - offSize / 2;
      const maxDim = Math.max(width, height);

      let pId = 0;
      for (let y = 0; y < offSize; y += stride) {
        for (let x = 0; x < offSize; x += stride) {
          const i = (y * offSize + x) * 4;
          if (data[i + 3] > 200) {
            const jitterX = (Math.random() - 0.5) * 3;
            const jitterY = (Math.random() - 0.5) * 3;
            const targetX = offsetX + x + jitterX;
            const targetY = offsetY + y + jitterY;
            
            const angle = Math.random() * Math.PI * 2;
            const dist = maxDim * (0.55 + Math.random() * 0.55);
            const startX = width / 2 + Math.cos(angle) * dist;
            const startY = height / 2 + Math.sin(angle) * dist;

            const isLabel = Math.random() < (1 / 11);
            const labelStr = isLabel ? LABELS[Math.floor(Math.random() * LABELS.length)] : '';

            newParticles.push({
              id: pId++,
              startX,
              startY,
              targetX,
              targetY,
              x: startX,
              y: startY,
              delay: Math.random() * 550,
              duration: 1400 + Math.random() * 900,
              progress: isReducedMotion ? 1 : 0,
              isLabel,
              labelStr,
              wobblePhaseX: Math.random() * Math.PI * 2,
              wobblePhaseY: Math.random() * Math.PI * 2,
              wobbleSpeed: 0.001 + Math.random() * 0.001,
              wobbleAmp: 1 + Math.random() * 2,
              pushX: 0,
              pushY: 0
            });
          }
        }
      }
      particles = newParticles;
      startTime = performance.now();
    };

    let resizeTimeout = 0;
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries.length) return;
      const rect = entries[0].contentRect;
      
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      resizeTimeout = requestAnimationFrame(() => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        
        isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        buildParticles();
      });
    });
    resizeObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Faint grid
      ctx.beginPath();
      for (let x = 0; x < width; x += 64) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 64) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.strokeStyle = 'rgba(241, 233, 216, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Static brain outline anchor layer (drawn first, underneath particles)
      const scaleFactor = Math.min(width, 900) / 900;
      const baseSize = 320 * scaleFactor;
      const offSize = Math.floor(baseSize);
      const offsetX = width / 2 - offSize / 2;
      const offsetY = height * 0.46 - offSize / 2;

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(offSize / 24, offSize / 24);
      ctx.strokeStyle = 'rgba(241, 233, 216, 0.06)';
      ctx.lineWidth = 1.5 / (offSize / 24);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke(brainPath);
      ctx.restore();

      const elapsed = time - startTime;

      let settledCount = 0;

      // Update and draw particles
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = "9px 'IBM Plex Mono', monospace";
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReducedMotion) {
          const pTime = Math.max(0, elapsed - p.delay);
          p.progress = Math.min(1, pTime / p.duration);
        } else {
          p.progress = 1;
        }
        
        const eased = easeOutExpo(p.progress);
        
        let baseX = p.startX + (p.targetX - p.startX) * eased;
        let baseY = p.startY + (p.targetY - p.startY) * eased;

        if (p.progress >= 1) {
          settledCount++;
          baseX += Math.sin(time * p.wobbleSpeed + p.wobblePhaseX) * p.wobbleAmp;
          baseY += Math.cos(time * p.wobbleSpeed + p.wobblePhaseY) * p.wobbleAmp;

          let desiredPushX = 0;
          let desiredPushY = 0;
          
          if (pointer.active) {
            const dx = baseX - pointer.x;
            const dy = baseY - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (1 - dist / 120) * 70;
              desiredPushX = (dx / dist) * force;
              desiredPushY = (dy / dist) * force;
            }
          }
          
          p.pushX += (desiredPushX - p.pushX) * 0.16;
          p.pushY += (desiredPushY - p.pushY) * 0.16;
        }

        p.x = baseX + p.pushX;
        p.y = baseY + p.pushY;

        ctx.globalAlpha = p.progress;

        if (p.isLabel) {
          ctx.fillStyle = 'rgba(241, 233, 216, 0.7)';
          ctx.fillText(p.labelStr, p.x, p.y);
          ctx.strokeStyle = 'rgba(241, 233, 216, 0.25)';
          ctx.lineWidth = 1;
          const tw = ctx.measureText(p.labelStr).width;
          ctx.strokeRect(p.x - tw / 2 - 3, p.y - 6, tw + 6, 12);
        } else {
          ctx.fillStyle = 'rgba(241, 233, 216, 0.75)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw subtle connective lines (1 in 6 particles, low opacity < 0.05)
      if (settledCount > particles.length * 0.8) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(241, 233, 216, 0.035)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < particles.length; i += 6) {
          const p1 = particles[i];
          if (p1.progress < 1) continue;
          
          const p2Idx = i + 7;
          if (p2Idx < particles.length) {
            const p2 = particles[p2Idx];
            if (p2.progress === 1) {
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              if (dx * dx + dy * dy < 2000) {
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
              }
            }
          }
        }
        ctx.stroke();
      }

      // Emitters
      if (settledCount === particles.length && particles.length > 0) {
        if (time - lastEmitterTime > 900 && emitters.length < 6) {
          const rp = particles[Math.floor(Math.random() * particles.length)];
          emitters.push({
            id: emitterIdSeq++,
            x: rp.x,
            y: rp.y,
            vx: 0.2 + Math.random() * 0.3,
            vy: -0.2 - Math.random() * 0.3,
            bornAt: time,
            lifeTime: 3200
          });
          lastEmitterTime = time;
        }
      }

      ctx.font = "11px 'IBM Plex Mono', monospace";
      for (let i = emitters.length - 1; i >= 0; i--) {
        const e = emitters[i];
        const age = time - e.bornAt;
        if (age > e.lifeTime) {
          emitters.splice(i, 1);
          continue;
        }

        e.x += e.vx;
        e.y += e.vy;

        let alpha = 1;
        if (age < 300) {
          alpha = age / 300;
        } else if (e.lifeTime - age < 1000) {
          alpha = (e.lifeTime - age) / 1000;
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = 'rgba(241, 233, 216, 0.8)';
        ctx.fillText('{ }', e.x, e.y);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: '520px',
        maxHeight: '900px',
        width: '100%',
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          background: '#100c09',
        }}
      />
    </div>
  );
}
