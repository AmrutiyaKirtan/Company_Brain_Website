'use client';

import { useState } from 'react';
import LicenseModal from '@/components/licensing/LicenseModal';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PricingSection() {
  // Modal states
  const [modalTier, setModalTier] = useState<'solo' | 'max' | 'test' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Success license modal state
  const [issuedLicense, setIssuedLicense] = useState<{
    licenseKey: string;
    email: string;
    tier: string;
    expiresAt: string | null;
  } | null>(null);

  const handleOpenModal = (tier: 'solo' | 'max' | 'test') => {
    setModalTier(tier);
    setErrorMsg('');
  };

  const handleCloseInputModal = () => {
    setModalTier(null);
    setEmail('');
    setPhone('');
    setErrorMsg('');
    setLoading(false);
  };

  // Submit handler for Free (Solo or Test)
  const handleIssueFree = async (tier: 'solo' | 'test') => {
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/license/issue-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to issue license');
      }

      setIssuedLicense({
        licenseKey: data.license_key,
        email: data.email,
        tier: data.plan_tier,
        expiresAt: data.expires_at,
      });

      handleCloseInputModal();
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Submit handler for Paid Max Tier (Razorpay)
  const handleCheckoutMax = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Verify Razorpay SDK is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK is not loaded yet. Please refresh the page.');
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'YCB (Your Company Brain)',
        description: 'Max Tier Subscription (₹299/mo)',
        order_id: orderData.order_id,
        prefill: {
          email: email.trim().toLowerCase(),
          contact: phone || '',
        },
        theme: {
          color: '#14100c',
        },
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            setLoading(true);
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            setIssuedLicense({
              licenseKey: verifyData.license_key,
              email: verifyData.email,
              tier: verifyData.plan_tier,
              expiresAt: verifyData.expires_at,
            });

            handleCloseInputModal();
          } catch (verifyErr: any) {
            setErrorMsg(verifyErr.message || 'Verification error');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setErrorMsg(resp.error?.description || 'Payment failed');
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not initiate payment');
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (modalTier === 'max') {
      handleCheckoutMax();
    } else if (modalTier === 'solo' || modalTier === 'test') {
      handleIssueFree(modalTier);
    }
  };

  return (
    <section id="pricing" className="bg-paper py-20 md:py-32 border-t border-line-on-light font-body">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light mb-3 block">
            Pricing &amp; Editions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight mb-4">
            Start offline for free. Unlock all 38 connectors when ready.
          </h2>
          <p className="font-body text-ink/75 text-base sm:text-lg">
            Instant self-serve license key issuance. Deploy on your local terminal with 100% offline sovereignty.
          </p>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* 1. Solo Tier ($0) */}
          <div className="border border-line-on-light-strong bg-white p-7 sm:p-8 rounded-3xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-on-light uppercase tracking-widest font-semibold">
                  Solo Developer
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                  FREE FOREVER
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-2">
                Solo Tier
              </h3>
              <div className="text-3xl font-display font-bold text-ink mb-4">
                $0 <span className="text-xs font-mono text-muted-on-light font-normal">/ perpetual</span>
              </div>

              <p className="font-body text-ink/75 text-xs sm:text-sm mb-6 leading-relaxed">
                Essential local knowledge synthesis for individual engineers and founders.
              </p>

              <ul className="space-y-2.5 font-body text-xs sm:text-sm text-ink/85 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>2 Basic Connectors</strong> (Google Docs + Slack)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>100% offline local inference (Gemma 4 via Ollama)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Terminal natural-language search (<code>ycb --ask</code>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Single-machine hardware binding (1 seat)</span>
                </li>
                <li className="flex items-start gap-2 text-ink/40">
                  <span>✕</span>
                  <span>36 remaining enterprise connectors</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenModal('solo')}
              className="btn btn-secondary text-xs py-3 rounded-xl w-full text-center"
              data-cursor-label="FREE"
            >
              Generate Free License &rarr;
            </button>
          </div>

          {/* 2. Max Tier (₹299/mo) - Highlighted */}
          <div className="border-2 border-amber-500/60 bg-[#14100c] text-white p-7 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top recommendation ribbon */}
            <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-300 uppercase tracking-widest font-semibold">
                  Pro / Max
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-400/20 text-amber-200 border border-amber-400/30 font-semibold">
                  ALL 38 CONNECTORS
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                Max Tier
              </h3>
              <div className="text-3xl font-display font-bold text-white mb-4">
                ₹299 <span className="text-xs font-mono text-white/60 font-normal">/ month</span>
              </div>

              <p className="font-body text-white/80 text-xs sm:text-sm mb-6 leading-relaxed">
                Full enterprise connector suite with multi-provider model routing and priority chunking.
              </p>

              <ul className="space-y-2.5 font-body text-xs sm:text-sm text-white/85 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>All 38 Connectors Unlocked</strong> (GitHub, Notion, Jira, Linear, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Multi-provider model switcher (Claude, OpenAI, OpenRouter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Idempotent batch sync &amp; deduplication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Unlimited generated Skill cards (<code>skills_file.json</code>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Instant Razorpay activation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleOpenModal('max')}
              className="btn btn-primary-dark text-xs py-3 rounded-xl w-full text-center font-semibold tracking-wider"
              data-cursor-label="BUY"
            >
              Get Max (₹299/mo) &rarr;
            </button>
          </div>

          {/* 3. Enterprise Tier (Custom) */}
          <div className="border border-line-on-light-strong bg-white p-7 sm:p-8 rounded-3xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-on-light uppercase tracking-widest font-semibold">
                  Enterprise
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-ink border border-line-on-light font-semibold">
                  CUSTOM SCALE
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-2">
                Enterprise Fleet
              </h3>
              <div className="text-3xl font-display font-bold text-ink mb-4">
                Custom <span className="text-xs font-mono text-muted-on-light font-normal">/ cluster</span>
              </div>

              <p className="font-body text-ink/75 text-xs sm:text-sm mb-6 leading-relaxed">
                For security-conscious organizations deploying across multi-tenant air-gapped clusters.
              </p>

              <ul className="space-y-2.5 font-body text-xs sm:text-sm text-ink/85 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>All 38 connectors with OAuth 2.0 &amp; SAML SSO</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Dedicated private GPU cluster deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Custom connector engineering &amp; data retention policies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Multi-seat licensing with manual provisioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>99.9% uptime SLA &amp; dedicated support engineer</span>
                </li>
              </ul>
            </div>

            <a
              href="mailto:companybrain@gmail.com?subject=YCB%20Enterprise%20Fleet%20Inquiry"
              className="btn btn-secondary text-xs py-3 rounded-xl w-full text-center"
              data-cursor-label="CONTACT"
            >
              Contact Enterprise Sales &rarr;
            </a>
          </div>
        </div>

        {/* Permanent Test Tier Trigger */}
        <div className="text-center pt-2">
          <p className="text-xs font-mono text-muted-on-light">
            Need to evaluate full 38-connector capabilities?{' '}
            <button
              onClick={() => handleOpenModal('test')}
              className="text-ink font-semibold underline hover:text-amber-800 transition-colors"
            >
              Generate Free Test License &rarr;
            </button>
          </p>
        </div>
      </div>

      {/* Input Modal for Solo / Max / Test */}
      {modalTier && (
        <div className="fixed inset-0 z-[1900] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white text-ink border border-line-on-light rounded-3xl p-6 sm:p-8 shadow-2xl font-body">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
                  {modalTier === 'max'
                    ? 'Pro / Max Checkout'
                    : modalTier === 'test'
                    ? 'Test Tier License'
                    : 'Solo Tier License'}
                </span>
                <h3 className="font-display text-xl font-bold text-ink">
                  {modalTier === 'max'
                    ? 'Subscribe to Max (₹299/mo)'
                    : 'Get your license key'}
                </h3>
              </div>
              <button
                onClick={handleCloseInputModal}
                className="text-ink/40 hover:text-ink text-base font-mono p-1 rounded hover:bg-black/5"
              >
                ✕
              </button>
            </div>

            <p className="font-body text-xs text-ink/75 mb-5 leading-relaxed">
              {modalTier === 'max'
                ? 'Enter your work email and contact. You will be prompted with Razorpay to complete your monthly subscription.'
                : 'Enter your email below. Your license key will be generated immediately with zero payment required.'}
            </p>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-muted-on-light mb-1 font-semibold">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  className="w-full bg-paper border border-line-on-light px-3.5 py-2.5 text-sm text-ink rounded-lg focus:outline-none focus:border-ink transition-colors font-mono"
                />
              </div>

              {modalTier === 'max' && (
                <div>
                  <label className="block font-mono text-[11px] text-muted-on-light mb-1 font-semibold">
                    Phone Number (for Razorpay UPI/SMS receipt)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+919876543210"
                    className="w-full bg-paper border border-line-on-light px-3.5 py-2.5 text-sm text-ink rounded-lg focus:outline-none focus:border-ink transition-colors font-mono"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md mt-2"
              >
                {loading
                  ? 'Processing...'
                  : modalTier === 'max'
                  ? 'Proceed to Payment (₹299) →'
                  : 'Generate License Key →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success License Key Modal */}
      {issuedLicense && (
        <LicenseModal
          isOpen={true}
          onClose={() => setIssuedLicense(null)}
          licenseKey={issuedLicense.licenseKey}
          email={issuedLicense.email}
          tier={issuedLicense.tier}
          expiresAt={issuedLicense.expiresAt}
        />
      )}
    </section>
  );
}
