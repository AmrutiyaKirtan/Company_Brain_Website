export default function StatsSection() {
  return (
    <section className="bg-black py-20 md:py-32 text-white border-t border-line-on-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-3 block">
              Performance &amp; Engineering Metrics
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Built for speed, accuracy, and absolute sovereignty.
            </h2>
          </div>
          <p className="font-body text-white/70 text-sm sm:text-base max-w-[45ch]">
            Rigorous benchmarks measured across multi-connector syncs, sentence chunking, and local LLM synthesis.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-card-dark border border-white/10 flex flex-col justify-between press-scale">
            <div>
              <span className="font-mono text-xs text-amber-300 block mb-2 font-semibold">
                01 / EFFICIENCY
              </span>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                -95%
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">
                Documentation Time
              </h3>
            </div>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              Procedures that took 45 minutes to draft manually are synthesized and formatted in under 2 minutes.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card-dark border border-white/10 flex flex-col justify-between press-scale">
            <div>
              <span className="font-mono text-xs text-amber-300 block mb-2 font-semibold">
                02 / CONNECTORS
              </span>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                38
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">
                Enterprise Sources
              </h3>
            </div>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              Unified across communication, code, tracking, HR, customer support, and analytics tools.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card-dark border border-white/10 flex flex-col justify-between press-scale">
            <div>
              <span className="font-mono text-xs text-emerald-400 block mb-2 font-semibold">
                03 / IDEMPOTENCY
              </span>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                0 dupes
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">
                Deduplicated Sync
              </h3>
            </div>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              Running sync 10 times produces the exact same result as running once. Resume interrupted syncs instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card-dark border border-white/10 flex flex-col justify-between press-scale">
            <div>
              <span className="font-mono text-xs text-emerald-400 block mb-2 font-semibold">
                04 / PRIVACY
              </span>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                100%
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">
                Local Sovereignty
              </h3>
            </div>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              Inference (Gemma 4 via Ollama), ingestion, chunking, and SQLite storage all execute on your own servers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
