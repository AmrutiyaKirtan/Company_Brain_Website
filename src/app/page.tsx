import HeroSection from '@/components/home/HeroSection';
import TerminalDemoSection from '@/components/home/TerminalDemoSection';
import ProblemSection from '@/components/home/ProblemSection';
import SkillInspectorSection from '@/components/home/SkillInspectorSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import PipelineSection from '@/components/home/PipelineSection';
import IntegrationsPreviewSection from '@/components/home/IntegrationsPreviewSection';
import WhyOfflineSection from '@/components/home/WhyOfflineSection';
import StatsSection from '@/components/home/StatsSection';
import WhoItsForSection from '@/components/home/WhoItsForSection';
import PricingSection from '@/components/home/PricingSection';
import DemoSection from '@/components/home/DemoSection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TerminalDemoSection />
      <ProblemSection />
      <SkillInspectorSection />
      <HowItWorksSection />
      <PipelineSection />
      <IntegrationsPreviewSection />
      <WhyOfflineSection />
      <StatsSection />
      <WhoItsForSection />
      <PricingSection />
      <DemoSection />
    </div>
  );
}
