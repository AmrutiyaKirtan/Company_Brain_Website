import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Your Company Brain (YCB). Licensing terms, acceptable use, and governing agreements.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/terms',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-on-light mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Terms of Service</span>
        </div>

        <header className="mb-12 pb-8 border-b border-line-on-light">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light block mb-2 font-semibold">
            Legal &amp; Agreements
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-muted-on-light">
            Last Updated: October 29, 2026 &bull; Effective Immediately
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-ink/85">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website at <a href="https://yourcompanybrain.vercel.app" className="underline hover:text-ink">yourcompanybrain.vercel.app</a>, downloading or installing the Your Company Brain package (<code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">pip install ycb</code>), or obtaining a software license key, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not install or use the software.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              2. License Grants &amp; Software Tiers
            </h2>
            <p>
              Subject to your compliance with these terms, YCB grants you a non-exclusive, non-transferable, revocable license to install and run the software according to your tier:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Solo Tier ($0 / Free Forever):</strong> Granted for individual developer use on a single computer. Includes access to the 2 starter connectors (Google Docs and Slack) and local terminal querying.
              </li>
              <li>
                <strong>Max Tier ($0 / Free for now):</strong> Currently granted free of charge during our public launch period. Includes full access to all 39 connectors, multi-provider model routing, and automatic sync features. We reserve the right to introduce paid renewal terms or changes to tier pricing in the future with advance notice.
              </li>
              <li>
                <strong>Enterprise Tier:</strong> Custom commercial terms negotiated under a separate Enterprise Agreement.
              </li>
              <li>
                <strong>Test Tier:</strong> Provided for short-term evaluation of connector capabilities with no production warranty.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              3. Local-First Operation &amp; Data Responsibility
            </h2>
            <p>
              YCB executes locally on your workstation or infrastructure. You are solely responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Configuring authentication tokens, API credentials, and environment variables for your third-party SaaS services (e.g. Slack tokens, GitHub Personal Access Tokens, Google OAuth secrets).</li>
              <li>Maintaining backups and securing local databases (<code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">data/company_brain.db</code>).</li>
              <li>Ensuring that your ingestion of corporate data complies with your organization&apos;s internal security, NDA, and confidentiality policies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              4. Payment &amp; Subscription Terms
            </h2>
            <p>
              The Solo, Test, and Max tiers are currently provided free of charge with zero billing required. Should paid plans or recurring subscriptions be reintroduced in the future, payments will be processed via authorized gateways (such as Razorpay) and billed in advance of each cycle. For current refund principles, refer to our <Link href="/refund-policy" className="underline font-semibold hover:text-ink">Refund &amp; Cancellation Policy</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              5. Intellectual Property
            </h2>
            <p>
              The YCB software, website layout, documentation, logos, and synthesis architecture are the intellectual property of Your Company Brain and its founders. Third-party brand names and logos referenced in connector catalogs (e.g., Slack, GitHub, Notion, Jira) belong to their respective trademark holders and are referenced strictly for interoperability identification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              6. Disclaimer of Warranties
            </h2>
            <p className="uppercase text-xs font-mono text-ink/70">
              The software and website are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that synthesized skill procedures will be completely error-free or uninterrupted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall YCB or its operators be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data loss, or system downtime resulting from your use of the software. Our total liability for any claim shall not exceed the amount actually paid by you to YCB during the previous twelve (12) months.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms or the software shall be subject to the exclusive jurisdiction of the competent courts in Surat, Gujarat, India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              9. Contact
            </h2>
            <p>
              If you have questions regarding these Terms, contact us at:
            </p>
            <div className="p-4 rounded-xl bg-paper-dark/40 border border-line-on-light font-mono text-xs space-y-1">
              <div><strong>Business Entity:</strong> Your Company Brain (TODO: Add registered legal entity name upon corporate incorporation)</div>
              <div><strong>Registered Address:</strong> Surat, Gujarat, India (TODO: Add full registered street address)</div>
              <div><strong>Email:</strong> <a href="mailto:companybrain@gmail.com" className="underline">companybrain@gmail.com</a></div>
              <div><strong>Jurisdiction:</strong> Surat, Gujarat, India</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
