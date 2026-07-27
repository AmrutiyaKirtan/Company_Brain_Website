export default function WhyOfflineSection() {
  return (
    <section id="why-offline" className="bg-paper py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-4 block">
              Why offline matters
            </span>
            <h2 className="shine font-display text-4xl md:text-5xl text-ink mb-8 leading-[1.1]">
              Your data never leaves your servers.
            </h2>
            <div className="space-y-6 font-body text-ink/80 text-lg max-w-[50ch]">
              <p>
                Company Brain is built on a fundamental principle: your internal knowledge is your most valuable asset, and it shouldn't be sent to third-party APIs.
              </p>
              <p>
                By running local models directly on your own infrastructure, you maintain complete data sovereignty while still getting state-of-the-art AI synthesis. No data processing agreements required.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="border border-dashed border-line-on-light-strong p-8 rounded-[2px] relative bg-paper">
              <div className="absolute -top-3 left-4 bg-paper px-2 font-mono text-xs text-muted-on-light">
                YOUR INFRASTRUCTURE
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8">
                <div className="flex flex-col gap-2">
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink">Slack</span>
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink">Notion</span>
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink">GitHub</span>
                </div>
                
                <div className="text-line-on-light-strong hidden md:block">→</div>
                <div className="text-line-on-light-strong md:hidden">↓</div>
                
                <div className="flex flex-col gap-2">
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink font-semibold">Ollama</span>
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink font-semibold">Gemma 4</span>
                </div>
                
                <div className="text-line-on-light-strong hidden md:block">→</div>
                <div className="text-line-on-light-strong md:hidden">↓</div>
                
                <div className="flex flex-col gap-2">
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink">skill_001.json</span>
                  <span className="inline-block border border-line-on-light-strong px-3 py-1 font-mono text-xs text-ink">skill_002.json</span>
                </div>
              </div>
              
              <div className="mt-8 text-center border-t border-line-on-light pt-4">
                <span className="font-mono text-xs text-ink">✕ No cloud API call. No third-party server. No exceptions.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
