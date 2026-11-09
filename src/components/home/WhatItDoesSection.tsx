export default function WhatItDoesSection() {
  const cards = [
    {
      badge: 'Natural Search',
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Instant Natural Answers',
      description: "Ask questions naturally via terminal (ycb --ask) or local web dashboard. Receive direct synthesis with exact document and Slack thread citations.",
      detail: '→ Cited to original Slack, Notion & Git commits',
    },
    {
      badge: 'Zero Cloud Leakage',
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Local Hardware Boundary',
      description: 'Your internal discussions, code repositories, and customer files are parsed locally with SQLite and offline Ollama. Zero corporate IP leaves your perimeter.',
      detail: '→ Encrypted local storage & zero telemetry',
    },
    {
      badge: 'Autonomous Agents',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Machine-Readable Skills',
      description: 'Automatically synthesizes unstructured company workflows into structured JSON procedure cards that Cursor, Claude Code, and custom AI bots can execute.',
      detail: '→ Exports clean output/skills_file.json',
    },
  ];

  return (
    <section className="bg-paper py-20 md:py-28 border-t border-line-on-light font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block font-semibold">
            Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight leading-tight">
            Everything your team knows, instantly searchable and agent-ready.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-line-on-light rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-paper border border-line-on-light flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/5 text-ink/70 font-semibold border border-black/10">
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>
              <div className="pt-4 border-t border-line-on-light font-mono text-xs text-amber-800 font-semibold">
                {card.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
