import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import WhatItDoesSection from '@/components/home/WhatItDoesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import IntegrationsPreviewSection from '@/components/home/IntegrationsPreviewSection';
import PricingSection from '@/components/home/PricingSection';
import DemoSection from '@/components/home/DemoSection';

export const metadata: Metadata = {
  title: 'Your Company Brain | Local-First AI Knowledge Engine',
  description:
    'Search across Slack, Google Drive, Notion, and GitHub without your data leaving your computer by default. Instant company answers for startup teams.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app',
  },
  openGraph: {
    title: 'Your Company Brain | Local-First AI Knowledge Engine',
    description:
      'Search across Slack, Google Drive, Notion, and GitHub without your data leaving your computer by default. Instant company answers for startup teams.',
    url: 'https://yourcompanybrain.vercel.app',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatItDoesSection />
      <HowItWorksSection />
      <IntegrationsPreviewSection />
      <PricingSection />
      <DemoSection />
    </div>
  );
}
