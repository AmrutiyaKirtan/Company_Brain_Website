import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-6 md:px-12 py-16 border-t border-line-on-dark font-body">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2 no-underline"
            >
              YCB <span className="text-white/60 font-normal text-sm">(Your Company Brain)</span>
            </Link>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-on-dark">
              Automated, offline-first knowledge extraction pipeline for AI agents.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-mono text-white/80">
            <Link href="/#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/#interactive-demo" className="hover:text-white transition-colors">
              CLI Simulator
            </Link>
            <Link href="/connectors" className="hover:text-white transition-colors">
              38 Connectors
            </Link>
            <Link href="/#pipeline" className="hover:text-white transition-colors">
              5-Stage Pipeline
            </Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              v3.2.2 Live
            </span>
            <span>100% Local Inference &bull; Zero External Data Transmission</span>
          </div>

          <div className="flex items-center gap-4 text-white/60">
            <span>Contact: companybrain@gmail.com</span>
            <span>&bull;</span>
            <span>Apache 2.0 / Commercial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
