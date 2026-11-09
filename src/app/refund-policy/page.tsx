import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund and Cancellation Policy',
  description: 'Refund and cancellation policy for Your Company Brain software licenses and subscriptions.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-on-light mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Refund Policy</span>
        </div>

        <header className="mb-12 pb-8 border-b border-line-on-light">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light block mb-2 font-semibold">
            Billing &amp; Payments
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="font-mono text-xs text-muted-on-light">
            Last Updated: October 29, 2026 &bull; Compliant with Indian Consumer Protection Rules &amp; Razorpay Merchant Standards
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-ink/85">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              1. Current Free Licensing (Solo, Test &amp; Max)
            </h2>
            <p>
              The <strong>Solo Tier</strong> is free forever ($0 perpetual), the <strong>Test Tier</strong> is provided free of charge for capability evaluation, and the <strong>Max Tier</strong> is currently offered free for now with zero billing. Because no fees are charged for software licenses issued during this free promotional period, refund requests do not apply.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              2. 7-Day Money-Back Guarantee (Applicable if Paid Tiers Resume)
            </h2>
            <p>
              In the event that paid tiers or paid license upgrades are activated on the site in the future, customers will be protected by our standard <strong>100% full refund guarantee within 7 calendar days</strong> of their initial transaction date if the software does not meet their technical expectations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              3. Subscription Cancellation
            </h2>
            <p>
              You can cancel your ongoing monthly subscription at any time. To cancel:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Email us at <a href="mailto:companybrain@gmail.com?subject=Subscription%20Cancellation%20Request" className="underline font-semibold">companybrain@gmail.com</a> from the email address registered with your license.</li>
              <li>Include your registered email and/or Razorpay Payment ID.</li>
              <li>Upon cancellation, your subscription will not renew at the end of the current billing cycle. You will retain full access to all 39 connectors until the expiration of your prepaid period.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              4. How to Request a Refund
            </h2>
            <p>
              To initiate a refund under our 7-day guarantee:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Send an email to <a href="mailto:companybrain@gmail.com?subject=Refund%20Request" className="underline font-semibold">companybrain@gmail.com</a> with the subject line <code>Refund Request - [Your Registered Email]</code>.</li>
              <li>Provide your Razorpay Order ID or Payment ID (found on your payment receipt email).</li>
              <li>Our team will acknowledge and review your request within 24–48 business hours.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              5. Refund Processing Timelines
            </h2>
            <p>
              Once approved, refunds are initiated immediately through our payment partner, <strong>Razorpay</strong>. The funds will be credited back to your original payment method according to banking cycles:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>UPI / Instant Netbanking:</strong> Usually 24 to 48 hours.</li>
              <li><strong>Credit / Debit Cards:</strong> Typically 5 to 7 business days, depending on your card issuer bank.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              6. Chargebacks and Support Contact
            </h2>
            <p>
              Before initiating a bank chargeback, we kindly encourage you to contact us directly. We are committed to resolving payment issues promptly and amicably.
            </p>
            <div className="p-4 rounded-xl bg-paper-dark/40 border border-line-on-light font-mono text-xs">
              <div><strong>Billing Support:</strong> Your Company Brain</div>
              <div>Email: <a href="mailto:companybrain@gmail.com" className="underline">companybrain@gmail.com</a></div>
              <div>Location: Surat, Gujarat, India</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
