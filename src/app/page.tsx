import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import WhoHoldsWhatSection from '@/components/home/WhoHoldsWhatSection';
import WhatItDoesSection from '@/components/home/WhatItDoesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import IntegrationsPreviewSection from '@/components/home/IntegrationsPreviewSection';
import RoadmapSection from '@/components/home/RoadmapSection';
import PricingSection from '@/components/home/PricingSection';
import DemoSection from '@/components/home/DemoSection';

export const metadata: Metadata = {
  title: 'Your Company Brain | Verified Local Knowledge Engine',
  description:
    'Search across Slack, Google Drive, Notion, and GitHub with zero corporate data on our servers. Instant company answers for startup teams.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app',
  },
  openGraph: {
    title: 'Your Company Brain | Verified Local Knowledge Engine',
    description:
      'Search across Slack, Google Drive, Notion, and GitHub with zero corporate data on our servers. Instant company answers for startup teams.',
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
      <WhoHoldsWhatSection />
      <WhatItDoesSection />
      <HowItWorksSection />
      <IntegrationsPreviewSection />
      <RoadmapSection />
      <PricingSection />
      <DemoSection />
    </div>
  );
}
