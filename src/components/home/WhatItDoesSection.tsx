export default function WhatItDoesSection() {
  const cards = [
    {
      icon: (
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'Find answers in seconds',
      description: "Ask questions naturally and get clear answers drawn from your team's conversations and documents.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Runs on your computer',
      description: 'Runs on your own computer by default, keeping your private discussions and files secure on your device.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Onboard teammates faster',
      description: 'Help new teammates find answers to internal processes on day one without asking busy colleagues.',
    },
  ];

  return (
    <section className="bg-paper py-20 md:py-28 border-t border-line-on-light font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
            What It Does
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight leading-tight">
            Everything your team knows, instantly searchable.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-line-on-light rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-paper border border-line-on-light flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">
                  {card.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
