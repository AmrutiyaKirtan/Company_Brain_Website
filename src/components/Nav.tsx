'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Connectors', href: '/connectors' },
  { label: 'Why offline', href: '/#why-offline' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-10 py-4 flex items-center justify-between"
      style={{ mixBlendMode: 'difference' }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        className="font-display text-lg font-semibold tracking-tight text-white no-underline"
        data-cursor-label="HOME"
      >
        Company Brain
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-white no-underline hover:opacity-70 transition-opacity duration-180"
            data-cursor-label="→"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/#demo"
          className="btn border-white text-white font-mono text-[11px] uppercase tracking-[0.1em] py-2 px-5 hover:bg-white hover:text-black transition-all duration-180"
          style={{ mixBlendMode: 'normal' }}
          data-cursor-label="→"
        >
          Book a demo
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-[5px] p-1"
        aria-label={open ? 'Close menu' : 'Open menu'}
        data-cursor-label="MENU"
      >
        <span
          className={`block w-5 h-[1.5px] bg-white transition-transform duration-200 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-white transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-white transition-transform duration-200 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`}
        />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 w-full py-8 px-6 flex flex-col gap-5 md:hidden"
          style={{
            background: 'var(--black)',
            mixBlendMode: 'normal',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-[12px] uppercase tracking-[0.1em] text-white no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#demo"
            onClick={() => setOpen(false)}
            className="btn border-white text-white font-mono text-[12px] uppercase tracking-[0.1em] py-2 px-5 self-start"
          >
            Book a demo
          </Link>
        </div>
      )}
    </nav>
  );
}
