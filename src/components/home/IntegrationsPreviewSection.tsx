import Link from 'next/link';
import ConnectorIcon from '@/components/ConnectorIcon';

export default function IntegrationsPreviewSection() {
  const featuredTools = [
    { name: 'Slack', slug: 'slack' },
    { name: 'Google Drive', slug: 'google_drive' },
    { name: 'Notion', slug: 'notion' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Linear', slug: 'linear' },
    { name: 'Jira', slug: 'jira' },
  ];

  return (
    <section className="bg-paper py-20 md:py-28 border-t border-line-on-light font-body">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
          Connected Tools
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight mb-4">
          Works with the apps your team already uses.
        </h2>
        <p className="font-body text-muted-on-light text-base sm:text-lg max-w-[50ch] mx-auto mb-12">
          Connect your daily workspace tools to build your knowledge base. Everything syncs safely on your schedule.
        </p>

        {/* Short row of popular tools */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12">
          {featuredTools.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white border border-line-on-light rounded-2xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center text-ink/70">
                <ConnectorIcon slug={tool.slug} className="w-8 h-8" />
              </div>
              <span className="font-display text-xs font-semibold text-ink">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/connectors"
            className="btn btn-secondary text-xs sm:text-sm py-3 px-6 rounded-full inline-flex items-center gap-2"
            data-cursor-label="ALL TOOLS"
          >
            <span>Explore all 38 supported tools</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
