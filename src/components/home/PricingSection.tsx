import Link from 'next/link';

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-paper py-20 md:py-32 border-t border-line-on-light">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
            Pricing &amp; Editions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight mb-4">
            Start offline for free. Scale to enterprise when ready.
          </h2>
          <p className="font-body text-muted-on-light text-base sm:text-lg">
            Deploy the open-source CLI locally with zero subscriptions, or contact our team for enterprise deployment and managed clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
          {/* Community / Developer Tier */}
          <div className="border border-line-on-light-strong bg-white p-8 sm:p-10 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 press-scale">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-on-light uppercase tracking-widest font-semibold">
                  Developer &amp; Open Source
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                  FREE FOREVER
                </span>
              </div>

              <h3 className="font-display font-semibold text-3xl text-ink mb-2">
                Local CLI Engine
              </h3>
              <div className="text-3xl font-display font-bold text-ink mb-6">
                $0 <span className="text-sm font-mono text-muted-on-light font-normal">/ developer</span>
              </div>

              <p className="font-body text-ink/80 text-sm sm:text-base mb-8">
                Everything you need to extract and synthesize structured skill cards on a single machine or local network.
              </p>

              <ul className="space-y-3 font-body text-xs sm:text-sm text-ink/85 mb-10">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Full access to all 38 connectors</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% offline local inference via Ollama (Gemma 4)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Terminal natural-language search (<code>ycb --ask</code>)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Multi-provider model switcher (Claude, OpenAI, OpenRouter)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Unlimited generated Skill cards (<code>skills_file.json</code>)</span>
                </li>
              </ul>
            </div>

            <Link
              href="#interactive-demo"
              className="btn btn-primary text-xs py-3.5 px-6 rounded-xl w-full text-center"
              data-cursor-label="CLI"
            >
              Get Started via CLI &rarr;
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="border border-line-on-dark-strong bg-ink text-white p-8 sm:p-10 rounded-2xl flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-200 press-scale">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-semibold">
                  Enterprise
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20 font-semibold">
                  CUSTOM SCALE
                </span>
              </div>

              <h3 className="font-display font-semibold text-3xl text-white mb-2">
                Enterprise Fleet
              </h3>
              <div className="text-3xl font-display font-bold text-white mb-6">
                Custom <span className="text-sm font-mono text-white/50 font-normal">/ dedicated cluster</span>
              </div>

              <p className="font-body text-white/80 text-sm sm:text-base mb-8">
                For security-conscious organizations deploying Company Brain across distributed teams and air-gapped clusters.
              </p>

              <ul className="space-y-3 font-body text-xs sm:text-sm text-white/85 mb-10">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>All 38 connectors with enterprise OAuth 2.0 &amp; SAML SSO</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Dedicated private GPU cluster deployment assistance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Custom connector engineering &amp; data retention policies</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Cryptographic audit logs &amp; role-based access control (RBAC)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Dedicated support channel &amp; 99.9% uptime SLA</span>
                </li>
              </ul>
            </div>

            <Link
              href="#demo"
              className="btn btn-primary-dark text-xs py-3.5 px-6 rounded-xl w-full text-center"
              data-cursor-label="TALK"
            >
              Contact Enterprise Sales &rarr;
            </Link>
          </div>
        </div>

        <p className="text-center font-mono text-xs text-muted-on-light max-w-xl mx-auto">
          Company Brain core is free &amp; offline-first. No credit card required to install and sync.
        </p>
      </div>
    </section>
  );
}
