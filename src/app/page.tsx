import HeroSection from '@/components/home/HeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import IntegrationsPreviewSection from '@/components/home/IntegrationsPreviewSection';
import WhyOfflineSection from '@/components/home/WhyOfflineSection';
import StatsSection from '@/components/home/StatsSection';
import WhoItsForSection from '@/components/home/WhoItsForSection';
import PricingSection from '@/components/home/PricingSection';
import DemoSection from '@/components/home/DemoSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <IntegrationsPreviewSection />
      <WhyOfflineSection />
      <StatsSection />
      <WhoItsForSection />
      <PricingSection />
      <DemoSection />
    </main>
  );
}
