export default function StatsSection() {
  return (
    <section className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-4 block">
          By the numbers
        </span>
        <div className="border border-line-on-dark-strong p-6 font-mono bg-[#0a0806]">
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-line-on-dark">
            <div className="w-3 h-3 rounded-full bg-line-on-dark-strong"></div>
            <div className="w-3 h-3 rounded-full bg-line-on-dark-strong"></div>
            <div className="w-3 h-3 rounded-full bg-line-on-dark-strong"></div>
            <span className="ml-4 text-xs text-muted-on-dark">sys.log</span>
          </div>

          <div className="flex flex-col">
            <div className="hover-row dark-section flex flex-col md:flex-row items-start md:items-center py-6 border-b border-line-on-dark group transition-colors hover:bg-white/[0.02]">
              <span className="text-muted-on-dark text-xs w-12 group-hover:text-white transition-colors">01</span>
              <p className="flex-1 text-white/80 text-sm md:pr-12 group-hover:text-white transition-colors mb-4 md:mb-0">
                Faster documentation. A task that takes 45 minutes manually takes about 2 minutes
              </p>
              <span className="text-3xl font-display text-white group-hover:text-white transition-colors">−95%</span>
            </div>

            <div className="hover-row dark-section flex flex-col md:flex-row items-start md:items-center py-6 border-b border-line-on-dark group transition-colors hover:bg-white/[0.02]">
              <span className="text-muted-on-dark text-xs w-12 group-hover:text-white transition-colors">02</span>
              <p className="flex-1 text-white/80 text-sm md:pr-12 group-hover:text-white transition-colors mb-4 md:mb-0">
                Idempotent, deduplicated processing. It is safe to pause and resume, and never reprocesses the same content twice
              </p>
              <span className="text-3xl font-display text-white group-hover:text-white transition-colors">0 dupes</span>
            </div>

            <div className="hover-row dark-section flex flex-col md:flex-row items-start md:items-center py-6 group transition-colors hover:bg-white/[0.02]">
              <span className="text-muted-on-dark text-xs w-12 group-hover:text-white transition-colors">03</span>
              <p className="flex-1 text-white/80 text-sm md:pr-12 group-hover:text-white transition-colors mb-4 md:mb-0">
                Inference, ingestion, and storage all run on your own infrastructure
              </p>
              <span className="text-3xl font-display text-white group-hover:text-white transition-colors">100% local</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
