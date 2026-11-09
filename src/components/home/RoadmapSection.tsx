import Link from 'next/link';

export default function RoadmapSection() {
  const availableFeatures = [
    {
      title: 'Local Hardware Boundary',
      desc: 'Vectors and search indices stored in local SQLite database (data/company_brain.db). Zero remote database sync.',
    },
    {
      title: 'RFC 7636 PKCE Local Auth',
      desc: 'OAuth loopback executes directly on 127.0.0.1. Tokens stored locally with 0600 permissions in ~/.ycb/oauth_tokens.json.',
    },
    {
      title: '39 Read-Only Connectors',
      desc: 'Every connector enforces minimal read-only scopes. Zero write or destructive permissions requested.',
    },
    {
      title: '100% Offline Model Support',
      desc: 'Fully air-gapped local inference with Ollama (Gemma 4). Zero data leaves your computer.',
    },
    {
      title: 'Local Structured Logs',
      desc: 'Comprehensive execution logs formatted in JSON Lines on your local filesystem (~/.ycb/logs/).',
    },
    {
      title: 'Single-User Hardware Seat Binding',
      desc: 'One key bound per developer machine with cryptographic hardware hashing.',
    },
  ];

  const roadmapFeatures = [
    {
      title: 'Centralized Audit Logging & SIEM',
      status: 'On the roadmap (Q2 2026)',
      statusColor: 'text-amber-800 bg-amber-100 border-amber-300',
      desc: 'Direct streaming of ingestion events and search queries to Splunk, Datadog, or cloud syslog. (Structured local JSON logs exist on disk today).',
    },
    {
      title: 'Team Admin Controls & Multi-User RBAC',
      status: 'On the roadmap (Q3 2026)',
      statusColor: 'text-blue-800 bg-blue-100 border-blue-300',
      desc: 'Organization-wide admin portal to manage employee seats, enforce connector blacklists, and rotate keys centrally across a team.',
    },
    {
      title: 'SOC2 Type II Certification',
      status: 'Planned, not yet audited',
      statusColor: 'text-purple-800 bg-purple-100 border-purple-300',
      desc: 'Formal third-party SOC2 Type II security audit covering licensing infrastructure and optional hosted auth relays.',
    },
    {
      title: 'Self-Hosted Air-Gapped License Server',
      status: 'On the roadmap (Q3 2026)',
      statusColor: 'text-ink bg-black/5 border-line-on-light-strong',
      desc: 'Docker image to run license validation entirely within your own closed VPC or air-gapped government/defense enclave.',
    },
  ];

  return (
    <section id="roadmap" className="bg-paper py-20 md:py-28 border-t border-line-on-light font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light font-semibold">
              Compliance & Roadmap
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-300 font-semibold">
              Honest Disclosure
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight leading-tight mb-4">
            Security Checklist: What is live, and what is coming.
          </h2>
          <p className="font-body text-ink/80 text-base sm:text-lg leading-relaxed">
            Regulated buyers evaluate software against strict compliance checklists. Silence on missing enterprise features reads like we haven&apos;t thought about them. Here is our direct, transparent status.
          </p>
        </div>

        {/* 2-Column Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Column 1: Available Today */}
          <div className="rounded-3xl border-2 border-emerald-500/30 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-line-on-light">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                    Production Ready
                  </span>
                  <h3 className="font-display font-semibold text-2xl text-ink">
                    Available Today (v4.8)
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ✓ Verified in Code
                </span>
              </div>

              <div className="space-y-4">
                {availableFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-paper/60 border border-line-on-light">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5 text-sm">✓</span>
                    <div>
                      <h4 className="font-display font-semibold text-sm text-ink mb-0.5">
                        {feat.title}
                      </h4>
                      <p className="font-body text-xs text-ink/75 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-line-on-light flex items-center justify-between text-xs font-mono text-muted-on-light">
              <span>All 39 connectors live</span>
              <Link href="/connectors" className="text-ink font-semibold hover:underline">
                View Connectors &rarr;
              </Link>
            </div>
          </div>

          {/* Column 2: On The Roadmap */}
          <div className="rounded-3xl border-2 border-line-on-light-strong bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-line-on-light">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-800 font-bold block mb-1">
                    Active Development
                  </span>
                  <h3 className="font-display font-semibold text-2xl text-ink">
                    On The Roadmap
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  Honest &ldquo;Not Yet&rdquo;
                </span>
              </div>

              <div className="space-y-4">
                {roadmapFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-paper/60 border border-line-on-light">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h4 className="font-display font-semibold text-sm text-ink">
                        {feat.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${feat.statusColor}`}>
                        {feat.status}
                      </span>
                    </div>
                    <p className="font-body text-xs text-ink/75 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-line-on-light flex items-center justify-between text-xs font-mono text-muted-on-light">
              <span>Need custom enterprise controls?</span>
              <Link href="#pricing" className="text-ink font-semibold hover:underline">
                Talk to Enterprise &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
