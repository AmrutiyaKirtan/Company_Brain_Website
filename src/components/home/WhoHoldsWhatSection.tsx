import Link from 'next/link';

export default function WhoHoldsWhatSection() {
  const columns = [
    {
      title: 'Your Local Machine',
      subtitle: 'Your Hardware & Perimeter',
      accentColor: 'border-emerald-500/40 bg-emerald-500/[0.03]',
      badgeText: 'Holds Your Data',
      badgeColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      holds: [
        'OAuth loopback runs strictly on 127.0.0.1:8765 via PKCE',
        'Access tokens saved locally in ~/.ycb/oauth_tokens.json (chmod 600)',
        'Local SQLite database & vector store (data/company_brain.db)',
        'Local model inference with Ollama & Gemma 4 (no external packets)',
      ],
      notHolds: 'Nothing leaves your computer during local operation.',
      verifyCommand: 'cat ~/.ycb/oauth_tokens.json',
      verifyLabel: 'Inspect local tokens',
    },
    {
      title: 'Workplace SaaS Tools',
      subtitle: 'Slack, Google Drive, Notion, GitHub',
      accentColor: 'border-blue-500/30 bg-blue-500/[0.02]',
      badgeText: 'Read-Only Scopes',
      badgeColor: 'text-blue-700 bg-blue-100 border-blue-300',
      holds: [
        'Holds your original source documents, tickets, and messages',
        'Accessed via direct HTTPS requests from your machine to their API',
        'Requests minimum read-only permissions (e.g. documents.readonly, repo:read)',
        'Zero write permissions requested across all 39 connectors',
      ],
      notHolds: 'Never shares data with YCB servers.',
      verifyLink: '/connectors',
      verifyLinkLabel: 'Inspect all 39 connector scopes →',
    },
    {
      title: 'Optional Cloud AI',
      subtitle: 'OpenAI, Anthropic, OpenRouter',
      accentColor: 'border-amber-500/30 bg-amber-500/[0.02]',
      badgeText: 'Optional & Transparent',
      badgeColor: 'text-amber-800 bg-amber-100 border-amber-300',
      holds: [
        '100% Offline by default using local Ollama (Gemma 4)',
        'Active only if you explicitly run: ycb config set model openai/gpt-4o',
        'When enabled, retrieved context snippets are sent to your chosen AI vendor',
        'Keys are stored locally in ~/.ycb/config.json and never sent to YCB',
      ],
      notHolds: 'Completely disabled unless you configure an external key.',
      verifyCommand: 'ycb config get model',
      verifyLabel: 'Check active model target',
    },
    {
      title: 'YCB Server',
      subtitle: 'License & Validation Server',
      accentColor: 'border-purple-500/30 bg-purple-500/[0.02]',
      badgeText: 'License Key & Email Only',
      badgeColor: 'text-purple-800 bg-purple-100 border-purple-300',
      holds: [
        'Your issued license key string',
        'Your login / purchase email',
        'Machine hardware hash for device-seat limits',
        'License tier (Solo, Max, Enterprise) and expiration date',
      ],
      notHolds: 'NEVER receives tokens, search queries, company documents, or employee data.',
      verifyCommand: 'ycb license status',
      verifyLabel: 'Verify license payload',
    },
  ];

  return (
    <section id="who-holds-what" className="bg-paper py-20 md:py-28 border-t border-line-on-light font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light font-semibold">
              Data & Trust Architecture
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              Verified by Code Audit
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight leading-tight mb-4">
            Who holds what: An honest breakdown.
          </h2>
          <p className="font-body text-ink/80 text-base sm:text-lg leading-relaxed mb-4">
            Rather than asking you to trust a vague marketing slogan, here is exactly where your credentials, tokens, queries, and company files live.
          </p>
          <div className="p-4 rounded-2xl bg-white border border-line-on-light-strong shadow-sm inline-block">
            <p className="font-mono text-xs sm:text-sm text-ink font-semibold flex flex-wrap items-center gap-2">
              <span className="text-emerald-700">1. OAuth runs on your machine.</span>
              <span className="text-muted-on-light">&bull;</span>
              <span className="text-emerald-700">2. Tokens never leave your device.</span>
              <span className="text-muted-on-light">&bull;</span>
              <span className="text-emerald-700">3. Our server only stores a license key and login email.</span>
            </p>
          </div>
        </div>

        {/* 4 Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {columns.map((col, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border-2 p-6 flex flex-col justify-between transition-all bg-white shadow-sm hover:shadow-md ${col.accentColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${col.badgeColor}`}>
                    {col.badgeText}
                  </span>
                  <span className="font-mono text-xs text-muted-on-light">0{idx + 1}</span>
                </div>

                <h3 className="font-display font-semibold text-lg text-ink mb-1">
                  {col.title}
                </h3>
                <p className="font-mono text-[11px] text-muted-on-light mb-4 pb-3 border-b border-line-on-light">
                  {col.subtitle}
                </p>

                <ul className="space-y-2.5 text-xs text-ink/85 mb-6">
                  {col.holds.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-line-on-light">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-muted-on-light mb-1.5">
                  Verification:
                </span>
                {col.verifyCommand ? (
                  <div className="p-2 rounded bg-paper border border-line-on-light font-mono text-[11px] text-ink select-all break-all">
                    <code>{col.verifyCommand}</code>
                  </div>
                ) : col.verifyLink ? (
                  <Link
                    href={col.verifyLink}
                    className="font-mono text-[11px] text-amber-800 hover:text-amber-900 font-semibold underline block"
                  >
                    {col.verifyLinkLabel}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Exception Notice */}
        <div className="p-6 rounded-2xl bg-paper-dark border border-line-on-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div>
              <h4 className="font-display font-semibold text-sm text-ink mb-0.5">
                The Cloud Model Exception
              </h4>
              <p className="font-body text-xs text-ink/75 max-w-3xl leading-relaxed">
                By default, YCB operates 100% offline with local Ollama models (Gemma 4). If you deliberately configure a cloud provider (OpenAI, Anthropic, or OpenRouter), retrieved document context snippets must be transmitted to that vendor over TLS for response generation. We do not intermediate or log those requests.
              </p>
            </div>
          </div>
          <Link
            href="/docs#cloud-models"
            className="btn btn-secondary text-xs px-4 py-2 rounded-xl whitespace-nowrap self-end sm:self-center"
          >
            Read Model Docs &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
