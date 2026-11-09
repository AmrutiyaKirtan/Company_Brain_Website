'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isRunning = useRef(false);
  const raf = useRef<number>(0);
  const [initialized, setInitialized] = useState(false);
  const [label, setLabel] = useState('');
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useRef(false);
  const currentTargetRef = useRef<HTMLElement | null>(null);

  const animateRef = useRef<() => void>(() => {});

  const animate = useCallback(() => {
    if (!dotRef.current || !ringRef.current) return;

    // Dot snaps exactly
    dotRef.current.style.left = `${mouse.current.x}px`;
    dotRef.current.style.top = `${mouse.current.y}px`;

    // Ring lags smoothly with spring lerp
    const ease = prefersReducedMotion.current ? 1 : 0.18;
    const dx = mouse.current.x - ringPos.current.x;
    const dy = mouse.current.y - ringPos.current.y;
    ringPos.current.x += dx * ease;
    ringPos.current.y += dy * ease;

    ringRef.current.style.left = `${ringPos.current.x}px`;
    ringRef.current.style.top = `${ringPos.current.y}px`;

    // If movement is negligible, pause RAF to save CPU cycles
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      isRunning.current = false;
      return;
    }

    raf.current = requestAnimationFrame(animateRef.current);
  }, []);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  const requestTick = useCallback(() => {
    if (!isRunning.current) {
      isRunning.current = true;
      raf.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const handleMove = (e: PointerEvent) => {
      setInitialized(true);
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!document.body.classList.contains('cursor-initialized')) {
        document.body.classList.add('cursor-initialized');
      }
      requestTick();
    };

    const handleOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'a, button, [data-cursor-label], .connector-cell, .pricing-card'
      ) as HTMLElement | null;

      if (target === currentTargetRef.current) return;
      currentTargetRef.current = target;

      if (target) {
        const cursorLabel =
          target.dataset.cursorLabel ||
          (target.tagName === 'A' ? '→' : 'VIEW');
        setLabel(cursorLabel);
        setExpanded(true);
      } else {
        setLabel('');
        setExpanded(false);
      }
      requestTick();
    };

    const handleLeave = () => {
      document.body.classList.remove('cursor-initialized');
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    requestTick();

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerleave', handleLeave);
      document.body.classList.remove('cursor-initialized');
      cancelAnimationFrame(raf.current);
    };
  }, [animate, requestTick]);

  if (!initialized) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring ${expanded ? 'expanded' : ''}`}
        aria-hidden="true"
      >
        <span className="cursor-label">{label}</span>
      </div>
    </>
  );
}
