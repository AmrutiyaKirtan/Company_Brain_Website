import type { Metadata } from 'next';
import Link from 'next/link';
import { connectors } from '@/data/connectors';
import ConnectorIcon from '@/components/ConnectorIcon';

export const metadata: Metadata = {
  title: 'Connectors | Company Brain',
  description:
    'Connect what you already use. More connectors are added regularly, so Company Brain reads knowledge across your tools locally and securely.',
};

export default function ConnectorsPage() {
  return (
    <div className="bg-paper min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <header className="mb-16 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-4 block">
            Connectors
          </span>
          <h1 className="font-display text-ink text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Every way Company Brain reads your knowledge.
          </h1>
          <p className="font-body text-muted-on-light text-lg max-w-[55ch] leading-relaxed">
            Connect what you already use. More connectors are added regularly, so this list will keep growing.
          </p>
        </header>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 border-t border-l border-line-on-light">
          {connectors.map((connector) => (
            <div
              key={connector.slug}
              className="connector-cell group relative flex flex-col items-center justify-center p-8 sm:p-10 border-r border-b border-line-on-light bg-paper text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors duration-180 text-center cursor-pointer select-none"
              data-cursor-label="CONNECT"
            >
              <div className="mb-4 flex items-center justify-center h-10 w-10">
                <ConnectorIcon slug={connector.slug} size={32} />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink group-hover:text-white transition-colors duration-180">
                {connector.name}
              </span>
            </div>
          ))}
        </div>

        {/* Hairline-bordered note below grid */}
        <div className="mt-12 border border-line-on-light p-6 font-body text-muted-on-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm leading-relaxed">
            Don't see your tool? More connectors are on the way. Get in touch and we will prioritize it.
          </p>
          <Link
            href="/#demo"
            className="font-mono text-xs uppercase tracking-wider text-ink font-medium whitespace-nowrap hover:opacity-70 transition-opacity duration-180"
            data-cursor-label="→"
          >
            Request a connector &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
