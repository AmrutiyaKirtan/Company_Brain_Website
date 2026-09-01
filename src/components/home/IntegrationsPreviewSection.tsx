import Link from 'next/link';
import LogoMarquee from './LogoMarquee';

export default function IntegrationsPreviewSection() {
  return (
    <section className="bg-paper py-20 md:py-32 overflow-hidden border-t border-line-on-light">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-4 block">
          38 Unified Connectors
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight mb-4">
          Connects to your entire company stack.
        </h2>
        <p className="font-body text-muted-on-light text-base sm:text-lg max-w-[55ch] mx-auto mb-12">
          From Slack and Google Docs to GitHub, Linear, Jira, HubSpot, and Rippling. Ingest communication, engineering, support, and HR knowledge in one place.
        </p>

        {/* Marquee with all connectors */}
        <LogoMarquee />

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-on-light bg-paper-dark/60 px-4 py-2 rounded-full border border-line-on-light">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>38 Active Connectors across 4 Enterprise Tiers</span>
          </div>
          <Link
            href="/connectors"
            className="btn btn-primary text-xs py-2.5 px-6 rounded-full"
            data-cursor-label="CONNECTORS"
          >
            Explore all 38 Connectors &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
