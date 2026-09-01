'use client';

import { useState } from 'react';
import KnowledgeGraphVisual from './KnowledgeGraphVisual';

export default function DemoSection() {
  const [status, setStatus] = useState<'default' | 'submitting' | 'submitted'>('default');
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    teamSize: '11-50',
    connectors: ['Slack', 'GitHub', 'Notion'],
    pain: '',
  });

  const handleToggleConnector = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      connectors: prev.connectors.includes(name)
        ? prev.connectors.filter((c) => c !== name)
        : [...prev.connectors, name],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('submitted');
    }, 1200);
  };

  return (
    <section id="demo" className="bg-black py-20 md:py-32 text-white border-t border-line-on-dark relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Form */}
          <div className="w-full lg:w-1/2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-3 block">
              Schedule a Walkthrough
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              See it read your own docs in real time.
            </h2>
            <p className="font-body text-white/70 text-base mb-8 max-w-[45ch]">
              Tell us about your stack. We&apos;ll configure a custom demo reading your team&apos;s actual Slack and Notion, running entirely locally on your machine.
            </p>

            {status === 'submitted' ? (
              <div className="p-8 rounded-2xl glass-card-dark border border-emerald-500/30 text-left space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
                  ✓
                </div>
                <h3 className="font-display font-semibold text-2xl text-white">
                  Demo request confirmed!
                </h3>
                <p className="font-body text-white/80 text-sm leading-relaxed">
                  Our engineering team will reach out to <strong>{formData.email}</strong> within 4 hours to coordinate a local air-gapped walkthrough.
                </p>
                <button
                  onClick={() => setStatus('default')}
                  className="btn btn-secondary-dark text-xs py-2 px-4 rounded-lg mt-4"
                >
                  Submit another inquiry &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-body">
                <div>
                  <label htmlFor="company" className="block font-mono text-xs text-white/60 mb-1.5">
                    Company Name
                  </label>
                  <input
                    required
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-xl font-body"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-white/60 mb-1.5">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="kirtan@company.com"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-xl font-body"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-white/60 mb-2">
                    Primary Data Sources to Ingest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Slack', 'GitHub', 'Notion', 'Google Docs', 'Linear', 'Jira', 'HubSpot'].map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => handleToggleConnector(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all press-scale ${
                          formData.connectors.includes(c)
                            ? 'bg-white text-black font-semibold shadow'
                            : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        {formData.connectors.includes(c) ? `✓ ${c}` : c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="pain" className="block font-mono text-xs text-white/60 mb-1.5">
                    Current Documentation / AI Pain Point
                  </label>
                  <textarea
                    required
                    id="pain"
                    rows={3}
                    value={formData.pain}
                    onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                    placeholder="e.g. Our AI agents don't know our refund policies, or onboarding engineers takes weeks."
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors rounded-xl font-body resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary-dark w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase mt-2 shadow-lg disabled:opacity-50"
                  data-cursor-label="SUBMIT"
                >
                  {status === 'submitting' ? 'Scheduling...' : 'Request Local Walkthrough'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: 3D Knowledge Graph Visual */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <KnowledgeGraphVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
