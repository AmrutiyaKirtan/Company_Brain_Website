import type { Metadata } from 'next';
import ConnectorsDirectory from '@/components/connectors/ConnectorsDirectory';

export const metadata: Metadata = {
  title: 'Connectors',
  description:
    'Browse all 38 connectors supported by Your Company Brain across communication, engineering, productivity, and customer support stacks.',
  alternates: {
    canonical: 'https://yourcompanybrain.vercel.app/connectors',
  },
  openGraph: {
    title: 'Connectors | Your Company Brain',
    description:
      'Browse all 38 connectors supported by Your Company Brain across communication, engineering, productivity, and customer support stacks.',
    url: 'https://yourcompanybrain.vercel.app/connectors',
    siteName: 'Your Company Brain',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ConnectorsPage() {
  return <ConnectorsDirectory />;
}
