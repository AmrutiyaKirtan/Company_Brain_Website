import type { Metadata } from 'next';
import Link from 'next/link';
import PricingSection from '@/components/home/PricingSection';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Explore plans for Your Company Brain. Free perpetual Solo license, Max plan with all 38 connectors, and custom Enterprise plans.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/pricing',
  },
  openGraph: {
    title: 'Pricing | Your Company Brain',
    description:
      'Explore plans for Your Company Brain. Free perpetual Solo license, Max plan with all 38 connectors, and custom Enterprise plans.',
    url: 'https://yourcompanybrain.vercel.app/pricing',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body pt-24">
      {/* Breadcrumb Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-mono text-xs text-muted-on-light uppercase tracking-widest hover:text-ink transition-colors"
          >
            &larr; Home
          </Link>
          <span className="text-muted-on-light text-xs font-mono">&bull;</span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-on-light">
            Plans &amp; Licensing
          </span>
        </div>
      </div>

      {/* Embedded Existing PricingSection */}
      <PricingSection />
    </div>
  );
}
