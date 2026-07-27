import Link from 'next/link';
import HeroBrainCanvas from './HeroBrainCanvas';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col justify-center items-center overflow-hidden bg-black min-h-[520px] max-h-[900px]" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className="absolute inset-0 z-0">
        <HeroBrainCanvas />
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 z-[5] h-[65%]"
        style={{
          background: 'linear-gradient(to top, rgba(16,12,9,0.82) 0%, rgba(16,12,9,0.55) 35%, rgba(16,12,9,0.15) 65%, rgba(16,12,9,0) 85%)'
        }}
      />
      <div className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <span className="font-mono uppercase tracking-widest text-[rgba(241,233,216,0.88)] text-[11px] mb-6">
          Local-first knowledge engine
        </span>
        <h1 className="font-display font-semibold tracking-tight leading-[1.05] text-white text-4xl md:text-5xl lg:text-6xl mb-6">
          Turn scattered company knowledge into AI-ready skills.
        </h1>
        <p className="font-body text-[rgba(241,233,216,0.88)] max-w-[55ch] mb-10 text-lg">
          Company Brain reads through your Slack, docs, and code, and uses a local AI model to extract structured knowledge. It works automatically, continuously, and entirely offline. Nothing leaves your servers.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="#demo" className="btn-primary-dark border border-line-on-dark px-6 py-3 rounded-[2px] text-white hover:bg-white hover:text-black transition-colors duration-180">
            Book a demo
          </Link>
          <Link href="#how-it-works" className="font-mono text-white hover:opacity-80 transition-opacity duration-180">
            See how it works ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
