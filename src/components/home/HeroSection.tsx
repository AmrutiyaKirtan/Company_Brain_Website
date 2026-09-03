import Link from 'next/link';
import HeroPipelineVisual from './HeroPipelineVisual';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center items-center overflow-hidden bg-black pt-32 pb-20 px-6 border-b border-line-on-dark"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center max-w-5xl mx-auto relative">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg mb-6 text-xs font-mono text-white/90">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 inline-block"></span>
            <span className="font-bold text-white whitespace-nowrap">YCB v3.2.2</span>
          </div>
          <span className="text-white/30 shrink-0">|</span>
          <span className="whitespace-nowrap">Your Company Brain</span>
          <span className="text-white/30 shrink-0">|</span>
          <span className="text-amber-300 font-semibold whitespace-nowrap">100% Offline-First</span>
        </div>

        {/* Hero headline with glowing metallic gradient */}
        <h1 className="font-display font-semibold tracking-tight leading-[1.04] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl">
          Turn scattered company knowledge into{' '}
          <span className="highlight-gradient">
            AI-ready skills
          </span>
          .
        </h1>

        <p className="font-body text-white/80 max-w-[58ch] mb-8 text-base sm:text-lg md:text-xl leading-relaxed">
          <strong>YCB (Your Company Brain)</strong> connects to 38 enterprise tools, automatically chunking unstructured messages into machine-readable procedure cards that AI agents execute, and answers any question directly in your terminal.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="#interactive-demo"
            className="btn btn-primary-dark w-full sm:w-auto px-8 py-3.5 rounded-full text-xs tracking-wider font-semibold shadow-2xl"
            data-cursor-label="TRY CLI"
          >
            Try Terminal Simulator &darr;
          </Link>
          <Link
            href="#demo"
            className="btn btn-secondary-dark w-full sm:w-auto px-7 py-3.5 rounded-full text-xs tracking-wider font-medium text-white/90"
            data-cursor-label="DEMO"
          >
            Quick Walkthrough &rarr;
          </Link>
        </div>

        {/* Hero Knowledge Synthesis Visual (Dark aesthetic) */}
        <HeroPipelineVisual />
      </div>
    </section>
  );
}
