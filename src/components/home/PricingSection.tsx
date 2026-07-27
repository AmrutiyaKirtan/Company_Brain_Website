import Link from 'next/link';

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-paper py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-8 block">
          Pricing
        </span>
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* Solo Tier */}
          <div className="pricing-card w-full lg:w-1/2 border border-line-on-light-strong bg-paper p-8 md:p-12 transition-colors hover:bg-white flex flex-col cursor-pointer">
            <span className="font-mono text-muted-on-light text-xs uppercase tracking-widest mb-4">Solo</span>
            <h3 className="font-display text-3xl text-ink mb-2">For one team</h3>
            {/* PLACEHOLDER PRICING: INR figure pending confirmation */}
            <div className="text-lg font-mono text-ink mb-6">₹[TBD] / user / month</div>
            <p className="font-body text-ink/80 mb-10 min-h-[60px]">
              Everything you need to stop writing SOPs by hand on a single team.
            </p>
            
            <div className="flex-1 mb-10">
              {/* PLACEHOLDER FEATURES: not confirmed product specs */}
              <ul className="space-y-4 font-body text-ink/80 text-sm">
                <li className="flex gap-3"><span className="text-line-on-light-strong">•</span> Up to 3 connected sources (Slack, GitHub, Notion, or others)</li>
                <li className="flex gap-3"><span className="text-line-on-light-strong">•</span> Runs on a single machine via Ollama</li>
                <li className="flex gap-3"><span className="text-line-on-light-strong">•</span> Unlimited generated skill files</li>
                <li className="flex gap-3"><span className="text-line-on-light-strong">•</span> Community support</li>
              </ul>
            </div>
            
            <Link href="#demo" className="btn-primary inline-flex justify-center border border-ink px-6 py-3 rounded-[2px] text-ink hover:bg-ink hover:text-white transition-colors duration-180 w-full md:w-auto text-center font-medium">
              Get Solo
            </Link>
          </div>

          {/* Enterprise Tier */}
          <div className="pricing-card w-full lg:w-1/2 border border-line-on-dark-strong bg-ink p-8 md:p-12 transition-colors hover:bg-[#15100d] flex flex-col cursor-pointer text-white">
            <span className="font-mono text-muted-on-dark text-xs uppercase tracking-widest mb-4">Enterprise</span>
            <h3 className="font-display text-3xl text-white mb-2">For the whole org</h3>
            <div className="text-lg font-mono text-white mb-6">Custom / priced to your scale</div>
            <p className="font-body text-white/80 mb-10 min-h-[60px]">
              For regulated or security-conscious teams running Company Brain across the company.
            </p>
            
            <div className="flex-1 mb-10">
              {/* PLACEHOLDER FEATURES: not confirmed product specs */}
              <ul className="space-y-4 font-body text-white/80 text-sm">
                <li className="flex gap-3"><span className="text-line-on-dark-strong">•</span> All connectors, unlimited sources</li>
                <li className="flex gap-3"><span className="text-line-on-dark-strong">•</span> Dedicated deployment support (on-prem or private cluster)</li>
                <li className="flex gap-3"><span className="text-line-on-dark-strong">•</span> SSO, audit logs, and custom retention policies</li>
                <li className="flex gap-3"><span className="text-line-on-dark-strong">•</span> Dedicated support channel</li>
              </ul>
            </div>
            
            <Link href="#demo" className="btn-primary-dark inline-flex justify-center border border-white px-6 py-3 rounded-[2px] text-white hover:bg-white hover:text-black transition-colors duration-180 w-full md:w-auto text-center font-medium">
              Contact
            </Link>
          </div>

        </div>
        <div className="text-center">
          <p className="font-mono text-xs text-muted-on-light max-w-2xl mx-auto">
            Prices shown are a starting point for discussion, not a live checkout, as Company Brain is pre-revenue.
          </p>
        </div>
      </div>
    </section>
  );
}
