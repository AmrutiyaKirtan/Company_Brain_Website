import HeroSection from '@/components/home/HeroSection';
import WhatItDoesSection from '@/components/home/WhatItDoesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import IntegrationsPreviewSection from '@/components/home/IntegrationsPreviewSection';
import PricingSection from '@/components/home/PricingSection';
import DemoSection from '@/components/home/DemoSection';

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
