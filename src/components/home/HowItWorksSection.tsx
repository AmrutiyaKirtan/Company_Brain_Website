export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-black py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-8 block">
          How it works
        </span>
        <div className="absolute left-6 md:left-1/2 top-12 bottom-0 w-[1px] bg-line-on-dark transform md:-translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-[39px] top-12 bottom-0 w-[1px] bg-line-on-dark md:hidden"></div>

        <div className="space-y-0">
          {[
            {
              step: '01',
              label: 'CONNECT',
              title: 'Connect your tools',
              desc: 'Company Brain connects directly to the tools your company already uses, including Slack, GitHub, Notion, Google Docs, and more.'
            },
            {
              step: '02',
              label: 'INGEST',
              title: 'Ingest in batches',
              desc: 'It pulls in messages, documents, issues, and discussions in manageable batches, not one giant dump.'
            },
            {
              step: '03',
              label: 'PROCESS LOCALLY',
              title: 'Process on your own hardware',
              desc: 'A local AI model (Gemma 4, via Ollama) runs entirely on your own infrastructure to read and classify each piece of content.'
            },
            {
              step: '04',
              label: 'EXTRACT',
              title: "Extract what's useful",
              desc: 'It identifies procedures, decisions, policies, and key concepts while filtering out the noise.'
            },
            {
              step: '05',
              label: 'SYNTHESIZE',
              title: 'Synthesize skill files',
              desc: 'Related information is clustered and written into clean, structured skill files with step-by-step guidance, decision points, and edge cases.'
            },
            {
              step: '06',
              label: 'DELIVER',
              title: 'Deliver as structured JSON',
              desc: 'Skill files export as structured JSON, ready to plug directly into any AI agent or chatbot with a single command.'
            }
          ].map((item) => (
            <div key={item.step} className="hover-row dark-section relative flex flex-col md:flex-row md:items-center py-12 group hover:bg-white/[0.02] transition-colors">
              <div className="md:w-1/2 md:pr-12 md:text-right flex flex-col md:items-end z-10 pl-16 md:pl-0 mb-4 md:mb-0 relative">
                <span className="font-mono text-muted-on-dark text-xs mb-2 group-hover:text-white transition-colors">{item.step}/{item.label}</span>
                <h3 className="font-display font-semibold text-white text-2xl">{item.title}</h3>
                
                {/* Mobile line & node */}
                <div className="md:hidden absolute left-[15px] top-[14px] w-2 h-2 border border-line-on-dark-strong bg-black rotate-45 z-20 group-hover:border-white transition-colors"></div>
              </div>

              {/* Desktop node */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 border border-line-on-dark-strong bg-black rotate-45 z-20 group-hover:border-white transition-colors"></div>

              <div className="md:w-1/2 md:pl-12 z-10 pl-16 md:pl-0">
                <p className="font-body text-white/70 max-w-[40ch] group-hover:text-white/90 transition-colors">
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
