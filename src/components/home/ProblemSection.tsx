export default function ProblemSection() {
  return (
    <section className="bg-paper py-20 md:py-32 border-t border-line-on-light">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
            The Core Problem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.1] mb-4">
            Documentation eats hours. AI agents still don&apos;t know how your company operates.
          </h2>
          <p className="font-body text-muted-on-light text-base sm:text-lg">
            Institutional knowledge is scattered across thousands of Slack messages, Notion pages, and GitHub PRs. Company Brain transforms unstructured chaos into executable intelligence.
          </p>
        </div>

        {/* Problem vs Solution Comparison Matrix */}
        <div className="border border-line-on-light-strong rounded-2xl overflow-hidden bg-white/70 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line-on-light">
            {/* Without Company Brain */}
            <div className="p-8 sm:p-10 space-y-8 bg-paper/30">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-700 uppercase tracking-wider font-bold">
                <span>✕</span> Without Company Brain
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-lg text-ink">
                    AI agents give generic, hallucinated answers
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-muted-on-light leading-relaxed">
                    Internal chatbots have no memory of team decisions, internal protocols, or system architecture. Employees re-explain context every single session.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-lg text-ink">
                    Manual runbooks go stale the day after they&apos;re written
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-muted-on-light leading-relaxed">
                    Engineers spend hours authoring Notion wikis that nobody maintains when services, payment gateways, or deployment scripts change.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-lg text-ink">
                    Knowledge is locked in silos across 38 tools
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-muted-on-light leading-relaxed">
                    Critical edge cases live in a 6-month-old Slack thread, while the refund policy is split between HubSpot deal notes and Stripe docs.
                  </p>
                </div>
              </div>
            </div>

            {/* With Company Brain */}
            <div className="p-8 sm:p-10 space-y-8 bg-white">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 uppercase tracking-wider font-bold">
                <span>✓</span> With Company Brain v3.2.2
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-lg text-ink">
                    Agents receive strict, executable Skill cards
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed">
                    AutoGen, LangChain, and internal bots plug into <code>skills_file.json</code> containing explicit step-by-step procedures and if/then rules.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-lg text-ink">
                    Continuous background synthesis &amp; extraction
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed">
                    Syncs automatically every 30 minutes, chunking new conversations and updating procedure cards without manual human intervention.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-lg text-ink">
                    Unified 38-connector offline knowledge base
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed">
                    A single natural-language query (<code>ycb --ask</code>) searches across Slack, GitHub, Linear, Jira, and Google Workspace in 300ms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
