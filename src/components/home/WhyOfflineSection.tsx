export default function WhyOfflineSection() {
  return (
    <section id="why-offline" className="bg-paper py-20 md:py-32 border-t border-line-on-light">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left copy */}
          <div className="w-full lg:w-1/2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
              Zero-Data-Leakage Guarantee
            </span>
            <h2 className="shine font-display text-4xl sm:text-5xl text-ink font-semibold tracking-tight mb-6 leading-[1.08]">
              Your company data never leaves your hardware.
            </h2>
            <div className="space-y-4 font-body text-ink/80 text-base sm:text-lg leading-relaxed">
              <p>
                Confidential Slack threads, salary discussions, security post-mortems, and customer PII should never be transmitted to third-party cloud AI vendors.
              </p>
              <p>
                Company Brain executes inference locally via Ollama (Gemma 4), stores raw data and chunks in an on-premise SQLite database, and enforces strict offline idempotency.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-white/70 border border-line-on-light">
                <span className="text-emerald-700 font-bold block mb-1">✓ 100% On-Premise</span>
                <span className="text-muted-on-light">Runs on your laptops, workstations, or air-gapped private servers.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/70 border border-line-on-light">
                <span className="text-emerald-700 font-bold block mb-1">✓ Zero Cloud DPA Needed</span>
                <span className="text-muted-on-light">No third-party data processing agreements or compliance audits.</span>
              </div>
            </div>
          </div>

          {/* Right Diagram */}
          <div className="w-full lg:w-1/2">
            <div className="border border-line-on-light-strong p-8 rounded-2xl bg-white/80 shadow-xl relative">
              <div className="absolute -top-3 left-6 bg-ink text-white px-3 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-wider font-semibold">
                LOCAL AIR-GAPPED PERIMETER
              </div>

              <div className="space-y-6 pt-4">
                {/* 38 Sources */}
                <div className="p-4 rounded-xl bg-paper/60 border border-line-on-light">
                  <div className="flex items-center justify-between text-xs font-mono mb-2 text-muted-on-light">
                    <span>INGESTION LAYER</span>
                    <span>38 Connectors</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-white border border-line-on-light text-ink font-medium">Slack</span>
                    <span className="px-2.5 py-1 rounded bg-white border border-line-on-light text-ink font-medium">Notion</span>
                    <span className="px-2.5 py-1 rounded bg-white border border-line-on-light text-ink font-medium">GitHub</span>
                    <span className="px-2.5 py-1 rounded bg-white border border-line-on-light text-ink font-medium">Jira</span>
                    <span className="px-2.5 py-1 rounded bg-white border border-line-on-light text-ink font-medium">Google Docs</span>
                    <span className="px-2.5 py-1 rounded bg-white border border-line-on-light text-muted-on-light">+33 more</span>
                  </div>
                </div>

                <div className="text-center font-mono text-xs text-muted-on-light">
                  &darr; Sliding Window Chunker &amp; Dedup
                </div>

                {/* Local Engine */}
                <div className="p-4 rounded-xl bg-ink text-white border border-line-on-dark-strong">
                  <div className="flex items-center justify-between text-xs font-mono mb-2 text-amber-300">
                    <span>LOCAL AI ENGINE (OLLAMA)</span>
                    <span className="text-emerald-400">localhost:11434</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono font-semibold">gemma4:e4b</span>
                    <span className="text-xs text-white/60">Single Combined Extraction Prompt</span>
                  </div>
                </div>

                <div className="text-center font-mono text-xs text-muted-on-light">
                  &darr; Pydantic Domain Synthesis
                </div>

                {/* Local SQLite & Skills File */}
                <div className="p-4 rounded-xl bg-paper/60 border border-line-on-light">
                  <div className="flex items-center justify-between text-xs font-mono mb-2 text-muted-on-light">
                    <span>ON-PREMISE STORAGE &amp; OUTPUT</span>
                    <span className="text-emerald-700 font-semibold">Local Only</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-ink">
                    <code className="bg-white px-2 py-1 rounded border border-line-on-light">data/company_brain.db</code>
                    <code className="bg-white px-2 py-1 rounded border border-line-on-light">output/skills_file.json</code>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line-on-light text-center">
                <span className="font-mono text-xs text-emerald-800 font-semibold">
                  ✓ 0 External API Calls • 0 Data Transmitted Outside Your Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
