import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Docs',
  description:
    'Documentation for Your Company Brain CLI. Command reference, connector setup guides, and local-first knowledge search instructions.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/docs',
  },
  openGraph: {
    title: 'Docs | Your Company Brain',
    description:
      'Documentation for Your Company Brain CLI. Command reference, connector setup guides, and local-first knowledge search instructions.',
    url: 'https://yourcompanybrain.vercel.app/docs',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function DocsPage() {
  const commands = [
    {
      cmd: 'ycb init',
      desc: 'Prompts for your license key, checks Ollama (gemma4:e4b), creates .env config, and initializes SQLite tables.',
    },
    {
      cmd: 'ycb connect <connector>',
      desc: 'Prompts for credentials required by a connector and securely saves them to your local environment.',
      example: 'ycb connect github',
    },
    {
      cmd: 'ycb disconnect <connector>',
      desc: 'Removes stored credentials for a specified connector from your local configuration.',
      example: 'ycb disconnect github',
    },
    {
      cmd: 'ycb sync',
      desc: 'Runs data ingestion and AI knowledge extraction across all enabled connectors.',
    },
    {
      cmd: 'ycb status',
      desc: 'Displays license tier, active connectors, available connectors, and extracted skill statistics.',
    },
    {
      cmd: 'ycb export',
      desc: 'Exports extracted procedure cards to output/skills_file.json for AI agents or humans.',
    },
    {
      cmd: 'ycb --ask "<query>"',
      desc: 'Ask questions directly against your company knowledge in terminal with interactive follow-ups.',
      example: 'ycb --ask "how do we handle customer refunds"',
    },
    {
      cmd: 'ycb switch model',
      desc: 'Select which model powers answers. Switch between local Ollama and optional cloud providers.',
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
              CLI Documentation
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
            Documentation &amp; Command Reference
          </h1>
          <p className="font-body text-ink/75 text-base sm:text-lg max-w-2xl leading-relaxed">
            Reference guide for the YCB command line interface. Runs on your own computer by default with optional cloud models when you want them.
          </p>
        </div>

        {/* Command Reference Section */}
        <div className="mb-14">
          <h2 className="font-display text-2xl font-bold text-ink mb-6">
            Core CLI Commands
          </h2>

          <div className="space-y-4">
            {commands.map((c) => (
              <div
                key={c.cmd}
                className="bg-white border border-line-on-light rounded-2xl p-6 shadow-sm space-y-3"
              >
                <div className="bg-[#14100c] text-white px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm border border-white/10 inline-block select-all">
                  <span className="text-emerald-400 font-bold">$ </span>
                  <span className="text-amber-200">{c.cmd}</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed">
                  {c.desc}
                </p>
                {c.example && (
                  <div className="text-xs font-mono text-muted-on-light pt-1">
                    Example: <code className="text-ink font-semibold">{c.example}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Linking Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-line-on-light rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-4">
              <h3 className="font-display font-bold text-base text-ink">
                Supported Tools
              </h3>
              <p className="font-body text-xs text-ink/70 leading-relaxed">
                Browse all 38 connectors across chat, code, project management, and CRM.
              </p>
            </div>
            <Link
              href="/connectors"
              className="text-xs font-mono font-semibold text-amber-700 hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>Explore 38 Connectors</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="bg-white border border-line-on-light rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-4">
              <h3 className="font-display font-bold text-base text-ink">
                Technical Pipeline
              </h3>
              <p className="font-body text-xs text-ink/70 leading-relaxed">
                Read the 5-stage ingestion, local extraction, and skill synthesis architecture.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="text-xs font-mono font-semibold text-amber-700 hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>How It Works Deep Dive</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="bg-white border border-line-on-light rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-4">
              <h3 className="font-display font-bold text-base text-ink">
                Installation Guide
              </h3>
              <p className="font-body text-xs text-ink/70 leading-relaxed">
                Step-by-step terminal instructions to get up and running from scratch.
              </p>
            </div>
            <Link
              href="/install"
              className="text-xs font-mono font-semibold text-amber-700 hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>Quick Install Guide</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
