'use client';

import { useState } from 'react';

interface PipelineStep {
  stepNumber: string;
  badge: string;
  title: string;
  shortDesc: string;
  technicalDetails: string[];
  codeSnippet: string;
  metric: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    stepNumber: '01',
    badge: 'DATA LAYER',
    title: 'Ingestion & 38 Connectors',
    shortDesc:
      'Pulls raw documents, messages, issues, and customer tickets through a unified BaseConnector interface with error isolation.',
    technicalDetails: [
      'Abstract BaseConnector enforces ingest(days_back=30) and retry_with_backoff() for 429/5xx rate limits.',
      'Dynamic registry.py loads configured connectors automatically without hardcoding.',
      'Idempotency check filters out already processed items via get_processed_source_item_ids().',
      'One failing connector logs an error and continues — never blocking the rest of the sync run.',
    ],
    codeSnippet: `class SlackConnector(BaseConnector):
    def ingest(self, days_back: int = 30) -> List[RawDataItem]:
        # Idempotent fetch with exponential backoff
        for channel in self.get_joined_channels():
            messages = self.retry_with_backoff(
                lambda: self.client.conversations_history(channel=channel.id)
            )
            for msg in messages:
                yield RawDataItem(
                    id=f"slack:{channel.id}:{msg['ts']}",
                    source=DataSourceType.SLACK,
                    content=msg['text']
                )`,
    metric: '38 Connectors • 0 Duplicates',
  },
  {
    stepNumber: '02',
    badge: 'CHUNKING ALGORITHM',
    title: 'Sliding-Window Sentence Chunker',
    shortDesc:
      'Splits messy unstructured messages and documentation into clean, context-preserving sentence windows.',
    technicalDetails: [
      'Sanitizes raw text: strips control chars, masks URLs with [URL] and emails with [EMAIL].',
      'Uses regex (?<=[.!?])\\s+ to split cleanly on sentence boundaries instead of slicing words.',
      'Sliding window: 5 sentences per chunk with 2-sentence overlap so critical procedure context is never split across boundaries.',
      'Discards low-signal chunks shorter than 20 characters automatically.',
    ],
    codeSnippet: `def chunk_document(self, text: str) -> List[str]:
    clean_text = self.mask_pii_and_urls(text)
    sentences = re.split(r'(?<=[.!?])\\s+', clean_text)
    chunks = []
    
    # 5 sentences per window, 2 sentences overlap
    for i in range(0, len(sentences), 3):
        chunk = " ".join(sentences[i:i + 5])
        if len(chunk) >= 20:
            chunks.append(chunk)
    return chunks`,
    metric: '5-sentence window • 2-sentence overlap',
  },
  {
    stepNumber: '03',
    badge: 'LLM EXTRACTION',
    title: 'Single Combined Extraction & Scoring',
    shortDesc:
      'Simultaneously classifies text type and extracts key concepts in a single optimized LLM call.',
    technicalDetails: [
      'Halves API latency by combining chunk classification and concept extraction into 1 prompt.',
      'Strict JSON output parsed with regex fallback to handle markdown code fences cleanly.',
      'Heuristic confidence scoring (0.0 to 1.0) based on chunk length, classification, and concept density.',
      'Saves structured ProcessedChunk directly to SQLite database.',
    ],
    codeSnippet: `PROMPT = """Classify this text as ONE of: procedure, policy, decision, incident, general.
Then extract 3-5 key concepts as JSON:
{ "type": "procedure", "concepts": ["Refunds", "Verification"] }"""

# Pure heuristic confidence scoring (0 LLM overhead)
score = 0.0
if len(words) > 100: score += 0.3
if chunk_type in ("procedure", "policy", "decision"): score += 0.3
if len(concepts) >= 4: score += 0.2`,
    metric: '50% Lower Latency • Pure Heuristic Scoring',
  },
  {
    stepNumber: '04',
    badge: 'SYNTHESIS ENGINE',
    title: 'Concept Clustering & Pydantic Synthesis',
    shortDesc:
      'Clusters related concepts together and prompts the LLM to write a comprehensive, standardized Skill card.',
    technicalDetails: [
      'Filters database for high-confidence chunks (confidence_score >= 0.2).',
      'Clusters chunks by primary concept with O(N) efficiency.',
      'Synthesizes complete SOPs: procedure steps, if/then decision points, prerequisites, and edge cases.',
      'Enforces strict Pydantic Skill schema before upserting to SQLite.',
    ],
    codeSnippet: `class Skill(BaseModel):
    id: str = Field(default_factory=lambda: f"skill-{uuid4()}")
    name: str
    description: str
    category: str
    procedure_steps: List[str]
    decision_points: Dict[str, str]
    prerequisites: List[str]
    success_criteria: List[str]
    exceptions_and_edge_cases: List[str]
    source_items: List[str]
    confidence_score: float`,
    metric: 'Pydantic Strict Schema • O(N) Clustering',
  },
  {
    stepNumber: '05',
    badge: 'EXPORT & Q&A',
    title: 'Curated Retrieval & Terminal Q&A',
    shortDesc:
      'Exports clean JSON / Markdown for AI agents and unlocks multi-turn terminal natural-language search via ycb --ask.',
    technicalDetails: [
      'Serializes all skills to output/skills_file.json for LangChain, AutoGen, and custom bots.',
      'Generates human-readable output/skills_file.md for employee runbooks and onboarding.',
      'ycb --ask uses fast keyword scoring & curated ranking with a 365-day freshness window.',
      'Multi-turn terminal Q&A with model switching (ycb switch model).',
    ],
    codeSnippet: `# Terminal Q&A Query execution
$ ycb --ask "how do we handle customer refund requests"

# Multi-model instant switching
$ ycb switch model gemma4:e4b
$ ycb switch model claude-sonnet-5

# Clean export for agent frameworks
$ ycb export --output output/skills.json`,
    metric: '365-day Freshness • Multi-Turn Q&A',
  },
];

export default function PipelineSection() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = PIPELINE_STEPS[activeStepIdx];

  return (
    <section id="pipeline" className="bg-black py-20 md:py-32 text-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-dark mb-3 block">
            Technical Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            The 5-stage knowledge synthesis pipeline.
          </h2>
          <p className="font-body text-white/70 text-base sm:text-lg max-w-[55ch]">
            Engineered from the ground up for privacy, idempotency, and high-accuracy extraction across 38 enterprise platforms.
          </p>
        </div>

        {/* Step Navigation Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PIPELINE_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIdx(idx)}
              className={`p-4 rounded-xl text-left border transition-all press-scale ${
                activeStepIdx === idx
                  ? 'bg-white text-black border-white shadow-xl'
                  : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <span
                className={`font-mono text-xs font-bold block mb-1 ${
                  activeStepIdx === idx ? 'text-amber-700' : 'text-amber-400/80'
                }`}
              >
                {step.stepNumber} / {step.badge}
              </span>
              <h4 className="font-display font-semibold text-sm leading-snug truncate">
                {step.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        <div className="glass-chrome-dark rounded-2xl p-6 sm:p-10 border border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Description & Technical Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs font-bold text-amber-300 border border-white/20">
                  {activeStep.stepNumber}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                  {activeStep.badge}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                {activeStep.title}
              </h3>

              <p className="font-body text-white/80 text-base leading-relaxed">
                {activeStep.shortDesc}
              </p>

              {/* Technical bullet points */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-300 block font-semibold">
                  Engineering Highlights:
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/80 font-body">
                  {activeStep.technicalDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-emerald-400 font-bold mt-0.5">&rarr;</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metric Callout */}
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-white/60">Stage Benchmark</span>
                <span className="font-mono text-xs font-semibold text-amber-300">
                  {activeStep.metric}
                </span>
              </div>
            </div>

            {/* Right Column: Code Implementation */}
            <div className="lg:col-span-6">
              <div className="rounded-xl bg-[#090705] border border-white/15 overflow-hidden shadow-2xl">
                <div className="px-4 py-3 bg-black/80 border-b border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/50">
                    src/pipeline/stage_{activeStep.stepNumber.toLowerCase()}.py
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Python 3.11
                  </span>
                </div>
                <div className="p-5 font-mono text-xs text-emerald-300/90 overflow-x-auto leading-relaxed max-h-[360px]">
                  <pre>{activeStep.codeSnippet}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
