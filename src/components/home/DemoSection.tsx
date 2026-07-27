'use client';

import { useState } from 'react';
import KnowledgeGraphVisual from './KnowledgeGraphVisual';

export default function DemoSection() {
  const [status, setStatus] = useState<'default' | 'submitting' | 'submitted'>('default');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // TODO: wire to real endpoint
    setTimeout(() => {
      setStatus('submitted');
    }, 1500);
  };

  return (
    <section id="demo" className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-4 block">
              Book a demo
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              See it read your own docs.
            </h2>
            <p className="font-body text-white/80 mb-10 max-w-[45ch]">
              Tell us a bit about your team. We'll set up a walkthrough using your actual Slack and docs, running locally.
            </p>

            {status === 'submitted' ? (
              <div className="bg-[#0a0806] border border-line-on-dark-strong p-8">
                <h3 className="font-display text-2xl text-white mb-2">Request received.</h3>
                <p className="font-body text-white/80">We'll be in touch shortly to set up your walkthrough.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="company" className="block font-mono text-xs text-muted-on-dark mb-2">Company Name</label>
                  <input required type="text" id="company" className="w-full bg-transparent border border-line-on-dark-strong px-4 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-[2px]" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-muted-on-dark mb-2">Work Email</label>
                  <input required type="email" id="email" className="w-full bg-transparent border border-line-on-dark-strong px-4 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-[2px]" />
                </div>
                <div>
                  <label htmlFor="size" className="block font-mono text-xs text-muted-on-dark mb-2">Team Size</label>
                  <select required id="size" className="w-full bg-transparent border border-line-on-dark-strong px-4 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-[2px] appearance-none" defaultValue="">
                    <option value="" disabled className="text-black">Select size</option>
                    <option value="1-10" className="text-black">1-10</option>
                    <option value="11-50" className="text-black">11-50</option>
                    <option value="51-200" className="text-black">51-200</option>
                    <option value="200+" className="text-black">200+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="pain" className="block font-mono text-xs text-muted-on-dark mb-2">Current documentation pain point</label>
                  <textarea required id="pain" rows={4} className="w-full bg-transparent border border-line-on-dark-strong px-4 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-[2px] resize-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-primary-dark w-full border border-line-on-dark px-6 py-4 rounded-[2px] text-white hover:bg-white hover:text-black transition-colors duration-180 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Request demo'}
                </button>
              </form>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <KnowledgeGraphVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
