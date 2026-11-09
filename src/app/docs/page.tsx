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
      cmd: 'ycb demo',
      desc: 'Instant in-memory sandbox. Test questions and knowledge search across simulated company sources in 30 seconds with zero setup or credentials.',
      example: 'ycb demo',
    },
    {
      cmd: 'ycb init',
      desc: 'Prompts for your license key, checks Ollama runtime or cloud providers, creates configuration, and initializes SQLite tables.',
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
                <div className="bg-[#14100c] text-white px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm border border-white/10 inline-flex items-center">
                  <span className="text-emerald-400 font-bold select-none mr-2">$</span>
                  <span className="text-amber-200 select-all">{c.cmd}</span>
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

        {/* Trust & Architecture Principles */}
        <div id="cloud-models" className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border-2 border-line-on-light-strong shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light font-semibold">
              Security Architecture
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              Verified
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-ink">
            Who Holds What: 3 Verifiable Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-ink/90 pt-2">
            <div className="p-3.5 rounded-xl bg-paper border border-line-on-light">
              <span className="font-bold text-emerald-700 block mb-1">1. Local OAuth</span>
              <span>OAuth loopback runs strictly on 127.0.0.1:8765 using PKCE.</span>
            </div>
            <div className="p-3.5 rounded-xl bg-paper border border-line-on-light">
              <span className="font-bold text-emerald-700 block mb-1">2. Local Storage</span>
              <span>Tokens never leave your device (~/.ycb/oauth_tokens.json).</span>
            </div>
            <div className="p-3.5 rounded-xl bg-paper border border-line-on-light">
              <span className="font-bold text-emerald-700 block mb-1">3. Minimal Server</span>
              <span>Our license server only stores your key and login email.</span>
            </div>
          </div>
          <p className="font-body text-xs text-ink/75 leading-relaxed pt-1">
            <strong>The Cloud Model Exception:</strong> YCB uses local Ollama models (Gemma 4) by default, transmitting zero text outside your machine. If you explicitly switch to a cloud provider via <code className="font-mono bg-black/5 px-1 py-0.5 rounded">ycb switch model</code>, retrieved context snippets are transmitted directly to that provider over TLS.
          </p>
        </div>

        {/* Resources & Linking Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-line-on-light rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-2 mb-4">
              <h3 className="font-display font-bold text-base text-ink">
                Supported Tools
              </h3>
              <p className="font-body text-xs text-ink/70 leading-relaxed">
                Browse all 39 connectors across chat, code, project management, and CRM.
              </p>
            </div>
            <Link
              href="/connectors"
              className="text-xs font-mono font-semibold text-amber-700 hover:text-ink transition-colors flex items-center gap-1"
            >
              <span>Explore 39 Connectors</span>
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
