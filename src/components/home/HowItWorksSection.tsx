export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      label: 'CONNECT',
      title: 'Connect across 38 tools',
      desc: 'Company Brain hooks into Slack, Notion, GitHub, Google Workspace, Linear, and Jira via unified BaseConnector handlers with rate-limit backoff.',
    },
    {
      step: '02',
      label: 'INGEST',
      title: 'Idempotent batch ingestion',
      desc: 'Pulls messages, pull requests, docs, and incident threads in structured batches with cryptographic deduplication. It never processes the same item twice.',
    },
    {
      step: '03',
      label: 'PROCESS LOCALLY',
      title: 'Local AI model inference',
      desc: 'Runs Gemma 4 locally via Ollama on localhost:11434. Your raw messages and confidential discussions never leave your internal infrastructure.',
    },
    {
      step: '04',
      label: 'EXTRACT',
      title: 'Single-call concept extraction',
      desc: 'Simultaneously classifies content type (procedure, policy, decision, incident) and extracts key concepts, halving API latency with heuristic confidence scoring.',
    },
    {
      step: '05',
      label: 'SYNTHESIZE',
      title: 'Synthesize Pydantic Skill cards',
      desc: 'Related concepts are clustered into domain models with explicit step-by-step procedures, prerequisites, if/then decision rules, and edge cases.',
    },
    {
      step: '06',
      label: 'DELIVER',
      title: 'Export & terminal Q&A',
      desc: 'Outputs clean skills_file.json for autonomous AI agents (LangChain, AutoGen) and enables multi-turn terminal natural-language search with ycb --ask.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-black py-20 md:py-32 overflow-hidden border-t border-line-on-dark">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-3 block">
            End-to-End Workflow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-semibold tracking-tight">
            How Company Brain works
          </h2>
        </div>

        {/* Central timeline line */}
        <div className="absolute left-6 md:left-1/2 top-32 bottom-12 w-[1px] bg-line-on-dark transform md:-translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-[39px] top-32 bottom-12 w-[1px] bg-line-on-dark md:hidden"></div>

        <div className="space-y-0">
          {steps.map((item) => (
            <div
              key={item.step}
              className="hover-row dark-section relative flex flex-col md:flex-row md:items-center py-12 group hover:bg-white/[0.02] transition-all rounded-xl"
            >
              <div className="md:w-1/2 md:pr-12 md:text-right flex flex-col md:items-end z-10 pl-16 md:pl-0 mb-4 md:mb-0 relative">
                <span className="font-mono text-amber-400 text-xs mb-2 group-hover:text-amber-300 transition-colors font-semibold">
                  {item.step} / {item.label}
                </span>
                <h3 className="font-display font-semibold text-white text-xl sm:text-2xl">
                  {item.title}
                </h3>

                {/* Mobile diamond node */}
                <div className="md:hidden absolute left-[15px] top-[14px] w-2.5 h-2.5 border border-line-on-dark-strong bg-black rotate-45 z-20 group-hover:border-amber-400 transition-colors"></div>
              </div>

              {/* Desktop center diamond node */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-line-on-dark-strong bg-black rotate-45 z-20 group-hover:border-amber-400 group-hover:scale-125 transition-all"></div>

              <div className="md:w-1/2 md:pl-12 z-10 pl-16 md:pl-0">
                <p className="font-body text-white/75 text-sm sm:text-base max-w-[42ch] group-hover:text-white transition-colors leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
