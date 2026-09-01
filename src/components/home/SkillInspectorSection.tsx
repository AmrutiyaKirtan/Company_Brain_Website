'use client';

import { useState } from 'react';

interface SkillExample {
  id: string;
  name: string;
  category: string;
  confidence: number;
  description: string;
  prerequisites: string[];
  procedureSteps: { title: string; detail: string }[];
  decisionPoints: { condition: string; action: string }[];
  exceptions: string[];
  successCriteria: string[];
  sourceItems: { source: string; id: string; name: string }[];
  jsonRaw: object;
}

const SKILL_EXAMPLES: SkillExample[] = [
  {
    id: 'skill-refunds',
    name: 'Handle Customer Refunds & Billing Disputes',
    category: 'Finance & Support',
    confidence: 0.96,
    description:
      'Standardized procedure for evaluating customer refund eligibility, processing Stripe charge adjustments, and recording customer retention notes.',
    prerequisites: [
      'Stripe Billing Admin or HubSpot Support Specialist permissions',
      'Access to #billing-ops Slack channel for manager sign-offs',
    ],
    procedureSteps: [
      {
        title: 'Step 1: Lookup and verify transaction',
        detail: 'Locate customer Stripe Customer ID (cus_xxx) via email in HubSpot. Cross-reference invoice charge ID and verify card authorization status.',
      },
      {
        title: 'Step 2: Check 30-day freshness window',
        detail: 'If transaction was billed within the last 30 calendar days, proceed directly without escalation. If > 30 days, tag @finance-lead in #billing-ops.',
      },
      {
        title: 'Step 3: Issue credit or cash reversal',
        detail: 'Execute refund in Stripe Dashboard with reason "Requested by customer". If customer wishes to stay on free tier, downgrade plan immediately.',
      },
      {
        title: 'Step 4: Send confirmation & update ticket',
        detail: 'Dispatch automated receipt, log resolution in HubSpot ticket, and mark conversation closed with tag "refund_processed".',
      },
    ],
    decisionPoints: [
      { condition: 'if chargeback or dispute filed', action: 'Do not issue manual refund. Forward evidence to Stripe dispute portal within 7 days.' },
      { condition: 'if annual enterprise contract', action: 'Calculate prorated service credits; cash refunds require CFO approval.' },
      { condition: 'if churn reason is missing feature', action: 'Log feature request to Linear roadmap with customer tag before closing ticket.' },
    ],
    exceptions: [
      'Suspicious multiple small transactions from same IP &rarr; lock account and alert Security team.',
      'International bank transfers (SEPA/Wire) take 5–10 business days to clear.',
    ],
    successCriteria: [
      'Stripe refund status indicates "succeeded".',
      'HubSpot ticket marked resolved with refund amount tagged.',
      'Confirmation email sent to user.',
    ],
    sourceItems: [
      { source: 'slack', id: 'slack:C04A92K:171928341', name: '#billing-ops: "Clarification on 30-day refund policy"' },
      { source: 'notion', id: 'notion:page:9f83a1c8', name: 'Finance Wiki / Customer Refund SOP v2' },
      { source: 'github', id: 'github:org/billing#142', name: 'PR #142: Webhook handler for Stripe dispute status' },
    ],
    jsonRaw: {
      version: '1.0.0',
      id: 'skill-refunds-9f83',
      name: 'Handle Customer Refunds & Billing Disputes',
      category: 'finance',
      confidence_score: 0.96,
      procedure_steps: [
        'Lookup and verify transaction in Stripe & HubSpot',
        'Check 30-day freshness window',
        'Issue credit or cash reversal in Stripe',
        'Send confirmation & close HubSpot ticket',
      ],
      decision_points: {
        'if_chargeback_filed': 'forward_evidence_to_dispute_portal',
        'if_annual_contract': 'calculate_prorated_service_credits',
      },
      prerequisites: ['Stripe Billing Admin', 'HubSpot Specialist'],
      success_criteria: ['Stripe status succeeded', 'Ticket resolved'],
      exceptions_and_edge_cases: ['Suspicious multi-tx patterns lock account'],
      source_items: ['slack:C04A92K:171928341', 'notion:page:9f83a1c8', 'github:org/billing#142'],
    },
  },
  {
    id: 'skill-incident',
    name: 'Sev-1 Production Incident Response & Rollback',
    category: 'Site Reliability Engineering',
    confidence: 0.98,
    description:
      'Urgent escalation workflow for mission-critical service outages, database failovers, and rollback execution across staging and production clusters.',
    prerequisites: [
      'On-call PagerDuty rotation schedule',
      'AWS / Cloudflare production deployment tokens',
    ],
    procedureSteps: [
      {
        title: 'Step 1: Declare incident in Slack',
        detail: 'Trigger /incident in Slack to automatically provision #inc-[date]-[service] channel, Zoom war-room bridge, and notify executive stakeholders.',
      },
      {
        title: 'Step 2: Assign core responder roles',
        detail: 'Designate Incident Commander (IC), Operations Lead (OL), and Internal/External Communications Lead.',
      },
      {
        title: 'Step 3: Freeze deployments & evaluate rollback',
        detail: 'Lock CI/CD deployment pipelines. Check Datadog telemetry to identify fault-inducing commit SHA. Roll back to last verified stable image tag.',
      },
      {
        title: 'Step 4: Update status page & write post-mortem',
        detail: 'Publish status update within 15 mins. Schedule blameless post-mortem meeting within 48 hours of service stabilization.',
      },
    ],
    decisionPoints: [
      { condition: 'if database latency > 500ms', action: 'Trigger immediate failover to hot standby read-replica.' },
      { condition: 'if data corruption suspected', action: 'Halt all background sync workers and trigger point-in-time snapshot recovery.' },
    ],
    exceptions: [
      'Third-party cloud infrastructure outages (AWS/Cloudflare) &rarr; post status updates attributing upstream provider.',
    ],
    successCriteria: [
      'Datadog p99 latency returns below 120ms baseline.',
      'Zero 5xx errors recorded over a 15-minute observation period.',
    ],
    sourceItems: [
      { source: 'datadog', id: 'datadog:inc:883921', name: 'Monitor Alert: API Gateway 5xx Spike' },
      { source: 'slack', id: 'slack:C09SRE:17002938', name: '#sre-team: "Post-mortem for database connection pool exhaustion"' },
      { source: 'notion', id: 'notion:page:incident-runbook', name: 'Engineering Handbook / Sev-1 Incident Runbook' },
    ],
    jsonRaw: {
      version: '1.0.0',
      id: 'skill-incident-8839',
      name: 'Sev-1 Production Incident Response & Rollback',
      category: 'infrastructure',
      confidence_score: 0.98,
      procedure_steps: [
        'Declare incident via Slack /incident command',
        'Assign Incident Commander and Comms Lead',
        'Lock deployments and execute rollback to stable tag',
        'Publish status update and schedule blameless post-mortem',
      ],
      decision_points: {
        'if_db_latency_high': 'trigger_standby_replica_failover',
        'if_data_corruption': 'halt_workers_and_snapshot_restore',
      },
      prerequisites: ['PagerDuty On-call', 'Production Tokens'],
      success_criteria: ['p99 latency < 120ms', '0 5xx errors for 15 mins'],
      source_items: ['datadog:inc:883921', 'slack:C09SRE:17002938', 'notion:page:incident-runbook'],
    },
  },
];

export default function SkillInspectorSection() {
  const [selectedSkillIdx, setSelectedSkillIdx] = useState(0);
  const [viewTab, setViewTab] = useState<'visual' | 'json' | 'lineage'>('visual');
  const [copied, setCopied] = useState(false);

  const activeSkill = SKILL_EXAMPLES[selectedSkillIdx];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeSkill.jsonRaw, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="bg-paper py-20 md:py-32 border-t border-line-on-light">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
              Synthesized Knowledge Cards
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight">
              Machine-readable procedure cards for AI agents.
            </h2>
          </div>
          <p className="font-body text-ink/70 text-sm sm:text-base max-w-[45ch]">
            Instead of raw messy text dumps, Company Brain extracts actionable step-by-step procedures with strict domain schema enforcement.
          </p>
        </div>

        {/* Example Selector Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="font-mono text-xs text-muted-on-light">Select example:</span>
          {SKILL_EXAMPLES.map((skill, idx) => (
            <button
              key={skill.id}
              onClick={() => setSelectedSkillIdx(idx)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all press-scale ${
                selectedSkillIdx === idx
                  ? 'bg-ink text-white font-medium shadow-md'
                  : 'bg-paper-dark/60 text-ink/80 hover:bg-paper-dark border border-line-on-light'
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>

        {/* Card Inspector Container */}
        <div className="bg-white rounded-2xl border border-line-on-light-strong shadow-xl overflow-hidden">
          {/* Card Header & Tab Switcher */}
          <div className="px-6 py-5 bg-[#faf6ee] border-b border-line-on-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                  {(activeSkill.confidence * 100).toFixed(0)}% Confidence
                </span>
                <span className="font-mono text-xs text-muted-on-light">{activeSkill.category}</span>
              </div>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-ink">
                {activeSkill.name}
              </h3>
            </div>

            {/* Visual / JSON / Lineage Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-paper rounded-xl border border-line-on-light self-start sm:self-auto">
              {[
                { id: 'visual', label: 'Visual SOP Card' },
                { id: 'json', label: 'Pydantic JSON' },
                { id: 'lineage', label: 'Source Lineage' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setViewTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all press-scale ${
                    viewTab === tab.id
                      ? 'bg-ink text-white font-medium shadow-sm'
                      : 'text-ink/70 hover:text-ink hover:bg-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8">
            {/* ── TAB 1: VISUAL SOP CARD ── */}
            {viewTab === 'visual' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <p className="font-body text-ink/80 text-base leading-relaxed">
                  {activeSkill.description}
                </p>

                {/* Prerequisites */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-900 font-bold block mb-2">
                    Prerequisites & Required Access:
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 font-body">
                    {activeSkill.prerequisites.map((p, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-amber-600 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Procedure Steps */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-on-light font-bold block mb-4">
                    Execution Procedure Steps:
                  </span>
                  <div className="space-y-4">
                    {activeSkill.procedureSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-line-on-light bg-[#fdfcf9] hover:border-line-on-light-strong transition-all"
                      >
                        <h4 className="font-display font-semibold text-sm sm:text-base text-ink mb-1">
                          {step.title}
                        </h4>
                        <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Points (If / Then Rules) */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-on-light font-bold block mb-3">
                    Decision Matrix (If / Then Branching):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeSkill.decisionPoints.map((dp, i) => (
                      <div key={i} className="p-4 rounded-xl bg-paper/50 border border-line-on-light">
                        <span className="font-mono text-xs font-bold text-amber-800 block mb-1">
                          IF: {dp.condition}
                        </span>
                        <span className="font-body text-xs sm:text-sm text-ink/80 block">
                          &rarr; {dp.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 2: PYDANTIC STRICT JSON ── */}
            {viewTab === 'json' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-on-light">
                    Domain Model: <code>Skill(BaseModel)</code>
                  </span>
                  <button
                    onClick={handleCopyJson}
                    className="btn btn-primary text-xs py-1.5 px-3 rounded-lg"
                  >
                    {copied ? '✓ Copied Schema' : 'Copy JSON'}
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-[#14100c] text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-line-on-dark shadow-inner">
                  <pre>{JSON.stringify(activeSkill.jsonRaw, null, 2)}</pre>
                </div>
              </div>
            )}

            {/* ── TAB 3: SOURCE DATA LINEAGE ── */}
            {viewTab === 'lineage' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <p className="font-body text-ink/80 text-sm">
                  Every card retains cryptographically auditable lineage back to exact source messages across your tools, with zero data duplication.
                </p>

                <div className="space-y-3">
                  {activeSkill.sourceItems.map((src, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-line-on-light bg-[#fdfcf9] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-ink text-white font-mono text-[11px] uppercase">
                          {src.source}
                        </span>
                        <div>
                          <h4 className="font-semibold text-sm text-ink">{src.name}</h4>
                          <span className="font-mono text-xs text-muted-on-light">{src.id}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 self-start sm:self-auto">
                        Dedup Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
