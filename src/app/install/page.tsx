import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Install',
  description:
    'Install and set up the Your Company Brain CLI on your computer. Connect Slack, Google Drive, Notion, and GitHub in minutes.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/install',
  },
  openGraph: {
    title: 'Install | Your Company Brain',
    description:
      'Install and set up the Your Company Brain CLI on your computer. Connect Slack, Google Drive, Notion, and GitHub in minutes.',
    url: 'https://yourcompanybrain.vercel.app/install',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function InstallPage() {
  const steps = [
    {
      num: '01',
      title: 'Install via pip',
      desc: 'Install the official YCB command line package from PyPI.',
      cmd: 'pip install ycb',
    },
    {
      num: '02',
      title: 'Initialize and enter license',
      desc: 'Set up your local environment and initialize SQLite storage.',
      cmd: 'ycb init',
    },
    {
      num: '03',
      title: 'Connect your tools',
      desc: 'Interactively connect your team data sources (such as GitHub or Slack).',
      cmd: 'ycb connect github',
    },
    {
      num: '04',
      title: 'Sync company knowledge',
      desc: 'Run batch ingestion to index knowledge on your device by default.',
      cmd: 'ycb sync',
    },
    {
      num: '05',
      title: 'Ask questions in terminal',
      desc: 'Query your indexed company knowledge in natural English.',
      cmd: 'ycb --ask "how do we handle customer refunds"',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/"
              className="font-mono text-xs text-muted-on-light uppercase tracking-widest hover:text-ink transition-colors"
            >
              &larr; Home
            </Link>
            <span className="text-muted-on-light text-xs font-mono">&bull;</span>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light">
              Installation Guide
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
            Install Your Company Brain
          </h1>
          <p className="font-body text-ink/75 text-base sm:text-lg max-w-2xl leading-relaxed">
            Get started with the CLI in minutes. Runs on your own computer by default with optional cloud models when you want them.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white border border-line-on-light rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-amber-600 font-bold">
                    STEP {s.num}
                  </span>
                  <span className="text-xs text-muted-on-light font-mono">&bull;</span>
                  <h2 className="font-display text-lg font-bold text-ink">
                    {s.title}
                  </h2>
                </div>
                <p className="font-body text-xs sm:text-sm text-ink/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="bg-[#14100c] text-white px-4 py-3 rounded-xl font-mono text-xs sm:text-sm border border-white/10 shrink-0 select-all flex items-center gap-2">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-amber-200">{s.cmd}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps / Related Links */}
        <div className="bg-paper-dark/60 border border-line-on-light rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-base text-ink">
              Need a license key or connector details?
            </h3>
            <p className="font-body text-xs sm:text-sm text-ink/70">
              Get a free perpetual Solo license or browse all 38 supported workspace tools.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/pricing" className="btn btn-primary text-xs py-2.5 px-5 rounded-xl">
              Get License Key
            </Link>
            <Link href="/docs" className="btn btn-secondary text-xs py-2.5 px-5 rounded-xl">
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
