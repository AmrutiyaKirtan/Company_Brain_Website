'use client';

import { useState } from 'react';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseKey: string;
  email: string;
  tier: string;
  expiresAt: string | null;
}

export default function LicenseModal({
  isOpen,
  onClose,
  licenseKey,
  email,
  tier,
  expiresAt,
}: LicenseModalProps) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const loginCommand = `ycb login`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(loginCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const formattedTier = tier.toUpperCase();
  const validityText =
    tier === 'max'
      ? '30 Days (Renews Monthly)'
      : 'Free Forever (Perpetual)';

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14100c] text-white border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden font-body">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none rounded-full" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-lg">
              ✓
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                License Issued Successfully
              </h3>
              <p className="font-mono text-xs text-white/60">
                Plan: <span className="text-amber-300 font-semibold">{formattedTier}</span> &bull; {validityText}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-lg font-mono p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Registered Email */}
        <div className="text-xs text-white/70 mb-4 bg-white/[0.03] p-3 rounded-xl border border-white/10 flex justify-between items-center">
          <span className="font-mono text-white/50">Registered Email:</span>
          <span className="font-mono font-medium text-white">{email}</span>
        </div>

        {/* License Key Box */}
        <div className="mb-6">
          <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-on-dark mb-1.5 font-semibold">
            Your License Key
          </label>
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-black border border-amber-400/30 font-mono text-base font-bold text-amber-300">
            <span className="tracking-wider select-all">{licenseKey}</span>
            <button
              onClick={handleCopyKey}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-all press-scale"
            >
              {copiedKey ? '✓ Copied' : 'Copy Key'}
            </button>
          </div>
        </div>

        {/* Quick CLI Activation Instructions */}
        <div className="space-y-3 mb-6">
          <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-on-dark font-semibold">
            Activate in your CLI
          </label>
          <div className="p-3.5 rounded-xl bg-black border border-white/10 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white/90">{loginCommand}</span>
            </div>
            <button
              onClick={handleCopyCmd}
              className="ml-3 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-all press-scale whitespace-nowrap"
            >
              {copiedCmd ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed font-body">
            Run <code className="text-amber-200 bg-white/5 px-1 py-0.5 rounded">ycb login</code> in your terminal and enter your license key and email when prompted.
          </p>
        </div>

        {/* Done / Close Button */}
        <button
          onClick={onClose}
          className="btn btn-primary-dark w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
}
