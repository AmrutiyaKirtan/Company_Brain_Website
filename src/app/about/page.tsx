import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Your Company Brain: A local-first AI knowledge engine helping early-stage startup teams search company tools privately by default.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/about',
  },
  openGraph: {
    title: 'About | Your Company Brain',
    description:
      'About Your Company Brain: A local-first AI knowledge engine helping early-stage startup teams search company tools privately by default.',
    url: 'https://yourcompanybrain.vercel.app/about',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/"
            className="font-mono text-xs text-muted-on-light uppercase tracking-widest hover:text-ink transition-colors"
          >
            &larr; Home
          </Link>
          <span className="text-muted-on-light text-xs font-mono">&bull;</span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light">
            About
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-6">
          About Your Company Brain
        </h1>

        {/* Core Description */}
        <div className="space-y-6 text-base sm:text-lg text-ink/80 leading-relaxed mb-12">
          <p>
            Your Company Brain (YCB) is a local-first AI knowledge engine built for early-stage startup founders and small teams (5–30 people).
          </p>
          <p>
            It connects workspace tools like Slack, Google Drive, Notion, and GitHub, and turns them into a searchable company brain that runs on your own computer.
          </p>
        </div>

        {/* Key Attributes */}
        <div className="space-y-6 mb-12">
          <div className="bg-white border border-line-on-light rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink mb-3">
              Runs on your computer by default
            </h2>
            <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed">
              Your private company discussions and internal files stay on your device by default. Optional cloud models (OpenAI, Claude, OpenRouter, NVIDIA) are available whenever you choose to use them.
            </p>
          </div>

          <div className="bg-white border border-line-on-light rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink mb-3">
              Connected across 38 tools
            </h2>
            <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed mb-4">
              Integrates with 38 workspace tools across Core Comms &amp; Code, Dev &amp; Search, Project Management, and CRM &amp; Enterprise HR.
            </p>
            <Link
              href="/connectors"
              className="text-xs font-mono font-semibold text-amber-700 hover:text-ink transition-colors inline-flex items-center gap-1"
            >
              <span>View all 38 connectors</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="bg-white border border-line-on-light rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-ink mb-3">
              Verified CLI quick start
            </h2>
            <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed mb-4">
              Install the CLI tool directly from PyPI and initialize your local configuration:
            </p>
            <div className="bg-[#14100c] text-white px-4 py-3 rounded-xl font-mono text-xs sm:text-sm border border-white/10 select-all flex items-center gap-2 max-w-fit">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-amber-200">pip install ycb &amp;&amp; ycb init</span>
            </div>
          </div>
        </div>

        {/* TODO: Add team and founder background details here once provided */}

        {/* Links */}
        <div className="border-t border-line-on-light pt-8 flex flex-wrap gap-4 text-xs font-mono">
          <Link href="/docs" className="text-amber-700 hover:text-ink transition-colors font-semibold">
            Read Docs &rarr;
          </Link>
          <span className="text-muted-on-light">&bull;</span>
          <Link href="/install" className="text-amber-700 hover:text-ink transition-colors font-semibold">
            Install Guide &rarr;
          </Link>
          <span className="text-muted-on-light">&bull;</span>
          <Link href="/pricing" className="text-amber-700 hover:text-ink transition-colors font-semibold">
            View Plans &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
