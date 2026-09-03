'use client';

import { useState } from 'react';

export default function DemoSection() {
  const [status, setStatus] = useState<'default' | 'submitting' | 'submitted'>('default');
  const [email, setEmail] = useState('');
  const [copiedCli, setCopiedCli] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('submitted');
    }, 1000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText('pip install ycb && ycb init');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <section id="demo" className="bg-black py-16 md:py-24 border-t border-line-on-dark font-body text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass-chrome-dark rounded-3xl border border-white/15 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Side: Quick CTA */}
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold block">
                Get Started with YCB
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
                Run it locally or schedule a 15-min walkthrough.
              </h2>
              <p className="font-body text-white/80 text-sm sm:text-base leading-relaxed">
                Install the open-source CLI directly, or drop your work email for a tailored walkthrough reading your team&apos;s Slack and Notion offline.
              </p>

              {/* Quick CLI Copy Box */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-amber-200">pip install ycb &amp;&amp; ycb init</span>
                  </div>
                  <button
                    onClick={handleCopyCli}
                    className="ml-3 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-all press-scale whitespace-nowrap"
                  >
                    {copiedCli ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Fast 1-Click Form */}
            <div className="lg:col-span-5 bg-white/[0.03] p-6 sm:p-7 rounded-2xl border border-white/10">
              {status === 'submitted' ? (
                <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl mx-auto border border-emerald-500/40">
                    ✓
                  </div>
                  <h4 className="font-display font-semibold text-lg text-white">
                    Walkthrough requested!
                  </h4>
                  <p className="text-xs text-white/75 leading-relaxed">
                    We will email <strong>{email}</strong> within 4 hours to coordinate your offline setup.
                  </p>
                  <button
                    onClick={() => setStatus('default')}
                    className="text-xs font-mono text-amber-300 hover:underline pt-2 block mx-auto"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-display font-semibold text-base text-white">
                    Schedule a Guided Demo
                  </h4>

                  <div>
                    <label htmlFor="demo-email" className="block font-mono text-[11px] text-white/60 mb-1">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      id="demo-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kirtan@company.com"
                      className="w-full bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white rounded-lg focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-primary-dark w-full py-3 rounded-lg text-xs font-semibold tracking-wider uppercase shadow-lg"
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Book Walkthrough &rarr;'}
                  </button>

                  <p className="text-[10px] text-white/40 text-center font-mono">
                    Zero spam. 100% offline-first privacy guarantee.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
