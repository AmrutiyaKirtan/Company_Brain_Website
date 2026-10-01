import type { Metadata } from 'next';
import Link from 'next/link';
import TerminalDemoSection from '@/components/home/TerminalDemoSection';
import PipelineSection from '@/components/home/PipelineSection';
import SkillInspectorSection from '@/components/home/SkillInspectorSection';
import WhyOfflineSection from '@/components/home/WhyOfflineSection';
import StatsSection from '@/components/home/StatsSection';
import WhoItsForSection from '@/components/home/WhoItsForSection';

export const metadata: Metadata = {
  title: 'Technical Architecture & Deep Dive | YCB',
  description:
    "Explore YCB's technical architecture: 38 unified connectors, local model inference by default, Pydantic skill synthesis, and terminal CLI tools.",
};

export default function HowItWorksTechnicalPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      {/* Hero Header */}
      <section className="bg-black text-white pt-36 pb-20 px-6 border-b border-line-on-dark relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg mb-6 text-xs font-mono text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Engineering Architecture &bull; v3.2.2</span>
          </div>

          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
            Under the hood of <span className="highlight-gradient">Your Company Brain</span>.
          </h1>

          <p className="font-body text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            A local-first knowledge extraction pipeline that connects to 38 workspace tools, runs local models by default, and synthesizes structured procedures for autonomous agents.
          </p>

          {/* Quick CLI Reference Box */}
          <div className="max-w-2xl mx-auto bg-white/[0.04] border border-white/15 rounded-2xl p-6 text-left shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Quick Start CLI Commands
              </span>
              <span className="font-mono text-[11px] text-white/50">PyPI: ycb</span>
            </div>

            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                <span className="text-white/70"># 1. Install CLI</span>
                <span className="text-amber-200 font-semibold">pip install ycb</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                <span className="text-white/70"># 2. Initialize &amp; License</span>
                <span className="text-amber-200 font-semibold">ycb init</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                <span className="text-white/70"># 3. Connect Data Source</span>
                <span className="text-amber-200 font-semibold">ycb connect github</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                <span className="text-white/70"># 4. Sync Knowledge</span>
                <span className="text-amber-200 font-semibold">ycb sync</span>
              </div>
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                <span className="text-white/70"># 5. Ask Questions</span>
                <span className="text-amber-200 font-semibold">ycb --ask &quot;deployment process&quot;</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs font-mono text-white/50 pt-2">
              <span>Local inference by default (Gemma 4 via Ollama)</span>
              <Link href="/#pricing" className="text-amber-300 hover:underline">
                Get license key &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Stats */}
      <StatsSection />

      {/* Interactive CLI Terminal Simulation */}
      <TerminalDemoSection />

      {/* 5-Stage Ingestion Pipeline Architecture */}
      <PipelineSection />

      {/* Pydantic Skill Card Inspector */}
      <SkillInspectorSection />

      {/* Local-first Offline Architecture */}
      <WhyOfflineSection />

      {/* Personas / Use Cases */}
      <WhoItsForSection />
    </div>
  );
}
