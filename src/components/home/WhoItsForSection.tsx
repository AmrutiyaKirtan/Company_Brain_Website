export default function WhoItsForSection() {
  return (
    <section className="bg-paper py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-8 block">
          Who this is for
        </span>
        <div className="border-t border-line-on-light-strong">
          <div className="hover-row flex flex-col md:flex-row py-8 border-b border-line-on-light group transition-colors hover:bg-black/[0.02]">
            <div className="w-16 mb-4 md:mb-0 flex-shrink-0">
              <span className="font-mono text-muted-on-light group-hover:text-ink transition-colors">A</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-ink mb-2">Fast-growing startups</h3>
              <p className="font-body text-ink/80">
                High onboarding frequency, thin documentation, not enough hours to write it all down.
              </p>
            </div>
          </div>

          <div className="hover-row flex flex-col md:flex-row py-8 border-b border-line-on-light group transition-colors hover:bg-black/[0.02]">
            <div className="w-16 mb-4 md:mb-0 flex-shrink-0">
              <span className="font-mono text-muted-on-light group-hover:text-ink transition-colors">B</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-ink mb-2">Engineering teams</h3>
              <p className="font-body text-ink/80">
                Teams that want their internal AI tools and copilots to actually understand company context.
              </p>
            </div>
          </div>

          <div className="hover-row flex flex-col md:flex-row py-8 border-b border-line-on-light group transition-colors hover:bg-black/[0.02]">
            <div className="w-16 mb-4 md:mb-0 flex-shrink-0">
              <span className="font-mono text-muted-on-light group-hover:text-ink transition-colors">C</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-ink mb-2">Privacy & security-conscious companies</h3>
              <p className="font-body text-ink/80">
                Regulated industries, government contractors, and companies with strict data residency requirements that cannot send internal data to a third-party cloud AI tool.
              </p>
            </div>
          </div>

          <div className="hover-row flex flex-col md:flex-row py-8 border-b border-line-on-light group transition-colors hover:bg-black/[0.02]">
            <div className="w-16 mb-4 md:mb-0 flex-shrink-0">
              <span className="font-mono text-muted-on-light group-hover:text-ink transition-colors">D</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-xl text-ink mb-2">Any team on Slack, GitHub, Notion, or Workspace</h3>
              <p className="font-body text-ink/80">
                Ready to stop manually writing SOPs and runbooks that go stale the day after they're written.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
