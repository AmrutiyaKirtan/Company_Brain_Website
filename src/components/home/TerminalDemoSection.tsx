'use client';

import { useState, useEffect, useRef } from 'react';

type TerminalMode = 'ask' | 'switch-model' | 'sync' | 'export';

interface QAResult {
  query: string;
  source: string;
  confidence: number;
  provider: string;
  latencyMs: number;
  skillName: string;
  category: string;
  steps: string[];
  decisionPoints: Record<string, string>;
  prerequisites: string[];
  sources: string[];
}

const PRESET_QUERIES: Record<string, QAResult> = {
  refunds: {
    query: 'ycb --ask "how do we handle customer refund requests"',
    source: 'Curated Skills File (output/skills_file.json)',
    confidence: 0.94,
    provider: 'Local Gemma 4 (gemma4:e4b via Ollama)',
    latencyMs: 340,
    skillName: 'Handle Customer Refunds & Disputes',
    category: 'Finance & Customer Operations',
    steps: [
      'Verify transaction ID in Stripe / Billing portal against HubSpot deal record.',
      'Check customer account age — if under 30 days, approve standard refund without manager sign-off.',
      'If subscription is active, prompt user whether to cancel renewal or issue partial credit.',
      'Trigger automated confirmation receipt via Slack (#billing-ops) and customer email.',
    ],
    decisionPoints: {
      'if transaction > 30 days': 'Escalate to Tier 2 Support Lead via Linear ticket.',
      'if chargeback filed': 'Lock dispute window and export audit logs immediately.',
      'if annual contract': 'Calculate pro-rated service credits instead of direct cash refund.',
    },
    prerequisites: ['Stripe Billing Admin or HubSpot Support Agent role', 'Slack #billing-ops access'],
    sources: ['slack:C04A92K:171928341', 'notion:page:9f83a1c8', 'github:org/billing-service#142'],
  },
  onboarding: {
    query: 'ycb --ask "what is the developer onboarding workflow"',
    source: 'Curated Skills File (output/skills_file.json)',
    confidence: 0.91,
    provider: 'Local Gemma 4 (gemma4:e4b via Ollama)',
    latencyMs: 380,
    skillName: 'Engineering & Dev Environment Onboarding',
    category: 'Engineering & HR',
    steps: [
      'Grant GitHub repository access via team roster and assign 1Password engineering vault.',
      'Execute ./scripts/setup-local-env.sh to install Ollama, Python 3.11, and SQLite dependencies.',
      'Run `ycb init` to clone credentials template and run initial test sync on dev channel.',
      'Schedule 30-minute pairing session with designated buddy on Linear cycle roadmap.',
    ],
    decisionPoints: {
      'if M-series Mac': 'Enable Metal acceleration in Ollama config.',
      'if Windows cp1252 console': 'Auto-enable ASCII border fallback rendering.',
    },
    prerequisites: ['Company Google Workspace account', 'GitHub Org invite'],
    sources: ['notion:page:eng-handbook-44', 'slack:C01ENG:1698201', 'linear:team:core'],
  },
  incident: {
    query: 'ycb --ask "what is the sev-1 incident escalation protocol"',
    source: 'Curated Skills File (output/skills_file.json)',
    confidence: 0.98,
    provider: 'Local Gemma 4 (gemma4:e4b via Ollama)',
    latencyMs: 290,
    skillName: 'Sev-1 Production Incident Response & Triage',
    category: 'Site Reliability Engineering',
    steps: [
      'Create incident war-room channel in Slack named #inc-[date]-[service].',
      'Assign Incident Commander (IC), Communications Lead, and Operations Scribe.',
      'Check Datadog active monitor threshold and attach rollback commit SHA.',
      'Post statuspage update within 15 minutes of initial confirmation.',
    ],
    decisionPoints: {
      'if database latency > 500ms': 'Shift traffic to read-replica cluster immediately.',
      'if data corruption suspected': 'Pause scheduled sync pipelines and freeze SQLite writes.',
    },
    prerequisites: ['PagerDuty on-call rotation', 'Datadog & AWS production credentials'],
    sources: ['datadog:inc:883921', 'slack:C09SRE:17002938', 'notion:page:incident-runbook'],
  },
};

const MODELS_LIST = [
  { name: 'gemma4:e4b', provider: 'Local (Ollama)', type: '100% Offline', cost: '$0.00', latency: '320ms', status: 'ACTIVE' },
  { name: 'claude-sonnet-5', provider: 'Claude (Anthropic)', type: 'Cloud Frontier', cost: 'Standard', latency: '480ms', status: 'READY' },
  { name: 'gpt-5.6-terra', provider: 'OpenAI', type: 'Cloud 200k ctx', cost: 'Standard', latency: '520ms', status: 'READY' },
  { name: 'openrouter/free', provider: 'OpenRouter', type: 'Free Open-Source', cost: '$0.00', latency: '750ms', status: 'READY' },
];

export default function TerminalDemoSection() {
  const [activeMode, setActiveMode] = useState<TerminalMode>('ask');
  const [activeQueryKey, setActiveQueryKey] = useState<'refunds' | 'onboarding' | 'incident'>('refunds');
  const [selectedModel, setSelectedModel] = useState<string>('gemma4:e4b');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const activeResult = PRESET_QUERIES[activeQueryKey];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (activeMode === 'ask') {
      setIsTyping(true);
      setDisplayedText('');
      const fullText = activeResult.query;
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [activeMode, activeQueryKey, activeResult.query]);

  const handleCopy = () => {
    const textToCopy =
      activeMode === 'ask'
        ? activeResult.query
        : activeMode === 'switch-model'
        ? `ycb switch model ${selectedModel}`
        : activeMode === 'sync'
        ? 'ycb sync --interactive'
        : 'ycb export --output output/skills.json';

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="interactive-demo" className="bg-black py-20 md:py-32 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-3 block">
            Live Terminal Simulator
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-semibold tracking-tight mb-4">
            Experience the CLI workflow in real time.
          </h2>
          <p className="font-body text-white/70 text-base sm:text-lg">
            Company Brain lives in your terminal. Ask natural-language questions, switch local or cloud AI models, and inspect auto-generated procedure cards.
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'ask', label: '1. Natural Language Q&A (ycb --ask)', icon: '🔍' },
            { id: 'switch-model', label: '2. Multi-Provider LLMs (ycb switch model)', icon: '⚡' },
            { id: 'sync', label: '3. Interactive Batch Sync (ycb sync)', icon: '🔄' },
            { id: 'export', label: '4. AI Skills Export (ycb export)', icon: '📦' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as TerminalMode)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono transition-all press-scale flex items-center gap-2 ${
                activeMode === mode.id
                  ? 'bg-white text-black font-semibold shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
              data-cursor-label="SWITCH"
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div
          ref={terminalRef}
          className="glass-chrome-dark rounded-2xl overflow-hidden shadow-2xl border border-white/15 terminal-glow"
        >
          {/* macOS Titlebar */}
          <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block"></span>
              <span className="ml-3 font-mono text-[11px] text-white/50">
                ycb terminal — zsh (offline-cluster:11434)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Gemma 4 • Local
              </span>
              <button
                onClick={handleCopy}
                className="font-mono text-[11px] text-white/70 hover:text-white px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 press-scale"
                data-cursor-label="COPY"
              >
                {copied ? '✓ Copied' : 'Copy command'}
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-white/90 bg-[#090705]/95 min-h-[460px] flex flex-col justify-between">
            {/* ── MODE 1: YCB --ASK ── */}
            {activeMode === 'ask' && (
              <div>
                {/* Sample Prompt Chips */}
                <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-white/10">
                  <span className="text-xs text-white/50">Sample queries:</span>
                  {[
                    { key: 'refunds', label: 'Refund Policies & Disputes' },
                    { key: 'onboarding', label: 'Engineering Onboarding' },
                    { key: 'incident', label: 'Sev-1 Incident Protocol' },
                  ].map((chip) => (
                    <button
                      key={chip.key}
                      onClick={() => setActiveQueryKey(chip.key as any)}
                      className={`text-xs px-3 py-1 rounded-md transition-all press-scale ${
                        activeQueryKey === chip.key
                          ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Command Line */}
                <div className="flex items-center gap-2 mb-6 text-amber-300">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-white">{displayedText}</span>
                  {isTyping && <span className="w-2 h-4 bg-white inline-block animate-pulse"></span>}
                </div>

                {/* Output Card */}
                {!isTyping && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs border border-emerald-500/30">
                            Confidence: {(activeResult.confidence * 100).toFixed(0)}%
                          </span>
                          <span className="text-xs text-white/60">Category: {activeResult.category}</span>
                        </div>
                        <span className="text-[11px] text-white/40">{activeResult.latencyMs}ms local inference</span>
                      </div>

                      <h4 className="font-display font-semibold text-lg text-white mb-3 flex items-center gap-2">
                        <span>📋</span> {activeResult.skillName}
                      </h4>

                      {/* Procedure Steps */}
                      <div className="mb-4">
                        <span className="text-xs text-amber-300/90 uppercase tracking-wider block mb-2 font-semibold">
                          Procedure Steps:
                        </span>
                        <ol className="space-y-2 text-xs md:text-sm text-white/85 pl-4 list-decimal">
                          {activeResult.steps.map((step, idx) => (
                            <li key={idx} className="leading-normal">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Decision Points */}
                      <div className="mb-4">
                        <span className="text-xs text-amber-300/90 uppercase tracking-wider block mb-2 font-semibold">
                          Decision Rules (If / Then):
                        </span>
                        <div className="grid grid-cols-1 gap-1.5 text-xs">
                          {Object.entries(activeResult.decisionPoints).map(([condition, action]) => (
                            <div key={condition} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-white/80 bg-black/40 p-2 rounded">
                              <span className="text-amber-300 font-mono font-semibold">{condition}</span>
                              <span className="text-white/40 hidden sm:inline">&rarr;</span>
                              <span className="text-white/90">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contributing Lineage */}
                      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px] text-white/50">
                        <span>Source lineage:</span>
                        {activeResult.sources.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── MODE 2: SWITCH MODEL ── */}
            {activeMode === 'switch-model' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-amber-300 mb-4">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-white">ycb switch model</span>
                </div>

                <p className="text-xs text-white/60 mb-4">
                  Select which model answers queries and synthesizes structured skills. Switch freely between 100% offline Ollama and frontier cloud APIs:
                </p>

                <div className="space-y-2">
                  {MODELS_LIST.map((m) => (
                    <div
                      key={m.name}
                      onClick={() => setSelectedModel(m.name)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all press-scale ${
                        selectedModel === m.name
                          ? 'bg-white/10 border-amber-400/60 shadow-md'
                          : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${selectedModel === m.name ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`}></span>
                        <div>
                          <div className="font-semibold text-white text-sm flex items-center gap-2">
                            <span>{m.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-white/70 font-normal">
                              {m.provider}
                            </span>
                          </div>
                          <span className="text-xs text-white/50">{m.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-white/60">Cost: {m.cost}</span>
                        <span className="text-white/60">~{m.latency}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          selectedModel === m.name ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white/5 text-white/40'
                        }`}>
                          {selectedModel === m.name ? 'SELECTED' : 'SELECT'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-black/50 border border-white/10 rounded-lg text-xs text-white/70">
                  <span className="text-amber-300 font-bold">CLI Shortcut:</span> Run <code className="text-white bg-white/10 px-1 py-0.5 rounded">ycb switch model {selectedModel}</code> anytime directly.
                </div>
              </div>
            )}

            {/* ── MODE 3: INTERACTIVE BATCH SYNC ── */}
            {activeMode === 'sync' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-amber-300">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-white">ycb sync --interactive</span>
                </div>

                {/* Rich Live Terminal State Panel */}
                <div className="p-5 rounded-xl bg-black border border-line-on-dark-strong space-y-4">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
                    <span className="text-amber-300 font-bold">🧠 COMPANY BRAIN v3.2.2 — SYNC DASHBOARD</span>
                    <span className="text-emerald-400">STATUS: INGESTING (BATCH 1/19)</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-white/70">
                      <span>Sliding Window Chunker Progress</span>
                      <span className="text-white font-mono">100% [5-sentence window / 2-overlap]</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[78%] transition-all duration-500"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                    <div className="p-2.5 bg-white/5 rounded border border-white/5">
                      <span className="text-white/40 block text-[10px]">CONNECTORS</span>
                      <span className="font-bold text-white text-sm">38 Active</span>
                    </div>
                    <div className="p-2.5 bg-white/5 rounded border border-white/5">
                      <span className="text-white/40 block text-[10px]">ITEMS INGESTED</span>
                      <span className="font-bold text-white text-sm">1,420 Items</span>
                    </div>
                    <div className="p-2.5 bg-white/5 rounded border border-white/5">
                      <span className="text-white/40 block text-[10px]">DEDUPED</span>
                      <span className="font-bold text-emerald-400 text-sm">0 Duplicates</span>
                    </div>
                    <div className="p-2.5 bg-white/5 rounded border border-white/5">
                      <span className="text-white/40 block text-[10px]">SYNTHESIZED</span>
                      <span className="font-bold text-amber-300 text-sm">48 Skill Cards</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#110d0a] rounded border border-amber-500/20 text-xs text-amber-200/90">
                    <span className="font-bold">[Batch 1 Complete]:</span> 2 raw items processed &rarr; 6 high-confidence concept clusters ready.
                    <div className="mt-2 text-white/70 flex gap-3">
                      <span>[1] Next batch</span>
                      <span>[2] Synthesize & STOP</span>
                      <span>[3] Exit</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── MODE 4: EXPORT SKILLS FILE ── */}
            {activeMode === 'export' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-amber-300">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-white">ycb export --output output/skills.json</span>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/10 text-xs text-white/80 font-mono max-h-[280px] overflow-y-auto">
                  <pre className="text-emerald-300">{`{
  "version": "1.0.0",
  "company_name": "Your Company",
  "generated_at": "2026-09-01T20:15:00Z",
  "total_skills": 48,
  "skills": [
    {
      "id": "skill-9f83-refunds",
      "name": "Handle Customer Refunds & Disputes",
      "category": "finance",
      "confidence_score": 0.94,
      "procedure_steps": [
        "Verify Stripe transaction ID",
        "Check account age (< 30 days)",
        "Issue credit / cancel subscription"
      ],
      "decision_points": {
        "if_disputed": "escalate_to_lead"
      },
      "prerequisites": ["Stripe Admin"],
      "source_items": [
        "slack:C04A92K:171928341",
        "notion:page:9f83a1c8",
        "github:org/billing#142"
      ]
    }
  ]
}`}</pre>
                </div>
                <p className="text-xs text-white/60">
                  Plug directly into AutoGen, LangChain, Cursor, or custom autonomous agents.
                </p>
              </div>
            )}

            {/* Bottom Status bar */}
            <div className="pt-4 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Idempotency Verified (zero data re-processing)
              </span>
              <span>v3.2.2 • Offline Local SQLite</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
