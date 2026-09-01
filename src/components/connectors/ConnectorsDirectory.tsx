'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { connectors, type Connector } from '@/data/connectors';
import ConnectorIcon from '@/components/ConnectorIcon';

type CategoryFilter = 'All' | 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';

export default function ConnectorsDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<CategoryFilter>('All');
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);

  const filteredConnectors = useMemo(() => {
    return connectors.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.ingests.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.dedupKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.authMethod.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedTier === 'All') return matchesSearch;
      if (selectedTier === 'Tier 1') return matchesSearch && c.tier === 1;
      if (selectedTier === 'Tier 2') return matchesSearch && c.tier === 2;
      if (selectedTier === 'Tier 3') return matchesSearch && c.tier === 3;
      if (selectedTier === 'Tier 4') return matchesSearch && c.tier === 4;
      return matchesSearch;
    });
  }, [searchQuery, selectedTier]);

  return (
    <div className="bg-paper min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light">
              Connectors Directory
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              38 Active Integrations
            </span>
          </div>
          <h1 className="font-display text-ink text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Connect every data source in your company.
          </h1>
          <p className="font-body text-muted-on-light text-base sm:text-lg max-w-[62ch] leading-relaxed">
            All 38 connectors inherit our idempotent <code>BaseConnector</code> architecture with automatic exponential backoff, error isolation, and deduplication.
          </p>
        </header>

        {/* Controls: Search Bar & Tier Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-on-light text-xs font-mono">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 38 connectors, auth, or dedup keys..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line-on-light-strong bg-white/70 backdrop-blur-sm text-sm text-ink placeholder:text-muted-on-light focus:outline-none focus:border-ink transition-colors font-body"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-on-light hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tier Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-paper-dark/60 rounded-xl border border-line-on-light">
            {[
              { id: 'All', label: 'All (38)' },
              { id: 'Tier 1', label: 'Tier 1: Core Comms (11)' },
              { id: 'Tier 2', label: 'Tier 2: Dev & Search (10)' },
              { id: 'Tier 3', label: 'Tier 3: PM & Tracking (8)' },
              { id: 'Tier 4', label: 'Tier 4: CRM & HR (10)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTier(tab.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all press-scale ${
                  selectedTier === tab.id
                    ? 'bg-ink text-white font-medium shadow-sm'
                    : 'text-ink/70 hover:text-ink hover:bg-black/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-on-light mb-4 px-1">
          <span>Showing {filteredConnectors.length} of 38 connectors</span>
          <span>Click any connector for schema & auth details</span>
        </div>

        {/* 38 Connectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredConnectors.map((c) => (
            <div
              key={c.slug}
              onClick={() => setSelectedConnector(c)}
              className="p-5 rounded-xl border border-line-on-light bg-white/60 hover:bg-white hover:border-line-on-light-strong hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between press-scale group"
              data-cursor-label="INSPECT"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-paper flex items-center justify-center text-ink group-hover:scale-105 transition-transform">
                    <ConnectorIcon slug={c.slug} size={24} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-paper text-muted-on-light border border-line-on-light">
                    Tier {c.tier}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-lg text-ink mb-1 group-hover:text-black">
                  {c.name}
                </h3>
                <p className="font-body text-xs text-ink/75 line-clamp-2 mb-4 leading-relaxed">
                  {c.ingests}
                </p>
              </div>

              <div className="pt-3 border-t border-line-on-light flex items-center justify-between font-mono text-[11px] text-muted-on-light">
                <span className="truncate max-w-[150px]"><code>{c.dedupKey}</code></span>
                <span className="text-ink font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Detailed Inspector Sheet */}
        {selectedConnector && (
          <div
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
            onClick={() => setSelectedConnector(null)}
          >
            <div
              className="glass-chrome-dark rounded-2xl max-w-lg w-full p-6 sm:p-8 text-white border border-white/20 shadow-2xl relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedConnector(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white font-mono text-sm press-scale"
              >
                ✕
              </button>

              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/15">
                  <ConnectorIcon slug={selectedConnector.slug} size={28} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-2xl text-white">
                    {selectedConnector.name}
                  </h3>
                  <span className="font-mono text-xs text-amber-300">
                    {selectedConnector.tierName}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/50 block text-[10px] uppercase mb-1">
                    Authentication Method:
                  </span>
                  <span className="text-white font-semibold">{selectedConnector.authMethod}</span>
                </div>

                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/50 block text-[10px] uppercase mb-1">
                    Ingested Content & Entities:
                  </span>
                  <span className="text-white/90 font-body text-xs">{selectedConnector.ingests}</span>
                </div>

                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/50 block text-[10px] uppercase mb-1">
                    Deduplication & Idempotency Key:
                  </span>
                  <code className="text-emerald-300 text-xs">{selectedConnector.dedupKey}</code>
                </div>

                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/50 block text-[10px] uppercase mb-1">
                    Enable in .env:
                  </span>
                  <code className="text-amber-300 text-xs">CONNECTORS_ENABLED={selectedConnector.slug}</code>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-white/50">Status: 100% Offline Compatible</span>
                <button
                  onClick={() => setSelectedConnector(null)}
                  className="btn btn-primary-dark text-xs py-2 px-4 rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Callout */}
        <div className="mt-16 border border-line-on-light-strong p-8 rounded-2xl bg-white/60 font-body flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-xl text-ink mb-1">
              Need a custom internal connector?
            </h3>
            <p className="text-sm text-muted-on-light max-w-xl">
              All connectors implement our open-source <code>BaseConnector</code> abstract class. Writing a custom connector for your proprietary API takes under 50 lines of Python.
            </p>
          </div>
          <Link
            href="/#demo"
            className="btn btn-primary text-xs py-3 px-6 rounded-full whitespace-nowrap"
            data-cursor-label="DEMO"
          >
            Request Custom Connector &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
