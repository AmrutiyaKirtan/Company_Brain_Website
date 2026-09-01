import Link from 'next/link';
import HeroBrainCanvas from './HeroBrainCanvas';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center overflow-hidden bg-black min-h-[580px] max-h-[960px] pt-24 pb-16"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <div className="absolute inset-0 z-0">
        <HeroBrainCanvas />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-[5] h-[70%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(12,9,7,0.92) 0%, rgba(12,9,7,0.65) 40%, rgba(12,9,7,0.15) 75%, rgba(12,9,7,0) 100%)',
        }}
      />

      <div className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-6">
        {/* Apple-style floating badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6 text-[11px] font-mono text-white/90 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">v3.2.2</span>
          <span className="text-white/40">|</span>
          <span>38 Connectors</span>
          <span className="text-white/40">|</span>
          <span className="text-amber-300/90 font-mono">100% Offline-First</span>
        </div>

        <h1 className="font-display font-semibold tracking-tight leading-[1.04] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl">
          Turn scattered company knowledge into <span className="shine">AI-ready skills</span>.
        </h1>

        <p className="font-body text-white/80 max-w-[58ch] mb-9 text-base sm:text-lg md:text-xl leading-relaxed">
          Company Brain connects to 38 tools across Slack, Notion, GitHub, and Docs, chunking messy discussions into structured procedure cards that AI agents can execute, and answers any question directly in your terminal.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <Link
            href="#interactive-demo"
            className="btn btn-primary-dark w-full sm:w-auto px-7 py-3.5 rounded-full text-[12px] tracking-wider font-semibold shadow-xl"
            data-cursor-label="TRY CLI"
          >
            Try Terminal Simulator ↓
          </Link>
          <Link
            href="#how-it-works"
            className="btn btn-secondary-dark w-full sm:w-auto px-6 py-3.5 rounded-full text-[12px] tracking-wider text-white/90"
            data-cursor-label="EXPLORE"
          >
            Explore Pipeline
          </Link>
        </div>

        {/* Terminal quick-run pill */}
        <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white/70">
          <span className="text-emerald-400 font-bold">$</span>
          <code className="text-white/90">pip install ycb && ycb --ask &quot;how do we handle refunds&quot;</code>
        </div>
      </div>
    </section>
  );
}
