'use client';

import { useState, useEffect } from 'react';

const LIVE_STREAM_ITEMS = [
  { source: 'Slack', text: '“Refunds under $100 within 30 days don’t need finance approval.”', tag: 'slack-C04', color: '#4A154B' },
  { source: 'GitHub', text: '“PR #204: Add exponential backoff retry to BaseConnector ingest()”', tag: 'github#204', color: '#24292e' },
  { source: 'Notion', text: '“Engineering Runbook: Sev-1 escalation path & standby failover”', tag: 'notion:wiki', color: '#000000' },
  { source: 'Jira', text: '“PROD-882: Database latency spike resolved with read-replica”', tag: 'jira:882', color: '#0052CC' },
  { source: 'Linear', text: '“Team roadmap: 38 enterprise connectors registered in registry.py”', tag: 'linear:core', color: '#5E6AD2' },
];

const SYNTHESIZED_SKILLS = [
  {
    name: 'Handle Customer Refunds & Disputes',
    category: 'Finance & Support',
    confidence: '96%',
    steps: ['Verify Stripe ID', 'Check 30-day window', 'Issue credit / refund'],
  },
  {
    name: 'Sev-1 Incident Escalation & Rollback',
    category: 'SRE & DevOps',
    confidence: '98%',
    steps: ['Declare Slack war-room', 'Freeze CI/CD pipelines', 'Failover replica'],
  },
  {
    name: 'Developer Environment Setup',
    category: 'Engineering',
    confidence: '94%',
    steps: ['Install Ollama & Gemma 4', 'Run ycb init', 'Verify SQLite sync'],
  },
];

export default function HeroPipelineVisual() {
  const [activeStreamIdx, setActiveStreamIdx] = useState(0);
  const [activeSkillIdx, setActiveSkillIdx] = useState(0);

  useEffect(() => {
    const streamInterval = setInterval(() => {
      setActiveStreamIdx((prev) => (prev + 1) % LIVE_STREAM_ITEMS.length);
    }, 3200);

    const skillInterval = setInterval(() => {
      setActiveSkillIdx((prev) => (prev + 1) % SYNTHESIZED_SKILLS.length);
    }, 4500);

    return () => {
      clearInterval(streamInterval);
      clearInterval(skillInterval);
    };
  }, []);

  const currentStream = LIVE_STREAM_ITEMS[activeStreamIdx];
  const currentSkill = SYNTHESIZED_SKILLS[activeSkillIdx];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden text-left font-body">
      {/* Visual Window Header */}
      <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
          </div>
          <span className="font-mono text-xs font-semibold text-white/90 ml-2">
            YCB Live Knowledge Synthesis Flow
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Sliding Window Active
          </span>
          <span className="font-mono text-[11px] text-white/50 hidden sm:inline">
            100% On-Premise SQLite
          </span>
        </div>
      </div>

      {/* 3-Column Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 gap-6 md:gap-4 items-center bg-[#090705]/80">
        {/* Step 1: Ingestion Stream */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              01. Raw Data Streams
            </span>
            <span className="text-white/40">38 Connectors</span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] min-h-[140px] flex flex-col justify-between transition-all duration-300 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-white/15 text-white font-mono text-[10px] font-semibold">
                  {currentStream.source}
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  {currentStream.tag}
                </span>
              </div>
              <p className="font-body text-xs text-white/85 line-clamp-3 leading-relaxed">
                {currentStream.text}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 pt-2 border-t border-white/10">
              <span>✓ Ingested &amp; Deduplicated</span>
            </div>
          </div>
        </div>

        {/* Arrow connector 1 */}
        <div className="hidden md:flex md:col-span-1 justify-center text-white/30 font-mono text-lg">
          &rarr;
        </div>

        {/* Step 2: Processing Engine */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              02. Local LLM Chunker
            </span>
            <span className="text-amber-300 font-bold">Ollama</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-400/30 bg-amber-950/20 min-h-[140px] flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-[10px] text-amber-300 font-bold uppercase tracking-wider block mb-1">
                Sliding Window (5S / 2O)
              </span>
              <div className="font-mono text-xs text-white font-semibold mb-1">
                gemma4:e4b
              </div>
              <p className="font-body text-[11px] text-white/75 leading-tight">
                Single combined prompt classifies type &amp; extracts key concept arrays.
              </p>
            </div>

            <div className="text-[10px] font-mono text-amber-300/80 flex justify-between pt-2 border-t border-amber-400/20">
              <span>Latency: 320ms</span>
              <span>Cost: $0.00</span>
            </div>
          </div>
        </div>

        {/* Arrow connector 2 */}
        <div className="hidden md:flex md:col-span-1 justify-center text-white/30 font-mono text-lg">
          &rarr;
        </div>

        {/* Step 3: Synthesized Output */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              03. Structured Skill Card
            </span>
            <span className="text-emerald-400 font-bold">AI Agent Ready</span>
          </div>

          <div className="p-4 rounded-xl border border-emerald-400/30 bg-emerald-950/20 min-h-[140px] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  {currentSkill.confidence} Conf.
                </span>
                <span className="text-[10px] font-mono text-emerald-300/70">
                  {currentSkill.category}
                </span>
              </div>
              <h4 className="font-display font-semibold text-xs text-white line-clamp-1 mb-1">
                {currentSkill.name}
              </h4>
              <ul className="text-[10px] text-white/70 font-mono space-y-0.5">
                {currentSkill.steps.slice(0, 2).map((s, i) => (
                  <li key={i} className="truncate">
                    &bull; {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[10px] font-mono text-emerald-300/90 pt-2 border-t border-emerald-400/20 flex justify-between">
              <span>output/skills.json</span>
              <span className="font-bold text-white">ycb --ask</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
