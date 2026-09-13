'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState<{
    email: string;
    already_joined: boolean;
    created_at: string;
    signup_count: number;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          ycb_company_website: honeypot, // Honeypot field
          source: 'waitlist_page',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to join waitlist. Please try again.');
      }

      setSuccessData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setEmail('');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-body selection:bg-ink selection:text-paper pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background architectural grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-2xl mx-auto w-full relative z-10 my-auto">
        {/* Breadcrumb / Category pill */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Link
            href="/"
            className="font-mono text-xs text-muted-on-light uppercase tracking-widest hover:text-ink transition-colors"
          >
            &larr; YCB Home
          </Link>
          <span className="text-muted-on-light text-xs font-mono">&bull;</span>
          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-900 border border-amber-500/30 uppercase tracking-widest font-semibold">
            Early Access Queue
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-line-on-light rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {!successData ? (
            <>
              <div className="text-center space-y-3 mb-8">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink">
                  Join the Early Access Queue
                </h1>
                <p className="font-body text-ink/75 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  Be the first to run the 100% offline knowledge engine across your company&apos;s codebase, Notion, Slack, and Google Docs.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-paper/60 border border-line-on-light text-center">
                  <div className="text-emerald-700 font-mono text-xs font-bold mb-1">0% Cloud Leaks</div>
                  <div className="text-[11px] text-ink/70">Runs on local metal (Ollama / Gemma)</div>
                </div>
                <div className="p-3 rounded-2xl bg-paper/60 border border-line-on-light text-center">
                  <div className="text-amber-800 font-mono text-xs font-bold mb-1">38 Connectors</div>
                  <div className="text-[11px] text-ink/70">Slack, Jira, Docs, GitHub, Linear</div>
                </div>
                <div className="p-3 rounded-2xl bg-paper/60 border border-line-on-light text-center">
                  <div className="text-ink font-mono text-xs font-bold mb-1">Priority Batch</div>
                  <div className="text-[11px] text-ink/70">Direct onboarding invite upon rollout</div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
                  <span className="font-bold">Error:</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from real users, caught by bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="ycb_company_website">Company Website</label>
                  <input
                    id="ycb_company_website"
                    type="text"
                    name="ycb_company_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email-input"
                    className="block font-mono text-xs text-muted-on-light uppercase tracking-wider mb-2 font-semibold"
                  >
                    Your Work or Personal Email
                  </label>
                  <div className="relative">
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@company.com"
                      className="w-full bg-paper border border-line-on-light px-4 py-3.5 text-sm sm:text-base text-ink rounded-xl focus:outline-none focus:border-ink transition-colors font-mono placeholder:text-ink/40 shadow-inner"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 press-scale transition-all"
                  data-cursor-label="JOIN"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      <span>Securing Your Spot...</span>
                    </>
                  ) : (
                    <span>Request Early Access Pass &rarr;</span>
                  )}
                </button>

                <p className="font-mono text-[11px] text-center text-muted-on-light pt-2">
                  No credit card required &bull; Free tier included &bull; Unsubscribe anytime
                </p>
              </form>
            </>
          ) : (
            /* Confirmation Ticket State */
            <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 mx-auto">
                <svg
                  className="w-8 h-8 text-emerald-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-widest inline-block mb-3">
                  {successData.already_joined ? 'Already Registered' : 'Early Access Confirmed'}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  {successData.already_joined
                    ? "You're Already in Line!"
                    : "You're on the Waitlist!"}
                </h2>
                <p className="font-body text-sm sm:text-base text-ink/80 max-w-md mx-auto mt-2 leading-relaxed">
                  {successData.message}
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-paper border border-line-on-light rounded-2xl p-5 text-left font-mono text-xs space-y-2.5 max-w-md mx-auto shadow-sm">
                <div className="flex justify-between border-b border-line-on-light/60 pb-2">
                  <span className="text-muted-on-light uppercase tracking-wider">Registered Email</span>
                  <span className="text-ink font-semibold">{successData.email}</span>
                </div>
                <div className="flex justify-between border-b border-line-on-light/60 pb-2">
                  <span className="text-muted-on-light uppercase tracking-wider">Queue Status</span>
                  <span className="text-emerald-700 font-bold uppercase tracking-wide">● Priority Pending</span>
                </div>
                <div className="flex justify-between border-b border-line-on-light/60 pb-2">
                  <span className="text-muted-on-light uppercase tracking-wider">Joined At</span>
                  <span className="text-ink/80">
                    {new Date(successData.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-muted-on-light uppercase tracking-wider">Pass Type</span>
                  <span className="text-ink font-semibold">100% Offline Local Inference</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="btn btn-secondary text-xs py-2.5 px-5 rounded-xl w-full sm:w-auto"
                >
                  Register Another Email
                </button>
                <Link
                  href="/connectors"
                  className="btn btn-primary text-xs py-2.5 px-5 rounded-xl w-full sm:w-auto text-center"
                >
                  Browse 38 Connectors &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
