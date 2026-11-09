import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Your Company Brain (YCB). Learn how we handle your data, local processing principles, and your rights.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-on-light mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Privacy Policy</span>
        </div>

        <header className="mb-12 pb-8 border-b border-line-on-light">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light block mb-2 font-semibold">
            Legal &amp; Compliance
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-muted-on-light">
            Last Updated: October 29, 2026 &bull; Compliant with Digital Personal Data Protection Act, 2023 (India) and GDPR principles
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-ink/85">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              1. Overview &amp; Local-First Architecture
            </h2>
            <p>
              Your Company Brain (&ldquo;YCB&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an offline-first knowledge extraction tool for engineering and operations teams. We are committed to minimizing data collection and respecting user privacy.
            </p>
            <p className="p-4 rounded-xl bg-paper-dark/50 border border-line-on-light font-mono text-xs text-ink/90">
              <strong>Core Privacy Architecture:</strong> The YCB desktop software/CLI processes your workspace documents (Slack, GitHub, Notion, Jira, Docs, etc.) locally on your machine using local LLM inference (e.g., Ollama / Gemma) by default. Your source documents, vector embeddings, and generated procedures are stored on your local drive (e.g. <code className="bg-white/80 px-1 py-0.5 rounded">data/company_brain.db</code>) and are <strong>not</strong> transmitted to YCB servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              2. Data We Collect On This Website
            </h2>
            <p>
              When you use our website (<a href="https://yourcompanybrain.vercel.app" className="underline hover:text-ink">yourcompanybrain.vercel.app</a>), we collect only the information necessary to fulfill service requests and process software licenses:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Waitlist Registrations:</strong> Email address, submission timestamp, referral/source parameters, and IP address hash (used solely for DDoS prevention and rate limiting).
              </li>
              <li>
                <strong>Free License Issuance (Solo / Test):</strong> Work email address. Used to generate and record your unique license key in our database (Firebase Realtime Database) and send confirmation.
              </li>
              <li>
                <strong>Paid License Checkout (Max Tier):</strong> Email address, optional phone number for receipt delivery, Razorpay transaction ID, and order ID. <em>Payment credentials (card numbers, UPI IDs, netbanking credentials) are collected directly by Razorpay and are never viewed, transmitted, or stored on YCB servers.</em>
              </li>
              <li>
                <strong>Contact / Demo Requests:</strong> Name, work email address, and message details submitted through our contact form.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              3. Purpose &amp; Legal Basis of Processing
            </h2>
            <p>
              We process your personal data under the following legal bases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contractual Necessity:</strong> Generating and managing your license key, processing your orders, and enabling software activation via <code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">ycb login</code>.</li>
              <li><strong>Legitimate Interests:</strong> Preventing fraud, DDoS attacks, and abuse of free license endpoints via IP-based rate limiting; maintaining website availability and security.</li>
              <li><strong>Consent:</strong> Sending transactional updates and early-access onboarding notifications when you request to join the waitlist or book a walkthrough.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              4. Third-Party Sub-Processors &amp; Service Providers
            </h2>
            <p>
              We work with trusted third-party service providers who assist in operating our website:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-line-on-light rounded-xl overflow-hidden">
                <thead className="bg-paper-dark/70 text-ink">
                  <tr>
                    <th className="p-3 border-b border-line-on-light">Provider</th>
                    <th className="p-3 border-b border-line-on-light">Purpose</th>
                    <th className="p-3 border-b border-line-on-light">Location / Privacy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-on-light bg-white/40">
                  <tr>
                    <td className="p-3 font-semibold">Vercel Inc.</td>
                    <td className="p-3">Website hosting, serverless functions, edge routing</td>
                    <td className="p-3">USA / Global edge &bull; ISO 27001</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Google Firebase (Google LLC)</td>
                    <td className="p-3">Realtime Database for license records and rate limiting</td>
                    <td className="p-3">Firebase infrastructure &bull; SOC 2, ISO 27001</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Razorpay Software Pvt. Ltd.</td>
                    <td className="p-3">Payment gateway for Max Tier checkout (loaded only on checkout)</td>
                    <td className="p-3">India &bull; PCI-DSS Level 1 Compliant</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Resend Inc.</td>
                    <td className="p-3">Transactional email delivery for license keys and waitlist confirmations</td>
                    <td className="p-3">USA &bull; GDPR compliant</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              5. Cookies &amp; Tracking Notice
            </h2>
            <p>
              Our website does not use tracking cookies, Google Analytics, Facebook Pixel, or behavioral advertising trackers.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Razorpay SDK:</strong> The Razorpay checkout script is loaded dynamically <em>only</em> when a user opens the payment modal on the Max Tier to complete a transaction. It sets essential session security and fraud prevention cookies during payment processing.
              </li>
              <li>
                <strong>PeerPush Badge:</strong> A static image badge is loaded from peerpush.com to show directory verification.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              6. Data Retention
            </h2>
            <p>
              We retain personal data only for as long as necessary:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>License Records:</strong> Retained for the duration of your active license plus statutory tax and accounting retention requirements (up to 7 years in India for financial invoices).</li>
              <li><strong>Waitlist Emails:</strong> Retained until early-access onboarding invitations are completed, or until you request deletion.</li>
              <li><strong>Rate-limiting IP Hashes:</strong> Automatically reset and discarded after 60 seconds.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              7. Your Rights (DPDP Act 2023, GDPR &amp; Applicable Laws)
            </h2>
            <p>
              Under applicable data protection laws, including India&apos;s Digital Personal Data Protection Act, 2023, you have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Right to Access &amp; Summary:</strong> Request a summary of the personal data we hold about you.</li>
              <li><strong>Right to Correction &amp; Erasure:</strong> Request correction of inaccurate data or deletion of your waitlist or contact information.</li>
              <li><strong>Right to Withdraw Consent:</strong> Unsubscribe or request removal of your email from waitlist communications at any time.</li>
              <li><strong>Right of Grievance Redressal:</strong> Submit a complaint regarding data processing to our Grievance Officer.</li>
            </ul>
            <p>
              To exercise any of these rights, visit our <Link href="/data-request" className="underline font-semibold hover:text-ink">Data &amp; Deletion Request Page</Link> or email us at <a href="mailto:companybrain@gmail.com" className="underline">companybrain@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              8. Grievance Officer &amp; Contact Information
            </h2>
            <p>
              In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, the details of our Grievance Officer are:
            </p>
            <div className="p-4 rounded-xl bg-paper-dark/40 border border-line-on-light font-mono text-xs space-y-1">
              <div><strong>Grievance Officer:</strong> Kirtan Amrutiya (Founder, Your Company Brain)</div>
              <div><strong>Contact Email:</strong> <a href="mailto:companybrain@gmail.com" className="underline">companybrain@gmail.com</a></div>
              <div><strong>Location:</strong> Surat, Gujarat, India</div>
              <div><strong>Response Window:</strong> We acknowledge requests within 48 hours and resolve grievances within 30 days.</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
