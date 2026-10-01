import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center overflow-hidden bg-black pt-32 pb-24 px-6 border-b border-line-on-dark font-body text-white"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto relative">
        {/* Floating pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg mb-8 text-xs font-mono text-white/90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 inline-block"></span>
          <span>Private &bull; Runs on your device by default</span>
        </div>

        {/* Hero headline */}
        <h1 className="font-display font-semibold tracking-tight leading-[1.08] text-white text-4xl sm:text-5xl md:text-6xl mb-6 max-w-3xl">
          Your team’s knowledge, in one place,{' '}
          <span className="highlight-gradient">
            on your own computer
          </span>
          .
        </h1>

        {/* Subhead: max 2 short sentences */}
        <p className="font-body text-white/80 max-w-[54ch] mb-8 text-base sm:text-lg md:text-xl leading-relaxed">
          Search across Slack, Google Drive, Notion, and GitHub without your company data leaving your machine by default. Optional cloud models are available whenever you want them.
        </p>

        {/* Single Main CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <Link
            href="#pricing"
            className="btn btn-primary-dark w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm tracking-wider font-semibold shadow-2xl"
            data-cursor-label="START"
          >
            Get Started Free &darr;
          </Link>
          <Link
            href="/waitlist"
            className="btn btn-secondary-dark w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm tracking-wider font-medium text-white/80"
            data-cursor-label="WAITLIST"
          >
            Join Early Access &rarr;
          </Link>
        </div>

        {/* Illustrative Product Mockup Preview (Clean Example Card) */}
        <div className="w-full max-w-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden">
          {/* Top Bar with Example Tag */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/20"></span>
              <span className="w-3 h-3 rounded-full bg-white/20"></span>
              <span className="w-3 h-3 rounded-full bg-white/20"></span>
              <span className="ml-2 font-mono text-xs text-white/50">Company Knowledge Search</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-amber-300 border border-amber-400/30 font-semibold">
              Example
            </span>
          </div>

          {/* Search Input Simulation */}
          <div className="bg-black/60 border border-white/15 rounded-2xl p-4 flex items-center gap-3 mb-6 shadow-inner">
            <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-white/90 text-sm sm:text-base font-medium">
              Where is our team expense policy?
            </span>
          </div>

          {/* Synthesized Answer Output */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Answer computed locally from your workspace</span>
            </div>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
              Expense reports require review and confirmation from your team lead before submitting to the accounting channel. Receipts should be uploaded with a short note explaining the purpose.
            </p>

            {/* Sources Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider mr-1">
                Sources:
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white/80 font-mono text-xs border border-white/10 flex items-center gap-1.5">
                <span>📄</span> Handbook / Overview
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white/80 font-mono text-xs border border-white/10 flex items-center gap-1.5">
                <span>💬</span> #announcements
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
