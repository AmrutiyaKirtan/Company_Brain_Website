export default function WhoItsForSection() {
  const personas = [
    {
      badge: 'PROFILE_A',
      title: 'Fast-Growing Startups & Scaleups',
      desc: 'High onboarding velocity, rapidly evolving product specs, and thin documentation. Transform informal Slack consensus into official SOPs automatically.',
    },
    {
      badge: 'PROFILE_B',
      title: 'AI Agent & Tool Builders',
      desc: 'Engineers building autonomous agents with LangChain, AutoGen, or Cursor who need structured company procedures with exact decision trees.',
    },
    {
      badge: 'PROFILE_C',
      title: 'Regulated & Security-Conscious Orgs',
      desc: 'FinTech, healthcare, and enterprise teams with strict data residency requirements that cannot send internal documents to public cloud AI APIs.',
    },
    {
      badge: 'PROFILE_D',
      title: 'Distributed Teams Across 38+ SaaS Apps',
      desc: 'Teams tired of hunting across Slack threads, Notion wikis, Linear backlogs, and Jira boards just to find out how a simple process works.',
    },
  ];

  return (
    <section className="bg-paper py-20 md:py-32 border-t border-line-on-light">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
            Target Audience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.1] mb-4">
            Designed for teams that value speed and data ownership.
          </h2>
          <p className="font-body text-muted-on-light text-base sm:text-lg">
            Whether you&apos;re an engineer building autonomous workflows or a COO streamlining operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-line-on-light-strong bg-white/70 hover:bg-white hover:shadow-xl transition-all duration-200 press-scale flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-amber-800 font-bold uppercase tracking-wider block mb-3">
                  {p.badge}
                </span>
                <h3 className="font-display font-semibold text-xl text-ink mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-ink/75 text-sm sm:text-base leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
