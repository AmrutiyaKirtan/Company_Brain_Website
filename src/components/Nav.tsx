'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Interactive Demo', href: '/#interactive-demo' },
  { label: '38 Connectors', href: '/connectors' },
  { label: 'Pipeline', href: '/#pipeline' },
  { label: 'Why Offline', href: '/#why-offline' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] px-4 sm:px-6 md:px-10 py-3.5 transition-all duration-300">
      <nav
        className={`max-w-6xl mx-auto rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'glass-chrome-dark shadow-2xl'
            : 'bg-black/40 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Wordmark + Status Pill */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-base sm:text-lg font-semibold tracking-tight text-white no-underline flex items-center gap-2 press-scale"
            data-cursor-label="HOME"
          >
            <span>Company Brain</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-white/10 text-white/90 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            v3.2.2 • Offline
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.09em] text-white/80 no-underline hover:text-white transition-colors duration-150 relative py-1"
              data-cursor-label="→"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#demo"
            className="btn btn-primary-dark text-[11px] py-1.5 px-4 rounded-full"
            data-cursor-label="DEMO"
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-full bg-white/10 border border-white/15 press-scale"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-cursor-label="MENU"
        >
          <span
            className={`block w-4 h-[1.5px] bg-white transition-transform duration-200 ${
              open ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-4 h-[1.5px] bg-white transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-4 h-[1.5px] bg-white transition-transform duration-200 ${
              open ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {open && (
        <div
          className="max-w-6xl mx-auto mt-2 rounded-2xl glass-chrome-dark p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-mono text-xs text-white/70">Navigation</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              38 Connectors Active
            </span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-[13px] uppercase tracking-[0.08em] text-white/90 no-underline py-1.5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#demo"
            onClick={() => setOpen(false)}
            className="btn btn-primary-dark text-[12px] py-2.5 px-5 mt-2 rounded-xl text-center w-full"
          >
            Book a demo
          </Link>
        </div>
      )}
    </header>
  );
}
