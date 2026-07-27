export default function ProblemSection() {
  return (
    <section className="bg-paper py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-4 block">
          The problem
        </span>
        <h2 className="font-display text-ink text-3xl md:text-4xl mb-12">
          Documentation eats hours. AI agents still don't know your company.
        </h2>
        <div className="border-t border-line-on-light-strong">
          <div className="hover-row flex flex-col md:flex-row py-8 border-b border-line-on-light group transition-colors hover:bg-black/[0.02]">
            <div className="w-full md:w-48 mb-4 md:mb-0">
              <span className="font-mono text-muted-on-light text-sm group-hover:text-ink transition-colors">ISSUE_01</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-ink mb-3">Onboarding is slow</h3>
              <p className="font-body text-ink/80 max-w-[60ch]">
                Every new hire spends hours digging through Slack history, documentation, and GitHub repos just to understand how the team works. That is time they could spend actually contributing.
              </p>
            </div>
          </div>
          
          <div className="hover-row flex flex-col md:flex-row py-8 border-b border-line-on-light group transition-colors hover:bg-black/[0.02]">
            <div className="w-full md:w-48 mb-4 md:mb-0">
              <span className="font-mono text-muted-on-light text-sm group-hover:text-ink transition-colors">ISSUE_02</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-ink mb-3">AI agents lack context</h3>
              <p className="font-body text-ink/80 max-w-[60ch]">
                Internal AI tools and chatbots have no memory of what the company has already decided, built, or documented. Employees re-explain context every session, and agents give generic or wrong answers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
