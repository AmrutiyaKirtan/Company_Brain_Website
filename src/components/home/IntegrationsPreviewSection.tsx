import Link from 'next/link';
import LogoMarquee from './LogoMarquee';

export default function IntegrationsPreviewSection() {
  return (
    <section className="bg-paper py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl text-center mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-4 block">
          Integrations
        </span>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
          Connects to what you already use.
        </h2>
        <LogoMarquee />
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="font-mono text-muted-on-light text-sm">
            11 integrations, and growing.
          </p>
          <Link href="/connectors" className="font-mono text-ink hover:opacity-70 transition-opacity">
            See all connectors →
          </Link>
        </div>
      </div>
    </section>
  );
}
