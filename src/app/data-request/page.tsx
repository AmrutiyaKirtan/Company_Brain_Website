import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data & Deletion Requests',
  description: 'Submit personal data access, correction, or deletion requests under DPDP Act 2023 and GDPR for Your Company Brain.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/data-request',
  },
};

export default function DataRequestPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-on-light mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink font-semibold">Data Request</span>
        </div>

        <header className="mb-12 pb-8 border-b border-line-on-light">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light block mb-2 font-semibold">
            Privacy &amp; Data Rights
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
            Data Access &amp; Deletion Request
          </h1>
          <p className="font-mono text-xs text-muted-on-light">
            In compliance with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP) and international privacy frameworks.
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-ink/85">
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              Important: Local Data vs. Cloud Data
            </h2>
            <div className="p-5 rounded-2xl bg-paper-dark/50 border border-line-on-light font-body space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-ink">
                YCB does NOT host or store your indexed company documents.
              </p>
              <p className="text-ink/80">
                All messages, wikis, tickets, and code repositories ingested via our connectors are stored strictly on your local computer in <code className="font-mono bg-white/70 px-1 py-0.5 rounded">data/company_brain.db</code>. We have zero technical ability to view, access, or delete your locally indexed files. You can delete your local knowledge base at any time by simply deleting your local database directory or uninstalling the package.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              What Data You Can Request to Delete or Access
            </h2>
            <p>
              The only centralized data we store consists of:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Waitlist Record:</strong> Email address and join timestamp.</li>
              <li><strong>License Record:</strong> Work email, plan tier (Solo / Max / Test), and generated license key hash stored in Firebase Realtime Database.</li>
              <li><strong>Contact Inquiry:</strong> Messages submitted via the contact or walkthrough booking forms.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              How to Submit a Request
            </h2>
            <p>
              Choose the appropriate request type below to send a pre-formatted email to our data privacy team:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Option 1: Deletion */}
              <div className="p-6 rounded-2xl border border-line-on-light-strong bg-white/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-amber-800 font-bold uppercase tracking-wider mb-2">
                    Right to Erasure
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    Request Data Deletion
                  </h3>
                  <p className="font-body text-xs text-muted-on-light leading-relaxed mb-4">
                    Permanently delete your email address from our waitlist, contact logs, and active marketing records.
                  </p>
                </div>
                <a
                  href="mailto:companybrain@gmail.com?subject=Data%20Deletion%20Request%20-%20[Your%20Email]&body=Please%20delete%20all%20personal%20data%20associated%20with%20my%20email%20address%20from%20your%20waitlist%20and%20contact%20records.%0A%0AMy%20Email:%20"
                  className="btn btn-primary text-xs py-2.5 px-4 rounded-xl text-center font-mono"
                >
                  Request Deletion &rarr;
                </a>
              </div>

              {/* Option 2: Access & Export */}
              <div className="p-6 rounded-2xl border border-line-on-light-strong bg-white/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-emerald-800 font-bold uppercase tracking-wider mb-2">
                    Right of Access
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    Request Data Summary
                  </h3>
                  <p className="font-body text-xs text-muted-on-light leading-relaxed mb-4">
                    Receive a summary report of the license records, email entries, or transaction metadata associated with your email.
                  </p>
                </div>
                <a
                  href="mailto:companybrain@gmail.com?subject=Data%20Access%20Request%20-%20[Your%20Email]&body=Please%20provide%20a%20summary%20of%20all%20data%20linked%20to%20my%20email%20address.%0A%0AMy%20Email:%20"
                  className="btn btn-secondary text-xs py-2.5 px-4 rounded-xl text-center font-mono"
                >
                  Request Summary &rarr;
                </a>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              Processing Timelines
            </h2>
            <p>
              In accordance with statutory timelines:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Acknowledgement:</strong> Within 48 hours of email receipt.</li>
              <li><strong>Fulfillment:</strong> Deletion and access requests are fulfilled within <strong>7 business days</strong>.</li>
              <li><strong>Verification:</strong> To prevent unauthorized tampering, requests must originate from the email address registered in our records.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              Grievance Officer Contact
            </h2>
            <div className="p-4 rounded-xl bg-paper-dark/40 border border-line-on-light font-mono text-xs space-y-1">
              <div><strong>Grievance Officer:</strong> Kirtan Amrutiya</div>
              <div><strong>Direct Email:</strong> <a href="mailto:companybrain@gmail.com" className="underline">companybrain@gmail.com</a></div>
              <div><strong>Location:</strong> Surat, Gujarat, India</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
