'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Spring presets (Apple Design — critically damped) ──────── */
const spring = { type: 'spring' as const, damping: 22, stiffness: 300, mass: 0.8 };
const springBouncy = { type: 'spring' as const, damping: 16, stiffness: 280, mass: 0.9 };

/* ─── Auto-expanding textarea height ────────────────────────── */
function useAutoResize() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);
  return { ref, resize };
}

export default function DemoSection() {
  const [status, setStatus] = useState<'default' | 'submitting' | 'submitted' | 'error'>('default');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedCli, setCopiedCli] = useState(false);
  const { ref: textareaRef, resize: resizeTextarea } = useAutoResize();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message. Please try again.');
      setStatus('submitted');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us directly.');
      setStatus('error');
    }
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText('pip install ycb && ycb init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleReset = () => {
    setStatus('default');
    setEmail('');
    setName('');
    setMessage('');
    setErrorMsg('');
  };

  return (
    <section id="demo" className="relative bg-black overflow-hidden font-body text-white">
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(217,119,6,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 max-w-6xl py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── LEFT: Hero copy + CLI ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Section kicker */}
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-amber-500/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-amber-400/80 font-medium">
                Get Started
              </span>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]"
                  style={{ letterSpacing: '-0.028em' }}>
                Run locally.{' '}
                <span className="text-white/50">Or schedule a</span>
                <br />
                15-min walkthrough.
              </h2>
              <p className="font-body text-white/60 text-base sm:text-lg leading-relaxed max-w-md">
                Install the open-source CLI directly, or drop your email for a tailored session — we&apos;ll walk through your Slack, Notion, and GitHub offline.
              </p>
            </div>

            {/* CLI Copy pill */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={spring}
            >
              <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-emerald-400 font-mono font-bold text-sm shrink-0">$</span>
                  <span className="text-amber-200/90 font-mono text-sm truncate">
                    pip install ycb &amp;&amp; ycb init
                  </span>
                </div>
                <motion.button
                  onClick={handleCopyCli}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                  className="ml-4 shrink-0 px-3.5 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-colors"
                  style={{
                    background: copiedCli ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.08)',
                    border: '1px solid',
                    borderColor: copiedCli ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.12)',
                    color: copiedCli ? '#34d399' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  {copiedCli ? '✓ Copied' : 'Copy'}
                </motion.button>
              </div>
            </motion.div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {['100% offline', 'Zero data leakage', 'Apache 2.0 open-source'].map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 text-[12px] font-mono text-white/35">
                  <span className="w-1 h-1 rounded-full bg-emerald-500/60 inline-block" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Contact form ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.18 }}
          >
            {/* Glass card */}
            <div
              className="rounded-3xl border border-white/10 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px) saturate(160%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 32px 80px rgba(0,0,0,0.5)',
              }}
            >
              <AnimatePresence mode="wait">
                {status === 'submitted' ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={springBouncy}
                    className="p-7 sm:p-9 flex flex-col items-center text-center gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ ...springBouncy, delay: 0.1 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        background: 'rgba(52,211,153,0.12)',
                        border: '1px solid rgba(52,211,153,0.25)',
                      }}
                    >
                      ✓
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-semibold text-white tracking-tight">
                        Walkthrough requested!
                      </h3>
                      <p className="text-sm text-white/55 leading-relaxed max-w-xs">
                        We&apos;ll email <strong className="text-white/80">{email}</strong> within 4 hours.
                        A confirmation is on its way to your inbox.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="mt-2 text-xs font-mono text-amber-400/70 hover:text-amber-300 transition-colors"
                    >
                      Submit another inquiry →
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-7 sm:p-9 space-y-0"
                  >
                    {/* Form header */}
                    <div className="mb-6">
                      <h3
                        className="font-display text-xl font-semibold text-white mb-1.5"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        Schedule a Guided Demo
                      </h3>
                      <p className="text-[13px] text-white/45 leading-relaxed">
                        We&apos;ll tailor it to your stack — Notion, Slack, GitHub, or all 38 connectors.
                      </p>
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {status === 'error' && errorMsg && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          transition={spring}
                          className="rounded-xl overflow-hidden"
                          style={{
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.2)',
                          }}
                        >
                          <p className="px-4 py-3 text-red-300 text-[13px] font-mono leading-relaxed">
                            {errorMsg}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Fields */}
                    <div className="space-y-4">
                      {/* Name */}
                      <FormField label="Your Name" hint="optional">
                        <input
                          type="text"
                          id="demo-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Kirtan Amrutiya"
                          autoComplete="name"
                          className="demo-input"
                        />
                      </FormField>

                      {/* Email */}
                      <FormField label="Work Email" required>
                        <input
                          required
                          type="email"
                          id="demo-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="kirtan@company.com"
                          autoComplete="email"
                          className="demo-input"
                        />
                      </FormField>

                      {/* Message — auto-expanding, no scrollbar */}
                      <FormField label="Message" hint="optional">
                        <textarea
                          ref={textareaRef}
                          id="demo-message"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            resizeTextarea();
                          }}
                          placeholder="Tell us about your stack — tools, team size, what you'd like to see..."
                          rows={3}
                          className="demo-input resize-none overflow-hidden"
                          style={{ minHeight: '80px' }}
                        />
                      </FormField>
                    </div>

                    {/* CTA button */}
                    <motion.button
                      type="submit"
                      disabled={status === 'submitting'}
                      whileTap={{ scale: 0.98 }}
                      transition={spring}
                      className="mt-6 w-full py-3.5 rounded-2xl text-[13px] font-semibold tracking-wide flex items-center justify-center gap-2.5 transition-opacity disabled:opacity-50"
                      style={{
                        background: 'var(--white)',
                        color: 'var(--black)',
                        boxShadow: '0 2px 20px rgba(245,238,219,0.15)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <span
                            className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black animate-spin inline-block"
                          />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>Book Walkthrough</span>
                          <span className="opacity-50">→</span>
                        </>
                      )}
                    </motion.button>

                    <p className="mt-4 text-[11px] text-center font-mono text-white/25 tracking-wide">
                      Zero spam · 100% offline-first
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Input styles — injected inline to avoid Tailwind purge of dynamic focus styles */}
      <style>{`
        .demo-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 13.5px;
          color: #f5eedb;
          font-family: var(--font-ibm-plex-mono);
          outline: none;
          transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
          -webkit-appearance: none;
          appearance: none;
          scrollbar-width: none;
        }
        .demo-input::-webkit-scrollbar { display: none; }
        .demo-input::-webkit-contacts-auto-fill-button,
        .demo-input::-webkit-credentials-auto-fill-button { visibility: hidden; }
        .demo-input::placeholder { color: rgba(245,238,219,0.2); }
        .demo-input:focus {
          border-color: rgba(245,238,219,0.28);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(245,238,219,0.05);
        }
      `}</style>
    </section>
  );
}

/* ── Small helper for label + field wrapper ── */
function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/40 mb-2 font-medium">
        {label}
        {required && <span className="text-amber-500/60">*</span>}
        {hint && <span className="text-white/20 normal-case tracking-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
