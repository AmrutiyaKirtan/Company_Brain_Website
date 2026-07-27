'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const [initialized, setInitialized] = useState(false);
  const [label, setLabel] = useState('');
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useRef(false);

  const animate = useCallback(() => {
    if (!dotRef.current || !ringRef.current) return;

    // Dot snaps exactly
    dotRef.current.style.left = `${mouse.current.x}px`;
    dotRef.current.style.top = `${mouse.current.y}px`;

    // Ring lags smoothly with spring lerp
    const ease = prefersReducedMotion.current ? 1 : 0.18;
    ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease;
    ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease;

    ringRef.current.style.left = `${ringPos.current.x}px`;
    ringRef.current.style.top = `${ringPos.current.y}px`;

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const handleMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!document.body.classList.contains('cursor-initialized')) {
        document.body.classList.add('cursor-initialized');
      }
    };

    const handleOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'a, button, [data-cursor-label], .connector-cell, .pricing-card'
      );
      if (target) {
        const cursorLabel =
          (target as HTMLElement).dataset.cursorLabel ||
          (target.tagName === 'A' ? '→' : 'VIEW');
        setLabel(cursorLabel);
        setExpanded(true);
      } else {
        setLabel('');
        setExpanded(false);
      }
    };

    const handleLeave = () => {
      document.body.classList.remove('cursor-initialized');
    };

    setInitialized(true);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('pointerleave', handleLeave);

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerleave', handleLeave);
      document.body.classList.remove('cursor-initialized');
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

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
