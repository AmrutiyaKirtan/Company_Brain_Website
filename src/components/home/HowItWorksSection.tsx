export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Connect your everyday tools',
      desc: 'Connect your tools in a few minutes across Slack, Google Drive, Notion, and GitHub. Setup is straightforward and requires no complicated infrastructure.',
    },
    {
      step: '02',
      title: 'Ask questions in plain English',
      desc: 'Type what you need to know just like messaging a teammate. Ask about internal procedures, past decisions, or project updates.',
    },
    {
      step: '03',
      title: 'Get instant, private answers',
      desc: 'Receive direct answers with source references to the exact message or document. Everything runs on your own hardware by default.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-black py-20 md:py-28 border-t border-line-on-dark font-body text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-3 block">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-semibold tracking-tight">
            Three simple steps to a searchable company brain.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-3xl font-bold text-amber-400/80 mb-6 block">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-white/20 text-xl font-mono">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
